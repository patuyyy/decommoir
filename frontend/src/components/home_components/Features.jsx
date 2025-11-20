import FeatureCard from "./FeatureCard";
import { MdMonitor, MdLinkedCamera } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import FeatureCard1 from "../../assets/FeatureCard1.png"

export default function Home2() {
    return (
        <section className="w-full min-h-screen py-20 bg-[#384BA8] items-center justify-center flex flex-col">

            <div className="w-full">
                <h2 className="text-6xl ml-12 mb-16 md:ml-36 text-white font-semibold">
                    Fitur kami
                </h2>
            </div>

            <div className="w-full overflow-x-auto no-scrollbar">
                <div className="flex gap-6 pl-12 md:pl-36 flex-nowrap pb-4 min-w-max">

                    <div className="max-w-[348px] h-[686px]">
                        <FeatureCard
                            title="Real-time Monitoring"
                            description="Memantau dengan berbagai sensor secara langsung dengan sensor IoT"
                            bgImage={FeatureCard1}
                        />
                    </div>
                    
                    <div className="max-w-[348px] h-[686px]">
                        <FeatureCard
                            title="Real-time Monitoring"
                            description="Memantau dengan berbagai sensor secara langsung dengan sensor IoT"
                            bgImage={FeatureCard1}
                        />
                    </div>

                    <div className="max-w-[348px] h-[686px]">
                        <FeatureCard
                            title="Real-time Monitoring"
                            description="Memantau dengan berbagai sensor secara langsung dengan sensor IoT"
                            bgImage={FeatureCard1}
                        />
                    </div>

                    <div className="max-w-[348px] h-[686px]">
                        <FeatureCard
                            title="Real-time Monitoring"
                            description="Memantau dengan berbagai sensor secara langsung dengan sensor IoT"
                            bgImage={FeatureCard1}
                        />
                    </div>

                    <div className="max-w-[348px] h-[686px]">
                        <FeatureCard
                            title="Real-time Monitoring"
                            description="Memantau dengan berbagai sensor secara langsung dengan sensor IoT"
                            bgImage={FeatureCard1}
                        />
                    </div>

                    <div className="max-w-[348px] h-[686px]">
                        <FeatureCard
                            title="Real-time Monitoring"
                            description="Memantau dengan berbagai sensor secara langsung dengan sensor IoT"
                            bgImage={FeatureCard1}
                        />
                    </div>

                    <div className="max-w-[348px] h-[686px]">
                        <FeatureCard
                            title="Real-time Monitoring"
                            description="Memantau dengan berbagai sensor secara langsung dengan sensor IoT"
                            bgImage={FeatureCard1}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
