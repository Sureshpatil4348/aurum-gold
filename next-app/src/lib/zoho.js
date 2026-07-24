/**
 * Zoho Books API Service
 *
 * Handles:
 * - Access token generation (from refresh token)
 * - Customer search by email (primary), name (secondary)
 * - Customer creation
 * - Invoice creation with correct amounts
 * - Payment recording / marking invoice as paid
 *
 * All credentials are loaded from environment variables.
 * This file never exposes secrets to the client.
 */

const ZOHO_API_BASE = "https://www.zohoapis.com/books/v3";
const ZOHO_TOKEN_URL = "https://accounts.zoho.com/oauth/v2/token";

let cachedToken = null;
let tokenExpiry = 0;

/**
 * Gets a valid Zoho access token, refreshing if necessary.
 */
async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  const isDev = process.env.ZOHO_REFRESH_TOKEN === "dummy_refresh_token";
  if (isDev) {
    console.log("[Zoho] DEV MODE: Using mock access token.");
    cachedToken = "mock_access_token";
    tokenExpiry = now + 3500 * 1000;
    return cachedToken;
  }

  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    grant_type: "refresh_token",
  });

  const res = await fetch(`${ZOHO_TOKEN_URL}?${params}`, { method: "POST" });
  const data = await res.json();

  if (!data.access_token) {
    throw new Error(`Failed to get Zoho access token: ${JSON.stringify(data)}`);
  }

  cachedToken = data.access_token;
  tokenExpiry = now + (data.expires_in - 60) * 1000;
  return cachedToken;
}

function zohoHeaders(token) {
  return {
    Authorization: `Zoho-oauthtoken ${token}`,
    "Content-Type": "application/json",
  };
}

const orgId = () => process.env.ZOHO_ORGANIZATION_ID;

/**
 * Finds a Zoho Books customer by email (primary identifier).
 * If found, also checks name for additional validation.
 * Returns the customer object or null.
 */
export async function findCustomerByEmail(email, name) {
  const isDev = process.env.ZOHO_REFRESH_TOKEN === "dummy_refresh_token";
  if (isDev) {
    console.log(`[Zoho DEV] findCustomerByEmail: ${email}`);
    return null; // In dev, always create a new mock customer
  }

  const token = await getAccessToken();
  const url = `${ZOHO_API_BASE}/contacts?organization_id=${orgId()}&email=${encodeURIComponent(email)}`;
  const res = await fetch(url, { headers: zohoHeaders(token) });
  const data = await res.json();

  if (data.contacts && data.contacts.length > 0) {
    const contact = data.contacts[0];
    console.log(`[Zoho] Found existing customer: ${contact.contact_id} (${contact.contact_name})`);
    return contact;
  }
  return null;
}

/**
 * Creates a new customer in Zoho Books.
 */
export async function createCustomer({ name, email, countryCode, currency }) {
  const isDev = process.env.ZOHO_REFRESH_TOKEN === "dummy_refresh_token";
  if (isDev) {
    console.log(`[Zoho DEV] createCustomer: ${name} <${email}>`);
    return { contact_id: `mock_contact_${Date.now()}`, contact_name: name };
  }

  const token = await getAccessToken();
  const url = `${ZOHO_API_BASE}/contacts?organization_id=${orgId()}`;
  const payload = {
    contact_name: name,
    contact_type: "customer",
    currency_code: currency,
    billing_address: {
      country: countryCode,
    },
    contact_persons: [
      {
        first_name: name.split(" ")[0] || name,
        last_name: name.split(" ").slice(1).join(" ") || "",
        email,
        is_primary_contact: true,
      },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: zohoHeaders(token),
    body: JSON.stringify(payload),
  });
  const data = await res.json();

  if (!data.contact) {
    throw new Error(`Failed to create Zoho customer: ${JSON.stringify(data)}`);
  }

  console.log(`[Zoho] Created customer: ${data.contact.contact_id}`);
  return data.contact;
}

/**
 * Creates an invoice in Zoho Books with AUM- prefix.
 */
export async function createInvoice({
  contactId,
  planName,
  basePrice,
  vatPercentage,
  vatAmount,
  total,
  currency,
  stripePaymentIntentId,
  stripeSessionId,
  customerEmail,
}) {
  const isDev = process.env.ZOHO_REFRESH_TOKEN === "dummy_refresh_token";
  if (isDev) {
    const mockInvoice = {
      invoice_id: `mock_inv_${Date.now()}`,
      invoice_number: `AUM-${String(Date.now()).slice(-4)}`,
      status: "sent",
    };
    console.log(`[Zoho DEV] createInvoice:`, mockInvoice);
    return mockInvoice;
  }

  const token = await getAccessToken();
  const url = `${ZOHO_API_BASE}/invoices?organization_id=${orgId()}`;

  const lineItems = [
    {
      name: `AURUM EA – ${planName} Plan`,
      description: "Lifetime licence · One-time payment",
      rate: basePrice,
      quantity: 1,
    },
  ];

  if (vatAmount > 0) {
    lineItems.push({
      name: `VAT (${vatPercentage}%)`,
      description: `Value Added Tax at ${vatPercentage}%`,
      rate: vatAmount,
      quantity: 1,
    });
  }

  const payload = {
    customer_id: contactId,
    invoice_number_prefix: "AUM",
    currency_code: currency,
    reference_number: stripePaymentIntentId || stripeSessionId,
    notes: `Stripe Session: ${stripeSessionId} | Payment Intent: ${stripePaymentIntentId || "N/A"}`,
    line_items: lineItems,
    custom_fields: [
      { label: "Stripe Payment ID", value: stripePaymentIntentId || "" },
      { label: "Stripe Session ID", value: stripeSessionId || "" },
      { label: "Customer Email", value: customerEmail || "" },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: zohoHeaders(token),
    body: JSON.stringify(payload),
  });
  const data = await res.json();

  if (!data.invoice) {
    throw new Error(`Failed to create Zoho invoice: ${JSON.stringify(data)}`);
  }

  console.log(`[Zoho] Created invoice: ${data.invoice.invoice_number}`);
  return data.invoice;
}

/**
 * Records a payment against a Zoho Books invoice and marks it as paid.
 */
export async function recordPayment({ invoiceId, amount, currency, stripePaymentIntentId, paidDate }) {
  const isDev = process.env.ZOHO_REFRESH_TOKEN === "dummy_refresh_token";
  if (isDev) {
    console.log(`[Zoho DEV] recordPayment for invoiceId: ${invoiceId}, amount: ${amount} ${currency}`);
    return { payment_id: `mock_payment_${Date.now()}` };
  }

  const token = await getAccessToken();
  const url = `${ZOHO_API_BASE}/customerpayments?organization_id=${orgId()}`;

  const payload = {
    amount,
    date: paidDate || new Date().toISOString().split("T")[0],
    payment_mode: "stripe",
    reference_number: stripePaymentIntentId,
    description: `Stripe payment: ${stripePaymentIntentId}`,
    invoices: [
      {
        invoice_id: invoiceId,
        amount_applied: amount,
      },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: zohoHeaders(token),
    body: JSON.stringify(payload),
  });
  const data = await res.json();

  if (!data.payment) {
    throw new Error(`Failed to record Zoho payment: ${JSON.stringify(data)}`);
  }

  console.log(`[Zoho] Recorded payment: ${data.payment.payment_id}`);
  return data.payment;
}
