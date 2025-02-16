import './landing.scss';
import {useNavigate} from "react-router-dom";
import {handleUrlClick} from "../../scripts/utils.ts";
import CardSection from "../../components/cards/CardSection/CardSection.tsx";
import FadeInSection from "../../components/FadeInSection/FadeInSection.tsx";
import CoverImageCard from "../../components/cards/CoverImageCard/CoverImageCard.tsx";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <>
            <FadeInSection>
                <div className="title-container">
                    <h1 className="title">Heya! I'm <a className="fancy-link">{import.meta.env.VITE_MYNAME}</a>...</h1>
                </div>
                <div className="aboutme-container">
                    <p className="aboutme">
                        I make websites, games, mods, libraries, & more!
                        Take a look at some of my projects
                        on <a href={import.meta.env.VITE_GITHUB_LINK} target="_blank">GitHub</a>,
                        or browse my web playground.
                    </p>
                </div>
            </FadeInSection>

            <FadeInSection>
                <CardSection>
                    <CoverImageCard header={"Resume"} text={"View my digital resume."}
                                    imgUrl={"/images/resume_img_.png"}
                                    clickHandler={() => navigate('/resume')}
                    />
                    <CoverImageCard header={"GitHub"} text={"Browse my GitHub profile."}
                                    imgUrl={"/images/github_img_.png"}
                                    clickHandler={() => handleUrlClick(import.meta.env.VITE_GITHUB_LINK)}
                    />
                    <CoverImageCard header={"Playground"} text={"Explore web games I've created."}
                                    imgUrl={"/images/controller_img_.png"}
                                    clickHandler={() => navigate('/playground')}
                    />
                </CardSection>
            </FadeInSection>

            <FadeInSection>
                <div className="text-section">
                    <h2 className="text-section-heading">All About <a className="fancy-link">Me, Myself, & I</a></h2>
                    <p className="text-section-text">
                        I am a Full-Stack Developer with a passion for crafting modern, polished user interfaces.
                        I taught myself Java as a teen to pursue Minecraft modding and have been captivated
                        by code ever since. I currently lead web development for a nonprofit Minecraft modding
                        project while juggling various hobby projects. When I'm not coding, you’ll find me
                        enjoying music, playing games with friends, and curating a collection of silly cat
                        memes and GIFs. My greatest ambitions are to own a silly cat, a cool car, and one day
                        complete my Minecraft UI animation library.
                    </p>
                </div>
            </FadeInSection>
        </>
    );
}