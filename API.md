# 1.1.2 API Reference

- [Rules](#rules)
  - [`array.continuous(comparator, limit)`](#arraycontinuouscomparatorlimit)

<!-- tocstop -->

# Rules

## `array.continuous(comparator, limit)`

Specifies the allowed date format:
- `comparator` - `string` or `func` that should check continuous or not.
- `limit` - `integer` or `ref` the value of `comparator` should be start. Default `0`

```js
const schema = Joi.array().items({
    idx: Joi.number().integer()
}).continuous('idx', 1);
```