export function setLang(langs) {
  // set lang.id
  let langId = 0;
  let newLangs = langs.map((lang) => {
    lang.id = langId;
    langId++;
    return lang;
  });
  chrome.storage.local.set({
    langs: JSON.stringify(newLangs),
  });
  return newLangs
}
