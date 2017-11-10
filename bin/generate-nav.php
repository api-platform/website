<?php
<<<CONFIG
packages:
    - "erusev/parsedown: ^1.6"
    - "symfony/yaml: ^3.2"
CONFIG;

use Symfony\Component\Yaml\Yaml;

$content = file_get_contents(__DIR__ . '/../src/pages/docs/index.md');
$content = str_replace(['`'], ['"'], $content);

$parser = new Parsedown();
$html = new SimpleXMLElement('<root>'.$parser->text($content).'</root>');

function guessPath(SimpleXMLElement $h2): string
{
    $firstItem = $h2->xpath('following-sibling::ol[1]/li[1]')[0];
    $href = $firstItem->a->attributes()['href'];

    if (false === strpos($href, '/')) {
        return 'extra';
    }

    return explode('/', $href)[0];
}

function normalizeAnchors(array $anchors): array
{
    $results = [];
    foreach ($anchors as $anchor) {
        $href = $anchor->a->attributes()['href'];

        $results[] = [
            'id' => explode('#', $href)[1],
            'title' => normalizeTitle((string) $anchor->a),
        ];
    }

    return $results;
}

function normalizeItems(array $items): array
{
    $results = [];
    foreach ($items as $item) {
        if (empty($item->a)) {
            continue;
        }

        $href = (string) $item->a->attributes()['href'];
        $itemId = false === strpos($href, '/') ? $href : explode('/', $href)[1];
        $itemId = str_replace('.md', '', $itemId);

        $anchors = (array) $item->ol;
        if (!empty($anchors)) {
            $anchors = $anchors['li'];
            if (!is_array($anchors)) {
                $anchors = [$anchors];
            }

            $results[] = [
            'id' => $itemId,
            'title' => normalizeTitle((string) $item->a),
                'anchors' => normalizeAnchors($anchors),
        ];
        } else {
            $results[] = [
                'id' => $itemId,
                'title' => normalizeTitle((string) $item->a),
            ];
        }
    }

    return $results;
}

function normalizeTitle(string $title): string
{
    $title = trim($title);
    $title = explode(':', $title)[0];

    return $title;
}

$results = [];
foreach ($html->xpath('//h2') as $h2) {
    $results[] = [
        'title' => normalizeTitle((string) $h2),
        'path' => guessPath($h2),
        'items' => normalizeItems($h2->xpath('following-sibling::ol[1]/li'))
    ];
}

file_put_contents(__DIR__ . '/../src/pages/docs/nav.yml', Yaml::dump($results, 6));
