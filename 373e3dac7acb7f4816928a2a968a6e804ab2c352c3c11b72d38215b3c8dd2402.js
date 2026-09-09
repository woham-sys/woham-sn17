function __sn17_user(THREE) {
  const root = new THREE.Group();

  const board_radius = 1.0;
  const face_radius = 0.955;
  const green_radius = 0.78;
  const bullseye_radius = 0.17;

  const back_board_mat = new THREE.MeshStandardMaterial({
    color: 0x111916,
    roughness: 0.82,
  });
  const outer_face_mat = new THREE.MeshStandardMaterial({
    color: 0x17231f,
    roughness: 0.9,
  });
  const green_scoring_band_mat = new THREE.MeshStandardMaterial({
    color: 0x087a45,
    roughness: 0.9,
  });
  const green_line_mat = new THREE.MeshStandardMaterial({
    color: 0x168454,
    roughness: 0.85,
  });
  const white_print_mat = new THREE.MeshStandardMaterial({
    color: 0xf1f3ee,
    roughness: 0.55,
  });
  const red_bullseye_mat = new THREE.MeshStandardMaterial({
    color: 0xe6001b,
    roughness: 0.72,
  });
  const chrome_rim_mat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d8,
    metalness: true,
    roughness: 0.18,
  });
  const dark_metal_mat = new THREE.MeshStandardMaterial({
    color: 0x252927,
    metalness: true,
    roughness: 0.35,
  });

  const back_board_geom = new THREE.CylinderGeometry(board_radius, board_radius, 0.08, 96);
  const back_board = new THREE.Mesh(back_board_geom, back_board_mat);
  back_board.rotation.x = Math.PI / 2;
  back_board.position.z = -0.015;
  root.add(back_board);

  const outer_face_geom = new THREE.CircleGeometry(face_radius, 96);
  const outer_face = new THREE.Mesh(outer_face_geom, outer_face_mat);
  outer_face.position.z = 0.027;
  root.add(outer_face);

  const green_scoring_band_geom = new THREE.CircleGeometry(green_radius, 96);
  const green_scoring_band = new THREE.Mesh(green_scoring_band_geom, green_scoring_band_mat);
  green_scoring_band.position.z = 0.031;
  root.add(green_scoring_band);

  const vertical_guide_line_geom = new THREE.BoxGeometry(0.014, 1.86, 0.006);
  const vertical_guide_line = new THREE.Mesh(vertical_guide_line_geom, green_line_mat);
  vertical_guide_line.position.z = 0.036;
  root.add(vertical_guide_line);

  const horizontal_guide_line_geom = new THREE.BoxGeometry(1.86, 0.014, 0.006);
  const horizontal_guide_line = new THREE.Mesh(horizontal_guide_line_geom, green_line_mat);
  horizontal_guide_line.position.z = 0.036;
  root.add(horizontal_guide_line);

  const outer_score_ring_geom = new THREE.RingGeometry(0.765, 0.785, 96);
  const outer_score_ring = new THREE.Mesh(outer_score_ring_geom, white_print_mat);
  outer_score_ring.position.z = 0.041;
  root.add(outer_score_ring);

  const middle_score_ring_geom = new THREE.RingGeometry(0.558, 0.578, 96);
  const middle_score_ring = new THREE.Mesh(middle_score_ring_geom, white_print_mat);
  middle_score_ring.position.z = 0.041;
  root.add(middle_score_ring);

  const inner_score_ring_geom = new THREE.RingGeometry(0.358, 0.378, 96);
  const inner_score_ring = new THREE.Mesh(inner_score_ring_geom, white_print_mat);
  inner_score_ring.position.z = 0.041;
  root.add(inner_score_ring);

  const partial_arc_geom = new THREE.TorusGeometry(0.43, 0.009, 8, 48, 1.72);
  const partial_arc = new THREE.Mesh(partial_arc_geom, white_print_mat);
  partial_arc.rotation.z = -0.75;
  partial_arc.position.z = 0.044;
  root.add(partial_arc);

  const red_bullseye_geom = new THREE.SphereGeometry(bullseye_radius, 48, 24);
  const red_bullseye = new THREE.Mesh(red_bullseye_geom, red_bullseye_mat);
  red_bullseye.scale.set(1, 1, 0.09);
  red_bullseye.position.z = 0.058;
  root.add(red_bullseye);

  function createStroke(points, radius, closed) {
    const curve_points = [];
    for (let i = 0; i < points.length; i++) {
      curve_points.push(new THREE.Vector3(points[i][0], points[i][1], 0));
    }
    const curve = new THREE.CatmullRomCurve3(curve_points, closed, "centripetal");
    const geom = new THREE.TubeGeometry(curve, closed ? 32 : 24, radius, 8, closed);
    return new THREE.Mesh(geom, white_print_mat);
  }

  const number_one = createStroke([
    [0.025, 0.09],
    [-0.005, 0.09],
    [-0.005, -0.09],
  ], 0.011, false);
  number_one.position.set(0, 0.68, 0.048);
  root.add(number_one);

  const number_two = createStroke([
    [-0.065, 0.065],
    [-0.045, 0.105],
    [0.025, 0.105],
    [0.070, 0.065],
    [0.060, 0.015],
    [0.010, -0.035],
    [-0.055, -0.09],
    [0.075, -0.09],
  ], 0.011, false);
  number_two.position.set(0, 0.46, 0.048);
  root.add(number_two);

  const number_three = createStroke([
    [-0.055, 0.09],
    [0.020, 0.105],
    [0.065, 0.065],
    [0.055, 0.015],
    [0.005, 0.000],
    [0.055, -0.015],
    [0.065, -0.065],
    [0.020, -0.105],
    [-0.055, -0.09],
  ], 0.011, false);
  number_three.position.set(0, -0.48, 0.048);
  root.add(number_three);

  const number_zero = createStroke([
    [0.000, 0.105],
    [0.050, 0.075],
    [0.060, 0.000],
    [0.050, -0.075],
    [0.000, -0.105],
    [-0.050, -0.075],
    [-0.060, 0.000],
    [-0.050, 0.075],
  ], 0.011, true);
  number_zero.position.set(0, -0.68, 0.048);
  root.add(number_zero);

  const outer_rim_geom = new THREE.TorusGeometry(1.005, 0.022, 12, 128);
  const outer_rim = new THREE.Mesh(outer_rim_geom, chrome_rim_mat);
  outer_rim.position.z = 0.018;
  root.add(outer_rim);

  const inner_rim_geom = new THREE.TorusGeometry(0.972, 0.010, 8, 128);
  const inner_rim = new THREE.Mesh(inner_rim_geom, dark_metal_mat);
  inner_rim.position.z = 0.026;
  root.add(inner_rim);

  const rim_clips_geom = new THREE.TorusGeometry(0.027, 0.006, 8, 24);
  const rim_clips = new THREE.InstancedMesh(rim_clips_geom, chrome_rim_mat, 10);
  const clip_dummy = new THREE.Object3D();
  for (let i = 0; i < 10; i++) {
    const angle = i / 10 * Math.PI * 2 + Math.PI / 10;
    clip_dummy.position.set(Math.cos(angle) * 1.005, Math.sin(angle) * 1.005, 0.035);
    clip_dummy.rotation.set(0, 0, angle);
    clip_dummy.updateMatrix();
    rim_clips.setMatrixAt(i, clip_dummy.matrix);
  }
  rim_clips.instanceMatrix.needsUpdate = true;
  root.add(rim_clips);

  const rim_fasteners_geom = new THREE.SphereGeometry(0.018, 16, 8);
  const rim_fasteners = new THREE.InstancedMesh(rim_fasteners_geom, dark_metal_mat, 10);
  const fastener_dummy = new THREE.Object3D();
  for (let i = 0; i < 10; i++) {
    const angle = i / 10 * Math.PI * 2 + Math.PI / 10;
    fastener_dummy.position.set(Math.cos(angle) * 0.982, Math.sin(angle) * 0.982, 0.045);
    fastener_dummy.scale.set(0.75, 1.25, 0.55);
    fastener_dummy.rotation.set(0, 0, angle);
    fastener_dummy.updateMatrix();
    rim_fasteners.setMatrixAt(i, fastener_dummy.matrix);
  }
  rim_fasteners.instanceMatrix.needsUpdate = true;
  root.add(rim_fasteners);

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
  const scale = 0.98 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
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
