// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "handled_bowl";

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf3f1e9,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const vessel_group = new THREE.Group();
  vessel_group.name = "vessel_group";
  root.add(vessel_group);

  const bowl_bodyProfile = [
    new THREE.Vector2(0.00, -0.390),
    new THREE.Vector2(0.28, -0.390),
    new THREE.Vector2(0.42, -0.350),
    new THREE.Vector2(0.56, -0.250),
    new THREE.Vector2(0.68, -0.080),
    new THREE.Vector2(0.77, 0.140),
    new THREE.Vector2(0.83, 0.360),
    new THREE.Vector2(0.85, 0.490),
    new THREE.Vector2(0.84, 0.535),
    new THREE.Vector2(0.79, 0.565),
    new THREE.Vector2(0.735, 0.545),
    new THREE.Vector2(0.710, 0.485),
    new THREE.Vector2(0.680, 0.310),
    new THREE.Vector2(0.610, 0.080),
    new THREE.Vector2(0.500, -0.120),
    new THREE.Vector2(0.360, -0.250),
    new THREE.Vector2(0.180, -0.300),
    new THREE.Vector2(0.00, -0.310),
  ];
  const bowl_bodyGeom = new THREE.LatheGeometry(bowl_bodyProfile, 64);
  const bowl_body = new THREE.Mesh(bowl_bodyGeom, ceramicMat);
  bowl_body.name = "bowl_body";
  vessel_group.add(bowl_body);

  const rolled_rimGeom = new THREE.TorusGeometry(0.79, 0.085, 18, 64);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, ceramicMat);
  rolled_rim.name = "rolled_rim";
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 0.535;
  vessel_group.add(rolled_rim);

  const pedestal_group = new THREE.Group();
  pedestal_group.name = "pedestal_group";
  root.add(pedestal_group);

  const pedestal_footProfile = [
    new THREE.Vector2(0.00, -0.600),
    new THREE.Vector2(0.40, -0.600),
    new THREE.Vector2(0.49, -0.585),
    new THREE.Vector2(0.55, -0.550),
    new THREE.Vector2(0.56, -0.515),
    new THREE.Vector2(0.53, -0.475),
    new THREE.Vector2(0.46, -0.435),
    new THREE.Vector2(0.37, -0.400),
    new THREE.Vector2(0.00, -0.400),
  ];
  const pedestal_footGeom = new THREE.LatheGeometry(pedestal_footProfile, 64);
  const pedestal_foot = new THREE.Mesh(pedestal_footGeom, ceramicMat);
  pedestal_foot.name = "pedestal_foot";
  pedestal_group.add(pedestal_foot);

  const foot_edgeGeom = new THREE.TorusGeometry(0.505, 0.035, 14, 64);
  const foot_edge = new THREE.Mesh(foot_edgeGeom, ceramicMat);
  foot_edge.name = "foot_edge";
  foot_edge.rotation.x = Math.PI / 2;
  foot_edge.position.y = -0.555;
  pedestal_group.add(foot_edge);

  const foot_collarGeom = new THREE.TorusGeometry(0.395, 0.032, 14, 64);
  const foot_collar = new THREE.Mesh(foot_collarGeom, ceramicMat);
  foot_collar.name = "foot_collar";
  foot_collar.rotation.x = Math.PI / 2;
  foot_collar.position.y = -0.405;
  pedestal_group.add(foot_collar);

  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";
  root.add(handle_group);

  const handlePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.780, 0.420, 0.000),
      new THREE.Vector3(0.890, 0.470, 0.000),
      new THREE.Vector3(1.040, 0.470, 0.000),
      new THREE.Vector3(1.170, 0.390, 0.000),
      new THREE.Vector3(1.220, 0.250, 0.000),
      new THREE.Vector3(1.180, 0.100, 0.000),
      new THREE.Vector3(1.060, -0.020, 0.000),
      new THREE.Vector3(0.880, -0.100, 0.000),
      new THREE.Vector3(0.660, -0.140, 0.000),
    ],
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(handlePath, 48, 0.075, 16, false);
  const handle = new THREE.Mesh(handleGeom, ceramicMat);
  handle.name = "handle";
  handle_group.add(handle);

  const handle_mountGeom = new THREE.SphereGeometry(0.10, 24, 16);

  const upper_handle_mount = new THREE.Mesh(handle_mountGeom, ceramicMat);
  upper_handle_mount.name = "upper_handle_mount";
  upper_handle_mount.position.set(0.790, 0.415, 0);
  upper_handle_mount.scale.set(1.15, 0.82, 1.0);
  handle_group.add(upper_handle_mount);

  const lower_handle_mount = new THREE.Mesh(handle_mountGeom, ceramicMat);
  lower_handle_mount.name = "lower_handle_mount";
  lower_handle_mount.position.set(0.660, -0.135, 0);
  lower_handle_mount.scale.set(1.35, 0.72, 1.0);
  handle_group.add(lower_handle_mount);

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

  fitToUnitCube(THREE, root);
  return root;
}