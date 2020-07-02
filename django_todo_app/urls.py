from django.contrib import admin
from django.urls import path, include

from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('api/auth/', include('users.urls')),
    path('admin/', include('admin_honeypot.urls', namespace='admin_honeypot')),
    path('admin-secret-url/', admin.site.urls),
    path('api/', include('apis.urls'))
]
