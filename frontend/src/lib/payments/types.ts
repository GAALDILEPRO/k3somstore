// Payment Provider Architecture Contract for Somali & International Methods
// Designed for true API integration (EVC Plus, Zaad, Sahal, eDahab, COD, Card)

import { PaymentMethod, PaymentStatus } from '../types';

export interface PaymentInitiateRequest {
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: string; // 'USD'
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  merchantNotes?: string;
}

export interface PaymentInitiateResult {
  success: boolean;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionReference?: string;
  requiresCustomerAction: boolean;
  actionType?: 'ENTER_PIN' | 'USSD_PROMPT' | 'REDIRECT' | 'CASH_CONFIRMATION' | 'MANUAL_VERIFICATION';
  instructions: {
    en: string;
    so: string;
  };
  merchantAccountId?: string;
  errorMessage?: string;
}

export interface PaymentVerifyResult {
  verified: boolean;
  status: PaymentStatus;
  providerReference?: string;
  rawResponse?: Record<string, unknown>;
  message: string;
}

export interface IPaymentProvider {
  readonly id: PaymentMethod;
  readonly name: string;
  readonly providerName: string;
  readonly requiresPhone: boolean;
  readonly isAvailable: boolean;
  readonly description: { en: string; so: string };
  readonly dialCodeGuide?: string; // e.g., *712*... or *789*...

  initiatePayment(req: PaymentInitiateRequest): Promise<PaymentInitiateResult>;
  verifyPayment(orderId: string, reference: string): Promise<PaymentVerifyResult>;
}
