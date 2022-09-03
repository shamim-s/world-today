// Load all catagory data ======================================================
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

// Display all catagory =======================================================
const displayCatagoriesData = (catagories) => {
    const catagoriesContainer = document.getElementById('catagories-container');
    catagoriesContainer.innerHTML = '';

    catagories.forEach(catagorie => {
        const catagorieDiv = document.createElement('div');
        catagorieDiv.classList.add('catagorie');
        catagorieDiv.innerHTML = `
        <a href="##" onclick="loadNewsData('${catagorie.category_id}', '${catagorie.category_name}')" class="btn p-2 text-decoration-none px-3 text-secondary fw-semibold">${catagorie.category_name}</a>
        `;

        catagoriesContainer.appendChild(catagorieDiv);
    });
}
// Loading Spinner -------------------------------------------
const spinner = isLoading => {
    const loadingSpinner = document.getElementById('spinner');
    if(isLoading){
        loadingSpinner.classList.remove('d-none');
    }else{
        loadingSpinner.classList.add('d-none');
    }
}

// Load news data by catagory ==================================================
const loadNewsData = async(NewsCatagorie, name) => {
    // start spinner 
    spinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${NewsCatagorie}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data, name);
    }
    catch(error){
        console.log(error);
    }
}
// Display all news by catagory=================================================
const displayNews = (newses, name) => {
    // console.log(newses);
    const newsContainer = document.getElementById('news-container');

    // set news quntity number each catagory
    const foundNewsNumber = document.getElementById('found-number');
    foundNewsNumber.innerText =`${newses.length}`;

    // Display catagory name in items found for category 
    const foundCatagory = document.getElementById('found-catagorie');
    foundCatagory.innerText =` ${name}`;

    // No News found massage 
    const notFoundMassage = document.getElementById('no-news-found-massage');
    if(newses.length === 0){
        notFoundMassage.classList.remove('d-none');
    }else{
        notFoundMassage.classList.add('d-none');
    }

    newsContainer.innerHTML = '';

    newses.forEach(news =>{
        const newsDiv = document.createElement('div');
        newsDiv.classList.add("row", "gx-6","bg-white", "p-2", "rounded-2", "mt-4");
        newsDiv.innerHTML = `
    <div class="col-md-4">
        <img src="${news.image_url}" alt="" class="img-fluid">
    </div>
    <div class="col-md-8"> 
        <h3>${news.title}</h3>
        <p class="text-truncate mb-4">${news.details}</p>

        <div class="d-md-flex justify-content-between align-items-center">
            <div class="w-25 d-flex">
                <div class="w-25 me-2">
                    <img src="${news.author.img}" alt="" class="img-fluid rounded-5">
                </div>
                <div>
                    <h6 class="text-nowrap text-truncate">${news.author?.name ?? "No data found"}</h6>
                    <p class="d-none d-md-block d-lg-block">${news.author?.published_date ?? "No data found"}</p>
                </div>
            </div> 
            <div class="w-75 d-flex justify-content-around align-items-center">
                <span><i class="fa-regular fa-eye"></i> ${news?.total_view ?? "No data found"}</span>
                <span>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                </span>
                <span>
                    <i id="more-detail" onclick="loadNewsCardDetails('${news._id}')" class="fa-solid fa-arrow-right fs-2 text-primary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                </span>
                <h6></h6>
            </div>
        </div>
    </div>

        `;
        newsContainer.appendChild(newsDiv);
    });

    // stop spinner 
    spinner(false);
}

// load news card full details =====================================================
const loadNewsCardDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsCardDetails(data.data[0]))
}

// Display news card full details =====================================================
const displayNewsCardDetails = details => {
    console.log(details);

    const modalContainer = document.getElementById('modal-dialog');
    modalContainer.innerHTML = '';
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    modalContent.innerHTML = `
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${details.title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <p>${details.details}</p>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
    `;
    modalContainer.appendChild(modalContent);
}

loadCatagoriesData();