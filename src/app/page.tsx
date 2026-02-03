"use client";

import React, { useState } from "react";
import { FormBuilder } from "@/lib/form";
import { submitContact } from "@/actions/submitContact";

export default function Home() {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const form = new FormBuilder()
        .input("name", "text", {
            placeholder: "Entrez votre nom",
            rules: [{ type: "required" }, { type: "minLength", value: 2 }]
        })
        .onValidate(setErrors, submitContact);

    return (
        <React.Fragment>
            <p>hello world</p>
            {form.setErrors(errors).render()}
        </React.Fragment>
    );
}
