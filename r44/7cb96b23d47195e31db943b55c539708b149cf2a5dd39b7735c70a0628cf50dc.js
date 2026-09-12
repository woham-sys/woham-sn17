// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "engraved_pendant";

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.0,
    roughness: 0.8,
  });

  const medallion_group = new THREE.Group();
  medallion_group.name = "medallion_group";
  root.add(medallion_group);

  const medallion_bodyGeom = new THREE.CylinderGeometry(1.5, 1.5, 0.14, 96);
  const medallion_body = new THREE.Mesh(medallion_bodyGeom, silverMat);
  medallion_body.name = "medallion_body";
  medallion_body.rotation.x = Math.PI / 2;
  medallion_group.add(medallion_body);

  const front_faceGeom = new THREE.CylinderGeometry(1.435, 1.435, 0.035, 96);
  const front_face = new THREE.Mesh(front_faceGeom, silverMat);
  front_face.name = "front_face";
  front_face.rotation.x = Math.PI / 2;
  front_face.position.z = 0.073;
  medallion_group.add(front_face);

  const outer_raised_rimGeom = new THREE.TorusGeometry(1.455, 0.045, 12, 96);
  const outer_raised_rim = new THREE.Mesh(outer_raised_rimGeom, polishedMat);
  outer_raised_rim.name = "outer_raised_rim";
  outer_raised_rim.position.z = 0.09;
  medallion_group.add(outer_raised_rim);

  const inner_engraved_ringGeom = new THREE.TorusGeometry(1.385, 0.014, 8, 96);
  const inner_engraved_ring = new THREE.Mesh(inner_engraved_ringGeom, engravingMat);
  inner_engraved_ring.name = "inner_engraved_ring";
  inner_engraved_ring.position.z = 0.105;
  medallion_group.add(inner_engraved_ring);

  const center_medallionGeom = new THREE.CylinderGeometry(0.455, 0.455, 0.045, 64);
  const center_medallion = new THREE.Mesh(center_medallionGeom, silverMat);
  center_medallion.name = "center_medallion";
  center_medallion.rotation.x = Math.PI / 2;
  center_medallion.position.z = 0.105;
  medallion_group.add(center_medallion);

  const center_engraved_outlineGeom = new THREE.TorusGeometry(0.458, 0.013, 8, 64);
  const center_engraved_outline = new THREE.Mesh(center_engraved_outlineGeom, engravingMat);
  center_engraved_outline.name = "center_engraved_outline";
  center_engraved_outline.position.z = 0.128;
  medallion_group.add(center_engraved_outline);

  const center_raised_faceGeom = new THREE.CylinderGeometry(0.425, 0.425, 0.018, 64);
  const center_raised_face = new THREE.Mesh(center_raised_faceGeom, polishedMat);
  center_raised_face.name = "center_raised_face";
  center_raised_face.rotation.x = Math.PI / 2;
  center_raised_face.position.z = 0.126;
  medallion_group.add(center_raised_face);

  const sectorCount = 12;
  const sectorAngle = Math.PI * 2 / sectorCount;
  const sectorInnerRadius = 0.47;
  const sectorOuterRadius = 1.35;
  const sectorHalfAngle = sectorAngle * 0.47;

  const radial_sector_backingShape = new THREE.Shape();
  const sectorArcSteps = 8;
  radial_sector_backingShape.moveTo(
    Math.sin(-sectorHalfAngle) * sectorInnerRadius,
    Math.cos(-sectorHalfAngle) * sectorInnerRadius
  );
  radial_sector_backingShape.lineTo(
    Math.sin(-sectorHalfAngle) * sectorOuterRadius,
    Math.cos(-sectorHalfAngle) * sectorOuterRadius
  );
  for (let i = 1; i <= sectorArcSteps; i++) {
    const angle = -sectorHalfAngle + (sectorHalfAngle * 2 * i) / sectorArcSteps;
    radial_sector_backingShape.lineTo(
      Math.sin(angle) * sectorOuterRadius,
      Math.cos(angle) * sectorOuterRadius
    );
  }
  radial_sector_backingShape.lineTo(
    Math.sin(sectorHalfAngle) * sectorInnerRadius,
    Math.cos(sectorHalfAngle) * sectorInnerRadius
  );
  for (let i = sectorArcSteps - 1; i >= 0; i--) {
    const angle = -sectorHalfAngle + (sectorHalfAngle * 2 * i) / sectorArcSteps;
    radial_sector_backingShape.lineTo(
      Math.sin(angle) * sectorInnerRadius,
      Math.cos(angle) * sectorInnerRadius
    );
  }
  radial_sector_backingShape.closePath();

  const radial_sector_backingGeom = new THREE.ShapeGeometry(radial_sector_backingShape);
  const radial_sector_backing = new THREE.InstancedMesh(
    radial_sector_backingGeom,
    brushedMat,
    sectorCount
  );
  radial_sector_backing.name = "radial_sector_backing";

  const sector_dummy = new THREE.Object3D();
  for (let i = 0; i < sectorCount; i++) {
    sector_dummy.position.set(0, 0, 0.094);
    sector_dummy.rotation.set(0, 0, -i * sectorAngle);
    sector_dummy.scale.set(1, 1, 1);
    sector_dummy.updateMatrix();
    radial_sector_backing.setMatrixAt(i, sector_dummy.matrix);
  }
  radial_sector_backing.instanceMatrix.needsUpdate = true;
  medallion_group.add(radial_sector_backing);

  const radial_dividersGeom = new THREE.CylinderGeometry(0.017, 0.017, 0.9, 10);
  const radial_dividers = new THREE.InstancedMesh(
    radial_dividersGeom,
    engravingMat,
    sectorCount
  );
  radial_dividers.name = "radial_dividers";

  const divider_dummy = new THREE.Object3D();
  for (let i = 0; i < sectorCount; i++) {
    const angle = (i + 0.5) * sectorAngle;
    const radius = 0.91;
    divider_dummy.position.set(
      Math.sin(angle) * radius,
      Math.cos(angle) * radius,
      0.112
    );
    divider_dummy.rotation.set(0, 0, -angle);
    divider_dummy.scale.set(1, 1, 1);
    divider_dummy.updateMatrix();
    radial_dividers.setMatrixAt(i, divider_dummy.matrix);
  }
  radial_dividers.instanceMatrix.needsUpdate = true;
  medallion_group.add(radial_dividers);

  const glyph_group = new THREE.Group();
  glyph_group.name = "engraved_glyphs";
  medallion_group.add(glyph_group);

  function addGlyphStroke(parent, coordinates, radius = 0.022) {
    const points = [];
    for (const coordinate of coordinates) {
      points.push(new THREE.Vector3(coordinate[0], coordinate[1], 0));
    }

    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, false, "centripetal");

    const strokeGeom = new THREE.TubeGeometry(
      curve,
      Math.max(8, coordinates.length * 4),
      radius,
      7,
      false
    );
    const stroke = new THREE.Mesh(strokeGeom, engravingMat);
    stroke.position.z = 0.116;
    stroke.scale.z = 0.55;
    parent.add(stroke);
    return stroke;
  }

  function addGlyphLoop(parent, cx, cy, rx, ry, radius = 0.022) {
    const loopPoints = [];
    const loopSegments = 24;
    for (let i = 0; i < loopSegments; i++) {
      const angle = i / loopSegments * Math.PI * 2;
      loopPoints.push(new THREE.Vector3(
        cx + Math.cos(angle) * rx,
        cy + Math.sin(angle) * ry,
        0
      ));
    }
    const loopCurve = new THREE.CatmullRomCurve3(loopPoints, true, "centripetal");
    const loopGeom = new THREE.TubeGeometry(loopCurve, 48, radius, 7, true);
    const loop = new THREE.Mesh(loopGeom, engravingMat);
    loop.position.z = 0.116;
    loop.scale.z = 0.55;
    parent.add(loop);
    return loop;
  }

  const top_glyph = new THREE.Group();
  top_glyph.name = "top_glyph";
  top_glyph.rotation.z = -0 * sectorAngle;
  glyph_group.add(top_glyph);
  addGlyphLoop(top_glyph, 0, 0.98, 0.145, 0.27, 0.023);

  const upper_right_glyph = new THREE.Group();
  upper_right_glyph.name = "upper_right_glyph";
  upper_right_glyph.rotation.z = -1 * sectorAngle;
  glyph_group.add(upper_right_glyph);
  addGlyphStroke(upper_right_glyph, [
    [-0.02, 1.27],
    [-0.14, 1.17],
    [-0.13, 1.04],
    [0.02, 0.98],
    [0.15, 1.01],
    [0.19, 1.12],
    [0.13, 1.23],
  ]);
  addGlyphStroke(upper_right_glyph, [
    [0.13, 1.23],
    [0.05, 1.13],
    [-0.03, 1.02],
    [-0.01, 0.89],
    [0.09, 0.82],
    [0.18, 0.87],
  ]);

  const right_upper_glyph = new THREE.Group();
  right_upper_glyph.name = "right_upper_glyph";
  right_upper_glyph.rotation.z = -2 * sectorAngle;
  glyph_group.add(right_upper_glyph);
  addGlyphStroke(right_upper_glyph, [
    [-0.16, 0.88],
    [-0.07, 1.05],
    [0.01, 1.24],
    [0.16, 1.18],
    [0.12, 1.02],
    [0.02, 0.87],
  ]);
  addGlyphStroke(right_upper_glyph, [
    [-0.14, 1.12],
    [0.15, 0.91],
  ]);
  addGlyphStroke(right_upper_glyph, [
    [-0.03, 0.91],
    [0.17, 0.84],
  ]);

  const right_middle_glyph = new THREE.Group();
  right_middle_glyph.name = "right_middle_glyph";
  right_middle_glyph.rotation.z = -3 * sectorAngle;
  glyph_group.add(right_middle_glyph);
  addGlyphLoop(right_middle_glyph, -0.08, 1.04, 0.12, 0.19, 0.022);
  addGlyphStroke(right_middle_glyph, [
    [0.02, 1.15],
    [0.15, 1.08],
    [0.18, 0.94],
    [0.11, 0.84],
    [0.01, 0.86],
  ]);

  const right_lower_glyph = new THREE.Group();
  right_lower_glyph.name = "right_lower_glyph";
  right_lower_glyph.rotation.z = -4 * sectorAngle;
  glyph_group.add(right_lower_glyph);
  addGlyphLoop(right_lower_glyph, -0.11, 1.04, 0.11, 0.17, 0.022);
  addGlyphLoop(right_lower_glyph, 0.1, 1.02, 0.105, 0.16, 0.022);
  addGlyphStroke(right_lower_glyph, [
    [-0.01, 1.04],
    [0.09, 1.03],
  ]);

  const lower_right_glyph = new THREE.Group();
  lower_right_glyph.name = "lower_right_glyph";
  lower_right_glyph.rotation.z = -5 * sectorAngle;
  glyph_group.add(lower_right_glyph);
  addGlyphStroke(lower_right_glyph, [
    [-0.17, 1.17],
    [-0.06, 1.25],
    [0.12, 1.18],
    [0.17, 1.04],
    [0.08, 0.88],
    [-0.08, 0.82],
    [-0.17, 0.88],
    [-0.12, 0.99],
    [0.03, 1.04],
  ]);
  addGlyphStroke(lower_right_glyph, [
    [0.02, 0.9],
    [0.17, 0.83],
  ]);

  const bottom_right_glyph = new THREE.Group();
  bottom_right_glyph.name = "bottom_right_glyph";
  bottom_right_glyph.rotation.z = -6 * sectorAngle;
  glyph_group.add(bottom_right_glyph);
  addGlyphLoop(bottom_right_glyph, 0.02, 1.07, 0.12, 0.18, 0.022);
  addGlyphStroke(bottom_right_glyph, [
    [0.1, 1.15],
    [0.13, 0.93],
    [0.15, 0.72],
    [0.06, 0.68],
  ]);
  addGlyphStroke(bottom_right_glyph, [
    [-0.12, 0.83],
    [0.16, 0.79],
  ]);

  const bottom_glyph = new THREE.Group();
  bottom_glyph.name = "bottom_glyph";
  bottom_glyph.rotation.z = -7 * sectorAngle;
  glyph_group.add(bottom_glyph);
  addGlyphStroke(bottom_glyph, [
    [0.14, 1.22],
    [-0.02, 1.2],
    [-0.14, 1.08],
    [-0.13, 0.92],
    [-0.04, 0.8],
    [0.12, 0.79],
    [0.18, 0.88],
  ]);
  addGlyphStroke(bottom_glyph, [
    [-0.13, 1.08],
    [-0.18, 1.16],
  ]);

  const bottom_left_glyph = new THREE.Group();
  bottom_left_glyph.name = "bottom_left_glyph";
  bottom_left_glyph.rotation.z = -8 * sectorAngle;
  glyph_group.add(bottom_left_glyph);
  addGlyphStroke(bottom_left_glyph, [
    [-0.16, 0.82],
    [-0.1, 1.02],
    [-0.04, 1.25],
  ]);
  addGlyphStroke(bottom_left_glyph, [
    [0.0, 0.81],
    [0.07, 1.01],
    [0.14, 1.24],
  ]);
  addGlyphStroke(bottom_left_glyph, [
    [-0.16, 0.82],
    [0.0, 0.81],
    [0.14, 0.84],
  ]);

  const lower_left_glyph = new THREE.Group();
  lower_left_glyph.name = "lower_left_glyph";
  lower_left_glyph.rotation.z = -9 * sectorAngle;
  glyph_group.add(lower_left_glyph);
  addGlyphStroke(lower_left_glyph, [
    [-0.17, 1.17],
    [-0.16, 1.01],
    [-0.09, 0.85],
    [0.03, 0.79],
    [0.15, 0.86],
    [0.16, 0.98],
  ]);
  addGlyphStroke(lower_left_glyph, [
    [-0.13, 1.08],
    [0.1, 0.9],
  ]);
  addGlyphStroke(lower_left_glyph, [
    [-0.04, 1.2],
    [0.14, 1.08],
  ]);

  const left_lower_glyph = new THREE.Group();
  left_lower_glyph.name = "left_lower_glyph";
  left_lower_glyph.rotation.z = -10 * sectorAngle;
  glyph_group.add(left_lower_glyph);
  addGlyphLoop(left_lower_glyph, -0.09, 1.04, 0.12, 0.18, 0.022);
  addGlyphStroke(left_lower_glyph, [
    [0.01, 1.16],
    [0.15, 1.1],
    [0.17, 0.96],
    [0.1, 0.84],
    [-0.01, 0.82],
    [-0.08, 0.89],
  ]);

  const left_middle_glyph = new THREE.Group();
  left_middle_glyph.name = "left_middle_glyph";
  left_middle_glyph.rotation.z = -11 * sectorAngle;
  glyph_group.add(left_middle_glyph);
  addGlyphLoop(left_middle_glyph, -0.1, 1.04, 0.11, 0.17, 0.022);
  addGlyphLoop(left_middle_glyph, 0.1, 1.02, 0.105, 0.16, 0.022);
  addGlyphStroke(left_middle_glyph, [
    [-0.01, 1.04],
    [0.09, 1.03],
  ]);

  const upper_left_glyph = new THREE.Group();
  upper_left_glyph.name = "upper_left_glyph";
  upper_left_glyph.rotation.z = -12 * sectorAngle;
  glyph_group.add(upper_left_glyph);
  addGlyphStroke(upper_left_glyph, [
    [-0.16, 1.2],
    [-0.08, 1.03],
    [0.02, 0.86],
    [0.14, 0.84],
    [0.18, 0.93],
  ]);
  addGlyphStroke(upper_left_glyph, [
    [-0.02, 1.24],
    [0.08, 1.06],
    [0.16, 0.91],
  ]);
  addGlyphStroke(upper_left_glyph, [
    [-0.12, 1.12],
    [-0.02, 1.08],
  ]);

  const bail_group = new THREE.Group();
  bail_group.name = "bail_group";
  root.add(bail_group);

  const connector_ringGeom = new THREE.TorusGeometry(0.235, 0.055, 12, 48);
  const connector_ring = new THREE.Mesh(connector_ringGeom, polishedMat);
  connector_ring.name = "connector_ring";
  connector_ring.position.set(0, 1.59, -0.015);
  bail_group.add(connector_ring);

  const bailShape = new THREE.Shape();
  bailShape.moveTo(-0.13, 1.55);
  bailShape.bezierCurveTo(-0.19, 1.62, -0.2, 1.7, -0.2, 1.8);
  bailShape.lineTo(-0.31, 2.28);
  bailShape.bezierCurveTo(-0.33, 2.39, -0.27, 2.45, -0.18, 2.46);
  bailShape.lineTo(0.18, 2.46);
  bailShape.bezierCurveTo(0.27, 2.45, 0.33, 2.39, 0.31, 2.28);
  bailShape.lineTo(0.2, 1.8);
  bailShape.bezierCurveTo(0.2, 1.7, 0.19, 1.62, 0.13, 1.55);
  bailShape.bezierCurveTo(0.08, 1.5, -0.08, 1.5, -0.13, 1.55);
  bailShape.closePath();

  const bailGeom = new THREE.ExtrudeGeometry(bailShape, {
    depth: 0.14,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
    curveSegments: 12,
  });
  const bail = new THREE.Mesh(bailGeom, silverMat);
  bail.name = "bail";
  bail.position.z = -0.07;
  bail_group.add(bail);

  const bail_inner_shadowShape = new THREE.Shape();
  bail_inner_shadowShape.moveTo(-0.075, 1.67);
  bail_inner_shadowShape.bezierCurveTo(-0.1, 1.77, -0.11, 1.9, -0.11, 2.02);
  bail_inner_shadowShape.lineTo(-0.17, 2.29);
  bail_inner_shadowShape.bezierCurveTo(-0.18, 2.34, -0.14, 2.37, -0.09, 2.37);
  bail_inner_shadowShape.lineTo(0.09, 2.37);
  bail_inner_shadowShape.bezierCurveTo(0.14, 2.37, 0.18, 2.34, 0.17, 2.29);
  bail_inner_shadowShape.lineTo(0.11, 2.02);
  bail_inner_shadowShape.bezierCurveTo(0.11, 1.9, 0.1, 1.77, 0.075, 1.67);
  bail_inner_shadowShape.bezierCurveTo(0.04, 1.62, -0.04, 1.62, -0.075, 1.67);
  bail_inner_shadowShape.closePath();

  const bail_inner_shadowGeom = new THREE.ShapeGeometry(bail_inner_shadowShape);
  const bail_inner_shadow = new THREE.Mesh(bail_inner_shadowGeom, brushedMat);
  bail_inner_shadow.name = "bail_inner_shadow";
  bail_inner_shadow.position.z = 0.101;
  bail_group.add(bail_inner_shadow);

  const bail_front_panelShape = new THREE.Shape();
  bail_front_panelShape.moveTo(-0.055, 1.62);
  bail_front_panelShape.bezierCurveTo(-0.08, 1.72, -0.09, 1.88, -0.1, 2.03);
  bail_front_panelShape.lineTo(-0.15, 2.29);
  bail_front_panelShape.bezierCurveTo(-0.16, 2.34, -0.12, 2.38, -0.07, 2.38);
  bail_front_panelShape.lineTo(0.07, 2.38);
  bail_front_panelShape.bezierCurveTo(0.12, 2.38, 0.16, 2.34, 0.15, 2.29);
  bail_front_panelShape.lineTo(0.1, 2.03);
  bail_front_panelShape.bezierCurveTo(0.09, 1.88, 0.08, 1.72, 0.055, 1.62);
  bail_front_panelShape.bezierCurveTo(0.03, 1.58, -0.03, 1.58, -0.055, 1.62);
  bail_front_panelShape.closePath();

  const bail_front_panelGeom = new THREE.ShapeGeometry(bail_front_panelShape);
  const bail_front_panel = new THREE.Mesh(bail_front_panelGeom, polishedMat);
  bail_front_panel.name = "bail_front_panel";
  bail_front_panel.position.z = 0.105;
  bail_group.add(bail_front_panel);

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