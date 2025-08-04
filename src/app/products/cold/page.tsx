import GoToMenuSection from '@/components/ui/GoToMenuSection';

export default function ColdDrinksPage() {
  return (
    <>
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-4xl text-primary-dark mb-6">
            Cold Drinks
          </h1>
          <p className="font-body text-primary-dark/80 mb-8">
            Refresh yourself with our invigorating cold beverages. Perfect for a warm day or whenever you need a cool pick-me-up, our cold drinks are made with the same dedication to quality and flavor as our hot selections.
          </p>
          <ul className="font-body text-primary-dark/80 list-disc list-inside text-left mx-auto max-w-md">
            <li>Iced Coffee</li>
            <li>Cold Brew</li>
            <li>Iced Latte</li>
            <li>Iced Mocha</li>
            <li>Frappuccino (various flavors)</li>
            <li>Iced Tea</li>
            <li>Smoothies</li>
          </ul>
        </div>
      </div>
      
      {/* Go to Menu Section */}
      <GoToMenuSection />
    </>
  );
}