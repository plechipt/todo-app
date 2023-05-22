from django.db import models
from django.contrib.auth.models import User, AbstractUser


class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    session_id = models.CharField(unique=True, max_length=100)
 
    def __str__(self):
        if self.username:
            return self.username
        else:
            return self.session_id