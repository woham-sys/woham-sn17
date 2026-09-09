function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "blue_hose_assembly";

  const blue_plastic_mat = new THREE.MeshStandardMaterial({
    color: 0x0864c9,
    metalness: false,
    roughness: 0.32,
  });
  const dark_blue_plastic_mat = new THREE.MeshStandardMaterial({
    color: 0x064b9a,
    metalness: false,
    roughness: 0.38,
  });
  const inner_shadow_mat = new THREE.MeshStandardMaterial({
    color: 0x011d4b,
    metalness: false,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });

  const hose_radius = 0.055;

  const main_hose_points = [
    new THREE.Vector3(-0.96, -0.25, 0.070),
    new THREE.Vector3(-0.72, -0.22, 0.015),
    new THREE.Vector3(-0.45, -0.17, -0.025),
    new THREE.Vector3(-0.12, -0.18, -0.035),
    new THREE.Vector3(0.22, -0.16, -0.025),
    new THREE.Vector3(0.52, -0.08, -0.005),
    new THREE.Vector3(0.72, 0.08, 0.010),
    new THREE.Vector3(0.82, 0.28, 0.015),
    new THREE.Vector3(0.79, 0.48, 0.010),
    new THREE.Vector3(0.68, 0.68, 0.000),
    new THREE.Vector3(0.56, 0.84, -0.010),
  ];
  const main_hose_curve = new THREE.CatmullRomCurve3(main_hose_points, false, "centripetal");
  const main_hose_geom = new THREE.TubeGeometry(main_hose_curve, 96, hose_radius, 24, false);
  const main_hose = new THREE.Mesh(main_hose_geom, blue_plastic_mat);
  main_hose.name = "main_hose";
  root.add(main_hose);

  const branch_hose_points = [
    new THREE.Vector3(-0.96, -0.25, 0.075),
    new THREE.Vector3(-0.82, -0.20, 0.045),
    new THREE.Vector3(-0.68, -0.10, 0.015),
    new THREE.Vector3(-0.57, 0.00, -0.005),
  ];
  const branch_hose_curve = new THREE.CatmullRomCurve3(branch_hose_points, false, "centripetal");
  const branch_hose_geom = new THREE.TubeGeometry(branch_hose_curve, 32, hose_radius * 0.92, 24, false);
  const branch_hose = new THREE.Mesh(branch_hose_geom, blue_plastic_mat);
  branch_hose.name = "branch_hose";
  root.add(branch_hose);

  const left_coupling = new THREE.Group();
  left_coupling.name = "left_coupling";
  const left_endpoint = main_hose_points[0];
  const left_inward = main_hose_points[1].clone().sub(left_endpoint).normalize();
  left_coupling.position.copy(left_endpoint);
  left_coupling.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), left_inward);
  root.add(left_coupling);

  const left_coupling_body_geom = new THREE.CylinderGeometry(0.095, 0.095, 0.14, 40, 1, true);
  const left_coupling_body = new THREE.Mesh(left_coupling_body_geom, blue_plastic_mat);
  left_coupling_body.name = "left_coupling_body";
  left_coupling_body.rotation.x = Math.PI / 2;
  left_coupling_body.position.z = 0.07;
  left_coupling.add(left_coupling_body);

  const left_coupling_rear_band_geom = new THREE.CylinderGeometry(0.078, 0.078, 0.055, 40, 1, true);
  const left_coupling_rear_band = new THREE.Mesh(left_coupling_rear_band_geom, blue_plastic_mat);
  left_coupling_rear_band.name = "left_coupling_rear_band";
  left_coupling_rear_band.rotation.x = Math.PI / 2;
  left_coupling_rear_band.position.z = 0.005;
  left_coupling.add(left_coupling_rear_band);

  const left_coupling_front_lip_geom = new THREE.TorusGeometry(0.081, 0.014, 12, 40);
  const left_coupling_front_lip = new THREE.Mesh(left_coupling_front_lip_geom, blue_plastic_mat);
  left_coupling_front_lip.name = "left_coupling_front_lip";
  left_coupling_front_lip.position.z = 0.145;
  left_coupling.add(left_coupling_front_lip);

  const left_inner_wall_geom = new THREE.CylinderGeometry(0.068, 0.068, 0.055, 40, 1, true);
  const left_inner_wall = new THREE.Mesh(left_inner_wall_geom, inner_shadow_mat);
  left_inner_wall.name = "left_inner_wall";
  left_inner_wall.rotation.x = Math.PI / 2;
  left_inner_wall.position.z = 0.118;
  left_coupling.add(left_inner_wall);

  const left_opening_shadow_geom = new THREE.CircleGeometry(0.067, 40);
  const left_opening_shadow = new THREE.Mesh(left_opening_shadow_geom, inner_shadow_mat);
  left_opening_shadow.name = "left_opening_shadow";
  left_opening_shadow.position.z = 0.091;
  left_coupling.add(left_opening_shadow);

  const left_thread_rings_geom = new THREE.TorusGeometry(0.061, 0.0035, 8, 32);
  const left_thread_rings = new THREE.InstancedMesh(left_thread_rings_geom, dark_blue_plastic_mat, 3);
  left_thread_rings.name = "left_thread_rings";
  const left_thread_dummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    left_thread_dummy.position.set(0, 0, 0.108 + i * 0.014);
    left_thread_dummy.updateMatrix();
    left_thread_rings.setMatrixAt(i, left_thread_dummy.matrix);
  }
  left_thread_rings.instanceMatrix.needsUpdate = true;
  left_coupling.add(left_thread_rings);

  const left_grip_ribs_geom = new THREE.BoxGeometry(0.012, 0.018, 0.070);
  const left_grip_ribs = new THREE.InstancedMesh(left_grip_ribs_geom, dark_blue_plastic_mat, 12);
  left_grip_ribs.name = "left_grip_ribs";
  const left_rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    left_rib_dummy.position.set(Math.cos(angle) * 0.096, Math.sin(angle) * 0.096, 0.075);
    left_rib_dummy.rotation.set(0, 0, angle);
    left_rib_dummy.updateMatrix();
    left_grip_ribs.setMatrixAt(i, left_rib_dummy.matrix);
  }
  left_grip_ribs.instanceMatrix.needsUpdate = true;
  left_coupling.add(left_grip_ribs);

  const branch_coupling = new THREE.Group();
  branch_coupling.name = "branch_coupling";
  const branch_endpoint = branch_hose_points[branch_hose_points.length - 1];
  const branch_outward = branch_endpoint.clone().sub(branch_hose_points[branch_hose_points.length - 2]).normalize();
  branch_coupling.position.copy(branch_endpoint);
  branch_coupling.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), branch_outward);
  root.add(branch_coupling);

  const branch_coupling_body_geom = new THREE.CylinderGeometry(0.083, 0.083, 0.125, 40, 1, true);
  const branch_coupling_body = new THREE.Mesh(branch_coupling_body_geom, blue_plastic_mat);
  branch_coupling_body.name = "branch_coupling_body";
  branch_coupling_body.rotation.x = Math.PI / 2;
  branch_coupling_body.position.z = 0.062;
  branch_coupling.add(branch_coupling_body);

  const branch_coupling_rear_band_geom = new THREE.CylinderGeometry(0.068, 0.068, 0.050, 40, 1, true);
  const branch_coupling_rear_band = new THREE.Mesh(branch_coupling_rear_band_geom, blue_plastic_mat);
  branch_coupling_rear_band.name = "branch_coupling_rear_band";
  branch_coupling_rear_band.rotation.x = Math.PI / 2;
  branch_coupling_rear_band.position.z = 0.002;
  branch_coupling.add(branch_coupling_rear_band);

  const branch_coupling_front_lip_geom = new THREE.TorusGeometry(0.070, 0.012, 12, 40);
  const branch_coupling_front_lip = new THREE.Mesh(branch_coupling_front_lip_geom, blue_plastic_mat);
  branch_coupling_front_lip.name = "branch_coupling_front_lip";
  branch_coupling_front_lip.position.z = 0.130;
  branch_coupling.add(branch_coupling_front_lip);

  const branch_inner_wall_geom = new THREE.CylinderGeometry(0.058, 0.058, 0.045, 40, 1, true);
  const branch_inner_wall = new THREE.Mesh(branch_inner_wall_geom, inner_shadow_mat);
  branch_inner_wall.name = "branch_inner_wall";
  branch_inner_wall.rotation.x = Math.PI / 2;
  branch_inner_wall.position.z = 0.108;
  branch_coupling.add(branch_inner_wall);

  const branch_opening_shadow_geom = new THREE.CircleGeometry(0.057, 40);
  const branch_opening_shadow = new THREE.Mesh(branch_opening_shadow_geom, inner_shadow_mat);
  branch_opening_shadow.name = "branch_opening_shadow";
  branch_opening_shadow.position.z = 0.086;
  branch_coupling.add(branch_opening_shadow);

  const branch_thread_ring_geom = new THREE.TorusGeometry(0.052, 0.003, 8, 32);
  const branch_thread_ring = new THREE.Mesh(branch_thread_ring_geom, dark_blue_plastic_mat);
  branch_thread_ring.name = "branch_thread_ring";
  branch_thread_ring.position.z = 0.103;
  branch_coupling.add(branch_thread_ring);

  const upper_nozzle = new THREE.Group();
  upper_nozzle.name = "upper_nozzle";
  const upper_endpoint = main_hose_points[main_hose_points.length - 1];
  const upper_tangent = upper_endpoint.clone().sub(main_hose_points[main_hose_points.length - 2]).normalize();
  upper_nozzle.position.copy(upper_endpoint);
  upper_nozzle.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), upper_tangent);
  root.add(upper_nozzle);

  const upper_adapter_geom = new THREE.CylinderGeometry(0.075, 0.061, 0.145, 40, 1, true);
  const upper_adapter = new THREE.Mesh(upper_adapter_geom, blue_plastic_mat);
  upper_adapter.name = "upper_adapter";
  upper_adapter.rotation.x = Math.PI / 2;
  upper_adapter.position.z = 0.072;
  upper_nozzle.add(upper_adapter);

  const upper_adapter_rear_ring_geom = new THREE.TorusGeometry(0.061, 0.007, 10, 40);
  const upper_adapter_rear_ring = new THREE.Mesh(upper_adapter_rear_ring_geom, dark_blue_plastic_mat);
  upper_adapter_rear_ring.name = "upper_adapter_rear_ring";
  upper_adapter_rear_ring.position.z = 0.012;
  upper_nozzle.add(upper_adapter_rear_ring);

  const upper_nozzle_body_geom = new THREE.CylinderGeometry(0.108, 0.075, 0.190, 40, 1, true);
  const upper_nozzle_body = new THREE.Mesh(upper_nozzle_body_geom, blue_plastic_mat);
  upper_nozzle_body.name = "upper_nozzle_body";
  upper_nozzle_body.rotation.x = Math.PI / 2;
  upper_nozzle_body.position.z = 0.215;
  upper_nozzle.add(upper_nozzle_body);

  const upper_nozzle_rear_band_geom = new THREE.TorusGeometry(0.076, 0.008, 10, 40);
  const upper_nozzle_rear_band = new THREE.Mesh(upper_nozzle_rear_band_geom, dark_blue_plastic_mat);
  upper_nozzle_rear_band.name = "upper_nozzle_rear_band";
  upper_nozzle_rear_band.position.z = 0.126;
  upper_nozzle.add(upper_nozzle_rear_band);

  const upper_nozzle_front_lip_geom = new THREE.TorusGeometry(0.095, 0.013, 12, 40);
  const upper_nozzle_front_lip = new THREE.Mesh(upper_nozzle_front_lip_geom, blue_plastic_mat);
  upper_nozzle_front_lip.name = "upper_nozzle_front_lip";
  upper_nozzle_front_lip.position.z = 0.315;
  upper_nozzle.add(upper_nozzle_front_lip);

  const upper_inner_wall_geom = new THREE.CylinderGeometry(0.081, 0.081, 0.060, 40, 1, true);
  const upper_inner_wall = new THREE.Mesh(upper_inner_wall_geom, inner_shadow_mat);
  upper_inner_wall.name = "upper_inner_wall";
  upper_inner_wall.rotation.x = Math.PI / 2;
  upper_inner_wall.position.z = 0.286;
  upper_nozzle.add(upper_inner_wall);

  const upper_opening_shadow_geom = new THREE.CircleGeometry(0.080, 40);
  const upper_opening_shadow = new THREE.Mesh(upper_opening_shadow_geom, inner_shadow_mat);
  upper_opening_shadow.name = "upper_opening_shadow";
  upper_opening_shadow.position.z = 0.255;
  upper_nozzle.add(upper_opening_shadow);

  const upper_thread_rings_geom = new THREE.TorusGeometry(0.074, 0.0035, 8, 32);
  const upper_thread_rings = new THREE.InstancedMesh(upper_thread_rings_geom, dark_blue_plastic_mat, 3);
  upper_thread_rings.name = "upper_thread_rings";
  const upper_thread_dummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    upper_thread_dummy.position.set(0, 0, 0.270 + i * 0.014);
    upper_thread_dummy.updateMatrix();
    upper_thread_rings.setMatrixAt(i, upper_thread_dummy.matrix);
  }
  upper_thread_rings.instanceMatrix.needsUpdate = true;
  upper_nozzle.add(upper_thread_rings);

  const upper_grip_ribs_geom = new THREE.BoxGeometry(0.012, 0.017, 0.060);
  const upper_grip_ribs = new THREE.InstancedMesh(upper_grip_ribs_geom, dark_blue_plastic_mat, 10);
  upper_grip_ribs.name = "upper_grip_ribs";
  const upper_rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 10; i++) {
    const angle = i / 10 * Math.PI * 2;
    upper_rib_dummy.position.set(Math.cos(angle) * 0.097, Math.sin(angle) * 0.097, 0.245);
    upper_rib_dummy.rotation.set(0, 0, angle);
    upper_rib_dummy.updateMatrix();
    upper_grip_ribs.setMatrixAt(i, upper_rib_dummy.matrix);
  }
  upper_grip_ribs.instanceMatrix.needsUpdate = true;
  upper_nozzle.add(upper_grip_ribs);

  const upper_side_tab_shape = new THREE.Shape();
  upper_side_tab_shape.moveTo(-0.050, 0.035);
  upper_side_tab_shape.lineTo(0.050, 0.035);
  upper_side_tab_shape.lineTo(0.035, -0.045);
  upper_side_tab_shape.lineTo(0.000, -0.070);
  upper_side_tab_shape.lineTo(-0.035, -0.045);
  upper_side_tab_shape.closePath();

  const upper_side_tab_geom = new THREE.ExtrudeGeometry(upper_side_tab_shape, {
    depth: 0.014,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  const upper_side_tab = new THREE.Mesh(upper_side_tab_geom, blue_plastic_mat);
  upper_side_tab.name = "upper_side_tab";
  upper_side_tab.position.set(0, -0.075, 0.205);
  upper_nozzle.add(upper_side_tab);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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
