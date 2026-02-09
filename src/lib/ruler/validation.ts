export type Rule =
    | { type: "required"; message?: string }
    | { type: "minLength"; value: number; message?: string }
    | { type: "maxLength"; value: number; message?: string }
    | { type: "email"; message?: string }
    | { type: "pattern"; value: RegExp; message?: string }
    | { type: "min"; value: number; message?: string }
    | { type: "max"; value: number; message?: string }
    | { type: "sameAs"; field: string; message?: string }
    | { type: "oneOf"; values: string[]; message?: string };

export type ValidationSchema = Record<string, Rule[]>;

export function validateFormData(
    formData: FormData,
    schema: ValidationSchema,
): Record<string, string> {
    const data = Object.fromEntries(formData.entries());
    const errors: Record<string, string> = {};

    for (const field in schema) {
        const value = String(data[field] ?? "");

        for (const rule of schema[field]) {
            // required
            if (rule.type === "required" && !value) {
                errors[field] = rule.message ?? "Champ requis";
                break;
            }

            // minLength
            if (rule.type === "minLength" && value.length < rule.value) {
                errors[field] =
                    rule.message ?? `Minimum ${rule.value} caractères`;
                break;
            }

            // maxLength
            if (rule.type === "maxLength" && value.length > rule.value) {
                errors[field] =
                    rule.message ?? `Maximum ${rule.value} caractères`;
                break;
            }

            // email
            if (rule.type === "email" && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errors[field] = rule.message ?? "Email invalide";
                    break;
                }
            }

            // pattern
            if (rule.type === "pattern" && value) {
                if (!rule.value.test(value)) {
                    errors[field] = rule.message ?? "Format invalide";
                    break;
                }
            }

            // min (number)
            if (rule.type === "min") {
                const num = Number(value);
                if (!isNaN(num) && num < rule.value) {
                    errors[field] =
                        rule.message ?? `Minimum ${rule.value}`;
                    break;
                }
            }

            // max (number)
            if (rule.type === "max") {
                const num = Number(value);
                if (!isNaN(num) && num > rule.value) {
                    errors[field] =
                        rule.message ?? `Maximum ${rule.value}`;
                    break;
                }
            }

            // sameAs
            if (rule.type === "sameAs") {
                const otherValue = String(data[rule.field] ?? "");
                if (value !== otherValue) {
                    errors[field] =
                        rule.message ??
                        `Doit être identique à ${rule.field}`;
                    break;
                }
            }

            // oneOf
            if (rule.type === "oneOf") {
                if (!rule.values.includes(value)) {
                    errors[field] =
                        rule.message ?? "Valeur invalide";
                    break;
                }
            }
        }
    }

    if (Object.keys(errors).length > 0) {
        throw {
            type: "VALIDATION_ERROR",
            errors,
        };
    }

    return data as Record<string, string>;
}
