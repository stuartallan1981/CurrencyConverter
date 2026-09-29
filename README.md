# Holiday Currency Converter App

A currency conversion app built for travellers, available as both a web app and a native Android app. Users can enter the exchange rate they actually bought currency at, fetch live market rates, and purchase additional world currencies as an in-app add-on.

> **Status:** Published to the Google Play Store in **closed testing**. PayPal payments are running in **live mode** (real payments).

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
| Payments | PayPal JS SDK (Smart Buttons — live mode) |
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
    │       ├── build.gradle            # App config — version 2.0.3 (versionCode 18)
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

> **Unverified sign-in:** If a user tries to sign in before verifying their email, Cognito returns `UserNotConfirmedException`. The app catches this in `signin.html`, shows a friendly message, automatically requests a fresh verification code, and redirects to `verify.html` (email prefilled) so they can enter the code or resend it — rather than hitting a dead end.

---

## Speeding Up Verification Emails (Cognito → Amazon SES)

By default the Cognito user pool sends verification emails with its built-in sender (`no-reply@verificationemail.com`). Per AWS, this default sender is low-volume and its daily limit is below typical production needs, which causes slow delivery and spam-foldering. Switching the pool to send via **Amazon SES** gives fast, reliable delivery and higher limits.

**Region note:** The pool is in **Europe (London) / `eu-west-2`**, which AWS classifies as *"Backwards compatible."* The SES verified identity can live in **Europe (London), US East (N. Virginia), US West (Oregon), or Europe (Ireland)**. For best performance, verify it in **London** (same region as the pool).

### Setup steps

1. **Verify a sender in Amazon SES** — In the SES console (region `eu-west-2`), verify either an email address (e.g. `no-reply@yourdomain.com`) or, preferably, a whole **domain**. Domain verification enables **DKIM** and lets you send from any address on the domain — the biggest factor in fast delivery and staying out of spam.
2. **Leave the SES sandbox** — New SES accounts start in a per-region sandbox that only sends to pre-verified addresses. Request **production access** from the SES console (Account dashboard → request production access). Until you do this, Cognito can't email real users. (Skip only if staying on the Cognito default sender.)
3. **Permissions (automatic via console)** — When you choose SES sending in the Cognito console, Cognito creates the required **service-linked IAM role** for you. The signed-in user needs the `iam:CreateServiceLinkedRole` permission for this to succeed — no manual policy editing required.
4. **Point the user pool at SES** — Cognito console → **User Pools** → select the pool (`eu-west-2_BY54tpvV0`) → **Authentication methods** → **Email configuration** → **Edit**:
   - Select **Send email from Amazon SES**
   - **SES Region:** the region holding the verified identity (London)
   - **FROM email address:** the verified SES address
   - *(Optional)* **FROM sender name** (e.g. `Holiday Currency Converter <no-reply@yourdomain.com>`) and a **REPLY-TO** address
   - **Save changes**

### Notes

- **No code changes needed** — the existing `verify.html` / `signin.html` flow (6-digit code, resend, unverified-redirect) keeps working; emails just arrive faster.
- SES charges per email (very cheap); the Cognito default sender is free but throttled.
- Cognito and SES **cannot** be integrated across different AWS accounts — both must be in the same account.

*Source: [AWS — Email settings for Amazon Cognito user pools](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-email.html). Content rephrased for licensing compliance.*

---

## Add Currency Flow

1. User selects a currency from the ~150-currency dropdown on `add-currency.html`
2. PayPal Smart Buttons process a £0.99 GBP payment (currently in **live mode** — real payments are taken)
3. On approval, a `POST /purchases` request is sent to API Gateway with the Cognito user ID, currency code, name, and country
4. The currency is saved to `localStorage["customCurrencies"]` and the user is redirected to `index.html`

> **Currently LIVE.** The PayPal SDK `client-id` is set in the `<head>` of each `add-currency.html`, currently the **live** client ID. Comments in the file list both the sandbox and live client IDs, so you can switch back to sandbox for testing by swapping the active `<script>` tag. The Smart Buttons flow (with `createOrder`/`onApprove` → purchase recording) is the active payment path. The Hosted Button block remains commented out to avoid rendering a second button that bypasses purchase recording. The sandbox "Testing mode" banner is hidden (`display:none`) in live mode.

---

## Default Currencies

The converter includes these currencies out of the box:

`GBP` `EUR` `USD` `AUD` `CAD` `CNY` `JPY` `NZD`

On a fresh install (no saved selection), the converter defaults to **From: USD → To: GBP**. Any previously saved selection in `localStorage` takes precedence over these defaults.

Any of ~150 additional world currencies can be added for £0.99 each.

---

## Android App

- **App ID:** `com.sallan.holidaycurrencyconverter`
- **Version:** 2.0.3 (versionCode 18)
- **Min SDK:** 24 (Android 7.0) — set in `variables.gradle`
- **Target/Compile SDK:** 36
- **Capacitor:** 6.2.0
- **Permissions:** `INTERNET` only
- **Splash screen:** 2 seconds, blue (`#007bff`), fullscreen immersive
- **Edge-to-edge (Android 15):** handled in `MainActivity.java` — see the Android 15 & R8 section below
- The app bundles the web assets via Capacitor — no separate API server is needed

---

## Android 15 Edge-to-Edge & R8 Optimisation

These changes address Play Console recommendations that apply because the app targets SDK 36 (≥35) and runs on **Capacitor 6** (which, unlike Capacitor 7, does not auto-handle Android 15 edge-to-edge).

### Edge-to-edge insets

On Android 15, apps targeting SDK ≥35 draw edge-to-edge by default, so content can sit behind the status bar and gesture navigation bar unless insets are handled.

- **`MainActivity.java`** calls `EdgeToEdge.enable(this)` (the official `androidx.activity` API named in the Play guidance), then listens for window insets and injects them into the WebView as CSS custom properties (`--android-inset-top/bottom/left/right`).
- **`css/app.css`** defines `--safe-*` variables that prefer the injected `--android-inset-*` values and fall back to `env(safe-area-inset-*)` (iOS + older Android). All layout padding (body, header, nav drawer, content, footer) routes through these.
- The sticky blue `.top-nav` header owns the **top** inset so it fills the area behind the transparent status bar for a seamless look; the body handles the side and bottom insets.
- Requires the `androidx.activity:activity` dependency (declared in `app/build.gradle`).

### Status bar (deprecated API removal)

- The **`@capacitor/status-bar` plugin was removed** (it was unused in JS and its compiled `setStatusBarColor()`/`getStatusBarColor()` calls are deprecated in Android 15, which Play flags even via bundled library bytecode).
- Light status-bar/nav icons are now set natively in `MainActivity.java` via the non-deprecated `WindowInsetsControllerCompat.setAppearanceLightStatusBars(false)`.
- After removing the plugin you **must** run `npm install` then `npx cap sync android` so it is unregistered from the native project.

### R8 optimisation & resource shrinking

Configured in `app/build.gradle` (release build) and `gradle.properties`:

- `minifyEnabled true` — enables R8 code shrinking/optimisation.
- `shrinkResources true` — removes unused resources.
- `proguard-android-optimize.txt` — the optimising default rules file.
- `android.r8.optimizedResourceShrinking=true` (in `gradle.properties`) — the optimised resource-shrinking pipeline that traces references across the code/resource boundary. (AGP is 9.4.1, above the ≥9.0 requirement.)
- **`proguard-rules.pro`** keeps Capacitor/WebView classes that are used via reflection (bridge, `@CapacitorPlugin` classes, `@PluginMethod` methods, `@JavascriptInterface` members), so the release build doesn't strip plugin functionality.

> **Testing note:** R8 and optimised resource shrinking only affect the **release** build. Always install and smoke-test a signed release build on a device before uploading — check that all flag SVGs, the banknote background, and splash/launcher icons still load. If a resource is over-shrunk, add a `tools:keep` entry or a `@raw/keep` rule.

---

## AWS Services

| Service | Purpose |
|---|---|
| Cognito User Pool | User registration, email verification, sign-in |
| API Gateway | REST endpoints for contact form and purchase recording |
| Lambda | Business logic behind API endpoints |
| DynamoDB | Stores purchase records |

---

## Building & Releasing the Android App

The Android app bundles the web assets via Capacitor, so any change to the HTML/CSS/JS must be synced into the Android project before building.

1. **Install dependencies** — from the `Mobile Version/` directory, if plugins were added/removed (e.g. the StatusBar plugin removal):
   ```
   npm install
   ```
2. **Sync web assets** — from the `Mobile Version/` directory:
   ```
   npx cap sync android
   ```
   This copies `www/` into `android/app/src/main/assets/public/` and updates/unregisters native plugins.
3. **Bump the version** — in `Mobile Version/android/app/build.gradle`, increase `versionCode` and `versionName` (Google Play requires a higher `versionCode` for every upload).
4. **Build a signed release AAB** — in Android Studio: Build → Generate Signed Bundle / APK → Android App Bundle, using your existing keystore.
5. **Smoke-test the release build on a device** — because R8 and optimised resource shrinking only affect the release build, install the signed AAB/APK and verify sign-in, verification, live rate fetch, PayPal add-currency, contact form, flag SVGs, and splash/launcher icons all work before uploading.
6. **Upload to Play Console** — under Testing → Closed testing, create a new release and upload the `.aab`.

---

## Development Notes

- All page styles in the web version are inline; the mobile version uses the shared `css/app.css` and `js/nav.js` for consistency
- The mobile CSS handles insets via `--safe-*` variables (native Android 15 insets injected by `MainActivity`, falling back to `env(safe-area-inset-*)` on iOS) — see the Android 15 Edge-to-Edge section
- `Holiday-Currency-Converter.html` is a legacy prototype with no auth or AWS integration — it is not part of the production app
- Custom currencies are stored locally only; purchased currencies cannot currently be restored from the server after a reinstall or on a new device
- PayPal is currently in **live mode** — real payments are taken. To test without charging, temporarily switch the active SDK `<script>` tag in `add-currency.html` back to the sandbox `client-id` (and re-show the `#sandboxWarning` banner) using the commented alternatives in the file

---

## License

&copy; 2026 S Allan. All rights reserved.
