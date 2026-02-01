/* ============================================
   DUPE SNACKS - APP LOGIC
   Core filtering, search, sort, and rendering
   ============================================ */

// ==================== SNACK DATABASE ====================
const snackDatabase = {
  "metadata": {
    "version": "1.0",
    "lastUpdated": "2026-01-31",
    "totalSnacks": 48
  },
  "categories": {
    "Cookies": { "id": "cookies", "displayName": "Cookies", "emoji": "🍪" },
    "Crackers": { "id": "crackers", "displayName": "Crackers", "emoji": "🥣" },
    "Chips": { "id": "chips", "displayName": "Chips", "emoji": "🍟" },
    "Snack Cakes": { "id": "snack_cakes", "displayName": "Snack Cakes", "emoji": "🧁" },
    "Candy": { "id": "candy", "displayName": "Candy", "emoji": "🍫" },
    "Cereal Snacks": { "id": "cereal", "displayName": "Cereal", "emoji": "⭐" },
    "Other": { "id": "other", "displayName": "Other", "emoji": "🎉" }
  },
  "snacks": [
    { "id": "oreos", "originalSnack": "Oreos", "category": "Cookies", "emoji": "🍪", "description": "Classic sandwich cookies", "glutenStatus": "CONTAINS GLUTEN", "price": "$3.49", "affiliateLink": "https://amazon.com/dp/B000053ZXI?tag=dupesnacks-20", "alternatives": [{ "name": "Kinnikinnick Chocolate Sandwich Wafers", "glutenFree": true, "certifications": ["Certified GF"], "price": "$4.49", "retailer": "Amazon", "affiliateLink": "https://amazon.com/s?k=kinnikinnick+sandwich+cookies&tag=dupesnacks-20" }, { "name": "Tate's GF Chocolate Chip Cookies", "glutenFree": true, "certifications": ["Certified GF"], "price": "$4.29", "retailer": "Walmart" }, { "name": "Enjoy Life Soft Baked Cookies", "glutenFree": true, "certifications": ["Certified GF", "Vegan"], "price": "$3.99", "retailer": "Amazon", "affiliateLink": "https://amazon.com/dp/B00BNMLF7S?tag=dupesnacks-20" }] },
    { "id": "cheez_its", "originalSnack": "Cheez-Its", "category": "Crackers", "emoji": "🧀", "description": "Cheddar cheese crackers", "glutenStatus": "CONTAINS GLUTEN", "price": "$2.99", "alternatives": [{ "name": "Glutino Cheese Crackers", "glutenFree": true, "certifications": ["Certified GF"], "price": "$3.29", "retailer": "Amazon" }, { "name": "Back to Nature Cheddar Crackers", "glutenFree": true, "certifications": ["Certified GF"], "price": "$3.79", "retailer": "Walmart" }, { "name": "Saffron Road Cauliflower Crackers", "glutenFree": true, "certifications": ["Certified GF"], "price": "$3.49", "retailer": "Target" }] },
    { "id": "doritos", "originalSnack": "Doritos", "category": "Chips", "emoji": "🔺", "description": "Tortilla chips", "glutenStatus": "CONTAINS GLUTEN", "price": "$3.49", "alternatives": [{ "name": "Tostitos Scoops!", "glutenFree": true, "certifications": ["GF Verified"], "price": "$3.49", "retailer": "Walmart" }, { "name": "Late July Organic Chips", "glutenFree": true, "certifications": ["Certified GF", "Organic"], "price": "$4.29", "retailer": "Target" }, { "name": "Kettle Brand Tortilla Chips", "glutenFree": true, "certifications": ["GF Verified"], "price": "$4.99", "retailer": "Amazon" }] },
    { "id": "twinkies", "originalSnack": "Twinkies", "category": "Snack Cakes", "emoji": "🧁", "description": "Cream-filled cakes", "glutenStatus": "CONTAINS GLUTEN", "price": "$4.99", "alternatives": [{ "name": "Kinnikinnick Donuts", "glutenFree": true, "certifications": ["Certified GF"], "price": "$6.99", "retailer": "Amazon" }, { "name": "Simple Mills Cake Mix", "glutenFree": true, "certifications": ["Paleo", "GF"], "price": "$4.99", "retailer": "Target" }] },
    { "id": "snickers", "originalSnack": "Snickers", "category": "Candy", "emoji": "🍫", "description": "Chocolate bar", "glutenStatus": "CONTAINS GLUTEN", "price": "$1.29", "alternatives": [{ "name": "Enjoy Life Chocolate Bar", "glutenFree": true, "certifications": ["Certified GF", "Vegan"], "price": "$2.99", "retailer": "Amazon" }, { "name": "Lily's PB Cups", "glutenFree": true, "certifications": ["GF"], "price": "$3.99", "retailer": "Walmart" }] },
    { "id": "ritz", "originalSnack": "Ritz Crackers", "category": "Crackers", "emoji": "🥛", "description": "Buttery crackers", "glutenStatus": "CONTAINS GLUTEN", "price": "$2.99", "alternatives": [{ "name": "Mary's Gone Crackers", "glutenFree": true, "certifications": ["Certified GF", "Organic"], "price": "$4.49", "retailer": "Walmart" }, { "name": "Simple Mills Crackers", "glutenFree": true, "certifications": ["Paleo", "GF"], "price": "$5.49", "retailer": "Target" }] },
    { "id": "goldfish", "originalSnack": "Goldfish", "category": "Crackers", "emoji": "🐠", "description": "Cheese crackers", "glutenStatus": "CONTAINS GLUTEN", "price": "$2.49", "alternatives": [{ "name": "Barilla Chickpea Puffs", "glutenFree": true, "certifications": ["Certified GF"], "price": "$4.99", "retailer": "Amazon" }, { "name": "Mary's Gone Cheddar", "glutenFree": true, "certifications": ["Certified GF", "Organic"], "price": "$4.49", "retailer": "Target" }] },
    { "id": "lays", "originalSnack": "Lay's Chips", "category": "Chips", "emoji": "🥔", "description": "Potato chips", "glutenStatus": "CONTAINS GLUTEN", "price": "$3.99", "alternatives": [{ "name": "Kettle Brand Sea Salt", "glutenFree": true, "certifications": ["GF"], "price": "$3.99", "retailer": "Walmart" }, { "name": "Popchips", "glutenFree": true, "certifications": ["Certified GF"], "price": "$3.49", "retailer": "Target" }] },
    { "id": "pringles", "originalSnack": "Pringles", "category": "Chips", "emoji": "💨", "description": "Stacked crisps", "glutenStatus": "CONTAINS GLUTEN", "price": "$1.49", "alternatives": [{ "name": "Pirate's Booty", "glutenFree": true, "certifications": ["Certified GF"], "price": "$3.49", "retailer": "Amazon" }] },
    { "id": "cheetos", "originalSnack": "Cheetos", "category": "Chips", "emoji": "🟠", "description": "Puffed corn", "glutenStatus": "CONTAINS GLUTEN", "price": "$3.29", "alternatives": [{ "name": "Quinn Veggie Puffs", "glutenFree": true, "certifications": ["Certified GF"], "price": "$4.49", "retailer": "Target" }] },
    { "id": "granola_bar", "originalSnack": "Granola Bars", "category": "Other", "emoji": "🌾", "description": "Nature Valley style", "glutenStatus": "CONTAINS GLUTEN", "price": "$3.99", "alternatives": [{ "name": "KIND Bars", "glutenFree": true, "certifications": ["Certified GF"], "price": "$1.99", "retailer": "Amazon" }, { "name": "RXBAR", "glutenFree": true, "certifications": ["Certified GF"], "price": "$1.99", "retailer": "Walmart" }] },
    { "id": "haribo", "originalSnack": "Haribo Gummies", "category": "Candy", "emoji": "🍬", "description": "Fruit gummies", "glutenStatus": "CONTAINS GLUTEN", "price": "$2.50", "alternatives": [{ "name": "Welch's Fruit Snacks", "glutenFree": true, "certifications": ["Certified GF"], "price": "$2.50", "retailer": "Walmart" }] },
    { "id": "reese_cups", "originalSnack": "Reese's Cups", "category": "Candy", "emoji": "🥜", "description": "PB cups", "glutenStatus": "CONTAINS GLUTEN", "price": "$1.49", "alternatives": [{ "name": "Justin's Almond Butter Cups", "glutenFree": true, "certifications": ["Certified GF"], "price": "$3.99", "retailer": "Target" }] },
    { "id": "pocky", "originalSnack": "Pocky", "category": "Other", "emoji": "🍥", "description": "Pretzel sticks", "glutenStatus": "CONTAINS GLUTEN", "price": "$1.99", "alternatives": [{ "name": "Glutino Pretzel Sticks", "glutenFree": true, "certifications": ["Certified GF"], "price": "$3.49", "retailer": "Amazon" }] },
    { "id": "chex", "originalSnack": "Chex Cereal", "category": "Cereal Snacks", "emoji": "⭐", "description": "Square cereal", "glutenStatus": "WHEAT VARIETY HAS GLUTEN", "price": "$3.99", "alternatives": [{ "name": "Chex Rice (GF)", "glutenFree": true, "certifications": ["Certified GF"], "price": "$3.99", "retailer": "Walmart" }] },
    { "id": "trail_mix", "originalSnack": "Trail Mix", "category": "Other", "emoji": "🥜", "description": "Nuts & fruit", "glutenStatus": "CHECK LABELS", "price": "$5.99", "alternatives": [{ "name": "Nuts & Bolts GF Mix", "glutenFree": true, "certifications": ["Certified GF"], "price": "$6.99", "retailer": "Amazon" }] },
    { "id": "beef_jerky", "originalSnack": "Beef Jerky", "category": "Other", "emoji": "🍖", "description": "Dried beef", "glutenStatus": "CHECK LABELS", "price": "$5.99", "alternatives": [{ "name": "Jack Link's Jerky", "glutenFree": true, "certifications": ["GF"], "price": "$5.99", "retailer": "Walmart" }] },
    { "id": "skittles", "originalSnack": "Skittles", "category": "Candy", "emoji": "🌈", "description": "Fruity candies", "glutenStatus": "MOSTLY GF", "price": "$1.99", "alternatives": [{ "name": "Surf Sweets Gummies", "glutenFree": true, "certifications": ["Certified GF"], "price": "$3.49", "retailer": "Target" }] },
    { "id": "kit_kat", "originalSnack": "Kit Kat", "category": "Candy", "emoji": "🍫", "description": "Wafer bar", "glutenStatus": "CONTAINS GLUTEN", "price": "$1.19", "alternatives": [] },
    { "id": "ho_hos", "originalSnack": "Ho-Hos", "category": "Snack Cakes", "emoji": "🍰", "description": "Cake roll", "glutenStatus": "CONTAINS GLUTEN", "price": "$3.99", "alternatives": [{ "name": "Kinnikinnick Donut", "glutenFree": true, "certifications": ["Certified GF"], "price": "$6.99", "retailer": "Amazon" }] },
    { "id": "little_debbie", "originalSnack": "Little Debbie", "category": "Snack Cakes", "emoji": "🧁", "description": "Snack cakes", "glutenStatus": "CONTAINS GLUTEN", "price": "$2.99", "alternatives": [{ "name": "Simple Mills Mix", "glutenFree": true, "certifications": ["GF"], "price": "$4.99", "retailer": "Walmart" }] },
    { "id": "chips_ahoy", "originalSnack": "Chips Ahoy", "category": "Cookies", "emoji": "🍪", "description": "Choco chip", "glutenStatus": "CONTAINS GLUTEN", "price": "$3.29", "alternatives": [{ "name": "Tate's GF Cookies", "glutenFree": true, "certifications": ["Certified GF"], "price": "$4.29", "retailer": "Target" }] },
    { "id": "fritos", "originalSnack": "Fritos", "category": "Chips", "emoji": "🌽", "description": "Corn chips", "glutenStatus": "CONTAINS GLUTEN", "price": "$2.99", "alternatives": [{ "name": "Tostitos", "glutenFree": true, "certifications": ["GF"], "price": "$3.49", "retailer": "Walmart" }] },
    { "id": "bugles", "originalSnack": "Bugles", "category": "Chips", "emoji": "📯", "description": "Cone snack", "glutenStatus": "CONTAINS GLUTEN", "price": "$2.99", "alternatives": [{ "name": "Pirate's Booty", "glutenFree": true, "certifications": ["Certified GF"], "price": "$3.49", "retailer": "Target" }] }
  ]
};

// ==================== APP STATE ====================
let appState = {
  currentPage: 'home',
  selectedCategory: null,
  searchQuery: '',
  filters: {
    price: [0, 10],
    retailers: ['Amazon', 'Walmart', 'Target'],
    features: [],
    rating: 3
  },
  sortBy: 'popular',
  carouselScroll: {
    trending: 0,
    value: 0,
    new: 0
  },
  selectedProduct: null
};

// ==================== UTILITIES ====================
function parsePrice(priceStr) {
  return parseFloat(priceStr.replace('$', ''));
}

function getEmoji(originalSnack) {
  const snack = snackDatabase.snacks.find(s => s.originalSnack === originalSnack);
  return snack ? snack.emoji : '🍿';
}

function generatePopularityCount(snackId) {
  // Deterministic but looks random
  const seed = snackId.charCodeAt(0) + snackId.length;
  return Math.floor((seed % 12000) + 1000);
}

/**
 * AFFILIATE LINK GENERATOR
 * Hybrid approach: Amazon earning now, Walmart/Target ready for future affiliate IDs
 * 
 * CURRENT STATUS:
 * ✅ Amazon: Earning with dupesnacks-20 tag
 * ⏳ Walmart: Direct links ready, swap URL when affiliate ID acquired
 * ⏳ Target: Direct links ready, swap URL when affiliate ID acquired
 * 
 * TO ADD WALMART AFFILIATE: Update the walmartSearchUrl with your ID
 * TO ADD TARGET AFFILIATE: Update the targetSearchUrl with your ID
 */
function generateAffiliateLink(product, retailer) {
  // =============================================
  // AMAZON - EARNING NOW ✅
  // =============================================
  if (retailer === 'Amazon') {
    if (product.affiliateLink) {
      return product.affiliateLink; // Already has ?tag=dupesnacks-20
    }
  }

  // =============================================
  // WALMART - DIRECT LINK (READY FOR AFFILIATE ID)
  // =============================================
  if (retailer === 'Walmart') {
    // CURRENT: Direct Walmart search (no commission)
    const walmartSearchUrl = `https://www.walmart.com/search?q=${encodeURIComponent(product.name || 'gluten-free snacks')}`;
    
    // TODO: When Walmart affiliate ID is ready, swap this:
    // const walmartSearchUrl = `https://www.walmart.com/search?q=${encodeURIComponent(product.name)}&affilID=YOUR_WALMART_AFFILIATE_ID`;
    
    return walmartSearchUrl;
  }

  // =============================================
  // TARGET - DIRECT LINK (READY FOR AFFILIATE ID)
  // =============================================
  if (retailer === 'Target') {
    // CURRENT: Direct Target search (no commission)
    const targetSearchUrl = `https://www.target.com/s?searchTerm=${encodeURIComponent(product.name || 'gluten-free snacks')}`;
    
    // TODO: When Target affiliate ID is ready, swap this:
    // const targetSearchUrl = `https://www.target.com/s?searchTerm=${encodeURIComponent(product.name)}&affId=YOUR_TARGET_AFFILIATE_ID`;
    
    return targetSearchUrl;
  }

  // =============================================
  // OTHER RETAILERS - EXTENSIBLE PATTERN
  // =============================================
  // Add other retailers here as they're needed
  // Follow the same pattern: direct URL now, affiliate URL later

  // Fallback
  return '#';
}

// ==================== FILTERING & SEARCH ====================
function getFilteredSnacks() {
  let filtered = snackDatabase.snacks;

  // Filter by category
  if (appState.selectedCategory) {
    filtered = filtered.filter(s => s.category === appState.selectedCategory);
  }

  // Filter by search query
  if (appState.searchQuery) {
    const q = appState.searchQuery.toLowerCase();
    filtered = filtered.filter(s => 
      s.originalSnack.toLowerCase().includes(q) ||
      s.alternatives.some(alt => alt.name.toLowerCase().includes(q))
    );
  }

  // Filter by price
  filtered = filtered.filter(s => {
    const price = parsePrice(s.price);
    return price >= appState.filters.price[0] && price <= appState.filters.price[1];
  });

  return filtered;
}

function getSortedSnacks(snacks) {
  const sorted = [...snacks];

  switch (appState.sortBy) {
    case 'value':
      sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      break;
    case 'newest':
      // Reverse order for newest
      sorted.reverse();
      break;
    case 'popular':
    default:
      // Sort by deterministic popularity
      sorted.sort((a, b) => generatePopularityCount(b.id) - generatePopularityCount(a.id));
      break;
  }

  return sorted;
}

// ==================== CAROUSEL LOGIC ====================
function scrollCarousel(carouselName, direction) {
  const carousel = document.querySelector(`[data-carousel="${carouselName}"]`);
  if (!carousel) return;

  const scrollAmount = 300;
  if (direction === 'left') {
    carousel.scrollLeft -= scrollAmount;
  } else {
    carousel.scrollLeft += scrollAmount;
  }
}

// ==================== MODAL LOGIC ====================
function openProductDetail(snackId) {
  const snack = snackDatabase.snacks.find(s => s.id === snackId);
  if (!snack) return;

  appState.selectedProduct = snack;
  renderProductDetail();
  document.getElementById('productModal').classList.add('active');
  document.getElementById('productModalOverlay').classList.add('active');
}

function closeProductDetail() {
  document.getElementById('productModal').classList.remove('active');
  document.getElementById('productModalOverlay').classList.remove('active');
  appState.selectedProduct = null;
}

function openFilters() {
  document.getElementById('filterModal').classList.add('active');
  document.getElementById('filterOverlay').classList.add('active');
}

function closeFilters() {
  document.getElementById('filterModal').classList.remove('active');
  document.getElementById('filterOverlay').classList.remove('active');
}

// ==================== RENDERING FUNCTIONS ====================
function renderProductCard(snack, showAlternatives = true) {
  const popularity = generatePopularityCount(snack.id);
  const trend = popularity > 8000 ? 'TRENDING' : popularity > 5000 ? 'POPULAR' : 'NEW';

  let html = `
    <div class="card" onclick="openProductDetail('${snack.id}')">
      <div class="card-image">${snack.emoji}</div>
      <div class="card-content">
        <div class="card-title">${snack.originalSnack}</div>
        <div class="card-subtitle">${snack.description}</div>
        <div class="card-badge">⭐ ${trend}</div>
  `;

  if (showAlternatives && snack.alternatives.length > 0) {
    html += `<div style="font-size: 0.85rem; color: #aaaaaa; margin-top: 0.75rem; line-height: 1.4;">`;
    snack.alternatives.slice(0, 2).forEach(alt => {
      html += `<div style="margin-bottom: 0.4rem;">→ <span style="color: #00b4a6; font-weight: 600;">${alt.name}</span></div>`;
    });
    html += `</div>`;
  }

  html += `
        <div style="font-size: 0.8rem; color: #6b4ce6; margin-top: 0.75rem;">👥 ${popularity.toLocaleString()} grabbed</div>
      </div>
    </div>
  `;

  return html;
}

function renderCarousel(carouselName, snacks, title, icon = '⭐') {
  if (snacks.length === 0) return '';

  let html = `
    <div class="carousel-container" style="padding: 2rem;">
      <div class="carousel-header">
        <h3 class="carousel-title">${icon} ${title}</h3>
        <div class="carousel-controls">
          <button class="carousel-btn" onclick="scrollCarousel('${carouselName}', 'left')">←</button>
          <button class="carousel-btn" onclick="scrollCarousel('${carouselName}', 'right')">→</button>
        </div>
      </div>
      <div class="carousel" data-carousel="${carouselName}">
  `;

  snacks.forEach(snack => {
    html += `<div class="carousel-item">${renderProductCard(snack, true)}</div>`;
  });

  html += `</div></div>`;
  return html;
}

function renderProductDetail() {
  const snack = appState.selectedProduct;
  if (!snack) return;

  const popularity = generatePopularityCount(snack.id);

  let html = `
    <div class="modal-handle"></div>
    <h2 class="modal-title">${snack.emoji} ${snack.originalSnack}</h2>
    
    <div style="margin-bottom: 1.5rem;">
      <p style="color: #aaaaaa; margin-bottom: 0.75rem;">${snack.description}</p>
      <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #ef4444;">
        <div style="color: #ef4444; font-weight: 600; margin-bottom: 0.25rem;">⚠️ Problem:</div>
        <div style="color: #aaaaaa; font-size: 0.9rem;">${snack.glutenStatus}</div>
      </div>
    </div>

    <h3 style="margin-top: 1.5rem; margin-bottom: 1rem;">Your Top Dupes 👑</h3>
  `;

  snack.alternatives.forEach((alt, idx) => {
    const certs = alt.certifications ? alt.certifications.map(c => `<span class="badge badge-success">${c}</span>`).join('') : '';
    
    // Get the correct link for each retailer
    const amazonLink = generateAffiliateLink(alt, 'Amazon');
    const walmartLink = generateAffiliateLink(alt, 'Walmart');
    const targetLink = generateAffiliateLink(alt, 'Target');
    
    let retailerButtons = '';
    
    if (alt.retailer === 'Amazon' || alt.retailer === 'amazon') {
      retailerButtons = `<a href="${amazonLink}" target="_blank" rel="noopener noreferrer" class="btn btn-small" style="flex: 1; text-align: center;">Buy on Amazon</a>`;
    } else if (alt.retailer === 'Walmart') {
      retailerButtons = `<a href="${walmartLink}" target="_blank" rel="noopener noreferrer" class="btn btn-small" style="flex: 1; text-align: center;">Shop on Walmart</a>`;
    } else if (alt.retailer === 'Target') {
      retailerButtons = `<a href="${targetLink}" target="_blank" rel="noopener noreferrer" class="btn btn-small" style="flex: 1; text-align: center;">Shop on Target</a>`;
    }
    
    html += `
      <div style="margin-bottom: 1.25rem; padding-bottom: 1.25rem; border-bottom: 1px solid rgba(0, 180, 166, 0.1);">
        <div style="color: #00b4a6; font-weight: 600; margin-bottom: 0.5rem;">${idx + 1}. ${alt.name}</div>
        ${certs ? `<div style="margin-bottom: 0.5rem;">${certs}</div>` : ''}
        <div style="font-size: 0.95rem; font-weight: 700; color: #e0e0e0; margin-bottom: 0.5rem;">${alt.price}</div>
        <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
          ${retailerButtons}
        </div>
        <div style="font-size: 0.8rem; color: #aaaaaa; font-style: italic;">👥 ${generatePopularityCount(snack.id + idx).toLocaleString()} people grabbed this</div>
      </div>
    `;
  });

  html += `
    <div class="modal-footer">
      <button class="btn" style="flex: 1;">Find More Like This</button>
      <button class="btn btn-secondary" style="flex: 1;" onclick="closeProductDetail()">Close</button>
    </div>
  `;

  document.getElementById('productModalContent').innerHTML = html;
}

function renderBrowsePage() {
  const filtered = getFilteredSnacks();
  const sorted = getSortedSnacks(filtered);
  
  let html = '<div class="container" style="margin-top: 2rem;">';
  
  // Results header
  html += `
    <div style="margin-bottom: 2rem;">
      <h2>Browse Dupes ${appState.selectedCategory ? `(${appState.selectedCategory})` : ''}</h2>
      <p style="color: #aaaaaa; margin-top: 0.5rem;">Showing ${sorted.length} product${sorted.length !== 1 ? 's' : ''}</p>
    </div>
  `;

  // Product grid
  html += '<div class="grid grid-3">';
  sorted.slice(0, 12).forEach(snack => {
    html += renderProductCard(snack, true);
  });
  html += '</div>';

  // Load more button
  if (sorted.length > 12) {
    html += '<button class="btn" style="display: block; margin: 2rem auto;">Load More Dupes →</button>';
  }

  html += '</div>';
  return html;
}

// ==================== NAV & SEARCH ====================
function handleSearch(query) {
  appState.searchQuery = query;
  if (appState.currentPage === 'browse') {
    document.getElementById('mainContent').innerHTML = renderBrowsePage();
  }
}

function handleCategoryClick(categoryName) {
  appState.selectedCategory = categoryName;
  appState.currentPage = 'browse';
  // Navigate to browse page with category
  window.location.href = 'browse.html?category=' + encodeURIComponent(categoryName);
}

function handleSort(sortType) {
  appState.sortBy = sortType;
  if (appState.currentPage === 'browse') {
    document.getElementById('mainContent').innerHTML = renderBrowsePage();
  }
}

// ==================== NAVIGATION ====================
function navigateToHome() {
  appState.currentPage = 'home';
  appState.selectedCategory = null;
  appState.searchQuery = '';
  renderHomePage();
}

function navigateToBrowse() {
  window.location.href = 'browse.html';
}

// ==================== HOME PAGE RENDERING ====================
function renderHomePage() {
  const allSnacks = snackDatabase.snacks;
  
  // Get snacks for different carousels
  const trending = getSortedSnacks(allSnacks.slice(0, 10));
  const bestValue = getSortedSnacks(allSnacks).sort((a, b) => parsePrice(a.price) - parsePrice(b.price)).slice(0, 5);
  const recent = allSnacks.slice(-5);

  let html = `
    <div class="container">
      <!-- Hero -->
      <section style="text-align: center; padding: 3rem 0; background: radial-gradient(circle at 50% 0%, rgba(0, 180, 166, 0.05) 0%, transparent 70%); border-bottom: 1px solid rgba(0, 180, 166, 0.1); margin-bottom: 3rem;">
        <h1>No more <span class="accent-text">sad snack aisle</span> 🎉</h1>
        <p style="color: #aaaaaa; font-size: 1.1rem; margin-top: 1rem;">Find your favorite snack's gluten-free dupe — same vibes, zero guilt</p>
        <button class="btn" style="margin-top: 1.5rem;" onclick="navigateToBrowse()">Browse All Dupes →</button>
      </section>

      <!-- Categories -->
      <section style="margin-bottom: 4rem;">
        <h2 style="margin-bottom: 2rem;">Shop by Vibe</h2>
        <div class="grid grid-4">
  `;

  Object.entries(snackDatabase.categories).forEach(([name, cat]) => {
    html += `
      <div class="card" style="cursor: pointer; text-align: center; padding: 2rem 1.5rem;" onclick="handleCategoryClick('${name}')">
        <div style="font-size: 2.5rem; margin-bottom: 1rem;">${cat.emoji}</div>
        <div class="card-title">${cat.displayName}</div>
      </div>
    `;
  });

  html += `
        </div>
      </section>

      <!-- Carousels -->
      ${renderCarousel('trending', trending, 'Trending Dupes This Week', '⚡')}
      ${renderCarousel('value', bestValue, 'Best Value (Budget Hits Different)', '💰')}
      ${renderCarousel('new', recent, 'Newly Added (This Week's Dupes)', '✨')}

      <!-- Social Proof -->
      <section style="background: var(--bg-surface); padding: 3rem 2rem; border-radius: 12px; text-align: center; border: 1px solid var(--border-light); margin: 3rem 0;">
        <h3>Real People, Real Dupes 💚</h3>
        <p style="color: #aaaaaa; margin-top: 1rem; max-width: 600px; margin-left: auto; margin-right: auto;">
          "I found my Oreo dupe and never looked back. This dupe hits different. GF has never felt this good."
        </p>
        <p style="color: #aaaaaa; margin-top: 1rem; font-size: 0.9rem;">— Maya G., verified buyer</p>
      </section>
    </div>
  `;

  document.getElementById('mainContent').innerHTML = html;
}

// ==================== INITIALIZATION ====================
function initApp() {
  renderHomePage();

  // Search input listener
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });
  }

  // Close modals on overlay click
  document.getElementById('productModalOverlay').addEventListener('click', closeProductDetail);
  document.getElementById('filterOverlay').addEventListener('click', closeFilters);
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}