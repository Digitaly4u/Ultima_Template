$('.text').html(function(i, html) {
  var chars = $.trim(html).split("");

  return '<span>' + chars.join('</span><span>') + '</span>';
});

/* the auto writing script */ 
var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 1000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};


/* svg */ 


var select = function(s) {
  return document.querySelector(s);
},
selectAll = function(s) {
  return document.querySelectorAll(s);
},
  colorArray = ["#146b3a", "#FF5964", "#000000", "#35A7FF", '#32CD32','#990066' ],
  offset = 0.165,
  workCount = 0


TweenMax.set('svg', {
visibility: 'visible'
})

var bezier = MorphSVGPlugin.pathDataToBezier('.myPath', {
offsetX: -0,
offsetY: -0
})

TweenMax.set('text', {
transformOrigin: '50% 100%'
})

TweenMax.set('.hard text', {
fill: function (i) {
return colorArray[i]
}
})
TweenMax.set('.work text', {
fill: function (i) {
return colorArray[i]
}
})

var workTl = new TimelineMax();
workTl.staggerTo('.work text', 2, {
  bezier: {
    type: "cubic",
    values: bezier,
    autoRotate: true
  },
repeat: -1,
  ease: Linear.easeNone
}, offset)

var hardTl = new TimelineMax();
hardTl.staggerTo('.hard text', 2, {
  bezier: {
    type: "cubic",
    values: bezier,
    autoRotate: true
  },
repeat: -1,
  ease: Linear.easeNone
}, offset)


var mainTl = new TimelineMax({paused: true});
mainTl.add(workTl, 0)
.add(hardTl, 1)

var seqTl = new TimelineMax({repeat: -1});
seqTl.fromTo(mainTl, 2, {
time: 2.52
}, {
time: 3.52,
ease: Expo.easeInOut
})
.fromTo(mainTl, 2, {
time: 3.52
}, {
time: 4.52,
immediateRender: false,
ease: Expo.easeInOut
})

//ScrubGSAPTimeline(seqTl);

//TweenMax.globalTimeScale(0.25)

//image thing

var picPaths = ['Assets/Images/anniversary-beautiful-bloom-1447367.jpg',
                'Assets/Images/anniversary-beautiful-blooming-1233442.jpg',
                'Assets/Images/anniversary-bloom-blooming-196664.jpg',
                'Assets/Images/arranged-flowers-love-54320.jpg',
                'Assets/Images/colorful-colourful-hardwood-139324.jpg',
                'Assets/Images/large.jpg',
                'Assets/Images/original.gif',
                'Assets/Images/sunflowers-wallpapers.jpg'] ;
var curPic = -1;
//preload the images for smooth animation
var imgO = new Array();
for(i=0; i < picPaths.length; i++) {
    imgO[i] = new Image();
    imgO[i].src = picPaths[i];
}

function swapImage() {
    curPic = (++curPic > picPaths.length-1)? 0 : curPic;
    imgCont.src = imgO[curPic].src;
    setTimeout(swapImage,2000);
}

window.onload=function() {
    imgCont = document.getElementById('imgBanner');
    swapImage();
}