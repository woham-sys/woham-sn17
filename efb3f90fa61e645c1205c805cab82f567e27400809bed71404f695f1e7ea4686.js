function __sn17_user(THREE) {
  const root = new THREE.Group();
  const vessel = new THREE.Group();
  const handle_group = new THREE.Group();
  root.add(vessel, handle_group);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x4a281c,
    metalness: 0.35,
    roughness: 0.62,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x5b3020,
    metalness: 0.38,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x120b09,
    metalness: 0.1,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x211714,
    metalness: 0.2,
    roughness: 0.85,
    side: THREE.DoubleSide,
  });
  const wornCopperMat = new THREE.MeshStandardMaterial({
    color: 0x7a4028,
    metalness: 0.3,
    roughness: 0.72,
    side: THREE.DoubleSide,
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x512a1d,
    metalness: 0.4,
    roughness: 0.58,
  });
  const handleHighlightMat = new THREE.MeshStandardMaterial({
    color: 0x75432d,
    metalness: 0.35,
    roughness: 0.5,
  });

  const bodyProfile = [
    new THREE.Vector2(0.00, -0.49),
    new THREE.Vector2(0.22, -0.49),
    new THREE.Vector2(0.31, -0.45),
    new THREE.Vector2(0.41, -0.37),
    new THREE.Vector2(0.49, -0.24),
    new THREE.Vector2(0.535, -0.07),
    new THREE.Vector2(0.53, 0.10),
    new THREE.Vector2(0.49, 0.24),
    new THREE.Vector2(0.42, 0.34),
    new THREE.Vector2(0.34, 0.41),
    new THREE.Vector2(0.29, 0.47),
    new THREE.Vector2(0.275, 0.55),
    new THREE.Vector2(0.275, 0.65),
    new THREE.Vector2(0.30, 0.68),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  vessel.add(body);

  const footProfile = [
    new THREE.Vector2(0.00, -0.73),
    new THREE.Vector2(0.35, -0.73),
    new THREE.Vector2(0.405, -0.705),
    new THREE.Vector2(0.42, -0.67),
    new THREE.Vector2(0.40, -0.63),
    new THREE.Vector2(0.35, -0.59),
    new THREE.Vector2(0.315, -0.555),
    new THREE.Vector2(0.30, -0.515),
    new THREE.Vector2(0.275, -0.485),
    new THREE.Vector2(0.00, -0.485),
  ];
  const footGeom = new THREE.LatheGeometry(footProfile, 64);
  const foot = new THREE.Mesh(footGeom, bodyMat);
  vessel.add(foot);

  const foot_lower_ringGeom = new THREE.TorusGeometry(0.382, 0.014, 10, 64);
  const foot_lower_ring = new THREE.Mesh(foot_lower_ringGeom, rimMat);
  foot_lower_ring.rotation.x = Math.PI / 2;
  foot_lower_ring.position.y = -0.69;
  vessel.add(foot_lower_ring);

  const foot_middle_ringGeom = new THREE.TorusGeometry(0.337, 0.012, 10, 64);
  const foot_middle_ring = new THREE.Mesh(foot_middle_ringGeom, rimMat);
  foot_middle_ring.rotation.x = Math.PI / 2;
  foot_middle_ring.position.y = -0.585;
  vessel.add(foot_middle_ring);

  const foot_upper_ringGeom = new THREE.TorusGeometry(0.292, 0.012, 10, 64);
  const foot_upper_ring = new THREE.Mesh(foot_upper_ringGeom, rimMat);
  foot_upper_ring.rotation.x = Math.PI / 2;
  foot_upper_ring.position.y = -0.505;
  vessel.add(foot_upper_ring);

  const neck_shadow_bandGeom = new THREE.TorusGeometry(0.278, 0.009, 8, 64);
  const neck_shadow_band = new THREE.Mesh(neck_shadow_bandGeom, patinaMat);
  neck_shadow_band.rotation.x = Math.PI / 2;
  neck_shadow_band.position.y = 0.535;
  vessel.add(neck_shadow_band);

  const mouth_rimProfile = [
    new THREE.Vector2(0.270, 0.640),
    new THREE.Vector2(0.330, 0.655),
    new THREE.Vector2(0.365, 0.680),
    new THREE.Vector2(0.370, 0.725),
    new THREE.Vector2(0.350, 0.755),
    new THREE.Vector2(0.245, 0.755),
    new THREE.Vector2(0.235, 0.730),
    new THREE.Vector2(0.250, 0.680),
    new THREE.Vector2(0.270, 0.640),
  ];
  const mouth_rimGeom = new THREE.LatheGeometry(mouth_rimProfile, 64);
  const mouth_rim = new THREE.Mesh(mouth_rimGeom, rimMat);
  vessel.add(mouth_rim);

  const inner_openingGeom = new THREE.CircleGeometry(0.238, 64);
  const inner_opening = new THREE.Mesh(inner_openingGeom, interiorMat);
  inner_opening.rotation.x = -Math.PI / 2;
  inner_opening.position.y = 0.747;
  vessel.add(inner_opening);

  const spout_lipShape = new THREE.Shape();
  spout_lipShape.moveTo(-0.56, 0.715);
  spout_lipShape.bezierCurveTo(-0.55, 0.765, -0.49, 0.795, -0.42, 0.795);
  spout_lipShape.bezierCurveTo(-0.33, 0.795, -0.27, 0.775, -0.18, 0.775);
  spout_lipShape.lineTo(-0.18, 0.690);
  spout_lipShape.bezierCurveTo(-0.29, 0.690, -0.38, 0.680, -0.47, 0.675);
  spout_lipShape.bezierCurveTo(-0.53, 0.675, -0.57, 0.690, -0.56, 0.715);
  spout_lipShape.closePath();

  const spout_lipGeom = new THREE.ExtrudeGeometry(spout_lipShape, 16);
  spout_lipGeom.rotateX(Math.PI / 2);
  const spout_lip = new THREE.Mesh(spout_lipGeom, rimMat);
  spout_lip.position.y = 0.765;
  vessel.add(spout_lip);

  const spout_channelShape = new THREE.Shape();
  spout_channelShape.moveTo(-0.535, -0.085);
  spout_channelShape.bezierCurveTo(-0.45, -0.105, -0.31, -0.105, -0.19, -0.085);
  spout_channelShape.lineTo(-0.19, 0.085);
  spout_channelShape.bezierCurveTo(-0.31, 0.105, -0.45, 0.105, -0.535, 0.085);
  spout_channelShape.closePath();

  const spout_channelGeom = new THREE.ShapeGeometry(spout_channelShape, 24);
  const spout_channel = new THREE.Mesh(spout_channelGeom, interiorMat);
  spout_channel.rotation.x = -Math.PI / 2;
  spout_channel.position.y = 0.766;
  vessel.add(spout_channel);

  const radiusSamples = [
    [-0.49, 0.22],
    [-0.45, 0.31],
    [-0.37, 0.41],
    [-0.24, 0.49],
    [-0.07, 0.535],
    [0.10, 0.53],
    [0.24, 0.49],
    [0.34, 0.42],
    [0.41, 0.34],
    [0.47, 0.29],
    [0.55, 0.275],
    [0.65, 0.275],
    [0.68, 0.30],
  ];

  function bodyRadiusAt(y) {
    if (y <= radiusSamples[0][0]) return radiusSamples[0][1];
    for (let i = 0; i < radiusSamples.length - 1; i++) {
      const a = radiusSamples[i];
      const b = radiusSamples[i + 1];
      if (y <= b[0]) {
        const t = (y - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return radiusSamples[radiusSamples.length - 1][1];
  }

  function surfacePose(angle, y, extra) {
    const r = bodyRadiusAt(y) + extra;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
    const pos = new THREE.Vector3(normal.x * r, y, normal.z * r);
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return { pos, quat };
  }

  const patina_spotsGeom = new THREE.CircleGeometry(1, 14);
  const patina_spots = new THREE.InstancedMesh(patina_spotsGeom, patinaMat, 34);
  const spot_dummy = new THREE.Object3D();
  for (let i = 0; i < 34; i++) {
    const angle = (i * 2.399963229728653 + 0.31) % (Math.PI * 2);
    const y = -0.39 + (((i * 37) % 100) / 100) * 0.72;
    const pose = surfacePose(angle, y, 0.006);
    const sx = 0.014 + ((i * 11) % 9) * 0.004;
    const sy = 0.010 + ((i * 7) % 8) * 0.003;
    spot_dummy.position.copy(pose.pos);
    spot_dummy.quaternion.copy(pose.quat);
    spot_dummy.scale.set(sx, sy, 1);
    spot_dummy.updateMatrix();
    patina_spots.setMatrixAt(i, spot_dummy.matrix);
  }
  patina_spots.instanceMatrix.needsUpdate = true;
  vessel.add(patina_spots);

  const worn_copper_spotsGeom = new THREE.CircleGeometry(1, 12);
  const worn_copper_spots = new THREE.InstancedMesh(worn_copper_spotsGeom, wornCopperMat, 22);
  const copper_dummy = new THREE.Object3D();
  for (let i = 0; i < 22; i++) {
    const angle = (i * 1.731 + 0.82) % (Math.PI * 2);
    const y = -0.35 + (((i * 29) % 100) / 100) * 0.68;
    const pose = surfacePose(angle, y, 0.007);
    const sx = 0.010 + ((i * 5) % 7) * 0.003;
    const sy = 0.008 + ((i * 3) % 6) * 0.0025;
    copper_dummy.position.copy(pose.pos);
    copper_dummy.quaternion.copy(pose.quat);
    copper_dummy.scale.set(sx, sy, 1);
    copper_dummy.updateMatrix();
    worn_copper_spots.setMatrixAt(i, copper_dummy.matrix);
  }
  worn_copper_spots.instanceMatrix.needsUpdate = true;
  vessel.add(worn_copper_spots);

  const upper_mountGeom = new THREE.SphereGeometry(0.075, 24, 14);
  const upper_mount = new THREE.Mesh(upper_mountGeom, bodyMat);
  upper_mount.position.set(0.285, 0.565, 0.015);
  upper_mount.scale.set(0.85, 1.0, 0.72);
  handle_group.add(upper_mount);

  const lower_mountGeom = new THREE.SphereGeometry(0.072, 24, 14);
  const lower_mount = new THREE.Mesh(lower_mountGeom, bodyMat);
  lower_mount.position.set(0.495, -0.205, 0.015);
  lower_mount.scale.set(0.78, 1.0, 0.72);
  handle_group.add(lower_mount);

  const upper_mount_rivetGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.018, 20);
  const upper_mount_rivet = new THREE.Mesh(upper_mount_rivetGeom, patinaMat);
  upper_mount_rivet.rotation.x = Math.PI / 2;
  upper_mount_rivet.position.set(0.315, 0.565, 0.078);
  handle_group.add(upper_mount_rivet);

  const lower_mount_rivetGeom = new THREE.CylinderGeometry(0.024, 0.024, 0.018, 20);
  const lower_mount_rivet = new THREE.Mesh(lower_mount_rivetGeom, patinaMat);
  lower_mount_rivet.rotation.x = Math.PI / 2;
  lower_mount_rivet.position.set(0.525, -0.205, 0.075);
  handle_group.add(lower_mount_rivet);

  const lower_handle_hookPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.50, -0.20, 0.015),
    new THREE.Vector3(0.54, -0.25, 0.015),
    new THREE.Vector3(0.55, -0.31, 0.015),
    new THREE.Vector3(0.51, -0.36, 0.015),
    new THREE.Vector3(0.47, -0.35, 0.015),
  ]);
  const lower_handle_hookGeom = new THREE.TubeGeometry(lower_handle_hookPath, 28, 0.025, 10, false);
  const lower_handle_hook = new THREE.Mesh(lower_handle_hookGeom, handleMat);
  handle_group.add(lower_handle_hook);

  const hook_tipGeom = new THREE.SphereGeometry(0.028, 16, 10);
  const hook_tip = new THREE.Mesh(hook_tipGeom, handleMat);
  hook_tip.position.set(0.47, -0.35, 0.015);
  handle_group.add(hook_tip);

  const handleCenterPoints = [
    new THREE.Vector3(0.31, 0.57, 0.015),
    new THREE.Vector3(0.42, 0.64, 0.015),
    new THREE.Vector3(0.55, 0.73, 0.015),
    new THREE.Vector3(0.68, 0.72, 0.015),
    new THREE.Vector3(0.78, 0.58, 0.015),
    new THREE.Vector3(0.81, 0.36, 0.015),
    new THREE.Vector3(0.78, 0.10, 0.015),
    new THREE.Vector3(0.69, -0.10, 0.015),
    new THREE.Vector3(0.52, -0.21, 0.015),
  ];
  const handleCenterCurve = new THREE.CatmullRomCurve3(handleCenterPoints);

  function createBraidedStrand(phase, mat) {
    const pts = [];
    const steps = 72;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const center = handleCenterCurve.getPoint(t);
      const tangent = handleCenterCurve.getTangent(t).normalize();
      const planarNormal = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
      const twist = t * Math.PI * 10 + phase;
      const offset = 0.026;
      center.add(planarNormal.multiplyScalar(Math.cos(twist) * offset));
      center.z += Math.sin(twist) * offset;
      pts.push(center);
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const geom = new THREE.TubeGeometry(curve, 108, 0.024, 10, false);
    return new THREE.Mesh(geom, mat);
  }

  const braided_strand_1 = createBraidedStrand(0, handleHighlightMat);
  handle_group.add(braided_strand_1);

  const braided_strand_2 = createBraidedStrand((Math.PI * 2) / 3, handleMat);
  handle_group.add(braided_strand_2);

  const braided_strand_3 = createBraidedStrand((Math.PI * 4) / 3, handleHighlightMat);
  handle_group.add(braided_strand_3);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  box.getSize(size);
  const ctr = new THREE.Vector3();
  box.getCenter(ctr);
  root.position.sub(ctr);
  const m = Math.max(size.x, size.y, size.z);
  if (m > 0) root.scale.setScalar(0.98 / m);
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
