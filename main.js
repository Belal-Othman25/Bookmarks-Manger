const bookmarkContainer = document.querySelector(".bookmarks")
const bookmarkSuggestions = document.querySelector(".category-suggestion div")
const categoryButton = document.querySelector(".category-buttons div");
const allButton = document.querySelector(".all")  
localStorage.removeItem("active-bookmarks")
allButton.addEventListener("click",()=>{
  displayBookmarks()
  //Method One
  const categoryButtons = document.querySelectorAll(".category-buttons div span");
  categoryButtons.forEach((button) => button.classList.remove("active"));
localStorage.removeItem("active-bookmarks")

  //Method Two
  // location.reload();
})
function saveBookmark(){
  const title = document.querySelector(".title").value
  const url = document.querySelector(".url").value
  const catagory = document.querySelector(".category").value
  if(!title||!url||!catagory){
alert("Please Fill full fields")
  }
  const allbokkmark = JSON.parse(localStorage.getItem("bookmark"))||{};
  if(!allbokkmark[catagory]) allbokkmark[catagory] =[] ;
  allbokkmark[catagory].push({title,url}) //
  localStorage.setItem("bookmark",JSON.stringify(allbokkmark))
  //Empty the input field
  document.querySelectorAll("input").forEach((input)=>input.value='')
//Update the bookmark
displayBookmarks()
//show the category
displayCategorySuggetion()
//show the category button
displayButton()

}
function displayBookmarks(){
  bookmarkContainer.innerHTML="";
  const allbokkmark = JSON.parse(localStorage.getItem("bookmark"))||{};
 for (const catagory in allbokkmark) {
  const categories = allbokkmark[catagory];
  categories.forEach((category ,index)=>{
    const categoryElement = document.createElement("div") ;
    categoryElement.className = "bookmark"
    categoryElement.innerHTML=`
    <div class="cat">${catagory}</div>
    <div class="link"><a href="${category.url}" target="_blank">${category.title}</a></div>
    <button  class="delete" onclick="deleteBookmark('${catagory}' , ${index})">Delete</button>
    `
    bookmarkContainer.appendChild(categoryElement)
  })
 }
}
function filterBookmarksByCategory(catagory){
  const allbokkmark = JSON.parse(localStorage.getItem("bookmark"))||{};
  const categories = allbokkmark[catagory];
  bookmarkContainer.innerHTML="";
  categories.forEach((category ,index)=>{
    const categoryElement = document.createElement("div") ;
    categoryElement.className = "bookmark"
    categoryElement.innerHTML=`
    <span class="number">${index +1}</span>
    <div class="link"><a href="${category.url}" target="_blank">${category.title}</a></div>
    <button  class="delete" onclick="deleteBookmark('${catagory}' , ${index})">Delete</button>
    `
    bookmarkContainer.appendChild(categoryElement)
  })
}
function displayCategorySuggetion(){
  const allbokkmark = JSON.parse(localStorage.getItem("bookmark"))||{};
  const categories = Object.keys(allbokkmark);
  bookmarkSuggestions.innerHTML="";
  categories.forEach((category)=>{
    const categoryElement = document.createElement("span");
    categoryElement.textContent = category;
    categoryElement.addEventListener("click",function(){
      document.querySelector(".category").value = category;
    })
    bookmarkSuggestions.appendChild(categoryElement);
  })
}
function displayButton(){
  const allbokkmark = JSON.parse(localStorage.getItem("bookmark"))||{};
  const categories = Object.keys(allbokkmark);
  categoryButton.innerHTML="";
  categories.forEach((category)=>{
    const categoryElement = document.createElement("span");
    categoryElement.textContent = category;
    categoryElement.addEventListener("click", function () {
      filterBookmarksByCategory(category)
      localStorage.setItem("active-bookmarks",category)
      // Remove Active Class From All Buttons
      const categoryButtons = document.querySelectorAll(".category-buttons div span");
      categoryButtons.forEach((button) => button.classList.remove("active"));
      // Add Active Class To The Clicked Button
      this.classList.add("active");
    });
  const activebookmark = localStorage.getItem("active-bookmarks")
  if(activebookmark===category) categoryElement.classList.add("active");
    categoryButton.appendChild(categoryElement);
  })
}

function deleteBookmark(catagory, index){
  const allBookmarks = JSON.parse(localStorage.getItem("bookmark")) || {};
    allBookmarks[catagory].splice(index, 1);
    //check if bookmark already exists in local storage

    if(allBookmarks[catagory].length===0)delete allBookmarks[catagory];

    localStorage.setItem("bookmark", JSON.stringify(allBookmarks));
    if(allBookmarks[catagory] &&localStorage.getItem("active-bookmarks")){
      filterBookmarksByCategory(catagory) 
    }else{
      displayBookmarks()

    }
    displayCategorySuggetion();
    displayButton() 
}
// function searchBookmarks() {
//   const searchTerm = document.querySelector(".search").value.toLowerCase();
//   const allBookmarks = JSON.parse(localStorage.getItem("bookmark")) || {};
//   bookmarkContainer.innerHTML = "";

//   for (const category in allBookmarks) {
//     const bookmarks = allBookmarks[category];
//     bookmarks.forEach((bookmark, index) => {
//       // تصفية البوك ماركس بناءً على العنوان أو الرابط
//       if (bookmark.title.toLowerCase().includes(searchTerm) || bookmark.url.toLowerCase().includes(searchTerm)) {
//         const bookmarkElement = document.createElement("div");
//         bookmarkElement.className = "bookmark";
//         bookmarkElement.innerHTML = `
//           <div class="cat">${category}</div>
//           <div class="link"><a href="${bookmark.url}" target="_blank">${bookmark.title}</a></div>
//           <button class="delete" onclick="deleteBookmark('${category}', ${index})">Delete</button>
//         `;
//         bookmarkContainer.appendChild(bookmarkElement);
//       }
//     });
//   }
// }
// searchBookmarks()
//show bookmark
displayBookmarks()
//show the category Suggestions
displayCategorySuggetion()
//show the categories Button
displayButton()