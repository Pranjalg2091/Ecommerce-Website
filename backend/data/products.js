const commonGrindingSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
  "7:00 PM - 8:00 PM",
  "8:00 PM - 9:00 PM",
];

const products = [
  // ===================== WHEAT PRODUCTS =====================
  {
    name: "Sharbati Wheat Premium",
    description:
      "Sharbati Wheat is one of the finest and most premium varieties of wheat cultivated in the fertile lands of Sehore, Madhya Pradesh. Known for its golden shine and superior grain quality, it is highly valued for making soft, fluffy, and long-lasting rotis. This wheat is carefully sourced from trusted farmers and undergoes multiple stages of cleaning and quality checks to ensure purity and consistency. Its rich nutritional profile makes it ideal for daily consumption, supporting a healthy lifestyle while delivering exceptional taste in every meal.",
    category: "Wheat",
    sku: "WHEAT-001",
    countInStock: 20,
    origin: "Sehore, Madhya Pradesh, India",
    rating: 4.6,
    reviews: 132,
    sizes: [
      {
        weight: "5kg",
        price: 260,
        originalPrice: 320,
      },
      {
        weight: "10kg",
        price: 510,
        originalPrice: 620,
      },
      {
        weight: "25kg",
        price: 1250,
        originalPrice: 1500,
      },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=1",
        altText: "Sharbati Wheat Premium - Golden grains of high quality",
      },
      {
        url: "https://picsum.photos/600/600?random=2",
        altText: "Sharbati Wheat Premium - Close-up of golden grains",
      },
      {
        url: "https://picsum.photos/600/600?random=3",
        altText: "Sharbati Wheat Premium - Freshly harvested wheat grains",
      },
      {
        url: "https://picsum.photos/600/600?random=4",
        altText: "Sharbati Wheat Premium - Packaged wheat ready for delivery",
      },
    ],
    features: [
      "Premium quality Sharbati wheat sourced directly from trusted farms ensuring consistency and superior taste.",
      "Produces extremely soft, fluffy and long-lasting rotis that remain fresh for hours.",
      "Naturally rich in dietary fiber, protein, and essential nutrients for a balanced diet.",
      "Carefully cleaned and processed using hygienic methods to remove impurities and ensure safety.",
      "Perfect for daily household consumption and making traditional Indian breads.",
    ],
    nutrition: {
      energy:
        "Approx. 340 kcal per 100g providing sustained energy throughout the day.",
      protein:
        "Around 12 g per 100g helping in muscle maintenance and overall health.",
      carbs: "Approximately 72 g per 100g acting as a primary energy source.",
      fiber: "About 10 g per 100g supporting digestion and gut health.",
    },
    storage:
      "Store in an airtight container in a cool, dry place away from direct sunlight and moisture. Proper storage helps maintain freshness, prevents infestation, and ensures long shelf life.",
    grindingSlots: commonGrindingSlots,
    isFeatured: true,
    isPublished: true,
  },

  {
    name: "Lokwan Wheat Classic",
    description:
      "Lokwan Wheat is a popular and widely consumed variety known for its affordability and consistent performance in everyday cooking. It offers a balanced combination of taste, texture, and nutrition, making it a perfect choice for households looking for reliable wheat. Carefully sourced and processed, this wheat ensures purity and quality while delivering good results in making chapatis and other traditional Indian foods.",
    category: "Wheat",
    sku: "WHEAT-002",
    countInStock: 150,
    origin: "Madhya Pradesh, India",
    rating: 4.3,
    reviews: 98,
    sizes: [
      {
        weight: "5kg",
        price: 240,
        originalPrice: 290,
      },
      {
        weight: "10kg",
        price: 470,
        originalPrice: 560,
      },
      {
        weight: "25kg",
        price: 1150,
        originalPrice: 1350,
      },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=5",
        altText:
          "Lokwan Wheat Classic - High-quality wheat grains for everyday use",
      },
      {
        url: "https://picsum.photos/600/600?random=6",
        altText:
          "Lokwan Wheat Classic - Close-up of wheat grains showcasing quality",
      },
      {
        url: "https://picsum.photos/600/600?random=7",
        altText: "Lokwan Wheat Classic - Freshly harvested wheat grains",
      },
      {
        url: "https://picsum.photos/600/600?random=8",
        altText: "Lokwan Wheat Classic - Packaged wheat ready for delivery",
      },
    ],
    features: [
      "Economical and high-quality wheat suitable for everyday use.",
      "Provides good taste and texture for making soft chapatis.",
      "Processed under hygienic conditions ensuring safety and purity.",
      "Consistent grain quality across every batch.",
      "Ideal for large families and regular consumption.",
    ],
    nutrition: {
      energy: "Approx. 330 kcal per 100g supporting daily energy needs.",
      protein: "11 g per 100g contributing to muscle repair and growth.",
      carbs: "70 g per 100g providing sustained energy.",
      fiber: "9 g per 100g aiding digestion and metabolism.",
    },
    storage:
      "Store in a tightly sealed container in a cool and dry place to preserve freshness and prevent spoilage or contamination.",
    grindingSlots: commonGrindingSlots,
    isFeatured: true,
    isPublished: true,
  },

  {
    name: "Aashirvaad Sharbati Wheat Select",
    description:
      "Aashirvaad Sharbati Wheat Select is a premium grade wheat sourced from the fertile regions of Sehore in Madhya Pradesh, known for producing some of the finest quality wheat in India. The grains are carefully selected for their uniform size, golden color, and superior texture. This wheat ensures soft, fluffy rotis with a rich taste and aroma that enhances everyday meals. It undergoes strict quality checks and hygienic processing to maintain purity, making it a trusted choice for families seeking both taste and nutrition in their daily diet.",
    category: "Wheat",
    sku: "WHEAT-003",
    countInStock: 100,
    origin: "Sehore, Madhya Pradesh, India",
    rating: 4.7,
    reviews: 210,
    sizes: [
      {
        weight: "5kg",
        price: 280,
        originalPrice: 340,
      },
      {
        weight: "10kg",
        price: 540,
        originalPrice: 650,
      },
      {
        weight: "25kg",
        price: 1350,
        originalPrice: 1600,
      },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=30",
        altText:
          "Aashirvaad Sharbati Wheat Select - Premium quality wheat grains",
      },
      {
        url: "https://picsum.photos/600/600?random=31",
        altText:
          "Aashirvaad Sharbati Wheat Select - Close-up of golden wheat grains",
      },
      {
        url: "https://picsum.photos/600/600?random=32",
        altText:
          "Aashirvaad Sharbati Wheat Select - Freshly harvested wheat grains",
      },
      {
        url: "https://picsum.photos/600/600?random=33",
        altText:
          "Aashirvaad Sharbati Wheat Select - Packaged wheat ready for delivery",
      },
    ],
    features: [
      "Premium Sharbati wheat with superior grain quality and consistent texture.",
      "Ensures soft and fluffy rotis with rich taste and aroma.",
      "Carefully sourced and processed to maintain purity and hygiene.",
      "Rich in essential nutrients supporting a balanced diet.",
      "Trusted brand delivering consistent quality across batches.",
    ],
    nutrition: {
      energy: "Approx. 340 kcal per 100g providing long-lasting energy.",
      protein: "12 g per 100g supporting muscle health.",
      carbs: "72 g per 100g acting as a primary energy source.",
      fiber: "10 g per 100g improving digestion and gut health.",
    },
    storage:
      "Store in a cool and dry place in an airtight container. Keep away from moisture and direct sunlight to maintain freshness and prevent contamination.",
    grindingSlots: commonGrindingSlots,
    isFeatured: true,
    isPublished: true,
  },

  {
    name: "Patanjali Whole Wheat Premium",
    description:
      "Patanjali Whole Wheat Premium is a high-quality wheat product sourced from carefully selected farms across India. Known for its purity and natural goodness, this wheat is processed using modern techniques while retaining its traditional essence. It delivers consistent quality, making it ideal for preparing soft rotis and other Indian breads. With a focus on health and wellness, this wheat provides essential nutrients required for a balanced lifestyle.",
    category: "Wheat",
    sku: "WHEAT-004",
    countInStock: 120,
    origin: "India",
    rating: 4.4,
    reviews: 140,
    sizes: [
      {
        weight: "5kg",
        price: 250,
        originalPrice: 300,
      },
      {
        weight: "10kg",
        price: 490,
        originalPrice: 580,
      },
      {
        weight: "25kg",
        price: 1200,
        originalPrice: 1400,
      },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=34",
        altText: "Patanjali Whole Wheat Premium - High-quality wheat grains",
      },
      {
        url: "https://picsum.photos/600/600?random=35",
        altText: "Patanjali Whole Wheat Premium - Close-up of wheat grains",
      },
      {
        url: "https://picsum.photos/600/600?random=36",
        altText:
          "Patanjali Whole Wheat Premium - Freshly harvested wheat grains",
      },
    ],
    features: [
      "High-quality wheat sourced from trusted farms across India.",
      "Maintains natural taste and nutritional value.",
      "Ideal for everyday consumption and cooking.",
      "Hygienically processed and packed for safety.",
      "Affordable option with consistent performance.",
    ],
    nutrition: {
      energy: "330 kcal per 100g supporting daily energy needs.",
      protein: "11 g per 100g helping in body strength.",
      carbs: "70 g per 100g providing energy.",
      fiber: "9 g per 100g aiding digestion.",
    },
    storage:
      "Keep in a sealed container in a dry and cool place. Avoid humidity and exposure to air to retain quality.",
    grindingSlots: commonGrindingSlots,
    isFeatured: true,
    isPublished: true,
  },

  {
    name: "Durum Wheat Premium Grade",
    description:
      "Durum Wheat is a hard variety of wheat known for its high protein content and firm texture. It is widely used in making pasta, semolina, and specialty Indian dishes. This premium grade durum wheat is sourced from select farms and processed carefully to retain its natural characteristics. It offers a unique taste and nutritional benefits, making it suitable for both traditional and modern cooking.",
    category: "Wheat",
    sku: "WHEAT-005",
    countInStock: 90,
    origin: "Punjab, India",
    rating: 4.5,
    reviews: 88,
    sizes: [
      {
        weight: "5kg",
        price: 300,
        originalPrice: 360,
      },
      {
        weight: "10kg",
        price: 580,
        originalPrice: 700,
      },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=37",
        altText: "Durum Wheat Premium Grade - High-protein wheat grains",
      },
      {
        url: "https://picsum.photos/600/600?random=38",
        altText: "Durum Wheat Premium Grade - Close-up of durum wheat grains",
      },
      {
        url: "https://picsum.photos/600/600?random=39",
        altText:
          "Durum Wheat Premium Grade - Freshly harvested durum wheat grains",
      },
    ],
    features: [
      "High-protein wheat ideal for specialized cooking.",
      "Firm grain texture suitable for pasta and semolina.",
      "Carefully sourced and processed for quality assurance.",
      "Rich nutritional profile supporting health.",
      "Versatile use in multiple recipes.",
    ],
    nutrition: {
      energy: "335 kcal per 100g providing sustained energy.",
      protein: "13 g per 100g higher than regular wheat.",
      carbs: "70 g per 100g for energy.",
      fiber: "8 g per 100g aiding digestion.",
    },
    storage:
      "Store in an airtight container in a cool, dry environment to preserve quality and avoid spoilage.",
    grindingSlots: commonGrindingSlots,
    isFeatured: true,
    isPublished: true,
  },

  {
    name: "Khapli Wheat Organic (Emmer)",
    description:
      "Khapli Wheat, also known as Emmer wheat, is an ancient grain known for its exceptional health benefits. It is naturally low in gluten and rich in fiber, making it suitable for individuals looking for healthier alternatives. This organic variant is sourced from chemical-free farms and minimally processed to retain maximum nutrition. It is ideal for preparing healthy rotis and traditional recipes.",
    category: "Organic Grains",
    sku: "WHEAT-006",
    countInStock: 70,
    origin: "Maharashtra, India",
    rating: 4.8,
    reviews: 110,
    sizes: [
      {
        weight: "5kg",
        price: 420,
        originalPrice: 500,
      },
      {
        weight: "10kg",
        price: 800,
        originalPrice: 950,
      },
      {
        weight: "25kg",
        price: 1900,
        originalPrice: 2200,
      },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=40",
        altText: "Khapli Wheat Organic (Emmer) - Organic wheat grains",
      },
      {
        url: "https://picsum.photos/600/600?random=41",
        altText:
          "Khapli Wheat Organic (Emmer) - Close-up of organic wheat grains",
      },
      {
        url: "https://picsum.photos/600/600?random=42",
        altText:
          "Khapli Wheat Organic (Emmer) - Freshly harvested organic wheat grains",
      },
    ],
    features: [
      "Ancient grain with superior health benefits.",
      "Low gluten content suitable for sensitive diets.",
      "High fiber content supporting digestion.",
      "Organically grown without harmful chemicals.",
      "Rich in essential nutrients and minerals.",
    ],
    nutrition: {
      energy: "320 kcal per 100g supporting balanced diet.",
      protein: "11 g per 100g for body strength.",
      carbs: "65 g per 100g providing energy.",
      fiber: "12 g per 100g improving gut health.",
    },
    storage:
      "Store in a dry, cool place in airtight containers to maintain freshness and avoid moisture exposure.",
    grindingSlots: commonGrindingSlots,
    isFeatured: true,
    isPublished: true,
  },

  {
    name: "Pillsbury Chakki Fresh Wheat Grains",
    description:
      "Pillsbury Chakki Fresh Wheat Grains are known for their consistent quality and trusted brand value. These grains are sourced from premium farms and processed with strict quality standards. The wheat ensures smooth grinding and produces soft, tasty rotis. It is ideal for households that prioritize both quality and convenience in their daily cooking needs.",
    category: "Wheat",
    sku: "WHEAT-007",
    countInStock: 110,
    origin: "India",
    rating: 4.5,
    reviews: 175,
    sizes: [
      {
        weight: "5kg",
        price: 270,
        originalPrice: 320,
      },
      {
        weight: "10kg",
        price: 520,
        originalPrice: 620,
      },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=43",
        altText:
          "Pillsbury Chakki Fresh Wheat Grains - High-quality wheat grains",
      },
      {
        url: "https://picsum.photos/600/600?random=44",
        altText:
          "Pillsbury Chakki Fresh Wheat Grains - Close-up of wheat grains",
      },
      {
        url: "https://picsum.photos/600/600?random=45",
        altText:
          "Pillsbury Chakki Fresh Wheat Grains - Freshly harvested wheat grains",
      },
    ],
    features: [
      "Trusted brand ensuring consistent wheat quality.",
      "Produces soft and delicious rotis.",
      "Carefully cleaned and processed.",
      "Ideal for daily cooking needs.",
      "Maintains freshness and taste.",
    ],
    nutrition: {
      energy: "335 kcal per 100g providing daily energy.",
      protein: "11.5 g per 100g supporting health.",
      carbs: "71 g per 100g for energy.",
      fiber: "9 g per 100g aiding digestion.",
    },
    storage:
      "Keep in airtight containers in cool and dry places. Avoid moisture and pests to maintain quality.",
    grindingSlots: commonGrindingSlots,
    isFeatured: true,
    isPublished: true,
  },

  {
    name: "MP Local Farm Wheat Natural",
    description:
      "MP Local Farm Wheat is sourced directly from small-scale farmers in Madhya Pradesh, ensuring freshness and authenticity. This wheat is known for its natural taste and minimal processing, making it a great choice for households preferring farm-to-home products. It delivers good quality rotis and retains natural nutrients due to limited processing.",
    category: "Wheat",
    sku: "WHEAT-008",
    countInStock: 95,
    origin: "Madhya Pradesh, India",
    rating: 4.2,
    reviews: 60,
    sizes: [
      {
        weight: "5kg",
        price: 230,
        originalPrice: 280,
      },
      {
        weight: "10kg",
        price: 450,
        originalPrice: 520,
      },
      {
        weight: "25kg",
        price: 950,
        originalPrice: 1200,
      },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=46",
        altText:
          "MP Local Farm Wheat Natural - Freshly harvested wheat grains from local farms",
      },
      {
        url: "https://picsum.photos/600/600?random=47",
        altText:
          "MP Local Farm Wheat Natural - Close-up of natural wheat grains from local farms",
      },
      {
        url: "https://picsum.photos/600/600?random=48",
        altText:
          "MP Local Farm Wheat Natural - Wheat grains in a rustic container",
      },
    ],
    features: [
      "Directly sourced from local farmers ensuring freshness.",
      "Minimal processing retaining natural nutrients.",
      "Affordable and reliable option for households.",
      "Good taste and texture for everyday cooking.",
      "Supports local farming communities.",
    ],
    nutrition: {
      energy: "330 kcal per 100g supporting daily nutrition.",
      protein: "10.5 g per 100g aiding health.",
      carbs: "69 g per 100g providing energy.",
      fiber: "8.5 g per 100g aiding digestion.",
    },
    storage:
      "Store in sealed containers in dry places away from sunlight and moisture to maintain freshness.",
    grindingSlots: commonGrindingSlots,
    isFeatured: true,
    isPublished: true,
  },

  // ===================== FLOUR PRODUCTS (NO GRINDING SLOTS) =====================

  {
    name: "Chakki Atta Fresh",
    description:
      "Chakki Atta is freshly ground using traditional stone grinding techniques that help retain the natural nutrients of whole wheat. This method ensures better taste, texture, and nutritional value compared to regular processed flour. The atta is soft, fine, and perfect for making fluffy and nutritious rotis. It is hygienically processed and packed to preserve freshness and quality for longer durations.",
    category: "Wheat Flour",
    sku: "ATTA-001",
    countInStock: 200,
    origin: "India",
    rating: 4.5,
    reviews: 210,
    sizes: [
      {
        weight: "5kg",
        price: 280,
        originalPrice: 330,
      },
      {
        weight: "10kg",
        price: 550,
        originalPrice: 650,
      },
      {
        weight: "25kg",
        price: 1300,
        originalPrice: 1500,
      },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=20",
        altText: "Chakki Atta Fresh - Stone-ground whole wheat flour",
      },
      {
        url: "https://picsum.photos/600/600?random=21",
        altText:
          "Chakki Atta Fresh - Close-up of finely ground whole wheat flour",
      },
      {
        url: "https://picsum.photos/600/600?random=22",
        altText:
          "Chakki Atta Fresh - Freshly ground whole wheat flour in a bowl",
      },
      {
        url: "https://picsum.photos/600/600?random=23",
        altText:
          "Chakki Atta Fresh - Packaged whole wheat flour ready for delivery",
      },
    ],
    features: [
      "Stone-ground atta preserving natural nutrients and fiber.",
      "Produces soft, fluffy and delicious rotis every time.",
      "Finely milled for smooth texture and better cooking experience.",
      "Hygienically processed and securely packed.",
      "Suitable for all types of Indian breads and dishes.",
    ],
    nutrition: {
      energy: "340 kcal per 100g supporting active lifestyle.",
      protein: "12 g per 100g aiding muscle health.",
      carbs: "72 g per 100g for energy.",
      fiber: "10 g per 100g improving digestion.",
    },
    storage:
      "Keep in a cool, dry place in an airtight container. Avoid exposure to moisture to maintain freshness and quality.",
    isFeatured: true,
      isPublished: true,
  },

  {
    name: "Multigrain Atta Healthy Mix",
    description:
      "Multigrain Atta is a nutritious blend of wheat, barley, oats, and other grains designed to provide a balanced and healthy diet. It is rich in fiber, vitamins, and minerals, making it an excellent choice for health-conscious individuals. The flour is finely milled and easy to use, delivering both taste and nutrition in every meal.",
    category: "Wheat Flour",
    sku: "ATTA-002",
    countInStock: 180,
    origin: "India",
    rating: 4.7,
    reviews: 165,
    sizes: [
      {
        weight: "5kg",
        price: 320,
        originalPrice: 380,
      },
      {
        weight: "10kg",
        price: 620,
        originalPrice: 720,
      },
      {
        weight: "25kg",
        price: 1300,
        originalPrice: 1500,
      },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=24",
        altText: "Multigrain atta mix showing blend of healthy grains",
      },
      {
        url: "https://picsum.photos/600/600?random=25",
        altText: "Close-up of multigrain flour texture with visible grains",
      },
      {
        url: "https://picsum.photos/600/600?random=26",
        altText: "Fresh rotis made from multigrain atta served hot",
      },
    ],
    features: [
      "Blend of multiple grains for enhanced nutrition.",
      "High fiber content supporting digestion and weight management.",
      "Rich in essential vitamins and minerals.",
      "Improves overall health and energy levels.",
      "Ideal for preparing healthy rotis and breads.",
    ],
    nutrition: {
      energy: "330 kcal per 100g providing balanced energy.",
      protein: "11 g per 100g supporting body strength.",
      carbs: "68 g per 100g for sustained energy.",
      fiber: "12 g per 100g improving digestion.",
    },
    storage:
      "Store in a cool, dry place in airtight containers. Keep away from moisture to retain freshness and prevent spoilage.",
    isFeatured: true,
    isPublished: true,
  },

  // ===================== FLOUR PRODUCTS (8) =====================
  {
    name: "Aashirvaad Sharbati Atta Premium",
    description:
      "Aashirvaad Sharbati Atta is made from the finest quality Sharbati wheat sourced from the fertile lands of Madhya Pradesh. Known for its superior softness and rich taste, this atta is processed using advanced grinding techniques that retain the natural nutrition of the grain. It ensures that every roti is soft, fluffy, and stays fresh for a longer duration. Carefully selected grains undergo rigorous quality checks before being ground and packed hygienically to maintain purity, freshness, and consistency in every pack.",
    category: "Wheat Flour",
    sku: "ATTA-003",
    countInStock: 180,
    origin: "Madhya Pradesh, India",
    rating: 4.7,
    reviews: 245,
    sizes: [
      { weight: "5kg", price: 310, originalPrice: 370 },
      { weight: "10kg", price: 600, originalPrice: 720 },
      { weight: "25kg", price: 1450, originalPrice: 1700 },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=30",
        altText: "Aashirvaad Sharbati Atta Premium pack front view",
      },
      {
        url: "https://picsum.photos/600/600?random=31",
        altText: "Soft rotis made from Aashirvaad Sharbati Atta",
      },
      {
        url: "https://picsum.photos/600/600?random=32",
        altText: "Fine texture of Sharbati wheat flour close-up",
      },
      {
        url: "https://picsum.photos/600/600?random=33",
        altText: "Packed Aashirvaad atta ready for kitchen use",
      },
    ],
    features: [
      "Made from premium Sharbati wheat ensuring superior taste and softness.",
      "Produces extremely soft, fluffy and long-lasting rotis.",
      "Rich in natural nutrients and dietary fiber for a balanced diet.",
      "Hygienically processed and packed to maintain purity and freshness.",
      "Trusted brand known for consistent quality across India.",
    ],
    nutrition: {
      energy:
        "Approximately 340 kcal per 100g providing long-lasting energy throughout the day.",
      protein:
        "Around 12 g per 100g supporting muscle strength and overall health.",
      carbs:
        "About 72 g per 100g serving as a primary source of energy for daily activities.",
      fiber: "Roughly 10 g per 100g aiding digestion and promoting gut health.",
    },
    storage:
      "Store in an airtight container in a cool and dry place. Keep away from moisture, heat, and direct sunlight to maintain freshness and prevent spoilage.",
    isFeatured: true,
    isPublished: true,
  },

  {
    name: "Patanjali Chakki Atta",
    description:
      "Patanjali Chakki Atta is prepared using traditional stone grinding methods that preserve the natural goodness of whole wheat. This atta retains its fiber, vitamins, and minerals, ensuring that you get both taste and nutrition in every meal.",
    category: "Wheat Flour",
    sku: "ATTA-004",
    countInStock: 200,
    origin: "India",
    rating: 4.5,
    reviews: 310,
    sizes: [
      { weight: "5kg", price: 270, originalPrice: 320 },
      { weight: "10kg", price: 530, originalPrice: 620 },
      { weight: "25kg", price: 1250, originalPrice: 1450 },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=34",
        altText: "Patanjali Chakki Atta packaging front view",
      },
      {
        url: "https://picsum.photos/600/600?random=35",
        altText: "Stone ground atta texture close-up",
      },
      {
        url: "https://picsum.photos/600/600?random=36",
        altText: "Fresh rotis made using Patanjali atta",
      },
    ],
    features: [
      "Stone-ground atta retaining natural fiber and nutrients.",
      "Produces soft and healthy rotis ideal for everyday meals.",
      "Made from carefully selected wheat grains.",
      "Free from harmful chemicals and additives.",
      "Affordable and suitable for daily household consumption.",
    ],
    nutrition: {
      energy:
        "Around 330 kcal per 100g providing essential energy for daily activities.",
      protein:
        "Approximately 11 g per 100g supporting muscle growth and repair.",
      carbs: "Nearly 70 g per 100g acting as a primary source of energy.",
      fiber: "About 9 g per 100g helping maintain digestive health.",
    },
    storage: "Keep in a tightly sealed container in a cool, dry place.",
    isFeatured: true,
    isPublished: true,
  },

  {
    name: "Pillsbury Gold Chakki Fresh Atta",
    description:
      "Pillsbury Gold Chakki Fresh Atta is a premium quality wheat flour known for its superior softness and consistency.",
    category: "Wheat Flour",
    sku: "ATTA-005",
    countInStock: 160,
    origin: "India",
    rating: 4.6,
    reviews: 280,
    sizes: [
      { weight: "5kg", price: 300, originalPrice: 350 },
      { weight: "10kg", price: 580, originalPrice: 680 },
      { weight: "25kg", price: 1350, originalPrice: 1550 },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=37",
        altText: "Pillsbury Gold Chakki Fresh Atta pack",
      },
      {
        url: "https://picsum.photos/600/600?random=38",
        altText: "Soft chapatis made from Pillsbury atta",
      },
      {
        url: "https://picsum.photos/600/600?random=39",
        altText: "Fine wheat flour texture close-up",
      },
    ],
    features: [
      "Premium quality wheat flour for soft and fluffy rotis.",
      "Consistent grinding ensuring fine texture.",
      "Maintains freshness for longer duration.",
      "Trusted brand quality.",
      "Ideal for everyday cooking.",
    ],
    nutrition: {
      energy: "Approx. 340 kcal per 100g.",
      protein: "Around 11–12 g per 100g.",
      carbs: "Nearly 72 g per 100g.",
      fiber: "About 10 g per 100g.",
    },
    storage: "Store in a cool and dry place.",
    isFeatured: true,
    isPublished: true,
  },

  {
    name: "Aashirvaad Multigrain Atta",
    description:
      "Aashirvaad Multigrain Atta is a carefully balanced blend of multiple grains including wheat, soy, oats, chana, and maize.",
    category: "Wheat Flour",
    sku: "ATTA-006",
    countInStock: 170,
    origin: "India",
    rating: 4.8,
    reviews: 198,
    sizes: [
      { weight: "5kg", price: 340, originalPrice: 400 },
      { weight: "10kg", price: 660, originalPrice: 780 },
      { weight: "25kg", price: 1550, originalPrice: 1800 },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=40",
        altText: "Aashirvaad Multigrain Atta packaging",
      },
      {
        url: "https://picsum.photos/600/600?random=41",
        altText: "Multigrain flour texture with grains",
      },
      {
        url: "https://picsum.photos/600/600?random=42",
        altText: "Healthy rotis made from multigrain atta",
      },
    ],
    features: [
      "Blend of multiple grains providing balanced nutrition.",
      "High in fiber supporting digestion.",
      "Rich in vitamins and minerals.",
      "Improves overall health.",
      "Great taste with health benefits.",
    ],
    nutrition: {
      energy: "Around 330 kcal per 100g.",
      protein: "Approximately 12 g per 100g.",
      carbs: "About 68 g per 100g.",
      fiber: "Nearly 12 g per 100g.",
    },
    storage: "Store in a cool and dry place.",
    isFeatured: true,
    isPublished: true,
  },

  {
    name: "Patanjali Multigrain Atta",
    description:
      "Patanjali Multigrain Atta is a nutritious combination of different grains providing a healthy alternative to regular flour.",
    category: "Wheat Flour",
    sku: "ATTA-007",
    countInStock: 140,
    origin: "India",
    rating: 4.4,
    reviews: 150,
    sizes: [
      { weight: "5kg", price: 310, originalPrice: 360 },
      { weight: "10kg", price: 600, originalPrice: 700 },
      { weight: "25kg", price: 1400, originalPrice: 1650 },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=43",
        altText: "Patanjali Multigrain Atta pack",
      },
      {
        url: "https://picsum.photos/600/600?random=44",
        altText: "Multigrain flour texture close-up",
      },
      {
        url: "https://picsum.photos/600/600?random=45",
        altText: "Rotis made from multigrain atta",
      },
    ],
    features: [
      "Healthy mix of grains.",
      "Supports digestion.",
      "No harmful additives.",
      "Suitable for daily use.",
      "Affordable option.",
    ],
    nutrition: {
      energy: "Approx. 320 kcal per 100g.",
      protein: "11 g per 100g.",
      carbs: "67 g per 100g.",
      fiber: "11 g per 100g.",
    },
    storage: "Store in airtight container.",
    isFeatured: true,
    isPublished: true,
  },

  {
    name: "Aashirvaad Multi Millet Atta",
    description:
      "Aashirvaad Multi Millet Atta is a premium blend of nutritious millets like ragi, jowar, and bajra combined with wheat.",
    category: "Wheat Flour",
    sku: "ATTA-008",
    countInStock: 120,
    origin: "India",
    rating: 4.7,
    reviews: 175,
    sizes: [
      { weight: "5kg", price: 360, originalPrice: 420 },
      { weight: "10kg", price: 700, originalPrice: 820 },
      { weight: "25kg", price: 1650, originalPrice: 1900 },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=46",
        altText: "Aashirvaad Multi Millet Atta packaging",
      },
      {
        url: "https://picsum.photos/600/600?random=47",
        altText: "Millet flour mix texture",
      },
      {
        url: "https://picsum.photos/600/600?random=48",
        altText: "Healthy millet rotis prepared",
      },
    ],
    features: [
      "Blend of millets and wheat.",
      "High fiber content.",
      "Rich in nutrients.",
      "Supports healthy diet.",
      "Improves wellness.",
    ],
    nutrition: {
      energy: "Approx. 330 kcal per 100g.",
      protein: "11 g per 100g.",
      carbs: "65 g per 100g.",
      fiber: "13 g per 100g.",
    },
    storage: "Store in airtight container.",
    isFeatured: true,
    isPublished: true,
  },

  {
    name: "Pillsbury Multigrain Atta",
    description:
      "Pillsbury Multigrain Atta combines multiple grains with trusted quality to deliver better nutrition and taste.",
    category: "Wheat Flour",
    sku: "ATTA-009",
    countInStock: 130,
    origin: "India",
    rating: 4.5,
    reviews: 140,
    sizes: [
      { weight: "5kg", price: 330, originalPrice: 390 },
      { weight: "10kg", price: 640, originalPrice: 760 },
      { weight: "25kg", price: 1500, originalPrice: 1750 },
    ],
    images: [
      {
        url: "https://picsum.photos/600/600?random=49",
        altText: "Pillsbury Multigrain Atta pack",
      },
      {
        url: "https://picsum.photos/600/600?random=50",
        altText: "Multigrain flour texture",
      },
      {
        url: "https://picsum.photos/600/600?random=51",
        altText: "Soft rotis made from Pillsbury atta",
      },
    ],
    features: [
      "Balanced grain blend.",
      "Soft rotis.",
      "Trusted brand.",
      "Daily use friendly.",
      "High fiber.",
    ],
    nutrition: {
      energy: "330 kcal per 100g.",
      protein: "11 g per 100g.",
      carbs: "68 g per 100g.",
      fiber: "12 g per 100g.",
    },
    storage: "Keep sealed in dry place.",
    isFeatured: true,
    isPublished: true,
  },
];

export default products;
