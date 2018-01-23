var server   = require("../main"),
	chai     = require("chai"),
	chaiHTTP = require("chai-http"),
	should   = chai.should()

chai.use(chaiHTTP)

describe("Test manager api", function() {

	describe("POST to /api/v1.0/measurements", () => {
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
				.post("/api/v1.0/measurements")
				.set("Content-Type", "application/json")
				.send(stat)
				.end(function(err, res) {
					res.should.have.status(200)
					done()
				})
		})
	})

	describe("POST to /api/v1.0/measurements", () => {
		it("should return 400", function(done){
			chai.request(server)
				.post("/api/v1.0/measurements")
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
	
	describe("Get to /api/v1.0/readiness", () => {
		it(" should return 200", function(done){
			chai.request(server)
				.get("/api/v1.0/readiness")
				.end(function(err, res) {
					res.should.have.status(200)
					done()
				})
		})
	})

	describe("Get to /api/v1.0/liveness", () => {
		it(" should return 200", function(done){
			chai.request(server)
				.get("/api/v1.0/liveness")
				.end(function(err, res) {
					res.should.have.status(200)
					done()
				})
		})
	})
})

