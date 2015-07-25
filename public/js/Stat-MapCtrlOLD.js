//"use strict";
//
//var ShowmapCtrl = function(){};
//
//// Button controller
//var BtnCtrl = function() {
//
//    this.$imgFilterButton = $("#img-filter");
//
//    this.removeWaitFromAllCheck = function()
//    {
//        $(".spinner-wait").addClass("hidden");
//    };
//
//    this.enableAllCheck = function () {
//        $(".check-filter").removeAttr("disabled");
//    };
//
//    this.enableFilterButton = function(){
//        ShowmapCtrl.$cmdFilter.removeAttr("disabled");
//    };
//
//    this.disableFilterButton = function(){
//        ShowmapCtrl.$cmdFilter.prop("disabled", true);
//    };
//
//    this.addImgWaitFilterButton = function(){
//
//        //this.$imgFilterButton.removeClass("hidden");
//        this.$imgFilterButton.removeClass("glyphicon glyphicon-filter");
//        this.$imgFilterButton.addClass("fa fa-spinner fa-spin");
//
//    };
//
//    this.removeImgWaitFilterButton = function()
//    {
//        this.$imgFilterButton.addClass("glyphicon glyphicon-filter");
//        this.$imgFilterButton.removeClass("fa fa-spinner fa-spin");
//    }
//
//};
//
////Form Controller
//var FormCtrl = function(){
//
//    this.$radioData = $("#radioData");
//    this.$radioUser = $("#radioVocabulary");
//    this.$contData = $("#countData");
//
//    $('input[name="typeVoc"]').change( function(){
//        formCtrl.setComboTerms();
//    });
//    this.enableForm = function(){
//        console.log("CALL: enable form");
//        btnCtrl.removeWaitFromAllCheck();
//        btnCtrl.enableFilterButton();
//        btnCtrl.enableAllCheck();
//    };
//    this.setComboTerms = function(){
//        DomUtil.clearSelectpicker(ShowmapCtrl.$cmbSelectTerms);
//        var terms = [];
//        var count = [];
//        var key = this.$radioData.is(":checked") ? "syncDataTags" : "syncUserTags";
//        var syncxxxxTags = ShowmapCtrl.terms[key];
//        var tags = _.keys(syncxxxxTags);
//        _.each(tags, function(tag){
//            _.each(ShowmapCtrl.terms[key][tag], function(obj){
//                terms.push( obj.token );
//                count.push( obj.count );
//            });
//            DomUtil.addOptionGroup(ShowmapCtrl.$cmbSelectTerms, tag, terms, count );
//        });
//        ShowmapCtrl.$cmbSelectTerms.selectpicker('refresh');
//    };
//    this.setCountData = function(){
//        this.$contData.text( ShowmapCtrl.filteredDatas.length );
//    }
//};
//
////HeatMapController
//var HeatmapCtrl = function()
//{
//
//}
//var heatmapCtrl = new HeatmapCtrl();
//
//var btnCtrl = null;
//var formCtrl = null;
//
//var cfg =
//{
//    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
//    // if scaleRadius is false it will be the constant radius used in pixels
//    "radius": 100,
//    "maxOpacity": 0.6,
//    // scales the radius based on map zoom
//    "scaleRadius": false,
//    // if set to false the heatmap uses the global maximum for colorization
//    // if activated: uses the data maximum within the current map boundaries
//    //   (there will always be a red spot with useLocalExtremas true)
//    "useLocalExtrema": false,
//    // which field name in your data represents the latitude - default "lat"
//    latField: 'latitude',
//    // which field name in your data represents the longitude - default "lng"
//    lngField: 'longitude',
//    // which field name in your data represents the data value - default "value"
//    valueField: 'count'
//};
//
////map
//ShowmapCtrl.mainMap = null;
//
////layer
//ShowmapCtrl.layerHeatmap = null;
//ShowmapCtrl.layerMakerCluster = null;
//ShowmapCtrl.layerBoundaries = null;
//ShowmapCtrl.layerLegend = null;
//
////controls
//ShowmapCtrl.IDmapContainer = '';
//ShowmapCtrl.$cmbSelectTags = null;
//ShowmapCtrl.$cmbSelectNations = null;
//ShowmapCtrl.$cmbSelectUsers = null;
//ShowmapCtrl.$cmbSelectTerms = null;
//ShowmapCtrl.$sliderTimer = null;
//
//ShowmapCtrl.$cmdFilter = null;
//ShowmapCtrl.$cmdRestore = null;
//
//ShowmapCtrl.legendControl = null;
//ShowmapCtrl.chkMarkercluster = null;
//ShowmapCtrl.chkHeatmap = null;
//ShowmapCtrl.chkBoudaries = null;
//ShowmapCtrl.activeLayerBoundaries = null;
//ShowmapCtrl.showInfoActiveLayer = false;
//
////data variable
//ShowmapCtrl.stat = null;
//ShowmapCtrl.filteredStat = null;
//
//ShowmapCtrl.regions = null;
//ShowmapCtrl.filteredRegions = null;
//
//ShowmapCtrl.datas = null;
//ShowmapCtrl.filteredDatas = null;
//
//ShowmapCtrl.users = null;
//ShowmapCtrl.terms = null;
//
//ShowmapCtrl.contNonGeo = 0;
//
//ShowmapCtrl.init = function()
//{
//    btnCtrl = new BtnCtrl();
//    formCtrl = new FormCtrl();
//};
//
//ShowmapCtrl.initMap = function(mapContainer)
//{
//    ShowmapCtrl.IDmapContainer = mapContainer;
//
//    function createMap()
//    {
//        var lat = 42.22;
//        var long = 12.986;
//
//        // set up the map
//        ShowmapCtrl.mainMap = new L.Map( ShowmapCtrl.IDmapContainer);
//
//        // create the tile layer with correct attribution
//        var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//        var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
//
//        var osm = new L.TileLayer( osmUrl, {
//            minZoom: 2,
//            maxZoom: 13,
//            attribution: osmAttrib
//        });
//
//        // start the map in Italy
//        ShowmapCtrl.mainMap.setView( new L.LatLng(lat, long), 6 );
//        ShowmapCtrl.mainMap.addLayer(osm);
//    };
//
//    function resizeMap()
//    {
//        var deltaHeight = 200;
//        //var deltaWidth = -100;
//
//        var map = $('#' + ShowmapCtrl.IDmapContainer);
//        //var width = $(window).width();
//        var height = $(window).height();
//
//        map.css("height", $(window).height() - deltaHeight);
//        map.css("margin-top",50);
//    }
//
//    createMap();
//    resizeMap();
//
//    $(window).on("resize", function(){
//        resizeMap();
//    });
//
//    $(document).ready(function() {
//        ShowmapCtrl.mainMap.invalidateSize();
//    });
//
//};
//
//ShowmapCtrl.initGui = function()
//{
//    ShowmapCtrl.$cmbSelectTags =    $('#cmbTags');
//    ShowmapCtrl.$cmbSelectNations = $('#cmbNations');
//    ShowmapCtrl.$cmbSelectUsers =   $('#cmbUsers');
//    ShowmapCtrl.$cmbSelectTerms =   $('#cmbTerms');
//
//    ShowmapCtrl.$cmdFilter =        $('#cmdFilter');
//    ShowmapCtrl.$cmdRestore =       $('#cmdRestore');
//
//    ShowmapCtrl.chkMarkercluster = $('#chk_markerCluster')[0];
//    ShowmapCtrl.chkHeatmap = $('#chk_heatmap')[0];
//    ShowmapCtrl.chkBoudaries = $('#chk_boundaries')[0];
//
//    ShowmapCtrl.$sliderTimer = $("#slider");
//
//    ShowmapCtrl.$sliderTimer.dateRangeSlider(
//        {
//            enabled : true,
//            bounds: {
//                min: new Date(1950, 1, 1 ) ,
//                max: new Date(2050, 1, 1 )
//            } ,
//            defaultValues:{
//                min: new Date(1950, 1, 1 ),
//                max: new Date(2050, 1, 1 )
//            }
//        }
//    );
//};
//
///* Viene richiamata al refresh della pagina */
//ShowmapCtrl.getData = function () {
//    console.log("CALL: getData");
//
//    async.parallel({
//
//        data: function(next)
//        {
//            //DataCtrl.getFromUrl(DataCtrl.FIELD.DATA, "?isGeo=1", function(doc){
//            //    ShowmapCtrl.datas = doc;
//            //    ShowmapCtrl.filterData(null, doc, function(result){
//            //        ShowmapCtrl.filteredDatas = result;
//            //        formCtrl.setCountData();
//            //        next(null, doc);
//            //    });
//            //
//            //});
//            next(null, {});
//        },
//
//        stat: function(next)
//        {
//            DataCtrl.getField( function(doc){
//                ShowmapCtrl.stat = doc;
//                ShowmapCtrl.filteredStat = doc;
//                next(null, doc);
//            }, DataCtrl.FIELD.STAT );
//        },
//
//        regions: function (next)
//        {
//            DataCtrl.getField(
//                function(doc)
//                {
//                    ShowmapCtrl.regions = doc;
//                    ShowmapCtrl.filteredRegions = doc;
//                    next(null, doc);
//                },
//                DataCtrl.FIELD.REGIONSJSON
//            );
//        },
//
//        users: function (next)
//        {
//            DataCtrl.getField( function(doc){
//                ShowmapCtrl.users = doc;
//                next(null, doc);
//            }, DataCtrl.FIELD.USERS, 50);
//        },
//
//        wordcount: function (next)
//        {
//            DataCtrl.getField( function(doc)
//            {
//                ShowmapCtrl.terms = doc;
//                next(null, doc);
//            }, DataCtrl.FIELD.WORDCOUNT);
//        }},
//        function(err, results) {
//            ShowmapCtrl.loadForm();
//        }
//    );
//
//};
//
///* Dopo che i dati sono stati scaricati riempio la form */
//ShowmapCtrl.loadForm = function() {
//    console.log("CALL: loadForm");
//
//    var min = new Date( ShowmapCtrl.stat.data.minDate );
//    var max = new Date( ShowmapCtrl.stat.data.maxDate );
//
//    ShowmapCtrl.$sliderTimer.dateRangeSlider( {
//        enabled : true ,
//        bounds:{
//            min: min,
//            max: max
//        },
//        defaultValues:{
//            min: min,
//            max: max
//        }
//    });
//
//    ShowmapCtrl.$sliderTimer.dateRangeSlider("min", min);
//    ShowmapCtrl.$sliderTimer.dateRangeSlider("max", max);
//
//    ShowmapCtrl.$cmbSelectTags.attr("title", "Select Tags");
//    ShowmapCtrl.$cmbSelectNations.attr("title", "Select Nations");
//    ShowmapCtrl.$cmbSelectUsers.attr("title", "Select Users");
//    ShowmapCtrl.$cmbSelectTerms.attr("title", "Select Terms");
//
//    //nations
//    _.each(ShowmapCtrl.stat.data.nations, function(obj){
//        DomUtil.addOptionValue(ShowmapCtrl.$cmbSelectNations, obj.name);
//    });
//
//    //tags
//    _.each(ShowmapCtrl.stat.data.allTags, function(obj){
//        DomUtil.addOptionValue(ShowmapCtrl.$cmbSelectTags, obj);
//    });
//
//    //users - attivo solo gli utenti che hanno tweet geolocalizzati
//    var obj = null;
//    var isDisable = true;
//    for (var i = 0; i < 50 && i < ShowmapCtrl.users.length; i++ ){
//        isDisable = true;
//        obj = ShowmapCtrl.users[i];
//        for(var j = 0; j < obj.counter.length; j++)
//            if(obj.counter[j].isGeo)
//                isDisable = false;
//        DomUtil.addOptionValue(ShowmapCtrl.$cmbSelectUsers, obj.user, obj.sum, isDisable);
//    }
//
//    formCtrl.setComboTerms();
//
//    $('.selectpicker').selectpicker('refresh');
//
//    formCtrl.enableForm();
//
//};
//
//ShowmapCtrl.filterRegions = function(objCond, data, callback) {
//    async.filter( data, function(obj, next){
//        if(objCond)
//            next( objCond.containNation(obj.properties.NAME_0));
//        else
//            next(true);
//    },function(result){
//        callback( result ); }
//    );
//};
//
//ShowmapCtrl.filterData = function(objCond, data, callback) {
//    ShowmapCtrl.contNonGeo = 0;
//    async.filter( data,
//        function(obj, next)
//        {
//            if(!obj["latitude"] || !obj["longitude"] )
//            {
//                ShowmapCtrl.contNonGeo ++;
//                next(false);
//                return;
//            }
//
//            if(objCond)
//            {
//                if( obj.text.indexOf( "Juve" ) > 0 ) {
//                    var test = objCond.containTerm(obj.tag , obj.text);
//                }
//
//                var tmp = objCond.containNation(obj.nation) &&
//                            objCond.containTag(obj.tag) &&
//                            objCond.isInRange(obj.date) &&
//                            objCond.containUser(obj.user) &&
//                            objCond.containTerm(obj.tag , obj.text);
//                next(tmp);
//            }
//
//            else
//                next(true);
//        },
//        function(results)
//        {
//            callback(results);
//        }
//    );
//};
//
//ShowmapCtrl.refreshData = function(callback) {
//    console.log("CALL: refreshData");
//
//    async.parallel([
//        function(next){
//            if ( ShowmapCtrl.chkHeatmap &&
//                ShowmapCtrl.chkHeatmap.checked)
//                setData_Heatmap();
//            next();
//        },
//        function (next)
//        {
//            if ( ShowmapCtrl.chkMarkercluster &&
//                ShowmapCtrl.chkMarkercluster.checked )
//                setData_MarkerCluster();
//            next();
//        },
//        function (next)
//        {
//            if ( ShowmapCtrl.chkBoudaries &&
//                ShowmapCtrl.chkBoudaries.checked )
//                setBoundaries();
//            next();
//        }
//    ], function()
//    {
//        callback();
//    });
//};
//
//
///// CLICK
//
//ShowmapCtrl.cmdFilter_click = function() {
//    console.log("CALL: cmdFilter_click");
//
//    btnCtrl.disableFilterButton();
//    btnCtrl.addImgWaitFilterButton();
//
//    var conditions = new ObjConditions(
//        ShowmapCtrl.$cmbSelectNations,
//        null,
//        ShowmapCtrl.$cmbSelectTags,
//        ShowmapCtrl.$sliderTimer,
//        ShowmapCtrl.$cmbSelectUsers,
//        ShowmapCtrl.$cmbSelectTerms
//    );
//
//    var queryString = conditions.getQueryString();
//
//    DataCtrl.getFromUrl(DataCtrl.FIELD.STAT, queryString, function(docStat){
//        ShowmapCtrl.filteredStat = docStat;
//        async.waterfall([
//            function (next) {
//                ShowmapCtrl.filterData( conditions, ShowmapCtrl.datas , function(result){
//                    ShowmapCtrl.filteredDatas = result;
//                    next();
//                })
//            },
//            function (next) {
//                ShowmapCtrl.filterRegions(conditions, ShowmapCtrl.regions , function(result){
//                    ShowmapCtrl.filteredRegions = result;
//                    next();
//                })
//            },
//            function(next){
//                ShowmapCtrl.refreshData(function(){next();})
//            }
//        ], function () {
//            formCtrl.setCountData();
//            btnCtrl.enableFilterButton();
//            btnCtrl.removeImgWaitFilterButton();
//        });
//    });
//};
//
//ShowmapCtrl.heatmap_click = function() {
//    if ( $("#chk_heatmap")[0].checked )
//        showHeatmap();
//    else
//        hideHeatmap();
//};
//
//ShowmapCtrl.markerCluster_click = function() {
//    if ( $("#chk_markerCluster")[0].checked )
//        showMarkerCluster();
//    else
//        hideMarkerCluster();
//};
//
//ShowmapCtrl.showBoundaries_click = function() {
//    if ( $("#chk_boundaries")[0].checked )
//        setBoundaries();
//    else
//        hideBoundaries();
//};
//
//
//var showHeatmap = function ()
//{
//    console.log("CALL: showHeatmap");
//
//    //visualizzo lo spinner di attesa
//    var spinnerHeatmap = $("#spinner-heatmap");
//    spinnerHeatmap.removeClass("fa fa-spinner fa-spin spinner-datas");
//    spinnerHeatmap.addClass("fa fa-refresh fa-spin");
//    spinnerHeatmap.show();
//
//    if (ShowmapCtrl.layerHeatmap == null)
//    {
//        ShowmapCtrl.layerHeatmap = new HeatmapOverlay(cfg);
//        ShowmapCtrl.mainMap.addLayer( ShowmapCtrl.layerHeatmap );
//    }
//
//    setData_Heatmap();
//
//    //rimuovo lo spinner di attesa
//    spinnerHeatmap.removeClass("fa fa-refresh fa-spin");
//    spinnerHeatmap.addClass("fa fa-spinner fa-spin spinner-datas");
//    spinnerHeatmap.hide();
//};
//
//function showMarkerCluster()
//{
//    console.log("CALL: showMarkerCluster");
//
//    //visualizzo lo spinner di attesa
//    var spinnerCluster = $("#spinner-cluster");
//    spinnerCluster.removeClass("fa fa-spinner fa-spin spinner-datas hidden");
//    spinnerCluster.addClass("fa fa-refresh fa-spin");
//
//    //spinnerCluster.show();
//
//    setTimeout(showMarkerClusterAsync, 100);
//}
//
//function showMarkerClusterAsync() {
//    console.log("CALL: showMarkerClusterAsync");
//
//    if ( ShowmapCtrl.layerMakerCluster == null )
//    {
//        console.log("     creo il MarkerClusterGroup");
//        createNewLayerMarkerCluster();
//    }
//
//    setData_MarkerCluster();
//
//    //rimuovo lo spinner di attesa
//    var spinnerCluster = $("#spinner-cluster");
//    spinnerCluster.removeClass("fa fa-refresh fa-spin");
//    spinnerCluster.addClass("fa fa-spinner fa-spin spinner-datas hidden");
//}
//
//function createNewLayerMarkerCluster() {
//    ShowmapCtrl.layerMakerCluster = new L.markerClusterGroup(
//        {
//            animateAddingMarkers: true,
//            chunkedLoading: true
//        }
//    );
//}
//
//var markerList = [];
//
//function setData_MarkerCluster() {
//    console.log("CALL: setData_MarkerCluster");
//
//    if(!ShowmapCtrl.layerMakerCluster) return;
//
//    ShowmapCtrl.layerMakerCluster.clearLayers();
//
//    createNewLayerMarkerCluster();
//
//    markerList = [];
//
//    async.each( ShowmapCtrl.filteredDatas,
//        function(d, next)
//        {
//            var etichetta = d.tag;
//            var text = d.text;
//            var lat = d.latitude;
//            var lng = d.longitude;
//            var icon = getIcon(etichetta);
//
//            var marker = new L.Marker(
//                new L.LatLng(lat, lng),
//                {
//                    icon: icon,
//                    title: text
//                });
//            marker.bindPopup(text +
//                "<br><b>User: </b>" + d.user +
//                "<br><b>Tag: </b>" + etichetta +
//                "<br><b>Lon: </b>" + lng +
//                "<br><b>Lat: </b>" + lat);
//
//            markerList.push(marker);
//
//            next(null);
//
//        } ,
//
//        function()
//        {
//            ShowmapCtrl.layerMakerCluster.addLayers( markerList );
//            ShowmapCtrl.mainMap.addLayer( ShowmapCtrl.layerMakerCluster );
//            console.log("marker cluster costruito!");
//        }
//    );
//}
//
//function setBoundaries() {
//    console.log("CALL: setBoundaries");
//
//    //visualizzo lo spinner di attesa
//    var spinnerBoundaries = $("#spinner-boundaries");
//    spinnerBoundaries.removeClass("fa fa-spinner fa-spin spinner-regions");
//    spinnerBoundaries.addClass("fa fa-refresh fa-spin");
//    spinnerBoundaries.show();
//
//    if (ShowmapCtrl.layerBoundaries != null)
//        hideBoundaries();
//
//    ShowmapCtrl.layerBoundaries = L.geoJson(
//        ShowmapCtrl.filteredRegions,
//        {
//            style: _style,
//            onEachFeature: _onEachFeature
//        }
//    );
//
//    ShowmapCtrl.layerBoundaries.addTo( ShowmapCtrl.mainMap );
//    ShowmapCtrl.layerBoundaries.bringToFront();
//
//    insertLegend();
//
//    //rimuovo lo spinner di attesa
//    spinnerBoundaries.removeClass("fa fa-refresh fa-spin");
//    spinnerBoundaries.addClass("fa fa-spinner fa-spin spinner-regions");
//    spinnerBoundaries.hide();
//}
//
//function _style(feature) {
//    return {
//        fillColor: _getColor( getAvg(feature) ),
//        fillOpacity: 0.5,
//        weight: 2,
//        opacity: 0.5,
//        color: 'white',
//        dashArray: '3'
//    };
//}
//
//function getAvg(feature) {
//    var nation = feature.properties.NAME_0;
//    var region = feature.properties.NAME_1;
//    var avg = 0;
//    if(ShowmapCtrl.filteredStat.data.nations[nation] != null)
//        avg = ShowmapCtrl.filteredStat.data.nations[nation].regions[region].avg;
//    return avg;
//}
//
//function _getColor(percentage) {
//    return percentage > 0.8 ? '#800026' :
//        percentage > 0.7 ? '#BD0026' :
//            percentage > 0.6 ? '#E31A1C' :
//                percentage > 0.5 ? '#FC4E2A' :
//                    percentage > 0.4 ? '#FD8D3C' :
//                        percentage > 0.3 ? '#FEB24C' :
//                            percentage > 0.2 ? '#FED976' :
//                                '#FFEDA0';
//}
//
//function _onEachFeature(feature, layer) {
//    layer.on
//    (
//        {
//            mouseover: _mouseover_feature,
//            mouseout: _mouseout_feature,
//            click: _click_feature
//        }
//    );
//}
//
//function _mouseover_feature(e) {
//    var layer = e.target;
//    ShowmapCtrl.mainMap.dragging.disable();
//
//    layer.setStyle({
//        weight: 5,
//        color: '#666',
//        dashArray: '',
//        fillOpacity: 0.7
//    });
//
//    if (!L.Browser.ie && !L.Browser.opera) {
//        layer.bringToFront();
//    }
//}
//
//function _mouseout_feature(e) {
//    if ( ShowmapCtrl.activeLayerBoundaries != null &&
//        ShowmapCtrl.showInfoActiveLayer ) return;
//
//    ShowmapCtrl.mainMap.dragging.enable();
//    ShowmapCtrl.layerBoundaries.resetStyle(e.target);
//}
//
//function  _click_feature(e) {
//    console.log("Click!");
//
//    // lock map
//    ShowmapCtrl.activeLayerBoundaries = e.target;
//
//    // chiudo altri popup aperti
//    if ( ShowmapCtrl.showInfoActiveLayer ) {
//        console.log("showInfoActiveLayer NULL!");
//        ShowmapCtrl.mainMap.closePopup();
//        return;
//    }
//
//    var nation = e.target.feature.properties.NAME_0;
//    var region = e.target.feature.properties.NAME_1;
//
//    var eNation = ShowmapCtrl.filteredStat.data.nations[nation].regions[region];
//    var tot_tweet = eNation.count;
//    var counter = eNation.counter;
//
//    var pop = '<div class="popup">' +
//                '<h3 class="title-popup" style="min-width: 100px">' +
//                    region +
//                '</h3>';
//
//    for(var k in counter)
//    {
//        var tag = k.charAt(0).toUpperCase() + k.slice(1) + ': ';
//        pop = pop +
//            '<div class="row-popup">' +
//             '<div class="label-popup-left">' + tag + '</div>' +
//             '<div class="label-popup-right">' + counter[k].count + '</div>' +
//            '</div>';
//    }
//
//    pop += "<hr class='separator'>";
//
//    pop +=
//        '<div class="row-popup">' +
//            '<div class="label-popup-left">Tot:</div>' +
//            '<div class="label-popup-right">' + tot_tweet + '</div>' +
//        '</div>';
//
//    console.log("Popup " + e.target.feature.properties.NAME_1);
//    e.target.bindPopup(pop).openPopup();
//
//    //ShowmapCtrl.mainMap.fitBounds(e.target.getBounds());
//}
//
//var hideHeatmap = function() {
//    console.log("CALL: hideHeatmap");
//    ShowmapCtrl.mainMap.removeLayer( ShowmapCtrl.layerHeatmap );
//};
//
//var hideMarkerCluster = function() {
//    console.log("CALL: hideMarkerCluster");
//    ShowmapCtrl.mainMap.removeLayer( ShowmapCtrl.layerMakerCluster );
//
//    //if ( ShowmapCtrl.layerLegend != null ) {
//    //    ShowmapCtrl.mainMap.removeControl( ShowmapCtrl.layerLegend );
//    //    ShowmapCtrl.layerLegend = null;
//    //}
//
//};
//
//var hideBoundaries = function() {
//    console.log("CALL: hideBoundaries");
//
//    if ( ShowmapCtrl.layerBoundaries != null)
//    {
//        ShowmapCtrl.mainMap.removeLayer( ShowmapCtrl.layerBoundaries );
//        ShowmapCtrl.layerBoundaries = null;
//        removeLegendBoundaries();
//    }
//};
//
//function removeLegendBoundaries() {
//    if( ShowmapCtrl.legendControl != null ) {
//        ShowmapCtrl.mainMap.removeControl( ShowmapCtrl.legendControl );
//        ShowmapCtrl.legendControl = null;
//    }
//}
//
//function insertLegend() {
//
//    console.log("CALL: insertLegend");
//
//    if ( ShowmapCtrl.legendControl == null)
//    {
//        ShowmapCtrl.legendControl = L.control( {position: 'bottomleft'});
//
//        ShowmapCtrl.legendControl.onAdd = function (map)
//        {
//            var div = L.DomUtil.create('div', 'info legend'),
//                grades = [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
//                labels = [],
//                from, to;
//            labels.push('<label style="margin: 0px; margin-bottom: 10px; text-align: center"><b>Percentage of<br>total points</b></label>');
//            for (var i = 0; i < grades.length; i++) {
//                from = grades[i];
//                to = grades[i + 1];
//
//                labels.push(
//                    '<i style="background:' + _getColor(from + 0.01) + '"></i> ' +
//                    from + (to ? '&ndash;' + to : '+'));
//            }
//            div.innerHTML = labels.join('<br>');
//            return div;
//        };
//
//        ShowmapCtrl.legendControl.addTo(ShowmapCtrl.mainMap);
//    }
//}
//
//function setData_Heatmap() {
//
//    console.log("CALL: setData_Heatmap");
//
//    var tmpData = {
//        max: 1,
//        data: ShowmapCtrl.filteredDatas
//    };
//
//    console.log("CALL: SetDataLayerHeatmap data.lenght=" + tmpData.data.length);
//
//    if (ShowmapCtrl.layerHeatmap)
//    {
//        if( tmpData.data && tmpData.data.length != 0)
//        {
//            if (!ShowmapCtrl.mainMap.hasLayer(ShowmapCtrl.layerHeatmap))
//                ShowmapCtrl.mainMap.addLayer(ShowmapCtrl.layerHeatmap);
//            ShowmapCtrl.layerHeatmap.setData(tmpData);
//        }
//        else
//            hideHeatmap();
//    }
//}
//
//function getIcon(etichetta) {
//    switch (etichetta)
//    {
//        case "omofobia":    return getAwesomeMarker("blue");
//        case "donne":       return getAwesomeMarker("red");
//        case "razzismo":    return getAwesomeMarker("green");
//        case "diversità":   return getAwesomeMarker("orange");
//        default :           return getAwesomeMarker("purple");
//    }
//}
//
//function getAwesomeMarker(color) {
//    return L.AwesomeMarkers.icon({
//        icon: 'fa-twitter',
//        prefix: 'fa',
//        markerColor: color
//    });
//}
