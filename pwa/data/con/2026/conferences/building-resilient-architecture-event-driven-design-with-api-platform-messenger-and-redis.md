---
type: conference
speakers: -abdellah-el-ghailani-2026
short: Keep your APIs fast and resilient when legacy backends are slow.
tag: feedback
track: '1'
date: '2026-09-18'
start: '15:50'
end: '16:30'
---

# Building Resilient Architecture : Event‑Driven Design with API Platform, Messenger & Redis 🇺🇸

Modern enterprise systems can't afford to be fragile. When a critical downstream service is slow, an ERP takes 3 seconds to respond, or traffic spikes unexpectedly, your API needs to keep serving gracefully.

In this talk, I'll share hard-won lessons from a real-world migration: **replacing a legacy BizTalk middleware layer with a Symfony/API Platform application** that talks directly to SAP via RFC, processes orders asynchronously through Messenger, and uses Redis both as a cache layer and a message transport.

We'll cover how to design API Platform resources that respond instantly by deferring heavy work to Messenger workers, how to implement smart Redis caching strategies that protect your backend from stampedes, and how to structure your message handlers for retry, failure isolation, and observability.

We'll also look at the tricky parts nobody warns you about : backward compatibility with legacy REST consumers, cache invalidation timing, and what happens when your SAP connection pool runs dry on a Monday morning.

No slides full of theory. This is a production architecture, running today, handling real orders for a manufacturing company. **You'll leave with a concrete, production-tested architecture pattern you can apply to any project where reliability matters more than cleverness.**
