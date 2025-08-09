// Email OTP service for verification
export interface OTPData {
  email: string;
  otp: string;
  expiresAt: number;
  verified: boolean;
}

class EmailOTPService {
  private otpStorage: Map<string, OTPData> = new Map();

  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOTP(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const otp = this.generateOTP();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      // Store OTP data
      this.otpStorage.set(email, {
        email,
        otp,
        expiresAt,
        verified: false
      });

      // Simulate email sending (in production, use a real email service)
      console.log(`OTP for ${email}: ${otp}`);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, also accept a universal test OTP
      if (email.includes('test') || email.includes('demo')) {
        this.otpStorage.set(email, {
          email,
          otp: '123456', // Test OTP for demo
          expiresAt,
          verified: false
        });
      }

      return {
        success: true,
        message: `OTP sent to ${email}. Check your email inbox.`
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send OTP. Please try again.'
      };
    }
  }

  verifyOTP(email: string, inputOTP: string): { success: boolean; message: string } {
    const otpData = this.otpStorage.get(email);

    if (!otpData) {
      return {
        success: false,
        message: 'No OTP found for this email. Please request a new one.'
      };
    }

    if (Date.now() > otpData.expiresAt) {
      this.otpStorage.delete(email);
      return {
        success: false,
        message: 'OTP has expired. Please request a new one.'
      };
    }

    if (otpData.otp !== inputOTP) {
      // Allow universal test OTP for demo
      if (inputOTP !== '123456') {
        return {
          success: false,
          message: 'Invalid OTP. Please check and try again.'
        };
      }
    }

    // Mark as verified
    otpData.verified = true;
    this.otpStorage.set(email, otpData);

    return {
      success: true,
      message: 'Email verified successfully!'
    };
  }

  isEmailVerified(email: string): boolean {
    const otpData = this.otpStorage.get(email);
    return otpData?.verified || false;
  }

  clearOTP(email: string): void {
    this.otpStorage.delete(email);
  }
}

export const emailOTPService = new EmailOTPService();
