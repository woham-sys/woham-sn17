// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_leather_book";

  const bookW = 1.0;
  const bookH = 1.42;
  const coverD = 0.045;
  const pageD = 0.22;
  const frontZ = 0.158;
  const backZ = -0.158;

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x5a3025,
    metalness: 0.0,
    roughness: 0.7,
  });
  const darkLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x3b211d,
    metalness: 0.0,
    roughness: 0.7,
  });
  const edgeLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x6b3b2b,
    metalness: 0.0,
    roughness: 0.7,
  });
  const pageMat = new THREE.MeshStandardMaterial({
    color: 0xd8c9a5,
    metalness: 0.0,
    roughness: 0.9,
  });
  const pageLineMat = new THREE.MeshStandardMaterial({
    color: 0xa99773,
    metalness: 0.0,
    roughness: 0.9,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const brickMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.8,
  });
  const brickMortarMat = new THREE.MeshStandardMaterial({
    color: 0x241b1a,
    metalness: 0.0,
    roughness: 0.85,
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
        curveSegments: 8,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3,
      }
    );
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const page_blockGeom = roundedExtrudeGeometry(0.86, 1.29, 0.035, pageD, 0.004);
  const page_block = new THREE.Mesh(page_blockGeom, pageMat);
  page_block.name = "page_block";
  page_block.position.x = 0.04;
  root.add(page_block);

  const front_coverGeom = roundedExtrudeGeometry(bookW, bookH, 0.055, coverD, 0.008);
  const front_cover = new THREE.Mesh(front_coverGeom, leatherMat);
  front_cover.name = "front_cover";
  front_cover.position.set(0.02, 0, frontZ);
  root.add(front_cover);

  const back_coverGeom = front_coverGeom;
  const back_cover = new THREE.Mesh(back_coverGeom, leatherMat);
  back_cover.name = "back_cover";
  back_cover.position.set(0.02, 0, backZ);
  root.add(back_cover);

  const spineGeom = new THREE.CylinderGeometry(0.15, 0.15, 1.36, 32);
  const spine = new THREE.Mesh(spineGeom, edgeLeatherMat);
  spine.name = "spine";
  spine.position.set(-0.455, 0, 0);
  spine.scale.x = 0.72;
  root.add(spine);

  const spine_capGeom = new THREE.SphereGeometry(0.15, 24, 12);
  const spine_top_cap = new THREE.Mesh(spine_capGeom, edgeLeatherMat);
  spine_top_cap.name = "spine_top_cap";
  spine_top_cap.position.set(-0.455, 0.68, 0);
  spine_top_cap.scale.set(0.72, 0.28, 1);
  root.add(spine_top_cap);

  const spine_bottom_cap = new THREE.Mesh(spine_capGeom, edgeLeatherMat);
  spine_bottom_cap.name = "spine_bottom_cap";
  spine_bottom_cap.position.set(-0.455, -0.68, 0);
  spine_bottom_cap.scale.set(0.72, 0.28, 1);
  root.add(spine_bottom_cap);

  const hinge_ridgeGeom = new THREE.CylinderGeometry(0.012, 0.012, 1.32, 12);
  const front_hinge_ridge = new THREE.Mesh(hinge_ridgeGeom, darkLeatherMat);
  front_hinge_ridge.name = "front_hinge_ridge";
  front_hinge_ridge.position.set(-0.355, 0, 0.181);
  root.add(front_hinge_ridge);

  const back_hinge_ridge = new THREE.Mesh(hinge_ridgeGeom, darkLeatherMat);
  back_hinge_ridge.name = "back_hinge_ridge";
  back_hinge_ridge.position.set(-0.355, 0, -0.181);
  root.add(back_hinge_ridge);

  const page_lineGeom = new THREE.BoxGeometry(0.006, 0.0025, 0.19);
  const page_lines = new THREE.InstancedMesh(page_lineGeom, pageLineMat, 18);
  page_lines.name = "page_lines";
  const pageLineMatrix = new THREE.Matrix4();
  for (let i = 0; i < 18; i++) {
    const y = -0.58 + i * (1.16 / 17);
    pageLineMatrix.makeTranslation(0.474, y, 0);
    page_lines.setMatrixAt(i, pageLineMatrix);
  }
  page_lines.instanceMatrix.needsUpdate = true;
  root.add(page_lines);

  const spine_bandGeom = new THREE.TorusGeometry(0.137, 0.014, 8, 32);
  const spine_bands = new THREE.InstancedMesh(spine_bandGeom, edgeLeatherMat, 4);
  spine_bands.name = "spine_bands";
  const bandQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  const bandScale = new THREE.Vector3(0.72, 1, 1);
  const bandMatrix = new THREE.Matrix4();
  const bandHeights = [0.43, 0.13, -0.34, -0.59];
  for (let i = 0; i < bandHeights.length; i++) {
    bandMatrix.compose(
      new THREE.Vector3(-0.455, bandHeights[i], 0),
      bandQuaternion,
      bandScale
    );
    spine_bands.setMatrixAt(i, bandMatrix);
  }
  spine_bands.instanceMatrix.needsUpdate = true;
  root.add(spine_bands);

  const front_decoration = new THREE.Group();
  front_decoration.name = "front_decoration";
  root.add(front_decoration);

  const front_inset_panelGeom = roundedExtrudeGeometry(0.80, 1.22, 0.025, 0.008, 0.002);
  const front_inset_panel = new THREE.Mesh(front_inset_panelGeom, darkLeatherMat);
  front_inset_panel.name = "front_inset_panel";
  front_inset_panel.position.set(0.055, 0, 0.187);
  front_decoration.add(front_inset_panel);

  const outer_gold_border = new THREE.Group();
  outer_gold_border.name = "outer_gold_border";
  const outerBorderHorizontalGeom = new THREE.BoxGeometry(0.79, 0.008, 0.006);
  const outerBorderVerticalGeom = new THREE.BoxGeometry(0.008, 1.20, 0.006);

  const outer_border_top = new THREE.Mesh(outerBorderHorizontalGeom, goldMat);
  outer_border_top.position.set(0.055, 0.604, 0.198);
  outer_gold_border.add(outer_border_top);

  const outer_border_bottom = new THREE.Mesh(outerBorderHorizontalGeom, goldMat);
  outer_border_bottom.position.set(0.055, -0.604, 0.198);
  outer_gold_border.add(outer_border_bottom);

  const outer_border_left = new THREE.Mesh(outerBorderVerticalGeom, goldMat);
  outer_border_left.position.set(-0.34, 0, 0.198);
  outer_gold_border.add(outer_border_left);

  const outer_border_right = new THREE.Mesh(outerBorderVerticalGeom, goldMat);
  outer_border_right.position.set(0.45, 0, 0.198);
  outer_gold_border.add(outer_border_right);
  front_decoration.add(outer_gold_border);

  const inner_gold_border = new THREE.Group();
  inner_gold_border.name = "inner_gold_border";
  const innerBorderHorizontalGeom = new THREE.BoxGeometry(0.75, 0.004, 0.005);
  const innerBorderVerticalGeom = new THREE.BoxGeometry(0.004, 1.16, 0.005);

  const inner_border_top = new THREE.Mesh(innerBorderHorizontalGeom, goldMat);
  inner_border_top.position.set(0.055, 0.582, 0.201);
  inner_gold_border.add(inner_border_top);

  const inner_border_bottom = new THREE.Mesh(innerBorderHorizontalGeom, goldMat);
  inner_border_bottom.position.set(0.055, -0.582, 0.201);
  inner_gold_border.add(inner_border_bottom);

  const inner_border_left = new THREE.Mesh(innerBorderVerticalGeom, goldMat);
  inner_border_left.position.set(-0.32, 0, 0.201);
  inner_gold_border.add(inner_border_left);

  const inner_border_right = new THREE.Mesh(innerBorderVerticalGeom, goldMat);
  inner_border_right.position.set(0.43, 0, 0.201);
  inner_gold_border.add(inner_border_right);
  front_decoration.add(inner_gold_border);

  const brick_arch = new THREE.Group();
  brick_arch.name = "brick_arch";
  front_decoration.add(brick_arch);

  const archCenterX = 0.06;
  const archCenterY = -0.05;
  const archRadiusX = 0.36;
  const archRadiusY = 0.55;

  const brick_mortarGeom = new THREE.CircleGeometry(1, 64);
  const brick_mortar = new THREE.Mesh(brick_mortarGeom, brickMortarMat);
  brick_mortar.name = "brick_mortar";
  brick_mortar.position.set(archCenterX, archCenterY, 0.195);
  brick_mortar.scale.set(archRadiusX, archRadiusY, 1);
  brick_arch.add(brick_mortar);

  const brick_arch_borderGeom = new THREE.TorusGeometry(1, 0.026, 8, 64);
  const brick_arch_border = new THREE.Mesh(brick_arch_borderGeom, darkLeatherMat);
  brick_arch_border.name = "brick_arch_border";
  brick_arch_border.position.set(archCenterX, archCenterY, 0.199);
  brick_arch_border.scale.set(archRadiusX, archRadiusY, 0.55);
  brick_arch.add(brick_arch_border);

  const brickShape = new THREE.Shape();
  brickShape.moveTo(-0.45, -0.5);
  brickShape.lineTo(0.45, -0.5);
  brickShape.lineTo(0.5, -0.42);
  brickShape.lineTo(0.5, 0.42);
  brickShape.lineTo(0.44, 0.5);
  brickShape.lineTo(-0.44, 0.5);
  brickShape.lineTo(-0.5, 0.42);
  brickShape.lineTo(-0.5, -0.42);
  brickShape.closePath();

  const brickGeom = new THREE.ExtrudeGeometry(brickShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.025,
    bevelSegments: 2,
  });

  const brickRows = [
    { y: -0.50, count: 4, span: 0.42, width: 0.105 },
    { y: -0.40, count: 5, span: 0.58, width: 0.115 },
    { y: -0.30, count: 6, span: 0.72, width: 0.118 },
    { y: -0.19, count: 6, span: 0.76, width: 0.122 },
    { y: -0.08, count: 6, span: 0.72, width: 0.118 },
    { y: 0.03, count: 5, span: 0.62, width: 0.120 },
    { y: 0.14, count: 4, span: 0.48, width: 0.115 },
  ];
  const brickColors = [
    0x4a2e29,
    0x63382f,
    0x35302f,
    0x764737,
    0x43302d,
    0x59332d,
  ];
  const brickTransforms = [];
  for (let rowIndex = 0; rowIndex < brickRows.length; rowIndex++) {
    const row = brickRows[rowIndex];
    for (let i = 0; i < row.count; i++) {
      const x = row.count === 1
        ? 0
        : -row.span / 2 + row.span * i / (row.count - 1);
      const angle = ((i + rowIndex) % 3 - 1) * 0.018;
      const scaleX = row.width * (0.96 + ((i + rowIndex) % 2) * 0.05);
      brickTransforms.push({
        x,
        y: row.y,
        angle,
        scaleX,
        colorIndex: (rowIndex * 2 + i) % brickColors.length,
      });
    }
  }

  const bricks = new THREE.InstancedMesh(brickGeom, brickMat, brickTransforms.length);
  bricks.name = "bricks";
  const brickMatrix = new THREE.Matrix4();
  const brickQuaternion = new THREE.Quaternion();
  const brickPosition = new THREE.Vector3();
  const brickScale = new THREE.Vector3();
  for (let i = 0; i < brickTransforms.length; i++) {
    const transform = brickTransforms[i];
    brickPosition.set(transform.x + archCenterX, transform.y + archCenterY, 0.201);
    brickQuaternion.setFromEuler(new THREE.Euler(0, 0, transform.angle));
    brickScale.set(transform.scaleX, 0.078, 1);
    brickMatrix.compose(brickPosition, brickQuaternion, brickScale);
    bricks.setMatrixAt(i, brickMatrix);
    bricks.setColorAt(i, new THREE.Color(brickColors[transform.colorIndex]));
  }
  bricks.instanceMatrix.needsUpdate = true;
  if (bricks.instanceColor) bricks.instanceColor.needsUpdate = true;
  brick_arch.add(bricks);

  const cornerCenters = [
    [-0.30, 0.55],
    [0.41, 0.55],
    [-0.30, -0.55],
    [0.41, -0.55],
  ];

  const corner_petalGeom = new THREE.CircleGeometry(1, 16);
  const corner_petals = new THREE.InstancedMesh(
    corner_petalGeom,
    goldMat,
    cornerCenters.length * 5
  );
  corner_petals.name = "corner_petals";
  const petalMatrix = new THREE.Matrix4();
  const petalQuaternion = new THREE.Quaternion();
  let petalIndex = 0;
  for (let c = 0; c < cornerCenters.length; c++) {
    for (let p = 0; p < 5; p++) {
      const angle = p / 5 * Math.PI * 2;
      petalQuaternion.setFromEuler(new THREE.Euler(0, 0, angle));
      petalMatrix.compose(
        new THREE.Vector3(
          cornerCenters[c][0] + Math.cos(angle) * 0.026,
          cornerCenters[c][1] + Math.sin(angle) * 0.026,
          0.204
        ),
        petalQuaternion,
        new THREE.Vector3(0.027, 0.010, 1)
      );
      corner_petals.setMatrixAt(petalIndex++, petalMatrix);
    }
  }
  corner_petals.instanceMatrix.needsUpdate = true;
  front_decoration.add(corner_petals);

  const corner_centerGeom = new THREE.CircleGeometry(1, 14);
  const corner_centers = new THREE.InstancedMesh(
    corner_centerGeom,
    goldMat,
    cornerCenters.length
  );
  corner_centers.name = "corner_centers";
  const cornerCenterMatrix = new THREE.Matrix4();
  for (let i = 0; i < cornerCenters.length; i++) {
    cornerCenterMatrix.compose(
      new THREE.Vector3(cornerCenters[i][0], cornerCenters[i][1], 0.205),
      new THREE.Quaternion(),
      new THREE.Vector3(0.013, 0.013, 1)
    );
    corner_centers.setMatrixAt(i, cornerCenterMatrix);
  }
  corner_centers.instanceMatrix.needsUpdate = true;
  front_decoration.add(corner_centers);

  const corner_vines = new THREE.Group();
  corner_vines.name = "corner_vines";
  for (let c = 0; c < cornerCenters.length; c++) {
    const sx = cornerCenters[c][0] < 0 ? 1 : -1;
    const sy = cornerCenters[c][1] < 0 ? 1 : -1;
    const points = [
      new THREE.Vector3(cornerCenters[c][0], cornerCenters[c][1], 0.203),
      new THREE.Vector3(
        cornerCenters[c][0] + sx * 0.045,
        cornerCenters[c][1] + sy * 0.018,
        0.203
      ),
      new THREE.Vector3(
        cornerCenters[c][0] + sx * 0.095,
        cornerCenters[c][1] + sy * 0.055,
        0.203
      ),
      new THREE.Vector3(
        cornerCenters[c][0] + sx * 0.155,
        cornerCenters[c][1] + sy * 0.035,
        0.203
      ),
    ];
    const vineGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      18,
      0.0035,
      6,
      false
    );
    const vine = new THREE.Mesh(vineGeom, goldMat);
    corner_vines.add(vine);
  }
  front_decoration.add(corner_vines);

  const corner_leafGeom = new THREE.CircleGeometry(1, 14);
  const corner_leaves = new THREE.InstancedMesh(
    corner_leafGeom,
    goldMat,
    cornerCenters.length * 3
  );
  corner_leaves.name = "corner_leaves";
  const leafMatrix = new THREE.Matrix4();
  const leafQuaternion = new THREE.Quaternion();
  let leafIndex = 0;
  for (let c = 0; c < cornerCenters.length; c++) {
    const sx = cornerCenters[c][0] < 0 ? 1 : -1;
    const sy = cornerCenters[c][1] < 0 ? 1 : -1;
    for (let i = 0; i < 3; i++) {
      const angle = (sx > 0 ? Math.PI : 0) + sy * (0.35 + i * 0.25);
      leafQuaternion.setFromEuler(new THREE.Euler(0, 0, angle));
      leafMatrix.compose(
        new THREE.Vector3(
          cornerCenters[c][0] + sx * (0.065 + i * 0.045),
          cornerCenters[c][1] + sy * (0.035 + i * 0.018),
          0.205
        ),
        leafQuaternion,
        new THREE.Vector3(0.025, 0.009, 1)
      );
      corner_leaves.setMatrixAt(leafIndex++, leafMatrix);
    }
  }
  corner_leaves.instanceMatrix.needsUpdate = true;
  front_decoration.add(corner_leaves);

  const top_flourish = new THREE.Group();
  top_flourish.name = "top_flourish";
  const topFlourishPoints = [
    new THREE.Vector3(0.055, 0.555, 0.204),
    new THREE.Vector3(0.055, 0.585, 0.204),
    new THREE.Vector3(0.055, 0.615, 0.204),
  ];
  const top_flourish_stemGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(topFlourishPoints),
    10,
    0.0035,
    6,
    false
  );
  const top_flourish_stem = new THREE.Mesh(top_flourish_stemGeom, goldMat);
  top_flourish.add(top_flourish_stem);

  for (const side of [-1, 1]) {
    const branchPoints = [
      new THREE.Vector3(0.055, 0.575, 0.204),
      new THREE.Vector3(0.055 + side * 0.025, 0.592, 0.204),
      new THREE.Vector3(0.055 + side * 0.052, 0.582, 0.204),
    ];
    const branchGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(branchPoints),
      10,
      0.003,
      6,
      false
    );
    const branch = new THREE.Mesh(branchGeom, goldMat);
    top_flourish.add(branch);
  }
  front_decoration.add(top_flourish);

  const bottom_flourish = new THREE.Group();
  bottom_flourish.name = "bottom_flourish";
  const bottomFlourishPoints = [
    new THREE.Vector3(0.055, -0.555, 0.204),
    new THREE.Vector3(0.055, -0.585, 0.204),
    new THREE.Vector3(0.055, -0.612, 0.204),
  ];
  const bottom_flourish_stemGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(bottomFlourishPoints),
    10,
    0.0035,
    6,
    false
  );
  const bottom_flourish_stem = new THREE.Mesh(bottom_flourish_stemGeom, goldMat);
  bottom_flourish.add(bottom_flourish_stem);

  for (const side of [-1, 1]) {
    const branchPoints = [
      new THREE.Vector3(0.055, -0.575, 0.204),
      new THREE.Vector3(0.055 + side * 0.025, -0.592, 0.204),
      new THREE.Vector3(0.055 + side * 0.052, -0.582, 0.204),
    ];
    const branchGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(branchPoints),
      10,
      0.003,
      6,
      false
    );
    const branch = new THREE.Mesh(branchGeom, goldMat);
    bottom_flourish.add(branch);
  }
  front_decoration.add(bottom_flourish);

  const title_group = new THREE.Group();
  title_group.name = "title_group";
  front_decoration.add(title_group);

  const glyphSegments = {
    A: [
      [-0.5, -0.5, 0, 0.5],
      [0, 0.5, 0.5, -0.5],
      [-0.27, -0.02, 0.27, -0.02],
    ],
    E: [
      [-0.5, -0.5, -0.5, 0.5],
      [-0.5, 0.5, 0.5, 0.5],
      [-0.5, 0, 0.35, 0],
      [-0.5, -0.5, 0.5, -0.5],
    ],
    F: [
      [-0.5, -0.5, -0.5, 0.5],
      [-0.5, 0.5, 0.5, 0.5],
      [-0.5, 0, 0.35, 0],
    ],
    H: [
      [-0.5, -0.5, -0.5, 0.5],
      [0.5, -0.5, 0.5, 0.5],
      [-0.5, 0, 0.5, 0],
    ],
    I: [
      [-0.5, 0.5, 0.5, 0.5],
      [0, 0.5, 0, -0.5],
      [-0.5, -0.5, 0.5, -0.5],
    ],
    M: [
      [-0.5, -0.5, -0.5, 0.5],
      [-0.5, 0.5, 0, 0.02],
      [0, 0.02, 0.5, 0.5],
      [0.5, 0.5, 0.5, -0.5],
    ],
    N: [
      [-0.5, -0.5, -0.5, 0.5],
      [-0.5, 0.5, 0.5, -0.5],
      [0.5, -0.5, 0.5, 0.5],
    ],
    O: [
      [-0.5, -0.5, -0.5, 0.5],
      [-0.5, 0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5, -0.5],
      [0.5, -0.5, -0.5, -0.5],
    ],
    R: [
      [-0.5, -0.5, -0.5, 0.5],
      [-0.5, 0.5, 0.42, 0.5],
      [0.42, 0.5, 0.42, 0],
      [-0.5, 0, 0.42, 0],
      [0.02, 0, 0.5, -0.5],
    ],
    S: [
      [-0.5, 0.5, 0.5, 0.5],
      [-0.5, 0.5, -0.5, 0],
      [-0.5, 0, 0.5, 0],
      [0.5, 0, 0.5, -0.5],
      [0.5, -0.5, -0.5, -0.5],
    ],
    T: [
      [-0.5, 0.5, 0.5, 0.5],
      [0, 0.5, 0, -0.5],
    ],
  };

  const titleTransforms = [];

  function appendWord(word, centerX, baselineY, glyphW, glyphH, gap, thickness) {
    const totalWidth = word.length * glyphW + (word.length - 1) * gap;
    const startX = centerX - totalWidth / 2 + glyphW / 2;
    for (let i = 0; i < word.length; i++) {
      const segments = glyphSegments[word[i]] || [];
      const letterX = startX + i * (glyphW + gap);
      for (let j = 0; j < segments.length; j++) {
        const segment = segments[j];
        titleTransforms.push({
          x1: letterX + segment[0] * glyphW,
          y1: baselineY + segment[1] * glyphH,
          x2: letterX + segment[2] * glyphW,
          y2: baselineY + segment[3] * glyphH,
          thickness,
        });
      }
    }
  }

  appendWord("THE", 0.06, 0.39, 0.055, 0.10, 0.018, 0.008);
  appendWord("NAMIRER", 0.06, 0.22, 0.065, 0.14, 0.012, 0.009);
  appendWord("STAIRS", 0.06, 0.04, 0.070, 0.14, 0.014, 0.009);
  appendWord("OF", 0.005, -0.12, 0.050, 0.09, 0.018, 0.008);
  appendWord("TIME", 0.145, -0.12, 0.060, 0.10, 0.016, 0.008);

  const title_strokeGeom = new THREE.BoxGeometry(1, 1, 1);
  const title_strokes = new THREE.InstancedMesh(
    title_strokeGeom,
    goldMat,
    titleTransforms.length
  );
  title_strokes.name = "title_strokes";
  const titleMatrix = new THREE.Matrix4();
  const titleQuaternion = new THREE.Quaternion();
  const titlePosition = new THREE.Vector3();
  const titleScale = new THREE.Vector3();
  for (let i = 0; i < titleTransforms.length; i++) {
    const transform = titleTransforms[i];
    const dx = transform.x2 - transform.x1;
    const dy = transform.y2 - transform.y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    titlePosition.set(
      (transform.x1 + transform.x2) / 2,
      (transform.y1 + transform.y2) / 2,
      0.222
    );
    titleQuaternion.setFromEuler(new THREE.Euler(0, 0, Math.atan2(dy, dx)));
    titleScale.set(length, transform.thickness, 0.008);
    titleMatrix.compose(titlePosition, titleQuaternion, titleScale);
    title_strokes.setMatrixAt(i, titleMatrix);
  }
  title_strokes.instanceMatrix.needsUpdate = true;
  title_group.add(title_strokes);

  const spine_decoration = new THREE.Group();
  spine_decoration.name = "spine_decoration";
  root.add(spine_decoration);

  const spine_gold_rules = new THREE.Group();
  spine_gold_rules.name = "spine_gold_rules";
  const spineRuleHeights = [0.61, 0.45, 0.16, -0.31, -0.57, -0.64];
  for (let i = 0; i < spineRuleHeights.length; i++) {
    const ruleGeom = new THREE.TorusGeometry(0.151, 0.0025, 6, 32);
    const rule = new THREE.Mesh(ruleGeom, goldMat);
    rule.rotation.x = Math.PI / 2;
    rule.scale.x = 0.72;
    rule.position.set(-0.455, spineRuleHeights[i], 0);
    spine_gold_rules.add(rule);
  }
  spine_decoration.add(spine_gold_rules);

  const spine_title_group = new THREE.Group();
  spine_title_group.name = "spine_title_group";
  spine_decoration.add(spine_title_group);

  const spineTitleTransforms = [];
  const spineTitleCenterX = -0.49;
  const spineTitleRadius = 0.154;

  function appendSpineWord(word, centerY, glyphW, glyphH, gap) {
    const totalWidth = word.length * glyphW + (word.length - 1) * gap;
    const startX = spineTitleCenterX - totalWidth / 2 + glyphW / 2;
    for (let i = 0; i < word.length; i++) {
      const segments = glyphSegments[word[i]] || [];
      const letterX = startX + i * (glyphW + gap);
      for (let j = 0; j < segments.length; j++) {
        const segment = segments[j];
        spineTitleTransforms.push({
          x1: letterX + segment[0] * glyphW,
          y1: centerY + segment[1] * glyphH,
          x2: letterX + segment[2] * glyphW,
          y2: centerY + segment[3] * glyphH,
        });
      }
    }
  }

  appendSpineWord("THE", 0.31, 0.022, 0.040, 0.006);
  appendSpineWord("TIME", 0.255, 0.020, 0.038, 0.005);
  appendSpineWord("OF", 0.205, 0.024, 0.040, 0.006);

  const spine_title_strokeGeom = new THREE.BoxGeometry(1, 1, 1);
  const spine_title_strokes = new THREE.InstancedMesh(
    spine_title_strokeGeom,
    goldMat,
    spineTitleTransforms.length
  );
  spine_title_strokes.name = "spine_title_strokes";
  const spineTitleMatrix = new THREE.Matrix4();
  const spineTitleQuaternion = new THREE.Quaternion();
  const spineTitlePosition = new THREE.Vector3();
  const spineTitleScale = new THREE.Vector3();
  for (let i = 0; i < spineTitleTransforms.length; i++) {
    const transform = spineTitleTransforms[i];
    const dx = transform.x2 - transform.x1;
    const dy = transform.y2 - transform.y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const x = (transform.x1 + transform.x2) / 2;
    const y = (transform.y1 + transform.y2) / 2;
    const z = Math.sqrt(Math.max(0, spineTitleRadius * spineTitleRadius - (x - spineTitleCenterX) * (x - spineTitleCenterX)));
    spineTitlePosition.set(x, y, z + 0.004);
    spineTitleQuaternion.setFromEuler(new THREE.Euler(0, 0, Math.atan2(dy, dx)));
    spineTitleScale.set(length, 0.004, 0.004);
    spineTitleMatrix.compose(spineTitlePosition, spineTitleQuaternion, spineTitleScale);
    spine_title_strokes.setMatrixAt(i, spineTitleMatrix);
  }
  spine_title_strokes.instanceMatrix.needsUpdate = true;
  spine_title_group.add(spine_title_strokes);

  const spine_ornamentGeom = new THREE.CircleGeometry(1, 14);
  const spine_ornament = new THREE.InstancedMesh(spine_ornamentGeom, goldMat, 12);
  spine_ornament.name = "spine_ornament";
  const spineOrnamentMatrix = new THREE.Matrix4();
  const spineOrnamentQuaternion = new THREE.Quaternion();
  let spineOrnamentIndex = 0;
  for (const centerY of [0.50, -0.49]) {
    for (let i = 0; i < 6; i++) {
      const angle = i / 6 * Math.PI * 2;
      spineOrnamentQuaternion.setFromEuler(new THREE.Euler(0, 0, angle));
      spineOrnamentMatrix.compose(
        new THREE.Vector3(-0.49, centerY + Math.sin(angle) * 0.025, 0.158),
        spineOrnamentQuaternion,
        new THREE.Vector3(0.022, 0.008, 1)
      );
      spine_ornament.setMatrixAt(spineOrnamentIndex++, spineOrnamentMatrix);
    }
  }
  spine_ornament.instanceMatrix.needsUpdate = true;
  spine_decoration.add(spine_ornament);

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