from django.db import models

class Association(models.Model):
    nom = models.CharField(max_length=200)
    sigle = models.CharField(max_length=10)
    description = models.TextField()
    date_creation = models.DateField()
    #logo = models.ImageField(upload_to='associations/logos')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name