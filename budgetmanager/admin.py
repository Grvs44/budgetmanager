'''Admin setup for budgetmanager app'''
from django.contrib import admin
from . import models


class BaseAdmin(admin.ModelAdmin):
    def save_model(self, request, obj: models.BaseModel, form, change):
        obj.modified_by = None
        obj.save()


@admin.register(models.Budget)
class BudgetAdmin(BaseAdmin):
    '''Settings for the Budget admin'''
    list_display = ('user', 'name', 'active')
    list_display_links = list_display
    list_filter = ('user', 'active')
    sortable_by = list_display
    search_fields = ('name',)
    search_help_text = 'Search by budget name'
    list_per_page = 20
    readonly_fields = ('modified_by',)


@admin.register(models.BudgetShare)
class BudgetShareAdmin(admin.ModelAdmin):
    '''Settings for the BudgetShare admin'''
    list_display = ('user', 'budget', 'can_edit')
    list_display_links = list_display
    list_filter = list_display
    sortable_by = list_display
    readonly_fields = ('user', 'budget', 'added_by')
    readonly_create_fields = ('added_by',)
    list_per_page = 20

    def get_readonly_fields(self, request, obj=...):
        if obj is None:
            return self.readonly_create_fields
        return self.readonly_fields


@admin.register(models.Payee)
class PayeeAdmin(BaseAdmin):
    '''Settings form the Payee admin'''
    list_display = ('budget', 'name')
    list_display_links = list_display
    list_filter = ('budget',)
    sortable_by = list_display
    search_fields = ('name',)
    search_help_text = 'Search by payee name'
    list_per_page = 20
    readonly_fields = ('modified_by',)


@admin.register(models.Payment)
class PaymentAdmin(BaseAdmin):
    '''Settings for the Payment admin'''
    date_hierarchy = 'date'
    list_display = ('payee', 'amount', 'date')
    list_display_links = list_display
    list_filter = ('payee', 'date')
    sortable_by = list_display
    list_per_page = 20
    readonly_fields = ('modified_by',)
