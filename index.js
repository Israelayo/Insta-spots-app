const editProfileBtn = document.querySelector(".edit")
const editModal = document.querySelector('.edit-modal')
const closeBtn = document.querySelector('.close-btn')

editProfileBtn.addEventListener ('click', () => {
    editModal.classList.remove('hidden');
    nameInput.focus();
});

closeBtn.addEventListener('click', () =>{
    editModal.classList.add('hidden');
});

const editForm = document.getElementById('editProfileForm')
const nameInput = document.getElementById('nameInput')
const jobInput = document.getElementById('jobInput')
const profileImageInput = document.getElementById('profileImageInput')

const profileName = document.querySelector('.hero-text h1')
const profileJob = document.querySelector('.hero-text p')
const profileImage = document.querySelector('.hero-img img')

editForm.addEventListener ('submit', (e) => {
    e.preventDefault();
    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    if (profileImageInput.files[0]) {
        const file = profileImageInput.files[0]; 
        const reader = new FileReader(); //calling a scanner to read the file

        reader.onload = function () { //instructions to carry out once the scanner scans the file
            const base64Image = reader.result; //turns the file into strings
            profileImage.src = base64Image;
            localStorage.setItem('profileImage', base64Image); //

        };
        reader.readAsDataURL(file) //gives the scanner the file to read
       
        
    }

    localStorage.setItem('profileName', nameInput.value);
    localStorage.setItem('profileJob', jobInput.value);
   


    editModal.classList.add('hidden');

})



const savedName = localStorage.getItem('profileName');
const savedJob = localStorage.getItem('profileJob');
const savedImage = localStorage.getItem('profileImage');

if (savedName) profileName.textContent = savedName
if (savedJob) profileJob.textContent = savedJob
if (savedImage) profileImage.src = savedImage




const savedCards = localStorage.getItem('card');
let cardData = savedCards ? JSON.parse(savedCards) : [
    {
        title: "Val Thorens",
        image: "assets/pexels-kassandre-pedro-8639743 1.png",
        liked: false
    },
    {
        title: "Restaurant terrace",
        image: "assets/pexels-kassandre-pedro-8639743 2.png",
        liked: false
    },
    {
        title: "An outdoor cafe",
        image: "assets/pexels-kassandre-pedro-8639743 3.png",
        liked: false
    },
    {
        title: "A very long bridge, over the forest...",
        image: "assets/pexels-kassandre-pedro-8639743 4.png",
        liked: false
    },
    {
        title: "Tunnel with morning light",
        image: "assets/pexels-kassandre-pedro-8639743 5.png",
        liked: false
    },
    {
        title: "Mountain house",
        image: "assets/pexels-kassandre-pedro-8639743 6.png",
        liked: false
    },
];

const cardSection = document.querySelector('.card-section');

// Image Preview Modal Elements
const previewModal = document.querySelector('.preview-modal');
const previewImage = document.getElementById('previewImage');
const previewTitle = document.getElementById('previewTitle');
const closePreviewBtn = document.querySelector('.close-preview');

function renderCards() {
    cardSection.innerHTML = '';
    cardData.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        cardDiv.innerHTML = `
        <div class= "image-container">
         <img src= "${card.image}" alt= "${card.title}" data-index="${index}" />
         </div>
         <div class= "card_text">
         <p>${card.title}</p>
         <i class="${card.liked ? 'fa-solid' : 'fa-regular'} fa-heart" 
         style ="color: ${card.liked ? "red" : ""}"
         data-index="${index}"></i>
         </div>
        `;
        cardSection.appendChild(cardDiv);
    });

const heartIcon = document.querySelectorAll('.fa-heart');

heartIcon.forEach((icon) => {
    icon.addEventListener('click', () => {
        const index = icon.getAttribute("data-index");
        cardData[index].liked = !cardData[index].liked;
        renderCards();
        
        localStorage.setItem('card', JSON.stringify(cardData)) //key first parameter and value second parameter
    });
});

  // Image Preview Logic
    const images = document.querySelectorAll('.image-container img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            const index = img.getAttribute("data-index");
            previewImage.src = cardData[index].image;
            previewTitle.textContent = cardData[index].title;
            previewModal.classList.remove('hidden');
        });
    });
}
renderCards();

// Close preview
closePreviewBtn.addEventListener('click', () => {
  previewModal.classList.add('hidden');
});


const newPostBtn = document.querySelector('.new-post-btn')
const newPostCloseBtn = document.querySelector('.new-post-close')
const newPostModal = document.querySelector('.new-post-modal')

newPostBtn.addEventListener ('click', () => {
    newPostModal.classList.remove('hidden')
    titleInput.focus();
})

newPostCloseBtn.addEventListener('click', () => {
    newPostModal.classList.add('hidden')
})



const newPostForm = document.getElementById("newPostForm")
const titleInput = document.getElementById("postTitle")
const postImageInput = document.getElementById("postImage")

newPostForm.addEventListener('submit', (e) => {
    e.preventDefault(); //to prevent page from reloading

    const imageFile = postImageInput.files[0] //to grab our users uploaded image

    if (!imageFile) return //incase no image was uploaded

    const reader = new FileReader() //create file reader to convert users post image to base 64

    reader.onload = function(){ // function on instructions to carry out after loading and conversion
        const base64PostImage = reader.result //base64 string of the image saved in a variable

        const newCard = { //new card created with our user input details
            title: titleInput.value,
            image: base64PostImage,
            liked: false
        }

        cardData.unshift(newCard) //new card added to our users post
        localStorage.setItem('card', JSON.stringify(cardData))

        renderCards()

        newPostModal.classList.add('hidden');
        newPostForm.reset()
    }
    reader.readAsDataURL(imageFile)//the conversion of the image before the function above is carried out
})


// const deleteBtns = document.querySelectorAll('.delete-btn')

// deleteBtns.forEach((btn) => {
//     btn.addEventListener('click', () => {
//         const index = btn.getAttribute('data-index')
//         cardData.splice(index, 1)
//         localStorage.setItem('card', JSON.stringify(cardData))
//         renderCards();
//     })
// })


document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        editModal.classList.add ('hidden')
        newPostModal.classList.add('hidden')
        previewModal.classList.add('hidden')
    }
})

editModal.addEventListener('click', (e) => {
    if (e.target === editModal){
        editModal.classList.add('hidden')
    }
})

newPostModal.addEventListener('click', (e) => {
    if (e.target === newPostModal){
        newPostModal.classList.add('hidden')
    }
})

previewModal.addEventListener('click', (e) => {
    if (e.target === previewModal){
        previewModal.classList.add('hidden')
    }
})