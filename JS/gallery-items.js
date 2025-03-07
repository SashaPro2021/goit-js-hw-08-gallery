
  const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

/*  шаблон: 
<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>*/

const galleryList = document.querySelector('.gallery');
const modal = document.querySelector(".lightbox.js-lightbox");
const imgIntoModal = modal.querySelector('.lightbox__image');
// const imageCards = createImageCards(images)
// galleryList.insertAdjacentHTML('beforeend', imageCards.join(''));

// function createImageCards(images) {
//   return images.map(({preview,original,description}) => { return ` <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="${original}"
//   >
//     <img
//       class="gallery__image"
//       src="${preview}"
//       data-source="${original}"
//       alt="${description}"
//     />
//   </a>
// </li> `})
// }



images.forEach((image, index) => {
  galleryList.insertAdjacentHTML('beforeend', `<li class = 'gallery__item'> <a class="gallery__link" href = "${image.original}"> <img class = "gallery__image" src = ${image.preview} data-source = ${image.original} data-index = ${index} alt = ${image.description} /> </a> </li>`);
});


galleryList.querySelectorAll(".gallery__item").forEach(item => item.addEventListener('click', onOpenModal));


let currentImgIndex = null;
function onOpenModal(event) {
  event.preventDefault();
  modal.classList.add('is-open');

  /**
   1. найти img внутри модалки 
   2. считать значение атрибута data-source изображ по кот мы кликнули
   3. заменить значение атрибута src img внутри модалки 
   */
  currentImgIndex = +event.target.dataset.index;
  
  const imgOriginal = event.target.dataset.source;

  imgIntoModal.src = imgOriginal;

  document.addEventListener('keydown', onPressKey)
  
}

   function onPressKey(event) {

     //Закрытие модального окна по нажатию клавиши ESC
     
    if (event.code === 'Escape') {
      onCloseModal();
    }
   
     //Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо"
     if (event.code === 'ArrowLeft') {

       if (currentImgIndex === 0) {
         currentImgIndex = images.length - 1; //считай с 0 эл-та
       } else {
         currentImgIndex = currentImgIndex - 1; 
          
       }imgIntoModal.src = images[currentImgIndex].original;
      
     }

     if (event.code === 'ArrowRight') {
       if ((currentImgIndex + 1) > images.length - 1) { //прим 4 картинка > 4

         currentImgIndex = 0;
       } else {
         currentImgIndex = currentImgIndex + 1;
       }
       imgIntoModal.src = images[currentImgIndex].original;
     
     }

 } 
    
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
/*
1. найти button 
2. повешать слушатель на кнопку 
3. создать функцию закрытия кнопки по клику
*/

const buttonCloseModal = modal.querySelector('[data-action="close-lightbox"]');

buttonCloseModal.addEventListener('click', onCloseModal);

function onCloseModal() {
  modal.classList.remove('is-open');
  document.removeEventListener('keydown', onPressKey);
  // Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
  imgIntoModal.src = '';
}


//Закрытие модального окна по клику на div.lightbox__overlay

const divOverlay = modal.querySelector('.lightbox__overlay');
divOverlay.addEventListener('click', onCloseModal);


