# Demo Buggy App

A deliberately error-prone web app for demonstrating [VoiceSRE](https://github.com/the-builders-burrow/VoiceSRE).

## How it works

1. **Sentry** captures errors from this app and sends webhooks to VoiceSRE
2. **GitHub Actions CI** sends `workflow_run` webhooks on failure to VoiceSRE
3. **VoiceSRE** receives both, generates AI fixes, tests in a sandbox, and opens PRs

## Setup

```bash
cp .env.local.example .env.local
# Fill in your Sentry DSN, org, project, and auth token
pnpm install
pnpm dev
```

## Triggering demo incidents

- **Sentry flow:** Open `http://localhost:3001`, click any red button
- **GitHub CI flow:** Trigger the CI workflow manually with `should_fail: true`, or push a commit that sets `FAIL_CI=true`

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN for error capture |
| `SENTRY_ORG` | Sentry organization slug |
| `SENTRY_PROJECT` | Sentry project slug |
| `SENTRY_AUTH_TOKEN` | Sentry auth token (for source maps) |
