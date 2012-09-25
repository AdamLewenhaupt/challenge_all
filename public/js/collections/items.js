define(["underscore", "backbone", "models/item"], function(_, Backbone, Item, template){

    var Items = Backbone.Collection.extend({
        model: Item
    });

    return new Items();

});