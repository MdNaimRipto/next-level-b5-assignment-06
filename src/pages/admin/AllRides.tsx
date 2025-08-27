import {
  Table,
  TableBody,
  TableCaption,
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

// ✅ Map for badge variants
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
  const { data, isLoading } = useGetAllURidesQuery({});

  if (isLoading) {
    return <Loader />;
  }

  const rides = data?.data as IRides[];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Rides</h1>
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
            <TableHead className="w-[180px]">Accept Status</TableHead>
            <TableHead className="w-[180px]">Ride Status</TableHead>
            <TableHead className="w-[180px]">SOS Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rides.map((ride, key) => (
            <TableRow key={ride._id}>
              <TableCell>{key + 1}</TableCell>
              <TableCell>{String((ride.riderId as IUser).userName)}</TableCell>
              <TableCell>{String((ride.driverId as IUser).userName)}</TableCell>
              <TableCell>{ride.location.from}</TableCell>
              <TableCell>{ride.location.to}</TableCell>
              <TableCell>{ride.fair} BDT</TableCell>

              {/* Accept Status */}
              <TableCell>
                <Badge variant="secondary">{ride.acceptStatus}</Badge>
              </TableCell>

              {/* Ride Status */}
              <TableCell>
                <Badge variant={getRideBadgeVariant(ride.rideStatus)}>
                  {ride.rideStatus}
                </Badge>
              </TableCell>
              <Sos rideId={ride._id} />
            </TableRow>
          ))}
        </TableBody>
        <TableCaption></TableCaption>
      </Table>
    </div>
  );
};

export default AllRides;
