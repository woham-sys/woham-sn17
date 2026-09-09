function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "work_boot";

  const leatherMat = new THREE.MeshStandardMaterial({ color: 0x7a4b32, metalness: 0.0, roughness: 0.7 });
  const darkLeatherMat = new THREE.MeshStandardMaterial({ color: 0x4b2d22, metalness: 0.0, roughness: 0.75 });
  const rubberMat = new THREE.MeshStandardMaterial({ color: 0x17191a, metalness: 0.0, roughness: 0.85 });
  const blackFabricMat = new THREE.MeshStandardMaterial({ color: 0x111315, metalness: 0.0, roughness: 0.9 });
  const eyeletMat = new THREE.MeshStandardMaterial({ color: 0x3a3a38, metalness: 0.5, roughness: 0.45 });
  const scuffMat = new THREE.MeshStandardMaterial({ color: 0xb99a68, metalness: 0.0, roughness: 0.95 });
  const dirtMat = new THREE.MeshStandardMaterial({ color: 0x242321, metalness: 0.0, roughness: 0.95 });

  function makeSideExtrude(points, width, mat, zOffset) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) shape.lineTo(points[i][0], points[i][1]);
    shape.closePath();
    const geom = new THREE.ExtrudeGeometry(shape, { depth: width, steps: 1 });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.rotation.y = -Math.PI / 2;
    mesh.position.x = width / 2 + zOffset;
    return mesh;
  }

  function makeTube(points, radius, mat, segments) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(new THREE.TubeGeometry(curve, segments || 24, radius, 8, false), mat);
  }

  function makeEllipseTube(cx, cy, cz, rx, ry, radius, mat) {
    const pts = [];
    for (let i = 0; i < 32; i++) {
      const t = (i / 32) * Math.PI * 2;
      pts.push(new THREE.Vector3(cx + Math.cos(t) * rx, cy + Math.sin(t) * ry, cz));
    }
    return makeTube(pts, radius, mat, 64);
  }

  const sole_group = new THREE.Group();
  sole_group.name = "sole_group";
  root.add(sole_group);

  const outsole = makeSideExtrude([
    [-0.62, 0.000],
    [0.60, 0.000],
    [0.70, 0.035],
    [0.72, 0.090],
    [0.62, 0.135],
    [-0.55, 0.135],
    [-0.66, 0.095],
    [-0.68, 0.040]
  ], 0.36, rubberMat, 0);
  outsole.name = "outsole";
  sole_group.add(outsole);

  const midsole = makeSideExtrude([
    [-0.60, 0.105],
    [0.62, 0.105],
    [0.67, 0.145],
    [0.58, 0.180],
    [-0.55, 0.180],
    [-0.63, 0.145]
  ], 0.34, rubberMat, 0);
  midsole.name = "midsole";
  sole_group.add(midsole);

  const welt = makeSideExtrude([
    [-0.58, 0.165],
    [0.58, 0.165],
    [0.62, 0.195],
    [0.52, 0.215],
    [-0.55, 0.215],
    [-0.61, 0.190]
  ], 0.32, rubberMat, 0);
  welt.name = "welt";
  sole_group.add(welt);

  const heel_block = makeSideExtrude([
    [-0.62, 0.000],
    [-0.31, 0.000],
    [-0.27, 0.070],
    [-0.31, 0.135],
    [-0.62, 0.135]
  ], 0.38, rubberMat, 0);
  heel_block.name = "heel_block";
  sole_group.add(heel_block);

  const tread_lug_geom = new THREE.BoxGeometry(0.38, 0.045, 0.075);
  const tread_lugs = new THREE.InstancedMesh(tread_lug_geom, rubberMat, 13);
  tread_lugs.name = "tread_lugs";
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 13; i++) {
    const x = -0.55 + i * 0.095;
    const z = i % 2 === 0 ? 0.0 : 0.018;
    dummy.position.set(x, -0.025, z);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    tread_lugs.setMatrixAt(i, dummy.matrix);
  }
  sole_group.add(tread_lugs);

  const upper_group = new THREE.Group();
  upper_group.name = "upper_group";
  root.add(upper_group);

  const foot_upper = makeSideExtrude([
    [-0.52, 0.185],
    [0.52, 0.185],
    [0.66, 0.235],
    [0.68, 0.300],
    [0.58, 0.355],
    [0.38, 0.395],
    [0.18, 0.455],
    [-0.05, 0.535],
    [-0.25, 0.475],
    [-0.47, 0.365]
  ], 0.28, leatherMat, 0);
  foot_upper.name = "foot_upper";
  upper_group.add(foot_upper);

  const toe_cap_geom = new THREE.SphereGeometry(0.18, 32, 16);
  const toe_cap = new THREE.Mesh(toe_cap_geom, leatherMat);
  toe_cap.name = "toe_cap";
  toe_cap.scale.set(1.0, 0.72, 0.82);
  toe_cap.position.set(0.58, 0.285, 0);
  upper_group.add(toe_cap);

  const shaft = makeSideExtrude([
    [-0.50, 0.205],
    [0.10, 0.205],
    [0.16, 0.390],
    [0.08, 0.575],
    [-0.02, 0.925],
    [-0.42, 0.925],
    [-0.49, 0.700]
  ], 0.25, leatherMat, 0);
  shaft.name = "shaft";
  upper_group.add(shaft);

  const ankle_quarter = makeSideExtrude([
    [-0.48, 0.205],
    [-0.03, 0.205],
    [0.05, 0.335],
    [-0.03, 0.500],
    [-0.18, 0.610],
    [-0.43, 0.525]
  ], 0.29, leatherMat, 0);
  ankle_quarter.name = "ankle_quarter";
  upper_group.add(ankle_quarter);

  const vamp_panel = makeSideExtrude([
    [0.02, 0.205],
    [0.55, 0.205],
    [0.62, 0.270],
    [0.52, 0.345],
    [0.31, 0.390],
    [0.12, 0.430]
  ], 0.30, leatherMat, 0);
  vamp_panel.name = "vamp_panel";
  upper_group.add(vamp_panel);

  const collar_band = makeSideExtrude([
    [-0.47, 0.895],
    [0.02, 0.895],
    [0.00, 0.955],
    [-0.45, 0.955]
  ], 0.29, blackFabricMat, 0);
  collar_band.name = "collar_band";
  upper_group.add(collar_band);

  const top_opening = makeEllipseTube(-0.235, 0.946, 0, 0.225, 0.060, 0.018, blackFabricMat);
  top_opening.name = "top_opening";
  upper_group.add(top_opening);

  const pull_loop = makeEllipseTube(-0.455, 1.035, 0, 0.055, 0.125, 0.018, leatherMat);
  pull_loop.name = "pull_loop";
  upper_group.add(pull_loop);

  const pull_loop_inner = makeEllipseTube(-0.455, 1.035, 0, 0.032, 0.085, 0.008, darkLeatherMat);
  pull_loop_inner.name = "pull_loop_inner";
  upper_group.add(pull_loop_inner);

  const lace_group = new THREE.Group();
  lace_group.name = "lace_group";
  root.add(lace_group);

  const eyelet_x = [0.045, 0.000, -0.045, -0.090, -0.135, -0.180];
  const eyelet_y = [0.455, 0.555, 0.655, 0.755, 0.855, 0.925];

  const eyelet_ring_geom = new THREE.TorusGeometry(0.034, 0.008, 10, 24);
  const eyelet_rings = new THREE.InstancedMesh(eyelet_ring_geom, eyeletMat, 12);
  eyelet_rings.name = "eyelet_rings";
  let eyeletIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < eyelet_x.length; i++) {
      dummy.position.set(eyelet_x[i], eyelet_y[i], side * 0.158);
      dummy.rotation.set(0, side > 0 ? 0 : Math.PI, 0);
      dummy.updateMatrix();
      eyelet_rings.setMatrixAt(eyeletIndex++, dummy.matrix);
    }
  }
  lace_group.add(eyelet_rings);

  const eyelet_hole_geom = new THREE.CircleGeometry(0.020, 18);
  const eyelet_holes = new THREE.InstancedMesh(eyelet_hole_geom, blackFabricMat, 12);
  eyelet_holes.name = "eyelet_holes";
  let holeIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < eyelet_x.length; i++) {
      dummy.position.set(eyelet_x[i], eyelet_y[i], side * 0.166);
      dummy.rotation.set(0, side > 0 ? 0 : Math.PI, 0);
      dummy.updateMatrix();
      eyelet_holes.setMatrixAt(holeIndex++, dummy.matrix);
    }
  }
  lace_group.add(eyelet_holes);

  for (let i = 0; i < eyelet_x.length - 1; i++) {
    const left_eye = new THREE.Vector3(eyelet_x[i], eyelet_y[i], -0.170);
    const right_eye = new THREE.Vector3(eyelet_x[i + 1], eyelet_y[i + 1], 0.170);
    const middle = new THREE.Vector3((left_eye.x + right_eye.x) * 0.5, (left_eye.y + right_eye.y) * 0.5 + 0.018, 0.188);
    const cross_lace = makeTube([left_eye, middle, right_eye], 0.012, blackFabricMat, 18);
    cross_lace.name = "cross_lace_" + i;
    lace_group.add(cross_lace);

    const outer_eye_left = new THREE.Vector3(eyelet_x[i], eyelet_y[i], 0.170);
    const outer_eye_right = new THREE.Vector3(eyelet_x[i + 1], eyelet_y[i + 1], -0.170);
    const outer_middle = new THREE.Vector3((outer_eye_left.x + outer_eye_right.x) * 0.5, (outer_eye_left.y + outer_eye_right.y) * 0.5 + 0.012, -0.188);
    const outer_lace = makeTube([outer_eye_left, outer_middle, outer_eye_right], 0.010, blackFabricMat, 18);
    outer_lace.name = "outer_lace_" + i;
    lace_group.add(outer_lace);
  }

  const bottom_lace_knot = makeTube([
    new THREE.Vector3(eyelet_x[0], eyelet_y[0], -0.170),
    new THREE.Vector3(0.055, 0.430, 0.000),
    new THREE.Vector3(eyelet_x[0], eyelet_y[0], 0.170)
  ], 0.013, blackFabricMat, 20);
  bottom_lace_knot.name = "bottom_lace_knot";
  lace_group.add(bottom_lace_knot);

  const seam_group = new THREE.Group();
  seam_group.name = "seam_group";
  root.add(seam_group);

  const front_vertical_seam = makeTube([
    new THREE.Vector3(0.055, 0.225, 0.166),
    new THREE.Vector3(0.030, 0.405, 0.166),
    new THREE.Vector3(-0.015, 0.575, 0.166),
    new THREE.Vector3(-0.030, 0.890, 0.166)
  ], 0.004, darkLeatherMat, 32);
  front_vertical_seam.name = "front_vertical_seam";
  seam_group.add(front_vertical_seam);

  const rear_vertical_seam = makeTube([
    new THREE.Vector3(-0.455, 0.235, 0.166),
    new THREE.Vector3(-0.475, 0.455, 0.166),
    new THREE.Vector3(-0.465, 0.700, 0.166),
    new THREE.Vector3(-0.430, 0.890, 0.166)
  ], 0.004, darkLeatherMat, 32);
  rear_vertical_seam.name = "rear_vertical_seam";
  seam_group.add(rear_vertical_seam);

  const ankle_curved_seam = makeTube([
    new THREE.Vector3(-0.430, 0.315, 0.171),
    new THREE.Vector3(-0.300, 0.385, 0.171),
    new THREE.Vector3(-0.155, 0.455, 0.171),
    new THREE.Vector3(0.020, 0.485, 0.171)
  ], 0.004, darkLeatherMat, 32);
  ankle_curved_seam.name = "ankle_curved_seam";
  seam_group.add(ankle_curved_seam);

  const toe_cap_seam = makeTube([
    new THREE.Vector3(0.505, 0.220, 0.166),
    new THREE.Vector3(0.520, 0.315, 0.166),
    new THREE.Vector3(0.470, 0.375, 0.166),
    new THREE.Vector3(0.390, 0.395, 0.166)
  ], 0.004, darkLeatherMat, 24);
  toe_cap_seam.name = "toe_cap_seam";
  seam_group.add(toe_cap_seam);

  const stitch_geom = new THREE.BoxGeometry(0.026, 0.004, 0.006);
  const seam_stitches = new THREE.InstancedMesh(stitch_geom, darkLeatherMat, 34);
  seam_stitches.name = "seam_stitches";
  for (let i = 0; i < 18; i++) {
    const t = i / 17;
    dummy.position.set(0.055 - 0.085 * t, 0.245 + 0.625 * t, 0.174);
    dummy.rotation.set(0, 0, -0.18);
    dummy.updateMatrix();
    seam_stitches.setMatrixAt(i, dummy.matrix);
  }
  for (let i = 0; i < 16; i++) {
    const t = i / 15;
    dummy.position.set(-0.435 - 0.020 * Math.sin(t * Math.PI), 0.260 + 0.610 * t, 0.174);
    dummy.rotation.set(0, 0, 0.12);
    dummy.updateMatrix();
    seam_stitches.setMatrixAt(18 + i, dummy.matrix);
  }
  seam_group.add(seam_stitches);

  const distress_group = new THREE.Group();
  distress_group.name = "distress_group";
  root.add(distress_group);

  const scuff_data = [
    [0.55, 0.270, 0.075, 0.018, 0.18],
    [0.45, 0.330, 0.055, 0.014, -0.35],
    [0.30, 0.365, 0.060, 0.012, 0.55],
    [0.12, 0.430, 0.045, 0.010, -0.20],
    [-0.05, 0.560, 0.055, 0.011, 0.75],
    [-0.18, 0.700, 0.045, 0.010, -0.50],
    [-0.30, 0.455, 0.060, 0.012, 0.25],
    [-0.40, 0.315, 0.050, 0.014, -0.70],
    [0.60, 0.245, 0.040, 0.012, 0.05],
    [0.22, 0.285, 0.045, 0.010, 0.90],
    [-0.10, 0.820, 0.040, 0.009, 0.35],
    [-0.35, 0.820, 0.035, 0.009, -0.25]
  ];
  const scuff_mark_geom = new THREE.BoxGeometry(1, 1, 0.004);
  const scuff_marks = new THREE.InstancedMesh(scuff_mark_geom, scuffMat, scuff_data.length);
  scuff_marks.name = "scuff_marks";
  for (let i = 0; i < scuff_data.length; i++) {
    const d = scuff_data[i];
    dummy.position.set(d[0], d[1], 0.176);
    dummy.rotation.set(0, 0, d[4]);
    dummy.scale.set(d[2], d[3], 1);
    dummy.updateMatrix();
    scuff_marks.setMatrixAt(i, dummy.matrix);
  }
  distress_group.add(scuff_marks);

  const dirt_data = [
    [0.58, 0.255, 0.030, 0.010, 0.1],
    [0.48, 0.285, 0.025, 0.009, -0.4],
    [0.36, 0.350, 0.020, 0.008, 0.7],
    [0.20, 0.390, 0.018, 0.007, -0.2],
    [0.02, 0.470, 0.020, 0.008, 0.4],
    [-0.12, 0.610, 0.018, 0.007, -0.6],
    [-0.25, 0.735, 0.016, 0.006, 0.2],
    [-0.36, 0.390, 0.025, 0.009, 0.8],
    [-0.42, 0.285, 0.022, 0.008, -0.3],
    [0.10, 0.835, 0.018, 0.006, 0.5]
  ];
  const dirt_marks = new THREE.InstancedMesh(scuff_mark_geom, dirtMat, dirt_data.length);
  dirt_marks.name = "dirt_marks";
  for (let i = 0; i < dirt_data.length; i++) {
    const d = dirt_data[i];
    dummy.position.set(d[0], d[1], 0.178);
    dummy.rotation.set(0, 0, d[4]);
    dummy.scale.set(d[2], d[3], 1);
    dummy.updateMatrix();
    dirt_marks.setMatrixAt(i, dummy.matrix);
  }
  distress_group.add(dirt_marks);

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
  if (maxDim > 0) root.scale.setScalar(0.98 / maxDim);
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
