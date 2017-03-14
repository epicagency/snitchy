# Snitchy

Tracking for EPIC projects

- Google Analytics
- Sentry

## Getting started

### Installation

```sh
npm i -S epic-snitchy
```

### Usage

Create some `assets/scripts/tracking.js` file.

```js
import Snitchy from 'epic-snitchy'

// Set ga and/or sentry configurations.
const opts = {
  ga: {
    test: 'UA-12345-1',
    prod: 'UA-12345-2',
  },
  sentry: {
    key: 'f8528a79efae426e860862b1547bd23b',
    project: '15',
  },
}

new Snitchy(opts, process.env.NODE_ENV) // production or anything, provided by Gulp + envify
```

> Analytics part is based on the amazing work of [@philipwalton](https://github.com/philipwalton)
