import transporter from "../config/NodeMailer";

export const getAdminEmail = (): string => {
  return process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'memomate702@gmail.com';
};

export const formatPhoneForWhatsApp = (phone: string): string => {
  const clean = (phone || '').replace(/\D/g, '');
  if (clean.length === 10) {
    return `91${clean}`;
  }
  return clean;
};

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  try {
    if (!to || !to.includes('@')) {
      console.warn(`[EmailService] Invalid recipient email: "${to}". Skipping email dispatch.`);
      return;
    }
    const sender = process.env.SMTP_FROM || process.env.SMTP_USER || 'memomate702@gmail.com';
    const info = await transporter.sendMail({
      from: `"ASDE Laser Cutting" <${sender}>`,
      to,
      subject,
      text,
      html,
    });
    console.log(`[EmailService] Email sent successfully to ${to} | MessageId: ${info?.messageId} | Subject: "${subject}"`);
    return info;
  } catch (error) {
    console.error(`[EmailService] Failed to send email to ${to}:`, error instanceof Error ? error.message : error);
  }
};

const brandHeader = `
  <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: #d4af37; margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 24px; letter-spacing: 1px;">
      ASDE LASER CUTTING
    </h1>
    <p style="color: #cbd5e1; margin: 6px 0 0 0; font-size: 12px; letter-spacing: 0.5px;">
      AGRAWAL & SON DAUGHTER ENTERPRISES | SATNA, MP
    </p>
  </div>
`;

const brandFooter = `
  <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; border-radius: 0 0 8px 8px; font-size: 12px; color: #64748b;">
    <p style="margin: 0 0 4px 0;"><strong>ASDE Laser Cutting</strong> • Satna, Madhya Pradesh 485001, India</p>
    <p style="margin: 0 0 6px 0;">Phone: +91 93033 11384 | +91 98066 80879 | Email: contact@asdelasercuttings.com</p>
    <p style="margin: 0; font-size: 11px; color: #94a3b8;">This is an automated notification from ASDE Laser Cutting.</p>
  </div>
`;

export const sendOrderConfirmationEmails = async (order: any) => {
  const shortId = order._id ? order._id.toString().slice(-6).toUpperCase() : 'N/A';
  const formattedTotal = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(order.totalAmount || 0);

  const itemsRows = (order.items || []).map((item: any) => {
    const name = item.name || (item.product && item.product.name) || 'Laser Cut Product';
    const price = item.price || 0;
    const qty = item.quantity || 1;
    const itemTotal = price * qty;
    return `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #1e293b;">${name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 14px; text-align: center; color: #475569;">${qty}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 14px; text-align: right; color: #475569;">₹${price.toLocaleString('en-IN')}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 14px; text-align: right; font-weight: 600; color: #0f172a;">₹${itemTotal.toLocaleString('en-IN')}</td>
      </tr>
    `;
  }).join('');

  const methodLabel = order.paymentMethod === 'cod'
    ? 'Cash on Delivery (COD)'
    : order.paymentMethod === 'bank_transfer'
    ? 'Direct Bank Transfer / UPI'
    : 'Online Payment (Razorpay)';

  // 1. Email to Customer
  const customerHtml = `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px;">
      ${brandHeader}
      <div style="padding: 24px;">
        <h2 style="color: #0f172a; margin-top: 0;">Order Confirmation #${shortId}</h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.5;">
          Dear <strong>${order.customerName}</strong>,<br/>
          Thank you for choosing ASDE Laser Cutting! We have received your order and our production team is reviewing the specifications.
        </p>

        <div style="background-color: #f1f5f9; padding: 16px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0 0 6px 0; font-size: 13px; color: #64748b;"><strong>Order ID:</strong> ${order._id}</p>
          <p style="margin: 0 0 6px 0; font-size: 13px; color: #64748b;"><strong>Payment Method:</strong> ${methodLabel}</p>
          <p style="margin: 0; font-size: 13px; color: #64748b;"><strong>Payment Status:</strong> <span style="font-weight: 600; color: ${order.paymentStatus === 'Paid' ? '#16a34a' : '#d97706'}">${order.paymentStatus || 'Pending'}</span></p>
        </div>

        ${order.paymentMethod === 'bank_transfer' ? `
          <div style="background-color: #fef3c7; border-left: 4px solid #d97706; padding: 14px; margin: 16px 0; border-radius: 4px; font-size: 13px; color: #92400e;">
            <strong>Bank Transfer / UPI (Testing Mode) for Order #${shortId}:</strong><br/>
            Bank: State Bank of India (SBI Test) | Account: Agrawal & Son Daughter Enterprises<br/>
            A/C No: 38920194820 | IFSC: SBIN0001234 | UPI ID: asdelaser@testupi (or simulate via success@razorpay)<br/>
            <em>[Testing Mode] This is a test simulation. No actual money transfer is needed.</em>
          </div>
        ` : ''}

        <h3 style="color: #0f172a; margin-top: 24px; font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background-color: #f8fafc;">
              <th style="padding: 8px 10px; text-align: left; font-size: 12px; color: #64748b;">Product</th>
              <th style="padding: 8px 10px; text-align: center; font-size: 12px; color: #64748b;">Qty</th>
              <th style="padding: 8px 10px; text-align: right; font-size: 12px; color: #64748b;">Price</th>
              <th style="padding: 8px 10px; text-align: right; font-size: 12px; color: #64748b;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>

        <div style="margin-top: 16px; text-align: right; font-size: 14px; color: #1e293b;">
          <p style="margin: 4px 0;">Subtotal: <strong>₹${(order.subtotal || 0).toLocaleString('en-IN')}</strong></p>
          <p style="margin: 4px 0;">Shipping: <strong>${order.shippingFee ? '₹' + order.shippingFee : 'Free'}</strong></p>
          <p style="margin: 8px 0 0 0; font-size: 18px; color: #b45309;">Grand Total: <strong>${formattedTotal}</strong></p>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
          <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 14px;">Shipping Address</h4>
          <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.4;">
            ${order.customerName}<br/>
            ${order.shippingAddress?.address || ''}<br/>
            ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''} - ${order.shippingAddress?.pinCode || ''}<br/>
            Phone: ${order.phone}
          </p>
        </div>

        ${order.orderNotes ? `
          <div style="margin-top: 16px; padding: 12px; background-color: #f8fafc; border-radius: 6px;">
            <strong style="font-size: 13px; color: #334155;">Customer Notes:</strong>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">${order.orderNotes}</p>
          </div>
        ` : ''}
      </div>
      ${brandFooter}
    </div>
  `;

  // 2. Alert Email to Admin
  const adminHtml = `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px;">
      ${brandHeader}
      <div style="padding: 24px;">
        <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 12px; margin-bottom: 16px;">
          <h2 style="color: #b91c1c; margin: 0; font-size: 18px;">🚨 New Order Received: #${shortId}</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #7f1d1d;">Total Amount: <strong>${formattedTotal}</strong> (${methodLabel})</p>
        </div>

        <h3 style="color: #0f172a; font-size: 15px; margin: 16px 0 8px 0;">Customer Contact</h3>
        <p style="font-size: 13px; color: #334155; line-height: 1.5; margin: 0;">
          <strong>Name:</strong> ${order.customerName}<br/>
          <strong>Email:</strong> <a href="mailto:${order.email}">${order.email}</a><br/>
          <strong>Phone:</strong> <a href="tel:${order.phone}">${order.phone}</a> | <a href="https://wa.me/${formatPhoneForWhatsApp(order.phone)}?text=Hello%20${encodeURIComponent(order.customerName)},%20regarding%20your%20ASDE%20Laser%20order%20%23${shortId}" target="_blank" style="color: #16a34a; font-weight: bold;">WhatsApp Customer</a><br/>
          <strong>Address:</strong> ${order.shippingAddress?.address}, ${order.shippingAddress?.city}, ${order.shippingAddress?.state} - ${order.shippingAddress?.pinCode}
        </p>

        <h3 style="color: #0f172a; font-size: 15px; margin: 20px 0 8px 0;">Ordered Items</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            ${itemsRows}
          </tbody>
        </table>

        ${order.orderNotes ? `
          <div style="margin-top: 16px; padding: 10px; background-color: #f8fafc; border-left: 3px solid #3b82f6;">
            <strong style="font-size: 13px; color: #1e3a8a;">Special Instructions:</strong>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #334155;">${order.orderNotes}</p>
          </div>
        ` : ''}
      </div>
      ${brandFooter}
    </div>
  `;

  await Promise.all([
    sendEmail(order.email, `Order Confirmation #${shortId} - ASDE Laser Cutting`, `Thank you for your order #${shortId}. Total: ${formattedTotal}`, customerHtml),
    sendEmail(getAdminEmail(), `🚨 New Order Alert #${shortId} (${formattedTotal}) - ${order.customerName}`, `New order #${shortId} received from ${order.customerName} for ${formattedTotal}.`, adminHtml),
  ]);
};

export const sendOrderStatusUpdateEmail = async (order: any, newStatus: string) => {
  const shortId = order._id ? order._id.toString().slice(-6).toUpperCase() : 'N/A';

  const statusColors: Record<string, string> = {
    Created: '#3b82f6',
    Paid: '#10b981',
    Processing: '#f59e0b',
    Shipped: '#8b5cf6',
    Delivered: '#16a34a',
    Cancelled: '#ef4444'
  };

  const color = statusColors[newStatus] || '#0f172a';

  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px;">
      ${brandHeader}
      <div style="padding: 24px;">
        <h2 style="color: #0f172a; margin-top: 0;">Order #${shortId} Status Update</h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.5;">
          Dear <strong>${order.customerName}</strong>,<br/>
          Your order status has been updated by our team.
        </p>

        <div style="text-align: center; padding: 20px; background-color: #f8fafc; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Current Order Status</p>
          <span style="display: inline-block; font-size: 20px; font-weight: 700; color: #ffffff; background-color: ${color}; padding: 8px 24px; border-radius: 20px;">
            ${newStatus}
          </span>
        </div>

        <p style="font-size: 13px; color: #475569; line-height: 1.5;">
          You can track the progress of your order anytime on our website or get in touch with our support team on WhatsApp at <strong>+91 93033 11384</strong>.
        </p>
      </div>
      ${brandFooter}
    </div>
  `;

  await sendEmail(
    order.email,
    `Order #${shortId} Status Update: ${newStatus} - ASDE Laser Cutting`,
    `Your order #${shortId} status is now: ${newStatus}.`,
    html
  );
};

export const sendQuoteStatusUpdateEmail = async (quote: any, newStatus: string) => {
  const shortId = quote._id ? quote._id.toString().slice(-6).toUpperCase() : 'N/A';
  const fullQuoteId = quote._id ? quote._id.toString() : shortId;
  const rawFrontendUrl = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',')[0] : 'https://asdelaser.vercel.app';
  const frontendUrl = (rawFrontendUrl || 'https://asdelaser.vercel.app').trim();
  const trackingUrl = `${frontendUrl}/track-order?id=${fullQuoteId}&type=quote`;

  const statusColors: Record<string, string> = {
    Submitted: '#3b82f6',
    'Under Review': '#f59e0b',
    Estimated: '#8b5cf6',
    Approved: '#16a34a',
    Cancelled: '#ef4444'
  };
  const color = statusColors[newStatus] || '#0f172a';

  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px;">
      ${brandHeader}
      <div style="padding: 24px;">
        <h2 style="color: #0f172a; margin-top: 0;">Quote Request #${shortId} Status Update</h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.5;">
          Dear <strong>${quote.name}</strong>,<br/>
          There is an update on your custom laser cutting quote request for <strong>${quote.projectType || 'Custom Project'}</strong>.
        </p>

        <div style="text-align: center; padding: 20px; background-color: #f8fafc; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Current Quote Status</p>
          <span style="display: inline-block; font-size: 18px; font-weight: 700; color: #ffffff; background-color: ${color}; padding: 8px 24px; border-radius: 20px; margin-bottom: 12px;">
            ${newStatus}
          </span>
          <div>
            <a href="${trackingUrl}" style="background-color: #d97706; color: #ffffff; text-decoration: none; padding: 8px 20px; border-radius: 6px; font-size: 12px; font-weight: 600; display: inline-block;">
              View Live Tracker →
            </a>
          </div>
        </div>

        <p style="font-size: 13px; color: #475569; line-height: 1.5;">
          If you have questions or want to discuss immediate production schedules, chat directly with our team on WhatsApp at <strong>+91 93033 11384</strong>.
        </p>
      </div>
      ${brandFooter}
    </div>
  `;

  await sendEmail(
    quote.email,
    `Quote #${shortId} Status Update: ${newStatus} - ASDE Laser Cutting`,
    `Your quote #${shortId} status is now: ${newStatus}. Track online at: ${trackingUrl}`,
    html
  );
};

export const sendQuoteAlertEmail = async (quote: any) => {
  const adminEmail = getAdminEmail();
  const waPhone = formatPhoneForWhatsApp(quote.phone || '');
  const shortId = quote._id ? quote._id.toString().slice(-6).toUpperCase() : 'N/A';
  const fullQuoteId = quote._id ? quote._id.toString() : shortId;
  const rawFrontendUrl = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',')[0] : 'https://asdelaser.vercel.app';
  const frontendUrl = (rawFrontendUrl || 'https://asdelaser.vercel.app').trim();
  const trackingUrl = `${frontendUrl}/track-order?id=${fullQuoteId}&type=quote`;

  // 1. Customer Confirmation Email with Tracking ID
  const customerHtml = `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px;">
      ${brandHeader}
      <div style="padding: 24px;">
        <h2 style="color: #0f172a; margin-top: 0;">Quote Request Received #${shortId}</h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.5;">
          Dear <strong>${quote.name}</strong>,<br/>
          Thank you for requesting a custom laser cutting quote with <strong>ASDE Laser Cutting</strong>! We have received your project specifications and our engineering team is analyzing your dimensions and material requirements.
        </p>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 20px 0; text-align: center;">
          <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Your Quote Tracking ID</p>
          <div style="font-family: monospace; font-size: 18px; font-weight: 700; color: #b45309; letter-spacing: 1px; background: #ffffff; border: 1px dashed #d97706; padding: 10px 16px; border-radius: 6px; display: inline-block; margin-bottom: 12px;">
            ${fullQuoteId}
          </div>
          <div>
            <a href="${trackingUrl}" style="background-color: #d97706; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-size: 13px; font-weight: 600; display: inline-block;">
              Track Quote Status Online →
            </a>
          </div>
          <p style="margin: 8px 0 0 0; font-size: 11px; color: #94a3b8;">Use this Tracking ID anytime on our website to see real-time updates.</p>
        </div>

        <h3 style="color: #0f172a; font-size: 15px; margin: 20px 0 8px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Submitted Specifications</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: 600; width: 40%; color: #475569;">Project Category</td><td style="padding: 8px; color: #0f172a;">${quote.projectType || 'Custom Fabrication'}</td></tr>
          <tr><td style="padding: 8px; font-weight: 600; color: #475569;">Material Preference</td><td style="padding: 8px; color: #0f172a;">${quote.material || 'Metal'}</td></tr>
          <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: 600; color: #475569;">Dimensions (LxW)</td><td style="padding: 8px; color: #0f172a;">${quote.length || 0}m × ${quote.width || 0}m</td></tr>
          <tr><td style="padding: 8px; font-weight: 600; color: #475569;">Quantity</td><td style="padding: 8px; color: #0f172a;">${quote.quantity || 1} units</td></tr>
          <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: 600; color: #475569;">Timeline</td><td style="padding: 8px; color: #0f172a;">${quote.timeline || 'Flexible'}</td></tr>
          <tr><td style="padding: 8px; font-weight: 600; color: #475569;">Budget Range</td><td style="padding: 8px; color: #0f172a;">${quote.budget ? '₹' + quote.budget : 'Under Engineering Estimation'}</td></tr>
          ${quote.design ? `<tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: 600; color: #475569;">Design Style</td><td style="padding: 8px; color: #0f172a;">${quote.design}</td></tr>` : ''}
        </table>

        ${quote.details ? `
          <div style="margin-top: 16px; padding: 12px; background-color: #f8fafc; border-radius: 6px;">
            <strong style="font-size: 13px; color: #1e293b;">Additional Notes:</strong>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #475569;">${quote.details}</p>
          </div>
        ` : ''}

        ${quote.image && quote.image !== '/images/placeholder.png' ? `
          <div style="margin-top: 16px; text-align: center;">
            <a href="${quote.image}" target="_blank" style="color: #2563eb; font-size: 13px; text-decoration: underline;">
              View Uploaded Design Drawing / CAD File
            </a>
          </div>
        ` : ''}

        <div style="margin-top: 24px; padding: 14px; background-color: #eff6ff; border-radius: 6px; font-size: 13px; color: #1e40af; border-left: 4px solid #3b82f6;">
          <strong>What happens next?</strong><br/>
          Our CAD/CAM engineers are calculating sheet nesting, laser cutting time, and surface finishing requirements. We will send you an official quote within 24 hours.
        </div>
      </div>
      ${brandFooter}
    </div>
  `;

  // 2. Alert Email to Admin
  const adminHtml = `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px;">
      ${brandHeader}
      <div style="padding: 24px;">
        <div style="background-color: #fefce8; border: 1px solid #fef08a; border-radius: 6px; padding: 12px; margin-bottom: 16px;">
          <h2 style="color: #854d0e; margin: 0; font-size: 18px;">📋 New Custom Quote Request #${shortId}</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #a16207;">From: <strong>${quote.name}</strong> (${quote.location || 'Location Not Specified'})</p>
        </div>

        <h3 style="color: #0f172a; font-size: 15px; margin: 16px 0 8px 0;">Customer Contact</h3>
        <p style="font-size: 13px; color: #334155; line-height: 1.5; margin: 0;">
          <strong>Name:</strong> ${quote.name}<br/>
          <strong>Phone:</strong> <a href="tel:${quote.phone}">${quote.phone}</a> | <a href="https://wa.me/${waPhone}?text=Hello%20${encodeURIComponent(quote.name)},%20thank%20you%20for%20your%20custom%20quote%20request%20with%20ASDE%20Laser%20Cutting%20(Ref:%20%23${shortId})." target="_blank" style="color: #16a34a; font-weight: bold;">WhatsApp Client</a><br/>
          <strong>Email:</strong> <a href="mailto:${quote.email}">${quote.email}</a><br/>
          <strong>Location:</strong> ${quote.location}<br/>
          <strong>Tracking ID:</strong> <code>${fullQuoteId}</code>
        </p>

        <h3 style="color: #0f172a; font-size: 15px; margin: 20px 0 8px 0;">Project Specifications</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: 600; width: 40%;">Project Type</td><td style="padding: 8px;">${quote.projectType || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Material Preference</td><td style="padding: 8px;">${quote.material || 'N/A'}</td></tr>
          <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: 600;">Dimensions (LxW)</td><td style="padding: 8px;">${quote.length || 0}m × ${quote.width || 0}m</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Quantity</td><td style="padding: 8px;">${quote.quantity || 1} pcs</td></tr>
          <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: 600;">Timeline</td><td style="padding: 8px;">${quote.timeline || 'Flexible'}</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Budget</td><td style="padding: 8px;">${quote.budget ? '₹' + quote.budget : 'Not Specified'}</td></tr>
          <tr style="background-color: #f8fafc;"><td style="padding: 8px; font-weight: 600;">Design Pattern</td><td style="padding: 8px;">${quote.design || 'Standard'}</td></tr>
        </table>

        ${quote.details ? `
          <div style="margin-top: 16px; padding: 12px; background-color: #f8fafc; border-radius: 6px;">
            <strong style="font-size: 13px; color: #1e293b;">Additional Details:</strong>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #475569;">${quote.details}</p>
          </div>
        ` : ''}

        ${quote.image && quote.image !== '/images/placeholder.png' ? `
          <div style="margin-top: 16px; text-align: center;">
            <a href="${quote.image}" target="_blank" style="display: inline-block; background-color: #d97706; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; font-size: 13px;">
              View Uploaded Drawing / Design File
            </a>
          </div>
        ` : '<p style="font-size: 12px; color: #94a3b8; margin-top: 16px;">No image attachment provided.</p>'}
      </div>
      ${brandFooter}
    </div>
  `;

  await Promise.allSettled([
    sendEmail(
      quote.email,
      `Quote Request Confirmation #${shortId} - ASDE Laser Cutting`,
      `Thank you for your quote request #${shortId}. Tracking ID: ${fullQuoteId}. Track online at: ${trackingUrl}`,
      customerHtml
    ),
    sendEmail(
      adminEmail,
      `📋 New Quote Request from ${quote.name} (Ref: #${shortId})`,
      `New custom quote request from ${quote.name}, Phone: ${quote.phone}, Material: ${quote.material}`,
      adminHtml
    )
  ]);
};

export const sendContactInquiryEmail = async (contact: any) => {
  const adminEmail = getAdminEmail();
  const waPhone = formatPhoneForWhatsApp(contact.phone || '');

  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px;">
      ${brandHeader}
      <div style="padding: 24px;">
        <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 12px; margin-bottom: 16px;">
          <h2 style="color: #1e40af; margin: 0; font-size: 18px;">💬 New Contact Inquiry</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #1d4ed8;">From: <strong>${contact.name}</strong></p>
        </div>

        <p style="font-size: 13px; color: #334155; line-height: 1.5; margin: 0;">
          <strong>Name:</strong> ${contact.name}<br/>
          <strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a><br/>
          <strong>Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a> | <a href="https://wa.me/${waPhone}?text=Hello%20${encodeURIComponent(contact.name)},%20thank%20you%20for%20contacting%20ASDE%20Laser%20Cutting." target="_blank" style="color: #16a34a; font-weight: bold;">WhatsApp Client</a>
        </p>

        <div style="margin-top: 16px; padding: 14px; background-color: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 4px;">
          <strong style="font-size: 13px; color: #1e3a8a;">Message:</strong>
          <p style="margin: 6px 0 0 0; font-size: 14px; color: #334155; white-space: pre-wrap;">${contact.message}</p>
        </div>
      </div>
      ${brandFooter}
    </div>
  `;

  await sendEmail(
    adminEmail,
    `💬 New Contact Inquiry from ${contact.name}`,
    `Inquiry from ${contact.name} (${contact.email}, ${contact.phone}): ${contact.message}`,
    html
  );
};