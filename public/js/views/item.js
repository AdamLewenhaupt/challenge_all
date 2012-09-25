define(["underscore", "backbone", "text!templates/item.tp"], function(_, Backbone, template){

    var ItemView = Backbone.View.extend({
        
        template: _.template(template),

        events: {
            "click button": 'clear'
        },

        initialize: function(){
            this.model.on('change', this.render, this);
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        clear: function(){
            this.$el.remove();
            this.model.trigger("sell", this.model);
        }

    });

    return ItemView;
});