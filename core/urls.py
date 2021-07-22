from django.urls import path
from .views import (
    ChangeEmailView,
    UserEmailView,
    ChangePasswordView,
    APIKeyView,
    FileUploadView,
    ReadExcell,
    ForecastAPI,
    PermissionsView,
    DrillingAPI
)

app_name = "core"

urlpatterns = [
    path("email/", UserEmailView.as_view(), name="email"),
    path("change-email/", ChangeEmailView.as_view(), name="change-email"),
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
    path("api-key/", APIKeyView.as_view(), name="api-key"),
    path('demo/', FileUploadView.as_view(), name='file-upload'),
    path('data/', ReadExcell.as_view(), name='excel-reader'),
    path('forecast/', ForecastAPI.as_view(), name='forecast'),
    path('permit/', PermissionsView.as_view(), name='permit'),
    path('version_changes/', DrillingAPI.as_view(), name='versions'),
]
