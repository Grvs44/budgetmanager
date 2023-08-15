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


class IsPayeeOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        print('payee')
        return obj.budget.has_access(request.user, request.method in SAFE_METHODS)


class IsPaymentOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        print('payment')
        return obj.payee.budget.has_access(request.user, request.method in SAFE_METHODS)
