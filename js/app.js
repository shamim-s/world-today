const loadCatagoriesData = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayCatagoriesData(data.data.news_category);
    }
    catch(error){
        console.log(error);
    }
}

const displayCatagoriesData = (catagories) => {
    console.log(catagories);
    const catagoriesContainer = document.getElementById('catagories-container');

    catagories.forEach(catagorie => {
        console.log(catagorie);
        const catagorieDiv = document.createElement('div');
        catagorieDiv.classList.add('catagorie');
        catagorieDiv.innerHTML = `
        <a href="##" onclick="loadNewsData('${catagorie.category_id}', '${catagorie.category_name}')" class="btn p-2 text-decoration-none px-3 text-secondary fw-semibold">${catagorie.category_name}</a>
        `;

        catagoriesContainer.appendChild(catagorieDiv);
    });
}

const loadNewsData = async(id, name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

    try{
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data, name);
    }
    catch(error){
        console.log(error);
    }
}

const displayNews = (newses, name) => {
    // console.log(newses);
    const foundCatagory = document.getElementById('found-catagorie');
    foundCatagory.innerText =` ${name}`;

    const newsContainer = document.getElementById('news-container');
    const foundNewsNumber = document.getElementById('found-number');
    foundNewsNumber.innerText =`${newses.length}`;
    newsContainer.innerHTML = '';

    newses.forEach(news =>{
        // console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add("row", "gy-5", "gx-6","bg-white", "p-2", "rounded-2", "mt-4");
        newsDiv.innerHTML = `
    <div class="col-sm-12 col-md-4 h-50">
        <img src="${news.image_url}" alt="" class="img-fluid">
    </div>
    <div class="col-sm-12 col-md-8"> 
        <h3>${news.title}</h3>

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum quasi officiis sunt expedita eaque distinctio illo animi nemo delectus, consequatur accusamus repellat debitis explicabo pariatur labore asperiores ipsa eos voluptas.</p>

        <div><img src="..." alt=""> <span>Hello</span>Hello<span></span>Hello<span></span></div>
    </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
}
loadCatagoriesData();