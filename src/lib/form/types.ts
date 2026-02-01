import { JSX } from "react";

export type FieldResult<T> =
    | { ok: true, value: T }
    | { ok: false, error: string };

export type Field<T> = {
    parse(value: FormDataEntryValue | null): FieldResult<T>;
    render(name: string): JSX.Element;
}

export type FormFields = Record<string, Field<any>>;

export type InferForm<T extends FormFields> = {
    [K in keyof T]: T[K] extends Field<infer U> ? U : never;
}
