'use strict'

const Joi = require('joi')
const orderBy = require('lodash.orderby')
const find = require('lodash.find')
const map = require('lodash.map')
const assert = require('assert')

module.exports = [
    {
        name: 'array',
        base: Joi.array(),
        language: {
            continuous_from: 'must be start from {{startIndex}}',
            continuous_broken: 'should be {{expectedValue}}'
        },
        coerce(value, state, options) {
            const { comparator, startIndex } = this._flags

            assert.ok(
                comparator === undefined ||
                    typeof comparator === 'function' ||
                    typeof comparator === 'string',
                'comparator must be a function or a string'
            )

            if (comparator) {
                const localState = {
                    key: state.key,
                    path: state.path.concat(comparator),
                    parent: state.parent,
                    reference: state.reference
                }

                const records = orderBy(map(value, comparator))

                if (records[0] !== startIndex) {
                    const context = { comparator, records, startIndex }

                    return this.createError(
                        'array.continuous_from',
                        context,
                        localState,
                        options
                    )
                }

                for (let idx = 1; idx < records.length; idx++) {
                    const diff = records[idx] - records[idx - 1]

                    if (diff !== 1) {
                        const obj = find(value, i => i.idx === records[idx])
                        const context = {
                            comparator,
                            value: obj,
                            expectedValue: records[idx - 1] + 1
                        }

                        return this.createError(
                            'array.continuous_broken',
                            context,
                            localState,
                            options
                        )
                    }
                }
            }

            return value
        },
        rules: [
            {
                name: 'continuous',
                description(params) {
                    return `${params.comparator} must be an integer and started continuous from ${params.startIndex}`;
                },
                params: {
                    comparator: Joi.any(),
                    startIndex: Joi.number().integer().optional()
                },
                setup(params) {
                    this._flags.comparator = params.comparator
                    this._flags.startIndex = params.startIndex || 0
                },
                validate(params, value, state, options) {
                    // No-op just to enable description
                    return value
                }
            }
        ]
    }
]
