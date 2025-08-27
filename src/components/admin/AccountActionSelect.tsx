import { useState } from "react";
import { postApiHandler } from "@/utils/apiHandlers/postApiHandler";
import { IUser } from "@/types/userTypes";
import { Button } from "../ui/button";
import { useUpdateBlockStatusMutation } from "@/redux/features/adminApis";

const AccountActionSelect = ({ user }: { user: IUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateUser] = useUpdateBlockStatusMutation();

  const handleUpdateBlockStatusUpdate = async () => {
    const option = {
      id: user._id,
    };

    console.log(option);

    await postApiHandler({
      mutateFn: updateUser,
      options: option,
      setIsLoading: setIsLoading,
    });
  };

  return (
    <Button
      disabled={isLoading}
      variant={"destructive"}
      onClick={handleUpdateBlockStatusUpdate}
    >
      {isLoading ? "Updating..." : user.isBlocked ? "Unblock" : "Block"}
    </Button>
  );
};

export default AccountActionSelect;
