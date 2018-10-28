from django.contrib import admin
from django.urls import path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib.auth import views as auth_views

import common.views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', auth_views.LoginView.as_view(template_name='login.html')),
    path('logout/', auth_views.LogoutView.as_view()),
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += [
    path('api/get_lrp_model', common.views.get_lrp_model),
    path('api/save_lrp_model', common.views.save_lrp_model),
    path('api/export_lrp_model', common.views.save_lrp_model),
    path('test/', common.views.test),
    path('', common.views.main),
]
