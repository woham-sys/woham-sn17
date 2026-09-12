// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vintage_leather_journal";

  const coverW = 1.16;
  const coverH = 1.42;
  const coverDepth = 0.045;
  const pageW = 1.02;
  const pageH = 1.29;
  const pageDepth = 0.075;

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x5a3022,
    metalness: 0.0,
    roughness: 0.7
  });
  const darkLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x351a13,
    metalness: 0.0,
    roughness: 0.7
  });
  const wornLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x8a5735,
    metalness: 0.0,
    roughness: 0.7
  });
  const stitchMat = new THREE.MeshStandardMaterial({
    color: 0xb07a4b,
    metalness: 0.0,
    roughness: 0.95
  });
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xf1e7c9,
    metalness: 0.0,
    roughness: 0.9
  });
  const pageEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xd8c9a5,
    metalness: 0.0,
    roughness: 0.9
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x20272b,
    metalness: 0.0,
    roughness: 0.7
  });
  const blueInkMat = new THREE.MeshStandardMaterial({
    color: 0x7898aa,
    metalness: 0.0,
    roughness: 0.7
  });
  const stainMat = new THREE.MeshStandardMaterial({
    color: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide
  });

  function roundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = -h / 2;
    const y1 = h / 2;
    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    shape.closePath();
    return shape;
  }

  function roundedExtrudeGeometry(w, h, r, depth, bevelSize, bevelThickness) {
    return new THREE.ExtrudeGeometry(roundedRectShape(w, h, r), {
      depth: depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: bevelSize,
      bevelThickness: bevelThickness
    });
  }

  const back_coverGeom = roundedExtrudeGeometry(
    coverW,
    coverH,
    0.085,
    coverDepth,
    0.012,
    0.008
  );
  const back_cover = new THREE.Mesh(back_coverGeom, leatherMat);
  back_cover.name = "back_cover";
  back_cover.position.set(0.025, 0, -0.095);
  root.add(back_cover);

  const page_blockGeom = roundedExtrudeGeometry(
    pageW,
    pageH,
    0.055,
    pageDepth,
    0.006,
    0.004
  );
  const page_block = new THREE.Mesh(page_blockGeom, pageEdgeMat);
  page_block.name = "page_block";
  page_block.position.set(0.035, 0, -0.055);
  root.add(page_block);

  const top_pageGeom = roundedExtrudeGeometry(
    pageW,
    pageH,
    0.055,
    0.012,
    0.004,
    0.003
  );
  const top_page = new THREE.Mesh(top_pageGeom, paperMat);
  top_page.name = "top_page";
  top_page.position.set(0.035, 0, 0.021);
  root.add(top_page);

  const page_edge_layersGeom = new THREE.BoxGeometry(0.006, 1.13, 0.003);
  const page_edge_layers = new THREE.InstancedMesh(
    page_edge_layersGeom,
    pageEdgeMat,
    5
  );
  page_edge_layers.name = "page_edge_layers";
  const pageEdgeDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    pageEdgeDummy.position.set(0.552, 0, -0.043 + i * 0.014);
    pageEdgeDummy.rotation.set(0, 0, 0);
    pageEdgeDummy.scale.set(1, 1, 1);
    pageEdgeDummy.updateMatrix();
    page_edge_layers.setMatrixAt(i, pageEdgeDummy.matrix);
  }
  page_edge_layers.instanceMatrix.needsUpdate = true;
  root.add(page_edge_layers);

  const bottom_page_layersGeom = new THREE.BoxGeometry(0.88, 0.004, 0.003);
  const bottom_page_layers = new THREE.InstancedMesh(
    bottom_page_layersGeom,
    pageEdgeMat,
    5
  );
  bottom_page_layers.name = "bottom_page_layers";
  const bottomLayerDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    bottomLayerDummy.position.set(0.055, -0.652, -0.043 + i * 0.014);
    bottomLayerDummy.rotation.set(0, 0, 0);
    bottomLayerDummy.scale.set(1, 1, 1);
    bottomLayerDummy.updateMatrix();
    bottom_page_layers.setMatrixAt(i, bottomLayerDummy.matrix);
  }
  bottom_page_layers.instanceMatrix.needsUpdate = true;
  root.add(bottom_page_layers);

  const spineGeom = new THREE.CapsuleGeometry(0.11, 1.18, 8, 20);
  const spine = new THREE.Mesh(spineGeom, leatherMat);
  spine.name = "spine";
  spine.position.set(-0.565, 0, -0.012);
  spine.scale.set(1, 1, 1.18);
  root.add(spine);

  const spine_bandGeom = new THREE.CylinderGeometry(0.113, 0.113, 0.035, 24);
  const spine_band_top = new THREE.Mesh(spine_bandGeom, wornLeatherMat);
  spine_band_top.name = "spine_band_top";
  spine_band_top.position.set(-0.565, 0.555, -0.012);
  spine_band_top.scale.z = 1.18;
  root.add(spine_band_top);

  const spine_band_bottom = new THREE.Mesh(spine_bandGeom, wornLeatherMat);
  spine_band_bottom.name = "spine_band_bottom";
  spine_band_bottom.position.set(-0.565, -0.555, -0.012);
  spine_band_bottom.scale.z = 1.18;
  root.add(spine_band_bottom);

  const spine_seamGeom = new THREE.CylinderGeometry(0.0045, 0.0045, 1.12, 8);
  const spine_seam = new THREE.Mesh(spine_seamGeom, darkLeatherMat);
  spine_seam.name = "spine_seam";
  spine_seam.position.set(-0.468, 0, 0.096);
  root.add(spine_seam);

  const spine_stitchesGeom = new THREE.BoxGeometry(0.008, 0.026, 0.006);
  const spine_stitches = new THREE.InstancedMesh(
    spine_stitchesGeom,
    stitchMat,
    25
  );
  spine_stitches.name = "spine_stitches";
  const stitchDummy = new THREE.Object3D();
  for (let i = 0; i < 25; i++) {
    stitchDummy.position.set(-0.468, -0.54 + i * (1.08 / 24), 0.103);
    stitchDummy.rotation.set(0, 0, 0);
    stitchDummy.scale.set(1, 1, 1);
    stitchDummy.updateMatrix();
    spine_stitches.setMatrixAt(i, stitchDummy.matrix);
  }
  spine_stitches.instanceMatrix.needsUpdate = true;
  root.add(spine_stitches);

  const right_binding_edgeGeom = new THREE.CylinderGeometry(
    0.024,
    0.024,
    1.25,
    16
  );
  const right_binding_edge = new THREE.Mesh(
    right_binding_edgeGeom,
    darkLeatherMat
  );
  right_binding_edge.name = "right_binding_edge";
  right_binding_edge.position.set(0.595, 0, -0.035);
  root.add(right_binding_edge);

  const bottom_binding_edgeGeom = new THREE.CylinderGeometry(
    0.024,
    0.024,
    0.98,
    16
  );
  const bottom_binding_edge = new THREE.Mesh(
    bottom_binding_edgeGeom,
    darkLeatherMat
  );
  bottom_binding_edge.name = "bottom_binding_edge";
  bottom_binding_edge.rotation.z = Math.PI / 2;
  bottom_binding_edge.position.set(0.045, -0.704, -0.035);
  root.add(bottom_binding_edge);

  const top_binding_edgeGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.98,
    16
  );
  const top_binding_edge = new THREE.Mesh(top_binding_edgeGeom, leatherMat);
  top_binding_edge.name = "top_binding_edge";
  top_binding_edge.rotation.z = Math.PI / 2;
  top_binding_edge.position.set(0.045, 0.704, -0.052);
  root.add(top_binding_edge);

  const page_stainsGeom = new THREE.CircleGeometry(1, 20);
  const page_stains = new THREE.InstancedMesh(page_stainsGeom, stainMat, 6);
  page_stains.name = "page_stains";
  const stainData = [
    [0.43, 0.565, 0.055, 0.028, 0.25],
    [0.475, -0.575, 0.075, 0.035, -0.35],
    [-0.18, -0.595, 0.045, 0.018, 0.1],
    [0.31, 0.08, 0.025, 0.012, 0.4],
    [-0.08, 0.585, 0.035, 0.014, -0.2],
    [0.49, 0.31, 0.022, 0.011, 0.3]
  ];
  const stainDummy = new THREE.Object3D();
  for (let i = 0; i < stainData.length; i++) {
    const data = stainData[i];
    stainDummy.position.set(data[0], data[1], 0.041);
    stainDummy.rotation.set(0, 0, data[4]);
    stainDummy.scale.set(data[2], data[3], 1);
    stainDummy.updateMatrix();
    page_stains.setMatrixAt(i, stainDummy.matrix);
  }
  page_stains.instanceMatrix.needsUpdate = true;
  root.add(page_stains);

  const ruled_linesGeom = new THREE.BoxGeometry(0.86, 0.003, 0.002);
  const ruled_lines = new THREE.InstancedMesh(ruled_linesGeom, blueInkMat, 12);
  ruled_lines.name = "ruled_lines";
  const ruleDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    ruleDummy.position.set(0.075, 0.49 - i * 0.085, 0.042);
    ruleDummy.rotation.set(0, 0, 0);
    ruleDummy.scale.set(1, 1, 1);
    ruleDummy.updateMatrix();
    ruled_lines.setMatrixAt(i, ruleDummy.matrix);
  }
  ruled_lines.instanceMatrix.needsUpdate = true;
  root.add(ruled_lines);

  const handwriting = new THREE.Group();
  handwriting.name = "handwriting";
  root.add(handwriting);

  function addWord(parent, startX, baseY, width, height, phase) {
    const points = [];
    const letters = Math.max(3, Math.round(width / 0.032));
    for (let i = 0; i <= letters * 3; i++) {
      const t = i / (letters * 3);
      const x = startX + width * t;
      const wave = Math.sin(t * Math.PI * letters * 2 + phase);
      const fine = Math.sin(t * Math.PI * letters * 4 + phase * 0.7);
      const y = baseY + wave * height * 0.34 + fine * height * 0.08;
      points.push(new THREE.Vector3(x, y, 0.045));
    }
    const wordCurve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const wordGeom = new THREE.TubeGeometry(
      wordCurve,
      letters * 5,
      0.0022,
      5,
      false
    );
    const word = new THREE.Mesh(wordGeom, inkMat);
    parent.add(word);
  }

  function addAscender(parent, x, baseY, height) {
    const points = [
      new THREE.Vector3(x, baseY, 0.045),
      new THREE.Vector3(x - 0.004, baseY + height * 0.35, 0.045),
      new THREE.Vector3(x + 0.003, baseY + height * 0.72, 0.045),
      new THREE.Vector3(x, baseY + height, 0.045),
      new THREE.Vector3(x + 0.006, baseY + height * 0.72, 0.045),
      new THREE.Vector3(x + 0.008, baseY + height * 0.25, 0.045)
    ];
    const ascenderCurve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const ascenderGeom = new THREE.TubeGeometry(
      ascenderCurve,
      14,
      0.002,
      5,
      false
    );
    const ascender = new THREE.Mesh(ascenderGeom, inkMat);
    parent.add(ascender);
  }

  function addDescender(parent, x, baseY, height) {
    const points = [
      new THREE.Vector3(x, baseY + 0.004, 0.045),
      new THREE.Vector3(x + 0.004, baseY - height * 0.25, 0.045),
      new THREE.Vector3(x - 0.002, baseY - height * 0.62, 0.045),
      new THREE.Vector3(x + 0.006, baseY - height, 0.045),
      new THREE.Vector3(x + 0.012, baseY - height * 0.72, 0.045)
    ];
    const descenderCurve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const descenderGeom = new THREE.TubeGeometry(
      descenderCurve,
      12,
      0.002,
      5,
      false
    );
    const descender = new THREE.Mesh(descenderGeom, inkMat);
    parent.add(descender);
  }

  const headline = new THREE.Group();
  headline.name = "headline";
  addWord(headline, -0.25, 0.515, 0.12, 0.035, 0.2);
  addWord(headline, -0.105, 0.515, 0.17, 0.035, 0.8);
  addWord(headline, 0.105, 0.515, 0.13, 0.035, 1.4);
  addWord(headline, 0.275, 0.515, 0.075, 0.035, 2.0);
  addAscender(headline, -0.225, 0.515, 0.055);
  addAscender(headline, 0.035, 0.515, 0.052);
  handwriting.add(headline);

  const bodyLines = [
    [-0.285, 0.425, 0.18, 0.13, 0.16, 0.25],
    [-0.085, 0.425, 0.13, 0.10, 0.12, 0.55],
    [0.075, 0.425, 0.12, 0.13, 0.08, 0.9],
    [-0.285, 0.335, 0.15, 0.12, 0.18, 0.1],
    [-0.095, 0.335, 0.12, 0.14, 0.11, 0.6],
    [0.075, 0.335, 0.13, 0.10, 0.15, 1.1],
    [-0.285, 0.245, 0.20, 0.11, 0.15, 0.35],
    [-0.055, 0.245, 0.13, 0.13, 0.12, 0.85],
    [0.115, 0.245, 0.14, 0.09, 0.16, 1.35],
    [-0.285, 0.155, 0.16, 0.14, 0.12, 0.15],
    [-0.09, 0.155, 0.13, 0.11, 0.16, 0.7],
    [0.085, 0.155, 0.14, 0.12, 0.10, 1.2],
    [-0.285, 0.065, 0.18, 0.12, 0.15, 0.45],
    [-0.075, 0.065, 0.13, 0.14, 0.11, 0.95],
    [0.095, 0.065, 0.14, 0.10, 0.15, 1.45],
    [-0.285, -0.025, 0.15, 0.13, 0.16, 0.2],
    [-0.09, -0.025, 0.14, 0.12, 0.13, 0.75],
    [0.09, -0.025, 0.13, 0.11, 0.15, 1.25],
    [-0.285, -0.115, 0.19, 0.11, 0.14, 0.5],
    [-0.06, -0.115, 0.14, 0.13, 0.12, 1.0],
    [0.115, -0.115, 0.13, 0.10, 0.15, 1.5],
    [-0.285, -0.205, 0.16, 0.13, 0.14, 0.25],
    [-0.085, -0.205, 0.13, 0.12, 0.15, 0.8],
    [0.085, -0.205, 0.14, 0.10, 0.14, 1.35],
    [-0.285, -0.295, 0.18, 0.12, 0.14, 0.55],
    [-0.075, -0.295, 0.13, 0.13, 0.12, 1.05],
    [0.095, -0.295, 0.13, 0.10, 0.15, 1.55],
    [-0.155, -0.405, 0.17, 0.13, 0.12, 0.3],
    [0.055, -0.405, 0.14, 0.12, 0.14, 0.9],
    [0.235, -0.405, 0.13, 0.10, 0.13, 1.45],
    [-0.155, -0.495, 0.18, 0.12, 0.14, 0.65],
    [0.065, -0.495, 0.13, 0.13, 0.12, 1.15],
    [0.235, -0.495, 0.13, 0.10, 0.14, 1.65],
    [-0.155, -0.585, 0.15, 0.13, 0.14, 0.15],
    [0.035, -0.585, 0.14, 0.12, 0.13, 0.7],
    [0.215, -0.585, 0.14, 0.10, 0.14, 1.25]
  ];

  for (let i = 0; i < bodyLines.length; i++) {
    const data = bodyLines[i];
    const body_word = new THREE.Group();
    body_word.name = "body_word_" + i;
    addWord(body_word, data[0], data[1], data[2], 0.034, data[5]);
    addWord(body_word, data[3], data[1], data[4], 0.034, data[5] + 0.65);
    handwriting.add(body_word);
  }

  const ascenderData = [
    [-0.245, 0.425, 0.052],
    [-0.035, 0.425, 0.05],
    [0.125, 0.425, 0.05],
    [-0.205, 0.335, 0.052],
    [0.015, 0.335, 0.05],
    [0.17, 0.335, 0.05],
    [-0.235, 0.245, 0.052],
    [-0.015, 0.245, 0.05],
    [0.16, 0.245, 0.05],
    [-0.225, 0.155, 0.052],
    [0.015, 0.155, 0.05],
    [0.18, 0.155, 0.05],
    [-0.245, 0.065, 0.052],
    [-0.015, 0.065, 0.05],
    [0.165, 0.065, 0.05],
    [-0.225, -0.025, 0.052],
    [0.015, -0.025, 0.05],
    [0.18, -0.025, 0.05],
    [-0.245, -0.115, 0.052],
    [-0.015, -0.115, 0.05],
    [0.165, -0.115, 0.05],
    [-0.225, -0.205, 0.052],
    [0.015, -0.205, 0.05],
    [0.18, -0.205, 0.05],
    [-0.245, -0.295, 0.052],
    [-0.015, -0.295, 0.05],
    [0.165, -0.295, 0.05],
    [-0.12, -0.405, 0.052],
    [0.09, -0.405, 0.05],
    [0.265, -0.405, 0.05],
    [-0.12, -0.495, 0.052],
    [0.09, -0.495, 0.05],
    [0.265, -0.495, 0.05],
    [-0.12, -0.585, 0.052],
    [0.09, -0.585, 0.05],
    [0.255, -0.585, 0.05]
  ];

  for (let i = 0; i < ascenderData.length; i++) {
    const data = ascenderData[i];
    addAscender(handwriting, data[0], data[1], data[2]);
  }

  const descenderData = [
    [0.02, 0.425, 0.035],
    [0.205, 0.335, 0.035],
    [-0.08, 0.245, 0.035],
    [0.215, 0.155, 0.035],
    [-0.105, 0.065, 0.035],
    [0.205, -0.025, 0.035],
    [-0.08, -0.115, 0.035],
    [0.205, -0.205, 0.035],
    [-0.105, -0.295, 0.035],
    [0.18, -0.405, 0.035],
    [-0.055, -0.495, 0.035],
    [0.18, -0.585, 0.035]
  ];

  for (let i = 0; i < descenderData.length; i++) {
    const data = descenderData[i];
    addDescender(handwriting, data[0], data[1], data[2]);
  }

  const leather_scuffsGeom = new THREE.BoxGeometry(0.055, 0.006, 0.003);
  const leather_scuffs = new THREE.InstancedMesh(
    leather_scuffsGeom,
    wornLeatherMat,
    10
  );
  leather_scuffs.name = "leather_scuffs";
  const scuffData = [
    [-0.59, 0.48, -0.25, 0.8],
    [-0.53, 0.39, 0.35, 0.55],
    [-0.61, 0.22, -0.5, 0.7],
    [-0.51, 0.12, 0.2, 0.45],
    [-0.61, -0.08, 0.55, 0.65],
    [-0.52, -0.22, -0.3, 0.5],
    [-0.61, -0.37, 0.15, 0.75],
    [-0.54, -0.48, -0.45, 0.55],
    [-0.63, -0.57, 0.35, 0.45],
    [-0.49, 0.56, -0.1, 0.4]
  ];
  const scuffDummy = new THREE.Object3D();
  for (let i = 0; i < scuffData.length; i++) {
    const data = scuffData[i];
    scuffDummy.position.set(data[0], data[1], 0.108);
    scuffDummy.rotation.set(0, 0, data[2]);
    scuffDummy.scale.set(data[3], 1, 1);
    scuffDummy.updateMatrix();
    leather_scuffs.setMatrixAt(i, scuffDummy.matrix);
  }
  leather_scuffs.instanceMatrix.needsUpdate = true;
  root.add(leather_scuffs);

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