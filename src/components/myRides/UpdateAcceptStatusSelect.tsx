import { acceptStatusEnums, IRides } from "@/types/rides.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useUpdateRideAcceptStatusMutation } from "@/redux/features/ridesApis";
import { postApiHandler } from "@/utils/apiHandlers/postApiHandler";

const UpdateAcceptStatusSelect = ({ ride }: { ride: IRides }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateRide] = useUpdateRideAcceptStatusMutation();
  const handleAcceptStatusChange = async (
    rideId: string,
    value: acceptStatusEnums
  ) => {
    const option = {
      data: {
        acceptStatus: value,
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
      defaultValue={isLoading ? "Updating..." : ride.acceptStatus}
      onValueChange={(value: acceptStatusEnums) =>
        handleAcceptStatusChange(ride._id, value)
      }
      disabled={isLoading || ride.acceptStatus !== "requested"}
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
            <SelectItem value="requested">Requested</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  );
};

export default UpdateAcceptStatusSelect;
