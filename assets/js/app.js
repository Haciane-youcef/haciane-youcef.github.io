/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */
particlesJS('particles-js',  
{
  "particles": {
    "number": {
      "value": 3000, // 🔹 plus de particules
      "density": {
        "enable": true,
        "value_area": 5000 // 🔹 densité plus grande
      }
    },
    "color": {
      "value": ["#00bcd4", "#2196f3", "#4dd0e1"] // Bleu + Cyan + Turquoise
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0
      }
    },
    "opacity": {
      "value": 0.6,
      "random": false
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#90caf9", // Bleu clair discret
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2.5,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out"
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      }
    },
    "modes": {
      "repulse": {
        "distance": 150,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      }
    }
  },
  "retina_detect": true
});
