import { Link } from "react-router";
import { Button } from "../ui/button";

export default function AboutUs() {
  return (
    <section className="py-16 px-16">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Right Side - Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1556742400-b5d14c2db15b?auto=format&fit=crop&w=800&q=80"
            alt="About Us Illustration"
            className="rounded-2xl shadow-lg w-full max-w-md"
          />
        </div>

        {/* Left Side - Text */}
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold">About Our Platform</h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
            We connect riders and drivers with a seamless and reliable platform
            designed for convenience, safety, and flexibility. Our mission is to
            make every ride smarter, safer, and more enjoyable.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Instant ride booking and fare estimation</li>
            <li>Driver availability and earnings management</li>
            <li>Live tracking and SOS emergency support</li>
            <li>Secure and reliable experience for everyone</li>
          </ul>
          <Button asChild size="lg" className="mt-4 self-center lg:self-start">
            <Link to="/about">Learn More About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
