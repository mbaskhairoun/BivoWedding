import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const PETAL_COUNT = 120;
const COLORS = ['#a8cfe0', '#b5ccb2', '#d6eaf5', '#dfe9dc', '#f0e4bf'];

function Petals() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { positions, speeds, phases, colors } = useMemo(() => {
    const positions = new Float32Array(PETAL_COUNT * 3);
    const speeds = new Float32Array(PETAL_COUNT);
    const phases = new Float32Array(PETAL_COUNT);
    const colors = new Float32Array(PETAL_COUNT * 3);
    const color = new THREE.Color();

    for (let i = 0; i < PETAL_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

      speeds[i] = 0.002 + Math.random() * 0.004;
      phases[i] = Math.random() * Math.PI * 2;

      color.set(COLORS[Math.floor(Math.random() * COLORS.length)]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, speeds, phases, colors };
  }, []);

  const geometry = useMemo(() => new THREE.PlaneGeometry(0.03, 0.04), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < PETAL_COUNT; i++) {
      const i3 = i * 3;

      // drift downward
      positions[i3 + 1] -= speeds[i];

      // horizontal oscillation
      const xOff = Math.sin(t * 0.5 + phases[i]) * 0.003;
      positions[i3] += xOff;

      // reset when below viewport
      if (positions[i3 + 1] < -3) {
        positions[i3] = (Math.random() - 0.5) * 8;
        positions[i3 + 1] = 3 + Math.random() * 1.5;
        positions[i3 + 2] = (Math.random() - 0.5) * 2;
      }

      dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
      dummy.rotation.set(
        t * 0.3 + phases[i],
        t * 0.2 + phases[i] * 0.7,
        t * 0.1 + phases[i] * 1.3
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, PETAL_COUNT]}>
      <meshBasicMaterial
        transparent
        side={THREE.DoubleSide}
        opacity={0.4}
        depthWrite={false}
      />
      <instancedBufferAttribute
        attach="instanceColor"
        args={[colors, 3]}
      />
    </instancedMesh>
  );
}

export default function PetalParticles() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
      }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true }}
    >
      <Petals />
    </Canvas>
  );
}
