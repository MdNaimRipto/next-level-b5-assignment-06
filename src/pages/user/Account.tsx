import { useUserContext } from "@/context/AuthContext";

const Account = () => {
  const { user } = useUserContext();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

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
