from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField


class LRPModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    last_modified_on = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, models.CASCADE)
    data = JSONField()
    version = models.IntegerField(default=0)
