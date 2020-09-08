const path = require('path');

module.exports = {
    nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks'
    },
    ua: {
        enable: true,
        path: path.join(__dirname, '../lib/plugin/egg-ua'),
    }
}