import { useRequestSosMutation } from "@/redux/features/sosApis";
import { postApiHandler } from "@/utils/apiHandlers/postApiHandler";
import { IRides } from "@/types/rides.types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const RequestSos = ({ rides }: { rides: IRides[] }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [sosOpen, setSosOpen] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const [requestSos] = useRequestSosMutation();

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

  const handleSendSOS = async () => {
    if (coords) {
      const option = {
        data: {
          rideId: isRideActive?._id,
          lat: coords.lat,
          lng: coords.lng,
        },
      };

      console.log(option);

      await postApiHandler({
        mutateFn: requestSos,
        options: option,
        setIsLoading: setIsLoading,
      });
    } else {
      console.error("No coordinates available.");
    }
    setSosOpen(false);
  };

  return (
    <Dialog open={sosOpen} onOpenChange={setSosOpen}>
      {/* 🚨 SOS Button */}
      <Button
        disabled={!isRideActive || isLoading}
        variant="destructive"
        onClick={handleOpenSOS}
      >
        {isLoading ? "Requesting..." : "🚨 Send SOS"}
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
  );
};

export default RequestSos;
