# Generated by Django 4.2.2 on 2023-06-23 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budgetmanager', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budget',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='payee',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='payment',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
