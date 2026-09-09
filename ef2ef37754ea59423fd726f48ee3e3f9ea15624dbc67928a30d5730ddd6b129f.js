function __sn17_user(THREE) {
  const root = new THREE.Group();

  const silver_glitter_mat = new THREE.MeshStandardMaterial({
    color: 0xbfc0bd,
    metalness: 0.35,
    roughness: 0.28,
    side: THREE.DoubleSide,
  });
  const dark_glitter_mat = new THREE.MeshStandardMaterial({
    color: 0x55585a,
    metalness: 0.25,
    roughness: 0.45,
    side: THREE.DoubleSide,
  });
  const black_fabric_mat = new THREE.MeshStandardMaterial({
    color: 0x111214,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const black_ribbon_mat = new THREE.MeshStandardMaterial({
    color: 0x08090a,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const gold_button_mat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.65,
    roughness: 0.22,
  });
  const bright_glitter_mat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.012,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  });
  const dark_glitter_points_mat = new THREE.PointsMaterial({
    color: 0x66696b,
    size: 0.008,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  });

  function brimHeight(r, angle) {
    const edge = Math.max(0, (r - 0.58) / 0.42);
    return 0.012 + edge * edge * 0.045 - Math.sin(angle) * edge * 0.018;
  }

  function crownTopY(angle) {
    return 0.525 - Math.cos(angle * 2) * 0.028;
  }

  function crownRadiusAt(y, angle) {
    const t = Math.max(0, Math.min(1, y / 0.52));
    const base = 0.36 - 0.085 * t;
    const pinch = Math.pow(t, 1.7) * Math.cos(angle * 2) * 0.025;
    return base - pinch;
  }

  function makeBrimGeometry() {
    const seg = 96;
    const rings = 12;
    const pos = [];
    const idx = [];
    for (let j = 0; j <= rings; j++) {
      const r = 0.34 + (0.98 - 0.34) * (j / rings);
      for (let i = 0; i <= seg; i++) {
        const a = i / seg * Math.PI * 2;
        pos.push(Math.cos(a) * r, brimHeight(r, a), Math.sin(a) * r);
      }
    }
    for (let j = 0; j < rings; j++) {
      for (let i = 0; i < seg; i++) {
        const a = j * (seg + 1) + i;
        const b = a + 1;
        const c = a + seg + 1;
        const d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geom.setIndex(idx);
    geom.computeVertexNormals();
    return geom;
  }

  function makeCrownGeometry() {
    const seg = 96;
    const sides = 10;
    const pos = [];
    const idx = [];
    for (let j = 0; j <= sides; j++) {
      const t = j / sides;
      const y = 0.035 + t * 0.485;
      for (let i = 0; i <= seg; i++) {
        const a = i / seg * Math.PI * 2;
        const r = crownRadiusAt(y, a);
        const topDrop = Math.pow(t, 8) * (crownTopY(a) - 0.525);
        pos.push(Math.cos(a) * r, y + topDrop, Math.sin(a) * r);
      }
    }
    for (let j = 0; j < sides; j++) {
      for (let i = 0; i < seg; i++) {
        const a = j * (seg + 1) + i;
        const b = a + 1;
        const c = a + seg + 1;
        const d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geom.setIndex(idx);
    geom.computeVertexNormals();
    return geom;
  }

  function makeTopGeometry() {
    const seg = 96;
    const rings = 8;
    const pos = [0, 0.492, 0];
    const idx = [];
    for (let j = 1; j <= rings; j++) {
      const f = j / rings;
      for (let i = 0; i <= seg; i++) {
        const a = i / seg * Math.PI * 2;
        const edgeR = crownRadiusAt(0.525, a);
        const r = edgeR * f;
        const y = 0.492 + 0.033 * f * f - 0.018 * Math.cos(a * 2) * f * f;
        pos.push(Math.cos(a) * r, y, Math.sin(a) * r);
      }
    }
    for (let i = 0; i < seg; i++) {
      idx.push(0, i + 2, i + 1);
    }
    for (let j = 1; j < rings; j++) {
      const innerStart = 1 + (j - 1) * (seg + 1);
      const outerStart = 1 + j * (seg + 1);
      for (let i = 0; i < seg; i++) {
        const a = innerStart + i;
        const b = a + 1;
        const c = outerStart + i;
        const d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geom.setIndex(idx);
    geom.computeVertexNormals();
    return geom;
  }

  function makeBandGeometry() {
    const seg = 96;
    const pos = [];
    const idx = [];
    const y0 = 0.075;
    const y1 = 0.225;
    const r0 = crownRadiusAt(y0, 0) + 0.006;
    const r1 = crownRadiusAt(y1, 0) + 0.006;
    for (let i = 0; i <= seg; i++) {
      const a = i / seg * Math.PI * 2;
      pos.push(Math.cos(a) * r0, y0, Math.sin(a) * r0);
      pos.push(Math.cos(a) * r1, y1, Math.sin(a) * r1);
    }
    for (let i = 0; i < seg; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      idx.push(a, c, b, b, c, d);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geom.setIndex(idx);
    geom.computeVertexNormals();
    return geom;
  }

  function makeBowLoopGeometry(side) {
    const shape = new THREE.Shape();
    shape.moveTo(0.0, 0.0);
    shape.lineTo(side * 0.165, 0.075);
    shape.lineTo(side * 0.185, -0.075);
    shape.lineTo(0.0, -0.018);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.018,
      steps: 1,
      curveSegments: 8,
    });
  }

  function makeBrightGlitterGeometry(count, phase) {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const u = ((i * 37 + phase * 11) % 101) / 100;
      const v = ((i * 61 + phase * 17) % 103) / 102;
      const a = u * Math.PI * 2;
      const y = 0.055 + v * 0.455;
      const r = crownRadiusAt(y, a) + 0.006;
      pos.push(Math.cos(a) * r, y, Math.sin(a) * r);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return geom;
  }

  function makeDarkGlitterGeometry(count, phase) {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const u = ((i * 29 + phase * 7) % 97) / 96;
      const v = ((i * 43 + phase * 13) % 89) / 88;
      const a = u * Math.PI * 2;
      const y = 0.06 + v * 0.44;
      const r = crownRadiusAt(y, a) + 0.004;
      pos.push(Math.cos(a) * r, y, Math.sin(a) * r);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return geom;
  }

  function makeBrimGlitterGeometry(count, phase) {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const u = ((i * 31 + phase * 19) % 107) / 106;
      const v = ((i * 47 + phase * 23) % 109) / 108;
      const a = u * Math.PI * 2;
      const r = 0.39 + v * 0.55;
      pos.push(Math.cos(a) * r, brimHeight(r, a) + 0.006, Math.sin(a) * r);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return geom;
  }

  const brim_geom = makeBrimGeometry();
  const brim = new THREE.Mesh(brim_geom, silver_glitter_mat);
  root.add(brim);

  const crown_geom = makeCrownGeometry();
  const crown = new THREE.Mesh(crown_geom, silver_glitter_mat);
  root.add(crown);

  const top_dent_geom = makeTopGeometry();
  const top_dent = new THREE.Mesh(top_dent_geom, silver_glitter_mat);
  root.add(top_dent);

  const black_band_geom = makeBandGeometry();
  const black_band = new THREE.Mesh(black_band_geom, black_fabric_mat);
  root.add(black_band);

  const band_top_seam_geom = new THREE.TorusGeometry(0.352, 0.006, 8, 96);
  const band_top_seam = new THREE.Mesh(band_top_seam_geom, black_ribbon_mat);
  band_top_seam.rotation.x = Math.PI / 2;
  band_top_seam.position.y = 0.225;
  root.add(band_top_seam);

  const band_bottom_seam_geom = new THREE.TorusGeometry(0.365, 0.006, 8, 96);
  const band_bottom_seam = new THREE.Mesh(band_bottom_seam_geom, black_ribbon_mat);
  band_bottom_seam.rotation.x = Math.PI / 2;
  band_bottom_seam.position.y = 0.075;
  root.add(band_bottom_seam);

  const left_bow_loop_geom = makeBowLoopGeometry(-1);
  const left_bow_loop = new THREE.Mesh(left_bow_loop_geom, black_ribbon_mat);
  left_bow_loop.position.set(-0.015, 0.15, 0.355);
  root.add(left_bow_loop);

  const right_bow_loop_geom = makeBowLoopGeometry(1);
  const right_bow_loop = new THREE.Mesh(right_bow_loop_geom, black_ribbon_mat);
  right_bow_loop.position.set(0.015, 0.15, 0.355);
  root.add(right_bow_loop);

  const bow_knot_geom = new THREE.SphereGeometry(0.045, 24, 12);
  const bow_knot = new THREE.Mesh(bow_knot_geom, black_ribbon_mat);
  bow_knot.scale.set(0.8, 1.0, 0.35);
  bow_knot.position.set(0, 0.15, 0.382);
  root.add(bow_knot);

  const gold_button_base_geom = new THREE.CylinderGeometry(0.055, 0.055, 0.018, 48);
  const gold_button_base = new THREE.Mesh(gold_button_base_geom, gold_button_mat);
  gold_button_base.rotation.x = Math.PI / 2;
  gold_button_base.position.set(0, 0.15, 0.405);
  root.add(gold_button_base);

  const gold_button_ring_geom = new THREE.TorusGeometry(0.043, 0.006, 8, 48);
  const gold_button_ring = new THREE.Mesh(gold_button_ring_geom, gold_button_mat);
  gold_button_ring.position.set(0, 0.15, 0.416);
  root.add(gold_button_ring);

  const gold_button_center_geom = new THREE.SphereGeometry(0.018, 24, 12);
  const gold_button_center = new THREE.Mesh(gold_button_center_geom, gold_button_mat);
  gold_button_center.scale.set(1, 1, 0.45);
  gold_button_center.position.set(0, 0.15, 0.421);
  root.add(gold_button_center);

  const gold_button_rays_geom = new THREE.BoxGeometry(0.006, 0.034, 0.006);
  const gold_button_rays = new THREE.InstancedMesh(gold_button_rays_geom, gold_button_mat, 18);
  const ray_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const a = i / 18 * Math.PI * 2;
    ray_dummy.position.set(Math.cos(a) * 0.027, 0.15 + Math.sin(a) * 0.027, 0.419);
    ray_dummy.rotation.set(0, 0, a - Math.PI / 2);
    ray_dummy.updateMatrix();
    gold_button_rays.setMatrixAt(i, ray_dummy.matrix);
  }
  root.add(gold_button_rays);

  const crown_bright_glitter_geom = makeBrightGlitterGeometry(220, 1);
  const crown_bright_glitter = new THREE.Points(crown_bright_glitter_geom, bright_glitter_mat);
  root.add(crown_bright_glitter);

  const crown_dark_glitter_geom = makeDarkGlitterGeometry(180, 2);
  const crown_dark_glitter = new THREE.Points(crown_dark_glitter_geom, dark_glitter_points_mat);
  root.add(crown_dark_glitter);

  const brim_glitter_geom = makeBrimGlitterGeometry(260, 3);
  const brim_glitter = new THREE.Points(brim_glitter_geom, bright_glitter_mat);
  root.add(brim_glitter);

  const brim_edge_geom = new THREE.TorusGeometry(0.98, 0.012, 10, 128);
  const brim_edge = new THREE.Mesh(brim_edge_geom, silver_glitter_mat);
  brim_edge.rotation.x = Math.PI / 2;
  brim_edge.position.y = brimHeight(0.98, 0) + 0.002;
  root.add(brim_edge);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 0.95 / maxDim;
      object.scale.setScalar(scale);
      object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    }
    object.updateMatrixWorld(true);
  }
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
