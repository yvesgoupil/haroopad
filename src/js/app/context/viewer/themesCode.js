define([
    'context/util'
    ], function(util) {

    var gui = require('nw.gui');
    var Menu = new gui.Menu();
    var themes = global.THEMES.code;

    function add(item) {
      Menu.append(item);
    }

    themes.forEach(function(theme) {
      add(util.menuItem({
        label: theme,
        click: function() {
          window.parent.ee.emit('context.viewer.theme.code', this.label);
        }
      }));
    });

    return Menu;
});