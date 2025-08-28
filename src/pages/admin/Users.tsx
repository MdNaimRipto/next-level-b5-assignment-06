import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser, IUserFilters } from "@/types/userTypes";
import { useGetAllUsersQuery } from "@/redux/features/adminApis";
import { Badge } from "@/components/ui/badge";
import AccountActionSelect from "@/components/admin/AccountActionSelect";
import Loader from "@/components/Loader";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Users = () => {
  const [filters, setFilters] = useState<IUserFilters>({});
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllUsersQuery({
    ...filters,
    page: String(page),
    limit: "10",
  });

  if (isLoading) {
    return <Loader />;
  }

  const users = data?.data?.data as IUser[];
  const meta = data?.data?.meta as {
    page: number;
    limit: number;
    total: number;
  };

  // Handle filter updates
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (key: keyof IUserFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
    setPage(1); // reset to first page on filter change
  };

  const resetFilters = () => {
    setFilters({});
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
        <Input
          placeholder="Search..."
          value={filters.searchTerm || ""}
          onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
          className="w-full md:col-span-2"
        />
        <Select
          onValueChange={(value) => handleFilterChange("role", value)}
          value={filters.role || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="driver">Driver</SelectItem>
            <SelectItem value="rider">Rider</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => handleFilterChange("isActive", value)}
          value={filters.isActive || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Active Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => handleFilterChange("isBlocked", value)}
          value={filters.isActive || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Block Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="false">Open</SelectItem>
            <SelectItem value="true">Blocked</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) =>
            handleFilterChange(
              "isApproved",
              value === "true" ? "true" : "false"
            )
          }
          value={
            filters.isApproved !== undefined ? String(filters.isApproved) : ""
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Approval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Approved</SelectItem>
            <SelectItem value="false">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={resetFilters}
          variant="outline"
          className="w-full md:w-auto"
        >
          Reset Filters
        </Button>
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
            <TableHead>User Role</TableHead>
            <TableHead>Active Status</TableHead>
            <TableHead>Account Status</TableHead>
            <TableHead>Account Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user, key) => (
            <TableRow key={user._id}>
              <TableCell>{(page - 1) * 10 + key + 1}</TableCell>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.contactNumber}</TableCell>
              <TableCell>
                {user.role.slice(0, 1).toUpperCase() + user.role.slice(1)}
              </TableCell>
              <TableCell>
                <Badge
                  variant={"default"}
                  className={
                    user.isActive === "active"
                      ? "text-white bg-green-500"
                      : "text-white bg-gray-500"
                  }
                >
                  {user.isActive.slice(0, 1).toUpperCase() +
                    user.isActive.slice(1, user.isActive.length)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={"secondary"}>
                  {user.isBlocked ? "Blocked" : "Open"}
                </Badge>
                <Badge variant={"default"} className="ml-4">
                  {user.isApproved ? "Approved" : "Suspended"}
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

      {/* Pagination */}
      <div className="flex justify-center gap-4 items-center mt-4">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>
          Page {meta?.page} of {Math.ceil(meta?.total / meta?.limit)}
        </span>
        <Button
          onClick={() =>
            setPage((prev) =>
              meta && page < Math.ceil(meta.total / meta.limit)
                ? prev + 1
                : prev
            )
          }
          disabled={!meta || page >= Math.ceil(meta?.total / meta?.limit)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Users;
