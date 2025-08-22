import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields!");
      return;
    }
    // Simulate form submission
    toast.success("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-16 dark:bg-gray-900 px-4">
      <div className="container mx-auto max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
        >
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="h-10"
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="h-10"
          />
          <Textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
          />
          <Button type="submit" size="lg" className="mt-2">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
