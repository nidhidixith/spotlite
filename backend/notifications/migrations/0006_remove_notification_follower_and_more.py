# Generated by Django 5.1.1 on 2024-12-21 06:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0005_notification_follower'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notification',
            name='follower',
        ),
        migrations.AddField(
            model_name='notification',
            name='follower_id',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
