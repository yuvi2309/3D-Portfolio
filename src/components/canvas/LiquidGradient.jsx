import { useRef, useEffect } from "react";
import * as THREE from "three";

/* ── Touch-reactive texture (mouse ripple) ── */
class TouchTexture {
  constructor() {
    this.size = 64;
    this.maxAge = 64;
    this.radius = 0.15 * this.size;
    this.trail = [];
    this.last = null;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.size, this.size);
    this.texture = new THREE.Texture(this.canvas);
  }

  update() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.size, this.size);
    for (let i = this.trail.length - 1; i >= 0; i--) {
      const pt = this.trail[i];
      pt.age++;
      if (pt.age > this.maxAge) {
        this.trail.splice(i, 1);
      } else {
        this._draw(pt);
      }
    }
    this.texture.needsUpdate = true;
  }

  addTouch(p) {
    let force = 0, vx = 0, vy = 0;
    if (this.last) {
      const dx = p.x - this.last.x;
      const dy = p.y - this.last.y;
      if (dx === 0 && dy === 0) return;
      const d = Math.sqrt(dx * dx + dy * dy);
      vx = dx / d;
      vy = dy / d;
      force = Math.min((dx * dx + dy * dy) * 10000, 1.0);
    }
    this.last = { x: p.x, y: p.y };
    this.trail.push({ x: p.x, y: p.y, age: 0, force, vx, vy });
  }

  _draw(pt) {
    const pos = { x: pt.x * this.size, y: (1 - pt.y) * this.size };
    let intensity;
    if (pt.age < this.maxAge * 0.3) {
      intensity = Math.sin((pt.age / (this.maxAge * 0.3)) * (Math.PI / 2));
    } else {
      const t = 1 - (pt.age - this.maxAge * 0.3) / (this.maxAge * 0.7);
      intensity = -t * (t - 2);
    }
    intensity *= pt.force;
    const c = `${((pt.vx + 1) / 2) * 255},${((pt.vy + 1) / 2) * 255},${intensity * 255}`;
    const off = this.size * 5;
    this.ctx.shadowOffsetX = off;
    this.ctx.shadowOffsetY = off;
    this.ctx.shadowBlur = this.radius;
    this.ctx.shadowColor = `rgba(${c},${0.2 * intensity})`;
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255,0,0,1)";
    this.ctx.arc(pos.x - off, pos.y - off, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

/* ── Shaders ── */
const vert = `
  varying vec2 vUv;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
  }
`;

const frag = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uBase;
  uniform float uSpeed;
  uniform float uGrain;
  uniform sampler2D uTouch;
  varying vec2 vUv;

  float grain(vec2 uv, float t) {
    return fract(sin(dot(uv * uResolution * 0.5 + t, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
  }

  void main() {
    vec2 uv = vUv;

    /* mouse distortion */
    vec4 touch = texture2D(uTouch, uv);
    float vx = -(touch.r * 2.0 - 1.0);
    float vy = -(touch.g * 2.0 - 1.0);
    float ti = touch.b;
    uv.x += vx * 0.25 * ti;
    uv.y += vy * 0.25 * ti;

    /* 6 moving blob centres */
    vec2 c1 = vec2(0.5 + sin(uTime*uSpeed*0.40)*0.40, 0.5 + cos(uTime*uSpeed*0.50)*0.40);
    vec2 c2 = vec2(0.5 + cos(uTime*uSpeed*0.60)*0.50, 0.5 + sin(uTime*uSpeed*0.45)*0.50);
    vec2 c3 = vec2(0.5 + sin(uTime*uSpeed*0.35)*0.45, 0.5 + cos(uTime*uSpeed*0.55)*0.45);
    vec2 c4 = vec2(0.5 + cos(uTime*uSpeed*0.50)*0.40, 0.5 + sin(uTime*uSpeed*0.40)*0.40);
    vec2 c5 = vec2(0.5 + sin(uTime*uSpeed*0.70)*0.35, 0.5 + cos(uTime*uSpeed*0.60)*0.35);
    vec2 c6 = vec2(0.5 + cos(uTime*uSpeed*0.45)*0.50, 0.5 + sin(uTime*uSpeed*0.65)*0.50);

    float d1 = 1.0 - smoothstep(0.0, 0.60, length(uv - c1));
    float d2 = 1.0 - smoothstep(0.0, 0.60, length(uv - c2));
    float d3 = 1.0 - smoothstep(0.0, 0.60, length(uv - c3));
    float d4 = 1.0 - smoothstep(0.0, 0.60, length(uv - c4));
    float d5 = 1.0 - smoothstep(0.0, 0.60, length(uv - c5));
    float d6 = 1.0 - smoothstep(0.0, 0.60, length(uv - c6));

    /* blend over base (very subtle) */
    vec3 col = uBase;
    col = mix(col, uColor1, d1 * 0.22 * (0.5 + 0.5*sin(uTime*uSpeed)));
    col = mix(col, uColor2, d2 * 0.18 * (0.5 + 0.5*cos(uTime*uSpeed*1.2)));
    col = mix(col, uColor3, d3 * 0.15 * (0.5 + 0.5*sin(uTime*uSpeed*0.8)));
    col = mix(col, uColor1, d4 * 0.12 * (0.5 + 0.5*cos(uTime*uSpeed*1.3)));
    col = mix(col, uColor2, d5 * 0.15 * (0.5 + 0.5*sin(uTime*uSpeed*1.1)));
    col = mix(col, uColor3, d6 * 0.12 * (0.5 + 0.5*cos(uTime*uSpeed*0.9)));

    /* subtle ripple on touch */
    float dist = length(uv - vec2(0.5));
    col += sin(dist * 15.0 - uTime * 2.0) * 0.01 * ti;

    /* film grain */
    col += grain(uv, uTime) * uGrain;
    col = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ── React Component ── */
const LiquidGradient = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    el.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const touch = new TouchTexture();

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uColor1: { value: new THREE.Vector3(0.66, 0.33, 0.97) },  // purple-500
      uColor2: { value: new THREE.Vector3(0.93, 0.28, 0.60) },  // pink-500
      uColor3: { value: new THREE.Vector3(0.40, 0.91, 0.98) },  // cyan-300
      uBase:   { value: new THREE.Vector3(0.98, 0.98, 0.973) }, // #FAFAF8
      uSpeed:  { value: 0.3 },
      uGrain:  { value: 0.015 },
      uTouch:  { value: touch.texture },
    };

    const geo = new THREE.PlaneGeometry(1, 1);
    const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: vert, fragmentShader: frag });
    scene.add(new THREE.Mesh(geo, mat));

    const clock = new THREE.Clock();
    let raf;
    const tick = () => {
      uniforms.uTime.value += Math.min(clock.getDelta(), 0.1);
      touch.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onMouse = (e) => {
      touch.addTouch({ x: e.clientX / window.innerWidth, y: 1 - e.clientY / window.innerHeight });
    };
    const onTouch = (e) => {
      const t = e.touches[0];
      touch.addTouch({ x: t.clientX / window.innerWidth, y: 1 - t.clientY / window.innerHeight });
    };
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="fixed inset-0 z-[-1]" />;
};

export default LiquidGradient;
