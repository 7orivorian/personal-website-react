import "./project-form.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import TextInput from "../../../components/form/TextInput.tsx";
import URLInput from "../../../components/form/URLInput.tsx";
import {useUser} from "../../../contexts/UserContext.tsx";
import {useData} from "../../../contexts/DataContext.tsx";

export default function SLCreateForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<SLInputs>();
    const {fetchWithAuth} = useUser();
    const {addSocialLink} = useData();

    const onSubmit: SubmitHandler<SLInputs> = (data: SLInputs): void => {
        fetchWithAuth("sociallinks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                description: data.description,
                url: data.url,
                icon: data.icon,
            })
        }).then(async res => {
            if (res.ok) {
                const json = await res.json();
                addSocialLink(json);
                reset();
            }
        }).catch(err => console.error(err));
    };

    return (
        <form className="project-form generic-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Create Social Link</h1>
            <TextInput classPrefix={"project-form"}
                       id={"name"}
                       label={"Name"}
                       placeholder={"The name of the platform..."}
                       required={true}
                       register={register}
                       errors={errors}
            />
            <TextInput classPrefix={"project-form"}
                       id={"description"}
                       label={"Description"}
                       placeholder={"A catchy description..."}
                       required={true}
                       register={register}
                       errors={errors}
            />
            <URLInput classPrefix={"project-form"}
                      id={"url"}
                      label={"URL"}
                      placeholder={"Where should this link take users?"}
                      required={true}
                      register={register}
                      errors={errors}
            />
            <TextInput classPrefix={"project-form"}
                       id={"icon"}
                       label={"Icon"}
                       placeholder={"This link's beautiful icon..."}
                       required={true}
                       register={register}
                       errors={errors}
            />

            <div className="project-form__input-container">
                <label className="transparent" htmlFor="submit">Create Link</label>
                <input id="submit" type="submit" value="Create Link"/>
            </div>
        </form>
    );
}

type SLInputs = {
    name: string
    description: string
    url: string
    icon: string
};