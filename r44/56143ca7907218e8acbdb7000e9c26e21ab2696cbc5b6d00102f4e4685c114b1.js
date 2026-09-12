// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const upper_assembly = new THREE.Group();
  const lower_assembly = new THREE.Group();
  root.add(upper_assembly, lower_assembly);

  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xff8a00,
    metalness: 0.0,
    roughness: 0.3,
  });
  const orangePanelMat = new THREE.MeshStandardMaterial({
    color: 0xf27a,
    metalness: 0.0,
    roughness: 0.3,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rubberInsetMat = new THREE.MeshStandardMaterial({
    color: 0x242424,
    metalness: 0.0,
    roughness: 0.8,
  });
  const blackPlasticMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.3,
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  function makeSideGeometry(shape, depth, bevelSize, bevelSegments) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: bevelSize > 0,
      bevelThickness: bevelSize,
      bevelSize,
      bevelSegments,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const main_bodyShape = new THREE.Shape();
  main_bodyShape.moveTo(-1.28, 0.10);
  main_bodyShape.lineTo(1.12, 0.10);
  main_bodyShape.quadraticCurveTo(1.25, 0.10, 1.25, 0.22);
  main_bodyShape.lineTo(1.25, 0.58);
  main_bodyShape.quadraticCurveTo(1.25, 0.68, 1.15, 0.68);
  main_bodyShape.lineTo(0.62, 0.68);
  main_bodyShape.lineTo(0.55, 0.77);
  main_bodyShape.lineTo(0.18, 0.77);
  main_bodyShape.lineTo(0.12, 0.68);
  main_bodyShape.lineTo(-1.12, 0.68);
  main_bodyShape.quadraticCurveTo(-1.28, 0.68, -1.28, 0.52);
  main_bodyShape.closePath();
  const main_bodyGeom = makeSideGeometry(main_bodyShape, 0.38, 0.025, 3);
  const main_body = new THREE.Mesh(main_bodyGeom, orangeMat);
  main_body.name = "main_body";
  upper_assembly.add(main_body);

  const lower_barrel_tubeGeom = new THREE.CylinderGeometry(0.13, 0.13, 2.28, 24);
  const lower_barrel_tube = new THREE.Mesh(lower_barrel_tubeGeom, orangeMat);
  lower_barrel_tube.name = "lower_barrel_tube";
  lower_barrel_tube.rotation.z = Math.PI / 2;
  lower_barrel_tube.position.set(-0.12, 0.10, 0);
  upper_assembly.add(lower_barrel_tube);

  const muzzle_collarGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.22, 24);
  const muzzle_collar = new THREE.Mesh(muzzle_collarGeom, orangeMat);
  muzzle_collar.name = "muzzle_collar";
  muzzle_collar.rotation.z = Math.PI / 2;
  muzzle_collar.position.set(-1.30, 0.39, 0);
  upper_assembly.add(muzzle_collar);

  const muzzle_coneGeom = new THREE.CylinderGeometry(0.12, 0.22, 0.36, 24);
  const muzzle_cone = new THREE.Mesh(muzzle_coneGeom, orangeMat);
  muzzle_cone.name = "muzzle_cone";
  muzzle_cone.rotation.z = Math.PI / 2;
  muzzle_cone.position.set(-1.53, 0.39, 0);
  upper_assembly.add(muzzle_cone);

  const metal_nozzleGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.27, 24);
  const metal_nozzle = new THREE.Mesh(metal_nozzleGeom, metalMat);
  metal_nozzle.name = "metal_nozzle";
  metal_nozzle.rotation.z = Math.PI / 2;
  metal_nozzle.position.set(-1.82, 0.39, 0);
  upper_assembly.add(metal_nozzle);

  const nozzle_tipGeom = new THREE.SphereGeometry(0.09, 20, 12);
  const nozzle_tip = new THREE.Mesh(nozzle_tipGeom, metalMat);
  nozzle_tip.name = "nozzle_tip";
  nozzle_tip.scale.set(0.55, 1, 1);
  nozzle_tip.position.set(-1.955, 0.39, 0);
  upper_assembly.add(nozzle_tip);

  const nozzle_grooveGeom = new THREE.TorusGeometry(0.091, 0.006, 6, 24);
  const nozzle_groove = new THREE.Mesh(nozzle_grooveGeom, blackPlasticMat);
  nozzle_groove.name = "nozzle_groove";
  nozzle_groove.rotation.y = Math.PI / 2;
  nozzle_groove.position.set(-1.735, 0.39, 0);
  upper_assembly.add(nozzle_groove);

  const rear_end_capGeom = new THREE.BoxGeometry(0.16, 0.48, 0.40);
  const rear_end_cap = new THREE.Mesh(rear_end_capGeom, orangeMat);
  rear_end_cap.name = "rear_end_cap";
  rear_end_cap.position.set(1.29, 0.39, 0);
  upper_assembly.add(rear_end_cap);

  const rear_sight_baseGeom = new THREE.BoxGeometry(0.34, 0.08, 0.24);
  const rear_sight_base = new THREE.Mesh(rear_sight_baseGeom, orangeMat);
  rear_sight_base.name = "rear_sight_base";
  rear_sight_base.position.set(1.03, 0.705, 0);
  upper_assembly.add(rear_sight_base);

  const rear_sight_postGeom = new THREE.BoxGeometry(0.16, 0.12, 0.16);
  const rear_sight_post = new THREE.Mesh(rear_sight_postGeom, orangeMat);
  rear_sight_post.name = "rear_sight_post";
  rear_sight_post.position.set(1.10, 0.79, 0);
  upper_assembly.add(rear_sight_post);

  const front_sightGeom = new THREE.BoxGeometry(0.28, 0.09, 0.22);
  const front_sight = new THREE.Mesh(front_sightGeom, orangeMat);
  front_sight.name = "front_sight";
  front_sight.position.set(-0.72, 0.715, 0);
  upper_assembly.add(front_sight);

  const top_railGeom = new THREE.BoxGeometry(0.66, 0.035, 0.18);
  const top_rail = new THREE.Mesh(top_railGeom, orangePanelMat);
  top_rail.name = "top_rail";
  top_rail.position.set(0.30, 0.705, 0);
  upper_assembly.add(top_rail);

  const top_channelGeom = new THREE.BoxGeometry(0.52, 0.018, 0.075);
  const top_channel = new THREE.Mesh(top_channelGeom, orangePanelMat);
  top_channel.name = "top_channel";
  top_channel.position.set(-0.36, 0.704, 0);
  upper_assembly.add(top_channel);

  const side_access_panelGeom = new THREE.BoxGeometry(0.48, 0.30, 0.025);
  const side_access_panel = new THREE.Mesh(side_access_panelGeom, orangePanelMat);
  side_access_panel.name = "side_access_panel";
  side_access_panel.position.set(-0.34, 0.39, 0.218);
  upper_assembly.add(side_access_panel);

  const access_panel_frame = new THREE.Group();
  access_panel_frame.name = "access_panel_frame";
  const access_frame_horizontalGeom = new THREE.BoxGeometry(0.54, 0.035, 0.035);
  const access_frame_verticalGeom = new THREE.BoxGeometry(0.035, 0.34, 0.035);
  for (const side of [-1, 1]) {
    const access_frame_horizontal = new THREE.Mesh(access_frame_horizontalGeom, orangeMat);
    access_frame_horizontal.position.set(-0.34, 0.39 + side * 0.165, 0.238);
    access_panel_frame.add(access_frame_horizontal);

    const access_frame_vertical = new THREE.Mesh(access_frame_verticalGeom, orangeMat);
    access_frame_vertical.position.set(-0.34 + side * 0.265, 0.39, 0.238);
    access_panel_frame.add(access_frame_vertical);
  }
  upper_assembly.add(access_panel_frame);

  const access_panel_ribsGeom = new THREE.BoxGeometry(0.018, 0.17, 0.018);
  const access_panel_ribs = new THREE.InstancedMesh(access_panel_ribsGeom, orangeMat, 7);
  access_panel_ribs.name = "access_panel_ribs";
  const rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    rib_dummy.position.set(-0.47 + i * 0.043, 0.40, 0.246);
    rib_dummy.updateMatrix();
    access_panel_ribs.setMatrixAt(i, rib_dummy.matrix);
  }
  access_panel_ribs.instanceMatrix.needsUpdate = true;
  upper_assembly.add(access_panel_ribs);

  const access_panel_labelGeom = new THREE.BoxGeometry(0.22, 0.075, 0.018);
  const access_panel_label = new THREE.Mesh(access_panel_labelGeom, orangePanelMat);
  access_panel_label.name = "access_panel_label";
  access_panel_label.position.set(-0.34, 0.31, 0.246);
  upper_assembly.add(access_panel_label);

  const logo_bars = [];
  function addLogoBar(x, y, w, h) {
    logo_bars.push([x, y, w, h]);
  }
  function addLogoH(x, y, w) {
    addLogoBar(x, y, w, 0.018);
  }
  function addLogoV(x, y, h) {
    addLogoBar(x, y, 0.018, h);
  }

  const logoY = 0.40;
  const logoH = 0.14;
  const logoW = 0.09;
  const logoGap = 0.035;
  let logoX = -1.08;

  addLogoV(logoX, logoY, logoH);
  addLogoV(logoX + logoW, logoY, logoH);
  addLogoH(logoX + logoW / 2, logoY + logoH / 2, logoW);

  logoX += logoW + logoGap;
  addLogoV(logoX, logoY, logoH);
  addLogoH(logoX + logoW / 2, logoY + logoH / 2, logoW);
  addLogoH(logoX + logoW / 2, logoY, logoW);

  logoX += logoW + logoGap;
  addLogoV(logoX, logoY, logoH);
  addLogoH(logoX + logoW / 2, logoY + logoH / 2, logoW);
  addLogoH(logoX + logoW / 2, logoY, logoW);
  addLogoV(logoX + logoW, logoY + logoH / 4, logoH / 2);

  logoX += logoW + logoGap;
  addLogoV(logoX, logoY, logoH);
  addLogoH(logoX + logoW / 2, logoY + logoH / 2, logoW);
  addLogoH(logoX + logoW / 2, logoY, logoW);
  addLogoV(logoX + logoW, logoY + logoH / 4, logoH / 2);

  const logo_marksGeom = new THREE.BoxGeometry(1, 1, 0.018);
  const logo_marks = new THREE.InstancedMesh(logo_marksGeom, orangePanelMat, logo_bars.length);
  logo_marks.name = "logo_marks";
  const logo_dummy = new THREE.Object3D();
  for (let i = 0; i < logo_bars.length; i++) {
    const bar = logo_bars[i];
    logo_dummy.position.set(bar[0], bar[1], 0.224);
    logo_dummy.scale.set(bar[2], bar[3], 1);
    logo_dummy.updateMatrix();
    logo_marks.setMatrixAt(i, logo_dummy.matrix);
  }
  logo_marks.instanceMatrix.needsUpdate = true;
  upper_assembly.add(logo_marks);

  const body_screwsGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.018, 18);
  const body_screws = new THREE.InstancedMesh(body_screwsGeom, orangePanelMat, 2);
  body_screws.name = "body_screws";
  const screw_dummy = new THREE.Object3D();
  const screwPositions = [0.10, 0.55];
  for (let i = 0; i < screwPositions.length; i++) {
    screw_dummy.position.set(screwPositions[i], 0.31, 0.225);
    screw_dummy.rotation.set(Math.PI / 2, 0, 0);
    screw_dummy.updateMatrix();
    body_screws.setMatrixAt(i, screw_dummy.matrix);
  }
  body_screws.instanceMatrix.needsUpdate = true;
  upper_assembly.add(body_screws);

  const rear_slideGeom = new THREE.CapsuleGeometry(0.105, 0.72, 6, 18);
  const rear_slide = new THREE.Mesh(rear_slideGeom, blackPlasticMat);
  rear_slide.name = "rear_slide";
  rear_slide.rotation.z = Math.PI / 2;
  rear_slide.scale.z = 0.45;
  rear_slide.position.set(0.86, 0.43, 0.225);
  upper_assembly.add(rear_slide);

  const rear_slide_insetGeom = new THREE.CapsuleGeometry(0.052, 0.56, 5, 16);
  const rear_slide_inset = new THREE.Mesh(rear_slide_insetGeom, rubberInsetMat);
  rear_slide_inset.name = "rear_slide_inset";
  rear_slide_inset.rotation.z = Math.PI / 2;
  rear_slide_inset.scale.z = 0.35;
  rear_slide_inset.position.set(0.88, 0.43, 0.267);
  upper_assembly.add(rear_slide_inset);

  const trigger_guardShape = new THREE.Shape();
  trigger_guardShape.moveTo(-0.62, 0.08);
  trigger_guardShape.lineTo(0.42, 0.08);
  trigger_guardShape.quadraticCurveTo(0.55, 0.08, 0.55, -0.06);
  trigger_guardShape.lineTo(0.52, -0.25);
  trigger_guardShape.quadraticCurveTo(0.50, -0.40, 0.32, -0.43);
  trigger_guardShape.lineTo(-0.35, -0.43);
  trigger_guardShape.quadraticCurveTo(-0.55, -0.42, -0.63, -0.24);
  trigger_guardShape.lineTo(-0.72, -0.02);
  trigger_guardShape.quadraticCurveTo(-0.75, 0.08, -0.62, 0.08);
  trigger_guardShape.closePath();

  const trigger_guard_hole = new THREE.Path();
  trigger_guard_hole.moveTo(-0.43, -0.05);
  trigger_guard_hole.quadraticCurveTo(-0.48, -0.13, -0.43, -0.23);
  trigger_guard_hole.lineTo(-0.35, -0.31);
  trigger_guard_hole.lineTo(0.25, -0.31);
  trigger_guard_hole.quadraticCurveTo(0.36, -0.30, 0.38, -0.20);
  trigger_guard_hole.lineTo(0.39, -0.08);
  trigger_guard_hole.quadraticCurveTo(0.39, -0.03, 0.33, -0.03);
  trigger_guard_hole.lineTo(-0.43, -0.05);
  trigger_guardShape.holes.push(trigger_guard_hole);

  const trigger_guardGeom = makeSideGeometry(trigger_guardShape, 0.30, 0.018, 2);
  const trigger_guard = new THREE.Mesh(trigger_guardGeom, rubberMat);
  trigger_guard.name = "trigger_guard";
  lower_assembly.add(trigger_guard);

  const pistol_gripShape = new THREE.Shape();
  pistol_gripShape.moveTo(0.18, 0.05);
  pistol_gripShape.lineTo(0.72, 0.05);
  pistol_gripShape.quadraticCurveTo(0.84, -0.02, 0.88, -0.16);
  pistol_gripShape.lineTo(1.18, -1.02);
  pistol_gripShape.quadraticCurveTo(1.22, -1.15, 1.08, -1.22);
  pistol_gripShape.lineTo(0.72, -1.34);
  pistol_gripShape.quadraticCurveTo(0.58, -1.38, 0.55, -1.23);
  pistol_gripShape.lineTo(0.47, -0.91);
  pistol_gripShape.quadraticCurveTo(0.43, -0.72, 0.31, -0.57);
  pistol_gripShape.quadraticCurveTo(0.18, -0.42, 0.19, -0.23);
  pistol_gripShape.lineTo(0.18, 0.05);
  pistol_gripShape.closePath();
  const pistol_gripGeom = makeSideGeometry(pistol_gripShape, 0.32, 0.025, 3);
  const pistol_grip = new THREE.Mesh(pistol_gripGeom, rubberMat);
  pistol_grip.name = "pistol_grip";
  lower_assembly.add(pistol_grip);

  const grip_panelShape = new THREE.Shape();
  grip_panelShape.moveTo(0.52, -0.55);
  grip_panelShape.lineTo(0.82, -0.43);
  grip_panelShape.lineTo(1.08, -1.02);
  grip_panelShape.quadraticCurveTo(1.10, -1.10, 1.01, -1.14);
  grip_panelShape.lineTo(0.70, -1.23);
  grip_panelShape.lineTo(0.48, -0.66);
  grip_panelShape.quadraticCurveTo(0.46, -0.59, 0.52, -0.55);
  grip_panelShape.closePath();
  const grip_panelGeom = makeSideGeometry(grip_panelShape, 0.018, 0.006, 2);
  const grip_panel = new THREE.Mesh(grip_panelGeom, rubberInsetMat);
  grip_panel.name = "grip_panel";
  grip_panel.position.z = 0.185;
  lower_assembly.add(grip_panel);

  const grip_textureGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.012, 8);
  const grip_texture = new THREE.InstancedMesh(grip_textureGeom, blackPlasticMat, 45);
  grip_texture.name = "grip_texture";
  const texture_dummy = new THREE.Object3D();
  let textureIndex = 0;
  for (let row = 0; row < 9; row++) {
    const y = -0.64 - row * 0.065;
    const left = 0.55 + row * 0.021;
    const right = 0.82 + row * 0.025;
    for (let column = 0; column < 5; column++) {
      const t = column / 4;
      const x = left + (right - left) * t;
      texture_dummy.position.set(x, y, 0.205);
      texture_dummy.rotation.set(Math.PI / 2, 0, 0);
      texture_dummy.updateMatrix();
      grip_texture.setMatrixAt(textureIndex, texture_dummy.matrix);
      textureIndex++;
    }
  }
  grip_texture.instanceMatrix.needsUpdate = true;
  lower_assembly.add(grip_texture);

  const triggerPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.20, -0.01, 0.18),
    new THREE.Vector3(0.22, -0.16, 0.18),
    new THREE.Vector3(0.17, -0.31, 0.18),
    new THREE.Vector3(0.04, -0.40, 0.18),
  ]);
  const triggerGeom = new THREE.TubeGeometry(triggerPath, 18, 0.035, 10, false);
  const trigger = new THREE.Mesh(triggerGeom, blackPlasticMat);
  trigger.name = "trigger";
  lower_assembly.add(trigger);

  const trigger_pinGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.018, 16);
  const trigger_pin = new THREE.Mesh(trigger_pinGeom, blackPlasticMat);
  trigger_pin.name = "trigger_pin";
  trigger_pin.rotation.x = Math.PI / 2;
  trigger_pin.position.set(0.20, -0.01, 0.18);
  lower_assembly.add(trigger_pin);

  const selector_switchGeom = new THREE.BoxGeometry(0.17, 0.09, 0.045);
  const selector_switch = new THREE.Mesh(selector_switchGeom, blackPlasticMat);
  selector_switch.name = "selector_switch";
  selector_switch.position.set(-0.02, 0.075, 0.225);
  lower_assembly.add(selector_switch);

  const safety_latchGeom = new THREE.BoxGeometry(0.30, 0.085, 0.055);
  const safety_latch = new THREE.Mesh(safety_latchGeom, blackPlasticMat);
  safety_latch.name = "safety_latch";
  safety_latch.position.set(0.38, 0.075, 0.225);
  lower_assembly.add(safety_latch);

  const safety_latch_highlightGeom = new THREE.BoxGeometry(0.22, 0.018, 0.012);
  const safety_latch_highlight = new THREE.Mesh(safety_latch_highlightGeom, rubberInsetMat);
  safety_latch_highlight.name = "safety_latch_highlight";
  safety_latch_highlight.position.set(0.38, 0.116, 0.257);
  lower_assembly.add(safety_latch_highlight);

  const grip_screwGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.014, 14);
  const grip_screw = new THREE.Mesh(grip_screwGeom, blackPlasticMat);
  grip_screw.name = "grip_screw";
  grip_screw.rotation.x = Math.PI / 2;
  grip_screw.position.set(0.38, -0.37, 0.18);
  lower_assembly.add(grip_screw);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
}