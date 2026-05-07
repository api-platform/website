---
type: conference
speakers: -johan-janssens-2026
short: "PHP on the desktop sounds crazy—until it works. Discover how to combine FrankenPHP and Wails to build fast, native desktop applications within a single binary."
tag: archi
track: '1'
---

# Building Desktop Apps with FrankenPHP 🇺🇸

HP on the desktop sounds like a bad idea. Until it works.

FrankenPHP isn't just a Caddy module, it's a Go library you can embed anywhere. FrankenWails combines it with Wails, Go's answer to Electron. The result: native desktop apps where PHP handles the backend, HTML/CSS/JS handles the UI, and Go is the glue. No Node.js, no Electron, no server. Just a single binary.

In this talk, we'll look at how PHP, Go, and the frontend communicate inside a single process, how to expose native menus, dialogs, and system tray to PHP, and how to distribute your app, either as a single binary or by packaging your PHP code as a PHAR archive that the runtime can load directly.

We'll walk through the code, run live demos, and end with a working desktop app that you'd never guess isn't native. Don't worry if you don't know Go, if you know PHP it'll feel very familiar.
