import "./project-form.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import {SocialLinkData} from "../../../scripts/types.ts";
import {useUser} from "../../../contexts/UserContext.tsx";
import {useEffect, useMemo, useState} from "react";
import {useData} from "../../../contexts/DataContext.tsx";

export default function SLUpdateForm({socialLinks}: {
    socialLinks: SocialLinkData[];
}) {

    const {fetchWithAuth} = useUser();
    const {updateSocialLink} = useData();

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

    const defaults: SLInputs = useMemo(() => {
        return {
            name: link?.name || "",
            description: link?.description || "",
            url: link?.url || "",
            icon: link?.icon || "",
        }
    }, [link]);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<SLInputs>({
        defaultValues: defaults
    });

    useEffect(() => {
        reset(defaults)
    }, [defaults, link, reset]);

    const onSubmit: SubmitHandler<SLInputs> = (data: SLInputs): void => {
        if (!link) {
            return;
        }
        const body = {
            name: data.name || null,
            description: data.description || null,
            url: data.url || null,
            icon: data.icon || null,
        };
        const slug: number = link.id;
        fetchWithAuth(`sociallinks/${slug}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(async res => {
            if (res.ok) {
                const json = await res.json();
                updateSocialLink(slug, json);
                reset();
            }
        }).catch(err => console.error(err));
    };

    return (
        <>
            <form className="project-form generic-form" onSubmit={handleSubmit(onSubmit)}>
                <h1>Update Social Link</h1>
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

                <div className='project-form__input-container input-container'>
                    <label htmlFor={'name'}>Name</label>
                    <input
                        id={'name'}
                        type={'text'}
                        placeholder={'The name of the platform...'}
                        {...register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 3,
                                message: 'Must be at least 3 characters.'
                            },
                            maxLength: {
                                value: 16,
                                message: 'Must be at most 16 characters.'
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
                        placeholder={'A catchy description...'}
                        defaultValue={link?.description || ''}
                        {...register('description', {
                            required: 'Description is required',
                            minLength: {
                                value: 1,
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
                    <label htmlFor={'url'}>URL</label>
                    <input
                        id={'url'}
                        type={'url'}
                        placeholder={'Where should this link take users?'}
                        defaultValue={link?.url || ''}
                        {...register('url', {
                            required: 'URL is required',
                            validate: value => value.startsWith('https://') || 'Must be a valid URL'
                        })}
                    />
                    {errors.url && <span className='error'>{errors.url.message}</span>}
                </div>
                <div className='project-form__input-container input-container'>
                    <label htmlFor={'icon'}>Icon</label>
                    <input
                        id={'icon'}
                        type={'text'}
                        placeholder={'A brief yet informative description...'}
                        defaultValue={link?.icon || ''}
                        {...register('icon', {
                            required: 'Icon is required',
                            minLength: {
                                value: 1,
                                message: 'Must be at least 1 character.'
                            },
                            maxLength: {
                                value: 255,
                                message: 'Must be at most 255 characters.'
                            }
                        })}
                    />
                    {errors.icon && <span className='error'>{errors.icon.message}</span>}
                </div>

                <div className="project-form__input-container">
                    <label className="transparent" htmlFor="submit">Update Link</label>
                    <input id="submit" type="submit" value="Update Link" disabled={!link}/>
                </div>
            </form>
        </>
    );
}

type SLInputs = {
    name: string;
    description: string;
    url: string;
    icon: string;
};