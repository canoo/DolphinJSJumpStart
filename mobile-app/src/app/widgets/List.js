define([
    '$', '_', 'backbone',

    'iScroll',
    'hammer',
    'widgets/ListItem',

    'backbone.layoutmanager'], function ($, _, Backbone, iScroll, Hammertime, ListItem) {

    var ListContent = Backbone.Layout.extend({
        template: 'widgets/list-content',
        className: 'ui-list-scroll-content box-flex',

        initialize: function(options) {
            this.listItem = options.listItem;
        },

        beforeRender: function () {
            if (this.collection) {

                var me = this;

                this.collection.each(function (model) {
                    var listItem = new me.listItem({ model: model });
                    me.insertView('.ui-list-scroll-content-inner', listItem);
                }, this);

                this.collection.on('add', function(model) {
                    var listItem = new me.listItem({ model: model });
                    me.insertView('.ui-list-scroll-content-inner', listItem);
                    listItem.render();
                    me.trigger('refresh');
                }, this);

                this.collection.on('remove', function(model) {
                    // TODO handle remove
                    // find item view with the particular model and remove it from the list
                    // remove listeners etc.
                    // rerender view
                }, this);
            }
        },

        _onItemTap: function(model) {
            this.trigger('itemTap', model);
        }
    });

    var EmptyList = Backbone.View.extend({
        className: 'ui-list-empty-content vbox box-align-center box-pack-center',
        template : 'widgets/list-empty'
    });

    return Backbone.Layout.extend({

        className: 'ui-item-list vbox box-flex',

        scroller: null,

        defaults: {
            scrollable: true,
            listItem: ListItem
        },

        initialize: function (options) {
            options = _.defaults(options || {}, this.defaults);
            this.listItem = options.listItem;
            this.scrollable = options.scrollable;
            this.scrolling = false;
        },

        _onItemTap: function(event) {
            if(!this._isScrolling()) {
                console.log("TAP", event.data);
                this.trigger('itemTap', event.data);
            }
            console.log("NO TAP scrolling");
        },

        _isScrolling: function() {
            if(!this.scroller) {
                return false;
            }
            console.log("scrolling??? ", this.scrolling);
            return this.scrolling;
        },

        beforeRender: function () {
//            if (this.collection && !this.collection.isEmpty()) {

                var listContent = new ListContent({ listItem: this.listItem, collection: this.collection });
                this.insertView(listContent);

                var me = this;
                this.listenTo(listContent, 'refresh', function(){
                    setTimeout(function () {
                        me.scroller.refresh();
                        console.log('refresh');
                    }, 0);
                }, this);

//            } else {
//                this.insertView(new EmptyList());
//            }
        },

        afterRender: function () {
//            if (this.scrollable && this.collection && !this.collection.isEmpty()) {

                var settings = {
                    onScrollMove: _.bind(this._onScrollMove, this),
                    onScrollEnd: _.bind(this._onScrollEnd, this)
                };

                this.scroller = new iScroll(this.el.firstChild, settings);
//            }
        },

        _onScrollMove: function() {
            this.scrolling = true;
            console.log("scroll move:", this.scrolling);
        },

        _onScrollEnd: function() {
            this.scrolling = false;
            console.log("scroll end:", this.scrolling);
        }
    });
});

