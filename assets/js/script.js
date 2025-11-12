// Данные для категорий
const categories = [
    {
        id: 1,
        name: "Упаковка и этикетки",
        description: "Банки, бутылки, коробки, этикетки, стикеры",
        icon: "📦"
    },
    {
        id: 2,
        name: "Сырьё для handmade",
        description: "Воск, фитили, аромамасла, клей, ткань, нитки",
        icon: "🛠️"
    },
    {
        id: 3,
        name: "Продукты питания",
        description: "Мёд, варенье, мука, крупы, молочка от фермеров",
        icon: "🍯"
    },
    {
        id: 4,
        name: "Хозтовары и химия",
        description: "Моющие средства, перчатки, мешки, салфетки",
        icon: "🧼"
    },
    {
        id: 5,
        name: "Оборудование",
        description: "Кофемашины, блендеры, принтеры этикеток",
        icon: "⚙️"
    },
    {
        id: 6,
        name: "Заготовки и полуфабрикаты",
        description: "Тесто, пельмени, соусы, заготовки на зиму",
        icon: "🥟"
    }
];

// Данные для товаров
const products = [
    {
        id: 1,
        name: "Стеклянные банки для варенья 0.5л с винтовой крышкой",
        seller: {
            name: "ПосудаКомплект",
            logo: "ПК",
            rating: 4
        },
        price: 45,
        minOrder: 50,
        delivery: ["pickup", "terminal"],
        tags: ["#длямастеров", "#толькоИП"],
        category: "packaging",
        image: "assets/images/placeholder.jpg"
    },
    {
        id: 2,
        name: "Натуральный цветочный мёд в сотах, 1 кг",
        seller: {
            name: "МедовыйПосёлок",
            logo: "МП",
            rating: 5
        },
        price: 650,
        minOrder: 10,
        delivery: ["door"],
        tags: ["#фермерскийопт", "#толькоИП"],
        category: "food",
        image: "assets/images/placeholder.jpg"
    },
    {
        id: 3,
        name: "Самоклеящиеся этикетки для продуктов 70x50 мм",
        seller: {
            name: "ПолиграфЭтикетка",
            logo: "ПЭ",
            rating: 4
        },
        price: 1.20,
        minOrder: 1000,
        delivery: ["pickup", "terminal", "door"],
        tags: ["#длямастеров", "#толькоИП"],
        category: "packaging",
        image: "assets/images/placeholder.jpg"
    },
    {
        id: 4,
        name: "Пчелиный воск для свечей, брикеты по 500 г",
        seller: {
            name: "ВоскСвечной",
            logo: "ВС",
            rating: 4
        },
        price: 320,
        minOrder: 20,
        delivery: ["pickup", "terminal"],
        tags: ["#длямастеров", "#фермерскийопт"],
        category: "raw",
        image: "assets/images/placeholder.jpg"
    }
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadProducts();
    setupEventListeners();
});

// Загрузка категорий
function loadCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
        `;
        
        categoryCard.addEventListener('click', function() {
            window.location.href = `pages/catalog.html?category=${category.id}`;
        });
        
        categoriesGrid.appendChild(categoryCard);
    });
}

// Загрузка товаров
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="seller-info">
                    <div class="seller-logo">${product.seller.logo}</div>
                    <div class="seller-name">${product.seller.name}</div>
                    <div class="rating">${getRatingStars(product.seller.rating)}</div>
                </div>
                <h3 class="product-title">${product.name}</h3>
                <div class="pricing">
                    <div class="price">${product.price} ${typeof product.price === 'number' && product.price < 10 ? 'руб/шт' : 'руб'}</div>
                    <div class="min-order">Мин. заказ: ${product.minOrder} ${typeof product.minOrder === 'number' && product.minOrder < 20 ? 'шт' : 'кг'}</div>
                </div>
                <div class="delivery-options">
                    ${getDeliveryOptions(product.delivery)}
                </div>
                <div class="tags">
                    ${product.tags.map(tag => `<div class="tag">${tag}</div>`).join('')}
                </div>
                <div class="product-actions">
                    <button class="btn btn-outline btn-small favorite-btn">В избранное</button>
                    <button class="btn btn-primary btn-small request-btn">Запросить цену</button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Добавляем обработчики для кнопок товаров
    setupProductButtons();
}

// Получение звезд рейтинга
function getRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    return stars;
}

// Получение опций доставки
function getDeliveryOptions(deliveryTypes) {
    const deliveryLabels = {
        'pickup': 'Самовывоз',
        'terminal': 'До терминала',
        'door': 'До двери'
    };
    
    return deliveryTypes.map(type => 
        `<div class="delivery-option">${deliveryLabels[type]}</div>`
    ).join('');
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Кнопки авторизации
    document.getElementById('loginBtn').addEventListener('click', function() {
        window.location.href = 'pages/auth.html?type=login';
    });
    
    document.getElementById('registerBtn').addEventListener('click', function() {
        window.location.href = 'pages/auth.html?type=register';
    });
    
    // Кнопка "Начать покупки"
    document.getElementById('startShoppingBtn').addEventListener('click', function() {
        window.location.href = 'pages/catalog.html';
    });
    
    // Кнопка верификации
    document.getElementById('verifyBtn').addEventListener('click', function() {
        alert('Для прохождения верификации необходимо предоставить ИНН юридического лица или индивидуального предпринимателя');
    });
    
    // Поиск
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Фильтры
    document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);
}

// Настройка кнопок товаров
function setupProductButtons() {
    // Кнопки избранного
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'В избранное') {
                this.textContent = 'В избранном';
                this.style.backgroundColor = '#FF6B00';
                this.style.color = 'white';
            } else {
                this.textContent = 'В избранное';
                this.style.backgroundColor = 'transparent';
                this.style.color = '#0066CC';
            }
        });
    });
    
    // Кнопки запроса цены
    const requestButtons = document.querySelectorAll('.request-btn');
    requestButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Для запроса цены необходимо пройти верификацию');
        });
    });
}

// Поиск товаров
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm) {
        window.location.href = `pages/catalog.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

// Применение фильтров
function applyFilters() {
    const category = document.getElementById('category').value;
    const minOrder = document.getElementById('min-order').value;
    const sellerType = document.getElementById('seller-type').value;
    const delivery = document.getElementById('delivery').value;
    const tags = document.getElementById('tags').value;
    
    // В реальном приложении здесь будет запрос к серверу
    console.log('Применены фильтры:', {
        category, minOrder, sellerType, delivery, tags
    });
    
    alert('Фильтры применены. В реальном приложении здесь будет обновление списка товаров.');
}

// Утилиты для работы с localStorage
const storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Ошибка сохранения в localStorage:', e);
        }
    },
    
    get: function(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error('Ошибка чтения из localStorage:', e);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Ошибка удаления из localStorage:', e);
        }
    }
};
