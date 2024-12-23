# Generated by Django 5.1.1 on 2024-11-05 06:51

import django.contrib.postgres.fields
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=30)),
                ('last_name', models.CharField(blank=True, max_length=30)),
                ('display_name', models.CharField(blank=True, max_length=65)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('location', models.URLField(blank=True)),
                ('primary_interest', models.CharField(blank=True, max_length=100)),
                ('bio', models.TextField(blank=True, max_length=500)),
                ('instagram_link', models.URLField(blank=True)),
                ('facebook_link', models.URLField(blank=True)),
                ('youtube_link', models.URLField(blank=True)),
                ('tiktok_link', models.URLField(blank=True)),
                ('pinterest_link', models.URLField(blank=True)),
                ('twitter_link', models.URLField(blank=True)),
                ('threads_link', models.URLField(blank=True)),
                ('linkedin_link', models.URLField(blank=True)),
                ('additional_links', django.contrib.postgres.fields.ArrayField(base_field=models.URLField(), blank=True, default=list, null=True, size=None)),
                ('areas_of_interest', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, default=list, size=None)),
                ('profile_pic', models.ImageField(blank=True, default='def.webp', null=True, upload_to='profile_pics')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserRelationships',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('follower_count', models.IntegerField(default=0)),
                ('following_count', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('follower', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followers', to=settings.AUTH_USER_MODEL)),
                ('following', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='following', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
