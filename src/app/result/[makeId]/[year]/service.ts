import { VehicleMake } from "@/app/models/models";

export async function generateStaticParams(): Promise<{ makeId: string; year: string }[]> {
  const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json');
  const data: { Results: VehicleMake[] } = await response.json();

  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

  const paths = data.Results.flatMap((make: VehicleMake) =>
    years.map((year) => ({
      makeId: make.Make_ID, 
      year: year.toString(),
    }))
  );

  return paths;
}
