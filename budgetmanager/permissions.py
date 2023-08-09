# pylint: disable=unused-argument
from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    def has_obj_permission(self, request, view, obj):
        return obj.user == request.user


class CanAccessBudgetShare(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or obj.budget.user == request.user
