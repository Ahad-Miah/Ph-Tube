
const getCategories=()=>{

fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
.then(response =>response.json())
.then(data =>displayCategories(data.categories))
.catch(error =>console.log(error));

}

const loadCategoryVideos= (id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res =>res.json())
    .then(data =>displayVideos(data.category))
    .catch(error=>console.log(error));
}

const displayCategories =(data) =>{
    const categoryContainer = document.getElementById('category-container');
    
    data.forEach( (item) =>{
        // console.log(item);


        const buttonContainer =document.createElement("div");
        buttonContainer.innerHTML=`
        <button onclick="loadCategoryVideos(${item.category_id})" class="btn">${item.category}</button>
        `;


        categoryContainer.append(buttonContainer);

    })
}

const getVideos =()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then( res => res.json())
    .then( data =>displayVideos(data.videos))
    .catch(error =>console.log(error));
}

const displayVideos = (videos)=>{
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML="";
    videos.forEach((video) =>{
        console.log(video);

        const card=document.createElement('div');
        card.classList= "card "
        card.innerHTML = `
        <figure class="h-[200px]">
    <img
      src="${video.thumbnail}" class="h-full w-full object-cover" />
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div class="flex gap-2">
    <img src="${video.authors[0].profile_picture}" class="w-10 h-10 rounded-full" />
   
    </div>
     <div>
     <div>
      <h2 class="font-bold text-lg">${video.title}</h2>
     </div>
     <div class="flex gap-2 items-center">
      <p> ${video.authors[0].profile_name}</P>
      ${video.authors[0].verified==true?' <img src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" class="w-5" />' :""}
     
     </div>
        <p> ${video.others.views}</P>
    </div>

  </div>
        `
        videoContainer.append(card);
        

    } )

}







getCategories();
getVideos();