from rest_framework import generics

from todos.models import Todo
from .serializers import TodoSerializer

class TodoList(generics.ListCreateAPIView):
  # queryset = Todo.objects.all()
  serializer_class = TodoSerializer

  def get_queryset(self):
    # Returns list of all todos for currently authenticated user
    user = self.request.user
    return Todo.objects.filter(username=user)

class TodoDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Todo.objects.all()
  serializer_class = TodoSerializer