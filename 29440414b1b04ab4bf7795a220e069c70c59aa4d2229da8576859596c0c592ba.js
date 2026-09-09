function __sn17_user(THREE) {
  const root = new THREE.Group();

  const silverMat = new THREE.MeshStandardMaterial({ color: 0xe8e8e8, metalness: true, roughness: 0.25 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, metalness: true, roughness: 0.45 });
  const shadowMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: false, roughness: 0.8 });
  const facetMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: false,
    roughness: 0.18,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const highlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.65, side: THREE.DoubleSide });

  const clearGemMat = new THREE.MeshPhysicalMaterial({
    color: 0xf8ffff,
    metalness: false,
    roughness: 0.12,
    transparent: true,
    opacity: 0.72,
    transmission: 0.35
  });
  const pinkGemMat = new THREE.MeshPhysicalMaterial({
    color: 0xffb6d8,
    metalness: false,
    roughness: 0.14,
    transparent: true,
    opacity: 0.72,
    transmission: 0.28
  });
  const blueGemMat = new THREE.MeshPhysicalMaterial({
    color: 0xbfeeff,
    metalness: false,
    roughness: 0.14,
    transparent: true,
    opacity: 0.72,
    transmission: 0.28
  });
  const greenGemMat = new THREE.MeshPhysicalMaterial({
    color: 0xcff2c8,
    metalness: false,
    roughness: 0.14,
    transparent: true,
    opacity: 0.72,
    transmission: 0.28
  });
  const yellowGemMat = new THREE.MeshPhysicalMaterial({
    color: 0xffe28a,
    metalness: false,
    roughness: 0.14,
    transparent: true,
    opacity: 0.72,
    transmission: 0.25
  });
  const purpleGemMat = new THREE.MeshPhysicalMaterial({
    color: 0xd8c6ff,
    metalness: false,
    roughness: 0.14,
    transparent: true,
    opacity: 0.72,
    transmission: 0.28
  });

  const ringRadius = 1.0;
  const segmentCount = 28;
  const step = Math.PI * 2 / segmentCount;
  const dummy = new THREE.Object3D();

  function setRingPose(object, angle, radius, y, tangentOffset) {
    object.position.set(Math.sin(angle) * radius, y, Math.cos(angle) * radius);
    object.rotation.set(0, angle, 0);
    object.translateX(tangentOffset || 0);
  }

  const bracelet_bodyGeom = new THREE.TorusGeometry(ringRadius, 0.145, 18, 160);
  const bracelet_body = new THREE.Mesh(bracelet_bodyGeom, silverMat);
  bracelet_body.rotation.x = Math.PI / 2;
  bracelet_body.position.y = -0.015;
  root.add(bracelet_body);

  const outer_railGeom = new THREE.TorusGeometry(1.145, 0.035, 12, 160);
  const outer_rail = new THREE.Mesh(outer_railGeom, silverMat);
  outer_rail.rotation.x = Math.PI / 2;
  outer_rail.position.y = 0.105;
  root.add(outer_rail);

  const inner_railGeom = new THREE.TorusGeometry(0.855, 0.035, 12, 160);
  const inner_rail = new THREE.Mesh(inner_railGeom, silverMat);
  inner_rail.rotation.x = Math.PI / 2;
  inner_rail.position.y = 0.105;
  root.add(inner_rail);

  const lower_shadow_grooveGeom = new THREE.TorusGeometry(1.0, 0.018, 8, 160);
  const lower_shadow_groove = new THREE.Mesh(lower_shadow_grooveGeom, darkMetalMat);
  lower_shadow_groove.rotation.x = Math.PI / 2;
  lower_shadow_groove.position.y = -0.135;
  root.add(lower_shadow_groove);

  const panel_seamGeom = new THREE.BoxGeometry(0.018, 0.255, 0.03);
  const panel_seams = new THREE.InstancedMesh(panel_seamGeom, darkMetalMat, segmentCount);
  for (let i = 0; i < segmentCount; i++) {
    const a = (i + 0.5) * step;
    setRingPose(dummy, a, 1.145, -0.005, 0);
    dummy.updateMatrix();
    panel_seams.setMatrixAt(i, dummy.matrix);
  }
  root.add(panel_seams);

  const front_plateGeom = new THREE.BoxGeometry(0.205, 0.245, 0.055);
  const front_plates = new THREE.InstancedMesh(front_plateGeom, silverMat, segmentCount);
  for (let i = 0; i < segmentCount; i++) {
    const a = i * step;
    setRingPose(dummy, a, 1.145, 0.005, 0);
    dummy.updateMatrix();
    front_plates.setMatrixAt(i, dummy.matrix);
  }
  root.add(front_plates);

  const top_link_barGeom = new THREE.BoxGeometry(0.225, 0.035, 0.205);
  const top_link_bars = new THREE.InstancedMesh(top_link_barGeom, silverMat, segmentCount);
  for (let i = 0; i < segmentCount; i++) {
    const a = i * step;
    setRingPose(dummy, a, 1.0, 0.145, 0);
    dummy.updateMatrix();
    top_link_bars.setMatrixAt(i, dummy.matrix);
  }
  root.add(top_link_bars);

  const inner_shadow_slotGeom = new THREE.BoxGeometry(0.055, 0.125, 0.012);
  const inner_shadow_slots = new THREE.InstancedMesh(inner_shadow_slotGeom, shadowMat, 14);
  for (let i = 0; i < 14; i++) {
    const a = (i * 2 + 0.5) * step;
    setRingPose(dummy, a, 0.852, -0.005, 0);
    dummy.updateMatrix();
    inner_shadow_slots.setMatrixAt(i, dummy.matrix);
  }
  root.add(inner_shadow_slots);

  const gemstoneGeom = new THREE.CylinderGeometry(1, 1, 1, 24);
  const gemstoneMats = [clearGemMat, pinkGemMat, blueGemMat, greenGemMat, yellowGemMat, purpleGemMat];
  const gemstoneGroups = [[], [], [], [], [], []];
  const gemData = [];

  for (let i = 0; i < segmentCount; i++) {
    const a = i * step;
    const mainR = i === 0 ? 0.14 : (i % 6 === 2 || i % 6 === 5 ? 0.108 : 0.118);
    const mainY = i === 0 ? 0.005 : 0.025;
    const mainColor = i === 0 ? 1 : (i % 6 === 0 ? 0 : (i % 6 === 1 ? 1 : (i % 6 === 2 ? 2 : (i % 6 === 3 ? 3 : (i % 6 === 4 ? 0 : 5)))));
    gemData.push({ angle: a, radius: 1.16, y: mainY, r: mainR, color: mainColor, tangent: 0 });
    gemstoneGroups[mainColor].push(gemData[gemData.length - 1]);

    if (i % 2 === 0) {
      const smallR = 0.072 + (i % 4 === 0 ? 0.012 : 0);
      const smallY = -0.085 + (i % 4 === 0 ? 0.018 : 0);
      const smallColor = i % 4 === 0 ? 4 : (i % 4 === 2 ? 2 : 0);
      gemData.push({ angle: a, radius: 1.16, y: smallY, r: smallR, color: smallColor, tangent: 0 });
      gemstoneGroups[smallColor].push(gemData[gemData.length - 1]);
    }

    if (i % 3 !== 1) {
      const sideR = 0.064 + (i % 3 === 0 ? 0.012 : 0);
      const sideTangent = i % 2 === 0 ? 0.105 : -0.105;
      const sideColor = i % 5 === 0 ? 5 : (i % 5 === 1 ? 1 : (i % 5 === 2 ? 2 : (i % 5 === 3 ? 3 : 0)));
      gemData.push({ angle: a, radius: 1.16, y: 0.005, r: sideR, color: sideColor, tangent: sideTangent });
      gemstoneGroups[sideColor].push(gemData[gemData.length - 1]);
    }
  }

  function createGemstones(entries, mat) {
    const mesh = new THREE.InstancedMesh(gemstoneGeom, mat, entries.length);
    for (let i = 0; i < entries.length; i++) {
      const d = entries[i];
      setRingPose(dummy, d.angle, d.radius, d.y, d.tangent);
      dummy.scale.set(d.r, 0.055, d.r);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    return mesh;
  }

  const clear_gemstones = createGemstones(gemstoneGroups[0], clearGemMat);
  const pink_gemstones = createGemstones(gemstoneGroups[1], pinkGemMat);
  const blue_gemstones = createGemstones(gemstoneGroups[2], blueGemMat);
  const green_gemstones = createGemstones(gemstoneGroups[3], greenGemMat);
  const yellow_gemstones = createGemstones(gemstoneGroups[4], yellowGemMat);
  const purple_gemstones = createGemstones(gemstoneGroups[5], purpleGemMat);
  root.add(clear_gemstones, pink_gemstones, blue_gemstones, green_gemstones, yellow_gemstones, purple_gemstones);

  const gemstone_bezelGeom = new THREE.TorusGeometry(1, 0.105, 8, 28);
  const gemstone_bezels = new THREE.InstancedMesh(gemstone_bezelGeom, silverMat, gemData.length);
  for (let i = 0; i < gemData.length; i++) {
    const d = gemData[i];
    setRingPose(dummy, d.angle, d.radius + 0.002, d.y + 0.028, d.tangent);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.setScalar(d.r * 1.08);
    dummy.updateMatrix();
    gemstone_bezels.setMatrixAt(i, dummy.matrix);
  }
  root.add(gemstone_bezels);

  const prongGeom = new THREE.SphereGeometry(1, 12, 8);
  const prongs = new THREE.InstancedMesh(prongGeom, silverMat, gemData.length * 4);
  let prongIndex = 0;
  for (let i = 0; i < gemData.length; i++) {
    const d = gemData[i];
    const baseX = Math.sin(d.angle) * d.radius;
    const baseZ = Math.cos(d.angle) * d.radius;
    const tx = Math.cos(d.angle);
    const tz = -Math.sin(d.angle);
    const offsets = [
      [d.r * 0.82, 0],
      [-d.r * 0.82, 0],
      [0, d.r * 0.82],
      [0, -d.r * 0.82]
    ];
    for (let j = 0; j < 4; j++) {
      const ox = offsets[j][0] + tx * d.tangent;
      const oz = offsets[j][1] + tz * d.tangent;
      dummy.position.set(baseX + ox, d.y + 0.055, baseZ + oz);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(0.024 + d.r * 0.08);
      dummy.updateMatrix();
      prongs.setMatrixAt(prongIndex++, dummy.matrix);
    }
  }
  root.add(prongs);

  const facetShape = new THREE.Shape();
  facetShape.moveTo(0, 0);
  facetShape.lineTo(1, 0);
  facetShape.lineTo(0.22, 0.78);
  facetShape.lineTo(0, 0);
  const facetGeom = new THREE.ShapeGeometry(facetShape);
  const gemstone_facets = new THREE.InstancedMesh(facetGeom, facetMat, gemData.length * 8);
  let facetIndex = 0;
  for (let i = 0; i < gemData.length; i++) {
    const d = gemData[i];
    const baseX = Math.sin(d.angle) * d.radius;
    const baseZ = Math.cos(d.angle) * d.radius;
    const tx = Math.cos(d.angle);
    const tz = -Math.sin(d.angle);
    for (let j = 0; j < 8; j++) {
      const theta = j / 8 * Math.PI * 2;
      const local = new THREE.Vector3(Math.cos(theta) * d.r * 0.18, 0, Math.sin(theta) * d.r * 0.18);
      local.applyAxisAngle(new THREE.Vector3(0, 1, 0), d.angle);
      local.x += tx * d.tangent;
      local.z += tz * d.tangent;
      dummy.position.set(baseX + local.x, d.y + 0.032, baseZ + local.z);
      dummy.rotation.set(-Math.PI / 2, 0, theta - Math.PI / 2);
      dummy.scale.set(d.r * 0.72, d.r * 0.72, 1);
      dummy.updateMatrix();
      gemstone_facets.setMatrixAt(facetIndex++, dummy.matrix);
    }
  }
  root.add(gemstone_facets);

  const central_table_highlightGeom = new THREE.CircleGeometry(1, 24);
  const central_table_highlight = new THREE.Mesh(central_table_highlightGeom, highlightMat);
  central_table_highlight.rotation.x = -Math.PI / 2;
  central_table_highlight.position.set(0, 0.062, 1.19);
  central_table_highlight.scale.set(0.075, 0.075, 1);
  root.add(central_table_highlight);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
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
