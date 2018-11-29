# Notes

## Todos

- add tests to precommit

---

## Parser: rules/tokens

### param

> `token.param` / `token.value` / `token.extra` (url)

- **attr** (`useValue: true`)
  - $attrValue
  - $attrCompoundValue
  - $attrText
  - $elAttrValue
  - $refNameAttrValue
- **data** (`useValue: true`)
  - $dataValue
  - $dataCompoundValue
  - $dataText
  - $elDataValue
  - $refNameDataValue
- **doc** (`useElement: true`, `useValue: true`)
  - $docValue
- **html** (`useElement: true`, `useValue: false`)
  - $elHtml
  - $refNameHtml
- **text** (`useElement: true`, `useValue: false`)
  - $elText
  - $refNameText
- **this** (`useElement: false`, `useValue: true`)
  - $thisValue
- **url** (`useElement: false`, `useExtra: 'search, hash'`)
  - $url
  - $urlValue
  - $urlSearchValue
  - $urlHash
- **val** (`useElement: false`, `useValue: true`)
  - $valValue

### element

> `token.element` / `token.name`

- **el** (`useName: false`)
  - $elText
- **ref** (`useName: true`)
  - $refNameText
  - $refCompoundNameText
  - $refTextText

### extra

> `token.defaults` / `token.optional` / `token.filters`

- **defaults** (=)
  - $elText=default
  - $elText|filter=default
- **optional** (?)
  - $elText?
  - $elText|filter?
- **filters** (|)
  - $elText|filter
  - $elText|filter1|filter2
