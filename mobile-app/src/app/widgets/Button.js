define(['$', '_', 'backbone', 'hammer'], function ($, _, Backbone, Hammertime) {
    return Backbone.View.extend({

        template : 'widgets/button',
        className: 'ui-button',

        events: {
            'touch'  : '_onTouch',
            'drag'   : '_onDrag',
            'release': '_onRelease'
        },

        initialize: function (options) {
            options = options || {};
            this.title = options.title || "";
            this.icon = options.icon || "";
            this.icons = options.icons || [];
            this.disabled = options.disabled || false;
            if (!this.title && !this.icon) {
                this.title = "[ Button ]";
            }

            // watch this!
            // http://www.youtube.com/watch?v=2Oc-JGEFNIw
            Hammertime(this.el);
        },

        serialize: function () {
            return {
                icon : this.icon,
                icons : this.icons,
                title: this.title
            }
        },

        beforeRender: function() {
            this.setEnabled(!this.disabled);
        },

        setEnabled: function(enabled) {
            if (enabled) {
                this.$el.removeClass('button-disabled');
            } else {
                this.$el.addClass('button-disabled');
            }
        },

        isEnabled: function() {
            return !this.$el.hasClass('button-disabled');
        },

        setVisible: function(visible) {
            if (visible) {
                this.$el.removeClass('button-invisible');
            } else {
                this.$el.addClass('button-invisible');
            }
        },

        isVisible: function() {
            return !this.$el.hasClass('button-invisible')
        },

        getTitle: function() {
            return this.title;
        },

        getIcon: function() {
            return this.icon;
        },

        _onTouch: function () {
            if(!this.isEnabled()) {
                return;
            }

            this._setPressed(true);
        },

        _onDrag: function (event) {
            if(!this.isEnabled()) {
                return;
            }

            this._setPressed(this._isUnder(event.gesture.center));
        },

        _onRelease: function (event) {
            if(!this.isEnabled()) {
                return;
            }

            this._setPressed(false);
            if (this._isUnder(event.gesture.center)) {
                this.trigger('pressed', event, this);
            }
        },

        _setPressed: function (pressed) {
            if (pressed) {
                this.$el.addClass('button-pressed');
            } else {
                this.$el.removeClass('button-pressed');
            }
        },

        _isUnder: function (center) {
            var elemWidth = this.$el.width();
            var elemHeight = this.$el.height();
            var elemPosition = this.$el.offset();
            var elemPosition2 = {};
            elemPosition2.top = elemPosition.top + elemHeight;
            elemPosition2.left = elemPosition.left + elemWidth;
            return ((center.pageX > elemPosition.left && center.pageX < elemPosition2.left) && (center.pageY > elemPosition.top && center.pageY < elemPosition2.top));
        }
    });
});