// Menu data for Brew & Bliss coffee shop
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category?: string;
  price?: number;
}

export const menuData: MenuItem[] = [
  {
    "id": 1,
    "name": "Caffè Latte",
    "description": "Our dark, rich espresso balanced with steamed milk and a light layer of foam. A perfect classic.",
    "imageUrl": "/menu-images/caffeLatte.png"
  },
  {
    "id": 2,
    "name": "Cappuccino",
    "description": "Dark, rich espresso lies in wait under a smoothed and stretched layer of thick milk foam.",
    "imageUrl": "/menu-images/Cappuccino.png"
  },
  {
    "id": 3,
    "name": "Caramel Macchiato",
    "description": "Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle.",
    "imageUrl": "/menu-images/Caramel Macchiato.png"
  },
  {
    "id": 4,
    "name": "Caffè Americano",
    "description": "Espresso shots topped with hot water to produce a light layer of crema in a wonderfully rich cup.",
    "imageUrl": "/menu-images/Caffè Americano.png"
  },
  {
    "id": 5,
    "name": "Caffè Mocha",
    "description": "Rich, full-bodied espresso combined with bittersweet mocha sauce and steamed milk, then topped with sweetened whipped cream.",
    "imageUrl": "/menu-images/Caffè Mocha.png"
  },
  {
    "id": 6,
    "name": "Espresso",
    "description": "Our smooth signature Espresso Roast with a rich flavor and caramelly sweetness is at the very heart of everything we do.",
    "imageUrl": "/menu-images/Espresso.png"
  },
  {
    "id": 7,
    "name": "Flat White",
    "description": "Smooth ristretto shots of espresso get the perfect amount of steamed whole milk to create a not-too-strong, not-too-creamy, just-right flavor.",
    "imageUrl": "/menu-images/Flat White.png"
  },
  {
    "id": 8,
    "name": "Iced Coffee",
    "description": "Freshly brewed and chilled, served sweetened over ice. A refreshing and classic way to enjoy your coffee.",
    "imageUrl": "/menu-images/Iced Coffee.png"
  },
  {
    "id": 9,
    "name": "Cold Brew",
    "description": "Our custom blend of beans is grown to steep long and cold for a super-smooth flavor. Slow-steeped for a rich and creamy taste.",
    "imageUrl": "/menu-images/Cold Brew.png"
  },
  {
    "id": 10,
    "name": "Iced Caramel Blended Coffee",
    "description": "Caramel syrup meets coffee, milk and ice for a rendezvous in the blender, while whipped cream and buttery caramel sauce layer the love on top.",
    "imageUrl": "/menu-images/Iced Caramel Blended Coffee.png"
  },
  {
    "id": 11,
    "name": "Matcha Green Tea Latte",
    "description": "Smooth and creamy matcha sweetened just right and served with steamed milk. A vibrant and uplifting choice.",
    "imageUrl": "/menu-images/Matcha Green Tea Latte.png"
  },
  {
    "id": 12,
    "name": "Chai Tea Latte",
    "description": "Black tea infused with cinnamon, clove and other warming spices is combined with steamed milk and topped with foam for the perfect balance of sweet and spicy.",
    "imageUrl": "/menu-images/Chai Tea Latte.png"
  },
  {
    "id": 13,
    "name": "Classic Hot Chocolate",
    "description": "Steamed milk and mocha sauce topped with sweetened whipped cream and a chocolate-flavored drizzle. A timeless classic.",
    "imageUrl": "/menu-images/Classic Hot Chocolate.png"
  },
  {
    "id": 14,
    "name": "Strawberry & Crème Frappuccino",
    "description": "Strawberries and milk are blended with ice and topped with a swirl of whipped cream. A fruity and refreshing favorite.",
    "imageUrl": "/menu-images/Strawberry & Crème Frappuccino.png"
  },
  {
    "id": 15,
    "name": "Java Chip Frappuccino",
    "description": "We blend mocha sauce and Frappuccino® chips with coffee, milk and ice, then top it off with whipped cream and a mocha drizzle to bring you endless java joy.",
    "imageUrl": "/menu-images/Java Chip Frappuccino.png"
  },
  {
    "id": 16,
    "name": "New York Cheesecake",
    "description": "A classic New York-style cheesecake with a rich, dense, smooth, and creamy consistency, on a graham cracker crust.",
    "imageUrl": "/menu-images/New York Cheesecake.png"
  },
  {
    "id": 17,
    "name": "Chocolate Lava Cake",
    "description": "A decadent chocolate cake with a warm, gooey molten chocolate center. Served warm to perfection.",
    "imageUrl": "/menu-images/Chocolate Lava Cake.png"
  },
  {
    "id": 18,
    "name": "Red Velvet Cake",
    "description": "A stunning layered red velvet cake with a smooth, sweet cream cheese frosting. A truly luxurious dessert.",
    "imageUrl": "/menu-images/Red Velvet Cake.png"
  },
  {
    "id": 19,
    "name": "Blueberry Muffin",
    "description": "A soft, fluffy muffin bursting with juicy blueberries and a hint of sweetness. Perfect for breakfast or a snack.",
    "imageUrl": "/menu-images/Blueberry Muffin.png"
  },
  {
    "id": 20,
    "name": "Cinnamon Roll",
    "description": "A warm, gooey pastry swirled with cinnamon and sugar, generously topped with a sweet cream cheese glaze.",
    "imageUrl": "/menu-images/Cinnamon Roll.png"
  },
  {
    "id": 21,
    "name": "Tiramisu",
    "description": "A classic Italian dessert with layers of coffee-soaked ladyfingers, mascarpone cheese, and a dusting of cocoa powder.",
    "imageUrl": "/menu-images/Tiramisu.png"
  },
  {
    "id": 22,
    "name": "Lemon Tart",
    "description": "A zesty and refreshing lemon tart with a buttery crust and a smooth, tangy lemon curd filling.",
    "imageUrl": "/menu-images/Lemon Tart.png"
  },
  {
    "id": 23,
    "name": "Chocolate Chip Cookie",
    "description": "The ultimate classic cookie, loaded with semi-sweet chocolate chips. Crispy on the outside, soft and chewy on the inside.",
    "imageUrl": "/menu-images/Chocolate Chip Cookie.png"
  },
  {
    "id": 24,
    "name": "Oatmeal Raisin Cookie",
    "description": "A wholesome and hearty cookie made with rolled oats, plump raisins, and a hint of cinnamon.",
    "imageUrl": "/menu-images/Oatmeal Raisin Cookie.png"
  },
  {
    "id": 25,
    "name": "Double Chocolate Cookie",
    "description": "A chocolate lover's dream. A rich chocolate cookie packed with even more chocolate chips.",
    "imageUrl": "/menu-images/Double Chocolate Cookie.png"
  },
  {
    "id": 26,
    "name": "Almond Biscotti",
    "description": "A twice-baked Italian almond cookie. Perfectly crunchy and ideal for dipping into your favorite coffee or tea.",
    "imageUrl": "/menu-images/Almond Biscotti.png"
  },
  {
    "id": 27,
    "name": "Chicken & Bacon Sandwich",
    "description": "Grilled chicken breast, crispy bacon, lettuce, tomato, and creamy ranch on toasted multigrain bread.",
    "imageUrl": "/menu-images/Chicken & Bacon Sandwich.png"
  },
  {
    "id": 28,
    "name": "Caprese Sandwich",
    "description": "Fresh mozzarella, ripe tomatoes, and basil pesto drizzled with balsamic glaze on a crusty ciabatta roll.",
    "imageUrl": "/menu-images/Caprese Sandwich.png"
  },
  {
    "id": 29,
    "name": "Spinach and Feta Wrap",
    "description": "A flavorful wrap filled with cage-free egg whites, spinach, feta cheese, and sun-dried tomatoes in a whole-wheat tortilla.",
    "imageUrl": "/menu-images/Spinach and Feta Wrap.png"
  },
  {
    "id": 30,
    "name": "Quiche Lorraine",
    "description": "A savory egg custard pie with bacon, Swiss cheese, and onions in a flaky pastry crust. A timeless French classic.",
    "imageUrl": "/menu-images/Quiche Lorraine.png"
  }
];

// Categorize a menu item based on its name
export const getMenuItemCategory = (itemName: string): string => {
  if (itemName.includes("Latte") || itemName.includes("Cappuccino") || 
      itemName.includes("Macchiato") || itemName.includes("Espresso") ||
      itemName.includes("Americano") || itemName.includes("Mocha") ||
      itemName.includes("Flat White")) {
    return "Coffee";
  } else if (itemName.includes("Iced") || itemName.includes("Cold Brew")) {
    return "Cold Drinks";
  } else if (itemName.includes("Matcha") || itemName.includes("Chai")) {
    return "Tea";
  } else if (itemName.includes("Hot Chocolate") || itemName.includes("Frappuccino")) {
    return "Specialty Drinks";
  } else if (itemName.includes("Cheesecake") || itemName.includes("Cake") || 
             itemName.includes("Tart") || itemName.includes("Muffin") || 
             itemName.includes("Roll") || itemName.includes("Cookie") || 
             itemName.includes("Biscotti")) {
    return "Pastries";
  } else if (itemName.includes("Sandwich") || itemName.includes("Wrap") || 
             itemName.includes("Quiche")) {
    return "Food";
  } else {
    return "Other";
  }
};

// Extract unique categories from menu items based on their names
export const getMenuCategories = (): string[] => {
  const categories = new Set<string>();
  
  menuData.forEach(item => {
    // Categorize items based on their names
    if (item.name.includes("Latte") || item.name.includes("Cappuccino") || 
        item.name.includes("Macchiato") || item.name.includes("Espresso") ||
        item.name.includes("Americano") || item.name.includes("Mocha") ||
        item.name.includes("Flat White")) {
      categories.add("Coffee");
    } else if (item.name.includes("Iced") || item.name.includes("Cold Brew")) {
      categories.add("Cold Drinks");
    } else if (item.name.includes("Matcha") || item.name.includes("Chai")) {
      categories.add("Tea");
    } else if (item.name.includes("Hot Chocolate") || item.name.includes("Frappuccino")) {
      categories.add("Specialty Drinks");
    } else if (item.name.includes("Cheesecake") || item.name.includes("Cake") || 
               item.name.includes("Tart") || item.name.includes("Muffin") || 
               item.name.includes("Roll") || item.name.includes("Cookie") || 
               item.name.includes("Biscotti")) {
      categories.add("Pastries");
    } else if (item.name.includes("Sandwich") || item.name.includes("Wrap") || 
               item.name.includes("Quiche")) {
      categories.add("Food");
    } else {
      categories.add("Other");
    }
  });
  
  return Array.from(categories);
};

// Filter menu items by category
export const getMenuItemsByCategory = (category: string): MenuItem[] => {
  return menuData.filter(item => {
    if (category === "Coffee") {
      return item.name.includes("Latte") || item.name.includes("Cappuccino") || 
             item.name.includes("Macchiato") || item.name.includes("Espresso") ||
             item.name.includes("Americano") || item.name.includes("Mocha") ||
             item.name.includes("Flat White");
    } else if (category === "Cold Drinks") {
      return item.name.includes("Iced") || item.name.includes("Cold Brew");
    } else if (category === "Tea") {
      return item.name.includes("Matcha") || item.name.includes("Chai");
    } else if (category === "Specialty Drinks") {
      return item.name.includes("Hot Chocolate") || item.name.includes("Frappuccino");
    } else if (category === "Pastries") {
      return item.name.includes("Cheesecake") || item.name.includes("Cake") || 
             item.name.includes("Tart") || item.name.includes("Muffin") || 
             item.name.includes("Roll") || item.name.includes("Cookie") || 
             item.name.includes("Biscotti");
    } else if (category === "Food") {
      return item.name.includes("Sandwich") || item.name.includes("Wrap") || 
             item.name.includes("Quiche");
    } else {
      // For "Other" category, return items that don't fit any specific category
      return !(item.name.includes("Latte") || item.name.includes("Cappuccino") || 
               item.name.includes("Macchiato") || item.name.includes("Espresso") ||
               item.name.includes("Americano") || item.name.includes("Mocha") ||
               item.name.includes("Flat White") || item.name.includes("Iced") || 
               item.name.includes("Cold Brew") || item.name.includes("Matcha") || 
               item.name.includes("Chai") || item.name.includes("Hot Chocolate") || 
               item.name.includes("Frappuccino") || item.name.includes("Cheesecake") || 
               item.name.includes("Cake") || item.name.includes("Tart") || 
               item.name.includes("Muffin") || item.name.includes("Roll") || 
               item.name.includes("Cookie") || item.name.includes("Biscotti") ||
               item.name.includes("Sandwich") || item.name.includes("Wrap") || 
               item.name.includes("Quiche"));
    }
  });
};