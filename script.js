const api = "https://api.centralasia.tech/api/news";
const cont = document.getElementById("container");
const news_card = document.getElementById("news_card");

async function showData() {
  news_card.textContent = "loading...";
  try {
    const response = await fetch(api);
    if (response.ok) {
      const data = await response.json();
      news_card.textContent = "";
      renderNewsCard(data);
    } else {
      console.log("Error http : " + response.status);
    }
  } catch (error) {
    console.log("error :" + error.message);
  }
}

const renderNewsCard = (data) => {
  if (data?.count) {
    const countElement = document.createElement("p");
    countElement.className = " text-2xl hidden font-semibold  ";
    countElement.textContent = "Count: " + data.count;
    news_card.appendChild(countElement);
  }

  if (data.results) {
    const listElement = document.createElement("div");
    listElement.className = "flex flex-col gap-2.5 w-full mt-2.5";

    data.results.slice(0, 4).forEach((item) => {
      const newsElement = document.createElement("div");
      newsElement.className =
        "border border-slate-300 rounded-md p-3 flex flex-col gap-2";

      const newsTitleElem = document.createElement("h3");
      newsTitleElem.className = "text-lg font-semibold";
      newsTitleElem.textContent = item.title;

      if (item?.thumb) {
        const newsImgElem = document.createElement("img");
        newsImgElem.className = "w-full h-auto object-cover rounded-md";
        newsImgElem.src = item.thumb;
        newsImgElem.alt = item.title;

        newsElement.appendChild(newsImgElem);
      }

      newsElement.appendChild(newsTitleElem);

      // Добавляем контейнер новости в общий список
      listElement.appendChild(newsElement);
    });

    news_card.appendChild(listElement);
  } else {
    const listEmpty = document.createElement("p");
    listEmpty.className = "text-xl font-normal p-3";
    listEmpty.innerText = "data not found";
    news_card.appendChild(listEmpty);
  }
};

showData();

// backup file