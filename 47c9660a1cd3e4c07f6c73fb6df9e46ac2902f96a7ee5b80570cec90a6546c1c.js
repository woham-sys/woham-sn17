function __sn17_user(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x17181a, roughness: 0.7 });
  const rubberMat = new THREE.MeshStandardMaterial({ color: 0x0d0e0f, roughness: 0.85 });
  const blackPlasticMat = new THREE.MeshStandardMaterial({ color: 0x050506, roughness: 0.55 });
  const screenBlueMat = new THREE.MeshStandardMaterial({ color: 0x4c6f9f, roughness: 0.25 });
  const screenHighlightMat = new THREE.MeshStandardMaterial({ color: 0xaab7d8, transparent: true, opacity: 0.22 });
  const lensGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x6f9f8f,
    transparent: true,
    opacity: 0.55,
    metalness: 0.0,
    roughness: 0.15
  });
  const darkLensMat = new THREE.MeshStandardMaterial({ color: 0x101416, roughness: 0.35 });
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xc8c8c8, metalness: 0.35, roughness: 0.25 });
  const whiteMarkMat = new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: 0.45 });
  const viewfinderGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde8e2,
    transparent: true,
    opacity: 0.45,
    metalness: 0.0,
    roughness: 0.18
  });

  const bodyW = 1.25;
  const bodyH = 0.82;
  const bodyD = 0.42;
  const frontZ = bodyD / 2;

  const main_body_geom = new THREE.BoxGeometry(bodyW, bodyH, bodyD);
  const main_body = new THREE.Mesh(main_body_geom, bodyMat);
  main_body.position.set(0, 0, 0);
  root.add(main_body);

  const front_face_panel_geom = new THREE.BoxGeometry(0.98, 0.72, 0.035);
  const front_face_panel = new THREE.Mesh(front_face_panel_geom, bodyMat);
  front_face_panel.position.set(0.08, -0.02, frontZ + 0.018);
  root.add(front_face_panel);

  const top_hump_geom = new THREE.SphereGeometry(1, 48, 24);
  const top_hump = new THREE.Mesh(top_hump_geom, bodyMat);
  top_hump.scale.set(0.58, 0.16, 0.24);
  top_hump.position.set(-0.02, 0.45, -0.015);
  root.add(top_hump);

  const top_flat_panel_geom = new THREE.BoxGeometry(0.72, 0.035, 0.32);
  const top_flat_panel = new THREE.Mesh(top_flat_panel_geom, bodyMat);
  top_flat_panel.position.set(-0.02, 0.585, -0.01);
  root.add(top_flat_panel);

  const left_grip_geom = new THREE.CapsuleGeometry(0.13, 0.55, 8, 24);
  const left_grip = new THREE.Mesh(left_grip_geom, rubberMat);
  left_grip.scale.set(0.82, 1.0, 1.25);
  left_grip.position.set(-0.66, -0.08, 0.015);
  root.add(left_grip);

  const grip_texture_geom = new THREE.BoxGeometry(0.012, 0.012, 0.018);
  const grip_texture = new THREE.InstancedMesh(grip_texture_geom, blackPlasticMat, 72);
  const grip_dummy = new THREE.Object3D();
  let grip_index = 0;
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 6; col++) {
      const y = -0.34 + row * 0.052;
      const x = -0.735 + col * 0.032 + (row % 2) * 0.008;
      grip_dummy.position.set(x, y, 0.185);
      grip_dummy.rotation.set(0, 0, (row + col) % 2 === 0 ? 0.25 : -0.25);
      grip_dummy.updateMatrix();
      grip_texture.setMatrixAt(grip_index++, grip_dummy.matrix);
    }
  }
  root.add(grip_texture);

  const upper_display_frame_geom = new THREE.BoxGeometry(0.78, 0.34, 0.045);
  const upper_display_frame = new THREE.Mesh(upper_display_frame_geom, blackPlasticMat);
  upper_display_frame.position.set(-0.08, 0.25, frontZ + 0.045);
  root.add(upper_display_frame);

  const upper_display_screen_geom = new THREE.BoxGeometry(0.62, 0.235, 0.012);
  const upper_display_screen = new THREE.Mesh(upper_display_screen_geom, screenBlueMat);
  upper_display_screen.position.set(-0.08, 0.25, frontZ + 0.073);
  root.add(upper_display_screen);

  const upper_display_highlight_geom = new THREE.BoxGeometry(0.18, 0.205, 0.004);
  const upper_display_highlight = new THREE.Mesh(upper_display_highlight_geom, screenHighlightMat);
  upper_display_highlight.position.set(-0.25, 0.25, frontZ + 0.081);
  root.add(upper_display_highlight);

  const lower_display_frame_geom = new THREE.BoxGeometry(0.82, 0.48, 0.045);
  const lower_display_frame = new THREE.Mesh(lower_display_frame_geom, blackPlasticMat);
  lower_display_frame.position.set(-0.08, -0.16, frontZ + 0.045);
  root.add(lower_display_frame);

  const lower_display_screen_geom = new THREE.BoxGeometry(0.68, 0.35, 0.012);
  const lower_display_screen = new THREE.Mesh(lower_display_screen_geom, screenBlueMat);
  lower_display_screen.position.set(-0.08, -0.14, frontZ + 0.073);
  root.add(lower_display_screen);

  const lower_display_highlight_geom = new THREE.BoxGeometry(0.22, 0.315, 0.004);
  const lower_display_highlight = new THREE.Mesh(lower_display_highlight_geom, screenHighlightMat);
  lower_display_highlight.position.set(-0.27, -0.14, frontZ + 0.081);
  root.add(lower_display_highlight);

  const brand_badge_geom = new THREE.BoxGeometry(0.22, 0.035, 0.008);
  const brand_badge = new THREE.Mesh(brand_badge_geom, blackPlasticMat);
  brand_badge.position.set(-0.08, -0.435, frontZ + 0.078);
  root.add(brand_badge);

  const brand_marks_geom = new THREE.BoxGeometry(0.018, 0.006, 0.004);
  const brand_marks = new THREE.InstancedMesh(brand_marks_geom, whiteMarkMat, 7);
  const brand_dummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    brand_dummy.position.set(-0.145 + i * 0.022, -0.435, frontZ + 0.084);
    brand_dummy.rotation.set(0, 0, i % 3 === 0 ? Math.PI / 2 : 0);
    brand_dummy.updateMatrix();
    brand_marks.setMatrixAt(i, brand_dummy.matrix);
  }
  root.add(brand_marks);

  const control_button_left_geom = new THREE.CylinderGeometry(0.055, 0.055, 0.018, 32);
  const control_button_left = new THREE.Mesh(control_button_left_geom, blackPlasticMat);
  control_button_left.rotation.x = Math.PI / 2;
  control_button_left.position.set(-0.18, -0.505, frontZ + 0.082);
  root.add(control_button_left);

  const control_button_center_geom = new THREE.CylinderGeometry(0.045, 0.045, 0.018, 32);
  const control_button_center = new THREE.Mesh(control_button_center_geom, blackPlasticMat);
  control_button_center.rotation.x = Math.PI / 2;
  control_button_center.position.set(-0.04, -0.505, frontZ + 0.082);
  root.add(control_button_center);

  const control_button_right_geom = new THREE.CylinderGeometry(0.052, 0.052, 0.018, 32);
  const control_button_right = new THREE.Mesh(control_button_right_geom, blackPlasticMat);
  control_button_right.rotation.x = Math.PI / 2;
  control_button_right.position.set(0.23, -0.505, frontZ + 0.082);
  root.add(control_button_right);

  const button_icon_vertical_geom = new THREE.BoxGeometry(0.006, 0.038, 0.004);
  const button_icon_vertical = new THREE.Mesh(button_icon_vertical_geom, whiteMarkMat);
  button_icon_vertical.position.set(-0.18, -0.505, frontZ + 0.093);
  root.add(button_icon_vertical);

  const button_icon_ring_geom = new THREE.TorusGeometry(0.022, 0.003, 8, 24);
  const button_icon_ring = new THREE.Mesh(button_icon_ring_geom, whiteMarkMat);
  button_icon_ring.position.set(-0.04, -0.505, frontZ + 0.093);
  root.add(button_icon_ring);

  const button_icon_triangle_geom = new THREE.CircleGeometry(0.022, 3);
  const button_icon_triangle = new THREE.Mesh(button_icon_triangle_geom, whiteMarkMat);
  button_icon_triangle.position.set(0.23, -0.505, frontZ + 0.093);
  button_icon_triangle.rotation.z = -Math.PI / 2;
  root.add(button_icon_triangle);

  const side_vent_slots_geom = new THREE.BoxGeometry(0.018, 0.055, 0.012);
  const side_vent_slots = new THREE.InstancedMesh(side_vent_slots_geom, blackPlasticMat, 8);
  const vent_dummy = new THREE.Object3D();
  let vent_index = 0;
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      vent_dummy.position.set(0.49 + col * 0.035, 0.25 - row * 0.09, frontZ + 0.083);
      vent_dummy.rotation.set(0, 0, 0);
      vent_dummy.updateMatrix();
      side_vent_slots.setMatrixAt(vent_index++, vent_dummy.matrix);
    }
  }
  root.add(side_vent_slots);

  const viewfinder_window_frame_geom = new THREE.BoxGeometry(0.24, 0.28, 0.04);
  const viewfinder_window_frame = new THREE.Mesh(viewfinder_window_frame_geom, blackPlasticMat);
  viewfinder_window_frame.position.set(0.55, 0.23, frontZ + 0.045);
  root.add(viewfinder_window_frame);

  const viewfinder_window_glass_geom = new THREE.BoxGeometry(0.18, 0.21, 0.012);
  const viewfinder_window_glass = new THREE.Mesh(viewfinder_window_glass_geom, viewfinderGlassMat);
  viewfinder_window_glass.position.set(0.55, 0.23, frontZ + 0.073);
  root.add(viewfinder_window_glass);

  const viewfinder_reflection_geom = new THREE.BoxGeometry(0.055, 0.18, 0.004);
  const viewfinder_reflection = new THREE.Mesh(viewfinder_reflection_geom, screenHighlightMat);
  viewfinder_reflection.position.set(0.515, 0.23, frontZ + 0.081);
  root.add(viewfinder_reflection);

  const lensX = 0.55;
  const lensY = -0.12;

  const lens_mount_geom = new THREE.CylinderGeometry(0.31, 0.31, 0.075, 64);
  const lens_mount = new THREE.Mesh(lens_mount_geom, blackPlasticMat);
  lens_mount.rotation.x = Math.PI / 2;
  lens_mount.position.set(lensX, lensY, frontZ + 0.065);
  root.add(lens_mount);

  const lens_outer_barrel_geom = new THREE.CylinderGeometry(0.285, 0.285, 0.15, 64);
  const lens_outer_barrel = new THREE.Mesh(lens_outer_barrel_geom, rubberMat);
  lens_outer_barrel.rotation.x = Math.PI / 2;
  lens_outer_barrel.position.set(lensX, lensY, frontZ + 0.145);
  root.add(lens_outer_barrel);

  const lens_ridge_geom = new THREE.BoxGeometry(0.014, 0.055, 0.012);
  const lens_ridges = new THREE.InstancedMesh(lens_ridge_geom, blackPlasticMat, 64);
  const ridge_dummy = new THREE.Object3D();
  for (let i = 0; i < 64; i++) {
    const a = i / 64 * Math.PI * 2;
    ridge_dummy.position.set(lensX + Math.cos(a) * 0.285, lensY + Math.sin(a) * 0.285, frontZ + 0.224);
    ridge_dummy.rotation.set(0, 0, a - Math.PI / 2);
    ridge_dummy.updateMatrix();
    lens_ridges.setMatrixAt(i, ridge_dummy.matrix);
  }
  root.add(lens_ridges);

  const lens_front_ring_geom = new THREE.CylinderGeometry(0.255, 0.255, 0.055, 64);
  const lens_front_ring = new THREE.Mesh(lens_front_ring_geom, rubberMat);
  lens_front_ring.rotation.x = Math.PI / 2;
  lens_front_ring.position.set(lensX, lensY, frontZ + 0.245);
  root.add(lens_front_ring);

  const lens_silver_trim_geom = new THREE.TorusGeometry(0.265, 0.008, 10, 64);
  const lens_silver_trim = new THREE.Mesh(lens_silver_trim_geom, silverMat);
  lens_silver_trim.position.set(lensX, lensY, frontZ + 0.276);
  root.add(lens_silver_trim);

  const lens_inner_concentric_geom = new THREE.TorusGeometry(0.185, 0.006, 8, 48);
  const lens_inner_concentric = new THREE.Mesh(lens_inner_concentric_geom, darkLensMat);
  lens_inner_concentric.position.set(lensX, lensY, frontZ + 0.279);
  root.add(lens_inner_concentric);

  const lens_inner_concentric_2_geom = new THREE.TorusGeometry(0.145, 0.005, 8, 48);
  const lens_inner_concentric_2 = new THREE.Mesh(lens_inner_concentric_2_geom, darkLensMat);
  lens_inner_concentric_2.position.set(lensX, lensY, frontZ + 0.281);
  root.add(lens_inner_concentric_2);

  const lens_inner_concentric_3_geom = new THREE.TorusGeometry(0.105, 0.004, 8, 40);
  const lens_inner_concentric_3 = new THREE.Mesh(lens_inner_concentric_3_geom, darkLensMat);
  lens_inner_concentric_3.position.set(lensX, lensY, frontZ + 0.283);
  root.add(lens_inner_concentric_3);

  const lens_glass_disc_geom = new THREE.CylinderGeometry(0.125, 0.125, 0.018, 64);
  const lens_glass_disc = new THREE.Mesh(lens_glass_disc_geom, lensGlassMat);
  lens_glass_disc.rotation.x = Math.PI / 2;
  lens_glass_disc.position.set(lensX, lensY, frontZ + 0.286);
  root.add(lens_glass_disc);

  const lens_pupil_geom = new THREE.CylinderGeometry(0.055, 0.055, 0.02, 48);
  const lens_pupil = new THREE.Mesh(lens_pupil_geom, darkLensMat);
  lens_pupil.rotation.x = Math.PI / 2;
  lens_pupil.position.set(lensX, lensY, frontZ + 0.298);
  root.add(lens_pupil);

  const lens_green_reflection_geom = new THREE.CircleGeometry(0.035, 32);
  const lens_green_reflection = new THREE.Mesh(lens_green_reflection_geom, screenHighlightMat);
  lens_green_reflection.position.set(lensX - 0.025, lensY + 0.025, frontZ + 0.31);
  root.add(lens_green_reflection);

  const lens_markings_geom = new THREE.BoxGeometry(0.012, 0.004, 0.004);
  const lens_markings = new THREE.InstancedMesh(lens_markings_geom, whiteMarkMat, 18);
  const marking_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const a = -2.45 + i * 0.29;
    marking_dummy.position.set(lensX + Math.cos(a) * 0.225, lensY + Math.sin(a) * 0.225, frontZ + 0.286);
    marking_dummy.rotation.set(0, 0, a + Math.PI / 2);
    marking_dummy.updateMatrix();
    lens_markings.setMatrixAt(i, marking_dummy.matrix);
  }
  root.add(lens_markings);

  const focus_switch_geom = new THREE.CylinderGeometry(0.035, 0.035, 0.018, 24);
  const focus_switch = new THREE.Mesh(focus_switch_geom, blackPlasticMat);
  focus_switch.rotation.x = Math.PI / 2;
  focus_switch.position.set(0.43, 0.035, frontZ + 0.083);
  root.add(focus_switch);

  const focus_switch_dot_geom = new THREE.CylinderGeometry(0.018, 0.018, 0.02, 20);
  const focus_switch_dot = new THREE.Mesh(focus_switch_dot_geom, bodyMat);
  focus_switch_dot.rotation.x = Math.PI / 2;
  focus_switch_dot.position.set(0.43, 0.035, frontZ + 0.095);
  root.add(focus_switch_dot);

  const mode_dial_geom = new THREE.CylinderGeometry(0.095, 0.095, 0.055, 40);
  const mode_dial = new THREE.Mesh(mode_dial_geom, rubberMat);
  mode_dial.position.set(-0.42, 0.485, -0.02);
  root.add(mode_dial);

  const mode_dial_top_geom = new THREE.CylinderGeometry(0.075, 0.075, 0.012, 40);
  const mode_dial_top = new THREE.Mesh(mode_dial_top_geom, blackPlasticMat);
  mode_dial_top.position.set(-0.42, 0.518, -0.02);
  root.add(mode_dial_top);

  const shutter_button_geom = new THREE.CylinderGeometry(0.045, 0.045, 0.025, 32);
  const shutter_button = new THREE.Mesh(shutter_button_geom, silverMat);
  shutter_button.position.set(-0.57, 0.47, 0.03);
  root.add(shutter_button);

  const small_top_button_geom = new THREE.BoxGeometry(0.12, 0.025, 0.055);
  const small_top_button = new THREE.Mesh(small_top_button_geom, blackPlasticMat);
  small_top_button.position.set(0.0, 0.615, -0.02);
  root.add(small_top_button);

  const bottom_seam_geom = new THREE.BoxGeometry(0.92, 0.008, 0.01);
  const bottom_seam = new THREE.Mesh(bottom_seam_geom, blackPlasticMat);
  bottom_seam.position.set(0.06, -0.385, frontZ + 0.082);
  root.add(bottom_seam);

  const right_side_panel_geom = new THREE.BoxGeometry(0.035, 0.62, 0.32);
  const right_side_panel = new THREE.Mesh(right_side_panel_geom, bodyMat);
  right_side_panel.position.set(0.64, -0.05, -0.01);
  root.add(right_side_panel);

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
