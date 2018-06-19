import logging
import json

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.db import transaction

from common.models import LRPModel

logger = logging.getLogger(__name__)

def _serialize_lrp_model(lrp_model):
    return {
        'data': lrp_model.data,
        # add name + created on
    }

@login_required
def main(request):
    user = request.user
    try:
        latest_lrp_model = user.lrpmodel_set.latest('version')
        lrp_model_data = _serialize_lrp_model(latest_lrp_model)
    except LRPModel.DoesNotExist as e:
        lrp_model_data = None
    context = {
        'lrp_model': json.dumps(lrp_model_data)
    }
    return render(request, 'index.html', context)


def test(request):
    return render(request, 'test.html', {})


@login_required
@csrf_exempt
@require_http_methods(["GET"])
def get_lrp_model(request):
    user = request.user
    try:
        latest_lrp_model = user.lrpmodel_set.latest('version')
        return JsonResponse(_serialize_lrp_model(latest_lrp_model))
    except LRPModel.DoesNotExist as e:
        logger.exception('User %s attempted to get lrp_model when there was none', user.pk)
        return HttpResponse(status=400)


@login_required
@csrf_exempt
@require_http_methods(["POST"])
@transaction.atomic
def save_lrp_model(request):
    user = request.user
    try:
        request_data = json.loads(request.body.decode('utf-8'))
    except (UnicodeError, json.JSONDecodeError) as e:
        logger.exception('User %s sent request with invalidly encoded json', user.pk)
        return HttpResponse(status=400)

    try:
        lrp_model_data = request_data['data']
        expected_version = lrp_model_data['version']
    except KeyError as e:
        logger.exception('Missing an expected keys from payload', user.pk)
        return HttpResponse(status=400)

    try:
        latest_lrp_model = user.lrpmodel_set.latest('version')
        actual_version = latest_lrp_model.version
    except LRPModel.DoesNotExist as e:
        actual_version = 0

    if expected_version == actual_version:
        version = actual_version + 1
        lrp_model_data['version'] += 1
        lrp_model = LRPModel(user=user, data=lrp_model_data, version=version)
        lrp_model.save()
        return JsonResponse(_serialize_lrp_model(lrp_model))
    else:
        msg = 'User %s sent request with expected previous version %d, but actual was %d'
        logger.error(msg, user.pk, expected_version, actual_version)
        return HttpResponse(status=409)
