from django.contrib import admin

from .models import Todo

class TodoAdmin(admin.ModelAdmin):
  list_display = ('task_name', 'username', 'date_created', 'due_date', 'priority')
  list_filter = ('username', 'priority')
  list_editable = ('due_date', 'priority')

admin.site.register(Todo, TodoAdmin)