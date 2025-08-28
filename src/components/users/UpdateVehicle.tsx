import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { postApiHandler } from "@/utils/apiHandlers/postApiHandler";
import { useUpdateUserMutation } from "@/redux/features/userApis";

// Zod schema for vehicle update, both fields optional
const vehicleSchema = z.object({
  type: z.enum(["car", "bike"]).optional(),
  number: z.string().optional(),
});

type VehicleForm = z.infer<typeof vehicleSchema>;

const UpdateVehicle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  const form = useForm<VehicleForm>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      type: undefined,
      number: "",
    },
  });

  const onSubmit = async (data: VehicleForm) => {
    // Only send fields that have a value
    const payload: Partial<VehicleForm> = {};
    if (data.type) payload.type = data.type;
    if (data.number) payload.number = data.number;

    if (!Object.keys(payload).length) {
      alert("Please provide at least one value to update.");
      return;
    }

    const option = { data: { vehicle: payload } };

    const optionalTasks = () => {
      form.reset();
    };

    await postApiHandler({
      mutateFn: updateUser,
      options: option,
      setIsLoading,
      optionalTasksFn: optionalTasks,
    });
  };

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-6 w-full">
      <h2 className="text-lg font-bold mb-4">Update Vehicle Details</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select Vehicle Type</option>
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Number</FormLabel>
                <FormControl>
                  <input
                    type="text"
                    {...field}
                    placeholder="Enter vehicle number"
                    className="w-full border rounded px-3 py-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Vehicle"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateVehicle;
