# pylint: disable=no-member,unused-argument
import django.core.exceptions
from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, status
from rest_framework.decorators import action
import rest_framework.exceptions
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from . import (
    models,
    permissions,
    serializers,
)
from .metadata import JoinBudgetMetadata
from .pagination import Pagination


class TotalView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return Response(
            f'{models.Payment.get_total(request.user):.2f}'
        )


class PaymentRelatedMixin:
    @action(methods=('GET',), detail=True)
    def total(self, request, pk):
        return Response(
            f'{self.get_object().total:.2f}'
        )


class BudgetViewSet(PaymentRelatedMixin, ModelViewSet):
    queryset = models.Budget.objects
    serializer_class = serializers.BudgetSerializer
    permission_classes = (IsAuthenticated, permissions.IsBudgetOwner)
    pagination_class = Pagination
    filter_backends = (DjangoFilterBackend, OrderingFilter, SearchFilter)
    filterset_fields = ('active',)
    ordering_fields = ('name', 'id')
    search_fields = ('name',)

    def get_queryset(self):
        return self.queryset.filter(
            Q(user=self.request.user) |
            Q(id__in=self.request.user.budgetshare_set.values('budget_id'))
        ).all()

    @action(methods=('POST',), detail=True, url_path='csv')
    def add_from_csv(self, request, pk):
        self.get_object().add_from_csv(request.data['csv'])
        return Response(None, status=status.HTTP_204_NO_CONTENT)

    @action(methods=('GET',), detail=True, url_path='edit')
    def can_edit(self, request, pk):
        return Response(self.get_object().has_access(request.user, True))

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BudgetShareViewSet(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    GenericViewSet
):
    queryset = models.BudgetShare.objects
    serializer_class = serializers.BudgetShareSerializer
    permission_classes = (IsAuthenticated, permissions.CanAccessBudgetShare)
    pagination_class = Pagination
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('budget', 'user')

    def get_queryset(self):
        return self.queryset.filter(
            Q(user=self.request.user) |
            Q(budget__user=self.request.user)
        ).all()

    @action(methods=('POST',), detail=True, url_path='transfer')
    def make_budget_owner(self, request, pk):
        self.get_object().transfer_budget()
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class PayeeViewSet(PaymentRelatedMixin, ModelViewSet):
    queryset = models.Payee.objects
    serializer_class = serializers.PayeeSerializer
    permission_classes = (IsAuthenticated, permissions.IsPayeeOwner)
    pagination_class = Pagination
    filter_backends = (DjangoFilterBackend, OrderingFilter, SearchFilter)
    filterset_fields = ('budget',)
    ordering_fields = ('name', 'id')
    search_fields = ('name',)

    def get_queryset(self):
        return self.queryset.filter(
            Q(budget__user=self.request.user) |
            Q(budget_id__in=self.request.user.budgetshare_set.values('budget_id'))
        ).all()

    @action(methods=('GET',), detail=True, url_path='edit')
    def can_edit(self, request, pk):
        return Response(self.get_object().budget.has_access(request.user, True))


class PaymentViewSet(ModelViewSet):
    queryset = models.Payment.objects
    serializer_class = serializers.PaymentSerializer
    permission_classes = (IsAuthenticated, permissions.IsPaymentOwner)
    pagination_class = Pagination
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_fields = {
        'payee': ('exact',),
        'payee__budget': ('exact',),
        'pending': ('exact',),
        'amount': ('exact', 'gt', 'lt'),
        'date': ('exact', 'gt', 'lt'),
    }
    ordering_fields = ('amount', 'date', 'id')

    def get_queryset(self):
        return self.queryset.filter(
            Q(payee__budget__user=self.request.user) |
            Q(payee__budget_id__in=self.request.user.budgetshare_set.values('budget_id'))
        ).all()

    @action(methods=('GET',), detail=True, url_path='edit')
    def can_edit(self, request, pk):
        return Response(self.get_object().payee.budget.has_access(request.user, True))


class ShareCodeViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    GenericViewSet
):
    queryset = models.ShareCode.objects
    serializer_class = serializers.ShareCodeSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = Pagination

    def get_queryset(self):
        return self.queryset.filter(
            Q(budget__user=self.request.user) |
            Q(budget_id__in=self.request.user.budgetshare_set.values('budget_id'))
        )


class UserViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    GenericViewSet
):
    queryset = models.Budget.get_user_model().objects
    serializer_class = serializers.UserSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = Pagination

    def get_queryset(self):
        return self.queryset.filter(
            Q(id=self.request.user.id) |
            Q(id__in=models.BudgetShare.objects.filter(
                budget__user=self.request.user
            ).values('user_id')) |
            Q(id__in=models.BudgetShare.objects.filter(
                user=self.request.user
            ).values('budget__user_id'))
        )

    @action(methods=('GET',), detail=False, url_path='me')
    def get_current_user(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class JoinBudgetView(APIView):
    permission_classes = (IsAuthenticated,)
    metadata_class = JoinBudgetMetadata

    def post(self, request):
        try:
            get_object_or_404(
                models.ShareCode,
                pk=request.data.get('id')
            ).add_user(request.user)
            return Response(None, status.HTTP_204_NO_CONTENT)
        except django.core.exceptions.ValidationError as exc:
            raise rest_framework.exceptions.ValidationError(
                detail={'detail': exc})


def index_view(request):
    return render(request, 'budgetmanager/index.html')

def manifest_view(request):
    return render(request, 'budgetmanager/manifest.json', content_type='application/json')

def asset_manifest_view(request):
    return render(request, 'budgetmanager/asset-manifest.json', content_type='application/json')
