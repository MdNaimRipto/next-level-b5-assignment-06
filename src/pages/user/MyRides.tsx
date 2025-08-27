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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetMyRidesQuery } from "@/redux/features/ridesApis";
import { IRides, rideStatusEnums } from "@/types/rides.types";
import { IUser } from "@/types/userTypes";
import { useState } from "react";
import UpdateAcceptStatusSelect from "@/components/myRides/UpdateAcceptStatusSelect";
import UpdateStatusSelect from "@/components/myRides/UpdateStatusSelect ";

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
  const { data, isLoading } = useGetMyRidesQuery({});
  const [sosOpen, setSosOpen] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const rides = data?.data as IRides[];

  const isRideActive = rides.find(
    (r) => r.acceptStatus === "accepted" && r.rideStatus === "inTransit"
  );

  const handleOpenSOS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setSosOpen(true); // open modal AFTER permission granted
        },
        (err) => {
          console.error("Failed to get location:", err);
          alert("Could not fetch location. Please enable GPS.");
        }
      );
    } else {
      alert("Geolocation is not supported in this browser.");
    }
  };

  // 🚨 Send SOS only with stored coords
  const handleSendSOS = () => {
    if (coords) {
      console.log("🚨 SOS Triggered!");
      console.log("Latitude:", coords.lat);
      console.log("Longitude:", coords.lng);
    } else {
      console.error("No coordinates available.");
    }
    setSosOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Rides</h1>

        {/* 🚨 SOS Button with Modal */}
        <Dialog open={sosOpen} onOpenChange={setSosOpen}>
          {/* 🚨 SOS Button */}
          <Button
            disabled={!isRideActive}
            variant="destructive"
            onClick={handleOpenSOS}
          >
            🚨 Send SOS
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to send SOS?</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setSosOpen(false)}>
                No
              </Button>
              <Button variant="destructive" onClick={handleSendSOS}>
                Yes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            {user && user.role === "driver" ? (
              <TableHead>Rider</TableHead>
            ) : (
              <TableHead>Driver</TableHead>
            )}
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="w-[180px]">Accept Status</TableHead>
            <TableHead className="w-[180px]">Ride Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rides.map((ride, key) => (
            <TableRow key={ride._id}>
              <TableCell>{key + 1}</TableCell>
              <TableCell>
                {String(
                  (
                    (user && user.role === "rider"
                      ? ride.driverId
                      : ride.riderId) as IUser
                  ).userName
                )}
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
            </TableRow>
          ))}
        </TableBody>
        <TableCaption></TableCaption>
      </Table>
    </div>
  );
};

export default MyRides;
