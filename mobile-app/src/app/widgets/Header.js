define([ '$', '_', 'backbone', 'backbone.layoutmanager'],
    function ($, _, Backbone) {

    return Backbone.Layout.extend({
        template: 'widgets/header',
        className: 'ui-header',

        defaults: {
            title: "Header"
        },

        initialize: function(options) {
            options = _.defaults(options || {}, this.defaults)

            this.title = options.title;
        },

        getTitle: function() {
            return this.title;
        },

        setTitle: function(title) {
            this.title = title || "";
            this.render();
        },

        serialize: function() {
            return {
                title: this.title
            }
        }
    });
});