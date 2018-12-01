# Examples

## Page

defaults:

- name = 'all'
- layer = 'page'
- event = null

> Si pas de name (name === 'all'), test si `data-snitchy-name`
> Si name, check for [name] et merge avec `all`

!!! Le merge doit se faire selon les "layers" et les "events"

### Scénarii

#### No params

```js
snitchy.page();
snitchy.page('page'); // same

dataLayer.push({
  page : { … } // layer + data (all)
  event: 'page-load', // event
});
```

#### Layer with multiple events

```js
snitchy.page('all', 'offline');

dataLayer.push({
  offline : { actions: 'somethingGlobal' } // layer + data
  event: 'page-load', // event
});
dataLayer.push({
  offline : { actions: 'somethingDifferent' } // layer + data
  event: 'page-refresh', // event
});
```

#### Layer with multiple events + event param

```js
snitchy.page('all', 'offline', { event: 'page-load' });

dataLayer.push({
  offline : { actions: 'somethingGlobal' } // layer + data
  event: 'page-load', // event
});
```

#### Multiple layers + event param

```js
snitchy.page('all', ['page', 'offline', { event: 'page-load' });

dataLayer.push({
  page : { … } // layer + data (all)
  event: 'page-load', // event
});
dataLayer.push({
  offline : { actions: 'somethingGlobal' } // layer + data
  event: 'page-load', // event
});
```

#### Multiple layers + multiple events + name

```js
snitchy.page('products', ['page', 'offline'], {
  event: ['page-load', 'page-refresh'],
});

dataLayer.push({
  page : { … } // layer + data (all + products)
  event: 'page-load', // event
});
dataLayer.push({
  offline : { actions: 'somethingGlobal', category: 'foo' } // layer + data
  event: 'page-load', // event
});
dataLayer.push({
  offline : { actions: 'somethingSpecific' } // layer + MERGED data !!!
  event: 'page-refresh', // event
});
```

> Multiple **layers** = multiple **pushes**
>
> Multiple **events** = multiple **pushes**

---

## Events

defaults:

- layer = page
- event = null

### Scénarii

```
snitchy.event('component');

dataLayer.push({
  event: 'click',
  bla: 'bla',
});

// If multiple events
dataLayer.push({
  event: 'click',
  bla: 'bla',
});
dataLayer.push({
  event: 'cta',
  blu: 'blu',
});

// If multiple events but 1 passed -> filtering
dataLayer.push({
  event: 'cta',
  blu: 'blu',
});
```
