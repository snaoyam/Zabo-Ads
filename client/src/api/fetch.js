/*
{
  "poster": "https://sparcs-kaist-zabo-prod.s3.ap-northeast-2.amazonaws.com/zabo/zabo-136421683085229471",
  "background_color": "#643671",
  "text_color": "#ffffff",
  "author": "SPARCS",
  "author_img": "https://sparcs-kaist-zabo-prod.s3.ap-northeast-2.amazonaws.com/profile/group-1583234938504",
  "title": "Taxi: Kaist를 위한 택시 승차 공유 서비스",
  "description": "택시 탑승 인증 이벤트 및 인스타그램 공유 이벤트 진행 중!"
}
*/

const fetchZaboData = async () => {
  const response = await fetch('http://localhost:3000/api');
  const data = await response.json();
  return data;
}

export { fetchZaboData };