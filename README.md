# Onlytodo

Simple todo list on svelte and bootstrap 4

*Note that you will need to have [Node.js](https://nodejs.org) 12 installed.*

## Get started

Install the dependencies...

```bash
cd onlytodo
yarn
```

...then start webpack:

```bash
yarn dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and the page should reload with your changes.


## Deploying to the web

### With [now](https://zeit.co/now)

Install `now` if you haven't already:

```bash
npm install -g now
```

Then, from within your project folder:

```bash
now
```

As an alternative, use the [Now desktop client](https://zeit.co/download) and simply drag the unzipped project folder to the taskbar icon.

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public
```
