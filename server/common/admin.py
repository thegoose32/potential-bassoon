from django.contrib import admin

from common.models import LRPModel


@admin.register(LRPModel)
class LRPModelAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_on', 'version')
