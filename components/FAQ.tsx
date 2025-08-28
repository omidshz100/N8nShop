'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What license do I get with my purchase?',
    answer: 'You receive a commercial license that allows you to use the workspace in your business environment. You can modify and customize the workflow to fit your needs, but redistribution is not permitted.'
  },
  {
    question: 'Do you provide support after purchase?',
    answer: 'Yes! Each purchase includes 30 days of email support to help you set up and configure your workflow. We also provide comprehensive documentation and video tutorials.'
  },
  {
    question: 'How do I receive updates to my workspace?',
    answer: 'We regularly update our workspaces with improvements and new features. Customers receive free updates for 12 months after purchase via email notifications.'
  },
  {
    question: 'What if the workspace doesn\'t work for me?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with your purchase, contact us for a full refund - no questions asked.'
  },
  {
    question: 'How are the workspaces delivered?',
    answer: 'After payment confirmation, you\'ll receive an immediate email with download links, setup instructions, and access to our customer portal where you can access updates and support resources.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our n8n workspaces.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}