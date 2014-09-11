exports.setupJobs = function() {
	var sampleJob = require('./jobs/sample-job.js');

	// Setup agenda
	var Agenda = require('agenda');
	var agenda = new Agenda({db: { address: 'localhost:27017/myApp'}});

	sampleJob.showMessage(agenda);
	agenda.every('2 seconds', 'show message');

	agenda.start();
}