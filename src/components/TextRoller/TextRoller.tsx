import "./text-roller.scss";

interface Props {
    phrases: string[];
}

export default function TextRoller({phrases}: Props) {
    return (
        <div className="text-roller">
            <span className="roller-header fancy-text">I am </span>
            <div className="roller">
                {
                    phrases.map((phr: string, index: number) => {
                        return (
                            <div key={index} className="phrase">{phr}</div>
                        );
                    })
                }
            </div>
        </div>
    );
}