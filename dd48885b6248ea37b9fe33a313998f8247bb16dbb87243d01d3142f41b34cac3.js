function __sn17_user(THREE) {
  const root = new THREE.Group();
  const vase_group = new THREE.Group();
  const decoration_group = new THREE.Group();
  root.add(vase_group);
  vase_group.add(decoration_group);

  const vase_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf3d91c,
    metalness: 0.0,
    roughness: 0.2,
    emissive: 0xf3d91c,
    emissiveIntensity: 0.18,
  });
  const rim_collarMat = new THREE.MeshStandardMaterial({
    color: 0xd8b184,
    metalness: 0.0,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const cream_glazeMat = new THREE.MeshStandardMaterial({
    color: 0xfff5cf,
    metalness: 0.0,
    roughness: 0.18,
    side: THREE.DoubleSide,
  });
  const blue_glazeMat = new THREE.MeshStandardMaterial({
    color: 0x073ca5,
    metalness: 0.0,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const light_blue_glazeMat = new THREE.MeshStandardMaterial({
    color: 0x4f82c8,
    metalness: 0.0,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const red_glazeMat = new THREE.MeshStandardMaterial({
    color: 0xc83224,
    metalness: 0.0,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const orange_glazeMat = new THREE.MeshStandardMaterial({
    color: 0xe86b13,
    metalness: 0.0,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const green_glazeMat = new THREE.MeshStandardMaterial({
    color: 0x177b45,
    metalness: 0.0,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const purple_glazeMat = new THREE.MeshStandardMaterial({
    color: 0x713184,
    metalness: 0.0,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const white_glazeMat = new THREE.MeshStandardMaterial({
    color: 0xfffdf0,
    metalness: 0.0,
    roughness: 0.18,
    side: THREE.DoubleSide,
  });

  const vase_profile = [
    new THREE.Vector2(0.00, -1.30),
    new THREE.Vector2(0.40, -1.30),
    new THREE.Vector2(0.48, -1.27),
    new THREE.Vector2(0.51, -1.18),
    new THREE.Vector2(0.55, -1.02),
    new THREE.Vector2(0.61, -0.78),
    new THREE.Vector2(0.66, -0.48),
    new THREE.Vector2(0.69, -0.15),
    new THREE.Vector2(0.68, 0.16),
    new THREE.Vector2(0.63, 0.40),
    new THREE.Vector2(0.55, 0.61),
    new THREE.Vector2(0.45, 0.78),
    new THREE.Vector2(0.39, 0.94),
    new THREE.Vector2(0.37, 1.10),
    new THREE.Vector2(0.39, 1.24),
    new THREE.Vector2(0.46, 1.34),
    new THREE.Vector2(0.52, 1.39),
    new THREE.Vector2(0.53, 1.43),
    new THREE.Vector2(0.49, 1.47),
    new THREE.Vector2(0.40, 1.48),
    new THREE.Vector2(0.36, 1.44),
    new THREE.Vector2(0.35, 1.35),
    new THREE.Vector2(0.35, 1.22),
  ];
  const vase_bodyGeom = new THREE.LatheGeometry(vase_profile, 96);
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  vase_group.add(vase_body);

  const rim_collarGeom = new THREE.CylinderGeometry(0.46, 0.39, 0.16, 96, 1, true);
  const rim_collar = new THREE.Mesh(rim_collarGeom, rim_collarMat);
  rim_collar.position.y = 1.31;
  vase_group.add(rim_collar);

  const top_lipGeom = new THREE.TorusGeometry(0.465, 0.045, 18, 96);
  const top_lip = new THREE.Mesh(top_lipGeom, blue_glazeMat);
  top_lip.rotation.x = Math.PI / 2;
  top_lip.position.y = 1.425;
  vase_group.add(top_lip);

  const inner_lip_highlightGeom = new THREE.TorusGeometry(0.392, 0.014, 12, 96);
  const inner_lip_highlight = new THREE.Mesh(inner_lip_highlightGeom, cream_glazeMat);
  inner_lip_highlight.rotation.x = Math.PI / 2;
  inner_lip_highlight.position.y = 1.447;
  vase_group.add(inner_lip_highlight);

  const mouth_openingGeom = new THREE.CircleGeometry(0.35, 96);
  const mouth_opening = new THREE.Mesh(mouth_openingGeom, cream_glazeMat);
  mouth_opening.rotation.x = -Math.PI / 2;
  mouth_opening.position.y = 1.405;
  vase_group.add(mouth_opening);

  const base_footGeom = new THREE.CylinderGeometry(0.47, 0.45, 0.055, 96);
  const base_foot = new THREE.Mesh(base_footGeom, cream_glazeMat);
  base_foot.position.y = -1.305;
  vase_group.add(base_foot);

  const bottom_blue_bandGeom = new THREE.CylinderGeometry(0.515, 0.49, 0.075, 96, 1, true);
  const bottom_blue_band = new THREE.Mesh(bottom_blue_bandGeom, blue_glazeMat);
  bottom_blue_band.position.y = -1.235;
  vase_group.add(bottom_blue_band);

  const bottom_dark_lineGeom = new THREE.TorusGeometry(0.49, 0.012, 10, 96);
  const bottom_dark_line = new THREE.Mesh(bottom_dark_lineGeom, blue_glazeMat);
  bottom_dark_line.rotation.x = Math.PI / 2;
  bottom_dark_line.position.y = -1.195;
  vase_group.add(bottom_dark_line);

  const radius_samples = [
    [-1.30, 0.40],
    [-1.27, 0.48],
    [-1.18, 0.51],
    [-1.02, 0.55],
    [-0.78, 0.61],
    [-0.48, 0.66],
    [-0.15, 0.69],
    [0.16, 0.68],
    [0.40, 0.63],
    [0.61, 0.55],
    [0.78, 0.45],
    [0.94, 0.39],
    [1.10, 0.37],
    [1.24, 0.39],
    [1.34, 0.46],
    [1.39, 0.52],
  ];

  function vaseRadiusAt(y) {
    if (y <= radius_samples[0][0]) return radius_samples[0][1];
    for (let i = 0; i < radius_samples.length - 1; i++) {
      const a = radius_samples[i];
      const b = radius_samples[i + 1];
      if (y <= b[0]) {
        const t = (y - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return radius_samples[radius_samples.length - 1][1];
  }

  function surfacePose(angle, y, extra) {
    const r = vaseRadiusAt(y) + extra;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
    const pos = new THREE.Vector3(normal.x * r, y, normal.z * r);
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return { pos, quat };
  }

  const decal_dummy = new THREE.Object3D();

  function setDecalInstance(mesh, index, angle, y, sx, sy, rot, extra) {
    const pose = surfacePose(angle, y, extra);
    decal_dummy.position.copy(pose.pos);
    decal_dummy.quaternion.copy(pose.quat);
    decal_dummy.rotateZ(rot);
    decal_dummy.scale.set(sx, sy, 1);
    decal_dummy.updateMatrix();
    mesh.setMatrixAt(index, decal_dummy.matrix);
  }

  function addSurfaceVine(points, mat, thickness, extra) {
    const curve_points = [];
    for (let i = 0; i < points.length; i++) {
      curve_points.push(surfacePose(points[i][0], points[i][1], extra).pos);
    }
    const curve = new THREE.CatmullRomCurve3(curve_points, false, "centripetal");
    const vineGeom = new THREE.TubeGeometry(curve, Math.max(24, points.length * 12), thickness, 8, false);
    const vine = new THREE.Mesh(vineGeom, mat);
    decoration_group.add(vine);
    return vine;
  }

  const main_vine = addSurfaceVine([
    [2.18, -1.12],
    [2.08, -0.78],
    [2.16, -0.42],
    [2.02, -0.05],
    [1.86, 0.30],
    [1.62, 0.58],
    [1.35, 0.78],
    [1.12, 1.05],
  ], orange_glazeMat, 0.012, 0.014);

  const right_vine = addSurfaceVine([
    [0.82, -1.05],
    [0.90, -0.70],
    [1.00, -0.32],
    [1.18, 0.08],
    [1.38, 0.42],
    [1.55, 0.72],
  ], red_glazeMat, 0.011, 0.014);

  const left_branch = addSurfaceVine([
    [2.55, -0.88],
    [2.42, -0.55],
    [2.35, -0.18],
    [2.22, 0.18],
    [2.02, 0.50],
  ], green_glazeMat, 0.009, 0.013);

  const neck_branch = addSurfaceVine([
    [1.58, 0.62],
    [1.42, 0.82],
    [1.30, 1.02],
    [1.48, 1.22],
  ], green_glazeMat, 0.008, 0.013);

  const lower_branch = addSurfaceVine([
    [1.72, -1.08],
    [1.55, -0.86],
    [1.42, -0.62],
    [1.22, -0.42],
  ], blue_glazeMat, 0.010, 0.014);

  const leaf_shape = new THREE.Shape();
  leaf_shape.moveTo(0, -0.5);
  leaf_shape.bezierCurveTo(0.42, -0.28, 0.46, 0.20, 0, 0.5);
  leaf_shape.bezierCurveTo(-0.46, 0.20, -0.42, -0.28, 0, -0.5);
  const leafGeom = new THREE.ShapeGeometry(leaf_shape, 16);

  const blue_leaf_data = [
    [1.55, 0.72, 0.18, 0.25, -0.45],
    [1.82, 0.52, 0.19, 0.27, 0.55],
    [2.08, 0.28, 0.18, 0.28, -0.65],
    [1.35, 0.22, 0.17, 0.25, 0.65],
    [1.08, -0.08, 0.18, 0.27, -0.45],
    [1.45, -0.34, 0.18, 0.28, 0.55],
    [2.28, -0.48, 0.18, 0.28, -0.55],
    [1.82, -0.72, 0.19, 0.29, 0.45],
    [1.18, -0.78, 0.18, 0.27, -0.50],
    [0.92, -0.54, 0.17, 0.25, 0.60],
    [2.48, 0.08, 0.16, 0.24, 0.45],
    [1.62, 1.02, 0.14, 0.21, -0.55],
  ];
  const blue_leaves = new THREE.InstancedMesh(leafGeom, blue_glazeMat, blue_leaf_data.length);
  for (let i = 0; i < blue_leaf_data.length; i++) {
    const d = blue_leaf_data[i];
    setDecalInstance(blue_leaves, i, d[0], d[1], d[2], d[3], d[4], 0.016);
  }
  blue_leaves.instanceMatrix.needsUpdate = true;
  decoration_group.add(blue_leaves);

  const green_leaf_data = [
    [1.28, 0.92, 0.15, 0.22, 0.65],
    [1.88, 0.82, 0.15, 0.22, -0.55],
    [1.05, 0.58, 0.16, 0.23, 0.55],
    [2.18, 0.58, 0.16, 0.23, -0.60],
    [1.20, 0.02, 0.17, 0.24, 0.65],
    [2.35, -0.10, 0.16, 0.23, -0.55],
    [1.02, -0.34, 0.17, 0.24, 0.55],
    [2.12, -0.62, 0.17, 0.24, -0.60],
    [1.35, -0.92, 0.16, 0.23, 0.55],
    [2.55, -0.92, 0.15, 0.22, -0.50],
    [0.78, 0.28, 0.15, 0.22, 0.55],
    [2.62, 0.38, 0.15, 0.22, -0.55],
  ];
  const green_leaves = new THREE.InstancedMesh(leafGeom, green_glazeMat, green_leaf_data.length);
  for (let i = 0; i < green_leaf_data.length; i++) {
    const d = green_leaf_data[i];
    setDecalInstance(green_leaves, i, d[0], d[1], d[2], d[3], d[4], 0.017);
  }
  green_leaves.instanceMatrix.needsUpdate = true;
  decoration_group.add(green_leaves);

  const red_leaf_data = [
    [1.50, 0.58, 0.17, 0.23, -0.20],
    [2.22, 0.42, 0.16, 0.22, 0.55],
    [0.98, 0.38, 0.16, 0.22, -0.55],
    [1.18, -0.18, 0.17, 0.23, 0.45],
    [2.38, -0.32, 0.16, 0.22, -0.45],
    [1.55, -0.82, 0.18, 0.24, 0.20],
    [0.86, -0.92, 0.16, 0.22, -0.40],
    [2.58, -0.72, 0.15, 0.21, 0.50],
  ];
  const red_leaves = new THREE.InstancedMesh(leafGeom, red_glazeMat, red_leaf_data.length);
  for (let i = 0; i < red_leaf_data.length; i++) {
    const d = red_leaf_data[i];
    setDecalInstance(red_leaves, i, d[0], d[1], d[2], d[3], d[4], 0.018);
  }
  red_leaves.instanceMatrix.needsUpdate = true;
  decoration_group.add(red_leaves);

  const purple_leaf_data = [
    [1.72, 0.18, 0.18, 0.25, -0.35],
    [1.28, 0.42, 0.17, 0.24, 0.45],
    [2.02, -0.38, 0.18, 0.25, -0.50],
    [1.12, -0.62, 0.17, 0.24, 0.55],
    [2.48, -0.82, 0.16, 0.23, -0.45],
    [0.82, -0.22, 0.16, 0.23, 0.45],
  ];
  const purple_leaves = new THREE.InstancedMesh(leafGeom, purple_glazeMat, purple_leaf_data.length);
  for (let i = 0; i < purple_leaf_data.length; i++) {
    const d = purple_leaf_data[i];
    setDecalInstance(purple_leaves, i, d[0], d[1], d[2], d[3], d[4], 0.019);
  }
  purple_leaves.instanceMatrix.needsUpdate = true;
  decoration_group.add(purple_leaves);

  const circleGeom = new THREE.CircleGeometry(0.5, 32);

  const red_berry_data = [
    [1.58, 0.82, 0.14, 0.16],
    [2.18, 0.62, 0.12, 0.14],
    [1.02, 0.66, 0.12, 0.14],
    [1.30, 0.08, 0.13, 0.15],
    [2.35, -0.08, 0.12, 0.14],
    [1.02, -0.48, 0.13, 0.15],
    [1.72, -0.92, 0.13, 0.15],
    [2.55, -1.02, 0.11, 0.13],
  ];
  const red_berries = new THREE.InstancedMesh(circleGeom, red_glazeMat, red_berry_data.length);
  for (let i = 0; i < red_berry_data.length; i++) {
    const d = red_berry_data[i];
    setDecalInstance(red_berries, i, d[0], d[1], d[2], d[3], 0, 0.020);
  }
  red_berries.instanceMatrix.needsUpdate = true;
  decoration_group.add(red_berries);

  const orange_berry_data = [
    [1.42, 1.08, 0.10, 0.12],
    [1.82, 1.00, 0.09, 0.11],
    [1.12, 0.88, 0.09, 0.11],
    [2.22, 0.18, 0.10, 0.12],
    [1.72, -0.18, 0.09, 0.11],
    [1.22, -0.72, 0.10, 0.12],
    [2.48, -0.55, 0.09, 0.11],
  ];
  const orange_berries = new THREE.InstancedMesh(circleGeom, orange_glazeMat, orange_berry_data.length);
  for (let i = 0; i < orange_berry_data.length; i++) {
    const d = orange_berry_data[i];
    setDecalInstance(orange_berries, i, d[0], d[1], d[2], d[3], 0, 0.021);
  }
  orange_berries.instanceMatrix.needsUpdate = true;
  decoration_group.add(orange_berries);

  const blue_berry_data = [
    [1.72, 0.42, 0.16, 0.18],
    [1.22, 0.34, 0.15, 0.17],
    [2.05, 0.02, 0.16, 0.18],
    [1.48, -0.22, 0.15, 0.17],
    [0.92, 0.12, 0.14, 0.16],
    [2.42, -0.28, 0.14, 0.16],
    [1.82, -0.58, 0.15, 0.17],
  ];
  const blue_berries = new THREE.InstancedMesh(circleGeom, blue_glazeMat, blue_berry_data.length);
  for (let i = 0; i < blue_berry_data.length; i++) {
    const d = blue_berry_data[i];
    setDecalInstance(blue_berries, i, d[0], d[1], d[2], d[3], 0, 0.022);
  }
  blue_berries.instanceMatrix.needsUpdate = true;
  decoration_group.add(blue_berries);

  const purple_berry_data = [
    [1.38, 0.52, 0.15, 0.17],
    [2.02, 0.34, 0.14, 0.16],
    [1.08, -0.02, 0.14, 0.16],
    [1.72, -0.48, 0.15, 0.17],
    [2.28, -0.78, 0.14, 0.16],
  ];
  const purple_berries = new THREE.InstancedMesh(circleGeom, purple_glazeMat, purple_berry_data.length);
  for (let i = 0; i < purple_berry_data.length; i++) {
    const d = purple_berry_data[i];
    setDecalInstance(purple_berries, i, d[0], d[1], d[2], d[3], 0, 0.023);
  }
  purple_berries.instanceMatrix.needsUpdate = true;
  decoration_group.add(purple_berries);

  const white_highlight_data = [
    [1.72, 0.50, 0.13, 0.16, -0.25],
    [1.28, 0.38, 0.12, 0.15, 0.35],
    [2.12, 0.18, 0.11, 0.14, -0.35],
    [1.42, -0.12, 0.11, 0.14, 0.25],
    [1.05, 0.72, 0.10, 0.13, -0.20],
    [2.32, -0.42, 0.10, 0.13, 0.30],
  ];
  const white_highlights = new THREE.InstancedMesh(circleGeom, white_glazeMat, white_highlight_data.length);
  for (let i = 0; i < white_highlight_data.length; i++) {
    const d = white_highlight_data[i];
    setDecalInstance(white_highlights, i, d[0], d[1], d[2], d[3], d[4], 0.025);
  }
  white_highlights.instanceMatrix.needsUpdate = true;
  decoration_group.add(white_highlights);

  const light_blue_highlight_data = [
    [1.92, 0.30, 0.16, 0.20, -0.45],
    [1.18, 0.18, 0.15, 0.19, 0.45],
    [2.22, -0.22, 0.15, 0.19, -0.50],
    [1.38, -0.52, 0.15, 0.19, 0.45],
    [0.88, -0.18, 0.14, 0.18, -0.40],
  ];
  const light_blue_highlights = new THREE.InstancedMesh(circleGeom, light_blue_glazeMat, light_blue_highlight_data.length);
  for (let i = 0; i < light_blue_highlight_data.length; i++) {
    const d = light_blue_highlight_data[i];
    setDecalInstance(light_blue_highlights, i, d[0], d[1], d[2], d[3], d[4], 0.024);
  }
  light_blue_highlights.instanceMatrix.needsUpdate = true;
  decoration_group.add(light_blue_highlights);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    object.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 0.98 / maxDim;
      object.scale.setScalar(scale);
    }
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
