// 3D Animations for Portfolio Website

// =================================
// Mobile Detection and Emergency Fix for Black Screen
// =================================
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

// Emergency fix for black screen on mobile
if (isMobileDevice) {
  console.log("Mobile device detected, applying emergency fixes");
  
  // Make sure content is visible after a short delay
  setTimeout(() => {
    // Force all sections to be visible
    document.querySelectorAll('section').forEach(section => {
      section.style.visibility = 'visible';
      section.style.opacity = '1';
      section.style.zIndex = '10';
      section.style.position = 'relative';
      section.style.backgroundColor = '#121212';
    });
    
    // Force body to be visible
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = '#ffffff';
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    
    // Hide any loading screen immediately
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen && loadingScreen.parentNode) {
      loadingScreen.parentNode.removeChild(loadingScreen);
    }
    
    // Initialize very simple effects only
    initVerySimpleEffects();
  }, 500);
}

// Very simplified effects for problematic mobile devices
function initVerySimpleEffects() {
  // Simple hover effects only - no 3D transformations
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    });
  });
}

// =================================
// Loading Screen Handler
// =================================
const loadingScreenHandler = {
  loadingScreen: null,
  progressBar: null,
  isComplete: false,
  totalAssets: 6, // Total number of "assets" to load (including scripts, models, etc.)
  loadedAssets: 0,
  maxLoadingTime: 3000, // Reduced to 3 seconds for better UX
  loadingTimeout: null,
  
  init() {
    // On mobile devices, skip the loading process entirely
    if (isMobileDevice) {
      console.log("Mobile device detected, skipping loading screen");
      this.isComplete = true;
      
      // Remove loading screen if it exists
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen && loadingScreen.parentNode) {
        loadingScreen.parentNode.removeChild(loadingScreen);
      }
      
      // Initialize very simple effects instead
      initVerySimpleEffects();
      return;
    }
    
    this.loadingScreen = document.getElementById('loading-screen');
    this.progressBar = document.querySelector('.progress-bar');
    
    if (!this.loadingScreen || !this.progressBar) {
      // If the loading screen element isn't found, proceed immediately
      this.isComplete = true;
      console.log("Loading screen elements not found, proceeding immediately");
      initSimplified3DEffects();
      return;
    }
    
    // Set initial progress
    this.updateProgress(0);
    
    // Set a maximum loading time to prevent indefinite loading (shorter on mobile)
    const isMobile = window.innerWidth <= 768;
    this.maxLoadingTime = isMobile ? 2000 : 3000; // Even shorter timeout on mobile
    
    this.loadingTimeout = setTimeout(() => {
      console.log("Loading timeout reached, forcing completion");
      this.forceCompleteLoading();
    }, this.maxLoadingTime);
    
    // Add skip button functionality
    const skipButton = document.getElementById('skip-loading');
    if (skipButton) {
      skipButton.addEventListener('click', () => {
        console.log("Skip button clicked");
        this.forceCompleteLoading();
      });
    }

    // Automatically progress loading faster
    setTimeout(() => this.assetLoaded(2), 500);
    setTimeout(() => this.assetLoaded(2), 1000);
    setTimeout(() => this.assetLoaded(2), 1500);
  },
  
  assetLoaded(count = 1) {
    this.loadedAssets += count;
    const progress = Math.min((this.loadedAssets / this.totalAssets) * 100, 100);
    this.updateProgress(progress);
    
    // Check if all assets are loaded
    if (this.loadedAssets >= this.totalAssets && !this.isComplete) {
      this.completeLoading();
    }
  },
  
  updateProgress(percentage) {
    if (this.progressBar) {
      this.progressBar.style.width = `${percentage}%`;
    }
  },
  
  completeLoading() {
    if (this.isComplete) return;
    this.isComplete = true;
    
    // Clear the timeout
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }
    
    // Ensure 100% is shown briefly before hiding
    this.updateProgress(100);
    
    // Hide loading screen after a short delay
    setTimeout(() => {
      if (this.loadingScreen) {
        this.loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition completes
        setTimeout(() => {
          if (this.loadingScreen && this.loadingScreen.parentNode) {
            this.loadingScreen.parentNode.removeChild(this.loadingScreen);
          }
          
          // Initialize simplified 3D effects after loading screen is gone
          initSimplified3DEffects();
        }, 500);
      }
    }, 500);
  },
  
  forceCompleteLoading() {
    console.warn("Force completing loading due to timeout");
    // Skip all remaining assets
    const remaining = this.totalAssets - this.loadedAssets;
    if (remaining > 0) {
      this.assetLoaded(remaining);
    } else {
      this.completeLoading();
    }
  }
};

// Initialize the loading screen handler right away
document.addEventListener('DOMContentLoaded', () => {
  loadingScreenHandler.init();
});

// =================================
// Simplified 3D Effects
// =================================
function initSimplified3DEffects() {
  // 1. Add 3D tilt to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = (y - centerY) / 10;
      const tiltY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
  
  // 2. Add simple 3D effects to skill items
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateZ(20px) scale(1.1)';
      item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateZ(0) scale(1)';
    });
  });
  
  // 3. Add 3D effect to contact form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    contactForm.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    
    contactForm.addEventListener('mouseenter', () => {
      contactForm.style.transform = 'translateY(-10px)';
      contactForm.style.boxShadow = '0 15px 40px rgba(0, 229, 255, 0.3)';
    });
    
    contactForm.addEventListener('mouseleave', () => {
      contactForm.style.transform = 'translateY(0)';
      contactForm.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    });
  }
  
  // 4. Add particle background using canvas (simpler than Three.js)
  createSimpleParticleBackground();
}

// =================================
// Simple Canvas Particle Background
// =================================
function createSimpleParticleBackground() {
  const heroSection = document.getElementById('home');
  if (!heroSection) return;
  
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.className = 'particle-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '1';
  canvas.style.opacity = '0.7';
  canvas.style.pointerEvents = 'none'; // Ensure canvas doesn't block interactions
  heroSection.prepend(canvas);
  
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  function resizeCanvas() {
    // Get the actual dimensions of the hero section
    const heroRect = heroSection.getBoundingClientRect();
    canvas.width = heroRect.width;
    canvas.height = heroRect.height;
    
    // Check if we're on mobile and reduce the number of particles
    const isMobile = window.innerWidth <= 768;
    if (isMobile && particles.length > 25) {
      // Reduce particle count on mobile
      particles.length = 25;
    }
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.color = '#00e5ff';
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX;
      }
      
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Create particles
  const particles = [];
  const particleCount = 50; // Reduced for better performance
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Animation
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) { // Connection distance
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 229, 255, ${0.1 - distance/1500})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// =================================
// Performance and Compatibility Check
// =================================
const checkDeviceCapabilities = () => {
  // Check if Three.js is available
  if (typeof THREE === 'undefined') {
    console.warn('Three.js is not available. 3D animations will be disabled.');
    loadingScreenHandler.forceCompleteLoading();
    return false;
  }
  
  // Check for WebGL support
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      console.warn('WebGL is not supported. 3D animations will be disabled.');
      loadingScreenHandler.forceCompleteLoading();
      return false;
    }
  } catch (e) {
    console.warn('Error checking WebGL support:', e);
    loadingScreenHandler.forceCompleteLoading();
    return false;
  }
  
  // Check for mobile devices with potential performance issues
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEndDevice = window.navigator.hardwareConcurrency && window.navigator.hardwareConcurrency <= 2;
  
  if (isMobile && isLowEndDevice) {
    console.warn('Low-end mobile device detected. 3D animations will be simplified.');
    return 'limited';
  }
  
  return true;
};

// =================================
// 1. 3D Particle Background for Hero
// =================================
const createHeroBackground = () => {
  const heroSection = document.getElementById('home');
  if (!heroSection) return;

  // Create scene container
  const container = document.createElement('div');
  container.className = 'hero-background';
  container.style.position = 'absolute';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.overflow = 'hidden';
  container.style.zIndex = '1';
  heroSection.prepend(container);

  // Three.js setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1500;

  const positionArray = new Float32Array(particlesCount * 3);
  const scaleArray = new Float32Array(particlesCount);
  
  // Create particles with random positions and scales
  for (let i = 0; i < particlesCount; i++) {
    // Positions (x, y, z)
    positionArray[i * 3] = (Math.random() - 0.5) * 10;
    positionArray[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positionArray[i * 3 + 2] = (Math.random() - 0.5) * 10;
    
    // Scales
    scaleArray[i] = Math.random();
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
  particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));

  // Particle material
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0x00e5ff,
    size: 0.05,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });

  // Create particles mesh
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Add 3D floating logo
  // Create a 3D text for initials "KK"
  const fontLoader = new THREE.FontLoader();
  
  // Create a temporary plane until the font loads
  const tempGeometry = new THREE.PlaneGeometry(0.5, 0.5);
  const tempMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.0 
  });
  const tempMesh = new THREE.Mesh(tempGeometry, tempMaterial);
  tempMesh.position.set(0, 0, 0);
  scene.add(tempMesh);
  
  // Create 3D text using simple geometries instead of loading a font
  const createTextGeometry = () => {
    // Create a group to hold our 3D text
    const textGroup = new THREE.Group();
    
    // Create first K
    const createK = (xOffset) => {
      const kGroup = new THREE.Group();
      
      // Vertical line
      const verticalGeom = new THREE.BoxGeometry(0.1, 0.5, 0.1);
      const verticalMesh = new THREE.Mesh(
        verticalGeom,
        new THREE.MeshPhongMaterial({ color: 0x00e5ff })
      );
      kGroup.add(verticalMesh);
      
      // Top diagonal
      const topDiagGeom = new THREE.BoxGeometry(0.3, 0.1, 0.1);
      const topDiagMesh = new THREE.Mesh(
        topDiagGeom,
        new THREE.MeshPhongMaterial({ color: 0x00e5ff })
      );
      topDiagMesh.position.set(0.1, 0.1, 0);
      topDiagMesh.rotation.z = -Math.PI / 4;
      kGroup.add(topDiagMesh);
      
      // Bottom diagonal
      const bottomDiagGeom = new THREE.BoxGeometry(0.3, 0.1, 0.1);
      const bottomDiagMesh = new THREE.Mesh(
        bottomDiagGeom,
        new THREE.MeshPhongMaterial({ color: 0x00e5ff })
      );
      bottomDiagMesh.position.set(0.1, -0.1, 0);
      bottomDiagMesh.rotation.z = Math.PI / 4;
      kGroup.add(bottomDiagMesh);
      
      kGroup.position.x = xOffset;
      return kGroup;
    };
    
    // Add first K
    textGroup.add(createK(-0.25));
    
    // Add second K
    textGroup.add(createK(0.25));
    
    // Add light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    textGroup.add(light);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    textGroup.add(ambientLight);
    
    return textGroup;
  };
  
  const textMesh = createTextGeometry();
  textMesh.scale.set(2, 2, 2);
  
  // Add the text mesh to the scene
  scene.add(textMesh);

  // Camera position
  camera.position.z = 5;

  // Animation
  const animate = () => {
    requestAnimationFrame(animate);
    
    // Rotate particles
    particlesMesh.rotation.x += 0.001;
    particlesMesh.rotation.y += 0.001;
    
    // Animate text mesh
    if (textMesh) {
      textMesh.rotation.y += 0.01;
      textMesh.position.y = Math.sin(Date.now() * 0.001) * 0.2;
    }
    
    // Render
    renderer.render(scene, camera);
  };

  // Handle resize
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', handleResize);
  
  // Start animation
  animate();
};

// =================================
// 2. 3D Rotating Skill Cubes
// =================================
const createSkillCubes = () => {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  // Find all skill items
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    // Only transform if it has percentage circle
    const circle = item.querySelector('circle.progress');
    if (!circle) return;
    
    // Get skill percentage
    const percentage = parseInt(circle.getAttribute('stroke-dasharray').split(',')[0]);
    if (isNaN(percentage)) return;
    
    // Create cube container
    const cubeContainer = document.createElement('div');
    cubeContainer.className = 'skill-cube-container';
    cubeContainer.style.width = '60px';
    cubeContainer.style.height = '60px';
    cubeContainer.style.position = 'relative';
    cubeContainer.style.perspective = '1000px';
    cubeContainer.style.margin = '0 auto 15px auto';
    
    // Create cube
    const cube = document.createElement('div');
    cube.className = 'skill-cube';
    cube.style.width = '100%';
    cube.style.height = '100%';
    cube.style.position = 'relative';
    cube.style.transformStyle = 'preserve-3d';
    cube.style.transition = 'transform 0.5s';
    
    // Create cube faces
    const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    const colors = ['#00e5ff', '#00b8d4', '#00bcd4', '#0097a7', '#009688', '#00796b'];
    
    faces.forEach((face, index) => {
      const facePlane = document.createElement('div');
      facePlane.className = `cube-face cube-face-${face}`;
      facePlane.style.position = 'absolute';
      facePlane.style.width = '100%';
      facePlane.style.height = '100%';
      facePlane.style.backgroundColor = colors[index];
      facePlane.style.opacity = '0.8';
      facePlane.style.display = 'flex';
      facePlane.style.alignItems = 'center';
      facePlane.style.justifyContent = 'center';
      facePlane.style.fontSize = '20px';
      facePlane.style.fontWeight = 'bold';
      facePlane.style.color = '#fff';
      facePlane.style.borderRadius = '5px';
      
      // Position face
      switch(face) {
        case 'front':
          facePlane.style.transform = 'translateZ(30px)';
          facePlane.textContent = `${percentage}%`;
          break;
        case 'back':
          facePlane.style.transform = 'rotateY(180deg) translateZ(30px)';
          break;
        case 'right':
          facePlane.style.transform = 'rotateY(90deg) translateZ(30px)';
          break;
        case 'left':
          facePlane.style.transform = 'rotateY(-90deg) translateZ(30px)';
          break;
        case 'top':
          facePlane.style.transform = 'rotateX(90deg) translateZ(30px)';
          break;
        case 'bottom':
          facePlane.style.transform = 'rotateX(-90deg) translateZ(30px)';
          break;
      }
      
      cube.appendChild(facePlane);
    });
    
    cubeContainer.appendChild(cube);
    
    // Replace SVG with the 3D cube
    const svgContainer = item.querySelector('.skill-progress');
    if (svgContainer) {
      // Keep the percentage text
      const percentText = item.querySelector('.skill-percent');
      if (percentText) {
        percentText.remove();
      }
      
      svgContainer.parentNode.replaceChild(cubeContainer, svgContainer);
      
      // Add rotation animation on hover
      item.addEventListener('mouseenter', () => {
        cube.style.transform = 'rotateX(180deg) rotateY(180deg)';
      });
      
      item.addEventListener('mouseleave', () => {
        cube.style.transform = 'rotateX(0) rotateY(0)';
      });
    }
  });
};

// =================================
// 3. 3D Project Cards
// =================================
const createProjectCards = () => {
  const projectCards = document.querySelectorAll('.project-card');
  if (!projectCards.length) return;
  
  projectCards.forEach(card => {
    // Add 3D rotation effect
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.5s';
    card.style.perspective = '1000px';
    
    // Adding depth to elements
    const projectInfo = card.querySelector('.project-info');
    if (projectInfo) {
      projectInfo.style.transform = 'translateZ(20px)';
      projectInfo.style.transition = 'transform 0.5s';
    }
    
    // Add hover effect
    card.addEventListener('mouseenter', (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse position
      card.addEventListener('mousemove', (e) => {
        const rotateY = -((e.clientX - centerX) / 10);
        const rotateX = (e.clientY - centerY) / 10;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        if (projectInfo) {
          projectInfo.style.transform = 'translateZ(50px)';
        }
      });
    });
    
    // Reset on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0) rotateY(0)';
      
      if (projectInfo) {
        projectInfo.style.transform = 'translateZ(20px)';
      }
    });
  });
};

// =================================
// 4. 3D Timeline Animation
// =================================
const createTimelineAnimation = () => {
  const timelineSection = document.getElementById('experience');
  if (!timelineSection) return;
  
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (!timelineItems.length) return;
  
  // Add perspective to the timeline container
  const timeline = document.querySelector('.timeline');
  if (timeline) {
    timeline.style.perspective = '1000px';
    timeline.style.perspectiveOrigin = 'center';
  }
  
  // Animate timeline items on scroll
  const animateTimelineItems = () => {
    const triggerPosition = window.innerHeight * 0.8;
    
    timelineItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      
      // Add 3D styles
      item.style.transition = 'transform 0.5s, opacity 0.5s';
      item.style.transformStyle = 'preserve-3d';
      
      if (itemTop < triggerPosition) {
        // Timeline content with 3D effect
        const content = item.querySelector('.timeline-content');
        if (content) {
          content.style.transform = 'translateZ(30px)';
          content.style.transition = 'transform 0.5s';
        }
        
        // Animate based on even/odd position
        if (index % 2 === 0) {
          item.style.transform = 'rotateY(0deg)';
        } else {
          item.style.transform = 'rotateY(0deg)';
        }
        
        item.style.opacity = '1';
        
        // Add hover effect
        item.addEventListener('mouseenter', () => {
          if (content) {
            content.style.transform = 'translateZ(50px)';
          }
          
          if (index % 2 === 0) {
            item.style.transform = 'rotateY(5deg)';
          } else {
            item.style.transform = 'rotateY(-5deg)';
          }
        });
        
        item.addEventListener('mouseleave', () => {
          if (content) {
            content.style.transform = 'translateZ(30px)';
          }
          
          item.style.transform = 'rotateY(0deg)';
        });
      } else {
        // Initial state (hidden and rotated)
        if (index % 2 === 0) {
          item.style.transform = 'rotateY(90deg) translateX(-100px)';
        } else {
          item.style.transform = 'rotateY(-90deg) translateX(100px)';
        }
        
        item.style.opacity = '0';
      }
    });
  };
  
  // 3D effect for timeline center line
  const timelineCenterLine = document.querySelector('.timeline::before');
  if (timelineCenterLine) {
    timelineCenterLine.style.transform = 'translateZ(20px)';
  }
  
  // Add floating 3D icons to timeline
  timelineItems.forEach(item => {
    const icon = item.querySelector('.timeline-icon i');
    if (icon) {
      // Add 3D effect to the icon
      const iconContainer = item.querySelector('.timeline-icon');
      if (iconContainer) {
        iconContainer.style.transformStyle = 'preserve-3d';
        iconContainer.style.transition = 'transform 0.5s';
        
        // Create floating effect
        const floatAnimation = () => {
          const time = Date.now() * 0.001;
          iconContainer.style.transform = `translateZ(30px) rotateY(${Math.sin(time) * 20}deg)`;
          requestAnimationFrame(floatAnimation);
        };
        
        floatAnimation();
      }
    }
  });
  
  // Initial animation
  animateTimelineItems();
  
  // Update on scroll
  window.addEventListener('scroll', animateTimelineItems);
};

// =================================
// 5. Contact Section 3D Effect
// =================================
const createContactAnimation = () => {
  const contactSection = document.getElementById('contact');
  if (!contactSection) return;
  
  // Add perspective to the contact container
  const contactContainer = contactSection.querySelector('.contact-container');
  if (contactContainer) {
    contactContainer.style.perspective = '1000px';
    contactContainer.style.transformStyle = 'preserve-3d';
  }
  
  // Add 3D effect to contact form
  const contactForm = contactSection.querySelector('.contact-form');
  if (contactForm) {
    contactForm.style.transformStyle = 'preserve-3d';
    contactForm.style.transition = 'transform 0.5s, box-shadow 0.5s';
    contactForm.style.transform = 'translateZ(20px) rotateY(-5deg)';
    contactForm.style.boxShadow = '10px 10px 20px rgba(0, 0, 0, 0.3)';
    
    // Add reactive tilt effect
    contactForm.addEventListener('mousemove', (e) => {
      const rect = contactForm.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = (x - centerX) / 40;
      const rotateX = (centerY - y) / 40;
      
      contactForm.style.transform = `translateZ(20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // Reset on mouse leave
    contactForm.addEventListener('mouseleave', () => {
      contactForm.style.transform = 'translateZ(20px) rotateY(-5deg)';
    });
    
    // Add depth to form elements
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.style.position = 'relative';
      input.style.transformStyle = 'preserve-3d';
      input.style.transition = 'transform 0.3s, box-shadow 0.3s';
      
      input.addEventListener('focus', () => {
        input.style.transform = 'translateZ(10px)';
        input.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
      });
      
      input.addEventListener('blur', () => {
        input.style.transform = 'translateZ(0)';
        input.style.boxShadow = 'none';
      });
    });
  }
  
  // Add 3D effect to contact info
  const contactInfo = contactSection.querySelector('.contact-info');
  if (contactInfo) {
    contactInfo.style.transformStyle = 'preserve-3d';
    contactInfo.style.transition = 'transform 0.5s';
    contactInfo.style.transform = 'translateZ(20px) rotateY(5deg)';
    
    // Add 3D float effect to contact items
    const contactItems = contactInfo.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
      item.style.transition = 'transform 0.3s';
      item.style.transform = 'translateZ(0)';
      
      // Float animation with delay based on index
      gsap.to(item, {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        delay: index * 0.2,
        ease: 'power1.inOut'
      });
      
      // Add hover effect
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateZ(30px)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateZ(0)';
      });
    });
    
    // Add 3D effect to social links
    const socialLinks = contactInfo.querySelectorAll('.social-links a');
    socialLinks.forEach((link, index) => {
      link.style.transformStyle = 'preserve-3d';
      link.style.transition = 'transform 0.3s';
      
      // Initial position
      link.style.transform = 'translateZ(0)';
      
      // Hover effect
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateZ(20px) scale(1.2)';
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateZ(0) scale(1)';
      });
      
      // Staggered animation
      gsap.from(link, {
        rotationY: 180,
        opacity: 0,
        duration: 0.8,
        delay: 0.2 + (index * 0.1),
        ease: 'back.out'
      });
    });
  }
};

// Initialize all 3D animations with capability check
window.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for the DOM to fully render
  setTimeout(() => {
    try {
      const deviceCapability = checkDeviceCapabilities();
      
      if (deviceCapability === true) {
        // Full 3D animations
        try {
          createHeroBackground();
          loadingScreenHandler.assetLoaded(); // Hero background loaded
        } catch (e) {
          console.error("Error creating hero background:", e);
          loadingScreenHandler.assetLoaded(); // Mark as loaded despite error
        }
        
        try {
          createSkillCubes();
          loadingScreenHandler.assetLoaded(); // Skill cubes loaded
        } catch (e) {
          console.error("Error creating skill cubes:", e);
          loadingScreenHandler.assetLoaded(); // Mark as loaded despite error
        }
        
        try {
          createProjectCards();
          loadingScreenHandler.assetLoaded(); // Project cards loaded
        } catch (e) {
          console.error("Error creating project cards:", e);
          loadingScreenHandler.assetLoaded(); // Mark as loaded despite error
        }
        
        try {
          createTimelineAnimation();
          loadingScreenHandler.assetLoaded(); // Timeline animation loaded
        } catch (e) {
          console.error("Error creating timeline animation:", e);
          loadingScreenHandler.assetLoaded(); // Mark as loaded despite error
        }
        
        try {
          createContactAnimation();
          loadingScreenHandler.assetLoaded(); // Contact animation loaded
        } catch (e) {
          console.error("Error creating contact animation:", e);
          loadingScreenHandler.assetLoaded(); // Mark as loaded despite error
        }
      } else if (deviceCapability === 'limited') {
        // Simplified animations for low-end devices
        // Only create the most important animations with reduced particle count
        try {
          createSimplifiedHeroBackground();
          loadingScreenHandler.assetLoaded(2); // Simplified hero loaded (counts as 2)
        } catch (e) {
          console.error("Error creating simplified hero background:", e);
          loadingScreenHandler.assetLoaded(2); // Mark as loaded despite error
        }
        
        try {
          createProjectCards(); // Still useful even on mobile
          loadingScreenHandler.assetLoaded(); // Project cards loaded
        } catch (e) {
          console.error("Error creating project cards:", e);
          loadingScreenHandler.assetLoaded(); // Mark as loaded despite error
        }
        
        // Skip other animations but mark as loaded for progress
        loadingScreenHandler.assetLoaded(3); // Mark remaining as loaded
      } else {
        // Fallback for devices without WebGL support
        console.log('Using fallback animations for devices without 3D support');
        // Skip all 3D animations but complete loading
        loadingScreenHandler.assetLoaded(6); // Mark all as loaded
      }
    } catch (e) {
      console.error("Critical error in 3D initialization:", e);
      // Force complete loading in case of any critical errors
      loadingScreenHandler.forceCompleteLoading();
    }
  }, 500);
});

// =================================
// Simplified animations for low-end devices
// =================================
const createSimplifiedHeroBackground = () => {
  const heroSection = document.getElementById('home');
  if (!heroSection) return;

  // Create scene container
  const container = document.createElement('div');
  container.className = 'hero-background';
  container.style.position = 'absolute';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.overflow = 'hidden';
  container.style.zIndex = '1';
  heroSection.prepend(container);

  // Three.js setup with lower resolution and fewer particles
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false }); // Disable antialiasing
  
  renderer.setSize(window.innerWidth, window.innerHeight, false); // Use false for setSize to reduce resolution
  renderer.setPixelRatio(1); // Force 1:1 pixel ratio
  container.appendChild(renderer.domElement);

  // Particles with reduced count
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500; // Reduced from 1500

  const positionArray = new Float32Array(particlesCount * 3);
  
  // Create particles with random positions
  for (let i = 0; i < particlesCount; i++) {
    // Positions (x, y, z)
    positionArray[i * 3] = (Math.random() - 0.5) * 10;
    positionArray[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positionArray[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

  // Simpler particle material
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0x00e5ff,
    size: 0.1,
    sizeAttenuation: false
  });

  // Create particles mesh
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Camera position
  camera.position.z = 5;

  // Simplified animation with lower framerate
  let lastFrame = 0;
  const frameInterval = 50; // ms between frames (lower is smoother but more resource intensive)
  
  const animate = (timestamp) => {
    // Limit framerate for better performance
    if (timestamp - lastFrame < frameInterval) {
      requestAnimationFrame(animate);
      return;
    }
    
    lastFrame = timestamp;
    
    // Slower rotation for better performance
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;
    
    // Render
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  // Simplified resize handler
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  };

  window.addEventListener('resize', handleResize);
  
  // Start animation
  requestAnimationFrame(animate);
}; 