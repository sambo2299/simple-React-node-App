const { google } = require('googleapis');
const ua = require('universal-analytics');

// const key = require('./googleapiAuth.json');
// const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
// const jwt = new google.auth.JWT(
//     key.client_email,
//     null,
//     key.private_key,
//     scopes
// );
// const view_id = '181812403';
const visitor = ua('UA-125947118-1', { http: true });

/*
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-125947118-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-125947118-1');
</script>
*/

module.exports.sendEvent = options => {
    return (req, res, next) => {    
        var params = {
            ec: options.ec,
            ea: options.ea,
            el: options.el,
            ev: 0,
            dp: req.url
          }      
        visitor.event(params, e => {
            console.log(e);
            next();
        });    
    }
}  
module.exports.sendPage = (req, res, next) => {
    visitor.pageview(req.url, e => { console.log(e)
        if(e) {
            console.log(e);
        }
        next();
    });        
}

// process.env.GOOGLE_APPLICATION_CREDENTIALS = './test.json';

// jwt.authorize((e, r) => {
//     e ? '' : console.log('authorized');
// });

/*
google.analytics('v3').data.ga.get({
    auth: jwt,
    ids: 'ga:' + view_id,
    'start-date': '30daysAgo',
    'end-date': 'today',
    metrics: 'ga:pageviews'
    }, (e1, r1) => {
        e1 ? console.log(e1) : console.log('ga authorized');
});
*/