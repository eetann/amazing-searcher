export function checkTerm(term) {
  // check for correct 'term' format
  // check 'unit'
  if (!term.unit) {
    throw "The value of the 'unit' key is empty.\n"
  }

  // check 'num'
  if (!term.num) {
    throw "The value of the 'num' key is empty.\n"
  }
  if (Number.isInteger(term.num)) {
    throw "The type of the 'num' key value must be an integer.\n"
  }
  if (term.num <= 0) {
    throw "The type of the 'num' key value must be at least 1.\n"
  }
}

export function checkTermJson(resjson) {
  // check for correct 'Term list' format
  if (!Array.isArray(resjson)) {
    throw "There is no term list.\n";
  }

  // get terms
  let errorMsg = "";
  let terms = resjson.filter((term, idx) => {
    try {
      checkTerm(term);
    } catch (e) {
      errorMsg += "Error in term at index " + idx + ":" + e + "\n";
      return false
    }
    return true
  });
  terms = terms.map(term => {
    term.str = term.unit + String(term.num)
    return term
  })
  return {terms: terms, errorMsg: errorMsg}
}

export function setTerm(terms) {
  const unitList = ["n", "h", "d", "w", "m", "y"]
  // set term.id
  let newTerms = [...terms]
  newTerms.sort((a, b) => {
    const unitOrder = unitList.indexOf(a.unit) - unitList.indexOf(b.unit)
    if (unitOrder != 0) {
      return unitOrder
    }
    return a.num - b.num
  })
  let termId = 0;
  newTerms = newTerms.map((term) => {
    term.id = termId;
    termId++;
    return term;
  });
  chrome.storage.local.set({
    terms: JSON.stringify(newTerms),
  });
  return newTerms
}
