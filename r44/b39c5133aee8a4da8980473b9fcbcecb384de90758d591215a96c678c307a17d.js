// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const blade_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const handle_linerMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const handle_scaleMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const handle_faceMat = new THREE.MeshStandardMaterial({
    color: 0x222529,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x08090a,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const hardwareMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x34383b,
    metalness: 0.0,
    roughness: 0.7,
  });

  function makeExtrudedGeometry(shape, depth, bevelSize, bevelThickness, bevelSegments) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 16,
      bevelEnabled: bevelSize > 0,
      bevelSize,
      bevelThickness,
      bevelSegments,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function makeHandleShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.18, 0.34);
    shape.bezierCurveTo(0.45, 0.42, 1.55, 0.55, 2.55, 0.52);
    shape.bezierCurveTo(2.92, 0.51, 3.12, 0.32, 3.13, 0.04);
    shape.bezierCurveTo(3.14, -0.25, 2.95, -0.43, 2.62, -0.45);
    shape.bezierCurveTo(1.85, -0.43, 1.15, -0.37, 0.62, -0.40);
    shape.bezierCurveTo(0.39, -0.41, 0.28, -0.52, 0.08, -0.57);
    shape.bezierCurveTo(-0.08, -0.61, -0.24, -0.52, -0.25, -0.38);
    shape.bezierCurveTo(-0.27, -0.10, -0.27, 0.18, -0.18, 0.34);
    shape.closePath();
    return shape;
  }

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-3.15, -0.10);
  bladeShape.bezierCurveTo(-2.72, 0.12, -1.75, 0.31, -0.48, 0.39);
  bladeShape.lineTo(-0.17, 0.36);
  bladeShape.lineTo(0.08, -0.43);
  bladeShape.lineTo(-0.35, -0.48);
  bladeShape.bezierCurveTo(-1.35, -0.49, -2.55, -0.38, -3.15, -0.10);
  bladeShape.closePath();

  const bladeGeom = makeExtrudedGeometry(bladeShape, 0.10, 0.025, 0.025, 3);
  const blade = new THREE.Mesh(bladeGeom, bladeMat);
  root.add(blade);

  const blade_edgeShape = new THREE.Shape();
  blade_edgeShape.moveTo(-3.12, -0.10);
  blade_edgeShape.bezierCurveTo(-2.45, -0.34, -1.25, -0.46, -0.36, -0.46);
  blade_edgeShape.lineTo(-0.27, -0.36);
  blade_edgeShape.bezierCurveTo(-1.30, -0.37, -2.42, -0.27, -3.12, -0.10);
  blade_edgeShape.closePath();

  const blade_edgeGeom = new THREE.ShapeGeometry(blade_edgeShape, 16);
  const blade_edge = new THREE.Mesh(blade_edgeGeom, blade_edgeMat);
  blade_edge.position.z = 0.078;
  root.add(blade_edge);

  const blade_jimpingGeom = new THREE.BoxGeometry(0.035, 0.055, 0.012);
  const blade_jimping = new THREE.InstancedMesh(blade_jimpingGeom, recessMat, 7);
  const jimping_dummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    jimping_dummy.position.set(-0.30 + i * 0.047, 0.374 - i * 0.010, 0.081);
    jimping_dummy.rotation.set(0, 0, -0.10);
    jimping_dummy.updateMatrix();
    blade_jimping.setMatrixAt(i, jimping_dummy.matrix);
  }
  blade_jimping.instanceMatrix.needsUpdate = true;
  root.add(blade_jimping);

  const nail_nickShape = new THREE.Shape();
  nail_nickShape.moveTo(-1.57, 0.245);
  nail_nickShape.bezierCurveTo(-1.39, 0.305, -1.08, 0.315, -0.88, 0.265);
  nail_nickShape.bezierCurveTo(-1.08, 0.225, -1.39, 0.215, -1.57, 0.245);
  nail_nickShape.closePath();

  const nail_nickGeom = new THREE.ShapeGeometry(nail_nickShape, 16);
  const nail_nick = new THREE.Mesh(nail_nickGeom, recessMat);
  nail_nick.position.z = 0.082;
  root.add(nail_nick);

  const nail_nick_bevelShape = new THREE.Shape();
  nail_nick_bevelShape.moveTo(-1.53, 0.245);
  nail_nick_bevelShape.bezierCurveTo(-1.36, 0.282, -1.10, 0.290, -0.92, 0.263);
  nail_nick_bevelShape.lineTo(-0.95, 0.249);
  nail_nick_bevelShape.bezierCurveTo(-1.14, 0.266, -1.36, 0.260, -1.53, 0.245);
  nail_nick_bevelShape.closePath();

  const nail_nick_bevelGeom = new THREE.ShapeGeometry(nail_nick_bevelShape, 12);
  const nail_nick_bevel = new THREE.Mesh(nail_nick_bevelGeom, blade_edgeMat);
  nail_nick_bevel.position.z = 0.084;
  root.add(nail_nick_bevel);

  const blade_logoGeom = new THREE.BoxGeometry(0.012, 0.052, 0.008);
  const blade_logo = new THREE.InstancedMesh(blade_logoGeom, engravingMat, 8);
  const logo_dummy = new THREE.Object3D();
  const logo_heights = [0.65, 1.0, 0.78, 0.92, 0.62, 1.0, 0.82, 0.70];
  for (let i = 0; i < 8; i++) {
    logo_dummy.position.set(-1.29 + i * 0.045, 0.145, 0.083);
    logo_dummy.scale.set(1, logo_heights[i], 1);
    logo_dummy.rotation.set(0, 0, i % 3 === 0 ? -0.12 : 0);
    logo_dummy.updateMatrix();
    blade_logo.setMatrixAt(i, logo_dummy.matrix);
  }
  blade_logo.instanceMatrix.needsUpdate = true;
  root.add(blade_logo);

  const handle_linerShape = makeHandleShape();
  const handle_linerGeom = makeExtrudedGeometry(handle_linerShape, 0.18, 0.025, 0.025, 2);
  const handle_liner = new THREE.Mesh(handle_linerGeom, handle_linerMat);
  root.add(handle_liner);

  const handle_scaleShape = makeHandleShape();
  const handle_scaleGeom = makeExtrudedGeometry(handle_scaleShape, 0.11, 0.045, 0.035, 3);
  const handle_scale = new THREE.Mesh(handle_scaleGeom, handle_scaleMat);
  handle_scale.scale.set(0.985, 0.94, 1);
  handle_scale.position.set(-0.01, 0, 0.10);
  root.add(handle_scale);

  const handle_faceShape = makeHandleShape();
  const handle_faceGeom = new THREE.ShapeGeometry(handle_faceShape, 16);
  const handle_face = new THREE.Mesh(handle_faceGeom, handle_faceMat);
  handle_face.scale.set(0.955, 0.87, 1);
  handle_face.position.set(0.015, 0.005, 0.198);
  root.add(handle_face);

  const bolsterShape = new THREE.Shape();
  bolsterShape.moveTo(-0.31, 0.37);
  bolsterShape.lineTo(-0.10, 0.39);
  bolsterShape.lineTo(0.16, -0.49);
  bolsterShape.lineTo(-0.08, -0.58);
  bolsterShape.lineTo(-0.29, -0.42);
  bolsterShape.closePath();

  const bolsterGeom = makeExtrudedGeometry(bolsterShape, 0.035, 0.012, 0.012, 2);
  const bolster = new THREE.Mesh(bolsterGeom, blade_edgeMat);
  bolster.position.z = 0.205;
  root.add(bolster);

  const bolster_seamPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.10, 0.38, 0.236),
    new THREE.Vector3(0.00, -0.02, 0.236),
    new THREE.Vector3(0.15, -0.48, 0.236),
  ]);
  const bolster_seamGeom = new THREE.TubeGeometry(bolster_seamPath, 16, 0.012, 6, false);
  const bolster_seam = new THREE.Mesh(bolster_seamGeom, recessMat);
  root.add(bolster_seam);

  const handle_contourPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.08, -0.555, 0.205),
    new THREE.Vector3(0.42, -0.455, 0.205),
    new THREE.Vector3(1.15, -0.405, 0.205),
    new THREE.Vector3(2.05, -0.420, 0.205),
    new THREE.Vector3(2.72, -0.405, 0.205),
    new THREE.Vector3(3.00, -0.270, 0.205),
  ]);
  const handle_contourGeom = new THREE.TubeGeometry(handle_contourPath, 32, 0.018, 6, false);
  const handle_contour = new THREE.Mesh(handle_contourGeom, recessMat);
  root.add(handle_contour);

  const pivot_washerGeom = new THREE.CylinderGeometry(0.185, 0.185, 0.026, 32);
  const pivot_washer = new THREE.Mesh(pivot_washerGeom, recessMat);
  pivot_washer.rotation.x = Math.PI / 2;
  pivot_washer.position.set(0.13, -0.03, 0.215);
  root.add(pivot_washer);

  const pivot_screwGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.045, 32);
  const pivot_screw = new THREE.Mesh(pivot_screwGeom, hardwareMat);
  pivot_screw.rotation.x = Math.PI / 2;
  pivot_screw.position.set(0.13, -0.03, 0.238);
  root.add(pivot_screw);

  const pivot_recessGeom = new THREE.CylinderGeometry(0.042, 0.042, 0.012, 6);
  const pivot_recess = new THREE.Mesh(pivot_recessGeom, engravingMat);
  pivot_recess.rotation.x = Math.PI / 2;
  pivot_recess.rotation.y = Math.PI / 6;
  pivot_recess.position.set(0.13, -0.03, 0.266);
  root.add(pivot_recess);

  const fastener_positions = [
    [1.52, 0.29],
    [2.57, 0.34],
  ];

  const fastener_washerGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.024, 24);
  const fastener_washers = new THREE.InstancedMesh(fastener_washerGeom, recessMat, 2);
  const fastener_dummy = new THREE.Object3D();
  for (let i = 0; i < fastener_positions.length; i++) {
    fastener_dummy.position.set(fastener_positions[i][0], fastener_positions[i][1], 0.214);
    fastener_dummy.rotation.set(Math.PI / 2, 0, 0);
    fastener_dummy.scale.set(1, 1, 1);
    fastener_dummy.updateMatrix();
    fastener_washers.setMatrixAt(i, fastener_dummy.matrix);
  }
  fastener_washers.instanceMatrix.needsUpdate = true;
  root.add(fastener_washers);

  const fastener_screwGeom = new THREE.CylinderGeometry(0.080, 0.080, 0.040, 24);
  const fastener_screws = new THREE.InstancedMesh(fastener_screwGeom, hardwareMat, 2);
  for (let i = 0; i < fastener_positions.length; i++) {
    fastener_dummy.position.set(fastener_positions[i][0], fastener_positions[i][1], 0.235);
    fastener_dummy.rotation.set(Math.PI / 2, 0, 0);
    fastener_dummy.updateMatrix();
    fastener_screws.setMatrixAt(i, fastener_dummy.matrix);
  }
  fastener_screws.instanceMatrix.needsUpdate = true;
  root.add(fastener_screws);

  const fastener_slotGeom = new THREE.BoxGeometry(0.070, 0.012, 0.009);
  const fastener_slots = new THREE.InstancedMesh(fastener_slotGeom, engravingMat, 2);
  for (let i = 0; i < fastener_positions.length; i++) {
    fastener_dummy.position.set(fastener_positions[i][0], fastener_positions[i][1], 0.258);
    fastener_dummy.rotation.set(0, 0, i === 0 ? 0.25 : -0.18);
    fastener_dummy.updateMatrix();
    fastener_slots.setMatrixAt(i, fastener_dummy.matrix);
  }
  fastener_slots.instanceMatrix.needsUpdate = true;
  root.add(fastener_slots);

  const lanyard_holeGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.030, 28);
  const lanyard_hole = new THREE.Mesh(lanyard_holeGeom, recessMat);
  lanyard_hole.rotation.x = Math.PI / 2;
  lanyard_hole.position.set(2.88, 0.02, 0.216);
  root.add(lanyard_hole);

  const lanyard_rimGeom = new THREE.TorusGeometry(0.087, 0.018, 8, 28);
  const lanyard_rim = new THREE.Mesh(lanyard_rimGeom, handle_linerMat);
  lanyard_rim.position.set(2.88, 0.02, 0.237);
  root.add(lanyard_rim);

  const lanyard_coreGeom = new THREE.CylinderGeometry(0.040, 0.040, 0.012, 20);
  const lanyard_core = new THREE.Mesh(lanyard_coreGeom, recessMat);
  lanyard_core.rotation.x = Math.PI / 2;
  lanyard_core.position.set(2.88, 0.02, 0.240);
  root.add(lanyard_core);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }
}