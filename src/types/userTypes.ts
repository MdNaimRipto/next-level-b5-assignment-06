export type userRoleEnums = "admin" | "rider" | "driver";
export type isActiveEnums = "active" | "offline" | "idle";

export interface IUser {
  userName: string;
  email: string;
  contactNumber: string;
  role: userRoleEnums;
  isVerified: boolean;
  isActive: isActiveEnums;
  isApproved: boolean;
  isBlocked: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
