export interface HomeState {
	makes: Vehicle[]; 
	selectedMake: string; 
	selectedYear: string; 
 }
export interface Vehicle {
	Make_ID: string;
	Make_Name: string;
	Model_ID: string;
	Model_Name: string;
 }
export interface VehicleMake {
	MakeId: number;
	MakeName: string;
	Make_ID: string;
 }