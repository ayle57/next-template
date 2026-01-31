import "dotenv/config";

function required(name: string): string {
    const value: string|undefined = process.env[name];
    if(!value) throw new Error(`Environment variable ${name} not found`);
    return value;
}

export const env = {
    NODE_ENV: process.env.NODE_ENV || "development",

    MAILJET_API: required("MAILJET_API"),
    MAILJET_SECRET: required("MAILJET_SECRET"),
}
