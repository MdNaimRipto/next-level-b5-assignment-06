import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function ServiceHighlights() {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  const services = [
    {
      title: "Book Your Ride",
      description:
        "Quickly request a ride by setting your pickup and drop-off locations. Get instant fare estimates and choose your preferred payment method.",
      icon: "🚖",
    },
    {
      title: "Driver Availability",
      description:
        "Drivers can easily toggle availability to accept ride requests and maximize earnings with flexible schedules.",
      icon: "🕑",
    },
    {
      title: "Live Ride Tracking",
      description:
        "Track your ride in real-time on the map, know your driver's details, and enjoy a transparent and safe journey.",
      icon: "📍",
    },
    {
      title: "Ride History",
      description:
        "Keep a record of all your rides with detailed info, fare breakdowns, and timestamps for easy reference.",
      icon: "📜",
    },
    {
      title: "Safety First",
      description:
        "Emergency SOS button, verified drivers, and secure ride tracking ensure safety for both riders and drivers.",
      icon: "🛡️",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">How Our Service Works</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Experience a seamless platform designed for riders and drivers. Here's
          a quick look at the main features.
        </p>
      </div>

      <Carousel plugins={[autoplay.current]} className="w-full">
        <CarouselContent className="gap-6">
          {services.map((service, index) => (
            <CarouselItem
              key={index}
              className="basis-[80%] sm:basis-[45%] md:basis-[30%]"
            >
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="flex flex-col items-center text-center gap-4 p-6">
                  <div className="text-5xl">{service.icon}</div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
