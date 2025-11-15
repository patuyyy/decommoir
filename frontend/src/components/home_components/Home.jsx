import sample1 from "../../assets/home3.png";
import sample2 from "../../assets/home2.png";
import lines from "../../assets/Lines.svg";

export default function Home1() {
    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center px-8 relative">
            <img src={lines} className="absolute inset-0 w-full h-full object-cover -z-10 opacity-50" alt="background lines" />
            
            <div className="max-w-lg">
                <p className="text-xs bg-blue-100 text-blue-700 w-fit px-3 py-1 rounded-md font-medium mb-4">
                    Solusi Digital untuk Program MBG
                </p>
                <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                    Kelola Sampah Organik <span className="text-blue-custom">Makanan</span><br />
                    <span className="text-blue-custom">Bergizi Gratis</span>
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                    Sebuah platform digital yang membantu sekolah mengelola distribusi makanan bergizi gratis (MBG) secara transparan dan mengolah sampah organik menggunakan teknologi IoT dan larva BSF.
                </p>
                <button className="px-4 py-2 bg-blue-custom text-white rounded-md text-lg">Mulai Sekarang →</button>
            </div>

            <div className="relative mt-10 md:mt-0 flex items-center justify-center">
                <img src={sample1} className="w-96 rounded-md shadow-md rotate-[-2deg]" />
                <img
                    src={sample2}
                    className="w-72 rounded-md shadow-md absolute top-36 left-44 rotate-[6deg]"
                />
            </div>
        </div>
    );
}