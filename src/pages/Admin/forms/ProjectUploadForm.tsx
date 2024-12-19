import "./project-form.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import CreatableMultiSelectInput from "../../../components/form/CreatableMultiSelectInput.tsx";
import SelectInput from "../../../components/form/SelectInput.tsx";
import TextInput from "../../../components/form/TextInput.tsx";
import BooleanInput from "../../../components/form/BooleanInput.tsx";
import DateInput from "../../../components/form/DateInput.tsx";
import URLInput from "../../../components/form/URLInput.tsx";
import {Option} from "../../../scripts/types.ts";
import {useUser} from "../../../contexts/UserContext.tsx";
import {useData} from "../../../contexts/DataContext.tsx";
import {mapToProjectData} from "../../../scripts/fetchers.ts";

export default function ProjectUploadForm({tagOptions, techOptions}: {
    tagOptions: Option[];
    techOptions: Option[];
}) {
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<ProjectInputs>();
    const {fetchWithAuth} = useUser();
    const {addProject} = useData();

    const onSubmit: SubmitHandler<ProjectInputs> = (data: ProjectInputs): void => {
        fetchWithAuth("projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                description: data.description,
                url: data.url,
                image_url: data.image_url,
                source_code_url: data.source_code_url,
                type: data.type,
                status: data.status,
                featured: data.featured,
                begin_date: data.begin_date,
                completion_date: data.completion_date,
                tags: data.tags.map((option: Option): string => option.label),
                tech: data.tech.map((option: Option): string => option.label),
            })
        }).then(async res => {
            if (res.ok) {
                const json = await res.json();
                addProject(mapToProjectData(json));
                reset();
            }
        }).catch(err => console.error(err));
    };

    return (
        <form className="project-form generic-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Upload Project</h1>
            <TextInput classPrefix={"project-form"}
                       id={"name"}
                       label={"Name"}
                       placeholder={"The project name..."}
                       required={true}
                       register={register}
                       errors={errors}
            />
            <TextInput classPrefix={"project-form"}
                       id={"description"}
                       label={"Description"}
                       placeholder={"A brief yet informative description..."}
                       required={true}
                       register={register}
                       errors={errors}
            />
            <URLInput classPrefix={"project-form"}
                      id={"url"}
                      label={"Demo URL"}
                      placeholder={"A link to this project's demo..."}
                      required={true}
                      register={register}
                      errors={errors}
            />
            <URLInput classPrefix={"project-form"}
                      id={"image_url"}
                      label={"Image URL"}
                      placeholder={"An image of this project (optional)..."}
                      required={false}
                      register={register}
                      errors={errors}
            />
            <URLInput classPrefix={"project-form"}
                      id={"source_code_url"}
                      label={"Source Code URL"}
                      placeholder={"A link to this project's source code (optional)..."}
                      required={false}
                      register={register}
                      errors={errors}
            />
            <SelectInput classPrefix={"project-form"}
                         id={"type"}
                         label={"Type"}
                         options={[
                             {label: "Personal", value: "personal"},
                             {label: "Commission", value: "commission"},
                             {label: "Other", value: "other"}
                         ]}
                         required={true}
                         register={register}
                         errors={errors}
            />
            <SelectInput classPrefix={"project-form"}
                         id={"status"}
                         label={"Status"}
                         options={[
                             {label: "Completed", value: "completed"},
                             {label: "Developing", value: "developing"},
                             {label: "Maintained", value: "maintained"}
                         ]}
                         required={true}
                         register={register}
                         errors={errors}
            />
            <BooleanInput classPrefix={"project-form"}
                          id={"featured"}
                          label={"Featured"}
                          checked={false}
                          register={register}
                          errors={errors}
            />
            <DateInput classPrefix={"project-form"}
                       id={"begin_date"}
                       label={"Begin Date"}
                       required={true}
                       register={register}
                       errors={errors}
            />
            <DateInput classPrefix={"project-form"}
                       id={"completion_date"}
                       label={"Completion Date"}
                       required={false}
                       register={register}
                       errors={errors}
            />
            <CreatableMultiSelectInput classPrefix={"project-form"}
                                       id={"tags"}
                                       label={"Tags"}
                                       placeholderText={"Search for or create a tag..."}
                                       predefinedOptions={tagOptions}
                                       required={true}
                                       errors={errors}
                                       control={control}
            />
            <CreatableMultiSelectInput classPrefix={"project-form"}
                                       id={"tech"}
                                       label={"Technologies"}
                                       placeholderText={"Search for or create a tag..."}
                                       predefinedOptions={techOptions}
                                       required={true}
                                       errors={errors}
                                       control={control}
            />
            <TextInput classPrefix={"hidden"}
                       id={"na"}
                       label={"na"}
                       required={false}
                       register={register}
                       errors={errors}
            />

            <div className="project-form__input-container">
                <label className="transparent" htmlFor="submit">Upload Project</label>
                <input id="submit" type="submit" value="Upload Project"/>
            </div>
        </form>
    );
}

type ProjectInputs = {
    name: string
    description: string
    url: string
    image_url: string
    source_code_url: string
    type: string
    status: string
    featured: boolean
    begin_date: Date
    completion_date: Date
    tags: Option[]
    tech: Option[]
};