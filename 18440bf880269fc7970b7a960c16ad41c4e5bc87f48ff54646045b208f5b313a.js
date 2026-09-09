function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "antique_zodiac_dial";

  const dial_body = new THREE.Group();
  dial_body.name = "dial_body";
  root.add(dial_body);

  const central_mechanism = new THREE.Group();
  central_mechanism.name = "central_mechanism";
  root.add(central_mechanism);

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a45,
    metalness: 0.7,
    roughness: 0.32
  });
  const brightBrassMat = new THREE.MeshStandardMaterial({
    color: 0xc3a45b,
    metalness: 0.72,
    roughness: 0.28
  });
  const agedBrassMat = new THREE.MeshStandardMaterial({
    color: 0x806632,
    metalness: 0.62,
    roughness: 0.48
  });
  const darkPatinaMat = new THREE.MeshStandardMaterial({
    color: 0x292925,
    metalness: 0.28,
    roughness: 0.78
  });
  const greenPatinaMat = new THREE.MeshStandardMaterial({
    color: 0x3f4b43,
    metalness: 0.22,
    roughness: 0.82
  });
  const brownPatinaMat = new THREE.MeshStandardMaterial({
    color: 0x4a3430,
    metalness: 0.22,
    roughness: 0.82
  });
  const olivePatinaMat = new THREE.MeshStandardMaterial({
    color: 0x514b38,
    metalness: 0.22,
    roughness: 0.82
  });

  const backing_plateGeom = new THREE.CylinderGeometry(2.96, 2.96, 0.18, 128);
  const backing_plate = new THREE.Mesh(backing_plateGeom, agedBrassMat);
  backing_plate.name = "backing_plate";
  backing_plate.rotation.x = Math.PI / 2;
  dial_body.add(backing_plate);

  const face_plateGeom = new THREE.CircleGeometry(2.79, 128);
  const face_plate = new THREE.Mesh(face_plateGeom, darkPatinaMat);
  face_plate.name = "face_plate";
  face_plate.position.z = 0.096;
  dial_body.add(face_plate);

  const sectorCount = 16;
  const sectorAngle = Math.PI * 2 / sectorCount;
  const patinaMats = [
    greenPatinaMat,
    brownPatinaMat,
    olivePatinaMat,
    greenPatinaMat
  ];

  const outer_patina_sectors = new THREE.Group();
  outer_patina_sectors.name = "outer_patina_sectors";
  for (let i = 0; i < sectorCount; i++) {
    const outer_sectorGeom = new THREE.RingGeometry(
      1.98,
      2.66,
      12,
      1,
      i * sectorAngle + sectorAngle * 0.025,
      sectorAngle - sectorAngle * 0.05
    );
    const outer_sector = new THREE.Mesh(
      outer_sectorGeom,
      patinaMats[(i * 3 + 1) % patinaMats.length]
    );
    outer_sector.name = "outer_patina_sector_" + i;
    outer_sector.position.z = 0.103;
    outer_patina_sectors.add(outer_sector);
  }
  dial_body.add(outer_patina_sectors);

  const inner_patina_sectors = new THREE.Group();
  inner_patina_sectors.name = "inner_patina_sectors";
  for (let i = 0; i < sectorCount; i++) {
    const inner_sectorGeom = new THREE.RingGeometry(
      0.56,
      1.95,
      12,
      1,
      i * sectorAngle + sectorAngle * 0.025,
      sectorAngle - sectorAngle * 0.05
    );
    const inner_sector = new THREE.Mesh(
      inner_sectorGeom,
      patinaMats[(i * 5 + 2) % patinaMats.length]
    );
    inner_sector.name = "inner_patina_sector_" + i;
    inner_sector.position.z = 0.104;
    inner_patina_sectors.add(inner_sector);
  }
  dial_body.add(inner_patina_sectors);

  const center_fieldGeom = new THREE.CircleGeometry(0.58, 96);
  const center_field = new THREE.Mesh(center_fieldGeom, brownPatinaMat);
  center_field.name = "center_field";
  center_field.position.z = 0.105;
  dial_body.add(center_field);

  const outer_scale_bandGeom = new THREE.RingGeometry(2.67, 2.82, 128);
  const outer_scale_band = new THREE.Mesh(outer_scale_bandGeom, darkPatinaMat);
  outer_scale_band.name = "outer_scale_band";
  outer_scale_band.position.z = 0.108;
  dial_body.add(outer_scale_band);

  const outer_rimGeom = new THREE.TorusGeometry(2.9, 0.105, 16, 160);
  const outer_rim = new THREE.Mesh(outer_rimGeom, brassMat);
  outer_rim.name = "outer_rim";
  outer_rim.position.z = 0.105;
  dial_body.add(outer_rim);

  const outer_lipGeom = new THREE.TorusGeometry(2.99, 0.035, 10, 160);
  const outer_lip = new THREE.Mesh(outer_lipGeom, brightBrassMat);
  outer_lip.name = "outer_lip";
  outer_lip.position.z = 0.13;
  dial_body.add(outer_lip);

  const inner_rimGeom = new THREE.TorusGeometry(2.79, 0.025, 8, 144);
  const inner_rim = new THREE.Mesh(inner_rimGeom, brightBrassMat);
  inner_rim.name = "inner_rim";
  inner_rim.position.z = 0.135;
  dial_body.add(inner_rim);

  const outer_scale_inner_ringGeom = new THREE.TorusGeometry(2.65, 0.018, 8, 144);
  const outer_scale_inner_ring = new THREE.Mesh(outer_scale_inner_ringGeom, brassMat);
  outer_scale_inner_ring.name = "outer_scale_inner_ring";
  outer_scale_inner_ring.position.z = 0.135;
  dial_body.add(outer_scale_inner_ring);

  const outer_band_dividerGeom = new THREE.TorusGeometry(2.49, 0.017, 8, 144);
  const outer_band_divider = new THREE.Mesh(outer_band_dividerGeom, brassMat);
  outer_band_divider.name = "outer_band_divider";
  outer_band_divider.position.z = 0.134;
  dial_body.add(outer_band_divider);

  const middle_concentric_ringGeom = new THREE.TorusGeometry(1.97, 0.018, 8, 128);
  const middle_concentric_ring = new THREE.Mesh(middle_concentric_ringGeom, brassMat);
  middle_concentric_ring.name = "middle_concentric_ring";
  middle_concentric_ring.position.z = 0.134;
  dial_body.add(middle_concentric_ring);

  const inner_concentric_ringGeom = new THREE.TorusGeometry(1.34, 0.016, 8, 112);
  const inner_concentric_ring = new THREE.Mesh(inner_concentric_ringGeom, brassMat);
  inner_concentric_ring.name = "inner_concentric_ring";
  inner_concentric_ring.position.z = 0.134;
  dial_body.add(inner_concentric_ring);

  const hub_concentric_ringGeom = new THREE.TorusGeometry(0.61, 0.015, 8, 96);
  const hub_concentric_ring = new THREE.Mesh(hub_concentric_ringGeom, brassMat);
  hub_concentric_ring.name = "hub_concentric_ring";
  hub_concentric_ring.position.z = 0.134;
  dial_body.add(hub_concentric_ring);

  const radial_spokesGeom = new THREE.BoxGeometry(0.026, 2.42, 0.028);
  const radial_spokes = new THREE.InstancedMesh(radial_spokesGeom, brassMat, 16);
  radial_spokes.name = "radial_spokes";
  const spokeDummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const angle = i * sectorAngle;
    spokeDummy.position.set(Math.cos(angle) * 1.27, Math.sin(angle) * 1.27, 0.139);
    spokeDummy.rotation.set(0, 0, angle - Math.PI / 2);
    spokeDummy.updateMatrix();
    radial_spokes.setMatrixAt(i, spokeDummy.matrix);
  }
  radial_spokes.instanceMatrix.needsUpdate = true;
  dial_body.add(radial_spokes);

  const outer_tick_marksGeom = new THREE.BoxGeometry(0.012, 0.085, 0.025);
  const outer_tick_marks = new THREE.InstancedMesh(outer_tick_marksGeom, brightBrassMat, 96);
  outer_tick_marks.name = "outer_tick_marks";
  const tickDummy = new THREE.Object3D();
  for (let i = 0; i < 96; i++) {
    const angle = i / 96 * Math.PI * 2;
    const major = i % 8 === 0;
    tickDummy.position.set(Math.cos(angle) * 2.735, Math.sin(angle) * 2.735, 0.151);
    tickDummy.rotation.set(0, 0, angle - Math.PI / 2);
    tickDummy.scale.set(major ? 1.35 : 1, major ? 1.55 : 1, 1);
    tickDummy.updateMatrix();
    outer_tick_marks.setMatrixAt(i, tickDummy.matrix);
  }
  outer_tick_marks.instanceMatrix.needsUpdate = true;
  dial_body.add(outer_tick_marks);

  const inner_tick_marksGeom = new THREE.BoxGeometry(0.009, 0.052, 0.021);
  const inner_tick_marks = new THREE.InstancedMesh(inner_tick_marksGeom, brassMat, 64);
  inner_tick_marks.name = "inner_tick_marks";
  for (let i = 0; i < 64; i++) {
    const angle = i / 64 * Math.PI * 2;
    inner_tick_marks.position.set(0, 0, 0);
    tickDummy.position.set(Math.cos(angle) * 2.59, Math.sin(angle) * 2.59, 0.148);
    tickDummy.rotation.set(0, 0, angle - Math.PI / 2);
    tickDummy.scale.set(1, i % 4 === 0 ? 1.35 : 1, 1);
    tickDummy.updateMatrix();
    inner_tick_marks.setMatrixAt(i, tickDummy.matrix);
  }
  inner_tick_marks.instanceMatrix.needsUpdate = true;
  dial_body.add(inner_tick_marks);

  const rayShape = new THREE.Shape();
  rayShape.moveTo(-0.075, 0.18);
  rayShape.lineTo(0, 2.22);
  rayShape.lineTo(0.075, 0.18);
  rayShape.lineTo(0, 0.08);
  rayShape.closePath();

  const sun_raysGeom = new THREE.ExtrudeGeometry(rayShape, {
    depth: 0.035,
    steps: 1
  });
  const sun_rays = new THREE.InstancedMesh(sun_raysGeom, brightBrassMat, 8);
  sun_rays.name = "sun_rays";
  const rayDummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    rayDummy.position.set(0, 0, 0.158);
    rayDummy.rotation.set(0, 0, i * Math.PI / 4);
    rayDummy.updateMatrix();
    sun_rays.setMatrixAt(i, rayDummy.matrix);
  }
  sun_rays.instanceMatrix.needsUpdate = true;
  central_mechanism.add(sun_rays);

  const shadowRayShape = new THREE.Shape();
  shadowRayShape.moveTo(-0.045, 0.18);
  shadowRayShape.lineTo(0, 1.86);
  shadowRayShape.lineTo(0.045, 0.18);
  shadowRayShape.lineTo(0, 0.09);
  shadowRayShape.closePath();

  const sun_rays_shadowGeom = new THREE.ExtrudeGeometry(shadowRayShape, {
    depth: 0.024,
    steps: 1
  });
  const sun_rays_shadow = new THREE.InstancedMesh(sun_rays_shadowGeom, agedBrassMat, 8);
  sun_rays_shadow.name = "sun_rays_shadow";
  for (let i = 0; i < 8; i++) {
    rayDummy.position.set(0, 0, 0.154);
    rayDummy.rotation.set(0, 0, i * Math.PI / 4 + Math.PI / 8);
    rayDummy.updateMatrix();
    sun_rays_shadow.setMatrixAt(i, rayDummy.matrix);
  }
  sun_rays_shadow.instanceMatrix.needsUpdate = true;
  central_mechanism.add(sun_rays_shadow);

  const central_hubGeom = new THREE.SphereGeometry(0.31, 48, 24);
  const central_hub = new THREE.Mesh(central_hubGeom, brightBrassMat);
  central_hub.name = "central_hub";
  central_hub.scale.set(1, 1, 0.42);
  central_hub.position.z = 0.215;
  central_mechanism.add(central_hub);

  const central_hub_ringGeom = new THREE.TorusGeometry(0.285, 0.025, 10, 72);
  const central_hub_ring = new THREE.Mesh(central_hub_ringGeom, agedBrassMat);
  central_hub_ring.name = "central_hub_ring";
  central_hub_ring.position.z = 0.252;
  central_mechanism.add(central_hub_ring);

  const zodiac_symbols = new THREE.Group();
  zodiac_symbols.name = "zodiac_symbols";
  dial_body.add(zodiac_symbols);

  const symbol_strokeGeom = new THREE.BoxGeometry(1, 1, 1);

  function addSymbolStroke(parent, x1, y1, x2, y2, width) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const symbol_stroke = new THREE.Mesh(symbol_strokeGeom, brightBrassMat);
    symbol_stroke.name = "symbol_stroke";
    symbol_stroke.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0);
    symbol_stroke.rotation.z = Math.atan2(dy, dx) - Math.PI / 2;
    symbol_stroke.scale.set(width, length, 0.035);
    parent.add(symbol_stroke);
    return symbol_stroke;
  }

  function addSymbolLoop(parent, x, y, rx, ry, width) {
    const symbol_loopGeom = new THREE.TorusGeometry(rx, width * 0.38, 6, 28);
    const symbol_loop = new THREE.Mesh(symbol_loopGeom, brightBrassMat);
    symbol_loop.name = "symbol_loop";
    symbol_loop.position.set(x, y, 0);
    symbol_loop.scale.y = ry / rx;
    parent.add(symbol_loop);
    return symbol_loop;
  }

  function createGlyph(type) {
    const glyph = new THREE.Group();

    if (type === "gemini") {
      addSymbolStroke(glyph, -0.11, -0.19, -0.11, 0.19, 0.027);
      addSymbolStroke(glyph, 0.11, -0.19, 0.11, 0.19, 0.027);
      addSymbolStroke(glyph, -0.16, 0.19, 0.16, 0.19, 0.027);
      addSymbolStroke(glyph, -0.16, -0.19, 0.16, -0.19, 0.027);
    } else if (type === "taurus") {
      addSymbolLoop(glyph, 0, -0.07, 0.105, 0.085, 0.026);
      addSymbolStroke(glyph, -0.075, 0.01, -0.15, 0.18, 0.027);
      addSymbolStroke(glyph, 0.075, 0.01, 0.15, 0.18, 0.027);
    } else if (type === "aries") {
      addSymbolStroke(glyph, 0, -0.19, 0, 0.04, 0.028);
      addSymbolStroke(glyph, 0, 0.03, -0.09, 0.18, 0.028);
      addSymbolStroke(glyph, 0, 0.03, 0.09, 0.18, 0.028);
      addSymbolStroke(glyph, -0.12, 0.15, -0.055, 0.12, 0.024);
      addSymbolStroke(glyph, 0.12, 0.15, 0.055, 0.12, 0.024);
    } else if (type === "pisces") {
      addSymbolStroke(glyph, -0.12, -0.2, -0.12, 0.2, 0.027);
      addSymbolStroke(glyph, 0.12, -0.2, 0.12, 0.2, 0.027);
      addSymbolStroke(glyph, -0.16, 0.2, 0.16, -0.2, 0.027);
    } else if (type === "libra") {
      addSymbolStroke(glyph, -0.16, -0.12, 0.16, -0.12, 0.027);
      addSymbolStroke(glyph, -0.16, -0.03, -0.16, 0.1, 0.027);
      addSymbolStroke(glyph, 0.16, -0.03, 0.16, 0.1, 0.027);
      addSymbolStroke(glyph, -0.16, 0.1, 0, 0.17, 0.027);
      addSymbolStroke(glyph, 0, 0.17, 0.16, 0.1, 0.027);
    } else if (type === "capricorn") {
      addSymbolStroke(glyph, -0.15, -0.18, 0, 0.02, 0.028);
      addSymbolStroke(glyph, 0, 0.02, 0.15, -0.16, 0.028);
      addSymbolLoop(glyph, 0.08, -0.09, 0.065, 0.055, 0.024);
      addSymbolStroke(glyph, -0.15, -0.18, -0.19, -0.08, 0.024);
    } else if (type === "aquarius") {
      addSymbolStroke(glyph, -0.17, 0.08, -0.06, 0.14, 0.026);
      addSymbolStroke(glyph, -0.06, 0.14, 0.05, 0.08, 0.026);
      addSymbolStroke(glyph, 0.05, 0.08, 0.17, 0.14, 0.026);
      addSymbolStroke(glyph, -0.17, -0.08, -0.06, -0.02, 0.026);
      addSymbolStroke(glyph, -0.06, -0.02, 0.05, -0.08, 0.026);
      addSymbolStroke(glyph, 0.05, -0.08, 0.17, -0.02, 0.026);
    } else if (type === "leo") {
      addSymbolLoop(glyph, -0.07, -0.07, 0.08, 0.07, 0.026);
      addSymbolStroke(glyph, -0.01, 0, 0.08, 0.17, 0.028);
      addSymbolStroke(glyph, 0.08, 0.17, 0.16, 0.08, 0.027);
      addSymbolStroke(glyph, 0.16, 0.08, 0.1, -0.02, 0.027);
      addSymbolStroke(glyph, 0.1, -0.02, 0.17, -0.13, 0.027);
    } else if (type === "sagittarius") {
      addSymbolStroke(glyph, -0.15, -0.16, 0.15, 0.15, 0.029);
      addSymbolStroke(glyph, 0.15, 0.15, 0.04, 0.14, 0.027);
      addSymbolStroke(glyph, 0.15, 0.15, 0.14, 0.04, 0.027);
      addSymbolStroke(glyph, -0.08, 0.08, 0.08, -0.08, 0.025);
    } else if (type === "scorpio") {
      addSymbolStroke(glyph, -0.16, -0.16, -0.16, 0.12, 0.026);
      addSymbolStroke(glyph, -0.16, 0.12, 0, 0.02, 0.026);
      addSymbolStroke(glyph, 0, 0.02, 0.14, 0.13, 0.026);
      addSymbolStroke(glyph, 0.14, 0.13, 0.14, -0.12, 0.026);
      addSymbolStroke(glyph, 0.14, -0.12, 0.04, -0.18, 0.026);
      addSymbolStroke(glyph, 0.04, -0.18, 0.09, -0.09, 0.023);
    } else if (type === "cancer") {
      addSymbolLoop(glyph, -0.08, 0.07, 0.055, 0.045, 0.024);
      addSymbolLoop(glyph, 0.08, -0.07, 0.055, 0.045, 0.024);
      addSymbolStroke(glyph, -0.15, 0.04, 0.15, 0.04, 0.025);
      addSymbolStroke(glyph, -0.15, -0.04, 0.15, -0.04, 0.025);
    } else if (type === "horse") {
      addSymbolLoop(glyph, -0.035, 0.01, 0.14, 0.075, 0.025);
      addSymbolStroke(glyph, 0.075, 0.06, 0.13, 0.19, 0.026);
      addSymbolStroke(glyph, 0.13, 0.19, 0.2, 0.16, 0.025);
      addSymbolStroke(glyph, 0.055, -0.055, 0.035, -0.2, 0.025);
      addSymbolStroke(glyph, -0.09, -0.055, -0.11, -0.2, 0.025);
      addSymbolStroke(glyph, -0.16, 0.035, -0.22, 0.09, 0.023);
      addSymbolStroke(glyph, -0.16, 0.015, -0.22, -0.04, 0.023);
    } else if (type === "lyre") {
      addSymbolStroke(glyph, -0.13, -0.19, -0.13, 0.18, 0.027);
      addSymbolStroke(glyph, 0.13, -0.19, 0.13, 0.18, 0.027);
      addSymbolStroke(glyph, -0.13, 0.18, 0, 0.22, 0.027);
      addSymbolStroke(glyph, 0, 0.22, 0.13, 0.18, 0.027);
      addSymbolStroke(glyph, -0.1, 0.04, 0.1, 0.04, 0.023);
      addSymbolStroke(glyph, -0.08, -0.08, 0.08, -0.08, 0.023);
      addSymbolStroke(glyph, -0.055, -0.19, 0.055, -0.19, 0.023);
    } else if (type === "staff") {
      addSymbolStroke(glyph, -0.04, -0.2, -0.04, 0.2, 0.029);
      addSymbolStroke(glyph, -0.13, 0.16, 0.05, 0.16, 0.026);
      addSymbolStroke(glyph, -0.04, -0.16, 0.1, -0.08, 0.026);
      addSymbolStroke(glyph, 0.1, -0.08, 0.14, 0.02, 0.026);
      addSymbolLoop(glyph, -0.09, 0.1, 0.04, 0.035, 0.021);
    }

    return glyph;
  }

  function placeGlyph(glyph, index, radius, scale) {
    const angle = Math.PI / 2 - index * sectorAngle;
    glyph.name = "zodiac_symbol_" + index;
    glyph.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.174
    );
    glyph.rotation.z = angle - Math.PI / 2;
    glyph.scale.setScalar(scale);
    zodiac_symbols.add(glyph);
  }

  placeGlyph(createGlyph("gemini"), 0, 2.31, 0.9);
  placeGlyph(createGlyph("taurus"), 1, 2.31, 0.86);
  placeGlyph(createGlyph("aries"), 2, 2.31, 0.86);
  placeGlyph(createGlyph("pisces"), 3, 2.31, 0.84);
  placeGlyph(createGlyph("libra"), 4, 2.31, 0.84);
  placeGlyph(createGlyph("capricorn"), 5, 2.31, 0.82);
  placeGlyph(createGlyph("aquarius"), 6, 2.31, 0.82);
  placeGlyph(createGlyph("leo"), 7, 2.31, 0.86);
  placeGlyph(createGlyph("sagittarius"), 8, 2.31, 0.82);
  placeGlyph(createGlyph("scorpio"), 9, 2.31, 0.82);
  placeGlyph(createGlyph("cancer"), 10, 2.31, 0.82);
  placeGlyph(createGlyph("horse"), 11, 2.31, 0.82);
  placeGlyph(createGlyph("lyre"), 12, 2.31, 0.84);
  placeGlyph(createGlyph("staff"), 13, 2.31, 0.84);
  placeGlyph(createGlyph("gemini"), 14, 2.31, 0.88);
  placeGlyph(createGlyph("taurus"), 15, 2.31, 0.86);

  const pedestal_footGeom = new THREE.SphereGeometry(0.34, 36, 18);
  const pedestal_foot = new THREE.Mesh(pedestal_footGeom, agedBrassMat);
  pedestal_foot.name = "pedestal_foot";
  pedestal_foot.scale.set(1, 0.34, 0.55);
  pedestal_foot.position.set(0, -3.01, -0.055);
  root.add(pedestal_foot);

  const pedestal_neckGeom = new THREE.CylinderGeometry(0.13, 0.18, 0.2, 28);
  const pedestal_neck = new THREE.Mesh(pedestal_neckGeom, agedBrassMat);
  pedestal_neck.name = "pedestal_neck";
  pedestal_neck.position.set(0, -2.91, -0.045);
  root.add(pedestal_neck);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    object.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 0.98 / maxDim;
      object.scale.setScalar(scale);
    }
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
