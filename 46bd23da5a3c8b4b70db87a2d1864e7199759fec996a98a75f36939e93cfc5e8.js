function __sn17_user(THREE) {
  const root = new THREE.Group();

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.02,
    transmission: 0.98,
    opacity: 0.24,
    thickness: 0.06,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    ior: 1.5,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const edgeGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x777777,
    metalness: 0.0,
    roughness: 0.035,
    transmission: 0.9,
    opacity: 0.48,
    thickness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.025,
    ior: 1.5,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const darkGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.04,
    transmission: 0.82,
    opacity: 0.55,
    thickness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.025,
    ior: 1.5,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const bodyProfile = [
    new THREE.Vector2(0.00, -0.500),
    new THREE.Vector2(0.18, -0.500),
    new THREE.Vector2(0.27, -0.485),
    new THREE.Vector2(0.34, -0.445),
    new THREE.Vector2(0.39, -0.365),
    new THREE.Vector2(0.415, -0.250),
    new THREE.Vector2(0.420, -0.120),
    new THREE.Vector2(0.405, 0.020),
    new THREE.Vector2(0.370, 0.150),
    new THREE.Vector2(0.325, 0.270),
    new THREE.Vector2(0.275, 0.380),
    new THREE.Vector2(0.220, 0.480),
    new THREE.Vector2(0.165, 0.560),
    new THREE.Vector2(0.125, 0.610),
    new THREE.Vector2(0.112, 0.660),
    new THREE.Vector2(0.112, 0.705)
  ];
  const bodyGeo = new THREE.LatheGeometry(bodyProfile, 96);
  const body = new THREE.Mesh(bodyGeo, glassMat);
  root.add(body);

  const thickBottomGeo = new THREE.CylinderGeometry(0.285, 0.255, 0.035, 96);
  const thick_bottom_glass = new THREE.Mesh(thickBottomGeo, edgeGlassMat);
  thick_bottom_glass.position.y = -0.482;
  root.add(thick_bottom_glass);

  const bottomOuterRingGeo = new THREE.TorusGeometry(0.285, 0.014, 16, 96);
  const bottom_outer_ring = new THREE.Mesh(bottomOuterRingGeo, edgeGlassMat);
  bottom_outer_ring.rotation.x = Math.PI / 2;
  bottom_outer_ring.position.y = -0.478;
  root.add(bottom_outer_ring);

  const bottomInnerRingGeo = new THREE.TorusGeometry(0.215, 0.006, 12, 96);
  const bottom_inner_ring = new THREE.Mesh(bottomInnerRingGeo, edgeGlassMat);
  bottom_inner_ring.rotation.x = Math.PI / 2;
  bottom_inner_ring.position.y = -0.463;
  root.add(bottom_inner_ring);

  const neckLowerRingGeo = new THREE.TorusGeometry(0.119, 0.006, 12, 96);
  const neck_lower_ring = new THREE.Mesh(neckLowerRingGeo, edgeGlassMat);
  neck_lower_ring.rotation.x = Math.PI / 2;
  neck_lower_ring.position.y = 0.642;
  root.add(neck_lower_ring);

  const lipProfile = [
    new THREE.Vector2(0.112, 0.685),
    new THREE.Vector2(0.145, 0.695),
    new THREE.Vector2(0.165, 0.715),
    new THREE.Vector2(0.165, 0.745),
    new THREE.Vector2(0.145, 0.765),
    new THREE.Vector2(0.095, 0.765),
    new THREE.Vector2(0.088, 0.745),
    new THREE.Vector2(0.095, 0.715),
    new THREE.Vector2(0.112, 0.695),
    new THREE.Vector2(0.112, 0.685)
  ];
  const rolledLipGeo = new THREE.LatheGeometry(lipProfile, 96);
  const rolled_lip = new THREE.Mesh(rolledLipGeo, glassMat);
  root.add(rolled_lip);

  const lipOuterEdgeGeo = new THREE.TorusGeometry(0.158, 0.009, 16, 96);
  const lip_outer_edge = new THREE.Mesh(lipOuterEdgeGeo, darkGlassMat);
  lip_outer_edge.rotation.x = Math.PI / 2;
  lip_outer_edge.position.y = 0.731;
  root.add(lip_outer_edge);

  const mouthOpeningGeo = new THREE.RingGeometry(0.087, 0.145, 96);
  const mouth_opening = new THREE.Mesh(mouthOpeningGeo, darkGlassMat);
  mouth_opening.rotation.x = -Math.PI / 2;
  mouth_opening.position.y = 0.766;
  root.add(mouth_opening);

  const leftHighlightShape = new THREE.Shape();
  leftHighlightShape.moveTo(-0.055, -0.285);
  leftHighlightShape.bezierCurveTo(-0.075, -0.120, -0.060, 0.155, -0.025, 0.285);
  leftHighlightShape.bezierCurveTo(0.005, 0.310, 0.045, 0.285, 0.040, 0.235);
  leftHighlightShape.bezierCurveTo(0.010, 0.060, -0.005, -0.165, -0.035, -0.265);
  leftHighlightShape.bezierCurveTo(-0.045, -0.285, -0.060, -0.295, -0.055, -0.285);
  const leftHighlightGeo = new THREE.ShapeGeometry(leftHighlightShape);
  const left_highlight = new THREE.Mesh(leftHighlightGeo, highlightMat);
  left_highlight.position.set(-0.145, 0.105, 0.355);
  left_highlight.rotation.y = -0.38;
  root.add(left_highlight);

  const rightHighlightShape = new THREE.Shape();
  rightHighlightShape.moveTo(-0.040, -0.245);
  rightHighlightShape.bezierCurveTo(-0.055, -0.070, -0.040, 0.155, -0.010, 0.255);
  rightHighlightShape.bezierCurveTo(0.015, 0.280, 0.045, 0.255, 0.040, 0.215);
  rightHighlightShape.bezierCurveTo(0.015, 0.040, 0.000, -0.155, -0.025, -0.230);
  rightHighlightShape.bezierCurveTo(-0.032, -0.248, -0.045, -0.255, -0.040, -0.245);
  const rightHighlightGeo = new THREE.ShapeGeometry(rightHighlightShape);
  const right_highlight = new THREE.Mesh(rightHighlightGeo, highlightMat);
  right_highlight.position.set(0.165, 0.095, 0.345);
  right_highlight.rotation.y = 0.42;
  root.add(right_highlight);

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
    const scale = 0.95 / maxDim;
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
