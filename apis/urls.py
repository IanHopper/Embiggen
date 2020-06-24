from django.urls import path

from .views import TodoList, TodoDetail

urlpatterns = [
  path('<int:pk>/', TodoDetail.as_view()),
  path('', TodoList.as_view()),
]