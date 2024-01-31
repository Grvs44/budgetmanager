"""project URL Configuration"""
from django.contrib import admin
from django.urls import include, path
from django.contrib.auth.views import logout_then_login

urlpatterns = [
    path('budgetmanager/', include('budgetmanager.urls')),
    path('admin/', admin.site.urls),
    path('accounts/logout/?next=<str:login_url>', logout_then_login, name='logout'),
    path('accounts/', include('django.contrib.auth.urls')),
]
