/**
 * Created by Benjamin on 06/08/2016.
 */
var fs = require('fs');
var path = require('path');
configFile = path.join(__dirname, '../config.json');

module.exports = {
    getFullConfig: getFullConfig
};

function getFullConfig() {
    return JSON.parse(fs.readFileSync(configFile, 'utf8'));
}