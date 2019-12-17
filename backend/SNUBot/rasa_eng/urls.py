from django.urls import path
from rasa_eng import views

urlpatterns = [
    path("intents/", views.IntentsView.as_view()),
    path("intent/<int:id>/", views.IntentView.as_view()),
    path("actions/", views.ActionsView.as_view()),
    path("action/<int:id>/", views.ActionView.as_view()),
    path("stories/", views.StoriesView.as_view()),
    path("story/<int:id>/", views.StoryView.as_view()),
    path("entities/", views.EntitiesView.as_view()),
    path("entity/<int:id>/", views.EntityView.as_view()),
    path("slots/", views.SlotsView.as_view()),
    path("slot/<int:id>/", views.SlotView.as_view()),
    path("makefile/", views.MakeFileView.as_view()),
]

