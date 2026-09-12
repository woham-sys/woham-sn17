// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cooking_pot";

  const pot_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x292b2d,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const interior_bowlMat = new THREE.MeshStandardMaterial({
    color: 0x111213,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const rolled_rimMat = new THREE.MeshStandardMaterial({
    color: 0x303235,
    metalness: 0.0,
    roughness: 0.7,
  });

  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x242628,
    metalness: 0.0,
    roughness: 0.8,
  });

  const rivetMat = new THREE.MeshStandardMaterial({
    color: 0x18191a,
    metalness: 0.0,
    roughness: 0.7,
  });

  const pot_bodyProfile = [
    new THREE.Vector2(0.00, -0.56),
    new THREE.Vector2(0.48, -0.56),
    new THREE.Vector2(0.62, -0.54),
    new THREE.Vector2(0.73, -0.49),
    new THREE.Vector2(0.81, -0.40),
    new THREE.Vector2(0.86, -0.28),
    new THREE.Vector2(0.89, -0.10),
    new THREE.Vector2(0.91, 0.15),
    new THREE.Vector2(0.93, 0.38),
    new THREE.Vector2(0.95, 0.48),
    new THREE.Vector2(0.96, 0.52),
  ];
  const pot_bodyGeom = new THREE.LatheGeometry(pot_bodyProfile, 64);
  const pot_body = new THREE.Mesh(pot_bodyGeom, pot_bodyMat);
  pot_body.name = "pot_body";
  root.add(pot_body);

  const interior_bowlProfile = [
    new THREE.Vector2(0.00, -0.405),
    new THREE.Vector2(0.45, -0.405),
    new THREE.Vector2(0.57, -0.38),
    new THREE.Vector2(0.67, -0.32),
    new THREE.Vector2(0.74, -0.23),
    new THREE.Vector2(0.79, -0.10),
    new THREE.Vector2(0.82, 0.08),
    new THREE.Vector2(0.84, 0.28),
    new THREE.Vector2(0.86, 0.43),
    new THREE.Vector2(0.87, 0.49),
  ];
  const interior_bowlGeom = new THREE.LatheGeometry(interior_bowlProfile, 64);
  const interior_bowl = new THREE.Mesh(interior_bowlGeom, interior_bowlMat);
  interior_bowl.name = "interior_bowl";
  root.add(interior_bowl);

  const rolled_rimGeom = new THREE.TorusGeometry(0.925, 0.045, 14, 64);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, rolled_rimMat);
  rolled_rim.name = "rolled_rim";
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 0.52;
  root.add(rolled_rim);

  const handle_assembly = new THREE.Group();
  handle_assembly.name = "handle_assembly";
  handle_assembly.rotation.y = -0.08;
  root.add(handle_assembly);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(0.80, -0.17);
  handleShape.bezierCurveTo(0.91, -0.17, 0.98, -0.13, 1.08, -0.12);
  handleShape.bezierCurveTo(1.28, -0.10, 1.49, -0.15, 1.67, -0.16);
  handleShape.bezierCurveTo(1.82, -0.17, 1.91, -0.09, 1.92, 0.00);
  handleShape.bezierCurveTo(1.91, 0.10, 1.82, 0.17, 1.67, 0.18);
  handleShape.bezierCurveTo(1.48, 0.18, 1.28, 0.12, 1.08, 0.13);
  handleShape.bezierCurveTo(0.98, 0.14, 0.91, 0.17, 0.80, 0.17);
  handleShape.closePath();

  const handleHole = new THREE.Path();
  handleHole.absellipse(1.67, 0.00, 0.115, 0.065, 0, Math.PI * 2, false, 0);
  handleShape.holes.push(handleHole);

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.13,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  handleGeom.translate(0, 0, -0.065);

  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.name = "handle";
  handle.rotation.x = -Math.PI / 2;
  handle.position.y = 0.45;
  handle_assembly.add(handle);

  const handle_hole_rimGeom = new THREE.TorusGeometry(0.09, 0.012, 8, 32);
  const handle_hole_rim = new THREE.Mesh(handle_hole_rimGeom, rolled_rimMat);
  handle_hole_rim.name = "handle_hole_rim";
  handle_hole_rim.rotation.x = Math.PI / 2;
  handle_hole_rim.scale.set(1.25, 0.72, 1);
  handle_hole_rim.position.set(1.67, 0.542, 0);
  handle_assembly.add(handle_hole_rim);

  const handle_mountGeom = new THREE.SphereGeometry(1, 24, 12);
  const handle_mount = new THREE.Mesh(handle_mountGeom, handleMat);
  handle_mount.name = "handle_mount";
  handle_mount.scale.set(0.18, 0.13, 0.22);
  handle_mount.position.set(0.88, 0.39, 0);
  handle_assembly.add(handle_mount);

  const rivetGeom = new THREE.SphereGeometry(1, 20, 12);

  const inner_rivet = new THREE.Mesh(rivetGeom, rivetMat);
  inner_rivet.name = "inner_rivet";
  inner_rivet.scale.set(0.045, 0.078, 0.065);
  inner_rivet.position.set(0.825, 0.39, 0.105);
  handle_assembly.add(inner_rivet);

  const outer_rivet = new THREE.Mesh(rivetGeom, rivetMat);
  outer_rivet.name = "outer_rivet";
  outer_rivet.scale.set(0.045, 0.078, 0.065);
  outer_rivet.position.set(0.885, 0.39, -0.105);
  handle_assembly.add(outer_rivet);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
}