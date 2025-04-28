'use client'

import React, { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Create email content
    const subject = encodeURIComponent(`Podcast Guest Request from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    // Open mailto link
    window.location.href = `mailto:tim.retic@retici.com?subject=${subject}&body=${body}`;
  };

  return (
    <form className="grid gap-6 mb-16" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <Input 
          placeholder="Name" 
          className="bg-black border-[#D4AF37]" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input 
          placeholder="Email" 
          type="email" 
          className="bg-black border-[#D4AF37]" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <Textarea
        placeholder="Tell us about yourself and what you'd like to discuss..."
        className="bg-black border-[#D4AF37] h-32"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <Button 
        type="submit" 
        className="gold-gradient-bg w-full md:w-auto md:px-12 justify-self-center"
      >
        Submit Request
      </Button>
    </form>
  );
} 