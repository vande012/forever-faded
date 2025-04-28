"use client";

import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export interface CareerApplicationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CareerApplicationModal = ({ isOpen, onOpenChange }: CareerApplicationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    reasonToJoin: '',
  });
  const [formError, setFormError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // Check required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.reasonToJoin) {
      setFormError('Please fill in all required fields');
      return false;
    }
    
    setFormError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Create message body for email
    const emailBody = `
Dear Tim,

I would like to apply for a position at Forever Faded Barbershop.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.position ? `Position: ${formData.position}` : ''}
${formData.experience ? `Experience: ${formData.experience}` : ''}

Why I want to work at Forever Faded:
${formData.reasonToJoin}

I will attach my resume to this email as requested.

Best regards,
${formData.name}
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:tim.retic@retici.com?subject=Job Application: ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(emailBody)}`;
    
    // Note about resume
    alert('Your email client will open now. IMPORTANT: You MUST attach your resume to this email for your application to be considered.');
    
    // Open email client
    window.open(mailtoLink, '_blank');
    
    // Close modal
    onOpenChange(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      reasonToJoin: '',
    });
    setFormError('');
  };

  // When modal closes, reset form
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1d1d1d] border-[#D3A84C] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl gold-gradient-text">Join Our Team</DialogTitle>
          <DialogDescription className="text-gray-300 mt-2">
            {`We're looking for talented individuals to join Forever Faded Barbershop. Please fill out the form below to apply.`} 
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-white text-sm">Full Name *</label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Your full name" 
                required 
                className="bg-black/50 text-white border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-white text-sm">Email Address *</label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Your email address" 
                required 
                className="bg-black/50 text-white border-gray-700"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-white text-sm">Phone Number *</label>
              <Input 
                id="phone" 
                name="phone" 
                type="tel" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Your phone number" 
                required 
                className="bg-black/50 text-white border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="position" className="text-white text-sm">Position</label>
              <Input 
                id="position" 
                name="position" 
                value={formData.position} 
                onChange={handleChange} 
                placeholder="Position you're applying for" 
                className="bg-black/50 text-white border-gray-700"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="experience" className="text-white text-sm">Experience</label>
            <Input 
              id="experience" 
              name="experience" 
              value={formData.experience} 
              onChange={handleChange} 
              placeholder="Years of experience" 
              className="bg-black/50 text-white border-gray-700"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="reasonToJoin" className="text-white text-sm">Why do you want to work at Forever Faded? *</label>
            <Textarea 
              id="reasonToJoin" 
              name="reasonToJoin" 
              value={formData.reasonToJoin} 
              onChange={handleChange} 
              placeholder="Tell us why you want to join our team" 
              required 
              rows={4}
              className="bg-black/50 text-white border-gray-700"
            />
          </div>
          
          <div className="rounded-lg p-4 bg-yellow-900/20 border border-yellow-700">
            <h4 className="text-yellow-500 font-semibold mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Important Notice
            </h4>
            <p className="text-white text-sm">
              You <span className="font-bold text-yellow-500">MUST</span> attach your resume (PDF format preferred) to the email that will open after submitting this form.
            </p>
            <p className="text-white text-sm mt-2">
              Applications without resumes will not be considered.
            </p>
          </div>
          
          {formError && (
            <div className="text-red-500 text-sm p-2 bg-red-900/20 border border-red-900 rounded">
              {formError}
            </div>
          )}
          
          <DialogFooter className="flex gap-2 pt-4">
            <DialogClose asChild>
              <Button type="button" className="gold-border-btn">Cancel</Button>
            </DialogClose>
            <Button 
              type="submit" 
              className="gold-gradient-bg"
            >
              Continue to Email
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 