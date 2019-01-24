var octo = require('@octopusdeploy/octopackjs');

octo.push('./bin/Sample.Web.3.2.1.tar.gz', {
        host: 'http://10.0.1.102:9999/', 
        apikey: 'API-54KQSIPUQABY8WZS4TCKU6Q',
        replace: true
    }, function(err, result) {
     if(!err) {
        console.log("Package Pushed:" + body.Title + " v"+ body.Version +" (" + fileSizeString(body.PackageSizeBytes) +"nytes)"); 
     }
});
