import { fetchListings } from "../api-calls/fetchListings.js";
import { getPopularTags } from "../functions/getPopularTags.js";

export async function renderTagsList(){
    let listings = await fetchListings();
    const tagsList = getPopularTags(listings);
    const tagsContainer = document.querySelector(".tags-container");
    console.log(tagsList);

    tagsList.forEach(function(tag){
        tagsContainer.innerHTML +=`
         <a href="/tags/index.html?tag=${tag[0]}"><button 
                class="px-4 py-2 m-2 bg-customOrange text-black rounded-lg shadow-md hover:bg-black hover:text-white transition-colors">
                ${tag[0]}
            </button></a>`;
    })
}