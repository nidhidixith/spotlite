# Generated by Django 5.1.1 on 2025-01-06 05:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_alter_event_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_title',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
