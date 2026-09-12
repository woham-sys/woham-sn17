// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const book = new THREE.Group();
  root.add(book);

  const bookW = 1.16;
  const bookH = 1.42;
  const coverDepth = 0.028;
  const pageDepth = 0.105;
  const frontZ = 0.078;
  const backZ = -0.078;

  const coverMat = new THREE.MeshStandardMaterial({
    color: 0x5b1829,
    metalness: 0.0,
    roughness: 0.95,
  });
  const coverEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x47121f,
    metalness: 0.0,
    roughness: 0.95,
  });
  const page_blockMat = new THREE.MeshStandardMaterial({
    color: 0xe8e0cf,
    metalness: 0.0,
    roughness: 0.9,
  });
  const page_edge_linesMat = new THREE.MeshStandardMaterial({
    color: 0xc8bea8,
    metalness: 0.0,
    roughness: 0.9,
  });
  const spiral_ringsMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.2,
  });
  const binding_holesMat = new THREE.MeshStandardMaterial({
    color: 0x171014,
    metalness: 0.0,
    roughness: 0.8,
  });
  const gold_titleMat = new THREE.MeshStandardMaterial({
    color: 0xd8bf68,
    metalness: 0.5,
    roughness: 0.25,
  });

  function createRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;

    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    return shape;
  }

  const page_blockGeom = new THREE.ExtrudeGeometry(
    createRoundedRectShape(1.07, 1.31, 0.025),
    {
      depth: pageDepth,
      steps: 1,
      bevelEnabled: false,
      curveSegments: 8,
    }
  );
  const page_block = new THREE.Mesh(page_blockGeom, page_blockMat);
  page_block.position.set(0.018, 0, -pageDepth / 2);
  book.add(page_block);

  const back_coverGeom = new THREE.ExtrudeGeometry(
    createRoundedRectShape(bookW, bookH, 0.045),
    {
      depth: coverDepth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.006,
      bevelSegments: 3,
      curveSegments: 10,
    }
  );
  const back_cover = new THREE.Mesh(back_coverGeom, coverMat);
  back_cover.position.z = backZ;
  book.add(back_cover);

  const front_coverGeom = new THREE.ExtrudeGeometry(
    createRoundedRectShape(bookW, bookH, 0.045),
    {
      depth: coverDepth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.006,
      bevelSegments: 3,
      curveSegments: 10,
    }
  );
  const front_cover = new THREE.Mesh(front_coverGeom, coverMat);
  front_cover.position.z = frontZ;
  book.add(front_cover);

  const spineGeom = new THREE.CylinderGeometry(0.09, 0.09, 1.34, 28);
  const spine = new THREE.Mesh(spineGeom, coverMat);
  spine.position.set(-bookW / 2 + 0.012, 0, 0);
  spine.scale.set(0.5, 1, 1);
  book.add(spine);

  const front_hingeGeom = new THREE.CylinderGeometry(0.012, 0.012, 1.31, 14);
  const front_hinge = new THREE.Mesh(front_hingeGeom, coverEdgeMat);
  front_hinge.position.set(-0.49, 0, 0.108);
  book.add(front_hinge);

  const back_hinge = new THREE.Mesh(front_hingeGeom, coverEdgeMat);
  back_hinge.position.set(-0.49, 0, -0.108);
  book.add(back_hinge);

  const page_edge_linesGeom = new THREE.BoxGeometry(0.006, 0.003, 0.092);
  const page_edge_lines = new THREE.InstancedMesh(
    page_edge_linesGeom,
    page_edge_linesMat,
    13
  );
  const pageLineDummy = new THREE.Object3D();
  for (let i = 0; i < 13; i++) {
    pageLineDummy.position.set(0.557, -0.57 + i * 0.095, 0);
    pageLineDummy.rotation.set(0, 0, 0);
    pageLineDummy.scale.set(1, 1, 1);
    pageLineDummy.updateMatrix();
    page_edge_lines.setMatrixAt(i, pageLineDummy.matrix);
  }
  page_edge_lines.instanceMatrix.needsUpdate = true;
  book.add(page_edge_lines);

  const ringCount = 12;
  const spiral_ringsGeom = new THREE.TorusGeometry(0.083, 0.009, 10, 32);
  const spiral_rings = new THREE.InstancedMesh(
    spiral_ringsGeom,
    spiral_ringsMat,
    ringCount
  );
  const ringDummy = new THREE.Object3D();
  for (let i = 0; i < ringCount; i++) {
    ringDummy.position.set(-0.61, 0.59 - i * 0.105, 0);
    ringDummy.rotation.set(Math.PI / 2, 0, 0);
    ringDummy.scale.set(1.25, 1.5, 1);
    ringDummy.updateMatrix();
    spiral_rings.setMatrixAt(i, ringDummy.matrix);
  }
  spiral_rings.instanceMatrix.needsUpdate = true;
  book.add(spiral_rings);

  const binding_holesGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.007, 18);
  const binding_holes = new THREE.InstancedMesh(
    binding_holesGeom,
    binding_holesMat,
    ringCount
  );
  const holeDummy = new THREE.Object3D();
  for (let i = 0; i < ringCount; i++) {
    holeDummy.position.set(-0.548, 0.59 - i * 0.105, 0.111);
    holeDummy.rotation.set(Math.PI / 2, 0, 0);
    holeDummy.scale.set(1, 1, 1);
    holeDummy.updateMatrix();
    binding_holes.setMatrixAt(i, holeDummy.matrix);
  }
  binding_holes.instanceMatrix.needsUpdate = true;
  book.add(binding_holes);

  const gold_titleGeom = new THREE.BoxGeometry(1, 1, 1);
  const titleSegments = [];

  const glyphs = {
    A: [
      [0, 0, 0.5, 1],
      [0.5, 1, 1, 0],
      [0.22, 0.45, 0.78, 0.45],
    ],
    C: [
      [0.1, 0, 0.9, 0],
      [0.1, 0, 0.1, 1],
      [0.1, 1, 0.9, 1],
    ],
    E: [
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 0.5, 0.82, 0.5],
      [0, 1, 1, 1],
    ],
    H: [
      [0, 0, 0, 1],
      [1, 0, 1, 1],
      [0, 0.5, 1, 0.5],
    ],
    I: [
      [0, 0, 1, 0],
      [0.5, 0, 0.5, 1],
      [0, 1, 1, 1],
    ],
    M: [
      [0, 0, 0, 1],
      [0, 1, 0.5, 0.48],
      [0.5, 0.48, 1, 1],
      [1, 1, 1, 0],
    ],
    N: [
      [0, 0, 0, 1],
      [0, 1, 1, 0],
      [1, 0, 1, 1],
    ],
    O: [
      [0, 0, 0, 1],
      [0, 1, 1, 1],
      [1, 1, 1, 0],
      [1, 0, 0, 0],
    ],
    P: [
      [0, 0, 0, 1],
      [0, 1, 1, 1],
      [1, 1, 1, 0.5],
      [1, 0.5, 0, 0.5],
    ],
    R: [
      [0, 0, 0, 1],
      [0, 1, 1, 1],
      [1, 1, 1, 0.52],
      [1, 0.52, 0, 0.52],
      [0.5, 0.52, 1, 0],
    ],
    V: [
      [0, 1, 0.5, 0],
      [0.5, 0, 1, 1],
    ],
    "/": [
      [0, 0, 1, 1],
    ],
  };

  function appendText(text, centerX, baselineY, charW, charH, gap, stroke) {
    const totalW = text.length * charW + (text.length - 1) * gap;
    const startX = centerX - totalW / 2;

    for (let i = 0; i < text.length; i++) {
      const segments = glyphs[text[i]] || [];
      const letterX = startX + i * (charW + gap);

      for (const segment of segments) {
        titleSegments.push({
          x1: letterX + segment[0] * charW,
          y1: baselineY + segment[1] * charH,
          x2: letterX + segment[2] * charW,
          y2: baselineY + segment[3] * charH,
          stroke,
        });
      }
    }
  }

  appendText("HR/EIM", 0.1, 0.17, 0.075, 0.13, 0.018, 0.011);
  appendText("PICEEROAN", 0.1, -0.005, 0.066, 0.13, 0.012, 0.01);

  const gold_title = new THREE.InstancedMesh(
    gold_titleGeom,
    gold_titleMat,
    titleSegments.length
  );
  const titleDummy = new THREE.Object3D();
  for (let i = 0; i < titleSegments.length; i++) {
    const segment = titleSegments[i];
    const dx = segment.x2 - segment.x1;
    const dy = segment.y2 - segment.y1;
    const length = Math.sqrt(dx * dx + dy * dy);

    titleDummy.position.set(
      (segment.x1 + segment.x2) / 2,
      (segment.y1 + segment.y2) / 2,
      0.113
    );
    titleDummy.rotation.set(0, 0, Math.atan2(dy, dx));
    titleDummy.scale.set(length, segment.stroke, 0.006);
    titleDummy.updateMatrix();
    gold_title.setMatrixAt(i, titleDummy.matrix);
  }
  gold_title.instanceMatrix.needsUpdate = true;
  book.add(gold_title);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}