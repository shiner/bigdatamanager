var ConstantsRouter = require('./constants_router');
var StatisticsCtrl = require("../controller/statisticsCtrl");
var MongoClient = require('mongodb').MongoClient;
var async = require('async');

var s = new StatisticsCtrl();

var argContentStatistics = function(datas){

    if (!datas) datas = {};

    return {
        datas: JSON.stringify(datas),
        test: "test"
    };
};

var statisticsError = function(status, message)
{
    if(!status) status = 1;
    if(!message) message = 'error';

    return{
        status: status,
        message: message
    }
};

module.exports = function (app) {

    app.get('/getdata', function (req, res)
    {
        try {
            var url = 'mongodb://localhost:27017/oim';
            MongoClient.connect(url, function (err, db) {

                if (err) {
                    callback(err);
                    res.json({});
                    return;
                }

                var datas = db.collection('datas');
                var nations = db.collection('nations');
                var regions = db.collection('regions');

                async.parallel(
                    {
                        data: function (callback) {
                            setTimeout(function () {
                                StatisticsCtrl.GetMapData("oim", function (err, data) {
                                    callback(err, data);
                                    //res.json(data);
                                });
                            }, 1);
                        },
                        minmax: function (callback) {
                            setTimeout(function () {

                                datas.aggregate(
                                    {
                                        $group: {
                                            _id: "$name",
                                            date_min: {$min: "$date"},
                                            date_max: {$max: "$date"}
                                        }
                                    },
                                    function (err, data) {
                                        if (err)
                                            callback(err, null);
                                        else {
                                            var ris = data[0];
                                            callback(null, ris);
                                        }
                                    });
                            }, 10); //end timeout
                        },
                        tags: function (callback) {
                            setTimeout(function () {

                                datas.distinct("tag",
                                    function (err, data) {
                                        if (err)
                                            callback(err, null);
                                        else
                                            callback(null, data);
                                    });
                            },10); //end timeout
                        },
                        otherTag: function (callback) {
                            setTimeout(function () {
                                var options = {
                                    "limit": 1
                                };

                                datas.find({tag:{$exists: false}})
                                    .limit(1)
                                    .count( function (err, data){
                                    if (err)
                                        callback(err, null);
                                    else
                                        callback(null, data);
                                });
                            },10); //end timeout
                        },
                        nations: function (callback) {
                            setTimeout(function () {
                                regions.distinct( "properties.NAME_0" ,
                                    function (err, data) {

                                        data.sort();

                                        if (err)
                                            callback(err, null);
                                        else
                                            callback(null, data);
                                    });

                            }, 10); //end timeout
                        }
                    },                        

                    function (err, results) {
                        // results is now equals to: {one: 1, two: 2}
                        var obj = {
                            dateMin: results.minmax.date_min,
                            dateMax: results.minmax.date_max,
                            tags: results.tags,
                            otherTag: results.otherTag == 1,
                            nations: results.nations,
                            data: results.data
                        };
                        db.close();
                        res.json(obj);
                    }
                );

            });
        } catch (e) {
            console.error(e);
            console.error(e.stack);
        }
    });

    app.get('/showmap', function (req, res)
    {
        var arg = ConstantsRouter.argIndex(req, ConstantsRouter.PAGE.STAT_MAP);

        if ( req.session.projectName != null )
        {
            arg.content = argContentStatistics(data);
            res.render('../views/pages/index.ejs', arg );
        }
        else
        {
            console.error("PAGE: showmap: nessun progetto selezionato");

            arg.content =   argContentStatistics();
            arg.error =     statisticsError(1, "No project selected");

            res.render('../views/pages/index.ejs', arg );
        }
    });

    app.get('/showregionsbar', function (req, res)
    {
        var arg = ConstantsRouter.argIndex(req, PAGE.STAT_REGIONS_BAR);
        res.render('../views/pages/index.ejs', arg );
    });

    app.get('/showregionsradar', function (req, res)
    {
        var arg = ConstantsRouter.argIndex(req, PAGE.STAT_REGIONS_RADAR);
        res.render('../views/pages/index.ejs', arg );
    });

    app.get('/showtimeline', function (req, res)
    {
        var arg = ConstantsRouter.argIndex(req,PAGE.STAT_TIMELINE);
        res.render('../views/pages/index.ejs', arg );
    });

    app.get('/showtag', function (req, res)
    {
        var arg = ConstantsRouter.argIndex(req, PAGE.STAT_TAG);
        res.render('../views/pages/index.ejs', arg );
    });

};
