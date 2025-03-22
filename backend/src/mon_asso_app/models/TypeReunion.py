from django.db import models

class TypeReunion(models.Model):
    nom = models.CharField(max_length=100)
    periodicite = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)
    
    def __str__(self):
        return self.nom