from django.contrib import admin
from .models import IntentKor, ActionKor, StoryKor, EntityKor, SlotKor

# Register your models here.
admin.site.register(IntentKor)
admin.site.register(ActionKor)
admin.site.register(StoryKor)
admin.site.register(EntityKor)
admin.site.register(SlotKor)
