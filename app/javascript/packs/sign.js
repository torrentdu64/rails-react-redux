



const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container-sign');


signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});


const signUpFlipButton = document.getElementById('signUpFlip');
const signInFlipButton = document.getElementById('signInFlip');
const card = document.getElementById('cardFlip');


signUpFlipButton.addEventListener('click', () => {
  card.classList.add("active-flip");
});

signInFlipButton.addEventListener('click', () => {
  card.classList.remove("active-flip");
});
