// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then(res => {
      if (!res.ok) throw new Error("Failed to load customize.json");
      return res.json();
    })
    .then(data => {
      const dataArr = Object.keys(data);
      dataArr.forEach(customData => {
        const el = document.querySelector(`[data-node-name*="${customData}"]`);

        if (data[customData] !== "" && el) {
          if (customData === "imagePath") {
            el.setAttribute("src", data[customData]);
          } else {
            el.innerText = data[customData];
          }
        }
      });

      // 🔥 Only call animation once, after loop is done
      animationTimeline();
    })
    .catch(err => {
      console.error("Error loading or parsing customize.json:", err);
      // Fallback: run animation anyway
      animationTimeline();
    });
};



function triggerCandleScene() {
  const darkOverlay = document.getElementById("dark-overlay");
  const cakeScene = document.getElementById("cake-scene");
  const visibilityCircle = document.getElementById("visibility-circle");
  const audio = document.getElementById("birthday-audio");

  // Step 1: Fade to black
  darkOverlay.style.opacity = "1";

  // Step 2: Wait and reveal cake
  setTimeout(() => {
    cakeScene.style.visibility = "visible";

    // Show candle & scale up
    const candle = document.getElementById('candle-wrapper');
    candle.style.visibility = 'visible';
    candle.style.transform = 'scale(1) translateY(-70%)';

    // Play birthday music
    audio.play();

    // Expand the visibility circle
    startVisibilityCircle();

    // Optional: Blow out the flame after 3s
    setTimeout(() => {
      document.querySelector(".flame").style.opacity = "0";
    }, 3000);

    // Show balloons and wish text
    setTimeout(() => {
      document.querySelector(".baloons").style.display = "block";
      document.querySelector(".wish").style.display = "block";
    }, 3500);

  }, 3000); // Delay after fade to black
}



function startVisibilityCircle() {
  const visibilityCircle = document.getElementById('visibility-circle');

  


  // Animate the radial mask to expand the transparent hole
  visibilityCircle.animate([
    {
      maskImage: 'radial-gradient(circle at center, transparent 0%, black 1%)',
      WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, black 1%)'
    },
    {
      maskImage: 'radial-gradient(circle at center, transparent 60%, black 100%)',
      WebkitMaskImage: 'radial-gradient(circle at center, transparent 60%, black 100%)'
    }
  ], {
    duration: 3000,
    easing: 'ease-out',
    fill: 'forwards'
  });
}






// Animation Timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  // document.getElementById('candle-wrapper').style.transform = 'scale(0.4)';

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  };

  const tl = new TimelineMax();

  tl
    .to(".container", 0.1, {
      visibility: "visible"
    })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10
      // scale: 0.7
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible"
      },
      0.05
    )
    .to(".fake-btn", 0.1, {
      backgroundColor: "rgb(127, 206, 248)"
    })
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150
      },
      "+=0.7"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0
      },
      "+=0.5"
    )
    .to(
      ".idea-5 .smiley",
      0.7,
      {
        rotation: 90,
        x: 8
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0
      },
      "+=2"
    )

    
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut
      },
      0.2,
      "+=1"
    )


    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400
      },
      {
        opacity: 1,
        y: -1000
      },
      0.2
    )
    .from(
      ".lydia-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5)
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg"
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1"
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90
      },
      "+=1"
    );

  // tl.seek("currentStep");
  // tl.timeScale(2);
    // Setup Play Song Button
  // Show the play button after everything
    tl.call(() => {
  const playBtn = document.getElementById("play-song-btn");
  const favSong = document.getElementById("fav-song");

  // Show the button first
  playBtn.style.display = "inline-block";

  // Animate button appearance (GSAP 2 syntax)
  TweenMax.fromTo(
    "#play-song-btn",
    0.6,
    { scale: 0.5, opacity: 0 },
    { scale: 1, opacity: 1, ease: Back.easeOut.config(1.7) }
  );

  // Attach click event
  playBtn.addEventListener("click", () => {
    favSong.play();
  });
});




  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
  });
};

// Run fetch and animation in sequence
fetchData();