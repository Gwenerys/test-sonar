

ctx.types.datatable = {
	name: 'datatable',
	tag: 'table',
	attributes: {
		"class" : "display cell-border table-hover table-striped table-bordered", 
		"cellspacing" : "0", 
		"width" : "100%"
	},	
	options: {
		//info: false,
		paging: false,
		ordering: false,
		//autoWidth: false,
		//scrollY: "100px",
		//scrollCollapse: true,
		searching: false,
		initComplete: function () {
			this.api().columns().every( function () {
				var column = this;
				var select = $('<select><option value=""></option></select>')
					.appendTo( $(column.footer()).empty() )
					.on( 'change', function () {
						var val = $.fn.dataTable.util.escapeRegex(
							$(this).val()
						);
						column
							.search( val ? '^'+val+'$' : '', true, false )
							.draw();
					} );
				column.data().unique().sort().each( function ( d, j ) {
					select.append( '<option value="'+d+'">'+d+'</option>' )
				} );
			} );
		}
	},
	init: function (item) {
		item.get = function(iRow, iCol) {
			// todo
		}
		item.getAll = function() {
			// todo
		}
		item.refresh = function() {
			if (!item.object) {
				var jQobj = (item.element ? $(item.element) : $('#' + item.id));
				item.object = jQobj.DataTable( item.options );
			} else {
				// reinint data source
			    item.object.clear();
				if (item.data) { item.object.rows.add(item.data); }
			    item.object.draw();
			}
		}
		item.set = function(value, iRow, iCol) {
			// todo
		}
		item.setAll = function(data) {
			// todo
			if (data) item.data = data;
			item.refresh();
		}
		item.refresh();
	}
}

ctx.types.treeview = {
	name: 'treeview',
	tag: 'div',
	options: {
		showTags: true
	},
	init: function (item) {
		item.getAll = function() {
			// todo
		}
		item.refresh = function() {
			var jQobj = (item.element ? $(item.element) : $('#' + item.id));
			jQobj.treeview( item.options );
		}
		item.setAll = function(data) {
			// todo
			if (data) item.options.data = data;
			item.refresh();
		}
		item.refresh();
	}
}

ctx.types.select = {
	name: 'select',
	tag: 'select',
	attributes: {
		"class": "form-control"
	},
	init: function (item) {
		if (item.multiple !== undefined) {
			item.attributes.multiple = item.multiple;
		}
		if (item.label !== undefined) {
			var child = "<label for=\"" + id + "\">" + item.label + "</label>";
			item.previousSiblings = [];
			item.previousSiblings.push(child);
		}
		if (item.options ) {
			item.children = [];
			for (var id in item.options) {
				var child = "<option value=\"" + id + "\">" + item.options[id] + "</option>";
				item.children.push(child);
			}
		}
	}
}

ctx.types.list = {
	name: 'list',
	tag: 'div',
	attributes: {
		"class": "list-group"
	},
	init: function (item) {
		if (item.items ) {
			item.children = [];
			for (var id in item.items) {
				var child = "<a class=\"list-group-item\" id=\"" + id + "\" href=\"#\">" + item.items[id].value + (item.items[id].badge ? "<span class=\"badge\">" + item.items[id].badge + "</span>": "") + "</a>";
				item.children.push(child);
			}
		}
	}
}

ctx.types.accordion = {
	name: 'accordion',
	tag: 'div',
	attributes: {
	},
	init: function (item) {
		item.attributes['class'] = item.attributes['class'] || '';
		item.attributes['class'] += ' nav';
		if (item.style !== undefined) {
			item.attributes['class'] += ' nav-' + item.style + 's';
		}
		if (item.items ) {
			item.children = [];
			for (var id in item.items) {
				var child = "<li class=\"tab" + ( item.items[id].active ? " active in " : "") + "\"><a href=\"#" + id + "\"" + (item.style ? " data-toggle=\"" + item.style + "\"" : "") + ">" + item.items[id].value + "</a></li>";
				item.children.push(child);
			}
			var nextNode = '<div class="tab-content">';
			for (var id in item.items) {
				nextNode += "<div class=\"tab-pane fade" + ( item.items[id].active ? " active" : "") + "\" id= \"" + id  + "\">" + item.items[id].content + "</div>";
			}
			nextNode += '</div>';
			item.nextSiblings.push(nextNode);
		}
	}
}

ctx.types.nav = {
	name: 'nav',
	style: 'tab',
	tag: 'ul',
	attributes: {
	},
	init: function (item) {
		item.attributes['class'] = item.attributes['class'] || '';
		item.attributes['class'] += ' nav';
		if (item.style !== undefined) {
			item.attributes['class'] += ' nav-' + item.style + 's';
		}
		if (item.items ) {
			item.children = [];
			for (var id in item.items) {
				var child = "<li class=\"tab" + ( item.items[id].active ? " active in " : "") + "\"><a href=\"#" + id + "\"" + (item.style ? " data-toggle=\"" + item.style + "\"" : "") + ">" + item.items[id].value + "</a></li>";
				item.children.push(child);
			}
			var nextNode = '<div class="tab-content">';
			for (var id in item.items) {
				nextNode += "<div class=\"tab-pane fade" + ( item.items[id].active ? " active" : "") + "\" id= \"" + id  + "\">" + item.items[id].content + "</div>";
			}
			nextNode += '</div>';
			item.nextSiblings.push(nextNode);
		}
	}
}

ctx.types.pagination = {
	name: 'pagination',
	tag: 'ul',
	attributes: {
		'class': 'pagination'
	},
	init: function (item) {
		if (item.options ) {
			item.children = [];
			for (var id in item.options) {
				var child = "<li><a href=\"#\" id=\"" + id + "\">" + item.options[id] + "</a></li>";
				item.children.push(child);
			}
		}
	}
}

ctx.types.button = {
	name: 'button',
	tag: 'button',
	attributes: {
		type: 'button'
	},
	init: function (item) {
		item.attributes['class'] = item.attributes['class'] || '';
		item.attributes['class'] += ' btn';
		if (item.style !== undefined) {
			item.attributes['class'] += ' btn-' + item.style;
		}
		if (item.width !== undefined) {
			item.attributes['class'] += ' col-xs-' + item.width;
		}
		if (item['class'] !== undefined) {
			item.attributes['class'] += ' ' + item['class'];
		}
		if (item.disabled !== undefined) {
			item.attributes.disabled = item.disabled;
		}
		item.attributes.onclick = "ctx.sendValues('" + item.id + "', false, false);";
		if (item.icon !== undefined) {
			var child = "<span class=\"glyphicon glyphicon-" + item.icon + "\"></span>";
			item.children.push(child);
		}
		if (item.value !== undefined) {
			var child = " " + item.value + " ";
			delete item.value;
			item.children.push(child);
		}
		if (item.badge !== undefined) {
			var child = "<span class=\"badge\">" + item.badge + "</span>";
			item.children.push(child);
		}
	}
}

ctx.types.label = {
	name: 'label',
	tag: 'span',
	attributes: {
	},
	init: function (item) {
		item.attributes['class'] = item.attributes['class'] || '';
		item.attributes['class'] += ' label';
		if (item.style !== undefined) {
			item.attributes['class'] += ' label-' + item.style;
		}
		if (item.width !== undefined) {
			item.attributes['class'] += ' col-xs-' + item.width;
		}
		if (item['class'] !== undefined) {
			item.attributes['class'] += ' ' + item['class'];
		}
		if (item.disabled !== undefined) {
			item.attributes.disabled = item.disabled;
		}
		item.attributes.onclick = "ctx.sendValues('" + item.id + "', false, false);";
		if (item.icon !== undefined) {
			var child = "<span class=\"glyphicon glyphicon-" + item.icon + "\"></span>";
			item.children.push(child);
		}
		if (item.value !== undefined) {
			var child = " " + item.value + " ";
			delete item.value;
			item.children.push(child);
		}
		if (item.badge !== undefined) {
			var child = "<span class=\"badge\">" + item.badge + "</span>";
			item.children.push(child);
		}
	}
}

ctx.types.input = {
	name: 'input',
	tag: 'input',
	attributes: {
	},
	init: function (item) {
		item.attributes['class'] = item.attributes['class'] || '';
		item.attributes['class'] += ' form-control bootbox-input';
		item.style = item.style || 'text';
		item.attributes['class'] += ' bootbox-input-' + item.style;
		item.attributes.type = item.style;
		item.attributes.control = item.style;
		if (item.width !== undefined) {
			item.attributes['class'] += ' col-xs-' + item.width;
		}
		if (item['class'] !== undefined) {
			item.attributes['class'] += ' ' + item['class'];
		}
		if (item.disabled !== undefined) {
			item.attributes.disabled = item.disabled;
		}
		item.attributes.onclick = "ctx.sendValues('" + item.id + "', false, false);";
		if (item.icon !== undefined) {
			var child = "<span class=\"glyphicon glyphicon-" + item.icon + "\"></span>";
			item.children.push(child);
		}
		/*if (item.value !== undefined) {
			var child = " " + item.value + " ";
			delete item.value;
			item.children.push(child);
		}*/
		if (item.badge !== undefined) {
			var child = "<span class=\"badge\">" + item.badge + "</span>";
			item.children.push(child);
		}
	}
}

ctx.types.textarea = {
	name: 'textarea',
	tag: 'textarea',
	attributes: {
	},
	init: function (item) {
		item.attributes['class'] = item.attributes['class'] || '';
		item.attributes['class'] += ' form-control';
		if (item.rows !== undefined) {
			item.attributes.rows = item.rows;
		}
		if (item.disabled !== undefined) {
			item.attributes.disabled = item.disabled;
		}
		if (item.value !== undefined) {
			var child = " " + item.value + " ";
			delete item.value;
			item.children.push(child);
		}
	}
}

