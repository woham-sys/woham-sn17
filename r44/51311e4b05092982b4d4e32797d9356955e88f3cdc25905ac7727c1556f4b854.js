// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const faceMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d5,
    metalness: 0.0,
    roughness: 0.7,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.0,
    roughness: 0.8,
  });
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.0,
    roughness: 0.8,
  });

  const outerR = 2.5;
  const innerR = 1.47;
  const startAngle = -Math.PI * 0.28;
  const endAngle = Math.PI * 1.28;

  function makeAnnularShape(outerRadius, innerRadius, a0, a1, segments) {
    const shape = new THREE.Shape();
    shape.moveTo(
      Math.cos(a0) * outerRadius,
      Math.sin(a0) * outerRadius
    );
    for (let i = 1; i <= segments; i++) {
      const a = a0 + (a1 - a0) * i / segments;
      shape.lineTo(
        Math.cos(a) * outerRadius,
        Math.sin(a) * outerRadius
      );
    }
    shape.lineTo(
      Math.cos(a1) * innerRadius,
      Math.sin(a1) * innerRadius
    );
    for (let i = segments - 1; i >= 0; i--) {
      const a = a0 + (a1 - a0) * i / segments;
      shape.lineTo(
        Math.cos(a) * innerRadius,
        Math.sin(a) * innerRadius
      );
    }
    shape.closePath();
    return shape;
  }

  function makeArcCurve(radius, a0, a1, z, segments) {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const a = a0 + (a1 - a0) * i / segments;
      points.push(new THREE.Vector3(
        Math.cos(a) * radius,
        Math.sin(a) * radius,
        z
      ));
    }
    return new THREE.CatmullRomCurve3(points, false, "centripetal");
  }

  function makeLineTube(p1, p2, radius, material) {
    return new THREE.Mesh(
      new THREE.TubeGeometry(
        new THREE.LineCurve3(p1, p2),
        1,
        radius,
        8,
        false
      ),
      material
    );
  }

  const rear_support_arcGeom = new THREE.TubeGeometry(
    makeArcCurve(2.58, startAngle, endAngle, -0.18, 80),
    112,
    0.055,
    10,
    false
  );
  const rear_support_arc = new THREE.Mesh(rear_support_arcGeom, chromeMat);
  root.add(rear_support_arc);

  const support_end_capsGeom = new THREE.SphereGeometry(0.058, 12, 8);
  const support_end_caps = new THREE.InstancedMesh(
    support_end_capsGeom,
    chromeMat,
    2
  );
  const supportCapMatrix = new THREE.Matrix4();
  const supportCapAngles = [startAngle, endAngle];
  for (let i = 0; i < 2; i++) {
    const a = supportCapAngles[i];
    supportCapMatrix.makeTranslation(
      Math.cos(a) * 2.58,
      Math.sin(a) * 2.58,
      -0.18
    );
    support_end_caps.setMatrixAt(i, supportCapMatrix);
  }
  support_end_caps.instanceMatrix.needsUpdate = true;
  root.add(support_end_caps);

  const outer_panelShape = makeAnnularShape(
    outerR,
    innerR,
    startAngle,
    endAngle,
    96
  );
  const outer_panelGeom = new THREE.ExtrudeGeometry(outer_panelShape, {
    depth: 0.1,
    steps: 1,
    bevelEnabled: false,
  });
  const outer_panel = new THREE.Mesh(outer_panelGeom, silverMat);
  outer_panel.position.z = -0.08;
  root.add(outer_panel);

  const outer_faceShape = makeAnnularShape(
    outerR - 0.045,
    innerR + 0.025,
    startAngle + 0.012,
    endAngle - 0.012,
    96
  );
  const outer_faceGeom = new THREE.ShapeGeometry(outer_faceShape, 96);
  const outer_face = new THREE.Mesh(outer_faceGeom, faceMat);
  outer_face.position.z = 0.024;
  root.add(outer_face);

  const outer_rimGeom = new THREE.TubeGeometry(
    makeArcCurve(outerR, startAngle, endAngle, 0.035, 96),
    128,
    0.045,
    10,
    false
  );
  const outer_rim = new THREE.Mesh(outer_rimGeom, chromeMat);
  root.add(outer_rim);

  const inner_rimGeom = new THREE.TubeGeometry(
    makeArcCurve(innerR, startAngle, endAngle, 0.038, 96),
    128,
    0.027,
    8,
    false
  );
  const inner_rim = new THREE.Mesh(inner_rimGeom, chromeMat);
  root.add(inner_rim);

  const panel_edge_capsGeom = new THREE.CylinderGeometry(
    0.038,
    0.038,
    outerR - innerR,
    12
  );
  const panel_edge_caps = new THREE.InstancedMesh(
    panel_edge_capsGeom,
    chromeMat,
    2
  );
  const edgeMatrix = new THREE.Matrix4();
  const edgeQuat = new THREE.Quaternion();
  const edgeScale = new THREE.Vector3(1, 1, 1);
  const edgeAngles = [startAngle, endAngle];
  for (let i = 0; i < 2; i++) {
    const a = edgeAngles[i];
    const r = (outerR + innerR) * 0.5;
    edgeQuat.setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      a - Math.PI / 2
    );
    edgeMatrix.compose(
      new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0.025),
      edgeQuat,
      edgeScale
    );
    panel_edge_caps.setMatrixAt(i, edgeMatrix);
  }
  panel_edge_caps.instanceMatrix.needsUpdate = true;
  root.add(panel_edge_caps);

  const center_dialGeom = new THREE.CylinderGeometry(
    1.43,
    1.43,
    0.1,
    96
  );
  const center_dial = new THREE.Mesh(center_dialGeom, silverMat);
  center_dial.rotation.x = Math.PI / 2;
  center_dial.position.z = -0.015;
  root.add(center_dial);

  const center_faceGeom = new THREE.CircleGeometry(1.395, 96);
  const center_face = new THREE.Mesh(center_faceGeom, faceMat);
  center_face.position.z = 0.039;
  root.add(center_face);

  const center_rimGeom = new THREE.TorusGeometry(1.425, 0.026, 10, 96);
  const center_rim = new THREE.Mesh(center_rimGeom, chromeMat);
  center_rim.position.z = 0.043;
  root.add(center_rim);

  const outer_major_angles = [];
  for (let i = 0; i <= 12; i++) {
    outer_major_angles.push(startAngle + (endAngle - startAngle) * i / 12);
  }

  const outer_major_ticksGeom = new THREE.BoxGeometry(0.025, 0.34, 0.012);
  const outer_major_ticks = new THREE.InstancedMesh(
    outer_major_ticksGeom,
    inkMat,
    outer_major_angles.length
  );
  const tickMatrix = new THREE.Matrix4();
  const tickQuat = new THREE.Quaternion();
  const tickScale = new THREE.Vector3();
  const zAxis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < outer_major_angles.length; i++) {
    const a = outer_major_angles[i];
    const r = 2.25;
    tickQuat.setFromAxisAngle(zAxis, a - Math.PI / 2);
    tickScale.set(1, i % 3 === 0 ? 1.25 : 1, 1);
    tickMatrix.compose(
      new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0.034),
      tickQuat,
      tickScale
    );
    outer_major_ticks.setMatrixAt(i, tickMatrix);
  }
  outer_major_ticks.instanceMatrix.needsUpdate = true;
  root.add(outer_major_ticks);

  const outer_minor_angles = [];
  for (let i = 1; i < 97; i++) {
    const a = startAngle + (endAngle - startAngle) * i / 96;
    let isMajor = false;
    for (let j = 0; j < outer_major_angles.length; j++) {
      if (Math.abs(a - outer_major_angles[j]) < 0.012) isMajor = true;
    }
    if (!isMajor) outer_minor_angles.push(a);
  }

  const outer_minor_ticksGeom = new THREE.BoxGeometry(0.014, 0.15, 0.01);
  const outer_minor_ticks = new THREE.InstancedMesh(
    outer_minor_ticksGeom,
    inkMat,
    outer_minor_angles.length
  );
  for (let i = 0; i < outer_minor_angles.length; i++) {
    const a = outer_minor_angles[i];
    const r = 2.31;
    tickQuat.setFromAxisAngle(zAxis, a - Math.PI / 2);
    tickScale.set(1, 1, 1);
    tickMatrix.compose(
      new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0.034),
      tickQuat,
      tickScale
    );
    outer_minor_ticks.setMatrixAt(i, tickMatrix);
  }
  outer_minor_ticks.instanceMatrix.needsUpdate = true;
  root.add(outer_minor_ticks);

  const outer_divider_angles = [];
  for (let i = 1; i < 12; i++) {
    outer_divider_angles.push(
      startAngle + (endAngle - startAngle) * i / 12
    );
  }
  const outer_dividersGeom = new THREE.BoxGeometry(0.022, 0.84, 0.011);
  const outer_dividers = new THREE.InstancedMesh(
    outer_dividersGeom,
    inkMat,
    outer_divider_angles.length
  );
  for (let i = 0; i < outer_divider_angles.length; i++) {
    const a = outer_divider_angles[i];
    const r = 1.92;
    tickQuat.setFromAxisAngle(zAxis, a - Math.PI / 2);
    tickScale.set(1, 1, 1);
    tickMatrix.compose(
      new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0.033),
      tickQuat,
      tickScale
    );
    outer_dividers.setMatrixAt(i, tickMatrix);
  }
  outer_dividers.instanceMatrix.needsUpdate = true;
  root.add(outer_dividers);

  const inner_scale_arcGeom = new THREE.TubeGeometry(
    makeArcCurve(1.69, startAngle + 0.08, endAngle - 0.08, 0.034, 80),
    112,
    0.012,
    6,
    false
  );
  const inner_scale_arc = new THREE.Mesh(inner_scale_arcGeom, inkMat);
  root.add(inner_scale_arc);

  const inner_tick_angles = [];
  for (let i = 0; i <= 36; i++) {
    inner_tick_angles.push(
      startAngle + 0.1 + (endAngle - startAngle - 0.2) * i / 36
    );
  }
  const inner_ticksGeom = new THREE.BoxGeometry(0.014, 0.18, 0.01);
  const inner_ticks = new THREE.InstancedMesh(
    inner_ticksGeom,
    inkMat,
    inner_tick_angles.length
  );
  for (let i = 0; i < inner_tick_angles.length; i++) {
    const a = inner_tick_angles[i];
    const r = 1.57;
    tickQuat.setFromAxisAngle(zAxis, a - Math.PI / 2);
    tickScale.set(1, i % 6 === 0 ? 1.45 : 1, 1);
    tickMatrix.compose(
      new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0.034),
      tickQuat,
      tickScale
    );
    inner_ticks.setMatrixAt(i, tickMatrix);
  }
  inner_ticks.instanceMatrix.needsUpdate = true;
  root.add(inner_ticks);

  const center_horizontal_axis = makeLineTube(
    new THREE.Vector3(-1.18, 0, 0.045),
    new THREE.Vector3(1.18, 0, 0.045),
    0.009,
    inkMat
  );
  root.add(center_horizontal_axis);

  const center_vertical_axis = makeLineTube(
    new THREE.Vector3(0, -1.12, 0.045),
    new THREE.Vector3(0, 1.12, 0.045),
    0.009,
    inkMat
  );
  root.add(center_vertical_axis);

  const center_tick_marksGeom = new THREE.BoxGeometry(0.15, 0.012, 0.009);
  const center_tick_marks = new THREE.InstancedMesh(
    center_tick_marksGeom,
    inkMat,
    24
  );
  let centerTickIndex = 0;
  for (let i = 0; i < 12; i++) {
    const y = -0.95 + i * 0.173;
    const lengthScale = i % 4 === 0 ? 1.25 : 0.72;
    tickQuat.identity();
    tickScale.set(lengthScale, 1, 1);
    tickMatrix.compose(
      new THREE.Vector3(0, y, 0.047),
      tickQuat,
      tickScale
    );
    center_tick_marks.setMatrixAt(centerTickIndex++, tickMatrix);

    tickQuat.setFromAxisAngle(zAxis, Math.PI / 2);
    tickScale.set(lengthScale, 1, 1);
    tickMatrix.compose(
      new THREE.Vector3(0.92, y, 0.047),
      tickQuat,
      tickScale
    );
    center_tick_marks.setMatrixAt(centerTickIndex++, tickMatrix);
  }
  center_tick_marks.instanceMatrix.needsUpdate = true;
  root.add(center_tick_marks);

  const pointer_needleGeom = new THREE.BoxGeometry(2.34, 0.035, 0.018);
  const pointer_needle = new THREE.Mesh(pointer_needleGeom, inkMat);
  const pointerAngle = -Math.PI * 0.39;
  pointer_needle.rotation.z = pointerAngle;
  pointer_needle.position.set(
    Math.cos(pointerAngle) * 1.17,
    Math.sin(pointerAngle) * 1.17,
    0.075
  );
  root.add(pointer_needle);

  const pointer_tipGeom = new THREE.ConeGeometry(0.065, 0.18, 3);
  const pointer_tip = new THREE.Mesh(pointer_tipGeom, inkMat);
  pointer_tip.rotation.z = pointerAngle - Math.PI / 2;
  pointer_tip.position.set(
    Math.cos(pointerAngle) * 2.36,
    Math.sin(pointerAngle) * 2.36,
    0.075
  );
  root.add(pointer_tip);

  const hub_baseGeom = new THREE.CylinderGeometry(0.43, 0.43, 0.1, 64);
  const hub_base = new THREE.Mesh(hub_baseGeom, hubMat);
  hub_base.rotation.x = Math.PI / 2;
  hub_base.position.z = 0.105;
  root.add(hub_base);

  const hub_bevelGeom = new THREE.CylinderGeometry(0.37, 0.42, 0.07, 64);
  const hub_bevel = new THREE.Mesh(hub_bevelGeom, hubMat);
  hub_bevel.rotation.x = Math.PI / 2;
  hub_bevel.position.z = 0.165;
  root.add(hub_bevel);

  const hub_faceGeom = new THREE.CircleGeometry(0.36, 64);
  const hub_face = new THREE.Mesh(hub_faceGeom, hubMat);
  hub_face.position.z = 0.202;
  root.add(hub_face);

  const hub_washerGeom = new THREE.CylinderGeometry(0.1, 0.1, 0.035, 32);
  const hub_washer = new THREE.Mesh(hub_washerGeom, chromeMat);
  hub_washer.rotation.x = Math.PI / 2;
  hub_washer.position.z = 0.218;
  root.add(hub_washer);

  const hub_screwGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.025, 24);
  const hub_screw = new THREE.Mesh(hub_screwGeom, silverMat);
  hub_screw.rotation.x = Math.PI / 2;
  hub_screw.position.z = 0.242;
  root.add(hub_screw);

  const hub_screw_slotGeom = new THREE.BoxGeometry(0.07, 0.012, 0.008);
  const hub_screw_slot = new THREE.Mesh(hub_screw_slotGeom, hubMat);
  hub_screw_slot.rotation.z = Math.PI / 4;
  hub_screw_slot.position.z = 0.257;
  root.add(hub_screw_slot);

  const digitMap = {
    "0": ["a", "b", "c", "d", "e", "f"],
    "1": ["b", "c"],
    "2": ["a", "b", "g", "e", "d"],
    "5": ["a", "f", "g", "c", "d"],
    "6": ["a", "f", "g", "e", "c", "d"],
    "9": ["a", "b", "c", "d", "f", "g"],
  };
  const digitW = 0.16;
  const digitH = 0.28;
  const digitT = 0.025;
  const digitGap = 0.045;
  const digitTransforms = [];

  function addDigitTransform(x, y, rotation, code) {
    const horizontalLength = digitW - digitT;
    const verticalLength = digitH * 0.5 - digitT;
    const definitions = {
      a: [0, digitH * 0.5, horizontalLength, digitT],
      b: [digitW * 0.5, digitH * 0.25, digitT, verticalLength],
      c: [digitW * 0.5, -digitH * 0.25, digitT, verticalLength],
      d: [0, -digitH * 0.5, horizontalLength, digitT],
      e: [-digitW * 0.5, -digitH * 0.25, digitT, verticalLength],
      f: [-digitW * 0.5, digitH * 0.25, digitT, verticalLength],
      g: [0, 0, horizontalLength, digitT],
    };
    const c = Math.cos(rotation);
    const s = Math.sin(rotation);
    for (const segment of digitMap[code]) {
      const def = definitions[segment];
      const lx = def[0];
      const ly = def[1];
      digitTransforms.push({
        x: x + lx * c - ly * s,
        y: y + lx * s + ly * c,
        rotation,
        sx: def[2],
        sy: def[3],
      });
    }
  }

  function addDigitLabel(text, x, y, rotation) {
    const totalWidth = text.length * digitW + (text.length - 1) * digitGap;
    for (let i = 0; i < text.length; i++) {
      const lx = -totalWidth * 0.5 + digitW * 0.5 + i * (digitW + digitGap);
      addDigitTransform(x, y, rotation, text[i], lx);
    }
  }

  addDigitLabel("10", 0, 1.72, 0);
  addDigitLabel("6", -1.72, 0.82, -0.72);
  addDigitLabel("2", -1.95, -0.18, -0.28);
  addDigitLabel("0", -1.86, -0.72, 0.08);
  addDigitLabel("9", 1.48, 0.88, 0.72);
  addDigitLabel("0", 2.05, 0.22, 0.2);
  addDigitLabel("20", 1.82, -0.66, 0.3);
  addDigitLabel("6", 0.92, 0.03, Math.PI / 2);

  const outer_numeralsGeom = new THREE.BoxGeometry(1, 1, 1);
  const outer_numerals = new THREE.InstancedMesh(
    outer_numeralsGeom,
    inkMat,
    digitTransforms.length
  );
  for (let i = 0; i < digitTransforms.length; i++) {
    const t = digitTransforms[i];
    tickQuat.setFromAxisAngle(zAxis, t.rotation);
    tickScale.set(t.sx, t.sy, 0.012);
    tickMatrix.compose(
      new THREE.Vector3(t.x, t.y, 0.036),
      tickQuat,
      tickScale
    );
    outer_numerals.setMatrixAt(i, tickMatrix);
  }
  outer_numerals.instanceMatrix.needsUpdate = true;
  root.add(outer_numerals);

  fitToUnitCube(root);
  return root;

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
}