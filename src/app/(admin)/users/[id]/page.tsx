"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import DeleteUserButton from "@/components/users/DeleteUserButton";
import ResetPasswordButton from "@/components/users/ResetPasswordButton";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface User {
  id: number;
  name: string;
  email: string;
  gender: boolean | null;
  dateOfBirth: string | null;
  phoneNumber: string | null;
  avatarUrl: string | null;
  facebookUrl: string | null;
  zaloUrl: string | null;
  tiktokUrl: string | null;
  instagramUrl: string | null;
  address: string | null;
  ward: string | null;
  province: string | null;
  title: string | null;
  role: string;
  status: string;
  isActive: boolean;
  createdAt: string;
}

const DetailedUserPage = () => {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = params.id as string;

  // TODO: implement fetch user from API
  const fetchUser = async () => {};

  const showDeleteButton = true;
  const canChangeStatus = true;
  const canEdit = true;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !user) {
    return (
      <div>
        <PageBreadcrumb
          pageTitle="Tài khoản"
          subPageTitle="Thông tin tài khoản"
          pageTitleNav="users"
        />
        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
          <p className="text-sm text-red-800 dark:text-red-400">
            {error || "Không tìm thấy người dùng"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageBreadcrumb
        pageTitle="Tài khoản"
        subPageTitle="Thông tin tài khoản"
        pageTitleNav="users"
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="space-y-6">
          <UserMetaCard user={user} />
          <UserInfoCard user={user} canChangeStatus={canChangeStatus} canEdit={canEdit} onUpdate={fetchUser} />
          <UserAddressCard user={user} canEdit={canEdit} onUpdate={fetchUser} />

          {showDeleteButton && (
            <div className="flex justify-end gap-3">
              <ResetPasswordButton userId={userId} />
              <DeleteUserButton userId={userId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedUserPage;
