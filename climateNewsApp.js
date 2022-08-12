const climateNewsCard = document.querySelector('.climate--news--container');
console.log(climateNewsCard);
const options = {
  method: 'GET',
  headers: {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'c7e4f03fd0msh0675d167de2b9a4p1d8397jsn65da7e6f70d3',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
  },
};

const climateNewsApp = async () => {
  try {
    const response = await fetch(
      'https://bing-news-search1.p.rapidapi.com/news/search?q=climate&count=20&freshness=Day&textFormat=Raw&safeSearch=Off',
      options
    );
    const data = await response.json();

    const { value } = data;
    console.log(value, 'hello');
    const news = value
      .map((item) => {
        return `<article class="news--card" >
<img class="news--image" src=${
          item?.image?.thumbnail?.contentUrl ||
          'https://th.bing.com/th/id/R.90368d1c2af3a0a902f88d273b875840?rik=GteFc7G4UKIwAA&pid=ImgRaw&r=0'
        } />
      
      <a class="news--link" href=${item.url} target=_blank> <span>${
          item.name
        }</span> </a>
      <div class="news--card--footer" >
      <p>${new Date(item.datePublished).toLocaleDateString()}</p>
     <div class="align">
      <img  class="news--publisher--logo" src=${
        item.provider[0]?.image?.thumbnail?.contentUrl
      }/>
      <p>${item?.provider[0].name}</p>
     </div>
      </div>
      </article>
      `;
      })
      .join('');
    console.log('hello');
    climateNewsCard.innerHTML = news;
  } catch (error) {
    console.log(error);
  }
};

climateNewsApp();
