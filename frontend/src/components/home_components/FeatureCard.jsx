export default function FeatureCard({ title, description, bgImage }) {
    return (
        <div
            className={`
                w-full h-full rounded-3xl p-8 flex flex-col justify-between
                ${bgImage ? '' : 'bg-white'}
            `}
            style={bgImage ? {
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            } : {}}
        >
            <div className="relative z-10">
                <h3 className="text-md font-bold mb-2 -mt-5 -ml-3 text-black">{title}</h3>
                <p className="text-blue-custom text-xl -ml-3 font-semibold">{description}</p>
            </div>

            <div className="flex justify-end mt-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
                    +
                </div>
            </div>
        </div>






    );
}