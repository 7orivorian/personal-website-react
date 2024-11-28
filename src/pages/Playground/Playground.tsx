import FadeInSection from "../../components/FadeInSection/FadeInSection.tsx";
import CardSection from "../../components/cards/CardSection/CardSection.tsx";
import {useNavigate} from "react-router-dom";
import "./playground.scss";
import CoverImageCard from "../../components/cards/CoverImageCard/CoverImageCard.tsx";

export function Playground() {
    const navigate = useNavigate();

    return (
        <FadeInSection>
            <CardSection>
                <CoverImageCard header={"Pop the Bubble"} text={"The cutest web-game there ever was!"}
                                imgUrl={"../../../public/images/bubblegame.png"}
                                clickHandler={() => navigate("/playground/bubblegame")}
                />
            </CardSection>
        </FadeInSection>
    );
}