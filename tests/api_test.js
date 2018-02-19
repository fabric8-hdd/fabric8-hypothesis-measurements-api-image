process.env.ROUTE_PREFIX="/api/v1.0"
process.env.ROUTE_PATH="/measurements"

var server   = require("../main"),
	chai     = require("chai"),
	chaiHTTP = require("chai-http"),
	should   = chai.should(),
	route_path = process.env.ROUTE_PATH || "/measurements",
	route_prefix = process.env.ROUTE_PREFIX

chai.use(chaiHTTP)

describe("Test manager api", function() {

	describe("POST /measurements", () => {
		let stat = {
			scout_id : "a4e1b0cf-2a08-4297-83f3-4db896d7e0fb",
			data : [{date:"1/1/2", value:1234}],
			source: {
				date: "2018-02-12 12:05:45:999 pm"
			},
			descriptor: {
				id: 1234,
				unit_of_measure: "seconds"
			},
			dimensions: {
				node: 3,
				pod: 1234,
				container: 223434
			}
		}

		it(" should return 200", function(done){
			chai.request(server)
				.post(route_path + route_prefix + "/measurements")
				.set("Content-Type", "application/json")
				.send(stat)
				.end(function(err, res) {
					res.should.have.status(200)
					done()
				})
		})
	})

	describe("POST /measurements", () => {
		it(" should return 400", function(done){
			chai.request(server)
				.post(route_path + route_prefix + "/measurements")
				.set("Content-Type", "application/json")
				.send({})
				.end(function(err, res) {
					res.should.have.status(400)
					done()
				})
		})
	})

})

describe("Test readiness and liveness api",function(){
	
	describe("GET /readiness", () => {
		it(" should return 200", function(done){
			chai.request(server)
				.get(route_path + route_prefix + "/readiness")
				.end(function(err, res) {
					res.should.have.status(200)
					done()
				})
		})
	})

	describe("GET /liveness", () => {
		it(" should return 200", function(done){
			chai.request(server)
				.get(route_path + route_prefix + "/liveness")
				.end(function(err, res) {
					res.should.have.status(200)
					done()
				})
		})
	})
})