import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useUserContext } from "@/context/AuthContext";
import { useGetMyRidesQuery } from "@/redux/features/ridesApis";
import { IRides, rideStatusEnums } from "@/types/rides.types";
import { IUser } from "@/types/userTypes";
import UpdateAcceptStatusSelect from "@/components/myRides/UpdateAcceptStatusSelect";
import UpdateStatusSelect from "@/components/myRides/UpdateStatusSelect ";
import RequestSos from "@/components/myRides/RequestSos";
import Loader from "@/components/Loader";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

const MyRides = () => {
  const { user } = useUserContext();

  // 🔹 Query states (linked to backend)
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rideStatus, setRideStatus] = useState("");

  // 🔹 Details Modal State
  const [open, setOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<IRides | null>(null);

  const { data, isLoading } = useGetMyRidesQuery({
    searchTerm,
    page: String(page),
    rideStatus:
      rideStatus === "all" ? undefined : (rideStatus as rideStatusEnums),
  });

  if (isLoading) {
    return <Loader />;
  }

  const rides = data?.data?.data as IRides[];
  const meta = data?.data?.meta as {
    page: number;
    limit: number;
    total: number;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Rides</h1>
        <RequestSos rides={rides} />
      </div>

      {/* 🔹 Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Search */}
        <Input
          placeholder="Search by From/To"
          value={searchTerm}
          onChange={(e) => {
            setPage(1); // reset to page 1
            setSearchTerm(e.target.value);
          }}
        />

        {/* Ride Status Filter */}
        <Select
          value={rideStatus}
          onValueChange={(value) => {
            setPage(1);
            setRideStatus(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inTransit">In Transit</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset Filters */}
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("");
            setRideStatus("");
            setPage(1);
          }}
        >
          Reset Filters
        </Button>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            {user && user.role === "driver" ? (
              <TableHead>Rider</TableHead>
            ) : (
              <TableHead>Driver</TableHead>
            )}
            <TableHead>Booked Date</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Accept Status</TableHead>
            <TableHead>Ride Status</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rides.length > 0 ? (
            rides.map((ride, key) => (
              <TableRow key={ride._id}>
                <TableCell>{(meta.page - 1) * meta.limit + key + 1}</TableCell>
                <TableCell>
                  {String(
                    (
                      (user && user.role === "rider"
                        ? ride.driverId
                        : ride.riderId) as IUser
                    ).userName
                  )}
                </TableCell>
                <TableCell>
                  {new Date(ride.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{ride.location.from}</TableCell>
                <TableCell>{ride.location.to}</TableCell>
                <TableCell>{ride.fair} BDT</TableCell>

                {/* Accept Status */}
                <TableCell>
                  {user && user.role === "driver" ? (
                    <UpdateAcceptStatusSelect ride={ride} />
                  ) : (
                    <Badge variant="secondary">{ride.acceptStatus}</Badge>
                  )}
                </TableCell>

                {/* Ride Status */}
                <TableCell>
                  {user &&
                  user.role === "driver" &&
                  ride.rideStatus !== "cancelled" &&
                  ride.rideStatus !== "completed" ? (
                    <UpdateStatusSelect ride={ride} />
                  ) : (
                    <Badge variant={getRideBadgeVariant(ride.rideStatus)}>
                      {ride.rideStatus}
                    </Badge>
                  )}
                </TableCell>

                {/* Details Button */}
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedRide(ride);
                      setOpen(true);
                    }}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4">
                No rides found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* 🔹 Pagination Controls */}
      {meta && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            variant="outline"
            disabled={meta.page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span>
            Page {meta.page} of {Math.ceil(meta.total / meta.limit)}
          </span>
          <Button
            variant="outline"
            disabled={meta.page >= Math.ceil(meta.total / meta.limit)}
            onClick={() =>
              setPage((prev) =>
                Math.min(prev + 1, Math.ceil(meta.total / meta.limit))
              )
            }
          >
            Next
          </Button>
        </div>
      )}

      {/* 🔹 Details Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ride Details</DialogTitle>
          </DialogHeader>

          {selectedRide && (
            <div className="space-y-2 text-sm">
              <p>
                <strong>ID:</strong> {selectedRide._id}
              </p>
              <p>
                <strong>From:</strong> {selectedRide.location.from}
              </p>
              <p>
                <strong>To:</strong> {selectedRide.location.to}
              </p>
              <p>
                <strong>Fare:</strong> {selectedRide.fair} BDT
              </p>
              <p>
                <strong>Accept Status:</strong> {selectedRide.acceptStatus}
              </p>
              <p>
                <strong>Ride Status:</strong> {selectedRide.rideStatus}
              </p>
              <p>
                <strong>Cancelled By:</strong>{" "}
                {selectedRide.cancelledBy || "none"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedRide.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(selectedRide.updatedAt).toLocaleString()}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyRides;
