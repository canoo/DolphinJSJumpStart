define(['$', '_', 'backbone', 'widgets/Button', 'backbone.layoutmanager'], function ($, _, Backbone, Button) {
    return Backbone.Layout.extend({

        className: 'ui-button-bar',

        buttons : [],

        initialize: function(options) {
            options = options || {};
            this.buttons = options.buttons || [];
        },

        beforeRender: function() {
            this.setViews({ "": this.buttons });
        }
    });
});
