from rest_framework.serializers import (
    ModelSerializer,
    HiddenField,
    CurrentUserDefault
)

from . import models


class BaseSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())


class BudgetSerializer(BaseSerializer):
    class Meta:
        model = models.Budget
        fields = ['id', 'name', 'description', 'active', 'user']


class PayeeSerializer(BaseSerializer):
    class Meta:
        model = models.Payee
        fields = ['id', 'name', 'description', 'user']


class PaymentSerializer(BaseSerializer):
    class Meta:
        model = models.Payment
        fields = ['id', 'notes', 'payee', 'budget',
                  'amount', 'date', 'pending', 'user']
