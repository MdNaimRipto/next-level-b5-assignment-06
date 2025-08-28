import {
  ChevronDownIcon,
  Layers2Icon,
  LayoutDashboard,
  LogOutIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router";
import {
  useLogoutMutation,
  useUpdateActiveStatusMutation,
  userApis,
} from "@/redux/features/userApis";
import { useState } from "react";
import { postApiHandler } from "@/utils/apiHandlers/postApiHandler";
import { useAppDispatch } from "@/redux/hook";

export default function Dropdown() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const { user } = useUserContext();

  const [logout] = useLogoutMutation();
  const [updateActiveStatus] = useUpdateActiveStatusMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const option = {};
    const optionalTasks = () => {
      navigate("/");
      dispatch(userApis.util.resetApiState());
    };

    await postApiHandler({
      mutateFn: logout,
      options: option,
      setIsLoading: setIsLoading,
      optionalTasksFn: optionalTasks,
    });
  };

  const handleToggleActive = async () => {
    const option = {
      data: { isActive: user?.isActive === "active" ? "inactive" : "active" },
    };

    const optionalTasks = () => {
      // You might want to refetch user or update context here
    };

    await postApiHandler({
      mutateFn: updateActiveStatus,
      options: option,
      setIsLoading: setIsToggling,
      optionalTasksFn: optionalTasks,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white">
              {user?.userName?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {user?.userName}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {user?.email}
          </span>
          {/* Active Status */}
          <span className="flex items-center gap-1 text-xs mt-1">
            <span
              className={`w-2 h-2 rounded-full ${
                user?.isActive === "active" ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
            {user?.isActive === "active" ? "Active" : "Inactive"}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/user/account">
            <DropdownMenuItem>
              <Layers2Icon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>My Account</span>
            </DropdownMenuItem>
          </Link>
          {user && user.role === "admin" && (
            <Link to="/admin/users">
              <DropdownMenuItem>
                <LayoutDashboard
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Admin Dashboard</span>
              </DropdownMenuItem>
            </Link>
          )}
          {/* Toggle Active Status */}
          <DropdownMenuItem
            onClick={handleToggleActive}
            className="hover:cursor-pointer"
          >
            <span
              className={`w-2 h-2 inline-block rounded-full ${
                user?.isActive === "active" ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
            <span>
              {isToggling
                ? "Updating..."
                : user?.isActive === "active"
                ? "Set Inactive"
                : "Set Active"}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="hover:cursor-pointer"
        >
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>{isLoading ? "Logging Out..." : "Logout"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
