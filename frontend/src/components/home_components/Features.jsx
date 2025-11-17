import FeatureCard from "./FeatureCard";
import { MdMonitor, MdLinkedCamera  } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";

export default function Home2() {
    return (
        <section className="w-full min-h-screen py-20 bg-[#384BA8] px-10 items-center justify-center flex flex-col">

            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-12 text-left">
                    Our Features
                </h2>
                <div className="flex flex-wrap gap-10 justify-center">
                    <FeatureCard
                        icon={MdMonitor}
                        title="Real-time Monitoring"
                        description="Memantau suhu, kelembapan, dan kadar amonia budidaya maggot secara langsung dengan sensor IoT"
                    />
                    <FeatureCard
                        icon={MdLinkedCamera}
                        title="AI Classification"
                        description="Memantau suhu, kelembapan, dan kadar amonia budidaya maggot secara langsung dengan sensor IoT"
                    />
                    <FeatureCard
                        icon={FaChartBar}
                        title="Data analysis"
                        description="Memantau suhu, kelembapan, dan kadar amonia budidaya maggot secara langsung dengan sensor IoT"
                    />
                </div>
            </div>
        </section>


    );
}
