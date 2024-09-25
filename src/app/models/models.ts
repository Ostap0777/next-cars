export interface HomeState {
	makes: VehicleMake[]; 
	selectedMake: string; 
	selectedYear: string; 
 }
export interface VehicleMake {
	MakeId: number;
	MakeName: string;
 }
 