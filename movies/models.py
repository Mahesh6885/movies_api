from django.db import models
  
class Movie(models.Model):
    title=models.CharField(max_length=200)
    genre=models.CharField(max_length=200)
    year=models.IntegerField()
    rating=models.FloatField(default=0.0)
    description=models.TextField(max_length=500)
    image_url=models.URLField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.title