function getTextContentFromBody() {
  const bodyText = document.body.innerText || document.body.textContent;
  return bodyText;
}

function getWordSplit(text) {
  //영어는 전부 소문자로 바꾸고, 특수문자 제거하고, 공백을 기준으로 나누기
  let wordArray = text
    .toLowerCase()
    .replace(/^a-zA-Z\s/g, "")
    .split(/\s+/);
  let wordFe = {};

  wordArray.forEach((word) => {
    if (word) {
      wordFe[word] = (wordFe[word] || 0) + 1;
    }
  });
  return wordFe;
}

//단어빈도 정렬, 상위 16출력
function getHotWords(wordF, topN = 16) {
  let sortwords = Object.entries(wordF).sort((a, b) => b[1] - a[1]);
  return sortwords.slice(0, topN);
}

//결과출력
function displayHotWords() {
  let textContent = getTextContentFromBody();
  let wordFe = getWordSplit(textContent);
  console.table(wordFe);
  let hotWords = getHotWords(wordFe);
  let hotWordDiv = document.getElementById("pop-word");
  let spanTag = "";
  hotWords.forEach(([word, frequency], index) => {
    spanTag += `<span class="topword" title="${frequency}회">${word}</span>`;
  });
  hotWordDiv.innerHTML = spanTag;
}

displayHotWords();
