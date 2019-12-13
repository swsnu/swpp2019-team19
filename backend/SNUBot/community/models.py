from django.db import models
from django.core.cache import cache
from account.models import User

# Create your models here.

TAG_CHOICES = (
    ("normal", "Normal"),
    ("working", "Working"),
    ("done", "Done"),
    ("rejected", "Rejected"),
)

BOARD_CHOICES = (("all", "All"), ("hot", "Hot"))


class Article(models.Model):
    title = models.CharField(max_length=64)
    content = models.TextField()
    author = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="author_name"
    )
    tag = models.CharField(max_length=10, choices=TAG_CHOICES, default="normal")
    board = models.CharField(
        max_length=10, choices=BOARD_CHOICES, default="all"
    )
    date = models.DateTimeField(auto_now_add=True, blank=True)

    def save(self, *args, **kwargs):
        cache.delete("articles_all")
        cache.delete("articles_hot")
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        cache.delete("articles_all")
        cache.delete("articles_hot")
        super().delete(*args, **kwargs)


class Vote(models.Model):
    article = models.OneToOneField(Article, on_delete=models.CASCADE,)
    like = models.IntegerField(default=0)
    like_voter = models.ManyToManyField(User, related_name="liker")
    dislike = models.IntegerField(default=0)
    dislike_voter = models.ManyToManyField(User, related_name="disliker")

    def save(self, *args, **kwargs):
        cache.delete("articles_all")
        cache.delete("articles_hot")
        super().save(*args, **kwargs)


class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE,)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="comment_author",
    )
    content = models.TextField()
