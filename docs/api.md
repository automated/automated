# API

## Getting Started

Note: This is only designed to work with React at this time.

#### Install

```bash
yarn add @automated/automated
```

#### Configure

Create `.automated.js` config files as siblings of components you would like to
test.

#### Add a Plugin

The base Automated project is simply a plugin runner. Install a
[plugin](https://github.com/search?q=topic%3Aplugin+org%3Aautomated-tools&type=Repositories)
to get started.

#### Commands

The default command will look for automated plugins and run config files found.

```
yarn automated
```

Pass args directly to plugins

```
yarn automated jest\[--updateSnapshot --watch\]
```

---

## Config Files

The most basic `.automated.js` config file can be empty, in which case it will
use defaults.

Export each of the attributes like `export const Component`

| Attribute      | Type               | Default                                                  |
| -------------- | ------------------ | -------------------------------------------------------- |
| `Component`    | React component    | default export from sibling with the filename `index.js` |
| `exampleProps` | Object             | `{}`                                                     |
| `title`        | String             | Component name                                           |
| `useCases`     | Array of `useCase` | See `useCase`                                            |

#### `useCase` Object

```js
{
  name: 'Default', // or (string)
  props: exampleProps, // or (object) or React props
  // context: (object) provides React context
}
```