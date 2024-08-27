from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"), # url to create a user, route to the CreateUserView
    path("api/token/", TokenObtainPairView.as_view(), name="token"), # url to obtain a token
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"), # url to refresh a token
    path("api-auth/", include("rest_framework.urls")), # url to access the rest framework
    path("api/", include("api.urls")), # url to access the api
]
