# Generated by Django 5.1.1 on 2024-11-05 07:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_alter_post_comments_count_alter_post_likes_count'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='comments_count',
        ),
        migrations.RemoveField(
            model_name='post',
            name='likes_count',
        ),
    ]