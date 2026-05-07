---
type: conference
speakers: -sebastien-rogier-2026
short: "D'une usine à gaz à un système d'agents asynchrones : comment abstraire, orchestrer et fiabiliser 40 000 requêtes IA par jour en PHP."
tag: feedback
track: '1'
---

# De GPT-3 aux agents : 5 ans d'évolution d'une stack LLM en PHP 🇫🇷

En 2021, l'effet "magique" : nous intégrons GPT-3 à notre SaaS SEO (stack Symfony/API Platform). Un simple appel à une API, un prompt, et nous avons des suggestions de titres dans notre application.

Deux ans plus tard, l'effet magique s'estompe. Nous maintenons des dizaines de "générateurs". **L'architecture (1 classe = 1 prompt) est devenue une usine à gaz**, difficile à maintenir ou à faire évoluer.

2024 : Le besoin d'intégrer Claude expose notre dépendance technique. Nous devons intégrer un second provider dans une architecture 100% OpenAI. Première refonte : une abstraction multi-provider avec fallback. Changer de LLM devient une ligne de config. Mais les nouvelles features exigent d'aller plus loin. Le besoin émerge de gérer le streaming, de maintenir des échanges LLM de plusieurs minutes, et d'orchestrer des prompts secondaires. Deuxième transformation : **nous passons à un système d'agent asynchrone**. L'agent peut utiliser des "tools" (connectés à notre stack ou des API tierces) pour exécuter ces workflows complexes, tout en gardant la performance comme priorité.
Cette nouvelle stack a soulevé des défis majeurs en PHP : fiabilisation de l'exécution, observabilité de workflows complexes, et gestion de la parallélisation/asynchronisme des "tools" sans async/await natif.

Aujourd'hui, notre système (templates versionnés, observabilité complète, error recovery) gère environ 40 000 requêtes/jour. Ce talk est le REX de 5 ans de **choix d'archi**, de **patterns**, et de belles problématiques pour **faire tourner des LLMs en production... avec PHP**.
