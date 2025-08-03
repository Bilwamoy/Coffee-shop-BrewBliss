"use client";
import { useParams } from 'next/navigation';
import { locationData } from '@/lib/locationData';
import Image from 'next/image';

const LocationPage = () => {
  const { id } = useParams();
  const location = locationData.find((loc) => loc.id === parseInt(id as string));

  if (!location) {
    return <div>Location not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={location.imageUrl}
            alt={location.name}
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{location.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{location.address}</p>
          <p className="text-lg text-gray-700 mb-4">{location.hours}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {location.menu.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-700">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div>
          {location.reviews.map((review, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center mb-2">
                <p className="font-semibold">{review.author}</p>
                <div className="flex ml-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.561-.955L10 0l2.95 5.955 6.561.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Directions</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={location.mapUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
