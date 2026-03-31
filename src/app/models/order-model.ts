import { OrderedItemsDetailsModel } from "./ordered-items-details-model";

export interface OrderModel {
  id: number;
  date: string;
  status: string;
  orderPrice: number;
  details: OrderedItemsDetailsModel[];
}
