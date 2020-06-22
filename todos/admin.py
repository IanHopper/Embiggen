from django.contrib import admin

from .models import Todo

class TodoAdmin(admin.ModelAdmin):
  list_display = ('task_name', 'username', 'priority', 'due_date', 'duration', 'cost', 'completed','id' )
  list_filter = ('username', 'priority')
  list_editable = ('priority', 'due_date', 'duration', 'cost', 'completed')

admin.site.register(Todo, TodoAdmin)