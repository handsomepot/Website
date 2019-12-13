setInterval(createSnowFlake, 100);
function createSnowFlake() {
  var icon = document.createElement("i");
  document.body.appendChild(icon);
  icon.classList.add('far');
  icon.classList.add('fa-snowflake');
  icon.style.width = Math.random() * 10 + 10 + 'px';
  icon.style.left = Math.random() * window.innerWidth + 'px';
  icon.style.animationDuration = Math.random() * 3 + 2 + 's';
  icon.style.opacity = Math.random();

  
  setTimeout(() => {
		icon.remove();
	}, 5000);
}	
