import "./admin.scss";
import {useUser} from "../../contexts/UserContext.tsx";
import {useData} from "../../contexts/DataContext.tsx";
import {TagData} from "../../scripts/types.ts";
import {useEffect, useState} from "react";
import ProjectUploadForm from "./forms/ProjectUploadForm.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import ProjectUpdateForm from "./forms/ProjectUpdateForm.tsx";
import ProjectDeleteForm from "./forms/ProjectDeleteForm.tsx";
import SLCreateForm from "./forms/SLCreateForm.tsx";
import SLUpdateForm from "./forms/SLUpdateForm.tsx";
import SLDeleteForm from "./forms/SLDeleteForm.tsx";

export default function Admin() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentForm, setCurrentForm] = useState<Form>(Form.PROJECT_UPLOAD);

    const {isAdmin} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const number: number = parseInt(searchParams.get('form') || "0");
            setCurrentForm(number);
        } catch (e) {
            console.error(e);
        }
    }, [searchParams]);

    useEffect(() => {
        if (!isAdmin()) {
            navigate("/auth?type=login");
        }
    }, [isAdmin, navigate]);

    const setForm = (form: Form) => {
        setSearchParams({form: form.toString()});
    };

    return (
        <>
            <h1>Admin</h1>
            <div>
                <button onClick={() => setForm(Form.PROJECT_UPLOAD)}>Upload Project</button>
                <button onClick={() => setForm(Form.PROJECT_UPDATE)}>Update Project</button>
                <button onClick={() => setForm(Form.PROJECT_DELETE)}>Delete Project</button>
            </div>
            <div>
                <button onClick={() => setForm(Form.SOCIAL_LINK_UPLOAD)}>Create SocialLink</button>
                <button onClick={() => setForm(Form.SOCIAL_LINK_UPDATE)}>Update SocialLink</button>
                <button onClick={() => setForm(Form.SOCIAL_LINK_DELETE)}>Delete SocialLink</button>
            </div>

            <DisplayedForm currentForm={currentForm}/>
        </>
    );
}

function DisplayedForm({currentForm}: {
    currentForm: Form;
}) {
    const {projects, tags, socialLinks} = useData();

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
        case Form.SOCIAL_LINK_UPLOAD:
            return <SLCreateForm/>;
        case Form.SOCIAL_LINK_UPDATE:
            return <SLUpdateForm socialLinks={socialLinks}/>;
        case Form.SOCIAL_LINK_DELETE:
            return <SLDeleteForm socialLinks={socialLinks}/>;
        case Form.PROJECT_UPLOAD:
            return <ProjectUploadForm tagOptions={tagOptions} techOptions={techOptions}/>
        case Form.PROJECT_UPDATE:
            return <ProjectUpdateForm projects={projects} tagOptions={tagOptions} techOptions={techOptions}/>;
        case Form.PROJECT_DELETE:
            return <ProjectDeleteForm projects={projects}/>;
    }
}

enum Form {
    PROJECT_UPLOAD,
    PROJECT_UPDATE,
    PROJECT_DELETE,
    SOCIAL_LINK_UPLOAD,
    SOCIAL_LINK_UPDATE,
    SOCIAL_LINK_DELETE,
}