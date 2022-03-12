import EndpointTypeParser from "../tech/endpoint/EndpointTypeParser"

const path1  = "id"
const query1 = {
  name: {
    type: "string",
    required: true
  }
}
console.log("Case 1: ", EndpointTypeParser.parse(path1, query1))


const path2  = "id"
const query2 = {
  name: {
    type: "string",
    required: false
  }
}
console.log("Case 2: ", EndpointTypeParser.parse(path2, query2))


const path3  = "id"
const query3 = null
console.log("Case 3: ", EndpointTypeParser.parse(path3, query3))


const path4  = null
const query4 = {
  name: {
    type: "string",
    required: true
  }
}
console.log("Case 4: ", EndpointTypeParser.parse(path4, query4))


const path5  = null
const query5 = {
  name: {
    type: "string",
    required: false
  }
}
console.log("Case 2: ", EndpointTypeParser.parse(path5, query5))


const path6  = null
const query6 = null
console.log("Case 3: ", EndpointTypeParser.parse(path6, query6))
