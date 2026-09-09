function __sn17_user(THREE) {
  const root = new THREE.Group();

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.75,
    roughness: 0.28,
  });
  const darkGoldMat = new THREE.MeshStandardMaterial({
    color: 0x8a641c,
    metalness: 0.65,
    roughness: 0.45,
  });
  const featherMat = new THREE.MeshStandardMaterial({
    color: 0xc8b9a3,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const featherLightMat = new THREE.MeshStandardMaterial({
    color: 0xe2d8c8,
    metalness: 0.0,
    roughness: 0.98,
    side: THREE.DoubleSide,
  });
  const barbMat = new THREE.LineBasicMaterial({
    color: 0x8f8374,
    transparent: true,
    opacity: 0.55,
  });
  const downMat = new THREE.LineBasicMaterial({
    color: 0xf0e8da,
    transparent: true,
    opacity: 0.45,
  });
  const highlightMat = new THREE.MeshStandardMaterial({
    color: 0xfff8e8,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const stand_group = new THREE.Group();
  root.add(stand_group);

  const baseProfile = [
    new THREE.Vector2(0.00, -0.58),
    new THREE.Vector2(0.25, -0.58),
    new THREE.Vector2(0.31, -0.55),
    new THREE.Vector2(0.30, -0.51),
    new THREE.Vector2(0.22, -0.47),
    new THREE.Vector2(0.16, -0.39),
    new THREE.Vector2(0.10, -0.34),
    new THREE.Vector2(0.00, -0.33),
  ];
  const brass_base_geom = new THREE.LatheGeometry(baseProfile, 64);
  const brass_base = new THREE.Mesh(brass_base_geom, goldMat);
  stand_group.add(brass_base);

  const base_rim_geom = new THREE.TorusGeometry(0.285, 0.012, 10, 64);
  const base_rim = new THREE.Mesh(base_rim_geom, darkGoldMat);
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = -0.565;
  stand_group.add(base_rim);

  const pedestal_stem_geom = new THREE.CylinderGeometry(0.075, 0.105, 0.16, 48);
  const pedestal_stem = new THREE.Mesh(pedestal_stem_geom, goldMat);
  pedestal_stem.position.y = -0.265;
  stand_group.add(pedestal_stem);

  const pedestal_lower_ring_geom = new THREE.TorusGeometry(0.105, 0.012, 10, 48);
  const pedestal_lower_ring = new THREE.Mesh(pedestal_lower_ring_geom, darkGoldMat);
  pedestal_lower_ring.rotation.x = Math.PI / 2;
  pedestal_lower_ring.position.y = -0.345;
  stand_group.add(pedestal_lower_ring);

  const pedestal_top_cap_geom = new THREE.CylinderGeometry(0.125, 0.105, 0.055, 48);
  const pedestal_top_cap = new THREE.Mesh(pedestal_top_cap_geom, goldMat);
  pedestal_top_cap.position.y = -0.165;
  stand_group.add(pedestal_top_cap);

  const pedestal_top_ring_geom = new THREE.TorusGeometry(0.118, 0.012, 10, 48);
  const pedestal_top_ring = new THREE.Mesh(pedestal_top_ring_geom, darkGoldMat);
  pedestal_top_ring.rotation.x = Math.PI / 2;
  pedestal_top_ring.position.y = -0.135;
  stand_group.add(pedestal_top_ring);

  const pedestal_inset_geom = new THREE.CylinderGeometry(0.078, 0.078, 0.008, 40);
  const pedestal_inset = new THREE.Mesh(pedestal_inset_geom, new THREE.MeshStandardMaterial({
    color: 0xb99a55,
    metalness: 0.55,
    roughness: 0.4,
  }));
  pedestal_inset.position.y = -0.128;
  stand_group.add(pedestal_inset);

  const base_engraving_geom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.13, -0.49, 0.235),
      new THREE.Vector3(-0.08, -0.45, 0.255),
      new THREE.Vector3(-0.02, -0.48, 0.265),
      new THREE.Vector3(0.04, -0.43, 0.255),
      new THREE.Vector3(0.10, -0.46, 0.235),
    ]),
    32,
    0.006,
    8,
    false
  );
  const base_engraving = new THREE.Mesh(base_engraving_geom, darkGoldMat);
  stand_group.add(base_engraving);

  const quill_group = new THREE.Group();
  quill_group.position.set(-0.03, -0.10, 0.02);
  quill_group.rotation.z = -0.62;
  root.add(quill_group);

  const nibGeom = new THREE.ConeGeometry(0.055, 0.30, 32);
  const writing_nib = new THREE.Mesh(nibGeom, goldMat);
  writing_nib.rotation.z = Math.PI;
  writing_nib.position.y = -0.43;
  quill_group.add(writing_nib);

  const nib_slit_geom = new THREE.BoxGeometry(0.006, 0.16, 0.006);
  const nib_slit = new THREE.Mesh(nib_slit_geom, darkGoldMat);
  nib_slit.position.set(0, -0.48, 0.052);
  quill_group.add(nib_slit);

  const ornate_grip_geom = new THREE.CylinderGeometry(0.082, 0.070, 0.16, 40);
  const ornate_grip = new THREE.Mesh(ornate_grip_geom, goldMat);
  ornate_grip.position.y = -0.205;
  quill_group.add(ornate_grip);

  const lower_grip_ring_geom = new THREE.TorusGeometry(0.078, 0.010, 8, 40);
  const lower_grip_ring = new THREE.Mesh(lower_grip_ring_geom, darkGoldMat);
  lower_grip_ring.rotation.x = Math.PI / 2;
  lower_grip_ring.position.y = -0.285;
  quill_group.add(lower_grip_ring);

  const upper_grip_ring_geom = new THREE.TorusGeometry(0.086, 0.010, 8, 40);
  const upper_grip_ring = new THREE.Mesh(upper_grip_ring_geom, darkGoldMat);
  upper_grip_ring.rotation.x = Math.PI / 2;
  upper_grip_ring.position.y = -0.125;
  quill_group.add(upper_grip_ring);

  const shaft_socket_geom = new THREE.CylinderGeometry(0.052, 0.066, 0.15, 40);
  const shaft_socket = new THREE.Mesh(shaft_socket_geom, goldMat);
  shaft_socket.position.y = -0.045;
  quill_group.add(shaft_socket);

  const socket_band_geom = new THREE.TorusGeometry(0.060, 0.009, 8, 40);
  const socket_band = new THREE.Mesh(socket_band_geom, darkGoldMat);
  socket_band.rotation.x = Math.PI / 2;
  socket_band.position.y = 0.025;
  quill_group.add(socket_band);

  const ornament_bead_geom = new THREE.SphereGeometry(0.018, 12, 8);
  const ornament_beads = new THREE.InstancedMesh(ornament_bead_geom, goldMat, 14);
  const bead_dummy = new THREE.Object3D();
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    bead_dummy.position.set(Math.cos(a) * 0.083, -0.205, Math.sin(a) * 0.083);
    bead_dummy.scale.set(1.0, 0.75, 1.0);
    bead_dummy.updateMatrix();
    ornament_beads.setMatrixAt(i, bead_dummy.matrix);
  }
  quill_group.add(ornament_beads);

  const grip_scroll_left_geom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.055, -0.255, 0.060),
      new THREE.Vector3(-0.085, -0.225, 0.070),
      new THREE.Vector3(-0.060, -0.175, 0.078),
      new THREE.Vector3(-0.020, -0.190, 0.086),
    ]),
    24,
    0.006,
    8,
    false
  );
  const grip_scroll_left = new THREE.Mesh(grip_scroll_left_geom, darkGoldMat);
  quill_group.add(grip_scroll_left);

  const grip_scroll_right_geom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.055, -0.255, 0.060),
      new THREE.Vector3(0.085, -0.225, 0.070),
      new THREE.Vector3(0.060, -0.175, 0.078),
      new THREE.Vector3(0.020, -0.190, 0.086),
    ]),
    24,
    0.006,
    8,
    false
  );
  const grip_scroll_right = new THREE.Mesh(grip_scroll_right_geom, darkGoldMat);
  quill_group.add(grip_scroll_right);

  const feather_group = new THREE.Group();
  quill_group.add(feather_group);

  const left_vane_shape = new THREE.Shape();
  left_vane_shape.moveTo(-0.012, 0.06);
  left_vane_shape.lineTo(-0.010, 0.45);
  left_vane_shape.lineTo(-0.006, 0.90);
  left_vane_shape.lineTo(-0.002, 1.35);
  left_vane_shape.lineTo(0.015, 1.72);
  left_vane_shape.lineTo(-0.070, 1.68);
  left_vane_shape.lineTo(-0.180, 1.55);
  left_vane_shape.lineTo(-0.300, 1.32);
  left_vane_shape.lineTo(-0.410, 1.02);
  left_vane_shape.lineTo(-0.470, 0.72);
  left_vane_shape.lineTo(-0.420, 0.48);
  left_vane_shape.lineTo(-0.280, 0.25);
  left_vane_shape.lineTo(-0.100, 0.08);
  left_vane_shape.closePath();

  const left_feather_vane_geom = new THREE.ShapeGeometry(left_vane_shape);
  const left_feather_vane = new THREE.Mesh(left_feather_vane_geom, featherMat);
  feather_group.add(left_feather_vane);

  const right_vane_shape = new THREE.Shape();
  right_vane_shape.moveTo(0.012, 0.06);
  right_vane_shape.lineTo(0.010, 0.45);
  right_vane_shape.lineTo(0.006, 0.90);
  right_vane_shape.lineTo(0.002, 1.35);
  right_vane_shape.lineTo(-0.015, 1.72);
  right_vane_shape.lineTo(0.080, 1.68);
  right_vane_shape.lineTo(0.190, 1.55);
  right_vane_shape.lineTo(0.310, 1.32);
  right_vane_shape.lineTo(0.420, 1.02);
  right_vane_shape.lineTo(0.480, 0.72);
  right_vane_shape.lineTo(0.430, 0.48);
  right_vane_shape.lineTo(0.290, 0.25);
  right_vane_shape.lineTo(0.100, 0.08);
  right_vane_shape.closePath();

  const right_feather_vane_geom = new THREE.ShapeGeometry(right_vane_shape);
  const right_feather_vane = new THREE.Mesh(right_feather_vane_geom, featherLightMat);
  feather_group.add(right_feather_vane);

  const central_gold_shaft_geom = new THREE.CylinderGeometry(0.010, 0.018, 1.72, 24);
  const central_gold_shaft = new THREE.Mesh(central_gold_shaft_geom, goldMat);
  central_gold_shaft.position.y = 0.86;
  feather_group.add(central_gold_shaft);

  const barb_positions = [];
  const barbCount = 34;
  for (let i = 0; i < barbCount; i++) {
    const t = i / (barbCount - 1);
    const y = 0.12 + t * 1.48;
    const envelope = Math.sin(t * Math.PI);
    const leftWidth = 0.055 + envelope * 0.405;
    const rightWidth = 0.050 + envelope * 0.425;
    const lift = 0.045 + envelope * 0.055;

    barb_positions.push(-0.006, y, 0.018, -leftWidth, y + lift, 0.018);
    barb_positions.push(0.006, y, 0.019, rightWidth, y + lift, 0.019);

    if (i % 2 === 0) {
      barb_positions.push(-0.004, y + 0.01, 0.020, -leftWidth * 0.72, y + lift * 0.72, 0.020);
      barb_positions.push(0.004, y + 0.01, 0.021, rightWidth * 0.72, y + lift * 0.72, 0.021);
    }
  }
  const feather_barbs_geom = new THREE.BufferGeometry();
  feather_barbs_geom.setAttribute("position", new THREE.Float32BufferAttribute(barb_positions, 3));
  const feather_barbs = new THREE.LineSegments(feather_barbs_geom, barbMat);
  feather_group.add(feather_barbs);

  const down_positions = [];
  for (let i = 0; i < 26; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const y = 0.02 + (i % 13) * 0.035;
    const reach = 0.10 + ((i * 7) % 11) * 0.018;
    const endY = y + 0.08 + ((i * 5) % 7) * 0.012;
    down_positions.push(side * 0.025, y, 0.025, side * reach, endY, 0.025);
  }
  const downy_filaments_geom = new THREE.BufferGeometry();
  downy_filaments_geom.setAttribute("position", new THREE.Float32BufferAttribute(down_positions, 3));
  const downy_filaments = new THREE.LineSegments(downy_filaments_geom, downMat);
  feather_group.add(downy_filaments);

  const highlight_shape = new THREE.Shape();
  highlight_shape.moveTo(0.035, 0.92);
  highlight_shape.lineTo(0.315, 1.02);
  highlight_shape.lineTo(0.050, 1.10);
  highlight_shape.closePath();
  const feather_highlight_geom = new THREE.ShapeGeometry(highlight_shape);
  const feather_highlight = new THREE.Mesh(feather_highlight_geom, highlightMat);
  feather_highlight.position.z = 0.032;
  feather_group.add(feather_highlight);

  const upper_highlight_shape = new THREE.Shape();
  upper_highlight_shape.moveTo(0.025, 1.35);
  upper_highlight_shape.lineTo(0.210, 1.43);
  upper_highlight_shape.lineTo(0.040, 1.50);
  upper_highlight_shape.closePath();
  const upper_feather_highlight_geom = new THREE.ShapeGeometry(upper_highlight_shape);
  const upper_feather_highlight = new THREE.Mesh(upper_feather_highlight_geom, highlightMat);
  upper_feather_highlight.position.z = 0.033;
  feather_group.add(upper_feather_highlight);

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
  if (maxDim > 0) {
    const scale = 0.95 / maxDim;
    root.scale.setScalar(scale);
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
