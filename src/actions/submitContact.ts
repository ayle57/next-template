"use server";

export async function submitContact(data: Record<string, string>) {
    console.log("Données validées côté serveur :", data);

    return { success: true };
}
