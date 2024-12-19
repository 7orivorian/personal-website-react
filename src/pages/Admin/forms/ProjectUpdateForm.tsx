import "./project-form.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import CreatableMultiSelectInput from "../../../components/form/CreatableMultiSelectInput.tsx";
import {Option, ProjectData, TagData} from "../../../scripts/types.ts";
import {useUser} from "../../../contexts/UserContext.tsx";
import {useEffect, useMemo, useState} from "react";
import {useData} from "../../../contexts/DataContext.tsx";
import {mapToProjectData} from "../../../scripts/fetchers.ts";

export default function ProjectUpdateForm({projects, tagOptions, techOptions}: {
    projects: ProjectData[];
    tagOptions: Option[];
    techOptions: Option[];
}) {

    const {fetchWithAuth} = useUser();
    const {updateProject} = useData();

    const [querySlug, setQuerySlug] = useState<string>("");
    const [project, setProject] = useState<ProjectData | undefined>(undefined);

    useEffect(() => {
        setProject(projects.find((project: ProjectData): boolean => project.slug === querySlug));
    }, [projects, querySlug])

    const defaults: ProjectInputs = useMemo(() => {
        return {
            slug: querySlug,
            name: project?.name || "",
            description: project?.description || "",
            url: project?.url || "",
            image_url: project?.image_url || "",
            source_code_url: project?.source_code_url || "",
            type: project?.type || "",
            status: project?.status || "",
            featured: project?.featured || false,
            begin_date: project?.begin_date || new Date().toISOString().slice(0, 10),
            completion_date: project?.completion_date,
            tags: project?.tags.filter((tag: TagData) => !tag.is_tech).map((tag: TagData): Option => {
                return {label: tag.name, value: tag.name}
            }) || [],
            tech: project?.tech.filter((tag: TagData) => tag.is_tech).map((tag: TagData): Option => {
                return {label: tag.name, value: tag.name}
            }) || []
        }
    }, [project, querySlug]);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<ProjectInputs>({
        defaultValues: defaults
    });

    useEffect(() => {
        reset(defaults)
    }, [defaults, project, reset]);

    const onSubmit: SubmitHandler<ProjectInputs> = (data: ProjectInputs): void => {
        if (!project) {
            return;
        }
        const body = {
            name: data.name || null,
            description: data.description || null,
            url: data.url || null,
            image_url: data.image_url || null,
            source_code_url: data.source_code_url || null,
            type: data.type || null,
            status: data.status || null,
            featured: data.featured || null,
            begin_date: data.begin_date || null,
            completion_date: data.completion_date || null,
            tags: data.tags?.map((option: Option): string => option.label),
            tech: data.tech?.map((option: Option): string => option.label),
        };
        const slug: string = project.slug;
        fetchWithAuth(`projects/update/slug/${slug}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(async res => {
            if (res.ok) {
                const json = await res.json();
                updateProject(slug, mapToProjectData(json));
                reset();
            }
        }).catch(err => console.error(err));
    };

    return (
        <>
            <form className="project-form generic-form" onSubmit={handleSubmit(onSubmit)}>
                <h1>Update Project</h1>
                <div className="project-form__input-container input-container">
                    <label htmlFor="search">Search by Slug</label>
                    <input
                        id="search"
                        className="search-input"
                        type="search"
                        placeholder="Search projects by slug..."
                        value={querySlug}
                        onChange={e => setQuerySlug(e.target.value.trim().toLowerCase())}
                    />
                </div>

                <div className='project-form__input-container input-container'>
                    <label htmlFor={'name'}>Name</label>
                    <input
                        id={'name'}
                        type={'text'}
                        placeholder={'A concise name for this project...'}
                        {...register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 3,
                                message: 'Must be at least 3 characters.'
                            },
                            maxLength: {
                                value: 32,
                                message: 'Must be at most 32 characters.'
                            },
                            pattern: {
                                value: /[a-zA-Z0-9_ ]/,
                                message: 'May only contain letters, numbers, underscores, and spaces.'
                            }
                        })}
                    />
                    {errors.name && <span className='error'>{errors.name.message}</span>}
                </div>
                <div className='project-form__input-container input-container'>
                    <label htmlFor={'description'}>Description</label>
                    <input
                        id={'description'}
                        type={'text'}
                        placeholder={'A brief yet informative description...'}
                        defaultValue={project?.description || ''}
                        {...register('description', {
                            required: 'Description is required',
                            minLength: {
                                value: 3,
                                message: 'Must be at least 1 character.'
                            },
                            maxLength: {
                                value: 255,
                                message: 'Must be at most 255 characters.'
                            }
                        })}
                    />
                    {errors.description && <span className='error'>{errors.description.message}</span>}
                </div>
                <div className='project-form__input-container input-container'>
                    <label htmlFor={'url'}>Demo URL</label>
                    <input
                        id={'url'}
                        type={'url'}
                        placeholder={'A link to this project\'s demo...'}
                        defaultValue={project?.url || ''}
                        {...register('url', {
                            required: 'Demo URL is required',
                            validate: value => (value.startsWith('http://') || value.startsWith('https://')) || 'Must be a valid URL'
                        })}
                    />
                    {errors.url && <span className='error'>{errors.url.message}</span>}
                </div>
                <div className='project-form__input-container input-container'>
                    <label htmlFor={'image_url'}>Image URL</label>
                    <input
                        id={'image_url'}
                        type={'url'}
                        placeholder={'An image of this project (optional)...'}
                        defaultValue={project?.image_url || ''}
                        {...register('image_url', {
                            required: false,
                            validate: value => value === '' || (value.startsWith('http://') || value.startsWith('https://')) || 'Must be a valid URL'
                        })}
                    />
                    {errors.image_url && <span className='error'>{errors.image_url.message}</span>}
                </div>
                <div className='project-form__input-container input-container'>
                    <label htmlFor={'source_code_url'}>Source Code URL</label>
                    <input
                        id={'source_code_url'}
                        type={'url'}
                        placeholder={'A link to this project\'s source code (optional)...'}
                        defaultValue={project?.source_code_url || ''}
                        {...register('source_code_url', {
                            required: false,
                            validate: value => value === '' || (value.startsWith('http://') || value.startsWith('https://')) || 'Must be a valid URL'
                        })}
                    />
                    {errors.source_code_url && <span className='error'>{errors.source_code_url.message}</span>}
                </div>
                <div className='project-form__input-container input-container'>
                    <label htmlFor={'type'}>Type</label>
                    <select id={'type'} {...register('type')} defaultValue={project?.type || ''}>
                        <option value="">Select...</option>
                        <option value="personal">Personal</option>
                        <option value="commission">Commission</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.type && <span className='error'>{errors.type.message}</span>}
                </div>
                <div className='project-form__input-container input-container'>
                    <label htmlFor={'status'}>Type</label>
                    <select id={'status'} {...register('status')} defaultValue={project?.status || ''}>
                        <option value="">Select...</option>
                        <option value="completed">Completed</option>
                        <option value="maintained">Maintained</option>
                        <option value="developing">Developing</option>
                    </select>
                    {errors.status && <span className='error'>{errors.status.message}</span>}
                </div>
                <div className='project-form__input-container input-container'>
                    <label htmlFor={'featured'}>Featured</label>
                    <input
                        id={'featured'}
                        type={'checkbox'}
                        defaultChecked={project?.featured || false}
                        {...register('featured', {required: false})}
                    />
                    {errors.featured && <span className='error'>{errors.featured.message}</span>}
                </div>
                <div className='project-form__input-container input-container'>
                    <label htmlFor={'begin_date'}>Begin Date</label>
                    <input
                        id={'begin_date'}
                        type={'date'}
                        defaultValue={project?.begin_date || new Date().toISOString().slice(0, 10)}
                        {...register('begin_date', {required: true})}
                    />
                    {errors.begin_date && <span className='error'>{errors.begin_date.message}</span>}
                </div>
                <div className='project-form__input-container input-container'>
                    <label htmlFor={'completion_date'}>Completion Date</label>
                    <input
                        id={'completion_date'}
                        type={'date'}
                        defaultValue={project?.completion_date || new Date().toISOString().slice(0, 10)}
                        {...register('completion_date', {required: false})}
                    />
                    {errors.completion_date && <span className='error'>{errors.completion_date.message}</span>}
                </div>
                <CreatableMultiSelectInput classPrefix={"project-form"}
                                           id={"tags"}
                                           label={"Tags"}
                                           placeholderText={"Search for or create a tag..."}
                                           defaultOptions={project?.tags.filter((tag: TagData): boolean => !tag.is_tech).map((tag: TagData): Option => {
                                               return {label: tag.name, value: tag.name};
                                           }) || []}
                                           predefinedOptions={tagOptions}
                                           required={false}
                                           errors={errors}
                                           control={control}
                />
                <CreatableMultiSelectInput classPrefix={"project-form"}
                                           id={"tech"}
                                           label={"Technologies"}
                                           placeholderText={"Search for or create a tag..."}
                                           defaultOptions={project?.tags.filter((tag: TagData): boolean => tag.is_tech).map((tag: TagData): Option => {
                                               return {label: tag.name, value: tag.name};
                                           }) || []}
                                           predefinedOptions={techOptions}
                                           required={false}
                                           errors={errors}
                                           control={control}
                />

                <div className="project-form__input-container">
                    <label className="transparent" htmlFor="submit">Update Project</label>
                    <input id="submit" type="submit" value="Update Project" disabled={!project}/>
                </div>
            </form>
        </>
    );
}

type ProjectInputs = {
    slug: string
    name: string
    description: string
    url: string
    image_url: string
    source_code_url: string
    type: string
    status: string
    featured: boolean
    begin_date: string
    completion_date: string | null | undefined
    tags: Option[]
    tech: Option[]
};