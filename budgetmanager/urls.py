'''
URL configuration for budgetmanager app
'''
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'budgetmanager'  # pylint: disable=invalid-name
router = DefaultRouter()
router.register(r'budget', views.BudgetViewSet)
router.register(r'payee', views.PayeeViewSet)
router.register(r'payment', views.PaymentViewSet)

urlpatterns = router.urls
