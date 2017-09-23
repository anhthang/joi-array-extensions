# joi-array-extensions
Joi extensions for extra array rules.

# Usage

Usage is a two steps process. First, a schema is constructed using the provided types and constraints:

```js
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

const schema = Joi.array().items({
    idx: Joi.number().integer()
}).continuous('idx', 1);
```

# API
See the [API Reference](https://github.com/buianhthang/joi-array-extensions/blob/v1.0.0/API.md).
