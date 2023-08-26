from .views import ForcastPred
from django.urls import path

urlpatterns = [
    path('forcast-pred/', ForcastPred.as_view()),
]
