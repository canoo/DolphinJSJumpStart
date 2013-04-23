define([
    // Libs
    "$",
    "underscore",
    "backbone",
    'UI',
    'App',

    'config/Properties',

    'dolphinjs/dolphin',
    'views/ListView',


    // Plugins
    'backbone.layoutmanager'
], function ($, _, Backbone, UI, App, Properties, Dolphin, ListView) {


    var Controller = function() {

    };

    _.extend(Controller.prototype, {

        init: function () {

            // Our Viewport implementation with card layout
            // supports push and pop methods with animations
            App.Viewport.useLayout('main');

            // render the viewport first to know the dimensions
            App.Viewport.render()
                .done(function () {

                    // init Dolphin

                    var protocol = window.location.protocol === 'file:' ? 'http:' : window.location.protocol;
                    var host = (window.location.host === '') ? 'localhost:8080' : window.location.host;
                    var url = protocol + '//' + host + Properties.serverUrl;
                    console.log("Connecting to url: " + url);
                    console.log("Connecting to host: " + window.location.host);


                    var dolphin = new Dolphin({ serverUrl: url, clearSession: true });

                    dolphin.getClientDolphin().sendEmpty(function() {
                        App.Viewport.pushCard('main', new ListView({dolphin: dolphin}));
                    });
                });
        }

    });

    return Controller;
});
