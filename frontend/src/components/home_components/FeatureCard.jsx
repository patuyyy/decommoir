import { FiMonitor } from "react-icons/fi";

export default function FeatureCard({ icon: Icon = FiMonitor, title, description }) {
  return (
    <div className="bg-[#F5F6FA] backdrop-blur-md rounded-3xl p-8 shadow-lg w-[350px] h-[240px] flex flex-col items-start justify-start transition-all hover:scale-[1.03] hover:shadow-xl cursor-pointer">
      <Icon size={40} className="text-black mb-4" />

      <h3 className="text-2xl font-bold text-black mb-2">{title}</h3>

      <p className="text-black/80 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}