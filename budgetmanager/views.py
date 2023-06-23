# pylint: disable=no-member
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.views import View
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from . import (
    filters,
    models,
    permissions,
    serializers,
)


class HomeView(LoginRequiredMixin, View):
    """
    The view for the home page
    """

    def get(self, request):
        """
        Handle the GET request for the home page
        """
        return render(request, 'clotheswear/home.html')


class BaseViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, permissions.IsOwner]
    filter_backends = [filters.OwnerFilter]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class BudgetViewSet(BaseViewSet):
    queryset = models.Budget.objects.all()
    serializer_class = serializers.BudgetSerializer

class PayeeViewSet(BaseViewSet):
    queryset = models.Payee.objects.all()
    serializer_class = serializers.PayeeSerializer

class PaymentViewSet(BaseViewSet):
    queryset = models.Payment.objects.all()
    serializer_class = serializers.PaymentSerializer
