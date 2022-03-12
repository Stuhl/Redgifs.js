import FetchTypesEnum from "./FetchTypesEnum"

import PathParameter  from "../path-parameter/PathParameter"
import QueryParameter from "../query-parameter/QueryParameter"

class Endpoint {
  constructor(config) {
    this._assertConfig(config)

    this.endpoint           = this._buildEndpoint(config)
    this.fetchType          = config.fetchType
    this.pathParameter      = new PathParameter(config.pathParameter)
    this.queryParameter     = new QueryParameter(config.queryParameter)


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

  _buildEndpoint(config) {
    return `${config.baseURL}${config.endpoint}`
  }

  _checkParameters(parameters) {
    this.queryParamter.checkParameters(parameters.query)
    this.pathParmaeter.checkParameters(parmaeters.path)
  }

  _hasOptionalParameters() {
    this._hasOptionalQueryParameters()
  }

  _hasOptionalQueryParameters() {
    console.log(this.queryParameter)
    return this.queryParameter.hasOptionalParameters()
  }

  _assertConfig(config) {
    this._assertFetchType(config)
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
