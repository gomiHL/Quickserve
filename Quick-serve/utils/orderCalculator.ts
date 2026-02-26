// تعريف الأنواع (Types) باش TypeScript يكون هاني
export interface OrderBreakdown {
  deliveryFee: number;
  tvaAmount: number;
  serviceFee: number;
  finalTotal: number;
}

export const calculateOrder = (basketTotal: number, distanceKm: number): OrderBreakdown => {
  const baseDeliveryFee = 7.0;
  const perKmFee = 2.0;
  const serviceFee = 2.5;
  const taxRate = 0.20;

  const deliveryFee = baseDeliveryFee + (distanceKm * perKmFee);
  const tvaAmount = (deliveryFee + serviceFee) * taxRate;
  const finalTotal = basketTotal + deliveryFee + serviceFee;

  return {
    deliveryFee,
    tvaAmount,
    serviceFee,
    finalTotal,
  };
};