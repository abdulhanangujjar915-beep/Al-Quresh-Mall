import { StoreOutlet, ProductItem, ReviewItem, OrderRecord, MallNotification } from '../types/mall';

// Image references
import heroMallImg from '../assets/images/hero_alquresh_mall_1790257042317.jpg';
import menSuitImg from '../assets/images/product_men_suit_1790257058326.jpg';
import ladiesSuitImg from '../assets/images/product_ladies_suit_1790257071034.jpg';
import perfumeOudImg from '../assets/images/product_perfume_oud_1790257084303.jpg';
import cosmeticsImg from '../assets/images/product_cosmetics_creams_1790257096845.jpg';
import cosmeticsLuxuryImg from '../assets/images/cosmetics_luxury_collection_1790257643579.jpg';
import cosmeticsPowderSetImg from '../assets/images/cosmetics_powder_cream_set_1790257662973.jpg';

export const MALL_IMAGES = {
  hero: heroMallImg,
  menSuit: menSuitImg,
  ladiesSuit: ladiesSuitImg,
  perfumeOud: perfumeOudImg,
  cosmetics: cosmeticsImg,
  cosmeticsLuxury: cosmeticsLuxuryImg,
  cosmeticsPowderSet: cosmeticsPowderSetImg
};

export const MALL_INFO = {
  name: "Al Quresh Mall",
  city: "Faisalabad, Pakistan",
  area: "Millat Town",
  address: "Millat Rd, Millat Town, Faisalabad, Punjab 38000",
  plusCode: "F4R4+RP6 Faisalabad",
  googleMapsUrl: "https://maps.google.com/?q=F4R4%2BRP6,+Millat+Rd,+Millat+Town+Faisalabad,+Pakistan",
  phone: "+92 41 876 2200",
  whatsapp: "+92 300 7654321",
  timing: "11:00 AM – 11:30 PM (Mon - Sun)",
  fridayBreak: "1:00 PM – 2:30 PM (Jumma Prayer Break)",
  facilities: [
    { title: "High-Speed Passenger Elevators", desc: "Smooth spacious lifts serving all floors with full wheelchair & senior accessibility", icon: "lift" },
    { title: "24/7 Security & CCTV Surveillance", desc: "Trained security personnel and active HD camera coverage across all corridors", icon: "shield" },
    { title: "Munasib & Wholesale Prices", desc: "Direct manufacturer & wholesale rates with fixed transparent pricing on all items", icon: "tag" },
    { title: "Central Air Conditioning", desc: "Pleasant, climate-controlled family shopping atmosphere all year round", icon: "air" },
    { title: "Executive Masjid & Prayer Hall", desc: "Spacious separate prayer and wudu facilities for ladies and gentlemen on 3rd floor", icon: "mosque" },
    { title: "Dedicated Basement Parking", desc: "Secure parking for cars and motorbikes with on-site security guards", icon: "car" }
  ]
};

export const STORE_OUTLETS: StoreOutlet[] = [
  {
    id: "g-10",
    name: "Glow & Glamour Cosmetics & Skincare",
    unitNumber: "Unit G-10",
    floor: "Ground Floor",
    category: "cosmetics",
    description: "Original branded whitening creams, matte mineral compact powders, skin serums, moisturizers, and bridal cosmetic makeup kits.",
    phone: "+92 321 9901145",
    whatsapp: "+923219901145",
    openingHours: "11:00 AM - 11:30 PM",
    rating: 4.9,
    reviewsCount: 195,
    discountActive: true,
    discountBadge: "Buy 1 Get 1 Rose Mist",
    discountCode: "GLOWBEAUTY",
    discountPercent: 15,
    mapX: 82,
    mapY: 68,
    nearestLift: "Elevator B (12 meters)",
    walkingGuide: "Ground floor south wing, directly facing the cosmetics gallery next to Elevator B.",
    image: cosmeticsLuxuryImg,
    featuredTags: ["Whitening Cream", "Face Powder", "Bridal Makeup", "Skincare Serums"]
  },
  {
    id: "g-01",
    name: "Royal Al-Quresh Bespoke Menswear",
    unitNumber: "Unit G-01",
    floor: "Ground Floor",
    category: "mens_fashion",
    description: "Premium tailor-made 3-piece suits, luxury prince coats, festive sherwanis, and Italian wool cuts with custom fitting.",
    phone: "+92 301 8892110",
    whatsapp: "+923018892110",
    openingHours: "11:00 AM - 11:30 PM",
    rating: 4.9,
    reviewsCount: 142,
    discountActive: true,
    discountBadge: "Flat 20% OFF",
    discountCode: "ALQURESH20",
    discountPercent: 20,
    mapX: 28,
    mapY: 34,
    nearestLift: "Elevator A (10 meters left)",
    walkingGuide: "From Millat Rd Main Entrance, proceed straight 12 paces. Located right next to Elevator A.",
    image: menSuitImg,
    featuredTags: ["Men Suits", "Prince Coat", "Bespoke Suiting", "Wedding Wear"]
  },
  {
    id: "g-04",
    name: "Noor-e-Kashmir Shawls & Pashmina",
    unitNumber: "Unit G-04",
    floor: "Ground Floor",
    category: "shawls",
    description: "Handcrafted pure wool pashmina, Kashmiri tilla work shawls, regal velvet chogas, and winter wraps for ladies and gents.",
    phone: "+92 302 4431980",
    whatsapp: "+923024431980",
    openingHours: "11:00 AM - 11:30 PM",
    rating: 4.8,
    reviewsCount: 98,
    discountActive: true,
    discountBadge: "15% Winter Special",
    discountCode: "SHAWL15",
    discountPercent: 15,
    mapX: 68,
    mapY: 35,
    nearestLift: "Elevator A (25 meters)",
    walkingGuide: "Ground floor main gallery, east corridor across the central fountain atrium.",
    image: ladiesSuitImg,
    featuredTags: ["Pure Pashmina", "Velvet Shawls", "Kashmiri Embroidery"]
  },
  {
    id: "g-07",
    name: "Al-Haramain Oud & French Perfumery",
    unitNumber: "Unit G-07",
    floor: "Ground Floor",
    category: "perfumes",
    description: "Authentic Dehn al Oud, Arabian amber attars, long-lasting alcohol-free oils, and French designer impression sprays.",
    phone: "+92 305 7712390",
    whatsapp: "+923057712390",
    openingHours: "11:00 AM - 11:30 PM",
    rating: 4.9,
    reviewsCount: 210,
    discountActive: true,
    discountBadge: "Special Oud Deal",
    discountCode: "OUDPERFUME",
    discountPercent: 10,
    mapX: 48,
    mapY: 62,
    nearestLift: "Elevator A (Opposite side)",
    walkingGuide: "Ground floor central boulevard, directly facing the glass-walled passenger elevator.",
    image: perfumeOudImg,
    featuredTags: ["Pure Oud", "Arabian Attar", "French Fragrances", "Musk"]
  },
  {
    id: "1-02",
    name: "Shehnai Ladies Designer Boutique",
    unitNumber: "Unit 1-02",
    floor: "1st Floor",
    category: "ladies_fashion",
    description: "Exclusive unstitched and ready-to-wear 3-piece luxury lawn, pure chiffon, and organza suits with embroidered dupattas.",
    phone: "+92 300 6655441",
    whatsapp: "+923006655441",
    openingHours: "11:00 AM - 11:30 PM",
    rating: 4.9,
    reviewsCount: 188,
    discountActive: true,
    discountBadge: "Festive Sale 25% OFF",
    discountCode: "SHEHNAI25",
    discountPercent: 25,
    mapX: 30,
    mapY: 32,
    nearestLift: "Elevator A (Exit lift to the right)",
    walkingGuide: "Take Elevator A to the 1st Floor, exit right. Unit 1-02 has the grand glass showroom display.",
    image: ladiesSuitImg,
    featuredTags: ["Ladies Suits", "3-Piece Lawn", "Chiffon", "Party Wear"]
  },
  {
    id: "1-10",
    name: "Paris Cosmetics & Bridal Beauty Studio",
    unitNumber: "Unit 1-10",
    floor: "1st Floor",
    category: "cosmetics",
    description: "Imported whitening glow creams, translucent rice powder, matte lipsticks, kajal, and complete bridal party makeup kits.",
    phone: "+92 306 9912003",
    whatsapp: "+923069912003",
    openingHours: "11:00 AM - 11:30 PM",
    rating: 4.8,
    reviewsCount: 138,
    discountActive: true,
    discountBadge: "Flat 20% on Cosmetics",
    discountCode: "PARIS20",
    discountPercent: 20,
    mapX: 75,
    mapY: 45,
    nearestLift: "Elevator B (Directly ahead)",
    walkingGuide: "Take Elevator B to 1st Floor, walk straight 10 paces. Grand illuminated cosmetic displays.",
    image: cosmeticsPowderSetImg,
    featuredTags: ["Whitening Powders", "Bridal Makeup", "Compact Creams", "Lipsticks"]
  },
  {
    id: "1-05",
    name: "Al-Quresh Heritage Kurtas & Boski",
    unitNumber: "Unit 1-05",
    floor: "1st Floor",
    category: "mens_fashion",
    description: "Authentic Pakistani Boski silk, premium wash-and-wear kurta pajamas, and raw silk embroidered waistcoats.",
    phone: "+92 304 3322119",
    whatsapp: "+923043322119",
    openingHours: "11:00 AM - 11:30 PM",
    rating: 4.8,
    reviewsCount: 112,
    discountActive: false,
    mapX: 65,
    mapY: 34,
    nearestLift: "Elevator A or B",
    walkingGuide: "First floor north corridor, midway between both passenger elevator shafts.",
    image: menSuitImg,
    featuredTags: ["Kurta Pajama", "Boski Silk", "Waistcoats", "Men Fabrics"]
  },
  {
    id: "2-07",
    name: "Velvet Touch Creams & Derma Center",
    unitNumber: "Unit 2-07",
    floor: "2nd Floor",
    category: "cosmetics",
    description: "Dermatologically tested moisturizing day & night creams, oil-control powders, sunblocks, and herbal facial glow packs at wholesale prices.",
    phone: "+92 322 4110098",
    whatsapp: "+923224110098",
    openingHours: "11:00 AM - 11:30 PM",
    rating: 4.8,
    reviewsCount: 118,
    discountActive: true,
    discountBadge: "Herbal Skincare 15% OFF",
    discountCode: "DERMA15",
    discountPercent: 15,
    mapX: 72,
    mapY: 55,
    nearestLift: "Elevator B (10 meters)",
    walkingGuide: "2nd floor east wing, adjacent to Elevator B and ladies lounge.",
    image: cosmeticsImg,
    featuredTags: ["Derma Creams", "Face Powder", "Sunblock", "Herbal Care"]
  },
  {
    id: "3-01",
    name: "Executive Masjid & Community Hall",
    unitNumber: "Level 3",
    floor: "3rd Floor / Rooftop",
    category: "services",
    description: "Quiet, peaceful air-conditioned prayer hall with separate wudu (ablution) sections for men and women. Daily prayer calls.",
    phone: "+92 41 876 2200",
    whatsapp: "+923007654321",
    openingHours: "11:00 AM - 11:30 PM",
    rating: 5.0,
    reviewsCount: 240,
    discountActive: false,
    mapX: 50,
    mapY: 30,
    nearestLift: "Elevator A and B both reach Rooftop directly",
    walkingGuide: "Direct elevator access from Ground, 1st, or 2nd floor straight to Level 3 rooftop lobby.",
    image: heroMallImg,
    featuredTags: ["Masjid", "Namaz Area", "Wudu Area", "Air Conditioned"]
  }
];

export const PRODUCTS: ProductItem[] = [
  // Expanded Cosmetics & Creams & Powders
  {
    id: "cosm-01",
    name: "Radiant Whitening Day & Night Cream with SPF 35",
    storeId: "g-10",
    storeName: "Glow & Glamour Cosmetics & Skincare",
    floor: "Ground Floor (Unit G-10)",
    category: "cosmetics_creams",
    categoryLabel: "Creams & Powders",
    price: 1850,
    originalPrice: 2400,
    image: cosmeticsLuxuryImg,
    rating: 4.9,
    reviewsCount: 168,
    inStock: true,
    description: "Premium brightening facial cream formulated with Glutathione, Niacinamide, Vitamin C, and herbal rose extract. Fades dark spots, moisturizes deeply, and gives a natural luminous glow.",
    details: [
      "Key Actives: Glutathione, Niacinamide 5%, Kojic Acid, SPF 35",
      "Skin Types: All Pakistani skin types (oily, dry, sensitive)",
      "Net Weight: 60g UV-protected luxury glass jar with golden lid",
      "100% steroid-free, mercury-free, lab-certified safety"
    ],
    sizesOrVariants: ["60g Single Jar", "Value Duo (2x 60g Jars)"],
    isFeatured: true
  },
  {
    id: "cosm-02",
    name: "Flawless HD Silk Mineral Compact Powder (12h Oil Control)",
    storeId: "1-10",
    storeName: "Paris Cosmetics & Bridal Beauty Studio",
    floor: "1st Floor (Unit 1-10)",
    category: "cosmetics_creams",
    categoryLabel: "Creams & Powders",
    price: 1450,
    originalPrice: 1900,
    image: cosmeticsPowderSetImg,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    description: "Finely milled micro-velvet compact powder with soft-focus blurring technology. Absorbs excess sebum, evens complexion, and stays matte even in hot summer weather.",
    details: [
      "Formulation: Talc-free enriched with Vitamin E & Jojoba Oil",
      "Coverage: Natural to medium buildable matte coverage",
      "Includes: Mirrored compact case & antimicrobial velvet puff",
      "Available shades: Fair Ivory (01), Natural Beige (02), Warm Honey (03)"
    ],
    sizesOrVariants: ["Shade 01 (Fair Ivory)", "Shade 02 (Natural Beige)", "Shade 03 (Warm Honey)"],
    isFeatured: true
  },
  {
    id: "cosm-03",
    name: "24K Gold Collagen Anti-Aging Radiance Cream",
    storeId: "2-07",
    storeName: "Velvet Touch Creams & Derma Center",
    floor: "2nd Floor (Unit 2-07)",
    category: "cosmetics_creams",
    categoryLabel: "Creams & Powders",
    price: 2350,
    originalPrice: 2950,
    image: cosmeticsImg,
    rating: 4.8,
    reviewsCount: 88,
    inStock: true,
    description: "Infused with pure 24K gold foil micro-flakes, botanical collagen peptides, and Hyaluronic Acid. Rejuvenates dull skin and locks in intense moisture.",
    details: [
      "Key Benefits: Firming, lifting, cellular hydration",
      "Texture: Rich whipped gel-cream that melts into skin",
      "Volume: 50ml Jar + Free Applicator Spatula"
    ],
    sizesOrVariants: ["50ml Jar", "Gift Box Set with Rose Water Mist"],
    isFeatured: true
  },
  {
    id: "cosm-04",
    name: "Organic Pure Rose Water Hydrating Mist & Toner",
    storeId: "g-10",
    storeName: "Glow & Glamour Cosmetics & Skincare",
    floor: "Ground Floor (Unit G-10)",
    category: "cosmetics_creams",
    categoryLabel: "Creams & Powders",
    price: 750,
    originalPrice: 950,
    image: cosmeticsLuxuryImg,
    rating: 5.0,
    reviewsCount: 204,
    inStock: true,
    description: "Steam-distilled pure Rosa Damascena rose water mist. Balances skin pH, refreshes after prayer wudu or makeup, and tightens pores naturally.",
    details: [
      "Purity: 100% Organic distilled rose essence",
      "Size: 120ml fine spray bottle",
      "Alcohol-free and preservative-free"
    ],
    sizesOrVariants: ["120ml Spray Bottle", "Bundle of 2 Bottles"],
    isFeatured: false
  },
  {
    id: "cosm-05",
    name: "DermaShield Ultra-Light Invisible Sunblock SPF 60+",
    storeId: "2-07",
    storeName: "Velvet Touch Creams & Derma Center",
    floor: "2nd Floor (Unit 2-07)",
    category: "cosmetics_creams",
    categoryLabel: "Creams & Powders",
    price: 1650,
    originalPrice: 2100,
    image: cosmeticsPowderSetImg,
    rating: 4.8,
    reviewsCount: 76,
    inStock: true,
    description: "Non-greasy, zero white cast daily broad-spectrum sunscreen lotion. Protects against UVA/UVB rays and pollution in Faisalabad climate.",
    details: [
      "Protection: SPF 60+ PA++++ Broad Spectrum",
      "Finish: Matte dry-touch finish",
      "Volume: 80ml tube"
    ],
    sizesOrVariants: ["80ml Tube"],
    isFeatured: false
  },

  // Men's Suits & Traditional Wear
  {
    id: "prod-01",
    name: "Royal Navy Bespoke 3-Piece Men's Suit",
    storeId: "g-01",
    storeName: "Royal Al-Quresh Bespoke Menswear",
    floor: "Ground Floor (Unit G-01)",
    category: "mens_suits",
    categoryLabel: "Men's Suits",
    price: 13500,
    originalPrice: 16500,
    image: menSuitImg,
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    description: "Handcrafted Pakistani formal 3-piece suit made from premium imported tropical wool fabric. Features peak lapels, tailored waistcoat, and precision-fitted trousers.",
    details: [
      "Fabric: 80% Fine Tropical Wool, 20% Silk Blend",
      "Cut: Modern Slim & Regular Fit Available",
      "Includes: Suit Jacket, Buttoned Waistcoat, Trousers",
      "Available Sizes: 38, 40, 42, 44, 46",
      "Complimentary trial & measurement at Al Quresh Mall Unit G-01"
    ],
    sizesOrVariants: ["38 Regular", "40 Regular", "42 Slim", "44 Slim", "Custom Measure"],
    isFeatured: true
  },
  {
    id: "prod-07",
    name: "Charcoal Textured Prince Coat & Gold Buttons",
    storeId: "g-01",
    storeName: "Royal Al-Quresh Bespoke Menswear",
    floor: "Ground Floor (Unit G-01)",
    category: "mens_suits",
    categoryLabel: "Men's Suits",
    price: 11200,
    originalPrice: 13000,
    image: menSuitImg,
    rating: 4.9,
    reviewsCount: 47,
    inStock: true,
    description: "Classic royal Pakistani prince coat with antique brass crest buttons, mandarin collar, and bespoke interior silk lining.",
    details: [
      "Material: Heavy Jacquard & Suiting Wool Blend",
      "Collar: Structured Mandarin Ban Collar",
      "Pockets: 2 Flap waist pockets, 1 Breast welt pocket with pocket square",
      "Can be paired with kurta pajama or formal dress trousers"
    ],
    sizesOrVariants: ["38 Small", "40 Medium", "42 Large", "44 XL"],
    isFeatured: false
  },

  // Ladies' Suits & Shawls
  {
    id: "prod-02",
    name: "Luxury Embroidered 3-Piece Chiffon & Lawn Suit",
    storeId: "1-02",
    storeName: "Shehnai Ladies Designer Boutique",
    floor: "1st Floor (Unit 1-02)",
    category: "ladies_suits",
    categoryLabel: "Ladies' Suits",
    price: 6800,
    originalPrice: 8500,
    image: ladiesSuitImg,
    rating: 4.9,
    reviewsCount: 114,
    inStock: true,
    description: "Exquisite 3-piece festive unstitched suit featuring heavily embroidered front shirt with organza borders, dyed lawn trouser, and pure digital chiffon embroidered dupatta.",
    details: [
      "Shirt: Embroidered Soft Chiffon & Lawn with Zari Neckline",
      "Dupatta: 2.5m Pure Printed Chiffon with Lace Trims",
      "Trouser: 2.5m Dyed Cambric Cotton",
      "Colors: Peach Gold, Emerald Mist, Royal Mauve",
      "Authentic designer collection with genuine tag guarantee"
    ],
    sizesOrVariants: ["Unstitched (3-Piece)", "Stitched (Small)", "Stitched (Medium)", "Stitched (Large)"],
    isFeatured: true
  },
  {
    id: "prod-03",
    name: "Royal Kashmiri Velvet Pashmina Embroidered Shawl",
    storeId: "g-04",
    storeName: "Noor-e-Kashmir Shawls & Pashmina",
    floor: "Ground Floor (Unit G-04)",
    category: "shawls",
    categoryLabel: "Shawls & Wraps",
    price: 5200,
    originalPrice: 6500,
    image: ladiesSuitImg,
    rating: 4.8,
    reviewsCount: 64,
    inStock: true,
    description: "Traditional Kashmiri tilla embroidery on micro-velvet and pure pashmina wool base. Delivers unmatched warmth, regal drape, and artisanal heritage.",
    details: [
      "Base: Premium Micro-Velvet with Soft Warm Lining",
      "Work: Four-sided border antique gold tilla and thread embroidery",
      "Length: Standard 2.75 x 1.25 meters generous wrap",
      "Ideal for: Winter weddings, formal parties, and gift giving"
    ],
    sizesOrVariants: ["Standard Wrap (Black & Gold)", "Standard Wrap (Maroon)", "Standard Wrap (Deep Emerald)"],
    isFeatured: true
  },

  // Perfumes & Oud
  {
    id: "prod-04",
    name: "Al-Quresh Royal Dehn Al Oud & French Amber Perfume (50ml)",
    storeId: "g-07",
    storeName: "Al-Haramain Oud & French Perfumery",
    floor: "Ground Floor (Unit G-07)",
    category: "perfumes",
    categoryLabel: "Perfumes & Oud",
    price: 4200,
    originalPrice: 5000,
    image: perfumeOudImg,
    rating: 5.0,
    reviewsCount: 152,
    inStock: true,
    description: "A signature blend of vintage Cambodian Dehn Al Oud, warm amber resin, Madagascar vanilla, and French bergamot. Boasts 18+ hours long-lasting projection.",
    details: [
      "Concentration: Eau de Parfum (Extrait Strength)",
      "Top Notes: Bergamot, Pink Peppercorn, Saffron",
      "Heart Notes: Cambodian Oud, Taif Rose, Smoky Leather",
      "Base Notes: Ambergris, Tonka, Precious Sandalwood",
      "Alcohol-Free formulation suitable for prayers"
    ],
    sizesOrVariants: ["50ml Flacon Spray", "12ml Pure Concentrated Attar Roll-on", "Tester Pack (3x10ml)"],
    isFeatured: true
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-01",
    author: "Haji Muhammad Arshad",
    cityArea: "Millat Town, Faisalabad",
    rating: 5,
    date: "14 September 2026",
    comment: "MashAllah Al Quresh Mall hamaray Millat Road par ban kar bohot asani ho gayi hai. Sub se achi baat ye hai ke lift lagi hui hai, buzurg walid sahab asani se 1st aur 2nd floor par chale gaye. Suits aur cosmetics ki quality zabardast hai aur rates bohot munasib hain.",
    verifiedVisit: true,
    categoryMentioned: "Facilities & Men's Suits"
  },
  {
    id: "rev-02",
    author: "Zainab Fatima",
    cityArea: "D-Ground, Faisalabad",
    rating: 5,
    date: "8 September 2026",
    comment: "Security staff bohot cooperative hai aur family environment nihayat pursukoon hai. Shehnai Boutique se Eid ke suits aur Glow & Glamour se whitening cream aur compact powder li thi. 100% original cosmetics hain!",
    verifiedVisit: true,
    categoryMentioned: "Cosmetics & Ladies Suits"
  },
  {
    id: "rev-03",
    author: "Malik Usman Tariq",
    cityArea: "Madina Town, Faisalabad",
    rating: 5,
    date: "2 September 2026",
    comment: "Al-Haramain Oud shop ka perfume aur attar lajawab hai! Har waqt AC on hota hai aur lift bilkul smooth chalti hai. Mall ke andar prayer area (Masjid) bhi bohot saaf aur khula hai. Faisalabad ka best family mall.",
    verifiedVisit: true,
    categoryMentioned: "Perfumes & Lifts"
  },
  {
    id: "rev-04",
    author: "Dr. Ayesha Rehman",
    cityArea: "Peoples Colony No. 1, Faisalabad",
    rating: 5,
    date: "28 August 2026",
    comment: "Glow & Glamour aur Paris Cosmetics se skincare creams aur compact powder purchase kia tha, original products hain market se kam price mein. White and green clean atmosphere bohot acha laga!",
    verifiedVisit: true,
    categoryMentioned: "Cosmetics & Skincare"
  }
];

export const INITIAL_NOTIFICATIONS: MallNotification[] = [
  {
    id: "notif-01",
    title: "Weekend Festive Discount: Flat 20% OFF",
    message: "Use code ALQURESH20 at checkout for men suits, ladies wear, oud, and luxury cosmetics.",
    type: "discount",
    code: "ALQURESH20",
    timeAgo: "10 mins ago",
    read: false
  },
  {
    id: "notif-02",
    title: "New Cosmetics & Skincare Arrivals",
    message: "Glow & Glamour (Unit G-10) and Paris Cosmetics (Unit 1-10) just stocked original whitening creams, compact powders & rose mist.",
    type: "event",
    code: "GLOWBEAUTY",
    timeAgo: "35 mins ago",
    read: false
  },
  {
    id: "notif-03",
    title: "Passenger Elevator A & B Operational",
    message: "Both high-speed passenger elevators are fully operational with dedicated lift attendants for families.",
    type: "facility",
    timeAgo: "1 hour ago",
    read: true
  },
  {
    id: "notif-04",
    title: "Ladies Shawls & Pashmina Festive Stock",
    message: "Exclusive hand-embroidered velvet wraps now available at Noor-e-Kashmir (Ground Floor Unit G-04).",
    type: "discount",
    code: "SHAWL15",
    timeAgo: "Yesterday",
    read: true
  }
];

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: "AQM-8921",
    date: "22 September 2026",
    customerName: "Abdul Rehman",
    phone: "0300-8765432",
    address: "House 42, Street 7, Millat Town",
    city: "Faisalabad",
    paymentMethod: "cod",
    deliveryType: "delivery",
    items: [
      {
        product: PRODUCTS[0],
        quantity: 1,
        selectedVariant: "60g Single Jar"
      },
      {
        product: PRODUCTS[1],
        quantity: 1,
        selectedVariant: "Shade 02 (Natural Beige)"
      }
    ],
    subtotal: 3300,
    discount: 660,
    shipping: 0,
    total: 2640,
    status: "dispatched",
    trackingNumber: "FSD-EXP-772910",
    riderName: "Kashif Ali (Al Quresh Express Courier)",
    riderPhone: "0321-4455667",
    steps: [
      {
        title: "Order Placed & Logged",
        description: "Customer placed Cash on Delivery order via Al Quresh Mall online portal",
        timestamp: "22 Sep 2026, 02:15 PM",
        completed: true,
        current: false
      },
      {
        title: "Verified by Al Quresh Mall Outlets",
        description: "Store (G-10 Glow & Glamour) confirmed stock availability and inspected quality",
        timestamp: "22 Sep 2026, 03:00 PM",
        completed: true,
        current: false
      },
      {
        title: "Packed with Mall Security Seal",
        description: "Secure tamper-proof packaging applied with invoice and authenticity certificate",
        timestamp: "22 Sep 2026, 04:30 PM",
        completed: true,
        current: false
      },
      {
        title: "Dispatched with Local Delivery Rider",
        description: "Rider Kashif Ali picked up parcel from Millat Rd Mall hub. Out for delivery in Millat Town.",
        timestamp: "22 Sep 2026, 05:45 PM",
        completed: true,
        current: true
      },
      {
        title: "Delivered & Cash Collected",
        description: "Rider delivers to doorstep and collects cash payment",
        timestamp: "Estimated today by 07:30 PM",
        completed: false,
        current: false
      }
    ]
  }
];
