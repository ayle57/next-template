export type Rule =
    | { type: "required"; message?: string }
    | { type: "minLength"; value: number; message?: string }
    | { type: "maxLength"; value: number; message?: string }
    ;

export type ValidationSchema = Record<string, Rule[]>;

export function validateFormData(
    formData: FormData,
    schema: ValidationSchema,
): Record<string, string> {
    const data = Object.fromEntries(formData.entries());
    const errors: Record<string, string> = {};

    for (const field in schema) {
        const value = String(data[field] ?? "");

        for(const rule of schema[field]) {
            if (rule.type === "required" && !value) {
                errors[field] = rule.message ?? "Champ requis";
            }

            if (rule.type === "minLength" && value.length < rule.value) {
                errors[field] = rule.message ?? `Minimum ${rule.value} caractères`;
            }

            if (rule.type === "maxLength" && value.length > rule.value) {
                errors[field] = rule.message ?? `Maximum ${rule.value} caractères`;
            }
        }
    }

    if (Object.keys(errors).length > 0) {
        throw { type: "VALIDATION_ERROR", errors };
    }

    return data as Record<string, string>;
}
