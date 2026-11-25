
// app.js : 영화 배열을 다루는 함수 / 장성익(2651059) / 10주차

// 영화 배열 ⇒ 평균 평점
function average(list) {
    let sum = 0;

    for (const m of list) {
        sum += m.rating;
    }

    return sum / list.length;
}

console.log("평균:", average(movies));


// 영화 배열 ⇒ 평점 합계
function total(list) {
    let sum = 0;

    for (const m of list) {
        sum += m.rating;
    }

    return sum;
}

console.log("합계:", total(movies));


// 영화 배열 ⇒ 최고 평점 영화 객체
function best(list) {
    let top = list[0];

    for (const m of list) {
        if (m.rating > top.rating) {
            top = m;
        }
    }

    return top;
}

console.log("최고:", best(movies).title);


// 영화 배열 ⇒ 8점 이상 영화 개수
function countHigh(list) {
    let count = 0;

    for (const m of list) {
        if (m.rating >= 8) {
            count++;
        }
    }

    return count;
}

console.log("8점 이상:", countHigh(movies) + "편");


// 영화 배열 ⇒ 영화 평가 출력
function showResult(list) {
    for (const m of list) {
        let label;

        if (m.rating >= 8.5) {
            label = "명작";
        } else if (m.rating >= 7) {
            label = "추천";
        } else {
            label = "보통";
        }

        console.log(m.title + " (" + m.year + ") : " + m.rating + " " + label);
    }
}

showResult(movies);


// 평균, 최고 평점 영화 정보
const avgText = average(movies).toFixed(1);
const bestmovi = best(movies).title;

alert(`내 영화 ${movies.length}편, 평균 ${avgText}점, 최고는 ${bestmovi}`);


// 영화 배열, 최소 평점 ⇒ 그 이상인 영화만 담은 새 배열
function filterByRating(list, min) {
    return list.filter(m => m.rating >= min);
}

console.log("8점 이상:", filterByRating(movies, 8).length + "편");


// 영화 배열 ⇒ 평점 높은 순으로 정렬한 새 배열
function sortByRating(list) {
    return [...list].sort((a, b) => b.rating - a.rating);
}

const sorted = sortByRating(movies);

console.log("정렬 1위:", sorted[0].title, "/ 원본 1번:", movies[0].title);


// 날짜 문자열 ⇒ 올해까지 몇 년 전인지 계산
function yearsSince(dateStr) {
    return new Date().getFullYear() - new Date(dateStr).getFullYear();
}

console.log(yearsSince(movies[0].date) + "년 전 개봉");


// 포스터 경로, 크기 ⇒ TMDB 이미지 주소
function posterUrl(path, size) {
    return "https://image.tmdb.org/t/p/" + size + path;
}

function renderCards(list) {
    const board = document.querySelector(".board");
    board.innerHTML = "";
    for (const m of list) {
        const card = document.createElement("article");
        card.className = "card";
        if (m.rating >= 8) { card.classList.add("hot"); }
        card.innerHTML = `
 <img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터">
 <span class="badge">${m.rating}</span>
 <div class="info">
 <h2>${m.title}</h2>
 <p class="year">${m.year}</p>
 <button class="like"
type="button">♥</button>
 </div>`;
        board.appendChild(card);
        document.
            getElementById("count").textContent = list.length + "편";
updateLikeCount();
    }
}
function sortBy(list, key, desc) {
    const copy = [...list];
    copy.sort((a, b) => {
        if (typeof a[key] === "string") return a[key].localeCompare(b[key]);
        return a[key] - b[key];
    });
    if (desc) copy.reverse();
    return copy;
}
// applySort : 선택 상자 값으로 정렬해서 다시 그리기(반환값 없음)
function applySort() {
    renderCards(getView());
}
renderCards(movies);

document.getElementById("q").addEventListener("input", (e) => {
    renderCards(getView());
});

document.getElementById("sort").addEventListener("change", applySort);

// getView : 없음 ⇒ 검색어로 거른 뒤 선택 상자 기준으로 정렬한 새 배열
function getView() {
    const keyword = document.getElementById("q").value.trim().toLowerCase();
    const found = movies.filter(m => m.title.toLowerCase().includes(keyword));
    const key = document.getElementById("sort").value;
    return sortBy(found, key, key !== "title");

}

document.querySelector(".board").addEventListener("click", (e) => {
    if
        (e.target.classList.contains("like")) { e.target.classList.toggle("liked"); updateLikeCount(); }
});

 function updateLikeCount() { document.getElementById("likeCount").textContent =
document.querySelectorAll(".liked").length; }

document.getElementById("q").addEventListener("keydown", (e) => { if (e.key === "Escape")
{ e.target.value = ""; renderCards(getView()); } });