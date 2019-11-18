from django.contrib import admin
from .models import Article, Vote, Comment
# Register your models here.

admin.site.register(Article)
admin.site.register(Vote)
admin.site.register(Comment)
