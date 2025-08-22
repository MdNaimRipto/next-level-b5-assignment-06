import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useRef } from "react";

export default function HeroCarousel() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  const slides = [
    {
      title: "Seamless Rides for Passengers",
      description:
        "Enjoy quick and reliable rides anytime, anywhere. Get instant fare estimates, choose your preferred payment method, and track your driver in real time. Designed to keep your journeys safe, smooth, and stress-free.",
      image:
        "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1600&q=80",
      cta: "Book a Ride",
      link: "/features",
    },
    {
      title: "Flexibility & Earnings for Drivers",
      description:
        "Take control of your schedule and earnings. Easily toggle availability, accept ride requests on the go, and access detailed ride history with earnings insights. Built to empower drivers with flexibility and transparency.",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1600&q=80",
      cta: "Start Driving",
      link: "/features",
    },
    {
      title: "Safety & Trust at Every Step",
      description:
        "Both riders and drivers can travel with confidence. SOS emergency support, verified profiles, and live ride tracking ensure a secure experience for everyone on the road.",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
      cta: "Learn More",
      link: "/features",
    },
  ];

  return (
    <section className="relative w-full">
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="basis-full">
              <Card className="border-0 shadow-none relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-[70vh] object-cover rounded-none"
                />
                {/* Overlay */}
                <CardContent className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6 text-white">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl max-w-2xl mb-6">
                    {slide.description}
                  </p>
                  <Button asChild size="lg" className="bg-primary text-white">
                    <a href={slide.link}>{slide.cta}</a>
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
