import { useUserContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { postApiHandler } from "@/utils/apiHandlers/postApiHandler";
import { useUpdateUserMutation } from "@/redux/features/userApis";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Add form UI components
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const accountSchema = z.object({
  userName: z.string().optional(),
  email: z.string().optional(),
  contactNumber: z.string().optional(),
});

type AccountForm = z.infer<typeof accountSchema>;

const Account = () => {
  const { user } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Use form object as in LoginForm
  const form = useForm<AccountForm>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      userName: "",
      email: "",
      contactNumber: "",
    },
  });

  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (data: AccountForm) => {
    // Only include fields that have a value
    const filteredData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, value]) => value && value.trim() !== "")
    );

    if (Object.keys(filteredData).length === 0) {
      return; // No fields to update
    }

    const option = { data: filteredData };

    const optionalTasks = () => {
      setOpen(false); // close modal after success
      form.reset(); // reset form to empty
    };

    await postApiHandler({
      mutateFn: updateUser,
      options: option,
      setIsLoading: setIsLoading,
      optionalTasksFn: optionalTasks,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Account</h1>

        {/* Edit Button opens dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Account</DialogTitle>
            </DialogHeader>

            {/* Use Form and FormField components */}
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input required={false} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input required={false} type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input required={false} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Account Details */}
      <div className="bg-white shadow rounded-2xl p-6 space-y-4">
        <div className="flex justify-between">
          <span className="font-medium">Name</span>
          <span>{user?.userName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email</span>
          <span>{user?.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Contact Number</span>
          <span>{user?.contactNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Role</span>
          <span className="capitalize">{user?.role}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Verified</span>
          <span>{user?.isVerified ? "✅ Yes" : "❌ No"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Active Status</span>
          <span className="capitalize">{user?.isActive}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Approved</span>
          <span>{user?.isApproved ? "✅ Yes" : "❌ No"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Blocked</span>
          <span>{user?.isBlocked ? "🚫 Yes" : "✔️ No"}</span>
        </div>
      </div>
    </div>
  );
};

export default Account;
