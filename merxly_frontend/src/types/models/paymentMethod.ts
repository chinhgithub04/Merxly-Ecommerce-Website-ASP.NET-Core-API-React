export interface CardDetailsDto {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

export interface PaymentMethodDto {
  id: string;
  type: string;
  card: CardDetailsDto | null;
  isDefault: boolean;
  createdAt: string;
}

export interface AddPaymentMethodDto {
  paymentMethodId: string;
}

export interface SetDefaultPaymentMethodDto {
  paymentMethodId: string;
}
