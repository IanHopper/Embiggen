from django.contrib import admin

from .models import Todo

class TodoAdmin(admin.ModelAdmin):
  list_display = ('task_name', 'username', 'priority', 'due_date', 'duration', 'cost', 'id')
  list_filter = ('username', 'priority')
  list_editable = ('priority', 'due_date', 'duration', 'cost')

admin.site.register(Todo, TodoAdmin)