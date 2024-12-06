import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TITLE_MAX = 100;
const BODY_MAX = 1000;

const getTagColor = (tag) => {
  const hash = tag.toLowerCase().split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 40%, 85%)`;
};

export default function UploadPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tags, setTags] = useState([]);

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  const title = watch("title");
  const body = watch("body");

  const onSubmit = async (data) => {
    if (!user) {
      console.error("No user logged in");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", data.body);
    formData.append("userID", user.userId);
    formData.append("tags", JSON.stringify(tags));
    if (data.resume[0]) {
      formData.append("file", data.resume[0]);
    }

    try {
      console.log("Uploading post with userID:", user.userId);
      const response = await axios.post(`${API_BASE_URL}/posts`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        console.log("Post created successfully:", response.data);
        reset();
        navigate("/posts");
      }
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-1/2 mx-auto mt-4 border-2 p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Create Post</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <p
                className={`text-sm ${
                  errors.title ? "text-red-500" : "text-gray-500"
                }`}
              >
                {title?.length || 0}/{TITLE_MAX} characters
              </p>
            </div>
            <Input
              id="title"
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: TITLE_MAX,
                  message: `Title cannot exceed ${TITLE_MAX} characters`,
                },
              })}
              placeholder="Enter your post title"
              className={errors.title && "border-red-500"}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="body">Body</Label>
              <p
                className={`text-sm ${
                  errors.body ? "text-red-500" : "text-gray-500"
                }`}
              >
                {body?.length || 0}/{BODY_MAX} characters
              </p>
            </div>
            <Textarea
              id="body"
              {...register("body", {
                maxLength: {
                  value: BODY_MAX,
                  message: `Body cannot exceed ${BODY_MAX} characters`,
                },
              })}
              placeholder="Enter your post body"
              className={`h-48 ${errors.body && "border-red-500"}`}
            />
            {errors.body && (
              <p className="mt-1 text-sm text-red-500">{errors.body.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="resume">
              Resume <span className={body ? "hidden" : "text-red-500"}>*</span>
            </Label>
            <Input
              type="file"
              id="resume"
              {...register("resume", {
                required: {
                  value: !body,
                  message: "Resume is required if body is empty",
                },
              })}
              className={errors.resume && "border-red-500"}
            />
            {errors.resume && (
              <p className="mt-1 text-sm text-red-500">
                {errors.resume.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              {...register("tags")}
              placeholder="Type a tag and press Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const newTag = e.target.value.trim();
                  if (newTag && !tags.includes(newTag)) {
                    setTags([...tags, newTag]);
                    setValue("tags", "");
                  }
                }
              }}
            />
            {tags.length > 0 && (
              <div className="flex gap-2 mt-2">
                {tags.map((tag, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                    className="px-3 py-1 rounded-full text-sm text-gray-700"
                    style={{ backgroundColor: getTagColor(tag) }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button type="submit">Create Post</Button>
        </form>
      </div>
    </div>
  );
}
