#-*- coding: utf-8 -*-
from django.contrib import auth
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.template import Context
from blog.models import commentForm
from datetime import datetime
from django.template import Template

from blog.models import Post
from blog.models import Comment
from django.contrib.auth.models import User,AnonymousUser

import re


from django.template import loader, RequestContext




 
def custom_pro(request):
    posts = Post.objects.all()
    tag_data = create_tag_data(posts)
    archive_data = create_archive_data(posts)
    form = commentForm()
    user = request.user
    return {   'version': '1.0',
             'post_list': posts,
            'tag_counts': tag_data,
            'archive_counts': archive_data,
                 'form':form,
                 'user':user,
            }
            


import os
import re
from random import shuffle

#图片文件夹
image_dirs = "/home/zxc/www/pyz/medias/images/"
def index(request):
    pagedata = {}
    filelist = []
    for root,dirs,files in os.walk(image_dirs):
        for file in files:
            pattern = re.compile('.*png$|.*jpg$|.*gif$',re.I)
            res = pattern.match(file)
            if res is not None:
                file_ = "/%s" %file
                path = "medias/images" + file_
                filelist.append(path)
    shuffle(filelist) #随机化
    retlist = filelist[0:4]
    pagedata.update({'imagelist': retlist})
    t = Template('{% for image in imagelist %}{{ image }}{% endfor %}')
    c = Context({'imagelist': filelist})
    html = t.render(c)
#    return HttpResponse(html)
    return render_to_response('index',pagedata)

 
def login(request):
    posts, pagedata = init()
    if request.method != 'POST':
        return render_to_response('login',pagedata)
    else:
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = auth.authenticate(username=username, password=password)
        if user is not None and user.is_active:
            auth.login(request, user)
            pagedata.update({'user':user})
            return HttpResponseRedirect("/blog",)
        else:
            return HttpResponse("Your username and password didn't match.")
            
def logout(request):
    auth.logout(request)
    return HttpResponseRedirect("/blog/")

from django import forms
from django.contrib.auth.forms import UserCreationForm

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            return HttpResponseRedirect("/blog/")
    else:
        form = UserCreationForm()
    pagedata = RequestContext(request)
    pagedata.update({'form': form,})
    return render_to_response("register",pagedata)


    
def frontpage(request):
    pagedata = RequestContext(request)
    pagedata.update({'subtitle': '',})
    return render_to_response('list-all',pagedata)
    

from django.contrib.auth.decorators import login_required
#@login_required(login_url="/blog/login/")

def singlepost(request, year, month, slug2):
    pagedata = RequestContext(request)
    posts = pagedata['post_list']
    post = posts.get(date_created__year=year,
                            date_created__month=int(month),
                            slug=slug2,)
    comments = post.comment_set.all().order_by('-date_created')
    pagedata.update({'post': post,'comments':comments})
    return render_to_response('single-post', pagedata)

def postcomment(request,year,month,slug2):
    pagedata = RequestContext(request)
    posts = pagedata['post_list']
    post = posts.get(date_created__year=year,date_created__month=int(month),slug=slug2,)
    if request.method == 'POST':
        homepage = request.POST['homepage']
        content = request.POST['content']
        name = request.POST['name']
        email = request.POST['email']
        c = Comment(obj=post,name=name,email=email,homepage=homepage,content=content,)
        c.save()

    return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))

def yearview(request, year):
    pagedata = RequestContext(request)
    posts = pagedata['post_list']
    posts = posts.filter(date_created__year=year)
    pagedata.update({'post_list': posts,'subtitle': 'Posts for %s' % year})
    return render_to_response('list-page', pagedata)




#MONTH_NAMES = ('', 'January', 'Feburary', 'March', 'April', 'May', 'June', 'July',
#              'August', 'September', 'October', 'November', 'December')
               

MONTH_NAMES = ('', '一月', '二月', '三月', '四月', '五月', '六月', '七月',
               '八月', '九月', '十月', '十一月', '十二月')

def monthview(request, year, month):
    pagedata = RequestContext(request)
    posts = pagedata['post_list']
    posts = posts.filter(date_created__year=year)
    posts = posts.filter(date_created__month=int(month))
    pagedata.update({'post_list': posts,
                     'subtitle': 'Posts for %s %s' % (MONTH_NAMES[int(month)], year),})
    return render_to_response('list-page', pagedata)

def tagview(request, tag):
    pagedata = RequestContext(request)
    allposts = pagedata['post_list']
    posts = []
    for post in allposts:
        tags = re.split(' ', post.tags)
        if tag in tags:
            posts.append(post)
    pagedata.update({'post_list': posts,
                     'subtitle': "Posts tagged '%s'" % tag,})
    return render_to_response('list-page', pagedata)



def search(request):
    pagedata = RequestContext(request)
    posts = pagedata['post_list']
    keywords = request.POST['keyword']
    posts = Post.objects.filter(content__icontains=keywords)
    pagedata.update({'post_list': posts})
    return render_to_response('list-page', pagedata)
        
def init():
    posts = Post.objects.all()
    tag_data = create_tag_data(posts)
    archive_data = create_archive_data(posts)
    form = commentForm()
    pagedata = {'version': '1.0',
                'post_list': posts,
                'tag_counts': tag_data,
                'archive_counts': archive_data,
                 'form':form}
    return posts, pagedata

#

def create_archive_data(posts):
    archive_data = []
    count = {}
    mcount = {}
    for post in posts:
        year = post.date_created.year
        month = post.date_created.month
        if year not in count:
            count[year] = 1
            mcount[year] = {}
        else:
            count[year] += 1
        if month not in mcount[year]:
            mcount[year][month] = 1
        else:
            mcount[year][month] += 1
    for year in sorted(count.iterkeys(), reverse=True):
        archive_data.append({'isyear': True,
                             'year': year, 
                             'count': count[year],})
        for month in sorted(mcount[year].iterkeys(), reverse=True):
            archive_data.append({'isyear': False,
                                 'yearmonth': '%d/%02d' % (year, month),
                                 'monthname': MONTH_NAMES[month], 
                                 'count': mcount[year][month],})
    return archive_data

# 根据post创建标签

def create_tag_data(posts):
    tag_data = []
    count = {}
    for post in posts:
        tags = re.split(" ", post.tags) #以后用任意空字符匹配
        for tag in tags:
            if tag not in count:
                count[tag] = 1
            else:
                count[tag] += 1
    for tag, count in sorted(count.iteritems(), key=lambda(k, v): (v, k), reverse=True):
        tag_data.append({'tag': tag,
                         'count': count,})
    return tag_data
    



