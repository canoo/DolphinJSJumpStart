define([
    '$',
    'underscore',
    'backbone',
    'i18n!nls/locals',

    'views/Wizard',
    'views/Form',

    'widgets/TabBar',
    'config/Properties',

    'backbone.layoutmanager'
], function ($, _, Backbone, Locals, Wizard, Form, Properties) {

    return Backbone.Layout.extend({
        template : 'layouts/main',
        className: 'main-view vbox',

        beforeRender: function () {
            this.insertView('.content', new Wizard({
                content: new Form()
            }));
        }
    });
});
