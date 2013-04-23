define([
    "$", "_", "backbone", "hammer", "move",
    "App",
    "i18n!nls/locals",
    "widgets/Overlay",
    'widgets/ButtonBar',
    'widgets/Button'
], function ($, _, Backbone, Hammertime, Move, App, locals, Overlay, ButtonBar, Button) {

    var MsgBox = Backbone.View.extend({

        template : 'widgets/msgbox',
        className: 'ui-msg-box vbox',

        initialize: function (options) {
            options = options || {};

            this.title = options.title || "";
            this.text = options.text || "";
            this.buttons = options.buttons || [];
        },

        beforeRender: function () {
            var me = this;

            if (!_.isEmpty(me.buttons)) {

                // create buttons and map action listeners
                var buttons = _.map(me.buttons, function (item, index) {

                    var button = new Button({
                        title: item.title
                    });

                    me.listenTo(button, 'pressed', function () {
                        me.trigger(item.action, button);
                    });

                    return button;

                }, me);

                // create the button bar
                me.insertView('.msg-box-buttonbar', new ButtonBar({
                    buttons: buttons
                }));

            } else {
                console.warn("No Buttons specified for message box");
            }
        },

        serialize: function () {
            return {
                title: this.title,
                text : this.text
            }
        }
    });

    return {

        result: {
            OK    : "ok",
            CANCEL: "cancel",
            YES   : "yes",
            NO    : "no"
        },

        isShowing: function () {
            return App.Viewport.hasCard('msg-box-overlay');
        },

        confirm: function (title, text) {
            var me = this;
            var dfd = _.Deferred();

            // skip in case we are showing a dialog already
            if (me.isShowing()) {
                dfd.resolve();
                return dfd.promise();
            }

            var overlay = new Overlay({
                layout: 'vbox box-align-center box-pack-center'
            });

            var box = new MsgBox({
                title  : title,
                text   : text,
                buttons: [
                    {
                        title : locals.yes,
                        action: 'confirm'
                    },
                    {
                        title : locals.cancel,
                        action: 'cancel'
                    }
                ]
            });

            overlay.insertView('.ui-inner', box);

            box.on('confirm', me._ok(dfd));
            box.on('cancel', me._cancel(dfd));


            App.Viewport.addCard('msg-box-overlay', overlay).done(function () {
                overlay.show();
            });

            return dfd.promise();
        },

        alert: function (title, text) {
            var me = this;
            var dfd = _.Deferred();

            // skip in case we are showing a dialog already
            if (me.isShowing()) {
                dfd.resolve();
                return dfd.promise();
            }

            var overlay = new Overlay({
                layout: 'vbox box-align-center box-pack-center'
            });

            App.Viewport.addCard('msg-box-overlay', overlay).done(function () {
                var box = new MsgBox({
                    title  : title,
                    text   : text,
                    buttons: [
                        {
                            title : locals.ok,
                            action: 'confirm'
                        }
                    ]
                });
                overlay.insertView('.ui-inner', box);

                box.on('confirm', me._ok());
                overlay.show();
                box.render();
            });

            return dfd.promise();
        },

        _ok: function (dfd) {
            return function () {
                App.Viewport.removeCard('msg-box-overlay');
                if (dfd) {
                    dfd.resolve();
                }
            }
        },

        _cancel: function (dfd) {
            return function () {
                App.Viewport.removeCard('msg-box-overlay');
                if (dfd) {
                    dfd.reject();
                }
            }
        }
    };
});