/**
 * Email Service using Nodemailer
 *
 * Sends:
 * 1. Payment success email to customer (with secure form link)
 * 2. Requirement form confirmation email to customer
 * 3. Internal payment notification to team
 * 4. Internal requirement submission notification to team
 *
 * All SMTP credentials come from environment variables.
 */

import nodemailer from "nodemailer";

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

const isDev = () =>
  process.env.SMTP_HOST === "smtp.example.com" ||
  !process.env.SMTP_HOST;

async function sendMail({ to, subject, html, text }) {
  if (isDev()) {
    // In development: log the email instead of sending
    console.log("\n📧 [Email DEV - NOT SENT]");
    console.log(`  To:      ${to}`);
    console.log(`  Subject: ${subject}`);
    console.log(`  Body:\n${text || html}`);
    console.log("─".repeat(60));
    return { messageId: `dev_${Date.now()}` };
  }

  const transporter = createTransport();
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    text,
  });

  console.log(`[Email] Sent to ${to}: ${info.messageId}`);
  return info;
}

// ----------------------------------------------------------------
// 1. Payment Success Email → Customer
// ----------------------------------------------------------------
export async function sendPaymentSuccessEmail({
  customerEmail,
  customerName,
  planName,
  amount,
  currency,
  basePrice,
  vatAmount,
  vatPercentage,
  stripePaymentId,
  stripeSessionId,
  invoiceNumber,
  formToken,
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const formLink = `${appUrl}/thank-you?session_id=${stripeSessionId}&token=${formToken}`;
  const currencySymbol = currency === "AED" ? "AED " : "€";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Payment Confirmed – AURUM EA</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: #0a1628; padding: 32px 40px; text-align: center; }
    .header h1 { color: #c8a951; margin: 0; font-size: 1.6rem; letter-spacing: 0.05em; }
    .header p { color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 0.9rem; }
    .body { padding: 40px; }
    .success-badge { background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d; border-radius: 8px; padding: 12px 20px; font-size: 0.95rem; margin-bottom: 24px; }
    .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .details-table td { padding: 10px 0; border-bottom: 1px solid #e8eaed; font-size: 0.93rem; color: #374151; }
    .details-table td:first-child { color: #6b7280; width: 45%; }
    .details-table td:last-child { font-weight: 500; text-align: right; }
    .total-row td { border-bottom: none; font-size: 1rem; font-weight: 700; color: #0a1628; }
    .cta-section { background: #f8f9fa; border-radius: 10px; padding: 24px; margin: 24px 0; text-align: center; }
    .cta-section p { margin: 0 0 16px; color: #374151; font-size: 0.95rem; line-height: 1.6; }
    .btn { display: inline-block; background: #c8a951; color: #0a1628; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 1rem; }
    .note { font-size: 0.85rem; color: #6b7280; margin-top: 12px; }
    .footer { background: #f4f6f9; padding: 20px 40px; text-align: center; font-size: 0.82rem; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>AURUM EA</h1>
      <p>Payment Confirmed</p>
    </div>
    <div class="body">
      <p>Hi <strong>${customerName || "Valued Customer"}</strong>,</p>
      <div class="success-badge">✅ Your payment has been successfully completed. Thank you for choosing AURUM EA!</div>
      <p>Here is a summary of your purchase:</p>
      <table class="details-table">
        <tr><td>Plan</td><td>${planName} Plan</td></tr>
        <tr><td>Base Price</td><td>${currencySymbol}${basePrice.toLocaleString()}</td></tr>
        ${vatAmount > 0 ? `<tr><td>VAT (${vatPercentage}%)</td><td>${currencySymbol}${vatAmount.toLocaleString()}</td></tr>` : ""}
        <tr class="total-row"><td>Total Paid</td><td>${currencySymbol}${amount.toLocaleString()} ${currency}</td></tr>
        <tr><td>Payment ID</td><td style="font-size:0.82rem;font-family:monospace">${stripePaymentId || stripeSessionId}</td></tr>
        ${invoiceNumber ? `<tr><td>Invoice</td><td>${invoiceNumber}</td></tr>` : ""}
      </table>

      <div class="cta-section">
        <p><strong>Complete your requirements form</strong><br />
        Please complete the short form below so our team can understand your needs and get started.</p>
        <a href="${formLink}" class="btn">Complete My Requirements Form</a>
        <p class="note">Don't have time right now? No problem — this secure link will work whenever you're ready.</p>
      </div>

      <p style="color:#374151;font-size:0.93rem;line-height:1.7">
        Our team will begin processing your order once your requirements are submitted. 
        If you have any questions, reply to this email or contact us at 
        <a href="mailto:info@aurum-goldea.com" style="color:#c8a951">info@aurum-goldea.com</a>.
      </p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} AURUM EA · Moneytize Trading Academy · aurum-goldea.com
    </div>
  </div>
</body>
</html>`;

  const text = `Hi ${customerName || "Valued Customer"},

Your payment has been successfully completed. Thank you for choosing AURUM EA!

Plan: ${planName} Plan
Base Price: ${currencySymbol}${basePrice}
${vatAmount > 0 ? `VAT (${vatPercentage}%): ${currencySymbol}${vatAmount}\n` : ""}Total Paid: ${currencySymbol}${amount} ${currency}
Payment ID: ${stripePaymentId || stripeSessionId}
${invoiceNumber ? `Invoice: ${invoiceNumber}` : ""}

Please complete your requirements form here:
${formLink}

This link is secure and connected to your payment. You can complete it at your convenience.

Questions? Email us: info@aurum-goldea.com
`;

  return sendMail({
    to: customerEmail,
    subject: `✅ Payment Confirmed – AURUM EA ${planName} Plan`,
    html,
    text,
  });
}

// ----------------------------------------------------------------
// 2. Internal Payment Notification → Team
// ----------------------------------------------------------------
export async function sendInternalPaymentNotification({
  customerName,
  customerEmail,
  planName,
  amount,
  currency,
  vatAmount,
  vatPercentage,
  stripePaymentId,
  stripeSessionId,
  invoiceId,
  invoiceNumber,
  paidDate,
}) {
  const html = `
<h2>🆕 New Payment Received – AURUM EA</h2>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
  <tr><td><strong>Customer Name</strong></td><td>${customerName}</td></tr>
  <tr><td><strong>Customer Email</strong></td><td>${customerEmail}</td></tr>
  <tr><td><strong>Plan</strong></td><td>${planName}</td></tr>
  <tr><td><strong>Amount</strong></td><td>${amount} ${currency}</td></tr>
  <tr><td><strong>VAT</strong></td><td>${vatAmount} ${currency} (${vatPercentage}%)</td></tr>
  <tr><td><strong>Stripe Payment ID</strong></td><td>${stripePaymentId || "N/A"}</td></tr>
  <tr><td><strong>Stripe Session ID</strong></td><td>${stripeSessionId}</td></tr>
  <tr><td><strong>Zoho Invoice Number</strong></td><td>${invoiceNumber || "N/A"}</td></tr>
  <tr><td><strong>Zoho Invoice ID</strong></td><td>${invoiceId || "N/A"}</td></tr>
  <tr><td><strong>Payment Date</strong></td><td>${paidDate || new Date().toISOString()}</td></tr>
</table>`;

  return sendMail({
    to: process.env.EMAIL_TO,
    subject: `💰 New Payment: ${customerName} – ${planName} Plan`,
    html,
    text: `New payment received.\nCustomer: ${customerName} (${customerEmail})\nPlan: ${planName}\nAmount: ${amount} ${currency}\nStripe: ${stripePaymentId}\nInvoice: ${invoiceNumber}`,
  });
}

// ----------------------------------------------------------------
// 3. Requirement Form Confirmation Email → Customer
// ----------------------------------------------------------------
export async function sendRequirementConfirmationEmail({ customerEmail, customerName }) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Requirements Received – AURUM EA</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: #0a1628; padding: 32px 40px; text-align: center; }
    .header h1 { color: #c8a951; margin: 0; font-size: 1.6rem; }
    .header p { color: rgba(255,255,255,0.7); margin: 8px 0 0; }
    .body { padding: 40px; color: #374151; line-height: 1.7; }
    .footer { background: #f4f6f9; padding: 20px 40px; text-align: center; font-size: 0.82rem; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>AURUM EA</h1>
      <p>Requirements Received</p>
    </div>
    <div class="body">
      <p>Hi <strong>${customerName || "Valued Customer"}</strong>,</p>
      <p>Thank you for submitting your requirements. We have successfully received your information.</p>
      <p>Our team will review your requirements and get back to you shortly. We typically respond within the same business day.</p>
      <p>If you have any urgent questions in the meantime, feel free to reach us at 
        <a href="mailto:info@aurum-goldea.com" style="color:#c8a951">info@aurum-goldea.com</a>.
      </p>
      <p>Thank you for choosing AURUM EA!</p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} AURUM EA · Moneytize Trading Academy · aurum-goldea.com
    </div>
  </div>
</body>
</html>`;

  return sendMail({
    to: customerEmail,
    subject: "✅ Requirements Received – AURUM EA",
    html,
    text: `Hi ${customerName},\n\nThank you for submitting your requirements. We have successfully received your information.\n\nOur team will review and get back to you shortly.\n\nAURUM EA Team`,
  });
}

// ----------------------------------------------------------------
// 4. Internal Requirement Submission Notification → Team
// ----------------------------------------------------------------
export async function sendInternalRequirementNotification({ customerName, customerEmail, data }) {
  const rows = Object.entries(data)
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${v || "—"}</td></tr>`)
    .join("");

  const html = `
<h2>📋 New Requirements Submitted – AURUM EA</h2>
<p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
  ${rows}
</table>`;

  return sendMail({
    to: process.env.EMAIL_TO,
    subject: `📋 Requirements Submitted: ${customerName}`,
    html,
    text: `New requirements submitted by ${customerName} (${customerEmail}).\n\n${JSON.stringify(data, null, 2)}`,
  });
}
