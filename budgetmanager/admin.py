from django.contrib import admin
from . import models

admin.site.register((models.Budget, models.Payee, models.Payment))
