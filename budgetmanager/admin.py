'''Admin setup for budgetmanager app'''
from django.contrib import admin
from . import models


@admin.register(models.Budget)
class BudgetAdmin(admin.ModelAdmin):
    '''Settings for the Budget admin'''
    list_display = ('user', 'name', 'active')
    list_display_links = list_display
    list_filter = ('user', 'active')
    readonly_fields = ('user',)
    sortable_by = list_display
    search_fields = ('name',)
    search_help_text = 'Search by budget name'
    list_per_page = 20


@admin.register(models.Payee)
class PayeeAdmin(admin.ModelAdmin):
    '''Settings form the Payee admin'''
    list_display = ('user', 'name')
    list_display_links = list_display
    list_filter = ('user',)
    readonly_fields = ('user',)
    sortable_by = list_display
    search_fields = ('name',)
    search_help_text = 'Search by payee name'
    list_per_page = 20


@admin.register(models.Payment)
class PaymentAdmin(admin.ModelAdmin):
    '''Settings for the Payment admin'''
    date_hierarchy = 'date'
    list_display = ('user', 'budget', 'payee', 'date')
    list_display_links = list_display
    list_filter = ('user', 'budget', 'payee', 'date')
    readonly_fields = ('user',)
    sortable_by = list_display
    list_per_page = 20

    def get_form(self, request, obj=..., change=..., **kwargs):
        form = super().get_form(request, obj, change, **kwargs)
        form.base_fields['budget'].queryset = form.base_fields['budget'].queryset.filter(
            user=obj.user)
        form.base_fields['payee'].queryset = form.base_fields['payee'].queryset.filter(
            user=obj.user)
        return form
