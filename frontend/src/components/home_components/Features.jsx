import FeatureCard from "./FeatureCard";
import { useState, useRef, useEffect } from "react";
import { MdMonitor, MdLinkedCamera } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import rt from "../../assets/rt-feature.svg";
import ai from "../../assets/ai-feature.svg";
import dataAnalytics from "../../assets/data-feature.png";

export default function Home2() {
    const scrollContainerRef = useRef(null);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [closing, setClosing] = useState(false);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setSelectedFeature(null);
            setClosing(false);
        }, 200);
    };

    useEffect(() => {
        checkScrollPosition();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            window.addEventListener('resize', checkScrollPosition);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollPosition);
            }
            window.removeEventListener('resize', checkScrollPosition);
        };
    }, []);

    useEffect(() => {
        if (selectedFeature) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => (document.body.style.overflow = "auto");
    }, [selectedFeature]);


    return (
        <section className="w-full min-h-screen py-20 bg-[#384BA8] items-end justify-center flex flex-col">
            <div className="w-full -mb-10">
                <h2 className="text-5xl ml-12 mb-12 md:ml-80 text-white font-semibold">
                    Fitur kami
                </h2>
            </div>
            <div className="w-full overflow-x-auto no-scrollbar pt-8" ref={scrollContainerRef}>
                <div className="flex gap-6 pl-6 md:pl-80 flex-nowrap pb-4 pr-5 md:pr-0 min-w-max">
                    <div className="max-w-[348px] h-[686px] relative">
                        <FeatureCard
                            title="Real-time Monitoring"
                            description="Memantau dengan berbagai sensor secara langsung dengan sensor IoT"
                            bgImage={rt}
                            onClick={() => setSelectedFeature({
                                title: "Real-time Monitoring",
                                description: "Memantau dengan berbagai sensor secara langsung dengan sensor IoT",
                                long_description: "Sistem kami didukung oleh integrasi IoT real-time yang memastikan setiap kondisi lingkungan budidaya maggot dapat dipantau secara akurat. Sensor DHT mengirimkan data suhu dan kelembaban, sementara sensor gas/amonia mendeteksi kadar amonia di dalam area budidaya. Seluruh data penting ini dikirim secara otomatis dan terus-menerus ke server, sehingga pengguna dapat mengetahui perubahan kondisi lingkungan kapan pun dibutuhkan. Dengan pemantauan ini, kesehatan maggot tetap terjaga, risiko stres pada maggot dapat dikurangi, dan proses budidaya berlangsung lebih optimal dan efisien.",
                            })}
                        />
                    </div>
                    <div className="max-w-[348px] h-[686px] relative">
                        <FeatureCard
                            title="AI Classification"
                            description="Teknologi pengenalan citra untuk mengklasifikasi jenis makanan sisa dan mengoptimalkan pengolahan"
                            bgImage={ai}
                            onClick={() => setSelectedFeature({
                                title: "AI Classification",
                                description: "Teknologi pengenalan citra untuk mengklasifikasi jenis makanan sisa dan mengoptimalkan pengolahan",
                                long_description: "Teknologi pengenalan citra digunakan untuk mengidentifikasi dan mengklasifikasi berbagai jenis sisa makanan secara otomatis. Kamera atau modul pengambil gambar menangkap foto bahan sisa, kemudian model vision menganalisis ciri visualnya untuk menentukan kategori seperti sayuran, buah, daging, karbohidrat, atau material non-organik. Dengan klasifikasi yang akurat, sistem dapat mengarahkan setiap jenis sisa makanan ke proses pengolahan yang paling sesuai sehingga pengomposan, fermentasi, atau pemrosesan lainnya menjadi lebih efisien. Pendekatan ini membantu mengurangi kesalahan sortasi manual, meningkatkan kualitas hasil pengolahan, dan memastikan setiap jenis limbah organik ditangani sesuai karakteristiknya.",
                            })}
                        />
                    </div>
                    <div className="max-w-[348px] h-[686px] relative">
                        <FeatureCard
                            title="Data Analytics"
                            description="Visualisasi dan analisis statistik untuk evaluasi Program MBG dan efektivitas pengolahan sampah"
                            bgImage={dataAnalytics}
                            onClick={() => setSelectedFeature({
                                title: "Data Analytics",
                                description: "Visualisasi dan analisis statistik untuk evaluasi Program MBG dan efektivitas pengolahan sampah",
                                long_description: "Data analytics digunakan untuk memvisualisasikan dan menganalisis berbagai data operasional, termasuk performa Program MBG dan efektivitas proses pengolahan sampah. Melalui grafik, metrik, serta analisis statistik, sistem ini membantu mengungkap pola, tren, dan anomali sehingga proses pengambilan keputusan dapat dilakukan secara lebih tepat dan berbasis data. Pendekatan ini memastikan setiap kebijakan dan perbaikan dalam program pengelolaan sampah dapat dievaluasi secara objektif dan berkelanjutan.",
                            })}
                        />
                    </div>
                    <div className="max-w-[348px] h-[686px] relative">
                        <FeatureCard
                            title="Real-time Monitoring"
                            description="Memantau dengan berbagai sensor secara langsung dengan sensor IoT"
                            bgImage={rt}
                            onClick={() => setSelectedFeature({
                                title: "Real-time Monitoring",
                                description: "Memantau dengan berbagai sensor secara langsung dengan sensor IoT",
                                long_description: "Sistem kami didukung oleh integrasi IoT real-time yang memastikan setiap kondisi lingkungan budidaya maggot dapat dipantau secara akurat. Sensor DHT mengirimkan data suhu dan kelembaban, sementara sensor gas/amonia mendeteksi kadar amonia di dalam area budidaya. Seluruh data penting ini dikirim secara otomatis dan terus-menerus ke server, sehingga pengguna dapat mengetahui perubahan kondisi lingkungan kapan pun dibutuhkan. Dengan pemantauan ini, kesehatan maggot tetap terjaga, risiko stres pada maggot dapat dikurangi, dan proses budidaya berlangsung lebih optimal dan efisien.",
                            })}
                        />
                    </div>
                    <div className="max-w-[348px] h-[686px] relative">
                        <FeatureCard
                            title="AI Classification"
                            description="Teknologi pengenalan citra untuk mengklasifikasi jenis makanan sisa dan mengoptimalkan pengolahan"
                            bgImage={ai}
                            onClick={() => setSelectedFeature({
                                title: "AI Classification",
                                description: "Teknologi pengenalan citra untuk mengklasifikasi jenis makanan sisa dan mengoptimalkan pengolahan",
                                long_description: "Teknologi pengenalan citra digunakan untuk mengidentifikasi dan mengklasifikasi berbagai jenis sisa makanan secara otomatis. Kamera atau modul pengambil gambar menangkap foto bahan sisa, kemudian model vision menganalisis ciri visualnya untuk menentukan kategori seperti sayuran, buah, daging, karbohidrat, atau material non-organik. Dengan klasifikasi yang akurat, sistem dapat mengarahkan setiap jenis sisa makanan ke proses pengolahan yang paling sesuai sehingga pengomposan, fermentasi, atau pemrosesan lainnya menjadi lebih efisien. Pendekatan ini membantu mengurangi kesalahan sortasi manual, meningkatkan kualitas hasil pengolahan, dan memastikan setiap jenis limbah organik ditangani sesuai karakteristiknya.",
                            })}
                        />
                    </div>
                    <div className="max-w-[348px] h-[686px] relative">
                        <FeatureCard
                            title="Data Analytics"
                            description="Visualisasi dan analisis statistik untuk evaluasi Program MBG dan efektivitas pengolahan sampah"
                            bgImage={dataAnalytics}
                            onClick={() => setSelectedFeature({
                                title: "Data Analytics",
                                description: "Visualisasi dan analisis statistik untuk evaluasi Program MBG dan efektivitas pengolahan sampah",
                                long_description: "Data analytics digunakan untuk memvisualisasikan dan menganalisis berbagai data operasional, termasuk performa Program MBG dan efektivitas proses pengolahan sampah. Melalui grafik, metrik, serta analisis statistik, sistem ini membantu mengungkap pola, tren, dan anomali sehingga proses pengambilan keputusan dapat dilakukan secara lebih tepat dan berbasis data. Pendekatan ini memastikan setiap kebijakan dan perbaikan dalam program pengelolaan sampah dapat dievaluasi secara objektif dan berkelanjutan.",
                            })}
                        />
                    </div>
                    <div className="max-w-[348px] h-[686px] relative">
                        <FeatureCard
                            title="Real-time Monitoring"
                            description="Memantau dengan berbagai sensor secara langsung dengan sensor IoT"
                            bgImage={rt}
                            onClick={() => setSelectedFeature({
                                title: "Real-time Monitoring",
                                description: "Memantau dengan berbagai sensor secara langsung dengan sensor IoT",
                                long_description: "Sistem kami didukung oleh integrasi IoT real-time yang memastikan setiap kondisi lingkungan budidaya maggot dapat dipantau secara akurat. Sensor DHT mengirimkan data suhu dan kelembaban, sementara sensor gas/amonia mendeteksi kadar amonia di dalam area budidaya. Seluruh data penting ini dikirim secara otomatis dan terus-menerus ke server, sehingga pengguna dapat mengetahui perubahan kondisi lingkungan kapan pun dibutuhkan. Dengan pemantauan ini, kesehatan maggot tetap terjaga, risiko stres pada maggot dapat dikurangi, dan proses budidaya berlangsung lebih optimal dan efisien.",
                            })}
                        />
                    </div>
                    <div className="max-w-[348px] h-[686px] relative">
                        <FeatureCard
                            title="AI Classification"
                            description="Teknologi pengenalan citra untuk mengklasifikasi jenis makanan sisa dan mengoptimalkan pengolahan"
                            bgImage={ai}
                            onClick={() => setSelectedFeature({
                                title: "AI Classification",
                                description: "Teknologi pengenalan citra untuk mengklasifikasi jenis makanan sisa dan mengoptimalkan pengolahan",
                                long_description: "Teknologi pengenalan citra digunakan untuk mengidentifikasi dan mengklasifikasi berbagai jenis sisa makanan secara otomatis. Kamera atau modul pengambil gambar menangkap foto bahan sisa, kemudian model vision menganalisis ciri visualnya untuk menentukan kategori seperti sayuran, buah, daging, karbohidrat, atau material non-organik. Dengan klasifikasi yang akurat, sistem dapat mengarahkan setiap jenis sisa makanan ke proses pengolahan yang paling sesuai sehingga pengomposan, fermentasi, atau pemrosesan lainnya menjadi lebih efisien. Pendekatan ini membantu mengurangi kesalahan sortasi manual, meningkatkan kualitas hasil pengolahan, dan memastikan setiap jenis limbah organik ditangani sesuai karakteristiknya.",
                            })}
                        />
                    </div>
                    <div className="max-w-[348px] h-[686px] relative">
                        <FeatureCard
                            title="Data Analytics"
                            description="Visualisasi dan analisis statistik untuk evaluasi Program MBG dan efektivitas pengolahan sampah"
                            bgImage={dataAnalytics}
                            onClick={() => setSelectedFeature({
                                title: "Data Analytics",
                                description: "Visualisasi dan analisis statistik untuk evaluasi Program MBG dan efektivitas pengolahan sampah",
                                long_description: "Data analytics digunakan untuk memvisualisasikan dan menganalisis berbagai data operasional, termasuk performa Program MBG dan efektivitas proses pengolahan sampah. Melalui grafik, metrik, serta analisis statistik, sistem ini membantu mengungkap pola, tren, dan anomali sehingga proses pengambilan keputusan dapat dilakukan secara lebih tepat dan berbasis data. Pendekatan ini memastikan setiap kebijakan dan perbaikan dalam program pengelolaan sampah dapat dievaluasi secara objektif dan berkelanjutan.",
                            })}
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-4 mt-4 mr-8">
                <button
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                    className={`p-1 rounded-full transition ${canScrollLeft
                        ? 'bg-white text-[#384BA8] hover:bg-gray-100'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                        }`}
                    aria-label="Scroll left"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                    className={`p-1 rounded-full transition ${canScrollRight
                        ? 'bg-white text-[#384BA8] hover:bg-gray-100'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                        }`}
                    aria-label="Scroll right"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            {selectedFeature && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999] animate-fadeIn">
                    <div className={`
                                    bg-white rounded-3xl p-8 max-w-lg w-[90%] max-h-[80vh] overflow-y-auto shadow-xl relative no-scrollbar
                                    ${closing ? "modal-out" : "animate-scaleIn"}
                                    `}>

                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>

                        <p className="text-md font-bold">{selectedFeature.title}</p>
                        <p className="text-blue-custom text-2xl font-bold">
                            {selectedFeature.description}
                        </p>
                        <p className="text-gray-600 whitespace-normal text-sm leading-relaxed mt-4">
                            {selectedFeature.long_description}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
