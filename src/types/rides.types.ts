export type acceptStatusEnums = "requested" | "accepted" | "rejected";
export type rideStatusEnums =
  | "pending"
  | "inTransit"
  | "completed"
  | "cancelled";
export type canceledByEnum = "none" | "rider" | "driver";

export interface IRides {
  riderId: unknown;
  driverId: unknown;
  acceptStatus: acceptStatusEnums;
  rideStatus: rideStatusEnums;
  location: {
    from: string;
    to: string;
  };
  fair: number;
  cancelledBy?: canceledByEnum;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateRideStatus {
  acceptStatus: acceptStatusEnums;
  rideStatus: rideStatusEnums;
}

export interface IRideFilters {
  searchTerm?: string;
  from?: string;
  to?: string;
  fair?: string;
  updatedAt?: string;
  acceptStatus?: acceptStatusEnums;
  rideStatus?: rideStatusEnums;
  page?: string;
  limit?: string;
}
