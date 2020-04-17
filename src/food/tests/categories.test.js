const categories = require('../categories');
const data = [
  'Milchprodukte',
  'Getreideprodukte',
  'Fleischprodukte',
  'Obst',
  'Gemüse',
  'Süßigkeiten',
  'Nüsse',
  'Getränke',
];

test('should return an Array', () => {
  expect(categories.getCategories()).toEqual(data);
});

test('should contain Gemüse in list of categories', () => {
  expect(categories.getCategories()).toContain('Gemüse');
  expect(new Set(categories.getCategories())).toContain('Gemüse');
});
