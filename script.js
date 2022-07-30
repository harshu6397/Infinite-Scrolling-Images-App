const imageContainer = document.querySelector('.image-container');
const photosArray = [];
let totalImages = 0;
let loadedImages = 0;

// Flag to check if the images are loaded or not
let ready = false; 

// Image loaded function to increment the loaded images counter and check if all the images are loaded or not to display the loading screen 
function imageLoaded(){
    loadedImages++;
    if(loadedImages === totalImages){
        ready = true; // Set the ready flag to true
        document.getElementById('spinner').hidden = true;
    }   
}

// Unsplash API ==> Fetch the data from the API
const apiKey = 'h6ca_fhaTFGQIu3ebJfUrFHqzgqwuRbNrEh8OCACoXQ';
const count = 5;
const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from the API
async function getPhotos() {
    try{
        const response = await fetch(url);
        const photosArray = await response.json();
        displayPhotos(photosArray);
    }
    catch(error){
        console.log(error);
    }
}

// Set attributes to an element
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// function to display the photos
function displayPhotos(photos) {
    loadedImages = 0;
    totalImages = photos.length;

    // Iterate through the photos array
    photos.forEach(photo => {
        // Create a new anchor element
        const a = document.createElement('a');
        setAttributes(a, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create a new image element
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: !photo.alt_description?"This is an amazing photograph from Unsplash":photo.alt_description,
        });

        // Event Listener for the image to load the image when it is loaded
        img.addEventListener('load', imageLoaded);

        // Put the image inside the anchor 
        a.appendChild(img);
        // Put the anchor inside the image container
        imageContainer.appendChild(a);
    });
}

// Check to see if the scroll has reached the bottom of the page, and if so, get more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1500 && ready) {
        ready = false;
        getPhotos(); // Get more photos
    }
})

// Onload, get the photos
getPhotos();