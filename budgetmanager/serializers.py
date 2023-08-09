from rest_framework.serializers import (
    ModelSerializer,
    HiddenField,
    CurrentUserDefault
)

from . import models


class UserSerializer(ModelSerializer):
    class Meta:
        model = models.Budget.get_user_model()
        fields = ('username', 'first_name', 'last_name')


class BaseSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())


class BudgetSerializer(BaseSerializer):
    class Meta:
        model = models.Budget
        fields = ('id', 'name', 'description', 'active', 'user')


class BudgetShareSerializer(BaseSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = models.BudgetShare
        fields = ('id', 'budget', 'user')


class PayeeSerializer(BaseSerializer):
    class Meta:
        model = models.Payee
        fields = ('id', 'name', 'description', 'user')


class PaymentSerializer(BaseSerializer):
    def validate(self, attrs):
        models.Payment(**attrs).clean()
        return attrs

    class Meta:
        model = models.Payment
        fields = ('id', 'notes', 'payee', 'budget',
                  'amount', 'date', 'pending', 'user')
