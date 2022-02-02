class ParameterValidator {
  constructor(parameters) {
    this.parameters = parameters
  }

  checkParameters(parameters) {
    this._checkMissingParameters(parameters)
    this._checkParameterTypes(parameters)
  }

  hasOptionalParameters() {
    const neededKeys = []

    for (let key in this.parameters) {
      const value = this.parameters[key]
      if (value.required) {
        neededKeys.push(key)
      }
    }

    return neededKeys.length === 0
  }

  _checkMissingParameters(parameters) {
    const validationKeys   = Object.keys(this.parameters)
    const requiredKeys     = validationKeys.filter(key => {
      const assertionValue = this.parameters[key]
      return assertionValue.required
    })
    const passedKeys       = Object.keys(parameters)

    const missingKeys = requiredKeys.filter(neededKey => {
      const index = passedKeys.indexOf(neededKey)
      return index === -1
    })

    if (missingKeys.length > 0) {
      throw new Error(`ParameterValidator::checkParameters(): There are missing properties. The missing properties are: [${missingKeys.toString().replace(/,/ig, ", ")}]`)
    }
  }

  _checkParameterTypes(parameters) {
    for (let key in this.parameters) {
      const assertionValue = this.parameters[key]
      const realValue      = parameters[key]
      const assertionType  = assertionValue.type

      if (typeof realValue !== assertionType && typeof realValue === undefined) {
        throw new Error(`ParameterValidator::checkParameters(): False type for parameter '${key}'. Current type: <${typeof realValue}>. Has to be of type <${assertionType}>.`)
      }
    }
  }
}

export default ParameterValidator
