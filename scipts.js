function animateProjects() {
  let projects = gsap.utils.toArray(".project-link");

  projects.forEach((project, i) => {
    let imageWrapper = project.querySelectorAll(".project-image-wrapper");
    let image = project.querySelectorAll(".project-image")[1];

    let tl = gsap.timeline({
      defaults: {
        ease: "power3.out"
      },
      scrollTrigger: {
        trigger: project,
        once: true,
        start: "top bottom"
      },
      onComplete: () => {
        gsap.set([project, image, imageWrapper], {
          clearProps: "all"
        });
      }
    });

    tl.from(project, {
      duration: 1,
      autoAlpha: 0
    })
      .from(
        image,
        {
          yPercent: -20,
          duration: 2
        },
        0
      )
      .from(
        imageWrapper,
        {
          yPercent: 20,
          duration: 2
        },
        0
      );
  });
}

function projectHeadAnim() {
  var tl = gsap.timeline({
    defaults: {
      ease: "power3.out"
    },
    scrollTrigger: {
      trigger: ".projects-heading_wrapper",
      once: true,
      start: "top bottom"
    }
  });
  tl.from(".projects_heading", {
    yPercent: 100,
    duration: 0.75
  })
    .from(
      ".projects-heading_line",
      {
        width: 0,
        duration: 2,
        ease: "power3.inOut"
      },
      0.5
    )
    .from(
      ".projects-heading_wrapper .line-wrapper",
      {
        x: "-1.8em",
        duration: 1
      },
      "<25%"
    )
    .from(
      ".heading-bullet",
      {
        scale: 0
      },
      "<25%"
    );
}

function homeLoader() {
  headerItems = $(".header-inner").children();
  (splitHeroHeading = new SplitText($(".split-words"), {
    type: "words"
  })),
    (splitHeroIntro = new SplitText($(".hero-intro-text"), {
      type: "lines"
    })),
    (homeLoaderAnim = gsap.timeline({
      defaults: {
        ease: "power3.out"
      },
      onComplete: function () {
        splitHeroHeading.revert();
        splitHeroIntro.revert();
      }
    }));

  $(".hero-intro-text div").wrap('<div class="hero-intro_line">');

  homeLoaderAnim
    .set("body", {
      autoAlpha: 1
    })
    .set(".projects-grid, .projects-heading_wrapper", {
      autoAlpha: 0
    })
    .from(splitHeroHeading.words, {
      duration: 1.2,
      yPercent: 100,
      stagger: 0.2,
      delay: 0.2
    })
    .from(
      ".herow .amp",
      {
        duration: 1.2,
        yPercent: 100
      },
      0.6
    )
    .from(
      headerItems,
      {
        duration: 1,
        stagger: 0.075,
        autoAlpha: 0
      },
      1
    )
    .from(
      ".hero-circle circle",
      {
        duration: 1.8,
        drawSVG: 0
      },
      0.9
    )
    .fromTo(
      ".hero-circle",
      {
        rotation: -180
      },
      {
        duration: 1.8,
        rotation: -90
      },
      1
    )
    .from(
      splitHeroIntro.lines,
      {
        duration: 0.75,
        yPercent: 100,
        autoAlpha: 0,
        stagger: 0.075
      },
      1.2
    )
    .set(
      ".projects-heading_wrapper",
      {
        clearProps: "all"
      },
      1.6
    )
    .add(projectHeadAnim, 1.6)

    .set(
      ".projects-grid",
      {
        clearProps: "all"
      },
      2
    )
    .add(animateProjects, 2);
}

/* Set Footer Copyright Year */
function setCopyrightYear() {
  $(".copyright-year").text(new Date().getFullYear());
}

if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}

window.addEventListener("load", function () {
  homeLoader();
  setCopyrightYear();
});

$(window).bind("pageshow", function (event) {
  if (event.originalEvent.persisted) {
    window.location.reload();
  }
});
