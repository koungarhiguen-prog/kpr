/**
 * Payment Service abstraction for BizPilot AI.
 * Prepared for future integration of Mobile Money (MTN, Airtel, Orange, Wave),
 * Stripe, and local payment gateways.
 *
 * NOTE: In V1, payments are not active. No fake transactions occur.
 */

export interface PaymentMethodConfig {
  id: string;
  name: string;
  provider: 'mobile_money' | 'stripe' | 'local_cash';
  available: boolean;
  currencies: string[];
}

export interface PaymentInitiationResult {
  success: boolean;
  status: 'pending' | 'ready_for_integration' | 'unsupported';
  message: string;
}

export const paymentService = {
  getAvailableMethods(): PaymentMethodConfig[] {
    return [
      {
        id: 'mtn_momo',
        name: 'MTN Mobile Money',
        provider: 'mobile_money',
        available: false,
        currencies: ['XAF', 'XOF', 'USD'],
      },
      {
        id: 'airtel_money',
        name: 'Airtel Money',
        provider: 'mobile_money',
        available: false,
        currencies: ['XAF', 'XOF'],
      },
      {
        id: 'orange_money',
        name: 'Orange Money',
        provider: 'mobile_money',
        available: false,
        currencies: ['XOF', 'XAF'],
      },
      {
        id: 'stripe_card',
        name: 'Carte Bancaire (Visa / Mastercard)',
        provider: 'stripe',
        available: false,
        currencies: ['EUR', 'USD', 'XAF'],
      },
    ];
  },

  /**
   * Safe stub that transparently informs the user that payments are coming in V2.
   */
  async initiateCheckout(plan: 'pro' | 'business', _methodId: string): Promise<PaymentInitiationResult> {
    return {
      success: false,
      status: 'ready_for_integration',
      message: `La passerelle de paiement pour le plan ${plan.toUpperCase()} est en cours de déploiement pour la V2. Aucune somme ne sera débitée actuellement.`,
    };
  },
};
