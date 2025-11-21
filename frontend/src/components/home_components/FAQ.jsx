import React, { useState } from "react";
import { Plus, Minus } from "react-feather";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Apa itu Decommoir?",
            answer:
                "DECOMMOIR adalah sebuah solusi sistem IoT terintegrasi yang dirancang untuk mendukung pengelolaan sampah organik melalui integrasi pemantauan lingkungan dan teknologi pengenalan citra. Sistem ini memanfaatkan larva Black Soldier Fly (BSF) untuk mengurai sampah makanan dari program Makanan Bergizi Gratis."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            id="faq" className="min-h-screen bg-[#1E1E1E] text-white flex flex-col items-center justify-center px-4 sm:px-6 py-20">
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-4">F.A.Q</h2>
            <p className="text-center text-gray-300 mb-12 text-sm sm:text-base px-4">
                Find answers to common questions about our system
            </p>

            <div className="w-full max-w-4xl h-full flex flex-col gap-4">
                {faqs.map((item, index) => (
                    <div key={index} className="bg-[#2A2A2A] rounded-md overflow-hidden">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 text-left text-sm sm:text-lg font-medium hover:bg-[#444444] transition"
                        >
                            {openIndex === index ? <Minus size={20} className="sm:w-6 sm:h-6 flex-shrink-0" /> : <Plus size={20} className="sm:w-6 sm:h-6 flex-shrink-0" />}
                            <span className="break-words">{item.question}</span>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-out ${openIndex === index
                                    ? "max-h-96 opacity-100 translate-y-0"
                                    : "max-h-0 opacity-0 -translate-y-2"
                                }`}
                                >
                            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-700 text-gray-300 text-xs sm:text-sm leading-relaxed break-words">
                            {item.answer}
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </section >
    );
}
