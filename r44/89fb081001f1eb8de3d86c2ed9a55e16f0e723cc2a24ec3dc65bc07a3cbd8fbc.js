// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "polka_dot_notebook";

  const book_body = new THREE.Group();
  book_body.name = "book_body";
  root.add(book_body);

  const coverW = 1.0;
  const coverH = 1.16;
  const coverD = 0.014;
  const coverBevel = 0.004;
  const coverZ = 0.043;
  const cornerR = 0.045;

  const front_coverMat = new THREE.MeshStandardMaterial({
    color: 0xe2d2b8,
    metalness: 0.0,
    roughness: 0.95
  });
  const back_coverMat = front_coverMat;
  const page_blockMat = new THREE.MeshStandardMaterial({
    color: 0xd8c8ad,
    metalness: 0.0,
    roughness: 0.9
  });
  const page_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xc7b79d,
    metalness: 0.0,
    roughness: 0.9
  });
  const spine_hingeMat = new THREE.MeshStandardMaterial({
    color: 0xcdbb9f,
    metalness: 0.0,
    roughness: 0.95
  });
  const spine_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xeee0c8,
    metalness: 0.0,
    roughness: 0.95
  });

  function makeRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const left = -width / 2;
    const right = width / 2;
    const bottom = -height / 2;
    const top = height / 2;

    shape.moveTo(left + radius, bottom);
    shape.lineTo(right - radius, bottom);
    shape.quadraticCurveTo(right, bottom, right, bottom + radius);
    shape.lineTo(right, top - radius);
    shape.quadraticCurveTo(right, top, right - radius, top);
    shape.lineTo(left + radius, top);
    shape.quadraticCurveTo(left, top, left, top - radius);
    shape.lineTo(left, bottom + radius);
    shape.quadraticCurveTo(left, bottom, left + radius, bottom);
    shape.closePath();
    return shape;
  }

  const page_blockShape = makeRoundedRectShape(0.95, 1.09, 0.032);
  const page_blockGeom = new THREE.ExtrudeGeometry(page_blockShape, {
    depth: 0.071,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.002,
    bevelSegments: 2
  });
  const page_block = new THREE.Mesh(page_blockGeom, page_blockMat);
  page_block.name = "page_block";
  page_block.position.set(0.012, 0, -0.038);
  book_body.add(page_block);

  const right_page_edgeGeom = new THREE.BoxGeometry(0.008, 1.015, 0.066);
  const right_page_edge = new THREE.Mesh(right_page_edgeGeom, page_edgeMat);
  right_page_edge.name = "right_page_edge";
  right_page_edge.position.set(0.489, -0.005, -0.002);
  book_body.add(right_page_edge);

  const bottom_page_edgeGeom = new THREE.BoxGeometry(0.89, 0.008, 0.066);
  const bottom_page_edge = new THREE.Mesh(bottom_page_edgeGeom, page_edgeMat);
  bottom_page_edge.name = "bottom_page_edge";
  bottom_page_edge.position.set(0.025, -0.548, -0.002);
  book_body.add(bottom_page_edge);

  const page_lineMat = new THREE.MeshStandardMaterial({
    color: 0xb8a88f,
    metalness: 0.0,
    roughness: 0.9
  });

  const right_page_linesGeom = new THREE.BoxGeometry(0.002, 0.985, 0.0015);
  const right_page_lines = new THREE.InstancedMesh(
    right_page_linesGeom,
    page_lineMat,
    4
  );
  right_page_lines.name = "right_page_lines";
  const pageLineMatrix = new THREE.Matrix4();
  for (let i = 0; i < 4; i++) {
    pageLineMatrix.makeTranslation(0.494, -0.005, -0.027 + i * 0.018);
    right_page_lines.setMatrixAt(i, pageLineMatrix);
  }
  right_page_lines.instanceMatrix.needsUpdate = true;
  book_body.add(right_page_lines);

  const bottom_page_linesGeom = new THREE.BoxGeometry(0.84, 0.002, 0.0015);
  const bottom_page_lines = new THREE.InstancedMesh(
    bottom_page_linesGeom,
    page_lineMat,
    4
  );
  bottom_page_lines.name = "bottom_page_lines";
  for (let i = 0; i < 4; i++) {
    pageLineMatrix.makeTranslation(0.03, -0.553, -0.027 + i * 0.018);
    bottom_page_lines.setMatrixAt(i, pageLineMatrix);
  }
  bottom_page_lines.instanceMatrix.needsUpdate = true;
  book_body.add(bottom_page_lines);

  const back_coverShape = makeRoundedRectShape(coverW, coverH, cornerR);
  const back_coverGeom = new THREE.ExtrudeGeometry(back_coverShape, {
    depth: coverD,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: coverBevel,
    bevelSize: coverBevel,
    bevelSegments: 3
  });
  const back_cover = new THREE.Mesh(back_coverGeom, back_coverMat);
  back_cover.name = "back_cover";
  back_cover.position.set(0, 0, -0.061);
  book_body.add(back_cover);

  const front_coverShape = makeRoundedRectShape(coverW, coverH, cornerR);
  const front_coverGeom = new THREE.ExtrudeGeometry(front_coverShape, {
    depth: coverD,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: coverBevel,
    bevelSize: coverBevel,
    bevelSegments: 3
  });
  const front_cover = new THREE.Mesh(front_coverGeom, front_coverMat);
  front_cover.name = "front_cover";
  front_cover.position.set(0, 0, coverZ);
  book_body.add(front_cover);

  const spine_bodyShape = makeRoundedRectShape(0.078, 1.105, 0.026);
  const spine_bodyGeom = new THREE.ExtrudeGeometry(spine_bodyShape, {
    depth: 0.102,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2
  });
  const spine_bodyMat = front_coverMat;
  const spine_body = new THREE.Mesh(spine_bodyGeom, spine_bodyMat);
  spine_body.name = "spine_body";
  spine_body.position.set(-0.486, 0, -0.052);
  book_body.add(spine_body);

  const front_decoration = new THREE.Group();
  front_decoration.name = "front_decoration";
  book_body.add(front_decoration);

  const dotGeom = new THREE.CircleGeometry(1, 24);
  const blue_dotsMat = new THREE.MeshStandardMaterial({
    color: 0x075aa9,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const cyan_dotsMat = new THREE.MeshStandardMaterial({
    color: 0x2698c2,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const green_dotsMat = new THREE.MeshStandardMaterial({
    color: 0x55a85f,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const pale_cyan_dotsMat = new THREE.MeshStandardMaterial({
    color: 0x91cfc4,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });

  const blueDotData = [];
  const cyanDotData = [];
  const greenDotData = [];
  const paleCyanDotData = [];
  const dotSets = [
    blueDotData,
    cyanDotData,
    greenDotData,
    paleCyanDotData
  ];

  const columns = 11;
  const rows = 17;
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const omitted =
        (row * 7 + column * 11) % 31 === 0 ||
        (row * 13 + column * 5) % 47 === 0;
      if (omitted) continue;

      const xBase = -0.455 + column * (0.91 / (columns - 1));
      const yBase = -0.535 + row * (1.07 / (rows - 1));
      const x = xBase + Math.sin((row + 1) * 2.17 + column * 1.31) * 0.012;
      const y = yBase + Math.cos(row * 1.43 - column * 2.29) * 0.009;

      let radius = 0.016 + ((row * 3 + column * 5) % 6) * 0.0027;
      if ((row * 17 + column * 13) % 29 === 0) radius *= 0.62;
      if ((row * 5 + column * 7) % 23 === 0) radius += 0.004;

      const colorIndex = (row * 7 + column * 11) % dotSets.length;
      dotSets[colorIndex].push([x, y, radius]);
    }
  }

  function makeDotInstances(data, material, name) {
    const mesh = new THREE.InstancedMesh(dotGeom, material, data.length);
    mesh.name = name;
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    for (let i = 0; i < data.length; i++) {
      const dot = data[i];
      position.set(dot[0], dot[1], 0.0645);
      scale.set(dot[2], dot[2], 1);
      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(i, matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const blue_dots = makeDotInstances(blueDotData, blue_dotsMat, "blue_dots");
  const cyan_dots = makeDotInstances(cyanDotData, cyan_dotsMat, "cyan_dots");
  const green_dots = makeDotInstances(greenDotData, green_dotsMat, "green_dots");
  const pale_cyan_dots = makeDotInstances(
    paleCyanDotData,
    pale_cyan_dotsMat,
    "pale_cyan_dots"
  );
  front_decoration.add(blue_dots, cyan_dots, green_dots, pale_cyan_dots);

  const spine_hingeGeom = new THREE.CylinderGeometry(0.006, 0.006, 1.075, 12);
  const spine_hinge = new THREE.Mesh(spine_hingeGeom, spine_hingeMat);
  spine_hinge.name = "spine_hinge";
  spine_hinge.position.set(-0.448, 0, 0.064);
  book_body.add(spine_hinge);

  const spine_highlightGeom = new THREE.CylinderGeometry(0.0032, 0.0032, 1.065, 10);
  const spine_highlight = new THREE.Mesh(spine_highlightGeom, spine_highlightMat);
  spine_highlight.name = "spine_highlight";
  spine_highlight.position.set(-0.461, 0, 0.065);
  book_body.add(spine_highlight);

  const spine_shadowGeom = new THREE.CylinderGeometry(0.0022, 0.0022, 1.06, 8);
  const spine_shadow = new THREE.Mesh(spine_shadowGeom, spine_hingeMat);
  spine_shadow.name = "spine_shadow";
  spine_shadow.position.set(-0.436, 0, 0.0645);
  book_body.add(spine_shadow);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}