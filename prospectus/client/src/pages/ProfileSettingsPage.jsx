import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import { ImageUp } from "lucide-react";

// these are based on twitters limits
const NAME_MAX = 50;
const USERNAME_MIN = 5;
const USERNAME_MAX = 15;
const BIO_MAX = 160;

export default function ProfileSettingsPage() {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "", // [User's previous name]
      username: "", // [User's previous username]
      bio: "", // [User's previous bio]
    },
  });

  const name = watch("name");
  const username = watch("username");
  const bio = watch("bio");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Navbar />
      <div className="w-1/2 mx-auto mt-4 border-2 p-4 rounded-lg">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-center">
            <Label htmlFor="avatar" className="cursor-pointer relative group">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" // [User's previous avatar]
                className="rounded-full w-48 h-48 group-hover:brightness-75"
              />
              <ImageUp
                size={48}
                color="#d6d6d6"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
              />
            </Label>
          </div>
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            id="avatar"
            {...register("avatar")}
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
              {...register("name", {
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
              className={errors.name && "border-red-500"}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
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
              {...register("username", {
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
              className={errors.username && "border-red-500"}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
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
              {...register("bio", {
                maxLength: {
                  value: BIO_MAX,
                  message: `Your bio cannot exceed ${BIO_MAX} characters`,
                },
              })}
              placeholder="Tell us about yourself"
              className={`h-48 ${errors.bio && "border-red-500"}`}
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </div>
    </div>
  );
}
