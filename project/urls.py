"""project URL Configuration"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('api/budgetmanager/', include('budgetmanager.urls')),
    path('api/', include('knox.urls')),
    path('admin/', admin.site.urls),
]
