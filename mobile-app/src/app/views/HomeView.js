define(['$', '_', 'backbone', 'UI', 'backbone.layoutmanager'], function ($, _, Backbone, UI) {
    return Backbone.Layout.extend({

        template:'views/home',
        className:'content-view home-view',

        initialize: function() {

        },

        beforeRender: function () {
            this.insertView(new UI.Button());
        }
    });
});