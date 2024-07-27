// components/Globe.js
"use client"
import { useEffect } from 'react';
import * as THREE from 'three';

const Globe = () => {
  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let globe: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;

    function init() {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 2;

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg'),
      });
      globe = new THREE.Mesh(geometry, material);
      scene.add(globe);

      document.addEventListener('mousedown', onMouseDown, false);

      document.addEventListener('click', () => {
        window.location.href = 'rec2t.html';
      });

      animate();
    }

    function onMouseDown(event:MouseEvent) {
      event.preventDefault();

      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(globe);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        console.log('Intersected point:', point);
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.005;
      renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    init();

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <div />;
};

export default Globe;
