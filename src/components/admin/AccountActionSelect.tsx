import { useState } from "react";
import { postApiHandler } from "@/utils/apiHandlers/postApiHandler";
import { IUser } from "@/types/userTypes";
import { Button } from "../ui/button";
import {
  useUpdateApproveStatusMutation,
  useUpdateBlockStatusMutation,
} from "@/redux/features/adminApis";

const AccountActionSelect = ({ user }: { user: IUser }) => {
  const [isBlockLoading, setIsBlockLoading] = useState(false);
  const [isApproveLoading, setIsApproveLoading] = useState(false);

  const [updateUserBlockStatus] = useUpdateBlockStatusMutation();
  const [updateUserApproveStatus] = useUpdateApproveStatusMutation();

  const handleUpdateBlockStatus = async () => {
    const option = {
      id: user._id,
    };

    console.log(option);

    await postApiHandler({
      mutateFn: updateUserBlockStatus,
      options: option,
      setIsLoading: setIsBlockLoading,
    });
  };

  const handleUpdateApproveStatus = async () => {
    const option = {
      id: user._id,
    };

    console.log(option);

    await postApiHandler({
      mutateFn: updateUserApproveStatus,
      options: option,
      setIsLoading: setIsApproveLoading,
    });
  };

  return (
    <>
      <Button
        disabled={isBlockLoading}
        variant={"destructive"}
        onClick={handleUpdateBlockStatus}
      >
        {isBlockLoading ? "Updating..." : user.isBlocked ? "Unblock" : "Block"}
      </Button>
      <span className="w-4 inline-block"></span>
      {user.role === "driver" && (
        <Button
          disabled={isApproveLoading}
          variant={"outline"}
          className="border border-red-500 text-red-500"
          onClick={handleUpdateApproveStatus}
        >
          {isApproveLoading
            ? "Updating..."
            : user.isApproved
            ? "Suspend"
            : "Approve"}
        </Button>
      )}
    </>
  );
};

export default AccountActionSelect;
