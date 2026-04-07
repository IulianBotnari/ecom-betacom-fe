import { AddressModel } from "./address-model";
import { OrderModel } from "./order-model";
import { PaymentMethodModel } from "./payment-method-model";

export interface UserModel {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  codiceFiscale: string;
  birthday: string;
  role: string;
  addresses: AddressModel[]; 
  orders: OrderModel[];       
  paymentMethods: PaymentMethodModel[];
}
