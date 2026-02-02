import React from "react";

type FormAction = string | ((formData: FormData) => void | Promise<void>);

type InputOptions = {
    id?: string;
    className?: string;
    placeholder?: string;
}

class FormBuilder {
    private inputs: React.ReactElement[] = [];
    private readonly action: (formData: FormData) => void | Promise<void>;
    private readonly className: string = "";
    private readonly buttonLabel: string = "";

    constructor(
        action: (formData: FormData) => void | Promise<void>,
        className: string = "form",
        buttonLabel = "Envoyer")
    {
        this.action = action;
        this.className = className;
        this.buttonLabel = buttonLabel;
    }

    input(
        name: string,
        type: string,
        opts: InputOptions = {}
    ): this {
        const {id = name, className = "", placeholder} = opts;

        if (type === "textarea") {
            this.inputs.push(<textarea id={id ? id : name} name={name}
                                       key={id ? id : name}
                                       className={`form-control form-textarea ${className}`}
                                       placeholder={placeholder}/>);

            return this;
        }

        this.inputs.push(<input name={name} type={type} key={id ? id : name} id={id ? id : name} className={`form-control ${className}`}
                                placeholder={placeholder}/>);

        return this;
    }

    render(): React.ReactElement {
        return (
            <div className="form-container">
                <form action={this.action} className={`form ${this.className}`}>
                    {this.inputs}
                    <button type="submit" className="form-submit">{this.buttonLabel}</button>
                </form>
            </div>
        )
    }
}

export {FormBuilder};
// ! TODO: ajouter verif des params validation etc et permettre traitement
