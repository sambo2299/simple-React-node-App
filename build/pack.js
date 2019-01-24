var octo = require('@octopusdeploy/octopackjs');
octo.pack()    
  .append('./package.json')
  .append('./serveri/*')
  .append('./public/*')
  .append('./lib/*')
  .append('./client/*')
  .toFile('./bin', function (err, data) {
    console.log("Package Saved: "+ data.name);
  });
