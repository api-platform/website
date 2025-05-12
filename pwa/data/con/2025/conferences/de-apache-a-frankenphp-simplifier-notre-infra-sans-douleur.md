---
type: conference
speakers: -yoan-bernabeu-2025
short: Migrer un Saas basé sur Apache/PHP vers FrankenPHP.
tag: 'feedback'
---

# De Apache à FrankenPHP : simplifier notre infra sans douleur (🇫🇷)

Ce retour d'expérience présente **la migration d'un SaaS**, dans le monde agricole, d'une infrastructure basée sur Apache/PHP vers FrankenPHP, réalisée sans interruption de service et de manière totalement transparente pour les équipes de développement internes et freelances.

Partant d'une architecture simple (Load Balancer manuel, Docker officiel Apache/PHP, tâches asynchrones via Supervisord), plusieurs limites étaient identifiées : gestion manuelle du HTTPS, lourdeur des images Docker, et manque de flexibilité. Après **une phase de POC et d'expérimentation**, la migration a été menée en deux étapes progressives. L'objectif était de simplifier l'infrastructure, d'automatiser la gestion du HTTPS et de réduire la taille des images, tout en maintenant les processus existants.

Le talk détaillera **les étapes clés de cette transition**, les bénéfices observés, ainsi que les points d'attention découverts en cours de route.
