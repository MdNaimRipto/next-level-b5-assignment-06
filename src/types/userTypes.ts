export type userRoleEnums = "admin" | "rider" | "driver";
export type isActiveEnums = "active" | "offline" | "idle";
export type vehicleTypeEnums = "car" | "bike";

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
  vehicle: {
    type: vehicleTypeEnums;
    number: string;
  } | null;
}

export interface IUserFilters {
  searchTerm?: string;
  userName?: string;
  email?: string;
  role?: userRoleEnums;
  isVerified?: string;
  isActive?: isActiveEnums;
  isApproved?: string;
  isBlocked?: string;
  page?: string;
  limit?: string;
  skip?: string;
}
