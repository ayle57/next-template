import { Field } from "./types";
import React from "react";

export const field = {
    text(opts?: { min?: number, max?: number }) {
        return {
            parse(value: string) {
                if (opts?.min && value.length < opts.min) {
                    return {ok: false, error: `Minimum ${opts.min} caractères`};
                }
                if (opts?.max && value.length > opts.max) {
                    return {ok: false, error: `Maximum ${opts.max} caractères`}
                }
                return {ok: true, value}
            },
            render(name: string): React.ReactElement {
                return <input name={name} id={name} type="text" className="form-control" />;
            }
        } satisfies Field<string>;
    },

    email() {
        return {
            parse(value: string) {
                if(!value.includes("@")) return { ok: false, error: "Email invalide" };
                return { ok: true, value }
            },
            render(name: string): React.ReactElement {
                return <input name={name} id={name} type="email" className="form-control" />;
            }
        } satisfies Field<string>;
    },
}
