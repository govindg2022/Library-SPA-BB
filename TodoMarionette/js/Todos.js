TodoMVC.module('Todos', function(Todos, App, Backbone, Marionette, $, _){
	// Todo Model
	// ----------

	Todos.Todo = Backbone.Model.extend({
		localStorage : new Backbone.localStorage('todos-backbone'),

		defaults: {
			title :'',
			completed : false,
			created : 0
		},

		initialize : function() {
			if(this.isNew())
				this.set('created', Date.now());
		},

		toggle : function() {
			return this.set('completed', !this.isCompleted());
		},

		isCompleted : function() {
			return this.get('completed');
		}
	});

	Todos.TodoList = Backbone.Collection.extend({
		model: Todos.Todo,
		localStorage : new Backbone.localStorage('todos-backbone'),
		
		getCompleted : function() {
			return this.filter(this._isCompleted);
		},

		getActive: function() { 
			return this.reject(this._isCompleted);
		},

		comparator : function(todo){
			return todo.get('created');
		},

		_isCompleted : function (todo){
			return todo.isCompleted();
		}
	});
});