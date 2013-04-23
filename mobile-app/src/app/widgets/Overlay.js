define([
    // Libs
    "$",
    "underscore",
    "backbone",
    "move",

    // Plugins
    'backbone.layoutmanager'
], function ($, _, Backbone, Move) {

    return Backbone.Layout.extend({

        className: 'x-container ui-overlay',

        initialize: function(options) {
            this.layout = options.layout || [];
        },

        beforeRender: function() {
            this.$overlay = $('<div class="ui-inner"/>');
            _.each(this.layout.split(' '), function(className, index) {
                this.$overlay.addClass(className);
            }, this);
            this.$el.append(this.$overlay);
        },

        show: function() {
            var $overlay = this._getOverlay();
            $overlay.show();
            var dfd = _.Deferred();

            Move($overlay.get(0)).set('opacity', "1").duration(".2s").end(function() {
                dfd.resolve();
            });
            return dfd.promise();
        },

        hide: function() {
            var $overlay = this._getOverlay();
            $overlay.hide();
        },

        _getOverlay: function () {
            return this.$overlay;
        }

    });

});
