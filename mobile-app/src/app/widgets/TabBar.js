define([
    '$',
    '_',
    'backbone',

    'widgets/TabButton',

    'backbone.layoutmanager'], function ($, _, Backbone, TabButton) {

    return Backbone.Layout.extend({
        className: 'tab-bar box-flex',

        initialize: function (options) {
            this.items = options.items || [];
        },

        beforeRender: function () {
            _.each(this.items, function (item, index) {
                var tabButton = new TabButton(item);
                this.listenTo(tabButton, 'press', this._updateTabButtons);
                this.insertView(tabButton);
            }, this);
        },

        _updateTabButtons: function(pressedButton) {
            this.getViews(function(tabButton) {
                return tabButton.getRole() !== pressedButton.getRole()
            }).each(function(tabButton){
                    tabButton.setPressed(false);
            });
            this.trigger('tabpress', {role: pressedButton.getRole()});
        },

        _getItem: function(role) {
            this.items.forEach(function(item) {
                if (item.role === role) {
                    return item;
                }
            });
            return undefined;
        },

        /**
         * Enable all tabs which match the specified roles.
         *
         * @param roles the array of roles
         * @param enabled true or false
         */
        enableTabs: function(roles, enabled) {
            var me = this;
            this.getViews(function(tabButton) {
                return _.indexOf(roles, tabButton.getRole()) !== -1
            }).each(function(tabButton){
                tabButton.setEnabled(!enabled);
            });
        }

    });

});
