import {
  Engine,
  World,
  Bodies,
  Body,
  Mouse,
  MouseConstraint,
  Events,
  Runner,
} from "matter-js";

// Global cleanup function to prevent multiple instances
let globalCleanup = null;

export function initFallingPills() {
  // Clean up any existing instance first
  if (globalCleanup) {
    globalCleanup();
    globalCleanup = null;
  }

  const canvas = document.querySelector(".introduction__canvas");
  const elements = canvas?.querySelectorAll(
    ".introduction__canvas .pill, .introduction__canvas .circle"
  );

  if (!canvas || elements.length === 0) return;

  // Wait for canvas to appear in viewport before starting physics
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Canvas is visible, start the physics
          observer.disconnect(); // Stop observing once started
          startPhysics();
        }
      });
    },
    {
      threshold: 0.75, // Start when 75% of canvas is visible
    }
  );

  // Variables for cleanup
  let runner, engine, world, resizeTimeout, checkCanvasResize;

  observer.observe(canvas);

  function startPhysics() {
    // Reset all element styles immediately to prevent glitches
    elements.forEach((element) => {
      element.style.transform = "";
      element.style.opacity = "";
    });

    // Create engine
    engine = Engine.create();
    world = engine.world;

    // Set stronger gravity for faster falling
    world.gravity.y = 1.25;
    world.gravity.scale = 0.001;

    // Improve physics to prevent tunneling
    engine.positionIterations = 6;
    engine.velocityIterations = 4;
    engine.constraintIterations = 2;

    // Add global angular damping to reduce spinning
    world.frictionAir = 0.01;

    // Enable sleeping for better performance
    engine.enableSleeping = true;

    // Get canvas dimensions
    const canvasRect = canvas.getBoundingClientRect();
    const canvasWidth = canvasRect.width;
    const canvasHeight = canvasRect.height;

    // Create invisible physics bodies for each element
    const bodies = [];
    const elementsArray = [];
    const widths = []; // Store each element's width
    const heights = []; // Store each element's height
    const isCircle = []; // Track which elements are circles

    elements.forEach((element, index) => {
      const elementRect = element.getBoundingClientRect();
      const elementWidth = elementRect.width;
      const elementHeight = elementRect.height;
      const isCircleElement = element.classList.contains("circle");

      // Calculate initial position relative to canvas
      // Randomize initial x within canvas width, spawn above view (-random offset)
      const initialX =
        Math.random() * (canvasWidth - elementWidth) + elementWidth / 2;
      // Spawn significantly higher above the visible area for a longer fall
      const spawnOffset = 200 + Math.random() * 240; // vertical spawn range (200px - 440px above)
      const initialY = -spawnOffset - index * 12; // increased staggering so they don't overlap

      // Create physics body based on element type
      let body;
      if (isCircleElement) {
        // For circles, use the smaller dimension as radius with lighter density
        const radius = Math.min(elementWidth, elementHeight) / 2;
        body = Bodies.circle(initialX, initialY, radius, {
          density: 0.0008, // Lighter than pills
          restitution: 0.6, // More bouncy
          friction: 0.3,
          frictionAir: 0.01,
          sleepThreshold: 60, // Time before sleeping (frames)
          sleepSpeedLimit: 1, // Speed below which body can sleep
        });
      } else {
        // For pills, use rectangle with rounded corners (chamfer)
        body = Bodies.rectangle(
          initialX,
          initialY,
          elementWidth,
          elementHeight,
          {
            density: 0.002, // Heavier than circles
            restitution: 0.3, // Less bouncy
            friction: 0.5,
            frictionAir: 0.02, // More air resistance
            chamfer: {
              radius: Math.min(elementWidth, elementHeight) / 2, // Fully rounded like CSS border-radius: 999px
            },
            sleepThreshold: 60, // Time before sleeping (frames)
            sleepSpeedLimit: 1, // Speed below which body can sleep
          }
        );
        // Add small random rotation to pills (0-20 degrees)
        // prettier-ignore
        const randomRotation = (Math.random() * 20) * (Math.PI / 180); // Convert degrees to radians
        Body.setAngle(body, randomRotation);
      }

      bodies.push(body);
      elementsArray.push(element);
      widths.push(elementWidth);
      heights.push(elementHeight);
      isCircle.push(isCircleElement);
      element.style.opacity = "1";
    });

    // Create walls (invisible boundaries)
    const wallThickness = 50; // Increased thickness for better collision
    // We'll add top wall later after all pills enter
    let topWallAdded = false;
    const topWall = () =>
      Bodies.rectangle(
        canvasWidth / 2,
        -wallThickness / 2,
        canvasWidth,
        wallThickness,
        wallOptions
      );
    const wallOptions = {
      isStatic: true,
      restitution: 0.4, // Moderate bounce off walls
      friction: 0.8, // High friction to prevent sliding
    };

    const walls = [
      // Bottom
      Bodies.rectangle(
        canvasWidth / 2,
        canvasHeight + wallThickness / 2,
        canvasWidth,
        wallThickness,
        wallOptions
      ),
      // Left
      Bodies.rectangle(
        -wallThickness / 2,
        canvasHeight / 2,
        wallThickness,
        canvasHeight,
        wallOptions
      ),
      // Right
      Bodies.rectangle(
        canvasWidth + wallThickness / 2,
        canvasHeight / 2,
        wallThickness,
        canvasHeight,
        wallOptions
      ),
    ];

    // Add bodies to world
    World.add(world, [...bodies, ...walls]);

    // Add mouse interaction
    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        damping: 0.1,
        angularStiffness: 0.8, // Increased to reduce rotation during drag
        render: {
          visible: false,
        },
      },
    });

    World.add(world, mouseConstraint);

    // Fix scroll blocking - remove wheel and touch event listeners
    if (mouseConstraint.mouse.element) {
      // Remove wheel event listener to allow scrolling
      mouseConstraint.mouse.element.removeEventListener(
        "wheel",
        mouseConstraint.mouse.mousewheel
      );
      mouseConstraint.mouse.element.removeEventListener(
        "DOMMouseScroll",
        mouseConstraint.mouse.mousewheel
      );
    }

    // Wake up bodies when mouse constraint starts
    Events.on(mouseConstraint, "startdrag", function (event) {
      const body = event.body;
      if (body.isSleeping) {
        Body.setStatic(body, false);
      }
    });

    // Update element positions on each engine update
    Events.on(engine, "afterUpdate", function () {
      bodies.forEach((body, index) => {
        const element = elementsArray[index];
        const elementWidth = widths[index];
        const elementHeight = heights[index];

        // Update element position based on physics body (using cached dimensions)
        element.style.transform = `translate(${
          body.position.x - elementWidth / 2 - element.offsetLeft
        }px, ${
          body.position.y - elementHeight / 2 - element.offsetTop
        }px) rotate(${body.angle}rad)`;
      });
      let allInside = true;
      // Check if still above visible area (allow small tolerance)
      bodies.forEach((body) => {
        // Use bounds.min.y so the entire element (not just its center) has crossed inside
        if (body.bounds.min.y < 0) {
          allInside = false;
        }
      });

      // When all elements have entered, add the top wall once
      if (!topWallAdded && allInside) {
        World.add(world, topWall());
        topWallAdded = true;
      }
    });

    // Start the engine
    runner = Runner.create({
      delta: 1000 / 60, // 60 FPS for stable physics
      isFixed: true,
    });
    Runner.run(runner, engine);

    // Handle canvas resize - restart when canvas dimensions change
    let lastCanvasWidth = canvasWidth;
    let lastCanvasHeight = canvasHeight;

    checkCanvasResize = () => {
      const currentRect = canvas.getBoundingClientRect();
      const currentWidth = currentRect.width;
      const currentHeight = currentRect.height;

      // Restart if canvas dimensions changed
      if (
        lastCanvasWidth !== currentWidth ||
        lastCanvasHeight !== currentHeight
      ) {
        lastCanvasWidth = currentWidth;
        lastCanvasHeight = currentHeight;

        // Debounce resize to avoid excessive restarts
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          initFallingPills();
        }, 100);
      }
    };

    window.addEventListener("resize", checkCanvasResize);
  } // End of startPhysics function

  // Cleanup function
  const cleanup = () => {
    // Disconnect observer
    observer.disconnect();

    // Remove resize listener if exists
    if (checkCanvasResize) {
      window.removeEventListener("resize", checkCanvasResize);
    }
    clearTimeout(resizeTimeout);

    // More thorough cleanup
    if (runner) {
      Runner.stop(runner);
    }
    if (world) {
      World.clear(world);
    }
    if (engine) {
      Engine.clear(engine);
    }

    // Reset element styles
    elements.forEach((element) => {
      element.style.transform = "";
      element.style.opacity = "";
    });

    globalCleanup = null;
  };

  // Store the cleanup function globally
  globalCleanup = cleanup;

  return cleanup;
}
