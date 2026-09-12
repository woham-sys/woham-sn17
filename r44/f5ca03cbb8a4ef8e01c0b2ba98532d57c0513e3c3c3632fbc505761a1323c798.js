// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ceramic_girl_figurine";

  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xf1d5b5,
    metalness: 0.0,
    roughness: 0.4,
  });
  const dressMat = new THREE.MeshStandardMaterial({
    color: 0xc7d7dc,
    metalness: 0.0,
    roughness: 0.4,
  });
  const dressSeamMat = new THREE.MeshStandardMaterial({
    color: 0x9fb4bc,
    metalness: 0.0,
    roughness: 0.4,
  });
  const hairMat = new THREE.MeshStandardMaterial({
    color: 0x281b1a,
    metalness: 0.0,
    roughness: 0.4,
  });
  const hairHighlightMat = new THREE.MeshStandardMaterial({
    color: 0x4a302d,
    metalness: 0.0,
    roughness: 0.4,
  });
  const jointMat = new THREE.MeshStandardMaterial({
    color: 0x4b3029,
    metalness: 0.0,
    roughness: 0.4,
  });
  const jointGrooveMat = new THREE.MeshStandardMaterial({
    color: 0x241715,
    metalness: 0.0,
    roughness: 0.4,
  });
  const shoeMat = new THREE.MeshStandardMaterial({
    color: 0x2b1b19,
    metalness: 0.0,
    roughness: 0.4,
  });
  const eyeWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xfffdf7,
    metalness: 0.0,
    roughness: 0.4,
  });
  const irisMat = new THREE.MeshStandardMaterial({
    color: 0x174d73,
    metalness: 0.0,
    roughness: 0.4,
  });
  const pupilMat = new THREE.MeshStandardMaterial({
    color: 0x101216,
    metalness: 0.0,
    roughness: 0.4,
  });
  const lipMat = new THREE.MeshStandardMaterial({
    color: 0xe84f68,
    metalness: 0.0,
    roughness: 0.4,
  });
  const lipDarkMat = new THREE.MeshStandardMaterial({
    color: 0xa92f4d,
    metalness: 0.0,
    roughness: 0.4,
  });
  const blushMat = new THREE.MeshStandardMaterial({
    color: 0xf28fa0,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2,
  });
  const pendantMat = new THREE.MeshStandardMaterial({
    color: 0xe56f86,
    metalness: 0.0,
    roughness: 0.4,
  });

  const sphereGeom = new THREE.SphereGeometry(1, 32, 20);
  const smallSphereGeom = new THREE.SphereGeometry(1, 20, 12);
  const dummy = new THREE.Object3D();
  const yAxis = new THREE.Vector3(0, 1, 0);

  function setInstance(mesh, index, x, y, z, sx, sy, sz, rx = 0, ry = 0, rz = 0) {
    dummy.position.set(x, y, z);
    dummy.rotation.set(rx, ry, rz);
    dummy.scale.set(sx, sy, sz);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  function setSegmentInstance(mesh, index, start, end, radius) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    direction.normalize();
    dummy.position.copy(midpoint);
    dummy.quaternion.setFromUnitVectors(yAxis, direction);
    dummy.scale.set(radius, length, radius);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  function addSegment(parent, name, start, end, radius, material, geometry) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const segment = new THREE.Mesh(geometry || sphereGeom, material);
    segment.name = name;
    segment.position.copy(new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5));
    segment.quaternion.setFromUnitVectors(yAxis, direction.clone().normalize());
    segment.scale.set(radius, length, radius);
    parent.add(segment);
    return segment;
  }

  function addEllipsoid(parent, name, x, y, z, sx, sy, sz, material, rx = 0, ry = 0, rz = 0) {
    const ellipsoid = new THREE.Mesh(sphereGeom, material);
    ellipsoid.name = name;
    ellipsoid.position.set(x, y, z);
    ellipsoid.scale.set(sx, sy, sz);
    ellipsoid.rotation.set(rx, ry, rz);
    parent.add(ellipsoid);
    return ellipsoid;
  }

  function addCurveTube(parent, name, points, radius, material, segments = 24) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments, radius, 8, false),
      material
    );
    tube.name = name;
    parent.add(tube);
    return tube;
  }

  const dress_group = new THREE.Group();
  dress_group.name = "dress_group";
  root.add(dress_group);

  const skirtProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.78, 0.00),
    new THREE.Vector2(0.84, 0.035),
    new THREE.Vector2(0.86, 0.09),
    new THREE.Vector2(0.83, 0.18),
    new THREE.Vector2(0.76, 0.36),
    new THREE.Vector2(0.66, 0.57),
    new THREE.Vector2(0.54, 0.78),
    new THREE.Vector2(0.42, 0.98),
    new THREE.Vector2(0.37, 1.04),
    new THREE.Vector2(0.00, 1.04),
  ];
  const skirtGeom = new THREE.LatheGeometry(skirtProfile, 48);
  const skirt = new THREE.Mesh(skirtGeom, dressMat);
  skirt.name = "skirt";
  skirt.position.y = 0.82;
  dress_group.add(skirt);

  const skirt_hemGeom = new THREE.TorusGeometry(0.82, 0.025, 10, 48);
  const skirt_hem = new THREE.Mesh(skirt_hemGeom, dressSeamMat);
  skirt_hem.name = "skirt_hem";
  skirt_hem.rotation.x = Math.PI / 2;
  skirt_hem.position.y = 0.855;
  dress_group.add(skirt_hem);

  const waist_seamGeom = new THREE.TorusGeometry(0.37, 0.014, 8, 40);
  const waist_seam = new THREE.Mesh(waist_seamGeom, dressSeamMat);
  waist_seam.name = "waist_seam";
  waist_seam.rotation.x = Math.PI / 2;
  waist_seam.position.y = 1.855;
  dress_group.add(waist_seam);

  const skirt_pleats = new THREE.Group();
  skirt_pleats.name = "skirt_pleats";
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    const pleatPoints = [];
    for (let j = 0; j <= 5; j++) {
      const t = j / 5;
      const y = 1.83 - t * 0.91;
      const radius = 0.385 + t * 0.455;
      pleatPoints.push(new THREE.Vector3(
        Math.sin(angle) * radius,
        y,
        Math.cos(angle) * radius + 0.006
      ));
    }
    addCurveTube(skirt_pleats, "skirt_pleat_" + i, pleatPoints, 0.006, dressSeamMat, 16);
  }
  dress_group.add(skirt_pleats);

  const bodiceGeom = new THREE.CylinderGeometry(0.43, 0.36, 0.78, 40);
  const bodice = new THREE.Mesh(bodiceGeom, dressMat);
  bodice.name = "bodice";
  bodice.position.y = 2.24;
  bodice.scale.z = 0.62;
  dress_group.add(bodice);

  const necklineGeom = new THREE.TorusGeometry(0.18, 0.012, 8, 36);
  const neckline = new THREE.Mesh(necklineGeom, dressSeamMat);
  neckline.name = "neckline";
  neckline.rotation.x = Math.PI / 2;
  neckline.scale.set(1.15, 0.78, 1);
  neckline.position.set(0, 2.625, 0.015);
  dress_group.add(neckline);

  const bodice_seamGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.56, 8);
  const bodice_seams = new THREE.InstancedMesh(bodice_seamGeom, dressSeamMat, 2);
  bodice_seams.name = "bodice_seams";
  setInstance(bodice_seams, 0, -0.19, 2.22, 0.246, 1, 1, 1);
  setInstance(bodice_seams, 1, 0.19, 2.22, 0.246, 1, 1, 1);
  bodice_seams.instanceMatrix.needsUpdate = true;
  dress_group.add(bodice_seams);

  const sleeveGeom = new THREE.SphereGeometry(1, 28, 18);
  const sleeves = new THREE.InstancedMesh(sleeveGeom, dressMat, 2);
  sleeves.name = "sleeves";
  setInstance(sleeves, 0, -0.47, 2.43, 0.00, 0.22, 0.25, 0.20, 0, 0, -0.12);
  setInstance(sleeves, 1, 0.47, 2.43, 0.00, 0.22, 0.25, 0.20, 0, 0, 0.12);
  sleeves.instanceMatrix.needsUpdate = true;
  dress_group.add(sleeves);

  const sleeve_cuffGeom = new THREE.TorusGeometry(0.17, 0.012, 8, 32);
  const sleeve_cuffs = new THREE.InstancedMesh(sleeve_cuffGeom, dressSeamMat, 2);
  sleeve_cuffs.name = "sleeve_cuffs";
  setInstance(sleeve_cuffs, 0, -0.49, 2.30, 0.00, 1.0, 0.86, 1.0, Math.PI / 2, 0, -0.12);
  setInstance(sleeve_cuffs, 1, 0.49, 2.30, 0.00, 1.0, 0.86, 1.0, Math.PI / 2, 0, 0.12);
  sleeve_cuffs.instanceMatrix.needsUpdate = true;
  dress_group.add(sleeve_cuffs);

  const gold_vine_left = addCurveTube(
    dress_group,
    "gold_vine_left",
    [
      new THREE.Vector3(-0.025, 2.43, 0.278),
      new THREE.Vector3(-0.10, 2.47, 0.282),
      new THREE.Vector3(-0.18, 2.43, 0.280),
      new THREE.Vector3(-0.27, 2.46, 0.270),
      new THREE.Vector3(-0.34, 2.42, 0.255),
    ],
    0.008,
    goldMat,
    24
  );

  const gold_vine_right = addCurveTube(
    dress_group,
    "gold_vine_right",
    [
      new THREE.Vector3(0.025, 2.43, 0.278),
      new THREE.Vector3(0.10, 2.47, 0.282),
      new THREE.Vector3(0.18, 2.43, 0.280),
      new THREE.Vector3(0.27, 2.46, 0.270),
      new THREE.Vector3(0.34, 2.42, 0.255),
    ],
    0.008,
    goldMat,
    24
  );

  const goldLeafGeom = new THREE.SphereGeometry(1, 12, 8);
  const gold_leaves = new THREE.InstancedMesh(goldLeafGeom, goldMat, 10);
  gold_leaves.name = "gold_leaves";
  const leafData = [
    [-0.08, 2.47, 0.288, 0.030, 0.014, 0.006, 0.55],
    [-0.14, 2.44, 0.286, 0.030, 0.014, 0.006, -0.55],
    [-0.21, 2.46, 0.280, 0.032, 0.015, 0.006, 0.55],
    [-0.28, 2.44, 0.270, 0.032, 0.015, 0.006, -0.55],
    [-0.34, 2.42, 0.258, 0.028, 0.013, 0.006, 0.35],
    [0.08, 2.47, 0.288, 0.030, 0.014, 0.006, -0.55],
    [0.14, 2.44, 0.286, 0.030, 0.014, 0.006, 0.55],
    [0.21, 2.46, 0.280, 0.032, 0.015, 0.006, -0.55],
    [0.28, 2.44, 0.270, 0.032, 0.015, 0.006, 0.55],
    [0.34, 2.42, 0.258, 0.028, 0.013, 0.006, -0.35],
  ];
  for (let i = 0; i < leafData.length; i++) {
    const d = leafData[i];
    setInstance(gold_leaves, i, d[0], d[1], d[2], d[3], d[4], d[5], 0, 0, d[6]);
  }
  gold_leaves.instanceMatrix.needsUpdate = true;
  dress_group.add(gold_leaves);

  const pendant_backingGeom = new THREE.TorusGeometry(0.055, 0.009, 8, 24);
  const pendant_backing = new THREE.Mesh(pendant_backingGeom, goldMat);
  pendant_backing.name = "pendant_backing";
  pendant_backing.position.set(0, 2.36, 0.286);
  dress_group.add(pendant_backing);

  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, -0.055);
  heartShape.bezierCurveTo(-0.075, -0.005, -0.075, 0.065, 0, 0.045);
  heartShape.bezierCurveTo(0.075, 0.065, 0.075, -0.005, 0, -0.055);
  const heart_pendantGeom = new THREE.ExtrudeGeometry(heartShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  const heart_pendant = new THREE.Mesh(heart_pendantGeom, pendantMat);
  heart_pendant.name = "heart_pendant";
  heart_pendant.position.set(0, 2.36, 0.286);
  dress_group.add(heart_pendant);

  const buttonGeom = new THREE.SphereGeometry(1, 20, 12);
  const dress_buttons = new THREE.InstancedMesh(buttonGeom, goldMat, 2);
  dress_buttons.name = "dress_buttons";
  setInstance(dress_buttons, 0, 0, 2.10, 0.273, 0.045, 0.045, 0.018);
  setInstance(dress_buttons, 1, 0, 1.88, 0.260, 0.032, 0.032, 0.014);
  dress_buttons.instanceMatrix.needsUpdate = true;
  dress_group.add(dress_buttons);

  const gold_bird_left_wing = addEllipsoid(
    dress_group, "gold_bird_left_wing",
    -0.027, 1.91, 0.267, 0.045, 0.020, 0.010, goldMat, 0, 0, -0.55
  );
  const gold_bird_right_wing = addEllipsoid(
    dress_group, "gold_bird_right_wing",
    0.027, 1.91, 0.267, 0.045, 0.020, 0.010, goldMat, 0, 0, 0.55
  );
  const gold_bird_body = addEllipsoid(
    dress_group, "gold_bird_body",
    0, 1.885, 0.268, 0.020, 0.035, 0.010, goldMat
  );

  const arms_group = new THREE.Group();
  arms_group.name = "arms_group";
  root.add(arms_group);

  const upperArmGeom = new THREE.CylinderGeometry(0.82, 1, 1, 24);
  const forearmGeom = new THREE.CylinderGeometry(0.68, 1, 1, 24);

  const leftShoulderPoint = new THREE.Vector3(-0.53, 2.39, 0.00);
  const leftElbowPoint = new THREE.Vector3(-0.78, 1.98, 0.035);
  const leftWristPoint = new THREE.Vector3(-1.06, 1.56, 0.085);
  const rightShoulderPoint = new THREE.Vector3(0.53, 2.39, 0.00);
  const rightElbowPoint = new THREE.Vector3(0.78, 1.98, 0.035);
  const rightWristPoint = new THREE.Vector3(1.06, 1.56, 0.085);

  const left_upper_arm = addSegment(
    arms_group, "left_upper_arm",
    leftShoulderPoint, leftElbowPoint, 0.125, skinMat, upperArmGeom
  );
  const right_upper_arm = addSegment(
    arms_group, "right_upper_arm",
    rightShoulderPoint, rightElbowPoint, 0.125, skinMat, upperArmGeom
  );
  const left_forearm = addSegment(
    arms_group, "left_forearm",
    leftElbowPoint, leftWristPoint, 0.112, skinMat, forearmGeom
  );
  const right_forearm = addSegment(
    arms_group, "right_forearm",
    rightElbowPoint, rightWristPoint, 0.112, skinMat, forearmGeom
  );

  const elbow_jointGeom = new THREE.SphereGeometry(1, 24, 16);
  const elbow_joints = new THREE.InstancedMesh(elbow_jointGeom, jointMat, 2);
  elbow_joints.name = "elbow_joints";
  setInstance(elbow_joints, 0, -0.78, 1.98, 0.035, 0.145, 0.145, 0.145);
  setInstance(elbow_joints, 1, 0.78, 1.98, 0.035, 0.145, 0.145, 0.145);
  elbow_joints.instanceMatrix.needsUpdate = true;
  arms_group.add(elbow_joints);

  const elbow_grooveGeom = new THREE.TorusGeometry(0.128, 0.008, 6, 28);
  const elbow_grooves = new THREE.InstancedMesh(elbow_grooveGeom, jointGrooveMat, 2);
  elbow_grooves.name = "elbow_grooves";
  setInstance(elbow_grooves, 0, -0.78, 1.98, 0.035, 1, 1, 1, 0, Math.PI / 2, 0);
  setInstance(elbow_grooves, 1, 0.78, 1.98, 0.035, 1, 1, 1, 0, Math.PI / 2, 0);
  elbow_grooves.instanceMatrix.needsUpdate = true;
  arms_group.add(elbow_grooves);

  const wrist_collarGeom = new THREE.TorusGeometry(0.105, 0.012, 8, 28);
  const wrist_collars = new THREE.InstancedMesh(wrist_collarGeom, jointMat, 2);
  wrist_collars.name = "wrist_collars";
  setInstance(wrist_collars, 0, -1.055, 1.57, 0.083, 1, 1, 1, Math.PI / 2, 0, -0.55);
  setInstance(wrist_collars, 1, 1.055, 1.57, 0.083, 1, 1, 1, Math.PI / 2, 0, 0.55);
  wrist_collars.instanceMatrix.needsUpdate = true;
  arms_group.add(wrist_collars);

  const palmGeom = new THREE.SphereGeometry(1, 24, 16);
  const left_palm = new THREE.Mesh(palmGeom, skinMat);
  left_palm.name = "left_palm";
  left_palm.position.set(-1.14, 1.43, 0.105);
  left_palm.scale.set(0.13, 0.15, 0.075);
  left_palm.rotation.z = -0.45;
  arms_group.add(left_palm);

  const right_palm = new THREE.Mesh(palmGeom, skinMat);
  right_palm.name = "right_palm";
  right_palm.position.set(1.14, 1.43, 0.105);
  right_palm.scale.set(0.13, 0.15, 0.075);
  right_palm.rotation.z = 0.45;
  arms_group.add(right_palm);

  const fingerGeom = new THREE.CylinderGeometry(0.62, 1, 1, 16);
  const fingers = new THREE.InstancedMesh(fingerGeom, skinMat, 8);
  fingers.name = "fingers";
  const fingerData = [
    [new THREE.Vector3(-1.18, 1.43, 0.11), new THREE.Vector3(-1.29, 1.34, 0.12), 0.034],
    [new THREE.Vector3(-1.20, 1.42, 0.13), new THREE.Vector3(-1.32, 1.32, 0.14), 0.033],
    [new THREE.Vector3(-1.21, 1.42, 0.15), new THREE.Vector3(-1.32, 1.35, 0.17), 0.031],
    [new THREE.Vector3(-1.16, 1.40, 0.16), new THREE.Vector3(-1.23, 1.29, 0.18), 0.030],
    [new THREE.Vector3(1.18, 1.43, 0.11), new THREE.Vector3(1.29, 1.34, 0.12), 0.034],
    [new THREE.Vector3(1.20, 1.42, 0.13), new THREE.Vector3(1.32, 1.32, 0.14), 0.033],
    [new THREE.Vector3(1.21, 1.42, 0.15), new THREE.Vector3(1.32, 1.35, 0.17), 0.031],
    [new THREE.Vector3(1.16, 1.40, 0.16), new THREE.Vector3(1.23, 1.29, 0.18), 0.030],
  ];
  for (let i = 0; i < fingerData.length; i++) {
    setSegmentInstance(fingers, i, fingerData[i][0], fingerData[i][1], fingerData[i][2]);
  }
  fingers.instanceMatrix.needsUpdate = true;
  arms_group.add(fingers);

  const thumbs = new THREE.InstancedMesh(smallSphereGeom, skinMat, 2);
  thumbs.name = "thumbs";
  setInstance(thumbs, 0, -1.10, 1.40, 0.145, 0.055, 0.095, 0.050, 0, 0, -0.65);
  setInstance(thumbs, 1, 1.10, 1.40, 0.145, 0.055, 0.095, 0.050, 0, 0, 0.65);
  thumbs.instanceMatrix.needsUpdate = true;
  arms_group.add(thumbs);

  const legs_group = new THREE.Group();
  legs_group.name = "legs_group";
  root.add(legs_group);

  const thighGeom = new THREE.CylinderGeometry(0.84, 1, 1, 28);
  const calfGeom = new THREE.CylinderGeometry(0.68, 1, 1, 28);
  const leftHipPoint = new THREE.Vector3(-0.20, 0.91, 0.00);
  const leftKneePoint = new THREE.Vector3(-0.23, 0.38, 0.035);
  const leftAnklePoint = new THREE.Vector3(-0.22, -0.25, 0.055);
  const rightHipPoint = new THREE.Vector3(0.20, 0.91, 0.00);
  const rightKneePoint = new THREE.Vector3(0.29, 0.40, -0.015);
  const rightAnklePoint = new THREE.Vector3(0.34, -0.18, -0.13);

  const left_thigh = addSegment(
    legs_group, "left_thigh",
    leftHipPoint, leftKneePoint, 0.165, skinMat, thighGeom
  );
  const right_thigh = addSegment(
    legs_group, "right_thigh",
    rightHipPoint, rightKneePoint, 0.165, skinMat, thighGeom
  );
  const left_calf = addSegment(
    legs_group, "left_calf",
    leftKneePoint, leftAnklePoint, 0.145, skinMat, calfGeom
  );
  const right_calf = addSegment(
    legs_group, "right_calf",
    rightKneePoint, rightAnklePoint, 0.145, skinMat, calfGeom
  );

  const knee_jointGeom = new THREE.SphereGeometry(1, 24, 16);
  const knee_joints = new THREE.InstancedMesh(knee_jointGeom, jointMat, 2);
  knee_joints.name = "knee_joints";
  setInstance(knee_joints, 0, -0.23, 0.38, 0.035, 0.17, 0.17, 0.17);
  setInstance(knee_joints, 1, 0.29, 0.40, -0.015, 0.17, 0.17, 0.17);
  knee_joints.instanceMatrix.needsUpdate = true;
  legs_group.add(knee_joints);

  const knee_grooveGeom = new THREE.TorusGeometry(0.153, 0.008, 6, 28);
  const knee_grooves = new THREE.InstancedMesh(knee_grooveGeom, jointGrooveMat, 2);
  knee_grooves.name = "knee_grooves";
  setInstance(knee_grooves, 0, -0.23, 0.38, 0.035, 1, 1, 1, 0, Math.PI / 2, 0);
  setInstance(knee_grooves, 1, 0.29, 0.40, -0.015, 1, 1, 1, 0, Math.PI / 2, 0);
  knee_grooves.instanceMatrix.needsUpdate = true;
  legs_group.add(knee_grooves);

  const ankle_collarGeom = new THREE.TorusGeometry(0.125, 0.012, 8, 28);
  const ankle_collars = new THREE.InstancedMesh(ankle_collarGeom, jointMat, 2);
  ankle_collars.name = "ankle_collars";
  setInstance(ankle_collars, 0, -0.22, -0.23, 0.055, 1, 1, 1, Math.PI / 2, 0, 0);
  setInstance(ankle_collars, 1, 0.34, -0.17, -0.13, 1, 1, 1, Math.PI / 2, 0, 0);
  ankle_collars.instanceMatrix.needsUpdate = true;
  legs_group.add(ankle_collars);

  const shoe_upperGeom = new THREE.SphereGeometry(1, 28, 18);
  const left_shoe_upper = new THREE.Mesh(shoe_upperGeom, shoeMat);
  left_shoe_upper.name = "left_shoe_upper";
  left_shoe_upper.position.set(-0.22, -0.36, 0.105);
  left_shoe_upper.scale.set(0.18, 0.15, 0.29);
  left_shoe_upper.rotation.x = -0.12;
  legs_group.add(left_shoe_upper);

  const right_shoe_upper = new THREE.Mesh(shoe_upperGeom, shoeMat);
  right_shoe_upper.name = "right_shoe_upper";
  right_shoe_upper.position.set(0.34, -0.31, -0.045);
  right_shoe_upper.scale.set(0.18, 0.15, 0.29);
  right_shoe_upper.rotation.x = -0.12;
  legs_group.add(right_shoe_upper);

  const shoe_toeGeom = new THREE.SphereGeometry(1, 24, 16);
  const left_shoe_toe = new THREE.Mesh(shoe_toeGeom, shoeMat);
  left_shoe_toe.name = "left_shoe_toe";
  left_shoe_toe.position.set(-0.22, -0.39, 0.285);
  left_shoe_toe.scale.set(0.20, 0.115, 0.18);
  legs_group.add(left_shoe_toe);

  const right_shoe_toe = new THREE.Mesh(shoe_toeGeom, shoeMat);
  right_shoe_toe.name = "right_shoe_toe";
  right_shoe_toe.position.set(0.34, -0.34, 0.135);
  right_shoe_toe.scale.set(0.20, 0.115, 0.18);
  legs_group.add(right_shoe_toe);

  const shoe_soleGeom = new THREE.BoxGeometry(0.34, 0.055, 0.50);
  const left_shoe_sole = new THREE.Mesh(shoe_soleGeom, shoeMat);
  left_shoe_sole.name = "left_shoe_sole";
  left_shoe_sole.position.set(-0.22, -0.49, 0.12);
  legs_group.add(left_shoe_sole);

  const right_shoe_sole = new THREE.Mesh(shoe_soleGeom, shoeMat);
  right_shoe_sole.name = "right_shoe_sole";
  right_shoe_sole.position.set(0.34, -0.44, -0.03);
  legs_group.add(right_shoe_sole);

  const shoe_heelGeom = new THREE.BoxGeometry(0.25, 0.12, 0.12);
  const left_shoe_heel = new THREE.Mesh(shoe_heelGeom, shoeMat);
  left_shoe_heel.name = "left_shoe_heel";
  left_shoe_heel.position.set(-0.22, -0.45, -0.075);
  legs_group.add(left_shoe_heel);

  const right_shoe_heel = new THREE.Mesh(shoe_heelGeom, shoeMat);
  right_shoe_heel.name = "right_shoe_heel";
  right_shoe_heel.position.set(0.34, -0.40, -0.225);
  legs_group.add(right_shoe_heel);

  const shoe_openingGeom = new THREE.TorusGeometry(0.095, 0.018, 8, 28);
  const left_shoe_opening = new THREE.Mesh(shoe_openingGeom, jointGrooveMat);
  left_shoe_opening.name = "left_shoe_opening";
  left_shoe_opening.rotation.x = Math.PI / 2;
  left_shoe_opening.scale.set(1.15, 0.72, 1);
  left_shoe_opening.position.set(-0.22, -0.245, 0.015);
  legs_group.add(left_shoe_opening);

  const right_shoe_opening = new THREE.Mesh(shoe_openingGeom, jointGrooveMat);
  right_shoe_opening.name = "right_shoe_opening";
  right_shoe_opening.rotation.x = Math.PI / 2;
  right_shoe_opening.scale.set(1.15, 0.72, 1);
  right_shoe_opening.position.set(0.34, -0.195, -0.125);
  legs_group.add(right_shoe_opening);

  const head_group = new THREE.Group();
  head_group.name = "head_group";
  root.add(head_group);

  const neckGeom = new THREE.CylinderGeometry(0.13, 0.145, 0.31, 28);
  const neck = new THREE.Mesh(neckGeom, skinMat);
  neck.name = "neck";
  neck.position.set(0, 2.72, 0.00);
  head_group.add(neck);

  const neck_jointGeom = new THREE.TorusGeometry(0.135, 0.011, 8, 28);
  const neck_joint = new THREE.Mesh(neck_jointGeom, skinMat);
  neck_joint.name = "neck_joint";
  neck_joint.rotation.x = Math.PI / 2;
  neck_joint.position.set(0, 2.58, 0.00);
  head_group.add(neck_joint);

  const hair_backGeom = new THREE.SphereGeometry(1, 40, 28);
  const hair_back = new THREE.Mesh(hair_backGeom, hairMat);
  hair_back.name = "hair_back";
  hair_back.position.set(0, 3.36, -0.025);
  hair_back.scale.set(0.50, 0.57, 0.40);
  head_group.add(hair_back);

  const faceGeom = new THREE.SphereGeometry(1, 40, 28);
  const face = new THREE.Mesh(faceGeom, skinMat);
  face.name = "face";
  face.position.set(0, 3.32, 0.065);
  face.scale.set(0.43, 0.50, 0.35);
  head_group.add(face);

  const ears = new THREE.InstancedMesh(smallSphereGeom, skinMat, 2);
  ears.name = "ears";
  setInstance(ears, 0, -0.445, 3.31, 0.045, 0.105, 0.145, 0.075);
  setInstance(ears, 1, 0.445, 3.31, 0.045, 0.105, 0.145, 0.075);
  ears.instanceMatrix.needsUpdate = true;
  head_group.add(ears);

  const hair_capGeom = new THREE.SphereGeometry(
    1, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.62
  );
  const hair_cap = new THREE.Mesh(hair_capGeom, hairMat);
  hair_cap.name = "hair_cap";
  hair_cap.position.set(0, 3.40, 0.025);
  hair_cap.scale.set(0.49, 0.56, 0.39);
  head_group.add(hair_cap);

  const side_hair = new THREE.InstancedMesh(smallSphereGeom, hairMat, 2);
  side_hair.name = "side_hair";
  setInstance(side_hair, 0, -0.405, 3.34, 0.075, 0.105, 0.255, 0.105, 0, 0, -0.12);
  setInstance(side_hair, 1, 0.405, 3.34, 0.075, 0.105, 0.255, 0.105, 0, 0, 0.12);
  side_hair.instanceMatrix.needsUpdate = true;
  head_group.add(side_hair);

  const bangs = new THREE.Group();
  bangs.name = "bangs";
  const bangData = [
    [
      new THREE.Vector3(-0.34, 3.70, 0.245),
      new THREE.Vector3(-0.29, 3.61, 0.345),
      new THREE.Vector3(-0.20, 3.53, 0.395),
      new THREE.Vector3(-0.10, 3.48, 0.405),
    ],
    [
      new THREE.Vector3(-0.23, 3.76, 0.205),
      new THREE.Vector3(-0.17, 3.66, 0.335),
      new THREE.Vector3(-0.07, 3.57, 0.405),
      new THREE.Vector3(0.03, 3.50, 0.410),
    ],
    [
      new THREE.Vector3(-0.05, 3.79, 0.185),
      new THREE.Vector3(0.02, 3.69, 0.325),
      new THREE.Vector3(0.12, 3.60, 0.390),
      new THREE.Vector3(0.22, 3.53, 0.390),
    ],
    [
      new THREE.Vector3(0.16, 3.76, 0.205),
      new THREE.Vector3(0.24, 3.67, 0.325),
      new THREE.Vector3(0.33, 3.58, 0.350),
      new THREE.Vector3(0.39, 3.49, 0.285),
    ],
    [
      new THREE.Vector3(0.31, 3.69, 0.220),
      new THREE.Vector3(0.38, 3.61, 0.285),
      new THREE.Vector3(0.42, 3.51, 0.250),
      new THREE.Vector3(0.42, 3.42, 0.185),
    ],
  ];
  for (let i = 0; i < bangData.length; i++) {
    addCurveTube(bangs, "bang_" + i, bangData[i], 0.034, hairMat, 20);
  }
  head_group.add(bangs);

  const hair_highlight_left = addCurveTube(
    head_group,
    "hair_highlight_left",
    [
      new THREE.Vector3(-0.28, 3.72, 0.285),
      new THREE.Vector3(-0.23, 3.65, 0.360),
      new THREE.Vector3(-0.15, 3.58, 0.405),
    ],
    0.010,
    hairHighlightMat,
    14
  );
  const hair_highlight_right = addCurveTube(
    head_group,
    "hair_highlight_right",
    [
      new THREE.Vector3(0.08, 3.75, 0.245),
      new THREE.Vector3(0.16, 3.68, 0.330),
      new THREE.Vector3(0.25, 3.60, 0.360),
    ],
    0.010,
    hairHighlightMat,
    14
  );

  const eye_white = new THREE.InstancedMesh(smallSphereGeom, eyeWhiteMat, 2);
  eye_white.name = "eye_white";
  setInstance(eye_white, 0, -0.165, 3.39, 0.405, 0.105, 0.073, 0.025);
  setInstance(eye_white, 1, 0.165, 3.39, 0.405, 0.105, 0.073, 0.025);
  eye_white.instanceMatrix.needsUpdate = true;
  head_group.add(eye_white);

  const irises = new THREE.InstancedMesh(smallSphereGeom, irisMat, 2);
  irises.name = "irises";
  setInstance(irises, 0, -0.165, 3.385, 0.431, 0.055, 0.058, 0.018);
  setInstance(irises, 1, 0.165, 3.385, 0.431, 0.055, 0.058, 0.018);
  irises.instanceMatrix.needsUpdate = true;
  head_group.add(irises);

  const pupils = new THREE.InstancedMesh(smallSphereGeom, pupilMat, 2);
  pupils.name = "pupils";
  setInstance(pupils, 0, -0.165, 3.383, 0.449, 0.030, 0.035, 0.012);
  setInstance(pupils, 1, 0.165, 3.383, 0.449, 0.030, 0.035, 0.012);
  pupils.instanceMatrix.needsUpdate = true;
  head_group.add(pupils);

  const eye_highlights = new THREE.InstancedMesh(smallSphereGeom, eyeWhiteMat, 2);
  eye_highlights.name = "eye_highlights";
  setInstance(eye_highlights, 0, -0.181, 3.405, 0.461, 0.012, 0.014, 0.007);
  setInstance(eye_highlights, 1, 0.149, 3.405, 0.461, 0.012, 0.014, 0.007);
  eye_highlights.instanceMatrix.needsUpdate = true;
  head_group.add(eye_highlights);

  const left_eyebrow = addCurveTube(
    head_group,
    "left_eyebrow",
    [
      new THREE.Vector3(-0.275, 3.515, 0.385),
      new THREE.Vector3(-0.175, 3.555, 0.405),
      new THREE.Vector3(-0.075, 3.525, 0.395),
    ],
    0.010,
    hairMat,
    16
  );
  const right_eyebrow = addCurveTube(
    head_group,
    "right_eyebrow",
    [
      new THREE.Vector3(0.075, 3.525, 0.395),
      new THREE.Vector3(0.175, 3.555, 0.405),
      new THREE.Vector3(0.275, 3.515, 0.385),
    ],
    0.010,
    hairMat,
    16
  );

  const eyelashes = new THREE.Group();
  eyelashes.name = "eyelashes";
  addCurveTube(
    eyelashes, "left_outer_lash",
    [
      new THREE.Vector3(-0.255, 3.415, 0.425),
      new THREE.Vector3(-0.285, 3.445, 0.420),
      new THREE.Vector3(-0.315, 3.465, 0.405),
    ],
    0.006, pupilMat, 10
  );
  addCurveTube(
    eyelashes, "left_upper_lash",
    [
      new THREE.Vector3(-0.235, 3.445, 0.425),
      new THREE.Vector3(-0.250, 3.485, 0.415),
      new THREE.Vector3(-0.265, 3.510, 0.400),
    ],
    0.006, pupilMat, 10
  );
  addCurveTube(
    eyelashes, "right_outer_lash",
    [
      new THREE.Vector3(0.255, 3.415, 0.425),
      new THREE.Vector3(0.285, 3.445, 0.420),
      new THREE.Vector3(0.315, 3.465, 0.405),
    ],
    0.006, pupilMat, 10
  );
  addCurveTube(
    eyelashes, "right_upper_lash",
    [
      new THREE.Vector3(0.235, 3.445, 0.425),
      new THREE.Vector3(0.250, 3.485, 0.415),
      new THREE.Vector3(0.265, 3.510, 0.400),
    ],
    0.006, pupilMat, 10
  );
  head_group.add(eyelashes);

  const noseGeom = new THREE.SphereGeometry(1, 24, 16);
  const nose = new THREE.Mesh(noseGeom, skinMat);
  nose.name = "nose";
  nose.position.set(0, 3.275, 0.430);
  nose.scale.set(0.055, 0.070, 0.050);
  head_group.add(nose);

  const blushGeom = new THREE.CircleGeometry(1, 28);
  const cheeks = new THREE.InstancedMesh(blushGeom, blushMat, 2);
  cheeks.name = "cheeks";
  setInstance(cheeks, 0, -0.255, 3.205, 0.365, 0.105, 0.075, 1, 0, -0.18, 0);
  setInstance(cheeks, 1, 0.255, 3.205, 0.365, 0.105, 0.075, 1, 0, 0.18, 0);
  cheeks.instanceMatrix.needsUpdate = true;
  head_group.add(cheeks);

  const mouthShape = new THREE.Shape();
  mouthShape.moveTo(-0.105, 0.000);
  mouthShape.bezierCurveTo(-0.060, 0.045, 0.060, 0.045, 0.105, 0.000);
  mouthShape.bezierCurveTo(0.060, -0.055, -0.060, -0.055, -0.105, 0.000);
  const mouthGeom = new THREE.ExtrudeGeometry(mouthShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const mouth = new THREE.Mesh(mouthGeom, lipMat);
  mouth.name = "mouth";
  mouth.position.set(0, 3.145, 0.414);
  head_group.add(mouth);

  const mouth_line = addCurveTube(
    head_group,
    "mouth_line",
    [
      new THREE.Vector3(-0.075, 3.150, 0.433),
      new THREE.Vector3(0, 3.137, 0.438),
      new THREE.Vector3(0.075, 3.150, 0.433),
    ],
    0.005,
    lipDarkMat,
    12
  );

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