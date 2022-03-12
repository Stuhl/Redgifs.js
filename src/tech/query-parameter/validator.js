class QueryValidator {
  constructor(parameters) {
    this.parameters = parameters
  }

  checkParameters(parameters) {
    const params = parameters !== {} ? {} : parameters

    this._checkMissingParameters(params)
    this._checkOptionalParameters(params)
    this._checkParameterTypes(params)
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
    const validationKeys = this._getValidationKeys()
    const requiredKeys   = this._getRequiredKeys(validationKeys)
    const passedKeys     = Object.keys(parameters)
    const missingKeys    = this._getMissingKeys(requiredKeys, passedKeys)

    if (missingKeys.length > 0) {
      throw new Error(`QueryParameter::checkParameters(): There are missing properties. The missing properties are: [${missingKeys.toString().replace(/,/ig, ", ")}]`)
    }
  }

  _checkOptionalParameters(parameters) {
    const validationKeys = this._getValidationKeys()
    const passedKeys     = Object.keys(parameters)
    const optionalKeys   = this._getOptionalKeys(validationKeys)

    const invalidKeys = []
    passedKeys.forEach(key => {
      if (validationKeys.indexOf(key) === -1) {
        invalidKeys.push(key)
      }
    })

    if (invalidKeys.length > 0) {
      throw new Error(`QueryParameter::checkParameters(): There are invalid properties you passed in. The invalid properties are: [${invalidKeys.toString().replace(/,/ig, ", ")}]`)
    }
  }

  _checkParameterTypes(parameters) {
    const passedKeys = Object.keys(parameters)

    passedKeys.forEach(key => {
      const assertionValue = this.parameters[key]
      const realValue      = parameters[key]
      const assertionType  = assertionValue.type

      if (typeof realValue !== assertionType) {
        throw new Error(`QueryParameter::checkParameters(): False type for parameter '${key}'. Current type: <${typeof realValue}>. Has to be of type <${assertionType}>.`)
      }
    })
  }

  _getRequiredKeys(validationKeys) {
    return validationKeys.filter(key => {
      const assertionValue = this.parameters[key]
      return assertionValue.required
    })
  }

  _getValidationKeys() {
    return Object.keys(this.parameters)
  }

  _getMissingKeys(requiredKeys, passedKeys) {
    return requiredKeys.filter(neededKey => {
      const index = passedKeys.indexOf(neededKey)
      return index === -1
    })
  }

  _getOptionalKeys(validationKeys) {
    return validationKeys.filter(key => {
      const assertionValue = this.parameters[key]
      return !assertionValue.required
    })
  }
}

export default QueryValidator
