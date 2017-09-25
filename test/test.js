const Lab = require('lab')
const Helper = require('./helper')
const BaseJoi = require('joi')
const Extension = require('../')

const Joi = BaseJoi.extend(Extension)

const lab = Lab.script()

const { describe, it, expect } = lab

const correct = [
    {
        idx: 1
    },
    {
        idx: 2
    },
    {
        idx: 3
    }
]

const incorrect = [
    {
        idx: 1
    },
    {
        idx: 4
    },
    {
        idx: 3
    }
]

const sample = {
    arr: [
        {
            obj: {
                idx: 1
            }
        },
        {
            obj: {
                idx: 2
            }
        },
        {
            obj: {
                idx: 3
            }
        }
    ]
}

describe('array', () => {
    describe('continuous()', () => {
        it('fails with bad formats', done => {
            expect(() => {
                Joi.array()
                    .items({
                        idx: Joi.number().integer()
                    })
                    .continuous({}, 1)
            }).to.throw(/must be a string/)

            expect(() => {
                Joi.array()
                    .items({
                        idx: Joi.number().integer()
                    })
                    .continuous('', 1)
            }).to.throw(/is not allowed to be empty/)

            expect(() => {
                Joi.array()
                    .items({
                        idx: Joi.number().integer()
                    })
                    .continuous('idx', 'a')
            }).to.throw(/must be a number/)

            expect(() => {
                Joi.array()
                    .items({
                        idx: Joi.number().integer()
                    })
                    .continuous('idx', 1.2)
            }).to.throw(/must be an integer/)

            done()
        })

        it('validates without limit', done => {
            const schema = Joi.array()
                .items({
                    idx: Joi.number().integer()
                })
                .continuous('idx')

            Helper.validate(
                schema,
                [
                    // [correct, false, null, '"value" must be start from 0'],
                    [incorrect, false, null, '"value" must be start from 0']
                ],
                done
            )
        })

        it('validates not start from limit', done => {
            const schema = Joi.array()
                .items({
                    idx: Joi.number().integer()
                })
                .continuous('idx', 2)

            Helper.validate(
                schema,
                [
                    // [correct, false, null, '"value" must be start from 2'],
                    [incorrect, false, null, '"value" must be start from 2']
                ],
                done
            )
        })

        it('validates start corretly but noncontinuous', done => {
            const schema = Joi.array()
                .items({
                    idx: Joi.number().integer()
                })
                .continuous('idx', 1)

            Helper.validate(
                schema,
                [
                    [correct, true],
                    [incorrect, false, null, '"value" should be 2']
                ],
                done
            )
        })

        it('validates with limit is a reference', done => {
            const schema = Joi.object().keys({
                ref: Joi.number().integer(),
                arr: Joi.array()
                    .items({
                        obj: Joi.object().keys({
                            idx: Joi.number().integer()
                        })
                    })
                    .continuous('obj.idx', Joi.ref('ref'))
            })

            Helper.validate(
                schema,
                [
                    [
                        Object.assign(sample, { ref: 2 }),
                        false,
                        null,
                        'child "arr" fails because ["arr" must be start from 2]'
                    ]
                ],
                done
            )
        })

        it('validates with limit is a reference but not a number', done => {
            const schema = Joi.object().keys({
                ref: Joi.string().required(),
                arr: Joi.array()
                    .items({
                        obj: Joi.object().keys({
                            idx: Joi.number().integer()
                        })
                    })
                    .continuous('obj.idx', Joi.ref('ref'))
            })

            Helper.validate(
                schema,
                [
                    [
                        Object.assign(sample, { ref: 'a' }),
                        false,
                        null,
                        'child "arr" fails because ["arr" references "ref" which is not a positive integer]'
                    ]
                ],
                done
            )
        })

        it('validates all correct', done => {
            const schema = Joi.array()
                .items({
                    idx: Joi.number().integer()
                })
                .continuous('idx', 1)

            Helper.validate(schema, [[correct, true]], done)
        })

        it('should be correctly described', done => {
            const schema = Joi.array()
                .items({
                    idx: Joi.number().integer()
                })
                .continuous('idx', 2)

            expect(schema.describe()).to.equal({
                type: 'array',
                flags: {
                    sparse: false
                },
                options: {
                    language: {
                        array: {
                            continuous_from: 'must be start from {{limit}}',
                            continuous_broken: 'should be {{expectedValue}}'
                        }
                    }
                },
                rules: [
                    {
                        name: 'continuous',
                        arg: {
                            comparator: 'idx',
                            limit: 2
                        },
                        description:
                            'idx must be an integer and started continuous from 2'
                    }
                ],
                items: [
                    {
                        type: 'object',
                        children: {
                            idx: {
                                type: 'number',
                                invalids: [Infinity, -Infinity],
                                rules: [
                                    {
                                        name: 'integer'
                                    }
                                ]
                            }
                        }
                    }
                ]
            })
            done()
        })
    })
})

exports.lab = lab
