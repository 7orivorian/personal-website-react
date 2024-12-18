import React, {useEffect, useState} from "react";
import {Option} from "../../scripts/types.ts";
import {Controller} from "react-hook-form";

// This formatting hurts me, but it's too long otherwise :(
export default function CreatableMultiSelectInput({
                                                      classPrefix,
                                                      id,
                                                      label,
                                                      placeholderText,
                                                      predefinedOptions = [],
                                                      required,
                                                      errors,
                                                      control
                                                  }: {
    classPrefix: string;
    id: string;
    label: string;
    placeholderText: string;
    predefinedOptions?: Option[];
    required: boolean;
    errors: any;
    control: any;
}) {
    return (
        <Controller
            control={control}
            rules={{
                required
            }}
            render={({field: {onChange, onBlur, value}}) => (
                <Input
                    classPrefix={classPrefix}
                    id={id}
                    label={label}
                    placeholderText={placeholderText}
                    predefinedOptions={predefinedOptions}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errors={errors}
                />
            )}
            name={`${id}`}
        />
    );
}

function Input({classPrefix, id, label, placeholderText, predefinedOptions = [], errors, onChange, onBlur, value}: {
    classPrefix: string;
    id: string;
    label: string;
    placeholderText: string;
    predefinedOptions?: Option[];
    errors: any;
    onChange?: (selected: Option[]) => void;
    onBlur?: () => void;
    value?: Option[];
}) {
    const prefix: string = classPrefix ? `${classPrefix}__` : "";

    const [selected, setSelected] = useState<Option[]>([]);
    const [optionsToDisplay, setOptionsToDisplay] = useState<Option[]>([]);
    const [inputActive, setInputActive] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>("");


    const selectOption = (option: Option): void => {
        if (onChange) {
            onChange(
                selected.some((selectedOption: Option) => selectedOption.value === option.value)
                    ? selected : [...selected, option]
            );
        }
        setSelected((prevSelected: Option[]) =>
            prevSelected.some((selectedOption: Option) => selectedOption.value === option.value)
                ? prevSelected : [...prevSelected, option]
        );
    };

    const deselectOption = (optionToRemove: Option): void => {
        if (onChange) {
            onChange(selected.filter((option: Option) => option.value !== optionToRemove.value));
        }
        setSelected(selected.filter((option: Option) => option.value !== optionToRemove.value));
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const value: string = inputText.trim();
            if (value) {
                const existing: Option | undefined = predefinedOptions.find((option: Option) => option.value.toLowerCase() === value.toLowerCase());
                if (existing) {
                    selectOption(existing);
                    setInputText("");
                    return;
                }
                selectOption({label: value, value: value.toLowerCase()});
                setInputText("");
            }
        }
    };

    const handleBlur = () => {
        setInputActive(false);
        if (onBlur) {
            onBlur();
        }
    }

    useEffect(() => {
        const selectedIncludes = (option: Option): boolean => {
            return selected.some((o: Option) => o.value === option.value);
        };

        setOptionsToDisplay(predefinedOptions
            .filter((option: Option) => !selectedIncludes(option))
            .filter((option: Option) => !inputText || option.label.toLowerCase().startsWith(inputText.toLowerCase())));
    }, [inputText, predefinedOptions, selected]);

    return (
        <div className={`${prefix}input-container input-container`}>
            <div className="creatable-multiselect-input">
                <label htmlFor={id} className="creatable-input__label">{label}</label>
                <div
                    className={`selected-container${inputActive ? " active" : ""}${predefinedOptions.length > 0 ? " has-options" : ""}`}>
                    {selected.map((option: Option) => (
                        <SelectedOption key={option.value} option={option} handleRemoval={deselectOption}/>
                    ))}
                    <input id={id}
                           className="creatable-input__input"
                           type="text"
                           placeholder={placeholderText}
                           value={inputText}
                           onFocus={() => setInputActive(true)}
                           onBlur={handleBlur}
                           onChange={(e) => setInputText(e.target.value)}
                           onKeyDown={onKeyDown}
                    />
                </div>
                <div className={`options-container${inputActive ? " active" : ""}`}>
                    {optionsToDisplay.map((option: Option) => (
                        <button key={option.value}
                                className="option"
                                onClick={() => {
                                    selectOption(option);
                                    setInputText("");
                                }}
                        >{option.label}</button>
                    ))}
                </div>
                {errors[id] && <span className="error">{errors[id].message}</span>}
            </div>
        </div>
    );
}

function SelectedOption({option, handleRemoval}: {
    option: Option;
    handleRemoval: (option: Option) => void;
}) {
    return (
        <div className="selected-option">
            <span key={option.value} className="selected-option__label">{option.label}</span>
            <button className="selected-option__remove" onClick={() => handleRemoval(option)}>&times;</button>
        </div>
    );
}