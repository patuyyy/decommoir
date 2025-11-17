import Home from "../components/home_components/Home";
import Features from "../components/home_components/Features";
import Benefits from "../components/home_components/Benefits";
import FAQ from "../components/home_components/FAQ";

export default function HomePage() {
    return (
        <>
            <section id="home">
                <Home />
            </section>

            <section id="features">
                <Features />
            </section>

            <section id="benefits">
                <Benefits />
            </section>
            <section id="faq">
                <FAQ />
            </section>
        </>
    );
}
