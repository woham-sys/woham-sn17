function __sn17_user(THREE) {
  const root = new THREE.Group();

  const brassMat = new THREE.MeshStandardMaterial({ color: 0xb08a35, metalness: 0.65, roughness: 0.32 });
  const darkBrassMat = new THREE.MeshStandardMaterial({ color: 0x5c4318, metalness: 0.5, roughness: 0.55 });
  const patinaMat = new THREE.MeshStandardMaterial({ color: 0x24231d, metalness: 0.15, roughness: 0.85 });
  const wickMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.0, roughness: 0.95 });

  const baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.34, 0.00),
    new THREE.Vector2(0.43, 0.018),
    new THREE.Vector2(0.47, 0.055),
    new THREE.Vector2(0.46, 0.095),
    new THREE.Vector2(0.39, 0.135),
    new THREE.Vector2(0.30, 0.185),
    new THREE.Vector2(0.235, 0.265),
    new THREE.Vector2(0.195, 0.385),
    new THREE.Vector2(0.175, 0.485),
    new THREE.Vector2(0.145, 0.525),
    new THREE.Vector2(0.00, 0.525)
  ];
  const baseGeom = new THREE.LatheGeometry(baseProfile, 96);
  const base = new THREE.Mesh(baseGeom, brassMat);
  root.add(base);

  const base_rimGeom = new THREE.TorusGeometry(0.435, 0.022, 12, 96);
  const base_rim = new THREE.Mesh(base_rimGeom, brassMat);
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.055;
  root.add(base_rim);

  const base_lower_shadowGeom = new THREE.TorusGeometry(0.405, 0.009, 8, 96);
  const base_lower_shadow = new THREE.Mesh(base_lower_shadowGeom, darkBrassMat);
  base_lower_shadow.rotation.x = Math.PI / 2;
  base_lower_shadow.position.y = 0.018;
  root.add(base_lower_shadow);

  const socket_ringGeom = new THREE.TorusGeometry(0.145, 0.026, 14, 72);
  const socket_ring = new THREE.Mesh(socket_ringGeom, brassMat);
  socket_ring.rotation.x = Math.PI / 2;
  socket_ring.position.y = 0.515;
  root.add(socket_ring);

  const socket_holeGeom = new THREE.CylinderGeometry(0.112, 0.112, 0.018, 64);
  const socket_hole = new THREE.Mesh(socket_holeGeom, patinaMat);
  socket_hole.position.y = 0.535;
  root.add(socket_hole);

  const candleProfile = [
    new THREE.Vector2(0.00, 0.485),
    new THREE.Vector2(0.122, 0.485),
    new THREE.Vector2(0.132, 0.565),
    new THREE.Vector2(0.128, 0.82),
    new THREE.Vector2(0.124, 1.35),
    new THREE.Vector2(0.119, 2.05),
    new THREE.Vector2(0.113, 2.75),
    new THREE.Vector2(0.106, 3.35),
    new THREE.Vector2(0.101, 3.69),
    new THREE.Vector2(0.095, 3.765),
    new THREE.Vector2(0.00, 3.785)
  ];
  const candleGeom = new THREE.LatheGeometry(candleProfile, 96);
  const candle = new THREE.Mesh(candleGeom, brassMat);
  root.add(candle);

  const candle_bottom_shadowGeom = new THREE.TorusGeometry(0.112, 0.012, 8, 64);
  const candle_bottom_shadow = new THREE.Mesh(candle_bottom_shadowGeom, darkBrassMat);
  candle_bottom_shadow.rotation.x = Math.PI / 2;
  candle_bottom_shadow.position.y = 0.505;
  root.add(candle_bottom_shadow);

  const candle_top_lipGeom = new THREE.TorusGeometry(0.088, 0.012, 10, 64);
  const candle_top_lip = new THREE.Mesh(candle_top_lipGeom, brassMat);
  candle_top_lip.rotation.x = Math.PI / 2;
  candle_top_lip.position.y = 3.765;
  root.add(candle_top_lip);

  const wick_baseGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.018, 24);
  const wick_base = new THREE.Mesh(wick_baseGeom, wickMat);
  wick_base.position.y = 3.795;
  root.add(wick_base);

  const wickCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.000, 3.795, 0.000),
    new THREE.Vector3(-0.018, 3.855, 0.006),
    new THREE.Vector3(0.012, 3.915, -0.004),
    new THREE.Vector3(-0.010, 3.975, 0.008),
    new THREE.Vector3(0.035, 4.025, 0.002),
    new THREE.Vector3(0.060, 4.060, 0.006)
  ]);
  const wickGeom = new THREE.TubeGeometry(wickCurve, 48, 0.018, 8, false);
  const wick = new THREE.Mesh(wickGeom, wickMat);
  root.add(wick);

  const wick_tipGeom = new THREE.SphereGeometry(0.024, 12, 8);
  const wick_tip = new THREE.Mesh(wick_tipGeom, wickMat);
  wick_tip.position.set(0.060, 4.060, 0.006);
  wick_tip.scale.set(1.25, 0.75, 1.0);
  root.add(wick_tip);

  const spotGeom = new THREE.CircleGeometry(1, 10);
  const frontNormal = new THREE.Vector3(0, 0, 1);
  const dummy = new THREE.Object3D();

  const candleSpotCount = 150;
  const candle_patina_spots = new THREE.InstancedMesh(spotGeom, patinaMat, candleSpotCount);
  for (let i = 0; i < candleSpotCount; i++) {
    const t = ((i * 37) % candleSpotCount) / (candleSpotCount - 1);
    const y = 0.57 + t * 3.12;
    const angle = i * 2.399963229728653 + (i % 7) * 0.11;
    const r = 0.128 - t * 0.027;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const quat = new THREE.Quaternion().setFromUnitVectors(frontNormal, normal);
    const s = 0.006 + (i % 6) * 0.0022;
    dummy.position.set(normal.x * (r + 0.004), y, normal.z * (r + 0.004));
    dummy.quaternion.copy(quat);
    dummy.rotateZ((i % 9) * 0.37);
    dummy.scale.set(s * (1.0 + (i % 3) * 0.35), s * (0.7 + (i % 5) * 0.22), 1);
    dummy.updateMatrix();
    candle_patina_spots.setMatrixAt(i, dummy.matrix);
  }
  candle_patina_spots.instanceMatrix.needsUpdate = true;
  root.add(candle_patina_spots);

  const baseSpotCount = 82;
  const base_patina_spots = new THREE.InstancedMesh(spotGeom, patinaMat, baseSpotCount);
  for (let i = 0; i < baseSpotCount; i++) {
    const t = ((i * 29) % baseSpotCount) / (baseSpotCount - 1);
    const y = 0.055 + t * 0.42;
    let r;
    if (y < 0.10) r = 0.455;
    else if (y < 0.18) r = 0.40 - (y - 0.10) * 0.75;
    else if (y < 0.30) r = 0.32 - (y - 0.18) * 0.55;
    else r = 0.255 - (y - 0.30) * 0.35;
    const angle = i * 2.173 + (i % 5) * 0.17;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const quat = new THREE.Quaternion().setFromUnitVectors(frontNormal, normal);
    const s = 0.008 + (i % 5) * 0.003;
    dummy.position.set(normal.x * (r + 0.005), y, normal.z * (r + 0.005));
    dummy.quaternion.copy(quat);
    dummy.rotateZ((i % 8) * 0.41);
    dummy.scale.set(s * 1.35, s * 0.85, 1);
    dummy.updateMatrix();
    base_patina_spots.setMatrixAt(i, dummy.matrix);
  }
  base_patina_spots.instanceMatrix.needsUpdate = true;
  root.add(base_patina_spots);

  const scratchGeom = new THREE.PlaneGeometry(1, 1);
  const scratchCount = 34;
  const vertical_brass_scratches = new THREE.InstancedMesh(scratchGeom, darkBrassMat, scratchCount);
  for (let i = 0; i < scratchCount; i++) {
    const t = ((i * 17) % scratchCount) / (scratchCount - 1);
    const y = 0.68 + t * 2.85;
    const angle = i * 2.618 + 0.35;
    const r = 0.126 - t * 0.024;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const quat = new THREE.Quaternion().setFromUnitVectors(frontNormal, normal);
    dummy.position.set(normal.x * (r + 0.005), y, normal.z * (r + 0.005));
    dummy.quaternion.copy(quat);
    dummy.rotateZ((i % 3 - 1) * 0.08);
    dummy.scale.set(0.004 + (i % 2) * 0.002, 0.045 + (i % 5) * 0.012, 1);
    dummy.updateMatrix();
    vertical_brass_scratches.setMatrixAt(i, dummy.matrix);
  }
  vertical_brass_scratches.instanceMatrix.needsUpdate = true;
  root.add(vertical_brass_scratches);

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
  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 0) {
    const scale = 0.98 / maxDim;
    root.scale.setScalar(scale);
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
