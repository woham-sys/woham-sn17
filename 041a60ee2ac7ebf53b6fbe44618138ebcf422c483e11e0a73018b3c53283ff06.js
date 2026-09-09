function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "antique_globe_lamp";

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const globe_assembly = new THREE.Group();
  globe_assembly.name = "globe_assembly";
  root.add(globe_assembly);

  const internal_assembly = new THREE.Group();
  internal_assembly.name = "internal_assembly";
  root.add(internal_assembly);

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xa9823f,
    metalness: 0.75,
    roughness: 0.28
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x60451f,
    metalness: 0.7,
    roughness: 0.38
  });
  const wireMat = new THREE.MeshStandardMaterial({
    color: 0x51483b,
    metalness: 0.65,
    roughness: 0.45
  });
  const agedWireMat = new THREE.MeshStandardMaterial({
    color: 0x8a7a61,
    metalness: 0.55,
    roughness: 0.5
  });
  const insulatorMat = new THREE.MeshStandardMaterial({
    color: 0x242321,
    metalness: 0.2,
    roughness: 0.75
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeedd,
    metalness: 0.0,
    roughness: 0.03,
    transmission: 0.98,
    thickness: 0.015,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const glassHighlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  function makeTube(points, radius, material, segments) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal",
      0.5
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      segments || 32,
      radius,
      8,
      false
    );
    return new THREE.Mesh(geometry, material);
  }

  const base_plinthProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.38, 0.0),
    new THREE.Vector2(0.43, 0.025),
    new THREE.Vector2(0.45, 0.07),
    new THREE.Vector2(0.45, 0.14),
    new THREE.Vector2(0.42, 0.19),
    new THREE.Vector2(0.34, 0.23),
    new THREE.Vector2(0.3, 0.29),
    new THREE.Vector2(0.27, 0.36),
    new THREE.Vector2(0.0, 0.36)
  ];
  const base_plinthGeom = new THREE.LatheGeometry(base_plinthProfile, 64);
  const base_plinth = new THREE.Mesh(base_plinthGeom, brassMat);
  base_plinth.name = "base_plinth";
  base_assembly.add(base_plinth);

  const base_edge_ringGeom = new THREE.TorusGeometry(0.405, 0.018, 10, 64);
  const base_edge_ring = new THREE.Mesh(base_edge_ringGeom, darkBrassMat);
  base_edge_ring.name = "base_edge_ring";
  base_edge_ring.rotation.x = Math.PI / 2;
  base_edge_ring.position.y = 0.175;
  base_assembly.add(base_edge_ring);

  const stacked_columnProfile = [
    new THREE.Vector2(0.0, 0.3),
    new THREE.Vector2(0.24, 0.3),
    new THREE.Vector2(0.27, 0.34),
    new THREE.Vector2(0.29, 0.39),
    new THREE.Vector2(0.34, 0.43),
    new THREE.Vector2(0.37, 0.48),
    new THREE.Vector2(0.37, 0.52),
    new THREE.Vector2(0.34, 0.57),
    new THREE.Vector2(0.28, 0.61),
    new THREE.Vector2(0.23, 0.63),
    new THREE.Vector2(0.27, 0.66),
    new THREE.Vector2(0.33, 0.7),
    new THREE.Vector2(0.36, 0.75),
    new THREE.Vector2(0.36, 0.79),
    new THREE.Vector2(0.33, 0.84),
    new THREE.Vector2(0.27, 0.88),
    new THREE.Vector2(0.22, 0.9),
    new THREE.Vector2(0.26, 0.93),
    new THREE.Vector2(0.32, 0.97),
    new THREE.Vector2(0.35, 1.02),
    new THREE.Vector2(0.35, 1.06),
    new THREE.Vector2(0.32, 1.11),
    new THREE.Vector2(0.26, 1.15),
    new THREE.Vector2(0.22, 1.17),
    new THREE.Vector2(0.26, 1.2),
    new THREE.Vector2(0.32, 1.24),
    new THREE.Vector2(0.35, 1.29),
    new THREE.Vector2(0.34, 1.34),
    new THREE.Vector2(0.3, 1.38),
    new THREE.Vector2(0.24, 1.41),
    new THREE.Vector2(0.2, 1.43),
    new THREE.Vector2(0.0, 1.43)
  ];
  const stacked_columnGeom = new THREE.LatheGeometry(stacked_columnProfile, 64);
  const stacked_column = new THREE.Mesh(stacked_columnGeom, brassMat);
  stacked_column.name = "stacked_column";
  base_assembly.add(stacked_column);

  const column_shadow_ringsGeom = new THREE.TorusGeometry(0.245, 0.012, 8, 48);
  const column_shadow_rings = new THREE.InstancedMesh(
    column_shadow_ringsGeom,
    darkBrassMat,
    4
  );
  column_shadow_rings.name = "column_shadow_rings";
  const ring_dummy = new THREE.Object3D();
  const ring_heights = [0.625, 0.895, 1.165, 1.405];
  for (let i = 0; i < ring_heights.length; i++) {
    ring_dummy.position.set(0, ring_heights[i], 0);
    ring_dummy.rotation.set(Math.PI / 2, 0, 0);
    ring_dummy.updateMatrix();
    column_shadow_rings.setMatrixAt(i, ring_dummy.matrix);
  }
  column_shadow_rings.instanceMatrix.needsUpdate = true;
  base_assembly.add(column_shadow_rings);

  const upper_collarProfile = [
    new THREE.Vector2(0.0, 1.38),
    new THREE.Vector2(0.2, 1.38),
    new THREE.Vector2(0.22, 1.42),
    new THREE.Vector2(0.29, 1.45),
    new THREE.Vector2(0.34, 1.48),
    new THREE.Vector2(0.35, 1.53),
    new THREE.Vector2(0.35, 1.59),
    new THREE.Vector2(0.32, 1.63),
    new THREE.Vector2(0.24, 1.66),
    new THREE.Vector2(0.0, 1.66)
  ];
  const upper_collarGeom = new THREE.LatheGeometry(upper_collarProfile, 64);
  const upper_collar = new THREE.Mesh(upper_collarGeom, brassMat);
  upper_collar.name = "upper_collar";
  base_assembly.add(upper_collar);

  const collar_edge_ringGeom = new THREE.TorusGeometry(0.325, 0.018, 10, 64);
  const collar_edge_ring = new THREE.Mesh(collar_edge_ringGeom, darkBrassMat);
  collar_edge_ring.name = "collar_edge_ring";
  collar_edge_ring.rotation.x = Math.PI / 2;
  collar_edge_ring.position.y = 1.585;
  base_assembly.add(collar_edge_ring);

  const socket_bodyGeom = new THREE.CylinderGeometry(0.16, 0.17, 0.34, 48);
  const socket_body = new THREE.Mesh(socket_bodyGeom, brassMat);
  socket_body.name = "socket_body";
  socket_body.position.y = 1.82;
  base_assembly.add(socket_body);

  const socket_lower_ringGeom = new THREE.TorusGeometry(0.165, 0.014, 8, 48);
  const socket_lower_ring = new THREE.Mesh(socket_lower_ringGeom, darkBrassMat);
  socket_lower_ring.name = "socket_lower_ring";
  socket_lower_ring.rotation.x = Math.PI / 2;
  socket_lower_ring.position.y = 1.66;
  base_assembly.add(socket_lower_ring);

  const socket_top_plateGeom = new THREE.CylinderGeometry(0.2, 0.18, 0.045, 48);
  const socket_top_plate = new THREE.Mesh(socket_top_plateGeom, brassMat);
  socket_top_plate.name = "socket_top_plate";
  socket_top_plate.position.y = 2.0;
  base_assembly.add(socket_top_plate);

  const socket_top_ringGeom = new THREE.TorusGeometry(0.18, 0.014, 8, 48);
  const socket_top_ring = new THREE.Mesh(socket_top_ringGeom, darkBrassMat);
  socket_top_ring.name = "socket_top_ring";
  socket_top_ring.rotation.x = Math.PI / 2;
  socket_top_ring.position.y = 2.025;
  base_assembly.add(socket_top_ring);

  const socket_switch_bezelGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.018, 24);
  const socket_switch_bezel = new THREE.Mesh(socket_switch_bezelGeom, insulatorMat);
  socket_switch_bezel.name = "socket_switch_bezel";
  socket_switch_bezel.rotation.z = Math.PI / 2;
  socket_switch_bezel.position.set(0.171, 1.84, 0.025);
  base_assembly.add(socket_switch_bezel);

  const socket_switch_stemGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.075, 16);
  const socket_switch_stem = new THREE.Mesh(socket_switch_stemGeom, wireMat);
  socket_switch_stem.name = "socket_switch_stem";
  socket_switch_stem.rotation.z = Math.PI / 2;
  socket_switch_stem.position.set(0.215, 1.84, 0.025);
  base_assembly.add(socket_switch_stem);

  const socket_switch_knobGeom = new THREE.SphereGeometry(0.026, 20, 12);
  const socket_switch_knob = new THREE.Mesh(socket_switch_knobGeom, insulatorMat);
  socket_switch_knob.name = "socket_switch_knob";
  socket_switch_knob.position.set(0.26, 1.84, 0.025);
  base_assembly.add(socket_switch_knob);

  const glass_globeProfile = [
    new THREE.Vector2(0.22, 1.62),
    new THREE.Vector2(0.31, 1.67),
    new THREE.Vector2(0.43, 1.76),
    new THREE.Vector2(0.55, 1.9),
    new THREE.Vector2(0.64, 2.08),
    new THREE.Vector2(0.69, 2.29),
    new THREE.Vector2(0.7, 2.5),
    new THREE.Vector2(0.67, 2.7),
    new THREE.Vector2(0.6, 2.89),
    new THREE.Vector2(0.49, 3.05),
    new THREE.Vector2(0.34, 3.16),
    new THREE.Vector2(0.2, 3.21),
    new THREE.Vector2(0.15, 3.24),
    new THREE.Vector2(0.15, 3.29),
    new THREE.Vector2(0.12, 3.31),
    new THREE.Vector2(0.095, 3.29),
    new THREE.Vector2(0.1, 3.25),
    new THREE.Vector2(0.18, 3.2),
    new THREE.Vector2(0.33, 3.13),
    new THREE.Vector2(0.47, 3.02),
    new THREE.Vector2(0.58, 2.86),
    new THREE.Vector2(0.65, 2.67),
    new THREE.Vector2(0.68, 2.49),
    new THREE.Vector2(0.67, 2.3),
    new THREE.Vector2(0.62, 2.11),
    new THREE.Vector2(0.53, 1.94),
    new THREE.Vector2(0.41, 1.79),
    new THREE.Vector2(0.29, 1.69),
    new THREE.Vector2(0.21, 1.64),
    new THREE.Vector2(0.22, 1.62)
  ];
  const glass_globeGeom = new THREE.LatheGeometry(glass_globeProfile, 72);
  const glass_globe = new THREE.Mesh(glass_globeGeom, glassMat);
  glass_globe.name = "glass_globe";
  glass_globe.renderOrder = 2;
  globe_assembly.add(glass_globe);

  const glass_lipGeom = new THREE.TorusGeometry(0.122, 0.012, 10, 64);
  const glass_lip = new THREE.Mesh(glass_lipGeom, glassMat);
  glass_lip.name = "glass_lip";
  glass_lip.rotation.x = Math.PI / 2;
  glass_lip.position.y = 3.292;
  glass_lip.renderOrder = 2;
  globe_assembly.add(glass_lip);

  const glass_base_sealGeom = new THREE.TorusGeometry(0.218, 0.009, 8, 56);
  const glass_base_seal = new THREE.Mesh(glass_base_sealGeom, glassMat);
  glass_base_seal.name = "glass_base_seal";
  glass_base_seal.rotation.x = Math.PI / 2;
  glass_base_seal.position.y = 1.635;
  glass_base_seal.renderOrder = 2;
  globe_assembly.add(glass_base_seal);

  const glass_highlight_leftGeom = new THREE.CircleGeometry(0.12, 32);
  const glass_highlight_left = new THREE.Mesh(
    glass_highlight_leftGeom,
    glassHighlightMat
  );
  glass_highlight_left.name = "glass_highlight_left";
  glass_highlight_left.position.set(-0.34, 2.55, 0.61);
  glass_highlight_left.scale.set(0.65, 1.8, 1);
  glass_highlight_left.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(-0.47, 0.08, 0.88).normalize()
  );
  glass_highlight_left.renderOrder = 3;
  globe_assembly.add(glass_highlight_left);

  const glass_highlight_rightGeom = new THREE.CircleGeometry(0.1, 32);
  const glass_highlight_right = new THREE.Mesh(
    glass_highlight_rightGeom,
    glassHighlightMat
  );
  glass_highlight_right.name = "glass_highlight_right";
  glass_highlight_right.position.set(0.39, 2.48, 0.58);
  glass_highlight_right.scale.set(0.55, 1.55, 1);
  glass_highlight_right.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0.52, 0.02, 0.85).normalize()
  );
  glass_highlight_right.renderOrder = 3;
  globe_assembly.add(glass_highlight_right);

  const central_electrodeGeom = new THREE.CylinderGeometry(0.012, 0.012, 1.18, 16);
  const central_electrode = new THREE.Mesh(central_electrodeGeom, wireMat);
  central_electrode.name = "central_electrode";
  central_electrode.position.y = 2.59;
  internal_assembly.add(central_electrode);

  const lower_insulatorGeom = new THREE.CylinderGeometry(0.075, 0.09, 0.11, 32);
  const lower_insulator = new THREE.Mesh(lower_insulatorGeom, glassMat);
  lower_insulator.name = "lower_insulator";
  lower_insulator.position.y = 2.08;
  lower_insulator.renderOrder = 2;
  internal_assembly.add(lower_insulator);

  const lower_insulator_capGeom = new THREE.SphereGeometry(0.075, 24, 14);
  const lower_insulator_cap = new THREE.Mesh(lower_insulator_capGeom, glassMat);
  lower_insulator_cap.name = "lower_insulator_cap";
  lower_insulator_cap.position.y = 2.14;
  lower_insulator_cap.scale.set(1, 0.55, 1);
  lower_insulator_cap.renderOrder = 2;
  internal_assembly.add(lower_insulator_cap);

  const lower_support_ringGeom = new THREE.TorusGeometry(0.135, 0.008, 8, 48);
  const lower_support_ring = new THREE.Mesh(lower_support_ringGeom, agedWireMat);
  lower_support_ring.name = "lower_support_ring";
  lower_support_ring.rotation.x = Math.PI / 2;
  lower_support_ring.position.y = 2.055;
  internal_assembly.add(lower_support_ring);

  const filament_cupProfile = [
    new THREE.Vector2(0.0, -0.09),
    new THREE.Vector2(0.025, -0.085),
    new THREE.Vector2(0.055, -0.055),
    new THREE.Vector2(0.085, 0.0),
    new THREE.Vector2(0.095, 0.045),
    new THREE.Vector2(0.075, 0.075),
    new THREE.Vector2(0.0, 0.08)
  ];
  const filament_cupGeom = new THREE.LatheGeometry(filament_cupProfile, 40);
  const filament_cup = new THREE.Mesh(filament_cupGeom, glassMat);
  filament_cup.name = "filament_cup";
  filament_cup.position.y = 2.43;
  filament_cup.renderOrder = 2;
  internal_assembly.add(filament_cup);

  const filament_glowGeom = new THREE.SphereGeometry(0.035, 20, 12);
  const filament_glow = new THREE.Mesh(filament_glowGeom, brassMat);
  filament_glow.name = "filament_glow";
  filament_glow.position.y = 2.43;
  filament_glow.scale.set(1.25, 0.65, 1.25);
  internal_assembly.add(filament_glow);

  const top_crossbarGeom = new THREE.CylinderGeometry(0.008, 0.008, 0.38, 12);
  const top_crossbar = new THREE.Mesh(top_crossbarGeom, agedWireMat);
  top_crossbar.name = "top_crossbar";
  top_crossbar.rotation.z = Math.PI / 2;
  top_crossbar.position.y = 2.91;
  internal_assembly.add(top_crossbar);

  const top_depth_barGeom = new THREE.CylinderGeometry(0.007, 0.007, 0.22, 12);
  const top_depth_bar = new THREE.Mesh(top_depth_barGeom, agedWireMat);
  top_depth_bar.name = "top_depth_bar";
  top_depth_bar.rotation.x = Math.PI / 2;
  top_depth_bar.position.y = 2.91;
  internal_assembly.add(top_depth_bar);

  const top_hookGeom = new THREE.TorusGeometry(0.035, 0.006, 8, 24, Math.PI * 1.55);
  const top_hook = new THREE.Mesh(top_hookGeom, agedWireMat);
  top_hook.name = "top_hook";
  top_hook.position.set(-0.075, 2.91, 0.015);
  top_hook.rotation.z = -0.45;
  internal_assembly.add(top_hook);

  const left_curved_support = makeTube(
    [
      new THREE.Vector3(-0.12, 2.04, 0.02),
      new THREE.Vector3(-0.19, 2.25, 0.025),
      new THREE.Vector3(-0.2, 2.5, 0.02),
      new THREE.Vector3(-0.16, 2.72, 0.015),
      new THREE.Vector3(-0.13, 2.9, 0.01)
    ],
    0.008,
    wireMat,
    40
  );
  left_curved_support.name = "left_curved_support";
  internal_assembly.add(left_curved_support);

  const right_curved_support = makeTube(
    [
      new THREE.Vector3(0.12, 2.04, 0.02),
      new THREE.Vector3(0.19, 2.25, 0.025),
      new THREE.Vector3(0.2, 2.5, 0.02),
      new THREE.Vector3(0.16, 2.72, 0.015),
      new THREE.Vector3(0.13, 2.9, 0.01)
    ],
    0.008,
    wireMat,
    40
  );
  right_curved_support.name = "right_curved_support";
  internal_assembly.add(right_curved_support);

  const left_tension_wire = makeTube(
    [
      new THREE.Vector3(-0.13, 2.04, 0.015),
      new THREE.Vector3(-0.145, 2.35, 0.018),
      new THREE.Vector3(-0.16, 2.63, 0.015),
      new THREE.Vector3(-0.16, 2.9, 0.01)
    ],
    0.004,
    agedWireMat,
    28
  );
  left_tension_wire.name = "left_tension_wire";
  internal_assembly.add(left_tension_wire);

  const right_tension_wire = makeTube(
    [
      new THREE.Vector3(0.13, 2.04, 0.015),
      new THREE.Vector3(0.145, 2.35, 0.018),
      new THREE.Vector3(0.16, 2.63, 0.015),
      new THREE.Vector3(0.16, 2.9, 0.01)
    ],
    0.004,
    agedWireMat,
    28
  );
  right_tension_wire.name = "right_tension_wire";
  internal_assembly.add(right_tension_wire);

  const rear_tension_wire = makeTube(
    [
      new THREE.Vector3(0.0, 2.04, -0.12),
      new THREE.Vector3(0.015, 2.34, -0.14),
      new THREE.Vector3(0.0, 2.63, -0.12),
      new THREE.Vector3(0.0, 2.9, -0.1)
    ],
    0.004,
    agedWireMat,
    28
  );
  rear_tension_wire.name = "rear_tension_wire";
  internal_assembly.add(rear_tension_wire);

  const lower_brace_left = makeTube(
    [
      new THREE.Vector3(-0.13, 2.04, 0.015),
      new THREE.Vector3(-0.1, 2.1, 0.02),
      new THREE.Vector3(-0.055, 2.12, 0.02)
    ],
    0.006,
    agedWireMat,
    12
  );
  lower_brace_left.name = "lower_brace_left";
  internal_assembly.add(lower_brace_left);

  const lower_brace_right = makeTube(
    [
      new THREE.Vector3(0.13, 2.04, 0.015),
      new THREE.Vector3(0.1, 2.1, 0.02),
      new THREE.Vector3(0.055, 2.12, 0.02)
    ],
    0.006,
    agedWireMat,
    12
  );
  lower_brace_right.name = "lower_brace_right";
  internal_assembly.add(lower_brace_right);

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
