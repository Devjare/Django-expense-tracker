# Generated by Django 4.2.7 on 2023-12-26 08:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('book_manager', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='category',
            new_name='categories',
        ),
    ]