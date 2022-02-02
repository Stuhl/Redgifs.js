import EndpointGroupsEnum from "./EndpointGroupsEnum"
import VersionEnum        from "./VersionsEnum"
import FetchTypesEnum     from "./FetchTypesEnum"

import ParameterValidator from "../parameter-validation/ParameterValidator"

class Endpoint {
  constructor(config) {
    this._assertConfig(config)

    this.endpoint           = this._buildEndpoint(config)
    this.fetchType          = config.fetchType
    this.parameterValidator = new ParameterValidator(config.parameters)

    return {
      getEndpoint: this.getEndpoint.bind(this),
      generate   : this.generate.bind(this)
    }
  }

  execute(parameters) {
    if (!parameters && this._hasOptionalParameters()) {
      const query = ""

      return fetch(this.endpoint + query, {
        method: this.fetchType
      })

    } else {
      this._checkParameters(parameters)

      const query = this._buildQuery(parameters)
      return fetch(this.endpoint + query, {
        method: this.fetchType
      })
    }
  }

  getEndpoint() {
    return this.endpoint
  }

  generate() {
    return this.execute.bind(this)
  }

  _buildQuery(parameters) {
    let query = "?"

    for (let key in parameters) {
      const value = parameters[key]
      query += key + "=" + value + "&"
    }

    return query.slice(0, -1)
  }

  _buildEndpoint(config) {
    return `${config.baseURL}${config.endpoint}`
  }

  _checkParameters(parameters) {
    this.parameterValidator.checkParameters(parameters)
  }

  _hasOptionalParameters() {
    return this.parameterValidator.hasOptionalParameters()
  }

  _assertConfig(config) {
    // this._assertGroup(config)
    // this._assertVersion(config)
    this._assertFetchType(config)
  }

  _assertGroup(config) {
    if (!config.group) {
      throw new Error("Endpoint::constructor(): Property 'group' is missing.")
    }

    if (typeof config.group !== "string") {
      throw new Error(`Endpoint::constructor(): Value of property 'group' is not a string. Has to be of type <string>. Current type: <${typeof config.group}>`)
    }

    if (!(EndpointGroupsEnum.find(validGroup => validGroup === config.group))) {
      throw new Error(`Endpoint::constructor(): '${config.group}' is not a valid group. Valid groups are: ${this._enumToString(EndpointGroupsEnum)}`)
    }
  }
  _assertVersion(config) {
    if (!config.version) {
      throw new Error("Endpoint::constructor(): Property 'version' is missing.")
    }

    if (typeof config.version !== "number") {
      throw new Error(`Endpoint::constructor(): Value of property 'version' is not a number. Has to be of type <number>. Current type: <${typeof config.version}>`)
    }

    if (!(VersionEnum.find(validVersion => validVersion === config.version))) {
      throw new Error(`Endpoint::constructor(): '${config.version}' is not a valid version. Valid versions are: ${this._enumToString(VersionEnum)}`)
    }
  }
  _assertFetchType(config) {
    if (!config.fetchType) {
      throw new Error("Endpoint::constructor(): Property 'fetchType' is missing.")
    }

    if (typeof config.fetchType !== "string") {
      throw new Error(`Endpoint::constructor(): Value of property 'fetchType' is not a string. Has to be of type <string>. Current type: <${typeof config.fetchType}>`)
    }

    if (!(FetchTypesEnum.find(validFetchType => validFetchType === config.fetchType))) {
      throw new Error(`Endpoint::constructor(): '${config.fetchType}' is not a valid fetch type. Valid fetch types are: ${this._enumToString(FetchTypesEnum)}`)
    }
  }

  _enumToString(enumArray) {
    return `[${enumArray.toString().replace(/,/ig, ", ")}]`
  }
}

export default Endpoint


// https://api.redgifs.com/v2/gifs/search?search_text=&order=trending&type=g&count=80
