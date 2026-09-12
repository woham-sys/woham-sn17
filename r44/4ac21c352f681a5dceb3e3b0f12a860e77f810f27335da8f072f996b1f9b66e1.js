// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const shaftLength = 4.0;
  const shaftRadius = 0.16;
  const capLength = 0.46;
  const capRadius = 0.22;
  const collarLength = 0.10;
  const collarRadius = 0.225;
  const seamRadius = 0.175;
  const totalHalfLength = shaftLength / 2 + collarLength + capLength;

  const black_shaftMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.3,
  });

  const end_capMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const collar_ringMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const shaft_seamMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    metalness: 0.0,
    roughness: 0.8,
  });

  const black_shaftGeom = new THREE.CylinderGeometry(
    shaftRadius,
    shaftRadius,
    shaftLength,
    48
  );
  const black_shaft = new THREE.Mesh(black_shaftGeom, black_shaftMat);
  black_shaft.rotation.z = Math.PI / 2;
  root.add(black_shaft);

  const end_capProfile = [
    new THREE.Vector2(0.000, -capLength / 2),
    new THREE.Vector2(capRadius - 0.025, -capLength / 2),
    new THREE.Vector2(capRadius - 0.008, -capLength / 2 + 0.012),
    new THREE.Vector2(capRadius, -capLength / 2 + 0.030),
    new THREE.Vector2(capRadius, capLength / 2 - 0.030),
    new THREE.Vector2(capRadius - 0.008, capLength / 2 - 0.012),
    new THREE.Vector2(capRadius - 0.025, capLength / 2),
    new THREE.Vector2(0.000, capLength / 2),
  ];
  const end_capGeom = new THREE.LatheGeometry(end_capProfile, 48);

  const left_end_cap = new THREE.Mesh(end_capGeom, end_capMat);
  left_end_cap.rotation.z = -Math.PI / 2;
  left_end_cap.position.x = -(shaftLength / 2 + collarLength + capLength / 2);
  root.add(left_end_cap);

  const right_end_cap = new THREE.Mesh(end_capGeom, end_capMat);
  right_end_cap.rotation.z = -Math.PI / 2;
  right_end_cap.position.x = shaftLength / 2 + collarLength + capLength / 2;
  root.add(right_end_cap);

  const collar_ringGeom = new THREE.CylinderGeometry(
    collarRadius,
    collarRadius,
    collarLength,
    48
  );

  const left_collar_ring = new THREE.Mesh(collar_ringGeom, collar_ringMat);
  left_collar_ring.rotation.z = Math.PI / 2;
  left_collar_ring.position.x = -(shaftLength / 2 + collarLength / 2);
  root.add(left_collar_ring);

  const right_collar_ring = new THREE.Mesh(collar_ringGeom, collar_ringMat);
  right_collar_ring.rotation.z = Math.PI / 2;
  right_collar_ring.position.x = shaftLength / 2 + collarLength / 2;
  root.add(right_collar_ring);

  const shaft_seamGeom = new THREE.TorusGeometry(seamRadius, 0.009, 8, 48);

  const left_shaft_seam = new THREE.Mesh(shaft_seamGeom, shaft_seamMat);
  left_shaft_seam.rotation.y = Math.PI / 2;
  left_shaft_seam.position.x = -shaftLength / 2;
  root.add(left_shaft_seam);

  const right_shaft_seam = new THREE.Mesh(shaft_seamGeom, shaft_seamMat);
  right_shaft_seam.rotation.y = Math.PI / 2;
  right_shaft_seam.position.x = shaftLength / 2;
  root.add(right_shaft_seam);

  const end_cap_edgeGeom = new THREE.TorusGeometry(
    capRadius - 0.025,
    0.008,
    8,
    48
  );

  const left_end_cap_edge = new THREE.Mesh(end_cap_edgeGeom, end_capMat);
  left_end_cap_edge.rotation.y = Math.PI / 2;
  left_end_cap_edge.position.x = -totalHalfLength;
  root.add(left_end_cap_edge);

  const right_end_cap_edge = new THREE.Mesh(end_cap_edgeGeom, end_capMat);
  right_end_cap_edge.rotation.y = Math.PI / 2;
  right_end_cap_edge.position.x = totalHalfLength;
  root.add(right_end_cap_edge);

  const left_end_holeGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 16);
  const left_end_hole = new THREE.Mesh(left_end_holeGeom, shaft_seamMat);
  left_end_hole.rotation.z = Math.PI / 2;
  left_end_hole.position.set(-totalHalfLength - 0.004, -0.035, 0.035);
  root.add(left_end_hole);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}