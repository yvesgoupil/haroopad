define([
    'context/util'
    ], function(util) {

    var gui = require('nw.gui');
    var Menu = new gui.Menu();

    function add(item) {
      Menu.append(item);
    }

    add(util.menuItem({
      label: i18n.t('Flickr.com'),
      click: function() {
        window.parent.ee.emit('context.viewer.embed', this.label);
      }
    }));

    add(util.menuItem({
      label: i18n.t('Weheartit.com'),
      click: function() {
        window.parent.ee.emit('context.viewer.embed', this.label);
      }
    }));

    return Menu;
});