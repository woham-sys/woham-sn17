// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wall_mounted_hook_rack";

  const railLength = 5.15;
  const railHeight = 0.50;
  const railDepth = 0.14;
  const hookSpacing = 0.88;
  const hookCount = 6;

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const silver_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const mounting_railShape = new THREE.Shape();
  mounting_railShape.moveTo(-railLength / 2, -railHeight / 2);
  mounting_railShape.lineTo(railLength / 2, -railHeight / 2);
  mounting_railShape.lineTo(railLength / 2, railHeight / 2);
  mounting_railShape.lineTo(-railLength / 2, railHeight / 2);
  mounting_railShape.closePath();

  const mounting_railGeom = new THREE.ExtrudeGeometry(mounting_railShape, {
    depth: railDepth,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 2,
  });
  const mounting_rail = new THREE.Mesh(mounting_railGeom, brushed_metalMat);
  mounting_rail.name = "mounting_rail";
  mounting_rail.position.z = -railDepth / 2;
  root.add(mounting_rail);

  const top_edgeGeom = new THREE.CylinderGeometry(0.018, 0.018, railLength - 0.04, 12);
  const top_edge = new THREE.Mesh(top_edgeGeom, polished_metalMat);
  top_edge.name = "top_edge";
  top_edge.rotation.z = Math.PI / 2;
  top_edge.position.set(0, railHeight / 2, railDepth / 2 + 0.004);
  root.add(top_edge);

  const bottom_edgeGeom = top_edgeGeom;
  const bottom_edge = new THREE.Mesh(bottom_edgeGeom, polished_metalMat);
  bottom_edge.name = "bottom_edge";
  bottom_edge.rotation.z = Math.PI / 2;
  bottom_edge.position.set(0, -railHeight / 2, railDepth / 2 + 0.004);
  root.add(bottom_edge);

  const end_capShape = new THREE.Shape();
  end_capShape.moveTo(-0.22, -0.31);
  end_capShape.lineTo(0.12, -0.31);
  end_capShape.lineTo(0.12, 0.31);
  end_capShape.closePath();

  const end_capGeom = new THREE.ExtrudeGeometry(end_capShape, {
    depth: 0.22,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });

  const left_end_cap = new THREE.Mesh(end_capGeom, brushed_metalMat);
  left_end_cap.name = "left_end_cap";
  left_end_cap.position.set(-railLength / 2, 0, -0.11);
  root.add(left_end_cap);

  const right_end_cap = new THREE.Mesh(end_capGeom, brushed_metalMat);
  right_end_cap.name = "right_end_cap";
  right_end_cap.position.set(railLength / 2, 0, -0.11);
  right_end_cap.scale.x = -1;
  root.add(right_end_cap);

  const hookPath = [
    new THREE.Vector3(0.00, 0.34, 0.11),
    new THREE.Vector3(0.00, 0.20, 0.12),
    new THREE.Vector3(-0.01, 0.04, 0.15),
    new THREE.Vector3(-0.02, -0.12, 0.20),
    new THREE.Vector3(0.02, -0.27, 0.27),
    new THREE.Vector3(0.13, -0.39, 0.34),
    new THREE.Vector3(0.29, -0.46, 0.39),
    new THREE.Vector3(0.47, -0.44, 0.41),
    new THREE.Vector3(0.62, -0.34, 0.42),
    new THREE.Vector3(0.70, -0.19, 0.42),
    new THREE.Vector3(0.70, 0.00, 0.41),
  ];
  const hookCurve = new THREE.CatmullRomCurve3(hookPath, false, "centripetal");
  const hookGeom = new THREE.TubeGeometry(hookCurve, 48, 0.052, 12, false);
  const hooks = new THREE.InstancedMesh(hookGeom, polished_metalMat, hookCount);
  hooks.name = "hooks";

  const hook_base_collarGeom = new THREE.CylinderGeometry(0.071, 0.071, 0.035, 16);
  const hook_base_collars = new THREE.InstancedMesh(
    hook_base_collarGeom,
    polished_metalMat,
    hookCount
  );
  hook_base_collars.name = "hook_base_collars";

  const hook_finialGeom = new THREE.SphereGeometry(0.083, 18, 12);
  const hook_finials = new THREE.InstancedMesh(
    hook_finialGeom,
    polished_metalMat,
    hookCount
  );
  hook_finials.name = "hook_finials";

  const hook_tipGeom = new THREE.SphereGeometry(0.057, 16, 10);
  const hook_tips = new THREE.InstancedMesh(hook_tipGeom, polished_metalMat, hookCount);
  hook_tips.name = "hook_tips";

  const firstHookX = -(hookSpacing * (hookCount - 1)) / 2;
  const instanceMatrix = new THREE.Matrix4();
  const identityQuaternion = new THREE.Quaternion();
  const collarQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  const unitScale = new THREE.Vector3(1, 1, 1);

  for (let i = 0; i < hookCount; i++) {
    const x = firstHookX + i * hookSpacing;

    instanceMatrix.makeTranslation(x, 0, 0);
    hooks.setMatrixAt(i, instanceMatrix);

    instanceMatrix.compose(
      new THREE.Vector3(x, 0.325, 0.108),
      collarQuaternion,
      unitScale
    );
    hook_base_collars.setMatrixAt(i, instanceMatrix);

    instanceMatrix.compose(
      new THREE.Vector3(x, 0.34, 0.11),
      identityQuaternion,
      unitScale
    );
    hook_finials.setMatrixAt(i, instanceMatrix);

    instanceMatrix.makeTranslation(x + 0.70, 0.00, 0.41);
    hook_tips.setMatrixAt(i, instanceMatrix);
  }

  hooks.instanceMatrix.needsUpdate = true;
  hook_base_collars.instanceMatrix.needsUpdate = true;
  hook_finials.instanceMatrix.needsUpdate = true;
  hook_tips.instanceMatrix.needsUpdate = true;

  root.add(hooks);
  root.add(hook_base_collars);
  root.add(hook_finials);
  root.add(hook_tips);

  const mounting_washerGeom = new THREE.CylinderGeometry(0.135, 0.135, 0.025, 24);
  const mounting_washer = new THREE.Mesh(mounting_washerGeom, silver_metalMat);
  mounting_washer.name = "mounting_washer";
  mounting_washer.rotation.x = Math.PI / 2;
  mounting_washer.position.set(-2.08, -0.055, railDepth / 2 + 0.014);
  root.add(mounting_washer);

  const mounting_boltGeom = new THREE.SphereGeometry(0.105, 20, 12);
  const mounting_bolt = new THREE.Mesh(mounting_boltGeom, polished_metalMat);
  mounting_bolt.name = "mounting_bolt";
  mounting_bolt.scale.set(1, 1, 0.42);
  mounting_bolt.position.set(-2.08, -0.055, railDepth / 2 + 0.045);
  root.add(mounting_bolt);

  const right_mounting_washer = new THREE.Mesh(mounting_washerGeom, silver_metalMat);
  right_mounting_washer.name = "right_mounting_washer";
  right_mounting_washer.rotation.x = Math.PI / 2;
  right_mounting_washer.position.set(2.08, 0.055, railDepth / 2 + 0.014);
  root.add(right_mounting_washer);

  const right_mounting_bolt = new THREE.Mesh(mounting_boltGeom, polished_metalMat);
  right_mounting_bolt.name = "right_mounting_bolt";
  right_mounting_bolt.scale.set(1, 1, 0.42);
  right_mounting_bolt.position.set(2.08, 0.055, railDepth / 2 + 0.045);
  root.add(right_mounting_bolt);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(root);
  return root;
}