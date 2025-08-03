export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl text-primary-dark mb-8 text-center">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          <div className="bg-secondary-light p-6 rounded-lg shadow">
            <h2 className="font-heading text-xl text-primary-dark mb-2">Q: What are your opening hours?</h2>
            <p className="font-body text-primary-dark/80">
              A: Our typical hours are Monday-Friday, 7 AM - 6 PM, and Saturday-Sunday, 8 AM - 5 PM. Please check our Locations page for specific store hours.
            </p>
          </div>
          <div className="bg-secondary-light p-6 rounded-lg shadow">
            <h2 className="font-heading text-xl text-primary-dark mb-2">Q: Do you offer dairy-free milk options?</h2>
            <p className="font-body text-primary-dark/80">
              A: Yes, we offer a variety of dairy-free milk alternatives including almond, oat, and soy milk.
            </p>
          </div>
          <div className="bg-secondary-light p-6 rounded-lg shadow">
            <h2 className="font-heading text-xl text-primary-dark mb-2">Q: Can I order online for pickup?</h2>
            <p className="font-body text-primary-dark/80">
              A: Yes, you can place an order through our website for convenient in-store pickup at your preferred location.
            </p>
          </div>
          <div className="bg-secondary-light p-6 rounded-lg shadow">
            <h2 className="font-heading text-xl text-primary-dark mb-2">Q: Do you have a loyalty program?</h2>
            <p className="font-body text-primary-dark/80">
              A: Absolutely! Join our Brew & Bliss Rewards program to earn points with every purchase and redeem them for free drinks and exclusive offers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}