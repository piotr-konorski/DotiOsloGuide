let slideIndex = null;

function openPhotoZoom(element, images) {
    var modalContent = document.getElementById('PhotoZoomContent');

    // show previous/next buttons?
    if (images.length > 1) {
        document.getElementById("previousButton").style.visibility = "visible";
        document.getElementById("nextButton").style.visibility = "visible";
    } else {
        document.getElementById("previousButton").style.visibility = "hidden";
        document.getElementById("nextButton").style.visibility = "hidden";
    }

    // set caption text
    document.getElementById('imgageCaption').innerText = element.alt

    for (i=0; i<images.length; i++) {
        var divSlide = document.createElement('div');
        divSlide.classList.add('slide');
        
        var imgElem = document.createElement('img');
        imgElem.src = images[i];
        imgElem.classList.add('image-slide');
        
        divSlide.appendChild(imgElem);
        modalContent.appendChild(divSlide);

        // imgElem.onclick = function() { closePhotoZoom(); };  // click on zoomed image to close it
    }

    document.getElementById('PhotoZoom').style.display = 'block';
    slideIndex = 1;
    setSlide(slideIndex);
};

function closePhotoZoom() {
    slideIndex = null;

    document.getElementById('PhotoZoom').style.display = 'none';

    var modalContent = document.getElementById('PhotoZoomContent');
    while (modalContent.firstChild) {
        modalContent.removeChild(modalContent.lastChild);
    }
};

function changeSlide(n) {
    if (slideIndex !== null)
        setSlide(slideIndex += n);
};


function setSlide(n) {
    if (slideIndex !== null) {
        const slides = document.getElementsByClassName('slide');

        if (n > slides.length) {
            slideIndex = 1;
        };

        if (n < 1) {
            slideIndex = slides.length;
        };

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        };

        slides[slideIndex - 1].style.display = 'block';
    }
};


$(document).keyup(function(e) {
    if (e.key === "Escape") {
       closePhotoZoom()
    } else if (e.key === "ArrowLeft") {
        changeSlide(-1);
    } else if (e.key === "ArrowRight") {
       changeSlide(1);
    }
});

$('*').click(function(e) {
    if(e.target.tagName == 'DIV') {
        closePhotoZoom()
    }
});

document.addEventListener('swiped-left', function(e) {
    // console.log(e.target); // element that was swiped
    // console.log(e.detail); // see event data below
    changeSlide(-1);
});

document.addEventListener('swiped-right', function(e) {
    // console.log(e.target); // element that was swiped
    // console.log(e.detail); // see event data below
    changeSlide(1);
});
