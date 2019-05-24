# joi-array-extensions
Joi extensions for extra array rules.

[![npm](https://flat.badgen.net/npm/v/joi-array-extensions)](https://npmjs.com/package/joi-array-extensions) ![download](https://flat.badgen.net/npm/dt/joi-array-extensions) ![dependents](https://flat.badgen.net/npm/dependents/joi-array-extensions) ![travis](https://flat.badgen.net/travis/buianhthang/joi-array-extensions) ![appveyor](https://flat.badgen.net/appveyor/ci/buianhthang/joi-array-extensions)

# API
See the [API Reference](https://github.com/buianhthang/joi-array-extensions/blob/master/API.md).

# Usage
Usage is a two steps process. First, a schema is constructed using the provided types and constraints:

```js
const BaseJoi = require('@hapi/joi')
const Extension = require('joi-array-extensions')
const Joi = BaseJoi.extend(Extension)

const schema = Joi.array().items({
    idx: Joi.number().integer()
}).continuous('idx', 1)
```

# Coverage

```
7 tests complete
Test duration: 56 ms
Assertions count: 40 (verbosity: 5.71)
No global variable leaks detected
Coverage: 100.00%
Linting results: No issues
```
