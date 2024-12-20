let xPos = 0;

// Array of images
const images = [
  'images/image2.jpeg',
  'images/image3.jpeg',
  'images/image1.jpg',
  'images/image4.jpeg',
  'images/image8.jpeg',
  'images/image5.jpeg',
  'images/image6.jpeg',
  'images/image12.jpg',
  'images/image7.jpeg',
  'images/image9.jpeg',
  'images/image11.jpeg',
  'images/image13.jpg',
  'images/image14.jpeg',
  'images/image17.jpg',
  'images/image18.jpeg',
];

const totalImages = images.length;
const angleStep = 360 / totalImages; // Dynamically calculate angle between images

// Dynamically generate images
const ring = document.querySelector('.ring');
images.forEach((imgSrc, i) => {
  const imgDiv = document.createElement('div');
  imgDiv.className = 'img';
  imgDiv.style.backgroundImage = `url(${imgSrc})`;
  imgDiv.dataset.index = i; // Add index for tracking
  ring.appendChild(imgDiv);
});

// GSAP timeline for carousel
gsap.timeline()
  .set('.ring', { rotationY: 0, cursor: 'grab' })
  .set('.img', {
    rotateY: (i) => i * -angleStep, // Use dynamic angle
    transformOrigin: '50% 50% 750px',
    z: -750,
    backgroundSize: 'cover',
    backfaceVisibility: 'hidden',
  })
  .from('.img', {
    duration: 1.5,
    y: 200,
    opacity: 0,
    stagger: 0.1,
    ease: 'expo',
  });

// Image hover opacity
$('.img').on('mouseenter', function () {
  if (!$(this).hasClass('hidden')) { // Ignore off-screen images
    gsap.to('.img', { opacity: 0.5 });
    gsap.to(this, { opacity: 1 });
  }
}).on('mouseleave', () => {
  gsap.to('.img', { opacity: 1 });
});

// Image click for full-screen view
$('.img').on('click', function () {
  if (!$(this).hasClass('hidden')) {
    const imgSrc = $(this).css('background-image').replace(/^url\(['"](.+)['"]\)$/, '$1');
    $('.full-image').attr('src', imgSrc);
    $('.overlay').removeClass('hidden');
  }
});

// Close button for full image
$('.close-btn').on('click', () => {
  $('.overlay').addClass('hidden');
});

// Drag functionality
$(window).on('mousedown touchstart', dragStart);
$(window).on('mouseup touchend', dragEnd);

function dragStart(e) {
  if (e.touches) e.clientX = e.touches[0].clientX;
  xPos = Math.round(e.clientX);
  gsap.set('.ring', { cursor: 'grabbing' });
  $(window).on('mousemove touchmove', drag);
}

function drag(e) {
  if (e.touches) e.clientX = e.touches[0].clientX;

  const delta = Math.round(e.clientX) - xPos;

  // Rotate the ring
  gsap.to('.ring', {
    rotationY: `-=${delta * 0.5}`,
    onUpdate: () => updateImageVisibility(),
  });

  xPos = Math.round(e.clientX);
}

function dragEnd() {
  $(window).off('mousemove touchmove', drag);
  gsap.set('.ring', { cursor: 'grab' });
}

// Hide images far off-screen
function updateImageVisibility() {
  const rotation = gsap.getProperty('.ring', 'rotationY') % 360;

  $('.img').each(function (i) {
    const currentAngle = (i * -angleStep + rotation + 360) % 360;
    const isHidden = currentAngle > 90 && currentAngle < 270;

    $(this).toggleClass('hidden', isHidden);
  });
}
