import officialInfo from '@/assets/official-info.json';
export function getOfficialInfo(keyword) {
  let matches = officialInfo["items"].filter((value) => {
    const regex = new RegExp(value.keyword, 'i');
    return regex.test(keyword);
  })
  return matches;
}
