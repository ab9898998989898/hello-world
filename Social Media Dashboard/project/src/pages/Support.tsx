import React from 'react';
import { Mail, Phone, MessageSquare, FileText, Clock, ExternalLink } from 'lucide-react';

const Support: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-2xl md:text-3xl">Support Center</h1>
        <p className="text-dark-400">Get help with your account and platform features.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary-500/10">
              <Mail size={24} className="text-primary-500" />
            </div>
            <h3 className="font-semibold">Email Support</h3>
          </div>
          <p className="text-dark-300 mb-4">Get in touch with our support team via email.</p>
          <button className="btn btn-primary w-full">Send Email</button>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-secondary-500/10">
              <Phone size={24} className="text-secondary-500" />
            </div>
            <h3 className="font-semibold">Phone Support</h3>
          </div>
          <p className="text-dark-300 mb-4">Speak directly with our support team.</p>
          <button className="btn btn-primary w-full">Call Support</button>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent-500/10">
              <MessageSquare size={24} className="text-accent-500" />
            </div>
            <h3 className="font-semibold">Live Chat</h3>
          </div>
          <p className="text-dark-300 mb-4">Chat with our support team in real-time.</p>
          <button className="btn btn-primary w-full">Start Chat</button>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: "How do I connect my social media accounts?",
              answer: "Go to the Platforms page and click on 'Connect Platform' to link your social media accounts."
            },
            {
              question: "Can I schedule posts in advance?",
              answer: "Yes, you can schedule posts using our Content Calendar feature in the Content section."
            },
            {
              question: "How often are analytics updated?",
              answer: "Analytics are updated in real-time for most metrics, with some aggregate data updated hourly."
            }
          ].map((faq, index) => (
            <div key={index} className="p-4 bg-dark-800 rounded-lg">
              <h3 className="font-medium mb-2">{faq.question}</h3>
              <p className="text-dark-300 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={24} className="text-primary-500" />
            <h3 className="font-semibold">Documentation</h3>
          </div>
          <p className="text-dark-300 mb-4">
            Browse our comprehensive documentation for detailed guides and tutorials.
          </p>
          <button className="btn btn-outline w-full">
            View Documentation
            <ExternalLink size={16} />
          </button>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Clock size={24} className="text-secondary-500" />
            <h3 className="font-semibold">Support Hours</h3>
          </div>
          <div className="space-y-2 mb-4">
            <p className="text-dark-300">Monday - Friday: 9:00 AM - 8:00 PM EST</p>
            <p className="text-dark-300">Saturday: 10:00 AM - 6:00 PM EST</p>
            <p className="text-dark-300">Sunday: Closed</p>
          </div>
          <p className="text-sm text-dark-400">
            Emergency support available 24/7 for Pro plan members
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;