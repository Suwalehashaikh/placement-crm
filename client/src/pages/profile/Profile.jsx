import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
} from "../../services/profileService";
import toast from "react-hot-toast";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    profileImage: null,
  });

  const [preview, setPreview] =
    useState("");

  const [role, setRole] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {
      try {
        const res =
          await getProfile();

        const user = res.data;

        setFormData({
          name:
            user.name || "",
          phone:
            user.phone || "",
          profileImage: null,
        });

        setPreview(
          user.profileImage || ""
        );

        setEmail(
          user.email || ""
        );

        setRole(
          user.role || ""
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleChange = (e) => {
    const {
      name,
      value,
      files,
    } = e.target;

    if (
      name ===
      "profileImage"
    ) {
      setFormData({
        ...formData,
        profileImage:
          files[0],
      });

      setPreview(
        URL.createObjectURL(
          files[0]
        )
      );

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setSaving(true);

        await updateProfile(
          formData
        );

        toast.success(
          "Profile updated successfully"
        );

        fetchProfile();
      } catch (error) {
        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to update profile"
        );
      } finally {
        setSaving(false);
      }
    };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-8"
        >
          {/* Profile Image */}

          <div className="flex flex-col items-center">
            <img
              src={
                preview ||
                `https://ui-avatars.com/api/?name=${formData.name}`
              }
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border"
            />

            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={
                handleChange
              }
              className="mt-4"
            />
          </div>

          {/* Name */}

          <div>
            <label className="block mb-2 font-medium">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* Email */}

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              disabled
              className="w-full border p-3 rounded-xl bg-slate-100"
            />
          </div>
                    {/* Phone */}

          <div>
            <label className="block mb-2 font-medium">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* Role */}

          <div>
            <label className="block mb-2 font-medium">
              Role
            </label>

            <input
              type="text"
              value={role.toUpperCase()}
              disabled
              className="w-full border p-3 rounded-xl bg-slate-100"
            />
          </div>

          <button
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl"
          >
            {saving
              ? "Updating..."
              : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;