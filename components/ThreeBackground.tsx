"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Particles
    const COUNT = 380;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const velocities: number[] = [];

    const pinkColor = new THREE.Color("#f72585");
    const blueColor = new THREE.Color("#4cc9f0");

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      velocities.push(
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.02,
        0
      );
      const c = Math.random() > 0.5 ? pinkColor : blueColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.9,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Lines between nearby particles
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x4cc9f0,
      transparent: true,
      opacity: 0.07,
    });

    let mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      const pos = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3] += velocities[i * 3];
        pos[i * 3 + 1] += velocities[i * 3 + 1];

        // wrap
        if (pos[i * 3] > 100) pos[i * 3] = -100;
        if (pos[i * 3] < -100) pos[i * 3] = 100;
        if (pos[i * 3 + 1] > 60) pos[i * 3 + 1] = -60;
        if (pos[i * 3 + 1] < -60) pos[i * 3 + 1] = 60;
      }
      geo.attributes.position.needsUpdate = true;

      // subtle mouse parallax
      particles.rotation.y += (mouse.x * 0.008 - particles.rotation.y) * 0.05;
      particles.rotation.x += (-mouse.y * 0.005 - particles.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    />
  );
}
