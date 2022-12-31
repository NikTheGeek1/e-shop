import headTranslations from './head';

export type TranslationsType = {
  [key: string]: {
    en: string;
    gr: string;
  };
};
const translations: TranslationsType = {
  ...headTranslations,
};

export default translations;
