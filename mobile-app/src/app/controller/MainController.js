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

                    var url = window.location.protocol + '//' + window.location.host + Properties.serverUrl;

                    var dolphin = new Dolphin({ serverUrl: url, clearSession: true });

                    dolphin.getClientDolphin().sendEmpty(function() {
                        App.Viewport.pushCard('main', new ListView({dolphin: dolphin}));
                    });
                });
        }

    });

    return Controller;
});
