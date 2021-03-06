# Generated by Django 3.0.7 on 2020-06-04 19:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.ForeignKey(
                    to=settings.AUTH_USER_MODEL, on_delete=django.db.models.deletion.SET_NULL, null=True, blank=True)),
                ('task_name', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, null=True)),
                ('date_created', models.DateField(
                    auto_now_add=True, blank=True, null=True)),
                ('due_date', models.DateField(blank=True, null=True)),
                ('priority', models.IntegerField(choices=[(1, 'Vital'), (2, 'Important'), (3, 'Urgent'), (4, 'Trivial')], default=4)),
                ('tags', models.CharField(max_length=150, blank=True, null=True)),
                ('project', models.CharField(max_length=150, blank=True, null=True)),
                ('cost', models.DecimalField(max_digits=12,
                                             decimal_places=2, blank=True, null=True)),
                ('duration', models.IntegerField(blank=True, null=True)),
                ('completed', models.BooleanField(default=False))
            ],
        ),
    ]
