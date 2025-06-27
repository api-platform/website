---
type: conference
speakers: -mathias-arlaud-2025
track: '1'
date: '2025-09-18'
start: '17:20'
end: '18:00'
short: Streamline API Performance with JsonStreamer & ESA
tag: 'performance'
---

# API Platform, JsonStreamer and ESA for a skyrocketing API (🇺🇸)

When building APIs with API Platform, JSON is king — and Symfony's Serializer is at the heart of it all. But once your API starts returning large documents (think thousands of items), performance hits hard.

This talk explores how to make Symfony-based APIs faster and more scalable. We'll introduce **the new JsonStreamer component**, designed to stream JSON efficiently — perfect for large datasets and real-time delivery. Through simple benchmarks, we'll see how streaming can **dramatically improve memory usage** and time-to-first-byte.

Back in API Platform, we'll look at **how JSON-LD and its complexity introduce new challenges**, and how Symfony JsonStreamer's PropertyMetadataLoader step in to help.

To go even further, we'll look at **ESA (Edge Side APIs)**: a pattern for breaking large JSON payloads into smaller, progressive calls, improving perceived performance and user experience — especially in high-latency environments.

Whether you're hitting performance ceilings or just curious about modern API techniques, this talk will help you rethink how data flows through your Symfony apps.
