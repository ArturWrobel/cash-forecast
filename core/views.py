import datetime
from django.conf import settings
from django.contrib.auth import get_user_model, authenticate
from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
import pandas as pd
import json
from .serializers import (
    ChangeEmailSerializer,
    ChangePasswordSerializer,
    TokenSerializer,
    FileSerializer,
)

User = get_user_model()


def get_user_from_token(request):
    key = request.META.get("HTTP_AUTHORIZATION").split(" ")[1]
    token = Token.objects.get(key=key)
    user = User.objects.get(id=token.user_id)
    return user


'''
User Attributes:
auth_token, date_joined, email, emailaddress, first_name, groups, id, is_active,
is_member, is_staff,is_superuser, last_login, last_name, logentry, permissions,
password, socialaccount, user_permissions, username
'''


class UserEmailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = get_user_from_token(request)
        obj = {"email": user.email}
        return Response(obj)


class PermissionsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = get_user_from_token(request)
        obj = {"permissions": user.permissions}
        return Response(obj)


class ChangeEmailView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = get_user_from_token(request)
        email_serializer = ChangeEmailSerializer(data=request.data)
        if email_serializer.is_valid():
            # print(email_serializer.data)
            email = email_serializer.data.get("email")
            confirm_email = email_serializer.data.get("confirm_email")
            if email == confirm_email:
                user.email = email
                user.save()
                return Response({"email": email}, status=HTTP_200_OK)
            return Response(
                {"message": "The emails did not match"}, status=HTTP_400_BAD_REQUEST
            )
        return Response(
            {"message": "Did not receive the correct data"}, status=HTTP_400_BAD_REQUEST
        )


class ChangePasswordView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = get_user_from_token(request)
        password_serializer = ChangePasswordSerializer(data=request.data)
        if password_serializer.is_valid():
            password = password_serializer.data.get("password")
            confirm_password = password_serializer.data.get("confirm_password")
            current_password = password_serializer.data.get("current_password")
            auth_user = authenticate(
                username=user.username, password=current_password)
            if auth_user is not None:
                if password == confirm_password:
                    auth_user.set_password(password)
                    auth_user.save()
                    return Response(status=HTTP_200_OK)
                else:
                    return Response(
                        {"message": "The passwords did not match"},
                        status=HTTP_400_BAD_REQUEST,
                    )
            return Response(
                {"message": "Incorrect user details"}, status=HTTP_400_BAD_REQUEST
            )
        return Response(
            {"message": "Did not receive the correct data"}, status=HTTP_400_BAD_REQUEST
        )


class APIKeyView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = get_user_from_token(request)
        token_qs = Token.objects.filter(user=user)
        if token_qs.exists():
            token_serializer = TokenSerializer(token_qs, many=True)
            try:
                return Response(token_serializer.data, status=HTTP_200_OK)
            except:
                return Response(
                    {"message": "Did not receive correct data"},
                    status=HTTP_400_BAD_REQUEST,
                )
        return Response({"message": "User does not exist"}, status=HTTP_400_BAD_REQUEST)


class FileUploadView(APIView):
    permission_classes = (AllowAny, )
    throttle_scope = 'demo'

    def post(self, request, *args, **kwargs):

        content_length = request.META.get('CONTENT_LENGTH')  # bytes
        if int(content_length) > 5000000:
            return Response({"message": "Image size is greater than 5MB"}, status=HTTP_400_BAD_REQUEST)

        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            image_path = file_serializer.data.get('file')
            recognition = "Working properly"
            print(file_serializer)
        return Response(recognition, status=HTTP_200_OK)


class ReadExcell(APIView):
    permission_classes = (AllowAny, )

    def get(self, request):
        df = pd.read_excel('media/capex.xlsx')
        df = df.head(5).to_json()
        df = json.loads(df)
        return Response(df)


class ForecastAPI(APIView):
    permission_classes = (AllowAny, )

    def get(self, request):
        df = pd.read_excel('media/bre1607.xlsm',
        sheet_name='wyk-for', skiprows=2, usecols='A:B, D')
        df = df.set_index('Unnamed: 3')
        # df = df.columns['inflows', 'outflows']
        df = df.rename(
            {'Unnamed: 0': 'Inflows', 'Unnamed: 1': 'Outflows'}, axis='columns')

        # df = df.to_json()
        df = df.head(5).to_json()
        df = json.loads(df)
        print(df)
        return Response(df)
