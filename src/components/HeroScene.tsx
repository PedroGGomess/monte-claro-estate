import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── GLSL helpers ── */
const fbmGLSL = `
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    float a = hash(i);
    float b = hash(i+vec2(1,0));
    float c = hash(i+vec2(0,1));
    float d = hash(i+vec2(1,1));
    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    mat2 rot = mat2(0.8,-0.6,0.6,0.8);
    for(int i=0; i<7; i++) {
      v += a * noise(p);
      p = rot * p * 2.0;
      a *= 0.5;
    }
    return v;
  }
`;

/* ── Terrain ── */
const terrainVert = `
  ${fbmGLSL}
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vHeight;
  void main() {
    vec3 pos = position;
    vec2 uv2 = pos.xz * 0.02 + 0.5;
    float h = fbm(uv2 * 3.0) * 5.5 + fbm(uv2 * 6.9) * 1.8 - 1.8;
    // flatten path
    float pathW = smoothstep(3.5, 2.5, abs(pos.x));
    float pathL = smoothstep(-5.0, 0.0, pos.z) * (1.0 - smoothstep(50.0, 55.0, pos.z));
    h = mix(h, -0.3, pathW * pathL);
    pos.y = h;
    vHeight = h;
    vWorldPos = (modelMatrix * vec4(pos,1.0)).xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
  }
`;

const terrainFrag = `
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vHeight;
  void main() {
    vec3 sunDir = normalize(vec3(0.4, 0.6, 0.3));
    float diff = max(dot(vNormal, sunDir), 0.0) * 0.7 + 0.3;
    vec3 earth = vec3(0.18, 0.12, 0.06);
    vec3 ochre = vec3(0.55, 0.38, 0.18);
    vec3 golden = vec3(0.72, 0.55, 0.28);
    float t = clamp((vHeight + 1.8) / 7.0, 0.0, 1.0);
    vec3 col = mix(earth, ochre, smoothstep(0.0, 0.4, t));
    col = mix(col, golden, smoothstep(0.5, 1.0, t));
    col *= diff;
    // haze
    float dist = length(vWorldPos.xz) / 100.0;
    vec3 haze = vec3(0.15, 0.08, 0.04);
    col = mix(col, haze, smoothstep(0.3, 1.0, dist));
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Terrain() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[200, 200, 120, 120]} />
      <shaderMaterial
        vertexShader={terrainVert}
        fragmentShader={terrainFrag}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ── Sky ── */
const skyFrag = `
  varying vec3 vPos;
  void main() {
    float y = normalize(vPos).y;
    vec3 top = vec3(0.05, 0.03, 0.03);
    vec3 mid = vec3(0.24, 0.1, 0.03);
    vec3 horizon = vec3(0.45, 0.2, 0.06);
    vec3 col = mix(horizon, mid, smoothstep(0.0, 0.3, y));
    col = mix(col, top, smoothstep(0.3, 0.8, y));
    gl_FragColor = vec4(col, 1.0);
  }
`;
const skyVert = `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function Sky() {
  return (
    <mesh>
      <sphereGeometry args={[150, 32, 32]} />
      <shaderMaterial vertexShader={skyVert} fragmentShader={skyFrag} side={THREE.BackSide} />
    </mesh>
  );
}

/* ── Sun ── */
function Sun() {
  return (
    <group position={[8, 6, -80]}>
      <mesh>
        <circleGeometry args={[3, 32]} />
        <meshBasicMaterial color="#FFD080" transparent opacity={0.7} />
      </mesh>
      <mesh>
        <circleGeometry args={[6, 32]} />
        <meshBasicMaterial color="#FFB060" transparent opacity={0.08} />
      </mesh>
      <mesh>
        <circleGeometry args={[12, 32]} />
        <meshBasicMaterial color="#FF9040" transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

/* ── Particles ── */
const particleVert = `
  uniform float uTime;
  attribute float aRandom;
  varying float vAlpha;
  void main() {
    vec3 pos = position;
    pos.x += sin(uTime * 0.3 + aRandom * 6.28) * 2.0;
    pos.y += sin(uTime * 0.4 + aRandom * 3.14) * 1.5;
    pos.z += cos(uTime * 0.2 + aRandom * 6.28) * 2.0;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vAlpha = smoothstep(200.0, 20.0, -mv.z) * 0.6;
    gl_PointSize = max(1.0, 3.0 / -mv.z * 100.0);
    gl_Position = projectionMatrix * mv;
  }
`;
const particleFrag = `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.1, d) * vAlpha;
    gl_FragColor = vec4(0.91, 0.69, 0.25, a);
  }
`;

function Particles() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const { positions, randoms } = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 120;
      pos[i * 3 + 1] = Math.random() * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 120;
      rand[i] = Math.random();
    }
    return { positions: pos, randoms: rand };
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={3000} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aRandom" count={3000} array={randoms} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={ref}
        vertexShader={particleVert}
        fragmentShader={particleFrag}
        transparent
        depthWrite={false}
        uniforms={{ uTime: { value: 0 } }}
      />
    </points>
  );
}

/* ── Cork oak tree ── */
function CorkTree({ position }: { position: [number, number, number] }) {
  const scale = 0.8 + Math.random() * 0.5;
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 3, 6]} />
        <meshStandardMaterial color="#3D2B1F" />
      </mesh>
      {[0, 0.6, -0.5].map((ox, i) => (
        <mesh key={i} position={[ox, 3.2 + i * 0.3, i * 0.3]} scale={[1, 0.65, 1]}>
          <sphereGeometry args={[1.4 - i * 0.2, 8, 8]} />
          <meshStandardMaterial color={i === 0 ? "#2A3A1A" : "#344A24"} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Trees placement ── */
const treePositions: [number, number, number][] = [
  [-18, 0, -12], [-25, 0, 5], [-15, 0, 20], [-30, 0, -25],
  [-22, 0, 35], [-10, 0, -30], [15, 0, -15], [20, 0, 8],
  [28, 0, -20], [18, 0, 25], [25, 0, 40], [32, 0, -8],
  [-35, 0, 15], [8, 0, -40], [-8, 0, 42], [35, 0, 28],
];

/* ── Camera ── */
function CinematicCamera() {
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime * 0.0008;
    const r = 32;
    camera.position.x = Math.sin(t * Math.PI * 2) * r;
    camera.position.z = Math.cos(t * Math.PI * 2) * r;
    camera.position.y = 12 + Math.sin(clock.elapsedTime * 0.4) * 1.8;
    camera.lookAt(0, 1, 0);
  });
  return null;
}

/* ── Main export ── */
const HeroScene = () => (
  <div className="absolute inset-0 w-full h-full">
    <Canvas
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      camera={{ fov: 55, near: 0.1, far: 500, position: [32, 12, 0] }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight color="#6B3010" intensity={0.8} />
      <directionalLight color="#FFB060" intensity={1.8} position={[8, 20, 10]} />
      <pointLight color="#FF6020" intensity={0.3} position={[-10, 5, -20]} />
      <Sky />
      <Sun />
      <Terrain />
      <Particles />
      {treePositions.map((p, i) => (
        <CorkTree key={i} position={p} />
      ))}
      <CinematicCamera />
    </Canvas>
  </div>
);

export default HeroScene;
