include .env
export

run:
	bun run dev

test-mailjet:
	curl -X POST https://api.mailjet.com/v3.1/send \
	  -u "$$MAILJET_API:$$MAILJET_SECRET" \
	  -H "Content-Type: application/json" \
	  -d "{\"Messages\":[{\"From\":{\"Email\":\"allistair.jak@gmail.com\",\"Name\":\"Allistair\"},\"To\":[{\"Email\":\"allistair.jak@gmail.com\"}],\"Subject\":\"Test Mailjet CLI\",\"TextPart\":\"Mail envoyé depuis Makefile 🚀\"}]}"

debug-env:
	@echo MAILJET_API=$${MAILJET_API}
	@echo MAILJET_SECRET=$${MAILJET_SECRET}
