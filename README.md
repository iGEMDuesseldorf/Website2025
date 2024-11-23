# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm i
```

### Local Development

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Building another locale

```
npm run build -- --locale de
```

We also have the option, to make the site multi-language. It is not configured right now, but could be easily, so if anyone is interested we could enable it, but this would also mean that we would have to translate the documentation by hand.
