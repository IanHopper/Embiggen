from rest_framework import generics

from todos.models import Todo
from .serializers import TodoSerializer
from .permissions import IsOwner

class TodoList(generics.ListCreateAPIView):
  queryset = Todo.objects.all()
  serializer_class = TodoSerializer

class TodoDetail(generics.RetrieveUpdateDestroyAPIView):
  # permission_classes = (IsOwner,)
  queryset = Todo.objects.all()
  serializer_class = TodoSerializer