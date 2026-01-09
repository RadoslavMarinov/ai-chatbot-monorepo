import { z } from "zod";
export const CurrencyEnumZod = z
  .enum([
    "USD", // United States Dollar
    "EUR", // Euro
    "GBP", // British Pound Sterling
    "JPY", // Japanese Yen
    "AUD", // Australian Dollar
    "CAD", // Canadian Dollar
    "CHF", // Swiss Franc
    "CNY", // Chinese Yuan (Renminbi)
    "SEK", // Swedish Krona
    "NZD", // New Zealand Dollar
    "BRL", // Brazilian Real
    "INR", // Indian Rupee
    "RUB", // Russian Ruble
    "ZAR", // South African Rand
    "MXN", // Mexican Peso
    "SGD", // Singapore Dollar
    "HKD", // Hong Kong Dollar
    "NOK", // Norwegian Krone
    "DKK", // Danish Krone
    "PLN", // Polish Zloty
    "KRW", // South Korean Won
    "TRY", // Turkish Lira
    "IDR", // Indonesian Rupiah
    "MYR", // Malaysian Ringgit
    "PHP", // Philippine Peso
    "THB", // Thai Baht
    "ILS", // Israeli New Shekel
    "CLP", // Chilean Peso
    "COP", // Colombian Peso
    "ARS", // Argentine Peso
    "SAR", // Saudi Riyal
    "AED", // UAE Dirham
    "EGP", // Egyptian Pound
    "VND", // Vietnamese Dong
    "PKR", // Pakistani Rupee
    "BDT", // Bangladeshi Taka
    "NGN", // Nigerian Naira
    "KES", // Kenyan Shilling
    "GHS", // Ghanaian Cedi
    "UGX", // Ugandan Shilling
    "TZS", // Tanzanian Shilling
    "XAF", // CFA Franc BEAC
    "XOF", // CFA Franc BCEAO
    "XCD", // East Caribbean Dollar
    "FJD", // Fijian Dollar
    "PGK", // Papua New Guinean Kina
    "SBD", // Solomon Islands Dollar
    "VUV", // Vanuatu Vatu
    "WST", // Samoan Tala
    "TOP", // Tongan Paʻanga
    "KMF", // Comorian Franc
    "MGA", // Malagasy Ariary
    "MWK", // Malawian Kwacha
    "MZN", // Mozambican Metical
    "RWF", // Rwandan Franc
    "SCR", // Seychellois Rupee
    "SLL", // Sierra Leonean Leone
    "SOS", // Somali Shilling
    "SSP", // South Sudanese Pound
    "SZL", // Swazi Lilangeni
    "ZMW", // Zambian Kwacha
    "ZWL", // Zimbabwean Dollar
  ])
  .describe(`The physical(not crypto) currency symbol (e.g. 'USD', 'EUR', 'GBP')`);

export type Currency = z.infer<typeof CurrencyEnumZod>;
