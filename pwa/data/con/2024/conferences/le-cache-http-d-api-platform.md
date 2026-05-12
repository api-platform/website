---
type: conference
speakers: -sylvain-combraque-2024 
track: '2'
date: '2024-09-20'
start: '16:10'
end: '16:50'
short: Une initiation au cache HTTP du framework, basé sur Caddy et propulsé par FrankenPHP. 
tag: 'performance'
---

# Le cache HTTP d'API Platform 🇫🇷 

Quand on pense au cache HTTP on pense généralement à Varnish, mais ce n'est pas celui par défaut dans API Platform. En effet, API Platform, étant propulsé dorénavant par FrankenPHP, est donc basé sur le reverse-proxy Caddy. Ce dernier possède un écosystème bien fourni notamment grâce à ses modules, qui permettent d'étendre ses possibilités. Un module en particulier permet de faire du cache HTTP, nativement, et tire partie des fonctionnalités mises à disposition d'API Platform pour réduire considérablement la durée de vos requêtes.

Un module qui est **en avance sur son temps**, qui supporte les RFCs précédentes mais aussi futures et qui s'intègre parfaitement dans des codebases existantes. Comment l'activer, le configurer, gérer l'invalidation, et bien plus. Comment, avec un seul binaire, pouvez-vous booster votre application.

Nous verrons cela lors de cette présentation.
