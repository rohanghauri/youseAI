
const api_url = "https://jsonplaceholder.typicode.com/users";
let Fetcheddata = "";
async function getdata(url) {
    
    // Storing response
    const response = await fetch(url);
   
    // Storing data in JSON
    var data = await response.json();
    
    if (response) 
    {   
        console.log("success");
        //hideloader();
        Fetcheddata =  data;
    }
    RenderData(data);
    
}

getdata(api_url);


function hideloader(){
    document.getElementById("loader").style.visibility = "hidden";
    document.querySelector(".containerBlur").style.filter = "none";
}

//ID,Name,Username,Email,City, and Company
function RenderData(data){
    let dataString = '';
    dataString += `<tr>
        <th>#</th>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>City</th>
        <th>Company</th>
        </tr>`   
    for(let i = 0; i < data.length; i++ ){
        const singleElement = 
            `<tr>
            <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].username}</td>
            <td>${data[i].email}</td>
            <td>${data[i].address.city}</td>
            <td>${data[i].company.name}</td>
            </tr>`;
        //console.log(data[i].id, data[i].name,data[i].username,data[i].email,data[i].address.city,data[i].company.name);
        dataString += singleElement; 
    }
    
    document.querySelector(".mainTable").innerHTML = dataString;
    document.querySelector(".usersNumber").innerHTML = `User Count: ${data.length}`;
    setTimeout(hideloader,2000);
}

function searchResults(){
    let searchQuery = document.querySelector('.searchValue').value.toLowerCase();
    let data = Fetcheddata;
    let dataString = '';
    dataString += `<tr>
        <th>#</th>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>City</th>
        <th>Company</th>
        </tr>`;

    for(let i = 0; i < data.length; i++ ){
        let eachString = data[i].id + data[i].name + data[i].username+ data[i].email + data[i].address.city + data[i].company.name;
        eachString = eachString.toLowerCase();
        if(eachString.includes(searchQuery)){
            const singleElement = 
            `<tr>
            <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].username}</td>
            <td>${data[i].email}</td>
            <td>${data[i].address.city}</td>
            <td>${data[i].company.name}</td>
            </tr>`;
            dataString += singleElement;
        }
        
    }
    document.querySelector(".mainTable").innerHTML = dataString;
}


function sortbyName(){
    let sortedArray = [];
    let data = Fetcheddata;
    let originalLength = Fetcheddata.length
    console.log(typeof data);
    for(let i = 0; i < originalLength; i++ ){
        console.log(data.length);
        let min = 99999;
        let smallestIndex = 0;
        for(let x = 0; x < data.length; x++){
            if(data[x].name.charCodeAt(0) < min){
                min = data[x].name.charCodeAt(0);
                smallestIndex = x;
            } 
        }
        sortedArray.push(data[smallestIndex]);
        data = slice(smallestIndex,data);
        console.log(data) 
    }
    RenderData(sortedArray);   
}

function sortbyID(){
    let data = Fetcheddata;
    RenderData(data)
}

function sortbyCity(){
    let sortedArray = [];
    let data = Fetcheddata;
    let originalLength = Fetcheddata.length
    console.log(typeof data);
    for(let i = 0; i < originalLength; i++ ){
        console.log(data.length);
        let min = 99999;
        let smallestIndex = 0;
        for(let x = 0; x < data.length; x++){
            if(data[x].address.city.charCodeAt(0) < min){
                min = data[x].address.city.charCodeAt(0);
                smallestIndex = x;
            } 
        }
        sortedArray.push(data[smallestIndex]);
        data = slice(smallestIndex,data);
        console.log(data) 
    }
    RenderData(sortedArray);
}

// Helper Function
function slice(smallestIndex,data){
    let newarray = [];
    for(let i = 0; i < data.length;i++){
        if(i != smallestIndex){
            newarray.push(data[i]);
        }
 }   
    return newarray;
}