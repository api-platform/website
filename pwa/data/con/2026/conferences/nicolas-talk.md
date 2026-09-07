---
type: conference
speakers: -nicolas-grekas-2026
short: How FrankenPHP introduces persistent background processes to PHP—solving state retention without breaking its traditional, simple execution model or requiring code rewrites.
tag: feedback
track: '1'
date: '2026-09-17'
start: '14:50'
end: '15:30'
---

# The PHP runtime I want to see 🇺🇸

This talk is about **the runtime I would like PHP to have**, and the steps I think get us there.

For twenty years PHP has worked the same way: one request, one process, and then everything is forgotten. That model is the reason PHP is **simple, robust, and easy to deploy**. It is not the problem.

The problem is everything it cannot do. Nothing can wait, watch, or remember between requests. So we built cron jobs, supervisors, TTLs and Redis keys around it, to make up for one missing capability.

This talk is about **adding that capability without giving up the model**. I spent the last months adding background workers to FrankenPHP: long-running PHP scripts, outside of HTTP, that publish data your requests read directly, with no serialization, no TTL and no restart. Your controllers do not change. Your requests still forget everything. Something beside them now remembers.

I will show what that makes possible, what each step on this path really costs, and why I believe the runtimes that ask you to rewrite your code will stay niche while this one becomes normal.
