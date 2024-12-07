from django.contrib import admin
from .models import Post,PostMedia, Likes,Comments

# Register your models here.
admin.site.register(Post)
admin.site.register(PostMedia)
admin.site.register(Likes)
admin.site.register(Comments)

