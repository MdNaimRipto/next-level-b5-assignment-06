import { IRides, rideStatusEnums } from "@/types/rides.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useUpdateRideStatusMutation } from "@/redux/features/ridesApis";
import { postApiHandler } from "@/utils/apiHandlers/postApiHandler";

const UpdateStatusSelect = ({ ride }: { ride: IRides }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateRide] = useUpdateRideStatusMutation();
  const handleRideStatusChange = async (
    rideId: string,
    value: rideStatusEnums
  ) => {
    const option = {
      data: {
        rideStatus: value,
      },
      id: rideId,
    };

    await postApiHandler({
      mutateFn: updateRide,
      options: option,
      setIsLoading: setIsLoading,
    });
  };

  return (
    <Select
      defaultValue={isLoading ? "Updating..." : ride.rideStatus}
      onValueChange={(value: rideStatusEnums) =>
        handleRideStatusChange(ride._id, value)
      }
      disabled={
        isLoading ||
        ride.acceptStatus === "requested" ||
        ride.rideStatus === "completed" ||
        ride.rideStatus === "cancelled"
      }
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <>
            <SelectItem value="Updating...">Updating...</SelectItem>
          </>
        ) : (
          <>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inTransit">In Transit</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  );
};

export default UpdateStatusSelect;
