var knex = require('knex')({ 
  client: 'sqlite3',
  connection: { filename: 'data.sqlite3' },
  debug: true })
var bookshelf = require('bookshelf')(knex)
	bookshelf.plugin('registry')

	const Item = bookshelf.Model.extend({
	  tableName: 'item',
	  orders: function() {
	  	this.belongsToMany('Order', 'OrderItem')
	  },
	})
	bookshelf.model('Item', Item)

	const Order = bookshelf.Model.extend({
	  tableName: 'order',
	  items: function() {
	  	//return this.hasMany('Item').through('OrderItem')
	  	return this.belongsToMany('Item', 'OrderItem')
	  },
	})
	bookshelf.model('Order', Order)

Order.where({id:33}).fetch({withRelated: 'items'}).then(function(x){console.log(x.toJSON())})
