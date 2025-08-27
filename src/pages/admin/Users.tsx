import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser } from "@/types/userTypes";
import { useGetAllUsersQuery } from "@/redux/features/adminApis";
import { Badge } from "@/components/ui/badge";
import AccountActionSelect from "@/components/admin/AccountActionSelect";

const Users = () => {
  //   const { user } = useUserContext();
  const { data, isLoading } = useGetAllUsersQuery({});

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const users = data?.data as IUser[];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead className="w-[180px]">Account Status</TableHead>
            <TableHead className="w-[180px]">Account Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, key) => (
            <TableRow key={user._id}>
              <TableCell>{key + 1}</TableCell>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.contactNumber}</TableCell>
              <TableCell>
                <Badge variant={"secondary"}>
                  {user.isBlocked ? "Blocked" : "Open"}
                </Badge>
              </TableCell>
              <TableCell>
                <AccountActionSelect user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption></TableCaption>
      </Table>
    </div>
  );
};

export default Users;
