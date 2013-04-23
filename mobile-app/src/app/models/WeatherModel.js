define(['_', 'backbone' ], function (_, Backbone) {

    return Backbone.Model.extend({

        defaults: {
            temperature: 0,
            location   : 'unknown'
        },

        properties: [ 'temperature', 'location' ],

        initialize: function (attributes, options) {

            this.pm = options.pm;

            var me = this;
            me._update();
        },

        _update: function () {

            console.log("UPDATE on RENDER");

            var me = this;
            _.each(this.properties, function (property) {
                var attribute = me.pm.getAttributeByPropertyName(property);

                attribute.on('valueChange', function (data) {
                    me.set(property, data.newValue);
                });

                me.set(property, attribute.getValue());

            }, this);
        }
    });
});