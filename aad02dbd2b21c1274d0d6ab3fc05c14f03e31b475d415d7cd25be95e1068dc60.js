function __sn17_user(THREE) {
  const root = new THREE.Group();
  const vessel_group = new THREE.Group();
  const mechanism_group = new THREE.Group();
  const handle_group = new THREE.Group();
  root.add(vessel_group, mechanism_group, handle_group);

  const white_plastic_mat = new THREE.MeshStandardMaterial({
    color: 0xf4f3eb,
    metalness: 0.0,
    roughness: 0.35
  });
  const inset_plastic_mat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e1,
    metalness: 0.0,
    roughness: 0.4
  });
  const seam_mat = new THREE.MeshStandardMaterial({
    color: 0x8f918c,
    metalness: 0.0,
    roughness: 0.55
  });
  const dark_gasket_mat = new THREE.MeshStandardMaterial({
    color: 0x303435,
    metalness: 0.0,
    roughness: 0.7
  });
  const glass_mat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f0ef,
    transparent: true,
    opacity: 0.38,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const brushed_metal_mat = new THREE.MeshStandardMaterial({
    color: 0xaeb3b2,
    metalness: 0.45,
    roughness: 0.42
  });
  const silver_mat = new THREE.MeshStandardMaterial({
    color: 0xc8cbca,
    metalness: 0.5,
    roughness: 0.3
  });
  const dark_metal_mat = new THREE.MeshStandardMaterial({
    color: 0x5f6463,
    metalness: 0.45,
    roughness: 0.5
  });

  const base_skirt_profile = [
    new THREE.Vector2(0.00, -0.12),
    new THREE.Vector2(0.36, -0.12),
    new THREE.Vector2(0.42, -0.10),
    new THREE.Vector2(0.46, -0.05),
    new THREE.Vector2(0.47, 0.03),
    new THREE.Vector2(0.47, 0.34),
    new THREE.Vector2(0.46, 0.40),
    new THREE.Vector2(0.43, 0.44),
    new THREE.Vector2(0.00, 0.44)
  ];
  const base_skirt_geo = new THREE.LatheGeometry(base_skirt_profile, 64);
  const base_skirt = new THREE.Mesh(base_skirt_geo, white_plastic_mat);
  vessel_group.add(base_skirt);

  const base_seam_ring_geo = new THREE.TorusGeometry(0.462, 0.004, 8, 64);
  const base_seam_ring = new THREE.Mesh(base_seam_ring_geo, seam_mat);
  base_seam_ring.rotation.x = Math.PI / 2;
  base_seam_ring.position.y = 0.11;
  vessel_group.add(base_seam_ring);

  const bottom_shadow_ring_geo = new THREE.TorusGeometry(0.395, 0.006, 8, 64);
  const bottom_shadow_ring = new THREE.Mesh(bottom_shadow_ring_geo, dark_gasket_mat);
  bottom_shadow_ring.rotation.x = Math.PI / 2;
  bottom_shadow_ring.position.y = -0.112;
  vessel_group.add(bottom_shadow_ring);

  const glass_chamber_wall_geo = new THREE.CylinderGeometry(0.455, 0.455, 0.82, 64, 1, true);
  const glass_chamber_wall = new THREE.Mesh(glass_chamber_wall_geo, glass_mat);
  glass_chamber_wall.position.y = 0.83;
  vessel_group.add(glass_chamber_wall);

  const lower_dark_gasket_geo = new THREE.TorusGeometry(0.452, 0.008, 10, 64);
  const lower_dark_gasket = new THREE.Mesh(lower_dark_gasket_geo, dark_gasket_mat);
  lower_dark_gasket.rotation.x = Math.PI / 2;
  lower_dark_gasket.position.y = 0.425;
  vessel_group.add(lower_dark_gasket);

  const upper_dark_gasket_geo = new THREE.TorusGeometry(0.452, 0.008, 10, 64);
  const upper_dark_gasket = new THREE.Mesh(upper_dark_gasket_geo, dark_gasket_mat);
  upper_dark_gasket.rotation.x = Math.PI / 2;
  upper_dark_gasket.position.y = 1.235;
  vessel_group.add(upper_dark_gasket);

  const lower_silver_trim_geo = new THREE.TorusGeometry(0.442, 0.004, 8, 64);
  const lower_silver_trim = new THREE.Mesh(lower_silver_trim_geo, silver_mat);
  lower_silver_trim.rotation.x = Math.PI / 2;
  lower_silver_trim.position.y = 0.445;
  vessel_group.add(lower_silver_trim);

  const lid_profile = [
    new THREE.Vector2(0.00, 1.235),
    new THREE.Vector2(0.42, 1.235),
    new THREE.Vector2(0.47, 1.255),
    new THREE.Vector2(0.49, 1.300),
    new THREE.Vector2(0.49, 1.385),
    new THREE.Vector2(0.47, 1.425),
    new THREE.Vector2(0.40, 1.455),
    new THREE.Vector2(0.20, 1.468),
    new THREE.Vector2(0.00, 1.468)
  ];
  const lid_geo = new THREE.LatheGeometry(lid_profile, 64);
  const lid = new THREE.Mesh(lid_geo, white_plastic_mat);
  vessel_group.add(lid);

  const lid_inset_disc_geo = new THREE.CylinderGeometry(0.19, 0.19, 0.008, 48);
  const lid_inset_disc = new THREE.Mesh(lid_inset_disc_geo, inset_plastic_mat);
  lid_inset_disc.position.y = 1.472;
  vessel_group.add(lid_inset_disc);

  const lid_inset_ring_geo = new THREE.TorusGeometry(0.19, 0.006, 8, 48);
  const lid_inset_ring = new THREE.Mesh(lid_inset_ring_geo, seam_mat);
  lid_inset_ring.rotation.x = Math.PI / 2;
  lid_inset_ring.position.y = 1.477;
  vessel_group.add(lid_inset_ring);

  const handle_shape = new THREE.Shape();
  handle_shape.moveTo(0.38, 0.36);
  handle_shape.lineTo(0.72, 0.36);
  handle_shape.bezierCurveTo(0.98, 0.36, 1.09, 0.52, 1.09, 0.78);
  handle_shape.lineTo(1.09, 1.16);
  handle_shape.bezierCurveTo(1.09, 1.40, 0.96, 1.52, 0.72, 1.52);
  handle_shape.lineTo(0.38, 1.52);
  handle_shape.closePath();

  const handle_opening = new THREE.Path();
  handle_opening.moveTo(0.51, 0.54);
  handle_opening.lineTo(0.51, 1.34);
  handle_opening.lineTo(0.69, 1.34);
  handle_opening.bezierCurveTo(0.84, 1.34, 0.91, 1.26, 0.91, 1.10);
  handle_opening.lineTo(0.91, 0.74);
  handle_opening.bezierCurveTo(0.91, 0.59, 0.83, 0.52, 0.68, 0.52);
  handle_opening.lineTo(0.51, 0.54);
  handle_shape.holes.push(handle_opening);

  const handle_body_geo = new THREE.ExtrudeGeometry(handle_shape, 20);
  handle_body_geo.translate(0, 0, -0.13);
  const handle_body = new THREE.Mesh(handle_body_geo, white_plastic_mat);
  handle_group.add(handle_body);

  const handle_inner_seam_points = [
    new THREE.Vector3(0.51, 0.54, 0.137),
    new THREE.Vector3(0.68, 0.52, 0.137),
    new THREE.Vector3(0.84, 0.58, 0.137),
    new THREE.Vector3(0.91, 0.74, 0.137),
    new THREE.Vector3(0.91, 1.10, 0.137),
    new THREE.Vector3(0.84, 1.26, 0.137),
    new THREE.Vector3(0.69, 1.34, 0.137),
    new THREE.Vector3(0.51, 1.34, 0.137)
  ];
  const handle_inner_seam_curve = new THREE.CatmullRomCurve3(
    handle_inner_seam_points,
    true,
    "centripetal"
  );
  const handle_inner_seam_geo = new THREE.TubeGeometry(
    handle_inner_seam_curve,
    64,
    0.005,
    8,
    true
  );
  const handle_inner_seam = new THREE.Mesh(handle_inner_seam_geo, seam_mat);
  handle_group.add(handle_inner_seam);

  const handle_mount_geom = new THREE.SphereGeometry(0.13, 24, 16);

  const upper_handle_mount = new THREE.Mesh(handle_mount_geom, white_plastic_mat);
  upper_handle_mount.scale.set(0.75, 1.0, 0.85);
  upper_handle_mount.position.set(0.43, 1.40, 0);
  handle_group.add(upper_handle_mount);

  const lower_handle_mount = new THREE.Mesh(handle_mount_geom, white_plastic_mat);
  lower_handle_mount.scale.set(0.75, 1.0, 0.85);
  lower_handle_mount.position.set(0.43, 0.47, 0);
  handle_group.add(lower_handle_mount);

  const metal_floor_plate_geom = new THREE.CylinderGeometry(0.39, 0.39, 0.018, 64);
  const metal_floor_plate = new THREE.Mesh(metal_floor_plate_geom, brushed_metal_mat);
  metal_floor_plate.position.y = 0.455;
  mechanism_group.add(metal_floor_plate);

  const floor_plate_rim_geom = new THREE.TorusGeometry(0.36, 0.006, 8, 64);
  const floor_plate_rim = new THREE.Mesh(floor_plate_rim_geom, silver_mat);
  floor_plate_rim.rotation.x = Math.PI / 2;
  floor_plate_rim.position.y = 0.468;
  mechanism_group.add(floor_plate_rim);

  const central_column_geom = new THREE.CylinderGeometry(0.085, 0.12, 0.62, 40);
  const central_column = new THREE.Mesh(central_column_geom, brushed_metal_mat);
  central_column.position.y = 0.78;
  mechanism_group.add(central_column);

  const column_base_collar_geom = new THREE.CylinderGeometry(0.14, 0.14, 0.035, 40);
  const column_base_collar = new THREE.Mesh(column_base_collar_geom, silver_mat);
  column_base_collar.position.y = 0.485;
  mechanism_group.add(column_base_collar);

  const column_top_cap_geom = new THREE.CylinderGeometry(0.09, 0.09, 0.025, 32);
  const column_top_cap = new THREE.Mesh(column_top_cap_geom, dark_metal_mat);
  column_top_cap.position.y = 1.095;
  mechanism_group.add(column_top_cap);

  const angled_head_shape = new THREE.Shape();
  angled_head_shape.moveTo(-0.075, 0.00);
  angled_head_shape.lineTo(0.095, 0.00);
  angled_head_shape.lineTo(0.095, 0.30);
  angled_head_shape.lineTo(-0.095, 0.225);
  angled_head_shape.lineTo(-0.145, 0.165);
  angled_head_shape.lineTo(-0.075, 0.105);
  angled_head_shape.closePath();

  const angled_head_geom = new THREE.ExtrudeGeometry(angled_head_shape, 12);
  angled_head_geom.translate(0, 0, -0.055);
  const angled_head = new THREE.Mesh(angled_head_geom, brushed_metal_mat);
  angled_head.position.y = 1.045;
  mechanism_group.add(angled_head);

  const head_pivot_pin_geom = new THREE.CylinderGeometry(0.022, 0.022, 0.13, 20);
  const head_pivot_pin = new THREE.Mesh(head_pivot_pin_geom, dark_metal_mat);
  head_pivot_pin.rotation.x = Math.PI / 2;
  head_pivot_pin.position.set(-0.075, 1.245, 0);
  mechanism_group.add(head_pivot_pin);

  const diagonal_linkage_curve = new THREE.LineCurve3(
    new THREE.Vector3(0.075, 0.90, 0.055),
    new THREE.Vector3(0.305, 0.665, 0.055)
  );
  const diagonal_linkage_geom = new THREE.TubeGeometry(
    diagonal_linkage_curve,
    1,
    0.018,
    8,
    false
  );
  const diagonal_linkage = new THREE.Mesh(diagonal_linkage_geom, silver_mat);
  mechanism_group.add(diagonal_linkage);

  const linkage_pivot_pin_geom = new THREE.CylinderGeometry(0.025, 0.025, 0.12, 20);
  const linkage_pivot_pin = new THREE.Mesh(linkage_pivot_pin_geom, dark_metal_mat);
  linkage_pivot_pin.rotation.x = Math.PI / 2;
  linkage_pivot_pin.position.set(0.075, 0.90, 0.055);
  mechanism_group.add(linkage_pivot_pin);

  const linkage_end_pin_geom = new THREE.CylinderGeometry(0.018, 0.018, 0.11, 18);
  const linkage_end_pin = new THREE.Mesh(linkage_end_pin_geom, dark_metal_mat);
  linkage_end_pin.rotation.x = Math.PI / 2;
  linkage_end_pin.position.set(0.305, 0.665, 0.055);
  mechanism_group.add(linkage_end_pin);

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
