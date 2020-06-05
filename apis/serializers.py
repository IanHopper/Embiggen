from rest_framework import serializers
from todos.models import Todo

class TodoSerializer(serializers.ModelSerializer):

  class Meta:
    fields = ('id', 'username', 'task_name', 'description', 'date_created', 'due_date', 'priority', 'tags', 'cost', 'purchase', 'estimated_time')
    model = Todo