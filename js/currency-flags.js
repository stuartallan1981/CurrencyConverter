/* ------------------------------------------------------------------
   currency-flags.js
   Maps ISO 4217 currency codes -> ISO 3166-1 alpha-2 country codes,
   which correspond to the offline flag SVG filenames in flags/.
   Covers the 8 built-in currencies plus every purchasable currency
   listed on add-currency.html.

   Currencies with no single national flag (regional/union currencies
   such as EUR, XAF, XOF, XCD) fall back to a representative flag or
   the shared generic flag.
   Exposes:  window.CURRENCY_COUNTRY  and  window.flagSrcFor(code)
------------------------------------------------------------------ */
(function (global) {
  "use strict";

  var CURRENCY_COUNTRY = {
    // ── Built-in ──
    GBP: "gb", EUR: "eu", USD: "us", AUD: "au",
    CAD: "ca", CNY: "cn", JPY: "jp", NZD: "nz",

    // ── Purchasable world currencies ──
    AFN: "af", ALL: "al", DZD: "dz", AOA: "ao", ARS: "ar", AMD: "am",
    AWG: "aw", AZN: "az", BSD: "bs", BHD: "bh", BDT: "bd", BBD: "bb",
    BYN: "by", BZD: "bz", BMD: "bm", BTN: "bt", BOB: "bo", BAM: "ba",
    BWP: "bw", BRL: "br", BND: "bn", BGN: "bg", BIF: "bi", KHR: "kh",
    CVE: "cv", KYD: "ky", XAF: "cm", CLP: "cl", COP: "co", KMF: "km",
    CDF: "cd", CRC: "cr", HRK: "hr", CUP: "cu", CZK: "cz", DKK: "dk",
    DJF: "dj", DOP: "do", XCD: "ag", EGP: "eg", ERN: "er", SZL: "sz",
    ETB: "et", FKP: "fk", FOK: "fo", FJD: "fj", GMD: "gm", GEL: "ge",
    GHS: "gh", GIP: "gi", GTQ: "gt", GGP: "gg", GNF: "gn", GYD: "gy",
    HTG: "ht", HNL: "hn", HKD: "hk", HUF: "hu", ISK: "is", INR: "in",
    IDR: "id", IRR: "ir", IQD: "iq", IMP: "im", ILS: "il", JMD: "jm",
    JEP: "je", JOD: "jo", KZT: "kz", KES: "ke", KID: "ki", KWD: "kw",
    KGS: "kg", LAK: "la", LBP: "lb", LSL: "ls", LRD: "lr", LYD: "ly",
    MOP: "mo", MGA: "mg", MWK: "mw", MYR: "my", MVR: "mv", MRU: "mr",
    MUR: "mu", MXN: "mx", MDL: "md", MNT: "mn", MAD: "ma", MZN: "mz",
    MMK: "mm", NAD: "na", NPR: "np", ANG: "cw", NIO: "ni", NGN: "ng",
    MKD: "mk", NOK: "no", OMR: "om", PKR: "pk", PAB: "pa", PGK: "pg",
    PYG: "py", PEN: "pe", PHP: "ph", PLN: "pl", QAR: "qa", RON: "ro",
    RUB: "ru", RWF: "rw", WST: "ws", STN: "st", SAR: "sa", RSD: "rs",
    SCR: "sc", SLE: "sl", SGD: "sg", SBD: "sb", SOS: "so", ZAR: "za",
    KRW: "kr", SSP: "ss", LKR: "lk", SHP: "sh", SDG: "sd", SRD: "sr",
    SEK: "se", CHF: "ch", SYP: "sy", TWD: "tw", TJS: "tj", TZS: "tz",
    THB: "th", TOP: "to", TTD: "tt", TND: "tn", TRY: "tr", TMT: "tm",
    TVD: "tv", UGX: "ug", UAH: "ua", AED: "ae", UYU: "uy", UZS: "uz",
    VUV: "vu", VES: "ve", VND: "vn", XOF: "sn", YER: "ye", ZMW: "zm",
    ZWL: "zw"
  };

  function flagSrcFor(code) {
    var cc = CURRENCY_COUNTRY[code];
    return cc ? ("flags/" + cc + ".svg") : "flags/generic.svg";
  }

  global.CURRENCY_COUNTRY = CURRENCY_COUNTRY;
  global.flagSrcFor = flagSrcFor;
})(typeof window !== "undefined" ? window : this);
