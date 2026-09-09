function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "nautical_anchor_medallion";

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.65,
    roughness: 0.28,
  });
  const darkGoldMat = new THREE.MeshStandardMaterial({
    color: 0x8a6a24,
    metalness: 0.55,
    roughness: 0.38,
  });
  const redEnamelMat = new THREE.MeshStandardMaterial({
    color: 0xb51232,
    metalness: 0.1,
    roughness: 0.22,
  });
  const whiteEnamelMat = new THREE.MeshStandardMaterial({
    color: 0xf4f1e8,
    metalness: 0.08,
    roughness: 0.2,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xe5e7e8,
    metalness: 0.7,
    roughness: 0.18,
  });
  const brushedSilverMat = new THREE.MeshStandardMaterial({
    color: 0xaeb4b7,
    metalness: 0.6,
    roughness: 0.3,
  });
  const shadowSilverMat = new THREE.MeshStandardMaterial({
    color: 0x62696d,
    metalness: 0.5,
    roughness: 0.38,
  });
  const scratchMat = new THREE.MeshStandardMaterial({
    color: 0xd8c99c,
    metalness: 0.15,
    roughness: 0.75,
  });

  function makeShieldShape(scale) {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.98 * scale);
    shape.lineTo(-0.43 * scale, 0.82 * scale);
    shape.lineTo(-0.78 * scale, 0.42 * scale);
    shape.lineTo(-0.91 * scale, -0.08 * scale);
    shape.lineTo(-0.69 * scale, -0.58 * scale);
    shape.lineTo(-0.34 * scale, -0.86 * scale);
    shape.lineTo(0, -0.98 * scale);
    shape.lineTo(0.34 * scale, -0.86 * scale);
    shape.lineTo(0.69 * scale, -0.58 * scale);
    shape.lineTo(0.91 * scale, -0.08 * scale);
    shape.lineTo(0.78 * scale, 0.42 * scale);
    shape.lineTo(0.43 * scale, 0.82 * scale);
    shape.closePath();
    return shape;
  }

  function makePanelShape(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return shape;
  }

  function makeExtrudeGeometry(shape, depth, bevelSize, bevelThickness) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelSize,
      bevelThickness,
      bevelOffset: 0,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const outer_baseGeom = makeExtrudeGeometry(makeShieldShape(1), 0.07, 0.018, 0.012);
  const outer_base = new THREE.Mesh(outer_baseGeom, goldMat);
  outer_base.name = "outer_base";
  root.add(outer_base);

  const inset_fieldGeom = makeExtrudeGeometry(makeShieldShape(0.925), 0.026, 0.008, 0.006);
  const inset_field = new THREE.Mesh(inset_fieldGeom, darkGoldMat);
  inset_field.name = "inset_field";
  inset_field.position.z = 0.043;
  root.add(inset_field);

  const top_red_panelGeom = makeExtrudeGeometry(
    makePanelShape([
      [-0.25, 0.78],
      [0.25, 0.78],
      [0.37, 0.39],
      [-0.37, 0.39],
    ]),
    0.018, 0.006, 0.004
  );
  const top_red_panel = new THREE.Mesh(top_red_panelGeom, redEnamelMat);
  top_red_panel.name = "top_red_panel";
  top_red_panel.position.z = 0.066;
  root.add(top_red_panel);

  const upper_left_white_panelGeom = makeExtrudeGeometry(
    makePanelShape([
      [-0.39, 0.74],
      [-0.70, 0.39],
      [-0.61, -0.04],
      [-0.35, 0.24],
    ]),
    0.018, 0.006, 0.004
  );
  const upper_left_white_panel = new THREE.Mesh(upper_left_white_panelGeom, whiteEnamelMat);
  upper_left_white_panel.name = "upper_left_white_panel";
  upper_left_white_panel.position.z = 0.066;
  root.add(upper_left_white_panel);

  const upper_right_white_panelGeom = makeExtrudeGeometry(
    makePanelShape([
      [0.39, 0.74],
      [0.70, 0.39],
      [0.61, -0.04],
      [0.35, 0.24],
    ]),
    0.018, 0.006, 0.004
  );
  const upper_right_white_panel = new THREE.Mesh(upper_right_white_panelGeom, whiteEnamelMat);
  upper_right_white_panel.name = "upper_right_white_panel";
  upper_right_white_panel.position.z = 0.066;
  root.add(upper_right_white_panel);

  const left_red_panelGeom = makeExtrudeGeometry(
    makePanelShape([
      [-0.78, 0.29],
      [-0.61, -0.04],
      [-0.56, -0.48],
      [-0.79, -0.35],
    ]),
    0.018, 0.006, 0.004
  );
  const left_red_panel = new THREE.Mesh(left_red_panelGeom, redEnamelMat);
  left_red_panel.name = "left_red_panel";
  left_red_panel.position.z = 0.066;
  root.add(left_red_panel);

  const right_red_panelGeom = makeExtrudeGeometry(
    makePanelShape([
      [0.78, 0.29],
      [0.61, -0.04],
      [0.56, -0.48],
      [0.79, -0.35],
    ]),
    0.018, 0.006, 0.004
  );
  const right_red_panel = new THREE.Mesh(right_red_panelGeom, redEnamelMat);
  right_red_panel.name = "right_red_panel";
  right_red_panel.position.z = 0.066;
  root.add(right_red_panel);

  const lower_left_white_panelGeom = makeExtrudeGeometry(
    makePanelShape([
      [-0.61, -0.04],
      [-0.56, -0.48],
      [-0.31, -0.78],
      [-0.22, -0.47],
    ]),
    0.018, 0.006, 0.004
  );
  const lower_left_white_panel = new THREE.Mesh(lower_left_white_panelGeom, whiteEnamelMat);
  lower_left_white_panel.name = "lower_left_white_panel";
  lower_left_white_panel.position.z = 0.066;
  root.add(lower_left_white_panel);

  const lower_right_white_panelGeom = makeExtrudeGeometry(
    makePanelShape([
      [0.61, -0.04],
      [0.56, -0.48],
      [0.31, -0.78],
      [0.22, -0.47],
    ]),
    0.018, 0.006, 0.004
  );
  const lower_right_white_panel = new THREE.Mesh(lower_right_white_panelGeom, whiteEnamelMat);
  lower_right_white_panel.name = "lower_right_white_panel";
  lower_right_white_panel.position.z = 0.066;
  root.add(lower_right_white_panel);

  const bottom_red_panelGeom = makeExtrudeGeometry(
    makePanelShape([
      [-0.25, -0.82],
      [0.25, -0.82],
      [0.22, -0.47],
      [-0.22, -0.47],
    ]),
    0.018, 0.006, 0.004
  );
  const bottom_red_panel = new THREE.Mesh(bottom_red_panelGeom, redEnamelMat);
  bottom_red_panel.name = "bottom_red_panel";
  bottom_red_panel.position.z = 0.066;
  root.add(bottom_red_panel);

  const central_gold_discGeom = new THREE.CylinderGeometry(0.43, 0.43, 0.026, 64);
  const central_gold_disc = new THREE.Mesh(central_gold_discGeom, goldMat);
  central_gold_disc.name = "central_gold_disc";
  central_gold_disc.rotation.x = Math.PI / 2;
  central_gold_disc.position.set(0, -0.03, 0.083);
  root.add(central_gold_disc);

  const central_red_inlayGeom = new THREE.CircleGeometry(0.355, 64);
  const central_red_inlay = new THREE.Mesh(central_red_inlayGeom, redEnamelMat);
  central_red_inlay.name = "central_red_inlay";
  central_red_inlay.position.set(0, -0.03, 0.101);
  root.add(central_red_inlay);

  const central_gold_ringGeom = new THREE.TorusGeometry(0.385, 0.014, 10, 64);
  const central_gold_ring = new THREE.Mesh(central_gold_ringGeom, darkGoldMat);
  central_gold_ring.name = "central_gold_ring";
  central_gold_ring.position.set(0, -0.03, 0.108);
  root.add(central_gold_ring);

  const scratch_marksGeom = new THREE.BoxGeometry(0.006, 0.075, 0.003);
  const scratch_marks = new THREE.InstancedMesh(scratch_marksGeom, scratchMat, 18);
  scratch_marks.name = "scratch_marks";
  const scratchDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = i * 2.399963229728653;
    const radius = 0.07 + (i % 6) * 0.045;
    scratchDummy.position.set(
      Math.cos(angle) * radius,
      -0.03 + Math.sin(angle) * radius,
      0.112
    );
    scratchDummy.rotation.set(0, 0, angle * 1.7 + (i % 3) * 0.35);
    scratchDummy.scale.set(1, 0.55 + (i % 4) * 0.18, 1);
    scratchDummy.updateMatrix();
    scratch_marks.setMatrixAt(i, scratchDummy.matrix);
  }
  scratch_marks.instanceMatrix.needsUpdate = true;
  root.add(scratch_marks);

  const bannerShape = new THREE.Shape();
  bannerShape.moveTo(-0.58, -0.31);
  bannerShape.bezierCurveTo(-0.38, -0.49, -0.16, -0.57, 0, -0.58);
  bannerShape.bezierCurveTo(0.16, -0.57, 0.38, -0.49, 0.58, -0.31);
  bannerShape.lineTo(0.49, -0.57);
  bannerShape.bezierCurveTo(0.30, -0.70, 0.10, -0.75, 0, -0.79);
  bannerShape.lineTo(-0.10, -0.70);
  bannerShape.bezierCurveTo(-0.28, -0.69, -0.47, -0.60, -0.58, -0.43);
  bannerShape.closePath();

  const banner_outlineGeom = makeExtrudeGeometry(bannerShape, 0.03, 0.012, 0.008);
  const banner_outline = new THREE.Mesh(banner_outlineGeom, darkGoldMat);
  banner_outline.name = "banner_outline";
  banner_outline.position.z = 0.112;
  root.add(banner_outline);

  const silver_bannerGeom = makeExtrudeGeometry(bannerShape, 0.026, 0.008, 0.006);
  const silver_banner = new THREE.Mesh(silver_bannerGeom, brushedSilverMat);
  silver_banner.name = "silver_banner";
  silver_banner.scale.set(0.965, 0.965, 1);
  silver_banner.position.set(0, -0.012, 0.137);
  root.add(silver_banner);

  const glyphSegments = {
    L: [[0, 1, 0, 0], [0, 0, 1, 0]],
    I: [[0, 1, 1, 1], [0.5, 1, 0.5, 0], [0, 0, 1, 0]],
    S: [[1, 1, 0, 1], [0, 1, 0, 0.5], [0, 0.5, 1, 0.5], [1, 0.5, 1, 0], [1, 0, 0, 0]],
    H: [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0.5, 1, 0.5]],
    T: [[0, 1, 1, 1], [0.5, 1, 0.5, 0]],
    E: [[0, 1, 0, 0], [0, 1, 1, 1], [0, 0.5, 0.85, 0.5], [0, 0, 1, 0]],
    O: [[0, 1, 1, 1], [1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 1]],
    W: [[0, 1, 0.2, 0], [0.2, 0, 0.5, 0.65], [0.5, 0.65, 0.8, 0], [0.8, 0, 1, 1]],
  };
  const inscriptionText = "LISHTTEOWLE";
  let strokeCount = 0;
  for (const character of inscriptionText) strokeCount += glyphSegments[character].length;

  const inscription_strokesGeom = new THREE.BoxGeometry(1, 1, 1);
  const inscription_strokes = new THREE.InstancedMesh(
    inscription_strokesGeom,
    goldMat,
    strokeCount
  );
  inscription_strokes.name = "inscription_strokes";

  const letterWidth = 0.048;
  const letterHeight = 0.078;
  const letterSpacing = 0.012;
  const textLength = (inscriptionText.length - 1) * (letterWidth + letterSpacing) + letterWidth;
  const textStartX = -textLength / 2;
  const strokeDummy = new THREE.Object3D();
  let strokeIndex = 0;

  for (let i = 0; i < inscriptionText.length; i++) {
    const segments = glyphSegments[inscriptionText[i]];
    const baseX = textStartX + i * (letterWidth + letterSpacing);
    const t = i / (inscriptionText.length - 1);
    const baseY = -0.585 - Math.sin(t * Math.PI) * 0.045;
    for (const segment of segments) {
      const x1 = baseX + segment[0] * letterWidth;
      const y1 = baseY + segment[1] * letterHeight;
      const x2 = baseX + segment[2] * letterWidth;
      const y2 = baseY + segment[3] * letterHeight;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.sqrt(dx * dx + dy * dy);
      strokeDummy.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0.169);
      strokeDummy.rotation.set(0, 0, Math.atan2(dy, dx));
      strokeDummy.scale.set(length, 0.007, 0.01);
      strokeDummy.updateMatrix();
      inscription_strokes.setMatrixAt(strokeIndex++, strokeDummy.matrix);
    }
  }
  inscription_strokes.instanceMatrix.needsUpdate = true;
  root.add(inscription_strokes);

  const anchor_crown_shape = new THREE.Shape();
  anchor_crown_shape.moveTo(-0.34, -0.38);
  anchor_crown_shape.bezierCurveTo(-0.23, -0.56, -0.08, -0.66, 0, -0.68);
  anchor_crown_shape.bezierCurveTo(0.08, -0.66, 0.23, -0.56, 0.34, -0.38);
  anchor_crown_shape.lineTo(0.29, -0.31);
  anchor_crown_shape.bezierCurveTo(0.18, -0.44, 0.06, -0.51, 0, -0.53);
  anchor_crown_shape.bezierCurveTo(-0.06, -0.51, -0.18, -0.44, -0.29, -0.31);
  anchor_crown_shape.closePath();

  const anchor_crown_outlineGeom = makeExtrudeGeometry(anchor_crown_shape, 0.03, 0.012, 0.008);
  const anchor_crown_outline = new THREE.Mesh(anchor_crown_outlineGeom, shadowSilverMat);
  anchor_crown_outline.name = "anchor_crown_outline";
  anchor_crown_outline.position.z = 0.148;
  root.add(anchor_crown_outline);

  const anchor_crownGeom = makeExtrudeGeometry(anchor_crown_shape, 0.028, 0.008, 0.006);
  const anchor_crown = new THREE.Mesh(anchor_crownGeom, silverMat);
  anchor_crown.name = "anchor_crown";
  anchor_crown.scale.set(0.95, 0.95, 1);
  anchor_crown.position.set(0, -0.012, 0.174);
  root.add(anchor_crown);

  const anchor_shank_shape = new THREE.Shape();
  anchor_shank_shape.moveTo(-0.075, 0.40);
  anchor_shank_shape.lineTo(0.075, 0.40);
  anchor_shank_shape.lineTo(0.055, -0.49);
  anchor_shank_shape.lineTo(0, -0.65);
  anchor_shank_shape.lineTo(-0.055, -0.49);
  anchor_shank_shape.closePath();

  const anchor_shank_outlineGeom = makeExtrudeGeometry(anchor_shank_shape, 0.03, 0.012, 0.008);
  const anchor_shank_outline = new THREE.Mesh(anchor_shank_outlineGeom, shadowSilverMat);
  anchor_shank_outline.name = "anchor_shank_outline";
  anchor_shank_outline.position.z = 0.148;
  root.add(anchor_shank_outline);

  const anchor_shankGeom = makeExtrudeGeometry(anchor_shank_shape, 0.028, 0.008, 0.006);
  const anchor_shank = new THREE.Mesh(anchor_shankGeom, silverMat);
  anchor_shank.name = "anchor_shank";
  anchor_shank.scale.set(0.82, 0.98, 1);
  anchor_shank.position.set(0, -0.004, 0.174);
  root.add(anchor_shank);

  const anchor_crossbar_outlineGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.55, 24);
  const anchor_crossbar_outline = new THREE.Mesh(anchor_crossbar_outlineGeom, shadowSilverMat);
  anchor_crossbar_outline.name = "anchor_crossbar_outline";
  anchor_crossbar_outline.rotation.z = Math.PI / 2;
  anchor_crossbar_outline.position.set(0, 0.365, 0.15);
  root.add(anchor_crossbar_outline);

  const anchor_crossbarGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.52, 24);
  const anchor_crossbar = new THREE.Mesh(anchor_crossbarGeom, silverMat);
  anchor_crossbar.name = "anchor_crossbar";
  anchor_crossbar.rotation.z = Math.PI / 2;
  anchor_crossbar.position.set(0, 0.365, 0.177);
  root.add(anchor_crossbar);

  const crossbar_end_capsGeom = new THREE.SphereGeometry(0.058, 24, 16);
  const crossbar_end_caps = new THREE.InstancedMesh(crossbar_end_capsGeom, silverMat, 2);
  crossbar_end_caps.name = "crossbar_end_caps";
  const capDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    capDummy.position.set(i === 0 ? -0.285 : 0.285, 0.365, 0.18);
    capDummy.scale.set(1, 1, 0.55);
    capDummy.updateMatrix();
    crossbar_end_caps.setMatrixAt(i, capDummy.matrix);
  }
  crossbar_end_caps.instanceMatrix.needsUpdate = true;
  root.add(crossbar_end_caps);

  const anchor_eye_connectorGeom = new THREE.CylinderGeometry(0.045, 0.055, 0.09, 24);
  const anchor_eye_connector = new THREE.Mesh(anchor_eye_connectorGeom, silverMat);
  anchor_eye_connector.name = "anchor_eye_connector";
  anchor_eye_connector.position.set(0, 0.445, 0.177);
  root.add(anchor_eye_connector);

  const anchor_eye_shadowGeom = new THREE.TorusGeometry(0.087, 0.028, 12, 40);
  const anchor_eye_shadow = new THREE.Mesh(anchor_eye_shadowGeom, shadowSilverMat);
  anchor_eye_shadow.name = "anchor_eye_shadow";
  anchor_eye_shadow.position.set(0, 0.565, 0.158);
  root.add(anchor_eye_shadow);

  const anchor_eyeGeom = new THREE.TorusGeometry(0.087, 0.021, 12, 40);
  const anchor_eye = new THREE.Mesh(anchor_eyeGeom, silverMat);
  anchor_eye.name = "anchor_eye";
  anchor_eye.position.set(0, 0.565, 0.184);
  root.add(anchor_eye);

  const flukeShape = new THREE.Shape();
  flukeShape.moveTo(-0.035, -0.15);
  flukeShape.bezierCurveTo(0.025, -0.13, 0.075, -0.075, 0.09, -0.01);
  flukeShape.bezierCurveTo(0.105, 0.075, 0.055, 0.16, 0, 0.20);
  flukeShape.bezierCurveTo(-0.055, 0.16, -0.105, 0.075, -0.09, -0.01);
  flukeShape.bezierCurveTo(-0.075, -0.075, -0.025, -0.13, -0.035, -0.15);
  flukeShape.closePath();

  const fluke_outlineGeom = makeExtrudeGeometry(flukeShape, 0.028, 0.01, 0.007);
  const flukeGeom = makeExtrudeGeometry(flukeShape, 0.026, 0.007, 0.005);

  const left_fluke_outline = new THREE.Mesh(fluke_outlineGeom, shadowSilverMat);
  left_fluke_outline.name = "left_fluke_outline";
  left_fluke_outline.position.set(-0.39, -0.12, 0.148);
  left_fluke_outline.rotation.z = 0.48;
  root.add(left_fluke_outline);

  const left_fluke = new THREE.Mesh(flukeGeom, silverMat);
  left_fluke.name = "left_fluke";
  left_fluke.position.set(-0.39, -0.12, 0.174);
  left_fluke.rotation.z = 0.48;
  left_fluke.scale.set(0.88, 0.92, 1);
  root.add(left_fluke);

  const right_fluke_outline = new THREE.Mesh(fluke_outlineGeom, shadowSilverMat);
  right_fluke_outline.name = "right_fluke_outline";
  right_fluke_outline.position.set(0.39, -0.12, 0.148);
  right_fluke_outline.rotation.z = -0.48;
  root.add(right_fluke_outline);

  const right_fluke = new THREE.Mesh(flukeGeom, silverMat);
  right_fluke.name = "right_fluke";
  right_fluke.position.set(0.39, -0.12, 0.174);
  right_fluke.rotation.z = -0.48;
  right_fluke.scale.set(0.88, 0.92, 1);
  root.add(right_fluke);

  const scrollDiscGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.026, 32);
  const left_scroll_disc = new THREE.Mesh(scrollDiscGeom, silverMat);
  left_scroll_disc.name = "left_scroll_disc";
  left_scroll_disc.rotation.x = Math.PI / 2;
  left_scroll_disc.position.set(-0.51, -0.39, 0.165);
  root.add(left_scroll_disc);

  const right_scroll_disc = new THREE.Mesh(scrollDiscGeom, silverMat);
  right_scroll_disc.name = "right_scroll_disc";
  right_scroll_disc.rotation.x = Math.PI / 2;
  right_scroll_disc.position.set(0.51, -0.39, 0.165);
  root.add(right_scroll_disc);

  const spiralPoints = [];
  for (let i = 0; i <= 36; i++) {
    const t = i / 36;
    const angle = t * Math.PI * 3.6;
    const radius = 0.073 * (1 - t * 0.78);
    spiralPoints.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0
    ));
  }
  const spiralGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(spiralPoints),
    48,
    0.008,
    8,
    false
  );

  const left_spiral = new THREE.Mesh(spiralGeom, darkGoldMat);
  left_spiral.name = "left_spiral";
  left_spiral.position.set(-0.51, -0.39, 0.184);
  left_spiral.rotation.z = -0.45;
  root.add(left_spiral);

  const right_spiral = new THREE.Mesh(spiralGeom, darkGoldMat);
  right_spiral.name = "right_spiral";
  right_spiral.position.set(0.51, -0.39, 0.184);
  right_spiral.rotation.z = Math.PI + 0.45;
  root.add(right_spiral);

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
  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 0) root.scale.setScalar(0.98 / maxDim);
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
