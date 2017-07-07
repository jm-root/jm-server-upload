var express = require('express');
var multer = require('multer');

module.exports = function (opts) {
    opts || (opts = {});
    if(!opts.dest && !opts.storage) {
        opts.dest = '/uploads/';
    }
    var router = express.Router();
    var upload = multer(opts);
    var prefix = opts.prefix || '/';
    var filter = upload.any();
    var fields = opts.fields;
    if (fields && Object.keys(fields).length) {
        var v = [];
        for(var name in fields) {
            v.push({
                name: name,
                maxCount: fields[name],
            })
        }
        filter = upload.fields(v);
    }
    router.use(prefix, filter);

    var self = this;
    this.on('open', function () {
        self.servers.http.middle || (self.servers.http.middle = express.Router());
        self.servers.http.middle.use(router);
    });
    return router;
};
