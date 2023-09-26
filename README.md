# vercel-mail-server

Here is a simple mail server you can deploy to Vercel and use in seconds.

## Setup

1. Deploy the app on Vercel.
2. Setup environment variables:
  - `MAIL_USER`: your email address
  - `MAIL_PASS`: your email password
  - `ALLOWED_ORIGINS`: https://www.mydomain.com

## Usage

Just send a POST request to `https://mymailserver.vercel.app/api` whose body is JSON and structured as follow:
```json
{
  "to": "to@domain.com",
  "text": "Hello",
  "subject": "Hello"
}
