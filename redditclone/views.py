from django.shortcuts import render
from .models import Post
from rest_framework.response import Response
from .serializers import PostSerializer
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin

# Create your views here.
class RedditClone(GenericAPIView, ListModelMixin, CreateModelMixin):
    serializer_class = PostSerializer
    queryset = Post.objects
    def get(self, request):
        return self.list(request)
    def post(self, request):
        return self.create(request)