from django.db import models
from django.contrib.auth import get_user_model


class Todo(models.Model):
  class Priority(models.IntegerChoices):
    VITAL = 1
    IMPORTANT = 2
    URGENT = 3
    TRIVIAL = 4
  
  username = models.ForeignKey(get_user_model(),on_delete=models.SET_NULL, null=True, blank=True)

  task_name = models.CharField(max_length=200)
  description = models.TextField(blank=True, null=True)
  date_created = models.DateField(auto_now_add=True, blank=True, null=True)
  due_date = models.DateField(blank=True, null=True)
  priority = models.IntegerField(choices=Priority.choices, default=4)
  tags = models.CharField(max_length=150, blank=True, null=True)
  cost = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
  purchase = models.BooleanField(blank=True, null=True)
  duration = models.IntegerField(blank=True, null=True)
  completed = models.BooleanField(default=False)

  def __str__(self):
    return self.task_name
