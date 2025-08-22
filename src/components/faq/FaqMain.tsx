import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    question: "How do I book a ride?",
    answer:
      "Simply go to the Home page, select your pickup and destination points, choose a payment method, and confirm your ride.",
  },
  {
    question: "Can I cancel a ride?",
    answer:
      "Yes, you can cancel a ride before the driver arrives. Cancellation fees may apply based on timing.",
  },
  {
    question: "How do I become a driver?",
    answer:
      "Sign up with the Driver role, provide your vehicle and personal details, and submit verification documents.",
  },
  {
    question: "Is there a loyalty program for riders?",
    answer:
      "Yes, we offer rewards and discounts for frequent riders. Check your profile for available offers.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click on 'Forgot Password' on the login page and follow the instructions to reset your password via email.",
  },
  {
    question: "Can I track my driver in real-time?",
    answer:
      "Yes, after booking a ride, you can see the live location of your driver and ETA updates.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept credit/debit cards, digital wallets, and cash payments depending on your region.",
  },
  {
    question: "How do I report a problem with a ride?",
    answer:
      "Go to the Ride History, select the ride, and click 'Report Issue' to submit your complaint or feedback.",
  },
  {
    question: "Are there safety measures for drivers and riders?",
    answer:
      "Yes, we have SOS buttons, ride tracking, and verification processes to ensure safety at all times.",
  },
  {
    question: "Can I change my profile information?",
    answer:
      "Yes, you can edit your profile, contact info, and password from your account settings anytime.",
  },
];

const FaqMain = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <Accordion
        type="single"
        collapsible
        className="space-y-4 max-w-3xl mx-auto"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border rounded-lg"
          >
            <AccordionTrigger className="px-4 py-3 font-medium text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqMain;
