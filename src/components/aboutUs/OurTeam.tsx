import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "CEO & Founder",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mark Smith",
    role: "CTO",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Sophia Lee",
    role: "Lead Designer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "James Brown",
    role: "Head of Operations",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Emma Davis",
    role: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    name: "Liam Wilson",
    role: "Senior Developer",
    image: "https://randomuser.me/api/portraits/men/68.jpg",
  },
];

export default function OurTeam() {
  return (
    <section className="py-20 overflow-hidden">
      <div>
        <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>

        <div className="relative flex items-center justify-center">
          <Carousel>
            <CarouselContent className="gap-6 m-4">
              {teamMembers.map((member, idx) => (
                <CarouselItem key={idx} className="lg:basis-1/3">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
