from django.db.models import Count
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .serializer import ChartInfoSerializer
from .models import ChartInfo


class ChartDBViewSet(ModelViewSet):
    serializer_class = ChartInfoSerializer
    queryset = ChartInfo.objects.all()


class PieChartView(APIView):
    def get(self, request):
        data = []
        pa_list = ChartInfo.objects.values("PA").annotate(value=Count("PA")).order_by("-value")
        for i in pa_list:
            pa = dict()
            pa['value'] = i.get('value')
            pa['name'] = i.get('PA')
            data.append(pa)
        print(data)
        return Response(data)


class PunchView(APIView):
    def get(self, request):
        years = ChartInfo.objects.values("AD").annotate(value=Count('AD')).order_by("AD")
        print(years)
        year_list = list()
        year_mouth_list = list()
        for i in years:
            year_list.append(i.get("AD")[0:4])
            year_mouth_list.append(i.get("AD")[0:6])
        print(list(set(year_list)).sort())
        print(year_mouth_list)
        for i in 
