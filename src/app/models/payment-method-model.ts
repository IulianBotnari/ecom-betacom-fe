export interface PaymentMethodModel {
  id: number;
  description: string;
  card: {
    cardNumber: string;
    expiryDate: string;
    cardHolder: string;
  };
}
