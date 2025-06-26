"""project URL Configuration"""
from django.contrib import admin
from django.urls import include, path
from django.contrib.auth.views import logout_then_login
from django.views.generic import RedirectView

urlpatterns = [
    path('budgetmanager/api/', include('budgetmanager.urls')),
    path('admin/', admin.site.urls),
    path('accounts/logout/?next=<str:login_url>', logout_then_login, name='logout'),
    path('accounts/profile/', RedirectView.as_view(url='/budgetmanager/')),
    path('accounts/', include('django.contrib.auth.urls')),
]
