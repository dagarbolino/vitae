# Generated by Django 5.0.6 on 2024-07-15 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('curriculum', '0006_remove_curriculum_address_remove_curriculum_city_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='curriculum',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Date de création'),
        ),
        migrations.AlterField(
            model_name='curriculum',
            name='title',
            field=models.CharField(max_length=120, verbose_name='Titre du curriculum'),
        ),
        migrations.AlterField(
            model_name='curriculum',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, verbose_name='Date de modification'),
        ),
    ]
