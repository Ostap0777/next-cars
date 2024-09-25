'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Vehicle {
  Make_ID: string;
  Make_Name: string;
  Model_ID: string;
  Model_Name: string;
}

export default function ResultPage() {
  const { makeId, year } = useParams();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [makeName, setMakeName] = useState<string | null>(null); // Стейт для зберігання назви марки
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (makeId && year) {
      const fetchVehicles = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
          );
          if (!response.ok) {
            throw new Error('Помилка при завантаженні даних');
          }
          const data = await response.json();
          setVehicles(data.Results);

          if (data.Results.length > 0) {
            setMakeName(data.Results[0].Make_Name);
          }
        } catch (error) {
          setError('Не вдалося завантажити дані');
        } finally {
          setLoading(false);
        }
      };
      fetchVehicles();
    }
  }, [makeId, year]);

  if (loading) return <div className="text-center text-xl">Завантаження...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Результати для марки {makeName} і року {year}
      </h1>
      {vehicles.length === 0 ? (
        <div className="text-center text-gray-500">Немає автомобілів для цієї марки та року.</div>
      ) : (
        <ul className="space-y-4">
          {vehicles.map((vehicle) => (
            <li
              key={vehicle.Model_ID}
              className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <span className="font-semibold text-lg text-gray-700">{vehicle.Make_Name}</span>
              <span className="text-gray-600"> - {vehicle.Model_Name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
