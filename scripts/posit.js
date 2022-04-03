var group1 = document.getElementsByClassName('group-1')[0];

function calcObjSize() {
  group1.style.top = -(28 * group1.clientHeight / 100) + 'px';
}

window.addEventListener('resize', calcObjSize)

calcObjSize();