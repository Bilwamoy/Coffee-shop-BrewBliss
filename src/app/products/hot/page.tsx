import GoToMenuSection from '@/components/ui/GoToMenuSection';

export default function HotDrinksPage() {
  return (
    <>
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-4xl text-primary-dark mb-6">
            Hot Drinks
          </h1>
          <p className="font-body text-primary-dark/80 mb-8">
            Explore our exquisite selection of hot beverages, crafted to warm your soul and delight your senses. From rich espressos to creamy lattes and comforting teas, each cup is prepared with the finest ingredients and a passion for perfection.
          </p>
          <ul className="font-body text-primary-dark/80 list-disc list-inside text-left mx-auto max-w-md">
            <li>Espresso</li>
            <li>Americano</li>
            <li>Cappuccino</li>
            <li>Latte</li>
            <li>Mocha</li>
            <li>Hot Chocolate</li>
            <li>Chai Latte</li>
            <li>Assorted Teas</li>
          </ul>
        </div>
      </div>
      
      {/* Go to Menu Section */}
      <GoToMenuSection />
    </>
  );
}