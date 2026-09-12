// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wristwatch";

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc5c7c8,
    metalness: 0.5,
    roughness: 0.32,
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const dark_seamMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.5,
    roughness: 0.5,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0x0878c9,
    metalness: 0.0,
    roughness: 0.3,
  });
  const dial_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x07559d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const chapterMat = new THREE.MeshStandardMaterial({
    color: 0x55b9f1,
    metalness: 0.0,
    roughness: 0.3,
  });
  const lumeMat = new THREE.MeshStandardMaterial({
    color: 0xe8f3f7,
    metalness: 0.0,
    roughness: 0.3,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f4ff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });

  function roundedRectShape(width, height, radius) {
    const x = -width / 2;
    const y = -height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);
    return shape;
  }

  function roundedExtrudeGeometry(width, height, depth, radius, bevel) {
    const shape = roundedRectShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const bracelet_group = new THREE.Group();
  bracelet_group.name = "bracelet_group";
  root.add(bracelet_group);

  const braceletPath = [
    new THREE.Vector3(0, 0.73, -0.02),
    new THREE.Vector3(0, 1.04, -0.02),
    new THREE.Vector3(0, 1.29, -0.14),
    new THREE.Vector3(0, 1.39, -0.42),
    new THREE.Vector3(0, 1.24, -0.72),
    new THREE.Vector3(0, 0.72, -0.88),
    new THREE.Vector3(0, 0.00, -0.92),
    new THREE.Vector3(0, -0.72, -0.88),
    new THREE.Vector3(0, -1.24, -0.72),
    new THREE.Vector3(0, -1.39, -0.42),
    new THREE.Vector3(0, -1.29, -0.14),
    new THREE.Vector3(0, -1.04, -0.02),
    new THREE.Vector3(0, -0.73, -0.02),
  ];
  const braceletCurve = new THREE.CatmullRomCurve3(
    braceletPath,
    false,
    "centripetal"
  );

  const bracelet_center_linksGeom = roundedExtrudeGeometry(
    0.56,
    0.225,
    0.12,
    0.035,
    0.012
  );
  const bracelet_center_links = new THREE.InstancedMesh(
    bracelet_center_linksGeom,
    brushed_metalMat,
    20
  );
  bracelet_center_links.name = "bracelet_center_links";

  const bracelet_side_linksGeom = roundedExtrudeGeometry(
    0.205,
    0.225,
    0.12,
    0.032,
    0.012
  );
  const bracelet_side_links = new THREE.InstancedMesh(
    bracelet_side_linksGeom,
    brushed_metalMat,
    40
  );
  bracelet_side_links.name = "bracelet_side_links";

  const linkDummy = new THREE.Object3D();
  let centerIndex = 0;
  let sideIndex = 0;
  for (let i = 0; i < 20; i++) {
    const point = braceletCurve.getPointAt(i / 19);
    const tangent = braceletCurve.getTangentAt(i / 19).normalize();
    const angle = Math.atan2(tangent.z, tangent.y);

    linkDummy.position.copy(point);
    linkDummy.rotation.set(angle, 0, 0);
    linkDummy.scale.set(1, 1, 1);
    linkDummy.updateMatrix();
    bracelet_center_links.setMatrixAt(centerIndex++, linkDummy.matrix);

    for (const side of [-1, 1]) {
      linkDummy.position.copy(point);
      linkDummy.position.x += side * 0.39;
      linkDummy.rotation.set(angle, 0, 0);
      linkDummy.scale.set(1, 1, 1);
      linkDummy.updateMatrix();
      bracelet_side_links.setMatrixAt(sideIndex++, linkDummy.matrix);
    }
  }
  bracelet_center_links.instanceMatrix.needsUpdate = true;
  bracelet_side_links.instanceMatrix.needsUpdate = true;
  bracelet_group.add(bracelet_center_links, bracelet_side_links);

  const bracelet_edge_railsGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    1,
    8
  );
  const bracelet_edge_rails = new THREE.InstancedMesh(
    bracelet_edge_railsGeom,
    polished_metalMat,
    2
  );
  bracelet_edge_rails.name = "bracelet_edge_rails";

  const railDummy = new THREE.Object3D();
  const railUp = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    const railPoints = [];
    for (let j = 0; j <= 20; j++) {
      const t = j / 20;
      const point = braceletCurve.getPointAt(t);
      const tangent = braceletCurve.getTangentAt(t).normalize();
      const normal = new THREE.Vector3(0, -tangent.z, tangent.y).normalize();
      railPoints.push(
        new THREE.Vector3(
          point.x + side * 0.505,
          point.y + normal.y * 0.065,
          point.z + normal.z * 0.065
        )
      );
    }
    const start = railPoints[0];
    const end = railPoints[railPoints.length - 1];
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    railDummy.position.copy(start).add(end).multiplyScalar(0.5);
    railDummy.quaternion.setFromUnitVectors(railUp, direction.normalize());
    railDummy.scale.set(1, length, 1);
    railDummy.updateMatrix();
    bracelet_edge_rails.setMatrixAt(i, railDummy.matrix);
  }
  bracelet_edge_rails.instanceMatrix.needsUpdate = true;
  bracelet_group.add(bracelet_edge_rails);

  const case_group = new THREE.Group();
  case_group.name = "case_group";
  root.add(case_group);

  const case_bodyShape = new THREE.Shape();
  case_bodyShape.moveTo(-0.42, 0.86);
  case_bodyShape.bezierCurveTo(-0.56, 0.86, -0.66, 0.78, -0.72, 0.66);
  case_bodyShape.bezierCurveTo(-0.84, 0.42, -0.89, 0.16, -0.89, -0.05);
  case_bodyShape.bezierCurveTo(-0.89, -0.30, -0.82, -0.56, -0.70, -0.72);
  case_bodyShape.bezierCurveTo(-0.64, -0.80, -0.55, -0.84, -0.42, -0.86);
  case_bodyShape.lineTo(0.42, -0.86);
  case_bodyShape.bezierCurveTo(0.55, -0.84, 0.64, -0.80, 0.70, -0.72);
  case_bodyShape.bezierCurveTo(0.82, -0.56, 0.89, -0.30, 0.89, -0.05);
  case_bodyShape.bezierCurveTo(0.89, 0.16, 0.84, 0.42, 0.72, 0.66);
  case_bodyShape.bezierCurveTo(0.66, 0.78, 0.56, 0.86, 0.42, 0.86);
  case_bodyShape.closePath();

  const case_bodyGeom = new THREE.ExtrudeGeometry(case_bodyShape, {
    depth: 0.22,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  case_bodyGeom.translate(0, 0, -0.11);
  const case_body = new THREE.Mesh(case_bodyGeom, brushed_metalMat);
  case_body.name = "case_body";
  case_body.position.z = -0.01;
  case_group.add(case_body);

  const case_backGeom = new THREE.CylinderGeometry(0.72, 0.72, 0.055, 64);
  const case_back = new THREE.Mesh(case_backGeom, brushed_metalMat);
  case_back.name = "case_back";
  case_back.rotation.x = Math.PI / 2;
  case_back.position.z = -0.145;
  case_group.add(case_back);

  const lugShape = new THREE.Shape();
  lugShape.moveTo(-0.22, -0.23);
  lugShape.lineTo(0.22, -0.23);
  lugShape.lineTo(0.17, 0.23);
  lugShape.lineTo(-0.17, 0.23);
  lugShape.closePath();

  const lugGeom = new THREE.ExtrudeGeometry(lugShape, {
    depth: 0.20,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 2,
  });
  lugGeom.translate(0, 0, -0.10);

  const top_left_lug = new THREE.Mesh(lugGeom, brushed_metalMat);
  top_left_lug.name = "top_left_lug";
  top_left_lug.position.set(-0.43, 0.70, 0);
  case_group.add(top_left_lug);

  const top_right_lug = new THREE.Mesh(lugGeom, brushed_metalMat);
  top_right_lug.name = "top_right_lug";
  top_right_lug.position.set(0.43, 0.70, 0);
  case_group.add(top_right_lug);

  const bottom_left_lug = new THREE.Mesh(lugGeom, brushed_metalMat);
  bottom_left_lug.name = "bottom_left_lug";
  bottom_left_lug.position.set(-0.43, -0.70, 0);
  bottom_left_lug.rotation.z = Math.PI;
  case_group.add(bottom_left_lug);

  const bottom_right_lug = new THREE.Mesh(lugGeom, brushed_metalMat);
  bottom_right_lug.name = "bottom_right_lug";
  bottom_right_lug.position.set(0.43, -0.70, 0);
  bottom_right_lug.rotation.z = Math.PI;
  case_group.add(bottom_right_lug);

  const crown_stemGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.16, 20);
  const crown_stem = new THREE.Mesh(crown_stemGeom, polished_metalMat);
  crown_stem.name = "crown_stem";
  crown_stem.rotation.z = Math.PI / 2;
  crown_stem.position.set(0.89, 0, 0);
  case_group.add(crown_stem);

  const crownGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.17, 28);
  const crown = new THREE.Mesh(crownGeom, brushed_metalMat);
  crown.name = "crown";
  crown.rotation.z = Math.PI / 2;
  crown.position.set(0.98, 0, 0);
  case_group.add(crown);

  const crown_ridgesGeom = new THREE.BoxGeometry(0.17, 0.014, 0.026);
  const crown_ridges = new THREE.InstancedMesh(
    crown_ridgesGeom,
    polished_metalMat,
    16
  );
  crown_ridges.name = "crown_ridges";
  const crownDummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    crownDummy.position.set(
      0.98,
      Math.cos(angle) * 0.103,
      Math.sin(angle) * 0.103
    );
    crownDummy.rotation.set(angle, 0, 0);
    crownDummy.scale.set(1, 1, 1);
    crownDummy.updateMatrix();
    crown_ridges.setMatrixAt(i, crownDummy.matrix);
  }
  crown_ridges.instanceMatrix.needsUpdate = true;
  case_group.add(crown_ridges);

  const crown_end_capGeom = new THREE.CylinderGeometry(
    0.087,
    0.087,
    0.018,
    28
  );
  const crown_end_cap = new THREE.Mesh(crown_end_capGeom, polished_metalMat);
  crown_end_cap.name = "crown_end_cap";
  crown_end_cap.rotation.z = Math.PI / 2;
  crown_end_cap.position.set(1.072, 0, 0);
  case_group.add(crown_end_cap);

  const dial_group = new THREE.Group();
  dial_group.name = "dial_group";
  case_group.add(dial_group);

  const dialGeom = new THREE.CylinderGeometry(0.68, 0.68, 0.035, 64);
  const dial = new THREE.Mesh(dialGeom, dialMat);
  dial.name = "dial";
  dial.rotation.x = Math.PI / 2;
  dial.position.z = 0.155;
  dial_group.add(dial);

  const dial_edgeGeom = new THREE.TorusGeometry(0.657, 0.018, 10, 64);
  const dial_edge = new THREE.Mesh(dial_edgeGeom, dial_edgeMat);
  dial_edge.name = "dial_edge";
  dial_edge.position.z = 0.178;
  dial_group.add(dial_edge);

  const chapter_ringGeom = new THREE.RingGeometry(0.602, 0.657, 64);
  const chapter_ring = new THREE.Mesh(chapter_ringGeom, chapterMat);
  chapter_ring.name = "chapter_ring";
  chapter_ring.position.z = 0.179;
  dial_group.add(chapter_ring);

  const minute_ticksGeom = new THREE.BoxGeometry(0.008, 0.034, 0.008);
  const minute_ticks = new THREE.InstancedMesh(
    minute_ticksGeom,
    lumeMat,
    48
  );
  minute_ticks.name = "minute_ticks";

  const hour_ticksGeom = new THREE.BoxGeometry(0.018, 0.066, 0.010);
  const hour_ticks = new THREE.InstancedMesh(hour_ticksGeom, silverMat, 12);
  hour_ticks.name = "hour_ticks";

  const tickDummy = new THREE.Object3D();
  let minuteIndex = 0;
  let hourIndex = 0;
  for (let i = 0; i < 60; i++) {
    const angle = i / 60 * Math.PI * 2;
    const isHour = i % 5 === 0;
    const radius = isHour ? 0.625 : 0.632;
    tickDummy.position.set(
      Math.sin(angle) * radius,
      Math.cos(angle) * radius,
      0.185
    );
    tickDummy.rotation.set(0, 0, -angle);
    tickDummy.scale.set(1, 1, 1);
    tickDummy.updateMatrix();
    if (isHour) {
      hour_ticks.setMatrixAt(hourIndex++, tickDummy.matrix);
    } else {
      minute_ticks.setMatrixAt(minuteIndex++, tickDummy.matrix);
    }
  }
  minute_ticks.instanceMatrix.needsUpdate = true;
  hour_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(minute_ticks, hour_ticks);

  const romanStrings = [
    "XII",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
  ];
  const numeralStrokes = [];

  function addNumeralStroke(hour, x1, y1, x2, y2) {
    numeralStrokes.push({ hour, x1, y1, x2, y2 });
  }

  for (let hour = 0; hour < 12; hour++) {
    const text = romanStrings[hour];
    const advance = 0.073;
    const start = -(text.length - 1) * advance / 2;

    for (let c = 0; c < text.length; c++) {
      const character = text[c];
      const cx = start + c * advance;
      if (character === "I") {
        addNumeralStroke(hour, cx, -0.066, cx, 0.066);
        addNumeralStroke(hour, cx - 0.021, 0.066, cx + 0.021, 0.066);
        addNumeralStroke(hour, cx - 0.021, -0.066, cx + 0.021, -0.066);
      } else if (character === "V") {
        addNumeralStroke(hour, cx - 0.029, 0.066, cx, -0.066);
        addNumeralStroke(hour, cx, -0.066, cx + 0.029, 0.066);
      } else if (character === "X") {
        addNumeralStroke(hour, cx - 0.028, -0.066, cx + 0.028, 0.066);
        addNumeralStroke(hour, cx - 0.028, 0.066, cx + 0.028, -0.066);
      }
    }
  }

  const numeral_barsGeom = new THREE.BoxGeometry(1, 1, 1);
  const numeral_bars = new THREE.InstancedMesh(
    numeral_barsGeom,
    silverMat,
    numeralStrokes.length
  );
  numeral_bars.name = "numeral_bars";

  const numeralDummy = new THREE.Object3D();
  for (let i = 0; i < numeralStrokes.length; i++) {
    const stroke = numeralStrokes[i];
    const hour = stroke.hour;
    const theta = hour / 12 * Math.PI * 2;
    const radialX = Math.sin(theta);
    const radialY = Math.cos(theta);
    const tangentX = Math.cos(theta);
    const tangentY = -Math.sin(theta);
    const centerX = radialX * 0.49;
    const centerY = radialY * 0.49;

    const x1 =
      centerX + tangentX * stroke.x1 + radialX * stroke.y1;
    const y1 =
      centerY + tangentY * stroke.x1 + radialY * stroke.y1;
    const x2 =
      centerX + tangentX * stroke.x2 + radialX * stroke.y2;
    const y2 =
      centerY + tangentY * stroke.x2 + radialY * stroke.y2;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    numeralDummy.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0.190);
    numeralDummy.rotation.set(0, 0, Math.atan2(-dx, dy));
    numeralDummy.scale.set(0.017, length, 0.010);
    numeralDummy.updateMatrix();
    numeral_bars.setMatrixAt(i, numeralDummy.matrix);
  }
  numeral_bars.instanceMatrix.needsUpdate = true;
  dial_group.add(numeral_bars);

  function handGeometry(length, width, tail, depth) {
    const shape = new THREE.Shape();
    shape.moveTo(-width * 0.55, -tail);
    shape.lineTo(width * 0.55, -tail);
    shape.lineTo(width * 0.34, length * 0.78);
    shape.lineTo(0, length);
    shape.lineTo(-width * 0.34, length * 0.78);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: depth * 0.25,
      bevelSize: depth * 0.18,
      bevelSegments: 2,
    });
  }

  const hour_handGeom = handGeometry(0.39, 0.068, 0.055, 0.012);
  const hour_hand = new THREE.Mesh(hour_handGeom, polished_metalMat);
  hour_hand.name = "hour_hand";
  hour_hand.position.z = 0.194;
  hour_hand.rotation.z = Math.PI / 3;
  dial_group.add(hour_hand);

  const minute_handGeom = handGeometry(0.54, 0.052, 0.065, 0.011);
  const minute_hand = new THREE.Mesh(minute_handGeom, polished_metalMat);
  minute_hand.name = "minute_hand";
  minute_hand.position.z = 0.205;
  minute_hand.rotation.z = -Math.PI / 3;
  dial_group.add(minute_hand);

  const second_handGeom = new THREE.BoxGeometry(0.012, 0.62, 0.008);
  const second_hand = new THREE.Mesh(second_handGeom, silverMat);
  second_hand.name = "second_hand";
  second_hand.position.set(0, 0.18, 0.218);
  second_hand.rotation.z = 2.30;
  dial_group.add(second_hand);

  const second_hand_counterweightGeom = new THREE.CircleGeometry(0.034, 20);
  const second_hand_counterweight = new THREE.Mesh(
    second_hand_counterweightGeom,
    silverMat
  );
  second_hand_counterweight.name = "second_hand_counterweight";
  second_hand_counterweight.position.set(
    -Math.sin(2.30) * 0.13,
    -Math.cos(2.30) * 0.13,
    0.223
  );
  dial_group.add(second_hand_counterweight);

  const center_pinGeom = new THREE.CylinderGeometry(0.058, 0.058, 0.026, 28);
  const center_pin = new THREE.Mesh(center_pinGeom, polished_metalMat);
  center_pin.name = "center_pin";
  center_pin.rotation.x = Math.PI / 2;
  center_pin.position.z = 0.224;
  dial_group.add(center_pin);

  const center_capGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.012, 20);
  const center_cap = new THREE.Mesh(center_capGeom, dark_seamMat);
  center_cap.name = "center_cap";
  center_cap.rotation.x = Math.PI / 2;
  center_cap.position.z = 0.239;
  dial_group.add(center_cap);

  const bezelGeom = new THREE.TorusGeometry(0.748, 0.073, 18, 72);
  const bezel = new THREE.Mesh(bezelGeom, polished_metalMat);
  bezel.name = "bezel";
  bezel.position.z = 0.185;
  case_group.add(bezel);

  const inner_bezelGeom = new THREE.TorusGeometry(0.684, 0.018, 12, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, silverMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.207;
  case_group.add(inner_bezel);

  const bezel_seamGeom = new THREE.TorusGeometry(0.817, 0.008, 8, 64);
  const bezel_seam = new THREE.Mesh(bezel_seamGeom, dark_seamMat);
  bezel_seam.name = "bezel_seam";
  bezel_seam.position.z = 0.137;
  case_group.add(bezel_seam);

  const crystalGeom = new THREE.CylinderGeometry(0.674, 0.674, 0.014, 64);
  const crystal = new THREE.Mesh(crystalGeom, glassMat);
  crystal.name = "crystal";
  crystal.rotation.x = Math.PI / 2;
  crystal.position.z = 0.247;
  case_group.add(crystal);

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