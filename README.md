# 📈 Snitchy

![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg?style=flat-square)
[![NPM version](https://img.shields.io/npm/v/snitchy.svg?style=flat-square)](https://www.npmjs.com/package/snitchy)
[![Coverage Status](https://img.shields.io/coveralls/thierrymichel/snitchy/master.svg?style=flat-square)](https://travis-ci.com/thierrymichel/snitchy)

> DataLayer push made easy

This module aims to reach 3 goals:

1. One single source of truth aka one model for strutured data to be pushed
2. Write once, use everywhere
3. Use dynamic values  as easily as possible

## Getting started

- Add `snitchy-loader`
- Import `snitchy`
- Import and load your data (`.xlsx` via loader or `.js`, `.json`)
- Add `kapla-snitchy` (if you use Kapla)
- Dispatch 'page' or 'component' (automatically or programmatically)

---

## Usage

### Pages

Pushing data from pages use the `data-namespace` attribute.
Data variables can be declared once for all pages into `{ pages/all/[layer(s)] }`.
Custom variables should go into `{ pages/[namespace]/[layer(s)] }`.

> Data pushed are `{ layer1: {}, … }`.

#### `snitchy.page([layer, values, scope])`

##### layer

Type: `string` | `array`

##### values

Type: `object`

For use with `$valSomething` ([see below](#prefixes)).

##### scope

Type: `thisArg`

For use with `$thisSomething` where "this" will refers to "scope".

#### How to use it

Different scenarios:

1. No framework (Vue.js), no page transition (Barba.js)
    - Into `main.js`, will be called on every page load
2. With page transition (Barba.js)
    - Global, no view specific data
        - Into `main.js`, will be called on first page load
            > ```js
            > snitchy.page(…);
            > ```
        - AND into`views/ViewManager.js`, will be called on every page transition
            > ```js
            > Barba.Dispatcher.on('transitionCompleted', currentStatus => {
            >   snitchy.page(…);
            > });
            > ```
    - By "view", with specific data
        - Into `views/view.js`, will be called on every transition complete
            > ```js
            > onEnterCompleted() {
            >   snitchy.page(…, …, this.view);
            > },
            > ```
3. With framework (Vue.js)
    - TBD (Same logic? Should be coupled globally with `vue-router` or by "root component"…)

---

### Component

Pushing data from components are organised by `slug` and `description`.
By default, all the descriptions are pushed.
You can use a special 'trigger' property (with `kapla-snitchy`) to push automatically "onTriggerValue".
In this case only this content will be pushed (trigger property will be removed before).

> Data pushed are contents of `slug/description(s)`.

#### `snitchy.component([slug, values, scope, trigger])`

##### slug

Type: `string`

"Name" of the component.

##### values

Type: `object`

For use with `$valSomething` ([see below](#prefixes)).

##### scope

Type: `thisArg`

For use with `$thisSomething` where "this" will refers to "scope".

##### trigger

Type: `string`

Filter descriptions with some "trigger".

#### How to use it

```js
// When/where you want to push…
snitchy.component('slug', …);
```

---

### Manual

#### `snitchy.push(data)`

##### data

Type: `object`

"Raw" object for `dataLayer.push()`.

---

### Properties

#### `snitchy.debug`

Type: `boolean`<br>
Default: `false`

Do not push to dataLayer, display into console.

#### `snitchy.variables`

Type: `object`

Your loaded data, KPIs or wathever…

#### `snitchy.prefixes`

Type: `object`

Available prefixes ([see below](#prefixes)).

---

## Prefixes

You can use "static" values or "dynamic" ones.
Dynamic values start with a `$` (`static` vs `$dynamic`).

When working with dynamic values, you need to use `$camelCaseNotation`.
First "part" refers to prefix.
Some are evaluated automatically, some should be passed through `values` or `scope` (see above).

You can add you own prefixes with `addPrefix()`.

- `$url`: `window.location.href`
- `$tagName`: where "name" is the name of the tag.<br>
    Examples:
    - `$tagTitle` refers to `<title />` content.
- `$attrName`: where "name" is the name of the attribute.<br>
    Examples:
    - `$attrLang` refers to `lang=""` value (first found, `<html lang="">`)
    - `$attrDataSomething` refers to `data-something=""` value
- `$valName`: where "name" is the key of the "values" parameter (see above).<br>
    Examples:
    - `$valProductId` refers to `{ productId: 666 }`
- `$thisProp`: where "prop" is the property of the instance triggering the push.<br>
    Should be used with the "scope" parameter (see above).<br>
    Examples:
    - `$thisCategory` refers to `this.category`. `this` should be passed as the "scope" argument
- `$el…` (`kapla-snitchy` only)
    Examples:
    - `$elTextContent` returns `this.$el.textContent`
    - `$elAttribute` returns `this.$el.getAttribute('attribute')`
- `$ref…` (`kapla-snitchy` only)
    Examples:
    - `$refKeywordTextContent` returns `this.$refs[keyword].textContent`
    - `$refKeywordAttribute` returns `this.$refs[keyword].getAttribute('attribute')`
