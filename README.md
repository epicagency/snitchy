# Snitchy

Google Analytics for EPIC projects

## Getting started

### Installation

```sh
npm i -S epic-snitchy
```

### Usage

Create some `assets/scripts/tracking.js` file.

```js
import Snitchy

const config = {
  test: 'UA-XXXXX-Y',
  prod: 'UA-XXXXX-z',
}

new Snitchy(config)
```
