function __sn17_user(THREE) {
  const root = new THREE.Group();

  const cast_iron_mat = new THREE.MeshStandardMaterial({
    color: 0x242627,
    metalness: 0.35,
    roughness: 0.82,
    side: THREE.DoubleSide,
  });
  const rim_mat = new THREE.MeshStandardMaterial({
    color: 0x303234,
    metalness: 0.35,
    roughness: 0.78,
    side: THREE.DoubleSide,
  });
  const texture_mat = new THREE.MeshStandardMaterial({
    color: 0x171819,
    metalness: 0.25,
    roughness: 0.95,
  });
  const crumb_mat = new THREE.MeshStandardMaterial({
    color: 0x5a321d,
    metalness: 0.0,
    roughness: 0.95,
  });
  const dark_crumb_mat = new THREE.MeshStandardMaterial({
    color: 0x2b1a12,
    metalness: 0.0,
    roughness: 0.98,
  });

  const pan_profile = [
    new THREE.Vector2(0.00, -0.105),
    new THREE.Vector2(0.34, -0.105),
    new THREE.Vector2(0.43, -0.075),
    new THREE.Vector2(0.50, 0.015),
    new THREE.Vector2(0.545, 0.115),
    new THREE.Vector2(0.575, 0.155),
    new THREE.Vector2(0.595, 0.165),
    new THREE.Vector2(0.610, 0.145),
    new THREE.Vector2(0.585, 0.095),
    new THREE.Vector2(0.535, 0.015),
    new THREE.Vector2(0.470, -0.055),
    new THREE.Vector2(0.390, -0.095),
    new THREE.Vector2(0.00, -0.105),
  ];
  const pan_body_geo = new THREE.LatheGeometry(pan_profile, 96);
  const pan_body = new THREE.Mesh(pan_body_geo, cast_iron_mat);
  root.add(pan_body);

  const cooking_surface_geo = new THREE.CylinderGeometry(0.425, 0.425, 0.014, 96);
  const cooking_surface = new THREE.Mesh(cooking_surface_geo, cast_iron_mat);
  cooking_surface.position.y = -0.092;
  root.add(cooking_surface);

  const outer_rim_geo = new THREE.TorusGeometry(0.585, 0.022, 12, 96);
  const outer_rim = new THREE.Mesh(outer_rim_geo, rim_mat);
  outer_rim.rotation.x = Math.PI / 2;
  outer_rim.position.y = 0.153;
  root.add(outer_rim);

  const inner_lip_geo = new THREE.TorusGeometry(0.455, 0.012, 10, 96);
  const inner_lip = new THREE.Mesh(inner_lip_geo, rim_mat);
  inner_lip.rotation.x = Math.PI / 2;
  inner_lip.position.y = -0.068;
  root.add(inner_lip);

  const bottom_foot_ring_geo = new THREE.TorusGeometry(0.345, 0.018, 10, 80);
  const bottom_foot_ring = new THREE.Mesh(bottom_foot_ring_geo, cast_iron_mat);
  bottom_foot_ring.rotation.x = Math.PI / 2;
  bottom_foot_ring.position.y = -0.108;
  root.add(bottom_foot_ring);

  const pour_spout_shape = new THREE.Shape();
  pour_spout_shape.moveTo(-0.125, -0.075);
  pour_spout_shape.lineTo(0.125, -0.075);
  pour_spout_shape.lineTo(0.105, 0.015);
  pour_spout_shape.lineTo(0.055, 0.105);
  pour_spout_shape.lineTo(0.000, 0.135);
  pour_spout_shape.lineTo(-0.055, 0.105);
  pour_spout_shape.lineTo(-0.105, 0.015);
  pour_spout_shape.closePath();
  const pour_spout_geom = new THREE.ExtrudeGeometry(pour_spout_shape, {
    depth: 0.045,
    steps: 1,
  });
  pour_spout_geom.rotateX(Math.PI / 2);

  const left_pour_spout = new THREE.Mesh(pour_spout_geom, rim_mat);
  left_pour_spout.position.set(-0.575, 0.158, 0);
  left_pour_spout.rotation.y = Math.PI;
  root.add(left_pour_spout);

  const right_pour_spout = new THREE.Mesh(pour_spout_geom, rim_mat);
  right_pour_spout.position.set(0.575, 0.158, 0);
  root.add(right_pour_spout);

  const handle_socket_geom = new THREE.SphereGeometry(0.16, 32, 16);
  const handle_socket = new THREE.Mesh(handle_socket_geom, cast_iron_mat);
  handle_socket.scale.set(0.95, 0.42, 1.15);
  handle_socket.position.set(0, 0.115, 0.545);
  root.add(handle_socket);

  const handle_shape = new THREE.Shape();
  handle_shape.moveTo(-0.155, -0.125);
  handle_shape.bezierCurveTo(-0.155, -0.02, -0.125, 0.10, -0.105, 0.20);
  handle_shape.lineTo(-0.085, 0.625);
  handle_shape.bezierCurveTo(-0.085, 0.705, -0.045, 0.755, 0.000, 0.765);
  handle_shape.bezierCurveTo(0.045, 0.755, 0.085, 0.705, 0.085, 0.625);
  handle_shape.lineTo(0.105, 0.20);
  handle_shape.bezierCurveTo(0.125, 0.10, 0.155, -0.02, 0.155, -0.125);
  handle_shape.closePath();

  const handle_hole = new THREE.Path();
  handle_hole.absellipse(0, 0.635, 0.034, 0.060, 0, Math.PI * 2, false, 0);
  handle_shape.holes.push(handle_hole);

  const handle_geom = new THREE.ExtrudeGeometry(handle_shape, {
    depth: 0.085,
    steps: 1,
    curveSegments: 24,
  });
  handle_geom.translate(0, 0, -0.0425);
  const handle = new THREE.Mesh(handle_geom, cast_iron_mat);
  handle.rotation.x = Math.PI / 2;
  handle.position.set(0, 0.135, 0.50);
  root.add(handle);

  const handle_edge_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.125, 0.181, 0.52),
    new THREE.Vector3(-0.095, 0.181, 0.78),
    new THREE.Vector3(-0.075, 0.181, 1.12),
    new THREE.Vector3(0.000, 0.181, 1.245),
    new THREE.Vector3(0.075, 0.181, 1.12),
    new THREE.Vector3(0.095, 0.181, 0.78),
    new THREE.Vector3(0.125, 0.181, 0.52),
  ], false, "centripetal");
  const handle_edge_ridge_geom = new THREE.TubeGeometry(handle_edge_curve, 64, 0.008, 8, false);
  const handle_edge_ridge = new THREE.Mesh(handle_edge_ridge_geom, rim_mat);
  root.add(handle_edge_ridge);

  const interior_texture_geom = new THREE.SphereGeometry(0.012, 8, 5);
  const interior_texture = new THREE.InstancedMesh(interior_texture_geom, texture_mat, 170);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 170; i++) {
    const angle = i * 2.3999632297;
    const radial = 0.045 + 0.365 * (((i * 37) % 173) / 172);
    const x = Math.cos(angle) * radial;
    const z = Math.sin(angle) * radial;
    const sx = 0.55 + ((i * 11) % 9) * 0.07;
    const sz = 0.55 + ((i * 17) % 8) * 0.08;
    dummy.position.set(x, -0.079, z);
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(sx, 0.18, sz);
    dummy.updateMatrix();
    interior_texture.setMatrixAt(i, dummy.matrix);
  }
  root.add(interior_texture);

  const wall_texture_geom = new THREE.SphereGeometry(0.011, 8, 5);
  const wall_texture = new THREE.InstancedMesh(wall_texture_geom, texture_mat, 120);
  for (let i = 0; i < 120; i++) {
    const angle = i * 2.3999632297 + 0.31;
    const t = ((i * 29) % 127) / 126;
    const radius = 0.455 + t * 0.105;
    const y = -0.055 + t * 0.185;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    dummy.position.set(normal.x * radius, y, normal.z * radius);
    dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    dummy.scale.set(0.65 + (i % 5) * 0.12, 0.55 + (i % 4) * 0.13, 0.18);
    dummy.updateMatrix();
    wall_texture.setMatrixAt(i, dummy.matrix);
  }
  root.add(wall_texture);

  const handle_texture_geom = new THREE.SphereGeometry(0.009, 8, 5);
  const handle_texture = new THREE.InstancedMesh(handle_texture_geom, texture_mat, 55);
  for (let i = 0; i < 55; i++) {
    const t = ((i * 19) % 59) / 58;
    const z = 0.56 + t * 0.58;
    const half_width = 0.125 - t * 0.035;
    const x = Math.sin(i * 2.17) * half_width * 0.72;
    dummy.position.set(x, 0.181, z);
    dummy.rotation.set(0, i * 0.41, 0);
    dummy.scale.set(0.75 + (i % 3) * 0.18, 0.16, 0.55 + (i % 4) * 0.12);
    dummy.updateMatrix();
    handle_texture.setMatrixAt(i, dummy.matrix);
  }
  root.add(handle_texture);

  const food_crumbs_geom = new THREE.DodecahedronGeometry(0.018, 0);
  const food_crumbs = new THREE.InstancedMesh(food_crumbs_geom, crumb_mat, 28);
  for (let i = 0; i < 28; i++) {
    const angle = i * 2.3999632297 + 0.8;
    const radial = 0.08 + 0.31 * (((i * 13) % 31) / 30);
    const x = Math.cos(angle) * radial;
    const z = Math.sin(angle) * radial;
    const s = 0.35 + ((i * 7) % 9) * 0.11;
    dummy.position.set(x, -0.066, z);
    dummy.rotation.set(i * 0.37, i * 0.61, i * 0.23);
    dummy.scale.set(s, s * 0.45, s * 0.85);
    dummy.updateMatrix();
    food_crumbs.setMatrixAt(i, dummy.matrix);
  }
  root.add(food_crumbs);

  const charred_bits_geom = new THREE.DodecahedronGeometry(0.013, 0);
  const charred_bits = new THREE.InstancedMesh(charred_bits_geom, dark_crumb_mat, 18);
  for (let i = 0; i < 18; i++) {
    const angle = i * 2.3999632297 + 1.7;
    const radial = 0.12 + 0.26 * (((i * 17) % 23) / 22);
    const x = Math.cos(angle) * radial;
    const z = Math.sin(angle) * radial;
    const s = 0.45 + ((i * 5) % 7) * 0.12;
    dummy.position.set(x, -0.064, z);
    dummy.rotation.set(i * 0.51, i * 0.29, i * 0.67);
    dummy.scale.set(s, s * 0.38, s);
    dummy.updateMatrix();
    charred_bits.setMatrixAt(i, dummy.matrix);
  }
  root.add(charred_bits);

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
    const scale = 0.95 / maxDim;
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
