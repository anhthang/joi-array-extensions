const Joi = require('joi')
const orderBy = require('lodash.orderby')
const find = require('lodash.find')
const map = require('lodash.map')

module.exports = [
    {
        name: 'array',
        base: Joi.array(),
        language: {
            continuous_from: 'must be start from {{limit}}',
            continuous_broken: 'should be {{expectedValue}}'
        },
        rules: [
            {
                name: 'continuous',
                description(params) {
                    return `${params.comparator} must be an integer and started continuous from ${params.limit}`
                },
                params: Joi.object().keys({
                    comparator: Joi.alternatives().try(
                        Joi.string().required(),
                        Joi.func()
                    ),
                    limit: Joi.alternatives()
                        .try(Joi.number().integer(), Joi.func().ref())
                        .default(0)
                }),
                validate(params, value, state, options) {
                    const { comparator, limit } = params

                    const isRef = Joi.isRef(params.limit)

                    let startFrom
                    if (isRef) {
                        startFrom = limit(
                            state.reference || state.parent,
                            options
                        )

                        if (
                            !(Number.isSafeInteger(startFrom) && startFrom >= 0)
                        ) {
                            return this.createError(
                                'array.ref',
                                { ref: limit.key },
                                state,
                                options
                            )
                        }
                    } else {
                        startFrom = limit
                    }

                    const localState = {
                        key: state.key,
                        path: state.path.concat(comparator),
                        parent: state.parent,
                        reference: state.reference
                    }

                    const records = orderBy(map(value, comparator))

                    if (records[0] !== startFrom) {
                        const context = {
                            comparator,
                            records,
                            limit: startFrom
                        }

                        return this.createError(
                            'array.continuous_from',
                            context,
                            localState,
                            options
                        )
                    }

                    for (let idx = 1; idx < records.length; idx += 1) {
                        const diff = records[idx] - records[idx - 1]

                        if (diff !== 1) {
                            const obj = find(value, i => i.idx === records[idx])
                            const context = {
                                comparator,
                                value: obj,
                                expectedValue: records[idx - 1] + 1,
                                path: state.path.concat(comparator)
                            }

                            return this.createError(
                                'array.continuous_broken',
                                context,
                                localState,
                                options
                            )
                        }
                    }

                    return value
                }
            }
        ]
    }
]
