"use client"
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Loading from '../../../Components/UI/Loader/Loader'; 
import { Vehicle } from '@/app/models/models';
import Loader from '../../../Components/UI/Loader/Loader';

export default function ResultPage() {
  const { makeId, year } = useParams(); 
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [makeName, setMakeName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (makeId && year) {
      const fetchVehicles = async () => {
        setLoading(true);
        try {
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


  return (
	<Suspense fallback={<Loader/>}>
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Результати для марки {makeName} і року {year}
      </h1>
      <ul className="space-y-4 max-h-[400px] overflow-y-auto">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <li
              key={vehicle.Model_ID}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <span className="font-semibold text-lg text-gray-700">Марка: {vehicle.Make_Name}</span>
                <br />
                <span className="text-gray-600">Модель: {vehicle.Model_Name}</span>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-600 text-center">Немає доступних моделей для цієї марки і року.</li>
        )}
      </ul>
    </div>
	 </Suspense>
  );
}
