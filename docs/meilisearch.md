# Meilisearch

## Installation

### Binaire

Suivre les instructions pour installer le binaire :
https://www.meilisearch.com/docs/learn/getting_started/installation#local-installation

Choisir une _masterkey_ et la stocker (elle sera utile à plusieurs moments)

Puis lancer le binaire :

```
meilisearch --master-key="<MASTERKEY>"
```

### Configuration

Générer une première clé d'API qui sera utilisée par le _scraper_ qui indexera la documentation automatiquement

```
curl --location --request POST 'http://127.0.0.1:7700/keys' \
--header 'Authorization: Bearer <MASTERKEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "description": "Scraper key",
    "actions": ["documents.*", "indexes.*"],
    "indexes": ["*"],
    "expiresAt": "2042-04-02T00:42:42Z"
  }'
```

Ajouter dans le `.env.local` cette clé d'API et l'url de meilisearch :

```
NEXT_MEILISEARCH_URL = http://localhost:7700
NEXT_MEILISEARCH_API_KEY = <API KEY>
```

Créer l'index de documentation

```
curl --location --request POST 'http://127.0.0.1:7700/indexes' \
--header 'Authorization: Bearer <MASTERKEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "uid": "docs"
}'
```

Créer une clé d'API qui sera utilisée par la PWA pour la recherche

```
curl --location --request POST 'http://127.0.0.1:7700/keys' \
--header 'Authorization: Bearer <MASTERKEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "description": "Search key",
    "actions": ["search"],
    "indexes": ["*"],
    "expiresAt": "2042-04-02T00:42:42Z"
  }'
```

## Scraper

### Configuration

La configuration du scraper est dans `pwa/meilisearch-scraper-config.json` comme requis
par le [docs-scraper](https://github.com/meilisearch/docs-scraper).

La librairie nécessite de respecter un découpage des pages relativement
précis : https://github.com/meilisearch/docs-scraper#the-levels-

Afin de s'y adapter et d'utiliser les catégories de la documentation, la configuration est découpée en autant de
parties (cf `selectors` et `start_urls`).

Afin de forcer le  `lvl0`, un selector `empty` est utilisé avec une `default_value`

Le `lvl1` correspond au titre de la page.

Le reste du contenu est placé directement dans `content` avec des sélecteurs CSS différents selon les catégories.

### Lancer le scraper en local

Pré-requis : avant de lancer le scraper, il faut construire le sitemap.
Il est généré automatiquement via [next-sitemap](https://github.com/iamvishnusankar/next-sitemap) après le build.

```
docker run -t --network=host --rm \
    -e MEILISEARCH_HOST_URL=http://localhost:7700 \
    -e MEILISEARCH_API_KEY=<API KEY> \
    -v ./pwa/meilisearch-scraper-config.json:/docs-scraper/config.json \
    getmeili/docs-scraper:latest pipenv run ./docs_scraper config.json
```

## Recherche

Le recherche est basée sur le librairie [docs-searchbar.js](https://github.com/meilisearch/docs-searchbar.js).

Certaines options sont configurables dans le `pwa/components/layout/SearchInput.tsx` via la clé `meilisearchOptions` en
suivant les options
disponibles [ici](https://www.meilisearch.com/docs/reference/api/search#search-parameters).
