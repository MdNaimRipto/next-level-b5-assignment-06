const userFeatures = {
  Rider: [
    "Easily book rides to your destination with real-time fare estimation.",
    "Track your driver’s location in real-time and get ETA updates.",
    "View past rides with details, ratings, and payment history.",
    "Pay via card, digital wallets, or cash for a seamless experience.",
  ],
  Driver: [
    "Set your status online/offline to receive ride requests when convenient.",
    "Accept or reject ride requests and update ride statuses in real-time.",
    "Track your daily, weekly, and monthly earnings with charts.",
    "Update vehicle info, personal details, and account settings easily.",
  ],
  Admin: [
    "Search, filter, and manage riders and drivers.",
    "Approve, suspend, or block users as needed.",
    "View all rides and advanced filtering by date, status, driver, or rider.",
    "Analyze ride volume, revenue trends, and driver activity with visual charts.",
    "Manage platform settings and oversee system-wide operations.",
  ],
};

export default function FeaturesSection() {
  return (
    <section className="py-20 dark:bg-gray-900">
      <div>
        <h2 className="text-4xl font-bold text-center mb-12">
          Features & Capabilities
        </h2>

        {/* Role Features */}
        <div className="flex flex-col gap-16">
          {/* First Row: Rider & Driver */}
          <div className="flex flex-col lg:flex-row gap-16 justify-center md:items-center">
            {["Rider", "Driver"].map((role) => (
              <div key={role}>
                <h3 className="text-2xl font-semibold mb-6 text-center">
                  {role} Features
                </h3>
                <ul className="list-disc list-inside space-y-3 text-start mx-auto">
                  {userFeatures[role as "Rider" | "Driver"].map(
                    (feature, idx) => (
                      <li key={idx} className="text-muted-foreground">
                        {feature}
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>

          {/* Second Row: Admin */}
          <div className="flex justify-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-center">
                Admin Features
              </h3>
              <ul className="list-disc list-inside space-y-3 text-start mx-auto">
                {userFeatures["Admin"].map((feature, idx) => (
                  <li key={idx} className="text-muted-foreground">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
