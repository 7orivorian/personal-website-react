import './test.scss';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {handleUrlClick} from "../../scripts/utils.ts";
import CardSection from "../../components/cards/CardSection/CardSection.tsx";

function Test() {
    const navigate = useNavigate();
    const [isProfileImgAnimating, setIsProfileImgAnimating] = useState(false);

    const profileClickHandler = (): void => {
        setIsProfileImgAnimating(true);
        setTimeout(() => setIsProfileImgAnimating(false), 1000);
    };

    return (
        <>
            <div className="page-container">
                <div className="top">
                    <div className="text-roller">
                        <span className="roller-header fancy-text">I am </span>
                        <div className="roller">
                            <div className="phrase">a developer</div>
                            <div className="phrase">cat obsessed</div>
                            <div className="phrase">completely sane</div>
                            <div className="phrase">a designer</div>
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
                        <div className="title-container">
                            <h1 className="title">Heya! I'm <a className="fancy-link">7orivorian</a>...</h1>
                        </div>
                        <div className="aboutme-container">
                            <p className="aboutme">
                                I make websites, games, mods, libraries, & more!
                                Take a look at some of my projects on <a href={import.meta.env.VITE_GITHUB_LINK} target="_blank">GitHub</a>, or browse
                                my web playground.
                            </p>
                        </div>

                        {/*<CardSectionWithText width={""} height={""}*/}
                        {/*                     card={{*/}
                        {/*                         header: "Resume",*/}
                        {/*                         text: "View my digital resume.",*/}
                        {/*                         key: "resume",*/}
                        {/*                         imgUrl: "../../../public/images/resume_img_.png",*/}
                        {/*                         clickHandler: () => navigate(import.meta.env.VITE_RESUME_ROUTE),*/}
                        {/*                     }}/>*/}

                        <CardSection columns={3} rows={1} cellWidth={"300px"} cellHeight={"260px"} cards={[
                            {
                                header: "Resume",
                                text: "View my digital resume.",
                                key: "resume",
                                imgUrl: "../../../public/images/resume_img_.png",
                                clickHandler: () => navigate(import.meta.env.VITE_RESUME_ROUTE),
                            },
                            {
                                header: "Playground",
                                text: "Explore web games I've created.",
                                key: "playground",
                                imgUrl: "../../../public/images/controller_img_.png",
                                clickHandler: () => navigate(import.meta.env.VITE_PLAYGROUND_ROUTE),
                            },
                            {
                                header: "GitHub",
                                text: "Browse my GitHub profile.",
                                key: "github",
                                imgUrl: "../../../public/images/github_img_.png",
                                clickHandler: () => handleUrlClick(import.meta.env.VITE_GITHUB_LINK),
                            },
                        ]}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Test;