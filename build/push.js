var octo = require('@octopusdeploy/octopackjs');

octo.push('./bin/simple-Mern.1.0.0.tar.gz', {
        host: 'http://10.0.1.102:9999/', 
        apikey: 'API-54KQSIPUQABY8WZS4TCKU6Q',
        replace: true
    }, function(err, result) {
     if(!err) {
        console.log("Package Pushed:"); 
     }
});
