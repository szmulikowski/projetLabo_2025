import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

function Home() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-between bg-gray-800 text-white bg-cover bg-center"
            style={{
                backgroundImage: `url(${isMobile ? '/image_Mobile.jpg' : '/image_Home.jpg'})`,
                backgroundSize: isMobile ? 'contain' : 'cover',
                backgroundPosition: isMobile ? 'center' : 'center calc(50% - 5px)',
                backgroundRepeat: 'no-repeat',
                position: "relative",
                height: isMobile ? '812px' : '100vh',
                width: '100%',
            }}
        >
            <div
                className="absolute inset-0 bg-black opacity-75"
                style={{
                    zIndex: "-1",
                }}
            ></div>

            {/* Texte avec icône */}
            <div
                className="absolute text-xl sm:text-2xl mb-6 sm:mb-8 md:text-3xl font-semibold text-white"
                style={{
                    top: "calc(50% + 135px)",
                    left: "calc(920px)",
                    transform: "translate(0, -50%)",
                    zIndex: "1",
                }}
            >
                <p>Venez tester votre réseau et vos performances</p>
            </div>

            <div className="text-center z-10 px-4 sm:px-6 md:px-8">
                {/* Icônes de réseaux sociaux */}
                {isMobile && (
                    <div
                        style={{ height: "125px", marginTop: "-95px" }}
                        className="absolute top-24 left-1/2 transform -translate-x-1/2 w-full sm:w-auto bg-[#0a1e3f] py-8 flex justify-center gap-6 mb-8"
                    >
                        <a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-[#1d3557] transition duration-300"
                        >
                            <FaLinkedin size={30} />
                        </a>
                        <a
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-[#1d3557] transition duration-300"
                        >
                            <FaTwitter size={30} />
                        </a>
                        <a
                            href="https://www.github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-[#1d3557] transition duration-300"
                        >
                            <FaGithub size={30} />
                        </a>
                    </div>
                )}

                <div
                    className={`absolute ${isMobile
                        ? "top-28 left-1/2 transform -translate-x-1/2"
                        : "top-[calc(50%+220px)] left-[1050px]"
                        }`}
                >
                    <Link to="/offres">
                        <button
                            style={{
                                width: "400px",
                                height: "75px",
                                marginTop: "-25px",
                                color: "white",
                                fontSize: "24px",
                            }}
                            className="bg-[#0a1e3f] sm:bg-[#2C75FF] text-white hover:bg-[#1919FF] hover:text-white transition duration-300 flex items-center justify-center gap-4 w-auto cursor-pointer"
                        >
                            <FaPlay size={20} />
                            Tester
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Home;

