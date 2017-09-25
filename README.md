# joi-array-extensions
Joi extensions for extra array rules.

[![NPM](https://nodei.co/npm/joi-array-extensions.png)](https://nodei.co/npm/joi-array-extensions/)

[![npm version](https://badge.fury.io/js/joi-array-extensions.svg)](https://badge.fury.io/js/joi-array-extensions)
[![Build Status](https://travis-ci.org/buianhthang/joi-array-extensions.svg?branch=master)](https://travis-ci.org/buianhthang/joi-array-extensions)
[![Dependency Status](https://dependencyci.com/github/buianhthang/joi-array-extensions/badge)](https://dependencyci.com/github/buianhthang/joi-array-extensions)

# Usage

Usage is a two steps process. First, a schema is constructed using the provided types and constraints:

```js
const BaseJoi = require('joi')
const Extension = require('joi-array-extensions')
const Joi = BaseJoi.extend(Extension)

const schema = Joi.array().items({
    idx: Joi.number().integer()
}).continuous('idx', 1)
```

# Coverage

```
8 tests complete
Test duration: 60 ms
Assertions count: 22 (verbosity: 2.75)
No global variable leaks detected
Coverage: 98.92% (1/93)
lib/index.js missing coverage on line(s): 37
Code coverage below threshold: 98.92 < 100
```

# API
See the [API Reference](https://github.com/buianhthang/joi-array-extensions/blob/master/API.md).
