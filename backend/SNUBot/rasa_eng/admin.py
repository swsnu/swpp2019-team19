from django.contrib import admin
from .models import IntentEng, ActionEng, StoryEng, EntityEng, SlotEng

# Register your models here.
admin.site.register(IntentEng)
admin.site.register(ActionEng)
admin.site.register(StoryEng)
admin.site.register(EntityEng)
admin.site.register(SlotEng)
