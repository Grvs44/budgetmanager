'''
Model classes
'''
from decimal import Decimal

from django.conf import settings
from django.db import models


class BaseModel(models.Model):
    '''
    Abstract base model
    Has the user that own the entity, and a name and description
    '''
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)

    class Meta:
        '''Meta class for BaseModel'''
        abstract = True


class Budget(BaseModel):
    '''
    Model for a budget
    '''
    active = models.BooleanField(default=True)

    def get_total(self) -> Decimal:
        '''
        Get the total amount in this Budget as a Decimal
        '''
        # pylint:disable=no-member
        return self.payment_set.aggregate(  # type: ignore
            models.Sum('amount', default=0)
        )['amount__sum']


class Payee(BaseModel):
    '''
    Model for a payee
    '''


class Payment(BaseModel):
    '''
    Model for a payment
    Requires a payee and a budget
    Has an amount and date
    '''
    payee = models.ForeignKey(Payee, on_delete=models.CASCADE)
    budget = models.ForeignKey(
        Budget, on_delete=models.CASCADE, limit_choices_to={'active': True})
    amount = models.DecimalField(decimal_places=2, max_digits=7)
    date = models.DateField()
    pending = models.BooleanField(default=False)
