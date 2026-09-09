function __sn17_user(THREE) {
  const root = new THREE.Group();
  const notebook_group = new THREE.Group();
  root.add(notebook_group);

  const coverW = 1.28;
  const coverH = 1.62;
  const pageW = 1.08;
  const pageH = 1.48;
  const pageX = 0.075;

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x4a281c,
    metalness: 0.0,
    roughness: 0.78,
  });
  const darkLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x2d1711,
    metalness: 0.0,
    roughness: 0.82,
  });
  const wornLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x8a5430,
    metalness: 0.0,
    roughness: 0.86,
  });
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xf2e8c9,
    metalness: 0.0,
    roughness: 0.9,
  });
  const paperEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xcbbd98,
    metalness: 0.0,
    roughness: 0.9,
  });
  const pageShadowMat = new THREE.MeshStandardMaterial({
    color: 0xa99b76,
    metalness: 0.0,
    roughness: 0.95,
  });
  const ruleMat = new THREE.MeshStandardMaterial({
    color: 0x91b8c8,
    metalness: 0.0,
    roughness: 0.8,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x202326,
    metalness: 0.0,
    roughness: 0.72,
  });
  const stainMat = new THREE.MeshStandardMaterial({
    color: 0xb99a62,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide,
  });
  const grainMat = new THREE.LineBasicMaterial({
    color: 0x8b5130,
    transparent: true,
    opacity: 0.42,
  });
  const creaseMat = new THREE.LineBasicMaterial({
    color: 0x24120d,
    transparent: true,
    opacity: 0.55,
  });

  function roundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    const x = -w / 2;
    const y = -h / 2;
    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    return shape;
  }

  function roundedExtrudeGeometry(w, h, r, depth, bevel) {
    const geom = new THREE.ExtrudeGeometry(roundedRectShape(w, h, r), {
      depth,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geom.translate(0, 0, -depth / 2);
    return geom;
  }

  const back_coverGeom = roundedExtrudeGeometry(coverW, coverH, 0.105, 0.055, 0.012);
  const back_cover = new THREE.Mesh(back_coverGeom, leatherMat);
  back_cover.position.set(0, 0, -0.09);
  notebook_group.add(back_cover);

  const page_blockGeom = roundedExtrudeGeometry(pageW, pageH, 0.075, 0.13, 0.008);
  const page_block = new THREE.Mesh(page_blockGeom, paperEdgeMat);
  page_block.position.set(pageX, 0, -0.005);
  notebook_group.add(page_block);

  const right_page_edgeGeom = new THREE.BoxGeometry(0.026, pageH - 0.13, 0.118);
  const right_page_edge = new THREE.Mesh(right_page_edgeGeom, paperEdgeMat);
  right_page_edge.position.set(pageX + pageW / 2 - 0.006, 0, -0.004);
  notebook_group.add(right_page_edge);

  const bottom_page_edgeGeom = new THREE.BoxGeometry(pageW - 0.12, 0.026, 0.118);
  const bottom_page_edge = new THREE.Mesh(bottom_page_edgeGeom, paperEdgeMat);
  bottom_page_edge.position.set(pageX + 0.015, -pageH / 2 + 0.006, -0.004);
  notebook_group.add(bottom_page_edge);

  const front_cover_lipGeom = roundedExtrudeGeometry(coverW, 0.105, 0.045, 0.055, 0.01);
  const front_cover_lip = new THREE.Mesh(front_cover_lipGeom, leatherMat);
  front_cover_lip.position.set(0, -coverH / 2 + 0.052, 0.066);
  notebook_group.add(front_cover_lip);

  const right_cover_lipGeom = roundedExtrudeGeometry(0.105, coverH - 0.12, 0.045, 0.055, 0.01);
  const right_cover_lip = new THREE.Mesh(right_cover_lipGeom, leatherMat);
  right_cover_lip.position.set(coverW / 2 - 0.052, -0.01, 0.066);
  notebook_group.add(right_cover_lip);

  const top_cover_lipGeom = roundedExtrudeGeometry(coverW - 0.12, 0.085, 0.035, 0.05, 0.009);
  const top_cover_lip = new THREE.Mesh(top_cover_lipGeom, leatherMat);
  top_cover_lip.position.set(0.02, coverH / 2 - 0.042, 0.062);
  notebook_group.add(top_cover_lip);

  const spine_panelGeom = roundedExtrudeGeometry(0.36, coverH - 0.035, 0.095, 0.075, 0.014);
  const spine_panel = new THREE.Mesh(spine_panelGeom, leatherMat);
  spine_panel.position.set(-0.47, 0, 0.075);
  notebook_group.add(spine_panel);

  const spine_roundingGeom = new THREE.CylinderGeometry(0.066, 0.066, coverH - 0.11, 28);
  const spine_rounding = new THREE.Mesh(spine_roundingGeom, leatherMat);
  spine_rounding.position.set(-0.642, 0, 0.045);
  notebook_group.add(spine_rounding);

  const spine_inner_seamGeom = new THREE.CylinderGeometry(0.009, 0.009, coverH - 0.17, 12);
  const spine_inner_seam = new THREE.Mesh(spine_inner_seamGeom, darkLeatherMat);
  spine_inner_seam.position.set(-0.292, 0, 0.126);
  notebook_group.add(spine_inner_seam);

  const page_stack_lineGeom = new THREE.BoxGeometry(0.006, pageH - 0.18, 0.004);
  const page_stack_lines = new THREE.InstancedMesh(page_stack_lineGeom, pageShadowMat, 8);
  const pageLineDummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    pageLineDummy.position.set(pageX + pageW / 2 + 0.008 + i * 0.001, -0.005, -0.056 + i * 0.015);
    pageLineDummy.updateMatrix();
    page_stack_lines.setMatrixAt(i, pageLineDummy.matrix);
  }
  page_stack_lines.instanceMatrix.needsUpdate = true;
  notebook_group.add(page_stack_lines);

  const bottom_page_layerGeom = new THREE.BoxGeometry(pageW - 0.16, 0.004, 0.004);
  const bottom_page_layers = new THREE.InstancedMesh(bottom_page_layerGeom, pageShadowMat, 7);
  const bottomLayerDummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    bottomLayerDummy.position.set(pageX + 0.01, -pageH / 2 - 0.006 - i * 0.001, -0.052 + i * 0.017);
    bottomLayerDummy.updateMatrix();
    bottom_page_layers.setMatrixAt(i, bottomLayerDummy.matrix);
  }
  bottom_page_layers.instanceMatrix.needsUpdate = true;
  notebook_group.add(bottom_page_layers);

  const top_pageGeom = roundedExtrudeGeometry(pageW, pageH, 0.075, 0.024, 0.006);
  const top_page = new THREE.Mesh(top_pageGeom, paperMat);
  top_page.position.set(pageX, 0, 0.073);
  notebook_group.add(top_page);

  const ruled_lineGeom = new THREE.BoxGeometry(pageW - 0.17, 0.004, 0.004);
  const ruled_lines = new THREE.InstancedMesh(ruled_lineGeom, ruleMat, 14);
  const ruleDummy = new THREE.Object3D();
  for (let i = 0; i < 14; i++) {
    ruleDummy.position.set(pageX + 0.015, 0.59 - i * 0.095, 0.091);
    ruleDummy.updateMatrix();
    ruled_lines.setMatrixAt(i, ruleDummy.matrix);
  }
  ruled_lines.instanceMatrix.needsUpdate = true;
  notebook_group.add(ruled_lines);

  const margin_lineGeom = new THREE.BoxGeometry(0.004, pageH - 0.22, 0.004);
  const margin_line = new THREE.Mesh(margin_lineGeom, ruleMat);
  margin_line.position.set(pageX - pageW / 2 + 0.16, 0.01, 0.091);
  notebook_group.add(margin_line);

  const paper_stainGeom = new THREE.CircleGeometry(0.045, 18);
  const paper_stains = new THREE.InstancedMesh(paper_stainGeom, stainMat, 9);
  const stainData = [
    [-0.30, 0.61, 1.4, 0.55, 0.2],
    [0.49, 0.55, 0.8, 1.2, -0.3],
    [0.52, -0.55, 1.3, 0.65, 0.5],
    [-0.12, -0.66, 1.7, 0.45, -0.1],
    [0.31, 0.03, 0.55, 0.8, 0.4],
    [-0.35, -0.22, 0.7, 1.1, -0.5],
    [0.55, 0.27, 0.45, 0.5, 0.1],
    [0.12, -0.43, 0.5, 0.7, -0.2],
    [-0.02, 0.68, 0.8, 0.35, 0.3],
  ];
  const stainDummy = new THREE.Object3D();
  for (let i = 0; i < stainData.length; i++) {
    const d = stainData[i];
    stainDummy.position.set(pageX + d[0], d[1], 0.093);
    stainDummy.rotation.set(0, 0, d[4]);
    stainDummy.scale.set(d[2], d[3], 1);
    stainDummy.updateMatrix();
    paper_stains.setMatrixAt(i, stainDummy.matrix);
  }
  paper_stains.instanceMatrix.needsUpdate = true;
  notebook_group.add(paper_stains);

  const handwriting = new THREE.Group();
  notebook_group.add(handwriting);

  function addInkStroke(points, radius) {
    const vectors = [];
    for (let i = 0; i < points.length; i++) {
      vectors.push(new THREE.Vector3(pageX + points[i][0], points[i][1], 0.098));
    }
    const curve = new THREE.CatmullRomCurve3(vectors, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, Math.max(8, points.length * 5), radius, 6, false);
    const stroke = new THREE.Mesh(geom, inkMat);
    handwriting.add(stroke);
    return stroke;
  }

  function addCursiveLine(startX, baselineY, length, amplitude, phase, radius) {
    const points = [];
    const steps = 42;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = startX + length * t;
      const wave =
        Math.sin(t * Math.PI * 12 + phase) * amplitude +
        Math.sin(t * Math.PI * 26 + phase * 0.7) * amplitude * 0.32;
      const lift = Math.abs(Math.sin((t * 11 + phase) * Math.PI)) * amplitude * 0.45;
      points.push([x, baselineY + wave + lift]);
    }
    return addInkStroke(points, radius);
  }

  function addAscender(x, baselineY, height, lean) {
    return addInkStroke(
      [
        [x, baselineY],
        [x + lean * 0.25, baselineY + height * 0.45],
        [x + lean, baselineY + height],
      ],
      0.0042
    );
  }

  function addDescender(x, baselineY, depth, lean) {
    return addInkStroke(
      [
        [x, baselineY],
        [x + lean * 0.2, baselineY - depth * 0.45],
        [x + lean, baselineY - depth],
      ],
      0.0042
    );
  }

  addInkStroke([[-0.35, 0.65], [-0.32, 0.70], [-0.30, 0.64], [-0.27, 0.69]], 0.0045);
  addInkStroke([[0.18, 0.65], [0.21, 0.70], [0.24, 0.64], [0.27, 0.69]], 0.0045);
  addCursiveLine(-0.22, 0.625, 0.48, 0.012, 0.4, 0.004);

  addCursiveLine(-0.34, 0.49, 0.70, 0.018, 0.1, 0.0045);
  addAscender(-0.29, 0.49, 0.075, 0.025);
  addAscender(0.08, 0.49, 0.06, 0.018);
  addDescender(0.28, 0.49, -0.055, 0.018);

  addCursiveLine(-0.31, 0.385, 0.76, 0.017, 0.8, 0.0045);
  addAscender(-0.18, 0.385, 0.065, 0.02);
  addAscender(0.18, 0.385, 0.058, 0.018);
  addDescender(0.42, 0.385, -0.045, 0.015);

  addCursiveLine(-0.33, 0.285, 0.72, 0.018, 1.4, 0.0045);
  addAscender(-0.25, 0.285, 0.068, 0.022);
  addAscender(0.02, 0.285, 0.058, 0.018);
  addDescender(0.31, 0.285, -0.05, 0.016);

  addCursiveLine(-0.30, 0.185, 0.77, 0.017, 2.0, 0.0045);
  addAscender(-0.12, 0.185, 0.062, 0.02);
  addAscender(0.22, 0.185, 0.055, 0.017);
  addDescender(0.47, 0.185, -0.045, 0.014);

  addCursiveLine(-0.32, 0.085, 0.70, 0.018, 2.6, 0.0045);
  addAscender(-0.24, 0.085, 0.065, 0.022);
  addAscender(0.12, 0.085, 0.058, 0.018);
  addDescender(0.36, 0.085, -0.05, 0.016);

  addCursiveLine(-0.29, -0.015, 0.75, 0.017, 3.1, 0.0045);
  addAscender(-0.17, -0.015, 0.06, 0.02);
  addAscender(0.20, -0.015, 0.055, 0.017);
  addDescender(0.46, -0.015, -0.045, 0.014);

  addCursiveLine(-0.31, -0.115, 0.68, 0.018, 3.7, 0.0045);
  addAscender(-0.22, -0.115, 0.064, 0.021);
  addAscender(0.10, -0.115, 0.056, 0.017);
  addDescender(0.34, -0.115, -0.048, 0.015);

  addCursiveLine(-0.27, -0.215, 0.73, 0.017, 4.2, 0.0045);
  addAscender(-0.14, -0.215, 0.06, 0.02);
  addAscender(0.23, -0.215, 0.055, 0.017);
  addDescender(0.48, -0.215, -0.044, 0.014);

  addCursiveLine(-0.12, -0.365, 0.62, 0.019, 0.5, 0.0046);
  addAscender(0.02, -0.365, 0.07, 0.023);
  addAscender(0.31, -0.365, 0.06, 0.019);
  addDescender(0.48, -0.365, -0.05, 0.015);

  addCursiveLine(-0.17, -0.475, 0.68, 0.018, 1.2, 0.0046);
  addAscender(-0.05, -0.475, 0.065, 0.022);
  addAscender(0.25, -0.475, 0.058, 0.018);
  addDescender(0.47, -0.475, -0.048, 0.014);

  addCursiveLine(-0.14, -0.585, 0.64, 0.018, 2.1, 0.0046);
  addAscender(-0.02, -0.585, 0.064, 0.021);
  addAscender(0.27, -0.585, 0.056, 0.017);
  addDescender(0.46, -0.585, -0.046, 0.014);

  const stitchGeom = new THREE.BoxGeometry(0.034, 0.007, 0.006);
  const spine_stitches = new THREE.InstancedMesh(stitchGeom, wornLeatherMat, 25);
  const stitchDummy = new THREE.Object3D();
  for (let i = 0; i < 25; i++) {
    const t = i / 24;
    stitchDummy.position.set(-0.286, -0.69 + t * 1.38, 0.137);
    stitchDummy.rotation.set(0, 0, 0.03 * Math.sin(i * 1.7));
    stitchDummy.updateMatrix();
    spine_stitches.setMatrixAt(i, stitchDummy.matrix);
  }
  spine_stitches.instanceMatrix.needsUpdate = true;
  notebook_group.add(spine_stitches);

  const wear_markGeom = new THREE.BoxGeometry(0.075, 0.009, 0.006);
  const leather_wear_marks = new THREE.InstancedMesh(wear_markGeom, wornLeatherMat, 14);
  const wearData = [
    [-0.59, 0.58, 0.25, 0.8],
    [-0.50, 0.43, -0.35, 0.65],
    [-0.42, 0.31, 0.55, 0.55],
    [-0.57, 0.12, -0.15, 0.75],
    [-0.39, -0.02, 0.35, 0.5],
    [-0.55, -0.20, -0.45, 0.65],
    [-0.43, -0.34, 0.2, 0.55],
    [-0.60, -0.47, 0.6, 0.7],
    [-0.36, -0.55, -0.25, 0.45],
    [-0.52, -0.68, 0.1, 0.55],
    [-0.66, 0.30, -0.5, 0.45],
    [-0.65, -0.08, 0.4, 0.5],
    [-0.31, 0.62, -0.2, 0.4],
    [-0.33, -0.62, 0.3, 0.45],
  ];
  const wearDummy = new THREE.Object3D();
  for (let i = 0; i < wearData.length; i++) {
    const d = wearData[i];
    wearDummy.position.set(d[0], d[1], 0.139);
    wearDummy.rotation.set(0, 0, d[2]);
    wearDummy.scale.set(d[3], 1, 1);
    wearDummy.updateMatrix();
    leather_wear_marks.setMatrixAt(i, wearDummy.matrix);
  }
  leather_wear_marks.instanceMatrix.needsUpdate = true;
  notebook_group.add(leather_wear_marks);

  const grainPositions = [];
  for (let i = 0; i < 58; i++) {
    const col = i % 7;
    const row = Math.floor(i / 7);
    const x = -0.625 + col * 0.047 + Math.sin(i * 2.1) * 0.008;
    const y = -0.66 + row * 0.19 + Math.cos(i * 1.4) * 0.025;
    const dx = 0.018 + Math.sin(i * 0.9) * 0.012;
    const dy = 0.045 + Math.cos(i * 1.1) * 0.025;
    grainPositions.push(x, y, 0.141, x + dx, y + dy, 0.141);
  }
  const leather_grainGeom = new THREE.BufferGeometry();
  leather_grainGeom.setAttribute("position", new THREE.Float32BufferAttribute(grainPositions, 3));
  const leather_grain = new THREE.LineSegments(leather_grainGeom, grainMat);
  notebook_group.add(leather_grain);

  const creasePositions = [];
  for (let i = 0; i < 18; i++) {
    const x = -0.58 + (i % 5) * 0.055;
    const y = -0.58 + Math.floor(i / 5) * 0.34 + Math.sin(i) * 0.035;
    const len = 0.05 + (i % 3) * 0.025;
    creasePositions.push(x, y, 0.142, x + len * 0.45, y + len, 0.142);
  }
  const leather_creasesGeom = new THREE.BufferGeometry();
  leather_creasesGeom.setAttribute("position", new THREE.Float32BufferAttribute(creasePositions, 3));
  const leather_creases = new THREE.LineSegments(leather_creasesGeom, creaseMat);
  notebook_group.add(leather_creases);

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
