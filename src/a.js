

  function Random(range) {
  return Math.floor((Math.random() * range) + 1);
  }
  function RandomFloat(range) {
  return (Math.random() * range) + 1;
  }
  var viewport = new Viewport()
  var wave = new Wave();
  viewport.addObject(wave)
  for (var i = 0; i < 100; i++) {
  var particlegroup = new WaterParticle();
  viewport.addObject(particlegroup)
  }
  viewport.init();
  
  //viewport
  function Viewport() {
  var me = this;
  me.objects = [];
  var canvas = document.getElementById("drawing-surface");
  function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.onresize = function () {
  resizeCanvas();
  }
  var drawingSurface = document.getElementById("drawing-surface").getContext("2d");
  var image = new Image();
  image.src = "0.png";
  image.onload = function () {
  me.backgroundImage = image;
  me.doPaint = true;
  }
  me.doPaint = true;
  function drawBackgroundImage() {
  if (me.backgroundImage) {
  drawingSurface.drawImage(me.backgroundImage, 0, 0, canvas.width, canvas.height);
  }
  }
  function drawObjects() {
  for (var i = 0; i < me.objects.length; i++) {
  me.objects[i].paint(drawingSurface);
  }
  }
  me.paintInit = function () {
  me.doPaint = true;
  }
  function paint() {
  me.paintInit();
  if (me.doPaint) {
  drawBackgroundImage();
  drawObjects();
  me.doPaint = false;
  }
  }
  var timer;
  me.init = function () {
  timer = setInterval(function () { paint(); }, 1000 / 30);
  };
  me.repaint = function () {
  me.doPaint = true;
  };
  me.addObject = function (obj) {
  me.objects.push(obj);
  }
  }
  
  //water particle
  function WaterParticle() {
    var me = this;
    me.opacity = 5;
    me.color = "#00649f";
    me.reset = function () {
    me.wind = RandomFloat(200) - 50;
    me.speed = RandomFloat(5) + 2;
    me.radius = 100;
    me.colorfactor = 100;
    me.location = { x: window.innerWidth / 1.2, y: window.innerHeight / 1.2 - 20 };
    };
    me.reset();
    me.move = function () {
    if (me.location.x > window.innerWidth || me.location.x < 0 || me.location.y > window.innerHeight) {
    me.reset();
    }
    me.colorfactor += 255 / ((300 * 2) / me.speed);
    if (me.colorfactor > 254) {
    me.colorfactor = 100;
    }
    me.location.x += me.wind;
    me.location.y += me.speed;
    };
    me.paint = function (context) {
    me.move();
    context.beginPath();
    context.arc(me.location.x, me.location.y, me.radius, 0, 2 * Math.PI, false);
    context.fillStyle = me.color;
    context.globalAlpha = me.opacity / 255;
    context.fill();
    context.closePath();
    };
    }
  
  
    //wave
    function Wave() {
    var me = this;
    me.particles = [];
    me.reset = function () {
    me.particles.splice(0, me.particles.length)
    for (var i = 0; i < 500; i++) {
    var p = new WaveParticle();
    me.particles.push(p);
    }
  
    };
    me.reset();
    me.move = function () {
  
    };
    me.paint = function (context) {
    for (var i = 0; i < me.particles.length; i++) {
    me.particles[i].paint(context);
    }
    };
    }
  
    //wasteparticle
    function WaveParticle(source) {
    var me = this;
    me.color = "#0077be";
    me.reset = function () {
    me.opacity = 30;
    me.wind = RandomFloat(30) - 15;
    me.speed = RandomFloat(1);
    me.size = { width: RandomFloat(200) + 1, height: RandomFloat(3) + 5 };
    me.location = { x: window.innerWidth / 1.5, y: window.innerHeight / 1.5 - 100 };
    };
    me.reset();
    me.move = function () {
    if (me.location.y > window.innerWidth || me.location.x < 0 || me.location.x > window.innerWidth) {
    me.reset();
    }
    me.location.x += me.wind;
    me.location.y += me.speed;
    };
    me.paint = function (context) {
    me.move();
    context.globalAlpha = me.opacity / 200;
    context.fillStyle = me.color;
    context.fillRect(me.location.x, me.location.y, me.size.width, me.size.height);
    };
    }      
  
  