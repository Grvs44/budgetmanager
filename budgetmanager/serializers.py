from rest_framework.serializers import ModelSerializer
from . import models


class BudgetSerializer(ModelSerializer):
    class Meta:
        model = models.Budget
        fields = ['id', 'name', 'description', 'active']


class PayeeSerializer(ModelSerializer):
    class Meta:
        model = models.Payee
        fields = ['id', 'name', 'description', 'active']


class PaymentSerializer(ModelSerializer):
    class Meta:
        model = models.Payment
        fields = ['id', 'name', 'description',
                  'payee', 'budget', 'amount', 'date']
