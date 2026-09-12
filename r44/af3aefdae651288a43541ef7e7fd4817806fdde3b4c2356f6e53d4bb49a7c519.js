// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_book";

  const book_group = new THREE.Group();
  book_group.name = "book_group";
  root.add(book_group);

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x7a4027,
    metalness: 0.0,
    roughness: 0.7,
  });
  const darkLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x4d2518,
    metalness: 0.0,
    roughness: 0.7,
  });
  const edgeLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x63301f,
    metalness: 0.0,
    roughness: 0.7,
  });
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xd8cfb8,
    metalness: 0.0,
    roughness: 0.9,
  });
  const pageEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xb9ad96,
    metalness: 0.0,
    roughness: 0.9,
  });
  const pageLineMat = new THREE.MeshStandardMaterial({
    color: 0x817662,
    metalness: 0.0,
    roughness: 0.9,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd8b85c,
    metalness: 0.5,
    roughness: 0.25,
  });
  const goldHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xf0d47c,
    metalness: 0.5,
    roughness: 0.25,
  });
  const goldShadowMat = new THREE.MeshStandardMaterial({
    color: 0xb88c35,
    metalness: 0.5,
    roughness: 0.25,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x572b22,
    metalness: 0.0,
    roughness: 0.8,
  });
  const scratchMat = new THREE.MeshStandardMaterial({
    color: 0xf2d98d,
    metalness: 0.4,
    roughness: 0.35,
  });

  function roundedRectShape(width, height, radius) {
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
    shape.closePath();
    return shape;
  }

  function roundedExtrudeGeometry(width, height, radius, depth, bevel) {
    const geometry = new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 2,
        curveSegments: 8,
      }
    );
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const bookW = 1.0;
  const bookH = 1.32;
  const pageW = 0.86;
  const pageH = 1.22;
  const pageD = 0.25;
  const coverD = 0.035;
  const coverZ = pageD / 2 + coverD / 2;
  const spineX = -0.47;

  const page_blockGeom = roundedExtrudeGeometry(
    pageW,
    pageH,
    0.025,
    pageD,
    0.004
  );
  const page_block = new THREE.Mesh(page_blockGeom, paperMat);
  page_block.name = "page_block";
  page_block.position.x = 0.04;
  book_group.add(page_block);

  const page_fore_edgeGeom = new THREE.BoxGeometry(0.012, 1.17, 0.238);
  const page_fore_edge = new THREE.Mesh(page_fore_edgeGeom, pageEdgeMat);
  page_fore_edge.name = "page_fore_edge";
  page_fore_edge.position.set(0.474, 0, 0);
  book_group.add(page_fore_edge);

  const page_top_edgeGeom = new THREE.BoxGeometry(0.82, 0.012, 0.238);
  const page_top_edge = new THREE.Mesh(page_top_edgeGeom, pageEdgeMat);
  page_top_edge.name = "page_top_edge";
  page_top_edge.position.set(0.05, 0.614, 0);
  book_group.add(page_top_edge);

  const page_bottom_edgeGeom = page_top_edgeGeom;
  const page_bottom_edge = new THREE.Mesh(page_bottom_edgeGeom, pageEdgeMat);
  page_bottom_edge.name = "page_bottom_edge";
  page_bottom_edge.position.set(0.05, -0.614, 0);
  book_group.add(page_bottom_edge);

  const page_lineGeom = new THREE.BoxGeometry(0.004, 0.0022, 0.232);
  const page_lines = new THREE.InstancedMesh(page_lineGeom, pageLineMat, 34);
  page_lines.name = "page_lines";
  const pageLineMatrix = new THREE.Matrix4();
  for (let i = 0; i < 34; i++) {
    const y = -0.575 + i * (1.15 / 33);
    pageLineMatrix.makeTranslation(0.481, y, 0);
    page_lines.setMatrixAt(i, pageLineMatrix);
  }
  page_lines.instanceMatrix.needsUpdate = true;
  book_group.add(page_lines);

  const top_page_lineGeom = new THREE.BoxGeometry(0.80, 0.0022, 0.0022);
  const top_page_lines = new THREE.InstancedMesh(
    top_page_lineGeom,
    pageLineMat,
    18
  );
  top_page_lines.name = "top_page_lines";
  const topLineMatrix = new THREE.Matrix4();
  for (let i = 0; i < 18; i++) {
    const z = -0.108 + i * (0.216 / 17);
    topLineMatrix.makeTranslation(0.05, 0.621, z);
    top_page_lines.setMatrixAt(i, topLineMatrix);
  }
  top_page_lines.instanceMatrix.needsUpdate = true;
  book_group.add(top_page_lines);

  const front_coverGeom = roundedExtrudeGeometry(
    bookW,
    bookH,
    0.045,
    coverD,
    0.006
  );
  const front_cover = new THREE.Mesh(front_coverGeom, leatherMat);
  front_cover.name = "front_cover";
  front_cover.position.z = coverZ;
  book_group.add(front_cover);

  const back_coverGeom = front_coverGeom;
  const back_cover = new THREE.Mesh(back_coverGeom, leatherMat);
  back_cover.name = "back_cover";
  back_cover.position.z = -coverZ;
  book_group.add(back_cover);

  const spineGeom = new THREE.CylinderGeometry(0.15, 0.15, 1.29, 32);
  const spine = new THREE.Mesh(spineGeom, leatherMat);
  spine.name = "spine";
  spine.position.set(spineX, 0, 0);
  spine.scale.x = 0.58;
  book_group.add(spine);

  const spine_capGeom = new THREE.SphereGeometry(0.15, 24, 12);
  const spine_top_cap = new THREE.Mesh(spine_capGeom, leatherMat);
  spine_top_cap.name = "spine_top_cap";
  spine_top_cap.position.set(spineX, 0.645, 0);
  spine_top_cap.scale.set(0.58, 0.22, 1);
  book_group.add(spine_top_cap);

  const spine_bottom_cap = new THREE.Mesh(spine_capGeom, leatherMat);
  spine_bottom_cap.name = "spine_bottom_cap";
  spine_bottom_cap.position.set(spineX, -0.645, 0);
  spine_bottom_cap.scale.set(0.58, 0.22, 1);
  book_group.add(spine_bottom_cap);

  const spine_bandGeom = new THREE.TorusGeometry(0.137, 0.011, 8, 32);
  const spine_bands = new THREE.InstancedMesh(
    spine_bandGeom,
    darkLeatherMat,
    5
  );
  spine_bands.name = "spine_bands";
  const bandQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  const bandScale = new THREE.Vector3(0.62, 1, 1);
  const bandMatrix = new THREE.Matrix4();
  const bandHeights = [-0.52, -0.27, 0, 0.27, 0.52];
  for (let i = 0; i < bandHeights.length; i++) {
    bandMatrix.compose(
      new THREE.Vector3(spineX, bandHeights[i], 0),
      bandQuaternion,
      bandScale
    );
    spine_bands.setMatrixAt(i, bandMatrix);
  }
  spine_bands.instanceMatrix.needsUpdate = true;
  book_group.add(spine_bands);

  const spine_labelGeom = new THREE.BoxGeometry(0.006, 0.105, 0.105);
  const spine_label = new THREE.Mesh(spine_labelGeom, darkLeatherMat);
  spine_label.name = "spine_label";
  spine_label.position.set(-0.559, 0.205, 0);
  book_group.add(spine_label);

  const spine_label_lineGeom = new THREE.BoxGeometry(0.004, 0.006, 0.072);
  const spine_label_lines = new THREE.InstancedMesh(
    spine_label_lineGeom,
    goldMat,
    3
  );
  spine_label_lines.name = "spine_label_lines";
  const labelMatrix = new THREE.Matrix4();
  for (let i = 0; i < 3; i++) {
    labelMatrix.makeTranslation(-0.563, 0.225 - i * 0.021, 0);
    spine_label_lines.setMatrixAt(i, labelMatrix);
  }
  spine_label_lines.instanceMatrix.needsUpdate = true;
  book_group.add(spine_label_lines);

  const front_hingeGeom = new THREE.CylinderGeometry(0.012, 0.012, 1.23, 12);
  const front_hinge = new THREE.Mesh(front_hingeGeom, darkLeatherMat);
  front_hinge.name = "front_hinge";
  front_hinge.position.set(-0.386, 0, 0.164);
  book_group.add(front_hinge);

  const front_gold_panelGeom = roundedExtrudeGeometry(
    0.81,
    1.20,
    0.035,
    0.008,
    0.002
  );
  const front_gold_panel = new THREE.Mesh(front_gold_panelGeom, goldMat);
  front_gold_panel.name = "front_gold_panel";
  front_gold_panel.position.set(0.055, 0, 0.161);
  book_group.add(front_gold_panel);

  const front_border_horizontalGeom = new THREE.BoxGeometry(
    0.775,
    0.008,
    0.004
  );
  const front_border_top = new THREE.Mesh(
    front_border_horizontalGeom,
    goldHighlightMat
  );
  front_border_top.name = "front_border_top";
  front_border_top.position.set(0.055, 0.578, 0.169);
  book_group.add(front_border_top);

  const front_border_bottom = new THREE.Mesh(
    front_border_horizontalGeom,
    goldShadowMat
  );
  front_border_bottom.name = "front_border_bottom";
  front_border_bottom.position.set(0.055, -0.578, 0.169);
  book_group.add(front_border_bottom);

  const front_border_verticalGeom = new THREE.BoxGeometry(
    0.008,
    1.145,
    0.004
  );
  const front_border_left = new THREE.Mesh(
    front_border_verticalGeom,
    goldShadowMat
  );
  front_border_left.name = "front_border_left";
  front_border_left.position.set(-0.34, 0, 0.169);
  book_group.add(front_border_left);

  const front_border_right = new THREE.Mesh(
    front_border_verticalGeom,
    goldHighlightMat
  );
  front_border_right.name = "front_border_right";
  front_border_right.position.set(0.45, 0, 0.169);
  book_group.add(front_border_right);

  const scratchData = [
    [-0.25, 0.50, 0.12, 0.012],
    [0.28, 0.51, -0.18, 0.01],
    [0.37, 0.39, 0.08, 0.014],
    [-0.22, 0.31, -0.11, 0.009],
    [0.34, 0.18, 0.16, 0.012],
    [-0.27, 0.04, 0.05, 0.01],
    [0.39, -0.08, -0.13, 0.013],
    [-0.21, -0.21, 0.14, 0.01],
    [0.31, -0.31, -0.08, 0.012],
    [-0.28, -0.45, 0.11, 0.009],
    [0.37, -0.50, -0.16, 0.011],
    [0.03, 0.46, 0.03, 0.008],
  ];
  const gold_scratchGeom = new THREE.BoxGeometry(0.08, 0.0016, 0.002);
  const gold_scratches = new THREE.InstancedMesh(
    gold_scratchGeom,
    scratchMat,
    scratchData.length
  );
  gold_scratches.name = "gold_scratches";
  const scratchMatrix = new THREE.Matrix4();
  for (let i = 0; i < scratchData.length; i++) {
    const data = scratchData[i];
    const quaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, 0, data[3])
    );
    scratchMatrix.compose(
      new THREE.Vector3(data[0], data[1], 0.1705),
      quaternion,
      new THREE.Vector3(data[2] / 0.08, 1, 1)
    );
    gold_scratches.setMatrixAt(i, scratchMatrix);
  }
  gold_scratches.instanceMatrix.needsUpdate = true;
  book_group.add(gold_scratches);

  const inkZ = 0.173;

  function addInkStroke(parent, coordinates, radius) {
    const points = [];
    for (let i = 0; i < coordinates.length; i++) {
      points.push(
        new THREE.Vector3(coordinates[i][0], coordinates[i][1], inkZ)
      );
    }
    const curve =
      points.length === 2
        ? new THREE.LineCurve3(points[0], points[1])
        : new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(4, (points.length - 1) * 3),
      radius,
      5,
      false
    );
    const stroke = new THREE.Mesh(geometry, inkMat);
    parent.add(stroke);
    return stroke;
  }

  const title_strokes = new THREE.Group();
  title_strokes.name = "title_strokes";
  book_group.add(title_strokes);

  addInkStroke(
    title_strokes,
    [
      [-0.25, 0.42],
      [-0.29, 0.46],
      [-0.28, 0.51],
      [-0.22, 0.535],
      [-0.17, 0.51],
      [-0.18, 0.47],
      [-0.23, 0.455],
      [-0.2, 0.43],
      [-0.15, 0.445],
    ],
    0.0032
  );
  addInkStroke(
    title_strokes,
    [
      [-0.16, 0.445],
      [-0.13, 0.47],
      [-0.12, 0.445],
      [-0.1, 0.43],
      [-0.08, 0.465],
      [-0.07, 0.438],
      [-0.04, 0.445],
      [-0.02, 0.48],
      [-0.03, 0.435],
      [0.01, 0.445],
      [0.03, 0.475],
      [0.02, 0.435],
      [0.06, 0.45],
      [0.08, 0.485],
      [0.07, 0.435],
      [0.11, 0.45],
      [0.14, 0.475],
      [0.13, 0.43],
      [0.17, 0.45],
      [0.2, 0.48],
      [0.19, 0.43],
      [0.24, 0.45],
      [0.27, 0.475],
      [0.26, 0.425],
      [0.31, 0.45],
    ],
    0.0028
  );
  addInkStroke(
    title_strokes,
    [
      [0.08, 0.49],
      [0.12, 0.51],
      [0.17, 0.505],
      [0.21, 0.485],
    ],
    0.0022
  );
  addInkStroke(
    title_strokes,
    [
      [-0.24, 0.405],
      [-0.16, 0.397],
      [-0.07, 0.402],
      [0.02, 0.395],
      [0.11, 0.401],
      [0.2, 0.394],
      [0.29, 0.402],
    ],
    0.002
  );

  const bodyText = [
    {
      x: -0.245,
      y: 0.31,
      w: 0.54,
      c: 10,
      lift: 0.006,
      drop: 0.004,
    },
    {
      x: -0.255,
      y: 0.235,
      w: 0.58,
      c: 11,
      lift: 0.005,
      drop: 0.005,
    },
    {
      x: -0.245,
      y: 0.16,
      w: 0.56,
      c: 10,
      lift: 0.006,
      drop: 0.004,
    },
    {
      x: -0.255,
      y: 0.085,
      w: 0.59,
      c: 11,
      lift: 0.005,
      drop: 0.005,
    },
    {
      x: -0.24,
      y: 0.01,
      w: 0.55,
      c: 10,
      lift: 0.006,
      drop: 0.004,
    },
    {
      x: -0.25,
      y: -0.065,
      w: 0.58,
      c: 11,
      lift: 0.005,
      drop: 0.005,
    },
    {
      x: -0.235,
      y: -0.14,
      w: 0.53,
      c: 9,
      lift: 0.006,
      drop: 0.004,
    },
    {
      x: -0.25,
      y: -0.215,
      w: 0.59,
      c: 11,
      lift: 0.005,
      drop: 0.005,
    },
    {
      x: -0.24,
      y: -0.29,
      w: 0.56,
      c: 10,
      lift: 0.006,
      drop: 0.004,
    },
    {
      x: -0.25,
      y: -0.365,
      w: 0.57,
      c: 10,
      lift: 0.005,
      drop: 0.005,
    },
    {
      x: -0.235,
      y: -0.44,
      w: 0.53,
      c: 9,
      lift: 0.006,
      drop: 0.004,
    },
    {
      x: -0.22,
      y: -0.515,
      w: 0.48,
      c: 8,
      lift: 0.005,
      drop: 0.005,
    },
  ];

  const body_strokes = new THREE.Group();
  body_strokes.name = "body_strokes";
  book_group.add(body_strokes);

  for (let lineIndex = 0; lineIndex < bodyText.length; lineIndex++) {
    const line = bodyText[lineIndex];
    const step = line.w / line.c;
    const points = [];

    for (let character = 0; character < line.c; character++) {
      const x = line.x + character * step;
      const base = line.y + ((character % 3) - 1) * 0.0015;
      const height = 0.018 + (character % 4) * 0.0025;
      const lift = character % 5 === 0 ? line.lift : 0;
      const drop = character % 6 === 2 ? line.drop : 0;

      points.push(new THREE.Vector3(x, base, inkZ));
      points.push(
        new THREE.Vector3(
          x + step * 0.18,
          base + height * 0.72 + lift,
          inkZ
        )
      );
      points.push(
        new THREE.Vector3(
          x + step * 0.42,
          base + height * 0.28,
          inkZ
        )
      );
      points.push(
        new THREE.Vector3(
          x + step * 0.66,
          base + height * 0.62 - drop,
          inkZ
        )
      );
      points.push(
        new THREE.Vector3(
          x + step * 0.84,
          base + height * 0.12,
          inkZ
        )
      );
      points.push(
        new THREE.Vector3(
          x + step,
          base + height * 0.22,
          inkZ
        )
      );
    }

    const bodyCurve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const bodyStrokeGeom = new THREE.TubeGeometry(
      bodyCurve,
      line.c * 6,
      0.00215,
      5,
      false
    );
    const bodyStroke = new THREE.Mesh(bodyStrokeGeom, inkMat);
    bodyStroke.name = "body_text_line_" + lineIndex;
    body_strokes.add(bodyStroke);

    if (lineIndex % 2 === 0) {
      addInkStroke(
        body_strokes,
        [
          [
            line.x + line.w * 0.72,
            line.y + 0.004,
          ],
          [
            line.x + line.w * 0.82,
            line.y + 0.026,
          ],
          [
            line.x + line.w * 0.91,
            line.y + 0.012,
          ],
        ],
        0.0018
      );
    }
  }

  const page_inscriptionGeom = new THREE.BoxGeometry(
    0.004,
    0.003,
    0.075
  );
  const page_inscription = new THREE.InstancedMesh(
    page_inscriptionGeom,
    inkMat,
    18
  );
  page_inscription.name = "page_inscription";
  const inscriptionMatrix = new THREE.Matrix4();
  for (let i = 0; i < 18; i++) {
    const row = Math.floor(i / 3);
    const column = i % 3;
    const y = 0.4 - row * 0.075;
    const z = -0.075 + column * 0.068;
    const angle = (column - 1) * 0.08;
    const quaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(angle, 0, 0)
    );
    inscriptionMatrix.compose(
      new THREE.Vector3(0.483, y, z),
      quaternion,
      new THREE.Vector3(1, 1, 0.58 + (i % 4) * 0.1)
    );
    page_inscription.setMatrixAt(i, inscriptionMatrix);
  }
  page_inscription.instanceMatrix.needsUpdate = true;
  book_group.add(page_inscription);

  const corner_ornament = new THREE.Group();
  corner_ornament.name = "corner_ornament";
  book_group.add(corner_ornament);

  addInkStroke(
    corner_ornament,
    [
      [0.365, -0.535],
      [0.395, -0.5],
      [0.415, -0.455],
      [0.405, -0.405],
      [0.375, -0.365],
    ],
    0.0022
  );
  addInkStroke(
    corner_ornament,
    [
      [0.375, -0.535],
      [0.425, -0.515],
      [0.445, -0.475],
      [0.438, -0.425],
      [0.412, -0.39],
    ],
    0.0019
  );
  addInkStroke(
    corner_ornament,
    [
      [0.39, -0.49],
      [0.425, -0.47],
      [0.43, -0.43],
      [0.405, -0.41],
    ],
    0.0017
  );

  const corner_leafGeom = new THREE.TorusGeometry(0.018, 0.0018, 5, 16);
  const corner_leaf_left = new THREE.Mesh(corner_leafGeom, inkMat);
  corner_leaf_left.name = "corner_leaf_left";
  corner_leaf_left.position.set(0.397, -0.455, inkZ);
  corner_leaf_left.rotation.z = -0.65;
  corner_leaf_left.scale.set(0.55, 1.2, 1);
  corner_ornament.add(corner_leaf_left);

  const corner_leaf_right = new THREE.Mesh(corner_leafGeom, inkMat);
  corner_leaf_right.name = "corner_leaf_right";
  corner_leaf_right.position.set(0.425, -0.485, inkZ);
  corner_leaf_right.rotation.z = 0.7;
  corner_leaf_right.scale.set(0.5, 1.05, 1);
  corner_ornament.add(corner_leaf_right);

  const top_corner_flourish = new THREE.Group();
  top_corner_flourish.name = "top_corner_flourish";
  book_group.add(top_corner_flourish);

  addInkStroke(
    top_corner_flourish,
    [
      [0.365, 0.535],
      [0.39, 0.5],
      [0.405, 0.455],
      [0.395, 0.41],
      [0.37, 0.375],
    ],
    0.0018
  );
  addInkStroke(
    top_corner_flourish,
    [
      [0.375, 0.525],
      [0.425, 0.5],
      [0.442, 0.455],
      [0.43, 0.41],
      [0.405, 0.385],
    ],
    0.0016
  );

  fitToUnitCube(THREE, root);
  return root;

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