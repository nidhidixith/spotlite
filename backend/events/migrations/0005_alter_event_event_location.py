# Generated by Django 5.1.1 on 2024-12-25 06:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_remove_event_event_from_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_location',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
