export const renderVerifyEmailCodeTemplate = (code: string) => `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 480px; margin: auto; padding: 20px;">
    <h2 style="color: #15536C;">Verify your email address</h2>
    <p>Hello,</p>
    <p>Thank you for signing up. Please use the verification code below to verify your email address:</p>
    <div style="font-size: 24px; font-weight: bold; letter-spacing: 3px; margin: 20px 0; text-align: center; color: #F6BA18;">
      ${code}
    </div>
    <p>This code will expire in 24 hours.</p>
    <p>If you didn’t request this email, please ignore it.</p>
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
    <p style="font-size: 12px; color: #888;">© ${new Date().getFullYear()} Filantropiapr. All rights reserved.</p>
  </div>
`;
