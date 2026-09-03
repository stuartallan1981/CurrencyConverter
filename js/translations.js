/**
 * translations.js — i18n string table for Holiday Currency Converter (Desktop)
 * Supported languages: en, fr, es, de, it
 *
 * Usage:
 *   applyTranslations(lang);   // updates every [data-i18n] element on the page
 *   getLang();                  // returns the current locale code
 *   setLang(code);              // persists + applies a new locale
 *   t(key);                     // returns a single translated string
 */

const TRANSLATIONS = {

  /* ── English (default) ─────────────────────────────────────────── */
  en: {
    /* Language picker */
    langLabel:           'Language',

    /* Nav dropdown */
    navHome:             '🏠 Home',
    navAddCurrency:      '➕ Add Currency (£0.99)',
    navContact:          '✉️ Contact us',
    navPrivacy:          '🔒 Privacy Policy',
    navSignOut:          '🚪 Sign Out',
    navSignInPage:       '🔑 Sign In / Register',
    navVerifyPage:       '✅ Verify Email',

    /* index.html */
    appTitle:            'Holiday Currency Converter',
    authWarning:         '🔒 Please <a href="signin.html">Sign In</a> to edit conversion values.',
    amountLabel:         'Amount to Convert:',
    amountPlaceholder:   'Sign in to enter amount',
    amountActivePlaceholder: 'e.g. 100',
    outputDefault:       'Converted amount will appear here',
    fromCurrencyLabel:   'From Currency:',
    toCurrencyLabel:     'To Currency:',
    swapBtn:             '🔄 Swap Currencies',
    fetchBtn:            '⚡ Fetch Live Exchange Rate',
    fetchingBtn:         'Fetching Rate...',
    manualRateTitle:     'Exchange rate currency bought at:',
    ratePlaceholder:     'Sign in to enter rate',
    rateActivePlaceholder: 'e.g. 1.25',
    saveBtn:             '💾 Save',
    addBannerTitle:      'Need an additional currency not listed?',
    addBannerText:       'Add an additional currency for a one-time fee of <b>£0.99</b>.',
    addBannerBtn:        '➕ Add an Additional Currency',
    footer:              '© 2026 S Allan. All rights reserved.',
    selectBothMsg:       'Please select both From and To currencies.',
    selectDiffMsg:       'Please select two different currencies.',
    selectDiffMsg2:      'Please select two different currencies.',
    invalidRateMsg:      'Enter a valid exchange rate.',
    liveRateFetched:     'Live rate fetched: 1 {from} = {rate} {to}',
    rateNotAvail:        'Live rate not available for {from} → {to}. Please enter the rate manually.',
    fetchFailed:         'Failed to fetch live rate. Please enter the rate manually.',
    rateSaved:           'Using rate saved for {from} → {to}: 1 {from} = {rate} {to}',

    /* contact.html */
    contactTitle:        'Contact Us',
    contactIntro:        'Have questions about the holiday currency converter or adding custom currencies? Send us a message below.',
    nameLabel:           'Name:',
    namePlaceholder:     'Your name',
    emailLabel:          'Email:',
    emailPlaceholder:    'Your email address',
    messageLabel:        'Message:',
    messagePlaceholder:  'How can we help?',
    sendBtn:             '✉️ Send Message',
    messageSent:         'Thank You! Message sent successfully!',
    messageFailed:       'Failed to send message. Please try again.',
    connectionError:     'Error connecting to the service.',

    /* add-currency.html */
    addCurrencyTitle:    'Add Additional Currency',
    oneTimeFee:          'One-Time Fee: £0.99',
    step1:               '1. Currency Details',
    selectCurrencyLabel: 'Select World Currency',
    selectCurrencyDefault: '-- Select a Country/Currency --',
    notListedHint:       'If the currency you require is not listed, or you need a crypto currency, please contact us via the link in the drop down box at the top right',
    step2:               '2. Payment via PayPal',
    sandboxWarning:      '🧪 <strong>Testing mode — you will not be charged.</strong><br>This app is currently running in PayPal Sandbox mode. Any card or PayPal details you enter are test credentials only. No real payment will be taken.',
    cancelBtn:           'Cancel & Return',
    selectCurrencyAlert: 'Please select a currency from the list before paying.',
    paymentError:        'Payment processing error. Please try again.',

    /* signin.html */
    appTitle:            'Holiday Currency Converter',
    tabSignIn:           'Sign In',
    tabRegister:         'Register',
    emailLabel:          'Email Address',
    emailPlaceholder:    'name@example.com',
    passwordLabel:       'Password',
    signInPasswordPlaceholder: 'Enter password',
    rememberEmail:       'Remember my email address',
    signInBtn:           'Sign In',
    regPasswordPlaceholder: 'At least 8 characters',
    createAccountBtn:    'Create Account',
    signedInMsg:         '✅ Signed in successfully! Redirecting to Home page...',
    accountCreatedMsg:   '✅ Registration successful! Redirecting to verification...',
    sdkNotLoadedMsg:     'Cognito SDK not loaded. Check your internet connection.',
    showPasswordLabel:   'Show password',
    hidePasswordLabel:   'Hide password',

    /* verify.html */
    verifyTitle:         'Verify Email',
    codeLabel:           'Verification Code',
    codePlaceholder:     'Enter 6-digit code',
    verifyBtn:           'Verify Account',
    resendBtn:           'Resend Verification Code',
    spamHint:            '📬 Can\'t find the code? Check your <strong>spam or junk folder</strong> — it sometimes ends up there.',
    alreadyVerified:     'Already verified?',
    signInLink:          'Sign In',
    verifiedMsg:         '✅ Email verified successfully! Redirecting to Sign-In page...',
    enterEmailFirst:     'Please enter your email address to resend the code.',
    codeResent:          '📩 Verification code resent! Check your inbox.',
    sdkNotLoaded2:       'Cognito SDK not loaded. Check your internet connection.',

    /* privacy.html */
    privacyTitle:        'Privacy Policy',
    privacyEffective:    '<strong>Effective Date:</strong> August 29, 2026',
    privacyIntro:        '<strong>Holiday Currency Converter</strong> ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and safeguarded when you use our mobile application and related web services.',
    privacyH1:           '1. Information We Collect',
    privacyP1:           'We collect information to provide better services to our users. The types of information we collect include:',
    privacyL1a:          '<strong>Account Information:</strong> When you register, sign in, or verify an account, we collect personal information such as your email address and login credentials.',
    privacyL1b:          '<strong>Financial &amp; Wallet Data:</strong> Information regarding currency calculations, tracked wallet balances, and user preferences saved inside the app.',
    privacyL1c:          '<strong>Transaction Information:</strong> Information necessary to process payments, such as payment status and order details.',
    privacyH2:           '2. Third-Party Services',
    privacyP2:           'We integrate trusted third-party services to handle authentication and payments securely:',
    privacyL2a:          '<strong>Amazon Web Services (AWS) Cognito:</strong> Manages identity authentication, sign-ins, and account registration. Your credentials are securely processed in compliance with AWS security standards.',
    privacyL2b:          '<strong>PayPal SDK:</strong> Facilitates payment processing for currency transactions. We do not directly store or process complete credit card details or bank credentials on our servers.',
    privacyH3:           '3. How We Use Information',
    privacyP3:           'Your information is used strictly to:',
    privacyL3a:          'Authenticate user access and maintain continuous app sessions via secure tokens.',
    privacyL3b:          'Process currency calculations and track user-added currencies.',
    privacyL3c:          'Execute secure payments and transactions requested through PayPal.',
    privacyL3d:          'Provide customer support and respond to app inquiries.',
    privacyH4:           '4. Data Storage and Security',
    privacyP4:           'We implement strict security measures to protect your data:',
    privacyL4a:          'All communications with external servers and APIs are encrypted using standard HTTPS/TLS protocols.',
    privacyL4b:          'Authentication tokens are securely stored locally on your device within native storage APIs managed by Capacitor.',
    privacyH5:           '5. Account Deletion &amp; Data Rights',
    privacyP5:           'You have the right to access, update, or delete your personal information at any time. If you wish to permanently delete your account and associated data from our systems, please contact us via our in-app Contact page.',
    privacyH6:           '6. Children\'s Privacy',
    privacyP6:           'Our app is not intended for use by children under the age of 13. We do not knowingly collect personal identifiable information from children under 13.',
    privacyH7:           '7. Contact Us',
    privacyP7:           'If you have any questions or concerns regarding this Privacy Policy, please contact us via our in-app Contact page.',

    /* delete-account.html */
    deleteTitle:         'Request Account & Data Deletion',
    deleteIntro:         'If you wish to delete your <strong>Holiday Currency Converter</strong> account and remove all associated personal data from our systems, please complete the form below.',
    deleteEmailLabel:    'Account Email Address:',
    deleteEmailPlaceholder: 'user@example.com',
    deleteReasonLabel:   'Reason for Deletion (Optional):',
    deleteReasonPlaceholder: 'Let us know why you are leaving...',
    deleteSubmitBtn:     'Submit Deletion Request',
    deleteInfoTitle:     'What happens when you request deletion?',
    deleteInfo1:         'Your AWS Cognito authentication account will be permanently deactivated.',
    deleteInfo2:         'Your saved preferences, wallet balances, and app data will be deleted within 30 days.',
    deleteInfo3:         'Payment records processed via PayPal are retained only as required by tax and financial laws.',
  },

  /* ── French ────────────────────────────────────────────────────── */
  fr: {
    langLabel:           'Langue',

    navHome:             '🏠 Accueil',
    navAddCurrency:      '➕ Ajouter une devise (0,99 £)',
    navContact:          '✉️ Nous contacter',
    navPrivacy:          '🔒 Politique de confidentialité',
    navSignOut:          '🚪 Se déconnecter',
    navSignInPage:       '🔑 Connexion / Inscription',
    navVerifyPage:       '✅ Vérifier l\'e-mail',

    appTitle:            'Convertisseur de Devises Vacances',
    authWarning:         '🔒 Veuillez <a href="signin.html">vous connecter</a> pour modifier les valeurs de conversion.',
    amountLabel:         'Montant à convertir :',
    amountPlaceholder:   'Connectez-vous pour entrer le montant',
    amountActivePlaceholder: 'ex. 100',
    outputDefault:       'Le montant converti apparaîtra ici',
    fromCurrencyLabel:   'Devise source :',
    toCurrencyLabel:     'Devise cible :',
    swapBtn:             '🔄 Inverser les devises',
    fetchBtn:            '⚡ Obtenir le taux en direct',
    fetchingBtn:         'Récupération en cours...',
    manualRateTitle:     'Taux de change lors de l\'achat :',
    ratePlaceholder:     'Connectez-vous pour entrer le taux',
    rateActivePlaceholder: 'ex. 1,25',
    saveBtn:             '💾 Enregistrer',
    addBannerTitle:      'Besoin d\'une devise supplémentaire ?',
    addBannerText:       'Ajoutez une devise pour un abonnement unique de <b>0,99 £</b>.',
    addBannerBtn:        '➕ Ajouter une devise supplémentaire',
    footer:              '© 2026 S Allan. Tous droits réservés.',
    selectBothMsg:       'Veuillez sélectionner les deux devises.',
    selectDiffMsg:       'Veuillez sélectionner deux devises différentes.',
    selectDiffMsg2:      'Veuillez sélectionner deux devises différentes.',
    invalidRateMsg:      'Entrez un taux de change valide.',
    liveRateFetched:     'Taux en direct : 1 {from} = {rate} {to}',
    rateNotAvail:        'Taux non disponible pour {from} → {to}. Saisissez-le manuellement.',
    fetchFailed:         'Échec de la récupération du taux. Veuillez le saisir manuellement.',
    rateSaved:           'Taux enregistré pour {from} → {to} : 1 {from} = {rate} {to}',

    contactTitle:        'Nous contacter',
    contactIntro:        'Des questions sur le convertisseur ou l\'ajout de devises ? Envoyez-nous un message.',
    nameLabel:           'Nom :',
    namePlaceholder:     'Votre nom',
    emailLabel:          'E-mail :',
    emailPlaceholder:    'Votre adresse e-mail',
    messageLabel:        'Message :',
    messagePlaceholder:  'Comment pouvons-nous vous aider ?',
    sendBtn:             '✉️ Envoyer le message',
    messageSent:         'Merci ! Message envoyé avec succès !',
    messageFailed:       'Échec de l\'envoi. Veuillez réessayer.',
    connectionError:     'Erreur de connexion au service.',

    addCurrencyTitle:    'Ajouter une devise supplémentaire',
    oneTimeFee:          'Frais uniques : 0,99 £',
    step1:               '1. Détails de la devise',
    selectCurrencyLabel: 'Sélectionner une devise mondiale',
    selectCurrencyDefault: '-- Sélectionnez un pays/une devise --',
    notListedHint:       'Si la devise requise n\'est pas répertoriée, ou si vous avez besoin d\'une cryptomonnaie, veuillez nous contacter via le lien dans le menu déroulant en haut à droite',
    step2:               '2. Paiement via PayPal',
    sandboxWarning:      '🧪 <strong>Mode test — vous ne serez pas facturé.</strong><br>Cette application est en mode Sandbox PayPal. Les données saisies sont des données de test uniquement. Aucun paiement réel ne sera effectué.',
    cancelBtn:           'Annuler et retourner',
    selectCurrencyAlert: 'Veuillez sélectionner une devise avant de payer.',
    paymentError:        'Erreur de paiement. Veuillez réessayer.',

    deleteTitle:         'Demande de suppression de compte et de données',
    deleteIntro:         'Si vous souhaitez supprimer votre compte <strong>Holiday Currency Converter</strong> et toutes les données personnelles associées, veuillez remplir le formulaire ci-dessous.',
    deleteEmailLabel:    'Adresse e-mail du compte :',
    deleteEmailPlaceholder: 'utilisateur@exemple.com',
    deleteReasonLabel:   'Raison de la suppression (optionnel) :',
    deleteReasonPlaceholder: 'Dites-nous pourquoi vous partez...',
    deleteSubmitBtn:     'Soumettre la demande de suppression',
    deleteInfoTitle:     'Que se passe-t-il lors de la suppression ?',
    deleteInfo1:         'Votre compte AWS Cognito sera définitivement désactivé.',
    deleteInfo2:         'Vos préférences, soldes et données d\'application seront supprimés dans les 30 jours.',
    deleteInfo3:         'Les dossiers de paiement traités via PayPal sont conservés conformément aux lois fiscales et financières.',
  },

  /* ── Spanish ───────────────────────────────────────────────────── */
  es: {
    langLabel:           'Idioma',

    navHome:             '🏠 Inicio',
    navAddCurrency:      '➕ Añadir divisa (£0,99)',
    navContact:          '✉️ Contáctenos',
    navPrivacy:          '🔒 Política de privacidad',
    navSignOut:          '🚪 Cerrar sesión',
    navSignInPage:       '🔑 Iniciar sesión / Registrarse',
    navVerifyPage:       '✅ Verificar correo',

    appTitle:            'Conversor de Divisas para Vacaciones',
    authWarning:         '🔒 <a href="signin.html">Inicie sesión</a> para editar los valores de conversión.',
    amountLabel:         'Cantidad a convertir:',
    amountPlaceholder:   'Inicie sesión para introducir la cantidad',
    amountActivePlaceholder: 'ej. 100',
    outputDefault:       'El importe convertido aparecerá aquí',
    fromCurrencyLabel:   'Divisa de origen:',
    toCurrencyLabel:     'Divisa de destino:',
    swapBtn:             '🔄 Intercambiar divisas',
    fetchBtn:            '⚡ Obtener tipo de cambio en vivo',
    fetchingBtn:         'Obteniendo tipo...',
    manualRateTitle:     'Tipo de cambio al comprar la divisa:',
    ratePlaceholder:     'Inicie sesión para introducir el tipo',
    rateActivePlaceholder: 'ej. 1,25',
    saveBtn:             '💾 Guardar',
    addBannerTitle:      '¿Necesita una divisa adicional?',
    addBannerText:       'Añada una divisa por una tarifa única de <b>£0,99</b>.',
    addBannerBtn:        '➕ Añadir una divisa adicional',
    footer:              '© 2026 S Allan. Todos los derechos reservados.',
    selectBothMsg:       'Seleccione ambas divisas.',
    selectDiffMsg:       'Seleccione dos divisas diferentes.',
    selectDiffMsg2:      'Seleccione dos divisas diferentes.',
    invalidRateMsg:      'Introduzca un tipo de cambio válido.',
    liveRateFetched:     'Tipo en vivo: 1 {from} = {rate} {to}',
    rateNotAvail:        'Tipo no disponible para {from} → {to}. Introdúzcalo manualmente.',
    fetchFailed:         'Error al obtener el tipo. Introdúzcalo manualmente.',
    rateSaved:           'Tipo guardado para {from} → {to}: 1 {from} = {rate} {to}',

    contactTitle:        'Contáctenos',
    contactIntro:        '¿Tiene preguntas sobre el conversor o la adición de divisas? Envíenos un mensaje.',
    nameLabel:           'Nombre:',
    namePlaceholder:     'Su nombre',
    emailLabel:          'Correo electrónico:',
    emailPlaceholder:    'Su dirección de correo',
    messageLabel:        'Mensaje:',
    messagePlaceholder:  '¿En qué podemos ayudarle?',
    sendBtn:             '✉️ Enviar mensaje',
    messageSent:         '¡Gracias! ¡Mensaje enviado con éxito!',
    messageFailed:       'Error al enviar. Inténtelo de nuevo.',
    connectionError:     'Error al conectar con el servicio.',

    addCurrencyTitle:    'Añadir divisa adicional',
    oneTimeFee:          'Pago único: £0,99',
    step1:               '1. Detalles de la divisa',
    selectCurrencyLabel: 'Seleccionar divisa mundial',
    selectCurrencyDefault: '-- Seleccione un país/divisa --',
    notListedHint:       'Si la divisa requerida no aparece o necesita una criptomoneda, contáctenos mediante el enlace del menú desplegable en la parte superior derecha',
    step2:               '2. Pago mediante PayPal',
    sandboxWarning:      '🧪 <strong>Modo de prueba — no se le cobrará.</strong><br>Esta aplicación está en modo Sandbox de PayPal. Los datos introducidos son de prueba. No se realizará ningún pago real.',
    cancelBtn:           'Cancelar y volver',
    selectCurrencyAlert: 'Seleccione una divisa antes de pagar.',
    paymentError:        'Error en el pago. Inténtelo de nuevo.',

    deleteTitle:         'Solicitud de eliminación de cuenta y datos',
    deleteIntro:         'Si desea eliminar su cuenta de <strong>Holiday Currency Converter</strong> y todos los datos personales asociados, complete el formulario a continuación.',
    deleteEmailLabel:    'Correo electrónico de la cuenta:',
    deleteEmailPlaceholder: 'usuario@ejemplo.com',
    deleteReasonLabel:   'Motivo de la eliminación (opcional):',
    deleteReasonPlaceholder: 'Cuéntenos por qué se va...',
    deleteSubmitBtn:     'Enviar solicitud de eliminación',
    deleteInfoTitle:     '¿Qué ocurre al solicitar la eliminación?',
    deleteInfo1:         'Su cuenta de autenticación AWS Cognito será desactivada permanentemente.',
    deleteInfo2:         'Sus preferencias guardadas, saldos y datos de la aplicación se eliminarán en 30 días.',
    deleteInfo3:         'Los registros de pago procesados a través de PayPal se conservan según lo exigido por las leyes fiscales y financieras.',
  },

  /* ── German ────────────────────────────────────────────────────── */
  de: {
    langLabel:           'Sprache',

    navHome:             '🏠 Startseite',
    navAddCurrency:      '➕ Währung hinzufügen (£0,99)',
    navContact:          '✉️ Kontakt',
    navPrivacy:          '🔒 Datenschutzrichtlinie',
    navSignOut:          '🚪 Abmelden',

    appTitle:            'Urlaubs-Währungsrechner',
    authWarning:         '🔒 Bitte <a href="signin.html">melden Sie sich an</a>, um Umrechnungswerte zu bearbeiten.',
    amountLabel:         'Umzurechnender Betrag:',
    amountPlaceholder:   'Anmelden, um Betrag einzugeben',
    amountActivePlaceholder: 'z. B. 100',
    outputDefault:       'Der umgerechnete Betrag erscheint hier',
    fromCurrencyLabel:   'Ausgangswährung:',
    toCurrencyLabel:     'Zielwährung:',
    swapBtn:             '🔄 Währungen tauschen',
    fetchBtn:            '⚡ Live-Wechselkurs abrufen',
    fetchingBtn:         'Kurs wird abgerufen...',
    manualRateTitle:     'Wechselkurs beim Kauf:',
    ratePlaceholder:     'Anmelden, um Kurs einzugeben',
    rateActivePlaceholder: 'z. B. 1,25',
    saveBtn:             '💾 Speichern',
    addBannerTitle:      'Benötigen Sie eine weitere Währung?',
    addBannerText:       'Fügen Sie eine Währung für eine einmalige Gebühr von <b>£0,99</b> hinzu.',
    addBannerBtn:        '➕ Weitere Währung hinzufügen',
    footer:              '© 2026 S Allan. Alle Rechte vorbehalten.',
    selectBothMsg:       'Bitte wählen Sie beide Währungen aus.',
    selectDiffMsg:       'Bitte wählen Sie zwei verschiedene Währungen aus.',
    selectDiffMsg2:      'Bitte wählen Sie zwei verschiedene Währungen.',
    invalidRateMsg:      'Bitte geben Sie einen gültigen Wechselkurs ein.',
    liveRateFetched:     'Live-Kurs: 1 {from} = {rate} {to}',
    rateNotAvail:        'Kurs für {from} → {to} nicht verfügbar. Bitte manuell eingeben.',
    fetchFailed:         'Kurs konnte nicht abgerufen werden. Bitte manuell eingeben.',
    rateSaved:           'Gespeicherter Kurs für {from} → {to}: 1 {from} = {rate} {to}',

    contactTitle:        'Kontakt',
    contactIntro:        'Haben Sie Fragen zum Währungsrechner oder zum Hinzufügen von Währungen? Senden Sie uns eine Nachricht.',
    nameLabel:           'Name:',
    namePlaceholder:     'Ihr Name',
    emailLabel:          'E-Mail:',
    emailPlaceholder:    'Ihre E-Mail-Adresse',
    messageLabel:        'Nachricht:',
    messagePlaceholder:  'Wie können wir Ihnen helfen?',
    sendBtn:             '✉️ Nachricht senden',
    messageSent:         'Vielen Dank! Nachricht erfolgreich gesendet!',
    messageFailed:       'Senden fehlgeschlagen. Bitte versuchen Sie es erneut.',
    connectionError:     'Verbindungsfehler zum Dienst.',

    addCurrencyTitle:    'Weitere Währung hinzufügen',
    oneTimeFee:          'Einmalige Gebühr: £0,99',
    step1:               '1. Währungsdetails',
    selectCurrencyLabel: 'Weltwährung auswählen',
    selectCurrencyDefault: '-- Land/Währung auswählen --',
    notListedHint:       'Falls die gewünschte Währung nicht aufgeführt ist oder Sie eine Kryptowährung benötigen, kontaktieren Sie uns über den Link im Dropdown-Menü oben rechts',
    step2:               '2. Zahlung über PayPal',
    sandboxWarning:      '🧪 <strong>Testmodus — Sie werden nicht belastet.</strong><br>Diese App läuft im PayPal-Sandbox-Modus. Eingegebene Daten sind nur Testdaten. Es wird keine echte Zahlung durchgeführt.',
    cancelBtn:           'Abbrechen und zurück',
    selectCurrencyAlert: 'Bitte wählen Sie eine Währung aus, bevor Sie bezahlen.',
    paymentError:        'Zahlungsfehler. Bitte versuchen Sie es erneut.',

    deleteTitle:         'Konto- und Datenlöschungsanfrage',
    deleteIntro:         'Wenn Sie Ihr <strong>Holiday Currency Converter</strong>-Konto und alle zugehörigen Daten löschen möchten, füllen Sie bitte das folgende Formular aus.',
    deleteEmailLabel:    'Konto-E-Mail-Adresse:',
    deleteEmailPlaceholder: 'benutzer@beispiel.de',
    deleteReasonLabel:   'Grund für die Löschung (optional):',
    deleteReasonPlaceholder: 'Teilen Sie uns mit, warum Sie gehen...',
    deleteSubmitBtn:     'Löschungsanfrage absenden',
    deleteInfoTitle:     'Was passiert bei einer Löschungsanfrage?',
    deleteInfo1:         'Ihr AWS Cognito-Authentifizierungskonto wird dauerhaft deaktiviert.',
    deleteInfo2:         'Ihre gespeicherten Einstellungen, Wallet-Salden und App-Daten werden innerhalb von 30 Tagen gelöscht.',
    deleteInfo3:         'Zahlungsbelege, die über PayPal verarbeitet wurden, werden nur nach steuer- und finanzrechtlichen Anforderungen aufbewahrt.',
  },

  /* ── Italian ───────────────────────────────────────────────────── */
  it: {
    langLabel:           'Lingua',

    navHome:             '🏠 Home',
    navAddCurrency:      '➕ Aggiungi valuta (£0,99)',
    navContact:          '✉️ Contattaci',
    navPrivacy:          '🔒 Informativa sulla privacy',
    navSignOut:          '🚪 Esci',

    appTitle:            'Convertitore di Valute per Vacanze',
    authWarning:         '🔒 <a href="signin.html">Accedi</a> per modificare i valori di conversione.',
    amountLabel:         'Importo da convertire:',
    amountPlaceholder:   'Accedi per inserire l\'importo',
    amountActivePlaceholder: 'es. 100',
    outputDefault:       'L\'importo convertito apparirà qui',
    fromCurrencyLabel:   'Valuta di origine:',
    toCurrencyLabel:     'Valuta di destinazione:',
    swapBtn:             '🔄 Scambia valute',
    fetchBtn:            '⚡ Ottieni tasso di cambio live',
    fetchingBtn:         'Recupero in corso...',
    manualRateTitle:     'Tasso di cambio al momento dell\'acquisto:',
    ratePlaceholder:     'Accedi per inserire il tasso',
    rateActivePlaceholder: 'es. 1,25',
    saveBtn:             '💾 Salva',
    addBannerTitle:      'Hai bisogno di una valuta aggiuntiva?',
    addBannerText:       'Aggiungi una valuta per una tariffa una tantum di <b>£0,99</b>.',
    addBannerBtn:        '➕ Aggiungi una valuta aggiuntiva',
    footer:              '© 2026 S Allan. Tutti i diritti riservati.',
    selectBothMsg:       'Seleziona entrambe le valute.',
    selectDiffMsg:       'Seleziona due valute diverse.',
    selectDiffMsg2:      'Seleziona due valute diverse.',
    invalidRateMsg:      'Inserisci un tasso di cambio valido.',
    liveRateFetched:     'Tasso live: 1 {from} = {rate} {to}',
    rateNotAvail:        'Tasso non disponibile per {from} → {to}. Inseriscilo manualmente.',
    fetchFailed:         'Impossibile recuperare il tasso. Inseriscilo manualmente.',
    rateSaved:           'Tasso salvato per {from} → {to}: 1 {from} = {rate} {to}',

    contactTitle:        'Contattaci',
    contactIntro:        'Hai domande sul convertitore o sull\'aggiunta di valute personalizzate? Inviaci un messaggio.',
    nameLabel:           'Nome:',
    namePlaceholder:     'Il tuo nome',
    emailLabel:          'Email:',
    emailPlaceholder:    'Il tuo indirizzo email',
    messageLabel:        'Messaggio:',
    messagePlaceholder:  'Come possiamo aiutarti?',
    sendBtn:             '✉️ Invia messaggio',
    messageSent:         'Grazie! Messaggio inviato con successo!',
    messageFailed:       'Invio fallito. Riprova.',
    connectionError:     'Errore di connessione al servizio.',

    addCurrencyTitle:    'Aggiungi valuta aggiuntiva',
    oneTimeFee:          'Tariffa una tantum: £0,99',
    step1:               '1. Dettagli valuta',
    selectCurrencyLabel: 'Seleziona valuta mondiale',
    selectCurrencyDefault: '-- Seleziona un paese/valuta --',
    notListedHint:       'Se la valuta richiesta non è elencata, o hai bisogno di una criptovaluta, contattaci tramite il link nel menu a discesa in alto a destra',
    step2:               '2. Pagamento tramite PayPal',
    sandboxWarning:      '🧪 <strong>Modalità test — non verrà addebitato nulla.</strong><br>Questa app è in modalità Sandbox PayPal. I dati inseriti sono solo di test. Nessun pagamento reale sarà effettuato.',
    cancelBtn:           'Annulla e torna',
    selectCurrencyAlert: 'Seleziona una valuta prima di pagare.',
    paymentError:        'Errore di pagamento. Riprova.',

    deleteTitle:         'Richiesta di eliminazione account e dati',
    deleteIntro:         'Se desideri eliminare il tuo account <strong>Holiday Currency Converter</strong> e tutti i dati personali associati, compila il modulo sottostante.',
    deleteEmailLabel:    'Indirizzo email dell\'account:',
    deleteEmailPlaceholder: 'utente@esempio.it',
    deleteReasonLabel:   'Motivo dell\'eliminazione (opzionale):',
    deleteReasonPlaceholder: 'Dicci perché stai andando via...',
    deleteSubmitBtn:     'Invia richiesta di eliminazione',
    deleteInfoTitle:     'Cosa succede quando richiedi l\'eliminazione?',
    deleteInfo1:         'Il tuo account di autenticazione AWS Cognito verrà disattivato definitivamente.',
    deleteInfo2:         'Le tue preferenze salvate, i saldi del portafoglio e i dati dell\'app saranno eliminati entro 30 giorni.',
    deleteInfo3:         'I registri di pagamento elaborati tramite PayPal sono conservati solo come richiesto dalle leggi fiscali e finanziarie.',
  }
};

/* ── Language persistence helpers ──────────────────────────────────── */
function getLang() {
  return localStorage.getItem('appLang') || 'en';
}

function setLang(code) {
  localStorage.setItem('appLang', code);
  document.documentElement.lang = code;
  applyTranslations(code);
  // Keep all lang pickers on the page in sync
  document.querySelectorAll('.lang-picker').forEach(sel => { sel.value = code; });
  // Re-build the nav dropdown text
  _rebuildNavDropdown(code);
}

/* ── Apply translations to the page ──────────────────────────────── */
function applyTranslations(lang) {
  const tbl = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (tbl[key] !== undefined) el.innerHTML = tbl[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (tbl[key] !== undefined) el.placeholder = tbl[key];
  });
}

/* ── Rebuild the page nav dropdown after a language change ──────── */
function _rebuildNavDropdown(lang) {
  const tbl = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  const dd  = document.getElementById('titleDropdown');
  if (!dd) return;
  const currentVal = dd.value;
  dd.querySelectorAll('option[data-i18n-nav]').forEach(opt => {
    const key = opt.getAttribute('data-i18n-nav');
    if (tbl[key] !== undefined) opt.textContent = tbl[key];
  });
  dd.value = currentVal; // restore selection
}

/* ── Convenience: get a single translated string ────────────────── */
function t(key) {
  const lang  = getLang();
  const table = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  return table[key] !== undefined ? table[key] : (TRANSLATIONS['en'][key] || key);
}
