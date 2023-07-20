# pylint: disable=no-member
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from . import (
    filters,
    models,
    permissions,
    serializers,
)


class BaseViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, permissions.IsOwner]
    filter_backends = [filters.OwnerFilter]


class BudgetViewSet(BaseViewSet):
    queryset = models.Budget.objects.all()
    serializer_class = serializers.BudgetSerializer

    @action(methods=['POST'], detail=True, url_path='csv')
    def add_from_csv(self, request, pk):
        self.get_object().add_from_csv(request.data['csv'])
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class PayeeViewSet(BaseViewSet):
    queryset = models.Payee.objects.all()
    serializer_class = serializers.PayeeSerializer


class PaymentViewSet(BaseViewSet):
    queryset = models.Payment.objects.all()
    serializer_class = serializers.PaymentSerializer
