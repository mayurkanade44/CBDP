# Generated by Django 3.2.9 on 2021-12-04 05:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docsAPI', '0004_auto_20211119_2145'),
    ]

    operations = [
        migrations.AddField(
            model_name='tc',
            name='file',
            field=models.FileField(default=1, upload_to=''),
            preserve_default=False,
        ),
    ]