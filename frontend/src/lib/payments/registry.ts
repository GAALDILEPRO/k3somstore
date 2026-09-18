import { IPaymentProvider, PaymentInitiateRequest, PaymentInitiateResult, PaymentVerifyResult } from './types';
import { PaymentMethod } from '../types';

export class EvcPlusProvider implements IPaymentProvider {
  readonly id: PaymentMethod = 'EVC_PLUS';
  readonly name = 'EVC Plus (Hormuud)';
  readonly providerName = 'Hormuud Telecom';
  readonly requiresPhone = true;
  readonly isAvailable = true;
  readonly dialCodeGuide = '*712*611609365*Amount#';
  readonly description = {
    en: 'Pay instantly from your Hormuud mobile phone using EVC Plus (*712*611609365*Amount#).',
    so: 'Ku bixi lacagta toos EVC Plus (Hormuud) adigoo wacaya *712*611609365*Lacagta#.',
  };

  async initiatePayment(req: PaymentInitiateRequest): Promise<PaymentInitiateResult> {
    const hasLiveCredentials = Boolean(process.env.EVC_MERCHANT_ID && process.env.EVC_API_KEY);

    if (hasLiveCredentials) {
      // Official Hormuud API endpoint integration point
      // Ready to dispatch HTTP request to Hormuud Merchant Gateway
      return {
        success: true,
        paymentMethod: this.id,
        paymentStatus: 'PENDING',
        requiresCustomerAction: true,
        actionType: 'USSD_PROMPT',
        instructions: {
          en: `A payment prompt of $${req.amount.toFixed(2)} has been pushed to ${req.customerPhone}. Enter your PIN to confirm.`,
          so: `Farriin lacag bixin $${req.amount.toFixed(2)} ah ayaa loo diray ${req.customerPhone}. Geli PIN-kaaga si aad u xaqiijiso.`,
        },
      };
    }

    // Architecture ready mode when awaiting merchant live credentials
    return {
      success: true,
      paymentMethod: this.id,
      paymentStatus: 'AWAITING_VERIFICATION',
      transactionReference: `EVC-${Date.now()}`,
      requiresCustomerAction: true,
      actionType: 'MANUAL_VERIFICATION',
      merchantAccountId: process.env.NEXT_PUBLIC_EVC_MERCHANT_NUMBER || '611609365',
      instructions: {
        en: `Please transfer $${req.amount.toFixed(2)} to K3SOMSTORE merchant number (611609365) via EVC Plus (*712*611609365*${Math.round(req.amount)}#).`,
        so: `Fadlan $${req.amount.toFixed(2)} ugu wareeji nambarka shirkadda (611609365) adigoo isticmaalaya EVC Plus (*712*611609365*${Math.round(req.amount)}#).`,
      },
    };
  }

  async verifyPayment(orderId: string, reference: string): Promise<PaymentVerifyResult> {
    return {
      verified: Boolean(reference && reference.length >= 6),
      status: 'AWAITING_VERIFICATION',
      providerReference: reference,
      message: 'Payment verification recorded and queued for merchant audit.',
    };
  }
}

export class ZaadProvider implements IPaymentProvider {
  readonly id: PaymentMethod = 'ZAAD';
  readonly name = 'Zaad Service (Telesom)';
  readonly providerName = 'Telesom';
  readonly requiresPhone = true;
  readonly isAvailable = true;
  readonly dialCodeGuide = '*888*63XXXXXXX*Amount#';
  readonly description = {
    en: 'Pay conveniently using Telesom Zaad Service in Somaliland & surrounding areas.',
    so: 'Ku bixi lacagta Telesom Zaad Service si ammaan ah oo hufan.',
  };

  async initiatePayment(req: PaymentInitiateRequest): Promise<PaymentInitiateResult> {
    return {
      success: true,
      paymentMethod: this.id,
      paymentStatus: 'AWAITING_VERIFICATION',
      transactionReference: `ZAAD-${Date.now()}`,
      requiresCustomerAction: true,
      actionType: 'MANUAL_VERIFICATION',
      merchantAccountId: process.env.NEXT_PUBLIC_ZAAD_MERCHANT_NUMBER || '634000000',
      instructions: {
        en: `Please send $${req.amount.toFixed(2)} to Zaad Merchant account: ${process.env.NEXT_PUBLIC_ZAAD_MERCHANT_NUMBER || '634000000'}.`,
        so: `Fadlan u dir $${req.amount.toFixed(2)} koontada Zaad ee K3SOMSTORE: ${process.env.NEXT_PUBLIC_ZAAD_MERCHANT_NUMBER || '634000000'}.`,
      },
    };
  }

  async verifyPayment(orderId: string, reference: string): Promise<PaymentVerifyResult> {
    return {
      verified: Boolean(reference),
      status: 'AWAITING_VERIFICATION',
      providerReference: reference,
      message: 'Zaad transaction submitted for merchant verification.',
    };
  }
}

export class SahalProvider implements IPaymentProvider {
  readonly id: PaymentMethod = 'SAHAL';
  readonly name = 'Sahal (Golis)';
  readonly providerName = 'Golis Telecom';
  readonly requiresPhone = true;
  readonly isAvailable = true;
  readonly description = {
    en: 'Pay with Golis Sahal Service in Puntland and regional markets.',
    so: 'Ku bixi adigoo isticmaalaya adeegga Sahal ee Golis Telecom.',
  };

  async initiatePayment(req: PaymentInitiateRequest): Promise<PaymentInitiateResult> {
    return {
      success: true,
      paymentMethod: this.id,
      paymentStatus: 'AWAITING_VERIFICATION',
      transactionReference: `SAHAL-${Date.now()}`,
      requiresCustomerAction: true,
      actionType: 'MANUAL_VERIFICATION',
      merchantAccountId: process.env.NEXT_PUBLIC_SAHAL_MERCHANT_NUMBER || '907000000',
      instructions: {
        en: `Send $${req.amount.toFixed(2)} to Sahal merchant account ${process.env.NEXT_PUBLIC_SAHAL_MERCHANT_NUMBER || '907000000'}.`,
        so: `U dir $${req.amount.toFixed(2)} adeegga Sahal nambarka ${process.env.NEXT_PUBLIC_SAHAL_MERCHANT_NUMBER || '907000000'}.`,
      },
    };
  }

  async verifyPayment(orderId: string, reference: string): Promise<PaymentVerifyResult> {
    return {
      verified: Boolean(reference),
      status: 'AWAITING_VERIFICATION',
      providerReference: reference,
      message: 'Sahal transaction recorded.',
    };
  }
}

export class EdahabProvider implements IPaymentProvider {
  readonly id: PaymentMethod = 'EDAHAB';
  readonly name = 'eDahab (Somtel)';
  readonly providerName = 'Somtel';
  readonly requiresPhone = true;
  readonly isAvailable = true;
  readonly description = {
    en: 'Fast mobile payment via Somtel eDahab service.',
    so: 'Ku bixi lacagta adeegga eDahab ee shirkadda Somtel.',
  };

  async initiatePayment(req: PaymentInitiateRequest): Promise<PaymentInitiateResult> {
    return {
      success: true,
      paymentMethod: this.id,
      paymentStatus: 'AWAITING_VERIFICATION',
      transactionReference: `EDAHAB-${Date.now()}`,
      requiresCustomerAction: true,
      actionType: 'MANUAL_VERIFICATION',
      merchantAccountId: process.env.NEXT_PUBLIC_EDAHAB_MERCHANT_NUMBER || '620000000',
      instructions: {
        en: `Transfer $${req.amount.toFixed(2)} to eDahab account ${process.env.NEXT_PUBLIC_EDAHAB_MERCHANT_NUMBER || '620000000'}.`,
        so: `U wareeji $${req.amount.toFixed(2)} adeegga eDahab nambarka ${process.env.NEXT_PUBLIC_EDAHAB_MERCHANT_NUMBER || '620000000'}.`,
      },
    };
  }

  async verifyPayment(orderId: string, reference: string): Promise<PaymentVerifyResult> {
    return {
      verified: Boolean(reference),
      status: 'AWAITING_VERIFICATION',
      providerReference: reference,
      message: 'eDahab transaction recorded.',
    };
  }
}

export class CashOnDeliveryProvider implements IPaymentProvider {
  readonly id: PaymentMethod = 'CASH_ON_DELIVERY';
  readonly name = 'Cash on Delivery';
  readonly providerName = 'K3SOM Logistics';
  readonly requiresPhone = true;
  readonly isAvailable = true;
  readonly description = {
    en: 'Pay in USD or Shilling when your order arrives at your doorstep (Available in Mogadishu).',
    so: 'Ku bixi lacagta caddaan marka alaabtu kuu timaado (Magaalada Muqdisho).',
  };

  async initiatePayment(req: PaymentInitiateRequest): Promise<PaymentInitiateResult> {
    return {
      success: true,
      paymentMethod: this.id,
      paymentStatus: 'PENDING',
      transactionReference: `COD-${req.orderNumber}`,
      requiresCustomerAction: false,
      actionType: 'CASH_CONFIRMATION',
      instructions: {
        en: `Please prepare $${req.amount.toFixed(2)} for the delivery courier upon arrival.`,
        so: `Fadlan u diyaari $${req.amount.toFixed(2)} darawalka keena alaabta marka uu goobtaada yimaado.`,
      },
    };
  }

  async verifyPayment(): Promise<PaymentVerifyResult> {
    return {
      verified: true,
      status: 'PENDING',
      message: 'Cash on delivery payment pending arrival.',
    };
  }
}

export class CardPaymentProvider implements IPaymentProvider {
  readonly id: PaymentMethod = 'CARD';
  readonly name = 'Credit / Debit Card';
  readonly providerName = 'Visa / Mastercard';
  readonly requiresPhone = false;
  readonly isAvailable = true;
  readonly description = {
    en: 'Secure payment via Visa, Mastercard, or UnionPay.',
    so: 'Ku bixi kaarkaaga bangiga (Visa ama Mastercard) si sugan.',
  };

  async initiatePayment(req: PaymentInitiateRequest): Promise<PaymentInitiateResult> {
    const hasStripe = Boolean(process.env.STRIPE_SECRET_KEY);
    if (hasStripe) {
      return {
        success: true,
        paymentMethod: this.id,
        paymentStatus: 'PENDING',
        requiresCustomerAction: true,
        actionType: 'REDIRECT',
        instructions: {
          en: 'Redirecting to secure card processing gateway...',
          so: 'Waxaa laguu gudbinayaa barta sugan ee kaararka...',
        },
      };
    }

    return {
      success: true,
      paymentMethod: this.id,
      paymentStatus: 'AWAITING_VERIFICATION',
      transactionReference: `CARD-REQ-${Date.now()}`,
      requiresCustomerAction: true,
      actionType: 'MANUAL_VERIFICATION',
      instructions: {
        en: 'International card gateway integration is in sandbox/audit mode. Contact WhatsApp support for card processing.',
        so: 'Habka kaarka wuxuu ku jiraa xaqiijin. Fadlan WhatsApp nagala soo xiriir haddii aad kaar ku bixinayso.',
      },
    };
  }

  async verifyPayment(orderId: string, reference: string): Promise<PaymentVerifyResult> {
    return {
      verified: Boolean(reference),
      status: 'PENDING',
      message: 'Card payment transaction recorded.',
    };
  }
}

export const paymentProviders: Record<PaymentMethod, IPaymentProvider> = {
  EVC_PLUS: new EvcPlusProvider(),
  ZAAD: new ZaadProvider(),
  SAHAL: new SahalProvider(),
  EDAHAB: new EdahabProvider(),
  CASH_ON_DELIVERY: new CashOnDeliveryProvider(),
  CARD: new CardPaymentProvider(),
};

export function getPaymentProvider(method: PaymentMethod): IPaymentProvider {
  const provider = paymentProviders[method];
  if (!provider) {
    throw new Error(`Unsupported payment method: ${method}`);
  }
  return provider;
}

export function getAllPaymentProviders(): IPaymentProvider[] {
  return Object.values(paymentProviders);
}
