---
type: conference
speakers: -phil
track: EN
date: '2021-09-10'
start: '15:30'
end: '16:10'
short: Get ready for spine-chilling stories about APIs
---

# API Horror Stories from an Unnamed Coworking Company

[![Phil Sturgeon - API Horror Stories from an Unnamed Coworking Company](https://img.youtube.com/vi/C72UE0ypr6c/0.jpg)](https://www.youtube.com/watch?v=C72UE0ypr6c&list=PL3hoUDjLa7eSo7-CAyiirYfhJe4h_Wxs4&index=8)

I got a call from a friend who worked for Unnamed Coworking Company, "Phil, our APIs are all terrible, can you come and help?" After 18 months of almost daily P1's and P0's, I left that company drastically better off than it was, and picked up a lot of hilarious stories.

## 1) Monoliths? Megaliths!
Two giant monolith APIs handled pretty much everything, every single system would need something from one of them, whether is was OAuth tokens, user information, company information, billing and subscription details, etc. These megaliths had at least 20 upstream dependencies, so if any of those out, half the company would go down. No timeouts were used anywhere, so random 10s responses were common.


## 2) Mututally Assured Destruction
Both megaliths asl relied on each other, so if either one slows down they both get infinitely slower, and then the entire company crashes, because literally no application would work without these two services being up.


## 3) Blocking Processes Blocking People
You've turned up on the first of the month to start working at your new office, but the keycard system is taking 2 minutes per card per attempt, and all those blocking synchronous attempts have knocked over the entire ecosystem of the whole company. You'll have to ask reception to use the bathroom until we "fix it" (demand reduces).


## 4) No Time for Docs, Let's Rewrite!
Seeing as nothing was ever documented, "there's no time for documentation!" Later we'd forget how endpoints worked, which was "fine" because the client wasnt changing, but if a new client appeared we'd have to write a brand new version of the endpoint which had different requirements so other clients could use it.


## 5) Mystery Stampeding Herd
Something is knocking over our systems, but we only know it's using Faraday v0.8.7, which application is that?

All this, and more, in a fun and whacky ride of when everything goes wrong and nobody else knows how to stop it happening again.
