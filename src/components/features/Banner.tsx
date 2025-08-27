import bg from "@/assets/aboutBanner.jpg";

export default function FeaturesBanner() {
  return (
    <section
      className="relative h-96 flex items-center justify-center"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${bg}') center/cover no-repeat`,
      }}
    >
      <div className="text-center px-4 text-white max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore Our Features
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Discover how our platform empowers Riders and Drivers with seamless
          tools and intuitive controls for a smarter, safer ride experience.
        </p>
      </div>
    </section>
  );
}
