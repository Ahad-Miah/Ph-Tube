
const getCategories=()=>{

fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
.then(response =>response.json())
.then(data =>displayCategories(data.categories))
.catch(error =>console.log(error));

}

const removeActiveClass= ()=>{
    const buttons= document.getElementsByClassName('category-btn');
   
    for(const button of buttons){
        button.classList.remove('bg-red-600');
        button.classList.remove('text-white');
    }
}
const loadCategoryVideos= (id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res =>res.json())
    .then(data =>{
        removeActiveClass();
        const activeBtn=document.getElementById(`${id}`);
        activeBtn.classList.add('bg-red-600');
        activeBtn.classList.add('text-white');
        displayVideos(data.category)
    })
    .catch(error=>console.log(error));
}

const displayCategories =(data) =>{
    const categoryContainer = document.getElementById('category-container');
    
    data.forEach( (item) =>{
        // console.log(item);


        const buttonContainer =document.createElement("div");
        buttonContainer.innerHTML=`
        <button id="${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">${item.category}</button>
        `;


        categoryContainer.append(buttonContainer);

    })
}

const getVideos =(searchText ="")=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then( res => res.json())
    .then( data =>displayVideos(data.videos))
    .catch(error =>console.log(error));
}

const loadDetails =(videoId)=>{
    fetch( `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    .then(res=>res.json())
    .then(data =>displayDetails(data.video))
    .catch(error=>console.log(error));
}
const displayDetails=(video)=>{
    console.log(video);

    const detailsContainer =document.getElementById('modalContent');

    document.getElementById('showModalData').click();

    detailsContainer.innerHTML=`
    <img src="${video.thumbnail}"  />
    <p>${video.description}</p>
    `
}

const displayVideos = (videos)=>{
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML="";

    if(videos.length==0){
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML=  `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">

        <img src="./assets/Icon.png"  />

        <p class="font-bold text-gray-500 text-2xl">No Contents Here</p>
        
        </div>
        `
        return;
    }
    else{
        videoContainer.classList.add("grid");
    }
    videos.forEach((video) =>{
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
  <div class="flex justify-end">
  <button onclick="loadDetails('${video.video_id}')" class="btn btn-error">View Details</button>
  </div>
        `
        videoContainer.append(card);
        

    } )

}

document.getElementById('search').addEventListener("keyup",function(event){
    getVideos(event.target.value);
})
getCategories();
getVideos();