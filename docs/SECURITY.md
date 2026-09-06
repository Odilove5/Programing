# Trust, privacy, and execution model

Student progress, business fixtures, API credentials, customer data, prompts, model responses, approvals, and execution evidence may be sensitive. The application is local-first and SQLite data is not encrypted at rest.

## Trust boundaries

- Browser and imported state are schema validated before persistence.
- Campaign files, API responses, retrieved context, and model output are untrusted.
- Credentials never enter source, prompts, fixtures, logs, or commits.
- Model output cannot invoke an adapter directly.
- Policy returns allow, deny, or require-approval and fails closed.
- Approval binds to exact action parameters and expires.
- Adapters expose narrow allowlisted operations with dry-run, bounds, and idempotency.

Use timeouts, bounded retries and backoff, rate and budget limits, correlation IDs, secret redaction, structured evidence, and deterministic negative tests. Start with mock connectors. A higher autonomy level never bypasses a deny rule.
