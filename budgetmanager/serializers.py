from rest_framework.serializers import (
    ModelSerializer,
    PrimaryKeyRelatedField,
    CurrentUserDefault,
)

from . import models


class UserSerializer(ModelSerializer):
    class Meta:
        model = models.Budget.get_user_model()
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
        )


class BaseSerializer(ModelSerializer):
    modified_by = PrimaryKeyRelatedField(read_only=True)

    def save(self, **kwargs):
        self.instance.modified_by = self.context['request'].user
        return super().save(**kwargs)


class BudgetSerializer(BaseSerializer):
    user = PrimaryKeyRelatedField(default=CurrentUserDefault(), read_only=True)

    class Meta:
        model = models.Budget
        fields = (
            'id',
            'name',
            'description',
            'active',
            'user',
            'last_modified',
            'modified_by',
        )


class BudgetShareSerializer(ModelSerializer):
    user = PrimaryKeyRelatedField(read_only=True)
    budget = PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = models.BudgetShare
        fields = (
            'id',
            'budget',
            'user',
            'can_edit',
            'added',
            'added_by',
        )


class PayeeSerializer(BaseSerializer):
    class Meta:
        model = models.Payee
        fields = (
            'id',
            'name',
            'description',
            'budget',
            'last_modified',
            'modified_by',
        )


class PaymentSerializer(BaseSerializer):
    class Meta:
        model = models.Payment
        fields = (
            'id',
            'notes',
            'payee',
            'amount',
            'date',
            'pending',
            'last_modified',
            'modified_by',
        )


class ShareCodeSerializer(ModelSerializer):
    class Meta:
        model = models.ShareCode
        fields = (
            'id',
            'budget',
            'can_edit',
            'added_by',
            'expiry',
        )
