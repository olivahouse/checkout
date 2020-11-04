const STRINGS = {
  en: {
    CHOOSE_THE_PACK: `Choose the pack you'd like and click 'Pay'`,
    GET_STARTED: 'Pay',
  },
  es: {
    CHOOSE_THE_PACK: `Elige el pack que deseas y haz clic en 'Pagar'`,
    GET_STARTED: 'Pagar',
  }
}

export const getStrings = (languageCode) => STRINGS[languageCode || 'en'];
