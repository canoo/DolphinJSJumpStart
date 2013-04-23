define(['$', '_', 'backbone', 'hammer', 'widgets/Button'], function ($, _, Backbone, Hammertime, Button) {

    var ENTER_KEY = 13;

    return Backbone.View.extend({

        template : 'widgets/search-box',
        className: 'ui-search-box hbox',

        events: {
            'keypress' : '_onEnterCommit'
        },

        initialize: function (options) {
            options = options || {};
            this.placeholder = options.placeholder || "";
        },

        beforeRender: function() {
            var searchButton = new Button({ icon: 'search', className: 'ui-button ui-search-button'});
            this.listenTo(searchButton, 'pressed', this._onSearchCommit);
            this.insertView(searchButton);
        },

        serialize: function () {
            return {
                placeholder: this.placeholder
            }
        },

        _getSearchInput: function() {
            return this.$("input").attr("value") || "";
        },

        _onEnterCommit: function(event) {
            if(event.keyCode == ENTER_KEY) {
                this._onSearchCommit();
            }
        },

        _onSearchCommit: function() {
            this.trigger('search', this._getSearchInput());
        }
    });
});