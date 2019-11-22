from django.urls import path
from rasa_kor import views

urlpatterns = [
    path("intents/", views.intents),
    path("intent/<int:id>/", views.intent_detail),
    path("actions/", views.actions),
    path("action/<int:id>/", views.action_detail),
    path("stories/", views.stories),
    path("story/<int:id>/", views.story_detail),
    path("entities/", views.entities),
    path("entity/<int:id>/", views.entity_detail),
    path("slots/", views.slots),
    path("slot/<int:id>/", views.slot_detail),
    path("makefile/", views.make_train_file),
]
