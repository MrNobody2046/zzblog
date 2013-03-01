#-*- coding: utf-8 -*-
from django.conf.urls import * 
from blog.views import *
from django.contrib import admin
from blog.views import *
# Uncomment the next two lines to enable the admin:
#from django.contrib import *
admin.autodiscover()
from django.conf import settings

urlpatterns = patterns('',

    (r'^$',index),
    #(r'^static/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.STATIC_PATH}),
    (r'^index/$',index),
    (r'^blog/$', frontpage),
    (r'^blog/(\d{4,4})/(\d{2,2})/([\w\-]+)/$', singlepost),
    (r'^blog/(\d{4,4})/(\d{2,2})/([\w\-]+)/comment/$', postcomment),
    (r'^blog/(\d{4,4})/$', yearview),
    (r'^blog/(\d{4,4})/(\d{2,2})/$', monthview),
    (r'^blog/tag/([\w\-]+)/$', tagview),
    (r'^blog/login/$',login),
    (r'^blog/logout/$',logout), 
    (r'^blog/register/$',register),
    (r'^blog/search/$',search),   
    (r'^admin/',include(admin.site.urls)),

#    ('^index/$',frontpage),
#    (r'^about/$',direct_to_template,{'template': 'about.html'})
    # Examples:
    #     (r'^$', 'pyz.views.home', name='home'),
    #     (r'^pyz/', include('pyz.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    #     (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
)
