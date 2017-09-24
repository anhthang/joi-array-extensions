# 1.1.0 API Reference

- [Rules](#rules)
  - [`array.continuous(key, startIndex)`](#arraycontinuouskeystartIndex)

<!-- tocstop -->

# Rules

## `array.continuous(key, startIndex)`

Specifies the allowed date format:
- `key` - `string` that should check continuous or not.
- `startIndex` - `integer` the value `key` should be started. Default `0`

```js
const schema = Joi.array().items({
    idx: Joi.number().integer()
}).continuous('idx', 1);
```