export default function FoodPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-heading text-4xl text-primary-dark mb-6">
          Food Menu
        </h1>
        <p className="font-body text-primary-dark/80 mb-8">
          Complement your coffee with our delicious selection of freshly prepared food items. From light pastries to hearty sandwiches, we have something to satisfy every craving throughout the day.
        </p>
        <ul className="font-body text-primary-dark/80 list-disc list-inside text-left mx-auto max-w-md">
          <li>Croissants & Pastries</li>
          <li>Muffins & Scones</li>
          <li>Breakfast Burritos</li>
          <li>Assorted Sandwiches</li>
          <li>Salads</li>
          <li>Soups (seasonal)</li>
          <li>Cakes & Desserts</li>
        </ul>
      </div>
    </div>
  );
}