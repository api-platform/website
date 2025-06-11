---
type: conference
speakers: -clement-herreman-2025
short: Retour d'expérience sur la gestion des erreurs dans les API chez Exotec.
tag: 'good-practices'
---

# Rendez vos devs front heureux en normalisant toutes vos erreurs d'API grâce à API Platform et la RFC 7807 (🇫🇷)

J’ai envie de partager un retour d’expérience sur le design des API chez Exotec, en attaquant un vrai point de friction : **la gestion des erreurs**. Comment bien documenter les cas limites ? Comment organiser son code pour gérer les erreurs facilement, les ranger proprement, et surtout les exposer clairement pour que les utilisateurs pigent vite ce qui cloche chez eux ?

Mon objectif ultime : **qu’une API sache expliquer à l’utilisateur pourquoi ça plante** — avec une UX aux petits oignons qui lui permette de réagir vite et en autonomie.

On fera un peu de théorie, mais surtout du concret : comment structurer son code&nbsp;? Quelle hiérarchie d’exceptions adopter&nbsp;? Où tracer la limite face aux erreurs cheloues ou carrément exotiques ?
