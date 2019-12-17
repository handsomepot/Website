//setInterval(createSnowFlake, 100);
//setInterval(createShootingStar, 100);
setInterval(moveCar, 10);


setInterval(showTime, 100);
function showTime(){
    var date = new Date();
    var year = date.getFullYear(); // 0 - 23
    var month = date.getMonth();
    var day = date.getDate();
    
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    var fullTime = year + " " + (month + 1) + " " + day;
   
    document.getElementById("banner-div").innerText = time;
    document.getElementById("banner-div").textContent = time;

    
    setTimeout(showTime, 1000);
    
}



//Day1
function createSnowFlake() {
  var icon = document.createElement("i");
  document.body.appendChild(icon);
  icon.classList.add('far');
  icon.classList.add('fa-snowflake');
  icon.style.width = Math.random() * 10 + 10 + 'px';
  icon.style.left = Math.random() * (window.innerWidth-10) + 'px';
  icon.style.top = Math.random() * (window.innerHeight-10) + 'px';
  icon.style.animationDuration = Math.random() * 3 + 2 + 's';
  icon.style.opacity = Math.random();

  
  setTimeout(() => {
		icon.remove();
	}, 5000);
}	



// Day 2
function createShootingStar() {
  var icon = document.createElement("i");
  document.body.appendChild(icon);
  icon.classList.add('fas');
  icon.classList.add('fa-circle');
  //icon.style.width = Math.random() * 10 + 10 + 'px';
  icon.style.left = Math.random() * (window.innerWidth-10) + 'px';
  icon.style.fontSize = '0.3em';
  icon.style.animationDuration = '1s';
  icon.style.opacity = Math.random();

  
  setTimeout(() => {
		icon.remove();
	}, 2000);
}	
var pos = 0;
var idx = 0;
function moveCar(){
    console.log(document.getElementById('moving-car').className);
    var icon = document.getElementById('car').style.paddingLeft = pos + 'px';

    if(pos <= window.innerWidth){
        pos += 4;
    }
    else{
        pos = 0;
        idx = (idx+1)%4;
        if(idx ==0){
            document.getElementById('moving-car').className = 'fas fa-car-side';
        }
        if(idx==1){
            document.getElementById('moving-car').className = 'fas fa-truck-pickup';
        } 
        if(idx==2){
            document.getElementById('moving-car').className = 'fas fa-truck-moving';
        }
        if(idx==3){
            document.getElementById('moving-car').className = 'fas fa-truck';
        } 

    }

 
}
