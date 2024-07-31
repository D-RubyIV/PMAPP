import i18next from 'i18next';
import { initReactI18next } from "react-i18next"
import HttpBackend from "i18next-http-backend"
i18next
  .use(initReactI18next)
  .use(HttpBackend)
  .init({
    debug: true,
    fallbackLng: "vi",
    backend: {
      loadPath: `${import.meta.env.VITE_LANGUAURL}/locales/{{lng}}/{{ns}}.json`
    },
  });
export default i18next;
// initialized and ready to go!
// i18next is already initialized, because the translation resources where passed via init function