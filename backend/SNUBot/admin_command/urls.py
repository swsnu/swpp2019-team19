from django.urls import path
from admin_command import views

urlpatterns = [
    path("replace/", views.replace_rasa_model),
    path("update/", views.udpate_server),
]
