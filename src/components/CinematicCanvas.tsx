import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  musicItems,
  cinemaItems,
  instagramItems,
  letterboxdItems,
  MusicItem,
  CinemaItem,
  InstagramEditItem,
  LetterboxdItem,
} from '../data/portfolioData';

export type SelectedObjectPayload =
  | { type: 'music'; data: MusicItem }
  | { type: 'cinema'; data: CinemaItem }
  | { type: 'scene'; data: InstagramEditItem }
  | { type: 'diary'; data: LetterboxdItem };

interface CinematicCanvasProps {
  scrollProgress: number; // 0 to 1
  onSelectObject: (payload: SelectedObjectPayload) => void;
  onHoverObject: (hovered: boolean, name?: string) => void;
  currentChapterIndex: number;
}

export const CinematicCanvas: React.FC<CinematicCanvasProps> = ({
  scrollProgress,
  onSelectObject,
  onHoverObject,
  currentChapterIndex,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const interactiveObjects = useRef<THREE.Mesh[]>([]);
  const hoveredMesh = useRef<THREE.Mesh | null>(null);
  const animFrameId = useRef<number | null>(null);
  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);

  // Keep scroll progress updated in ref for smooth lerping
  useEffect(() => {
    scrollTarget.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- SCENE & COLOR PALETTE (Warm Ivory, Soft Cream & Pastel Accents) ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const bgColor = new THREE.Color(0xfff8ee);
    scene.background = bgColor;
    // Exponential soft depth fog matching the warm ivory background
    scene.fog = new THREE.FogExp2(0xfff8ee, 0.02);

    // --- CAMERA ---
    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = width < 768;
    const camera = new THREE.PerspectiveCamera(isMobile ? 55 : 45, width / height, 0.1, 150);
    camera.position.set(0, 0, 10);
    cameraRef.current = camera;

    // --- RENDERER ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 1.8));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.appendChild(renderer.domElement);

    // --- STUDIO LIGHTING SYSTEM (Warm Afternoon Studio Glow — No Black Silhouettes) ---
    // Warm key directional light (soft champagne tone)
    const keyLight = new THREE.DirectionalLight(0xffedd6, 2.2);
    keyLight.position.set(12, 18, 14);
    scene.add(keyLight);

    // Generous ambient fill light (warm ivory/cream) to keep all 3D objects soft & luminous
    const ambientLight = new THREE.AmbientLight(0xfff5e8, 2.2);
    scene.add(ambientLight);

    // Soft warm bounce light (dusty peach/champagne)
    const bounceLight = new THREE.DirectionalLight(0xf4e8d5, 1.4);
    bounceLight.position.set(-8, -6, 10);
    scene.add(bounceLight);

    // Subtle rim backlight
    const rimLight = new THREE.DirectionalLight(0xeddcc8, 1.5);
    rimLight.position.set(-10, -5, -20);
    scene.add(rimLight);

    // --- PROCEDURAL TEXTURES GENERATION ---
    const textureLoader = new THREE.TextureLoader();

    // Helper: Canvas-drawn vinyl record texture in warm espresso and cream
    const createVinylTexture = () => {
      const cv = document.createElement('canvas');
      cv.width = 512;
      cv.height = 512;
      const ctx = cv.getContext('2d')!;
      // Deep warm espresso body (avoiding pitch black)
      ctx.fillStyle = '#3D332B';
      ctx.beginPath();
      ctx.arc(256, 256, 250, 0, Math.PI * 2);
      ctx.fill();

      // Grooves in warm taupe
      ctx.strokeStyle = '#504339';
      ctx.lineWidth = 1.5;
      for (let r = 90; r < 240; r += 7) {
        ctx.beginPath();
        ctx.arc(256, 256, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Center label (Soft Cream #F4E8D5)
      ctx.fillStyle = '#F4E8D5';
      ctx.beginPath();
      ctx.arc(256, 256, 85, 0, Math.PI * 2);
      ctx.fill();

      // Label border ring in muted champagne
      ctx.strokeStyle = '#D6B46A';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#493B32';
      ctx.font = 'bold 20px Playfair Display, serif';
      ctx.textAlign = 'center';
      ctx.fillText('PLAYLIST_BGM', 256, 245);
      ctx.font = '13px Inter, sans-serif';
      ctx.fillStyle = '#76685D';
      ctx.fillText('33⅓ RPM • ANALOG', 256, 270);

      // Spindle hole
      ctx.fillStyle = '#2B231D';
      ctx.beginPath();
      ctx.arc(256, 256, 14, 0, Math.PI * 2);
      ctx.fill();

      const tex = new THREE.CanvasTexture(cv);
      tex.needsUpdate = true;
      return tex;
    };

    // Helper: Canvas-drawn 35mm film strip texture in vintage celluloid espresso and ivory
    const createFilmStripTexture = () => {
      const cv = document.createElement('canvas');
      cv.width = 1024;
      cv.height = 256;
      const ctx = cv.getContext('2d')!;

      // Warm vintage celluloid espresso base
      ctx.fillStyle = '#382F28';
      ctx.fillRect(0, 0, cv.width, cv.height);

      // Sprocket holes (warm ivory #FFF8EE)
      ctx.fillStyle = '#FFF8EE';
      const holeW = 18;
      const holeH = 26;
      for (let x = 12; x < cv.width; x += 36) {
        // Top sprocket
        ctx.beginPath();
        ctx.roundRect(x, 14, holeW, holeH, 4);
        ctx.fill();
        // Bottom sprocket
        ctx.beginPath();
        ctx.roundRect(x, cv.height - 40, holeW, holeH, 4);
        ctx.fill();
      }

      // Film frame cells
      const frameW = 210;
      const frameH = 150;
      const frameY = 53;
      for (let f = 0; f < 4; f++) {
        const fx = 35 + f * 245;
        ctx.fillStyle = '#493B32';
        ctx.fillRect(fx, frameY, frameW, frameH);

        // Frame inner glow / simulated cinema still in warm pastel tones
        const grad = ctx.createLinearGradient(fx, frameY, fx + frameW, frameY + frameH);
        grad.addColorStop(0, '#C98B6B'); // terracotta
        grad.addColorStop(0.5, '#F4E8D5'); // cream
        grad.addColorStop(1, '#8FA7A0'); // sage
        ctx.fillStyle = grad;
        ctx.fillRect(fx + 6, frameY + 6, frameW - 12, frameH - 12);

        // Frame number text in champagne
        ctx.fillStyle = '#D6B46A';
        ctx.font = '10px monospace';
        ctx.fillText(`FRAME 0${f + 1} • 35MM`, fx + 10, frameY + frameH - 10);
      }

      const tex = new THREE.CanvasTexture(cv);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 1);
      return tex;
    };

    const vinylTex = createVinylTexture();
    const filmStripTex = createFilmStripTexture();

    // Material definitions based on warm pastel cinematic palette
    const champagneGoldMat = new THREE.MeshStandardMaterial({
      color: 0xd6b46a,
      metalness: 0.8,
      roughness: 0.28,
    });

    const terracottaMat = new THREE.MeshStandardMaterial({
      color: 0xc98b6b,
      metalness: 0.25,
      roughness: 0.45,
    });

    const dustySageMat = new THREE.MeshStandardMaterial({
      color: 0x8fa7a0,
      metalness: 0.2,
      roughness: 0.45,
    });

    const warmEspressoMat = new THREE.MeshStandardMaterial({
      color: 0x493b32,
      metalness: 0.3,
      roughness: 0.5,
    });

    const ivoryCardMat = new THREE.MeshStandardMaterial({
      color: 0xfffaf2,
      roughness: 0.65,
      metalness: 0.05,
    });

    const creamCardMat = new THREE.MeshStandardMaterial({
      color: 0xf4e8d5,
      roughness: 0.6,
      metalness: 0.05,
    });

    // Array of interactive meshes
    interactiveObjects.current = [];

    // =========================================================================
    // CHAPTER 01: OPENING / PRELUDE (Z: +5 to -5)
    // Abstract floating film strips, golden rings, vinyl disc, drifting particles
    // =========================================================================
    const ch1Group = new THREE.Group();
    scene.add(ch1Group);

    // Curving floating 35mm film strip
    const curve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, 3.5, 4),
      new THREE.Vector3(-3, 0.5, 1),
      new THREE.Vector3(1, -2, -2),
      new THREE.Vector3(4, 1.5, -6),
    ]);
    const filmTubeGeo = new THREE.TubeGeometry(curve1, 64, 0.6, 8, false);
    const filmStripMat = new THREE.MeshStandardMaterial({
      map: filmStripTex,
      roughness: 0.45,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
    const filmStripMesh = new THREE.Mesh(filmTubeGeo, filmStripMat);
    ch1Group.add(filmStripMesh);

    // Floating resonance ring in champagne gold
    const soundRingGeo = new THREE.TorusGeometry(3.2, 0.06, 16, 64);
    const soundRing = new THREE.Mesh(soundRingGeo, champagneGoldMat);
    soundRing.position.set(0, 0, -1);
    soundRing.rotation.x = Math.PI / 3;
    ch1Group.add(soundRing);

    // Inner delicate secondary ring in muted terracotta
    const innerRingGeo = new THREE.TorusGeometry(2.4, 0.035, 16, 48);
    const innerRing = new THREE.Mesh(innerRingGeo, terracottaMat);
    innerRing.position.set(0, 0, -1);
    innerRing.rotation.y = Math.PI / 4;
    ch1Group.add(innerRing);

    // Center floating vinyl disc (interactive)
    const vinylGeo = new THREE.CylinderGeometry(2.0, 2.0, 0.04, 48);
    const vinylMat = new THREE.MeshStandardMaterial({
      map: vinylTex,
      roughness: 0.38,
      metalness: 0.35,
    });
    const heroVinyl = new THREE.Mesh(vinylGeo, vinylMat);
    heroVinyl.position.set(2.8, -0.8, -2.5);
    heroVinyl.rotation.x = Math.PI / 2.8;
    heroVinyl.rotation.z = -0.4;
    heroVinyl.userData = {
      type: 'music',
      data: musicItems[0],
      title: 'In the Mood for Love (Theme)',
      defaultScale: new THREE.Vector3(1, 1, 1),
    };
    interactiveObjects.current.push(heroVinyl);
    ch1Group.add(heroVinyl);

    // =========================================================================
    // CHAPTER 02: MUSIC (Z: -12 to -22)
    // Floating vinyls, cassette tapes, headphones, album sleeves
    // =========================================================================
    const ch2Group = new THREE.Group();
    scene.add(ch2Group);

    // Floating Vinyls for tracks
    musicItems.forEach((item, idx) => {
      const vMesh = new THREE.Mesh(vinylGeo, vinylMat);
      const angle = (idx / musicItems.length) * Math.PI * 1.6 - 0.8;
      const radius = 4.2;
      vMesh.position.set(
        Math.cos(angle) * radius + (idx % 2 === 0 ? 0.8 : -0.8),
        Math.sin(angle) * 2.2 - 0.5,
        -14 - idx * 2.2
      );
      vMesh.rotation.x = 1.1 + idx * 0.15;
      vMesh.rotation.y = 0.4 - idx * 0.2;
      vMesh.userData = {
        type: 'music',
        data: item,
        title: `${item.track} — ${item.artist}`,
        defaultScale: new THREE.Vector3(0.9, 0.9, 0.9),
      };
      vMesh.scale.set(0.9, 0.9, 0.9);
      interactiveObjects.current.push(vMesh);
      ch2Group.add(vMesh);

      // Complementary album sleeve slab behind it
      const albumGeo = new THREE.BoxGeometry(3.0, 3.0, 0.1);
      const albumMesh = new THREE.Mesh(albumGeo, idx % 2 === 0 ? creamCardMat : dustySageMat);
      albumMesh.position.set(
        vMesh.position.x - 1.2,
        vMesh.position.y + 0.6,
        vMesh.position.z - 0.8
      );
      albumMesh.rotation.copy(vMesh.rotation);
      albumMesh.rotation.z += 0.2;
      ch2Group.add(albumMesh);
    });

    // Stylized 3D Cassette Tape in muted terracotta
    const cassetteBodyGeo = new THREE.BoxGeometry(2.8, 1.8, 0.35);
    const cassette = new THREE.Mesh(cassetteBodyGeo, terracottaMat);
    cassette.position.set(-3.5, 1.2, -18);
    cassette.rotation.set(0.3, 0.6, -0.2);
    cassette.userData = {
      type: 'music',
      data: musicItems[1],
      title: 'Cassette Tape — Retro Mixtape',
      defaultScale: new THREE.Vector3(1, 1, 1),
    };
    interactiveObjects.current.push(cassette);
    ch2Group.add(cassette);

    // Cassette Spool Wheels in soft cream
    const spoolGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.4, 24);
    const spoolLeft = new THREE.Mesh(spoolGeo, creamCardMat);
    spoolLeft.rotation.x = Math.PI / 2;
    spoolLeft.position.set(-0.65, 0, 0);
    cassette.add(spoolLeft);

    const spoolRight = new THREE.Mesh(spoolGeo, creamCardMat);
    spoolRight.rotation.x = Math.PI / 2;
    spoolRight.position.set(0.65, 0, 0);
    cassette.add(spoolRight);

    // Stylized Headband & Earcups in champagne gold & dusty sage
    const headbandCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.6, -0.6, 0),
      new THREE.Vector3(-1.3, 1.6, 0),
      new THREE.Vector3(0, 2.0, 0),
      new THREE.Vector3(1.3, 1.6, 0),
      new THREE.Vector3(1.6, -0.6, 0),
    ]);
    const headbandGeo = new THREE.TubeGeometry(headbandCurve, 32, 0.1, 8, false);
    const headphones = new THREE.Mesh(headbandGeo, champagneGoldMat);
    headphones.position.set(3.8, 1.5, -20);
    headphones.rotation.set(-0.2, -0.5, 0.3);

    const earcupGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.45, 24);
    const earcupL = new THREE.Mesh(earcupGeo, dustySageMat);
    earcupL.position.set(-1.6, -0.6, 0);
    earcupL.rotation.z = Math.PI / 2;
    headphones.add(earcupL);
    const earcupR = new THREE.Mesh(earcupGeo, dustySageMat);
    earcupR.position.set(1.6, -0.6, 0);
    earcupR.rotation.z = Math.PI / 2;
    headphones.add(earcupR);
    ch2Group.add(headphones);

    // =========================================================================
    // CHAPTER 03: CINEMA (Z: -28 to -38)
    // Projector light beam cone, floating film reels, movie poster canvases
    // =========================================================================
    const ch3Group = new THREE.Group();
    scene.add(ch3Group);

    // Projector Light Beam in warm soft champagne
    const beamGeo = new THREE.ConeGeometry(5.5, 16, 32, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xfff6de,
      transparent: true,
      opacity: 0.09,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const projectorBeam = new THREE.Mesh(beamGeo, beamMat);
    projectorBeam.position.set(-6, 4, -34);
    projectorBeam.rotation.x = -Math.PI / 2.3;
    projectorBeam.rotation.z = 0.5;
    ch3Group.add(projectorBeam);

    // 3D Film Reel in champagne gold and warm espresso
    const createFilmReelMesh = () => {
      const reelGroup = new THREE.Group();
      const flangeGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.05, 32);

      const topFlange = new THREE.Mesh(flangeGeo, champagneGoldMat);
      topFlange.position.y = 0.3;
      reelGroup.add(topFlange);

      const bottomFlange = new THREE.Mesh(flangeGeo, champagneGoldMat);
      bottomFlange.position.y = -0.3;
      reelGroup.add(bottomFlange);

      // Core hub with wound film in warm espresso
      const hubGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.55, 32);
      const hub = new THREE.Mesh(hubGeo, warmEspressoMat);
      reelGroup.add(hub);

      return reelGroup;
    };

    const filmReel = createFilmReelMesh();
    filmReel.position.set(-3.2, 0.8, -32);
    filmReel.rotation.set(0.6, 0.4, 0.8);
    filmReel.userData = {
      type: 'cinema',
      data: cinemaItems[0],
      title: 'Film Reel — Before Sunrise Archive',
      defaultScale: new THREE.Vector3(1, 1, 1),
    };
    interactiveObjects.current.push(filmReel as unknown as THREE.Mesh);
    ch3Group.add(filmReel);

    // Floating Movie Posters at staggered depths with warm frames
    cinemaItems.forEach((cinema, idx) => {
      const posterTex = textureLoader.load(cinema.posterImage);
      posterTex.colorSpace = THREE.SRGBColorSpace;

      const posterGeo = new THREE.PlaneGeometry(2.4, 3.4);
      const posterMat = new THREE.MeshStandardMaterial({
        map: posterTex,
        roughness: 0.5,
        side: THREE.DoubleSide,
      });
      const posterMesh = new THREE.Mesh(posterGeo, posterMat);

      // Placement along viewing corridor
      const xOffset = idx % 2 === 0 ? 3.0 : -3.2;
      const yOffset = (idx % 2 === 0 ? 0.3 : -0.4) + (idx === 1 ? 0.6 : 0);
      const zOffset = -29 - idx * 2.8;

      posterMesh.position.set(xOffset, yOffset, zOffset);
      posterMesh.rotation.y = idx % 2 === 0 ? -0.25 : 0.25;
      posterMesh.rotation.x = 0.05;

      // Frame backing in warm espresso with champagne trim
      const frameGeo = new THREE.BoxGeometry(2.5, 3.5, 0.1);
      const frameMesh = new THREE.Mesh(frameGeo, warmEspressoMat);
      frameMesh.position.z = -0.06;
      posterMesh.add(frameMesh);

      posterMesh.userData = {
        type: 'cinema',
        data: cinema,
        title: `${cinema.title} (${cinema.year})`,
        defaultScale: new THREE.Vector3(1, 1, 1),
      };
      interactiveObjects.current.push(posterMesh);
      ch3Group.add(posterMesh);
    });

    // =========================================================================
    // CHAPTER 04: SCENES & EDITS (Z: -44 to -54)
    // 3D Floating Gallery Wall with vertical 9:16 reels staggered in depth
    // =========================================================================
    const ch4Group = new THREE.Group();
    scene.add(ch4Group);

    instagramItems.forEach((edit, idx) => {
      const editTex = textureLoader.load(edit.thumbnailImage);
      editTex.colorSpace = THREE.SRGBColorSpace;

      // 9:16 Vertical Reel Aspect Ratio
      const reelCardGeo = new THREE.PlaneGeometry(2.1, 3.7);
      const reelCardMat = new THREE.MeshStandardMaterial({
        map: editTex,
        roughness: 0.45,
        side: THREE.DoubleSide,
      });
      const reelCardMesh = new THREE.Mesh(reelCardGeo, reelCardMat);

      // Arc layout around virtual camera
      const arcAngle = (idx - (instagramItems.length - 1) / 2) * 0.35;
      const cardX = Math.sin(arcAngle) * 7.5;
      const cardZ = -48 + Math.cos(arcAngle) * 3.5 - idx * 0.8;
      const cardY = (idx % 2 === 0 ? 0.3 : -0.5);

      reelCardMesh.position.set(cardX, cardY, cardZ);
      reelCardMesh.rotation.y = -arcAngle * 1.3;
      reelCardMesh.rotation.z = (idx % 2 === 0 ? 0.03 : -0.03);

      // Minimal ivory backplate
      const backGeo = new THREE.BoxGeometry(2.18, 3.78, 0.08);
      const backMesh = new THREE.Mesh(backGeo, ivoryCardMat);
      backMesh.position.z = -0.05;
      reelCardMesh.add(backMesh);

      reelCardMesh.userData = {
        type: 'scene',
        data: edit,
        title: edit.title,
        defaultScale: new THREE.Vector3(1, 1, 1),
      };
      interactiveObjects.current.push(reelCardMesh);
      ch4Group.add(reelCardMesh);
    });

    // =========================================================================
    // CHAPTER 05: LETTERBOXD DIARY (Z: -60 to -70)
    // Archival cinema diary card slabs, open film canister, warm memory glow
    // =========================================================================
    const ch5Group = new THREE.Group();
    scene.add(ch5Group);

    letterboxdItems.forEach((item, idx) => {
      const diaryTex = textureLoader.load(item.coverImage);
      diaryTex.colorSpace = THREE.SRGBColorSpace;

      const cardGeo = new THREE.PlaneGeometry(2.3, 3.2);
      const cardMat = new THREE.MeshStandardMaterial({
        map: diaryTex,
        roughness: 0.5,
      });
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);

      const posX = idx % 2 === 0 ? -2.8 : 2.8;
      const posY = (idx % 2 === 0 ? 0.4 : -0.3) + (idx === 2 ? 0.4 : 0);
      const posZ = -62 - idx * 2.5;

      cardMesh.position.set(posX, posY, posZ);
      cardMesh.rotation.y = idx % 2 === 0 ? 0.3 : -0.3;
      cardMesh.rotation.x = 0.08;

      // Card border in warm cream
      const borderGeo = new THREE.BoxGeometry(2.38, 3.28, 0.06);
      const borderMesh = new THREE.Mesh(borderGeo, creamCardMat);
      borderMesh.position.z = -0.04;
      cardMesh.add(borderMesh);

      cardMesh.userData = {
        type: 'diary',
        data: item,
        title: `${item.filmTitle} (${item.year}) — Diary Entry`,
        defaultScale: new THREE.Vector3(1, 1, 1),
      };
      interactiveObjects.current.push(cardMesh);
      ch5Group.add(cardMesh);
    });

    // =========================================================================
    // CHAPTER 06: ARRIVE / HORIZON (Z: -78 to -88)
    // Vast atmospheric constellation: pull-back camera perspective revealing
    // the whole universe of film strips, golden rings, stars, memory sparks
    // =========================================================================
    const ch6Group = new THREE.Group();
    scene.add(ch6Group);

    // Grand celestial halo in champagne gold
    const grandHaloGeo = new THREE.TorusGeometry(8.0, 0.08, 16, 100);
    const grandHalo = new THREE.Mesh(grandHaloGeo, champagneGoldMat);
    grandHalo.position.set(0, 0, -84);
    grandHalo.rotation.x = Math.PI / 4;
    ch6Group.add(grandHalo);

    // Secondary concentric halo in dusty sage
    const subHaloGeo = new THREE.TorusGeometry(5.5, 0.04, 16, 80);
    const subHalo = new THREE.Mesh(subHaloGeo, dustySageMat);
    subHalo.position.set(0, 0, -84);
    subHalo.rotation.y = Math.PI / 3;
    ch6Group.add(subHalo);

    // =========================================================================
    // ATMOSPHERIC DRIFTING DUST & PARTICLES (Continuous through entire world)
    // =========================================================================
    const particleCount = isMobile ? 350 : 750;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 26;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 2] = 10 - Math.random() * 105; // spans Z: +10 down to -95
      particleScales[i] = Math.random() * 0.06 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    // Warm golden specks
    const particleMat = new THREE.PointsMaterial({
      color: 0xd6c2a5,
      size: 0.14,
      transparent: true,
      opacity: 0.65,
      blending: THREE.NormalBlending,
    });
    const dustParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(dustParticles);

    // =========================================================================
    // CAMERA PATH & SCROLL-DRIVEN SPLINE WAYPOINTS
    // =========================================================================
    // 6 defined waypoints corresponding to Chapters 01 through 06
    const cameraWaypoints = [
      { pos: new THREE.Vector3(0, 0, 7.5), look: new THREE.Vector3(0, 0, -5) },       // Ch 1: Welcome
      { pos: new THREE.Vector3(-0.8, -0.2, -11), look: new THREE.Vector3(0.5, 0, -18) }, // Ch 2: Music
      { pos: new THREE.Vector3(0.6, 0.4, -26), look: new THREE.Vector3(-0.2, 0, -35) },   // Ch 3: Cinema
      { pos: new THREE.Vector3(0, 0.2, -43), look: new THREE.Vector3(0, 0, -52) },       // Ch 4: Scenes
      { pos: new THREE.Vector3(-0.4, 0.1, -58), look: new THREE.Vector3(0.2, 0, -68) },  // Ch 5: Letterboxd
      { pos: new THREE.Vector3(0, 2.5, -74), look: new THREE.Vector3(0, 0, -85) },       // Ch 6: Arrive (pulled back)
    ];

    const currentCamPos = new THREE.Vector3().copy(cameraWaypoints[0].pos);
    const currentCamLook = new THREE.Vector3().copy(cameraWaypoints[0].look);

    // =========================================================================
    // POINTER / MOUSE PARALLAX & RAYCASTING
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);

      mouseNorm.x = x;
      mouseNorm.y = y;

      mousePos.current.targetX = x * (isMobile ? 0.4 : 1.0);
      mousePos.current.targetY = y * (isMobile ? 0.4 : 1.0);

      // Raycast hover check
      raycaster.setFromCamera(mouseNorm, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects.current, true);

      if (intersects.length > 0) {
        // Find top-level interactive ancestor
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && !obj.userData?.type && obj.parent) {
          obj = obj.parent;
        }

        if (obj && obj.userData?.type) {
          const mesh = obj as THREE.Mesh;
          if (hoveredMesh.current !== mesh) {
            if (hoveredMesh.current && hoveredMesh.current.userData?.defaultScale) {
              hoveredMesh.current.scale.copy(hoveredMesh.current.userData.defaultScale);
            }
            hoveredMesh.current = mesh;
            container.style.cursor = 'pointer';
            onHoverObject(true, mesh.userData.title);
          }
          return;
        }
      }

      if (hoveredMesh.current) {
        if (hoveredMesh.current.userData?.defaultScale) {
          hoveredMesh.current.scale.copy(hoveredMesh.current.userData.defaultScale);
        }
        hoveredMesh.current = null;
        container.style.cursor = 'default';
        onHoverObject(false);
      }
    };

    const handlePointerClick = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('changedTouches' in e && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const intersects = raycaster.intersectObjects(interactiveObjects.current, true);

      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && !obj.userData?.type && obj.parent) {
          obj = obj.parent;
        }

        if (obj && obj.userData?.type) {
          onSelectObject({
            type: obj.userData.type,
            data: obj.userData.data,
          });
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('click', handlePointerClick);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerClick);

    // =========================================================================
    // RESIZE & REDUCED MOTION
    // =========================================================================
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // =========================================================================
    // ANIMATION LOOP
    // =========================================================================
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth scroll progress interpolation
      scrollCurrent.current += (scrollTarget.current - scrollCurrent.current) * 0.065;
      const progress = Math.max(0, Math.min(1, scrollCurrent.current));

      // Map progress (0 -> 1) across 6 waypoints (5 segments)
      const numSegments = cameraWaypoints.length - 1;
      const scaledProgress = progress * numSegments;
      const segIndex = Math.min(Math.floor(scaledProgress), numSegments - 1);
      const segFraction = scaledProgress - segIndex;

      // Smooth ease-in-out curve within segment
      const easedFraction =
        segFraction < 0.5
          ? 2 * segFraction * segFraction
          : -1 + (4 - 2 * segFraction) * segFraction;

      const startWP = cameraWaypoints[segIndex];
      const endWP = cameraWaypoints[segIndex + 1] || startWP;

      const targetPos = new THREE.Vector3().lerpVectors(startWP.pos, endWP.pos, easedFraction);
      const targetLook = new THREE.Vector3().lerpVectors(startWP.look, endWP.look, easedFraction);

      // Smooth mouse parallax damping
      const motionScale = prefersReducedMotion ? 0.2 : 1.0;
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      const parallaxX = mousePos.current.x * 1.4 * motionScale;
      const parallaxY = mousePos.current.y * 1.1 * motionScale;

      currentCamPos.lerp(targetPos, 0.08);
      currentCamLook.lerp(targetLook, 0.08);

      camera.position.set(
        currentCamPos.x + parallaxX,
        currentCamPos.y + parallaxY,
        currentCamPos.z
      );
      camera.lookAt(currentCamLook.x, currentCamLook.y, currentCamLook.z);

      // Continuous subtle idle rotations
      if (!prefersReducedMotion) {
        soundRing.rotation.z = time * 0.12;
        innerRing.rotation.x = time * 0.15;
        filmReel.rotation.y = time * 0.25;
        grandHalo.rotation.z = time * 0.08;
        subHalo.rotation.x = time * -0.1;

        // Subtle hover scale breathing
        if (hoveredMesh.current && hoveredMesh.current.userData?.defaultScale) {
          const ds = hoveredMesh.current.userData.defaultScale;
          const hoverScale = 1.08 + Math.sin(time * 6) * 0.02;
          hoveredMesh.current.scale.set(ds.x * hoverScale, ds.y * hoverScale, ds.z * hoverScale);
        }

        // Particle drifting
        const positions = particleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += Math.sin(time + i) * 0.002;
          positions[i * 3 + 0] += Math.cos(time + i * 0.5) * 0.0015;
        }
        particleGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Context loss safety
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
    const handleContextRestored = () => {
      animate();
    };

    const canvasEl = renderer.domElement;
    canvasEl.addEventListener('webglcontextlost', handleContextLost);
    canvasEl.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('click', handlePointerClick);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerClick);
      window.removeEventListener('resize', handleResize);
      canvasEl.removeEventListener('webglcontextlost', handleContextLost);
      canvasEl.removeEventListener('webglcontextrestored', handleContextRestored);

      // Dispose Three resources
      renderer.dispose();
      filmTubeGeo.dispose();
      soundRingGeo.dispose();
      innerRingGeo.dispose();
      vinylGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
