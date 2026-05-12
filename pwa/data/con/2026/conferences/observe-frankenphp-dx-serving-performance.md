---
type: conference
speakers: -alexandre-daubois-2026
short: "From blind panics to real-time insights: a live deep dive into tracking memory leaks and tuning FrankenPHP workers without the hassle."
tag: performance
track: '1'
---

# Observe FrankenPHP: DX Serving Performance 🇺🇸

Every application has an engine: the runtime that executes your code. In PHP, it’s this invisible foundation working behind the scenes… Then one day, **production goes down**.

We shouldn’t, but it’s the ritual of panicked SSH. We run a futile « htop », try to guess which anonymous process is hogging the RAM, and drown in austere dashboards (sometimes ones we’ve never even opened…). Why is observability always perceived as a **chore involving boring YAML files**?

Let’s take the opposite approach: what if we transformed this black box into a simple, tremendous dashboard? Let’s put an end to tedious monitoring. We’ll dissect FrankenPHP’s behavior live and show you how to understand what’s happening by running one single command, with no configuration required. A surgical deep dive to **track down memory leaks**, **manage your workers**, and **fine-tune your auto-scaling** in real time. No prior knowledge needed. Live demos, stress tests, and open-source runtime insights await!
