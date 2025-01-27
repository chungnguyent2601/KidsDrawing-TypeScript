import React, { useState, ChangeEvent } from "react";
import { DateInputProps } from "../types/DateInput.types";

function DateInput(props: DateInputProps): JSX.Element {
    const [touched, setTouch] = useState(false);
    const [error, setError] = useState("");
    const [htmlClass, setHtmlClass] = useState("");
    const [, setValue] = useState("");


    function onValueChanged(event: ChangeEvent<HTMLInputElement>): void {
        let [error, validClass, elementValue] = ["", "", event.target.value];

        [error, validClass] = (!elementValue && props.required) ?
            ["Value cannot be empty", "is-invalid"] : ["", "is-valid"];

        if (!error) {
            [error, validClass] = (props.maxLength && elementValue && elementValue < (props.maxLength)) ?
            [`Value can't have more than ${props.maxLength.substring(0,10)} ${props.maxLength.substring(11,25)} characters`, "is-invalid"] : ["", "is-valid"];
        }

        props.onChange({ value: elementValue, error: error, touched: touched, field: props.field });

        setTouch(true);
        setError(error);
        setHtmlClass(validClass);
        setValue(elementValue);
    }

    return (
        <div>
            <label htmlFor={props.id.toString()}>{props.label}</label>
            <input
                value={props.value}
                type={props.type}
                onChange={onValueChanged}
                disabled={props.active}
                className={`form-control ${props.inputClass} ${htmlClass}`}
                id={`id_${props.label}`}
                placeholder={props.placeholder} />
            {error ?
                <div className="invalid-feedback">
                    {error}
                </div> : null
            }
        </div>
    );
}

export default DateInput;