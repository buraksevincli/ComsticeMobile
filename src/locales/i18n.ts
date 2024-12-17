import {I18n} from 'i18n-js';
import {getLocales} from 'react-native-localize';
import en from './en.json';
import tr from './tr.json';

const translations = {en, tr};

const i18n = new I18n(translations);

const locales = getLocales();
const defaultLanguage = 'en';

const userLanguageTag =
  locales.length > 0 ? locales[0].languageTag : defaultLanguage;
const selectedLanguage = userLanguageTag.split('-')[0];

i18n.locale = selectedLanguage;
i18n.enableFallback = true;

export default i18n;
