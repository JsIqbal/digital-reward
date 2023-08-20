import LandingNavabr from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";

const LandingPage = () => {
    return (
        <div className="h-full flex flex-col">
            <LandingNavabr />
            <LandingHero />
            <footer className="bg-gray-800 rounded-lg shadow  dark:bg-gray-800 mt-auto">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-white sm:text-center dark:text-white">
                        © 2023{" "}
                        <a
                            target="_blank"
                            href="https://ada-asia.com/whoweare/offices/bangladesh"
                            className="hover:underline"
                        >
                            ADA-BD
                        </a>
                        . All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white sm:mt-0">
                        <li className="flex gap-3 mr-4">Powered by CES |</li>
                        <li className="flex gap-3">
                            Contact us:
                            <p className="hover:underline">
                                ada-bd@ada-asia.com
                            </p>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
