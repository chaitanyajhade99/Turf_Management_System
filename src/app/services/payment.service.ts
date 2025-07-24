import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare var Razorpay: any;

export interface PaymentData {
  amount: number;
  orderId: string;
  turfName: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  createRazorpayOrder(paymentData: PaymentData): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        key: environment.razorpay.key,
        amount: paymentData.amount * 100, // Amount in paise
        currency: environment.razorpay.currency,
        name: environment.razorpay.name,
        description: `${environment.razorpay.description} - ${paymentData.turfName}`,
        image: environment.razorpay.image,
        order_id: paymentData.orderId,
        prefill: {
          name: paymentData.customerName || 'Customer',
          email: paymentData.customerEmail || 'customer@example.com',
          contact: paymentData.customerPhone || '9999999999'
        },
        theme: {
          color: '#3399cc'
        },
        handler: (response: any) => {
          // Payment successful
          resolve({
            success: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature
          });
        },
        modal: {
          ondismiss: () => {
            // Payment cancelled
            reject({
              success: false,
              error: 'Payment cancelled by user'
            });
          }
        }
      };

      try {
        const rzp = new Razorpay(options);
        rzp.on('payment.failed', (response: any) => {
          reject({
            success: false,
            error: response.error.description,
            code: response.error.code,
            metadata: response.error.metadata
          });
        });
        rzp.open();
      } catch (error) {
        reject({
          success: false,
          error: 'Failed to initialize Razorpay. Please check your internet connection.',
          details: error
        });
      }
    });
  }

  // Mock function to create order ID - in real app, this should be done on backend
  generateOrderId(): string {
    return 'order_' + Math.random().toString(36).substr(2, 9);
  }

  // Mock function to verify payment - in real app, this should be done on backend
  verifyPayment(paymentData: any): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // In real implementation, verify signature on backend
        resolve(true);
      }, 1000);
    });
  }
}