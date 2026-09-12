// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rustic_velvet_armchair";

  const wood_frame = new THREE.Group();
  wood_frame.name = "wood_frame";
  root.add(wood_frame);

  const upholstery = new THREE.Group();
  upholstery.name = "upholstery";
  root.add(upholstery);

  const seatW = 1.12;
  const seatD = 0.92;
  const seatH = 0.69;
  const cushionH = 0.25;
  const backH = 1.02;
  const armW = 0.28;
  const armH = 0.20;
  const legH = 1.18;
  const moduleCount = 1;
  const cushionModuleW = seatW / moduleCount;

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0x17191c,
    metalness: 0.0,
    roughness: 0.95
  });
  const fabricTopMat = new THREE.MeshStandardMaterial({
    color: 0x1d2024,
    metalness: 0.0,
    roughness: 0.95
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x090a0c,
    metalness: 0.0,
    roughness: 0.95
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x292724,
    metalness: 0.0,
    roughness: 0.9
  });
  const wornWoodMat = new THREE.MeshStandardMaterial({
    color: 0x8b6748,
    metalness: 0.0,
    roughness: 0.9
  });
  const fastenerMat = new THREE.MeshStandardMaterial({
    color: 0x5b3d2b,
    metalness: 0.5,
    roughness: 0.5
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const hw = width / 2;
    const hh = height / 2;
    const r = Math.min(radius, hw, hh);

    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
    shape.lineTo(hw, hh - r);
    shape.quadraticCurveTo(hw, hh, hw - r, hh);
    shape.lineTo(-hw + r, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
    shape.lineTo(-hw, -hh + r);
    shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
    shape.closePath();
    return shape;
  }

  function roundedExtrudeGeometry(width, height, depth, radius, bevel) {
    const shape = roundedRectShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function roundedLoopXY(width, height, radius, z) {
    const points = [];
    const hw = width / 2;
    const hh = height / 2;
    const corners = [
      [hw - radius, hh - radius, 0, Math.PI / 2],
      [-hw + radius, hh - radius, Math.PI / 2, Math.PI],
      [-hw + radius, -hh + radius, Math.PI, Math.PI * 1.5],
      [hw - radius, -hh + radius, Math.PI * 1.5, Math.PI * 2]
    ];

    for (let c = 0; c < corners.length; c++) {
      const corner = corners[c];
      for (let i = 0; i < 5; i++) {
        const t = i / 4;
        const angle = corner[2] + (corner[3] - corner[2]) * t;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          corner[1] + Math.sin(angle) * radius,
          z
        ));
      }
    }
    return points;
  }

  function roundedLoopXZ(width, depth, radius, y) {
    const points = [];
    const hw = width / 2;
    const hd = depth / 2;
    const corners = [
      [hw - radius, hd - radius, 0, Math.PI / 2],
      [-hw + radius, hd - radius, Math.PI / 2, Math.PI],
      [-hw + radius, -hd + radius, Math.PI, Math.PI * 1.5],
      [hw - radius, -hd + radius, Math.PI * 1.5, Math.PI * 2]
    ];

    for (let c = 0; c < corners.length; c++) {
      const corner = corners[c];
      for (let i = 0; i < 5; i++) {
        const t = i / 4;
        const angle = corner[2] + (corner[3] - corner[2]) * t;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          y,
          corner[1] + Math.sin(angle) * radius
        ));
      }
    }
    return points;
  }

  function makeClosedPipe(points, radius, material) {
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, points.length * 2, radius, 8, true),
      material
    );
  }

  const instance_dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    instance_dummy.position.set(x, y, z);
    instance_dummy.rotation.set(rx, ry, rz);
    instance_dummy.scale.set(sx, sy, sz);
    instance_dummy.updateMatrix();
    mesh.setMatrixAt(index, instance_dummy.matrix);
  }

  const front_legGeom = roundedExtrudeGeometry(
    0.14,
    legH,
    0.14,
    0.025,
    0.01
  );

  const front_left_leg = new THREE.Mesh(front_legGeom, woodMat);
  front_left_leg.name = "front_left_leg";
  front_left_leg.position.set(-0.70, legH / 2, 0.50);
  front_left_leg.rotation.z = 0.045;
  wood_frame.add(front_left_leg);

  const front_right_leg = new THREE.Mesh(front_legGeom, woodMat);
  front_right_leg.name = "front_right_leg";
  front_right_leg.position.set(0.70, legH / 2, 0.50);
  front_right_leg.rotation.z = -0.045;
  wood_frame.add(front_right_leg);

  const rear_legGeom = roundedExtrudeGeometry(
    0.14,
    1.40,
    0.14,
    0.025,
    0.01
  );

  const rear_left_leg = new THREE.Mesh(rear_legGeom, woodMat);
  rear_left_leg.name = "rear_left_leg";
  rear_left_leg.position.set(-0.70, 0.70, -0.50);
  rear_left_leg.rotation.x = -0.06;
  wood_frame.add(rear_left_leg);

  const rear_right_leg = new THREE.Mesh(rear_legGeom, woodMat);
  rear_right_leg.name = "rear_right_leg";
  rear_right_leg.position.set(0.70, 0.70, -0.50);
  rear_right_leg.rotation.x = -0.06;
  wood_frame.add(rear_right_leg);

  const side_railGeom = new THREE.BoxGeometry(0.11, 0.16, 1.02);

  const left_side_rail = new THREE.Mesh(side_railGeom, woodMat);
  left_side_rail.name = "left_side_rail";
  left_side_rail.position.set(-0.66, 0.49, 0);
  wood_frame.add(left_side_rail);

  const right_side_rail = new THREE.Mesh(side_railGeom, woodMat);
  right_side_rail.name = "right_side_rail";
  right_side_rail.position.set(0.66, 0.49, 0);
  wood_frame.add(right_side_rail);

  const front_railGeom = new THREE.BoxGeometry(1.34, 0.16, 0.11);
  const front_rail = new THREE.Mesh(front_railGeom, woodMat);
  front_rail.name = "front_rail";
  front_rail.position.set(0, 0.49, 0.50);
  wood_frame.add(front_rail);

  const rear_railGeom = new THREE.BoxGeometry(1.34, 0.15, 0.11);
  const rear_rail = new THREE.Mesh(rear_railGeom, woodMat);
  rear_rail.name = "rear_rail";
  rear_rail.position.set(0, 0.50, -0.50);
  wood_frame.add(rear_rail);

  const back_supportGeom = new THREE.BoxGeometry(0.10, 1.22, 0.10);

  const back_left_support = new THREE.Mesh(back_supportGeom, woodMat);
  back_left_support.name = "back_left_support";
  back_left_support.position.set(-0.66, 1.17, -0.50);
  back_left_support.rotation.x = -0.08;
  wood_frame.add(back_left_support);

  const back_right_support = new THREE.Mesh(back_supportGeom, woodMat);
  back_right_support.name = "back_right_support";
  back_right_support.position.set(0.66, 1.17, -0.50);
  back_right_support.rotation.x = -0.08;
  wood_frame.add(back_right_support);

  const back_top_railGeom = new THREE.BoxGeometry(1.28, 0.11, 0.10);
  const back_top_rail = new THREE.Mesh(back_top_railGeom, woodMat);
  back_top_rail.name = "back_top_rail";
  back_top_rail.position.set(0, 1.72, -0.55);
  wood_frame.add(back_top_rail);

  const arm_supportGeom = new THREE.BoxGeometry(0.10, 0.56, 0.11);

  const left_arm_support = new THREE.Mesh(arm_supportGeom, woodMat);
  left_arm_support.name = "left_arm_support";
  left_arm_support.position.set(-0.68, 0.84, 0.43);
  left_arm_support.rotation.x = 0.08;
  wood_frame.add(left_arm_support);

  const right_arm_support = new THREE.Mesh(arm_supportGeom, woodMat);
  right_arm_support.name = "right_arm_support";
  right_arm_support.position.set(0.68, 0.84, 0.43);
  right_arm_support.rotation.x = 0.08;
  wood_frame.add(right_arm_support);

  const seat_deckGeom = new THREE.BoxGeometry(1.20, 0.07, 0.91);
  const seat_deck = new THREE.Mesh(seat_deckGeom, woodMat);
  seat_deck.name = "seat_deck";
  seat_deck.position.set(0, 0.565, 0.01);
  wood_frame.add(seat_deck);

  const seat_cushionGeom = roundedExtrudeGeometry(
    cushionModuleW,
    cushionH - 0.05,
    seatD,
    0.09,
    0.025
  );
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, fabricMat);
  seat_cushion.name = "seat_cushion";
  seat_cushion.position.set(0, seatH, 0.04);
  upholstery.add(seat_cushion);

  const seat_top_panelGeom = roundedExtrudeGeometry(
    seatW - 0.08,
    0.035,
    seatD - 0.10,
    0.016,
    0.008
  );
  const seat_top_panel = new THREE.Mesh(seat_top_panelGeom, fabricTopMat);
  seat_top_panel.name = "seat_top_panel";
  seat_top_panel.position.set(0, seatH + cushionH / 2 - 0.005, 0.02);
  upholstery.add(seat_top_panel);

  const seat_piping = makeClosedPipe(
    roundedLoopXZ(
      seatW - 0.02,
      seatD - 0.01,
      0.10,
      seatH + cushionH / 2 + 0.004
    ),
    0.009,
    seamMat
  );
  seat_piping.name = "seat_piping";
  seat_piping.position.z = 0.04;
  upholstery.add(seat_piping);

  const seat_front_seamGeom = new THREE.CylinderGeometry(
    0.007,
    0.007,
    seatW - 0.12,
    8
  );
  const seat_front_seam = new THREE.Mesh(seat_front_seamGeom, seamMat);
  seat_front_seam.name = "seat_front_seam";
  seat_front_seam.rotation.z = Math.PI / 2;
  seat_front_seam.position.set(
    0,
    seatH + cushionH * 0.22,
    0.04 + seatD / 2 + 0.008
  );
  upholstery.add(seat_front_seam);

  const back_cushion_group = new THREE.Group();
  back_cushion_group.name = "back_cushion_group";
  back_cushion_group.position.set(0, 1.29, -0.42);
  back_cushion_group.rotation.x = -0.08;
  upholstery.add(back_cushion_group);

  const back_cushionGeom = roundedExtrudeGeometry(
    1.15,
    backH,
    0.18,
    0.12,
    0.025
  );
  const back_cushion = new THREE.Mesh(back_cushionGeom, fabricMat);
  back_cushion.name = "back_cushion";
  back_cushion_group.add(back_cushion);

  const back_cushion_piping = makeClosedPipe(
    roundedLoopXY(1.12, backH - 0.03, 0.11, 0.119),
    0.009,
    seamMat
  );
  back_cushion_piping.name = "back_cushion_piping";
  back_cushion_group.add(back_cushion_piping);

  const back_center_creaseGeom = new THREE.CylinderGeometry(
    0.006,
    0.008,
    0.82,
    8
  );
  const back_center_crease = new THREE.Mesh(
    back_center_creaseGeom,
    seamMat
  );
  back_center_crease.name = "back_center_crease";
  back_center_crease.position.set(0.025, 0.01, 0.121);
  back_center_crease.rotation.z = -0.035;
  back_cushion_group.add(back_center_crease);

  const back_side_creaseGeom = new THREE.CylinderGeometry(
    0.005,
    0.007,
    0.74,
    8
  );
  const back_side_creases = new THREE.InstancedMesh(
    back_side_creaseGeom,
    seamMat,
    2
  );
  back_side_creases.name = "back_side_creases";
  setInstance(
    back_side_creases,
    0,
    -0.49,
    0.01,
    0.121,
    0,
    0,
    -0.055,
    1,
    1,
    1
  );
  setInstance(
    back_side_creases,
    1,
    0.49,
    0.01,
    0.121,
    0,
    0,
    0.055,
    1,
    1,
    1
  );
  back_side_creases.instanceMatrix.needsUpdate = true;
  back_cushion_group.add(back_side_creases);

  const arm_cushionGeom = roundedExtrudeGeometry(
    armW,
    armH - 0.04,
    1.04,
    0.08,
    0.022
  );

  const left_arm_cushion = new THREE.Mesh(arm_cushionGeom, fabricMat);
  left_arm_cushion.name = "left_arm_cushion";
  left_arm_cushion.position.set(-0.70, 1.12, 0.02);
  upholstery.add(left_arm_cushion);

  const right_arm_cushion = new THREE.Mesh(arm_cushionGeom, fabricMat);
  right_arm_cushion.name = "right_arm_cushion";
  right_arm_cushion.position.set(0.70, 1.12, 0.02);
  upholstery.add(right_arm_cushion);

  const arm_top_panelGeom = roundedExtrudeGeometry(
    armW - 0.05,
    0.032,
    0.94,
    0.015,
    0.007
  );

  const left_arm_top_panel = new THREE.Mesh(
    arm_top_panelGeom,
    fabricTopMat
  );
  left_arm_top_panel.name = "left_arm_top_panel";
  left_arm_top_panel.position.set(-0.70, 1.205, 0.02);
  upholstery.add(left_arm_top_panel);

  const right_arm_top_panel = new THREE.Mesh(
    arm_top_panelGeom,
    fabricTopMat
  );
  right_arm_top_panel.name = "right_arm_top_panel";
  right_arm_top_panel.position.set(0.70, 1.205, 0.02);
  upholstery.add(right_arm_top_panel);

  const arm_pipingGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    0.94,
    8
  );
  const arm_outer_piping = new THREE.InstancedMesh(
    arm_pipingGeom,
    seamMat,
    2
  );
  arm_outer_piping.name = "arm_outer_piping";
  setInstance(
    arm_outer_piping,
    0,
    -0.842,
    1.17,
    0.02,
    Math.PI / 2,
    0,
    0,
    1,
    1,
    1
  );
  setInstance(
    arm_outer_piping,
    1,
    0.842,
    1.17,
    0.02,
    Math.PI / 2,
    0,
    0,
    1,
    1,
    1
  );
  arm_outer_piping.instanceMatrix.needsUpdate = true;
  upholstery.add(arm_outer_piping);

  const arm_front_seamGeom = new THREE.CylinderGeometry(
    0.007,
    0.007,
    armW - 0.07,
    8
  );
  const arm_front_seams = new THREE.InstancedMesh(
    arm_front_seamGeom,
    seamMat,
    2
  );
  arm_front_seams.name = "arm_front_seams";
  setInstance(
    arm_front_seams,
    0,
    -0.70,
    1.105,
    0.558,
    0,
    0,
    Math.PI / 2,
    1,
    1,
    1
  );
  setInstance(
    arm_front_seams,
    1,
    0.70,
    1.105,
    0.558,
    0,
    0,
    Math.PI / 2,
    1,
    1,
    1
  );
  arm_front_seams.instanceMatrix.needsUpdate = true;
  upholstery.add(arm_front_seams);

  const front_leg_wearGeom = new THREE.BoxGeometry(0.018, 0.13, 0.007);
  const front_leg_wear = new THREE.InstancedMesh(
    front_leg_wearGeom,
    wornWoodMat,
    12
  );
  front_leg_wear.name = "front_leg_wear";

  const frontLegWearData = [
    [-0.725, 0.22, 0.574, -0.03, 0.75],
    [-0.680, 0.48, 0.574, 0.02, 1.10],
    [-0.715, 0.79, 0.574, -0.01, 0.65],
    [-0.672, 1.02, 0.574, 0.03, 0.90],
    [0.725, 0.18, 0.574, 0.02, 0.70],
    [0.680, 0.43, 0.574, -0.02, 1.00],
    [0.715, 0.72, 0.574, 0.01, 0.60],
    [0.672, 0.98, 0.574, -0.03, 0.85],
    [-0.705, 0.33, -0.574, 0.02, 0.65],
    [-0.680, 0.87, -0.574, -0.02, 0.85],
    [0.705, 0.30, -0.574, -0.02, 0.70],
    [0.680, 0.91, -0.574, 0.02, 0.80]
  ];

  for (let i = 0; i < frontLegWearData.length; i++) {
    const mark = frontLegWearData[i];
    setInstance(
      front_leg_wear,
      i,
      mark[0],
      mark[1],
      mark[2],
      0,
      0,
      mark[3],
      1,
      mark[4],
      1
    );
  }
  front_leg_wear.instanceMatrix.needsUpdate = true;
  wood_frame.add(front_leg_wear);

  const side_leg_wearGeom = new THREE.BoxGeometry(0.007, 0.12, 0.025);
  const side_leg_wear = new THREE.InstancedMesh(
    side_leg_wearGeom,
    wornWoodMat,
    12
  );
  side_leg_wear.name = "side_leg_wear";

  const sideLegWearData = [
    [-0.774, 0.24, 0.515, 0.02, 0.8],
    [-0.774, 0.61, 0.490, -0.02, 1.0],
    [-0.774, 0.96, 0.470, 0.01, 0.7],
    [0.774, 0.20, 0.515, -0.02, 0.7],
    [0.774, 0.55, 0.490, 0.02, 0.9],
    [0.774, 0.90, 0.470, -0.01, 0.75],
    [-0.774, 0.35, -0.515, -0.02, 0.8],
    [-0.774, 0.82, -0.490, 0.02, 0.9],
    [0.774, 0.31, -0.515, 0.02, 0.7],
    [0.774, 0.78, -0.490, -0.02, 0.85],
    [-0.774, 1.22, -0.475, 0.01, 0.65],
    [0.774, 1.22, -0.475, -0.01, 0.65]
  ];

  for (let i = 0; i < sideLegWearData.length; i++) {
    const mark = sideLegWearData[i];
    setInstance(
      side_leg_wear,
      i,
      mark[0],
      mark[1],
      mark[2],
      mark[3],
      0,
      0,
      1,
      mark[4],
      1
    );
  }
  side_leg_wear.instanceMatrix.needsUpdate = true;
  wood_frame.add(side_leg_wear);

  const rail_wearGeom = new THREE.BoxGeometry(0.15, 0.014, 0.007);
  const rail_wear = new THREE.InstancedMesh(
    rail_wearGeom,
    wornWoodMat,
    12
  );
  rail_wear.name = "rail_wear";

  const railWearData = [
    [-0.52, 0.515, 0.558, 0.01, 1.0],
    [-0.28, 0.465, 0.558, -0.02, 0.65],
    [-0.03, 0.525, 0.558, 0.015, 1.15],
    [0.24, 0.475, 0.558, -0.015, 0.85],
    [0.51, 0.520, 0.558, 0.02, 0.70],
    [-0.43, 0.485, -0.558, -0.01, 0.8],
    [-0.15, 0.525, -0.558, 0.02, 0.6],
    [0.13, 0.475, -0.558, -0.02, 1.0],
    [0.42, 0.520, -0.558, 0.01, 0.75],
    [-0.66, 0.515, 0.525, Math.PI / 2, 0.8],
    [0.66, 0.475, 0.525, Math.PI / 2, 0.9],
    [0.66, 0.520, -0.485, Math.PI / 2, 0.7]
  ];

  for (let i = 0; i < railWearData.length; i++) {
    const mark = railWearData[i];
    setInstance(
      rail_wear,
      i,
      mark[0],
      mark[1],
      mark[2],
      0,
      mark[3],
      0,
      mark[4],
      1,
      1
    );
  }
  rail_wear.instanceMatrix.needsUpdate = true;
  wood_frame.add(rail_wear);

  const fastenerGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.009,
    12
  );
  const fasteners = new THREE.InstancedMesh(
    fastenerGeom,
    fastenerMat,
    8
  );
  fasteners.name = "fasteners";

  const fastenerData = [
    [-0.70, 0.36, 0.579],
    [-0.70, 0.78, 0.579],
    [0.70, 0.36, 0.579],
    [0.70, 0.78, 0.579],
    [-0.66, 0.49, 0.559],
    [0.66, 0.49, 0.559],
    [-0.70, 1.04, -0.579],
    [0.70, 1.04, -0.579]
  ];

  for (let i = 0; i < fastenerData.length; i++) {
    const bolt = fastenerData[i];
    setInstance(
      fasteners,
      i,
      bolt[0],
      bolt[1],
      bolt[2],
      Math.PI / 2,
      0,
      0,
      1,
      1,
      1
    );
  }
  fasteners.instanceMatrix.needsUpdate = true;
  wood_frame.add(fasteners);

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

  fitToUnitCube(THREE, root);
  return root;
}