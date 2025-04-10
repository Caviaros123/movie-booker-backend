// articles

const articles = [
  { id: 1, title: 'Article 1', price: 10, category: 'tech' },
  { id: 2, title: 'Article 2', price: 20, category: 'food' },
  { id: 3, title: 'Article 3', price: 30, category: 'tech' },
  { id: 4, title: 'Article 4', price: 40, category: 'clothing' },
  { id: 5, title: 'Article 5', price: 50, category: 'tech' },
];

function filterItems(items, criteria) {
  return items.filter((item) => {
    for (const [key, value] of Object.entries(criteria)) {
      if (typeof value === 'function') {
        if (!value(item[key])) return false;
      } else if (item[key] !== value) return false;
    }
    return true;
  });
}

const expensiveItems = filterItems(articles, {
  price: (value) => value > 25,
});
console.log('Articles chers:', expensiveItems);

const techItems = filterItems(articles, {
  category: 'tech',
});
console.log('Articles tech:', techItems);

const expensiveTechItems = filterItems(articles, {
  price: (value) => value > 25,
  category: 'tech',
});
console.log('Articles tech chers:', expensiveTechItems);

const titleFilteredItems = filterItems(articles, {
  title: (value) => value.includes('Article'),
});
console.log('Articles avec "Article" dans le titre:', titleFilteredItems);
