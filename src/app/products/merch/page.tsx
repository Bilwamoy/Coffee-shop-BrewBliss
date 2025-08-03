export default function MerchandisePage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-heading text-4xl text-primary-dark mb-6">
          Merchandise
        </h1>
        <p className="font-body text-primary-dark/80 mb-8">
          Take a piece of Brew & Bliss home with you! Our exclusive merchandise collection features high-quality items designed to enhance your coffee experience and show off your love for our brand.
        </p>
        <ul className="font-body text-primary-dark/80 list-disc list-inside text-left mx-auto max-w-md">
          <li>Branded Coffee Mugs</li>
          <li>Reusable Tumblers</li>
          <li>Brew & Bliss T-shirts</li>
          <li>Coffee Bean Bags (various roasts)</li>
          <li>Brewing Equipment</li>
          <li>Gift Cards</li>
        </ul>
      </div>
    </div>
  );
}