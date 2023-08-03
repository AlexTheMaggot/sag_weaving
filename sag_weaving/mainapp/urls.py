from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('auth/', views.index),
    path('dashboard/', views.index),
    path('settings/', views.index),
    path('settings/machines/', views.index),
    path('settings/machines/create/', views.index),
    path('settings/machines/<int:machine_id>/edit/', views.get_machine_id),
    path('settings/change-speed/', views.index),
    path('settings/change-speed/<int:machine_id>/', views.get_machine_id),
    path('add-data/', views.index),
    path('add-data/<int:machine_id>/', views.get_machine_id),
]
 