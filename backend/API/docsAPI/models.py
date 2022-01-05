from django.db import models

# Create your models here.
class Services(models.Model):
    title = models.CharField(max_length=100)
    pets_name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class MSDS(models.Model):
    services = models.ForeignKey(Services, null=True, on_delete=models.CASCADE, related_name='msds')
    name = models.CharField(max_length=200)
    file = models.FileField(max_length=None, upload_to='media/', blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class TC(models.Model):
    service = models.ForeignKey(Services, null=True, on_delete=models.CASCADE, related_name='tc')
    name = models.CharField(max_length=200)
    file = models.FileField(max_length=None)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class SOP(models.Model):
    service = models.ForeignKey(Services, null=True, on_delete=models.CASCADE, related_name='sop')
    name = models.CharField(max_length=200)
    file = models.FileField(max_length=None)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name