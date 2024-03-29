import React, { useState } from "react";
import TopHeader from "../ui/TopHeader";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProfile } from "../services/apiUsers";
import toast from "react-hot-toast";
import useCurrentUser from "../hooks/useCurrentUser";
import useEditProfile from "../features/profile/useEditProfile";

const EditProfile = () => {
  const { currentUser } = useCurrentUser();

  const queryClient = useQueryClient();

  const [file, setFile] = useState(null);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: currentUser?.username,
      bio: currentUser?.bio,
      first_name: currentUser?.first_name,
      last_name: currentUser?.last_name,
    },
  });

  const { editProfile } = useEditProfile();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    editProfile({ ...data, avatar: file });
    navigate("/profile/" + data.username);
  };

  return (
    <div className="flex">
      <div className="hidden h-screen border-r border-[#1f1e1e] px-12 pt-12 sm:block">
        <h2 className="text-2xl font-semibold ">Settings</h2>

        <ul className="mt-8 flex flex-col gap-4">
          <li className="text-lg">Edit Profile</li>
          <li className="text-lg">Change Password</li>
          <li className="text-lg">Your Activity</li>
        </ul>
      </div>
      <div className="flex flex-col xl:w-1/2 xl:pl-12 xl:pt-12">
        <TopHeader title="Edit Profile" />

        <form
          className="mt-12 flex h-full flex-col gap-4 px-4 py-4 sm:mt-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl tracking-wide">Edit Profile</h1>

          <div className="mt-10 flex flex-row items-center gap-4">
            <div className="h-10 w-10 rounded-[50%]">
              <img
                src={currentUser?.avatar}
                alt="profile"
                className="h-full w-full rounded-[50%]"
              />
            </div>
            <div className="flex flex-col font-medium">
              <h3 className="text-md">username</h3>

              <input
                type="file"
                id="file"
                name="avatar"
                className="rounded-lg text-sm text-blue-500"
                placeholder="Change profile photo"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="firstName" className="text-md font-medium">
                First Name
              </label>

              <input
                type="text"
                id="firstName"
                className="mt-2 w-full rounded-sm bg-gray-700 px-4 py-2 outline-none"
                placeholder="First Name"
                {...register("first_name")}
              />
            </div>

            <div>
              <label htmlFor="lastName" className="text-md font-medium">
                Last Name
              </label>

              <input
                type="text"
                id="lastName"
                className="mt-2 w-full rounded-sm bg-gray-700 px-4 py-2 outline-none"
                placeholder="Last Name"
                {...register("last_name")}
              />
            </div>

            <div>
              <label htmlFor="name" className="text-md font-medium">
                Username
              </label>

              <input
                type="text"
                id="name"
                className="mt-2 w-full rounded-sm bg-gray-700 px-4 py-2 outline-none"
                placeholder="Username"
                {...register("username")}
              />

              <p className="mt-1 text-xs text-gray-400">Change your username</p>
            </div>
            <div>
              <label htmlFor="name" className="text-md font-medium">
                Bio
              </label>

              <textarea
                id="name"
                className="mt-2 w-full rounded-sm bg-gray-700 px-4 py-2 outline-none"
                placeholder="Bio"
                {...register("bio")}
              />

              <p className="mt-1 text-xs text-gray-400">
                Add a bio to your profile
              </p>
            </div>
          </div>

          <button className="mt-10 w-fit rounded-lg bg-blue-500 px-4 py-2 text-gray-50">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
