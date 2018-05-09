function ViewObjectBase(view, model) {
    this.view = view;
    this.model = model;
    this.id = model && model.id;
    this.svgs = [];
    this.dF = 0;
}

Object.assign(ViewObjectBase.prototype, {
    toJSON: function () {
        return this.model && this.model.toJSON && this.model.toJSON();
    },
    create: function () {
    },
    update: function () {
    },
    destroy: function () {
    }
});

