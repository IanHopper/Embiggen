from rest_framework import serializers
from todos.models import Todo

class TodoSerializer(serializers.ModelSerializer):

  class Meta:
    fields = ('id', 'username', 'task_name', 'description', 'priority', 'date_created', 'due_date', 'tags', 'cost', 'purchase', 'duration', 'completed')
    model = Todo