import QueryValidator from "./validator"

class QueryParameter {
  constructor(queryParameters) {
    this.queryParameters = queryParameters
    this.validator       = new QueryValidator(queryParameters)
  }

  getQuery() {
    return this._buildQuery(this.queryParameters)
  }

  checkParameters(queryParameters) {
    this.validator.checkParameters(queryParameters)
  }

  hasOptionalParameter() {
    this.validator.hasOptionalParameters()
  }

  _buildQuery(parameters) {
    let query = "?"

    for (let key in parameters) {
      const value = parameters[key]
      query += key + "=" + value + "&"
    }

    return query.slice(0, -1)
  }
}

export default QueryParameter
