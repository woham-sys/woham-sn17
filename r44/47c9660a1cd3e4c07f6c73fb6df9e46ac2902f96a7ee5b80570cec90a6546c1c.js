// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x24272b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x17191d,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x111214,
    metalness: 0.0,
    roughness: 0.8,
  });
  const glossyBlackMat = new THREE.MeshStandardMaterial({
    color: 0x08090b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const lensBarrelMat = new THREE.MeshStandardMaterial({
    color: 0x303238,
    metalness: 0.6,
    roughness: 0.5,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const lcdMat = new THREE.MeshStandardMaterial({
    color: 0x52658f,
    metalness: 0.0,
    roughness: 0.2,
    emissive: 0x243352,
    emissiveIntensity: 0.65,
  });
  const lcdHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xaab8d8,
    metalness: 0.0,
    roughness: 0.2,
    emissive: 0x66789d,
    emissiveIntensity: 0.35,
    transparent: true,
    opacity: 0.28,
  });
  const viewfinderGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x9fb3b2,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });
  const lensGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x6f9f86,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });
  const lensReflectionMat = new THREE.MeshStandardMaterial({
    color: 0x8d668f,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x4b244d,
    emissiveIntensity: 0.35,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e3,
    metalness: 0.0,
    roughness: 0.7,
  });

  function roundedRectGeometry(width, height, depth, radius, bevel) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const r = Math.min(radius, width / 2, height / 2);
    const shape = new THREE.Shape();
    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const main_bodyGeom = roundedRectGeometry(1.42, 1.22, 0.46, 0.13, 0.025);
  const main_body = new THREE.Mesh(main_bodyGeom, bodyMat);
  main_body.position.set(0, 0.62, 0);
  root.add(main_body);

  const upper_housingGeom = roundedRectGeometry(1.34, 0.58, 0.48, 0.11, 0.022);
  const upper_housing = new THREE.Mesh(upper_housingGeom, bodyMat);
  upper_housing.position.set(0, 1.18, 0.005);
  root.add(upper_housing);

  const handgripShape = new THREE.Shape();
  handgripShape.moveTo(-0.70, 0.08);
  handgripShape.lineTo(-0.88, 0.12);
  handgripShape.bezierCurveTo(-1.00, 0.16, -1.04, 0.30, -1.04, 0.48);
  handgripShape.lineTo(-1.04, 1.00);
  handgripShape.bezierCurveTo(-1.04, 1.15, -0.96, 1.24, -0.84, 1.27);
  handgripShape.lineTo(-0.68, 1.22);
  handgripShape.lineTo(-0.68, 0.18);
  handgripShape.quadraticCurveTo(-0.68, 0.10, -0.70, 0.08);
  const handgripGeom = new THREE.ExtrudeGeometry(handgripShape, {
    depth: 0.48,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  handgripGeom.translate(0, 0, -0.24);
  const handgrip = new THREE.Mesh(handgripGeom, rubberMat);
  root.add(handgrip);

  const grip_panelGeom = roundedRectGeometry(0.25, 0.82, 0.018, 0.055, 0.004);
  const grip_panel = new THREE.Mesh(grip_panelGeom, panelMat);
  grip_panel.position.set(-0.90, 0.58, 0.275);
  root.add(grip_panel);

  const grip_textureGeom = new THREE.SphereGeometry(0.014, 6, 4);
  const grip_texture = new THREE.InstancedMesh(grip_textureGeom, rubberMat, 42);
  const gripDummy = new THREE.Object3D();
  let gripIndex = 0;
  for (let row = 0; row < 14; row++) {
    for (let column = 0; column < 3; column++) {
      const offset = row % 2 === 0 ? 0 : 0.012;
      gripDummy.position.set(
        -0.985 + column * 0.075 + offset,
        0.25 + row * 0.052,
        0.292
      );
      gripDummy.scale.set(1.0, 0.72, 0.38);
      gripDummy.rotation.set(0, 0, (row + column) % 2 === 0 ? 0.25 : -0.25);
      gripDummy.updateMatrix();
      grip_texture.setMatrixAt(gripIndex++, gripDummy.matrix);
    }
  }
  grip_texture.instanceMatrix.needsUpdate = true;
  root.add(grip_texture);

  const front_lower_panelGeom = roundedRectGeometry(1.12, 0.34, 0.025, 0.07, 0.006);
  const front_lower_panel = new THREE.Mesh(front_lower_panelGeom, panelMat);
  front_lower_panel.position.set(0.03, 0.23, 0.267);
  root.add(front_lower_panel);

  const lower_panel_seamGeom = new THREE.BoxGeometry(1.10, 0.012, 0.012);
  const lower_panel_seam = new THREE.Mesh(lower_panel_seamGeom, glossyBlackMat);
  lower_panel_seam.position.set(0.03, 0.405, 0.287);
  root.add(lower_panel_seam);

  const upper_screen_bezelGeom = roundedRectGeometry(1.12, 0.48, 0.045, 0.075, 0.008);
  const upper_screen_bezel = new THREE.Mesh(upper_screen_bezelGeom, glossyBlackMat);
  upper_screen_bezel.position.set(-0.08, 1.19, 0.282);
  root.add(upper_screen_bezel);

  const upper_screenGeom = roundedRectGeometry(0.94, 0.34, 0.012, 0.025, 0.002);
  const upper_screen = new THREE.Mesh(upper_screenGeom, lcdMat);
  upper_screen.position.set(-0.08, 1.19, 0.316);
  root.add(upper_screen);

  const upper_screen_highlightGeom = new THREE.BoxGeometry(0.18, 0.30, 0.004);
  const upper_screen_highlight = new THREE.Mesh(upper_screen_highlightGeom, lcdHighlightMat);
  upper_screen_highlight.position.set(-0.36, 1.19, 0.325);
  upper_screen_highlight.rotation.z = -0.08;
  root.add(upper_screen_highlight);

  const lower_screen_bezelGeom = roundedRectGeometry(1.04, 0.68, 0.045, 0.065, 0.008);
  const lower_screen_bezel = new THREE.Mesh(lower_screen_bezelGeom, glossyBlackMat);
  lower_screen_bezel.position.set(-0.08, 0.70, 0.282);
  root.add(lower_screen_bezel);

  const lower_screenGeom = roundedRectGeometry(0.88, 0.54, 0.012, 0.022, 0.002);
  const lower_screen = new THREE.Mesh(lower_screenGeom, lcdMat);
  lower_screen.position.set(-0.08, 0.70, 0.316);
  root.add(lower_screen);

  const lower_screen_highlightGeom = new THREE.BoxGeometry(0.20, 0.49, 0.004);
  const lower_screen_highlight = new THREE.Mesh(lower_screen_highlightGeom, lcdHighlightMat);
  lower_screen_highlight.position.set(-0.36, 0.70, 0.325);
  lower_screen_highlight.rotation.z = -0.05;
  root.add(lower_screen_highlight);

  const viewfinder_recessGeom = roundedRectGeometry(0.34, 0.34, 0.035, 0.045, 0.006);
  const viewfinder_recess = new THREE.Mesh(viewfinder_recessGeom, glossyBlackMat);
  viewfinder_recess.position.set(0.53, 1.18, 0.282);
  root.add(viewfinder_recess);

  const viewfinder_glassGeom = roundedRectGeometry(0.25, 0.25, 0.012, 0.025, 0.002);
  const viewfinder_glass = new THREE.Mesh(viewfinder_glassGeom, viewfinderGlassMat);
  viewfinder_glass.position.set(0.53, 1.18, 0.310);
  root.add(viewfinder_glass);

  const viewfinder_reflectionGeom = new THREE.BoxGeometry(0.055, 0.22, 0.004);
  const viewfinder_reflection = new THREE.Mesh(viewfinder_reflectionGeom, lcdHighlightMat);
  viewfinder_reflection.position.set(0.47, 1.18, 0.319);
  viewfinder_reflection.rotation.z = -0.12;
  root.add(viewfinder_reflection);

  const vent_slotsGeom = new THREE.CapsuleGeometry(0.012, 0.055, 4, 8);
  const vent_slots = new THREE.InstancedMesh(vent_slotsGeom, glossyBlackMat, 8);
  const ventDummy = new THREE.Object3D();
  const ventPositions = [
    [0.39, 1.25, 0.292], [0.44, 1.25, 0.292], [0.49, 1.25, 0.292], [0.54, 1.25, 0.292],
    [0.39, 1.12, 0.292], [0.44, 1.12, 0.292], [0.49, 1.12, 0.292], [0.54, 1.12, 0.292],
  ];
  for (let i = 0; i < ventPositions.length; i++) {
    ventDummy.position.set(ventPositions[i][0], ventPositions[i][1], ventPositions[i][2]);
    ventDummy.rotation.set(0, 0, 0);
    ventDummy.scale.set(1, 1, 0.55);
    ventDummy.updateMatrix();
    vent_slots.setMatrixAt(i, ventDummy.matrix);
  }
  vent_slots.instanceMatrix.needsUpdate = true;
  root.add(vent_slots);

  const sensor_buttonGeom = new THREE.CylinderGeometry(0.032, 0.032, 0.014, 20);
  const sensor_button = new THREE.Mesh(sensor_buttonGeom, lensBarrelMat);
  sensor_button.rotation.x = Math.PI / 2;
  sensor_button.position.set(0.50, 0.88, 0.292);
  root.add(sensor_button);

  const indicator_buttonGeom = new THREE.CylinderGeometry(0.023, 0.023, 0.014, 18);
  const indicator_button = new THREE.Mesh(indicator_buttonGeom, silverMat);
  indicator_button.rotation.x = Math.PI / 2;
  indicator_button.position.set(0.42, 0.88, 0.292);
  root.add(indicator_button);

  const mode_dialGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.065, 28);
  const mode_dial = new THREE.Mesh(mode_dialGeom, lensBarrelMat);
  mode_dial.position.set(-0.62, 1.49, -0.03);
  root.add(mode_dial);

  const mode_dial_topGeom = new THREE.CylinderGeometry(0.082, 0.082, 0.012, 28);
  const mode_dial_top = new THREE.Mesh(mode_dial_topGeom, panelMat);
  mode_dial_top.position.set(-0.62, 1.529, -0.03);
  root.add(mode_dial_top);

  const mode_dial_ridgesGeom = new THREE.BoxGeometry(0.018, 0.060, 0.030);
  const mode_dial_ridges = new THREE.InstancedMesh(mode_dial_ridgesGeom, rubberMat, 20);
  const dialDummy = new THREE.Object3D();
  for (let i = 0; i < 20; i++) {
    const angle = i / 20 * Math.PI * 2;
    dialDummy.position.set(
      -0.62 + Math.cos(angle) * 0.106,
      1.49,
      -0.03 + Math.sin(angle) * 0.106
    );
    dialDummy.rotation.set(0, Math.PI / 2 - angle, 0);
    dialDummy.scale.set(1, 1, 1);
    dialDummy.updateMatrix();
    mode_dial_ridges.setMatrixAt(i, dialDummy.matrix);
  }
  mode_dial_ridges.instanceMatrix.needsUpdate = true;
  root.add(mode_dial_ridges);

  const shutter_buttonGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.028, 24);
  const shutter_button = new THREE.Mesh(shutter_buttonGeom, silverMat);
  shutter_button.position.set(-0.82, 1.31, 0.02);
  root.add(shutter_button);

  const top_panelGeom = roundedRectGeometry(0.92, 0.25, 0.12, 0.07, 0.015);
  const top_panel = new THREE.Mesh(top_panelGeom, bodyMat);
  top_panel.rotation.x = Math.PI / 2;
  top_panel.position.set(0, 1.53, -0.02);
  root.add(top_panel);

  const top_seam_leftGeom = new THREE.BoxGeometry(0.012, 0.012, 0.22);
  const top_seam_left = new THREE.Mesh(top_seam_leftGeom, glossyBlackMat);
  top_seam_left.position.set(-0.31, 1.604, -0.02);
  root.add(top_seam_left);

  const top_seam_right = new THREE.Mesh(top_seam_leftGeom, glossyBlackMat);
  top_seam_right.position.set(0.31, 1.604, -0.02);
  root.add(top_seam_right);

  const hot_shoe_baseGeom = new THREE.BoxGeometry(0.34, 0.035, 0.18);
  const hot_shoe_base = new THREE.Mesh(hot_shoe_baseGeom, panelMat);
  hot_shoe_base.position.set(0, 1.625, -0.035);
  root.add(hot_shoe_base);

  const hot_shoe_railGeom = new THREE.BoxGeometry(0.035, 0.025, 0.17);
  const hot_shoe_left_rail = new THREE.Mesh(hot_shoe_railGeom, rubberMat);
  hot_shoe_left_rail.position.set(-0.12, 1.652, -0.035);
  root.add(hot_shoe_left_rail);

  const hot_shoe_right_rail = new THREE.Mesh(hot_shoe_railGeom, rubberMat);
  hot_shoe_right_rail.position.set(0.12, 1.652, -0.035);
  root.add(hot_shoe_right_rail);

  const lens_mountGeom = new THREE.CylinderGeometry(0.36, 0.36, 0.09, 48);
  const lens_mount = new THREE.Mesh(lens_mountGeom, glossyBlackMat);
  lens_mount.rotation.x = Math.PI / 2;
  lens_mount.position.set(0.42, 0.62, 0.295);
  root.add(lens_mount);

  const lens_mount_ringGeom = new THREE.TorusGeometry(0.325, 0.018, 10, 48);
  const lens_mount_ring = new THREE.Mesh(lens_mount_ringGeom, silverMat);
  lens_mount_ring.position.set(0.42, 0.62, 0.345);
  root.add(lens_mount_ring);

  const lens_barrelGeom = new THREE.CylinderGeometry(0.315, 0.335, 0.22, 48);
  const lens_barrel = new THREE.Mesh(lens_barrelGeom, lensBarrelMat);
  lens_barrel.rotation.x = Math.PI / 2;
  lens_barrel.position.set(0.42, 0.62, 0.435);
  root.add(lens_barrel);

  const lens_grip_ringGeom = new THREE.TorusGeometry(0.305, 0.035, 10, 48);
  const lens_grip_ring = new THREE.Mesh(lens_grip_ringGeom, rubberMat);
  lens_grip_ring.position.set(0.42, 0.62, 0.535);
  root.add(lens_grip_ring);

  const lens_ridgesGeom = new THREE.BoxGeometry(0.014, 0.052, 0.070);
  const lens_ridges = new THREE.InstancedMesh(lens_ridgesGeom, rubberMat, 40);
  const lensDummy = new THREE.Object3D();
  for (let i = 0; i < 40; i++) {
    const angle = i / 40 * Math.PI * 2;
    lensDummy.position.set(
      0.42 + Math.cos(angle) * 0.338,
      0.62 + Math.sin(angle) * 0.338,
      0.475
    );
    lensDummy.rotation.set(0, 0, angle - Math.PI / 2);
    lensDummy.scale.set(1, 1, 1);
    lensDummy.updateMatrix();
    lens_ridges.setMatrixAt(i, lensDummy.matrix);
  }
  lens_ridges.instanceMatrix.needsUpdate = true;
  root.add(lens_ridges);

  const front_lens_rimGeom = new THREE.TorusGeometry(0.270, 0.043, 12, 56);
  const front_lens_rim = new THREE.Mesh(front_lens_rimGeom, lensBarrelMat);
  front_lens_rim.position.set(0.42, 0.62, 0.565);
  root.add(front_lens_rim);

  const lens_faceGeom = new THREE.CylinderGeometry(0.235, 0.235, 0.025, 48);
  const lens_face = new THREE.Mesh(lens_faceGeom, glossyBlackMat);
  lens_face.rotation.x = Math.PI / 2;
  lens_face.position.set(0.42, 0.62, 0.572);
  root.add(lens_face);

  const lens_markingsGeom = new THREE.BoxGeometry(0.010, 0.027, 0.006);
  const lens_markings = new THREE.InstancedMesh(lens_markingsGeom, markingMat, 14);
  const markingDummy = new THREE.Object3D();
  for (let i = 0; i < 14; i++) {
    const angle = i / 14 * Math.PI * 2;
    markingDummy.position.set(
      0.42 + Math.cos(angle) * 0.252,
      0.62 + Math.sin(angle) * 0.252,
      0.589
    );
    markingDummy.rotation.set(0, 0, angle - Math.PI / 2);
    markingDummy.scale.set(i % 3 === 0 ? 1.5 : 1, 1, 1);
    markingDummy.updateMatrix();
    lens_markings.setMatrixAt(i, markingDummy.matrix);
  }
  lens_markings.instanceMatrix.needsUpdate = true;
  root.add(lens_markings);

  const lens_inner_ringGeom = new THREE.TorusGeometry(0.185, 0.018, 10, 48);
  const lens_inner_ring = new THREE.Mesh(lens_inner_ringGeom, rubberMat);
  lens_inner_ring.position.set(0.42, 0.62, 0.590);
  root.add(lens_inner_ring);

  const lens_concentric_ringGeom = new THREE.TorusGeometry(0.145, 0.010, 8, 40);
  const lens_concentric_ring = new THREE.Mesh(lens_concentric_ringGeom, lensBarrelMat);
  lens_concentric_ring.position.set(0.42, 0.62, 0.596);
  root.add(lens_concentric_ring);

  const lens_glassGeom = new THREE.CylinderGeometry(0.125, 0.125, 0.018, 40);
  const lens_glass = new THREE.Mesh(lens_glassGeom, lensGlassMat);
  lens_glass.rotation.x = Math.PI / 2;
  lens_glass.position.set(0.42, 0.62, 0.603);
  root.add(lens_glass);

  const lens_reflectionGeom = new THREE.SphereGeometry(0.055, 20, 12);
  const lens_reflection = new THREE.Mesh(lens_reflectionGeom, lensReflectionMat);
  lens_reflection.scale.set(0.75, 1.0, 0.18);
  lens_reflection.position.set(0.385, 0.585, 0.617);
  root.add(lens_reflection);

  const lens_highlightGeom = new THREE.SphereGeometry(0.025, 16, 10);
  const lens_highlight = new THREE.Mesh(lens_highlightGeom, lcdHighlightMat);
  lens_highlight.scale.set(0.65, 1.0, 0.22);
  lens_highlight.position.set(0.365, 0.665, 0.620);
  root.add(lens_highlight);

  const control_button_leftGeom = roundedRectGeometry(0.18, 0.105, 0.025, 0.045, 0.004);
  const control_button_left = new THREE.Mesh(control_button_leftGeom, glossyBlackMat);
  control_button_left.position.set(-0.18, 0.22, 0.294);
  root.add(control_button_left);

  const control_button_centerGeom = roundedRectGeometry(0.15, 0.105, 0.025, 0.045, 0.004);
  const control_button_center = new THREE.Mesh(control_button_centerGeom, glossyBlackMat);
  control_button_center.position.set(0.02, 0.22, 0.294);
  root.add(control_button_center);

  const control_button_rightGeom = roundedRectGeometry(0.17, 0.105, 0.025, 0.045, 0.004);
  const control_button_right = new THREE.Mesh(control_button_rightGeom, glossyBlackMat);
  control_button_right.position.set(0.40, 0.20, 0.294);
  root.add(control_button_right);

  const control_icon_verticalGeom = new THREE.BoxGeometry(0.012, 0.055, 0.006);
  const control_icon_vertical = new THREE.Mesh(control_icon_verticalGeom, markingMat);
  control_icon_vertical.position.set(-0.18, 0.22, 0.313);
  root.add(control_icon_vertical);

  const control_icon_ringGeom = new THREE.TorusGeometry(0.025, 0.004, 6, 20);
  const control_icon_ring = new THREE.Mesh(control_icon_ringGeom, markingMat);
  control_icon_ring.position.set(0.02, 0.22, 0.313);
  root.add(control_icon_ring);

  const control_icon_triangleShape = new THREE.Shape();
  control_icon_triangleShape.moveTo(0, 0.030);
  control_icon_triangleShape.lineTo(-0.026, -0.022);
  control_icon_triangleShape.lineTo(0.026, -0.022);
  control_icon_triangleShape.lineTo(0, 0.030);
  const control_icon_triangleGeom = new THREE.ShapeGeometry(control_icon_triangleShape);
  const control_icon_triangle = new THREE.Mesh(control_icon_triangleGeom, markingMat);
  control_icon_triangle.position.set(0.40, 0.20, 0.313);
  root.add(control_icon_triangle);

  const brand_markGeom = new THREE.BoxGeometry(0.025, 0.008, 0.006);
  const brand_mark = new THREE.InstancedMesh(brand_markGeom, markingMat, 7);
  const brandDummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    brandDummy.position.set(-0.105 + i * 0.035, 0.355 + (i % 2) * 0.006, 0.300);
    brandDummy.rotation.set(0, 0, i % 3 === 0 ? 0.15 : 0);
    brandDummy.scale.set(i === 0 || i === 6 ? 0.75 : 1, 1, 1);
    brandDummy.updateMatrix();
    brand_mark.setMatrixAt(i, brandDummy.matrix);
  }
  brand_mark.instanceMatrix.needsUpdate = true;
  root.add(brand_mark);

  const side_switchGeom = roundedRectGeometry(0.11, 0.045, 0.020, 0.015, 0.003);
  const side_switch = new THREE.Mesh(side_switchGeom, glossyBlackMat);
  side_switch.position.set(-0.88, 1.12, 0.286);
  side_switch.rotation.z = -0.08;
  root.add(side_switch);

  const strap_lugGeom = roundedRectGeometry(0.12, 0.055, 0.055, 0.018, 0.005);
  const strap_lug = new THREE.Mesh(strap_lugGeom, lensBarrelMat);
  strap_lug.position.set(0.735, 1.05, 0.02);
  root.add(strap_lug);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
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