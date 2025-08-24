import {
  BoltIcon,
  BookOpenIcon,
  ChevronDownIcon,
  Layers2Icon,
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
import { useLogoutMutation, userApis } from "@/redux/features/userApis";
import { useState } from "react";
import { postApiHandler } from "@/utils/apiHandlers/postApiHandler";
import { useAppDispatch } from "@/redux/hook";

export default function Dropdown() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUserContext();

  const [logout] = useLogoutMutation();
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white">
              {user?.userName.slice(0, 2)}
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
          <DropdownMenuItem>
            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 3</span>
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
