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
    vec3 top = vec3(0.051, 0.031, 0.031);     /* #0D0808 near black */
    vec3 mid = vec3(0.420, 0.125, 0.063);     /* #6B2010 deep red */
    vec3 horizon = vec3(0.784, 0.439, 0.188); /* #C87030 burnt orange */
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
    <group position={[20, 14, -80]} scale={0.85}>
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

/* ── Ground Particles (wind drift — slower, larger, near ground) ── */
const groundParticleVert = `
  uniform float uTime;
  attribute float aRandom;
  attribute float aColorType;
  varying float vAlpha;
  varying float vColorType;
  void main() {
    vec3 pos = position;
    pos.x += sin(uTime * 0.1 + aRandom * 6.28) * 3.0;
    pos.y += sin(uTime * 0.15 + aRandom * 3.14) * 0.5;
    pos.z += cos(uTime * 0.08 + aRandom * 6.28) * 3.0;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vAlpha = smoothstep(200.0, 10.0, -mv.z) * 0.7;
    gl_PointSize = max(1.0, 4.5 / -mv.z * 100.0);
    gl_Position = projectionMatrix * mv;
    vColorType = aColorType;
  }
`;
const groundParticleFrag = `
  varying float vAlpha;
  varying float vColorType;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.1, d) * vAlpha;
    vec3 gold  = vec3(0.784, 0.627, 0.314); /* #C8A050 */
    vec3 ember = vec3(1.000, 0.502, 0.188); /* #FF8030 */
    vec3 col = mix(gold, ember, vColorType);
    gl_FragColor = vec4(col, a);
  }
`;

function GroundParticles() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const { positions, randoms, colorTypes } = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    const ctype = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = Math.random() * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
      rand[i] = Math.random();
      ctype[i] = i % 2 === 0 ? 0.0 : 1.0;
    }
    return { positions: pos, randoms: rand, colorTypes: ctype };
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={200} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aRandom" count={200} array={randoms} itemSize={1} />
        <bufferAttribute attach="attributes-aColorType" count={200} array={colorTypes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={ref}
        vertexShader={groundParticleVert}
        fragmentShader={groundParticleFrag}
        transparent
        depthWrite={false}
        uniforms={{ uTime: { value: 0 } }}
      />
    </points>
  );
}

/* ── Cork oak tree ── */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function CorkTree({ position, index }: { position: [number, number, number]; index: number }) {
  const scaleOptions = [1.2, 0.8, 1.0, 1.1, 0.9, 1.15, 0.85];
  const scale = scaleOptions[index % scaleOptions.length];
  /* canopy scale varies 0.85–1.15 per tree for organic variety */
  const canopyScale = 0.85 + seededRandom(index) * 0.3;
  return (
    <group position={position} scale={scale}>
      <pointLight color="#C87030" intensity={0.4} position={[0, 0, 0]} distance={6} decay={2} />
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 3, 6]} />
        <meshStandardMaterial color="#3D2010" />
      </mesh>
      {[0, 0.6, -0.5].map((ox, i) => (
        <mesh key={i} position={[ox, 3.2 + i * 0.3, i * 0.3]} scale={[canopyScale, canopyScale * 0.65, canopyScale]}>
          <sphereGeometry args={[1.4 - i * 0.2, 8, 8]} />
          <meshStandardMaterial color="#1A2808" emissive="#8B4513" emissiveIntensity={0.3} />
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

/* ── Fog band — Alentejo heat haze ── */
function FogBand() {
  return (
    <>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[400, 400]} />
        <meshBasicMaterial color="#8B3A10" transparent opacity={0.15} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[400, 400]} />
        <meshBasicMaterial color="#8B3A10" transparent opacity={0.08} depthWrite={false} />
      </mesh>
    </>
  );
}

/* ── Ground plane ── */
function GroundPlane() {
  return (
    <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#3D1A05" roughness={0.9} metalness={0.05} />
    </mesh>
  );
}

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
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      }}
      camera={{ fov: 55, near: 0.1, far: 500, position: [32, 12, 0] }}
      style={{ width: "100%", height: "100%" }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }}
    >
      <fogExp2 attach="fog" args={[0x3d0e05, 0.018]} />
      <ambientLight color="#4A2010" intensity={1.0} />
      <directionalLight color="#FFB060" intensity={1.8} position={[8, 20, 10]} />
      <pointLight color="#FF6020" intensity={0.3} position={[-10, 5, -20]} />
      <Sky />
      <Sun />
      <GroundPlane />
      <Terrain />
      <FogBand />
      <Particles />
      <GroundParticles />
      {treePositions.map((p, i) => (
        <CorkTree key={i} position={p} index={i} />
      ))}
      <CinematicCamera />
    </Canvas>
  </div>
);

export default HeroScene;
