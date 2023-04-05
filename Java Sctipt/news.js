const loadData = () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res => res.json())
    .then(data => titleHeader(data.data.news_category))
    .catch(error => console.log(error))
};

const loadSingleData =(id)=>{
    toggleLoader(true);
    const url =`https://openapi.programming-hero.com/api/news/category/0${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data))
    .catch(error => console.log(error))
};

const titleHeader = (datas) =>{
    const titleDiv = document.getElementById('title-container');
    titleDiv.classList.add('d-flex', 'justify-content-around')
    datas.forEach(data => {
        // console.log(data)
        const title = document.createElement('p');
        title.classList.add('hover')
        title.innerHTML = `
        <p onclick="loadSingleData(${data.category_id})">${data.category_name}</p>
        `;
        titleDiv.appendChild(title);
    });
}

const displayData = (allData) =>{
    const article = document.getElementById('article-container');
    article.innerHTML =``;
    const alertMassage = document.getElementById('alert');
    if(allData.length === 0){
        alertMassage.classList.remove('d-none');
    }
    else{
        alertMassage.classList.add('d-none');
    }
    toggleLoader(false)
    allData.forEach(data =>{
        // console.log(data)
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
              <img src="${data.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${data.author.name}</h5>
                <p class="card-text overflow-hidden">
                ${data.details.slice(0,400)}
                </p>
                <div class="d-flex align-items-center justify-content-between">
                    <div class="ms-2 d-flex">
                     <img style="height: 40px" class="img-fluid rounded-circle"src="${data.author.img}" alt="">
                     <h6>Jane Cooper <br> ${data.author.published_date}</h6>
                    </div>
                    <p><i class="fa-solid fa-eye me-3"></i>${data.total_view}</p>
                    <p>
                    <i class="fa-solid fa-star star"></i>
                    <i class="fa-solid fa-star star"></i>
                    <i class="fa-solid fa-star star"></i>
                    <i class="fa-solid fa-star star"></i>
                    <i class="fa-solid fa-star star"></i>
                    </p>
                    <p onclick="loadDetailes('${data._id}')"><i type="button" class="fa-solid fa-arrow-right fw-bold fs-4 text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></p>
                </div>
              </div>
            </div>
          </div>
        `;
        article.appendChild(card);
        
    })
    const nofication = document.getElementById('notification');
    nofication.innerText = allData.length;
}

const toggleLoader = (isLoding) =>{
    const loader = document.getElementById('loaderSection');
    if(isLoding){
        loader.classList.remove('d-none')
    }

    else{
        loader.classList.add('d-none')
    }
};

const loadDetailes = (id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetaile(data.data))
    .catch(error => console.log(error))
};

const displayDetaile = (allDetail) =>{
  const detailSection = document.getElementById('modal-body');
  detailSection.innerHTML=``;
    allDetail.forEach(detail =>{
        console.log(detail)
       const cardDiv = document.createElement('div');
       cardDiv.classList.add('card')
        cardDiv.innerHTML = `
        <img src="${detail.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${detail.author.name}</h5>
          <p class="card-text">${detail.details} <br>
          <small>${detail.author.published_date}</small>
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div> 
        `;
        detailSection.appendChild(cardDiv)
    })
}



// ALL CALLBACK FUNCTION
loadDetailes();
loadData();
// ALL CALLBACK FUNCTION