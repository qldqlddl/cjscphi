// script.js

const celestialObjects = [
  {
    name: "오리온자리",
    visibleHemisphere: "north",
    visibleMonths: [12, 1, 2],  // 겨울철 북반구
    latitudeRange: [-30, 90],   // 남극부터 북극까지 다 보이진 않음
  },
  {
    name: "남십자자리",
    visibleHemisphere: "south",
    visibleMonths: [5, 6, 7, 8],
    latitudeRange: [-90, 30],
  },
  {
    name: "토성 (행성)",
    visibleHemisphere: "both",
    visibleMonths: [3, 4, 5, 6, 7, 8, 9], // 봄~가을
    latitudeRange: [-90, 90],
  },
  {
    name: "금성 (행성)",
    visibleHemisphere: "both",
    visibleMonths: [1, 2, 3, 4, 10, 11, 12], // 초봄, 가을~겨울
    latitudeRange: [-90, 90],
  },
  {
    name: "베텔게우스 (별)",
    visibleHemisphere: "north",
    visibleMonths: [11, 12, 1, 2],
    latitudeRange: [0, 90],
  },
  {
    name: "알타이르 (별)",
    visibleHemisphere: "both",
    visibleMonths: [6, 7, 8],
    latitudeRange: [-45, 90],
  },
  {
    name: "시리우스 (별)",
    visibleHemisphere: "both",
    visibleMonths: [12, 1, 2, 3],
    latitudeRange: [-90, 60],
  }
];

// 위도에 따라 북반구, 남반구, 양쪽 구분
function getHemisphere(lat) {
  if (lat > 15) return "north";
  else if (lat < -15) return "south";
  else return "both"; // 적도 근처
}

document.getElementById("skyForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const lat = parseFloat(document.getElementById("latitude").value);
  const lon = parseFloat(document.getElementById("longitude").value);
  const datetime = document.getElementById("datetime").value;

  if (isNaN(lat) || isNaN(lon) || !datetime) {
    alert("모든 값을 올바르게 입력해주세요.");
    return;
  }

  const dateObj = new Date(datetime);
  const month = dateObj.getMonth() + 1;
  const hemisphere = getHemisphere(lat);

  // 조건에 맞는 천체 필터링
  const visibleObjects = celestialObjects.filter(obj => {
    // 월이 포함되는지
    if (!obj.visibleMonths.includes(month)) return false;

    // 위도가 범위 안에 있는지
    if (lat < obj.latitudeRange[0] || lat > obj.latitudeRange[1]) return false;

    // 반구가 맞는지 (both면 모두 가능)
    if (obj.visibleHemisphere !== "both" && obj.visibleHemisphere !== hemisphere) return false;

    return true;
  });

  const resultDiv = document.getElementById("result");

  if (visibleObjects.length === 0) {
    resultDiv.innerHTML = `<p>입력한 위치와 시간에 관측 가능한 천체가 없습니다.</p>`;
  } else {
    let html = `
      <p>입력 위치: 위도 ${lat.toFixed(2)}, 경도 ${lon.toFixed(2)}</p>
      <p>입력 시간: ${dateObj.toLocaleString()}</p>
      <p>관측 가능한 천체 목록:</p>
      <ul>
    `;

    visibleObjects.forEach(obj => {
      html += `<li>${obj.name}</li>`;
    });

    html += "</ul>";
    resultDiv.innerHTML = html;
  }
});
