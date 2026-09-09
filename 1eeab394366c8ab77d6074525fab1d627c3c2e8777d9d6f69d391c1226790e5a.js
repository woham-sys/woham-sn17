function __sn17_user(THREE) {
  const root = new THREE.Group();
  const spring_assembly = new THREE.Group();
  root.add(spring_assembly);

  const spring_coilMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d2,
    metalness: 0.75,
    roughness: 0.18,
  });

  const coil_radius = 0.31;
  const axial_half_length = 0.49;
  const number_of_turns = 9;
  const end_turns = 0.28;
  const wire_radius = 0.034;
  const point_count = 360;

  const spring_points = [];
  for (let i = 0; i <= point_count; i++) {
    const t = i / point_count;
    const turn = -number_of_turns / 2 + number_of_turns * t;
    let x;

    if (turn < -number_of_turns / 2 + end_turns) {
      const u = (turn + number_of_turns / 2) / end_turns;
      x = -axial_half_length +
        2 * axial_half_length * end_turns *
        (u - 0.12 * Math.sin(Math.PI * u));
    } else if (turn > number_of_turns / 2 - end_turns) {
      const u = (number_of_turns / 2 - turn) / end_turns;
      x = axial_half_length -
        2 * axial_half_length * end_turns *
        (u - 0.12 * Math.sin(Math.PI * u));
    } else {
      x = -axial_half_length +
        2 * axial_half_length *
        (turn + number_of_turns / 2) / number_of_turns;
    }

    const angle = turn * Math.PI * 2;
    spring_points.push(new THREE.Vector3(
      x,
      Math.cos(angle) * coil_radius,
      Math.sin(angle) * coil_radius
    ));
  }

  const spring_curve = new THREE.CatmullRomCurve3(
    spring_points,
    false,
    "centripetal",
    0.5
  );

  const spring_coilGeom = new THREE.TubeGeometry(
    spring_curve,
    540,
    wire_radius,
    20,
    false
  );
  const spring_coil = new THREE.Mesh(spring_coilGeom, spring_coilMat);
  spring_assembly.add(spring_coil);

  const end_capGeom = new THREE.SphereGeometry(wire_radius, 20, 12);

  const left_end_cap = new THREE.Mesh(end_capGeom, spring_coilMat);
  left_end_cap.position.copy(spring_points[0]);
  spring_assembly.add(left_end_cap);

  const right_end_cap = new THREE.Mesh(end_capGeom, spring_coilMat);
  right_end_cap.position.copy(spring_points[spring_points.length - 1]);
  spring_assembly.add(right_end_cap);

  spring_assembly.rotation.set(0, -0.18, 0.04);

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
  const scale = 0.98 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
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
