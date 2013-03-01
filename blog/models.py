#-*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.hashers import (check_password, make_password, is_password_usable, UNUSABLE_PASSWORD)
import re
# Create your models here.

class Post(models.Model):
    author = models.ForeignKey(User)
    content = models.TextField(max_length=100000)
    title = models.CharField(max_length=100)
    date_created = models.DateTimeField(default=timezone.now)
    date_modified = models.DateTimeField(auto_now=True)
    tags = models.CharField(max_length=200)
    slug = models.SlugField(max_length=100)
    def __unicode__(self):
        return self.title
    class Meta:
        ordering = ["-date_created"]
#        ordering = ["-id"]
    def get_absolute_url(self):
        return "/blog/%d/%02d/%s/" % (self.date_created.year,
                                      self.date_created.month,
                                      self.slug)
    def get_tag_list(self):
        return re.split(" ", self.tags)
        
class Comment(models.Model):
    obj = models.ForeignKey(Post)
    date_created = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=20000)
    email = models.EmailField(_("user's email address"), blank=True)
    homepage = models.URLField(_("user's URL"), blank=True)
    name = models.CharField(max_length=30,)
    def __unicode__(self):
        return self.title
    

from django import forms 

class commentForm(forms.Form):
    user = forms.CharField(required=False)
    name = forms.CharField(required=True)
    email = forms.EmailField(required=True)
    content = forms.CharField(required=True)
    homepage = forms.URLField(required=False)
