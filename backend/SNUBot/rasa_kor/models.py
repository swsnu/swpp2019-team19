from django.db import models
from django_mysql.models import ListCharField

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


class IntentKor(models.Model):
    intent_name = models.CharField(max_length=20, db_index=True)
    intent_tokens = ListCharField(
        base_field=models.CharField(max_length=40),
        size=20,
        max_length=(20 * 41),
    )


class ActionKor(models.Model):
    action_name = models.CharField(max_length=20, db_index=True)
    intent = models.ManyToManyField(IntentKor, related_name="related_action")
    action_type = models.CharField(
        max_length=10, choices=RET_CHOICES, default="text"
    )
    text_value = models.TextField(blank=True)
    image_value = models.TextField(blank=True)


class StoryKor(models.Model):
    story_name = models.CharField(max_length=40, db_index=True)
    story_path_1 = models.ManyToManyField(IntentKor, related_name="first_path")
    story_path_2 = models.ManyToManyField(IntentKor, related_name="second_path")


class EntityKor(models.Model):
    entity_name = models.CharField(max_length=20, db_index=True)
    intent = models.OneToOneField(
        IntentKor, related_name="related_entity", on_delete=models.CASCADE
    )
    entity_tokens = ListCharField(
        base_field=models.CharField(max_length=40),
        size=20,
        max_length=(20 * 41),
    )


class SlotKor(models.Model):
    slot_name = models.CharField(max_length=20, db_index=True)
    slot_type = models.CharField(
        max_length=20, choices=SLOT_CHOICES, default="text"
    )
