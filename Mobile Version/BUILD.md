# Holiday Currency Converter — Mobile App Build Guide

This project uses [Capacitor](https://capacitorjs.com/) to wrap the web app into a
native Android and iOS app. Your existing HTML/CSS/JS runs inside a native WebView
with no framework changes required.

---

## Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 18 LTS or later | https://nodejs.org |
| npm | comes with Node | — |
| Android Studio | latest stable | https://developer.android.com/studio |
| Xcode (macOS only) | 15 or later | Mac App Store |
| JDK | 17 or later | https://adoptium.net |

> **iOS builds require a Mac.** Android builds work on Windows, Mac, or Linux.

---

## One-time setup

Open a terminal in this project folder and run:

```bash
npm install
```

This installs Capacitor CLI and all plugins listed in `package.json`.

---

## Project structure

```
Mobile Version/
├── www/                   ← Web assets (your app lives here)
│   ├── index.html
│   ├── signin.html
│   ├── register.html
│   ├── verify.html
│   ├── add-currency.html
│   ├── contact.html
│   ├── css/
│   │   └── app.css
│   └── js/
│       └── nav.js
├── android/               ← Created after: npm run cap:add:android
├── ios/                   ← Created after: npm run cap:add:ios
├── capacitor.config.json
└── package.json
```

---

## Android

### 1. Add Android platform (first time only)

```bash
npm run cap:add:android
```

### 2. Sync web assets into the native project

Run this every time you change files in `www/`:

```bash
npm run cap:sync
```

### 3. Open in Android Studio

```bash
npm run cap:open:android
```

Android Studio will open. Wait for Gradle to sync (bottom status bar), then:

- Connect a physical Android device via USB **or** start an emulator
  (Tools → Device Manager → Create Device)
- Click the green **Run** button (▶) or press `Shift+F10`

### 4. Build a release APK / AAB for the Play Store

In Android Studio:

1. **Build → Generate Signed Bundle / APK**
2. Choose **Android App Bundle (.aab)** for Play Store, or **APK** for sideloading
3. Create or select your keystore file (keep this safe — you need it for every update)
4. Select **release** build variant and finish

---

## iOS (Mac only)

### 1. Add iOS platform (first time only)

```bash
npm run cap:add:ios
```

### 2. Sync web assets

```bash
npm run cap:sync
```

### 3. Open in Xcode

```bash
npm run cap:open:ios
```

### 4. Configure signing

1. Select the **App** target in the project navigator
2. Go to **Signing & Capabilities**
3. Select your Apple Developer Team
4. Xcode will manage provisioning profiles automatically

### 5. Run on a device or simulator

- Choose your target device from the scheme selector (top bar)
- Press **Cmd+R** to build and run

### 6. Archive for App Store

1. Select **Any iOS Device (arm64)** as the build target
2. **Product → Archive**
3. Once complete, click **Distribute App** in the Organizer window
4. Follow the steps for App Store Connect distribution

---

## Updating the app after web changes

Any time you edit files inside `www/`, run:

```bash
npm run cap:sync
```

Then rebuild in Android Studio / Xcode. No native code changes are needed for
web-only updates.

---

## App configuration

Key settings in `capacitor.config.json`:

| Setting | Value | Notes |
|---------|-------|-------|
| `appId` | `com.sallan.holidaycurrencyconverter` | Must match Play Store / App Store listing |
| `appName` | `Currency Converter` | Display name on the device home screen |
| `webDir` | `www` | Folder Capacitor copies into the native project |
| `androidScheme` | `https` | Required for cookies/localStorage to work correctly on Android |

---

## PayPal in a WebView

PayPal's SDK renders inside the WebView correctly. The Live client-id is already
set in `www/add-currency.html`. To switch to Sandbox for testing, follow the
comment at the top of that file.

**Android note:** Add the following to `android/app/src/main/AndroidManifest.xml`
inside the `<application>` tag if PayPal redirects fail:

```xml
<activity
    android:name="com.paypal.android.sdk.payments.PaymentActivity"
    android:exported="true" />
```

---

## AWS Cognito

Cognito auth runs entirely in the WebView via the CDN-loaded SDK — no native
configuration required. Tokens are stored in `localStorage`, which persists
across app sessions.

---

## Splash screen & status bar

Configured in `capacitor.config.json`:

- Splash background: `#007bff` (matches app blue)
- Auto-hides after 2 seconds
- Status bar: light text on blue background

To add a custom splash image, place PNG files in:
- Android: `android/app/src/main/res/drawable/splash.png`
- iOS: `ios/App/App/Assets.xcassets/Splash.imageset/`

Recommended sizes: 2732×2732 px (centred logo on solid background).

---

## Troubleshooting

**`npx cap sync` says "no platforms added"**
→ Run `npm run cap:add:android` and/or `npm run cap:add:ios` first.

**White screen on Android**
→ Ensure `androidScheme: "https"` is set in `capacitor.config.json` (already done).

**localStorage not persisting on Android**
→ The `androidScheme: "https"` setting fixes this. Do not remove it.

**PayPal buttons not rendering**
→ The device must have internet access. PayPal SDK is loaded from paypal.com at runtime.

**Cognito SDK not loading**
→ The device must have internet access. SDK is loaded from cdn.jsdelivr.net at runtime.

**iOS build fails: "No signing certificate"**
→ Sign in to Xcode with your Apple ID (Xcode → Settings → Accounts) and select your team.
