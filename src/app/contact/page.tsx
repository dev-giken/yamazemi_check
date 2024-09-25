// pages/contact.tsx
import React from 'react';
import ContactForm from '@/components/ui/ContactForm';

export default function Contact() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center">
        <ContactForm />
      </div>
    </main>
  );
}