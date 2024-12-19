import "./project-form.scss";
import {SocialLinkData} from "../../../scripts/types.ts";
import {useUser} from "../../../contexts/UserContext.tsx";
import {useEffect, useState} from "react";
import {useData} from "../../../contexts/DataContext.tsx";

export default function SLDeleteForm({socialLinks}: {
    socialLinks: SocialLinkData[];
}) {

    const {fetchWithAuth} = useUser();
    const {deleteSocialLink} = useData();

    const [query, setQuery] = useState<string>("");
    const [link, setLink] = useState<SocialLinkData | undefined>(undefined);

    useEffect(() => {
        try {
            const id: number = parseInt(query);
            setLink(socialLinks.find((link: SocialLinkData): boolean => link.id === id));
        } catch (e) {
            console.error(e);
        }
    }, [socialLinks, query])

    const handleSubmit = (e: any): void => {
        e.preventDefault();
        if (!link) {
            return;
        }
        const id: number = link.id;
        fetchWithAuth(`sociallinks/${id}`, {
            method: "DELETE"
        }).then(async res => {
            if (res.ok) {
                deleteSocialLink(id);
            }
        }).catch(err => console.error(err));
    };

    return (
        <>
            <form className="project-form generic-form" onSubmit={handleSubmit}>
                <h1>Delete Social Link</h1>
                <div className="project-form__input-container input-container">
                    <label htmlFor="search">Search by ID</label>
                    <input
                        id="search"
                        className="search-input"
                        type="search"
                        placeholder="Search social links by id..."
                        value={query}
                        onChange={e => setQuery(e.target.value.trim().toLowerCase())}
                    />
                </div>
                {link ? (
                    <p>{link.name}</p>
                ) : (
                    query && (
                        <p>No link with id '{query}'</p>
                    )
                )}
                <div className="project-form__input-container">
                    <label className="transparent" htmlFor="submit">Delete Link</label>
                    <input id="submit" type="submit" value="Delete Link" disabled={!link}/>
                </div>
            </form>
        </>
    );
}