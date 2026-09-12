// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "red_balloon_pump";

  const balloon_group = new THREE.Group();
  balloon_group.name = "balloon_group";
  root.add(balloon_group);

  const nozzle_group = new THREE.Group();
  nozzle_group.name = "nozzle_group";
  root.add(nozzle_group);

  const hose_group = new THREE.Group();
  hose_group.name = "hose_group";
  root.add(hose_group);

  const balloon_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf20a24,
    metalness: 0.0,
    roughness: 0.3
  });

  const balloon_seamMat = new THREE.MeshStandardMaterial({
    color: 0xb8001a,
    metalness: 0.0,
    roughness: 0.3
  });

  const corrugated_hoseMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  const hose_coreMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const balloon_bodyProfile = [
    new THREE.Vector2(0.00, -0.43),
    new THREE.Vector2(0.12, -0.42),
    new THREE.Vector2(0.27, -0.36),
    new THREE.Vector2(0.42, -0.25),
    new THREE.Vector2(0.54, -0.09),
    new THREE.Vector2(0.60, 0.10),
    new THREE.Vector2(0.59, 0.29),
    new THREE.Vector2(0.51, 0.46),
    new THREE.Vector2(0.37, 0.59),
    new THREE.Vector2(0.18, 0.66),
    new THREE.Vector2(0.00, 0.68)
  ];
  const balloon_bodyGeom = new THREE.LatheGeometry(balloon_bodyProfile, 64);
  const balloon_body = new THREE.Mesh(balloon_bodyGeom, balloon_bodyMat);
  balloon_body.name = "balloon_body";
  balloon_body.rotation.z = -Math.PI / 2;
  balloon_group.add(balloon_body);

  const balloon_seamPoints = [];
  for (let i = 0; i <= 18; i++) {
    const t = i / 18;
    const axial = -0.39 + t * 0.98;
    const radius = 0.14 + Math.sin(t * Math.PI) * 0.45;
    balloon_seamPoints.push(new THREE.Vector3(axial, -radius, 0));
  }
  const balloon_seamCurve = new THREE.CatmullRomCurve3(
    balloon_seamPoints,
    false,
    "centripetal"
  );
  const balloon_seamGeom = new THREE.TubeGeometry(
    balloon_seamCurve,
    48,
    0.007,
    6,
    false
  );
  const balloon_seam = new THREE.Mesh(balloon_seamGeom, balloon_seamMat);
  balloon_seam.name = "balloon_seam";
  balloon_group.add(balloon_seam);

  const balloon_neckGeom = new THREE.CylinderGeometry(0.105, 0.13, 0.15, 32);
  const balloon_neck = new THREE.Mesh(balloon_neckGeom, balloon_bodyMat);
  balloon_neck.name = "balloon_neck";
  balloon_neck.rotation.z = Math.PI / 2;
  balloon_neck.position.x = -0.45;
  balloon_group.add(balloon_neck);

  const nozzle_collarGeom = new THREE.CylinderGeometry(0.135, 0.135, 0.045, 32);
  const nozzle_collar = new THREE.Mesh(nozzle_collarGeom, balloon_seamMat);
  nozzle_collar.name = "nozzle_collar";
  nozzle_collar.rotation.z = Math.PI / 2;
  nozzle_collar.position.x = -0.49;
  nozzle_group.add(nozzle_collar);

  const nozzle_bodyGeom = new THREE.CylinderGeometry(0.105, 0.115, 0.36, 32);
  const nozzle_body = new THREE.Mesh(nozzle_bodyGeom, balloon_bodyMat);
  nozzle_body.name = "nozzle_body";
  nozzle_body.rotation.z = Math.PI / 2;
  nozzle_body.position.x = -0.68;
  nozzle_group.add(nozzle_body);

  const nozzle_endGeom = new THREE.SphereGeometry(0.108, 32, 16);
  const nozzle_end = new THREE.Mesh(nozzle_endGeom, balloon_bodyMat);
  nozzle_end.name = "nozzle_end";
  nozzle_end.position.x = -0.86;
  nozzle_end.scale.set(0.55, 1, 1);
  nozzle_group.add(nozzle_end);

  const hose_connectorGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.08, 24);
  const hose_connector = new THREE.Mesh(hose_connectorGeom, hose_coreMat);
  hose_connector.name = "hose_connector";
  hose_connector.rotation.z = Math.PI / 2;
  hose_connector.position.x = -0.925;
  hose_group.add(hose_connector);

  const hosePath = [
    new THREE.Vector3(-0.95, 0.00, 0.00),
    new THREE.Vector3(-1.10, -0.01, 0.00),
    new THREE.Vector3(-1.27, -0.07, 0.00),
    new THREE.Vector3(-1.40, -0.19, 0.00),
    new THREE.Vector3(-1.46, -0.35, 0.00),
    new THREE.Vector3(-1.42, -0.52, 0.00),
    new THREE.Vector3(-1.30, -0.66, 0.00),
    new THREE.Vector3(-1.14, -0.73, 0.00),
    new THREE.Vector3(-0.98, -0.70, 0.00),
    new THREE.Vector3(-0.86, -0.60, 0.00)
  ];
  const hoseCurve = new THREE.CatmullRomCurve3(
    hosePath,
    false,
    "centripetal"
  );

  const hose_coreGeom = new THREE.TubeGeometry(hoseCurve, 120, 0.023, 8, false);
  const hose_core = new THREE.Mesh(hose_coreGeom, hose_coreMat);
  hose_core.name = "hose_core";
  hose_group.add(hose_core);

  const corrugated_hoseGeom = new THREE.TorusGeometry(0.029, 0.006, 6, 12);
  const ringCount = 96;
  const corrugated_hose = new THREE.InstancedMesh(
    corrugated_hoseGeom,
    corrugated_hoseMat,
    ringCount
  );
  corrugated_hose.name = "corrugated_hose";

  const ringNormal = new THREE.Vector3(0, 0, 1);
  const ringPosition = new THREE.Vector3();
  const ringTangent = new THREE.Vector3();
  const ringQuaternion = new THREE.Quaternion();
  const ringScale = new THREE.Vector3(1, 1, 1);
  const ringMatrix = new THREE.Matrix4();

  for (let i = 0; i < ringCount; i++) {
    const t = i / (ringCount - 1);
    hoseCurve.getPointAt(t, ringPosition);
    hoseCurve.getTangentAt(t, ringTangent).normalize();
    ringQuaternion.setFromUnitVectors(ringNormal, ringTangent);
    ringMatrix.compose(ringPosition, ringQuaternion, ringScale);
    corrugated_hose.setMatrixAt(i, ringMatrix);
  }
  corrugated_hose.instanceMatrix.needsUpdate = true;
  hose_group.add(corrugated_hose);

  const hose_end_sleeveGeom = new THREE.CylinderGeometry(0.041, 0.041, 0.075, 16);
  const hose_end_sleeve = new THREE.Mesh(hose_end_sleeveGeom, hose_coreMat);
  hose_end_sleeve.name = "hose_end_sleeve";
  const endPoint = hoseCurve.getPointAt(1);
  const endTangent = hoseCurve.getTangentAt(1).normalize();
  hose_end_sleeve.position.copy(endPoint).addScaledVector(endTangent, -0.025);
  hose_end_sleeve.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    endTangent
  );
  hose_group.add(hose_end_sleeve);

  fitToUnitCube(root);
  return root;

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
}