import React from "react";
import {ValidationSchema, Rule} from "@/lib/ruler/validation";

type FormAction = (formData: FormData) => void | Promise<void>;

type InputOptions = {
    id?: string;
    className?: string;
    placeholder?: string;
    rules?: Rule[];
}

class FormBuilder {
    private inputs: React.ReactElement<{ name: string, id: string }>[] = [];
    private validationSchema: ValidationSchema = {};
    private action?: FormAction;
    private readonly className: string = "";
    private readonly buttonLabel: string = "";
    private errors: Record<string, string> = {};

    constructor(action?: FormAction, className: string = "form", buttonLabel = "Envoyer") {
        this.action = action;
        this.className = className;
        this.buttonLabel = buttonLabel;
    }

    input(name: string, type: string, opts: InputOptions = {}): this {
        const {id = name, className = "", placeholder, rules} = opts;

        if (rules) {
            this.validationSchema[name] = rules;
        }

        if (type === "textarea") {
            this.inputs.push(
                <textarea
                    id={id}
                    name={name}
                    key={id}
                    className={`form-control form-textarea ${className}`}
                    placeholder={placeholder}
                /> as React.ReactElement<{ name: string, id: string }>
            );
            return this;
        }

        this.inputs.push(
            <input
                name={name}
                type={type}
                key={id}
                id={id}
                className={`form-control ${className}`}
                placeholder={placeholder}
            /> as React.ReactElement<{ name: string, id: string }>
        );

        return this;
    }

    render(): React.ReactElement {
        if(!this.action) throw new Error("FormBuilder: aucune action");
        return (
            <div className="form-container">
                <form action={this.action} className={`form ${this.className}`}>
                    {this.inputs.map((input) => {
                        const name = (input.props as any).name;
                        return (
                            <div key={name} className="form-field">
                                {input}
                                {this.errors[name] && (
                                    <p className="error-message" style={{ color: 'red', fontSize: '12px' }}>
                                        {this.errors[name]}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                    <button type="submit" className="form-submit">
                        {this.buttonLabel}
                    </button>
                </form>
            </div>
        );
    }

    onValidate(
        setErrors: (errs: Record<string, string>) => void,
        serverAction: (data: Record<string, string>) => Promise<any>
    ): this {
        this.action = async (formData: FormData) => {
            setErrors({});
            try {
                const { validateFormData } = await import("@/lib/ruler/validation");
                const data = validateFormData(formData, this.validationSchema);
                return await serverAction(data);
            } catch (err: any) {
                if (err.type === "VALIDATION_ERROR") {
                    setErrors(err.errors);
                }
            }
        };
        return this;
    }

    setAction(action: FormAction): this {
        this.action = action;
        return this;
    }

    getValidationSchema(): ValidationSchema {
        return this.validationSchema;
    }

    setErrors(errors: Record<string, string>): this {
        this.errors = errors;
        return this;
    }
}

export {FormBuilder};
