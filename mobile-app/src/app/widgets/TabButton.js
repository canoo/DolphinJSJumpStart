define([ '$', '_', 'backbone'], function ($, _, Backbone) {

    // TODO extend from button !!!
    return Backbone.View.extend({

        className: 'tab-button',
        template : 'widgets/tab-button',

        events: {
            'mousedown': 'onMouseDown',
            'mouseup'  : 'onMouseUp',
            'click'    : 'onClick',

            'touchstart': 'onTouchStart',
            'touchmove' : 'onTouchMove',
            'touchend'  : 'onTouchEnd'
        },

        initialize: function (options) {
            this.title = options.title || "";
            this.icon = options.icon || "";
            this.role = options.role || "";
            this.setPressed(!!options.pressed);
            this.setEnabled(!!options.disabled);
            this.$el.data("role", this.role);
        },

        serialize: function () {
            return {
                title: this.title,
                icon: this.icon
            };
        },

        getRole: function() {
            return this.role;
        },

        onClick: function (event) {
            if(this.isEnabled()) {
                // TODO remove this
//                if(!Modernizer.touch) {
                    this._buttonPressed();
//                }
            }
        },

        onMouseDown: function () {
            if(this.isEnabled()) {
                this.setPressed(true);
            }
        },

        onMouseUp: function () {
            if(this.isEnabled()) {
                var isUnder = this._isUnder(event);
                if(isUnder) {
//                this._buttonPressed();
                }
//            this.setPressed(false);
            }
        },

        onTouchStart: function (event) {
            if(this.isEnabled()) {
                this.setPressed(true);
            }
        },

        onTouchMove: function (event) {
            if(this.isEnabled()) {
                var touch = event.touches[0];
                var isUnder = this._isUnder(touch);
                this.setPressed(isUnder);
            }
        },

        onTouchEnd: function (event) {
            if(this.isEnabled()) {
                if (this._isUnder(event.changedTouches[0])) {
                    this.setPressed(true);
                    this._buttonPressed();
                } else {
                    this.setPressed(false);
                }
            }
        },

        setPressed: function(pressed) {
            if (pressed) {
                this.$el.addClass('pressed');
            } else {
                this.$el.removeClass('pressed');
            }
        },

        setEnabled: function(disabled) {
            if (disabled) {
                this.$el.addClass('disabled');
            } else {
                this.$el.removeClass('disabled');
            }
        },

        isEnabled: function() {
            return !this.$el.hasClass("disabled");
        },

        _isUnder: function (e) {
            var elemWidth = this.$el.width();
            var elemHeight = this.$el.height();
            var elemPosition = this.$el.offset();
            var elemPosition2 = {};
            elemPosition2.top = elemPosition.top + elemHeight;
            elemPosition2.left = elemPosition.left + elemWidth;

            return ((e.pageX > elemPosition.left && e.pageX < elemPosition2.left) && (e.pageY > elemPosition.top && e.pageY < elemPosition2.top));
        },

        _buttonPressed: function() {
            this.trigger('press', this);
        }
    });
});

