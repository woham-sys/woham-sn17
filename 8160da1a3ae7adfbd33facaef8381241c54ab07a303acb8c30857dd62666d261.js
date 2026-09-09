function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "aged_navigation_book";

  const book = new THREE.Group();
  book.name = "book";
  root.add(book);

  const cover_group = new THREE.Group();
  cover_group.name = "cover_group";
  book.add(cover_group);

  const page_group = new THREE.Group();
  page_group.name = "page_group";
  book.add(page_group);

  const ink_group = new THREE.Group();
  ink_group.name = "ink_group";
  book.add(ink_group);

  const coverW = 0.72;
  const coverD = 1.0;
  const coverT = 0.022;
  const pageW = 0.66;
  const pageD = 0.92;
  const pageH = 0.086;

  const coverMat = new THREE.MeshStandardMaterial({ color: 0xd8c49a, metalness: 0.0, roughness: 0.9 });
  const coverEdgeMat = new THREE.MeshStandardMaterial({ color: 0x7d5b36, metalness: 0.0, roughness: 0.9 });
  const pageMat = new THREE.MeshStandardMaterial({ color: 0xe8ddbd, metalness: 0.0, roughness: 0.9 });
  const pageLineMat = new THREE.MeshStandardMaterial({ color: 0x8a6d49, metalness: 0.0, roughness: 0.9 });
  const stainMat = new THREE.MeshStandardMaterial({ color: 0x9b713f, metalness: 0.0, roughness: 0.95, transparent: true, opacity: 0.34, depthWrite: false });
  const darkStainMat = new THREE.MeshStandardMaterial({ color: 0x5d3e27, metalness: 0.0, roughness: 0.95, transparent: true, opacity: 0.48, depthWrite: false });
  const creaseMat = new THREE.MeshStandardMaterial({ color: 0x6f5437, metalness: 0.0, roughness: 0.95, transparent: true, opacity: 0.55 });
  const inkMat = new THREE.MeshStandardMaterial({ color: 0x171716, metalness: 0.0, roughness: 0.8 });
  const fadedInkMat = new THREE.MeshStandardMaterial({ color: 0x3b3027, metalness: 0.0, roughness: 0.85, transparent: true, opacity: 0.55 });
  const compassLightMat = new THREE.MeshStandardMaterial({ color: 0xcbb98f, metalness: 0.0, roughness: 0.9, side: THREE.DoubleSide });
  const compassDarkMat = new THREE.MeshStandardMaterial({ color: 0x1c1b19, metalness: 0.0, roughness: 0.85, side: THREE.DoubleSide });

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

  function roundedExtrudeGeometry(w, d, t, r) {
    const geom = new THREE.ExtrudeGeometry(roundedRectShape(w, d, r), {
      depth: t,
      steps: 1,
      curveSegments: 8
    });
    geom.translate(0, 0, -t / 2);
    geom.rotateX(-Math.PI / 2);
    return geom;
  }

  function addTopStroke(parent, name, coords, mat, y, radius) {
    const pts = [];
    for (let i = 0; i < coords.length; i++) pts.push(new THREE.Vector3(coords[i][0], y, coords[i][1]));
    const curve = pts.length === 2 ? new THREE.LineCurve3(pts[0], pts[1]) : new THREE.CatmullRomCurve3(pts, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, Math.max(2, (pts.length - 1) * 5), radius, 6, false);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  const bottom_coverGeom = roundedExtrudeGeometry(coverW, coverD, coverT, 0.055);
  const bottom_cover = new THREE.Mesh(bottom_coverGeom, coverMat);
  bottom_cover.name = "bottom_cover";
  bottom_cover.position.y = -0.066;
  cover_group.add(bottom_cover);

  const bottom_cover_edgeGeom = roundedExtrudeGeometry(coverW + 0.012, coverD + 0.012, 0.010, 0.058);
  const bottom_cover_edge = new THREE.Mesh(bottom_cover_edgeGeom, coverEdgeMat);
  bottom_cover_edge.name = "bottom_cover_edge";
  bottom_cover_edge.position.y = -0.083;
  cover_group.add(bottom_cover_edge);

  const page_blockGeom = roundedExtrudeGeometry(pageW, pageD, pageH, 0.045);
  const page_block = new THREE.Mesh(page_blockGeom, pageMat);
  page_block.name = "page_block";
  page_block.position.y = -0.004;
  page_group.add(page_block);

  const top_pageGeom = roundedExtrudeGeometry(pageW - 0.012, pageD - 0.012, 0.010, 0.042);
  const top_page = new THREE.Mesh(top_pageGeom, pageMat);
  top_page.name = "top_page";
  top_page.position.y = 0.041;
  page_group.add(top_page);

  const top_coverGeom = roundedExtrudeGeometry(coverW, coverD, coverT, 0.055);
  const top_cover = new THREE.Mesh(top_coverGeom, coverMat);
  top_cover.name = "top_cover";
  top_cover.position.y = 0.058;
  cover_group.add(top_cover);

  const top_cover_edgeGeom = roundedExtrudeGeometry(coverW + 0.012, coverD + 0.012, 0.010, 0.058);
  const top_cover_edge = new THREE.Mesh(top_cover_edgeGeom, coverEdgeMat);
  top_cover_edge.name = "top_cover_edge";
  top_cover_edge.position.y = 0.041;
  cover_group.add(top_cover_edge);

  const spine_rollGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.91, 24);
  const spine_roll = new THREE.Mesh(spine_rollGeom, coverMat);
  spine_roll.name = "spine_roll";
  spine_roll.rotation.x = Math.PI / 2;
  spine_roll.position.set(-0.354, 0.002, 0);
  cover_group.add(spine_roll);

  const spine_shadowGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.91, 10);
  const spine_shadow = new THREE.Mesh(spine_shadowGeom, coverEdgeMat);
  spine_shadow.name = "spine_shadow";
  spine_shadow.rotation.x = Math.PI / 2;
  spine_shadow.position.set(-0.379, -0.020, 0);
  cover_group.add(spine_shadow);

  const right_page_lineGeom = new THREE.BoxGeometry(0.006, 0.0025, 0.80);
  const right_page_lines = new THREE.InstancedMesh(right_page_lineGeom, pageLineMat, 9);
  right_page_lines.name = "right_page_lines";
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 9; i++) {
    dummy.position.set(0.334, -0.034 + i * 0.008, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    right_page_lines.setMatrixAt(i, dummy.matrix);
  }
  right_page_lines.instanceMatrix.needsUpdate = true;
  page_group.add(right_page_lines);

  const front_page_lineGeom = new THREE.BoxGeometry(0.56, 0.0025, 0.006);
  const front_page_lines = new THREE.InstancedMesh(front_page_lineGeom, pageLineMat, 9);
  front_page_lines.name = "front_page_lines";
  for (let i = 0; i < 9; i++) {
    dummy.position.set(0.015, -0.034 + i * 0.008, 0.462);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_page_lines.setMatrixAt(i, dummy.matrix);
  }
  front_page_lines.instanceMatrix.needsUpdate = true;
  page_group.add(front_page_lines);

  const left_page_lineGeom = new THREE.BoxGeometry(0.006, 0.0025, 0.78);
  const left_page_lines = new THREE.InstancedMesh(left_page_lineGeom, pageLineMat, 7);
  left_page_lines.name = "left_page_lines";
  for (let i = 0; i < 7; i++) {
    dummy.position.set(-0.334, -0.030 + i * 0.010, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    left_page_lines.setMatrixAt(i, dummy.matrix);
  }
  left_page_lines.instanceMatrix.needsUpdate = true;
  page_group.add(left_page_lines);

  const stainGeom = new THREE.CircleGeometry(1, 28);
  const stainData = [
    [-0.275, -0.390, 0.040, 0.030, 0.2],
    [-0.245, -0.360, 0.026, 0.020, -0.4],
    [0.250, -0.410, 0.055, 0.026, 0.5],
    [0.300, -0.350, 0.030, 0.020, -0.2],
    [-0.300, -0.100, 0.030, 0.045, 0.1],
    [0.285, 0.020, 0.045, 0.025, -0.5],
    [0.310, 0.230, 0.030, 0.050, 0.3],
    [-0.200, 0.360, 0.040, 0.026, -0.2],
    [0.120, 0.405, 0.055, 0.030, 0.4],
    [0.260, 0.380, 0.035, 0.022, -0.3],
    [-0.050, 0.180, 0.025, 0.018, 0.2],
    [0.180, -0.180, 0.020, 0.015, -0.4],
    [-0.315, 0.285, 0.020, 0.035, 0.1],
    [0.320, -0.120, 0.020, 0.030, -0.1]
  ];
  const cover_stains = new THREE.InstancedMesh(stainGeom, stainMat, stainData.length);
  cover_stains.name = "cover_stains";
  for (let i = 0; i < stainData.length; i++) {
    const s = stainData[i];
    dummy.position.set(s[0], 0.0715, s[1]);
    dummy.rotation.set(-Math.PI / 2, 0, s[4]);
    dummy.scale.set(s[2], s[3], 1);
    dummy.updateMatrix();
    cover_stains.setMatrixAt(i, dummy.matrix);
  }
  cover_stains.instanceMatrix.needsUpdate = true;
  cover_group.add(cover_stains);

  const darkStainData = [
    [-0.285, -0.398, 0.018, 0.014, 0.1],
    [0.285, -0.395, 0.026, 0.013, -0.3],
    [0.315, 0.245, 0.018, 0.030, 0.2],
    [-0.190, 0.375, 0.018, 0.013, -0.2],
    [0.145, 0.415, 0.025, 0.014, 0.3],
    [0.305, -0.105, 0.012, 0.020, 0.0],
    [-0.305, -0.095, 0.012, 0.020, 0.1],
    [0.030, 0.185, 0.012, 0.010, 0.0]
  ];
  const dark_stain_spots = new THREE.InstancedMesh(stainGeom, darkStainMat, darkStainData.length);
  dark_stain_spots.name = "dark_stain_spots";
  for (let i = 0; i < darkStainData.length; i++) {
    const s = darkStainData[i];
    dummy.position.set(s[0], 0.0720, s[1]);
    dummy.rotation.set(-Math.PI / 2, 0, s[4]);
    dummy.scale.set(s[2], s[3], 1);
    dummy.updateMatrix();
    dark_stain_spots.setMatrixAt(i, dummy.matrix);
  }
  dark_stain_spots.instanceMatrix.needsUpdate = true;
  cover_group.add(dark_stain_spots);

  const speckleGeom = new THREE.CircleGeometry(1, 10);
  const cover_speckles = new THREE.InstancedMesh(speckleGeom, darkStainMat, 28);
  cover_speckles.name = "cover_speckles";
  for (let i = 0; i < 28; i++) {
    const x = -0.29 + (((i * 37) % 100) / 100) * 0.58;
    const z = -0.42 + (((i * 61) % 100) / 100) * 0.84;
    const s = 0.0025 + ((i * 11) % 5) * 0.0012;
    dummy.position.set(x, 0.0725, z);
    dummy.rotation.set(-Math.PI / 2, 0, i * 0.31);
    dummy.scale.set(s * (1 + (i % 3) * 0.25), s, 1);
    dummy.updateMatrix();
    cover_speckles.setMatrixAt(i, dummy.matrix);
  }
  cover_speckles.instanceMatrix.needsUpdate = true;
  cover_group.add(cover_speckles);

  const cover_creases = new THREE.Group();
  cover_creases.name = "cover_creases";
  cover_group.add(cover_creases);

  addTopStroke(cover_creases, "rear_cover_crease", [[-0.31, -0.42], [-0.22, -0.39], [-0.12, -0.43]], creaseMat, 0.073, 0.0015);
  addTopStroke(cover_creases, "right_cover_crease", [[0.31, -0.34], [0.27, -0.25], [0.32, -0.16]], creaseMat, 0.073, 0.0015);
  addTopStroke(cover_creases, "front_cover_crease", [[-0.28, 0.42], [-0.18, 0.38], [-0.08, 0.43]], creaseMat, 0.073, 0.0015);
  addTopStroke(cover_creases, "left_cover_crease", [[-0.32, 0.12], [-0.27, 0.05], [-0.30, -0.04]], creaseMat, 0.073, 0.0015);
  addTopStroke(cover_creases, "diagonal_cover_crease", [[0.18, 0.34], [0.25, 0.28], [0.31, 0.20]], creaseMat, 0.073, 0.0014);
  addTopStroke(cover_creases, "small_cover_crease", [[-0.12, -0.45], [-0.08, -0.39], [-0.02, -0.36]], creaseMat, 0.073, 0.0012);

  const spine_grooveGeom = new THREE.BoxGeometry(0.004, 0.002, 0.82);
  const spine_grooves = new THREE.InstancedMesh(spine_grooveGeom, fadedInkMat, 3);
  spine_grooves.name = "spine_grooves";
  for (let i = 0; i < 3; i++) {
    dummy.position.set(-0.322 + i * 0.010, 0.073, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    spine_grooves.setMatrixAt(i, dummy.matrix);
  }
  spine_grooves.instanceMatrix.needsUpdate = true;
  ink_group.add(spine_grooves);

  const compassCX = -0.185;
  const compassCZ = -0.270;

  const compass_outer_ringGeom = new THREE.TorusGeometry(0.075, 0.0022, 8, 64);
  const compass_outer_ring = new THREE.Mesh(compass_outer_ringGeom, inkMat);
  compass_outer_ring.name = "compass_outer_ring";
  compass_outer_ring.rotation.x = Math.PI / 2;
  compass_outer_ring.position.set(compassCX, 0.075, compassCZ);
  ink_group.add(compass_outer_ring);

  const compass_inner_ringGeom = new THREE.TorusGeometry(0.058, 0.0015, 8, 56);
  const compass_inner_ring = new THREE.Mesh(compass_inner_ringGeom, fadedInkMat);
  compass_inner_ring.name = "compass_inner_ring";
  compass_inner_ring.rotation.x = Math.PI / 2;
  compass_inner_ring.position.set(compassCX, 0.0755, compassCZ);
  ink_group.add(compass_inner_ring);

  function compassPointGeometry(length, width) {
    const shape = new THREE.Shape();
    shape.moveTo(-width, 0);
    shape.lineTo(0, length);
    shape.lineTo(width, 0);
    shape.closePath();
    const geom = new THREE.ShapeGeometry(shape);
    geom.rotateX(-Math.PI / 2);
    return geom;
  }

  const compass_cardinal_pointsGeom = compassPointGeometry(0.092, 0.014);
  const compass_cardinal_points = new THREE.InstancedMesh(compass_cardinal_pointsGeom, compassDarkMat, 4);
  compass_cardinal_points.name = "compass_cardinal_points";
  for (let i = 0; i < 4; i++) {
    dummy.position.set(compassCX, 0.076, compassCZ);
    dummy.rotation.set(0, i * Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    compass_cardinal_points.setMatrixAt(i, dummy.matrix);
  }
  compass_cardinal_points.instanceMatrix.needsUpdate = true;
  ink_group.add(compass_cardinal_points);

  const compass_diagonal_pointsGeom = compassPointGeometry(0.066, 0.010);
  const compass_diagonal_points = new THREE.InstancedMesh(compass_diagonal_pointsGeom, compassLightMat, 4);
  compass_diagonal_points.name = "compass_diagonal_points";
  for (let i = 0; i < 4; i++) {
    dummy.position.set(compassCX, 0.0765, compassCZ);
    dummy.rotation.set(0, Math.PI / 4 + i * Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    compass_diagonal_points.setMatrixAt(i, dummy.matrix);
  }
  compass_diagonal_points.instanceMatrix.needsUpdate = true;
  ink_group.add(compass_diagonal_points);

  const compass_centerGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.004, 20);
  const compass_center = new THREE.Mesh(compass_centerGeom, compassDarkMat);
  compass_center.name = "compass_center";
  compass_center.position.set(compassCX, 0.078, compassCZ);
  ink_group.add(compass_center);

  const compass_ticksGeom = new THREE.BoxGeometry(0.003, 0.002, 0.014);
  const compass_ticks = new THREE.InstancedMesh(compass_ticksGeom, fadedInkMat, 16);
  compass_ticks.name = "compass_ticks";
  for (let i = 0; i < 16; i++) {
    const a = i / 16 * Math.PI * 2;
    const r = 0.087;
    dummy.position.set(compassCX + Math.sin(a) * r, 0.075, compassCZ + Math.cos(a) * r);
    dummy.rotation.set(0, a, 0);
    dummy.scale.set(i % 4 === 0 ? 1.4 : 0.75, 1, i % 4 === 0 ? 1.25 : 0.75);
    dummy.updateMatrix();
    compass_ticks.setMatrixAt(i, dummy.matrix);
  }
  compass_ticks.instanceMatrix.needsUpdate = true;
  ink_group.add(compass_ticks);

  const letter_strokes = new THREE.Group();
  letter_strokes.name = "letter_strokes";
  ink_group.add(letter_strokes);

  function addLetterStroke(name, coords, mat, radius) {
    return addTopStroke(letter_strokes, name, coords, mat || inkMat, 0.076, radius || 0.0018);
  }

  addLetterStroke("north_label_n_left", [[-0.250, -0.365], [-0.244, -0.335], [-0.238, -0.363]], inkMat, 0.0015);
  addLetterStroke("north_label_n_right", [[-0.238, -0.363], [-0.224, -0.335], [-0.218, -0.365]], inkMat, 0.0015);
  addLetterStroke("east_label_e", [[0.010, -0.285], [0.030, -0.278], [0.012, -0.270], [0.031, -0.262], [0.010, -0.255]], inkMat, 0.0014);
  addLetterStroke("south_label_s_top", [[0.010, 0.155], [0.030, 0.162], [0.035, 0.150], [0.018, 0.140], [0.006, 0.130], [0.028, 0.120], [0.038, 0.110]], inkMat, 0.0014);
  addLetterStroke("west_label_w", [[-0.285, -0.205], [-0.275, -0.190], [-0.267, -0.210], [-0.257, -0.192], [-0.247, -0.208]], inkMat, 0.0014);

  const script_lines = new THREE.Group();
  script_lines.name = "script_lines";
  ink_group.add(script_lines);

  function addScriptLine(name, x0, z0, len, amp, phase, chars) {
    const pts = [];
    const steps = chars * 2;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = x0 + len * t;
      const wave = Math.sin(t * Math.PI * 2 * chars + phase) * amp;
      const z = z0 + wave + Math.sin(t * Math.PI * 2 * chars * 0.45 + phase) * amp * 0.25;
      pts.push([x, z]);
    }
    return addTopStroke(script_lines, name, pts, inkMat, 0.076, 0.00165);
  }

  addScriptLine("title_script_line_1", -0.245, -0.135, 0.430, 0.010, 0.2, 13);
  addScriptLine("title_script_line_2", -0.275, -0.075, 0.505, 0.009, 1.1, 15);
  addScriptLine("body_script_line_1", -0.285, -0.010, 0.525, 0.008, 0.5, 16);
  addScriptLine("body_script_line_2", -0.245, 0.055, 0.470, 0.008, 1.7, 14);
  addScriptLine("body_script_line_3", -0.280, 0.120, 0.510, 0.008, 2.4, 15);
  addScriptLine("body_script_line_4", -0.235, 0.185, 0.455, 0.008, 0.9, 14);
  addScriptLine("body_script_line_5", -0.270, 0.250, 0.490, 0.008, 2.0, 15);
  addScriptLine("body_script_line_6", -0.205, 0.315, 0.405, 0.007, 0.3, 12);
  addScriptLine("footer_script_line_1", -0.115, 0.385, 0.285, 0.006, 1.4, 9);
  addScriptLine("footer_script_line_2", 0.095, 0.365, 0.210, 0.006, 2.6, 8);

  const script_ascenders = new THREE.Group();
  script_ascenders.name = "script_ascenders";
  ink_group.add(script_ascenders);

  function addAscender(x, z, h, lean) {
    addTopStroke(script_ascenders, "script_ascender", [[x, z], [x + lean, z - h], [x + lean * 0.5, z - h * 0.55]], inkMat, 0.076, 0.0015);
  }

  addAscender(-0.205, -0.130, 0.030, 0.010);
  addAscender(-0.105, -0.120, 0.026, 0.008);
  addAscender(0.030, -0.105, 0.028, 0.008);
  addAscender(0.145, -0.090, 0.026, 0.008);
  addAscender(-0.230, -0.060, 0.028, 0.009);
  addAscender(-0.115, -0.045, 0.026, 0.008);
  addAscender(0.015, -0.030, 0.028, 0.008);
  addAscender(0.155, -0.015, 0.026, 0.008);
  addAscender(-0.180, 0.035, 0.027, 0.008);
  addAscender(0.055, 0.050, 0.026, 0.008);
  addAscender(0.185, 0.065, 0.026, 0.008);
  addAscender(-0.125, 0.135, 0.027, 0.008);
  addAscender(0.105, 0.150, 0.026, 0.008);
  addAscender(-0.170, 0.225, 0.027, 0.008);
  addAscender(0.080, 0.240, 0.026, 0.008);
  addAscender(-0.080, 0.315, 0.025, 0.008);

  const navigation_symbols = new THREE.Group();
  navigation_symbols.name = "navigation_symbols";
  ink_group.add(navigation_symbols);

  addLetterStroke("plus_symbol_upper", [[0.105, -0.045], [0.135, -0.045]], inkMat, 0.0015);
  addLetterStroke("plus_symbol_upper_vertical", [[0.120, -0.060], [0.120, -0.030]], inkMat, 0.0015);
  addLetterStroke("equal_symbol_middle", [[0.145, 0.090], [0.170, 0.090], [0.145, 0.105], [0.170, 0.105]], inkMat, 0.0014);
  addLetterStroke("cross_symbol_lower", [[0.095, 0.335], [0.135, 0.335]], inkMat, 0.0015);
  addLetterStroke("cross_symbol_lower_vertical", [[0.115, 0.315], [0.115, 0.355]], inkMat, 0.0015);
  addLetterStroke("small_compass_needle", [[0.185, 0.285], [0.220, 0.245], [0.205, 0.285], [0.238, 0.270]], inkMat, 0.0015);
  addLetterStroke("small_compass_ring", [[0.205, 0.285], [0.225, 0.285]], inkMat, 0.0012);
  addLetterStroke("arrow_symbol", [[-0.255, -0.180], [-0.215, -0.160], [-0.235, -0.160], [-0.215, -0.180]], inkMat, 0.0014);
  addLetterStroke("fraction_symbol", [[0.030, 0.205], [0.055, 0.205]], inkMat, 0.0013);
  addLetterStroke("fraction_symbol_vertical", [[0.043, 0.190], [0.043, 0.220]], inkMat, 0.0013);
  addLetterStroke("star_symbol_left", [[-0.075, 0.365], [-0.055, 0.365]], inkMat, 0.0013);
  addLetterStroke("star_symbol_left_vertical", [[-0.065, 0.350], [-0.065, 0.380]], inkMat, 0.0013);
  addLetterStroke("star_symbol_right", [[0.245, 0.315], [0.265, 0.315]], inkMat, 0.0013);
  addLetterStroke("star_symbol_right_vertical", [[0.255, 0.300], [0.255, 0.330]], inkMat, 0.0013);

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
