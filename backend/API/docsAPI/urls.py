from django.urls import path
from.views import ServiceList, ServiceDetail, MyTokenObtainPairView, MailSend


urlpatterns = [
     path('login/', MyTokenObtainPairView.as_view()),
     path('services/', ServiceList.as_view()),
     path('services/<int:pk>/', ServiceDetail.as_view()),
     path('email/', MailSend.as_view() )
]