import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  useGetActiveRidesQuery,
  useRequestRideMutation,
} from "@/redux/features/ridesApis";
import { IUser } from "@/types/userTypes";
import { useUserContext } from "@/context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { DialogDescription } from "@radix-ui/react-dialog";
import { postApiHandler } from "@/utils/apiHandlers/postApiHandler";
import Loader from "@/components/Loader";

const rideSchema = z.object({
  from: z.string().min(2, "From location required"),
  to: z.string().min(2, "To location required"),
  price: z.string().regex(/^\d+$/, "Price must be a number"),
});

type RideForm = z.infer<typeof rideSchema>;

export default function RidesPage() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data, isLoading: getIsLoading } = useGetActiveRidesQuery({});

  const form = useForm<RideForm>({
    resolver: zodResolver(rideSchema),
    defaultValues: {
      from: "",
      to: "",
      price: "",
    },
  });

  const [requestRide] = useRequestRideMutation();
  const handleRequestRide = (driver: IUser) => {
    if (!user) {
      toast.error("Authorization needed for ride booking");
      return navigate("/auth/login");
    }

    setSelectedDriver({
      id: driver._id,
      name: driver.userName,
    });
    setOpen(true);
  };

  const onSubmit = async (values: RideForm) => {
    const option = {
      data: {
        riderId: user?._id,
        driverId: selectedDriver?.id,
        location: {
          from: values.from,
          to: values.to,
        },
        fair: Number(values.price),
      },
    };

    const optionalTask = () => {
      setOpen(false);
      form.reset();
      navigate("/user/myRides");
    };

    await postApiHandler({
      mutateFn: requestRide,
      options: option,
      setIsLoading: setIsLoading,
      optionalTasksFn: optionalTask,
    });
  };

  if (getIsLoading) {
    return <Loader />;
  }

  const drivers = data.data as IUser[];

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Available Drivers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:px-16">
        {drivers.map((driver) => (
          <Card key={driver._id} className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{driver.userName}</span>
                {driver.isActive === "active" ? (
                  <Badge className="bg-green-500">Active</Badge>
                ) : (
                  <Badge variant="secondary">Inactive</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Contact Number:{" "}
                <span className="font-semibold">{driver.contactNumber}</span>
              </p>
              <Button
                className="w-full"
                disabled={driver.isActive !== "active"}
                onClick={() => handleRequestRide(driver)}
              >
                Request Ride
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Request Ride Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Ride with {selectedDriver?.name}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pickup location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter drop-off location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proposed Price (৳)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">
                  {isLoading ? "Requesting..." : "Send Request"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
