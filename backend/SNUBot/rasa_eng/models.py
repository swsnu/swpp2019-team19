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


class IntentEng(models.Model):
    intent_name = models.CharField(max_length=20, db_index=True)
    intent_tokens = ListCharField(
        base_field=models.CharField(max_length=40),
        size=20,
        max_length=(20 * 41),
    )


class ActionEng(models.Model):
    action_name = models.CharField(max_length=20, db_index=True)
    intent = models.ManyToManyField(IntentEng, related_name="related_action")
    action_type = models.CharField(
        max_length=10, choices=RET_CHOICES, default="text"
    )
    text_value = models.TextField(blank=True)
    image_value = models.TextField(blank=True)
    # image_value = models.URLField(blank=True)
    # image_value = models.ImageField(blank=True)


class StoryEng(models.Model):
    story_name = models.CharField(max_length=40, db_index=True)
    story_path_1 = models.ManyToManyField(IntentEng, related_name="first_path")
    story_path_2 = models.ManyToManyField(IntentEng, related_name="second_path")


class EntityEng(models.Model):
    entity_name = models.CharField(max_length=20, db_index=True)
    intent = models.OneToOneField(
        IntentEng, related_name="related_entity", on_delete=models.CASCADE
    )
    entity_tokens = ListCharField(
        base_field=models.CharField(max_length=40),
        size=20,
        max_length=(20 * 41),
    )


class SlotEng(models.Model):
    slot_name = models.CharField(max_length=20, db_index=True)
    slot_type = models.CharField(
        max_length=20, choices=SLOT_CHOICES, default="text"
    )
