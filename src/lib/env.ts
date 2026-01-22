import "server-only";

export const env = {
    NODE_ENV: process.env.NODE_ENV,
    // MailJet API KEY
    SECRET_MAILJET_API_KEY: process.env.SECRET_MAILJET_API_KEY
}
