// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "floral_ceramic_goblet";

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf3efe3,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xf3efe3,
    emissiveIntensity: 0.55,
    side: THREE.DoubleSide,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xf3efe3,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xf3efe3,
    emissiveIntensity: 0.55,
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0xa8b39a,
    metalness: 0.0,
    roughness: 0.4,
  });
  const handleAccentMat = new THREE.MeshStandardMaterial({
    color: 0x746744,
    metalness: 0.0,
    roughness: 0.4,
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x526b45,
    metalness: 0.0,
    roughness: 0.4,
  });
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x66805a,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const leafOutlineMat = new THREE.MeshStandardMaterial({
    color: 0x3f5738,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const palePinkMat = new THREE.MeshStandardMaterial({
    color: 0xe7a5ad,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const rosePinkMat = new THREE.MeshStandardMaterial({
    color: 0xc96f7d,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const deepPinkMat = new THREE.MeshStandardMaterial({
    color: 0xa94e61,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const lavenderMat = new THREE.MeshStandardMaterial({
    color: 0x806b91,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const flowerCenterMat = new THREE.MeshStandardMaterial({
    color: 0xb6a653,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const darkCenterMat = new THREE.MeshStandardMaterial({
    color: 0x59333a,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const cup_bodyProfile = [
    new THREE.Vector2(0.00, -0.54),
    new THREE.Vector2(0.28, -0.54),
    new THREE.Vector2(0.34, -0.52),
    new THREE.Vector2(0.39, -0.47),
    new THREE.Vector2(0.44, -0.38),
    new THREE.Vector2(0.49, -0.25),
    new THREE.Vector2(0.53, -0.08),
    new THREE.Vector2(0.56, 0.10),
    new THREE.Vector2(0.59, 0.29),
    new THREE.Vector2(0.61, 0.42),
    new THREE.Vector2(0.61, 0.47),
    new THREE.Vector2(0.59, 0.50),
    new THREE.Vector2(0.56, 0.49),
    new THREE.Vector2(0.545, 0.43),
    new THREE.Vector2(0.525, 0.25),
    new THREE.Vector2(0.49, 0.05),
    new THREE.Vector2(0.44, -0.15),
    new THREE.Vector2(0.38, -0.31),
    new THREE.Vector2(0.31, -0.40),
    new THREE.Vector2(0.23, -0.43),
    new THREE.Vector2(0.00, -0.43),
  ];
  const cup_bodyGeom = new THREE.LatheGeometry(cup_bodyProfile, 64);
  const cup_body = new THREE.Mesh(cup_bodyGeom, ceramicMat);
  cup_body.name = "cup_body";
  root.add(cup_body);

  const foot_ringGeom = new THREE.CylinderGeometry(0.34, 0.31, 0.075, 48);
  const foot_ring = new THREE.Mesh(foot_ringGeom, ceramicMat);
  foot_ring.name = "foot_ring";
  foot_ring.position.y = -0.565;
  root.add(foot_ring);

  const rimGeom = new THREE.TorusGeometry(0.585, 0.025, 12, 64);
  const rim = new THREE.Mesh(rimGeom, rimMat);
  rim.name = "rim";
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.485;
  root.add(rim);

  const handlePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.56, 0.31, 0.00),
    new THREE.Vector3(0.66, 0.34, 0.00),
    new THREE.Vector3(0.76, 0.44, 0.00),
    new THREE.Vector3(0.91, 0.47, 0.00),
    new THREE.Vector3(1.03, 0.40, 0.00),
    new THREE.Vector3(1.08, 0.25, 0.00),
    new THREE.Vector3(1.06, 0.08, 0.00),
    new THREE.Vector3(0.98, -0.07, 0.00),
    new THREE.Vector3(0.84, -0.18, 0.00),
    new THREE.Vector3(0.69, -0.28, 0.00),
    new THREE.Vector3(0.54, -0.34, 0.00),
    new THREE.Vector3(0.43, -0.31, 0.00),
  ], false, "centripetal");
  const handleGeom = new THREE.TubeGeometry(handlePath, 72, 0.065, 14, false);
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.name = "handle";
  root.add(handle);

  const handle_mountGeom = new THREE.SphereGeometry(1, 24, 14);

  const upper_handle_mount = new THREE.Mesh(handle_mountGeom, handleMat);
  upper_handle_mount.name = "upper_handle_mount";
  upper_handle_mount.position.set(0.575, 0.31, 0);
  upper_handle_mount.scale.set(0.105, 0.085, 0.09);
  root.add(upper_handle_mount);

  const lower_handle_mount = new THREE.Mesh(handle_mountGeom, handleMat);
  lower_handle_mount.name = "lower_handle_mount";
  lower_handle_mount.position.set(0.44, -0.31, 0);
  lower_handle_mount.scale.set(0.105, 0.075, 0.085);
  root.add(lower_handle_mount);

  const handle_accentGeom = new THREE.SphereGeometry(1, 16, 10);
  const handle_accent_data = [
    [0.925, 0.455, 0.058, 0.026, 0.014, 0.018],
    [1.055, 0.335, 0.058, 0.018, 0.034, 0.012],
    [1.035, 0.075, 0.058, 0.020, 0.030, 0.012],
    [0.875, -0.165, 0.058, 0.030, 0.016, 0.013],
    [0.625, -0.295, 0.055, 0.026, 0.015, 0.012],
  ];
  const handle_accent_marks = new THREE.InstancedMesh(
    handle_accentGeom,
    handleAccentMat,
    handle_accent_data.length
  );
  handle_accent_marks.name = "handle_accent_marks";
  const accent_dummy = new THREE.Object3D();
  for (let i = 0; i < handle_accent_data.length; i++) {
    const d = handle_accent_data[i];
    accent_dummy.position.set(d[0], d[1], d[2]);
    accent_dummy.rotation.set(0, 0, i * 0.37);
    accent_dummy.scale.set(d[3], d[4], d[5]);
    accent_dummy.updateMatrix();
    handle_accent_marks.setMatrixAt(i, accent_dummy.matrix);
  }
  handle_accent_marks.instanceMatrix.needsUpdate = true;
  root.add(handle_accent_marks);

  const floral_decoration = new THREE.Group();
  floral_decoration.name = "floral_decoration";
  root.add(floral_decoration);

  function bodyRadiusAt(y) {
    if (y <= -0.47) return 0.39;
    if (y <= -0.38) return 0.39 + (y + 0.47) / 0.09 * 0.05;
    if (y <= -0.25) return 0.44 + (y + 0.38) / 0.13 * 0.05;
    if (y <= -0.08) return 0.49 + (y + 0.25) / 0.17 * 0.04;
    if (y <= 0.10) return 0.53 + (y + 0.08) / 0.18 * 0.03;
    if (y <= 0.29) return 0.56 + (y - 0.10) / 0.19 * 0.03;
    if (y <= 0.42) return 0.59 + (y - 0.29) / 0.13 * 0.02;
    return 0.61;
  }

  function surfacePose(angle, y, extra) {
    const radius = bodyRadiusAt(y) + extra;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
    const position = new THREE.Vector3(normal.x * radius, y, normal.z * radius);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  function addSurfaceVine(name, controls, radius) {
    const points = [];
    for (let i = 0; i < controls.length; i++) {
      points.push(surfacePose(controls[i][0], controls[i][1], 0.006).position);
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(16, controls.length * 8),
      radius,
      6,
      false
    );
    const vine = new THREE.Mesh(geometry, stemMat);
    vine.name = name;
    floral_decoration.add(vine);
    return vine;
  }

  const main_vine = addSurfaceVine("main_vine", [
    [1.55, -0.43],
    [1.58, -0.32],
    [1.62, -0.18],
    [1.67, -0.03],
    [1.72, 0.10],
    [1.78, 0.20],
  ], 0.0045);

  const left_vine = addSurfaceVine("left_vine", [
    [1.60, -0.27],
    [1.78, -0.18],
    [1.96, -0.08],
    [2.12, 0.04],
    [2.25, 0.16],
    [2.34, 0.28],
  ], 0.004);

  const lower_left_vine = addSurfaceVine("lower_left_vine", [
    [1.57, -0.39],
    [1.78, -0.36],
    [1.98, -0.31],
    [2.15, -0.23],
    [2.28, -0.13],
  ], 0.004);

  const right_vine = addSurfaceVine("right_vine", [
    [1.58, -0.29],
    [1.43, -0.20],
    [1.27, -0.10],
    [1.12, 0.02],
    [0.98, 0.15],
    [0.90, 0.28],
  ], 0.004);

  const lower_right_vine = addSurfaceVine("lower_right_vine", [
    [1.56, -0.40],
    [1.39, -0.37],
    [1.22, -0.32],
    [1.06, -0.25],
    [0.93, -0.16],
  ], 0.004);

  const center_branch = addSurfaceVine("center_branch", [
    [1.66, -0.08],
    [1.55, 0.02],
    [1.46, 0.12],
    [1.40, 0.22],
  ], 0.0038);

  const petalGeom = new THREE.CircleGeometry(1, 20);
  const flower_centerGeom = new THREE.CircleGeometry(1, 18);

  function addFlower(name, angle, y, size, petalMat, centerMat, petalCount) {
    const flower_group = new THREE.Group();
    flower_group.name = name;

    const flower_petals = new THREE.InstancedMesh(
      petalGeom,
      petalMat,
      petalCount
    );
    flower_petals.name = name + "_petals";

    const petal_dummy = new THREE.Object3D();
    for (let i = 0; i < petalCount; i++) {
      const a = i / petalCount * Math.PI * 2;
      const localX = Math.cos(a) * size * 0.43;
      const localY = Math.sin(a) * size * 0.43;
      const petalY = y + localY;
      const petalAngle = angle - localX / bodyRadiusAt(petalY);
      const pose = surfacePose(petalAngle, petalY, 0.007);

      petal_dummy.position.copy(pose.position);
      petal_dummy.quaternion.copy(pose.quaternion);
      petal_dummy.rotateZ(a - Math.PI / 2);
      petal_dummy.scale.set(size * 0.30, size * 0.52, 1);
      petal_dummy.updateMatrix();
      flower_petals.setMatrixAt(i, petal_dummy.matrix);
    }
    flower_petals.instanceMatrix.needsUpdate = true;
    flower_group.add(flower_petals);

    const centerPose = surfacePose(angle, y, 0.009);
    const flower_center = new THREE.Mesh(flower_centerGeom, centerMat);
    flower_center.name = name + "_center";
    flower_center.position.copy(centerPose.position);
    flower_center.quaternion.copy(centerPose.quaternion);
    flower_center.scale.set(size * 0.22, size * 0.22, 1);
    flower_group.add(flower_center);

    floral_decoration.add(flower_group);
    return flower_group;
  }

  const large_left_flower = addFlower(
    "large_left_flower",
    2.12,
    0.035,
    0.105,
    palePinkMat,
    flowerCenterMat,
    7
  );
  const center_flower = addFlower(
    "center_flower",
    1.57,
    -0.105,
    0.083,
    palePinkMat,
    flowerCenterMat,
    7
  );
  const right_rose = addFlower(
    "right_rose",
    1.02,
    -0.015,
    0.092,
    rosePinkMat,
    darkCenterMat,
    7
  );
  const upper_left_blossom = addFlower(
    "upper_left_blossom",
    1.82,
    0.145,
    0.064,
    rosePinkMat,
    deepPinkMat,
    5
  );
  const lower_right_blossom = addFlower(
    "lower_right_blossom",
    1.18,
    -0.285,
    0.067,
    palePinkMat,
    deepPinkMat,
    5
  );
  const lower_left_blossom = addFlower(
    "lower_left_blossom",
    2.23,
    -0.235,
    0.052,
    rosePinkMat,
    flowerCenterMat,
    5
  );
  const upper_right_flower = addFlower(
    "upper_right_flower",
    0.91,
    0.205,
    0.055,
    palePinkMat,
    deepPinkMat,
    5
  );
  const small_center_rose = addFlower(
    "small_center_rose",
    1.43,
    0.105,
    0.052,
    rosePinkMat,
    darkCenterMat,
    5
  );

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -1);
  leafShape.bezierCurveTo(0.62, -0.48, 0.62, 0.48, 0, 1);
  leafShape.bezierCurveTo(-0.62, 0.48, -0.62, -0.48, 0, -1);

  const leafGeom = new THREE.ShapeGeometry(leafShape, 10);
  const leaf_data = [
    [2.27, 0.205, 0.040, -0.70],
    [2.18, 0.115, 0.043, 0.72],
    [2.02, 0.095, 0.046, -0.82],
    [1.91, -0.015, 0.048, 0.72],
    [1.82, -0.115, 0.046, -0.72],
    [1.72, -0.215, 0.050, 0.78],
    [1.62, -0.315, 0.052, -0.72],
    [1.50, -0.365, 0.050, 0.70],
    [1.38, -0.325, 0.047, -0.78],
    [1.27, -0.245, 0.046, 0.72],
    [1.15, -0.155, 0.044, -0.76],
    [1.04, -0.065, 0.043, 0.72],
    [0.94, 0.105, 0.041, -0.70],
    [0.88, 0.255, 0.038, 0.72],
    [1.55, 0.035, 0.047, -0.78],
    [1.47, 0.145, 0.043, 0.72],
    [1.70, 0.185, 0.040, -0.72],
    [2.31, -0.145, 0.039, 0.70],
    [2.13, -0.305, 0.041, -0.72],
    [1.92, -0.345, 0.043, 0.76],
    [1.31, -0.375, 0.042, -0.72],
    [1.08, -0.235, 0.038, 0.72],
  ];

  const painted_leaves = new THREE.InstancedMesh(
    leafGeom,
    leafMat,
    leaf_data.length
  );
  painted_leaves.name = "painted_leaves";

  const leaf_outlines = new THREE.InstancedMesh(
    leafGeom,
    leafOutlineMat,
    leaf_data.length
  );
  leaf_outlines.name = "leaf_outlines";

  const leaf_dummy = new THREE.Object3D();
  const outline_dummy = new THREE.Object3D();
  for (let i = 0; i < leaf_data.length; i++) {
    const d = leaf_data[i];

    const outlinePose = surfacePose(d[0], d[1], 0.005);
    outline_dummy.position.copy(outlinePose.position);
    outline_dummy.quaternion.copy(outlinePose.quaternion);
    outline_dummy.rotateZ(d[3]);
    outline_dummy.scale.set(d[2] * 1.10, d[2] * 1.08, 1);
    outline_dummy.updateMatrix();
    leaf_outlines.setMatrixAt(i, outline_dummy.matrix);

    const leafPose = surfacePose(d[0], d[1], 0.007);
    leaf_dummy.position.copy(leafPose.position);
    leaf_dummy.quaternion.copy(leafPose.quaternion);
    leaf_dummy.rotateZ(d[3]);
    leaf_dummy.scale.set(d[2] * 0.94, d[2] * 0.96, 1);
    leaf_dummy.updateMatrix();
    painted_leaves.setMatrixAt(i, leaf_dummy.matrix);
  }
  painted_leaves.instanceMatrix.needsUpdate = true;
  leaf_outlines.instanceMatrix.needsUpdate = true;
  floral_decoration.add(leaf_outlines);
  floral_decoration.add(painted_leaves);

  const bud_data = [
    [2.34, 0.285, 0.020, -0.35],
    [2.28, 0.225, 0.017, 0.45],
    [1.78, 0.205, 0.019, -0.45],
    [1.40, 0.225, 0.018, 0.35],
    [0.90, 0.285, 0.020, -0.30],
    [0.94, 0.235, 0.017, 0.45],
    [0.93, -0.165, 0.018, -0.40],
    [2.28, -0.135, 0.018, 0.35],
    [1.06, -0.255, 0.017, -0.35],
    [2.15, -0.235, 0.017, 0.40],
  ];
  const painted_buds = new THREE.InstancedMesh(
    petalGeom,
    rosePinkMat,
    bud_data.length
  );
  painted_buds.name = "painted_buds";
  const bud_dummy = new THREE.Object3D();
  for (let i = 0; i < bud_data.length; i++) {
    const d = bud_data[i];
    const pose = surfacePose(d[0], d[1], 0.007);
    bud_dummy.position.copy(pose.position);
    bud_dummy.quaternion.copy(pose.quaternion);
    bud_dummy.rotateZ(d[3]);
    bud_dummy.scale.set(d[2] * 0.62, d[2], 1);
    bud_dummy.updateMatrix();
    painted_buds.setMatrixAt(i, bud_dummy.matrix);
  }
  painted_buds.instanceMatrix.needsUpdate = true;
  floral_decoration.add(painted_buds);

  const lavender_data = [
    [1.93, 0.275, 0.014, -0.35],
    [1.89, 0.245, 0.013, 0.35],
    [1.85, 0.215, 0.012, -0.45],
    [1.81, 0.185, 0.011, 0.40],
    [1.00, 0.315, 0.013, -0.30],
    [0.96, 0.285, 0.012, 0.35],
    [0.92, 0.255, 0.011, -0.40],
  ];
  const lavender_blossoms = new THREE.InstancedMesh(
    petalGeom,
    lavenderMat,
    lavender_data.length
  );
  lavender_blossoms.name = "lavender_blossoms";
  const lavender_dummy = new THREE.Object3D();
  for (let i = 0; i < lavender_data.length; i++) {
    const d = lavender_data[i];
    const pose = surfacePose(d[0], d[1], 0.007);
    lavender_dummy.position.copy(pose.position);
    lavender_dummy.quaternion.copy(pose.quaternion);
    lavender_dummy.rotateZ(d[3]);
    lavender_dummy.scale.set(d[2] * 0.65, d[2], 1);
    lavender_dummy.updateMatrix();
    lavender_blossoms.setMatrixAt(i, lavender_dummy.matrix);
  }
  lavender_blossoms.instanceMatrix.needsUpdate = true;
  floral_decoration.add(lavender_blossoms);

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