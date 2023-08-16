# pylint: disable=unused-argument
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsBudgetOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        print('budget')
        return obj.has_access(request.user, request.method not in SAFE_METHODS)


class CanAccessBudgetShare(BasePermission):
    def has_object_permission(self, request, view, obj):
        print('share')
        return obj.user == request.user or obj.budget.user == request.user


class IsPayeeOwner(IsBudgetOwner):
    def has_object_permission(self, request, view, obj):
        print('payee')
        return super().has_object_permission(request, view, obj.budget)


class IsPaymentOwner(IsBudgetOwner):
    def has_object_permission(self, request, view, obj):
        print('payment')
        return super().has_object_permission(request, view, obj.payee.budget)
