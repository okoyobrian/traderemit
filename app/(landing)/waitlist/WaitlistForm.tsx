"use client";

import { useState } from "react";
import Button from "@/app/components/Button";

export default function WaitlistForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone_number', phoneNumber);
  
      const response = await fetch('/api/signupForWaitlist', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json()
  
      if (data.code === 'user-exists') {
        setMessage('This email is already on the waitlist.');
      } else if (response.ok) {
        setMessage('Successfully joined the waitlist!');
      } else {
        setMessage(`Failed to join the waitlist. Please try again. (message: ${data.message})`);
      }
      setLoading(false);
    };
  
    return (
      
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary-text">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary-text">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary-text">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
          </div>
          <Button disabled={loading}>{loading ? "Sending..." : "Join the waitlist"}</Button>
          {message && <p className="mt-4 font-semibold text-secondary-text">{message}</p>}
        </form>
    );
  }