# pylint: disable=no-member
from django.db.models import Q
from rest_framework import mixins, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from . import (
    models,
    permissions,
    serializers,
)
from .pagination import Pagination


class TotalView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return Response({
            'total': f'{models.get_total_amount(request.user):.2f}'
        })


class BaseViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated, permissions.IsOwner)
    pagination_class = Pagination

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user).all()


class PaymentRelatedViewSet(BaseViewSet):
    @action(methods=('GET',), detail=True)
    def total(self, request, pk):
        return Response({
            'total': f'{self.get_object().total:.2f}'
        })


class BudgetViewSet(PaymentRelatedViewSet):
    queryset = models.Budget.objects
    serializer_class = serializers.BudgetSerializer

    @action(methods=('POST',), detail=True, url_path='csv')
    def add_from_csv(self, request, pk):
        self.get_object().add_from_csv(request.data['csv'])
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class BudgetShareViewSet(
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    GenericViewSet
):
    queryset = models.BudgetShare.objects
    serializer_class = serializers.BudgetShareSerializer
    permission_classes = (IsAuthenticated, permissions.CanAccessBudgetShare)
    pagination_class = Pagination

    def get_queryset(self):
        return self.queryset.filter(
            Q(user=self.request.user)
            | Q(budget__user=self.request.user)
        ).all()


class PayeeViewSet(PaymentRelatedViewSet):
    queryset = models.Payee.objects
    serializer_class = serializers.PayeeSerializer


class PaymentViewSet(BaseViewSet):
    queryset = models.Payment.objects
    serializer_class = serializers.PaymentSerializer
