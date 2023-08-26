import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <button
        className="w-full text-left p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{question}</span>
      </button>
      {isOpen && (
        <div className="p-4">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQAccordion = () => {
  const faqs = [
    {
      question: "How can I reduce weed growth without using chemical herbicides?",
      answer:
        "You can try using mulch, cover crops, or manual weeding to naturally suppress weed growth and maintain a healthier ecosystem on your farm.",
    },
    {
        question: "What are some natural ways to control pests on my crops?",
        answer: "Integrated pest management (IPM) techniques involve using beneficial insects, traps, and cultural practices to minimize pest populations without relying on chemical pesticides.",
    },
    {
        question: "What are some natural ways to control pests on my crops?",
        answer: "Integrated pest management (IPM) techniques involve using beneficial insects, traps, and cultural practices to minimize pest populations without relying on chemical pesticides.",
    },
    {
        question: "What are some natural ways to control pests on my crops?",
        answer: "Integrated pest management (IPM) techniques involve using beneficial insects, traps, and cultural practices to minimize pest populations without relying on chemical pesticides.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
