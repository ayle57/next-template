import React from "react";
import { FormBuilder } from "@/lib/form";
import { submitContact } from "@/actions/submitContact";

export default function Home() {
  const form = new FormBuilder(submitContact, "", "Soumettre")
      .input("name", "text", { placeholder: "Entrez votre nom" });

  return <React.Fragment>
    <p>hello world</p>
    {form.render()}
  </React.Fragment>
}
