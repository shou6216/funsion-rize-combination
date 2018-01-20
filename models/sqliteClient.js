var knex = require('knex')({
    dialect: 'sqlite3',
    connection: {
        filename: 'fusion-rize.db'
    },
    useNullAsDefault: true
});
var bookshelf = require('bookshelf')(knex);

var Capsule = bookshelf.Model.extend({
    tableName: 'capsule',
    mapping: function() {
        return this.hasOne(Mapping);
    }
});

var Fusion = bookshelf.Model.extend({
    tableName: 'fusion',
    mapping: function() {
        return this.hasOne(Mapping);
    }
})

var Mapping = bookshelf.Model.extend({
    tableName: 'mapping',
    iCapsule: function() {
        return this.belongsTo(Capsule, 'iCapsuleId', 'id');
    },
    fusion: function() {
        return this.belongsTo(Fusion, 'fusionId', 'id');
    }
})

exports.Capsule = Capsule;
exports.Fusion = Fusion;
exports.Mapping = Mapping;