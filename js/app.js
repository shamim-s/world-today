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

// Default Load some news after enter website====================================
const laodDefaultNews = async() => {
    // start spinner 
    spinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/08`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data, "All News");
    }
    catch(error){
        console.log(error);
    }
}
laodDefaultNews();

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
        <div>
            <p>${details.details}</p>
        </div>
        <hr>
        <div class="bg-secondary p-2 text-white">
            <h6>Author: ${details.author?.name ?? "No data found"}</h6>
            <p>Published: ${details.author?.published_date ?? "No data found"}</p>
            <p>View: ${details?.total_view?? "No data found"}</p>
            <p>Rating: ${details.rating?.badge ?? "No data found"}</p>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
    `;
    modalContainer.appendChild(modalContent);
}

loadCatagoriesData();