import officialInfo from '@/assets/official-info.json';

export function getOfficialInfo() {
  var queryString = window.location.search;
  let params = new URLSearchParams(queryString);
  let param_q = params.get("q");
  let matches = officialInfo["items"].filter((value) => {
    const regex = new RegExp(value.keyword, 'i');
    return regex.test(param_q);
  })
  return matches;
}
