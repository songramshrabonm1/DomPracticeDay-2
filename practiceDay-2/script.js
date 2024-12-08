const SearchApi = async(url) =>{
    const Response = await fetch(url);
    const data = await Response.json();
    if(data.meals && data.meals.length > 0)
    loadedApi(data.meals);
    else 
    NotFoundResult();
}
function NotFoundResult(){
    const Row = document.getElementById('foodRow');
    Row.innerHTML= "";
    Row.innerText = "Not Found Result....";
}
function loadedApi(data){
    const Row = document.getElementById('foodRow');
    Row.innerHTML= "";
    data.slice(0,30).forEach(meal => {
        console.log(meal);
        const colDiv = document.createElement('div');
        colDiv.classList=`col-lg-3 col-md-4 col-sm-12 col-12 my-4`;
        colDiv.innerHTML=`
            <div class="card rounded-3xl" style="width: 100%; box-shadow: 5px 2px 20px black" onclick="Added(${meal.idMeal})">
             <img src="${meal.strMealThumb}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <p class="card-text text-center" style="color : red ">${meal.strMeal}</p>
            </div>
            </div>
        `

        Row.appendChild(colDiv);
    });
}
SearchApi('https://www.themealdb.com/api/json/v1/1/search.php?f=c');
function searches(){
    const text = document.getElementById('textField').value;
    // console.log('Text: ',text);
    SearchApi(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);

}
async function Added(id){
    console.log('id: ',id);
    const FoodDetails = document.getElementById('FoodDetails');
    FoodDetails.innerHTML="";

    const Url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(Url);
    const Data = await response.json();
    console.log(Data.meals[0]);
    console.log(Url);

    const Div = document.createElement('div');
    Div.innerHTML=`
        <div class="card" style="width: 18rem;">
            <img src="${Data.meals[0].strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${Data.meals[0].strMeal}</h5>
                <p><b>Ingredients: </b> </p>
                <ol>
                    <li>${Data.meals[0].strIngredient1}</li>
                    <li>${Data.meals[0].strIngredient2}</li>
                    <li>${Data.meals[0].strIngredient3}</li>
                    <li>${Data.meals[0].strIngredient4}</li>
                    <li>${Data.meals[0].strIngredient5}</li>
                    <li>${Data.meals[0].strIngredient6}</li>
                </ol>
            </div>
            </div>
    `;
    FoodDetails.appendChild(Div);
}