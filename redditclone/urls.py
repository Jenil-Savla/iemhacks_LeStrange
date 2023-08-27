from django.urls import path
from .views import RedditClone

urlpatterns = [
    path('', RedditClone.as_view()),
]