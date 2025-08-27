/* eslint-disable react-refresh/only-export-components */
import Loader from "@/components/Loader";
import { useUserInfoQuery } from "@/redux/features/userApis";
import { IUser } from "@/types/userTypes";
import { createContext, ReactNode, useContext } from "react";
// import Loader from "@/components/common/loader/Loader";

interface UserContextType {
  user: null | IUser;
}

export const UserContext = createContext<UserContextType>({
  user: null,
});

const AuthContext = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<null | any>(null);

  const { data, isLoading } = useUserInfoQuery({});

  if (isLoading) {
    // return <Loader />;
    return <Loader />;
  }

  const user = data?.data as IUser;

  const value = {
    user: user ? user : null,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default AuthContext;

export function useUserContext(): UserContextType {
  return useContext(UserContext);
}
