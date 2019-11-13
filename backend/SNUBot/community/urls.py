from django.urls import path
from community import views

urlpatterns = [
    path('signup/', views.signup),
    path('token/', views.token),
    path('signin/', views.signin),
    path('signout/', views.signout),
    path('boards/', views.boards),
    path('article/', views.article),
    path('article/<int:article_id>/', views.article_detail),
    path('vote/<int:article_id>/', views.vote),
    path('comment/<int:id>/', views.comment)
]
