define(['$', '_', 'backbone', 'widgets/Button'], function ($, _, Backbone, Button) {
    return Button.extend({

        template : 'widgets/networkButton',
        className: 'ui-list-networkButton',

        initialize: function (options) {
            Button.prototype.initialize.apply(this, arguments);
            this.titleIcon = options.titleIcon || '';
        },

        showSpinner: function () {
            var $spinner = this.$(".network-button-spinner");
            $spinner.addClass('network-button-spinner-show');
        },

        hideSpinner: function () {
            var $spinner = this.$(".network-button-spinner");
            $spinner.removeClass('network-button-spinner-show');
        },

        serialize: function () {
            var superButton = Button.prototype.serialize.apply(this, arguments);
            superButton.titleIcon = this.titleIcon;
            return superButton;
        }
    });
})
;
