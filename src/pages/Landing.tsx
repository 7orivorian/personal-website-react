import '../stylesheets/landing.scss';
import {useEffect, useState} from 'react';
import ImgAngleCard from "../components/cards/ImgAngleCard/ImgAngleCard.tsx";
import {useNavigate} from "react-router-dom";

function Landing() {
    const navigate = useNavigate();
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () => {
        setOffsetY(window.pageYOffset);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleUrlClick = (url: string | undefined): void => {
        if (url) {
            const newWindow: Window | null = window.open(url, '_blank', 'noopener,noreferrer');
            if (newWindow) {
                newWindow.opener = null;
            }
        } else {
            console.error('No Link found');
        }
    };

    const bg_img_url: string = "../../public/images/profile_img_placeholder.jpg";
    return (
        <>
            <div id="background">
            </div>
            <div className="page-container">
                <div className="container">
                    <div className="box"
                         style={{
                             backgroundImage: `url("${bg_img_url}")`,
                             backgroundPositionY: `${-offsetY * 0.2}px`
                         }}>
                        <h1 className="text name">Tori Vii</h1>
                        <h1 className="text title">Web Developer</h1>
                        <h2 className="text smiley">:-)</h2>
                    </div>
                </div>
                <div className="card-container">
                    <ImgAngleCard imageUrl="../../public/images/github_img.jpg" header="GitHub"
                                  text="Browse my GitHub profile"
                                  clickHandler={() => handleUrlClick(import.meta.env.VITE_GITHUB_LINK)}/>
                    <ImgAngleCard imageUrl="../../public/images/resume_img.jpg" header="Resume"
                                  text="View my digital resume"
                                  clickHandler={() => navigate(import.meta.env.VITE_RESUME_ROUTE)}/>
                    <ImgAngleCard imageUrl="../../public/images/controller_img.png" header="Playground"
                                  text="Explore web games I've created"
                                  clickHandler={() => navigate(import.meta.env.VITE_PLAYGROUND_ROUTE)}/>
                    <ImgAngleCard imageUrl="../../public/images/blog_img.jpg" header="Blog"
                                  text="Read my oft forgotten blog"
                                  clickHandler={() => handleUrlClick(import.meta.env.VITE_BLOG_LINK)}/>
                </div>
            </div>
        </>
    );
}

export default Landing;