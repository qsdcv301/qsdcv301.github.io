function preloader() {
  "use strict";
  $(".preloader").delay(100).fadeOut(10);
}
// $(preloader);
$(document).ready(function () {
  $("#sendEmail").click(function (e) {
    e.preventDefault();
    const fromEmail = $("#fromEmail").val();
    const fromName = $("#fromName").val();
    const fromTel = $("#fromTel").val();
    const subject = $("#subject").val();
    let body = $("#body").val();
    body =
      "<h1>" +
      fromName +
      "(" +
      fromEmail +
      ") 님의 메일입니다. </h1><br>" +
      "전화번호 : " +
      fromTel +
      "<br><br>" +
      subject;
    Email.send({
      SecureToken: "",
      To: "qsdcv301@naver.com",
      From: fromEmail,
      Subject: subject,
      body: body,
    })
      .then((message) => {
        console.log("이메일을 성공적으로 보냈습니다.");
      })
      .catch((error) => {
        console.log("이메일을 보내는데 실패했습니다.");
      });
  });
});
