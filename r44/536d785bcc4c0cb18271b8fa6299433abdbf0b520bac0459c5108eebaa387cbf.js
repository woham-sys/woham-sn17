// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x9ed9e8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const rimMat = new THREE.MeshPhysicalMaterial({
    color: 0x3155b8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const pedestalMat = new THREE.MeshPhysicalMaterial({
    color: 0xb7dce5,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const pedestalProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.34, 0.00),
    new THREE.Vector2(0.40, 0.012),
    new THREE.Vector2(0.44, 0.055),
    new THREE.Vector2(0.43, 0.125),
    new THREE.Vector2(0.39, 0.195),
    new THREE.Vector2(0.34, 0.230),
    new THREE.Vector2(0.00, 0.230),
  ];
  const pedestalGeom = new THREE.LatheGeometry(pedestalProfile, 64);
  const pedestal = new THREE.Mesh(pedestalGeom, pedestalMat);
  root.add(pedestal);

  const pedestal_bottom_rimGeom = new THREE.TorusGeometry(0.385, 0.010, 10, 64);
  const pedestal_bottom_rim = new THREE.Mesh(pedestal_bottom_rimGeom, rimMat);
  pedestal_bottom_rim.rotation.x = Math.PI / 2;
  pedestal_bottom_rim.position.y = 0.012;
  root.add(pedestal_bottom_rim);

  const bodyProfile = [
    new THREE.Vector2(0.00, 0.190),
    new THREE.Vector2(0.29, 0.190),
    new THREE.Vector2(0.37, 0.210),
    new THREE.Vector2(0.43, 0.250),
    new THREE.Vector2(0.46, 0.320),
    new THREE.Vector2(0.45, 0.400),
    new THREE.Vector2(0.41, 0.520),
    new THREE.Vector2(0.36, 0.680),
    new THREE.Vector2(0.31, 0.850),
    new THREE.Vector2(0.26, 1.020),
    new THREE.Vector2(0.22, 1.180),
    new THREE.Vector2(0.20, 1.340),
    new THREE.Vector2(0.20, 1.490),
    new THREE.Vector2(0.215, 1.620),
    new THREE.Vector2(0.245, 1.740),
    new THREE.Vector2(0.290, 1.840),
    new THREE.Vector2(0.320, 1.875),
    new THREE.Vector2(0.300, 1.895),
    new THREE.Vector2(0.270, 1.860),
    new THREE.Vector2(0.235, 1.780),
    new THREE.Vector2(0.195, 1.640),
    new THREE.Vector2(0.175, 1.490),
    new THREE.Vector2(0.175, 1.340),
    new THREE.Vector2(0.195, 1.180),
    new THREE.Vector2(0.235, 1.020),
    new THREE.Vector2(0.285, 0.850),
    new THREE.Vector2(0.335, 0.680),
    new THREE.Vector2(0.385, 0.520),
    new THREE.Vector2(0.415, 0.400),
    new THREE.Vector2(0.415, 0.330),
    new THREE.Vector2(0.385, 0.280),
    new THREE.Vector2(0.310, 0.250),
    new THREE.Vector2(0.00, 0.250),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  root.add(body);

  const lower_blue_bandGeom = new THREE.TorusGeometry(0.405, 0.026, 12, 64);
  const lower_blue_band = new THREE.Mesh(lower_blue_bandGeom, rimMat);
  lower_blue_band.rotation.x = Math.PI / 2;
  lower_blue_band.position.y = 0.245;
  root.add(lower_blue_band);

  const upper_blue_bandGeom = new THREE.TorusGeometry(0.425, 0.012, 10, 64);
  const upper_blue_band = new THREE.Mesh(upper_blue_bandGeom, rimMat);
  upper_blue_band.rotation.x = Math.PI / 2;
  upper_blue_band.position.y = 0.285;
  root.add(upper_blue_band);

  const mouth_rimGeom = new THREE.TorusGeometry(0.295, 0.026, 12, 64);
  const mouth_rim = new THREE.Mesh(mouth_rimGeom, rimMat);
  mouth_rim.rotation.x = Math.PI / 2;
  mouth_rim.position.y = 1.875;
  root.add(mouth_rim);

  const mouth_lipGeom = new THREE.RingGeometry(0.267, 0.318, 64);
  const mouth_lip = new THREE.Mesh(mouth_lipGeom, rimMat);
  mouth_lip.rotation.x = Math.PI / 2;
  mouth_lip.position.y = 1.886;
  root.add(mouth_lip);

  const inner_bottom_ringGeom = new THREE.TorusGeometry(0.145, 0.010, 8, 48);
  const inner_bottom_ring = new THREE.Mesh(inner_bottom_ringGeom, rimMat);
  inner_bottom_ring.rotation.x = Math.PI / 2;
  inner_bottom_ring.position.y = 0.258;
  root.add(inner_bottom_ring);

  const inner_bottom_discGeom = new THREE.CircleGeometry(0.135, 48);
  const inner_bottom_disc = new THREE.Mesh(inner_bottom_discGeom, bodyMat);
  inner_bottom_disc.rotation.x = Math.PI / 2;
  inner_bottom_disc.position.y = 0.255;
  root.add(inner_bottom_disc);

  const left_edgePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.425, 0.270, 0.015),
    new THREE.Vector3(-0.445, 0.390, 0.015),
    new THREE.Vector3(-0.395, 0.560, 0.015),
    new THREE.Vector3(-0.325, 0.780, 0.015),
    new THREE.Vector3(-0.255, 1.020, 0.015),
    new THREE.Vector3(-0.205, 1.270, 0.015),
    new THREE.Vector3(-0.205, 1.480, 0.015),
    new THREE.Vector3(-0.225, 1.650, 0.015),
    new THREE.Vector3(-0.290, 1.840, 0.015),
  ]);
  const left_edgeGeom = new THREE.TubeGeometry(left_edgePath, 48, 0.008, 8, false);
  const left_edge = new THREE.Mesh(left_edgeGeom, rimMat);
  root.add(left_edge);

  const right_edgePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.425, 0.270, 0.015),
    new THREE.Vector3(0.445, 0.390, 0.015),
    new THREE.Vector3(0.395, 0.560, 0.015),
    new THREE.Vector3(0.325, 0.780, 0.015),
    new THREE.Vector3(0.255, 1.020, 0.015),
    new THREE.Vector3(0.205, 1.270, 0.015),
    new THREE.Vector3(0.205, 1.480, 0.015),
    new THREE.Vector3(0.225, 1.650, 0.015),
    new THREE.Vector3(0.290, 1.840, 0.015),
  ]);
  const right_edgeGeom = new THREE.TubeGeometry(right_edgePath, 48, 0.008, 8, false);
  const right_edge = new THREE.Mesh(right_edgeGeom, rimMat);
  root.add(right_edge);

  const left_highlightPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.285, 0.350, 0.355),
    new THREE.Vector3(-0.255, 0.520, 0.330),
    new THREE.Vector3(-0.205, 0.760, 0.285),
    new THREE.Vector3(-0.145, 1.000, 0.225),
    new THREE.Vector3(-0.095, 1.250, 0.185),
    new THREE.Vector3(-0.090, 1.480, 0.180),
    new THREE.Vector3(-0.110, 1.660, 0.195),
    new THREE.Vector3(-0.155, 1.790, 0.225),
  ]);
  const left_highlightGeom = new THREE.TubeGeometry(left_highlightPath, 40, 0.018, 8, false);
  const left_highlight = new THREE.Mesh(left_highlightGeom, highlightMat);
  root.add(left_highlight);

  const right_highlightPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.255, 0.370, 0.365),
    new THREE.Vector3(0.225, 0.550, 0.335),
    new THREE.Vector3(0.180, 0.790, 0.285),
    new THREE.Vector3(0.125, 1.030, 0.225),
    new THREE.Vector3(0.075, 1.270, 0.185),
    new THREE.Vector3(0.070, 1.490, 0.180),
    new THREE.Vector3(0.090, 1.650, 0.195),
    new THREE.Vector3(0.130, 1.780, 0.225),
  ]);
  const right_highlightGeom = new THREE.TubeGeometry(right_highlightPath, 40, 0.014, 8, false);
  const right_highlight = new THREE.Mesh(right_highlightGeom, highlightMat);
  root.add(right_highlight);

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
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}