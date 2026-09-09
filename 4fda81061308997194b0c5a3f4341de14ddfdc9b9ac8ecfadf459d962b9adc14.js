function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_kerosene_lantern";

  const woodMat = new THREE.MeshStandardMaterial({ color: 0x8a5a35, metalness: 0.0, roughness: 0.65 });
  const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x5c351d, metalness: 0.0, roughness: 0.7 });
  const grainMat = new THREE.MeshStandardMaterial({ color: 0x3d2416, metalness: 0.0, roughness: 0.85 });
  const copperMat = new THREE.MeshStandardMaterial({ color: 0xb8733f, metalness: 0.45, roughness: 0.35 });
  const darkCopperMat = new THREE.MeshStandardMaterial({ color: 0x5b321f, metalness: 0.4, roughness: 0.45 });
  const blackMetalMat = new THREE.MeshStandardMaterial({ color: 0x151515, metalness: 0.55, roughness: 0.35 });
  const holeMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8eeee,
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const glassHighlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const flameOuterMat = new THREE.MeshStandardMaterial({
    color: 0xff8a24,
    emissive: 0xff6a12,
    emissiveIntensity: 0.65,
    metalness: 0.0,
    roughness: 0.35,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const flameInnerMat = new THREE.MeshStandardMaterial({
    color: 0xfff2a0,
    emissive: 0xffd34f,
    emissiveIntensity: 0.5,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const blueFlameMat = new THREE.MeshStandardMaterial({
    color: 0x6b8cff,
    emissive: 0x356bff,
    emissiveIntensity: 0.45,
    metalness: 0.0,
    roughness: 0.35,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  function addBox(name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addTube(name, pts, radius, mat, segments) {
    const curve = new THREE.CatmullRomCurve3(pts);
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, segments || 32, radius, 10, false), mat);
    mesh.name = name;
    root.add(mesh);
    return mesh;
  }

  const base_plinth = addBox("base_plinth", 1.18, 0.12, 0.66, woodMat, 0, 0.06, 0);
  const front_base_panel = addBox("front_base_panel", 1.02, 0.22, 0.055, woodMat, 0, 0.20, 0.325);
  const left_base_side = addBox("left_base_side", 0.10, 0.22, 0.58, darkWoodMat, -0.52, 0.20, 0);
  const right_base_side = addBox("right_base_side", 0.10, 0.22, 0.58, darkWoodMat, 0.52, 0.20, 0);
  const rear_base_panel = addBox("rear_base_panel", 1.02, 0.20, 0.055, darkWoodMat, 0, 0.20, -0.305);
  const interior_floor = addBox("interior_floor", 0.82, 0.055, 0.48, darkWoodMat, 0, 0.315, 0);

  const left_rear_post = addBox("left_rear_post", 0.11, 1.12, 0.10, darkWoodMat, -0.43, 0.88, -0.20);
  const right_rear_post = addBox("right_rear_post", 0.11, 1.12, 0.10, darkWoodMat, 0.43, 0.88, -0.20);
  const left_front_post = addBox("left_front_post", 0.13, 1.12, 0.11, woodMat, -0.43, 0.88, 0.20);
  const right_front_post = addBox("right_front_post", 0.13, 1.12, 0.11, woodMat, 0.43, 0.88, 0.20);

  const left_post_rounding = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 1.08, 16), woodMat);
  left_post_rounding.name = "left_post_rounding";
  left_post_rounding.position.set(-0.365, 0.88, 0.255);
  root.add(left_post_rounding);

  const right_post_rounding = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 1.08, 16), woodMat);
  right_post_rounding.name = "right_post_rounding";
  right_post_rounding.position.set(0.365, 0.88, 0.255);
  root.add(right_post_rounding);

  const upper_crossbar = addBox("upper_crossbar", 0.82, 0.16, 0.10, darkWoodMat, 0, 1.39, 0.18);
  const lower_crossbar = addBox("lower_crossbar", 0.78, 0.10, 0.08, darkWoodMat, 0, 0.36, 0.18);
  const roof_underlayer = addBox("roof_underlayer", 1.02, 0.08, 0.56, darkWoodMat, 0, 1.46, 0);
  const roof_panel = addBox("roof_panel", 1.12, 0.10, 0.64, woodMat, 0, 1.53, 0);

  const roof_front_rounding = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.08, 16), woodMat);
  roof_front_rounding.name = "roof_front_rounding";
  roof_front_rounding.rotation.z = Math.PI / 2;
  roof_front_rounding.position.set(0, 1.505, 0.325);
  root.add(roof_front_rounding);

  const burner_reservoir = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.27, 48), darkCopperMat);
  burner_reservoir.name = "burner_reservoir";
  burner_reservoir.position.set(0, 0.49, 0.02);
  root.add(burner_reservoir);

  const burner_bottom_ring = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.012, 10, 48), blackMetalMat);
  burner_bottom_ring.name = "burner_bottom_ring";
  burner_bottom_ring.rotation.x = Math.PI / 2;
  burner_bottom_ring.position.set(0, 0.365, 0.02);
  root.add(burner_bottom_ring);

  const burner_top_collar = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.20, 0.055, 48), copperMat);
  burner_top_collar.name = "burner_top_collar";
  burner_top_collar.position.set(0, 0.655, 0.02);
  root.add(burner_top_collar);

  const burner_rim = new THREE.Mesh(new THREE.TorusGeometry(0.225, 0.014, 10, 48), blackMetalMat);
  burner_rim.name = "burner_rim";
  burner_rim.rotation.x = Math.PI / 2;
  burner_rim.position.set(0, 0.685, 0.02);
  root.add(burner_rim);

  const chimney_lower_collar = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.18, 0.06, 48), darkCopperMat);
  chimney_lower_collar.name = "chimney_lower_collar";
  chimney_lower_collar.position.set(0, 1.405, 0.02);
  root.add(chimney_lower_collar);

  const chimney_body = new THREE.Mesh(new THREE.CylinderGeometry(0.225, 0.225, 0.39, 64), copperMat);
  chimney_body.name = "chimney_body";
  chimney_body.position.set(0, 1.705, 0.02);
  root.add(chimney_body);

  const chimney_lower_band = new THREE.Mesh(new THREE.TorusGeometry(0.225, 0.009, 8, 64), darkCopperMat);
  chimney_lower_band.name = "chimney_lower_band";
  chimney_lower_band.rotation.x = Math.PI / 2;
  chimney_lower_band.position.set(0, 1.525, 0.02);
  root.add(chimney_lower_band);

  const chimney_upper_band = new THREE.Mesh(new THREE.TorusGeometry(0.225, 0.009, 8, 64), darkCopperMat);
  chimney_upper_band.name = "chimney_upper_band";
  chimney_upper_band.rotation.x = Math.PI / 2;
  chimney_upper_band.position.set(0, 1.885, 0.02);
  root.add(chimney_upper_band);

  const vent_holes = new THREE.InstancedMesh(new THREE.CircleGeometry(0.038, 24), holeMat);
  vent_holes.name = "vent_holes";
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    dummy.position.set(Math.sin(angle) * 0.229, i % 2 === 0 ? 1.775 : 1.655, 0.02 + Math.cos(angle) * 0.229);
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    vent_holes.setMatrixAt(i, dummy.matrix);
  }
  root.add(vent_holes);

  const cap_disc = new THREE.Mesh(new THREE.CylinderGeometry(0.285, 0.285, 0.035, 64), copperMat);
  cap_disc.name = "cap_disc";
  cap_disc.position.set(0, 1.915, 0.02);
  root.add(cap_disc);

  const cap_rim = new THREE.Mesh(new THREE.TorusGeometry(0.285, 0.010, 8, 64), darkCopperMat);
  cap_rim.name = "cap_rim";
  cap_rim.rotation.x = Math.PI / 2;
  cap_rim.position.set(0, 1.905, 0.02);
  root.add(cap_rim);

  const cap_knob = new THREE.Mesh(new THREE.SphereGeometry(0.045, 24, 12), blackMetalMat);
  cap_knob.name = "cap_knob";
  cap_knob.scale.set(1.25, 0.45, 1.0);
  cap_knob.position.set(0, 1.955, 0.02);
  root.add(cap_knob);

  const glass_chimney_profile = [
    new THREE.Vector2(0.185, 0.625),
    new THREE.Vector2(0.225, 0.665),
    new THREE.Vector2(0.255, 0.78),
    new THREE.Vector2(0.265, 1.08),
    new THREE.Vector2(0.235, 1.315),
    new THREE.Vector2(0.195, 1.385)
  ];
  const glass_chimney = new THREE.Mesh(new THREE.LatheGeometry(glass_chimney_profile, 64), glassMat);
  glass_chimney.name = "glass_chimney";
  glass_chimney.position.z = 0.02;
  root.add(glass_chimney);

  const glass_bottom_highlight = new THREE.Mesh(new THREE.TorusGeometry(0.205, 0.006, 8, 64), glassHighlightMat);
  glass_bottom_highlight.name = "glass_bottom_highlight";
  glass_bottom_highlight.rotation.x = Math.PI / 2;
  glass_bottom_highlight.position.set(0, 0.665, 0.02);
  root.add(glass_bottom_highlight);

  const glass_top_highlight = new THREE.Mesh(new THREE.TorusGeometry(0.198, 0.005, 8, 64), glassHighlightMat);
  glass_top_highlight.name = "glass_top_highlight";
  glass_top_highlight.rotation.x = Math.PI / 2;
  glass_top_highlight.position.set(0, 1.375, 0.02);
  root.add(glass_top_highlight);

  const left_glass_reflection = addBox("left_glass_reflection", 0.018, 0.48, 0.006, glassHighlightMat, -0.105, 1.02, 0.265);
  left_glass_reflection.rotation.z = -0.03;
  const right_glass_reflection = addBox("right_glass_reflection", 0.012, 0.36, 0.006, glassHighlightMat, 0.125, 1.08, 0.255);
  right_glass_reflection.rotation.z = 0.02;

  const outer_flame_shape = new THREE.Shape();
  outer_flame_shape.moveTo(-0.085, 0.0);
  outer_flame_shape.bezierCurveTo(-0.145, 0.16, -0.035, 0.25, -0.075, 0.38);
  outer_flame_shape.bezierCurveTo(-0.105, 0.50, 0.035, 0.58, 0.005, 0.73);
  outer_flame_shape.bezierCurveTo(0.155, 0.57, 0.105, 0.39, 0.135, 0.25);
  outer_flame_shape.bezierCurveTo(0.17, 0.10, 0.075, 0.02, -0.085, 0.0);
  const outer_flame = new THREE.Mesh(new THREE.ShapeGeometry(outer_flame_shape), flameOuterMat);
  outer_flame.name = "outer_flame";
  outer_flame.position.set(0, 0.665, 0.075);
  root.add(outer_flame);

  const inner_flame_shape = new THREE.Shape();
  inner_flame_shape.moveTo(-0.055, 0.0);
  inner_flame_shape.bezierCurveTo(-0.07, 0.13, 0.015, 0.20, -0.005, 0.32);
  inner_flame_shape.bezierCurveTo(-0.02, 0.41, 0.07, 0.47, 0.055, 0.55);
  inner_flame_shape.bezierCurveTo(0.125, 0.40, 0.085, 0.20, 0.075, 0.08);
  inner_flame_shape.bezierCurveTo(0.055, 0.02, 0.015, 0.0, -0.055, 0.0);
  const inner_flame = new THREE.Mesh(new THREE.ShapeGeometry(inner_flame_shape), flameInnerMat);
  inner_flame.name = "inner_flame";
  inner_flame.position.set(0.015, 0.665, 0.082);
  root.add(inner_flame);

  const blue_flame_base = new THREE.Mesh(new THREE.CircleGeometry(0.105, 32), blueFlameMat);
  blue_flame_base.name = "blue_flame_base";
  blue_flame_base.scale.set(1.0, 0.35, 1.0);
  blue_flame_base.position.set(0, 0.695, 0.086);
  root.add(blue_flame_base);

  const handle = addTube("handle", [
    new THREE.Vector3(-0.255, 1.72, -0.08),
    new THREE.Vector3(-0.315, 1.92, -0.08),
    new THREE.Vector3(-0.235, 2.16, -0.08),
    new THREE.Vector3(0.0, 2.275, -0.08),
    new THREE.Vector3(0.235, 2.16, -0.08),
    new THREE.Vector3(0.315, 1.92, -0.08),
    new THREE.Vector3(0.255, 1.72, -0.08)
  ], 0.014, blackMetalMat, 48);

  const left_handle_pivot = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.055, 20), blackMetalMat);
  left_handle_pivot.name = "left_handle_pivot";
  left_handle_pivot.rotation.z = Math.PI / 2;
  left_handle_pivot.position.set(-0.255, 1.72, -0.08);
  root.add(left_handle_pivot);

  const right_handle_pivot = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.055, 20), blackMetalMat);
  right_handle_pivot.name = "right_handle_pivot";
  right_handle_pivot.rotation.z = Math.PI / 2;
  right_handle_pivot.position.set(0.255, 1.72, -0.08);
  root.add(right_handle_pivot);

  const side_control_pipe = addTube("side_control_pipe", [
    new THREE.Vector3(0.18, 0.52, 0.08),
    new THREE.Vector3(0.29, 0.50, 0.10),
    new THREE.Vector3(0.34, 0.58, 0.12),
    new THREE.Vector3(0.34, 0.70, 0.12)
  ], 0.014, blackMetalMat, 24);

  const control_knob = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.075, 20), blackMetalMat);
  control_knob.name = "control_knob";
  control_knob.rotation.z = Math.PI / 2;
  control_knob.position.set(0.39, 0.70, 0.12);
  root.add(control_knob);

  const lower_air_pipe = addTube("lower_air_pipe", [
    new THREE.Vector3(0.18, 0.42, 0.08),
    new THREE.Vector3(0.30, 0.39, 0.12),
    new THREE.Vector3(0.36, 0.34, 0.16)
  ], 0.012, blackMetalMat, 18);

  const air_hole = new THREE.Mesh(new THREE.SphereGeometry(0.025, 16, 8), blackMetalMat);
  air_hole.name = "air_hole";
  air_hole.scale.set(1.0, 0.55, 1.0);
  air_hole.position.set(0.36, 0.34, 0.16);
  root.add(air_hole);

  const front_grain_lines = new THREE.InstancedMesh(new THREE.BoxGeometry(0.16, 0.004, 0.004), grainMat);
  front_grain_lines.name = "front_grain_lines";
  for (let i = 0; i < 18; i++) {
    const row = Math.floor(i / 6);
    const col = i % 6;
    dummy.position.set(-0.42 + col * 0.17, 0.14 + row * 0.065, 0.356);
    dummy.rotation.set(0, 0, (col - 2.5) * 0.025);
    dummy.scale.set(0.65 + (i % 3) * 0.25, 1, 1);
    dummy.updateMatrix();
    front_grain_lines.setMatrixAt(i, dummy.matrix);
  }
  root.add(front_grain_lines);

  const post_grain_lines = new THREE.InstancedMesh(new THREE.BoxGeometry(0.004, 0.22, 0.004), grainMat);
  post_grain_lines.name = "post_grain_lines";
  for (let i = 0; i < 16; i++) {
    const side = i < 8 ? -1 : 1;
    const j = i % 8;
    dummy.position.set(side * (0.385 + (j % 3) * 0.018), 0.55 + j * 0.105, 0.258);
    dummy.rotation.set(0, 0, side * 0.015);
    dummy.scale.set(1, 0.65 + (j % 4) * 0.12, 1);
    dummy.updateMatrix();
    post_grain_lines.setMatrixAt(i, dummy.matrix);
  }
  root.add(post_grain_lines);

  const logo_a_left = addBox("logo_a_left", 0.012, 0.105, 0.006, grainMat, -0.135, 0.19, 0.358);
  logo_a_left.rotation.z = -0.28;
  const logo_a_right = addBox("logo_a_right", 0.012, 0.105, 0.006, grainMat, -0.095, 0.19, 0.358);
  logo_a_right.rotation.z = 0.28;
  const logo_a_bar = addBox("logo_a_bar", 0.055, 0.010, 0.006, grainMat, -0.115, 0.185, 0.361);
  const logo_l = addBox("logo_l", 0.012, 0.105, 0.006, grainMat, -0.045, 0.19, 0.358);
  const logo_o = new THREE.Mesh(new THREE.TorusGeometry(0.030, 0.005, 8, 24), grainMat);
  logo_o.name = "logo_o";
  logo_o.scale.set(0.75, 1.0, 1.0);
  logo_o.position.set(0.005, 0.19, 0.358);
  root.add(logo_o);
  const logo_r_stem = addBox("logo_r_stem", 0.012, 0.105, 0.006, grainMat, 0.055, 0.19, 0.358);
  const logo_r_hook = addBox("logo_r_hook", 0.045, 0.010, 0.006, grainMat, 0.075, 0.235, 0.361);
  const logo_t_stem = addBox("logo_t_stem", 0.012, 0.105, 0.006, grainMat, 0.125, 0.19, 0.358);
  const logo_t_bar = addBox("logo_t_bar", 0.060, 0.010, 0.006, grainMat, 0.125, 0.235, 0.361);
  const logo_dot = new THREE.Mesh(new THREE.CircleGeometry(0.008, 12), grainMat);
  logo_dot.name = "logo_dot";
  logo_dot.position.set(0.165, 0.225, 0.361);
  root.add(logo_dot);

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
    const scale = 0.98 / maxDim;
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
