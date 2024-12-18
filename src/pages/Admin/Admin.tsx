import "./admin.scss";
import {useUser} from "../../contexts/UserContext.tsx";
import {useData} from "../../contexts/DataContext.tsx";
import {TagData} from "../../scripts/types.ts";
import {useEffect, useState} from "react";
import ProjectUploadForm from "./forms/ProjectUploadForm.tsx";

export default function Admin() {
    const {user} = useUser();

    const [currentForm, setCurrentForm] = useState<CurrentForm>(CurrentForm.PROJECT_UPLOAD);

    return (
        <>
            <h1>Admin</h1>
            <button onClick={() => setCurrentForm(CurrentForm.PROJECT_UPLOAD)}>Upload Project</button>
            <button onClick={() => setCurrentForm(CurrentForm.PROJECT_UPDATE)}>Update Project</button>
            <button onClick={() => setCurrentForm(CurrentForm.SOCIAL_LINK_UPLOAD)}>Upload SocialLink</button>
            <button onClick={() => setCurrentForm(CurrentForm.SOCIAL_LINK_UPDATE)}>Update SocialLink</button>

            <DisplayedForm currentForm={currentForm}/>
        </>
    );
}

function DisplayedForm({currentForm}: {
    currentForm: CurrentForm;
}) {
    const {tags} = useData();

    const [tagOptions, setTagOptions] = useState<{ value: string; label: string; }[]>([]);
    const [techOptions, setTechOptions] = useState<{ value: string; label: string; }[]>([]);

    useEffect(() => {
        setTagOptions(tags
            .filter((tag: TagData) => !tag.is_tech)
            .map((tag: TagData) => ({value: tag.name, label: tag.name}))
        );
        setTechOptions(tags
            .filter((tag: TagData) => tag.is_tech)
            .map((tag: TagData) => ({value: tag.name, label: tag.name}))
        );
    }, [tags])

    switch (currentForm) {
        case CurrentForm.SOCIAL_LINK_UPLOAD:
            return <></>;
        case CurrentForm.SOCIAL_LINK_UPDATE:
            return <></>;
        case CurrentForm.PROJECT_UPLOAD:
            return <ProjectUploadForm tagOptions={tagOptions} techOptions={techOptions}/>
        case CurrentForm.PROJECT_UPDATE:
            return <></>;
    }
}

enum CurrentForm {
    PROJECT_UPLOAD,
    PROJECT_UPDATE,
    SOCIAL_LINK_UPLOAD,
    SOCIAL_LINK_UPDATE,
}