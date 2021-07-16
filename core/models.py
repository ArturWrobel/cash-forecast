from django.db import models
from django.contrib.auth.models import AbstractUser

USER_PERMISSIONS = [
   ( 'INPUT', "IN"),
   ( 'ANALYSIS', "AN"),
]

class User(AbstractUser):
    is_member = models.BooleanField(default=False)
    permissions = models.CharField(max_length=10, choices=USER_PERMISSIONS, default = 'INPUT')


class File(models.Model):
    file = models.FileField()

    def __str__(self):
        return self.file.name
