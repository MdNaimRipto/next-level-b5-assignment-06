import { useGetSosQuery } from "@/redux/features/sosApis";
import { Button } from "../ui/button";
import { TableCell } from "../ui/table";
import { ISos } from "@/types/sos.types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ResolveSos from "./ResolveSos";

// Fix marker icon issue in Leaflet
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const getSOSBadgeVariant = (status: boolean) => {
  return status ? "destructive" : "secondary";
};

const Sos = ({ rideId }: { rideId: string }) => {
  const { data, isLoading } = useGetSosQuery({ id: rideId });
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const sos = data?.data as ISos | null;

  return (
    <TableCell>
      {sos ? (
        <>
          {sos.status === false ? (
            <>
              <Button
                className="animate-pulse"
                variant={getSOSBadgeVariant(true)}
                onClick={() => setOpen(true)}
              >
                SOS Requested
              </Button>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-2xl h-[500px]">
                  <DialogHeader>
                    <DialogTitle>SOS Location</DialogTitle>
                  </DialogHeader>
                  {sos.lat && sos.lng ? (
                    <MapContainer
                      center={[sos.lat, sos.lng]}
                      zoom={15}
                      style={{ height: "300px", width: "100%" }}
                      scrollWheelZoom={false}
                      dragging={false}
                      doubleClickZoom={false}
                      zoomControl={false}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                      />
                      <Marker position={[sos.lat, sos.lng]} icon={markerIcon} />
                    </MapContainer>
                  ) : (
                    <p>No coordinates found</p>
                  )}
                  <DialogFooter>
                    <ResolveSos
                      id={sos._id}
                      onResolved={() => setOpen(false)}
                    />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <>
              <Button variant={"default"} onClick={() => setOpen(true)}>
                Resolved
              </Button>
            </>
          )}
        </>
      ) : (
        <Button variant={getSOSBadgeVariant(false)}>Not Requested</Button>
      )}
    </TableCell>
  );
};

export default Sos;
