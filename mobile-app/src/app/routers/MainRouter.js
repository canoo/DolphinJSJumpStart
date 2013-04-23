define([
    '$',
    'backbone',

    'controller/MainController'

], function ($, Backbone, MainController) {

    return Backbone.Router.extend({

        // available routes for the application
        routes: {
            ""      : "index"
        },

        index: function () {
            var controller = new MainController();
            controller.init();
        }
    });
});
