include .env
export

run:
	bun run dev

test-mailjet:
	curl -X POST https://api.mailjet.com/v3.1/send \
	  -u "$$PUBLIC_MAILJET_API_KEY:$$SECRET_MAILJET_API_KEY" \
	  -H "Content-Type: application/json" \
	  -d "{\"Messages\":[{\"From\":{\"Email\":\"allistair.jak@gmail.com\",\"Name\":\"Allistair\"},\"To\":[{\"Email\":\"allistair.jak@gmail.com\"}],\"Subject\":\"Test Mailjet CLI\",\"TextPart\":\"Mail envoyé depuis Makefile 🚀\"}]}"
