import bg from "@/assets/goal.jpg";

export default function CompanyBackground() {
  return (
    <section className="relative dark:bg-gray-900 py-20 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Content */}
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Our Story, Mission & Growth
          </h1>

          <p className="text-lg text-muted-foreground mx-auto lg:mx-0">
            Founded with a simple idea, our company set out to transform urban
            travel by making it safer, faster, and more convenient for everyone.
            What began as a small team of passionate innovators has grown into a
            full-fledged platform connecting riders and drivers across the city.
          </p>

          <p className="text-lg text-muted-foreground mx-auto lg:mx-0">
            Our mission is to provide a seamless mobility experience that
            empowers riders to reach their destinations efficiently while giving
            drivers the tools to maximize their earning potential. Every
            feature, from live tracking to ride scheduling, is carefully
            designed to meet real-world needs.
          </p>

          <p className="text-lg text-muted-foreground mx-auto lg:mx-0">
            Over the years, we have expanded our reach, onboarded thousands of
            drivers, and served millions of rides. Our platform prioritizes
            safety, reliability, and accessibility, incorporating innovative
            technologies to ensure the highest quality experience for all users.
          </p>

          <p className="text-lg text-muted-foreground mx-auto lg:mx-0">
            We are committed to sustainability and urban efficiency. By
            optimizing ride-sharing routes and encouraging shared mobility, we
            contribute to reducing traffic congestion and environmental impact,
            making cities smarter and cleaner.
          </p>

          <p className="text-lg text-muted-foreground mx-auto lg:mx-0">
            Looking ahead, we aim to continue growing, embracing new
            technologies, expanding our services, and maintaining our dedication
            to a safer, smarter, and more connected urban transportation
            ecosystem.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end mt-10 lg:mt-0 h-full w-full">
          <img
            src={bg}
            alt="Company background illustration"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>
      </div>
    </section>
  );
}
