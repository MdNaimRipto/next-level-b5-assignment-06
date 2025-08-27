import Countdown from "react-countdown";
import { Button } from "../ui/button"; // ShadCN button
import bg from "@/assets/banner/banner01.jpg";

export default function SpecialOffers() {
  return (
    <section
      className="relative mb-16 w-full h-[500px] flex items-center"
      style={{
        background: `linear-gradient(45deg, #000000cc, #1a1a1a), url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/10 to-black/0"></div>

      {/* Content */}
      <div className="relative z-10 px-4 flex flex-col gap-2 items-center justify-center h-full text-center lg:text-left text-white w-full">
        <h2 className="text-5xl font-bold text-white">Great Deal</h2>
        <p className="text-lg font-semibold text-gray-200">Up To 90% Off</p>
        <p className="text-sm leading-6 max-w-xs text-center text-gray-300">
          Book your rides now and enjoy exclusive offers available for a limited
          time.
        </p>

        <div className="my-4 text-3xl font-extrabold text-white">
          <Countdown date={Date.now() + 24 * 60 * 60 * 1000} />
        </div>

        <Button
          size="lg"
          asChild
          className="bg-white hover:bg-white text-black font-semibold"
        >
          <a href="/features">Book Now</a>
        </Button>
      </div>
    </section>
  );
}
