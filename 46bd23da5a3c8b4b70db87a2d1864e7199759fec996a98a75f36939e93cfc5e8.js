export default function generate(THREE) {
  const root = new THREE.Group();

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.02,
    transmission: 0.98,
    ior: 1.5,
    thickness: 0.035,
    transparent: true,
    opacity: 0.32,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const edgeGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x707878,
    metalness: 0.0,
    roughness: 0.025,
    transmission: 0.9,
    ior: 1.5,
    thickness: 0.07,
    transparent: true,
    opacity: 0.52,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.200, 0.000),
    new THREE.Vector2(0.270, 0.008),
    new THREE.Vector2(0.310, 0.025),
    new THREE.Vector2(0.335, 0.060),
    new THREE.Vector2(0.350, 0.110),
    new THREE.Vector2(0.357, 0.170),
    new THREE.Vector2(0.358, 0.230),
    new THREE.Vector2(0.352, 0.300),
    new THREE.Vector2(0.338, 0.370),
    new THREE.Vector2(0.316, 0.440),
    new THREE.Vector2(0.288, 0.510),
    new THREE.Vector2(0.255, 0.580),
    new THREE.Vector2(0.222, 0.650),
    new THREE.Vector2(0.190, 0.720),
    new THREE.Vector2(0.160, 0.790),
    new THREE.Vector2(0.135, 0.850),
    new THREE.Vector2(0.116, 0.900),
    new THREE.Vector2(0.104, 0.940),
    new THREE.Vector2(0.099, 0.980),
    new THREE.Vector2(0.098, 1.020),
    new THREE.Vector2(0.098, 1.050),
    new THREE.Vector2(0.084, 1.050),
    new THREE.Vector2(0.084, 1.020),
    new THREE.Vector2(0.085, 0.980),
    new THREE.Vector2(0.090, 0.940),
    new THREE.Vector2(0.101, 0.900),
    new THREE.Vector2(0.120, 0.850),
    new THREE.Vector2(0.145, 0.790),
    new THREE.Vector2(0.175, 0.720),
    new THREE.Vector2(0.207, 0.650),
    new THREE.Vector2(0.240, 0.580),
    new THREE.Vector2(0.272, 0.510),
    new THREE.Vector2(0.299, 0.440),
    new THREE.Vector2(0.320, 0.370),
    new THREE.Vector2(0.333, 0.300),
    new THREE.Vector2(0.339, 0.230),
    new THREE.Vector2(0.338, 0.170),
    new THREE.Vector2(0.331, 0.110),
    new THREE.Vector2(0.315, 0.065),
    new THREE.Vector2(0.290, 0.040),
    new THREE.Vector2(0.250, 0.030),
    new THREE.Vector2(0.180, 0.026),
    new THREE.Vector2(0.000, 0.026)
  ];

  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, glassMat);
  root.add(body);

  const rolled_lipProfile = [
    new THREE.Vector2(0.098, 1.018),
    new THREE.Vector2(0.105, 1.023),
    new THREE.Vector2(0.118, 1.032),
    new THREE.Vector2(0.127, 1.045),
    new THREE.Vector2(0.129, 1.058),
    new THREE.Vector2(0.125, 1.073),
    new THREE.Vector2(0.115, 1.084),
    new THREE.Vector2(0.103, 1.088),
    new THREE.Vector2(0.091, 1.086),
    new THREE.Vector2(0.084, 1.079),
    new THREE.Vector2(0.082, 1.068),
    new THREE.Vector2(0.084, 1.057),
    new THREE.Vector2(0.090, 1.049),
    new THREE.Vector2(0.098, 1.046),
    new THREE.Vector2(0.108, 1.047),
    new THREE.Vector2(0.113, 1.052),
    new THREE.Vector2(0.114, 1.059),
    new THREE.Vector2(0.110, 1.067),
    new THREE.Vector2(0.102, 1.072),
    new THREE.Vector2(0.092, 1.073),
    new THREE.Vector2(0.086, 1.068),
    new THREE.Vector2(0.086, 1.058),
    new THREE.Vector2(0.090, 1.050),
    new THREE.Vector2(0.098, 1.046),
    new THREE.Vector2(0.098, 1.018)
  ];
  const rolled_lipGeom = new THREE.LatheGeometry(rolled_lipProfile, 64);
  const rolled_lip = new THREE.Mesh(rolled_lipGeom, glassMat);
  root.add(rolled_lip);

  const neck_collarGeom = new THREE.TorusGeometry(0.103, 0.004, 10, 64);
  const neck_collar = new THREE.Mesh(neck_collarGeom, edgeGlassMat);
  neck_collar.rotation.x = Math.PI / 2;
  neck_collar.position.y = 1.023;
  root.add(neck_collar);

  const mouth_rimGeom = new THREE.RingGeometry(0.086, 0.101, 64);
  const mouth_rim = new THREE.Mesh(mouth_rimGeom, edgeGlassMat);
  mouth_rim.rotation.x = Math.PI / 2;
  mouth_rim.position.y = 1.087;
  root.add(mouth_rim);

  const inner_mouth_wallGeom = new THREE.CylinderGeometry(
    0.086,
    0.086,
    0.026,
    64,
    1,
    true
  );
  const inner_mouth_wall = new THREE.Mesh(inner_mouth_wallGeom, edgeGlassMat);
  inner_mouth_wall.position.y = 1.073;
  root.add(inner_mouth_wall);

  const base_ringGeom = new THREE.TorusGeometry(0.286, 0.010, 12, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, edgeGlassMat);
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.022;
  root.add(base_ring);

  const inner_base_ringGeom = new THREE.TorusGeometry(0.220, 0.004, 8, 64);
  const inner_base_ring = new THREE.Mesh(inner_base_ringGeom, edgeGlassMat);
  inner_base_ring.rotation.x = Math.PI / 2;
  inner_base_ring.position.y = 0.031;
  root.add(inner_base_ring);

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