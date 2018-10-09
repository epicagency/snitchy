# Notes

## Datalayers

### page: no `dataLayer` -> `set()`

```js
dataLayer = [{
  page: {
    category: 'page-category',
  },
}];
```

### page: existing `dataLayer` -> `push()`

```js
dataLayer.push({
  event: 'page-load',
  page: {
    category: 'page-category',
  },
});
```

### page: `event` key -> `push()`

```js
dataLayer.push({
  event: 'event-name',
  page: {
    category: 'page-category',
  },
});
```

### event -> `push()`

```js
dataLayer.push({
  event: 'event-name',
  eventCategory: 'event-category',
});
```
