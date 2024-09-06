$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const file = urlParams.get("file");
  console.log(file); // 콘솔에 파일명이 출력되는지 확인

  $.get(`${file}`, function (text) {
    const { meta, content } = parseMarkDown(text);

    // 메타데이터 저장 및 데이터가 없을 경우 기본값 설정
    const title = meta.title || "Untitled Post";
    const date = meta.date || "날짜미상";
    const category = meta.category || "미분류";
    const image = meta.image || "/blog/images/posts/default.jpg";

    // 본문에서 HTML 코드 필터링
    const snippet = marked.parse(content);

    const articlelink = `article.html?file=${file}`;

    // HTML 만들기
    const articleHTML = `
      <div class="col-12">
        <div class="bg-white m-3 p-5 shadow-sm  myposts">
          <div class="img-box"> 
            <a href="${articlelink}"><img src="${image}" class="img-fluid img-thumbnail"></a>
            <span class="date">${date}</span>
          </div>
          <div class="content-box">
            <div class="category mt-4 mb-5"><span>${category}</span></div>
            <h1 class="mb-4">${title}</h1>
            ${snippet}
          </div>
        </div>
      </div>
    `;

    // 포스트를 id myposts에 append
    $("#myblogs").append(articleHTML);
  });

  function parseMarkDown(text) {
    const regex = /^---\s*([\s\S]+?)\s*---\s*([\s\S]*)$/;
    const match = text.match(regex);

    if (match) {
      const meta = {};
      match[1].split("\n").forEach((line) => {
        const [key, value] = line.split(":").map((str) => str.trim());
        if (key && value) {
          meta[key] = value.replace(/['"]/g, ""); // 따옴표 제거
        }
      });
      const content = match[2];
      return { meta, content };
    } else {
      return { meta: {}, content: text };
    }
  }
});
