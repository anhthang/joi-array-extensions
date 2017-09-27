# joi-array-extensions
Joi extensions for extra array rules.

[![NPM](https://nodei.co/npm/joi-array-extensions.png)](https://nodei.co/npm/joi-array-extensions/)

[![npm version](https://badge.fury.io/js/joi-array-extensions.svg)](https://badge.fury.io/js/joi-array-extensions)
[![Build Status](https://travis-ci.org/buianhthang/joi-array-extensions.svg?branch=master)](https://travis-ci.org/buianhthang/joi-array-extensions)
[![Build status](https://ci.appveyor.com/api/projects/status/6942dw1ikdg729y2/branch/master?svg=true)](https://ci.appveyor.com/project/buianhthang/joi-array-extensions/branch/master)
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
9 tests complete
Test duration: 59 ms
Assertions count: 25 (verbosity: 2.78)
No global variable leaks detected
Coverage: 100.00%
Linting results: No issues
```

# API
See the [API Reference](https://github.com/buianhthang/joi-array-extensions/blob/master/API.md).
