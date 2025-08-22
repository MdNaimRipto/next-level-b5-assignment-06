const missions = [
  {
    title: "Seamless Connectivity",
    description:
      "Connect riders and drivers with an intuitive platform designed for convenience and reliability.",
  },
  {
    title: "Safety First",
    description:
      "Prioritize user safety with live tracking, verified drivers, and robust emergency features.",
  },
  {
    title: "Sustainability",
    description:
      "Encourage ride-sharing and optimize routes to reduce traffic congestion and environmental impact.",
  },
  {
    title: "Driver Empowerment",
    description:
      "Provide tools and analytics for drivers to maximize earnings and manage their schedules efficiently.",
  },
  {
    title: "Innovation",
    description:
      "Continuously improve our platform with modern technologies and features to enhance user experience.",
  },
  {
    title: "Community Impact",
    description:
      "Support local communities through responsible urban mobility and inclusive access to transportation.",
  },
];

export default function OurMissions() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Mission</h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{mission.title}</h3>
              <p className="text-muted-foreground">{mission.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
