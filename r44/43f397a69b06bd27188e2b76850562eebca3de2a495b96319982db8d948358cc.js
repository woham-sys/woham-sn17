// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "frosted_glass_vase";

  const glass_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf3ef,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const clear_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddebea,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const frosted_reliefMat = new THREE.MeshPhysicalMaterial({
    color: 0xf2f7f5,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const etched_lineMat = new THREE.MeshStandardMaterial({
    color: 0xb8c7c4,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
  });

  const glass_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.235, 0.000),
    new THREE.Vector2(0.275, 0.012),
    new THREE.Vector2(0.295, 0.045),
    new THREE.Vector2(0.305, 0.120),
    new THREE.Vector2(0.305, 0.200),
    new THREE.Vector2(0.325, 0.320),
    new THREE.Vector2(0.350, 0.500),
    new THREE.Vector2(0.370, 0.700),
    new THREE.Vector2(0.375, 0.860),
    new THREE.Vector2(0.365, 1.000),
    new THREE.Vector2(0.340, 1.120),
    new THREE.Vector2(0.300, 1.220),
    new THREE.Vector2(0.285, 1.300),
    new THREE.Vector2(0.300, 1.380),
    new THREE.Vector2(0.340, 1.460),
    new THREE.Vector2(0.400, 1.535),
    new THREE.Vector2(0.430, 1.575),
    new THREE.Vector2(0.425, 1.610),
    new THREE.Vector2(0.390, 1.635),
    new THREE.Vector2(0.350, 1.620),
    new THREE.Vector2(0.335, 1.585),
    new THREE.Vector2(0.310, 1.530),
    new THREE.Vector2(0.280, 1.450),
    new THREE.Vector2(0.265, 1.360),
    new THREE.Vector2(0.265, 1.280),
    new THREE.Vector2(0.285, 1.180),
    new THREE.Vector2(0.320, 1.080),
    new THREE.Vector2(0.340, 0.960),
    new THREE.Vector2(0.350, 0.820),
    new THREE.Vector2(0.345, 0.660),
    new THREE.Vector2(0.330, 0.480),
    new THREE.Vector2(0.310, 0.300),
    new THREE.Vector2(0.295, 0.200),
    new THREE.Vector2(0.280, 0.160),
    new THREE.Vector2(0.000, 0.160),
  ];
  const glass_bodyGeom = new THREE.LatheGeometry(glass_bodyProfile, 64);
  const glass_body = new THREE.Mesh(glass_bodyGeom, glass_bodyMat);
  glass_body.name = "glass_body";
  root.add(glass_body);

  const thick_baseGeom = new THREE.CylinderGeometry(0.285, 0.275, 0.16, 48);
  const thick_base = new THREE.Mesh(thick_baseGeom, clear_glassMat);
  thick_base.name = "thick_base";
  thick_base.position.y = 0.08;
  root.add(thick_base);

  const base_rimGeom = new THREE.TorusGeometry(0.272, 0.014, 10, 64);
  const base_rim = new THREE.Mesh(base_rimGeom, clear_glassMat);
  base_rim.name = "base_rim";
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.025;
  root.add(base_rim);

  const inner_base_ringGeom = new THREE.TorusGeometry(0.235, 0.008, 8, 48);
  const inner_base_ring = new THREE.Mesh(inner_base_ringGeom, clear_glassMat);
  inner_base_ring.name = "inner_base_ring";
  inner_base_ring.rotation.x = Math.PI / 2;
  inner_base_ring.position.y = 0.155;
  root.add(inner_base_ring);

  const mouth_rimGeom = new THREE.TorusGeometry(0.390, 0.035, 14, 72);
  const mouth_rim = new THREE.Mesh(mouth_rimGeom, clear_glassMat);
  mouth_rim.name = "mouth_rim";
  mouth_rim.rotation.x = Math.PI / 2;
  mouth_rim.position.y = 1.605;
  root.add(mouth_rim);

  const inner_mouth_ringGeom = new THREE.TorusGeometry(0.348, 0.009, 8, 64);
  const inner_mouth_ring = new THREE.Mesh(inner_mouth_ringGeom, clear_glassMat);
  inner_mouth_ring.name = "inner_mouth_ring";
  inner_mouth_ring.rotation.x = Math.PI / 2;
  inner_mouth_ring.position.y = 1.612;
  root.add(inner_mouth_ring);

  const base_facetsGeom = new THREE.OctahedronGeometry(0.055, 0);
  const base_facets = new THREE.InstancedMesh(base_facetsGeom, clear_glassMat, 16);
  base_facets.name = "base_facets";
  const base_facet_dummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    base_facet_dummy.position.set(
      Math.cos(angle) * 0.294,
      0.085 + (i % 2) * 0.012,
      Math.sin(angle) * 0.294
    );
    base_facet_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    base_facet_dummy.scale.set(0.72, 1.25, 0.28);
    base_facet_dummy.updateMatrix();
    base_facets.setMatrixAt(i, base_facet_dummy.matrix);
  }
  base_facets.instanceMatrix.needsUpdate = true;
  root.add(base_facets);

  const lower_cut_facetsGeom = new THREE.OctahedronGeometry(0.047, 0);
  const lower_cut_facets = new THREE.InstancedMesh(
    lower_cut_facetsGeom,
    clear_glassMat,
    14
  );
  lower_cut_facets.name = "lower_cut_facets";
  const lower_facet_dummy = new THREE.Object3D();
  for (let i = 0; i < 14; i++) {
    const angle = i / 14 * Math.PI * 2 + Math.PI / 14;
    lower_facet_dummy.position.set(
      Math.cos(angle) * 0.307,
      0.175 + (i % 2) * 0.018,
      Math.sin(angle) * 0.307
    );
    lower_facet_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    lower_facet_dummy.scale.set(0.62, 1.18, 0.22);
    lower_facet_dummy.updateMatrix();
    lower_cut_facets.setMatrixAt(i, lower_facet_dummy.matrix);
  }
  lower_cut_facets.instanceMatrix.needsUpdate = true;
  root.add(lower_cut_facets);

  const floral_relief = new THREE.Group();
  floral_relief.name = "floral_relief";
  root.add(floral_relief);

  function bodyRadiusAt(y) {
    if (y <= 0.20) return 0.305;
    if (y <= 0.50) return 0.305 + (y - 0.20) / 0.30 * 0.045;
    if (y <= 0.86) return 0.350 + (y - 0.50) / 0.36 * 0.025;
    if (y <= 1.00) return 0.375 - (y - 0.86) / 0.14 * 0.010;
    if (y <= 1.22) return 0.365 - (y - 1.00) / 0.22 * 0.065;
    if (y <= 1.30) return 0.300 - (y - 1.22) / 0.08 * 0.015;
    if (y <= 1.46) return 0.285 + (y - 1.30) / 0.16 * 0.055;
    if (y <= 1.575) return 0.340 + (y - 1.46) / 0.115 * 0.090;
    return 0.430;
  }

  function surfacePoint(angle, y, extra) {
    const radius = bodyRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function addSurfaceTube(points, radius, material, name) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(12, points.length * 3),
      radius,
      7,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    floral_relief.add(mesh);
    return mesh;
  }

  function addSurfaceLeaf(centerAngle, centerY, length, width, tilt, name) {
    const leaf_group = new THREE.Group();
    leaf_group.name = name;

    const centerPoints = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const y = centerY + length * t;
      const angle =
        centerAngle -
        tilt +
        tilt * t +
        Math.sin(t * Math.PI) * 0.018;
      centerPoints.push(surfacePoint(angle, y, 0.009));
    }
    addSurfaceTube(centerPoints, 0.0042, etched_lineMat, name + "_center");

    const leftPoints = [];
    const rightPoints = [];
    for (let i = 0; i <= 9; i++) {
      const t = i / 9;
      const y = centerY + length * t;
      const centerAngleAtT =
        centerAngle -
        tilt +
        tilt * t +
        Math.sin(t * Math.PI) * 0.018;
      const spread = Math.sin(t * Math.PI) * width;
      leftPoints.push(
        surfacePoint(centerAngleAtT - spread, y, 0.008)
      );
      rightPoints.push(
        surfacePoint(centerAngleAtT + spread, y, 0.008)
      );
    }
    addSurfaceTube(leftPoints, 0.0032, etched_lineMat, name + "_left_edge");
    addSurfaceTube(rightPoints, 0.0032, etched_lineMat, name + "_right_edge");

    floral_relief.add(leaf_group);
    return leaf_group;
  }

  function addSurfaceDisc(angle, y, radius, material, name) {
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(radius, 28),
      material
    );
    disc.name = name;
    disc.position.copy(surfacePoint(angle, y, 0.008));
    disc.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    floral_relief.add(disc);
    return disc;
  }

  const front = Math.PI / 2;

  const main_stem = addSurfaceTube(
    [
      surfacePoint(front + 0.25, 0.20, 0.010),
      surfacePoint(front + 0.18, 0.36, 0.010),
      surfacePoint(front + 0.08, 0.56, 0.010),
      surfacePoint(front - 0.02, 0.78, 0.010),
      surfacePoint(front - 0.08, 1.00, 0.010),
      surfacePoint(front - 0.04, 1.18, 0.010),
    ],
    0.008,
    frosted_reliefMat,
    "main_stem"
  );

  const left_stem = addSurfaceTube(
    [
      surfacePoint(front + 0.22, 0.20, 0.010),
      surfacePoint(front + 0.38, 0.38, 0.010),
      surfacePoint(front + 0.50, 0.60, 0.010),
      surfacePoint(front + 0.55, 0.84, 0.010),
      surfacePoint(front + 0.48, 1.08, 0.010),
    ],
    0.007,
    frosted_reliefMat,
    "left_stem"
  );

  const right_stem = addSurfaceTube(
    [
      surfacePoint(front - 0.18, 0.20, 0.010),
      surfacePoint(front - 0.32, 0.38, 0.010),
      surfacePoint(front - 0.43, 0.58, 0.010),
      surfacePoint(front - 0.48, 0.80, 0.010),
      surfacePoint(front - 0.42, 1.02, 0.010),
    ],
    0.007,
    frosted_reliefMat,
    "right_stem"
  );

  const upper_left_branch = addSurfaceTube(
    [
      surfacePoint(front + 0.02, 0.70, 0.010),
      surfacePoint(front + 0.16, 0.84, 0.010),
      surfacePoint(front + 0.28, 1.00, 0.010),
      surfacePoint(front + 0.30, 1.16, 0.010),
    ],
    0.0055,
    frosted_reliefMat,
    "upper_left_branch"
  );

  const upper_right_branch = addSurfaceTube(
    [
      surfacePoint(front - 0.04, 0.76, 0.010),
      surfacePoint(front - 0.18, 0.90, 0.010),
      surfacePoint(front - 0.28, 1.04, 0.010),
      surfacePoint(front - 0.25, 1.18, 0.010),
    ],
    0.0055,
    frosted_reliefMat,
    "upper_right_branch"
  );

  const lower_left_branch = addSurfaceTube(
    [
      surfacePoint(front + 0.18, 0.30, 0.010),
      surfacePoint(front + 0.34, 0.38, 0.010),
      surfacePoint(front + 0.48, 0.48, 0.010),
      surfacePoint(front + 0.55, 0.60, 0.010),
    ],
    0.005,
    frosted_reliefMat,
    "lower_left_branch"
  );

  const lower_right_branch = addSurfaceTube(
    [
      surfacePoint(front - 0.12, 0.28, 0.010),
      surfacePoint(front - 0.28, 0.36, 0.010),
      surfacePoint(front - 0.42, 0.46, 0.010),
      surfacePoint(front - 0.50, 0.58, 0.010),
    ],
    0.005,
    frosted_reliefMat,
    "lower_right_branch"
  );

  const central_leaf = addSurfaceLeaf(
    front - 0.04,
    0.54,
    0.43,
    0.105,
    -0.18,
    "central_leaf"
  );
  const left_tall_leaf = addSurfaceLeaf(
    front + 0.28,
    0.62,
    0.42,
    0.090,
    -0.24,
    "left_tall_leaf"
  );
  const right_tall_leaf = addSurfaceLeaf(
    front - 0.28,
    0.62,
    0.40,
    0.085,
    0.22,
    "right_tall_leaf"
  );
  const upper_left_leaf = addSurfaceLeaf(
    front + 0.18,
    0.92,
    0.28,
    0.060,
    -0.16,
    "upper_left_leaf"
  );
  const upper_right_leaf = addSurfaceLeaf(
    front - 0.20,
    0.91,
    0.29,
    0.060,
    0.16,
    "upper_right_leaf"
  );
  const lower_left_leaf = addSurfaceLeaf(
    front + 0.40,
    0.34,
    0.30,
    0.070,
    -0.28,
    "lower_left_leaf"
  );
  const lower_right_leaf = addSurfaceLeaf(
    front - 0.38,
    0.34,
    0.30,
    0.070,
    0.28,
    "lower_right_leaf"
  );
  const neck_left_leaf = addSurfaceLeaf(
    front + 0.48,
    1.20,
    0.22,
    0.045,
    -0.18,
    "neck_left_leaf"
  );
  const neck_right_leaf = addSurfaceLeaf(
    front - 0.48,
    1.20,
    0.22,
    0.045,
    0.18,
    "neck_right_leaf"
  );

  const left_rosette = addSurfaceDisc(
    front + 0.52,
    0.285,
    0.064,
    frosted_reliefMat,
    "left_rosette"
  );
  const right_rosette = addSurfaceDisc(
    front - 0.52,
    0.285,
    0.064,
    frosted_reliefMat,
    "right_rosette"
  );

  const rosette_ringGeom = new THREE.TorusGeometry(0.055, 0.004, 7, 32);
  const left_rosette_ring = new THREE.Mesh(rosette_ringGeom, etched_lineMat);
  left_rosette_ring.name = "left_rosette_ring";
  left_rosette_ring.position.copy(surfacePoint(front + 0.52, 0.285, 0.013));
  left_rosette_ring.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(Math.cos(front + 0.52), 0, Math.sin(front + 0.52))
  );
  floral_relief.add(left_rosette_ring);

  const right_rosette_ring = new THREE.Mesh(rosette_ringGeom, etched_lineMat);
  right_rosette_ring.name = "right_rosette_ring";
  right_rosette_ring.position.copy(surfacePoint(front - 0.52, 0.285, 0.013));
  right_rosette_ring.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(Math.cos(front - 0.52), 0, Math.sin(front - 0.52))
  );
  floral_relief.add(right_rosette_ring);

  const rosette_spokesGeom = new THREE.CylinderGeometry(
    0.0025,
    0.0025,
    0.050,
    6
  );
  const rosette_spokes = new THREE.InstancedMesh(
    rosette_spokesGeom,
    etched_lineMat,
    16
  );
  rosette_spokes.name = "rosette_spokes";
  const rosette_dummy = new THREE.Object3D();
  const cylinder_axis = new THREE.Vector3(0, 1, 0);
  let spokeIndex = 0;
  for (const rosetteAngle of [front + 0.52, front - 0.52]) {
    const normal = new THREE.Vector3(
      Math.cos(rosetteAngle),
      0,
      Math.sin(rosetteAngle)
    );
    const tangent = new THREE.Vector3(
      Math.sin(rosetteAngle),
      0,
      -Math.cos(rosetteAngle)
    );
    const center = surfacePoint(rosetteAngle, 0.285, 0.015);

    for (let i = 0; i < 8; i++) {
      const phi = i / 8 * Math.PI * 2;
      const direction = tangent.clone()
        .multiplyScalar(Math.cos(phi))
        .add(new THREE.Vector3(0, Math.sin(phi), 0))
        .normalize();

      rosette_dummy.position.copy(center).addScaledVector(direction, 0.025);
      rosette_dummy.quaternion.setFromUnitVectors(cylinder_axis, direction);
      rosette_dummy.scale.set(1, 1, 1);
      rosette_dummy.updateMatrix();
      rosette_spokes.setMatrixAt(spokeIndex, rosette_dummy.matrix);
      spokeIndex++;
    }
  }
  rosette_spokes.instanceMatrix.needsUpdate = true;
  floral_relief.add(rosette_spokes);

  const rosette_centerGeom = new THREE.SphereGeometry(0.012, 12, 8);
  const left_rosette_center = new THREE.Mesh(
    rosette_centerGeom,
    etched_lineMat
  );
  left_rosette_center.name = "left_rosette_center";
  left_rosette_center.position.copy(surfacePoint(front + 0.52, 0.285, 0.017));
  floral_relief.add(left_rosette_center);

  const right_rosette_center = new THREE.Mesh(
    rosette_centerGeom,
    etched_lineMat
  );
  right_rosette_center.name = "right_rosette_center";
  right_rosette_center.position.copy(surfacePoint(front - 0.52, 0.285, 0.017));
  floral_relief.add(right_rosette_center);

  const lower_diamondsGeom = new THREE.OctahedronGeometry(0.043, 0);
  const lower_diamonds = new THREE.InstancedMesh(
    lower_diamondsGeom,
    frosted_reliefMat,
    8
  );
  lower_diamonds.name = "lower_diamonds";
  const diamond_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = front + (i - 3.5) * 0.17;
    diamond_dummy.position.copy(
      surfacePoint(angle, 0.185 + (i % 2) * 0.018, 0.012)
    );
    diamond_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    diamond_dummy.scale.set(0.72, 1.25, 0.20);
    diamond_dummy.updateMatrix();
    lower_diamonds.setMatrixAt(i, diamond_dummy.matrix);
  }
  lower_diamonds.instanceMatrix.needsUpdate = true;
  floral_relief.add(lower_diamonds);

  fitToUnitCube(root);
  return root;

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
}