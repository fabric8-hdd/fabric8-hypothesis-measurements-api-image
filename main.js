//  OpenShift sample Node application
var express = require("express"),
	app     = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var port = process.env.APP_PORT || 9090
var routes = require("./node_modules/measurements-api/src/api/routes.js")

routes(app)

//Setting up server
var server = app.listen(port, function () {
	var port = server.address().port
	console.log("App now running on port", port)
})

module.exports = server