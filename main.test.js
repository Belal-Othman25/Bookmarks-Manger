const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html><html><body>
    <div class="category-buttons"><div></div></div>
</body></html>`);
global.document = dom.window.document;
global.window = dom.window;
global.localStorage = {
    getItem: function(key) {
        return this[key] || null;
    },
    setItem: function(key, value) {
        this[key] = value;
    },
    removeItem: function(key) {
        delete this[key];
    }
};

const { displayCategoryButtons } = require('./main');

describe('displayCategoryButtons', function() {
    beforeEach(function() {
        localStorage.removeItem('bookmarks');
        localStorage.removeItem('active-category');
        document.querySelector('.category-buttons div').innerHTML = '';
    });
});
