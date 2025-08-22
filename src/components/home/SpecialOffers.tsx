import Countdown from "react-countdown";
import { Button } from "../ui/button"; // ShadCN button
import bg from "@/assets/great-deals/banner.webp";

export default function SpecialOffers() {
  return (
    <section
      className="relative mb-16 w-full h-[500px] flex items-center"
      style={{
        background: `linear-gradient(45deg, #0000006e, #00000080), url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(246,236,226,0.98)] via-[rgba(246,236,226,0.83)] to-[rgba(246,236,226,0.52)]"></div>

      {/* Content */}
      <div className="relative z-10 px-4 flex flex-col gap-2 items-center justify-center h-full text-center lg:text-left text-black w-full">
        <h2 className="text-5xl font-semibold">Great Deal</h2>
        <p className="text-lg font-medium">Up To 90% Off</p>
        <p className="text-sm leading-6 max-w-xs text-center">
          Book your rides now and enjoy exclusive offers available for a limited
          time.
        </p>

        <div className="my-4 text-3xl font-bold">
          <Countdown date={Date.now() + 24 * 60 * 60 * 1000} />
        </div>

        <Button size="lg" asChild>
          <a href="/features">Book Now</a>
        </Button>
      </div>
    </section>
  );
}
