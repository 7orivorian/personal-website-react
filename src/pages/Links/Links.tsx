import "./links.scss";
import FadeInSection from "../../components/FadeInSection/FadeInSection.tsx";
import CardSection from "../../components/cards/CardSection/CardSection.tsx";
import {handleUrlClick} from "../../scripts/utils.ts";
import {useNavigate} from "react-router-dom";
import ListCard from "../../components/cards/ListCard/ListCard.tsx";
import HomeIcon from "../../components/icon/material/HomeIcon.tsx";
import GitHubIcon from "../../components/icon/GitHubIcon.tsx";
import LinkedinIcon from "../../components/icon/LinkedinIcon.tsx";
import BSkyIcon from "../../components/icon/BSkyIcon.tsx";
import ThreadsIcon from "../../components/icon/ThreadsIcon.tsx";
import OnlyFansIcon from "../../components/icon/OnlyFansIcon.tsx";
import MailIcon from "../../components/icon/material/MailIcon.tsx";

export default function Links() {
    const navigate = useNavigate();

    return (
        <div className="links-content-container">
            <FadeInSection>
                <div className="title-container">
                    <h1 className="title">Heya! I'm <a className="fancy-link">7orivorian</a>...</h1>
                </div>
                <div className="aboutme-container">
                    <p className="aboutme">
                        Here are all my official links!
                    </p>
                </div>
            </FadeInSection>

            <FadeInSection>
                <CardSection>
                    <ListCard header={"Website"} text={"Learn more about me."} clickHandler={() => navigate('/')}>
                        <HomeIcon/>
                    </ListCard>
                    <ListCard header={"GitHub"} text={"Browse my personal projects."}
                              clickHandler={() => handleUrlClick(import.meta.env.VITE_GITHUB_LINK)}>
                        <GitHubIcon/>
                    </ListCard>
                    <ListCard header={"Linkedin"} text={"Connect with me on Linkedin."}
                              clickHandler={() => handleUrlClick(import.meta.env.VITE_LINKEDIN_LINK)}>
                        <LinkedinIcon/>
                    </ListCard>
                    <ListCard header={"Bluesky"} text={"Follow me on Bluesky."}
                              clickHandler={() => handleUrlClick(import.meta.env.VITE_BSKY_LINK)}>
                        <BSkyIcon/>
                    </ListCard>
                    <ListCard header={"Threads"} text={"Follow me on threads."}
                              clickHandler={() => handleUrlClick(import.meta.env.VITE_THREADS_LINK)}>
                        <ThreadsIcon/>
                    </ListCard>
                    <ListCard header={"Email"} text={"Send me an email."}
                              clickHandler={() => handleUrlClick(import.meta.env.VITE_EMAIL_LINK)}>
                        <MailIcon/>
                    </ListCard>
                    <ListCard header={"OnlyFans"} text={"View exclusive content."}
                              clickHandler={() => handleUrlClick("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}>
                        <OnlyFansIcon/>
                    </ListCard>
                </CardSection>
            </FadeInSection>
        </div>
    );
}