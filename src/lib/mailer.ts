import "server-only";

type MailHeaders = {
  subject: string;
  cc?: string[];
  bcc?: string[];
  replyTo?: string;
};

const MAILJET_API_KEY = process.env.MAILJET_API_KEY;
const MAILJET_SECRET_KEY = process.env.MAILJET_SECRET_KEY;

if(!MAILJET_API_KEY || !MAILJET_SECRET_KEY) {
    throw new Error("Mailjet env vars are missing");
}

export async function send() {
    // !TODO
}
