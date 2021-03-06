define([
		'tabs/Markdown.opt',
		'tabs/markdown/dialog.default'
	], function(options, dialogDefault) {
		var gui = require('nw.gui');
		var shell = gui.Shell;

		var _gaq = global._gaq;

		// var config = options.toJSON();

		options.bind('change', function(model) {
			var prop, en,
				data = model.changedAttributes();

			for (prop in data) {
				en = 'preferences.markdown.'+ prop;
				window.parent.ee.emit(en, data[prop]);
			}
		});

		var MarkdownTabView = Backbone.View.extend({
			el: '#markdown-tab',

			events: {
				'click a': 'clickHandler',
				'click input[name=gfm]': 'enableGFM',	
				'click input[name=sanitize]': 'enableSanitize',	
				'click input[name=tables]': 'enableTables',	
				'click input[name=footnotes]': 'enableFootnotes',	
				'click input[name=breaks]': 'enableBreaks',	
				'click input[name=smartLists]': 'enableSmartLists',	
				'click input[name=smartypants]': 'enableSmartyPants',	
				'click input[name=dollarSign]': 'enableDollarSign',	
				'click input[name=mathjax]': 'enableMathjax',
				'click button[name=apply]': 'clickApply',
				'click button[name=default]': 'clickDefault'
			},

			initialize: function() {
				this.setup();

				dialogDefault.on('yes', this.reset.bind(this));
			},

			setup: function(opt) {
				var opt = opt || options.toJSON();

				this.$('input[name=gfm]').prop('checked', opt.gfm);
				this.$('input[name=sanitize]').prop('checked', opt.sanitize);
				this.$('input[name=tables]').prop('checked', opt.tables);
				this.$('input[name=footnotes]').prop('checked', opt.footnotes);
				this.$('input[name=breaks]').prop('checked', opt.breaks);
				this.$('input[name=smartLists]').prop('checked', opt.smartLists);
				this.$('input[name=smartypants]').prop('checked', opt.smartypants);
				this.$('input[name=mathjax]').prop('checked', opt.mathjax);
				this.$('input[name=dollarSign]').prop('checked', opt.dollarSign);
			},

			reset: function() {
				this.setup(options.defaults);
				options.set(options.defaults);

				// window.parent.ee.emit('preferences.markdown.change', options.defaults);
			},

			clickApply: function(e) {
				window.parent.ee.emit('preferences.markdown.change', options.toJSON());
			},

			clickDefault: function(e) {
				dialogDefault.show();
			},

			clickHandler: function(e) {
				var href = $(e.target).attr('href');
				e.preventDefault();
				shell.openExternal(href);
			},

			enableGFM: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('gfm', bool);
				
      	_gaq.push('haroopad.preferences', 'markdown option', 'gfm:'+bool);
			},

			enableSanitize: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('sanitize', bool);

      	_gaq.push('haroopad.preferences', 'markdown option', 'sanitize:'+bool);
			},

			enableTables: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('tables', bool);

      	_gaq.push('haroopad.preferences', 'markdown option', 'gfm tables:'+bool);
			},

			enableFootnotes: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('footnotes', bool);

      	_gaq.push('haroopad.preferences', 'markdown option', 'gfm footnotes:'+bool);
			},

			enableBreaks: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('breaks', bool);

      	_gaq.push('haroopad.preferences', 'markdown option', 'gfm line breaks:'+bool);
			},

			enableSmartLists: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('smartLists', bool);

      	_gaq.push('haroopad.preferences', 'markdown option', 'smartLists:'+bool);
			},

			enableSmartyPants: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('smartypants', bool);

      	_gaq.push('haroopad.preferences', 'markdown option', 'smartypants:'+bool);
			},

			enableMathjax: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('mathjax', bool);
				
      	_gaq.push('haroopad.preferences', 'markdown option', 'mathjax:'+bool);
			},

			enableDollarSign: function(e) {
				var bool = $(e.target).is(':checked');
				options.set('dollarSign', bool);
				
      	_gaq.push('haroopad.preferences', 'markdown option', 'use single dollar sign:'+bool);
			}
		});

		return new MarkdownTabView;

});