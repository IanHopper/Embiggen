from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('users.urls')),
    path('admin/', include('admin_honeypot.urls', namespace='admin_honeypot')),
    path('admin-secret-url/', admin.site.urls),
    path('api/', include('apis.urls'))
    
]
