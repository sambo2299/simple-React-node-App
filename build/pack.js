var octo = require('@octopusdeploy/octopackjs');
octo.pack('targz', { version: process.argv})    
  .append('./package.json')
  .append('./server/**')
  .append('./public/**')
  .append('./lib/**')
  .append('./client/**')  
  .toFile('./bin/', function (err, data) {
    console.log("Package Saved: "+ data.name);
  });

