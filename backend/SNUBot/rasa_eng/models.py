from django.db import models
from django_mysql.models import ListCharField
from django.core.cache import cache

RET_CHOICES = (
    ("text", "text"),
    ("image", "image"),
    ("all", "all"),
    ("action", "action"),
)
SLOT_CHOICES = (
    ("text", "text"),
    ("bool", "bool"),
    ("categorical", "categorical"),
    ("list", "list"),
    ("unfeaturized", "unfeaturized"),
)


class IntentEng(models.Model):
    intent_name = models.CharField(max_length=40, db_index=True, unique=True)
    intent_tokens = ListCharField(
        base_field=models.CharField(max_length=40),
        size=20,
        max_length=(20 * 41),
    )


class ActionEng(models.Model):
    action_name = models.CharField(max_length=40, db_index=True, unique=True)
    intent = models.ManyToManyField(IntentEng, related_name="related_action")
    action_type = models.CharField(
        max_length=10, choices=RET_CHOICES, default="text"
    )
    text_value = models.TextField(blank=True)
    image_value = models.TextField(blank=True)


class StoryEng(models.Model):
    story_name = models.CharField(max_length=40, db_index=True, unique=True)
    story_path_1 = models.ManyToManyField(IntentEng, related_name="first_path")
    story_path_2 = models.ManyToManyField(IntentEng, related_name="second_path")

    def save(self, *args, **kwargs):
        cache.delete("category")
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        cache.delete("category")
        super().delete(*args, **kwargs)


class EntityEng(models.Model):
    entity_name = models.CharField(max_length=40, db_index=True, unique=True)
    intent = models.OneToOneField(
        IntentEng, related_name="related_entity", on_delete=models.CASCADE
    )
    entity_tokens = ListCharField(
        base_field=models.CharField(max_length=40),
        size=40,
        max_length=(40 * 41),
    )


class SlotEng(models.Model):
    slot_name = models.CharField(max_length=30, db_index=True, unique=True)
    slot_type = models.CharField(
        max_length=20, choices=SLOT_CHOICES, default="text"
    )
