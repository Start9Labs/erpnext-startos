# ERPNext

## Documentation

- <https://docs.frappe.io/*> — the upstream user guide for ERPNext and the Frappe framework it
  is built on, including the accounting modules and the REST API reference.

## What you get on StartOS

A single ERPNext site with its database, cache and background workers, served over one web
interface. StartOS owns the Administrator password and, if you want it, the outgoing mail
settings; everything inside ERPNext is unchanged.

## Getting set up

Installing takes several minutes: ERPNext builds its database and installs the accounting
app before it will start. The progress bar tells you where it is.

1. Run the **Set Administrator Password** action and copy the password it shows you. This is
   the only time it is displayed, and ERPNext will not start until you have run it.
2. Start ERPNext and open the web interface.
3. Sign in with the username `Administrator` and that password.
4. Complete ERPNext's setup wizard — your company name, country, currency, fiscal year and
   chart of accounts.

Take the setup wizard seriously. The fiscal year and chart of accounts you choose shape
every report afterwards, and changing them later is real work.

## Using ERPNext

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
API key under your user record (**Settings → API Access**). The full reference is at
<https://docs.frappe.io/framework/user/en/api/rest>. Payroll journals exported from a
payroll provider, and itemized purchases exported from a supplier, can both be posted this
way or imported as spreadsheets under **Data Import**.

### Actions

**Set Administrator Password** generates a new random password, applies it, and shows it to
you. Run it again whenever you need a new one — it is the only way to recover a lost
Administrator password, because nothing stores a copy you can look up. Later runs need
ERPNext stopped, since the action starts its own copy of the database to apply the change.
It affects only the `Administrator` account; other users are managed inside ERPNext under
**Users**.

**Configure Email (SMTP)** decides how ERPNext sends invoices, quotes and notifications:

- **Disabled** — ERPNext sends no email at all. This is the default.
- **System** — use the SMTP server configured once for your whole server in StartOS.
  Available only if you have set one up there.
- **Custom** — your own provider. Pick your provider (or "Other"), then give the host, the
  port and whether it uses TLS or STARTTLS, the address mail should come from, and your
  username and password.

The setting is applied the next time ERPNext starts, so restart it afterwards.

If the details are wrong, or your mail provider cannot be reached, ERPNext will refuse them
and carry on with email switched off — it will not stop the service from running. Check the
service logs for a line beginning `[smtp]`, fix the settings, and restart.

You can still create your own Email Account inside ERPNext instead. If you mark one as the
default outgoing account, ERPNext uses yours rather than the one StartOS manages.

### Backups

A backup of ERPNext contains the database, your uploaded files and the site's encryption
key, and restores to exactly the site you backed up — same data, same Administrator
password. Before you rely on it, do a restore once to a point where you can check that a
report you recognize still balances. An accounting backup you have never restored is not yet
a backup.

## Troubleshooting

**The web interface never becomes healthy.** The database and application server start
before nginx does; give it a few minutes on first run. If it stays unhealthy, the service
logs from the `mariadb` and `backend` containers say why.

**Background jobs are not running.** The scheduler and queue workers run separately from the
web interface and have no health indicator of their own. Look for `scheduler`, `queue-short`
and `queue-long` in the service logs.

**A report or list view looks stale.** ERPNext caches aggressively; restarting the service
clears the cache.
