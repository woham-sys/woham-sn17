function __sn17_user(THREE) {
  const root = new THREE.Group();

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0xcfd2d0,
    metalness: true,
    roughness: 0.38
  });
  const cutting_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xf0f0ec,
    metalness: true,
    roughness: 0.25
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0xffdf00,
    metalness: false,
    roughness: 0.35
  });
  const handle_seamMat = new THREE.MeshStandardMaterial({
    color: 0xd6ad00,
    metalness: false,
    roughness: 0.45
  });
  const hanging_hole_rimMat = new THREE.MeshStandardMaterial({
    color: 0xe8c400,
    metalness: false,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const hanging_holeMat = new THREE.MeshStandardMaterial({
    color: 0xb98500,
    metalness: false,
    roughness: 0.55,
    side: THREE.DoubleSide
  });

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.235, -0.06);
  bladeShape.lineTo(0.235, -0.06);
  bladeShape.lineTo(0.285, 0.18);
  bladeShape.lineTo(0.285, 1.96);
  bladeShape.lineTo(-0.285, 1.96);
  bladeShape.lineTo(-0.285, 0.18);
  bladeShape.lineTo(-0.235, -0.06);

  const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2
  });
  const blade = new THREE.Mesh(bladeGeom, bladeMat);
  blade.rotation.x = Math.PI / 2;
  blade.position.y = 0.0175;
  root.add(blade);

  const cutting_edgeGeom = new THREE.BoxGeometry(0.57, 0.012, 0.018);
  const cutting_edge = new THREE.Mesh(cutting_edgeGeom, cutting_edgeMat);
  cutting_edge.position.set(0, 0.002, 1.962);
  root.add(cutting_edge);

  const blade_brush_linesMat = new THREE.LineBasicMaterial({
    color: 0x9fa3a1,
    transparent: true,
    opacity: 0.22
  });
  const blade_brush_points = [];
  for (let i = 0; i < 13; i++) {
    const x = -0.245 + i * 0.041;
    const z0 = 0.22 + (i % 3) * 0.025;
    const z1 = 1.86 - (i % 4) * 0.018;
    blade_brush_points.push(
      new THREE.Vector3(x, 0.027, z0),
      new THREE.Vector3(x, 0.027, z1)
    );
  }
  const blade_brush_linesGeom = new THREE.BufferGeometry().setFromPoints(blade_brush_points);
  const blade_brush_lines = new THREE.LineSegments(blade_brush_linesGeom, blade_brush_linesMat);
  root.add(blade_brush_lines);

  const handle_tangGeom = new THREE.BoxGeometry(0.36, 0.045, 0.25);
  const handle_tang = new THREE.Mesh(handle_tangGeom, bladeMat);
  handle_tang.position.set(0, -0.006, -0.08);
  root.add(handle_tang);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(-0.24, 0.13);
  handleShape.bezierCurveTo(-0.30, 0.12, -0.33, 0.04, -0.33, -0.08);
  handleShape.bezierCurveTo(-0.34, -0.42, -0.39, -1.18, -0.37, -1.43);
  handleShape.bezierCurveTo(-0.36, -1.65, -0.20, -1.80, 0, -1.82);
  handleShape.bezierCurveTo(0.20, -1.80, 0.36, -1.65, 0.37, -1.43);
  handleShape.bezierCurveTo(0.39, -1.18, 0.34, -0.42, 0.33, -0.08);
  handleShape.bezierCurveTo(0.33, 0.04, 0.30, 0.12, 0.24, 0.13);
  handleShape.lineTo(-0.24, 0.13);

  const hanging_hole_path = new THREE.Path();
  hanging_hole_path.absellipse(0, -1.43, 0.135, 0.135, 0, Math.PI * 2, false, 0);
  handleShape.holes.push(hanging_hole_path);

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.18,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.045,
    bevelSegments: 5
  });
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.rotation.x = Math.PI / 2;
  handle.position.y = 0.135;
  root.add(handle);

  const handle_nose_lipGeom = new THREE.CapsuleGeometry(0.055, 0.46, 6, 18);
  const handle_nose_lip = new THREE.Mesh(handle_nose_lipGeom, handleMat);
  handle_nose_lip.rotation.z = Math.PI / 2;
  handle_nose_lip.scale.set(0.72, 1, 1);
  handle_nose_lip.position.set(0, 0.045, 0.105);
  root.add(handle_nose_lip);

  const handle_seam_points = [
    new THREE.Vector3(-0.275, 0.028, 0.055),
    new THREE.Vector3(-0.325, 0.028, -0.18),
    new THREE.Vector3(-0.355, 0.028, -0.72),
    new THREE.Vector3(-0.345, 0.028, -1.30),
    new THREE.Vector3(-0.285, 0.028, -1.58),
    new THREE.Vector3(-0.16, 0.028, -1.735),
    new THREE.Vector3(0, 0.028, -1.79),
    new THREE.Vector3(0.16, 0.028, -1.735),
    new THREE.Vector3(0.285, 0.028, -1.58),
    new THREE.Vector3(0.345, 0.028, -1.30),
    new THREE.Vector3(0.355, 0.028, -0.72),
    new THREE.Vector3(0.325, 0.028, -0.18),
    new THREE.Vector3(0.275, 0.028, 0.055)
  ];
  const handle_seam_curve = new THREE.CatmullRomCurve3(
    handle_seam_points,
    false,
    "centripetal"
  );
  const handle_seamGeom = new THREE.TubeGeometry(handle_seam_curve, 64, 0.008, 6, false);
  const handle_seam = new THREE.Mesh(handle_seamGeom, handle_seamMat);
  root.add(handle_seam);

  const hanging_hole_rimGeom = new THREE.RingGeometry(0.108, 0.145, 32);
  const hanging_hole_rim = new THREE.Mesh(hanging_hole_rimGeom, hanging_hole_rimMat);
  hanging_hole_rim.rotation.x = -Math.PI / 2;
  hanging_hole_rim.position.set(0, 0.184, -1.43);
  root.add(hanging_hole_rim);

  const hanging_holeGeom = new THREE.CircleGeometry(0.107, 32);
  const hanging_hole = new THREE.Mesh(hanging_holeGeom, hanging_holeMat);
  hanging_hole.rotation.x = -Math.PI / 2;
  hanging_hole.position.set(0, 0.101, -1.43);
  root.add(hanging_hole);

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
