import { galleryItems } from './gallery-items.js';


console.log(galleryItems);

//Cree una galería con la capacidad de hacer clic en sus elementos y ver 
//imágenes a tamaño completo en una ventana modal

//Selector del contenedor de la galeria
const containerGallery = document.querySelector(".gallery");

//Creación del marcado de la galeria
const galleryMarkup = galleryItems
  .map(
    (item) =>
      `<div class="gallery__item">
    <a class="gallery__link" href="${item.original}">
      <img
        class="gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        alt="${item.description}"
      />
    </a>
  </div>`
  ).join("");

//Insertado y ordenado las imagenes y obteniendo la URL de la imgen grande
containerGallery.insertAdjacentHTML("afterbegin", galleryMarkup);

//Abrir la ventana modal haciendo click en alguna de las imagenes
//
containerGallery.addEventListener("click", selectOriginalImage);



function selectOriginalImage(event) {
  //Quita comportamiento por defeto de redirigir a otra pagina
  //al hacer click en la imagen
  event.preventDefault();
  if(event.target.nodeName !== "IMG"){
    return;
  }

  //Creacion del efecto con la libreria basicLightbox
  const instance = basicLightbox.create(`<img src="${event.target.dataset.source}">`);
  instance.show();

  //Cierre de la ventana con la tecla ESC
  containerGallery.addEventListener("keydown", (event) => {
    if(event.code === "Escape"){
        instance.close();
    }
  });
}