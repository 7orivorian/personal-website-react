import './landing.scss';
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {handleUrlClick} from "../../scripts/utils.ts";
import CardSection from "../../components/cards/CardSection/CardSection.tsx";
import FadeInSection from "../../components/FadeInSection/FadeInSection.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import HomeButton from "../../components/buttons/HomeButton/HomeButton.tsx";

function Landing() {
    const navigate = useNavigate();
    const [isProfileImgAnimating, setIsProfileImgAnimating] = useState(false);

    const profileClickHandler = (): void => {
        setIsProfileImgAnimating(true);
        setTimeout((): void => setIsProfileImgAnimating(false), 1000);
    };

    const pageContainerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e: any): void => {
            // @ts-expect-error is not null
            const cards = pageContainerRef.current.getElementsByClassName('ci-card');
            for (const card of cards) {
                const rect = card.getBoundingClientRect(),
                    x: number = e.clientX - rect.left,
                    y: number = e.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            }
        };

        const pageContainer = pageContainerRef.current;
        // @ts-expect-error is not null
        pageContainer.addEventListener("mousemove", handleMouseMove);

        return (): void => {
            // @ts-expect-error is not null
            pageContainer.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <>
            <div className="page-container" ref={pageContainerRef}>
                <HomeButton text={"Home"} clickHandler={() => navigate("/")}/>
                <div className="top">
                    <div className="text-roller">
                        <span className="roller-header fancy-text">I am </span>
                        <div className="roller">
                            <div className="phrase">a developer</div>
                            <div className="phrase">a designer</div>
                            <div className="phrase">cat obsessed</div>
                            <div className="phrase">completely sane</div>
                            <div className="phrase">7orivorian</div>
                        </div>
                    </div>
                    <div className="profile-image-container">
                        <img className={`profile-image ${isProfileImgAnimating ? "do-profile-spin" : ""}`}
                             src="../../../public/images/profile_img_placeholder.jpg" alt="profile_img"
                             onDoubleClick={profileClickHandler}
                        />
                    </div>
                </div>
                <div className="bottom">
                    <div className="bottom-content">
                        <FadeInSection>
                            <div className="title-container">
                                <h1 className="title">Heya! I'm <a className="fancy-link">7orivorian</a>...</h1>
                            </div>
                            <div className="aboutme-container">
                                <p className="aboutme">
                                    I make websites, games, mods, libraries, & more!
                                    Take a look at some of my projects on <a href={import.meta.env.VITE_GITHUB_LINK}
                                                                             target="_blank">GitHub</a>, or browse
                                    my web playground.
                                </p>
                            </div>
                        </FadeInSection>


                        <FadeInSection>
                            <CardSection cardType={"ci-card"} cellWidth={"300px"} cellHeight={"260px"} cards={[
                                {
                                    header: "Resume",
                                    text: "View my digital resume.",
                                    key: "resume",
                                    imgUrl: "../../../public/images/resume_img_.png",
                                    clickHandler: () => navigate(import.meta.env.VITE_RESUME_ROUTE),
                                },
                                {
                                    header: "GitHub",
                                    text: "Browse my GitHub profile.",
                                    key: "github",
                                    imgUrl: "../../../public/images/github_img_.png",
                                    clickHandler: () => handleUrlClick(import.meta.env.VITE_GITHUB_LINK),
                                },
                                {
                                    header: "Playground",
                                    text: "Explore web games I've created.",
                                    key: "playground",
                                    imgUrl: "../../../public/images/controller_img_.png",
                                    clickHandler: () => navigate(import.meta.env.VITE_PLAYGROUND_ROUTE),
                                },
                            ]}/>
                        </FadeInSection>

                        <FadeInSection>
                            <div className="text-section">
                                <h2 className="text-section-heading">All About <a className="fancy-link">Me, Myself, &
                                    I</a>
                                </h2>
                                <p className="text-section-text">
                                    I am a Frontend Developer with a passion for crafting modern, polished user
                                    interfaces.
                                    I taught myself Java as a teen to pursue Minecraft modding and have been captivated
                                    by code ever since. I currently lead web development for a Minecraft modding project
                                    while juggling various hobby projects. When I'm not coding, you’ll find me enjoying
                                    music, playing games with friends, and curating a collection of silly cat memes and
                                    GIFs. My greatest ambitions are to own a silly cat, a cool car, and one day complete
                                    my Minecraft UI animation library.
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    );
}

export default Landing;