class EndpointTypeParser {
  static parse(path, query) {
    let parsedValue = ""

    if (path && !EndpointTypeParser._queryIsOnlyOptional(query)) {
      parsedValue = "PathQueryRequired"
    }

    if (path && EndpointTypeParser._queryIsOnlyOptional(query)) {
      parsedValue = "PathQueryOptional"
    }

    if (path && !query) {
      parsedValue = "PathNoQuery"
    }

    if (!path && !EndpointTypeParser._queryIsOnlyOptional(query)) {
      parsedValue = "NoPathQueryRequired"
    }

    if (!path && EndpointTypeParser._queryIsOnlyOptional(query)) {
      parsedValue = "NoPathQueryOptional"
    }

    if (!path && !query) {
      parsedValue = "NoPathNoQuery"
    }

    return parsedValue
  }

  static _queryIsOnlyOptional(query) {
    let isOnlyOptional = true

    for (let key in query) {
      const queryParameter = query[key]
      if (queryParameter.required) {
        isOnlyOptional = false
      }
    }

    return isOnlyOptional
  }
}

export default EndpointTypeParser
