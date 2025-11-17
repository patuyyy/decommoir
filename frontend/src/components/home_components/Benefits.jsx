import React from "react";
import benefitsImg from "../../assets/benefits.png";

export default function Benefits() {
  return (
    <section className="w-full min-h-screen py-20 px-6 md:px-16 bg-white flex">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        <div className="w-full md:w-1/2 flex justify-center">
          <img 
            src={benefitsImg} 
            alt="Benefits Preview" 
            className="w-full max-w-lg rounded-xl shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Benefits to The MBG Program
          </h2>

          <ul className="space-y-4 text-lg">
            {[
              "Mengolah food waste hingga 80%",
              "Menambah value terhadap hasil food waste",
              "Menghasilkan pakan ternak dan pupuk organik",
              "Meningkatkan kesadaran dalam lingkungan siswa di sekolah",
              "Data evaluasi Program MBG yang akurat",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✔</span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
