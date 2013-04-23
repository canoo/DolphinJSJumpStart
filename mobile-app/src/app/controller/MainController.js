define([
    // Libs
    "$",
    "underscore",
    "backbone",
    'UI',
    'App',

    'config/Properties',

    'dolphinjs/dolphin',
    'comm/ClientAttribute',
    'models/WeatherModel',
    'models/WeatherModelCollection',
    'views/WeatherListItem',

    // Plugins
    'backbone.layoutmanager'
], function ($, _, Backbone, UI, App, Properties, Dolphin, ClientAttribute, WeatherModel, WeatherModelCollection, WeatherListItem) {


    var Controller = function() {

    };

    _.extend(Controller.prototype, {

        init: function () {

            // Our Viewport implementation with card layout
            // supports push and pop methods with animations
            App.Viewport.useLayout('main');


            var me = this;

            // render the viewport first to know the dimensions
            App.Viewport.render()
                .done(function () {

                    // init Dolphin

                    var dolphin = new Dolphin({
                        serverUrl: Properties.serverUrl,
                        clearSession: true
                    });

                    dolphin.getClientDolphin().sendEmpty(function() {

                        var items = new WeatherModelCollection([], { dolphin: dolphin });

                        var list = new UI.List({ listItem: WeatherListItem, collection: items, scrollable: true });

                        list.on('itemTap', function(model) {
                            alert(model.get('temperature') + ' / ' + model.get('humidity'));
                        });

                        App.Viewport.pushCard('main', list);
                    });
                });
        }

    });

    return Controller;
});
