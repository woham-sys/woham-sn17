function __sn17_user(THREE) {
  const root = new THREE.Group();

  const skinMat = new THREE.MeshStandardMaterial({ color: 0xf2d5ad, metalness: 0.0, roughness: 0.3 });
  const dressMat = new THREE.MeshStandardMaterial({ color: 0xbfd9df, metalness: 0.0, roughness: 0.22 });
  const dressDarkMat = new THREE.MeshStandardMaterial({ color: 0x8fa9b0, metalness: 0.0, roughness: 0.35 });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x1b1210, metalness: 0.0, roughness: 0.18 });
  const hairHighlightMat = new THREE.MeshStandardMaterial({ color: 0x3a2722, metalness: 0.0, roughness: 0.22 });
  const jointMat = new THREE.MeshStandardMaterial({ color: 0x4b3028, metalness: 0.0, roughness: 0.45 });
  const shoeMat = new THREE.MeshStandardMaterial({ color: 0x241511, metalness: 0.0, roughness: 0.2 });
  const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.0, roughness: 0.25 });
  const irisMat = new THREE.MeshStandardMaterial({ color: 0x165c86, metalness: 0.0, roughness: 0.18 });
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x050505, metalness: 0.0, roughness: 0.25 });
  const blushMat = new THREE.MeshStandardMaterial({ color: 0xf47f88, metalness: 0.0, roughness: 0.55, transparent: true, opacity: 0.55 });
  const lipMat = new THREE.MeshStandardMaterial({ color: 0xe94e62, metalness: 0.0, roughness: 0.35 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.35, roughness: 0.25 });
  const heartMat = new THREE.MeshStandardMaterial({ color: 0xe85d78, metalness: 0.0, roughness: 0.28 });

  const sphereGeom = new THREE.SphereGeometry(1, 32, 16);
  const smallSphereGeom = new THREE.SphereGeometry(1, 20, 10);
  const cylinderGeom = new THREE.CylinderGeometry(1, 1, 1, 24);

  function addEllipsoid(name, mat, x, y, z, sx, sy, sz, rx, ry, rz) {
    const mesh = new THREE.Mesh(sphereGeom, mat);
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    mesh.rotation.set(rx || 0, ry || 0, rz || 0);
    root.add(mesh);
    return mesh;
  }

  function addCylinderBetween(p1, p2, radius, mat) {
    const dir = new THREE.Vector3().subVectors(p2, p1);
    const len = dir.length();
    const mesh = new THREE.Mesh(cylinderGeom, mat);
    mesh.position.copy(p1).add(p2).multiplyScalar(0.5);
    mesh.scale.set(radius, len, radius);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    root.add(mesh);
    return mesh;
  }

  function addJointBand(p1, p2, t, width, mat) {
    const center = new THREE.Vector3().lerpVectors(p1, p2, t);
    const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
    const mesh = new THREE.Mesh(cylinderGeom, mat);
    mesh.position.copy(center);
    mesh.scale.set(0.083, width, 0.083);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    root.add(mesh);
    return mesh;
  }

  function addTube(points, radius, mat) {
    const curve = new THREE.CatmullRomCurve3(points);
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 16, radius, 8, false), mat);
    root.add(mesh);
    return mesh;
  }

  const torso = addEllipsoid("torso", dressMat, 0, 1.18, 0, 0.235, 0.34, 0.135, 0, 0, 0);
  const waist_band = new THREE.Mesh(new THREE.CylinderGeometry(0.235, 0.235, 0.035, 32), dressDarkMat);
  waist_band.position.set(0, 0.99, 0);
  root.add(waist_band);

  const skirtProfile = [
    new THREE.Vector2(0.235, 0.98),
    new THREE.Vector2(0.31, 0.86),
    new THREE.Vector2(0.43, 0.66),
    new THREE.Vector2(0.55, 0.45),
    new THREE.Vector2(0.58, 0.36),
    new THREE.Vector2(0.50, 0.31),
    new THREE.Vector2(0.22, 0.33),
    new THREE.Vector2(0.235, 0.98)
  ];
  const skirtGeom = new THREE.LatheGeometry(skirtProfile, 64);
  const skirt = new THREE.Mesh(skirtGeom, dressMat);
  root.add(skirt);

  const skirt_hem = new THREE.Mesh(new THREE.TorusGeometry(0.535, 0.012, 8, 64), dressDarkMat);
  skirt_hem.rotation.x = Math.PI / 2;
  skirt_hem.position.y = 0.34;
  root.add(skirt_hem);

  const left_collar = addEllipsoid("left_collar", dressMat, -0.075, 1.43, 0.105, 0.085, 0.045, 0.025, 0, 0, -0.35);
  const right_collar = addEllipsoid("right_collar", dressMat, 0.075, 1.43, 0.105, 0.085, 0.045, 0.025, 0, 0, 0.35);

  const left_neckline_trim = addTube([
    new THREE.Vector3(-0.14, 1.45, 0.13),
    new THREE.Vector3(-0.07, 1.39, 0.145),
    new THREE.Vector3(0, 1.39, 0.145)
  ], 0.006, dressDarkMat);
  const right_neckline_trim = addTube([
    new THREE.Vector3(0, 1.39, 0.145),
    new THREE.Vector3(0.07, 1.39, 0.145),
    new THREE.Vector3(0.14, 1.45, 0.13)
  ], 0.006, dressDarkMat);

  const left_shoulder_cap = addEllipsoid("left_shoulder_cap", dressMat, -0.27, 1.36, 0, 0.115, 0.115, 0.105, 0, 0, 0);
  const right_shoulder_cap = addEllipsoid("right_shoulder_cap", dressMat, 0.27, 1.36, 0, 0.115, 0.115, 0.105, 0, 0, 0);

  const left_arm_start = new THREE.Vector3(-0.31, 1.31, 0.01);
  const left_elbow = new THREE.Vector3(-0.49, 1.02, 0.04);
  const left_wrist = new THREE.Vector3(-0.62, 0.78, 0.08);
  const right_arm_start = new THREE.Vector3(0.31, 1.31, 0.01);
  const right_elbow = new THREE.Vector3(0.49, 1.02, 0.04);
  const right_wrist = new THREE.Vector3(0.62, 0.78, 0.08);

  const left_upper_arm = addCylinderBetween(left_arm_start, left_elbow, 0.065, skinMat);
  const right_upper_arm = addCylinderBetween(right_arm_start, right_elbow, 0.065, skinMat);
  const left_forearm = addCylinderBetween(left_elbow, left_wrist, 0.058, skinMat);
  const right_forearm = addCylinderBetween(right_elbow, right_wrist, 0.058, skinMat);

  const left_elbow_joint = addJointBand(left_arm_start, left_elbow, 0.72, 0.075, jointMat);
  const right_elbow_joint = addJointBand(right_arm_start, right_elbow, 0.72, 0.075, jointMat);
  const left_wrist_band = addJointBand(left_elbow, left_wrist, 0.93, 0.045, jointMat);
  const right_wrist_band = addJointBand(right_elbow, right_wrist, 0.93, 0.045, jointMat);

  const left_hand_palm = addEllipsoid("left_hand_palm", skinMat, -0.68, 0.70, 0.105, 0.085, 0.065, 0.045, 0, 0, -0.2);
  const right_hand_palm = addEllipsoid("right_hand_palm", skinMat, 0.68, 0.70, 0.105, 0.085, 0.065, 0.045, 0, 0, 0.2);

  const fingerGeom = new THREE.SphereGeometry(1, 16, 8);
  const fingers = new THREE.InstancedMesh(fingerGeom, skinMat, 8);
  const fingerDummy = new THREE.Object3D();
  let fingerIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const offset = (i - 1.5) * 0.018;
      fingerDummy.position.set(side * 0.715 + offset, 0.665 - Math.abs(i - 1.5) * 0.006, 0.13 + i * 0.002);
      fingerDummy.rotation.set(0, 0, side * (0.12 + i * 0.04));
      fingerDummy.scale.set(0.018, 0.055, 0.018);
      fingerDummy.updateMatrix();
      fingers.setMatrixAt(fingerIndex++, fingerDummy.matrix);
    }
  }
  root.add(fingers);

  const left_thumb = addEllipsoid("left_thumb", skinMat, -0.655, 0.735, 0.13, 0.028, 0.055, 0.026, 0, 0, -0.55);
  const right_thumb = addEllipsoid("right_thumb", skinMat, 0.655, 0.735, 0.13, 0.028, 0.055, 0.026, 0, 0, 0.55);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.18, 24), skinMat);
  neck.position.set(0, 1.52, 0);
  root.add(neck);

  const head = addEllipsoid("head", skinMat, 0, 1.78, 0, 0.255, 0.315, 0.225, 0, 0, 0);
  const left_ear = addEllipsoid("left_ear", skinMat, -0.255, 1.76, 0, 0.055, 0.085, 0.045, 0, 0, 0);
  const right_ear = addEllipsoid("right_ear", skinMat, 0.255, 1.76, 0, 0.055, 0.085, 0.045, 0, 0, 0);

  const hair_cap = addEllipsoid("hair_cap", hairMat, 0, 1.91, -0.025, 0.285, 0.335, 0.245, 0, 0, 0);
  const back_hair = addEllipsoid("back_hair", hairMat, 0, 1.78, -0.13, 0.22, 0.27, 0.15, 0, 0, 0);
  const left_side_hair = addEllipsoid("left_side_hair", hairMat, -0.225, 1.82, -0.02, 0.075, 0.22, 0.12, 0, 0, -0.2);
  const right_side_hair = addEllipsoid("right_side_hair", hairMat, 0.225, 1.82, -0.02, 0.075, 0.22, 0.12, 0, 0, 0.2);

  const front_left_bang = addEllipsoid("front_left_bang", hairMat, -0.105, 1.99, 0.185, 0.055, 0.15, 0.025, 0, 0, -0.45);
  const front_center_bang = addEllipsoid("front_center_bang", hairMat, 0, 2.01, 0.19, 0.052, 0.14, 0.024, 0, 0, 0.05);
  const front_right_bang = addEllipsoid("front_right_bang", hairMat, 0.105, 1.99, 0.185, 0.055, 0.15, 0.025, 0, 0, 0.45);
  const top_hair_highlight = addEllipsoid("top_hair_highlight", hairHighlightMat, -0.02, 2.08, 0.10, 0.16, 0.055, 0.045, 0, 0, 0.05);

  const left_eye_white = addEllipsoid("left_eye_white", eyeWhiteMat, -0.095, 1.79, 0.218, 0.058, 0.043, 0.018, 0, 0, 0);
  const right_eye_white = addEllipsoid("right_eye_white", eyeWhiteMat, 0.095, 1.79, 0.218, 0.058, 0.043, 0.018, 0, 0, 0);
  const left_iris = addEllipsoid("left_iris", irisMat, -0.095, 1.785, 0.237, 0.032, 0.032, 0.012, 0, 0, 0);
  const right_iris = addEllipsoid("right_iris", irisMat, 0.095, 1.785, 0.237, 0.032, 0.032, 0.012, 0, 0, 0);
  const left_pupil = addEllipsoid("left_pupil", pupilMat, -0.095, 1.785, 0.249, 0.015, 0.018, 0.008, 0, 0, 0);
  const right_pupil = addEllipsoid("right_pupil", pupilMat, 0.095, 1.785, 0.249, 0.015, 0.018, 0.008, 0, 0, 0);
  const left_eye_glint = addEllipsoid("left_eye_glint", eyeWhiteMat, -0.105, 1.805, 0.258, 0.007, 0.007, 0.004, 0, 0, 0);
  const right_eye_glint = addEllipsoid("right_eye_glint", eyeWhiteMat, 0.085, 1.805, 0.258, 0.007, 0.007, 0.004, 0, 0, 0);

  const left_eyebrow = addTube([
    new THREE.Vector3(-0.155, 1.875, 0.225),
    new THREE.Vector3(-0.105, 1.895, 0.235),
    new THREE.Vector3(-0.055, 1.88, 0.225)
  ], 0.006, hairMat);
  const right_eyebrow = addTube([
    new THREE.Vector3(0.055, 1.88, 0.225),
    new THREE.Vector3(0.105, 1.895, 0.235),
    new THREE.Vector3(0.155, 1.875, 0.225)
  ], 0.006, hairMat);

  const nose = addEllipsoid("nose", skinMat, 0, 1.72, 0.245, 0.032, 0.045, 0.026, 0, 0, 0);
  const left_blush = addEllipsoid("left_blush", blushMat, -0.145, 1.69, 0.218, 0.055, 0.04, 0.012, 0, 0, 0);
  const right_blush = addEllipsoid("right_blush", blushMat, 0.145, 1.69, 0.218, 0.055, 0.04, 0.012, 0, 0, 0);

  const mouth = addTube([
    new THREE.Vector3(-0.055, 1.64, 0.238),
    new THREE.Vector3(0, 1.615, 0.25),
    new THREE.Vector3(0.055, 1.64, 0.238)
  ], 0.008, lipMat);
  const lower_lip = addTube([
    new THREE.Vector3(-0.035, 1.61, 0.242),
    new THREE.Vector3(0, 1.595, 0.248),
    new THREE.Vector3(0.035, 1.61, 0.242)
  ], 0.005, new THREE.MeshStandardMaterial({ color: 0xff8f9c, metalness: 0.0, roughness: 0.45 }));

  const left_dress_seam = addTube([
    new THREE.Vector3(-0.105, 1.36, 0.145),
    new THREE.Vector3(-0.105, 1.16, 0.15),
    new THREE.Vector3(-0.105, 1.01, 0.14)
  ], 0.004, dressDarkMat);
  const right_dress_seam = addTube([
    new THREE.Vector3(0.105, 1.36, 0.145),
    new THREE.Vector3(0.105, 1.16, 0.15),
    new THREE.Vector3(0.105, 1.01, 0.14)
  ], 0.004, dressDarkMat);

  const gold_chest_line = addTube([
    new THREE.Vector3(-0.16, 1.34, 0.15),
    new THREE.Vector3(-0.08, 1.31, 0.16),
    new THREE.Vector3(0, 1.33, 0.16),
    new THREE.Vector3(0.08, 1.31, 0.16),
    new THREE.Vector3(0.16, 1.34, 0.15)
  ], 0.006, goldMat);

  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, -0.035);
  heartShape.bezierCurveTo(-0.04, -0.005, -0.04, 0.035, -0.018, 0.035);
  heartShape.bezierCurveTo(-0.006, 0.035, 0, 0.022, 0, 0.012);
  heartShape.bezierCurveTo(0, 0.022, 0.006, 0.035, 0.018, 0.035);
  heartShape.bezierCurveTo(0.04, 0.035, 0.04, -0.005, 0, -0.035);
  const heartGeom = new THREE.ExtrudeGeometry(heartShape, { depth: 0.012, steps: 1 });
  const heart_pendant = new THREE.Mesh(heartGeom, heartMat);
  heart_pendant.position.set(0, 1.285, 0.165);
  root.add(heart_pendant);

  const upper_gold_button = new THREE.Mesh(new THREE.SphereGeometry(0.025, 16, 8), goldMat);
  upper_gold_button.position.set(0, 1.16, 0.16);
  root.add(upper_gold_button);

  const lower_gold_emblem = addTube([
    new THREE.Vector3(-0.035, 1.055, 0.16),
    new THREE.Vector3(0, 1.025, 0.17),
    new THREE.Vector3(0.035, 1.055, 0.16)
  ], 0.006, goldMat);
  const lower_gold_dot = new THREE.Mesh(new THREE.SphereGeometry(0.012, 12, 6), goldMat);
  lower_gold_dot.position.set(0, 1.015, 0.17);
  root.add(lower_gold_dot);

  const left_thigh_start = new THREE.Vector3(-0.13, 0.43, 0.02);
  const left_knee_pos = new THREE.Vector3(-0.15, 0.18, 0.05);
  const left_ankle_pos = new THREE.Vector3(-0.16, -0.18, 0.08);
  const right_thigh_start = new THREE.Vector3(0.13, 0.43, -0.02);
  const right_knee_pos = new THREE.Vector3(0.22, 0.18, -0.02);
  const right_ankle_pos = new THREE.Vector3(0.25, -0.12, -0.12);

  const left_thigh = addCylinderBetween(left_thigh_start, left_knee_pos, 0.072, skinMat);
  const right_thigh = addCylinderBetween(right_thigh_start, right_knee_pos, 0.072, skinMat);
  const left_lower_leg = addCylinderBetween(left_knee_pos, left_ankle_pos, 0.058, skinMat);
  const right_lower_leg = addCylinderBetween(right_knee_pos, right_ankle_pos, 0.058, skinMat);

  const left_knee_joint = addJointBand(left_thigh_start, left_knee_pos, 0.95, 0.07, jointMat);
  const right_knee_joint = addJointBand(right_thigh_start, right_knee_pos, 0.95, 0.07, jointMat);
  const left_ankle_band = addJointBand(left_knee_pos, left_ankle_pos, 0.92, 0.045, jointMat);
  const right_ankle_band = addJointBand(right_knee_pos, right_ankle_pos, 0.92, 0.045, jointMat);

  const left_foot = addEllipsoid("left_foot", shoeMat, -0.16, -0.285, 0.15, 0.105, 0.055, 0.17, 0, 0, 0);
  const right_foot = addEllipsoid("right_foot", shoeMat, 0.25, -0.225, -0.02, 0.105, 0.055, 0.17, 0, 0, 0);
  const left_toe_cap = addEllipsoid("left_toe_cap", shoeMat, -0.16, -0.275, 0.255, 0.09, 0.045, 0.075, 0, 0, 0);
  const right_toe_cap = addEllipsoid("right_toe_cap", shoeMat, 0.25, -0.215, 0.085, 0.09, 0.045, 0.075, 0, 0, 0);
  const left_shoe_sole = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.025, 0.28), shoeMat);
  left_shoe_sole.position.set(-0.16, -0.335, 0.13);
  root.add(left_shoe_sole);
  const right_shoe_sole = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.025, 0.28), shoeMat);
  right_shoe_sole.position.set(0.25, -0.275, -0.04);
  root.add(right_shoe_sole);

  const left_shoe_highlight = addEllipsoid("left_shoe_highlight", new THREE.MeshStandardMaterial({ color: 0x5a3a30, metalness: 0.0, roughness: 0.2 }), -0.18, -0.255, 0.245, 0.035, 0.012, 0.018, 0, 0, 0);
  const right_shoe_highlight = addEllipsoid("right_shoe_highlight", new THREE.MeshStandardMaterial({ color: 0x5a3a30, metalness: 0.0, roughness: 0.2 }), 0.23, -0.195, 0.075, 0.035, 0.012, 0.018, 0, 0, 0);

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
