interface HotelOwnerInfoProps {
  owner: {
    name: string;
    image: string;
    description: string;
  };
}

export default function HotelOwnerInfo({ owner }: HotelOwnerInfoProps) {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Meet the Owner</h2>
      <div className="flex items-center mb-4">
        {/* <img
          src={owner.image}
          alt={owner.name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{owner.name}</h3>
          <p className="text-gray-600">{owner.description}</p>
        </div> */}
      </div>
    </div>
  );
}
