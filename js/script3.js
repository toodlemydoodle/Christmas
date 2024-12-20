// Select elements
const key = document.querySelector('.key');
const door = document.querySelector('.door');
const lock = document.querySelector('.lock');
const message = document.querySelector('.message');

// Animate the key to the lock and rotate it
gsap.to('.key', {
  x: '35vw',
  y: '-20vh',
  duration: 3,
  ease: 'power2.inOut',
  onComplete: turnKey,
});

function turnKey() {
  // Rotate the key in the lock
  gsap.to('.key', {
    rotation: 90,
    duration: 1,
    ease: 'power1.inOut',
    onComplete: unlockDoor,
  });
}

function unlockDoor() {
  // Open the door and reveal the message
  setTimeout(() => {
    door.classList.add('open');
    setTimeout(() => {
      message.classList.remove('hidden');
      message.style.display = 'block';
    }, 1000);
  }, 500);
}
