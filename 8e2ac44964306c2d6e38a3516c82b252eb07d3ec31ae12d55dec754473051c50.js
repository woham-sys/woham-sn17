function __sn17_user(THREE) {
  const root = new THREE.Group();

  const bladeMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.35 });
  const shaftMat = new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 0.25 });
  const ridgeMat = new THREE.MeshStandardMaterial({ color: 0x242424, roughness: 0.3 });
  const blueMat = new THREE.MeshStandardMaterial({ color: 0x0077ff, roughness: 0.35 });
  const darkBlueMat = new THREE.MeshStandardMaterial({ color: 0x004faa, roughness: 0.45 });

  function makeBladeShape(side, tipX, neckX, halfWidth) {
    const shape = new THREE.Shape();
    if (side > 0) {
      shape.moveTo(neckX, -halfWidth * 0.28);
      shape.bezierCurveTo(neckX + halfWidth * 0.55, -halfWidth * 0.55, tipX - halfWidth * 0.75, -halfWidth * 0.95, tipX, -halfWidth * 0.55);
      shape.bezierCurveTo(tipX + halfWidth * 0.18, -halfWidth * 0.15, tipX + halfWidth * 0.12, halfWidth * 0.35, tipX, halfWidth * 0.55);
      shape.bezierCurveTo(tipX - halfWidth * 0.75, halfWidth * 0.95, neckX + halfWidth * 0.55, halfWidth * 0.55, neckX, halfWidth * 0.28);
    } else {
      shape.moveTo(neckX, -halfWidth * 0.28);
      shape.bezierCurveTo(neckX - halfWidth * 0.55, -halfWidth * 0.55, tipX + halfWidth * 0.75, -halfWidth * 0.95, tipX, -halfWidth * 0.55);
      shape.bezierCurveTo(tipX - halfWidth * 0.18, -halfWidth * 0.15, tipX - halfWidth * 0.12, halfWidth * 0.35, tipX, halfWidth * 0.55);
      shape.bezierCurveTo(tipX + halfWidth * 0.75, halfWidth * 0.95, neckX - halfWidth * 0.55, halfWidth * 0.55, neckX, halfWidth * 0.28);
    }
    shape.closePath();
    return shape;
  }

  function makeRidgeGeometry(side, tipX, neckX) {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(neckX, 0, 0.055),
      new THREE.Vector3((neckX + tipX) * 0.5, side * 0.02, 0.075),
      new THREE.Vector3(tipX - side * 0.15, side * 0.02, 0.06),
      new THREE.Vector3(tipX - side * 0.02, 0, 0.035)
    );
    return new THREE.TubeGeometry(curve, 24, 0.018, 8, false);
  }

  const horizontal_paddle_group = new THREE.Group();
  horizontal_paddle_group.position.set(0, 0.02, 0.02);
  root.add(horizontal_paddle_group);

  const horizontal_shaft_geom = new THREE.CylinderGeometry(0.035, 0.035, 1.9, 24);
  const horizontal_shaft = new THREE.Mesh(horizontal_shaft_geom, shaftMat);
  horizontal_shaft.rotation.z = Math.PI / 2;
  horizontal_paddle_group.add(horizontal_shaft);

  const right_blade_shape = makeBladeShape(1, 1.35, 0.72, 0.36);
  const right_blade_geom = new THREE.ExtrudeGeometry(right_blade_shape, { depth: 0.045, steps: 1, curveSegments: 16 });
  const right_blade = new THREE.Mesh(right_blade_geom, bladeMat);
  right_blade.position.z = -0.0225;
  horizontal_paddle_group.add(right_blade);

  const left_blade_shape = makeBladeShape(-1, -1.35, -0.72, 0.36);
  const left_blade_geom = new THREE.ExtrudeGeometry(left_blade_shape, { depth: 0.045, steps: 1, curveSegments: 16 });
  const left_blade = new THREE.Mesh(left_blade_geom, bladeMat);
  left_blade.position.z = -0.0225;
  horizontal_paddle_group.add(left_blade);

  const right_blade_ridge_geom = makeRidgeGeometry(1, 1.35, 0.72);
  const right_blade_ridge = new THREE.Mesh(right_blade_ridge_geom, ridgeMat);
  horizontal_paddle_group.add(right_blade_ridge);

  const left_blade_ridge_geom = makeRidgeGeometry(-1, -1.35, -0.72);
  const left_blade_ridge = new THREE.Mesh(left_blade_ridge_geom, ridgeMat);
  horizontal_paddle_group.add(left_blade_ridge);

  const right_blue_collar_geom = new THREE.CylinderGeometry(0.065, 0.065, 0.16, 24);
  const right_blue_collar = new THREE.Mesh(right_blue_collar_geom, blueMat);
  right_blue_collar.rotation.z = Math.PI / 2;
  right_blue_collar.position.x = 0.72;
  horizontal_paddle_group.add(right_blue_collar);

  const left_blue_collar_geom = new THREE.CylinderGeometry(0.065, 0.065, 0.16, 24);
  const left_blue_collar = new THREE.Mesh(left_blue_collar_geom, blueMat);
  left_blue_collar.rotation.z = Math.PI / 2;
  left_blue_collar.position.x = -0.72;
  horizontal_paddle_group.add(left_blue_collar);

  const collar_rib_geom = new THREE.TorusGeometry(0.066, 0.004, 8, 24);
  const horizontal_collar_ribs = new THREE.InstancedMesh(collar_rib_geom, darkBlueMat, 8);
  const rib_dummy = new THREE.Object3D();
  let rib_index = 0;
  for (const centerX of [-0.72, 0.72]) {
    for (let i = 0; i < 4; i++) {
      rib_dummy.position.set(centerX - 0.055 + i * 0.036, 0, 0);
      rib_dummy.rotation.set(0, Math.PI / 2, 0);
      rib_dummy.updateMatrix();
      horizontal_collar_ribs.setMatrixAt(rib_index++, rib_dummy.matrix);
    }
  }
  horizontal_paddle_group.add(horizontal_collar_ribs);

  const center_lock_ring_geom = new THREE.TorusGeometry(0.055, 0.012, 10, 28);
  const center_lock_ring = new THREE.Mesh(center_lock_ring_geom, shaftMat);
  center_lock_ring.rotation.y = Math.PI / 2;
  center_lock_ring.position.set(0, 0.02, 0.045);
  root.add(center_lock_ring);

  const center_lock_knob_geom = new THREE.SphereGeometry(0.055, 18, 10);
  const center_lock_knob = new THREE.Mesh(center_lock_knob_geom, shaftMat);
  center_lock_knob.scale.set(0.75, 1.0, 0.55);
  center_lock_knob.position.set(0, 0.02, 0.075);
  root.add(center_lock_knob);

  const diagonal_paddle_group = new THREE.Group();
  diagonal_paddle_group.position.set(0, 0.02, -0.045);
  diagonal_paddle_group.rotation.z = 0.62;
  root.add(diagonal_paddle_group);

  const diagonal_shaft_geom = new THREE.CylinderGeometry(0.034, 0.034, 2.25, 24);
  const diagonal_shaft = new THREE.Mesh(diagonal_shaft_geom, shaftMat);
  diagonal_paddle_group.add(diagonal_shaft);

  const upper_blade_shape = makeBladeShape(1, 1.18, 0.55, 0.34);
  const upper_blade_geom = new THREE.ExtrudeGeometry(upper_blade_shape, { depth: 0.045, steps: 1, curveSegments: 16 });
  const upper_blade = new THREE.Mesh(upper_blade_geom, bladeMat);
  upper_blade.position.z = -0.0225;
  diagonal_paddle_group.add(upper_blade);

  const lower_handle_geom = new THREE.SphereGeometry(0.085, 18, 12);
  const lower_handle = new THREE.Mesh(lower_handle_geom, bladeMat);
  lower_handle.scale.set(0.72, 1.0, 0.45);
  lower_handle.position.y = -1.15;
  diagonal_paddle_group.add(lower_handle);

  const upper_blade_ridge_geom = makeRidgeGeometry(1, 1.18, 0.55);
  const upper_blade_ridge = new THREE.Mesh(upper_blade_ridge_geom, ridgeMat);
  diagonal_paddle_group.add(upper_blade_ridge);

  const diagonal_blue_collar_geom = new THREE.CylinderGeometry(0.066, 0.066, 0.17, 24);
  const diagonal_blue_collar = new THREE.Mesh(diagonal_blue_collar_geom, blueMat);
  diagonal_blue_collar.position.y = 0.55;
  diagonal_paddle_group.add(diagonal_blue_collar);

  const diagonal_collar_ribs = new THREE.InstancedMesh(collar_rib_geom, darkBlueMat, 4);
  for (let i = 0; i < 4; i++) {
    rib_dummy.position.set(0, 0.55 - 0.055 + i * 0.036, 0);
    rib_dummy.rotation.set(0, 0, 0);
    rib_dummy.updateMatrix();
    diagonal_collar_ribs.setMatrixAt(i, rib_dummy.matrix);
  }
  diagonal_paddle_group.add(diagonal_collar_ribs);

  const shaft_joint_geom = new THREE.TorusGeometry(0.038, 0.006, 8, 24);
  const shaft_joint = new THREE.Mesh(shaft_joint_geom, ridgeMat);
  shaft_joint.rotation.x = Math.PI / 2;
  shaft_joint.position.y = -0.42;
  diagonal_paddle_group.add(shaft_joint);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    object.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 0.98 / maxDim;
      object.scale.setScalar(scale);
    }
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
