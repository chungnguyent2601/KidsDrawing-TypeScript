import React, { useState, ChangeEvent, Fragment } from "react";
import { SelectMutipleProps } from "../types/SelectMutiple.types";

function SelectKeyValueMutiple2(props: SelectMutipleProps): JSX.Element {
    const [error, setError] = useState("");
    const [htmlClass, setHtmlClass] = useState("");
    const [value, setValue] = useState(props.value);

    function onValueChanged(event: ChangeEvent<HTMLSelectElement>): void {
        let [error, validClass, elementValue] = ["", "", event.target.value];

        [error, validClass] = (!elementValue && props.required) ?
            ["Value has to be selected", "is-invalid"] : ["", "is-valid"];


        props.onChange(elementValue, props.index);
        setError(error);
        setHtmlClass(validClass);
        setValue(elementValue);
    }

    //console.log(props.options)

    const getOptions: (JSX.Element | null)[] = props.options.map( (option: any, index:number) => {
        return (
            <option key={index} value={option.value}>{option.name}</option>
        )
    });

    return (
        <Fragment>
            <label>{props.label}</label>
            <select
                value={value}
                className={`form-control ${props.inputClass ? props.inputClass : ""} ${htmlClass}`}
                onChange={onValueChanged}>
                <option value= {""}>Choose...</option>
                {getOptions}
            </select>

            {error ?
                <div className="invalid-feedback">
                    {error}
                </div> : null
            }
        </Fragment>
    );
}

export default SelectKeyValueMutiple2;