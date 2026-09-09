function __sn17_user(THREE) {
  const root = new THREE.Group();

  const hull_white_mat = new THREE.MeshStandardMaterial({
    color: 0xf2f1e9,
    metalness: 0.0,
    roughness: 0.35,
    side: THREE.DoubleSide,
  });
  const lower_hull_mat = new THREE.MeshStandardMaterial({
    color: 0x6b4d49,
    metalness: 0.0,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });
  const red_stripe_mat = new THREE.MeshStandardMaterial({
    color: 0xb71922,
    metalness: 0.0,
    roughness: 0.35,
    side: THREE.DoubleSide,
  });
  const cockpit_mat = new THREE.MeshStandardMaterial({
    color: 0xd8d8cf,
    metalness: 0.0,
    roughness: 0.55,
  });
  const dark_trim_mat = new THREE.MeshStandardMaterial({
    color: 0x1f2525,
    metalness: 0.0,
    roughness: 0.65,
  });
  const window_mat = new THREE.MeshPhysicalMaterial({
    color: 0x526366,
    transparent: true,
    opacity: 0.72,
    metalness: 0.0,
    roughness: 0.15,
    side: THREE.DoubleSide,
  });
  const rail_mat = new THREE.MeshStandardMaterial({
    color: 0xc5c8c8,
    metalness: 0.5,
    roughness: 0.25,
  });
  const registration_mat = new THREE.MeshStandardMaterial({
    color: 0xf8f8f2,
    metalness: 0.0,
    roughness: 0.35,
  });

  const hull_sections = [
    { z: -2.75, w: 0.58, top: 0.48, water: -0.12, bottom: -0.36 },
    { z: -2.20, w: 0.68, top: 0.50, water: -0.15, bottom: -0.48 },
    { z: -1.20, w: 0.74, top: 0.52, water: -0.16, bottom: -0.58 },
    { z:  0.00, w: 0.76, top: 0.54, water: -0.14, bottom: -0.62 },
    { z:  1.00, w: 0.70, top: 0.57, water: -0.08, bottom: -0.52 },
    { z:  1.80, w: 0.55, top: 0.61, water:  0.04, bottom: -0.28 },
    { z:  2.45, w: 0.28, top: 0.65, water:  0.22, bottom:  0.08 },
    { z:  2.85, w: 0.035, top: 0.67, water: 0.48, bottom: 0.46 },
  ];

  function sectionAt(z) {
    if (z <= hull_sections[0].z) return hull_sections[0];
    const last = hull_sections[hull_sections.length - 1];
    if (z >= last.z) return last;
    for (let i = 0; i < hull_sections.length - 1; i++) {
      const a = hull_sections[i];
      const b = hull_sections[i + 1];
      if (z >= a.z && z <= b.z) {
        const t = (z - a.z) / (b.z - a.z);
        return {
          z,
          w: a.w + (b.w - a.w) * t,
          top: a.top + (b.top - a.top) * t,
          water: a.water + (b.water - a.water) * t,
          bottom: a.bottom + (b.bottom - a.bottom) * t,
        };
      }
    }
    return last;
  }

  function createHullGeometry(lowerOnly) {
    const positions = [];
    const indices = [];
    const ringSize = lowerOnly ? 4 : 5;

    for (const s of hull_sections) {
      if (lowerOnly) {
        positions.push(-s.w * 0.96, s.water, s.z);
        positions.push(-s.w * 0.42, (s.water + s.bottom) * 0.5, s.z);
        positions.push(s.w * 0.42, (s.water + s.bottom) * 0.5, s.z);
        positions.push(s.w * 0.96, s.water, s.z);
      } else {
        positions.push(-s.w, s.top, s.z);
        positions.push(-s.w * 0.98, s.water, s.z);
        positions.push(0, s.bottom, s.z);
        positions.push(s.w * 0.98, s.water, s.z);
        positions.push(s.w, s.top, s.z);
      }
    }

    for (let i = 0; i < hull_sections.length - 1; i++) {
      for (let j = 0; j < ringSize - 1; j++) {
        const a = i * ringSize + j;
        const b = a + 1;
        const c = (i + 1) * ringSize + j;
        const d = c + 1;
        indices.push(a, c, b, b, c, d);
      }
    }

    const back = 0;
    const front = (hull_sections.length - 1) * ringSize;
    for (let j = 1; j < ringSize - 1; j++) {
      indices.push(back, back + j, back + j + 1);
      indices.push(front, front + j + 1, front + j);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  function createSideBandGeometry(side, topOffset, bottomOffset) {
    const positions = [];
    const indices = [];
    for (const s of hull_sections) {
      const x = side * (s.w + 0.014);
      positions.push(x, s.top - topOffset, s.z);
      positions.push(x, s.top - bottomOffset, s.z);
    }
    for (let i = 0; i < hull_sections.length - 1; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      if (side > 0) indices.push(a, b, c, b, d, c);
      else indices.push(a, c, b, b, c, d);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  function addTube(parent, p1, p2, radius, mat) {
    const tubeGeom = new THREE.TubeGeometry(
      new THREE.LineCurve3(p1, p2),
      1,
      radius,
      8,
      false
    );
    const tube = new THREE.Mesh(tubeGeom, mat);
    parent.add(tube);
    return tube;
  }

  function addPathTube(parent, points, radius, mat) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const tubeGeom = new THREE.TubeGeometry(curve, 24, radius, 8, false);
    const tube = new THREE.Mesh(tubeGeom, mat);
    parent.add(tube);
    return tube;
  }

  function createQuadGeometry(points) {
    const positions = [];
    for (const p of points) positions.push(p.x, p.y, p.z);
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex([0, 1, 2, 0, 2, 3]);
    geom.computeVertexNormals();
    return geom;
  }

  function createSideWindowGeometry(side) {
    const positions = [
      side * 0.735, 0.70, -0.42,
      side * 0.735, 0.69,  0.48,
      side * 0.735, 1.18,  0.34,
      side * 0.735, 1.18, -0.28,
    ];
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(side > 0 ? [0, 1, 2, 0, 2, 3] : [0, 2, 1, 0, 3, 2]);
    geom.computeVertexNormals();
    return geom;
  }

  const upper_hull_geom = createHullGeometry(false);
  const upper_hull = new THREE.Mesh(upper_hull_geom, hull_white_mat);
  root.add(upper_hull);

  const lower_hull_geom = createHullGeometry(true);
  const lower_hull = new THREE.Mesh(lower_hull_geom, lower_hull_mat);
  root.add(lower_hull);

  const port_red_upper_stripe_geom = createSideBandGeometry(-1, 0.17, 0.29);
  const port_red_upper_stripe = new THREE.Mesh(port_red_upper_stripe_geom, red_stripe_mat);
  root.add(port_red_upper_stripe);

  const starboard_red_upper_stripe_geom = createSideBandGeometry(1, 0.17, 0.29);
  const starboard_red_upper_stripe = new THREE.Mesh(starboard_red_upper_stripe_geom, red_stripe_mat);
  root.add(starboard_red_upper_stripe);

  const port_red_lower_stripe_geom = createSideBandGeometry(-1, 0.37, 0.415);
  const port_red_lower_stripe = new THREE.Mesh(port_red_lower_stripe_geom, red_stripe_mat);
  root.add(port_red_lower_stripe);

  const starboard_red_lower_stripe_geom = createSideBandGeometry(1, 0.37, 0.415);
  const starboard_red_lower_stripe = new THREE.Mesh(starboard_red_lower_stripe_geom, red_stripe_mat);
  root.add(starboard_red_lower_stripe);

  const cabin_base_geom = new THREE.BoxGeometry(1.34, 0.34, 1.30);
  const cabin_base = new THREE.Mesh(cabin_base_geom, hull_white_mat);
  cabin_base.position.set(0, 0.69, -0.02);
  root.add(cabin_base);

  const cabin_roof_geom = new THREE.BoxGeometry(1.22, 0.13, 1.10);
  const cabin_roof = new THREE.Mesh(cabin_roof_geom, hull_white_mat);
  cabin_roof.position.set(0, 1.20, -0.05);
  root.add(cabin_roof);

  const cabin_front_window_geom = createQuadGeometry([
    new THREE.Vector3(-0.50, 0.78, 0.655),
    new THREE.Vector3(0.50, 0.78, 0.655),
    new THREE.Vector3(0.43, 1.13, 0.555),
    new THREE.Vector3(-0.43, 1.13, 0.555),
  ]);
  const cabin_front_window = new THREE.Mesh(cabin_front_window_geom, window_mat);
  root.add(cabin_front_window);

  const port_side_window_geom = createSideWindowGeometry(-1);
  const port_side_window = new THREE.Mesh(port_side_window_geom, window_mat);
  root.add(port_side_window);

  const starboard_side_window_geom = createSideWindowGeometry(1);
  const starboard_side_window = new THREE.Mesh(starboard_side_window_geom, window_mat);
  root.add(starboard_side_window);

  const cabin_door_geom = new THREE.BoxGeometry(0.035, 0.48, 0.34);
  const port_cabin_door = new THREE.Mesh(cabin_door_geom, hull_white_mat);
  port_cabin_door.position.set(-0.69, 0.73, -0.55);
  root.add(port_cabin_door);

  const starboard_cabin_door = new THREE.Mesh(cabin_door_geom, hull_white_mat);
  starboard_cabin_door.position.set(0.69, 0.73, -0.55);
  root.add(starboard_cabin_door);

  const cockpit_well_geom = new THREE.BoxGeometry(1.08, 0.055, 1.42);
  const cockpit_well = new THREE.Mesh(cockpit_well_geom, cockpit_mat);
  cockpit_well.position.set(0, 0.565, -1.48);
  root.add(cockpit_well);

  const cockpit_port_coaming_geom = new THREE.BoxGeometry(0.08, 0.18, 1.55);
  const cockpit_port_coaming = new THREE.Mesh(cockpit_port_coaming_geom, hull_white_mat);
  cockpit_port_coaming.position.set(-0.62, 0.62, -1.48);
  root.add(cockpit_port_coaming);

  const cockpit_starboard_coaming_geom = new THREE.BoxGeometry(0.08, 0.18, 1.55);
  const cockpit_starboard_coaming = new THREE.Mesh(cockpit_starboard_coaming_geom, hull_white_mat);
  cockpit_starboard_coaming.position.set(0.62, 0.62, -1.48);
  root.add(cockpit_starboard_coaming);

  const cockpit_rear_coaming_geom = new THREE.BoxGeometry(1.24, 0.18, 0.08);
  const cockpit_rear_coaming = new THREE.Mesh(cockpit_rear_coaming_geom, hull_white_mat);
  cockpit_rear_coaming.position.set(0, 0.62, -2.25);
  root.add(cockpit_rear_coaming);

  const rear_hatch_geom = new THREE.BoxGeometry(0.72, 0.07, 0.38);
  const rear_hatch = new THREE.Mesh(rear_hatch_geom, cockpit_mat);
  rear_hatch.position.set(0, 0.66, -1.62);
  root.add(rear_hatch);

  const bow_hatch_geom = new THREE.BoxGeometry(0.48, 0.045, 0.34);
  const bow_hatch = new THREE.Mesh(bow_hatch_geom, cockpit_mat);
  bow_hatch.position.set(0, 0.64, 1.52);
  root.add(bow_hatch);

  const port_round_port_geom = new THREE.CylinderGeometry(0.075, 0.075, 0.025, 24);
  const port_round_port = new THREE.Mesh(port_round_port_geom, dark_trim_mat);
  port_round_port.rotation.z = Math.PI / 2;
  port_round_port.position.set(-0.715, 0.48, 0.92);
  root.add(port_round_port);

  const starboard_round_port_geom = new THREE.CylinderGeometry(0.075, 0.075, 0.025, 24);
  const starboard_round_port = new THREE.Mesh(starboard_round_port_geom, dark_trim_mat);
  starboard_round_port.rotation.z = Math.PI / 2;
  starboard_round_port.position.set(0.715, 0.48, 0.92);
  root.add(starboard_round_port);

  const port_bow_rail = new THREE.Group();
  root.add(port_bow_rail);
  const starboard_bow_rail = new THREE.Group();
  root.add(starboard_bow_rail);

  for (const side of [-1, 1]) {
    const rail_group = side < 0 ? port_bow_rail : starboard_bow_rail;
    const top_points = [
      new THREE.Vector3(side * 0.62, 1.12, 0.48),
      new THREE.Vector3(side * 0.60, 1.18, 1.18),
      new THREE.Vector3(side * 0.47, 1.13, 2.05),
      new THREE.Vector3(side * 0.20, 1.02, 2.55),
    ];
    const mid_points = [
      new THREE.Vector3(side * 0.62, 0.91, 0.48),
      new THREE.Vector3(side * 0.60, 0.98, 1.18),
      new THREE.Vector3(side * 0.47, 0.94, 2.05),
    ];
    addPathTube(rail_group, top_points, 0.018, rail_mat);
    addPathTube(rail_group, mid_points, 0.014, rail_mat);
    for (let i = 0; i < top_points.length; i++) {
      const base = sectionAt(top_points[i].z);
      addTube(
        rail_group,
        new THREE.Vector3(top_points[i].x, top_points[i].y, top_points[i].z),
        new THREE.Vector3(side * base.w * 0.98, base.top + 0.01, top_points[i].z),
        0.015,
        rail_mat
      );
    }
  }

  const bow_cross_rail_geom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-0.20, 1.02, 2.55),
      new THREE.Vector3(0.20, 1.02, 2.55)
    ),
    1,
    0.018,
    8,
    false
  );
  const bow_cross_rail = new THREE.Mesh(bow_cross_rail_geom, rail_mat);
  root.add(bow_cross_rail);

  const port_stern_rail = new THREE.Group();
  root.add(port_stern_rail);
  const starboard_stern_rail = new THREE.Group();
  root.add(starboard_stern_rail);

  for (const side of [-1, 1]) {
    const rail_group = side < 0 ? port_stern_rail : starboard_stern_rail;
    addTube(
      rail_group,
      new THREE.Vector3(side * 0.61, 0.58, -2.38),
      new THREE.Vector3(side * 0.61, 1.05, -2.38),
      0.018,
      rail_mat
    );
    addTube(
      rail_group,
      new THREE.Vector3(side * 0.61, 1.05, -2.38),
      new THREE.Vector3(side * 0.57, 1.05, -2.66),
      0.018,
      rail_mat
    );
    addTube(
      rail_group,
      new THREE.Vector3(side * 0.57, 1.05, -2.66),
      new THREE.Vector3(side * 0.57, 0.60, -2.66),
      0.018,
      rail_mat
    );
  }

  const stern_cross_rail_geom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-0.57, 1.05, -2.66),
      new THREE.Vector3(0.57, 1.05, -2.66)
    ),
    1,
    0.018,
    8,
    false
  );
  const stern_cross_rail = new THREE.Mesh(stern_cross_rail_geom, rail_mat);
  root.add(stern_cross_rail);

  const radar_base_geom = new THREE.CylinderGeometry(0.18, 0.20, 0.08, 28);
  const radar_base = new THREE.Mesh(radar_base_geom, cockpit_mat);
  radar_base.position.set(0, 1.31, -0.05);
  root.add(radar_base);

  const radar_dome_geom = new THREE.SphereGeometry(0.18, 28, 14);
  const radar_dome = new THREE.Mesh(radar_dome_geom, hull_white_mat);
  radar_dome.scale.set(1.0, 0.42, 1.0);
  radar_dome.position.set(0, 1.39, -0.05);
  root.add(radar_dome);

  const antenna_mast_geom = new THREE.CylinderGeometry(0.018, 0.018, 0.42, 10);
  const antenna_mast = new THREE.Mesh(antenna_mast_geom, rail_mat);
  antenna_mast.position.set(-0.34, 1.50, 0.18);
  antenna_mast.rotation.z = -0.18;
  root.add(antenna_mast);

  const antenna_tip_geom = new THREE.SphereGeometry(0.035, 12, 8);
  const antenna_tip = new THREE.Mesh(antenna_tip_geom, dark_trim_mat);
  antenna_tip.position.set(-0.38, 1.72, 0.18);
  root.add(antenna_tip);

  const cleat_geom = new THREE.BoxGeometry(0.16, 0.035, 0.04);
  const bow_cleats = new THREE.InstancedMesh(cleat_geom, rail_mat, 2);
  const cleat_dummy = new THREE.Object3D();
  cleat_dummy.position.set(-0.22, 0.69, 2.28);
  cleat_dummy.rotation.y = Math.PI / 2;
  cleat_dummy.updateMatrix();
  bow_cleats.setMatrixAt(0, cleat_dummy.matrix);
  cleat_dummy.position.set(0.22, 0.69, 2.28);
  cleat_dummy.rotation.y = Math.PI / 2;
  cleat_dummy.updateMatrix();
  bow_cleats.setMatrixAt(1, cleat_dummy.matrix);
  root.add(bow_cleats);

  const registration_marks = new THREE.Group();
  root.add(registration_marks);
  const mark_bar_geom = new THREE.BoxGeometry(0.018, 0.075, 0.025);
  const mark_z = [1.55, 1.62, 1.69, 1.76, 1.83];
  for (const side of [-1, 1]) {
    for (let i = 0; i < mark_z.length; i++) {
      const mark = new THREE.Mesh(mark_bar_geom, registration_mat);
      mark.position.set(side * 0.665, 0.36, mark_z[i]);
      mark.rotation.x = i % 2 === 0 ? 0.25 : -0.25;
      registration_marks.add(mark);
    }
    const mark_underline_geom = new THREE.BoxGeometry(0.018, 0.018, 0.34);
    const mark_underline = new THREE.Mesh(mark_underline_geom, registration_mat);
    mark_underline.position.set(side * 0.665, 0.31, 1.69);
    registration_marks.add(mark_underline);
  }

  const rudder_geom = new THREE.BoxGeometry(0.08, 0.38, 0.20);
  const rudder = new THREE.Mesh(rudder_geom, red_stripe_mat);
  rudder.position.set(0, -0.42, -2.72);
  rudder.rotation.x = -0.12;
  root.add(rudder);

  const propeller_hub_geom = new THREE.CylinderGeometry(0.045, 0.045, 0.18, 16);
  const propeller_hub = new THREE.Mesh(propeller_hub_geom, dark_trim_mat);
  propeller_hub.rotation.x = Math.PI / 2;
  propeller_hub.position.set(0, -0.38, -2.88);
  root.add(propeller_hub);

  const keel_shadow_geom = new THREE.BoxGeometry(0.12, 0.035, 3.6);
  const keel_shadow = new THREE.Mesh(keel_shadow_geom, dark_trim_mat);
  keel_shadow.position.set(0, -0.61, -0.15);
  root.add(keel_shadow);

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
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.98 / maxDim;
  root.scale.setScalar(scale);
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
