from django.db import models
from django.contrib.auth import get_user_model, get_user


class Todo(models.Model):
  class Priority(models.IntegerChoices):
    VITAL = 1
    IMPORTANT = 2
    URGENT = 3
    TRIVIAL = 4
  
  username = models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
  task_name = models.CharField(max_length=200)
  description = models.TextField(blank=True, null=True)
  date_created = models.TimeField(auto_now_add=True)
  due_date = models.TimeField(blank=True, null=True)
  priority = models.IntegerField(choices=Priority.choices, default=4)
  tags = models.CharField(max_length=150, blank=True, null=True)
  cost = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
  purchase = models.BooleanField()
  estimated_time = models.IntegerField(blank=True, null=True)

  def __str__(self):
    return self.task_name
