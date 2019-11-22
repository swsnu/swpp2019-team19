from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):
    def create_user(self, username, email, nickname, password):
        """
        주어진 이메일, 닉네임, 비밀번호 등 개인정보로 User 인스턴스 생성
        """
        if not username:
            raise ValueError(_("Users must have an username"))
        if not email:
            raise ValueError(_("Users must have an email address"))

        user = self.model(
            username=username, email=self.normalize_email(email), nickname=nickname,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, nickname, password):
        """
        주어진 이메일, 닉네임, 비밀번호 등 개인정보로 User 인스턴스 생성
        단, 최상위 사용자이므로 권한을 부여한다. 
        """
        user = self.create_user(
            username=username, email=email, password=password, nickname=nickname,
        )

        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(verbose_name=_("Username"), max_length=30, unique=True,)
    email = models.EmailField(
        verbose_name=_("Email address"), max_length=255, unique=True,
    )
    nickname = models.CharField(verbose_name=_("Nickname"), max_length=30, unique=True)
    is_active = models.BooleanField(verbose_name=_("Is active"), default=True)
    date_joined = models.DateTimeField(
        verbose_name=_("Date joined"), default=timezone.now
    )

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "nickname"]

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        ordering = ("-date_joined",)

    def __str__(self):
        return self.nickname

    def get_full_name(self):
        return self.nickname

    def get_short_name(self):
        return self.nickname

    def get_user_name(self):
        return self.username

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All superusers are staff
        return self.is_superuser

    get_full_name.short_description = _("Full name")
