import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "./Navbar";
import { ImageUp } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";

// these are based on twitters limits
const NAME_MAX = 50;
const USERNAME_MIN = 5;
const USERNAME_MAX = 15;
const BIO_MAX = 160;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 128;

export default function ProfileSettingsPage() {
  const { user } = useAuth();
  const {
    register: registerProfile,
    formState: { errors: profileErrors },
    watch: watchProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "", // [User's previous name]
      username: "", // [User's previous username]
      bio: "", // [User's previous bio]
      email: "", // [User's previous email]
      university: "", // [User's previous university]
    },
  });

  const {
    register: registerPassword,
    formState: { errors: passwordErrors },
    watch: watchPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
  } = useForm({
    mode: "onBlur",
  });

  const name = watchProfile("name");
  const username = watchProfile("username");
  const bio = watchProfile("bio");
  const currentPassword = watchPassword("currentPassword");
  const newPassword = watchPassword("newPassword");
  const confirmPassword = watchPassword("confirmPassword");

  const onProfileSubmit = async (data) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/users/${user.userId}`,
        data
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  const onPasswordSubmit = async (data) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/users/${user.userId}/password`,
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully");
      }
    } catch (error) {
      toast.error("Error updating password");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-1/2 mx-auto mt-4 border-2 p-4 rounded-lg">
        <Tabs
          defaultValue="profile"
          onValueChange={(value) => {
            if (value === "profile") resetProfile();
            else resetPassword();
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <form
              onSubmit={handleProfileSubmit(onProfileSubmit)}
              className="space-y-4"
            >
              <div className="flex justify-center">
                <Label
                  htmlFor="avatar"
                  className="relative group rounded-full cursor-pointer"
                >
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" // [User's previous avatar]
                    className="rounded-full w-48 h-48 group-hover:brightness-75"
                  />
                  <ImageUp
                    size={48}
                    color="#d6d6d6"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                  />
                </Label>
              </div>
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                id="avatar"
                {...registerProfile("avatar")}
              />
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="name">Name</Label>
                  <p className="text-sm text-gray-500">
                    {name?.length || 0}/{NAME_MAX} characters
                  </p>
                </div>
                <Input
                  id="name"
                  {...registerProfile("name", {
                    required: {
                      value: true,
                      message: "Your name is required",
                    },
                    maxLength: {
                      value: NAME_MAX,
                      message: `Your name cannot exceed ${NAME_MAX} characters`,
                    },
                  })}
                  placeholder="Your name"
                  className={profileErrors.name && "border-red-500"}
                />
                {profileErrors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {profileErrors.name.message}
                  </p>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="username">Username</Label>
                  <p className="text-sm text-gray-500">
                    {username?.length || 0}/{USERNAME_MAX} characters
                  </p>
                </div>
                <Input
                  id="username"
                  {...registerProfile("username", {
                    required: {
                      value: true,
                      message: "Your username is required",
                    },
                    minLength: {
                      value: USERNAME_MIN,
                      message: `Your username must be at least ${USERNAME_MIN} characters`,
                    },
                    maxLength: {
                      value: USERNAME_MAX,
                      message: `Your username cannot exceed ${USERNAME_MAX} characters`,
                    },
                  })}
                  placeholder="Your username"
                  className={profileErrors.username && "border-red-500"}
                />
                {profileErrors.username && (
                  <p className="mt-1 text-sm text-red-500">
                    {profileErrors.username.message}
                  </p>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="bio">Bio</Label>
                  <p className="text-sm text-gray-500">
                    {bio?.length || 0}/{BIO_MAX} characters
                  </p>
                </div>
                <Textarea
                  id="bio"
                  {...registerProfile("bio", {
                    maxLength: {
                      value: BIO_MAX,
                      message: `Your bio cannot exceed ${BIO_MAX} characters`,
                    },
                  })}
                  placeholder="Tell us about yourself"
                  className={`h-48 ${profileErrors.bio && "border-red-500"}`}
                />
                {profileErrors.bio && (
                  <p className="mt-1 text-sm text-red-500">
                    {profileErrors.bio.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  {...registerProfile("email", {
                    required: {
                      value: true,
                      message: "Your email is required",
                    },
                  })}
                  placeholder="Your email"
                  className={profileErrors.email && "border-red-500"}
                />
                {profileErrors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {profileErrors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  {...registerProfile("university", {
                    required: {
                      value: true,
                      message: "Your university is required",
                    },
                  })}
                  placeholder="Your university"
                  className={profileErrors.university && "border-red-500"}
                />
                {profileErrors.university && (
                  <p className="mt-1 text-sm text-red-500">
                    {profileErrors.university.message}
                  </p>
                )}
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </TabsContent>
          <TabsContent value="password">
            <h1 className="text-2xl font-bold mb-4">Edit Password</h1>
            <form
              onSubmit={handlePasswordSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <p className="text-sm text-gray-500">
                    {currentPassword?.length || 0}/{PASSWORD_MAX} characters
                  </p>
                </div>
                <Input
                  type="password"
                  id="currentPassword"
                  {...registerPassword("currentPassword", {
                    required: {
                      value: true,
                      message: "Your current password is required",
                    },
                    minLength: {
                      value: PASSWORD_MIN,
                      message: `Your current password must be at least ${PASSWORD_MIN} characters`,
                    },
                    maxLength: {
                      value: PASSWORD_MAX,
                      message: `Your current password cannot exceed ${PASSWORD_MAX} characters`,
                    },
                  })}
                  placeholder="Your current password"
                  className={passwordErrors.currentPassword && "border-red-500"}
                />
                {passwordErrors.currentPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {passwordErrors.currentPassword.message}
                  </p>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="newPassword">New Password</Label>
                  <p className="text-sm text-gray-500">
                    {newPassword?.length || 0}/{PASSWORD_MAX} characters
                  </p>
                </div>
                <Input
                  type="password"
                  id="newPassword"
                  {...registerPassword("newPassword", {
                    required: {
                      value: true,
                      message: "Your new password is required",
                    },
                    minLength: {
                      value: PASSWORD_MIN,
                      message: `Your new password must be at least ${PASSWORD_MIN} characters`,
                    },
                    maxLength: {
                      value: PASSWORD_MAX,
                      message: `Your new password cannot exceed ${PASSWORD_MAX} characters`,
                    },
                  })}
                  placeholder="Your new password"
                  className={passwordErrors.newPassword && "border-red-500"}
                />
                {passwordErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {passwordErrors.newPassword.message}
                  </p>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <p className="text-sm text-gray-500">
                    {confirmPassword?.length || 0}/{PASSWORD_MAX} characters
                  </p>
                </div>
                <Input
                  type="password"
                  id="confirmPassword"
                  {...registerPassword("confirmPassword", {
                    required: {
                      value: true,
                      message: "Your confirmed password is required",
                    },
                    minLength: {
                      value: PASSWORD_MIN,
                      message: `Your confirmed password must be at least ${PASSWORD_MIN} characters`,
                    },
                    maxLength: {
                      value: PASSWORD_MAX,
                      message: `Your confirmed password cannot exceed ${PASSWORD_MAX} characters`,
                    },
                    validate: (confirmPassword) => {
                      if (confirmPassword !== newPassword) {
                        return "Your new password and confirmed password do not match";
                      }
                      return true;
                    },
                  })}
                  placeholder="Confirm your new password"
                  className={passwordErrors.confirmPassword && "border-red-500"}
                />
                {passwordErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {passwordErrors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
