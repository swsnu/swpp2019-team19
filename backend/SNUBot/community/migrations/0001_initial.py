# Generated by Django 2.2.6 on 2019-10-24 04:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=64)),
                ('content', models.TextField()),
                ('tag', models.CharField(choices=[('normal', 'Normal'), ('working', 'Working'), ('done', 'Done'), ('rejected', 'Rejected')], default='normal', max_length=10)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='author_name', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('like', models.IntegerField(default=0)),
                ('dislike', models.IntegerField(default=0)),
                ('article', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='community.Article')),
                ('dislike_voter', models.ManyToManyField(related_name='disliker', to=settings.AUTH_USER_MODEL)),
                ('like_voter', models.ManyToManyField(related_name='liker', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
