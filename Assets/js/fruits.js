
document.addEventListener('DOMContentLoaded', () => {
  const categoryList = document.getElementById('categoryList');
  const fruitCards = document.getElementById('fruitCards');
  let allData = [];
  let activeCategoryIndex = 0;

  fetch('Data/fruits.json')
    .then(res => res.json())
    .then(data => {
      allData = data;
      renderCategories();
      renderFruits(allData[0].items);
    });

  function renderCategories() {
    categoryList.innerHTML = '';
    allData.forEach((category, index) => {
      const div = document.createElement('div');
      div.className = `flex items-center gap-2 py-3 border-b border-dotted border-gray-400 cursor-pointer transition-colors ${
        index === activeCategoryIndex ? 'font-bold text-green-700' : 'hover:text-green-700'
      }`;
      div.innerHTML = `
        <img src="${category.icon}" alt="${category.name}" class="w-8 h-8">
        <span>${category.name}</span>
      `;
      div.addEventListener('click', () => {
        activeCategoryIndex = index;
        renderCategories();
        renderFruits(category.items);
      });
      categoryList.appendChild(div);
    });
  }

  function renderFruits(items) {
    fruitCards.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-white shadow rounded-lg overflow-hidden p-4 space-y-2';

            card.innerHTML = `
            <!-- Image -->
            <img src="${item.image}" alt="${item.name}" class="w-full h-64 object-cover rounded-md">

            <!-- Name and Price -->
            <div class="flex justify-between items-center mt-2">
                <h3 class="font-semibold text-lg text-gray-800">${item.name}</h3>
                <span class="text-sm font-medium text-green-600">${item.price}</span>
            </div>

            <!-- Stars and Description -->
            <div class="flex justify-between items-start text-sm text-gray-600">
                <!-- Static 5 stars -->
                <div class="text-[#034200] flex gap-1">
                    ${'★'.repeat(5)}
                </div>
                <p class="text-right w-2/3">${item.description}</p>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-between mt-3">
                <button class="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition">Order Now</button>
                <button class="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition">Add to Basket</button>
            </div>
            `;

            fruitCards.appendChild(card);
        });
    }
});

