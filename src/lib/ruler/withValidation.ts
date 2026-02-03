import { validateFormData } from "@/lib/ruler/validation";
import { FormBuilder } from "@/lib/form";

export function withFormBuilderValidation(
    form: FormBuilder,
    action: (data: Record<string, string>) => Promise<any>
) {
    return async (formData: FormData) => {
        try {
            const data = validateFormData(formData, form.getValidationSchema());
            return await action(data);
        } catch (err: any) {
            if (err.type === "VALIDATION_ERROR") {
                return { success: false, errors: err.errors };
            }
            return { success: false, errors: { _form: "Une erreur est survenue" } };
        }
    };
}
