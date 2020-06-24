from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email')

# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True }}

    def create(self, validated_data):
      user = get_user_model().objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

      return user

# Login serializer
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError('Incorrect credentials')
