function __sn17_user(THREE) {
  const root = new THREE.Group();

  const feltMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
  const bandMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.82 });
  const seamMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.85 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.65, roughness: 0.22 });

  const brimProfile = [
    new THREE.Vector2(0.28, 0.045),
    new THREE.Vector2(0.48, 0.030),
    new THREE.Vector2(0.70, -0.010),
    new THREE.Vector2(0.86, -0.075),
    new THREE.Vector2(0.91, -0.115),
    new THREE.Vector2(0.88, -0.155),
    new THREE.Vector2(0.72, -0.135),
    new THREE.Vector2(0.48, -0.075),
    new THREE.Vector2(0.28, -0.040),
    new THREE.Vector2(0.28, 0.045)
  ];
  const brimGeom = new THREE.LatheGeometry(brimProfile, 96);
  const brim = new THREE.Mesh(brimGeom, feltMat);
  root.add(brim);

  const outerBrimRollGeom = new THREE.TorusGeometry(0.885, 0.018, 12, 96);
  const outer_brim_roll = new THREE.Mesh(outerBrimRollGeom, seamMat);
  outer_brim_roll.rotation.x = Math.PI / 2;
  outer_brim_roll.position.y = -0.125;
  root.add(outer_brim_roll);

  const innerBrimSeamGeom = new THREE.TorusGeometry(0.43, 0.006, 8, 96);
  const inner_brim_seam = new THREE.Mesh(innerBrimSeamGeom, seamMat);
  inner_brim_seam.rotation.x = Math.PI / 2;
  inner_brim_seam.position.y = 0.035;
  root.add(inner_brim_seam);

  const crownProfile = [
    new THREE.Vector2(0.00, 0.025),
    new THREE.Vector2(0.42, 0.025),
    new THREE.Vector2(0.47, 0.080),
    new THREE.Vector2(0.455, 0.300),
    new THREE.Vector2(0.430, 0.555),
    new THREE.Vector2(0.395, 0.680),
    new THREE.Vector2(0.315, 0.735),
    new THREE.Vector2(0.145, 0.755),
    new THREE.Vector2(0.00, 0.748)
  ];
  const crownGeom = new THREE.LatheGeometry(crownProfile, 96);
  const crown = new THREE.Mesh(crownGeom, feltMat);
  root.add(crown);

  const topCreaseGeom = new THREE.SphereGeometry(1, 48, 16);
  const top_crease = new THREE.Mesh(topCreaseGeom, bandMat);
  top_crease.scale.set(0.225, 0.018, 0.070);
  top_crease.position.set(0, 0.758, 0);
  root.add(top_crease);

  const baseBandGeom = new THREE.CylinderGeometry(0.462, 0.475, 0.135, 96, 1, true);
  const base_band = new THREE.Mesh(baseBandGeom, bandMat);
  base_band.position.y = 0.145;
  root.add(base_band);

  const lowerBandEdgeGeom = new THREE.TorusGeometry(0.474, 0.006, 8, 96);
  const lower_band_edge = new THREE.Mesh(lowerBandEdgeGeom, seamMat);
  lower_band_edge.rotation.x = Math.PI / 2;
  lower_band_edge.position.y = 0.080;
  root.add(lower_band_edge);

  const upperBandEdgeGeom = new THREE.TorusGeometry(0.458, 0.006, 8, 96);
  const upper_band_edge = new THREE.Mesh(upperBandEdgeGeom, seamMat);
  upper_band_edge.rotation.x = Math.PI / 2;
  upper_band_edge.position.y = 0.210;
  root.add(upper_band_edge);

  const frontBandShape = new THREE.Shape();
  frontBandShape.moveTo(-0.285, -0.055);
  frontBandShape.lineTo(0.285, -0.055);
  frontBandShape.lineTo(0.245, 0.060);
  frontBandShape.lineTo(-0.245, 0.060);
  frontBandShape.closePath();

  const frontBandGeom = new THREE.ExtrudeGeometry(frontBandShape, {
    depth: 0.018,
    steps: 1
  });
  const front_band = new THREE.Mesh(frontBandGeom, bandMat);
  front_band.position.set(0, 0.145, 0.452);
  front_band.rotation.x = -0.08;
  root.add(front_band);

  const bandOverlapSeamGeom = new THREE.BoxGeometry(0.010, 0.105, 0.008);
  const band_overlap_seam = new THREE.Mesh(bandOverlapSeamGeom, seamMat);
  band_overlap_seam.position.set(0.235, 0.145, 0.476);
  band_overlap_seam.rotation.z = -0.04;
  root.add(band_overlap_seam);

  const buttonBackplateGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.012, 32);
  const button_backplate = new THREE.Mesh(buttonBackplateGeom, goldMat);
  button_backplate.rotation.x = Math.PI / 2;
  button_backplate.position.set(0, 0.145, 0.485);
  root.add(button_backplate);

  const goldButtonGeom = new THREE.SphereGeometry(0.040, 32, 16);
  const gold_button = new THREE.Mesh(goldButtonGeom, goldMat);
  gold_button.scale.set(1, 1, 0.48);
  gold_button.position.set(0, 0.145, 0.505);
  root.add(gold_button);

  const feltFiberGeom = new THREE.CircleGeometry(0.006, 8);
  const felt_fibers = new THREE.InstancedMesh(feltFiberGeom, seamMat, 42);
  const fiberDummy = new THREE.Object3D();
  for (let i = 0; i < 42; i++) {
    const angle = i * 2.399963229728653;
    const radius = 0.34 + ((i * 37) % 100) / 100 * 0.50;
    const y = radius > 0.60 ? -0.075 - (radius - 0.60) * 0.18 : 0.040 - (radius - 0.34) * 0.035;
    const size = 0.55 + ((i * 19) % 10) / 10 * 0.75;
    fiberDummy.position.set(Math.cos(angle) * radius, y + 0.006, Math.sin(angle) * radius);
    fiberDummy.rotation.set(-Math.PI / 2, 0, angle);
    fiberDummy.scale.set(size, size * 0.55, 1);
    fiberDummy.updateMatrix();
    felt_fibers.setMatrixAt(i, fiberDummy.matrix);
  }
  root.add(felt_fibers);

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
