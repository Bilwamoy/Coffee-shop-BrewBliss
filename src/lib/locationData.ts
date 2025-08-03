export interface Location {  id: number;  name: string;  address: string;  hours: string;  imageUrl: string;  mapUrl: string;  reviews: { author: string; comment: string; rating: number }[];  menu: { name: string; price: string }[];}// Dummy data for coffee shop locations
export const locationData: Location[] = [
  {
    id: 1,
    name: "Brew & Bliss - Downtown",
    address: "123 Main St, Anytown, USA",
    hours: "Mon-Fri: 6am - 8pm, Sat-Sun: 7am - 7pm",
    imageUrl: "/images/coffeeshop interior.png",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678901234567!2d-74.005941!3d40.712776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA4JzU4LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus",
    reviews: [
      { author: "John Doe", comment: "Great coffee and atmosphere!", rating: 5 },
      { author: "Jane Smith", comment: "A bit crowded, but worth the wait.", rating: 4 },
    ],
    menu: [
      { name: "Espresso", price: "$3.00" },
      { name: "Latte", price: "$4.50" },
      { name: "Cappuccino", price: "$4.50" },
    ],
  },
  {
    id: 2,
    name: "Brew & Bliss - Suburbia",
    address: "456 Oak Ave, Suburbia, USA",
    hours: "Mon-Fri: 7am - 6pm, Sat-Sun: 8am - 5pm",
    imageUrl: "/images/coffeeshop interior.png",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678901234567!2d-74.005941!3d40.712776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA4JzU4LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus",
    reviews: [
      { author: "Peter Jones", comment: "My favorite local coffee spot.", rating: 5 },
      { author: "Mary Williams", comment: "Friendly staff and delicious pastries.", rating: 5 },
    ],
    menu: [
      { name: "Drip Coffee", price: "$2.50" },
      { name: "Iced Coffee", price: "$3.50" },
      { name: "Croissant", price: "$3.00" },
    ],
  },
];
