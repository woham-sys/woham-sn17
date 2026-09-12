// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "quilted_platform_bed";

  const bedW = 2.10;
  const bedD = 1.48;
  const frameTop = 0.43;
  const lowerBottom = 0.44;
  const lowerTop = 0.67;
  const upperBottom = 0.68;
  const upperTop = 0.98;
  const topBottom = 1.00;
  const topTop = 1.13;

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0xe7e8e6,
    metalness: 0.0,
    roughness: 0.95
  });
  const sideFabricMat = new THREE.MeshStandardMaterial({
    color: 0xdedfdc,
    metalness: 0.0,
    roughness: 0.95
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xb8bdc1,
    metalness: 0.0,
    roughness: 0.95
  });
  const pipingMat = new THREE.MeshStandardMaterial({
    color: 0x202428,
    metalness: 0.0,
    roughness: 0.95
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xb98555,
    metalness: 0.0,
    roughness: 0.6
  });
  const woodGrainMat = new THREE.MeshStandardMaterial({
    color: 0x8f603d,
    metalness: 0.0,
    roughness: 0.9
  });
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xf1f1ef,
    metalness: 0.0,
    roughness: 0.95
  });
  const labelInkMat = new THREE.MeshStandardMaterial({
    color: 0x555b5e,
    metalness: 0.0,
    roughness: 0.8
  });
  const redInkMat = new THREE.MeshStandardMaterial({
    color: 0xb73338,
    metalness: 0.0,
    roughness: 0.8
  });
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  function roundedBoxGeometry(w, h, d, radius, bevel) {
    const r = Math.min(radius, w * 0.5, h * 0.5);
    const shape = new THREE.Shape();
    shape.moveTo(-w * 0.5 + r, -h * 0.5);
    shape.lineTo(w * 0.5 - r, -h * 0.5);
    shape.quadraticCurveTo(w * 0.5, -h * 0.5, w * 0.5, -h * 0.5 + r);
    shape.lineTo(w * 0.5, h * 0.5 - r);
    shape.quadraticCurveTo(w * 0.5, h * 0.5, w * 0.5 - r, h * 0.5);
    shape.lineTo(-w * 0.5 + r, h * 0.5);
    shape.quadraticCurveTo(-w * 0.5, h * 0.5, -w * 0.5, h * 0.5 - r);
    shape.lineTo(-w * 0.5, -h * 0.5 + r);
    shape.quadraticCurveTo(-w * 0.5, -h * 0.5, -w * 0.5 + r, -h * 0.5);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3
    });
    geometry.translate(0, 0, -d * 0.5);
    return geometry;
  }

  function roundedLoopGeometry(w, d, y, cornerRadius, tubeRadius) {
    const points = [];
    const cornerSegments = 6;
    const centers = [
      [w * 0.5 - cornerRadius, d * 0.5 - cornerRadius],
      [-w * 0.5 + cornerRadius, d * 0.5 - cornerRadius],
      [-w * 0.5 + cornerRadius, -d * 0.5 + cornerRadius],
      [w * 0.5 - cornerRadius, -d * 0.5 + cornerRadius]
    ];

    for (let corner = 0; corner < 4; corner++) {
      const startAngle = corner * Math.PI * 0.5;
      for (let i = 0; i < cornerSegments; i++) {
        const angle = startAngle + i / cornerSegments * Math.PI * 0.5;
        points.push(new THREE.Vector3(
          centers[corner][0] + Math.cos(angle) * cornerRadius,
          y,
          centers[corner][1] + Math.sin(angle) * cornerRadius
        ));
      }
    }

    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 72, tubeRadius, 8, true);
  }

  function addSegmentInstances(name, segments, radius, material, parent) {
    const geometry = new THREE.CylinderGeometry(radius, radius, 1, 6);
    const instances = new THREE.InstancedMesh(geometry, material, segments.length);
    instances.name = name;

    const up = new THREE.Vector3(0, 1, 0);
    const direction = new THREE.Vector3();
    const midpoint = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const matrix = new THREE.Matrix4();

    for (let i = 0; i < segments.length; i++) {
      const p1 = segments[i][0];
      const p2 = segments[i][1];
      direction.subVectors(p2, p1);
      const length = direction.length();
      midpoint.addVectors(p1, p2).multiplyScalar(0.5);
      quaternion.setFromUnitVectors(up, direction.normalize());
      scale.set(1, length, 1);
      matrix.compose(midpoint, quaternion, scale);
      instances.setMatrixAt(i, matrix);
    }

    instances.instanceMatrix.needsUpdate = true;
    parent.add(instances);
    return instances;
  }

  const frame_group = new THREE.Group();
  frame_group.name = "wooden_frame";
  root.add(frame_group);

  const front_railGeom = roundedBoxGeometry(2.18, 0.18, 0.12, 0.025, 0.012);
  const front_rail = new THREE.Mesh(front_railGeom, woodMat);
  front_rail.name = "front_rail";
  front_rail.position.set(0, 0.34, 0.76);
  frame_group.add(front_rail);

  const rear_railGeom = front_railGeom;
  const rear_rail = new THREE.Mesh(rear_railGeom, woodMat);
  rear_rail.name = "rear_rail";
  rear_rail.position.set(0, 0.34, -0.76);
  frame_group.add(rear_rail);

  const side_railGeom = roundedBoxGeometry(0.12, 0.18, 1.50, 0.025, 0.012);
  const left_side_rail = new THREE.Mesh(side_railGeom, woodMat);
  left_side_rail.name = "left_side_rail";
  left_side_rail.position.set(-1.03, 0.34, 0);
  frame_group.add(left_side_rail);

  const right_side_rail = new THREE.Mesh(side_railGeom, woodMat);
  right_side_rail.name = "right_side_rail";
  right_side_rail.position.set(1.03, 0.34, 0);
  frame_group.add(right_side_rail);

  const support_deckGeom = new THREE.BoxGeometry(2.04, 0.05, 1.40);
  const support_deck = new THREE.Mesh(support_deckGeom, woodMat);
  support_deck.name = "support_deck";
  support_deck.position.set(0, 0.425, 0);
  frame_group.add(support_deck);

  const legsGeom = new THREE.CylinderGeometry(0.075, 0.058, 0.42, 12);
  const legs = new THREE.InstancedMesh(legsGeom, woodMat, 4);
  legs.name = "legs";
  const legPositions = [
    [-0.94, 0.19, 0.66],
    [0.94, 0.19, 0.66],
    [-0.94, 0.19, -0.66],
    [0.94, 0.19, -0.66]
  ];
  const legMatrix = new THREE.Matrix4();
  for (let i = 0; i < legPositions.length; i++) {
    legMatrix.makeTranslation(
      legPositions[i][0],
      legPositions[i][1],
      legPositions[i][2]
    );
    legs.setMatrixAt(i, legMatrix);
  }
  legs.instanceMatrix.needsUpdate = true;
  frame_group.add(legs);

  const frontGrainSegments = [];
  for (let row = 0; row < 4; row++) {
    for (let i = 0; i < 12; i++) {
      const x1 = -1.02 + i * 0.17;
      const x2 = x1 + 0.17;
      const y1 = 0.285 + row * 0.035 + Math.sin(i * 1.7 + row) * 0.006;
      const y2 = 0.285 + row * 0.035 + Math.sin((i + 1) * 1.7 + row) * 0.006;
      frontGrainSegments.push([
        new THREE.Vector3(x1, y1, 0.834),
        new THREE.Vector3(x2, y2, 0.834)
      ]);
    }
  }
  const front_wood_grain = addSegmentInstances(
    "front_wood_grain",
    frontGrainSegments,
    0.0022,
    woodGrainMat,
    frame_group
  );

  const sideGrainSegments = [];
  for (const side of [-1, 1]) {
    for (let row = 0; row < 3; row++) {
      for (let i = 0; i < 8; i++) {
        const z1 = -0.66 + i * 0.17;
        const z2 = z1 + 0.17;
        const y1 = 0.29 + row * 0.04 + Math.sin(i * 1.4 + row) * 0.005;
        const y2 = 0.29 + row * 0.04 + Math.sin((i + 1) * 1.4 + row) * 0.005;
        sideGrainSegments.push([
          new THREE.Vector3(side * 1.094, y1, z1),
          new THREE.Vector3(side * 1.094, y2, z2)
        ]);
      }
    }
  }
  const side_wood_grain = addSegmentInstances(
    "side_wood_grain",
    sideGrainSegments,
    0.002,
    woodGrainMat,
    frame_group
  );

  const front_rail_jointGeom = new THREE.BoxGeometry(0.012, 0.15, 0.006);
  const front_rail_joint = new THREE.Mesh(front_rail_jointGeom, woodGrainMat);
  front_rail_joint.name = "front_rail_joint";
  front_rail_joint.position.set(-0.58, 0.34, 0.835);
  frame_group.add(front_rail_joint);

  const mattress_group = new THREE.Group();
  mattress_group.name = "mattress";
  root.add(mattress_group);

  const lower_mattressGeom = roundedBoxGeometry(
    1.98,
    lowerTop - lowerBottom,
    1.35,
    0.075,
    0.025
  );
  const lower_mattress = new THREE.Mesh(lower_mattressGeom, sideFabricMat);
  lower_mattress.name = "lower_mattress";
  lower_mattress.position.set(0, (lowerBottom + lowerTop) * 0.5, 0);
  mattress_group.add(lower_mattress);

  const upper_mattressGeom = roundedBoxGeometry(
    bedW,
    upperTop - upperBottom,
    bedD,
    0.09,
    0.025
  );
  const upper_mattress = new THREE.Mesh(upper_mattressGeom, sideFabricMat);
  upper_mattress.name = "upper_mattress";
  upper_mattress.position.set(0, (upperBottom + upperTop) * 0.5, 0);
  mattress_group.add(upper_mattress);

  const top_cushionGeom = roundedBoxGeometry(
    2.08,
    topTop - topBottom,
    1.46,
    0.065,
    0.025
  );
  const top_cushion = new THREE.Mesh(top_cushionGeom, fabricMat);
  top_cushion.name = "top_cushion";
  top_cushion.position.set(0, (topBottom + topTop) * 0.5, 0);
  mattress_group.add(top_cushion);

  const lower_mattress_pipingGeom = roundedLoopGeometry(
    1.99,
    1.36,
    lowerTop,
    0.09,
    0.012
  );
  const lower_mattress_piping = new THREE.Mesh(
    lower_mattress_pipingGeom,
    seamMat
  );
  lower_mattress_piping.name = "lower_mattress_piping";
  mattress_group.add(lower_mattress_piping);

  const upper_mattress_pipingGeom = roundedLoopGeometry(
    2.10,
    1.48,
    0.992,
    0.105,
    0.018
  );
  const upper_mattress_piping = new THREE.Mesh(
    upper_mattress_pipingGeom,
    pipingMat
  );
  upper_mattress_piping.name = "upper_mattress_piping";
  mattress_group.add(upper_mattress_piping);

  const top_cushion_pipingGeom = roundedLoopGeometry(
    2.09,
    1.47,
    1.126,
    0.105,
    0.011
  );
  const top_cushion_piping = new THREE.Mesh(
    top_cushion_pipingGeom,
    seamMat
  );
  top_cushion_piping.name = "top_cushion_piping";
  mattress_group.add(top_cushion_piping);

  const topVerticalSegments = [];
  for (let i = 1; i < 8; i++) {
    const x = -bedW * 0.5 + i / 8 * bedW;
    topVerticalSegments.push([
      new THREE.Vector3(x, 1.158, -0.67),
      new THREE.Vector3(x, 1.158, 0.67)
    ]);
  }
  const top_quilting_vertical = addSegmentInstances(
    "top_quilting_vertical",
    topVerticalSegments,
    0.0032,
    seamMat,
    mattress_group
  );

  const topHorizontalSegments = [];
  for (let i = 1; i < 6; i++) {
    const z = -bedD * 0.5 + i / 6 * bedD;
    topHorizontalSegments.push([
      new THREE.Vector3(-0.96, 1.158, z),
      new THREE.Vector3(0.96, 1.158, z)
    ]);
  }
  const top_quilting_horizontal = addSegmentInstances(
    "top_quilting_horizontal",
    topHorizontalSegments,
    0.0032,
    seamMat,
    mattress_group
  );

  const upperFrontSegments = [];
  for (let i = 0; i < 13; i++) {
    const x = -0.92 + i * 0.155;
    upperFrontSegments.push([
      new THREE.Vector3(x - 0.065, 0.705, 0.768),
      new THREE.Vector3(x + 0.065, 0.955, 0.768)
    ]);
    upperFrontSegments.push([
      new THREE.Vector3(x + 0.065, 0.705, 0.768),
      new THREE.Vector3(x - 0.065, 0.955, 0.768)
    ]);
  }
  const upper_front_quilting = addSegmentInstances(
    "upper_front_quilting",
    upperFrontSegments,
    0.0032,
    seamMat,
    mattress_group
  );

  const upperSideSegments = [];
  for (const side of [-1, 1]) {
    for (let i = 0; i < 9; i++) {
      const z = -0.58 + i * 0.145;
      upperSideSegments.push([
        new THREE.Vector3(side * 1.078, 0.705, z - 0.06),
        new THREE.Vector3(side * 1.078, 0.955, z + 0.06)
      ]);
      upperSideSegments.push([
        new THREE.Vector3(side * 1.078, 0.705, z + 0.06),
        new THREE.Vector3(side * 1.078, 0.955, z - 0.06)
      ]);
    }
  }
  const upper_side_quilting = addSegmentInstances(
    "upper_side_quilting",
    upperSideSegments,
    0.0032,
    seamMat,
    mattress_group
  );

  const lowerFrontSegments = [];
  for (let i = 0; i < 13; i++) {
    const x = -0.88 + i * 0.145;
    lowerFrontSegments.push([
      new THREE.Vector3(x - 0.06, 0.47, 0.704),
      new THREE.Vector3(x + 0.06, 0.65, 0.704)
    ]);
    lowerFrontSegments.push([
      new THREE.Vector3(x + 0.06, 0.47, 0.704),
      new THREE.Vector3(x - 0.06, 0.65, 0.704)
    ]);
  }
  const lower_front_quilting = addSegmentInstances(
    "lower_front_quilting",
    lowerFrontSegments,
    0.003,
    seamMat,
    mattress_group
  );

  const lowerSideSegments = [];
  for (const side of [-1, 1]) {
    for (let i = 0; i < 8; i++) {
      const z = -0.52 + i * 0.15;
      lowerSideSegments.push([
        new THREE.Vector3(side * 1.018, 0.47, z - 0.055),
        new THREE.Vector3(side * 1.018, 0.65, z + 0.055)
      ]);
      lowerSideSegments.push([
        new THREE.Vector3(side * 1.018, 0.47, z + 0.055),
        new THREE.Vector3(side * 1.018, 0.65, z - 0.055)
      ]);
    }
  }
  const lower_side_quilting = addSegmentInstances(
    "lower_side_quilting",
    lowerSideSegments,
    0.003,
    seamMat,
    mattress_group
  );

  const brand_label_backingGeom = roundedBoxGeometry(
    0.36,
    0.115,
    0.008,
    0.012,
    0.002
  );
  const brand_label_backing = new THREE.Mesh(
    brand_label_backingGeom,
    labelInkMat
  );
  brand_label_backing.name = "brand_label_backing";
  brand_label_backing.position.set(-0.58, 0.82, 0.773);
  mattress_group.add(brand_label_backing);

  const brand_labelGeom = roundedBoxGeometry(
    0.335,
    0.091,
    0.008,
    0.009,
    0.002
  );
  const brand_label = new THREE.Mesh(brand_labelGeom, labelMat);
  brand_label.name = "brand_label";
  brand_label.position.set(-0.58, 0.82, 0.780);
  mattress_group.add(brand_label);

  const brandMarkSegments = [];
  for (let i = 0; i < 8; i++) {
    const x = -0.695 + i * 0.032;
    const h = 0.018 + (i % 3) * 0.006;
    brandMarkSegments.push([
      new THREE.Vector3(x, 0.82 - h * 0.5, 0.787),
      new THREE.Vector3(x, 0.82 + h * 0.5, 0.787)
    ]);
  }
  const brand_label_marks = addSegmentInstances(
    "brand_label_marks",
    brandMarkSegments,
    0.0022,
    labelInkMat,
    mattress_group
  );

  const certification_badge_backingGeom = roundedBoxGeometry(
    0.20,
    0.12,
    0.008,
    0.008,
    0.002
  );
  const certification_badge_backing = new THREE.Mesh(
    certification_badge_backingGeom,
    labelInkMat
  );
  certification_badge_backing.name = "certification_badge_backing";
  certification_badge_backing.position.set(0.70, 0.83, 0.773);
  mattress_group.add(certification_badge_backing);

  const certification_badgeGeom = roundedBoxGeometry(
    0.178,
    0.098,
    0.008,
    0.006,
    0.002
  );
  const certification_badge = new THREE.Mesh(
    certification_badgeGeom,
    labelMat
  );
  certification_badge.name = "certification_badge";
  certification_badge.position.set(0.70, 0.83, 0.780);
  mattress_group.add(certification_badge);

  const certification_iconGeom = new THREE.RingGeometry(0.017, 0.027, 18);
  const certification_icon = new THREE.Mesh(
    certification_iconGeom,
    redInkMat
  );
  certification_icon.name = "certification_icon";
  certification_icon.position.set(0.655, 0.83, 0.787);
  mattress_group.add(certification_icon);

  const certification_textGeom = new THREE.BoxGeometry(0.038, 0.006, 0.004);
  const certification_text = new THREE.InstancedMesh(
    certification_textGeom,
    labelInkMat,
    3
  );
  certification_text.name = "certification_text";
  for (let i = 0; i < 3; i++) {
    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(0.715, 0.845 - i * 0.015, 0.788);
    certification_text.setMatrixAt(i, matrix);
  }
  certification_text.instanceMatrix.needsUpdate = true;
  mattress_group.add(certification_text);

  const side_buttonGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.012, 18);
  const side_button = new THREE.Mesh(side_buttonGeom, buttonMat);
  side_button.name = "side_button";
  side_button.rotation.x = Math.PI * 0.5;
  side_button.position.set(-0.78, 0.565, 0.711);
  mattress_group.add(side_button);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
}