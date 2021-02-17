import officialInfo from '@/assets/official-info.yaml';
export function getOfficialInfo(keyword) {
  let matches = officialInfo.filter((value) => {
    const regex = new RegExp(value.keyword, 'i');
    return regex.test(keyword);
  })
  return matches;
}
