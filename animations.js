/**
 * MUKARRAM GENERAL STORE - Animations & Lightweight 3D Visuals
 * Utilizes GSAP & Three.js with robust fallback handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Respect user motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    initGsapAnimations();
    initThreeJsHero();
  }
});

function initGsapAnimations() {
  if (typeof gsap === 'undefined') return;

  // Header & Hero Fade-in
  gsap.from('.hero-content > *', {
    duration: 0.8,
    y: 20,
    opacity: 0,
    stagger: 0.15,
    ease: 'power2.out'
  });

  // Section Cards Reveal on Scroll
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.card, .product-card').forEach(card => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        },
        duration: 0.6,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
      });
    });
  }
}

/**
 * Lightweight Three.js Visual Fallback & Canvas Renderer
 */
function initThreeJsHero() {
  const container = document.getElementById('webgl-hero');
  if (!container || typeof THREE === 'undefined') return;

  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometry: Abstract Floating Geometry System
    const geometry = new THREE.IcosahedronGeometry(2.5, 0);
    const material = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 5;

    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.002;
      mesh.rotation.y += 0.003;
      renderer.render(scene, camera);
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Pause rendering when page is out of view
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animate();
      }
    });

  } catch (err) {
    console.warn('WebGL initialization skipped or unsupported:', err);
  }
}
