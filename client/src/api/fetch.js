import axios from 'axios';

const testHorizontal = {
  "poster_img": "https://sparcs-kaist-zabo-prod.s3.ap-northeast-2.amazonaws.com/zabo/zabo-138091617542027732",
  "background_color": "#000000",
  "text_color": "#ffffff",
  "author": "SPARCS",
  "author_img": "https://sparcs-kaist-zabo-prod.s3.ap-northeast-2.amazonaws.com/profile/group-1583234938504",
  "title": "[2021 봄학기 별바라기 단독전시회🖼]",
  "description": "별바라기의 첫 단독전시회가 열립니다!🎉"
}

const testVertical = {
  "poster_img": "https://sparcs-kaist-zabo-prod.s3.ap-northeast-2.amazonaws.com/zabo/zabo-136421683085229471",
  "background_color": "#643671",
  "text_color": "#ffffff",
  "author": "SPARCS",
  "author_img": "https://sparcs-kaist-zabo-prod.s3.ap-northeast-2.amazonaws.com/profile/group-1583234938504",
  "title": "Taxi: Kaist를 위한 택시 승차 공유 서비스",
  "description": "택시 탑승 인증 이벤트 및 인스타그램 공유 이벤트 진행 중!"
}

// refactor above fetchZaboData function to axios
const fetchZaboData = async () => {
  const response = await axios.get('http://localhost:5000/');
  const data = await response.data;
  return data;
}

export { fetchZaboData };