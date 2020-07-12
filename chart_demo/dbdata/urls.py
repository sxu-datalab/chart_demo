from django.contrib import admin
from django.urls import re_path
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    re_path("^pie/$", views.PieChartView.as_view()),
    re_path("^punch/$", views.PunchView.as_view()),
]
route = DefaultRouter()
route.register("chartdata", views.ChartDBViewSet)
urlpatterns += route.urls
