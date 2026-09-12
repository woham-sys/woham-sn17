// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "hand_scraper";

  const blade_assembly = new THREE.Group();
  blade_assembly.name = "blade_assembly";
  root.add(blade_assembly);

  const handle_assembly = new THREE.Group();
  handle_assembly.name = "handle_assembly";
  root.add(handle_assembly);

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  const cutting_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const handleMat = new THREE.MeshStandardMaterial({
    color: 0xffd900,
    metalness: 0.0,
    roughness: 0.3
  });

  const handle_seamMat = new THREE.MeshStandardMaterial({
    color: 0xe2b900,
    metalness: 0.0,
    roughness: 0.3
  });

  const hanging_hole_rimMat = new THREE.MeshStandardMaterial({
    color: 0xffdf18,
    metalness: 0.0,
    roughness: 0.3
  });

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.30, 0.18);
  bladeShape.lineTo(-0.39, -0.08);
  bladeShape.lineTo(-0.58, -0.32);
  bladeShape.lineTo(-0.58, -3.20);
  bladeShape.lineTo(0.58, -3.20);
  bladeShape.lineTo(0.58, -0.32);
  bladeShape.lineTo(0.39, -0.08);
  bladeShape.lineTo(0.30, 0.18);
  bladeShape.closePath();

  const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.012,
    bevelSegments: 2
  });
  const blade = new THREE.Mesh(bladeGeom, bladeMat);
  blade.name = "blade";
  blade.rotation.x = Math.PI / 2;
  blade.position.y = 0.0225;
  blade_assembly.add(blade);

  const cutting_edgeGeom = new THREE.BoxGeometry(1.17, 0.012, 0.035);
  const cutting_edge = new THREE.Mesh(cutting_edgeGeom, cutting_edgeMat);
  cutting_edge.name = "cutting_edge";
  cutting_edge.position.set(0, 0.029, -3.19);
  blade_assembly.add(cutting_edge);

  const handle_tangGeom = new THREE.BoxGeometry(0.50, 0.045, 0.42);
  const handle_tang = new THREE.Mesh(handle_tangGeom, bladeMat);
  handle_tang.name = "handle_tang";
  handle_tang.position.set(0, 0, 0.18);
  handle_assembly.add(handle_tang);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(-0.30, 0.12);
  handleShape.bezierCurveTo(-0.37, 0.14, -0.42, 0.22, -0.43, 0.34);
  handleShape.bezierCurveTo(-0.47, 0.78, -0.52, 1.55, -0.56, 2.25);
  handleShape.bezierCurveTo(-0.58, 2.62, -0.38, 2.88, 0, 2.94);
  handleShape.bezierCurveTo(0.38, 2.88, 0.58, 2.62, 0.56, 2.25);
  handleShape.bezierCurveTo(0.52, 1.55, 0.47, 0.78, 0.43, 0.34);
  handleShape.bezierCurveTo(0.42, 0.22, 0.37, 0.14, 0.30, 0.12);
  handleShape.closePath();

  const hanging_holePath = new THREE.Path();
  hanging_holePath.absellipse(
    0,
    2.43,
    0.20,
    0.20,
    0,
    Math.PI * 2,
    false,
    0
  );
  handleShape.holes.push(hanging_holePath);

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.28,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.065,
    bevelSegments: 4
  });
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.name = "handle";
  handle.rotation.x = Math.PI / 2;
  handle.position.y = 0.16;
  handle_assembly.add(handle);

  const handle_seamPoints = [
    new THREE.Vector3(-0.35, -0.105, 0.24),
    new THREE.Vector3(-0.44, -0.105, 0.72),
    new THREE.Vector3(-0.50, -0.105, 1.50),
    new THREE.Vector3(-0.54, -0.105, 2.24),
    new THREE.Vector3(-0.45, -0.105, 2.66),
    new THREE.Vector3(-0.22, -0.105, 2.86),
    new THREE.Vector3(0, -0.105, 2.92),
    new THREE.Vector3(0.22, -0.105, 2.86),
    new THREE.Vector3(0.45, -0.105, 2.66),
    new THREE.Vector3(0.54, -0.105, 2.24),
    new THREE.Vector3(0.50, -0.105, 1.50),
    new THREE.Vector3(0.44, -0.105, 0.72),
    new THREE.Vector3(0.35, -0.105, 0.24)
  ];
  const handle_seamCurve = new THREE.CatmullRomCurve3(
    handle_seamPoints,
    false,
    "centripetal"
  );
  const handle_seamGeom = new THREE.TubeGeometry(
    handle_seamCurve,
    64,
    0.012,
    6,
    false
  );
  const handle_seam = new THREE.Mesh(handle_seamGeom, handle_seamMat);
  handle_seam.name = "handle_seam";
  handle_assembly.add(handle_seam);

  const hanging_hole_rimGeom = new THREE.TorusGeometry(
    0.20,
    0.026,
    10,
    32
  );
  const hanging_hole_rim = new THREE.Mesh(
    hanging_hole_rimGeom,
    hanging_hole_rimMat
  );
  hanging_hole_rim.name = "hanging_hole_rim";
  hanging_hole_rim.rotation.x = Math.PI / 2;
  hanging_hole_rim.position.set(0, 0.225, 2.43);
  handle_assembly.add(hanging_hole_rim);

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