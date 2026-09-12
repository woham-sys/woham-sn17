// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const measuring_tape = new THREE.Group();
  const tape_assembly = new THREE.Group();
  const handle_assembly = new THREE.Group();

  root.add(measuring_tape);
  measuring_tape.add(tape_assembly, handle_assembly);
  measuring_tape.rotation.y = -Math.PI / 4;

  const tapeLength = 5.6;
  const tapeWidth = 0.62;
  const tapeThickness = 0.035;
  const tapeTop = tapeThickness / 2;

  const tape_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ee,
    metalness: 0.0,
    roughness: 0.7
  });
  const yellow_plasticMat = new THREE.MeshStandardMaterial({
    color: 0xffd900,
    metalness: 0.0,
    roughness: 0.3
  });
  const recessed_yellowMat = new THREE.MeshStandardMaterial({
    color: 0xe5bd00,
    metalness: 0.0,
    roughness: 0.3
  });
  const black_inkMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.0,
    roughness: 0.7
  });
  const red_inkMat = new THREE.MeshStandardMaterial({
    color: 0xd92525,
    metalness: 0.0,
    roughness: 0.7
  });
  const rivetMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const rivet_centerMat = new THREE.MeshStandardMaterial({
    color: 0x555555,
    metalness: 0.5,
    roughness: 0.25
  });

  const tape_bodyGeom = new THREE.BoxGeometry(tapeLength, tapeThickness, tapeWidth);
  const tape_body = new THREE.Mesh(tape_bodyGeom, tape_bodyMat);
  tape_assembly.add(tape_body);

  const edge_lineGeom = new THREE.BoxGeometry(tapeLength - 0.08, 0.004, 0.012);

  const front_edge_line = new THREE.Mesh(edge_lineGeom, black_inkMat);
  front_edge_line.position.set(0, tapeTop + 0.003, tapeWidth / 2 - 0.012);
  tape_assembly.add(front_edge_line);

  const rear_edge_line = new THREE.Mesh(edge_lineGeom, black_inkMat);
  rear_edge_line.position.set(0, tapeTop + 0.003, -tapeWidth / 2 + 0.012);
  tape_assembly.add(rear_edge_line);

  const tickStart = -tapeLength / 2 + 0.28;
  const tickEnd = tapeLength / 2 - 0.28;
  const tickCount = 121;
  const tick_marksGeom = new THREE.BoxGeometry(1, 1, 1);
  const tick_marks = new THREE.InstancedMesh(tick_marksGeom, black_inkMat, tickCount * 2);
  const tick_dummy = new THREE.Object3D();
  let tickIndex = 0;

  for (let i = 0; i < tickCount; i++) {
    const x = tickStart + (tickEnd - tickStart) * i / (tickCount - 1);
    const isMajor = i % 10 === 0;
    const isMedium = i % 5 === 0;
    const length = isMajor ? 0.22 : isMedium ? 0.16 : 0.105;

    tick_dummy.position.set(x, tapeTop + 0.004, tapeWidth / 2 - 0.018 - length / 2);
    tick_dummy.rotation.set(0, 0, 0);
    tick_dummy.scale.set(0.012, 0.005, length);
    tick_dummy.updateMatrix();
    tick_marks.setMatrixAt(tickIndex++, tick_dummy.matrix);

    tick_dummy.position.set(x, tapeTop + 0.004, -tapeWidth / 2 + 0.018 + length / 2);
    tick_dummy.updateMatrix();
    tick_marks.setMatrixAt(tickIndex++, tick_dummy.matrix);
  }
  tick_marks.instanceMatrix.needsUpdate = true;
  tape_assembly.add(tick_marks);

  const digitPatterns = [
    [0, 1, 2, 3, 4, 5],
    [1, 2],
    [0, 1, 6, 4, 3],
    [0, 1, 6, 2, 3],
    [5, 6, 1, 2],
    [0, 5, 6, 2, 3],
    [0, 5, 6, 4, 2, 3],
    [0, 1, 2],
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 5, 6]
  ];
  const segmentDefs = [
    { u: 0, v: 0.070, su: 0.060, sv: 0.010 },
    { u: 0.035, v: 0.035, su: 0.010, sv: 0.060 },
    { u: 0.035, v: -0.035, su: 0.010, sv: 0.060 },
    { u: 0, v: -0.070, su: 0.060, sv: 0.010 },
    { u: -0.035, v: -0.035, su: 0.010, sv: 0.060 },
    { u: -0.035, v: 0.035, su: 0.010, sv: 0.060 },
    { u: 0, v: 0, su: 0.060, sv: 0.010 }
  ];

  const blackSegmentData = [];
  const redSegmentData = [];
  const labelStart = -tapeLength / 2 + 0.48;
  const labelEnd = tapeLength / 2 - 0.48;

  for (let value = 1; value <= 12; value++) {
    const x = labelStart + (labelEnd - labelStart) * (value - 1) / 11;
    const digits = String(value);
    const target = value % 3 === 0 ? redSegmentData : blackSegmentData;
    const digitSpacing = 0.085;
    const digitCenterOffset = (digits.length - 1) * digitSpacing / 2;

    for (let d = 0; d < digits.length; d++) {
      const digit = Number(digits[d]);
      const digitOffset = d * digitSpacing - digitCenterOffset;
      const pattern = digitPatterns[digit];
      for (let p = 0; p < pattern.length; p++) {
        const segment = segmentDefs[pattern[p]];
        target.push({
          x: x + digitOffset + segment.u,
          z: tapeWidth / 2 - 0.125 + segment.v,
          sx: segment.su,
          sz: segment.sv
        });
      }
    }
  }

  const printed_numbersGeom = new THREE.BoxGeometry(1, 1, 1);

  function createPrintedNumbers(data, material) {
    const numbers = new THREE.InstancedMesh(printed_numbersGeom, material, data.length);
    const number_dummy = new THREE.Object3D();

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      number_dummy.position.set(item.x, tapeTop + 0.006, item.z);
      number_dummy.rotation.set(0, 0, 0);
      number_dummy.scale.set(item.sx, 0.005, item.sz);
      number_dummy.updateMatrix();
      numbers.setMatrixAt(i, number_dummy.matrix);
    }

    numbers.instanceMatrix.needsUpdate = true;
    return numbers;
  }

  const printed_numbers_black = createPrintedNumbers(blackSegmentData, black_inkMat);
  const printed_numbers_red = createPrintedNumbers(redSegmentData, red_inkMat);
  tape_assembly.add(printed_numbers_black, printed_numbers_red);

  const end_markerGeom = new THREE.BoxGeometry(0.018, 0.005, 0.15);
  const end_markers = new THREE.InstancedMesh(end_markerGeom, red_inkMat, 3);
  const end_marker_dummy = new THREE.Object3D();

  for (let i = 0; i < 3; i++) {
    end_marker_dummy.position.set(-tapeLength / 2 + 0.17 + i * 0.045, tapeTop + 0.006, -0.075);
    end_marker_dummy.updateMatrix();
    end_markers.setMatrixAt(i, end_marker_dummy.matrix);
  }
  end_markers.instanceMatrix.needsUpdate = true;
  tape_assembly.add(end_markers);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(0, -0.34);
  handleShape.bezierCurveTo(-0.18, -0.34, -0.28, -0.25, -0.31, -0.08);
  handleShape.bezierCurveTo(-0.35, 0.14, -0.31, 0.34, -0.18, 0.44);
  handleShape.bezierCurveTo(-0.08, 0.51, 0.08, 0.51, 0.18, 0.44);
  handleShape.bezierCurveTo(0.31, 0.34, 0.35, 0.14, 0.31, -0.08);
  handleShape.bezierCurveTo(0.28, -0.25, 0.18, -0.34, 0, -0.34);

  const handleHole = new THREE.Path();
  handleHole.moveTo(-0.08, 0.10);
  handleHole.bezierCurveTo(-0.08, 0.02, -0.05, -0.04, 0, -0.04);
  handleHole.bezierCurveTo(0.05, -0.04, 0.08, 0.02, 0.08, 0.10);
  handleHole.bezierCurveTo(0.08, 0.18, 0.05, 0.23, 0, 0.23);
  handleHole.bezierCurveTo(-0.05, 0.23, -0.08, 0.18, -0.08, 0.10);
  handleShape.holes.push(handleHole);

  const end_handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.14,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
    curveSegments: 16
  });

  const right_handle = new THREE.Mesh(end_handleGeom, yellow_plasticMat);
  right_handle.rotation.x = Math.PI / 2;
  right_handle.position.set(tapeLength / 2 + 0.34, 0.07, 0);
  handle_assembly.add(right_handle);

  const left_handle = new THREE.Mesh(end_handleGeom, yellow_plasticMat);
  left_handle.rotation.x = Math.PI / 2;
  left_handle.scale.x = -1;
  left_handle.position.set(-tapeLength / 2 - 0.34, 0.07, 0);
  handle_assembly.add(left_handle);

  const connectorShape = new THREE.Shape();
  connectorShape.moveTo(-0.34, -0.29);
  connectorShape.lineTo(0.18, -0.29);
  connectorShape.bezierCurveTo(0.30, -0.29, 0.36, -0.19, 0.36, -0.07);
  connectorShape.lineTo(0.36, 0.07);
  connectorShape.bezierCurveTo(0.36, 0.19, 0.30, 0.29, 0.18, 0.29);
  connectorShape.lineTo(-0.34, 0.29);
  connectorShape.bezierCurveTo(-0.43, 0.29, -0.47, 0.20, -0.47, 0.09);
  connectorShape.lineTo(-0.47, -0.09);
  connectorShape.bezierCurveTo(-0.47, -0.20, -0.43, -0.29, -0.34, -0.29);

  const handle_connectorGeom = new THREE.ExtrudeGeometry(connectorShape, {
    depth: 0.13,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.022,
    bevelSize: 0.022,
    bevelSegments: 3,
    curveSegments: 12
  });

  const right_handle_connector = new THREE.Mesh(handle_connectorGeom, yellow_plasticMat);
  right_handle_connector.rotation.x = Math.PI / 2;
  right_handle_connector.position.set(tapeLength / 2 + 0.04, 0.065, 0);
  handle_assembly.add(right_handle_connector);

  const left_handle_connector = new THREE.Mesh(handle_connectorGeom, yellow_plasticMat);
  left_handle_connector.rotation.x = Math.PI / 2;
  left_handle_connector.scale.x = -1;
  left_handle_connector.position.set(-tapeLength / 2 - 0.04, 0.065, 0);
  handle_assembly.add(left_handle_connector);

  const grip_insetGeom = new THREE.SphereGeometry(1, 24, 12);

  const right_grip_inset = new THREE.Mesh(grip_insetGeom, recessed_yellowMat);
  right_grip_inset.scale.set(0.145, 0.012, 0.205);
  right_grip_inset.position.set(tapeLength / 2 + 0.34, 0.078, 0.105);
  handle_assembly.add(right_grip_inset);

  const left_grip_inset = new THREE.Mesh(grip_insetGeom, recessed_yellowMat);
  left_grip_inset.scale.set(0.145, 0.012, 0.205);
  left_grip_inset.position.set(-tapeLength / 2 - 0.34, 0.078, 0.105);
  handle_assembly.add(left_grip_inset);

  const rivet_baseGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.018, 24);
  const rivet_capGeom = new THREE.CylinderGeometry(0.064, 0.064, 0.025, 24);
  const rivet_centerGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.029, 18);

  const right_rivet_base = new THREE.Mesh(rivet_baseGeom, rivet_centerMat);
  right_rivet_base.position.set(tapeLength / 2 + 0.04, 0.083, 0);
  handle_assembly.add(right_rivet_base);

  const left_rivet_base = new THREE.Mesh(rivet_baseGeom, rivet_centerMat);
  left_rivet_base.position.set(-tapeLength / 2 - 0.04, 0.083, 0);
  handle_assembly.add(left_rivet_base);

  const right_rivet = new THREE.Mesh(rivet_capGeom, rivetMat);
  right_rivet.position.set(tapeLength / 2 + 0.04, 0.101, 0);
  handle_assembly.add(right_rivet);

  const left_rivet = new THREE.Mesh(rivet_capGeom, rivetMat);
  left_rivet.position.set(-tapeLength / 2 - 0.04, 0.101, 0);
  handle_assembly.add(left_rivet);

  const right_rivet_center = new THREE.Mesh(rivet_centerGeom, rivet_centerMat);
  right_rivet_center.position.set(tapeLength / 2 + 0.04, 0.111, 0);
  handle_assembly.add(right_rivet_center);

  const left_rivet_center = new THREE.Mesh(rivet_centerGeom, rivet_centerMat);
  left_rivet_center.position.set(-tapeLength / 2 - 0.04, 0.111, 0);
  handle_assembly.add(left_rivet_center);

  const left_secondary_rivet = new THREE.Mesh(rivet_capGeom, rivetMat);
  left_secondary_rivet.scale.setScalar(0.62);
  left_secondary_rivet.position.set(-tapeLength / 2 - 0.25, 0.096, -0.075);
  handle_assembly.add(left_secondary_rivet);

  const left_secondary_rivet_center = new THREE.Mesh(rivet_centerGeom, rivet_centerMat);
  left_secondary_rivet_center.scale.setScalar(0.62);
  left_secondary_rivet_center.position.set(-tapeLength / 2 - 0.25, 0.106, -0.075);
  handle_assembly.add(left_secondary_rivet_center);

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