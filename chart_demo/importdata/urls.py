from django.urls import path

from . import views
app_name = 'importdata'

urlpatterns = [
    path(r'index/', views.index, name='index'),
    path('getparadar/', views.get_pa_competence, name='paRadar'),
    path('getipcsun/', views.get_ipc_type, name='ipcSum')
]