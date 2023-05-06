import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  reference: string,
  labelName: string
}

export interface FormValues {
  reference: string,
    description: string,
    propertyType: string,
    grams:number,
    material: string,
    cost: number ,
}

export interface PropertyCardProps {
  id?: BaseKey | undefined,
  reference: string,
  material: string,
  cost: number,
  photo: string,
}



// export interface IOrder {
//   id: number;
//   //user: IUser;
//   createdAt: string;
//   products: PropertyCardProps[];
//   //status: IOrderStatus;
//   //adress: IAddress;
//   //store: IStore;
//   //courier: ICourier;
//   events: IEvent[];
//   orderNumber: number;
//   amount: number;
// }

interface IOrder {
  _id: string;
  user: string;
  orderDate: Date;
  orderNumber: string;
  NumberArticles: number;
  Total: number;
  products: {
    product: string;
    quantity: number;
    _id: string;
  }[];
  creator: string;
  __v: number;
}

export interface IOrderFilterVariables {
  q?: string;
  material?: string;
  user?: string;
  status?: string[];
}

export interface IEvent {
  date: string;
  status: string;
}