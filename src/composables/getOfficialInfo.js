import officialInfo from '@/assets/official-info.json';

function getOfficialInfos() {
  var queryString = window.location.search;
  let params = new URLSearchParams(queryString);
  let param_q = params.get("q");
  let matches = officialInfo["items"].filter((value) => {
    const regex = new RegExp(value.keyword, 'i');
    return regex.test(param_q);
  })
  return matches;
}

let officials = [];
let infos = getOfficialInfos();
if (infos.length !== 0) {
  for (let info of infos) {
    let headings = [];

    // add Homepage
    let heading = {id: 0, title: "Homepage", links: [], icon: "badge-check"};
    for (let item of info.home_url) {
      heading.links.push(item);
    }
    headings.push(heading);

    // add Document
    heading = {id: 1, title: "Document", links: [], icon: "document-text"};
    for (let item of info.doc_url) {
      heading.links.push(item);
    }
    headings.push(heading);

    // add Search By Document
    heading = {id: 2, title: "Search By Document", links: [], icon: "document-search"};
    for (let item of info.doc_search) {
      heading.links.push(item);
    }
    headings.push(heading);

    // add Search By Google
    heading = {id: 3, title: "Search By Google", links: [], icon: "search"};
    heading.links.push("site: ")
    headings.push(heading);

    officials.push({"name": info.name, "item": headings});
  }
}
export let officialInfos = officials;
