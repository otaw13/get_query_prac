const api = "https://api.centralasia.tech/api/news";
const cont = document.getElementById("container");
const news_card = document.getElementById("news_card");
const cont2 = document.getElementById("container-2");
const picref = "https://outsource.gov.uz/ru/media/";




async function showData() {
  news_card.textContent = "loading...";
  try {
    const response = await fetch(api);
    if (response.ok) {
      const data = await response.json();
      news_card.textContent = "";
      renderNewsCard(data);
      renderNewsCardAll(data);
    } else {
      console.log("Error http : " + response.status);
    }
  } catch (error) {
    console.log("error :" + error.message);
  }
}

const renderNewsCard = (data) => {
  if (!data) return;

  const listElement = document.createElement("div");
  listElement.className =
    "container mx-auto grid grid-cols-10 lg:grid-rows-8 md:grid-rows-6 w-full my-10 gap-5 ";

  {
    const newsElement1 = document.createElement("a");
    const newsElement2 = document.createElement("a");
    const newsElement3 = document.createElement("a");
    const newsElement4 = document.createElement("a");

    newsElement1.className =
      "lg:col-span-6 lg:row-span-8 md:col-span-10 md:row-span-4 col-span-10 row-span-6 overflow-hidden cursor-pointer";
    newsElement2.className =
      "lg:col-span-2 lg:row-span-3 md:col-span-5 md:row-span-2 col-span-10 row-span-6 overflow-hidden cursor-pointer";
    newsElement3.className =
      "lg:col-span-2 lg:row-span-3 md:col-span-5 md:row-span-2 col-span-10 row-span-6 overflow-hidden cursor-pointer";
    newsElement4.className =
      "lg:col-span-4 lg:row-span-5 max-lg:hidden md:col-span-5 md:row-span-2 overflow-hidden cursor-pointer";

    newsElement1.href = picref + data?.results[0].slug;
    newsElement2.href = picref + data?.results[1].slug;
    newsElement3.href = picref + data?.results[2].slug;
    newsElement4.href = picref + data?.results[3].slug;

    newsElement1.target = "_blank";
    newsElement2.target = "_blank";
    newsElement3.target = "_blank";
    newsElement4.target = "_blank";

    const newsImgElem1 = document.createElement("img");
    newsImgElem1.className = "w-full h-[100%] object-cover";
    newsImgElem1.src = data?.results[0].thumb;
    newsImgElem1.alt = data?.results[0].title;
    newsElement1.appendChild(newsImgElem1);

    const newsImgElem2 = document.createElement("img");
    newsImgElem2.className =
      "w-full h-full object-cover hover:scale-[125%] transition duration-300";
    newsImgElem2.src = data?.results[1].thumb;
    newsImgElem2.alt = data?.results[1].title;
    newsElement2.appendChild(newsImgElem2);

    const newsImgElem3 = document.createElement("img");
    newsImgElem3.className =
      "w-full h-full object-cover hover:scale-[125%] transition duration-300";
    newsImgElem3.src = data?.results[2].thumb;
    newsImgElem3.alt = data?.results[2].title;
    newsElement3.appendChild(newsImgElem3);

    const newsImgElem4 = document.createElement("img");
    newsImgElem4.className =
      "w-full h-full object-cover hover:scale-[125%] transition duration-300";
    newsImgElem4.src = data?.results[3].thumb;
    newsImgElem4.alt = data?.results[3].title;
    newsElement4.appendChild(newsImgElem4);

    listElement.appendChild(newsElement1);
    listElement.appendChild(newsElement2);
    listElement.appendChild(newsElement3);
    listElement.appendChild(newsElement4);

    news_card.appendChild(listElement);
  }
};

const renderNewsCardAll = (data) => {
  if (!data) return;

  const mapElement = document.createElement("div");
  mapElement.className = "container mx-auto grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-5 gap-5";

  data.results.map((item) => {
    const newsElement = document.createElement("a");
    newsElement.className =
      "cursor-pointer p-5 flex flex-col h-full col-span-1 items-center bg-white  overflow-hidden rounded-xl";
    newsElement.href = picref + item.slug;
    newsElement.target = "_blank";

    const newsImgElemMap = document.createElement("img");
    newsImgElemMap.className = "w-[600px] h-[400px]  object-cover rounded-xl";
    newsImgElemMap.src = item.thumb;
    newsImgElemMap.alt = item.title;

    const newsTitleElem = document.createElement("h3");
    newsTitleElem.className = "mt-2 font-bold opensans text-[21px]";
    newsTitleElem.textContent = item.title;

    const newsShortDesc = document.createElement("p");
    newsShortDesc.className =
      "line-clamp-3 mt-2 text-[#0c111d] opensans text-[18px]";
    newsShortDesc.textContent = item.short_description;

    const newsDate = document.createElement("p");
    newsDate.className =
      "text-[#0c111d] text-[18px] font-semibold mt-2 self-end";
    newsDateFormated = moment(item.created_at).format("DD / MM / YYYY");
    newsDate.textContent = newsDateFormated;

    newsElement.appendChild(newsImgElemMap);
    newsElement.appendChild(newsTitleElem);
    newsElement.appendChild(newsShortDesc);
    newsElement.appendChild(newsDate);

    mapElement.appendChild(newsElement);
  });

  cont2.appendChild(mapElement);
};

showData();
