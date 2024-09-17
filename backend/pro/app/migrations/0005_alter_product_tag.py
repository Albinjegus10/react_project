# Generated by Django 5.1 on 2024-08-30 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_remove_product_created_at_remove_product_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='tag',
            field=models.CharField(blank=True, choices=[('hero-product', 'Hero Product'), ('featured-product', 'Featured Product')], max_length=50, null=True),
        ),
    ]
