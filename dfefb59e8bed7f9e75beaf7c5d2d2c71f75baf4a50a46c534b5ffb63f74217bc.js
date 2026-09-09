function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "antique_leather_book";

  const bookW = 1.0;
  const bookH = 1.22;
  const coverT = 0.045;
  const pageW = 0.88;
  const pageH = 1.10;
  const pageD = 0.17;

  const leatherMat = new THREE.MeshStandardMaterial({ color: 0x2b1712, metalness: 0.0, roughness: 0.82 });
  const darkLeatherMat = new THREE.MeshStandardMaterial({ color: 0x17100e, metalness: 0.0, roughness: 0.86 });
  const wornLeatherMat = new THREE.MeshStandardMaterial({ color: 0x6b3d24, metalness: 0.0, roughness: 0.88 });
  const pageMat = new THREE.MeshStandardMaterial({ color: 0xd8cbb0, metalness: 0.0, roughness: 0.9 });
  const pageLineMat = new THREE.MeshStandardMaterial({ color: 0x9f8d70, metalness: 0.0, roughness: 0.9 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xc8ad55, metalness: 0.55, roughness: 0.32 });
  const fadedGoldMat = new THREE.MeshStandardMaterial({ color: 0x9f843c, metalness: 0.45, roughness: 0.42 });
  const scuffMat = new THREE.MeshStandardMaterial({ color: 0x7a5137, metalness: 0.0, roughness: 0.95 });
  const darkScuffMat = new THREE.MeshStandardMaterial({ color: 0x0d0b0a, metalness: 0.0, roughness: 0.95 });
  const ribbonMat = new THREE.MeshStandardMaterial({ color: 0x4a1718, metalness: 0.0, roughness: 0.95 });

  const unitBoxGeom = new THREE.BoxGeometry(1, 1, 1);
  const circleGeom = new THREE.CircleGeometry(1, 24);

  function addBox(name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(unitBoxGeom, mat);
    mesh.name = name;
    mesh.scale.set(w, h, d);
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addFrontBox(name, w, h, mat, x, y, z) {
    return addBox(name, w, h, 0.006, mat, x, y, z);
  }

  function addSpineBox(name, w, h, d, mat, x, y, z) {
    return addBox(name, w, h, d, mat, x, y, z);
  }

  function addFrontCircle(name, sx, sy, mat, x, y, z) {
    const mesh = new THREE.Mesh(circleGeom, mat);
    mesh.name = name;
    mesh.scale.set(sx, sy, 1);
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addSpineCircle(name, sx, sy, mat, x, y, z) {
    const mesh = new THREE.Mesh(circleGeom, mat);
    mesh.name = name;
    mesh.rotation.y = -Math.PI / 2;
    mesh.scale.set(sx, sy, 1);
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addLeaf(name, x, y, z, sx, sy, rot, mat) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 8), mat);
    leaf.name = name;
    leaf.scale.set(sx, sy, 0.003);
    leaf.position.set(x, y, z);
    leaf.rotation.z = rot;
    root.add(leaf);
    return leaf;
  }

  function addSpineLeaf(name, x, y, z, sx, sy, rot, mat) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 8), mat);
    leaf.name = name;
    leaf.scale.set(sx, sy, 0.003);
    leaf.position.set(x, y, z);
    leaf.rotation.y = -Math.PI / 2;
    leaf.rotation.z = rot;
    root.add(leaf);
    return leaf;
  }

  function addCornerOrnament(cx, cy, sx, sy, namePrefix) {
    const z = 0.147;
    addFrontBox(namePrefix + "_horizontal_border", 0.18, 0.008, goldMat, cx + sx * 0.09, cy + sy * 0.035, z);
    addFrontBox(namePrefix + "_vertical_border", 0.008, 0.18, goldMat, cx + sx * 0.035, cy + sy * 0.09, z);
    addFrontBox(namePrefix + "_inner_horizontal_line", 0.125, 0.004, fadedGoldMat, cx + sx * 0.065, cy + sy * 0.065, z + 0.002);
    addFrontBox(namePrefix + "_inner_vertical_line", 0.004, 0.125, fadedGoldMat, cx + sx * 0.065, cy + sy * 0.065, z + 0.002);
    for (let i = 0; i < 5; i++) {
      const t = i / 4;
      addLeaf(
        namePrefix + "_corner_leaf_" + i,
        cx + sx * (0.075 + t * 0.055),
        cy + sy * (0.075 + t * 0.055),
        z + 0.004,
        0.012,
        0.035,
        -sx * sy * 0.72 + t * 0.35,
        goldMat
      );
    }
    addFrontCircle(namePrefix + "_corner_rosette", 0.018, 0.018, fadedGoldMat, cx + sx * 0.045, cy + sy * 0.045, z + 0.005);
  }

  function addSpinePanelOrnament(y, namePrefix) {
    const x = -0.552;
    addSpineBox(namePrefix + "_gold_panel_top", 0.006, 0.008, 0.155, goldMat, x, y + 0.095, 0);
    addSpineBox(namePrefix + "_gold_panel_bottom", 0.006, 0.008, 0.155, goldMat, x, y - 0.095, 0);
    addSpineBox(namePrefix + "_gold_panel_left", 0.006, 0.19, 0.008, goldMat, x, y, 0.077);
    addSpineBox(namePrefix + "_gold_panel_right", 0.006, 0.19, 0.008, goldMat, x, y, -0.077);
    for (let i = 0; i < 4; i++) {
      addSpineLeaf(
        namePrefix + "_spine_flower_leaf_" + i,
        x - 0.004,
        y + (i - 1.5) * 0.025,
        0.035,
        0.012,
        0.035,
        i * 0.75,
        goldMat
      );
    }
    addSpineCircle(namePrefix + "_spine_flower_center", 0.018, 0.018, fadedGoldMat, x - 0.006, y, 0.035);
  }

  const front_cover = addBox("front_cover", bookW, bookH, coverT, leatherMat, 0, 0, pageD / 2 + coverT / 2);
  const back_cover = addBox("back_cover", bookW, bookH, coverT, leatherMat, 0, 0, -pageD / 2 - coverT / 2);
  const page_block = addBox("page_block", pageW, pageH, pageD, pageMat, 0.045, -0.005, 0);
  const spine_core = addSpineBox("spine_core", 0.15, 1.18, 0.24, darkLeatherMat, -0.455, 0, 0);
  const spine_outer_roll = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 1.18, 32), wornLeatherMat);
  spine_outer_roll.name = "spine_outer_roll";
  spine_outer_roll.position.set(-0.515, 0, 0);
  root.add(spine_outer_roll);

  const spine_front_raised_band_1 = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.12, 24), leatherMat);
  spine_front_raised_band_1.name = "spine_front_raised_band_1";
  spine_front_raised_band_1.position.set(-0.555, 0, 0.075);
  root.add(spine_front_raised_band_1);

  const spine_back_raised_band_1 = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.12, 24), leatherMat);
  spine_back_raised_band_1.name = "spine_back_raised_band_1";
  spine_back_raised_band_1.position.set(-0.555, 0, -0.075);
  root.add(spine_back_raised_band_1);

  const spine_raised_band_2 = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.12, 20), wornLeatherMat);
  spine_raised_band_2.name = "spine_raised_band_2";
  spine_raised_band_2.rotation.x = Math.PI / 2;
  spine_raised_band_2.position.set(-0.585, 0.36, 0);
  root.add(spine_raised_band_2);

  const spine_raised_band_3 = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.12, 20), wornLeatherMat);
  spine_raised_band_3.name = "spine_raised_band_3";
  spine_raised_band_3.rotation.x = Math.PI / 2;
  spine_raised_band_3.position.set(-0.585, 0.05, 0);
  root.add(spine_raised_band_3);

  const spine_raised_band_4 = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.12, 20), wornLeatherMat);
  spine_raised_band_4.name = "spine_raised_band_4";
  spine_raised_band_4.rotation.x = Math.PI / 2;
  spine_raised_band_4.position.set(-0.585, -0.27, 0);
  root.add(spine_raised_band_4);

  const spine_raised_band_5 = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.12, 20), wornLeatherMat);
  spine_raised_band_5.name = "spine_raised_band_5";
  spine_raised_band_5.rotation.x = Math.PI / 2;
  spine_raised_band_5.position.set(-0.585, -0.52, 0);
  root.add(spine_raised_band_5);

  const front_hinge_ridge_1 = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.12, 18), wornLeatherMat);
  front_hinge_ridge_1.name = "front_hinge_ridge_1";
  front_hinge_ridge_1.position.set(-0.405, 0, 0.142);
  root.add(front_hinge_ridge_1);

  const front_hinge_ridge_2 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.08, 16), darkLeatherMat);
  front_hinge_ridge_2.name = "front_hinge_ridge_2";
  front_hinge_ridge_2.position.set(-0.365, 0, 0.145);
  root.add(front_hinge_ridge_2);

  const fore_edge_page_lines = new THREE.InstancedMesh(unitBoxGeom, pageLineMat, 24);
  fore_edge_page_lines.name = "fore_edge_page_lines";
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    dummy.position.set(0.487, -0.52 + i * 0.045, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(0.006, 0.0025, 0.155);
    dummy.updateMatrix();
    fore_edge_page_lines.setMatrixAt(i, dummy.matrix);
  }
  root.add(fore_edge_page_lines);

  const bottom_page_lines = new THREE.InstancedMesh(unitBoxGeom, pageLineMat, 18);
  bottom_page_lines.name = "bottom_page_lines";
  for (let i = 0; i < 18; i++) {
    dummy.position.set(0.045, -0.558, -0.075 + i * 0.009);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(0.82, 0.0025, 0.002);
    dummy.updateMatrix();
    bottom_page_lines.setMatrixAt(i, dummy.matrix);
  }
  root.add(bottom_page_lines);

  const top_page_lines = new THREE.InstancedMesh(unitBoxGeom, pageLineMat, 14);
  top_page_lines.name = "top_page_lines";
  for (let i = 0; i < 14; i++) {
    dummy.position.set(0.045, 0.552, -0.07 + i * 0.011);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(0.80, 0.002, 0.002);
    dummy.updateMatrix();
    top_page_lines.setMatrixAt(i, dummy.matrix);
  }
  root.add(top_page_lines);

  const front_gold_border_top = addFrontBox("front_gold_border_top", 0.82, 0.008, goldMat, 0.055, 0.515, 0.148);
  const front_gold_border_bottom = addFrontBox("front_gold_border_bottom", 0.82, 0.008, goldMat, 0.055, -0.515, 0.148);
  const front_gold_border_left = addFrontBox("front_gold_border_left", 0.008, 1.03, goldMat, -0.355, 0, 0.148);
  const front_gold_border_right = addFrontBox("front_gold_border_right", 0.008, 1.03, goldMat, 0.465, 0, 0.148);
  const front_gold_inner_top = addFrontBox("front_gold_inner_top", 0.76, 0.004, fadedGoldMat, 0.055, 0.485, 0.151);
  const front_gold_inner_bottom = addFrontBox("front_gold_inner_bottom", 0.76, 0.004, fadedGoldMat, 0.055, -0.485, 0.151);
  const front_gold_inner_left = addFrontBox("front_gold_inner_left", 0.004, 0.97, fadedGoldMat, -0.325, 0, 0.151);
  const front_gold_inner_right = addFrontBox("front_gold_inner_right", 0.004, 0.97, fadedGoldMat, 0.435, 0, 0.151);

  addCornerOrnament(-0.31, 0.47, 1, -1, "top_left_corner");
  addCornerOrnament(0.42, 0.47, -1, -1, "top_right_corner");
  addCornerOrnament(-0.31, -0.47, 1, 1, "bottom_left_corner");
  addCornerOrnament(0.42, -0.47, -1, 1, "bottom_right_corner");

  addSpineBox("spine_top_gold_rule", 0.006, 0.008, 0.17, goldMat, -0.588, 0.535, 0);
  addSpineBox("spine_bottom_gold_rule", 0.006, 0.008, 0.17, goldMat, -0.588, -0.535, 0);
  addSpineBox("spine_upper_panel_top", 0.006, 0.008, 0.15, goldMat, -0.588, 0.405, 0);
  addSpineBox("spine_upper_panel_bottom", 0.006, 0.008, 0.15, goldMat, -0.588, 0.205, 0);
  addSpineBox("spine_middle_panel_top", 0.006, 0.008, 0.15, goldMat, -0.588, -0.035, 0);
  addSpineBox("spine_middle_panel_bottom", 0.006, 0.008, 0.15, goldMat, -0.588, -0.235, 0);
  addSpineBox("spine_lower_panel_top", 0.006, 0.008, 0.15, goldMat, -0.588, -0.385, 0);
  addSpineBox("spine_lower_panel_bottom", 0.006, 0.008, 0.15, goldMat, -0.588, -0.585, 0);

  addSpinePanelOrnament(0.31, "upper_spine_panel");
  addSpinePanelOrnament(-0.14, "middle_spine_panel");
  addSpinePanelOrnament(-0.48, "lower_spine_panel");

  const front_scuff_1 = addFrontCircle("front_scuff_1", 0.035, 0.018, scuffMat, 0.22, 0.18, 0.153);
  front_scuff_1.rotation.z = -0.45;
  const front_scuff_2 = addFrontCircle("front_scuff_2", 0.025, 0.012, scuffMat, -0.12, -0.18, 0.153);
  front_scuff_2.rotation.z = 0.25;
  const front_scuff_3 = addFrontCircle("front_scuff_3", 0.045, 0.014, scuffMat, 0.36, -0.28, 0.153);
  front_scuff_3.rotation.z = -0.7;
  const front_scuff_4 = addFrontCircle("front_scuff_4", 0.018, 0.010, darkScuffMat, 0.02, 0.05, 0.154);
  const front_scuff_5 = addFrontCircle("front_scuff_5", 0.028, 0.013, scuffMat, -0.24, 0.28, 0.153);
  front_scuff_5.rotation.z = 0.6;
  const front_scuff_6 = addFrontCircle("front_scuff_6", 0.022, 0.010, darkScuffMat, 0.31, 0.34, 0.154);
  const front_scuff_7 = addFrontCircle("front_scuff_7", 0.038, 0.012, scuffMat, 0.12, -0.36, 0.153);
  front_scuff_7.rotation.z = 0.15;
  const front_scuff_8 = addFrontCircle("front_scuff_8", 0.015, 0.008, darkScuffMat, -0.08, 0.36, 0.154);

  const front_scratch_1 = addFrontBox("front_scratch_1", 0.075, 0.004, scuffMat, 0.18, 0.02, 0.155);
  front_scratch_1.rotation.z = -0.55;
  const front_scratch_2 = addFrontBox("front_scratch_2", 0.055, 0.003, scuffMat, -0.18, -0.05, 0.155);
  front_scratch_2.rotation.z = 0.35;
  const front_scratch_3 = addFrontBox("front_scratch_3", 0.06, 0.003, scuffMat, 0.33, 0.12, 0.155);
  front_scratch_3.rotation.z = 1.0;
  const front_scratch_4 = addFrontBox("front_scratch_4", 0.045, 0.003, scuffMat, -0.02, -0.30, 0.155);
  front_scratch_4.rotation.z = -0.2;

  const spine_scuff_1 = addSpineCircle("spine_scuff_1", 0.025, 0.012, scuffMat, -0.608, 0.12, 0.055);
  spine_scuff_1.rotation.y = -Math.PI / 2;
  spine_scuff_1.rotation.z = 0.4;
  const spine_scuff_2 = addSpineCircle("spine_scuff_2", 0.020, 0.010, scuffMat, -0.608, -0.35, -0.045);
  spine_scuff_2.rotation.y = -Math.PI / 2;
  spine_scuff_2.rotation.z = -0.3;
  const spine_scuff_3 = addSpineCircle("spine_scuff_3", 0.018, 0.008, darkScuffMat, -0.608, 0.48, -0.02);
  spine_scuff_3.rotation.y = -Math.PI / 2;

  const bottom_worn_edge = addBox("bottom_worn_edge", 0.92, 0.025, 0.012, wornLeatherMat, 0.02, -0.605, 0.145);
  const top_worn_edge = addBox("top_worn_edge", 0.90, 0.020, 0.012, wornLeatherMat, 0.02, 0.605, 0.145);
  const right_worn_edge = addBox("right_worn_edge", 0.025, 1.10, 0.012, wornLeatherMat, 0.495, 0, 0.145);
  const left_worn_edge = addBox("left_worn_edge", 0.022, 1.08, 0.012, wornLeatherMat, -0.475, 0, 0.145);

  const ribbon_loop = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.010, 12, 32), ribbonMat);
  ribbon_loop.name = "ribbon_loop";
  ribbon_loop.scale.set(1.0, 0.55, 1.0);
  ribbon_loop.position.set(-0.22, -0.625, 0.03);
  ribbon_loop.rotation.z = -0.2;
  root.add(ribbon_loop);

  const ribbon_tail_left = addBox("ribbon_tail_left", 0.045, 0.22, 0.012, ribbonMat, -0.25, -0.705, 0.035);
  ribbon_tail_left.rotation.z = -0.72;
  const ribbon_tail_right = addBox("ribbon_tail_right", 0.040, 0.18, 0.012, ribbonMat, -0.18, -0.690, 0.025);
  ribbon_tail_right.rotation.z = -0.42;

  const ribbon_fold = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.11, 12), ribbonMat);
  ribbon_fold.name = "ribbon_fold";
  ribbon_fold.rotation.z = Math.PI / 2;
  ribbon_fold.position.set(-0.22, -0.625, 0.055);
  root.add(ribbon_fold);

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
