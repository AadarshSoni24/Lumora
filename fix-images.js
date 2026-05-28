const mysql = require('mysql2/promise');
require('dotenv').config({ path: 'c:/Users/aadar/Downloads/cms/CMS/CMS/backend/.env' });

async function fixImages() {
  const pool = mysql.createPool(process.env.MYSQL_URL);
  
  const replacements = {
    "Virat Kohli Cover Drive": "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=800", // cricket stadium
    "Spice Market Colors": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800", // spices
    "Mehndi Art": "https://images.unsplash.com/photo-1610174066060-e7401a808af2?q=80&w=800", // mehndi hands
    "Cricket Stadium Lights": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800", // stadium
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

  try {
    for (const [title, url] of Object.entries(replacements)) {
      await pool.execute('UPDATE images SET image_url = ? WHERE title = ?', [url, title]);
      console.log(`Fixed image for: ${title}`);
    }
    
    // For all other loremflickr images, let's just delete them if they have "cricket" or "mehndi" in the title
    // or just let them be if they are mostly ok. The user complained specifically about Virat Kohli and the red Mehndi photo.
    console.log("Done fixing images!");
  } catch(e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}

fixImages();
