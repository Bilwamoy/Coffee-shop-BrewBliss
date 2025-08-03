export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-heading text-4xl text-primary-dark mb-6">
          Contact Us
        </h1>
        <p className="font-body text-primary-dark/80 mb-8">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us through the methods below.
        </p>
        <div className="font-body text-primary-dark/80 space-y-4">
          <p>
            <strong>Email:</strong> info@brewbliss.com
          </p>
          <p>
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p>
            <strong>Address:</strong> 123 Coffee Lane, Brewtown, CA 90210
          </p>
          <p>
            <strong>Business Hours:</strong> Monday - Friday: 7:00 AM - 6:00 PM, Saturday - Sunday: 8:00 AM - 5:00 PM
          </p>
        </div>
      </div>
    </div>
  );
}