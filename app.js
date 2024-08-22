const token = "AIzaSyAGC8_6WeRYtkgnWp4aYkCGG5enNcyFnjg";
const form = document.querySelector(".form");
const firstVideo = document.getElementById("firstVideo");
const videosList = document.getElementById("videos");

if (form) {
  // Слушаем форму на сабмит
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // Получаем поле поиска
    const search = event.target.elements.search;
    if (search.value !== "") {
      getVideos(search.value);
    } else {
      alert("Введите хоть что-нибудь!");
    }
  });
}
// Функция получения видео с API Youtube
const getVideos = (searchValue) => {
  const response = fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${token}&q=${searchValue}&type=video`
  ).then((response) => {
    return response.json();
  });
  response.then((result) => {
    if (result.items) {
      renderVideos(result.items);
    }
  });
};

// Отрисовываем видео первое и превьюшки

const renderVideos = (youtubeVideos) => {
  renderFirstVideo(youtubeVideos[0]);
  renderVideoList(youtubeVideos);
};

// Отрисовываем первое видео

const renderFirstVideo = (video) => {
  firstVideo.innerHTML = `<iframe src= "https://www.youtube.com/embed/${video.id.videoId}" width = "560" height = "315" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen/>`;
};
// Отрисовываем превьюшки
const renderVideoList = (videos) => {
  // очищаем контейнер для превьюшек чтобы не добавлялись при каждом поисковом запросе
  videosList.innerHTML = "";
  // Циклом проходим по полученным видосам
  videos.forEach((video) => {
    const preview = document.createElement("img");
    preview.classList = "preview";
    preview.src = video.snippet.thumbnails.high.url;
    videosList.append(preview);

    // Вешаем слушатель клика на превью текущее в цикле и отрисовываем видео
    preview.addEventListener("click", (e) => {
      renderFirstVideo(video);
    });
  });
};
