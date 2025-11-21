
export default function FeatureCard({ onClick, title, description, long_description, bgImage }) {
    return (
        <div
            onClick={onClick}
            className="
                w-full h-full rounded-3xl p-8 flex flex-col justify-between
                hover:shadow-xl hover:scale-[103%] transition-transform duration-300
                cursor-pointer relative z-10
            "
            style={bgImage ? {
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            } : {}}
        >
            <div className="relative z-10">
                <h3 className="text-md font-semibold mb-1 -mt-3 -ml-3 text-black">{title}</h3>
                <p className="text-blue-custom text-xl -ml-3 font-bold">{description}</p>
                <p className="hidden">{long_description}</p>
            </div>

            <div className="flex justify-end mt-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
                    +
                </div>
            </div>
        </div>
    );
}