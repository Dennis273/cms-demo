# Configure Domain

Bind your enterprise domain with MeowMail to give your team professional email addresses.

## Add Domain

1. Log in to the admin console
2. Go to "Domain Management" settings
3. Click "Add Domain"
4. Enter your domain (e.g., example.com)

## DNS Configuration

After adding the domain, you need to configure the following DNS records:

### MX Records

| Host | Type | Priority | Value |
|------|------|----------|-------|
| @ | MX | 10 | mx1.meowmail.com |
| @ | MX | 20 | mx2.meowmail.com |

### SPF Record

```
v=spf1 include:spf.meowmail.com ~all
```

### DKIM Record

DKIM records will be automatically generated after domain verification.

## Verify Domain

After completing DNS configuration, click the "Verify Domain" button. Verification may take anywhere from a few minutes to 48 hours.

## FAQ

**Q: How long do DNS records take to propagate?**

A: DNS records typically take effect within minutes, but full propagation may take 24-48 hours.

**Q: Can I add multiple domains?**

A: Yes, Professional and higher plans support multiple domains.
