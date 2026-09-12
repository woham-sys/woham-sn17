// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const ruler_assembly = new THREE.Group();
  ruler_assembly.rotation.z = -0.72;
  root.add(ruler_assembly);

  const rulerW = 0.72;
  const rulerL = 5.2;
  const rulerT = 0.05;
  const cornerR = 0.025;
  const holeR = 0.115;
  const holeY = 1.95;
  const topZ = rulerT / 2;

  const ruler_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const ruler_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.0,
    roughness: 0.8
  });
  const brushed_linesMat = new THREE.MeshStandardMaterial({
    color: 0x9d9d9d,
    metalness: 0.0,
    roughness: 0.8
  });

  const ruler_bodyShape = new THREE.Shape();
  const x0 = -rulerW / 2;
  const x1 = rulerW / 2;
  const y0 = -rulerL / 2;
  const y1 = rulerL / 2;

  ruler_bodyShape.moveTo(x0 + cornerR, y0);
  ruler_bodyShape.lineTo(x1 - cornerR, y0);
  ruler_bodyShape.quadraticCurveTo(x1, y0, x1, y0 + cornerR);
  ruler_bodyShape.lineTo(x1, y1 - cornerR);
  ruler_bodyShape.quadraticCurveTo(x1, y1, x1 - cornerR, y1);
  ruler_bodyShape.lineTo(x0 + cornerR, y1);
  ruler_bodyShape.quadraticCurveTo(x0, y1, x0, y1 - cornerR);
  ruler_bodyShape.lineTo(x0, y0 + cornerR);
  ruler_bodyShape.quadraticCurveTo(x0, y0, x0 + cornerR, y0);

  const hanging_holePath = new THREE.Path();
  hanging_holePath.absarc(0, holeY, holeR, 0, Math.PI * 2, true);
  ruler_bodyShape.holes.push(hanging_holePath);

  const ruler_bodyGeom = new THREE.ExtrudeGeometry(ruler_bodyShape, {
    depth: rulerT,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
    curveSegments: 24
  });
  const ruler_body = new THREE.Mesh(ruler_bodyGeom, ruler_bodyMat);
  ruler_body.position.z = -rulerT / 2;
  ruler_assembly.add(ruler_body);

  const side_edgesGeom = new THREE.BoxGeometry(0.012, rulerL - 0.08, rulerT + 0.008);
  const side_edges = new THREE.InstancedMesh(side_edgesGeom, ruler_edgeMat, 2);
  const edge_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    edge_dummy.position.set(i === 0 ? -rulerW / 2 + 0.004 : rulerW / 2 - 0.004, 0, 0);
    edge_dummy.updateMatrix();
    side_edges.setMatrixAt(i, edge_dummy.matrix);
  }
  side_edges.instanceMatrix.needsUpdate = true;
  ruler_assembly.add(side_edges);

  const end_edgesGeom = new THREE.BoxGeometry(rulerW - 0.08, 0.012, rulerT + 0.008);
  const end_edges = new THREE.InstancedMesh(end_edgesGeom, ruler_edgeMat, 2);
  for (let i = 0; i < 2; i++) {
    edge_dummy.position.set(0, i === 0 ? -rulerL / 2 + 0.004 : rulerL / 2 - 0.004, 0);
    edge_dummy.updateMatrix();
    end_edges.setMatrixAt(i, edge_dummy.matrix);
  }
  end_edges.instanceMatrix.needsUpdate = true;
  ruler_assembly.add(end_edges);

  const hanging_hole_rimGeom = new THREE.RingGeometry(holeR + 0.001, holeR + 0.014, 40);
  const hanging_hole_rim = new THREE.Mesh(hanging_hole_rimGeom, ruler_edgeMat);
  hanging_hole_rim.position.set(0, holeY, topZ + 0.003);
  ruler_assembly.add(hanging_hole_rim);

  const brushed_linesGeom = new THREE.BoxGeometry(1, 1, 1);
  const brushedLineCount = 28;
  const brushed_lines = new THREE.InstancedMesh(
    brushed_linesGeom,
    brushed_linesMat,
    brushedLineCount
  );
  const brush_dummy = new THREE.Object3D();
  for (let i = 0; i < brushedLineCount; i++) {
    const t = i / (brushedLineCount - 1);
    const y = -2.35 + t * 4.7;
    const length = 0.18 + ((i * 7) % 9) * 0.024;
    const x = (((i * 5) % 11) - 5) * 0.018;
    brush_dummy.position.set(x, y, topZ + 0.0015);
    brush_dummy.rotation.set(0, 0, i % 2 === 0 ? 0.018 : -0.018);
    brush_dummy.scale.set(length, 0.0015, 0.001);
    brush_dummy.updateMatrix();
    brushed_lines.setMatrixAt(i, brush_dummy.matrix);
  }
  brushed_lines.instanceMatrix.needsUpdate = true;
  ruler_assembly.add(brushed_lines);

  const tick_marksGeom = new THREE.BoxGeometry(1, 1, 1);
  const tickCount = 101;
  const tickStart = -2.42;
  const tickSpan = 4.84;
  const tick_marks = new THREE.InstancedMesh(tick_marksGeom, markingMat, tickCount);
  const tick_dummy = new THREE.Object3D();

  for (let i = 0; i < tickCount; i++) {
    const y = tickStart + tickSpan * i / (tickCount - 1);
    let length = 0.075;
    let thickness = 0.006;

    if (i % 10 === 0) {
      length = 0.205;
      thickness = 0.009;
    } else if (i % 5 === 0) {
      length = 0.145;
      thickness = 0.0075;
    }

    const leftX = -rulerW / 2 + 0.012;
    const rightX = rulerW / 2 - 0.012;

    tick_dummy.position.set(leftX + length / 2, y, topZ + 0.004);
    tick_dummy.rotation.set(0, 0, 0);
    tick_dummy.scale.set(length, thickness, 0.004);
    tick_dummy.updateMatrix();
    tick_marks.setMatrixAt(i, tick_dummy.matrix);

    tick_dummy.position.set(rightX - length / 2, y, topZ + 0.004);
    tick_dummy.updateMatrix();
    tick_marks.setMatrixAt(i + 1, tick_dummy.matrix);
  }
  tick_marks.instanceMatrix.needsUpdate = true;
  ruler_assembly.add(tick_marks);

  const digitSegments = {
    "0": ["a", "b", "c", "d", "e", "f"],
    "1": ["b", "c"],
    "2": ["a", "b", "g", "e", "d"],
    "3": ["a", "b", "g", "c", "d"],
    "4": ["f", "g", "b", "c"],
    "5": ["a", "f", "g", "c", "d"],
    "6": ["a", "f", "g", "e", "c", "d"],
    "7": ["a", "b", "c"],
    "8": ["a", "b", "c", "d", "e", "f", "g"],
    "9": ["a", "b", "c", "d", "f", "g"]
  };
  const segmentDefs = {
    a: [0, 0.052, 0.052, 0.009],
    b: [0.028, 0.026, 0.009, 0.045],
    c: [0.028, -0.026, 0.009, 0.045],
    d: [0, -0.052, 0.052, 0.009],
    e: [-0.028, -0.026, 0.009, 0.045],
    f: [-0.028, 0.026, 0.009, 0.045],
    g: [0, 0, 0.052, 0.009]
  };

  const labelSpecs = [
    [-2.28, "0"],
    [-1.70, "1"],
    [-1.12, "2"],
    [-0.54, "3"],
    [0.04, "4"],
    [0.62, "5"],
    [1.20, "6"],
    [1.78, "7"]
  ];

  let labelCount = 0;
  for (const spec of labelSpecs) {
    labelCount += digitSegments[spec[1]].length;
  }

  const scale_labelsGeom = new THREE.BoxGeometry(1, 1, 1);
  const scale_labels = new THREE.InstancedMesh(scale_labelsGeom, markingMat, labelCount);
  const label_dummy = new THREE.Object3D();
  const labelX = 0.075;
  let labelIndex = 0;

  for (const spec of labelSpecs) {
    const digit = spec[1];
    const centerY = spec[0];
    for (const segmentName of digitSegments[digit]) {
      const def = segmentDefs[segmentName];
      label_dummy.position.set(
        labelX + def[0],
        centerY + def[1],
        topZ + 0.005
      );
      label_dummy.rotation.set(0, 0, 0);
      label_dummy.scale.set(def[2], def[3], 0.004);
      label_dummy.updateMatrix();
      scale_labels.setMatrixAt(labelIndex, label_dummy.matrix);
      labelIndex++;
    }
  }
  scale_labels.instanceMatrix.needsUpdate = true;
  ruler_assembly.add(scale_labels);

  fitToUnitCube(THREE, root);
  return root;

  function tick_marksAt(index, matrix) {
    tick_marks.setMatrixAt(index, matrix);
  }

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