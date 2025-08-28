import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IRides, rideStatusEnums } from "@/types/rides.types";
import { IUser } from "@/types/userTypes";
import { useGetAllURidesQuery } from "@/redux/features/adminApis";
import Sos from "@/components/admin/Sos";
import Loader from "@/components/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Badge style mapper
const getRideBadgeVariant = (status: rideStatusEnums) => {
  switch (status) {
    case "pending":
      return "secondary";
    case "inTransit":
      return "default";
    case "completed":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "default";
  }
};

const AllRides = () => {
  const [filters, setFilters] = useState({
    rideStatus: "",
    acceptStatus: "",
    date: "", // frontend date filter
    page: 1,
    limit: 10,
  });

  // Always call hooks first
  const { data, isLoading } = useGetAllURidesQuery({});

  // UseMemo should also be unconditional
  const rides = useMemo(() => (data?.data as IRides[]) || [], [data]);

  const filteredRides = useMemo(() => {
    return rides.filter((ride) => {
      let match = true;
      if (filters.rideStatus && ride.rideStatus !== filters.rideStatus)
        match = false;
      if (filters.acceptStatus && ride.acceptStatus !== filters.acceptStatus)
        match = false;
      if (filters.date) {
        const rideDate = new Date(ride.updatedAt).toISOString().split("T")[0];
        if (rideDate !== filters.date) match = false;
      }
      return match;
    });
  }, [rides, filters]);

  if (isLoading) return <Loader />;

  const handleReset = () => {
    setFilters({
      rideStatus: "",
      acceptStatus: "",
      date: "",
      page: 1,
      limit: 10,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Rides</h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        {/* Ride Status */}
        <Select
          value={filters.rideStatus}
          onValueChange={(val) =>
            setFilters((prev) => ({ ...prev, rideStatus: val, page: 1 }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ride Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inTransit">In Transit</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Accept Status */}
        <Select
          value={filters.acceptStatus}
          onValueChange={(val) =>
            setFilters((prev) => ({ ...prev, acceptStatus: val, page: 1 }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Accept Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Filter */}
        <input
          type="date"
          className="border rounded p-2"
          value={filters.date}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, date: e.target.value, page: 1 }))
          }
        />

        {/* Reset Filters */}
        <Button variant="outline" onClick={handleReset} className="col-span-1">
          Reset
        </Button>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Rider</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Accept Status</TableHead>
            <TableHead>Ride Status</TableHead>
            <TableHead>SOS Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRides.map((ride, key) => (
            <TableRow key={ride._id}>
              <TableCell>{key + 1}</TableCell>
              <TableCell>{(ride.riderId as IUser)?.userName}</TableCell>
              <TableCell>{(ride.driverId as IUser)?.userName}</TableCell>
              <TableCell>{ride.location.from}</TableCell>
              <TableCell>{ride.location.to}</TableCell>
              <TableCell>{ride.fair} BDT</TableCell>
              <TableCell>
                <Badge variant="secondary">{ride.acceptStatus}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getRideBadgeVariant(ride.rideStatus)}>
                  {ride.rideStatus}
                </Badge>
              </TableCell>
              <Sos rideId={ride._id} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllRides;
