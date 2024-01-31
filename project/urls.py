"""project URL Configuration"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('budgetmanager/', include('budgetmanager.urls')),
    path('admin/', admin.site.urls),
]
