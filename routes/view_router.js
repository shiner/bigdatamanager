"use strict";

var ConstantsRouter = require('./constants_router');
var Project = require("../model/Project");
var Data = require("../model/Data");
var async = require('async');
var requestJson = require('request-json');
var urlencode = require('urlencode');

module.exports = function (router) {

    /// DB
    router.get('/db/nations', function (req, res)
    {
        var arg = ConstantsRouter.argIndex(req, ConstantsRouter.PAGE.DB_NATIONS);
        res.render('../views/pages/index.ejs', arg);
    });

    router.get('/db/users', function (req, res)
    {
        var arg = ConstantsRouter.argIndex(req, ConstantsRouter.PAGE.DB_USERS);
        res.render('../views/pages/index.ejs', arg);
    });

};
