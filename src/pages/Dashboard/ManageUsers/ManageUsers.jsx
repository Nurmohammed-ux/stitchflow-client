import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaUsers,
  FaMagnifyingGlass,
  FaUserTie,
  FaUser,
  FaBan,
  FaCheck,
  FaPen,
} from "react-icons/fa6";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure();

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState("");

  // ================= GET USERS =================

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?search=${encodeURIComponent(search)}`,
      );

      return res.data;
    },
  });

  // ================= UPDATE USER =================

  const handleUpdateUser = async () => {
    const result = await Swal.fire({
      title: "Update User?",
      text: `Change ${selectedUser.email}'s role to ${role}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#062746",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const res = await axiosSecure.patch(`/users/${selectedUser._id}`, {
        role,
      });

      if (res.data.modifiedCount > 0) {
        await refetch();
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "User role updated successfully.",
          confirmButtonColor: "#062746",
        });

        setSelectedUser(null);
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong.",
        confirmButtonColor: "#062746",
      });
    }
  };

  // ================= SUSPEND USER =================

  const handleSuspend = async (user) => {
    const isSuspended = user.status === "suspended";

    const result = await Swal.fire({
      title: isSuspended ? "Activate User?" : "Suspend User?",
      text: isSuspended ? `Activate ${user.email}?` : `Suspend ${user.email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: isSuspended ? "Activate" : "Suspend",
      cancelButtonText: "Cancel",
      confirmButtonColor: isSuspended ? "#062746" : "#d33",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const res = await axiosSecure.patch(`/users/${user._id}`, {
        status: isSuspended ? "active" : "suspended",
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: isSuspended ? "User Activated" : "User Suspended",
          confirmButtonColor: "#062746",
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text: "Something went wrong.",
        confirmButtonColor: "#062746",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] px-5 py-8 md:px-8 lg:px-10">
      {/* ================= HEADER ================= */}

      <div>
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />

          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
            Administration
          </span>

          <span className="hidden h-px w-20 bg-primary/60 sm:block" />
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
          Manage <span className="text-primary">Users.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-secondary/50 md:text-base">
          Manage user accounts, assign roles and control access to the
          StitchFlow system.
        </p>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-secondary/30">
          SF / USERS / ADMIN
        </p>
      </div>

      {/* ================= STATS ================= */}

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-secondary/10 bg-white p-5">
          <FaUsers className="text-primary" size={18} />

          <p className="mt-5 text-3xl font-bold text-secondary">
            {users.length}
          </p>

          <p className="mt-1 text-xs uppercase tracking-wider text-secondary/40">
            Total Users
          </p>
        </div>

        <div className="rounded-3xl border border-secondary/10 bg-white p-5">
          <FaUser className="text-primary" size={18} />

          <p className="mt-5 text-3xl font-bold text-secondary">
            {users.filter((user) => user.role === "buyer").length}
          </p>

          <p className="mt-1 text-xs uppercase tracking-wider text-secondary/40">
            Buyers
          </p>
        </div>

        <div className="rounded-3xl border border-secondary/10 bg-white p-5">
          <FaUserTie className="text-primary" size={18} />

          <p className="mt-5 text-3xl font-bold text-secondary">
            {users.filter((user) => user.role === "manager").length}
          </p>

          <p className="mt-1 text-xs uppercase tracking-wider text-secondary/40">
            Managers
          </p>
        </div>

        <div className="rounded-3xl border border-secondary/10 bg-white p-5">
          <FaBan className="text-red-500" size={18} />

          <p className="mt-5 text-3xl font-bold text-secondary">
            {users.filter((user) => user.status === "suspended").length}
          </p>

          <p className="mt-1 text-xs uppercase tracking-wider text-secondary/40">
            Suspended
          </p>
        </div>
      </div>

      {/* ================= USERS TABLE ================= */}

      <div className="mt-8 overflow-hidden rounded-4xl border border-secondary/10 bg-white">
        {/* SEARCH */}

        <div className="flex flex-col gap-5 border-b border-secondary/10 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-secondary">All Users</h2>

            <p className="mt-1 text-xs text-secondary/40">
              Manage registered StitchFlow accounts.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <FaMagnifyingGlass
              size={13}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30"
            />

            <input
              type="text"
              placeholder="Search name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-secondary/10 bg-[#f8faf8] py-3.5 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-secondary/25 focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>

        {/* ================= LOADING ================= */}

        {isLoading ? (
          <div className="flex h-80 items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : (
          /* ================= TABLE ================= */

          <div className="overflow-x-auto">
            <table className="w-full min-w-200">
              <thead>
                <tr className="border-b border-secondary/10 bg-[#f8faf8]">
                  <th className="px-6 py-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-secondary/5 hover:bg-[#f8faf8]"
                  >
                    {/* NAME */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10">
                          <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            className="rounded-full"
                          />
                        </div>

                        <span className="font-semibold text-secondary">
                          {user.displayName || "Unnamed"}
                        </span>
                      </div>
                    </td>

                    {/* EMAIL */}

                    <td className="px-6 py-5 text-sm text-secondary/50">
                      {user.email}
                    </td>

                    {/* ROLE */}

                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-600 border border-red-200"
                            : user.role === "manager"
                              ? "bg-amber-100 text-amber-700 border border-amber-200"
                              : "bg-emerald-100 text-emerald-700 border border-emerald-200" // Default / buyer
                        }`}
                      >
                        {user.role || "buyer"}
                      </span>
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">
                      <span
                        className={`flex items-center gap-2 text-xs font-semibold ${
                          user.status === "suspended"
                            ? "text-red-500"
                            : "text-primary"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            user.status === "suspended"
                              ? "bg-red-500"
                              : "bg-primary"
                          }`}
                        />

                        {user.status === "suspended" ? "Suspended" : "Active"}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-4">
                        {/* ROLE */}

                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setRole(user.role || "user");
                          }}
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/5 text-secondary/50 hover:bg-primary hover:text-secondary"
                          title="Update role"
                        >
                          <FaPen size={12} />
                        </button>

                        {/* SUSPEND */}

                        <button
                          onClick={() => handleSuspend(user)}
                          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                            user.status === "suspended"
                              ? "bg-primary/10 text-primary hover:bg-primary hover:text-secondary"
                              : "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white"
                          }`}
                          title={
                            user.status === "suspended" ? "Activate" : "Suspend"
                          }
                        >
                          {user.status === "suspended" ? (
                            <FaCheck size={12} />
                          ) : (
                            <FaBan size={12} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <div className="flex h-60 items-center justify-center text-sm text-secondary/40">
                No users found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= ROLE MODAL ================= */}

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/30 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-4xl bg-white p-7 shadow-2xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
              User Management
            </p>

            <h2 className="mt-2 text-2xl font-bold text-secondary">
              Update Role
            </h2>

            <div className="mt-6 rounded-2xl bg-[#f8faf8] p-4">
              <p className="font-bold text-secondary">
                {selectedUser.displayName || "Unnamed User"}
              </p>

              <p className="mt-1 text-xs text-secondary/40">
                {selectedUser.email}
              </p>
            </div>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-6 w-full rounded-2xl border border-secondary/10 px-4 py-3.5 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            >
              <option value="user">Buyer / User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="flex-1 rounded-2xl border border-secondary/10 py-3.5 text-sm font-bold text-secondary"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateUser}
                className="flex-1 rounded-2xl bg-secondary py-3.5 text-sm font-bold text-white hover:bg-primary hover:text-secondary"
              >
                Update Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
