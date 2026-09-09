function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "stainless_steel_appliance";

  const cabinet = new THREE.Group();
  cabinet.name = "cabinet";
  root.add(cabinet);

  const interior = new THREE.Group();
  interior.name = "interior";
  root.add(interior);

  const top_assembly = new THREE.Group();
  top_assembly.name = "top_assembly";
  root.add(top_assembly);

  const front_details = new THREE.Group();
  front_details.name = "front_details";
  root.add(front_details);

  const hardware = new THREE.Group();
  hardware.name = "hardware";
  root.add(hardware);

  const brushed_metal_mat = new THREE.MeshStandardMaterial({
    color: 0xb9bdc0,
    metalness: 0.45,
    roughness: 0.42
  });
  const light_metal_mat = new THREE.MeshStandardMaterial({
    color: 0xd0d3d4,
    metalness: 0.4,
    roughness: 0.34
  });
  const dark_metal_mat = new THREE.MeshStandardMaterial({
    color: 0x777d80,
    metalness: 0.35,
    roughness: 0.5
  });
  const black_mat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8
  });
  const screw_mat = new THREE.MeshStandardMaterial({
    color: 0xe2e4e5,
    metalness: 0.5,
    roughness: 0.25
  });
  const label_mat = new THREE.MeshStandardMaterial({
    color: 0x2f8fd0,
    metalness: 0.0,
    roughness: 0.35
  });
  const label_text_mat = new THREE.MeshStandardMaterial({
    color: 0xf4f7f8,
    metalness: 0.0,
    roughness: 0.5
  });

  const body_w = 1.28;
  const body_h = 0.98;
  const body_d = 0.92;
  const body_y = 0.55;
  const body_z = -0.04;

  const side_panel_geom = new THREE.BoxGeometry(0.045, body_h, body_d);

  const left_side_panel = new THREE.Mesh(side_panel_geom, brushed_metal_mat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.position.set(-body_w / 2, body_y, body_z);
  cabinet.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panel_geom, brushed_metal_mat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(body_w / 2, body_y, body_z);
  cabinet.add(right_side_panel);

  const rear_panel_geom = new THREE.BoxGeometry(body_w, body_h, 0.045);
  const rear_panel = new THREE.Mesh(rear_panel_geom, brushed_metal_mat);
  rear_panel.name = "rear_panel";
  rear_panel.position.set(0, body_y, -body_d / 2 - 0.04);
  cabinet.add(rear_panel);

  const bottom_panel_geom = new THREE.BoxGeometry(body_w, 0.055, body_d);
  const bottom_panel = new THREE.Mesh(bottom_panel_geom, dark_metal_mat);
  bottom_panel.name = "bottom_panel";
  bottom_panel.position.set(0, 0.075, body_z);
  cabinet.add(bottom_panel);

  const upper_front_panel_geom = new THREE.BoxGeometry(1.18, 0.22, 0.055);
  const upper_front_panel = new THREE.Mesh(upper_front_panel_geom, brushed_metal_mat);
  upper_front_panel.name = "upper_front_panel";
  upper_front_panel.position.set(0, 0.91, 0.445);
  cabinet.add(upper_front_panel);

  const front_post_geom = new THREE.BoxGeometry(0.075, 0.91, 0.085);

  const left_front_post = new THREE.Mesh(front_post_geom, light_metal_mat);
  left_front_post.name = "left_front_post";
  left_front_post.position.set(-0.605, 0.505, 0.445);
  cabinet.add(left_front_post);

  const right_front_post = new THREE.Mesh(front_post_geom, light_metal_mat);
  right_front_post.name = "right_front_post";
  right_front_post.position.set(0.605, 0.505, 0.445);
  cabinet.add(right_front_post);

  const opening_top_trim_geom = new THREE.BoxGeometry(1.08, 0.035, 0.065);
  const opening_top_trim = new THREE.Mesh(opening_top_trim_geom, light_metal_mat);
  opening_top_trim.name = "opening_top_trim";
  opening_top_trim.position.set(0, 0.795, 0.455);
  cabinet.add(opening_top_trim);

  const opening_shadow_gap_geom = new THREE.BoxGeometry(1.08, 0.012, 0.018);
  const opening_shadow_gap = new THREE.Mesh(opening_shadow_gap_geom, black_mat);
  opening_shadow_gap.name = "opening_shadow_gap";
  opening_shadow_gap.position.set(0, 0.775, 0.486);
  cabinet.add(opening_shadow_gap);

  const front_lower_lip_geom = new THREE.BoxGeometry(1.08, 0.065, 0.075);
  const front_lower_lip = new THREE.Mesh(front_lower_lip_geom, brushed_metal_mat);
  front_lower_lip.name = "front_lower_lip";
  front_lower_lip.position.set(0, 0.105, 0.445);
  cabinet.add(front_lower_lip);

  const interior_back_panel_geom = new THREE.BoxGeometry(1.02, 0.61, 0.025);
  const interior_back_panel = new THREE.Mesh(interior_back_panel_geom, brushed_metal_mat);
  interior_back_panel.name = "interior_back_panel";
  interior_back_panel.position.set(0, 0.455, -0.43);
  interior.add(interior_back_panel);

  const interior_floor_geom = new THREE.BoxGeometry(1.02, 0.025, 0.82);
  const interior_floor = new THREE.Mesh(interior_floor_geom, light_metal_mat);
  interior_floor.name = "interior_floor";
  interior_floor.position.set(0, 0.16, 0.0);
  interior.add(interior_floor);

  const interior_ceiling_geom = new THREE.BoxGeometry(1.02, 0.025, 0.82);
  const interior_ceiling = new THREE.Mesh(interior_ceiling_geom, dark_metal_mat);
  interior_ceiling.name = "interior_ceiling";
  interior_ceiling.position.set(0, 0.75, 0.0);
  interior.add(interior_ceiling);

  const interior_wall_geom = new THREE.BoxGeometry(0.025, 0.57, 0.82);

  const interior_left_wall = new THREE.Mesh(interior_wall_geom, brushed_metal_mat);
  interior_left_wall.name = "interior_left_wall";
  interior_left_wall.position.set(-0.51, 0.455, 0.0);
  interior.add(interior_left_wall);

  const interior_right_wall = new THREE.Mesh(interior_wall_geom, brushed_metal_mat);
  interior_right_wall.name = "interior_right_wall";
  interior_right_wall.position.set(0.51, 0.455, 0.0);
  interior.add(interior_right_wall);

  const back_vertical_seam_geom = new THREE.BoxGeometry(0.012, 0.56, 0.008);
  const back_vertical_seam = new THREE.Mesh(back_vertical_seam_geom, dark_metal_mat);
  back_vertical_seam.name = "back_vertical_seam";
  back_vertical_seam.position.set(-0.34, 0.455, -0.414);
  interior.add(back_vertical_seam);

  const drain_grate_frame_geom = new THREE.BoxGeometry(0.28, 0.012, 0.15);
  const drain_grate_frame = new THREE.Mesh(drain_grate_frame_geom, dark_metal_mat);
  drain_grate_frame.name = "drain_grate_frame";
  drain_grate_frame.position.set(0.16, 0.178, 0.27);
  interior.add(drain_grate_frame);

  const drain_grate_insert_geom = new THREE.BoxGeometry(0.245, 0.008, 0.118);
  const drain_grate_insert = new THREE.Mesh(drain_grate_insert_geom, black_mat);
  drain_grate_insert.name = "drain_grate_insert";
  drain_grate_insert.position.set(0.16, 0.187, 0.27);
  interior.add(drain_grate_insert);

  const drain_bar_geom = new THREE.BoxGeometry(0.012, 0.006, 0.1);
  const drain_bars = new THREE.InstancedMesh(drain_bar_geom, dark_metal_mat, 7);
  drain_bars.name = "drain_bars";
  const drain_dummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    drain_dummy.position.set(0.075 + i * 0.029, 0.194, 0.27);
    drain_dummy.updateMatrix();
    drain_bars.setMatrixAt(i, drain_dummy.matrix);
  }
  drain_bars.instanceMatrix.needsUpdate = true;
  interior.add(drain_bars);

  const top_panel_shape = new THREE.Shape();
  top_panel_shape.moveTo(-0.72, -0.52);
  top_panel_shape.lineTo(0.72, -0.52);
  top_panel_shape.lineTo(0.72, 0.52);
  top_panel_shape.lineTo(-0.72, 0.52);
  top_panel_shape.lineTo(-0.72, -0.52);

  const top_opening_path = new THREE.Path();
  top_opening_path.moveTo(-0.46, -0.31);
  top_opening_path.quadraticCurveTo(-0.53, -0.31, -0.53, -0.24);
  top_opening_path.lineTo(-0.53, 0.24);
  top_opening_path.quadraticCurveTo(-0.53, 0.31, -0.46, 0.31);
  top_opening_path.lineTo(0.46, 0.31);
  top_opening_path.quadraticCurveTo(0.53, 0.31, 0.53, 0.24);
  top_opening_path.lineTo(0.53, -0.24);
  top_opening_path.quadraticCurveTo(0.53, -0.31, 0.46, -0.31);
  top_opening_path.lineTo(-0.46, -0.31);
  top_panel_shape.holes.push(top_opening_path);

  const top_panel_geom = new THREE.ExtrudeGeometry(top_panel_shape, {
    depth: 0.055,
    steps: 1,
    curveSegments: 12
  });
  const top_panel = new THREE.Mesh(top_panel_geom, brushed_metal_mat);
  top_panel.name = "top_panel";
  top_panel.rotation.x = Math.PI / 2;
  top_panel.position.set(0, 1.08, 0);
  top_assembly.add(top_panel);

  const top_front_fascia_geom = new THREE.BoxGeometry(1.48, 0.075, 0.075);
  const top_front_fascia = new THREE.Mesh(top_front_fascia_geom, light_metal_mat);
  top_front_fascia.name = "top_front_fascia";
  top_front_fascia.position.set(0, 1.035, 0.525);
  top_assembly.add(top_front_fascia);

  const top_rear_edge_geom = new THREE.BoxGeometry(1.42, 0.045, 0.045);
  const top_rear_edge = new THREE.Mesh(top_rear_edge_geom, brushed_metal_mat);
  top_rear_edge.name = "top_rear_edge";
  top_rear_edge.position.set(0, 1.045, -0.515);
  top_assembly.add(top_rear_edge);

  const top_side_edge_geom = new THREE.BoxGeometry(0.045, 0.045, 1.0);

  const top_left_edge = new THREE.Mesh(top_side_edge_geom, brushed_metal_mat);
  top_left_edge.name = "top_left_edge";
  top_left_edge.position.set(-0.705, 1.045, 0);
  top_assembly.add(top_left_edge);

  const top_right_edge = new THREE.Mesh(top_side_edge_geom, brushed_metal_mat);
  top_right_edge.name = "top_right_edge";
  top_right_edge.position.set(0.705, 1.045, 0);
  top_assembly.add(top_right_edge);

  const recess_floor_geom = new THREE.PlaneGeometry(1.0, 0.58);
  const recess_floor = new THREE.Mesh(recess_floor_geom, dark_metal_mat);
  recess_floor.name = "recess_floor";
  recess_floor.rotation.x = -Math.PI / 2;
  recess_floor.position.set(0, 1.022, 0);
  top_assembly.add(recess_floor);

  const recess_long_rim_geom = new THREE.BoxGeometry(1.06, 0.025, 0.035);

  const recess_front_rim = new THREE.Mesh(recess_long_rim_geom, light_metal_mat);
  recess_front_rim.name = "recess_front_rim";
  recess_front_rim.position.set(0, 1.067, 0.31);
  top_assembly.add(recess_front_rim);

  const recess_rear_rim = new THREE.Mesh(recess_long_rim_geom, light_metal_mat);
  recess_rear_rim.name = "recess_rear_rim";
  recess_rear_rim.position.set(0, 1.067, -0.31);
  top_assembly.add(recess_rear_rim);

  const recess_short_rim_geom = new THREE.BoxGeometry(0.035, 0.025, 0.58);

  const recess_left_rim = new THREE.Mesh(recess_short_rim_geom, light_metal_mat);
  recess_left_rim.name = "recess_left_rim";
  recess_left_rim.position.set(-0.53, 1.067, 0);
  top_assembly.add(recess_left_rim);

  const recess_right_rim = new THREE.Mesh(recess_short_rim_geom, light_metal_mat);
  recess_right_rim.name = "recess_right_rim";
  recess_right_rim.position.set(0.53, 1.067, 0);
  top_assembly.add(recess_right_rim);

  const control_label_border_geom = new THREE.BoxGeometry(0.18, 0.065, 0.012);
  const control_label_border = new THREE.Mesh(control_label_border_geom, screw_mat);
  control_label_border.name = "control_label_border";
  control_label_border.position.set(-0.36, 0.825, 0.493);
  front_details.add(control_label_border);

  const control_label_geom = new THREE.BoxGeometry(0.145, 0.038, 0.008);
  const control_label = new THREE.Mesh(control_label_geom, label_mat);
  control_label.name = "control_label";
  control_label.position.set(-0.36, 0.825, 0.502);
  front_details.add(control_label);

  const control_label_text_geom = new THREE.BoxGeometry(0.075, 0.004, 0.004);
  const control_label_text = new THREE.Mesh(control_label_text_geom, label_text_mat);
  control_label_text.name = "control_label_text";
  control_label_text.position.set(-0.36, 0.827, 0.508);
  front_details.add(control_label_text);

  const hanging_filter_geom = new THREE.CylinderGeometry(0.075, 0.075, 0.018, 24);
  const hanging_filter = new THREE.Mesh(hanging_filter_geom, dark_metal_mat);
  hanging_filter.name = "hanging_filter";
  hanging_filter.position.set(0.02, 0.755, 0.29);
  front_details.add(hanging_filter);

  const filter_fin_geom = new THREE.BoxGeometry(0.008, 0.018, 0.055);
  const filter_fins = new THREE.InstancedMesh(filter_fin_geom, black_mat, 12);
  filter_fins.name = "filter_fins";
  const filter_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    filter_dummy.position.set(
      0.02 + Math.cos(angle) * 0.052,
      0.744,
      0.29 + Math.sin(angle) * 0.052
    );
    filter_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    filter_dummy.updateMatrix();
    filter_fins.setMatrixAt(i, filter_dummy.matrix);
  }
  filter_fins.instanceMatrix.needsUpdate = true;
  front_details.add(filter_fins);

  const foot_geom = new THREE.BoxGeometry(0.11, 0.055, 0.12);
  const feet = new THREE.InstancedMesh(foot_geom, black_mat, 4);
  feet.name = "feet";
  const foot_positions = [
    [-0.54, 0.025, 0.37],
    [0.54, 0.025, 0.37],
    [-0.54, 0.025, -0.39],
    [0.54, 0.025, -0.39]
  ];
  const foot_dummy = new THREE.Object3D();
  for (let i = 0; i < foot_positions.length; i++) {
    foot_dummy.position.set(
      foot_positions[i][0],
      foot_positions[i][1],
      foot_positions[i][2]
    );
    foot_dummy.updateMatrix();
    feet.setMatrixAt(i, foot_dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  hardware.add(feet);

  const screw_geom = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 16);
  const screw_data = [
    [-0.565, 0.91, 0.486, -Math.PI / 2, 0, 0],
    [0.565, 0.91, 0.486, -Math.PI / 2, 0, 0],
    [-0.565, 0.25, 0.49, -Math.PI / 2, 0, 0],
    [0.565, 0.25, 0.49, -Math.PI / 2, 0, 0],
    [0.652, 0.91, 0.28, 0, 0, -Math.PI / 2],
    [0.652, 0.91, -0.28, 0, 0, -Math.PI / 2],
    [0.652, 0.25, 0.28, 0, 0, -Math.PI / 2],
    [0.652, 0.25, -0.28, 0, 0, -Math.PI / 2],
    [-0.652, 0.91, 0.28, 0, 0, Math.PI / 2],
    [-0.652, 0.25, -0.28, 0, 0, Math.PI / 2],
    [-0.58, 1.087, 0.42, -Math.PI / 2, 0, 0],
    [0.58, 1.087, 0.42, -Math.PI / 2, 0, 0],
    [-0.58, 1.087, -0.42, -Math.PI / 2, 0, 0],
    [0.58, 1.087, -0.42, -Math.PI / 2, 0, 0]
  ];
  const screws = new THREE.InstancedMesh(screw_geom, screw_mat, screw_data.length);
  screws.name = "screws";
  const screw_dummy = new THREE.Object3D();
  for (let i = 0; i < screw_data.length; i++) {
    const s = screw_data[i];
    screw_dummy.position.set(s[0], s[1], s[2]);
    screw_dummy.rotation.set(s[3], s[4], s[5]);
    screw_dummy.updateMatrix();
    screws.setMatrixAt(i, screw_dummy.matrix);
  }
  screws.instanceMatrix.needsUpdate = true;
  hardware.add(screws);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
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
