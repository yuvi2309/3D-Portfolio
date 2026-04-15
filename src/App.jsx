import { useEffect, useRef, useState, useCallback } from "react";
import { BrowserRouter } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { About, Contact, Experience, Hero, Navbar, Tech, Works } from "./components";
import LiquidGradient from "./components/canvas/LiquidGradient";

gsap.registerPlugin(ScrollTrigger);

/* ── Glass sphere parameters ── */
const GLASS_PARAMS = {
  sphereR: 0.12,
  bubbleCount: 8,
  bubbleRadiusMin: 0.03,
  bubbleRadiusMax: 0.07,
  bubbleSpeed: 0.7,
  mouseSmoothing: 0.05,
};

const glassShader = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform vec2 mouse;
uniform vec2 lag;
uniform float time;
uniform float clickTime;
uniform int clickCount;
out vec4 outColor;

const float SPHERE_R = ${GLASS_PARAMS.sphereR.toFixed(4)};
const float DISP = 0.025;
const int DISP_STEPS = 12;
const float DISP_LO = 0.0;
const float DISP_HI = 1.0;
const float SCATTER = 0.03;
const int N_BUBBLES = ${GLASS_PARAMS.bubbleCount};
const float BUBBLE_SMOOTH = 0.025;
uniform float bubbleData[${GLASS_PARAMS.bubbleCount * 4}];
const vec3 ABSORB = vec3(2.0, 1.2, 1.0) * 3.0;

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k*h*(1.0-h);
}
vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx)*vec3(0.1031,0.1030,0.0973));
  p3 += dot(p3, p3.yzx+33.33);
  return fract((p3.xx+p3.yz)*p3.zy)*2.0-1.0;
}
mat2 rot(float t) { float c=cos(t),s=sin(t); return mat2(c,-s,s,c); }
float sdSphere(vec3 p, float r) { return length(p)-r; }
float sdBox(vec3 p, vec3 b, float r) {
  vec3 q = abs(p)-b+r;
  return length(max(q,0.0))+min(max(q.x,max(q.y,q.z)),0.0)-r;
}
float sdRing(vec3 p, vec2 r) {
  float s = length(p.xy)-r.x;
  return length(vec2(s,p.z))-r.y;
}

float map(vec3 p, vec3 c) {
  vec3 q = p-c;
  float tt = clickTime*5.0;
  float bounce = exp(-tt)*sin(tt)*5.0+(1.0-exp(-tt));
  float s = bounce*0.5+0.5;
  q /= s;
  q.xz *= rot(exp(-clickTime*3.0)*8.0);
  vec3 sp = q;
  sp.y += sin(sp.z*29.0+time*6.5)*0.01;
  sp.z += sin(sp.x*23.0+sp.y*11.0+time*7.0)*0.01;
  sp.xy *= rot(time*1.3);
  sp.xz *= rot(time*1.1);
  float d;
  int objType = clickCount - (clickCount/3)*3;
  if (objType==0) { d = sdSphere(sp, SPHERE_R); }
  else if (objType==1) { d = sdBox(sp, vec3(SPHERE_R*0.8), 0.01); }
  else { d = sdRing(sp, vec2(SPHERE_R*1.1, 0.015)); }
  for (int i=0; i<N_BUBBLES; i++) {
    int b=i*4;
    vec3 bPos = vec3(bubbleData[b], bubbleData[b+1], bubbleData[b+2]);
    float r = bubbleData[b+3];
    d = smin(d, sdSphere(q-bPos, max(r,0.001)), BUBBLE_SMOOTH);
  }
  return d*s;
}

vec3 calcNormal(vec3 p, vec3 c) {
  vec2 e = vec2(0.001,0.0);
  return normalize(vec3(
    map(p+e.xyy,c)-map(p-e.xyy,c),
    map(p+e.yxy,c)-map(p-e.yxy,c),
    map(p+e.yyx,c)-map(p-e.yyx,c)
  ));
}
vec3 spectrum(float x) {
  return clamp(vec3(1.5-abs(4.0*x-1.0),1.5-abs(4.0*x-2.0),1.5-abs(4.0*x-3.0)),0.0,1.0);
}
vec4 getSrc(vec2 uv) {
  vec4 c = texture(src, uv);
  return mix(vec4(1), c, c.a);
}

void main() {
  vec2 uv = (gl_FragCoord.xy-offset)/resolution;
  float aspect = resolution.y/resolution.x;
  vec2 p = (uv-0.5)*vec2(1.0,aspect);
  vec2 mp = ((mouse+lag)/resolution-0.5)*vec2(1.0,aspect);
  vec3 ro = vec3(0.0,0.0,-2.0);
  vec3 rd = normalize(vec3(p,2.0));
  vec3 c = vec3(mp,0.0);
  vec3 firstN=vec3(0.0), lastN=vec3(0.0);
  int hitCount=0;
  float thickness=0.0, tEntry=0.0, t=0.0;
  bool inside=false;
  for (int i=0;i<50;i++) {
    if (t>10.0) break;
    vec3 pos=ro+rd*t;
    float d=map(pos,c);
    float step=inside?-d:d;
    if (step<3e-4) {
      vec3 n=calcNormal(pos,c);
      if (hitCount==0) firstN=n;
      lastN=n;
      if (!inside) tEntry=t; else thickness+=t-tEntry;
      hitCount++;
      if (hitCount>=4) break;
      inside=!inside;
      t+=0.01;
    } else { t+=step; }
  }
  if (hitCount>0) {
    vec2 baseDisp=-(firstN.xy+lastN.xy)*0.5*DISP;
    float NdotR=max(dot(firstN,-rd),0.0);
    float scatter=pow(1.0-NdotR,2.0)*SCATTER;
    vec3 acc=vec3(0.0), wsum=vec3(0.0);
    for (int i=0;i<DISP_STEPS;i++) {
      float wl=float(i)/float(DISP_STEPS-1);
      float k=mix(DISP_LO,DISP_HI,wl)*(1.3+float(hitCount)*0.2);
      vec2 h=hash22(uv*1000.0+float(i)*7.13+time)*scatter;
      vec3 w=spectrum(wl);
      acc+=getSrc(uv+baseDisp*k+h).rgb*w;
      wsum+=w;
    }
    vec3 col=acc/wsum*0.99;
    col-=float(hitCount)*0.05;
    col+=0.1;
    float fres=pow(1.0-NdotR,5.0);
    col*=1.0+fres;
    float f2=1.0-pow(NdotR,3.0);
    col*=mix(vec3(1),exp(-ABSORB*thickness),f2);
    col*=1.0+f2;
    vec3 ld=normalize(vec3(0.5,0.9,-0.3));
    float spec=pow(max(dot(reflect(-ld,firstN),-rd),0.0),200.0);
    col+=spec*30.0;
    ld=normalize(vec3(-0.9,0.4,-0.3));
    spec=pow(max(dot(reflect(-ld,firstN),-rd),0.0),300.0);
    col+=spec*3.0;
    ld=normalize(vec3(-0.1,-0.9,-0.1));
    spec=pow(max(dot(reflect(-ld,firstN),-rd),0.0),30.0);
    col+=spec*0.5;
    col=min(col,1.0);
    col=1.0-abs(col+fres*0.5-1.0);
    outColor=vec4(col,1.0);
  } else {
    outColor=getSrc(uv);
  }
}
`;

/* ── Preload VFX module eagerly ── */
let VFXClass = null;
const vfxReady = import("@vfx-js/core").then((m) => { VFXClass = m.VFX; });

const App = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const contentRef = useRef(null);
  const [glassActive, setGlassActive] = useState(false);
  const vfxRef = useRef(null);
  const glassRafRef = useRef(null);
  const glassCleanupRef = useRef(null);

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => lenis.destroy();
  }, []);

  /* ── Custom cursor ── */
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    const move = (e) => { mx = e.clientX; my = e.clientY; dot.style.left = mx+"px"; dot.style.top = my+"px"; };
    const anim = () => { cx+=(mx-cx)*0.12; cy+=(my-cy)*0.12; cursor.style.left=cx+"px"; cursor.style.top=cy+"px"; requestAnimationFrame(anim); };
    window.addEventListener("mousemove", move);
    anim();
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* ── Liquid Glass VFX toggle ── */
  const destroyGlass = useCallback(() => {
    if (glassRafRef.current) {
      cancelAnimationFrame(glassRafRef.current);
      glassRafRef.current = null;
    }
    if (glassCleanupRef.current) {
      glassCleanupRef.current();
      glassCleanupRef.current = null;
    }
    if (vfxRef.current) {
      try { vfxRef.current.destroy(); } catch (e) { /* ignore */ }
      vfxRef.current = null;
    }
    // Force-remove any leftover VFX canvases
    document.querySelectorAll("canvas[data-vfx]").forEach((c) => c.remove());
  }, []);

  useEffect(() => {
    if (!glassActive) {
      destroyGlass();
      return;
    }

    const el = contentRef.current;
    if (!el) return;
    let cancelled = false;

    (async () => {
      await vfxReady;
      if (cancelled || !VFXClass) return;

      const N = GLASS_PARAMS.bubbleCount;
      const p0 = { x: 0, y: 0 }, p1 = { x: 0, y: 0 }, p2 = { x: 0, y: 0 };
      let hasMouse = false, centerBlend = 1.0;
      let lastClick = performance.now() / 1000, clickCt = 0;

      const onMove = (e) => { p0.x = e.clientX; p0.y = window.innerHeight - e.clientY; hasMouse = true; };
      const onClick = () => { lastClick = performance.now() / 1000; clickCt++; };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerdown", onClick);
      glassCleanupRef.current = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onClick);
      };

      const bubbles = new Float32Array(N * 4);
      const t0 = performance.now() / 1000;
      const fract = (x) => x - Math.floor(x);
      const rot2d = (x, y, t) => { const c = Math.cos(t), s = Math.sin(t); return [x*c - y*s, x*s + y*c]; };

      const tick = () => {
        if (cancelled) return;
        const time = performance.now() / 1000 - t0;
        const sm = GLASS_PARAMS.mouseSmoothing;
        p1.x += (p0.x - p1.x) * sm;
        p1.y += (p0.y - p1.y) * sm;
        p2.x += (p1.x - p2.x) * sm;
        p2.y += (p1.y - p2.y) * sm;
        if (hasMouse) centerBlend *= 0.95;

        for (let i = 0; i < N; i++) {
          const life = fract(time * GLASS_PARAMS.bubbleSpeed + i / N);
          const oR = GLASS_PARAMS.sphereR * (0.3 + life * 0.8);
          const oA = time * (0.8 + fract(i * 0.618) * 0.7) + i * 1.256;
          let bx = Math.cos(oA) * oR, by = 0, bz = Math.sin(oA) * oR;
          [bx, by] = rot2d(bx, by, i * 2.3);
          [by, bz] = rot2d(by, bz, i * 1.8);
          by += life * 0.1;
          bx += Math.sin(time * 2.7 + i * 4.1) * 0.008 * life;
          bz += Math.cos(time * 3.1 + i * 3.7) * 0.008 * life;
          const w = window.innerWidth, h = window.innerHeight;
          bx += ((p2.x - p1.x) / w) * (h / w);
          by += (p2.y - p1.y) / h;
          const range = GLASS_PARAMS.bubbleRadiusMax - GLASS_PARAMS.bubbleRadiusMin;
          const maxR = GLASS_PARAMS.bubbleRadiusMin + range * fract(i * 0.618);
          const j = i * 4;
          bubbles[j] = bx; bubbles[j+1] = by; bubbles[j+2] = bz;
          bubbles[j+3] = maxR * Math.sin(life * Math.PI);
        }
        glassRafRef.current = requestAnimationFrame(tick);
      };
      tick();

      const vfx = new VFXClass({
        postEffect: {
          shader: glassShader,
          uniforms: {
            lag: () => {
              const lx = (p1.x - p0.x) * devicePixelRatio;
              const ly = (p1.y - p0.y) * devicePixelRatio;
              const cx = window.innerWidth / 2 * devicePixelRatio * centerBlend;
              const cy = window.innerHeight / 2 * devicePixelRatio * centerBlend;
              return [cx + lx, cy + ly];
            },
            clickTime: () => performance.now() / 1000 - lastClick,
            clickCount: () => clickCt,
            bubbleData: () => bubbles,
          },
        },
      });

      if (cancelled) return;
      await vfx.addHTML(el, { shader: "none" });
      if (cancelled) { try { vfx.destroy(); } catch(e) {} return; }
      vfx.play();
      vfxRef.current = vfx;
    })().catch(console.error);

    return () => { cancelled = true; destroyGlass(); };
  }, [glassActive, destroyGlass]);

  return (
    <BrowserRouter>
      {/* Custom cursor */}
      <div ref={cursorRef} className="hidden md:block fixed w-10 h-10 rounded-full border border-purple-500/20 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color] duration-300" />
      <div ref={cursorDotRef} className="hidden md:block fixed w-1.5 h-1.5 rounded-full bg-purple-600 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" />

      {/* Liquid gradient background */}
      <LiquidGradient />

      {/* Main content — VFX target */}
      <div ref={contentRef} className="relative z-0 cursor-none md:cursor-none">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Tech />
        <Works />
        <Contact />
      </div>

      {/* Glass mode toggle — outside VFX target so always clickable */}
      <button
        onClick={() => setGlassActive((v) => !v)}
        className="glass-toggle fixed bottom-8 left-8 z-[9997] flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-sm cursor-pointer transition-all duration-500"
        style={{
          borderColor: glassActive ? "rgba(168,85,247,0.4)" : "rgba(0,0,0,0.08)",
          background: glassActive ? "rgba(168,85,247,0.1)" : "rgba(255,255,255,0.8)",
        }}
      >
        <span
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-300"
          style={{ color: glassActive ? "#9333ea" : "#737373" }}
        >
          {glassActive ? "✕ Exit Glass" : "✦ Glass Mode"}
        </span>
      </button>
    </BrowserRouter>
  );
};

export default App;
