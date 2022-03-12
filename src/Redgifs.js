import Endpoint from "./tech/endpoint/Endpoint"

class Redgifs {
  static BASE_URL = "https://api.redgifs.com"

  // static tags = {
  //   all: new Endpoint({
  //     baseURL   : Redgifs.BASE_URL,
  //     endpoint  : "/v1/tags",
  //     fetchType : "GET"
  //   }).generate(),
  //
  //   populated: new Endpoint({
  //     baseURL   : Redgifs.BASE_URL,
  //     endpoint  : "/v1/featured/categories/populated",
  //     fetchType : "GET"
  //   }).generate()
  // }

  static gifs  = {
    search: new Endpoint({
      baseURL   : Redgifs.BASE_URL,
      endpoint  : "/v2/gifs/search",
      fetchType : "GET",
      parameters: {
        search_text: {
          type    : "string",
          required: false
        },
        order: {
          type    : "string",
          required: false
        },
        count: {
          type    : "number",
          required: false
        }
      }
    }).generate()
    get  : new Endpoint({
      baseURL    : Redgifs.BASE_URL,
      endpoint   : "/v2/gifs",
      fetchType  : "GET",
      endpointParameter: {
        id: {
          type     : "string",
          required : true
        }
      }
    }).generate()
  }
}

// const promise = Redgifs.gifs.get({
//   id: "example"
// })
//

const promise = Redgifs.gifs.search()

promise
.then(response => response.json())
.then(data => console.log(data))


export default Redgifs
