# ERPNext

ERPNext is a complete double-entry accounting and business management system — general
ledger, invoices, bills, bank reconciliation, inventory and financial statements. It is a
self-hosted alternative to QuickBooks and Xero.

## Getting Started

Installing takes several minutes: ERPNext builds its database and installs the accounting
app before it will start. The progress bar tells you where it is.

When installation finishes you will have one task waiting: **View Administrator
Credentials**. ERPNext will not start until you run it, because it is the only place the
password generated for you is shown.

1. Run the **View Administrator Credentials** action and copy the password.
2. Start ERPNext and open the web interface.
3. Sign in with the username `Administrator` and that password.
4. Complete ERPNext's setup wizard — your company name, country, currency, fiscal year and
   chart of accounts.

Take the setup wizard seriously. The fiscal year and chart of accounts you choose shape
every report afterwards, and changing them later is real work.

## Everyday Use

Everything after sign-in is standard ERPNext, and the upstream documentation applies in
full. The pieces most people want first:

- **Accounting → Chart of Accounts** — your account structure.
- **Accounting → Journal Entry** — manual entries, including payroll journals.
- **Buying → Purchase Invoice** — bills, with as many line items as you need, each posted to
  a different expense account.
- **Accounting → Bank Reconciliation Tool** — match imported bank lines against invoices and
  payments.
- **Accounting → Financial Statements** — profit and loss, balance sheet, cash flow, trial
  balance.

### Bringing in transactions from elsewhere

ERPNext exposes every document type over a REST API at `/api/resource/<DocType>` — create an
API key under your user record (**Settings → API Access**). Payroll journals exported from a
payroll provider, and itemized purchases exported from a supplier, can both be posted this
way or imported as spreadsheets under **Data Import**.

## Sending Email

ERPNext emails invoices, quotes and notifications. Run the **Configure Email (SMTP)** action
and pick one of:

- **Disabled** — ERPNext sends no email at all. This is the default.
- **System** — use the SMTP server configured once for your whole server in StartOS. Available
  only if you have set one up there.
- **Custom** — your own provider. Pick your provider (or "Other"), then give the host, the
  port and whether it uses TLS or STARTTLS, the address mail should come from, and your
  username and password.

The setting is applied the next time ERPNext starts, so restart it afterwards.

If the details are wrong, or your mail provider cannot be reached, ERPNext will refuse them
and carry on with email switched off — it will not stop the service from running. Check the
service logs for a line beginning `[smtp]`, fix the settings, and restart.

You can still create your own Email Account inside ERPNext instead. If you mark one as the
default outgoing account, ERPNext uses yours rather than the one StartOS manages.

## Changing Your Password

If you lose the Administrator password, stop ERPNext and run the **Reset Administrator
Password** action. It generates a new one, applies it, and shows it to you. It only affects
the `Administrator` account — other user accounts are managed inside ERPNext under **Users**.

## Backups

Back ERPNext up from StartOS like any other service. The backup contains the database, your
uploaded files and the site's encryption key. Before you rely on it, do a restore once to a
point where you can check that a report you recognize still balances — an accounting backup
you have never restored is not yet a backup.

## Troubleshooting

**The web interface never becomes healthy.** The database and application server start
before nginx does; give it a few minutes on first run. If it stays unhealthy, check the
service logs for the `mariadb` or `backend` containers.

**Background jobs are not running.** The scheduler and queue workers run as separate
containers. Look for `scheduler`, `queue-short` and `queue-long` in the logs.

**A report or list view looks stale.** ERPNext caches aggressively; restarting the service
clears the cache.

## Documentation

- User guide: <https://docs.frappe.io/erpnext>
- Accounting module: <https://docs.frappe.io/erpnext/accounts>
- REST API: <https://docs.frappe.io/framework/user/en/api/rest>
- Community forum: <https://discuss.frappe.io>
