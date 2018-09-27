
const controller = require('./controller');
// const ua = require('universal-analytics');
// const ga = require('../lib/googleapi-analytics');
// const piwikTracer = require('../lib/express-piwik-tracer.js');
// var tracer = piwikTracer({
// 	siteId		: 4,
// 	piwikUrl	: 'http://localhost:8085/piwik.php',
// 	baseUrl  	: 'http://localhost:4000',
// 	piwikToken	: 's@my0g'
// });

module.exports = (app) => {
	
	// app.use(tracer);
	app.get('/', (req, res) => {
		res.render('index.html');
	});
	app.get('/sec', (req, res) => {
		res.render('one.html');
	})
	app.get('/thr', (req, res) => {
		res.render('two.html');
	});
	app.use('/api', controller);
}
