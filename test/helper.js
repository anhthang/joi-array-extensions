const { expect } = require('lab')
const Joi = require('joi')

// Declare internals

const internals = {}

function validateOptions(schema, config, options, callback) {
    try {
        const compiled = Joi.compile(schema)
        for (let i = 0; i < config.length; i += 1) {
            const item = config[i]
            const input = item[0]
            const shouldValidate = item[1]
            const validationOptions = item[2]
            const expectedValueOrError = item[3]

            if (!shouldValidate) {
                expect(
                    expectedValueOrError,
                    'Failing tests messages must be tested'
                ).to.exist()
            }
            const result = Joi.validate(
                input,
                compiled,
                validationOptions || options
            )

            const { error, value } = result

            if (error !== null && shouldValidate) {
                // console.log(error)
            }

            if (error === null && !shouldValidate) {
                // console.log(input)
            }

            expect(error === null).to.equal(shouldValidate)

            if (item.length >= 4) {
                if (shouldValidate) {
                    expect(value).to.equal(expectedValueOrError)
                } else if (expectedValueOrError instanceof RegExp) {
                    expect(error.message).to.match(expectedValueOrError)
                } else {
                    expect(error.message).to.equal(expectedValueOrError)
                }
            }
        }
    } catch (err) {
        // console.error(err.stack)
        // Reframe the error location, we don't care about the helper
        err.at = internals.thrownAt()
        throw err
    }

    if (callback) {
        callback()
    }
}

function validate(schema, config, callback) {
    return validateOptions(schema, config, null, callback)
}

// Imported from Code

internals.thrownAt = function thrownAt() {
    const error = new Error()
    const frame = error.stack
        .replace(error.toString(), '')
        .split('\n')
        .slice(1)
        .filter(line => line.indexOf(__filename) === -1)[0]
    const at = frame.match(/^\s*at \(?(.+):(\d+):(\d+)\)?$/)
    return {
        filename: at[1],
        line: at[2],
        column: at[3]
    }
}

module.exports = { validate, validateOptions }
