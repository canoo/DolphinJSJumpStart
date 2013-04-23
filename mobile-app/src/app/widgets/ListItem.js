define(['$', '_', 'backbone', 'hammer', 'backbone.layoutmanager'], function ($, _, Backbone, Hammertime) {
    return Backbone.Layout.extend({

        template : 'widgets/list-item',
        className: 'ui-list-item',

        events: {
            'tap': '_onItemTap'
        },

        initialize: function (options) {
            Hammertime(this.el);

            this.listenTo(this.model, 'change', this.update);
        },

        update: function() {
            console.log("RENDER ON CHANGE PKEASE");
            this.render();
        },

        _onItemTap: function () {
            // fire custom event using jquery/zepto and pass the underlying model
            this.trigger('itemTap', this.model);
        },

        serialize: function () {
            if (this.model) {
                return this.model.toJSON();
            } else {
                return {};
            }
        }
    });
});

