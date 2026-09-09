function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_heart_cameo";

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d5,
    metalness: 0.7,
    roughness: 0.22,
  });
  const polishedSilverMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ef,
    metalness: 0.65,
    roughness: 0.16,
  });
  const antiqueSilverMat = new THREE.MeshStandardMaterial({
    color: 0x777775,
    metalness: 0.5,
    roughness: 0.38,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x454544,
    metalness: 0.35,
    roughness: 0.55,
  });
  const cameoMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4efff,
    metalness: 0.0,
    roughness: 0.15,
    transmission: 0.22,
    thickness: 0.18,
    clearcoat: 0.8,
    clearcoatRoughness: 0.12,
    iridescence: 0.9,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [120, 700],
  });

  function traceHeart(path, sx, sy, cy) {
    path.moveTo(0, cy - sy);
    path.bezierCurveTo(
      -0.18 * sx, cy - 0.82 * sy,
      -0.95 * sx, cy - 0.35 * sy,
      -1.0 * sx, cy + 0.28 * sy
    );
    path.bezierCurveTo(
      -1.03 * sx, cy + 0.82 * sy,
      -0.55 * sx, cy + 1.08 * sy,
      -0.18 * sx, cy + 0.72 * sy
    );
    path.bezierCurveTo(
      -0.08 * sx, cy + 0.62 * sy,
      -0.03 * sx, cy + 0.55 * sy,
      0, cy + 0.50 * sy
    );
    path.bezierCurveTo(
      0.03 * sx, cy + 0.55 * sy,
      0.08 * sx, cy + 0.62 * sy,
      0.18 * sx, cy + 0.72 * sy
    );
    path.bezierCurveTo(
      0.55 * sx, cy + 1.08 * sy,
      1.03 * sx, cy + 0.82 * sy,
      1.0 * sx, cy + 0.28 * sy
    );
    path.bezierCurveTo(
      0.95 * sx, cy - 0.35 * sy,
      0.18 * sx, cy - 0.82 * sy,
      0, cy - sy
    );
    path.closePath();
    return path;
  }

  function createHeartShape(sx, sy, cy) {
    const shape = new THREE.Shape();
    traceHeart(shape, sx, sy, cy);
    return shape;
  }

  function createHeartRing(outerX, outerY, innerX, innerY, cy) {
    const shape = createHeartShape(outerX, outerY, cy);
    const hole = new THREE.Path();
    traceHeart(hole, innerX, innerY, cy);
    shape.holes.push(hole);
    return shape;
  }

  function createHeartCurve(sx, sy, cy, z) {
    const leftBottom = new THREE.Vector3(0, cy - sy, z);
    const leftSide = new THREE.Vector3(-sx, cy + 0.28 * sy, z);
    const leftCrown = new THREE.Vector3(-0.18 * sx, cy + 0.72 * sy, z);
    const notch = new THREE.Vector3(0, cy + 0.50 * sy, z);
    const rightCrown = new THREE.Vector3(0.18 * sx, cy + 0.72 * sy, z);
    const rightSide = new THREE.Vector3(sx, cy + 0.28 * sy, z);
    const bottom = new THREE.Vector3(0, cy - sy, z);

    const curve = new THREE.CurvePath();
    curve.add(new THREE.CubicBezierCurve3(
      leftBottom,
      new THREE.Vector3(-0.18 * sx, cy - 0.82 * sy, z),
      new THREE.Vector3(-0.95 * sx, cy - 0.35 * sy, z),
      leftSide
    ));
    curve.add(new THREE.CubicBezierCurve3(
      leftSide,
      new THREE.Vector3(-1.03 * sx, cy + 0.82 * sy, z),
      new THREE.Vector3(-0.55 * sx, cy + 1.08 * sy, z),
      leftCrown
    ));
    curve.add(new THREE.CubicBezierCurve3(
      leftCrown,
      new THREE.Vector3(-0.08 * sx, cy + 0.62 * sy, z),
      new THREE.Vector3(-0.03 * sx, cy + 0.55 * sy, z),
      notch
    ));
    curve.add(new THREE.CubicBezierCurve3(
      notch,
      new THREE.Vector3(0.03 * sx, cy + 0.55 * sy, z),
      new THREE.Vector3(0.08 * sx, cy + 0.62 * sy, z),
      rightCrown
    ));
    curve.add(new THREE.CubicBezierCurve3(
      rightCrown,
      new THREE.Vector3(0.55 * sx, cy + 1.08 * sy, z),
      new THREE.Vector3(1.03 * sx, cy + 0.82 * sy, z),
      rightSide
    ));
    curve.add(new THREE.CubicBezierCurve3(
      rightSide,
      new THREE.Vector3(0.95 * sx, cy - 0.35 * sy, z),
      new THREE.Vector3(0.18 * sx, cy - 0.82 * sy, z),
      bottom
    ));
    return curve;
  }

  const back_plateShape = createHeartShape(1.0, 1.0, 0);
  const back_plateGeom = new THREE.ExtrudeGeometry(back_plateShape, {
    curveSegments: 48,
    steps: 1,
    depth: 0.10,
  });
  const back_plate = new THREE.Mesh(back_plateGeom, silverMat);
  back_plate.name = "back_plate";
  back_plate.position.z = -0.09;
  root.add(back_plate);

  const ornate_bandShape = createHeartRing(0.99, 0.99, 0.78, 0.78, 0);
  const ornate_bandGeom = new THREE.ExtrudeGeometry(ornate_bandShape, {
    curveSegments: 48,
    steps: 1,
    depth: 0.045,
  });
  const ornate_band = new THREE.Mesh(ornate_bandGeom, antiqueSilverMat);
  ornate_band.name = "ornate_band";
  ornate_band.position.z = 0.012;
  root.add(ornate_band);

  const cameo_inlayShape = createHeartShape(0.735, 0.735, 0);
  const cameo_inlayGeom = new THREE.ExtrudeGeometry(cameo_inlayShape, {
    curveSegments: 48,
    steps: 1,
    depth: 0.035,
  });
  const cameo_inlay = new THREE.Mesh(cameo_inlayGeom, cameoMat);
  cameo_inlay.name = "cameo_inlay";
  cameo_inlay.position.z = 0.035;
  root.add(cameo_inlay);

  const outer_raised_rimCurve = createHeartCurve(0.965, 0.965, 0, 0.073);
  const outer_raised_rimGeom = new THREE.TubeGeometry(
    outer_raised_rimCurve, 160, 0.026, 10, true
  );
  const outer_raised_rim = new THREE.Mesh(outer_raised_rimGeom, polishedSilverMat);
  outer_raised_rim.name = "outer_raised_rim";
  root.add(outer_raised_rim);

  const inner_bezelCurve = createHeartCurve(0.775, 0.775, 0, 0.087);
  const inner_bezelGeom = new THREE.TubeGeometry(
    inner_bezelCurve, 144, 0.025, 10, true
  );
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, polishedSilverMat);
  inner_bezel.name = "inner_bezel";
  root.add(inner_bezel);

  const inner_shadow_grooveCurve = createHeartCurve(0.748, 0.748, 0, 0.083);
  const inner_shadow_grooveGeom = new THREE.TubeGeometry(
    inner_shadow_grooveCurve, 144, 0.008, 7, true
  );
  const inner_shadow_groove = new THREE.Mesh(inner_shadow_grooveGeom, recessMat);
  inner_shadow_groove.name = "inner_shadow_groove";
  root.add(inner_shadow_groove);

  const outer_edge_highlightCurve = createHeartCurve(0.992, 0.992, 0, 0.045);
  const outer_edge_highlightGeom = new THREE.TubeGeometry(
    outer_edge_highlightCurve, 160, 0.010, 7, true
  );
  const outer_edge_highlight = new THREE.Mesh(outer_edge_highlightGeom, polishedSilverMat);
  outer_edge_highlight.name = "outer_edge_highlight";
  root.add(outer_edge_highlight);

  const cameo_glintGeom = new THREE.CircleGeometry(0.11, 28);

  const cyan_glintMat = new THREE.MeshBasicMaterial({
    color: 0x9ff7f1,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const cyan_glint = new THREE.Mesh(cameo_glintGeom, cyan_glintMat);
  cyan_glint.name = "cyan_glint";
  cyan_glint.position.set(-0.36, 0.08, 0.074);
  cyan_glint.rotation.z = -0.28;
  cyan_glint.scale.set(0.55, 1.75, 1);
  root.add(cyan_glint);

  const yellow_glintMat = new THREE.MeshBasicMaterial({
    color: 0xfff39a,
    transparent: true,
    opacity: 0.13,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const yellow_glint = new THREE.Mesh(cameo_glintGeom, yellow_glintMat);
  yellow_glint.name = "yellow_glint";
  yellow_glint.position.set(-0.12, 0.30, 0.0745);
  yellow_glint.rotation.z = 0.35;
  yellow_glint.scale.set(1.25, 0.72, 1);
  root.add(yellow_glint);

  const pink_glintMat = new THREE.MeshBasicMaterial({
    color: 0xf7b9dc,
    transparent: true,
    opacity: 0.12,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const pink_glint = new THREE.Mesh(cameo_glintGeom, pink_glintMat);
  pink_glint.name = "pink_glint";
  pink_glint.position.set(0.18, 0.10, 0.075);
  pink_glint.rotation.z = -0.55;
  pink_glint.scale.set(1.35, 0.62, 1);
  root.add(pink_glint);

  const green_glintMat = new THREE.MeshBasicMaterial({
    color: 0xc9f79c,
    transparent: true,
    opacity: 0.12,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const green_glint = new THREE.Mesh(cameo_glintGeom, green_glintMat);
  green_glint.name = "green_glint";
  green_glint.position.set(-0.20, -0.30, 0.075);
  green_glint.rotation.z = 0.45;
  green_glint.scale.set(0.72, 1.35, 1);
  root.add(green_glint);

  const blue_glintMat = new THREE.MeshBasicMaterial({
    color: 0xa9dfff,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const blue_glint = new THREE.Mesh(cameo_glintGeom, blue_glintMat);
  blue_glint.name = "blue_glint";
  blue_glint.position.set(0.43, 0.20, 0.0755);
  blue_glint.rotation.z = -0.25;
  blue_glint.scale.set(0.48, 1.10, 1);
  root.add(blue_glint);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -0.075);
  leafShape.bezierCurveTo(0.045, -0.045, 0.055, 0.035, 0, 0.085);
  leafShape.bezierCurveTo(-0.055, 0.035, -0.045, -0.045, 0, -0.075);
  leafShape.closePath();

  const leaf_reliefsGeom = new THREE.ExtrudeGeometry(leafShape, {
    curveSegments: 12,
    steps: 1,
    depth: 0.018,
  });
  const leaf_reliefs = new THREE.InstancedMesh(leaf_reliefsGeom, polishedSilverMat, 28);
  leaf_reliefs.name = "leaf_reliefs";

  const leaf_curve = createHeartCurve(0.885, 0.885, 0, 0.083);
  const instanceMatrix = new THREE.Matrix4();
  const instancePosition = new THREE.Vector3();
  const instanceQuaternion = new THREE.Quaternion();
  const instanceScale = new THREE.Vector3();
  const zAxis = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < 28; i++) {
    const t = (i + 0.5) / 28;
    const point = leaf_curve.getPointAt(t);
    const tangent = leaf_curve.getTangentAt(t).normalize();
    const angle = Math.atan2(tangent.y, tangent.x) - Math.PI / 2;
    const alternating = i % 2 === 0 ? 1 : -1;
    const widthScale = i % 4 === 0 ? 1.08 : 0.88;
    const lengthScale = i % 3 === 0 ? 1.12 : 0.94;

    instancePosition.copy(point);
    instanceQuaternion.setFromAxisAngle(zAxis, angle + alternating * 0.18);
    instanceScale.set(widthScale, lengthScale, 1);
    instanceMatrix.compose(instancePosition, instanceQuaternion, instanceScale);
    leaf_reliefs.setMatrixAt(i, instanceMatrix);
  }
  leaf_reliefs.instanceMatrix.needsUpdate = true;
  root.add(leaf_reliefs);

  const scroll_curve = createHeartCurve(0.89, 0.89, 0, 0.091);
  const scroll_loopsGeom = new THREE.TorusGeometry(
    0.043, 0.009, 7, 18, Math.PI * 1.55
  );
  const scroll_loops = new THREE.InstancedMesh(scroll_loopsGeom, polishedSilverMat, 14);
  scroll_loops.name = "scroll_loops";

  for (let i = 0; i < 14; i++) {
    const t = (i + 0.35) / 14;
    const point = scroll_curve.getPointAt(t);
    const tangent = scroll_curve.getTangentAt(t).normalize();
    const angle = Math.atan2(tangent.y, tangent.x) - Math.PI / 2;
    const alternating = i % 2 === 0 ? 1 : -1;

    instancePosition.copy(point);
    instanceQuaternion.setFromAxisAngle(zAxis, angle + alternating * 0.72);
    instanceScale.set(0.82, 1.18, 0.8);
    instanceMatrix.compose(instancePosition, instanceQuaternion, instanceScale);
    scroll_loops.setMatrixAt(i, instanceMatrix);
  }
  scroll_loops.instanceMatrix.needsUpdate = true;
  root.add(scroll_loops);

  const bead_curve = createHeartCurve(0.935, 0.935, 0, 0.096);
  const bead_reliefsGeom = new THREE.SphereGeometry(0.038, 14, 8);
  const bead_reliefs = new THREE.InstancedMesh(bead_reliefsGeom, polishedSilverMat, 12);
  bead_reliefs.name = "bead_reliefs";

  for (let i = 0; i < 12; i++) {
    const t = (i + 0.18) / 12;
    const point = bead_curve.getPointAt(t);
    const size = i % 3 === 0 ? 1.22 : (i % 3 === 1 ? 0.92 : 1.05);

    instancePosition.copy(point);
    instanceQuaternion.identity();
    instanceScale.set(size, size, size * 0.55);
    instanceMatrix.compose(instancePosition, instanceQuaternion, instanceScale);
    bead_reliefs.setMatrixAt(i, instanceMatrix);
  }
  bead_reliefs.instanceMatrix.needsUpdate = true;
  root.add(bead_reliefs);

  const accent_curve = createHeartCurve(0.855, 0.855, 0, 0.092);
  const small_accent_beadsGeom = new THREE.SphereGeometry(0.017, 10, 6);
  const small_accent_beads = new THREE.InstancedMesh(
    small_accent_beadsGeom, polishedSilverMat, 24
  );
  small_accent_beads.name = "small_accent_beads";

  for (let i = 0; i < 24; i++) {
    const t = (i + 0.5) / 24;
    const point = accent_curve.getPointAt(t);
    const tangent = accent_curve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.y, tangent.x, 0);
    const alternating = i % 2 === 0 ? 1 : -1;
    const offset = alternating * 0.026;
    const size = i % 4 === 0 ? 1.15 : 0.82;

    instancePosition.copy(point).addScaledVector(normal, offset);
    instanceQuaternion.identity();
    instanceScale.set(size, size, size * 0.5);
    instanceMatrix.compose(instancePosition, instanceQuaternion, instanceScale);
    small_accent_beads.setMatrixAt(i, instanceMatrix);
  }
  small_accent_beads.instanceMatrix.needsUpdate = true;
  root.add(small_accent_beads);

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
  if (maxDim > 0) {
    const scale = 0.98 / maxDim;
    root.scale.setScalar(scale);
  }
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
