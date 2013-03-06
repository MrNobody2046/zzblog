from django.contrib import admin
from blog.models import Post,Comment
"""class AuthorAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email')
    search_fields = ('first_name', 'last_name','email')

class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'publisher', 'publication_date')
    list_filter = ('publication_date','title')
    date_hierarchy = 'publication_date'
    ordering = ('-publication_date',)
    fields = ('title', 'authors', 'publisher', 'publication_date')
    filter_horizontal = ('authors',)

admin.site.register(Publisher)
admin.site.register(Author,AuthorAdmin)
admin.site.register(Book,BookAdmin)
"""
class CommentAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'name')
    list_filter = ('name','title')
    ordering = ('date_created',)
    fields = ('title', 'content', 'name', 'obj')
  
admin.site.register(Comment,CommentAdmin)
admin.site.register(Post)



