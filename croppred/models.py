from django.db import models

# Create your models here.
class Imagy(models.Model):
    image = models.ImageField(upload_to='images')