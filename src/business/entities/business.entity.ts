export interface Business {
  id: string;
  name: string;
  ownerId: string;
  orders?: Array<any>;
  departmentHeads?: Array<any>;
}
