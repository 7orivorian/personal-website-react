import "./links.scss";
import {handleUrlClick} from "../../scripts/utils.ts";
import FadeInSection from "../../components/FadeInSection/FadeInSection.tsx";
import CardSection from "../../components/cards/CardSection/CardSection.tsx";
import ListCard from "../../components/cards/ListCard/ListCard.tsx";
import HomeIcon from "../../components/icon/material/HomeIcon.tsx";
import GitHubIcon from "../../components/icon/GitHubIcon.tsx";
import LinkedinIcon from "../../components/icon/LinkedinIcon.tsx";
import BSkyIcon from "../../components/icon/BSkyIcon.tsx";
import ThreadsIcon from "../../components/icon/ThreadsIcon.tsx";
import OnlyFansIcon from "../../components/icon/OnlyFansIcon.tsx";
import MailIcon from "../../components/icon/material/MailIcon.tsx";
import {fetchSocialLinks, SocialLinkData} from "../../scripts/fetchers.ts";
import ErrorIcon from "../../components/icon/material/ErrorIcon.tsx";

const resource = fetchSocialLinks();

export default function Links() {
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

            <LinkSection/>
        </div>
    );
}

function LinkSection() {
    const data = resource.read();

    return (
        <FadeInSection>
            <CardSection>
                {data.map((item: SocialLinkData) => {
                    return (
                        <ListCard key={item.name} header={item.name} text={item.description}
                                  clickHandler={() => handleUrlClick(item.url)}>
                            {getIconComponentByName(item.icon)}
                        </ListCard>
                    );
                })}
            </CardSection>
        </FadeInSection>
    );
}

function getIconComponentByName(name: string) {
    switch (name.trim().toLowerCase()) {
        case "home":
            return <HomeIcon/>;
        case "github":
            return <GitHubIcon/>;
        case "linkedin":
            return <LinkedinIcon/>;
        case "bluesky":
            return <BSkyIcon/>;
        case "threads":
            return <ThreadsIcon/>;
        case "mail":
            return <MailIcon/>;
        case "onlyfans":
            return <OnlyFansIcon/>;
        default:
            return <ErrorIcon/>;
    }
}