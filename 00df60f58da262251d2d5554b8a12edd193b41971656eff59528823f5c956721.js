function __sn17_user(THREE) {
  const root = new THREE.Group();

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d8,
    metalness: 0.75,
    roughness: 0.22
  });
  const darkSilverMat = new THREE.MeshStandardMaterial({
    color: 0x777777,
    metalness: 0.65,
    roughness: 0.35
  });
  const gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0x00a83e,
    metalness: 0.0,
    roughness: 0.08,
    transparent: true,
    opacity: 0.78,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    flatShading: true
  });
  const facetDarkMat = new THREE.MeshStandardMaterial({
    color: 0x003d1c,
    metalness: 0.0,
    roughness: 0.18,
    side: THREE.DoubleSide
  });
  const facetMidMat = new THREE.MeshStandardMaterial({
    color: 0x00bd45,
    metalness: 0.0,
    roughness: 0.12,
    side: THREE.DoubleSide
  });
  const facetBrightMat = new THREE.MeshStandardMaterial({
    color: 0x3cff72,
    metalness: 0.0,
    roughness: 0.08,
    side: THREE.DoubleSide
  });
  const facetPaleMat = new THREE.MeshStandardMaterial({
    color: 0xb8ffd0,
    metalness: 0.0,
    roughness: 0.06,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide
  });
  const scratchMat = new THREE.LineBasicMaterial({
    color: 0x555555,
    transparent: true,
    opacity: 0.45
  });

  const ovalXScale = 0.72;
  const ovalYScale = 1.0;

  const ring_bandGeom = new THREE.TorusGeometry(0.29, 0.035, 16, 72);
  const ring_band = new THREE.Mesh(ring_bandGeom, silverMat);
  ring_band.rotation.x = Math.PI / 2;
  ring_band.scale.set(1.0, 0.72, 1.0);
  ring_band.position.set(0, -0.13, -0.25);
  root.add(ring_band);

  const left_shoulderGeom = new THREE.CylinderGeometry(0.045, 0.052, 0.22, 24);
  const left_shoulder = new THREE.Mesh(left_shoulderGeom, silverMat);
  left_shoulder.rotation.z = Math.PI / 2;
  left_shoulder.position.set(-0.25, -0.13, -0.035);
  root.add(left_shoulder);

  const right_shoulder = new THREE.Mesh(left_shoulderGeom, silverMat);
  right_shoulder.rotation.z = Math.PI / 2;
  right_shoulder.position.set(0.25, -0.13, -0.035);
  root.add(right_shoulder);

  const setting_baseGeom = new THREE.CylinderGeometry(0.31, 0.31, 0.075, 64);
  const setting_base = new THREE.Mesh(setting_baseGeom, silverMat);
  setting_base.rotation.x = Math.PI / 2;
  setting_base.scale.set(ovalXScale, 1.0, ovalYScale);
  setting_base.position.z = 0.0;
  root.add(setting_base);

  const outer_bezelGeom = new THREE.TorusGeometry(0.285, 0.045, 20, 80);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, silverMat);
  outer_bezel.scale.set(ovalXScale, ovalYScale, 1.0);
  outer_bezel.position.z = 0.045;
  root.add(outer_bezel);

  const inner_shadow_grooveGeom = new THREE.TorusGeometry(0.246, 0.009, 12, 72);
  const inner_shadow_groove = new THREE.Mesh(inner_shadow_grooveGeom, darkSilverMat);
  inner_shadow_groove.scale.set(ovalXScale, ovalYScale, 1.0);
  inner_shadow_groove.position.z = 0.071;
  root.add(inner_shadow_groove);

  const inner_polished_lipGeom = new THREE.TorusGeometry(0.258, 0.014, 16, 80);
  const inner_polished_lip = new THREE.Mesh(inner_polished_lipGeom, silverMat);
  inner_polished_lip.scale.set(ovalXScale, ovalYScale, 1.0);
  inner_polished_lip.position.z = 0.083;
  root.add(inner_polished_lip);

  const gemstone_group = new THREE.Group();
  root.add(gemstone_group);

  const gemRx = 0.205;
  const gemRy = 0.285;
  const facetCount = 16;

  function makeOvalRing(scale, z, phase) {
    const pts = [];
    for (let i = 0; i < facetCount; i++) {
      const a = (i + phase) / facetCount * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * gemRx * scale, Math.sin(a) * gemRy * scale, z));
    }
    return pts;
  }

  const outerRing = makeOvalRing(1.0, 0.078, 0.0);
  const middleRing = makeOvalRing(0.68, 0.118, 0.5);
  const tableRing = makeOvalRing(0.36, 0.145, 0.0);
  const centerPoint = new THREE.Vector3(0.012, -0.018, 0.154);

  function pushTriangle(target, a, b, c) {
    target.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
  }

  function makeFacetGeometry(materialIndex) {
    const positions = [];
    const buckets = [[], [], [], []];

    function addTri(a, b, c, matIndex) {
      pushTriangle(buckets[matIndex], a, b, c);
    }

    for (let i = 0; i < facetCount; i++) {
      const j = (i + 1) % facetCount;
      const mi = (i + 1) % 4;
      const mj = (i + 2) % 4;
      const mo = (i + 3) % 4;
      const mt = (i + 1) % 4;

      addTri(outerRing[i], outerRing[j], middleRing[j], mi);
      addTri(outerRing[i], middleRing[j], middleRing[i], mj);

      addTri(middleRing[i], middleRing[j], tableRing[j], mo);
      addTri(middleRing[i], tableRing[j], tableRing[i], mt);

      addTri(tableRing[i], tableRing[j], centerPoint, (i * 3 + 1) % 4);
    }

    for (let i = 0; i < buckets[materialIndex].length; i += 3) {
      positions.push(buckets[materialIndex][i], buckets[materialIndex][i + 1], buckets[materialIndex][i + 2]);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.computeVertexNormals();
    return geom;
  }

  const facet_dark = new THREE.Mesh(makeFacetGeometry(0), facetDarkMat);
  gemstone_group.add(facet_dark);

  const facet_mid = new THREE.Mesh(makeFacetGeometry(1), facetMidMat);
  gemstone_group.add(facet_mid);

  const facet_bright = new THREE.Mesh(makeFacetGeometry(2), facetBrightMat);
  gemstone_group.add(facet_bright);

  const facet_pale = new THREE.Mesh(makeFacetGeometry(3), facetPaleMat);
  gemstone_group.add(facet_pale);

  const girdle_highlightGeom = new THREE.TorusGeometry(0.232, 0.006, 10, 72);
  const girdle_highlight = new THREE.Mesh(girdle_highlightGeom, facetBrightMat);
  girdle_highlight.scale.set(ovalXScale, ovalYScale, 1.0);
  girdle_highlight.position.z = 0.105;
  gemstone_group.add(girdle_highlight);

  const sparkleGeom = new THREE.CircleGeometry(0.006, 10);
  const sparkleMat = new THREE.MeshBasicMaterial({
    color: 0xeafff2,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide
  });
  const gem_sparkles = new THREE.InstancedMesh(sparkleGeom, sparkleMat, 18);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const a = i * 2.399963229728653;
    const r = 0.12 + (i % 6) * 0.025;
    const x = Math.cos(a) * gemRx * r * 0.78;
    const y = Math.sin(a) * gemRy * r * 0.82;
    const s = 0.55 + (i % 4) * 0.18;
    dummy.position.set(x, y, 0.158);
    dummy.rotation.set(0, 0, a * 0.37);
    dummy.scale.set(s, s, 1);
    dummy.updateMatrix();
    gem_sparkles.setMatrixAt(i, dummy.matrix);
  }
  gem_sparkles.instanceMatrix.needsUpdate = true;
  gemstone_group.add(gem_sparkles);

  const scratchPositions = [];
  for (let i = 0; i < 24; i++) {
    const a = i / 24 * Math.PI * 2;
    const r = 0.286 + ((i % 3) - 1) * 0.006;
    const len = 0.018 + (i % 5) * 0.004;
    const tx = -Math.sin(a) * len;
    const ty = Math.cos(a) * len;
    const cx = Math.cos(a) * r * ovalXScale;
    const cy = Math.sin(a) * r * ovalYScale;
    scratchPositions.push(cx - tx, cy - ty, 0.092, cx + tx, cy + ty, 0.092);
  }
  const bezel_scratchesGeom = new THREE.BufferGeometry();
  bezel_scratchesGeom.setAttribute("position", new THREE.Float32BufferAttribute(scratchPositions, 3));
  const bezel_scratches = new THREE.LineSegments(bezel_scratchesGeom, scratchMat);
  root.add(bezel_scratches);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);
  root.position.sub(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.98 / maxDim;
  root.scale.setScalar(scale);
}


export default function generate(THREE) {
  const obj = __sn17_user(THREE);
  if (obj === null || obj === undefined) return obj;
  const root = new THREE.Group();
  const inner = new THREE.Group();
  inner.add(obj);
  root.add(inner);
  const box = new THREE.Box3().setFromObject(inner);
  const size = new THREE.Vector3(); box.getSize(size);
  const ctr = new THREE.Vector3(); box.getCenter(ctr);
  if (isFinite(ctr.x) && isFinite(ctr.y) && isFinite(ctr.z)) inner.position.sub(ctr);
  const m = Math.max(size.x, size.y, size.z);
  if (isFinite(m) && m > 0) root.scale.setScalar(0.98 / m);
  return root;
}
