# Generated by Django 3.2.9 on 2021-12-23 07:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('docsAPI', '0005_tc_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='msds',
            name='file',
            field=models.FileField(blank=True, upload_to='raw/'),
        ),
        migrations.AlterField(
            model_name='tc',
            name='service',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tc', to='docsAPI.services'),
        ),
    ]
