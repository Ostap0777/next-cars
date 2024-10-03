"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Suspense from "../Components/UI/Loader/Loader"; 
import { VehicleMake } from "../models/models";


export default function Home() {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);

  useEffect(() => {
    const fetchMakes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
        );
        const data = await response.json();
        setMakes(data.Results as VehicleMake[]);
      } catch (error) {
        console.error("Error fetching makes", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchMakes();
  }, []);

  const isNextEnabled = selectedMake && selectedYear;

  return (
    <div>
      {loading ? (
        <Suspense />
      ) : (
        <div className="w-full max-w-lg bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Фільтрація автомобілів</h1>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Виберіть виробника автомобіля
          </label>
          <select  className="block w-full p-2 border border-gray-300 rounded mb-4" onChange={(e) => setSelectedMake(e.target.value)}   defaultValue="" >
            <option value="" disabled>
              Виберіть виробника
            </option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeId}>
                {make.MakeName}
              </option>
            ))}
          </select>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Виберіть модельний рік
          </label>
          <select className="block w-full p-2 border border-gray-300 rounded mb-4" onChange={(e) => setSelectedYear(e.target.value)} defaultValue="">
            <option value="" disabled>
              Виберіть рік
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <Link href={`/result/${selectedMake}/${selectedYear}`}>
            <button className={`w-full p-2 text-white rounded ${ isNextEnabled ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed" }`} disabled={!isNextEnabled}>
              Далі
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
