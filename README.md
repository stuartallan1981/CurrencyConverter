# Holiday Currency Converter

A currency conversion app built for travellers, available as both a web app and a native Android app. Users can enter the exchange rate they actually bought currency at, fetch live market rates, and purchase additional world currencies as an in-app add-on.

---

## Features

- **Currency conversion** — convert an amount between any two supported currencies using either a manually entered rate or a live market rate
- **Live rate fetching** — pulls the latest exchange rate from [open.er-api.com](https://open.er-api.com) directly in the browser or WebView
- **Manual rate entry** — enter the rate your bureau de change gave you; the inverse rate is calculated automatically
- **Swap currencies** — swap From/To with one tap and automatically inverts the saved rate
- **Rate persistence** — saved rates and currency selections are stored locally so they survive app restarts
- **Add custom currencies (£0.99)** — purchase any of ~150 world currencies as a one-time add-on via PayPal; purchase is recorded to DynamoDB
- **User authentication** — registration, sign-in, and email verification via AWS Cognito; the converter is locked for unauthenticated users
- **Contact form** — sends a message to the developer via API Gateway + Lambda
- **Account deletion** — GDPR-compliant account deletion request flow

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Mobile wrapper | [Capacitor](https://capacitorjs.com/) (Android) |
| Authentication | AWS Cognito (`amazon-cognito-identity-js` v6.3.7) |
| Backend API | AWS API Gateway + Lambda |
| Database | AWS DynamoDB (purchase records) |
| Exchange rates | [open.er-api.com](https://open.er-api.com) (free public API) |
| Payments | PayPal JS SDK (Smart Buttons + Hosted Button) |
| Region | `eu-west-2` (London) |

---

## Project Structure

```
Currency Converter/
├── index.html                          # Production web converter (main screen)
├── add-currency.html                   # Paid currency add-on (PayPal flow)
├── contact.html                        # Contact form
├── delete-account.html                 # GDPR account deletion request
├── Holiday-Currency-Converter.html     # Legacy prototype (unauthenticated)
│
└── Mobile Version/                     # Android (Capacitor) app
    ├── android/
    │   └── app/
    │       ├── build.gradle            # App config — version 1.0.3
    │       ├── debug/                  # Debug APK / AAB builds
    │       ├── release/                # Release AAB build
    │       └── src/main/
    │           ├── AndroidManifest.xml
    │           └── assets/
    │               ├── capacitor.config.json
    │               └── public/         # Web assets bundled into the app
    │                   ├── index.html
    │                   ├── add-currency.html
    │                   ├── contact.html
    │                   ├── signin.html
    │                   ├── register.html
    │                   ├── verify.html
    │                   ├── css/app.css # Shared mobile stylesheet
    │                   └── js/nav.js   # Shared slide-out drawer navigation
```

---

## Architecture

```
User (Browser / Android WebView)
        │
        ├── Auth
        │     └── amazon-cognito-identity-js (CDN)
        │               └── AWS Cognito (eu-west-2)
        │
        ├── Live rate fetch
        │     └── open.er-api.com/v6/latest/{currency}
        │
        ├── Contact form / Purchase recording
        │     └── API Gateway (eu-west-2)
        │               ├── POST /contact   → Lambda
        │               └── POST /purchases → Lambda → DynamoDB
        │
        └── Payments
              └── PayPal JS SDK (live, GBP £0.99)
```

### Local state (localStorage)

All user preferences are stored client-side:

| Key | Contents |
|---|---|
| `cognitoIdToken` / `cognitoAccessToken` | Auth session tokens |
| `CognitoIdentityServiceProvider.*` | Cognito SDK internal keys |
| `fromCurrency` / `toCurrency` | Last selected currencies |
| `savedRates` | JSON object of saved rates keyed by `"FROM_TO"` pair |
| `customCurrencies` | JSON object of purchased/added currencies |

---

## Authentication Flow

1. **Register** — email + password submitted to Cognito User Pool; a verification email is sent
2. **Verify** — enter the confirmation code from the email to activate the account
3. **Sign in** — Cognito tokens stored in localStorage; converter UI becomes active
4. **Sign out / session expiry** — tokens removed; converter inputs are disabled with a prompt to sign in

---

## Add Currency Flow

1. User selects a currency from the ~150-currency dropdown on `add-currency.html`
2. PayPal Smart Buttons process a £0.99 GBP payment
3. On approval, a `POST /purchases` request is sent to API Gateway with the Cognito user ID, currency code, name, and country
4. The currency is saved to `localStorage["customCurrencies"]` and the user is redirected to `index.html`

---

## Default Currencies

The converter includes these currencies out of the box:

`GBP` `EUR` `USD` `AUD` `CAD` `CNY` `JPY` `NZD`

Any of ~150 additional world currencies can be added for £0.99 each.

---

## Android App

- **App ID:** `com.sallan.holidaycurrencyconverter`
- **Version:** 1.0.3 (versionCode 3)
- **Min SDK:** see `build.gradle`
- **Permissions:** `INTERNET` only
- **Splash screen:** 2 seconds, blue (`#007bff`), fullscreen immersive
- The app bundles the web assets via Capacitor — no separate API server is needed

---

## AWS Services

| Service | Purpose |
|---|---|
| Cognito User Pool | User registration, email verification, sign-in |
| API Gateway | REST endpoints for contact form and purchase recording |
| Lambda | Business logic behind API endpoints |
| DynamoDB | Stores purchase records |

---

## Development Notes

- All page styles in the web version are inline; the mobile version uses the shared `css/app.css` and `js/nav.js` for consistency
- The mobile CSS includes `env(safe-area-inset-*)` support for notched devices
- `Holiday-Currency-Converter.html` is a legacy prototype with no auth or AWS integration — it is not part of the production app
- Custom currencies are stored locally only; purchased currencies cannot currently be restored from the server after a reinstall or on a new device

---

## License

&copy; 2026 S Allan. All rights reserved.
