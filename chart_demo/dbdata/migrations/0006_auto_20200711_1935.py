# Generated by Django 3.0.8 on 2020-07-11 11:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dbdata', '0005_auto_20200711_1925'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chartinfo',
            name='AB',
            field=models.TextField(blank=True, null=True, verbose_name='AB：专利摘要'),
        ),
        migrations.AlterField(
            model_name='chartinfo',
            name='AD',
            field=models.CharField(blank=True, max_length=1000, null=True, verbose_name='申请日'),
        ),
        migrations.AlterField(
            model_name='chartinfo',
            name='AN',
            field=models.CharField(blank=True, max_length=1000, null=True, verbose_name='AN：申请号'),
        ),
        migrations.AlterField(
            model_name='chartinfo',
            name='CLM',
            field=models.TextField(blank=True, null=True, verbose_name='CLM：专利权利要求'),
        ),
        migrations.AlterField(
            model_name='chartinfo',
            name='CTN',
            field=models.CharField(blank=True, max_length=1000, null=True, verbose_name='CTN：引证专利号'),
        ),
        migrations.AlterField(
            model_name='chartinfo',
            name='IPC',
            field=models.CharField(blank=True, max_length=1000, null=True, verbose_name='IPC：国际专利分类号'),
        ),
        migrations.AlterField(
            model_name='chartinfo',
            name='LS',
            field=models.CharField(blank=True, max_length=1000, null=True, verbose_name='法律状态'),
        ),
        migrations.AlterField(
            model_name='chartinfo',
            name='LSE',
            field=models.CharField(blank=True, max_length=1000, null=True, verbose_name='LSE：历史法律事件'),
        ),
        migrations.AlterField(
            model_name='chartinfo',
            name='PA',
            field=models.CharField(blank=True, max_length=1000, null=True, verbose_name='申请人'),
        ),
        migrations.AlterField(
            model_name='chartinfo',
            name='PD',
            field=models.CharField(blank=True, max_length=1000, null=True, verbose_name='公开日'),
        ),
        migrations.AlterField(
            model_name='chartinfo',
            name='PN',
            field=models.CharField(blank=True, max_length=1000, null=True, verbose_name='PN：公开号'),
        ),
        migrations.AlterField(
            model_name='chartinfo',
            name='TI',
            field=models.CharField(blank=True, max_length=1000, null=True, verbose_name='标题'),
        ),
        migrations.AlterField(
            model_name='chartinfo',
            name='b_id',
            field=models.CharField(blank=True, max_length=1000, null=True, verbose_name='专利的唯一标识'),
        ),
    ]