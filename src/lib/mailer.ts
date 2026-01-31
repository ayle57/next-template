import { env } from "./env";

type MailHeaders = {
    subject: string;
    cc?: string[];
    bcc?: string[];
    replyTo?: string;
};

export function parseEmail(input: string) {
    const match = input.match(/(.*)<(.+)>/);
    if (!match) return { Email: input.trim() };

    return {
        Name: match[1].trim(),
        Email: match[2].trim(),
    };
}

function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, '');
}

export async function send(
    from: string,
    to: string,
    headers: MailHeaders,
    body: string
) {
    const res = await fetch('https://api.mailjet.com/v3.1/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Basic ' + Buffer.from(`${env.MAILJET_API}:${env.MAILJET_SECRET}`).toString('base64'),
        },
        body: JSON.stringify({
            Messages: [
                {
                    From: parseEmail(from),
                    To: [{ Email: to }],
                    Subject: headers.subject,
                    TextPart: stripHtml(body),
                    HTMLPart: body,
                    Cc: headers.cc?.map((email) => ({ Email: email })),
                    Bcc: headers.bcc?.map((email) => ({ Email: email })),
                    ReplyTo: headers.replyTo ? { Email: headers.replyTo } : undefined,
                },
            ],
        }),
    });

    const data = await res.json();

    if (!res.ok || data.Messages?.[0]?.Status !== 'success') {
        throw new Error(`Mailjet error: ${JSON.stringify(data, null, 2)}`);
    }

    return data.Messages[0];
}
