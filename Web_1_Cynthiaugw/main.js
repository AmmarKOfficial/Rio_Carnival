const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

function firstPageAnim(){
    var t1 = gsap.timeline();

    t1.from("#nav", {
        y: '-10',
        opacity:0,
        duration:1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem", {
        y: 0,
        duration:2,
        ease: Expo.easeInOut,
        delay:-1,
        stagger: .2
    })
    .from("#herofooter", {
        y: '-10',
        opacity:0,
        duration:1.5,
        delay:-1,
        ease: Expo.easeInOut
    })

}

var timeout;

function cirlceSkew(){
    var xskew =1
    var yskew =1

    var xskew_p = 0
    var yskew_p = 0
    window.addEventListener("mousemove", function(dets){
        this.clearTimeout(timeout);

        var xdiff = dets.clientX - xskew_p
        var ydiff = dets.clientY - yskew_p

        xscale = gsap.utils.clamp(.8,1.2,xdiff)
        yscale = gsap.utils.clamp(.8,1.2,ydiff)

        xskew_p = dets.clientX;
        yskew_p = dets.clientY;

        circleMouseFollower(xscale,yscale)

        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`
        },100)
    });    
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
  }

circleMouseFollower();
firstPageAnim();
cirlceSkew();



document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power1,
      
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power1,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});


