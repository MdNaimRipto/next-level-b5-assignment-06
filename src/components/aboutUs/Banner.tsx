import bg from "@/assets/aboutBanner.jpg";

export default function AboutUsBanner() {
  return (
    <section
      className="relative h-96 flex items-center justify-center"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${bg}') center/cover no-repeat`,
      }}
    >
      <div className="text-center px-4 text-white max-w-3xl">
        <h1 className="text-xl md:text-4xl font-bold mb-4">
          Connecting People, Driving Possibilities
        </h1>
        <p className="text-xs md:text-xl mb-6">
          Since day one, our goal has been to make urban travel seamless and
          safe. By connecting riders and drivers through an intuitive platform,
          we’re redefining what city transportation can be.
        </p>
      </div>
    </section>
  );
}
