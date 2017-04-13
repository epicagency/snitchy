# Snitchy

"Wrapper" for [analyticsjs-boilerplate](https://github.com/philipwalton/analyticsjs-boilerplate) (!!! WIP, pre-alpha !!!)

## Getting started

### Installation

```sh
npm i -S epic-snitchy
```

### Usage

```html
<!-- Loads analytics.js and custom tracking code asynchronously -->
<script async src="https://www.google-analytics.com/analytics.js"></script>
<script async src="/path/to/tracking.min.js"></script>
```

```js
import Snitchy from 'epic-snitchy'

// Set ga and/or sentry configurations.
const trackers = {
  test: 'UA-12345-1',
  prod: 'UA-12345-2',
}

new Snitchy(trackers, process.env.NODE_ENV) // production or anything, provided by Gulp + envify
```

> Based on the GREAT work of [@philipwalton](https://philipwalton.com/articles/the-google-analytics-setup-i-use-on-every-site-i-build/)
