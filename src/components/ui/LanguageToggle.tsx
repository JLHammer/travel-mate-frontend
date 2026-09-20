import { useState } from "react";

type Language = "da" | "en";

export const LanguageToggle = () => {
  const [language, setLanguage] = useState<Language>("da");

  return (
    <>
      <label htmlFor="lang-select">Select Language</label>

      <select
        id="lang-select"
        value={language}
        onChange={(event) => setLanguage(event.target.value as Language)}
      >
        <option value="da">🌐 DA</option>
        <option value="en">🌐 EN</option>
      </select>
    </>
  );
};
