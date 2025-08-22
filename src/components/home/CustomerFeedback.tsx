import { Card, CardContent } from "../ui/card";

const reviews = [
  {
    name: "Alice Johnson",
    role: "Rider",
    rating: 5,
    feedback:
      "The ride experience was seamless! I loved the real-time tracking and the driver was very professional.",
  },
  {
    name: "Michael Smith",
    role: "Driver",
    rating: 5,
    feedback:
      "Being a driver on this platform gives me full flexibility and transparency in earnings. Highly recommend!",
  },
  {
    name: "Samantha Lee",
    role: "Rider",
    rating: 4.8,
    feedback:
      "Booking a ride has never been easier. I feel safe knowing there's an SOS feature and verified drivers.",
  },
];

export default function CustomerFeedback() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 px-4">
      <div className="container mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Hear from riders and drivers who trust our platform for their daily
          journeys.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review, index) => (
          <Card
            key={index}
            className="shadow-lg hover:shadow-xl transition-shadow"
          >
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{review.name}</h3>
                <span className="text-yellow-400">
                  {"★".repeat(Math.floor(review.rating))}
                </span>
              </div>
              <p className="text-muted-foreground">{review.feedback}</p>
              <span className="text-sm text-muted-foreground italic">
                {review.role}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
