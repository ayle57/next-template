"use server";

export async function submitContact(formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    console.log(data);
}
