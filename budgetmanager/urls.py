from django.urls import include, path

from rest_framework.routers import DefaultRouter
from . import views

app_name = 'clotheswear' # pylint: disable=invalid-name
router = DefaultRouter()
router.register(r'budget', views.BudgetViewSet)
router.register(r'payee', views.PayeeViewSet)
router.register(r'payment', views.PaymentViewSet)

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('api/', include(router.urls)),
    path('api/', include('knox.urls')),
]
