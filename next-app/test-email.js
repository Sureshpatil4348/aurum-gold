const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Manually parse .env.local
try {
  const envPath = path.join(__dirname, ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    envContent.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const firstEquals = trimmed.indexOf("=");
      if (firstEquals === -1) return;
      const key = trimmed.substring(0, firstEquals).trim();
      let val = trimmed.substring(firstEquals + 1).trim();
      // Remove surrounding quotes if any
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      process.env[key] = val;
    });
  }
} catch (e) {
  console.log("Error loading .env.local:", e.message);
}

async function testEmail() {
  console.log("=== SMTP Configuration ===");
  console.log("SMTP_HOST:", process.env.SMTP_HOST || "NOT SET");
  console.log("SMTP_PORT:", process.env.SMTP_PORT || "NOT SET");
  console.log("SMTP_SECURE:", process.env.SMTP_SECURE || "NOT SET");
  console.log("SMTP_USER:", process.env.SMTP_USER || "NOT SET");
  console.log("SMTP_PASSWORD:", process.env.SMTP_PASSWORD ? "****SET****" : "NOT SET");
  console.log("EMAIL_FROM:", process.env.EMAIL_FROM || "NOT SET");
  console.log("EMAIL_TO:", process.env.EMAIL_TO || "NOT SET");
  console.log("==========================\n");

  if (!process.env.SMTP_HOST) {
    console.error("❌ Error: SMTP_HOST is not set in .env.local!");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Step 1: Verify connection
  console.log("Step 1: Testing SMTP connection...");
  try {
    await transporter.verify();
    console.log("✅ SMTP connection successful!\n");
  } catch (err) {
    console.error("❌ SMTP connection FAILED:", err.message);
    console.error("Full error:", err);
    return;
  }

  // Step 2: Send test email
  console.log("Step 2: Sending test email...");
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "AURUM EA - Test Email ✅",
      text: "If you see this, email is working correctly!",
      html: "<h2>AURUM EA Email Test</h2><p>If you see this, email is working correctly! ✅</p>",
    });
    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
  } catch (err) {
    console.error("❌ Failed to send email:", err.message);
    console.error("Full error:", err);
  }
}

testEmail();
