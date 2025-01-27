import React, { useState, ChangeEvent, Fragment } from "react";
import { SelectProps } from "../types/Select.types";

function SelectKeyValue(props: SelectProps): JSX.Element {
    const [touched, setTouch] = useState(false);
    const [error, setError] = useState("");
    const [htmlClass, setHtmlClass] = useState("");
    const [value, setValue] = useState(props.value);


    function onValueChanged(event: ChangeEvent<HTMLSelectElement>): void {
        let [error, validClass, elementValue] = ["", "", event.target.value];

        [error, validClass] = (!elementValue && props.required) ?
            ["Value has to be selected", "is-invalid"] : ["", "is-valid"];


        props.onChange({ value: elementValue, error: error, touched: touched, field: props.field });

        setTouch(true);
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
            <label htmlFor={`${props.id}`}>{props.label}</label>
            <select
                value={value}
                id={`${props.id}`}
                className={`form-control ${props.inputClass ? props.inputClass : ""} ${htmlClass}`}
                onChange={onValueChanged}>
                <option value= {0}>Choose...</option>
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

export default SelectKeyValue;