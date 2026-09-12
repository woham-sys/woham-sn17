// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "marquetry_coffee_table";

  const tableW = 3.2;
  const tableD = 1.75;
  const topBaseY = 1.0;
  const topSurfaceY = 1.14;
  const legH = 1.0;
  const legX = 1.42;
  const legZ = 0.68;

  const tabletopMat = new THREE.MeshStandardMaterial({
    color: 0x71331f,
    metalness: 0.0,
    roughness: 0.6
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x43190f,
    metalness: 0.0,
    roughness: 0.6
  });
  const apronMat = new THREE.MeshStandardMaterial({
    color: 0x572416,
    metalness: 0.0,
    roughness: 0.6
  });
  const legMat = new THREE.MeshStandardMaterial({
    color: 0x4b2115,
    metalness: 0.0,
    roughness: 0.6
  });
  const inlayPanelMat = new THREE.MeshStandardMaterial({
    color: 0x7b3d27,
    metalness: 0.0,
    roughness: 0.6
  });
  const inlayDarkMat = new THREE.MeshStandardMaterial({
    color: 0x211713,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const inlayWarmMat = new THREE.MeshStandardMaterial({
    color: 0x98502e,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide
  });
  const inlayMidMat = new THREE.MeshStandardMaterial({
    color: 0x69301d,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide
  });
  const inlayLightMat = new THREE.MeshStandardMaterial({
    color: 0xa25b34,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x35150e,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.32
  });
  const highlightMat = new THREE.MeshStandardMaterial({
    color: 0xb96840,
    metalness: 0.0,
    roughness: 0.6
  });

  function roundedRectShape(w, d, r) {
    const shape = new THREE.Shape();
    const x0 = -w / 2;
    const x1 = w / 2;
    const z0 = -d / 2;
    const z1 = d / 2;
    shape.moveTo(x0 + r, z0);
    shape.lineTo(x1 - r, z0);
    shape.quadraticCurveTo(x1, z0, x1, z0 + r);
    shape.lineTo(x1, z1 - r);
    shape.quadraticCurveTo(x1, z1, x1 - r, z1);
    shape.lineTo(x0 + r, z1);
    shape.quadraticCurveTo(x0, z1, x0, z1 - r);
    shape.lineTo(x0, z0 + r);
    shape.quadraticCurveTo(x0, z0, x0 + r, z0);
    shape.closePath();
    return shape;
  }

  function makeHorizontalExtrude(shape, depth, bevelSize, bevelThickness) {
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: bevelSize,
      bevelThickness: bevelThickness
    });
    geom.rotateX(-Math.PI / 2);
    return geom;
  }

  function makePolygonGeom(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], -points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], -points[i][1]);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  function makeHorizontalPolygon(points, mat, y) {
    const mesh = new THREE.Mesh(makePolygonGeom(points), mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = y;
    return mesh;
  }

  const tabletopShape = roundedRectShape(tableW, tableD, 0.09);
  const tabletopGeom = makeHorizontalExtrude(tabletopShape, 0.11, 0.025, 0.015);
  const tabletop = new THREE.Mesh(tabletopGeom, tabletopMat);
  tabletop.name = "tabletop";
  tabletop.position.y = topBaseY;
  root.add(tabletop);

  const tabletop_edgeShape = roundedRectShape(3.24, 1.79, 0.105);
  const tabletop_edgeGeom = makeHorizontalExtrude(tabletop_edgeShape, 0.055, 0.018, 0.012);
  const tabletop_edge = new THREE.Mesh(tabletop_edgeGeom, edgeMat);
  tabletop_edge.name = "tabletop_edge";
  tabletop_edge.position.y = 0.985;
  root.add(tabletop_edge);

  const long_edge_beadGeom = new THREE.CylinderGeometry(0.022, 0.022, 3.12, 12);
  const front_edge_bead = new THREE.Mesh(long_edge_beadGeom, edgeMat);
  front_edge_bead.name = "front_edge_bead";
  front_edge_bead.rotation.z = Math.PI / 2;
  front_edge_bead.position.set(0, 1.025, 0.885);
  root.add(front_edge_bead);

  const rear_edge_bead = new THREE.Mesh(long_edge_beadGeom, edgeMat);
  rear_edge_bead.name = "rear_edge_bead";
  rear_edge_bead.rotation.z = Math.PI / 2;
  rear_edge_bead.position.set(0, 1.025, -0.885);
  root.add(rear_edge_bead);

  const short_edge_beadGeom = new THREE.CylinderGeometry(0.022, 0.022, 1.68, 12);
  const left_edge_bead = new THREE.Mesh(short_edge_beadGeom, edgeMat);
  left_edge_bead.name = "left_edge_bead";
  left_edge_bead.rotation.x = Math.PI / 2;
  left_edge_bead.position.set(-1.61, 1.025, 0);
  root.add(left_edge_bead);

  const right_edge_bead = new THREE.Mesh(short_edge_beadGeom, edgeMat);
  right_edge_bead.name = "right_edge_bead";
  right_edge_bead.rotation.x = Math.PI / 2;
  right_edge_bead.position.set(1.61, 1.025, 0);
  root.add(right_edge_bead);

  const front_edge_highlightGeom = new THREE.BoxGeometry(2.92, 0.008, 0.008);
  const front_edge_highlight = new THREE.Mesh(front_edge_highlightGeom, highlightMat);
  front_edge_highlight.name = "front_edge_highlight";
  front_edge_highlight.position.set(0, 1.052, 0.902);
  root.add(front_edge_highlight);

  const legsGeom = new THREE.CylinderGeometry(0.16, 0.135, legH, 4);
  const legs = new THREE.InstancedMesh(legsGeom, legMat, 4);
  legs.name = "legs";
  const legDummy = new THREE.Object3D();
  const legPositions = [
    [-legX, legH / 2, legZ],
    [legX, legH / 2, legZ],
    [-legX, legH / 2, -legZ],
    [legX, legH / 2, -legZ]
  ];
  for (let i = 0; i < legPositions.length; i++) {
    legDummy.position.set(legPositions[i][0], legPositions[i][1], legPositions[i][2]);
    legDummy.rotation.set(0, Math.PI / 4, 0);
    legDummy.scale.set(1, 1, 1);
    legDummy.updateMatrix();
    legs.setMatrixAt(i, legDummy.matrix);
  }
  legs.instanceMatrix.needsUpdate = true;
  root.add(legs);

  const leg_capitalsGeom = new THREE.BoxGeometry(0.29, 0.12, 0.29);
  const leg_capitals = new THREE.InstancedMesh(leg_capitalsGeom, legMat, 4);
  leg_capitals.name = "leg_capitals";
  for (let i = 0; i < legPositions.length; i++) {
    legDummy.position.set(legPositions[i][0], 0.965, legPositions[i][2]);
    legDummy.rotation.set(0, 0, 0);
    legDummy.scale.set(1, 1, 1);
    legDummy.updateMatrix();
    leg_capitals.setMatrixAt(i, legDummy.matrix);
  }
  leg_capitals.instanceMatrix.needsUpdate = true;
  root.add(leg_capitals);

  const front_apronGeom = new THREE.BoxGeometry(2.72, 0.36, 0.10);
  const front_apron = new THREE.Mesh(front_apronGeom, apronMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 0.80, 0.72);
  root.add(front_apron);

  const rear_apron = new THREE.Mesh(front_apronGeom, apronMat);
  rear_apron.name = "rear_apron";
  rear_apron.position.set(0, 0.80, -0.72);
  root.add(rear_apron);

  const side_apronGeom = new THREE.BoxGeometry(0.10, 0.36, 1.25);
  const left_apron = new THREE.Mesh(side_apronGeom, apronMat);
  left_apron.name = "left_apron";
  left_apron.position.set(-1.42, 0.80, 0);
  root.add(left_apron);

  const right_apron = new THREE.Mesh(side_apronGeom, apronMat);
  right_apron.name = "right_apron";
  right_apron.position.set(1.42, 0.80, 0);
  root.add(right_apron);

  const front_apron_panelGeom = new THREE.BoxGeometry(2.48, 0.22, 0.018);
  const front_apron_panel = new THREE.Mesh(front_apron_panelGeom, tabletopMat);
  front_apron_panel.name = "front_apron_panel";
  front_apron_panel.position.set(0, 0.80, 0.779);
  root.add(front_apron_panel);

  const rear_apron_panel = new THREE.Mesh(front_apron_panelGeom, tabletopMat);
  rear_apron_panel.name = "rear_apron_panel";
  rear_apron_panel.position.set(0, 0.80, -0.779);
  root.add(rear_apron_panel);

  const side_apron_panelGeom = new THREE.BoxGeometry(0.018, 0.22, 1.03);
  const left_apron_panel = new THREE.Mesh(side_apron_panelGeom, tabletopMat);
  left_apron_panel.name = "left_apron_panel";
  left_apron_panel.position.set(-1.479, 0.80, 0);
  root.add(left_apron_panel);

  const right_apron_panel = new THREE.Mesh(side_apron_panelGeom, tabletopMat);
  right_apron_panel.name = "right_apron_panel";
  right_apron_panel.position.set(1.479, 0.80, 0);
  root.add(right_apron_panel);

  const front_lower_trimGeom = new THREE.BoxGeometry(2.72, 0.045, 0.045);
  const front_lower_trim = new THREE.Mesh(front_lower_trimGeom, edgeMat);
  front_lower_trim.name = "front_lower_trim";
  front_lower_trim.position.set(0, 0.61, 0.755);
  root.add(front_lower_trim);

  const rear_lower_trim = new THREE.Mesh(front_lower_trimGeom, edgeMat);
  rear_lower_trim.name = "rear_lower_trim";
  rear_lower_trim.position.set(0, 0.61, -0.755);
  root.add(rear_lower_trim);

  const side_lower_trimGeom = new THREE.BoxGeometry(0.045, 0.045, 1.25);
  const left_lower_trim = new THREE.Mesh(side_lower_trimGeom, edgeMat);
  left_lower_trim.name = "left_lower_trim";
  left_lower_trim.position.set(-1.455, 0.61, 0);
  root.add(left_lower_trim);

  const right_lower_trim = new THREE.Mesh(side_lower_trimGeom, edgeMat);
  right_lower_trim.name = "right_lower_trim";
  right_lower_trim.position.set(1.455, 0.61, 0);
  root.add(right_lower_trim);

  const inlay_panelGeom = new THREE.BoxGeometry(2.66, 0.008, 1.18);
  const inlay_panel = new THREE.Mesh(inlay_panelGeom, inlayPanelMat);
  inlay_panel.name = "inlay_panel";
  inlay_panel.position.set(0, 1.136, 0);
  root.add(inlay_panel);

  const marquetry_outer_border_longGeom = new THREE.BoxGeometry(2.66, 0.006, 0.018);
  const marquetry_outer_border_front = new THREE.Mesh(marquetry_outer_border_longGeom, inlayDarkMat);
  marquetry_outer_border_front.name = "marquetry_outer_border_front";
  marquetry_outer_border_front.position.set(0, 1.143, 0.59);
  root.add(marquetry_outer_border_front);

  const marquetry_outer_border_rear = new THREE.Mesh(marquetry_outer_border_longGeom, inlayDarkMat);
  marquetry_outer_border_rear.name = "marquetry_outer_border_rear";
  marquetry_outer_border_rear.position.set(0, 1.143, -0.59);
  root.add(marquetry_outer_border_rear);

  const marquetry_outer_border_shortGeom = new THREE.BoxGeometry(0.018, 0.006, 1.18);
  const marquetry_outer_border_left = new THREE.Mesh(marquetry_outer_border_shortGeom, inlayDarkMat);
  marquetry_outer_border_left.name = "marquetry_outer_border_left";
  marquetry_outer_border_left.position.set(-1.33, 1.143, 0);
  root.add(marquetry_outer_border_left);

  const marquetry_outer_border_right = new THREE.Mesh(marquetry_outer_border_shortGeom, inlayDarkMat);
  marquetry_outer_border_right.name = "marquetry_outer_border_right";
  marquetry_outer_border_right.position.set(1.33, 1.143, 0);
  root.add(marquetry_outer_border_right);

  const marquetry_inner_border_longGeom = new THREE.BoxGeometry(2.48, 0.006, 0.014);
  const marquetry_inner_border_front = new THREE.Mesh(marquetry_inner_border_longGeom, inlayDarkMat);
  marquetry_inner_border_front.name = "marquetry_inner_border_front";
  marquetry_inner_border_front.position.set(0, 1.144, 0.525);
  root.add(marquetry_inner_border_front);

  const marquetry_inner_border_rear = new THREE.Mesh(marquetry_inner_border_longGeom, inlayDarkMat);
  marquetry_inner_border_rear.name = "marquetry_inner_border_rear";
  marquetry_inner_border_rear.position.set(0, 1.144, -0.525);
  root.add(marquetry_inner_border_rear);

  const marquetry_inner_border_shortGeom = new THREE.BoxGeometry(0.014, 0.006, 1.05);
  const marquetry_inner_border_left = new THREE.Mesh(marquetry_inner_border_shortGeom, inlayDarkMat);
  marquetry_inner_border_left.name = "marquetry_inner_border_left";
  marquetry_inner_border_left.position.set(-1.24, 1.144, 0);
  root.add(marquetry_inner_border_left);

  const marquetry_inner_border_right = new THREE.Mesh(marquetry_inner_border_shortGeom, inlayDarkMat);
  marquetry_inner_border_right.name = "marquetry_inner_border_right";
  marquetry_inner_border_right.position.set(1.24, 1.144, 0);
  root.add(marquetry_inner_border_right);

  const marquetry_star = new THREE.Group();
  marquetry_star.name = "marquetry_star";
  root.add(marquetry_star);

  const starMats = [inlayWarmMat, inlayMidMat, inlayLightMat, inlayDarkMat];
  const starPoints = [
    [0.00, 0.00],
    [-0.22, -0.075],
    [-0.43, -0.285],
    [-0.70, -0.18],
    [-0.98, -0.43],
    [-1.20, -0.31],
    [-1.08, -0.04],
    [-1.22, 0.25],
    [-0.88, 0.47],
    [-0.55, 0.34],
    [-0.25, 0.50],
    [0.00, 0.00],
    [0.22, -0.075],
    [0.43, -0.285],
    [0.70, -0.18],
    [0.98, -0.43],
    [1.20, -0.31],
    [1.08, -0.04],
    [1.22, 0.25],
    [0.88, 0.47],
    [0.55, 0.34],
    [0.25, 0.50]
  ];

  for (let i = 0; i < starPoints.length - 1; i++) {
    const a = starPoints[i];
    const b = starPoints[i + 1];
    const wedge = makeHorizontalPolygon(
      [[0, 0], a, b],
      starMats[(i * 3 + Math.floor(i / 4)) % starMats.length],
      1.145
    );
    wedge.name = "marquetry_star_wedge_" + i;
    marquetry_star.add(wedge);
  }

  const marquetry_star_outline = new THREE.Group();
  marquetry_star_outline.name = "marquetry_star_outline";
  root.add(marquetry_star_outline);

  for (let i = 0; i < starPoints.length; i++) {
    const a = starPoints[i];
    const b = starPoints[(i + 1) % starPoints.length];
    const outlineGeom = new THREE.TubeGeometry(
      new THREE.LineCurve3(
        new THREE.Vector3(a[0], 1.151, a[1]),
        new THREE.Vector3(b[0], 1.151, b[1])
      ),
      1,
      0.007,
      6,
      false
    );
    const outline_segment = new THREE.Mesh(outlineGeom, inlayDarkMat);
    outline_segment.name = "marquetry_star_outline_segment_" + i;
    marquetry_star_outline.add(outline_segment);
  }

  const marquetry_centerGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.009, 8);
  const marquetry_center = new THREE.Mesh(marquetry_centerGeom, inlayDarkMat);
  marquetry_center.name = "marquetry_center";
  marquetry_center.position.set(0, 1.151, 0);
  marquetry_center.rotation.y = Math.PI / 8;
  root.add(marquetry_center);

  const top_wood_grain = new THREE.Group();
  top_wood_grain.name = "top_wood_grain";
  root.add(top_wood_grain);

  for (let i = 0; i < 7; i++) {
    const z = -0.48 + i * 0.16;
    const bend = (i % 2 === 0 ? 1 : -1) * 0.018;
    const grainCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.18, 1.149, z),
      new THREE.Vector3(-0.55, 1.149, z + bend),
      new THREE.Vector3(0.15, 1.149, z - bend * 0.5),
      new THREE.Vector3(1.18, 1.149, z + bend * 0.25)
    ]);
    const grainGeom = new THREE.TubeGeometry(grainCurve, 18, 0.0025, 5, false);
    const grain_line = new THREE.Mesh(grainGeom, grainMat);
    grain_line.name = "top_wood_grain_line_" + i;
    top_wood_grain.add(grain_line);
  }

  const apron_wood_grain = new THREE.Group();
  apron_wood_grain.name = "apron_wood_grain";
  root.add(apron_wood_grain);

  for (let i = 0; i < 4; i++) {
    const y = 0.705 + i * 0.065;
    const wave = i % 2 === 0 ? 0.012 : -0.012;
    const apronCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.16, y, 0.791),
      new THREE.Vector3(-0.45, y + wave, 0.791),
      new THREE.Vector3(0.35, y - wave, 0.791),
      new THREE.Vector3(1.16, y + wave * 0.3, 0.791)
    ]);
    const apronGrainGeom = new THREE.TubeGeometry(apronCurve, 16, 0.0028, 5, false);
    const apron_grain_line = new THREE.Mesh(apronGrainGeom, grainMat);
    apron_grain_line.name = "apron_wood_grain_line_" + i;
    apron_wood_grain.add(apron_grain_line);
  }

  const leg_wood_grain = new THREE.Group();
  leg_wood_grain.name = "leg_wood_grain";
  root.add(leg_wood_grain);

  for (const x of [-legX, legX]) {
    for (const offset of [-0.045, 0.045]) {
      const legCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(x + offset, 0.10, 0.813),
        new THREE.Vector3(x + offset + 0.008, 0.38, 0.813),
        new THREE.Vector3(x + offset - 0.006, 0.68, 0.813),
        new THREE.Vector3(x + offset + 0.004, 0.94, 0.813)
      ]);
      const legGrainGeom = new THREE.TubeGeometry(legCurve, 12, 0.0028, 5, false);
      const leg_grain_line = new THREE.Mesh(legGrainGeom, grainMat);
      leg_grain_line.name = "leg_wood_grain_line";
      leg_wood_grain.add(leg_grain_line);
    }
  }

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