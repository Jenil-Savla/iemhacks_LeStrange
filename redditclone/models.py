from django.db import models

# Create your models here.
class Post(models.Model):
    text = models.CharField(max_length=100)
    image = models.ImageField(upload_to='post-image/')
    user = models.CharField(max_length=50)
    likes = models.BigIntegerField(default=0)
    shares = models.BigIntegerField(default=0)