import Endpoint from "./tech/endpoint/Endpoint"

class Redgifs {
  static BASE_URL = "https://api.redgifs.com"

  static tags = {
    all: new Endpoint({
      baseURL   : Redgifs.BASE_URL,
      endpoint  : "/v1/tags",
      fetchType : "GET"
    }).generate(),

    populated: new Endpoint({
      baseURL   : Redgifs.BASE_URL,
      endpoint  : "/v1/featured/categories/populated",
      fetchType : "GET"
    }).generate()
  }

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
    }).generate(),
    get  : new Endpoint({
      baseURL    : Redgifs.BASE_URL,
      endpoint   : "/v2/gifs",
      fetchType  : "GET",
      parameters : {
        id: {
          type     : "string",
          required : true
        }
      }
    }).generate()
  }
}

const test = new Endpoint({
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
})

// console.log(test.getEndpoint())


const promise = Redgifs.gifs.get()

promise
.then(response => response.json())
.then(data => console.log(data))



// console.log(Redgifs)


export default Redgifs
