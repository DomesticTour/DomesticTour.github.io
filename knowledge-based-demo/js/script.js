const exBtn1 = document.querySelector(".btn1");
const exBtn2 = document.querySelector(".btn2");
const loadingSection = document.querySelector(".loading");
const dataSection = document.querySelector(".data");
const resultHeader = document.querySelector(".result-header");
const attractionsContainer = document.querySelector(".attractions-container");
const input1 = {
    "input": {
        "cityId": "6579b390ad72c1320f807b26",
        "categories": ["beach", "entertainment", "museum"],
        "from": "2023-7-10",
        "to": "2023-7-20",
        "preventedAges": "n",
        "categoryCounter": {
            "entertainment": 1, "sightseeing": 3,
            "remedy": 2, "history": 1, "adventure": 2, "streets": 1,
            "desert": 1, "garden": 2, "beach": 3, "museum": 1,
            "monument": 1, "religious": 0, "mountain": 2
        }
    }
}
const input2 = {
    "input": {
        "cityId": "6579b3e4fcdd6a56c1487809",
        "categories": ["sightseeing", "museum"],
        "from": "2023-7-10",
        "to": "2023-7-20",
        "preventedAges": "n",
        "categoryCounter": {
            "entertainment": 1, "sightseeing": 3,
            "remedy": 2, "history": 1, "adventure": 2, "streets": 1,
            "desert": 1, "garden": 2, "beach": 1, "museum": 1,
            "monument": 1, "religious": 0, "mountain": 2
        }
    }
}


async function fetchData(exampleNumber) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: Add smooth scrolling animation
    });

    // console.log("Example number = ", exampleNumber);
    loadingSection.classList.replace("d-none", "d-flex");
    dataSection.classList.replace("d-block", "d-none");
    exBtn1.disabled = true;
    exBtn2.disabled = true;
    
    let response = await fetch("https://be-sooty.vercel.app/api/v0.0/plan/getRankedPlaces", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(exampleNumber == 1 ? input1 : input2), // Convert the object to JSON string
    });
    
    // Parse the response
    let responseData = await response.json();

    resultHeader.innerHTML = `Example-${exampleNumber} Results`;
    
    let cartona = '';
    let attractions = responseData.scoredAttractions;
    for (let i = 0; i < attractions.length; i++) {
        const attraction = attractions[i];
        cartona += `<div class="attraction mb-2">
        <div class="row">
        <div class="col-3 d-flex flex-column justify-content-center">
        <img src="${attraction.images[0]}" alt="" class="w-100">
        </div>
        <div class="col-9 d-flex flex-column justify-content-center">
        <p class="mb-2"><span class="me-2 mb-1 text-bold">Attraction name:</span>${attraction.nameEn}</p>
        <p class="mb-2"><span class="me-2 mb-1 text-bold">City name:</span>${attraction.city.nameEn}</p>
        <p class="mb-0"><span class="me-2 mb-0 text-bold">Score:</span>${attraction.score.toFixed(4)}</p>
        </div>
        </div>
        </div>`
    }
    
    attractionsContainer.innerHTML = cartona;
    


    
    
    loadingSection.classList.replace("d-flex", "d-none");
    dataSection.classList.replace("d-none", "d-block");
    exBtn1.disabled = false;
    exBtn2.disabled = false;
    // console.log(responseData);
}

exBtn1.addEventListener("click", () => {
    fetchData(1);
})

exBtn2.addEventListener("click", () => {
    fetchData(2);
})
