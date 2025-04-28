"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { FormEvent } from "react";

export default function PodcastContactForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    const mailtoLink = `mailto:tim.retic@retici.com?subject=Podcast Guest Request from ${name}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <form 
      className="grid gap-6 mb-16"
      onSubmit={handleSubmit}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Input name="name" placeholder="Name" className="bg-black border-[#D4AF37]" required />
        <Input name="email" placeholder="Email" type="email" className="bg-black border-[#D4AF37]" required />
      </div>
      <Textarea
        name="message"
        placeholder="Tell us about yourself and what you'd like to discuss..."
        className="bg-black border-[#D4AF37] h-32"
        required
      />
      <Button type="submit" className="gold-gradient-bg w-full md:w-auto md:px-12 justify-self-center">Submit Request</Button>
    </form>
  );
} 