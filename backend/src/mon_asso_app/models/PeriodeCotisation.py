from django.db import models

class PeriodeCotisation(models.Model):
    titre = models.CharField(max_length=255)
    description = models.TextField()    
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.libelle