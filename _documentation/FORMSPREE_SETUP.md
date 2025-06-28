# Formspree Setup for e-State Real Store

## What is Formspree?

Formspree is a free service that allows you to handle forms on static sites like GitHub Pages. It turns form submissions into emails sent to your configured address.

## Step-by-step Setup

### 1. Create a Formspree Account

1. Go to [formspree.io](https://formspree.io)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Create a New Form

1. In the Formspree dashboard, click "New Form"
2. Name it something like "e-State Real Store Forms"
3. Select your email address as the destination
4. Copy the form ID (something like `xpzgwqjq`)

### 3. Update the Code

Replace `xpzgwqjq` in the following files with your real ID:

#### Files to update:
- `get-started.md` (line 8)
- `enroll.md` (line 15)
- `register.md` (line 15)
- `contact.md` (line 15)
- `schedule.md` (line 15)
- `assets/js/form-page.js` (line 89)

#### Example change:
```html
<!-- Change this: -->
<form action="https://formspree.io/f/xpzgwqjq" method="POST">

<!-- To this (with your real ID): -->
<form action="https://formspree.io/f/YOUR_REAL_ID" method="POST">
```

### 4. Set Up Notifications

In the Formspree dashboard:
1. Go to "Settings" > "Notifications"
2. Set up email notifications
3. Optional: Set up Slack or webhook notifications

### 5. Customize Email Subjects

Forms are already configured with custom subjects:
- **Get Started**: "Get Started - New Real Estate Inquiry"
- **Enroll**: "Course Enrollment - Premium Real Estate Course"
- **Register**: "Webinar Registration - Investment Strategies"
- **Contact**: "Contact Agent - Property Inquiry"
- **Schedule**: "Schedule Visit - Property Viewing"

### 6. Set Up Spam Protection

Formspree includes automatic spam protection, but you can:
1. Enable reCAPTCHA in "Settings" > "Spam Protection"
2. Set up IP whitelists/blacklists
3. Set submission limits

## Formspree Plans

### Free Plan
- ✅ 50 submissions per month
- ✅ Basic spam protection
- ✅ Email notifications
- ✅ Unlimited forms

### Pro Plan ($8/month)
- ✅ 1,000 submissions per month
- ✅ reCAPTCHA
- ✅ Webhooks
- ✅ API access
- ✅ File attachments

## Testing

### 1. Test Locally
```bash
bundle exec jekyll serve
```

### 2. Test on GitHub Pages
1. Commit and push your changes
2. Go to your GitHub Pages site
3. Fill and submit a test form
4. Check that you receive the email

### 3. Check in Formspree
1. Go to the Formspree dashboard
2. Check the "Submissions" tab
3. You should see your test submissions

## Troubleshooting

### Problem: Not receiving emails
1. Check that the form ID is correct
2. Check your spam folder
3. Check your email settings in Formspree

### Problem: 404 error on submit
1. Check that the form URL is correct
2. Make sure the form is active in Formspree

### Problem: Too much spam
1. Enable reCAPTCHA
2. Set up spam filters
3. Consider upgrading to Pro

## Advanced Setup

### Customize Email Templates
1. Go to "Settings" > "Email Templates"
2. Customize the email HTML
3. Add your logo and branding

### CRM Integration
1. Set up webhooks in "Settings" > "Integrations"
2. Connect with Zapier, Integromat, etc.
3. Send data to your preferred CRM

### Analytics
1. Go to "Analytics" in the dashboard
2. Review submission metrics
3. Identify your most popular forms

## Security

- ✅ Formspree automatically validates data
- ✅ CSRF protection included
- ✅ Data encrypted in transit
- ✅ GDPR compliant

## Support

- 📧 Email: support@formspree.io
- 📖 Docs: [docs.formspree.io](https://docs.formspree.io)
- 💬 Live chat available in the dashboard 