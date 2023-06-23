from django.conf import settings
from django.db import models


class BaseModel(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)

    class Meta:
        abstract = True


class Budget(BaseModel):
    active = models.BooleanField(default=True)


class Payee(BaseModel):
    active = models.BooleanField(default=True)


class Payment(BaseModel):
    payee = models.ForeignKey(Payee, on_delete=models.CASCADE)
    budget = models.ForeignKey(
        Budget, on_delete=models.CASCADE, limit_choices_to={'active': True})
    amount = models.DecimalField(decimal_places=2, max_digits=7)
    date = models.DateField()
