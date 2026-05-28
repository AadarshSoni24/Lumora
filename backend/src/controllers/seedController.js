const imageModel = require("../models/imageModel");
const { pool } = require("../config/database");

// 28 diverse creators for seeding
const seedCreators = [
  { id: 1001, username: "arjun_shoots", email: "arjun@lumora.test", fullName: "Arjun Mehta" },
  { id: 1002, username: "priya_captures", email: "priya@lumora.test", fullName: "Priya Sharma" },
  { id: 1003, username: "rahul.frames", email: "rahul@lumora.test", fullName: "Rahul Verma" },
  { id: 1004, username: "sneha_lens", email: "sneha@lumora.test", fullName: "Sneha Iyer" },
  { id: 1005, username: "vikram_wild", email: "vikram@lumora.test", fullName: "Vikram Singh" },
  { id: 1006, username: "ananya.art", email: "ananya@lumora.test", fullName: "Ananya Das" },
  { id: 1007, username: "karthik_dev", email: "karthik@lumora.test", fullName: "Karthik Nair" },
  { id: 1008, username: "meera_travels", email: "meera@lumora.test", fullName: "Meera Patel" },
  { id: 1009, username: "rohit_cinema", email: "rohit@lumora.test", fullName: "Rohit Kapoor" },
  { id: 1010, username: "deepika_foodie", email: "deepika@lumora.test", fullName: "Deepika Reddy" },
  { id: 1011, username: "amit_heritage", email: "amit@lumora.test", fullName: "Amit Choudhary" },
  { id: 1012, username: "kavya_pets", email: "kavya@lumora.test", fullName: "Kavya Menon" },
  { id: 1013, username: "suresh_nature", email: "suresh@lumora.test", fullName: "Suresh Kumar" },
  { id: 1014, username: "nisha_fashion", email: "nisha@lumora.test", fullName: "Nisha Agarwal" },
  { id: 1015, username: "rajesh_spiritual", email: "rajesh@lumora.test", fullName: "Rajesh Gupta" },
  { id: 1016, username: "pooja_dance", email: "pooja@lumora.test", fullName: "Pooja Banerjee" },
  { id: 1017, username: "sanjay_motors", email: "sanjay@lumora.test", fullName: "Sanjay Joshi" },
  { id: 1018, username: "riya_minimal", email: "riya@lumora.test", fullName: "Riya Saxena" },
  { id: 1019, username: "alex_marvel", email: "alex@lumora.test", fullName: "Alex Thompson" },
  { id: 1020, username: "sarah_dc", email: "sarah@lumora.test", fullName: "Sarah Chen" },
  { id: 1021, username: "james_code", email: "james@lumora.test", fullName: "James Wilson" },
  { id: 1022, username: "maria_cats", email: "maria@lumora.test", fullName: "Maria Garcia" },
  { id: 1023, username: "david_astro", email: "david@lumora.test", fullName: "David Park" },
  { id: 1024, username: "aisha_stories", email: "aisha@lumora.test", fullName: "Aisha Khan" },
  { id: 1025, username: "tanvi_street", email: "tanvi@lumora.test", fullName: "Tanvi Desai" },
  { id: 1026, username: "harsh_fitness", email: "harsh@lumora.test", fullName: "Harsh Vardhan" },
  { id: 1027, username: "lisa_nature", email: "lisa@lumora.test", fullName: "Lisa Anderson" },
  { id: 1028, username: "nikhil_astro", email: "nikhil@lumora.test", fullName: "Nikhil Rao" },
];

const seedImages = [
  // ─── INDIAN CRICKET ───
  { userId: 1003, title: "Virat Kohli Cover Drive", caption: "The king plays a stunning cover drive at Wankhede.", imageUrl: "https://loremflickr.com/800/1000/cricket,india?lock=1148", tags: ["cricket", "india", "sports", "virat"] },
  { userId: 1003, title: "Cricket Stadium Lights", caption: "The electric atmosphere of an IPL night match.", imageUrl: "https://loremflickr.com/800/1000/cricket,stadium?lock=1196", tags: ["cricket", "stadium", "ipl", "sports"] },
  { userId: 1003, title: "Gully Cricket", caption: "Kids playing cricket in the narrow lanes of Old Delhi.", imageUrl: "https://loremflickr.com/800/1000/cricket,india?lock=1244", tags: ["cricket", "india", "street", "kids"] },
  { userId: 1003, title: "Cricket Bat & Ball", caption: "The tools of the gentleman's game.", imageUrl: "https://loremflickr.com/800/1000/cricket,sports?lock=1292", tags: ["cricket", "sports", "closeup", "equipment"] },
  { userId: 1003, title: "Indian Cricket Fans", caption: "Passionate fans painted in tricolor cheering at the stadium.", imageUrl: "https://loremflickr.com/800/1000/cricket,india?lock=1340", tags: ["cricket", "india", "fans", "celebration"] },

  // ─── BOLLYWOOD & CINEMA ───
  { userId: 1009, title: "Bollywood Dance Scene", caption: "Vibrant colors and energy of a Bollywood dance number.", imageUrl: "https://loremflickr.com/800/1000/bollywood,dance?lock=1450", tags: ["bollywood", "dance", "cinema", "india"] },
  { userId: 1009, title: "Film City Mumbai", caption: "Behind the scenes at Goregaon Film City.", imageUrl: "https://loremflickr.com/800/1000/bollywood,mumbai?lock=1498", tags: ["bollywood", "mumbai", "cinema", "filmmaking"] },
  { userId: 1009, title: "Movie Poster Wall", caption: "Vintage hand-painted Bollywood movie posters.", imageUrl: "https://loremflickr.com/800/1000/bollywood,art?lock=1546", tags: ["bollywood", "art", "vintage", "poster"] },
  { userId: 1009, title: "Cinema Hall Nostalgia", caption: "The charm of old single-screen theaters in India.", imageUrl: "https://loremflickr.com/800/1000/cinema,nostalgia?lock=1594", tags: ["cinema", "nostalgia", "india", "theater"] },

  // ─── INDIAN TRAVEL & MONUMENTS ───
  { userId: 1002, title: "Taj Mahal at Sunrise", caption: "The icon of eternal love bathed in golden morning light.", imageUrl: "https://loremflickr.com/800/1000/tajmahal,india?lock=1704", tags: ["tajmahal", "india", "travel", "monument", "agra"] },
  { userId: 1008, title: "Jaipur Pink City", caption: "The stunning rose-colored architecture of Hawa Mahal.", imageUrl: "https://loremflickr.com/800/1000/jaipur,rajasthan?lock=1752", tags: ["jaipur", "rajasthan", "india", "architecture", "travel"] },
  { userId: 1008, title: "Kerala Backwaters", caption: "A houseboat gliding through the serene backwaters.", imageUrl: "https://loremflickr.com/800/1000/kerala,backwaters?lock=1800", tags: ["kerala", "backwaters", "india", "travel", "nature"] },
  { userId: 1002, title: "Varanasi Evening Aarti", caption: "The mesmerizing Ganga Aarti at Dashashwamedh Ghat.", imageUrl: "https://loremflickr.com/800/1000/varanasi,spiritual?lock=1848", tags: ["varanasi", "spiritual", "india", "ganges", "ritual"] },
  { userId: 1011, title: "Golden Temple Amritsar", caption: "The divine Harmandir Sahib reflecting in the sacred pool.", imageUrl: "https://loremflickr.com/800/1000/goldentemple,amritsar?lock=1896", tags: ["goldentemple", "amritsar", "india", "spiritual", "sikh"] },
  { userId: 1008, title: "Ladakh Pangong Lake", caption: "The stunning blue waters of Pangong Tso at 14,000 feet.", imageUrl: "https://loremflickr.com/800/1000/ladakh,lake?lock=1944", tags: ["ladakh", "lake", "india", "mountains", "travel"] },
  { userId: 1011, title: "Qutub Minar Delhi", caption: "The soaring 73-meter victory tower of Delhi.", imageUrl: "https://loremflickr.com/800/1000/delhi,monument?lock=1992", tags: ["delhi", "monument", "india", "history", "architecture"] },
  { userId: 1002, title: "Mysore Palace Illuminated", caption: "97,000 bulbs light up Mysore Palace.", imageUrl: "https://loremflickr.com/800/1000/mysore,palace?lock=2040", tags: ["mysore", "palace", "india", "night", "architecture"] },
  { userId: 1008, title: "Hampi Boulders", caption: "Surreal boulder landscape of the ancient Vijayanagara empire.", imageUrl: "https://loremflickr.com/800/1000/hampi,ruins?lock=2088", tags: ["hampi", "ruins", "india", "history", "travel"] },
  { userId: 1011, title: "Konark Sun Temple", caption: "The magnificent 13th-century temple shaped as a chariot.", imageUrl: "https://loremflickr.com/800/1000/konark,temple?lock=2136", tags: ["konark", "temple", "india", "architecture", "heritage"] },
  { userId: 1002, title: "Gateway of India", caption: "Mumbai's iconic arch overlooking the Arabian Sea.", imageUrl: "https://loremflickr.com/800/1000/mumbai,monument?lock=2184", tags: ["mumbai", "monument", "india", "sea", "travel"] },
  { userId: 1008, title: "Rishikesh Suspension Bridge", caption: "The iconic Lakshman Jhula spanning the Ganges.", imageUrl: "https://loremflickr.com/800/1000/rishikesh,adventure?lock=2232", tags: ["rishikesh", "adventure", "india", "bridge", "river"] },
  { userId: 1011, title: "Charminar Hyderabad", caption: "The magnificent four-towered monument of the Deccan.", imageUrl: "https://loremflickr.com/800/1000/hyderabad,charminar?lock=2280", tags: ["hyderabad", "charminar", "india", "monument", "history"] },
  { userId: 1008, title: "Udaipur Lake Palace", caption: "The floating white marble palace on Lake Pichola.", imageUrl: "https://loremflickr.com/800/1000/udaipur,palace?lock=2328", tags: ["udaipur", "palace", "india", "lake", "rajasthan"] },

  // ─── INDIAN FOOD ───
  { userId: 1004, title: "Indian Thali Feast", caption: "A grand vegetarian thali with 20+ dishes.", imageUrl: "https://loremflickr.com/800/1000/food,thali?lock=2438", tags: ["food", "thali", "india", "cuisine", "vegetarian"] },
  { userId: 1010, title: "Mumbai Vada Pav", caption: "The king of Mumbai street food.", imageUrl: "https://loremflickr.com/800/1000/food,streetfood?lock=2486", tags: ["food", "streetfood", "mumbai", "india", "snack"] },
  { userId: 1004, title: "Spice Market Colors", caption: "Vibrant heaps of turmeric, chili, and cumin.", imageUrl: "https://loremflickr.com/800/1000/spices,food?lock=2534", tags: ["spices", "food", "india", "market", "colors"] },
  { userId: 1010, title: "Hyderabadi Biryani", caption: "Layers of fragrant dum biryani cooked to perfection.", imageUrl: "https://loremflickr.com/800/1000/biryani,food?lock=2582", tags: ["biryani", "food", "india", "hyderabad", "rice"] },
  { userId: 1004, title: "Chai on the Tracks", caption: "Cutting chai served in clay cups at a railway station.", imageUrl: "https://loremflickr.com/800/1000/chai,food?lock=2630", tags: ["chai", "food", "india", "train", "street"] },
  { userId: 1010, title: "South Indian Dosa", caption: "A crispy golden dosa with sambar and chutney.", imageUrl: "https://loremflickr.com/800/1000/dosa,food?lock=2678", tags: ["dosa", "food", "india", "southindian", "breakfast"] },
  { userId: 1004, title: "Samosa Plate", caption: "Hot, crispy samosas with green chutney.", imageUrl: "https://loremflickr.com/800/1000/samosa,food?lock=2726", tags: ["samosa", "food", "india", "snack", "streetfood"] },
  { userId: 1010, title: "Pani Puri Cart", caption: "The most loved chaat being assembled by an expert hand.", imageUrl: "https://loremflickr.com/800/1000/panipuri,streetfood?lock=2774", tags: ["panipuri", "streetfood", "food", "india", "chaat"] },

  // ─── INDIAN FESTIVALS ───
  { userId: 1002, title: "Diwali Diyas", caption: "Rows of earthen lamps illuminating the night.", imageUrl: "https://loremflickr.com/800/1000/diwali,festival?lock=2884", tags: ["diwali", "festival", "india", "light", "celebration"] },
  { userId: 1002, title: "Holi Colors Explosion", caption: "Faces covered in vibrant gulaal during the festival of colors.", imageUrl: "https://loremflickr.com/800/1000/holi,festival?lock=2932", tags: ["holi", "festival", "india", "colors", "celebration"] },
  { userId: 1015, title: "Durga Puja Pandal", caption: "An elaborately decorated pandal during Durga Puja.", imageUrl: "https://loremflickr.com/800/1000/durgapuja,festival?lock=2980", tags: ["durgapuja", "festival", "kolkata", "india", "culture"] },
  { userId: 1015, title: "Ganesh Chaturthi", caption: "An enormous Ganesh idol during the immersion procession.", imageUrl: "https://loremflickr.com/800/1000/ganesh,festival?lock=3028", tags: ["ganesh", "festival", "mumbai", "india", "spiritual"] },
  { userId: 1002, title: "Navratri Garba Night", caption: "Whirling dancers in colorful chaniya cholis.", imageUrl: "https://loremflickr.com/800/1000/navratri,garba?lock=3076", tags: ["navratri", "garba", "festival", "india", "dance"] },
  { userId: 1024, title: "Pushkar Mela Camels", caption: "Decorated camels at the Pushkar Camel Fair.", imageUrl: "https://loremflickr.com/800/1000/pushkar,rajasthan?lock=3124", tags: ["pushkar", "rajasthan", "camels", "festival", "india"] },

  // ─── INDIAN WILDLIFE ───
  { userId: 1005, title: "Bengal Tiger Resting", caption: "A majestic Royal Bengal Tiger in Ranthambore.", imageUrl: "https://loremflickr.com/800/1000/tiger,wildlife?lock=3234", tags: ["tiger", "wildlife", "india", "ranthambore", "nature"] },
  { userId: 1005, title: "Indian Peacock Display", caption: "The national bird of India in full glory.", imageUrl: "https://loremflickr.com/800/1000/peacock,bird?lock=3282", tags: ["peacock", "bird", "wildlife", "india", "nature"] },
  { userId: 1005, title: "Indian Elephant Festival", caption: "A beautifully decorated temple elephant in Kerala.", imageUrl: "https://loremflickr.com/800/1000/elephant,wildlife?lock=3330", tags: ["elephant", "wildlife", "india", "kerala", "culture"] },
  { userId: 1005, title: "Himalayan Snow Leopard", caption: "The ghost of the mountains in Spiti Valley.", imageUrl: "https://loremflickr.com/800/1000/snowleopard,wildlife?lock=3378", tags: ["snowleopard", "wildlife", "himalayas", "india", "rare"] },

  // ─── INDIAN CULTURE & DANCE ───
  { userId: 1016, title: "Kathakali Performance", caption: "The elaborate makeup and costume of Kerala's classical dance.", imageUrl: "https://loremflickr.com/800/1000/kathakali,dance?lock=3488", tags: ["kathakali", "dance", "kerala", "india", "culture"] },
  { userId: 1016, title: "Bharatanatyam Pose", caption: "A dancer frozen in a powerful Bharatanatyam stance.", imageUrl: "https://loremflickr.com/800/1000/bharatanatyam,dance?lock=3536", tags: ["bharatanatyam", "dance", "classical", "india", "art"] },
  { userId: 1014, title: "Indian Wedding Ceremony", caption: "The vibrant rituals of a traditional Hindu wedding.", imageUrl: "https://loremflickr.com/800/1000/wedding,india?lock=3584", tags: ["wedding", "india", "tradition", "culture", "celebration"] },
  { userId: 1014, title: "Mehndi Art", caption: "Intricate henna designs on a bride's hands.", imageUrl: "https://loremflickr.com/800/1000/mehndi,henna?lock=3632", tags: ["mehndi", "henna", "india", "art", "wedding"] },
  { userId: 1014, title: "Bangle Market", caption: "Glittering stacks of colorful bangles in a bustling bazaar.", imageUrl: "https://loremflickr.com/800/1000/bangles,market?lock=3680", tags: ["bangles", "market", "india", "colorful", "shopping"] },
  { userId: 1014, title: "Indian Silk Sarees", caption: "Gorgeous Kanchipuram silk sarees draped on display.", imageUrl: "https://loremflickr.com/800/1000/saree,fashion?lock=3728", tags: ["saree", "fashion", "india", "silk", "tradition"] },

  // ─── INDIAN NATURE & LANDSCAPES ───
  { userId: 1013, title: "Himalayan Sunrise", caption: "Dawn breaking over the snow-capped peaks.", imageUrl: "https://loremflickr.com/800/1000/himalayas,mountains?lock=3838", tags: ["himalayas", "mountains", "india", "sunrise", "nature"] },
  { userId: 1013, title: "Goa Beach Sunset", caption: "Golden hour on the beaches of Goa.", imageUrl: "https://loremflickr.com/800/1000/goa,beach?lock=3886", tags: ["goa", "beach", "sunset", "india", "travel"] },
  { userId: 1013, title: "Spiti Valley Road", caption: "The winding mountain road through Spiti's lunar landscape.", imageUrl: "https://loremflickr.com/800/1000/spiti,mountains?lock=3934", tags: ["spiti", "mountains", "india", "road", "adventure"] },
  { userId: 1013, title: "Munnar Tea Gardens", caption: "Rolling green tea plantations in the hills of Kerala.", imageUrl: "https://loremflickr.com/800/1000/munnar,tea?lock=3982", tags: ["munnar", "tea", "kerala", "india", "green"] },
  { userId: 1013, title: "Andaman Clear Waters", caption: "Crystal-clear turquoise waters of Havelock Island.", imageUrl: "https://loremflickr.com/800/1000/andaman,beach?lock=4030", tags: ["andaman", "beach", "island", "india", "ocean"] },
  { userId: 1013, title: "Dal Lake Kashmir", caption: "Shikaras floating on the mirror-like Dal Lake.", imageUrl: "https://loremflickr.com/800/1000/kashmir,lake?lock=4078", tags: ["kashmir", "lake", "india", "shikara", "nature"] },
  { userId: 1028, title: "Milky Way over Ladakh", caption: "Astrophotography capturing the galaxy over Hanle.", imageUrl: "https://loremflickr.com/800/1000/astrophotography,ladakh?lock=4126", tags: ["astrophotography", "ladakh", "india", "milkyway", "night"] },

  // ─── INDIAN STREET LIFE ───
  { userId: 1001, title: "Mumbai Local Train", caption: "The lifeline of Mumbai during rush hour.", imageUrl: "https://loremflickr.com/800/1000/mumbai,train?lock=4236", tags: ["mumbai", "train", "india", "city", "commute"] },
  { userId: 1025, title: "Jodhpur Blue City", caption: "The mesmerizing blue-painted houses of Jodhpur.", imageUrl: "https://loremflickr.com/800/1000/jodhpur,blue?lock=4284", tags: ["jodhpur", "blue", "city", "india", "rajasthan"] },
  { userId: 1001, title: "Auto Rickshaw Mumbai", caption: "The ubiquitous three-wheeler weaving through traffic.", imageUrl: "https://loremflickr.com/800/1000/autorickshaw,india?lock=4332", tags: ["autorickshaw", "india", "street", "mumbai", "transport"] },
  { userId: 1025, title: "Old Delhi Chandni Chowk", caption: "The bustling narrow lanes of Shahjahanabad.", imageUrl: "https://loremflickr.com/800/1000/delhi,street?lock=4380", tags: ["delhi", "street", "india", "market", "old"] },
  { userId: 1025, title: "Street Art Mumbai", caption: "Colorful graffiti on the walls of Bandra.", imageUrl: "https://loremflickr.com/800/1000/streetart,graffiti?lock=4428", tags: ["streetart", "graffiti", "mumbai", "india", "art"] },

  // ─── INDIAN SPIRITUAL & YOGA ───
  { userId: 1015, title: "Yoga at Sunrise", caption: "A practitioner in tree pose on the banks of the Ganges.", imageUrl: "https://loremflickr.com/800/1000/yoga,spiritual?lock=4538", tags: ["yoga", "spiritual", "india", "rishikesh", "wellness"] },
  { userId: 1015, title: "Temple Bell", caption: "A brass bell in a centuries-old Hindu temple.", imageUrl: "https://loremflickr.com/800/1000/temple,spiritual?lock=4586", tags: ["temple", "spiritual", "india", "bell", "tradition"] },
  { userId: 1015, title: "Varanasi Morning Prayers", caption: "Sadhus performing morning rituals at the ghats.", imageUrl: "https://loremflickr.com/800/1000/varanasi,spiritual?lock=4634", tags: ["varanasi", "spiritual", "india", "prayer", "morning"] },
  { userId: 1015, title: "Ganga Aarti Fire", caption: "Priests performing the fire ritual with large brass lamps.", imageUrl: "https://loremflickr.com/800/1000/gangaaarti,varanasi?lock=4682", tags: ["gangaaarti", "varanasi", "fire", "india", "spiritual"] },

  // ─── INDIAN ART & CRAFT ───
  { userId: 1006, title: "Indian Potter at Work", caption: "Skilled hands shaping clay on a traditional wheel.", imageUrl: "https://loremflickr.com/800/1000/pottery,craft?lock=4792", tags: ["pottery", "craft", "india", "artisan", "handmade"] },
  { userId: 1006, title: "Madhubani Painting", caption: "Traditional folk art from Bihar with vibrant geometric patterns.", imageUrl: "https://loremflickr.com/800/1000/madhubani,art?lock=4840", tags: ["madhubani", "art", "india", "folk", "painting"] },
  { userId: 1006, title: "Rangoli Design", caption: "An intricate floor art design made with colored powders.", imageUrl: "https://loremflickr.com/800/1000/rangoli,art?lock=4888", tags: ["rangoli", "art", "india", "festival", "design"] },

  // ─── INDIAN TRANSPORT ───
  { userId: 1017, title: "Royal Enfield Ride", caption: "Bikers on Royal Enfields through the Ladakh passes.", imageUrl: "https://loremflickr.com/800/1000/royalenfield,bike?lock=4998", tags: ["royalenfield", "bike", "ladakh", "india", "adventure"] },
  { userId: 1001, title: "Toy Train Shimla", caption: "The heritage Kalka-Shimla railway through the mountains.", imageUrl: "https://loremflickr.com/800/1000/train,shimla?lock=46", tags: ["train", "shimla", "india", "heritage", "mountains"] },

  // ─── INDIAN SPORTS ───
  { userId: 1026, title: "Kushti Wrestling", caption: "Traditional Indian mud wrestling at an akhara.", imageUrl: "https://loremflickr.com/800/1000/kushti,wrestling?lock=156", tags: ["kushti", "wrestling", "india", "sports", "tradition"] },
  { userId: 1026, title: "Morning Yoga Class", caption: "Group yoga session at sunrise on Marina Beach.", imageUrl: "https://loremflickr.com/800/1000/yoga,fitness?lock=204", tags: ["yoga", "fitness", "india", "beach", "wellness"] },
  { userId: 1003, title: "Kabaddi Match", caption: "The intensity of a Pro Kabaddi League game.", imageUrl: "https://loremflickr.com/800/1000/kabaddi,sports?lock=252", tags: ["kabaddi", "sports", "india", "team", "action"] },

  // ─── RAJASTHAN SPECIAL ───
  { userId: 1008, title: "Jaisalmer Fort", caption: "The golden fortress rising from the Thar Desert.", imageUrl: "https://loremflickr.com/800/1000/jaisalmer,fort?lock=362", tags: ["jaisalmer", "fort", "rajasthan", "india", "desert"] },
  { userId: 1008, title: "Thar Desert Camels", caption: "Camel caravan crossing the golden sand dunes at sunset.", imageUrl: "https://loremflickr.com/800/1000/thar,desert?lock=410", tags: ["thar", "desert", "camels", "rajasthan", "india"] },

  // ─── MONSOON ───
  { userId: 1001, title: "Mumbai Monsoon", caption: "Rain-soaked streets of Mumbai during peak monsoon.", imageUrl: "https://loremflickr.com/800/1000/monsoon,rain?lock=520", tags: ["monsoon", "rain", "mumbai", "india", "weather"] },
  { userId: 1013, title: "Western Ghats Waterfall", caption: "Lush waterfalls cascading down the ghats.", imageUrl: "https://loremflickr.com/800/1000/monsoon,waterfall?lock=568", tags: ["monsoon", "waterfall", "india", "nature", "green"] },

  // ─── INDIAN PEOPLE & PORTRAITS ───
  { userId: 1024, title: "Rajasthani Elder", caption: "Weathered face telling stories of the desert.", imageUrl: "https://loremflickr.com/800/1000/portrait,rajasthan?lock=678", tags: ["portrait", "rajasthan", "india", "people", "elder"] },
  { userId: 1001, title: "Chai Wallah", caption: "A tea seller pouring chai with the signature long pour.", imageUrl: "https://loremflickr.com/800/1000/chai,portrait?lock=726", tags: ["chai", "portrait", "india", "street", "tea"] },

  // ─── NORTHEAST INDIA ───
  { userId: 1008, title: "Meghalaya Living Root Bridge", caption: "Ancient bridges grown from living tree roots.", imageUrl: "https://loremflickr.com/800/1000/meghalaya,northeast?lock=836", tags: ["meghalaya", "northeast", "india", "nature", "bridge"] },
  { userId: 1005, title: "Kaziranga Rhino", caption: "The one-horned rhinoceros in Assam's famous national park.", imageUrl: "https://loremflickr.com/800/1000/kaziranga,rhino?lock=884", tags: ["kaziranga", "rhino", "wildlife", "assam", "india"] },

  // ─── MORE INDIAN ───
  { userId: 1011, title: "India Gate Delhi", caption: "The war memorial arch illuminated at night.", imageUrl: "https://loremflickr.com/800/1000/indiagate,delhi?lock=994", tags: ["indiagate", "delhi", "india", "monument", "night"] },
  { userId: 1002, title: "Lotus Temple", caption: "The stunning Bahai House of Worship in Delhi.", imageUrl: "https://loremflickr.com/800/1000/lotustemple,delhi?lock=1042", tags: ["lotustemple", "delhi", "india", "architecture", "modern"] },
  { userId: 1001, title: "Mumbai Skyline", caption: "The glittering skyline of India's financial capital.", imageUrl: "https://loremflickr.com/800/1000/mumbai,skyline?lock=1090", tags: ["mumbai", "skyline", "india", "city", "modern"] },
  { userId: 1025, title: "Bangalore IT Park", caption: "Modern glass towers of India's Silicon Valley.", imageUrl: "https://loremflickr.com/800/1000/bangalore,tech?lock=1138", tags: ["bangalore", "tech", "modern", "india", "skyline"] },
  { userId: 1007, title: "Indian Startup Hub", caption: "Co-working space in Bangalore's tech corridor.", imageUrl: "https://loremflickr.com/800/1000/startup,bangalore?lock=1186", tags: ["startup", "bangalore", "india", "tech", "coworking"] },
  { userId: 1024, title: "Rice Paddy Fields", caption: "Emerald green rice terraces in the Western Ghats.", imageUrl: "https://loremflickr.com/800/1000/rice,farming?lock=1234", tags: ["rice", "farming", "india", "green", "rural"] },
  { userId: 1024, title: "Mustard Fields Punjab", caption: "Endless yellow mustard fields stretching to the horizon.", imageUrl: "https://loremflickr.com/800/1000/mustard,punjab?lock=1282", tags: ["mustard", "punjab", "india", "farming", "yellow"] },
  { userId: 1001, title: "Marine Drive Night", caption: "The Queen's Necklace - Mumbai's iconic seafront at night.", imageUrl: "https://loremflickr.com/800/1000/mumbai,night?lock=1330", tags: ["mumbai", "night", "city", "india", "lights"] },
  { userId: 1013, title: "Rann of Kutch", caption: "The vast white salt desert of Gujarat under moonlight.", imageUrl: "https://loremflickr.com/800/1000/kutch,desert?lock=1378", tags: ["kutch", "desert", "india", "gujarat", "nature"] },
  { userId: 1011, title: "Stepwell Geometry", caption: "The mesmerizing symmetry of Chand Baori stepwell.", imageUrl: "https://loremflickr.com/800/1000/stepwell,geometry?lock=1426", tags: ["stepwell", "geometry", "rajasthan", "india", "architecture"] },
  { userId: 1002, title: "Diwali Fireworks", caption: "A spectacular fireworks display over the city skyline.", imageUrl: "https://loremflickr.com/800/1000/diwali,fireworks?lock=1474", tags: ["diwali", "fireworks", "india", "night", "celebration"] },
  { userId: 1005, title: "Jim Corbett National Park", caption: "Dense sal forests of India's oldest national park.", imageUrl: "https://loremflickr.com/800/1000/jimcorbett,wildlife?lock=1522", tags: ["jimcorbett", "wildlife", "india", "forest", "nature"] },
  { userId: 1010, title: "Tandoori Platter", caption: "Smoky tandoori chicken with mint chutney.", imageUrl: "https://loremflickr.com/800/1000/tandoori,food?lock=1570", tags: ["tandoori", "food", "india", "nonveg", "grill"] },
  { userId: 1010, title: "Chole Bhature", caption: "The iconic Punjabi breakfast.", imageUrl: "https://loremflickr.com/800/1000/cholebhature,food?lock=1618", tags: ["cholebhature", "food", "punjabi", "india", "breakfast"] },
  { userId: 1024, title: "Indian School Children", caption: "Bright smiles in school uniforms heading to class.", imageUrl: "https://loremflickr.com/800/1000/children,school?lock=1666", tags: ["children", "school", "india", "education", "smile"] },
  { userId: 1001, title: "Howrah Bridge Kolkata", caption: "The iconic cantilever bridge over the Hooghly River.", imageUrl: "https://loremflickr.com/800/1000/howrahbridge,kolkata?lock=1714", tags: ["howrahbridge", "kolkata", "india", "bridge", "iconic"] },
  { userId: 1017, title: "Ambassador Car", caption: "The classic Hindustan Ambassador.", imageUrl: "https://loremflickr.com/800/1000/ambassador,car?lock=1762", tags: ["ambassador", "car", "vintage", "india", "classic"] },
  { userId: 1005, title: "Flamingos Mumbai", caption: "A flock of flamingos at the Sewri mudflats.", imageUrl: "https://loremflickr.com/800/1000/flamingo,bird?lock=1810", tags: ["flamingo", "bird", "mumbai", "india", "nature"] },
  { userId: 1013, title: "Western Ghats Green", caption: "Dense tropical rainforest of the Western Ghats.", imageUrl: "https://loremflickr.com/800/1000/westernghats,forest?lock=1858", tags: ["westernghats", "forest", "india", "nature", "biodiversity"] },
  { userId: 1006, title: "Warli Art", caption: "Traditional tribal art from Maharashtra.", imageUrl: "https://loremflickr.com/800/1000/warli,tribalart?lock=1906", tags: ["warli", "tribalart", "maharashtra", "india", "art"] },
  { userId: 1016, title: "Odissi Dance", caption: "Graceful Odissi dance in a traditional setting.", imageUrl: "https://loremflickr.com/800/1000/odissi,dance?lock=1954", tags: ["odissi", "dance", "classical", "india", "odisha"] },
  { userId: 1024, title: "Sitar in Golden Light", caption: "The strings of a sitar glowing under stage lights.", imageUrl: "https://loremflickr.com/800/1000/sitar,music?lock=2002", tags: ["sitar", "music", "india", "classical", "instrument"] },
  { userId: 1008, title: "Zanskar Frozen River", caption: "The frozen Chadar trek over the Zanskar River.", imageUrl: "https://loremflickr.com/800/1000/zanskar,trek?lock=2050", tags: ["zanskar", "trek", "ladakh", "india", "adventure"] },
  { userId: 1003, title: "IPL Stadium Crowd", caption: "The electric atmosphere of an IPL match.", imageUrl: "https://loremflickr.com/800/1000/ipl,cricket?lock=2098", tags: ["ipl", "cricket", "india", "stadium", "crowd"] },
  { userId: 1009, title: "Indian Film Set", caption: "Behind the scenes of a Hindi film production.", imageUrl: "https://loremflickr.com/800/1000/filmset,bollywood?lock=2146", tags: ["filmset", "bollywood", "india", "cinema", "production"] },
  { userId: 1004, title: "Assam Tea Picking", caption: "Workers harvesting in the vast tea gardens of Assam.", imageUrl: "https://loremflickr.com/800/1000/tea,assam?lock=2194", tags: ["tea", "assam", "india", "harvest", "green"] },
  { userId: 1004, title: "Filter Coffee Tumbler", caption: "South Indian filter coffee in a traditional steel tumbler.", imageUrl: "https://loremflickr.com/800/1000/coffee,southindian?lock=2242", tags: ["coffee", "southindian", "india", "beverage", "filter"] },
  { userId: 1014, title: "Kundan Jewelry Set", caption: "Exquisite traditional bridal jewelry.", imageUrl: "https://loremflickr.com/800/1000/jewelry,bridal?lock=2290", tags: ["jewelry", "bridal", "india", "gold", "kundan"] },
  { userId: 1015, title: "Tibetan Prayer Flags", caption: "Colorful prayer flags fluttering over Himalayan passes.", imageUrl: "https://loremflickr.com/800/1000/prayerflags,tibet?lock=2338", tags: ["prayerflags", "tibet", "himalaya", "india", "spiritual"] },
  { userId: 1014, title: "Kolhapuri Chappal", caption: "Traditional handcrafted leather sandals.", imageUrl: "https://loremflickr.com/800/1000/kolhapuri,footwear?lock=2386", tags: ["kolhapuri", "footwear", "india", "craft", "leather"] },
  { userId: 1025, title: "Flower Market Kolkata", caption: "Mountains of marigolds at Mallick Ghat market.", imageUrl: "https://loremflickr.com/800/1000/flowers,market?lock=2434", tags: ["flowers", "market", "kolkata", "india", "marigold"] },
  { userId: 1008, title: "Ooty Hills", caption: "The beautiful Nilgiri hills of Tamil Nadu.", imageUrl: "https://loremflickr.com/800/1000/ooty,hills?lock=2482", tags: ["ooty", "hills", "tamilnadu", "india", "nature"] },
  { userId: 1002, title: "Alleppey Houseboat", caption: "Cruising through Kerala's palm-fringed backwaters.", imageUrl: "https://loremflickr.com/800/1000/alleppey,houseboat?lock=2530", tags: ["alleppey", "houseboat", "kerala", "india", "backwaters"] },
  { userId: 1013, title: "Coorg Coffee Plantation", caption: "Lush coffee estates in the Scotland of India.", imageUrl: "https://loremflickr.com/800/1000/coorg,coffee?lock=2578", tags: ["coorg", "coffee", "india", "plantation", "green"] },
  { userId: 1028, title: "Stars Over Pangong", caption: "The Milky Way reflected in the high-altitude lake.", imageUrl: "https://loremflickr.com/800/1000/astrophotography,pangong?lock=2626", tags: ["astrophotography", "pangong", "ladakh", "india", "stars"] },
  { userId: 1013, title: "Valley of Flowers", caption: "Alpine wildflowers blooming in Uttarakhand.", imageUrl: "https://loremflickr.com/800/1000/valleyofflowers,uttarakhand?lock=2674", tags: ["valleyofflowers", "uttarakhand", "india", "flowers", "trek"] },
  { userId: 1013, title: "Sunset Over Thar", caption: "Golden desert sunset from Sam Sand Dunes.", imageUrl: "https://loremflickr.com/800/1000/thar,sunset?lock=2722", tags: ["thar", "sunset", "rajasthan", "india", "desert"] },
  { userId: 1005, title: "Indian Monkey", caption: "A playful Rhesus macaque in the temple complex.", imageUrl: "https://loremflickr.com/800/1000/monkey,wildlife?lock=2770", tags: ["monkey", "wildlife", "india", "temple", "animal"] },
  { userId: 1013, title: "Lotus Bloom India", caption: "The sacred lotus flower in a temple pond.", imageUrl: "https://loremflickr.com/800/1000/lotus,flower?lock=2818", tags: ["lotus", "flower", "india", "sacred", "nature"] },
  { userId: 1001, title: "Mumbai CST Station", caption: "The Victorian Gothic architecture of CST.", imageUrl: "https://loremflickr.com/800/1000/mumbai,station?lock=2866", tags: ["mumbai", "station", "architecture", "india", "heritage"] },
  { userId: 1011, title: "Meenakshi Temple Gopuram", caption: "Thousands of colorful sculptures on the towering gopuram.", imageUrl: "https://loremflickr.com/800/1000/meenakshi,temple?lock=2914", tags: ["meenakshi", "temple", "tamilnadu", "india", "sculpture"] },
  { userId: 1008, title: "Leh Palace", caption: "The ancient royal palace overlooking the Leh valley.", imageUrl: "https://loremflickr.com/800/1000/leh,palace?lock=2962", tags: ["leh", "palace", "ladakh", "india", "heritage"] },

  // ═══════════ 20% INTERNATIONAL CONTENT ═══════════

  // ─── MARVEL & DC ───
  { userId: 1019, title: "Iron Man Suit Display", caption: "The iconic red and gold armor on display.", imageUrl: "https://loremflickr.com/800/1000/marvel,ironman?lock=3134", tags: ["marvel", "ironman", "superhero", "avengers", "comics"] },
  { userId: 1019, title: "Spider-Man Wall Art", caption: "Amazing Spider-Man street art on a city wall.", imageUrl: "https://loremflickr.com/800/1000/marvel,spiderman?lock=3182", tags: ["marvel", "spiderman", "streetart", "superhero", "art"] },
  { userId: 1019, title: "Captain America Shield", caption: "The vibranium shield — symbol of hope.", imageUrl: "https://loremflickr.com/800/1000/marvel,captainamerica?lock=3230", tags: ["marvel", "captainamerica", "superhero", "avengers", "shield"] },
  { userId: 1019, title: "Avengers Assemble", caption: "The ultimate superhero team-up.", imageUrl: "https://loremflickr.com/800/1000/marvel,avengers?lock=3278", tags: ["marvel", "avengers", "superhero", "team", "epic"] },
  { userId: 1020, title: "Batman Signal", caption: "The Bat-Signal lighting up Gotham's night sky.", imageUrl: "https://loremflickr.com/800/1000/dc,batman?lock=3326", tags: ["dc", "batman", "gotham", "superhero", "night"] },
  { userId: 1020, title: "Superman Symbol", caption: "The iconic S shield — hope for humanity.", imageUrl: "https://loremflickr.com/800/1000/dc,superman?lock=3374", tags: ["dc", "superman", "hope", "superhero", "symbol"] },
  { userId: 1020, title: "Joker Art", caption: "Why so serious? Stunning fan art of the Clown Prince.", imageUrl: "https://loremflickr.com/800/1000/dc,joker?lock=3422", tags: ["dc", "joker", "villain", "art", "dark"] },

  // ─── CODING & TECH ───
  { userId: 1007, title: "VS Code Setup", caption: "The perfect dark theme coding environment.", imageUrl: "https://loremflickr.com/800/1000/coding,vscode?lock=3532", tags: ["coding", "vscode", "programming", "developer", "tech"] },
  { userId: 1021, title: "Clean Code Terminal", caption: "Green text on black — the hacker aesthetic.", imageUrl: "https://loremflickr.com/800/1000/coding,terminal?lock=3580", tags: ["coding", "terminal", "hacker", "tech", "matrix"] },
  { userId: 1007, title: "JavaScript Code", caption: "Beautiful JavaScript code with syntax highlighting.", imageUrl: "https://loremflickr.com/800/1000/javascript,coding?lock=3628", tags: ["javascript", "coding", "programming", "web", "developer"] },
  { userId: 1021, title: "Mechanical Keyboard RGB", caption: "Custom mechanical keyboard with RGB backlighting.", imageUrl: "https://loremflickr.com/800/1000/keyboard,tech?lock=3676", tags: ["keyboard", "tech", "rgb", "gaming", "mechanical"] },
  { userId: 1021, title: "Server Room", caption: "Rows of blinking servers in a modern data center.", imageUrl: "https://loremflickr.com/800/1000/server,tech?lock=3724", tags: ["server", "tech", "datacenter", "cloud", "infrastructure"] },

  // ─── DOGS & CATS ───
  { userId: 1012, title: "Golden Retriever Smile", caption: "The happiest dog in the world.", imageUrl: "https://loremflickr.com/800/1000/dog,goldenretriever?lock=3834", tags: ["dog", "goldenretriever", "pets", "happy", "animal"] },
  { userId: 1012, title: "Indian Stray Puppy", caption: "An adorable Indian pariah puppy with soulful eyes.", imageUrl: "https://loremflickr.com/800/1000/dog,puppy?lock=3882", tags: ["dog", "puppy", "india", "stray", "cute"] },
  { userId: 1012, title: "Husky Blue Eyes", caption: "Piercing blue eyes of a Siberian Husky.", imageUrl: "https://loremflickr.com/800/1000/dog,husky?lock=3930", tags: ["dog", "husky", "pets", "blueeyes", "beautiful"] },
  { userId: 1022, title: "Persian Cat Royalty", caption: "A fluffy Persian cat with an aristocratic gaze.", imageUrl: "https://loremflickr.com/800/1000/cat,persian?lock=3978", tags: ["cat", "persian", "pets", "fluffy", "royal"] },
  { userId: 1022, title: "Kitten Yawning", caption: "The cutest kitten mid-yawn.", imageUrl: "https://loremflickr.com/800/1000/cat,kitten?lock=4026", tags: ["cat", "kitten", "pets", "cute", "yawn"] },
  { userId: 1022, title: "Orange Tabby Cat", caption: "A majestic orange tabby basking in sunlight.", imageUrl: "https://loremflickr.com/800/1000/cat,tabby?lock=4074", tags: ["cat", "tabby", "pets", "orange", "sun"] },

  // ─── INTERNATIONAL TRAVEL ───
  { userId: 1027, title: "Northern Lights Iceland", caption: "The spectacular Aurora Borealis.", imageUrl: "https://loremflickr.com/800/1000/aurora,iceland?lock=4184", tags: ["aurora", "iceland", "travel", "night", "nature"] },
  { userId: 1027, title: "Swiss Alps", caption: "Snow-capped peaks with a clear blue sky.", imageUrl: "https://loremflickr.com/800/1000/switzerland,alps?lock=4232", tags: ["switzerland", "alps", "mountains", "travel", "snow"] },
  { userId: 1027, title: "Japanese Cherry Blossoms", caption: "Sakura trees in full bloom along a Tokyo canal.", imageUrl: "https://loremflickr.com/800/1000/sakura,japan?lock=4280", tags: ["sakura", "japan", "cherryblossom", "travel", "spring"] },

  // ─── SPACE & ASTRONOMY ───
  { userId: 1023, title: "Nebula in Deep Space", caption: "A stunning view of a colorful nebula.", imageUrl: "https://loremflickr.com/800/1000/space,nebula?lock=4390", tags: ["space", "nebula", "astronomy", "galaxy", "cosmos"] },
  { userId: 1023, title: "Full Moon Close-up", caption: "High-resolution details of the lunar surface.", imageUrl: "https://loremflickr.com/800/1000/moon,space?lock=4438", tags: ["moon", "space", "astronomy", "night", "closeup"] },
  { userId: 1023, title: "Saturn Rings", caption: "The magnificent rings of Saturn.", imageUrl: "https://loremflickr.com/800/1000/saturn,space?lock=4486", tags: ["saturn", "space", "astronomy", "planet", "rings"] },

  // ─── GAMING ───
  { userId: 1021, title: "Gaming Setup RGB", caption: "Ultimate RGB gaming battlestation.", imageUrl: "https://loremflickr.com/800/1000/gaming,setup?lock=4596", tags: ["gaming", "setup", "rgb", "pc", "battlestation"] },
  { userId: 1021, title: "Retro Arcade", caption: "Classic arcade machines glowing in neon.", imageUrl: "https://loremflickr.com/800/1000/arcade,retro?lock=4644", tags: ["arcade", "retro", "gaming", "neon", "vintage"] },

  // ─── ABSTRACT & ART ───
  { userId: 1006, title: "Neon Abstract Waves", caption: "Flowing neon waves in a digital art piece.", imageUrl: "https://loremflickr.com/800/1000/abstract,neon?lock=4754", tags: ["abstract", "neon", "digital", "art", "creative"] },
  { userId: 1006, title: "Liquid Color Swirl", caption: "Abstract color mixing creating organic patterns.", imageUrl: "https://loremflickr.com/800/1000/abstract,color?lock=4802", tags: ["abstract", "color", "art", "liquid", "creative"] },
  { userId: 1006, title: "Geometric Pattern", caption: "Perfectly symmetrical geometric digital art.", imageUrl: "https://loremflickr.com/800/1000/geometric,pattern?lock=4850", tags: ["geometric", "pattern", "art", "abstract", "symmetry"] },

  // ─── FOOD INTERNATIONAL ───
  { userId: 1010, title: "Sushi Platter", caption: "Beautifully arranged sushi with wasabi and ginger.", imageUrl: "https://loremflickr.com/800/1000/sushi,food?lock=4960", tags: ["sushi", "food", "japanese", "seafood", "platter"] },
  { userId: 1004, title: "Pizza Margherita", caption: "A perfectly wood-fired Neapolitan Margherita pizza.", imageUrl: "https://loremflickr.com/800/1000/pizza,food?lock=8", tags: ["pizza", "food", "italian", "cheese", "woodfired"] },

  // ─── NATURE & OCEAN ───
  { userId: 1027, title: "Coral Reef Colors", caption: "Vibrant coral reef teeming with marine life.", imageUrl: "https://loremflickr.com/800/1000/coral,ocean?lock=118", tags: ["coral", "ocean", "underwater", "marine", "nature"] },
  { userId: 1027, title: "Wave Crashing", caption: "A powerful ocean wave caught at the perfect moment.", imageUrl: "https://loremflickr.com/800/1000/wave,ocean?lock=166", tags: ["wave", "ocean", "surf", "nature", "power"] },
  { userId: 1027, title: "Sunflower Field", caption: "An endless field of sunflowers facing the sun.", imageUrl: "https://loremflickr.com/800/1000/sunflower,flower?lock=214", tags: ["sunflower", "flower", "field", "nature", "yellow"] },

  // ─── ARCHITECTURE ───
  { userId: 1018, title: "Minimalist Interior", caption: "Clean lines and natural light in a modern home.", imageUrl: "https://loremflickr.com/800/1000/minimalist,interior?lock=324", tags: ["minimalist", "interior", "architecture", "modern", "design"] },
  { userId: 1018, title: "Brutalist Concrete", caption: "Raw concrete architecture in dramatic light.", imageUrl: "https://loremflickr.com/800/1000/brutalist,architecture?lock=372", tags: ["brutalist", "architecture", "concrete", "modern", "urban"] },
];

const seedIndian = async (req, res) => {
  try {
    // 1. Create all seed users
    for (const creator of seedCreators) {
      await pool.query(
        "INSERT IGNORE INTO users (id, username, email, full_name, password_hash) VALUES (?, ?, ?, ?, 'dummy')",
        [creator.id, creator.username, creator.email, creator.fullName]
      );
    }

    // 2. Fix any orphaned images
    await pool.query("UPDATE images SET user_id = 1001 WHERE user_id NOT IN (SELECT id FROM users)");

    // 2.5 Fix the weird LoremFlickr mismatched images with high-quality exact matching Unsplash images!
    const replacements = {
      "Virat Kohli Cover Drive": "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=800",
      "Spice Market Colors": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800",
      "Mehndi Art": "https://images.unsplash.com/photo-1610174066060-e7401a808af2?q=80&w=800",
      "Cricket Stadium Lights": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800",
      "Gully Cricket": "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=800",
      "Indian Cricket Fans": "https://images.unsplash.com/photo-1589828136398-e7c656910606?q=80&w=800",
      "Bollywood Dance Scene": "https://images.unsplash.com/photo-1517260911058-0fcfd7337c2f?q=80&w=800",
      "Taj Mahal at Sunrise": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800",
      "Indian Thali Feast": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800",
      "Mumbai Vada Pav": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800",
      "Diwali Diyas": "https://images.unsplash.com/photo-1511974753556-9ef02e4d2572?q=80&w=800",
      "Holi Colors Explosion": "https://images.unsplash.com/photo-1551608627-2c9769399eb6?q=80&w=800",
      "Bengal Tiger Resting": "https://images.unsplash.com/photo-1533227260811-2eb2f43dc138?q=80&w=800",
      "Yoga at Sunrise": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800"
    };
    for (const [title, url] of Object.entries(replacements)) {
      await pool.execute('UPDATE images SET image_url = ? WHERE title = ?', [url, title]);
    }

    // 3. Count how many seeded images we already have
    const [existing] = await pool.query("SELECT count(*) as count FROM images WHERE user_id >= 1001 AND user_id <= 1028");

    let count = 0;
    if (existing[0].count < 50) {
      // 4. Insert all seed images
      const insertedImageIds = [];
      for (const img of seedImages) {
        const created = await imageModel.create({
          userId: img.userId,
          title: img.title,
          caption: img.caption,
          imageUrl: img.imageUrl,
          sourceType: "upload",
          tags: img.tags
        });
        insertedImageIds.push(created.id);
        count++;
      }
      
      // 5. Add comments to some posts
      const sampleComments = [
        "Absolutely stunning!",
        "Love the colors here.",
        "Great shot, where is this?",
        "This aesthetic is exactly what I was looking for.",
        "So beautiful!",
        "Incredible composition.",
        "Wow, just wow.",
        "This is my new wallpaper.",
        "Amazing details.",
        "So calming to look at."
      ];
      
      let commentCount = 0;
      for (const imgId of insertedImageIds) {
        // 30% chance to have a comment
        if (Math.random() < 0.3) {
          const numComments = Math.floor(Math.random() * 3) + 1; // 1 to 3 comments
          for (let i = 0; i < numComments; i++) {
            const randomUserId = seedCreators[Math.floor(Math.random() * seedCreators.length)].id;
            const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
            await pool.execute(
              `INSERT INTO comments (image_id, user_id, body) VALUES (?, ?, ?)`,
              [imgId, randomUserId, randomComment]
            );
            commentCount++;
          }
        }
      }
      console.log(`Inserted ${commentCount} comments on seeded images.`);
    }

    res.json({ success: true, message: `Successfully seeded ${count} images from ${seedCreators.length} creators!` });
  } catch (error) {
    console.error("Error seeding images:", error);
    res.status(500).json({ success: false, message: "Error seeding images", error: error.message });
  }
};

module.exports = { seedIndian };
