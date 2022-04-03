setTimeout(function () {
  var headerElements = document.getElementsByClassName('header-text');
  for (const headerElement of headerElements) {
    headerElement.classList.add('animation-finish')
  }
}, 1000);

document.addEventListener('scroll', handleScroll);

var decors = document.getElementsByClassName('decor');
var contents = document.getElementsByClassName('main-content');
var programSnippets = document.getElementsByClassName('program-snippet');

var arrows = [];
for (var i = 0; i < programSnippets.length; i++) {

  if (programSnippets[i].classList.contains('arrow')) {
    arrows.push(programSnippets[i]);
  }
}

for (var j = 0; j < arrows.length; j++) {
  if (j % 2 === 0) {
    arrows[j].style.transformOrigin = '0 0';
  } else {
    arrows[j].style.transformOrigin = '100% 0';
  }
}

function handleScroll() {
  var showPosition = window.innerHeight;

  for (var decor of decors) {
    var decorSize = decor.getBoundingClientRect();
    if ((decorSize.top + (decorSize.height / 2)) <= showPosition) {
      decor.classList.add('animation-finish');
    }
  }

  for (var content of contents) {
    var contentSize = content.getBoundingClientRect();
    if (contentSize.top <= showPosition / 1.1) {
      content.classList.add('animation-finish');
    }
  }

  if (programSnippets[0].getBoundingClientRect().top <= showPosition / 1.3) {
    for (var k = 0; k < programSnippets.length; k++) {
      if (programSnippets[k].getBoundingClientRect().top <= showPosition / 1.1) {
        programSnippets[k].classList.add('animation-finish');
      }
    }
  }
}