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
                    <img src="${news.author.img}" alt="" class="img-fluid rounded-5 d-md-block d-lg-block d-none">
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