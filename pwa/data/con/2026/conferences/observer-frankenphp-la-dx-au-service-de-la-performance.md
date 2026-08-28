---
type: conference
speakers: -alexandre-daubois-2026
short: "Fini l'enfer du débogage SSH : contrôlez vos instances FrankenPHP en temps réel avec une seule commande, sans la moindre configuration."
tag: 'performance,tools'
track: '1'
date: '2026-09-17'
start: '11:40'
end: '12:20'
---

# Observer FrankenPHP : La DX au service de la performance 🇫🇷

Chaque application possède un moteur : le runtime qui exécute votre code. En PHP, c'est cette fondation invisible qui travaille en coulisses… Jusqu'au jour **où la production tombe en panne**.

On ne devrait pas, mais on saute sur une session SSH directement sur le serveur. On lance un htop en espérant un miracle, on essaie de deviner quel processus anonyme dévore toute la mémoire, et on se noie dans des tableaux de bord austères (parfois même jamais ouverts auparavant…).

Pourquoi l'observabilité est-elle toujours perçue comme **une corvée faite de fichiers YAML illisibles et repoussants** ?

Il est temps de transformer cette boîte noire en un tableau de bord simple et agréable à regarder pour mettre fin au monitoring fastidieux. Cela nous permettra de plonger dans le comportement d’une instance FrankenPHP en cours d’exécution pour comprendre ce qu'il se passe en lançant une seule commande, sans aucune configuration. Une plongée chirurgicale pour **traquer les fuites mémoire**, **gérer vos workers** et **affiner votre autoscaling en temps réel**. Aucune connaissance préalable n'est nécessaire. Démonstrations en direct, tests de charge et exploration des coulisses d'un runtime open source vous attendent !
