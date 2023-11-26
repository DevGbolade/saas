export class Order {
  amount: number;
  date: string;
  status: string;
  departmentHeadId: string;
  transactions?: Array<any>;
  businessId?: string;
}
