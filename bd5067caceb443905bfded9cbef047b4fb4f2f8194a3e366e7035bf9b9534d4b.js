function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "embossed_glass_bottle";

  const bottle_group = new THREE.Group();
  bottle_group.name = "bottle_group";
  root.add(bottle_group);

  const closure_group = new THREE.Group();
  closure_group.name = "closure_group";
  root.add(closure_group);

  const bottle_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xf3faf8,
    metalness: 0.0,
    roughness: 0.04,
    transmission: 0.98,
    thickness: 0.06,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    ior: 1.5,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const thick_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdce8e3,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.9,
    thickness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    ior: 1.5,
    transparent: true,
    opacity: 0.52,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const embossed_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8c8bf,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.72,
    thickness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    ior: 1.5,
    transparent: true,
    opacity: 0.68,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const cork_stopperMat = new THREE.MeshStandardMaterial({
    color: 0xc58a55,
    metalness: 0.0,
    roughness: 0.9,
    emissive: 0x3a1d0b,
    emissiveIntensity: 0.25
  });

  const cork_crackMat = new THREE.MeshStandardMaterial({
    color: 0x3d2415,
    metalness: 0.0,
    roughness: 0.95
  });

  const bottle_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.58, 0.00),
    new THREE.Vector2(0.66, 0.025),
    new THREE.Vector2(0.70, 0.075),
    new THREE.Vector2(0.715, 0.16),
    new THREE.Vector2(0.715, 0.42),
    new THREE.Vector2(0.705, 0.85),
    new THREE.Vector2(0.685, 1.30),
    new THREE.Vector2(0.655, 1.78),
    new THREE.Vector2(0.615, 2.18),
    new THREE.Vector2(0.565, 2.50),
    new THREE.Vector2(0.495, 2.78),
    new THREE.Vector2(0.405, 3.02),
    new THREE.Vector2(0.325, 3.23),
    new THREE.Vector2(0.270, 3.42),
    new THREE.Vector2(0.238, 3.62),
    new THREE.Vector2(0.225, 3.84),
    new THREE.Vector2(0.225, 4.10),
    new THREE.Vector2(0.245, 4.15),
    new THREE.Vector2(0.305, 4.18),
    new THREE.Vector2(0.330, 4.23),
    new THREE.Vector2(0.330, 4.36),
    new THREE.Vector2(0.305, 4.41),
    new THREE.Vector2(0.245, 4.44),
    new THREE.Vector2(0.205, 4.44),
    new THREE.Vector2(0.190, 4.40),
    new THREE.Vector2(0.190, 4.25),
    new THREE.Vector2(0.215, 4.20),
    new THREE.Vector2(0.205, 4.13),
    new THREE.Vector2(0.190, 4.10),
    new THREE.Vector2(0.190, 3.84),
    new THREE.Vector2(0.205, 3.62),
    new THREE.Vector2(0.240, 3.40),
    new THREE.Vector2(0.300, 3.20),
    new THREE.Vector2(0.380, 2.98),
    new THREE.Vector2(0.470, 2.74),
    new THREE.Vector2(0.540, 2.47),
    new THREE.Vector2(0.585, 2.16),
    new THREE.Vector2(0.620, 1.78),
    new THREE.Vector2(0.650, 1.30),
    new THREE.Vector2(0.665, 0.85),
    new THREE.Vector2(0.670, 0.42),
    new THREE.Vector2(0.665, 0.18),
    new THREE.Vector2(0.645, 0.12),
    new THREE.Vector2(0.565, 0.09),
    new THREE.Vector2(0.00, 0.09)
  ];
  const bottle_bodyGeom = new THREE.LatheGeometry(bottle_bodyProfile, 64);
  const bottle_body = new THREE.Mesh(bottle_bodyGeom, bottle_bodyMat);
  bottle_body.name = "bottle_body";
  bottle_body.renderOrder = 1;
  bottle_group.add(bottle_body);

  const base_ringGeom = new THREE.TorusGeometry(0.655, 0.038, 12, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, thick_glassMat);
  base_ring.name = "base_ring";
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.105;
  base_ring.renderOrder = 2;
  bottle_group.add(base_ring);

  const neck_collarGeom = new THREE.CylinderGeometry(
    0.33,
    0.33,
    0.18,
    64,
    1,
    true
  );
  const neck_collar = new THREE.Mesh(neck_collarGeom, thick_glassMat);
  neck_collar.name = "neck_collar";
  neck_collar.position.y = 4.29;
  neck_collar.renderOrder = 2;
  bottle_group.add(neck_collar);

  const neck_lipGeom = new THREE.TorusGeometry(0.285, 0.05, 14, 64);
  const neck_lip = new THREE.Mesh(neck_lipGeom, thick_glassMat);
  neck_lip.name = "neck_lip";
  neck_lip.rotation.x = Math.PI / 2;
  neck_lip.position.y = 4.37;
  neck_lip.renderOrder = 2;
  bottle_group.add(neck_lip);

  const neck_lower_ringGeom = new THREE.TorusGeometry(0.265, 0.025, 10, 64);
  const neck_lower_ring = new THREE.Mesh(neck_lower_ringGeom, thick_glassMat);
  neck_lower_ring.name = "neck_lower_ring";
  neck_lower_ring.rotation.x = Math.PI / 2;
  neck_lower_ring.position.y = 4.17;
  neck_lower_ring.renderOrder = 2;
  bottle_group.add(neck_lower_ring);

  const radius_samples = [
    [0.12, 0.705],
    [0.42, 0.715],
    [0.85, 0.705],
    [1.30, 0.685],
    [1.78, 0.655],
    [2.18, 0.615],
    [2.50, 0.565],
    [2.78, 0.495],
    [3.02, 0.405],
    [3.23, 0.325],
    [3.42, 0.270],
    [3.62, 0.238],
    [3.84, 0.225],
    [4.10, 0.225]
  ];

  function bottleRadiusAt(y) {
    if (y <= radius_samples[0][0]) {
      return radius_samples[0][1];
    }

    for (let i = 0; i < radius_samples.length - 1; i++) {
      const lower_sample = radius_samples[i];
      const upper_sample = radius_samples[i + 1];

      if (y <= upper_sample[0]) {
        const t =
          (y - lower_sample[0]) /
          (upper_sample[0] - lower_sample[0]);
        return lower_sample[1] +
          (upper_sample[1] - lower_sample[1]) * t;
      }
    }

    return radius_samples[radius_samples.length - 1][1];
  }

  function createDiagonalEmbossGeometry(direction) {
    const positions = [];
    const indices = [];
    const steps = 40;
    const y_start = 0.28;
    const y_end = 2.92;
    const angular_span = 0.78;
    const ribbon_width = 0.052;
    const surface_offset = 0.018;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const center_y = y_start + (y_end - y_start) * t;
      const center_angle = direction * angular_span * (t - 0.5);
      const radius = bottleRadiusAt(center_y) + surface_offset;

      for (const edge of [-1, 1]) {
        const edge_angle = center_angle + edge * ribbon_width;
        positions.push(
          Math.cos(edge_angle) * radius,
          center_y,
          Math.sin(edge_angle) * radius
        );
      }
    }

    for (let i = 0; i < steps; i++) {
      const inner_a = i * 2;
      const outer_a = inner_a + 1;
      const inner_b = inner_a + 2;
      const outer_b = inner_a + 3;
      indices.push(inner_a, outer_a, inner_b);
      indices.push(outer_a, outer_b, inner_b);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const diagonal_emboss_leftGeom = createDiagonalEmbossGeometry(1);
  const diagonal_emboss_left = new THREE.InstancedMesh(
    diagonal_emboss_leftGeom,
    embossed_glassMat,
    10
  );
  diagonal_emboss_left.name = "diagonal_emboss_left";
  diagonal_emboss_left.renderOrder = 3;

  const diagonal_emboss_rightGeom = createDiagonalEmbossGeometry(-1);
  const diagonal_emboss_right = new THREE.InstancedMesh(
    diagonal_emboss_rightGeom,
    embossed_glassMat,
    10
  );
  diagonal_emboss_right.name = "diagonal_emboss_right";
  diagonal_emboss_right.renderOrder = 3;

  const emboss_transform = new THREE.Object3D();
  for (let i = 0; i < 10; i++) {
    emboss_transform.position.set(0, 0, 0);
    emboss_transform.rotation.set(0, i / 10 * Math.PI * 2, 0);
    emboss_transform.scale.set(1, 1, 1);
    emboss_transform.updateMatrix();
    diagonal_emboss_left.setMatrixAt(i, emboss_transform.matrix);
    diagonal_emboss_right.setMatrixAt(i, emboss_transform.matrix);
  }
  diagonal_emboss_left.instanceMatrix.needsUpdate = true;
  diagonal_emboss_right.instanceMatrix.needsUpdate = true;
  bottle_group.add(diagonal_emboss_left);
  bottle_group.add(diagonal_emboss_right);

  const cork_stopperProfile = [
    new THREE.Vector2(0.00, 4.08),
    new THREE.Vector2(0.205, 4.08),
    new THREE.Vector2(0.215, 4.14),
    new THREE.Vector2(0.225, 4.28),
    new THREE.Vector2(0.245, 4.42),
    new THREE.Vector2(0.270, 4.56),
    new THREE.Vector2(0.300, 4.70),
    new THREE.Vector2(0.325, 4.80),
    new THREE.Vector2(0.320, 4.83),
    new THREE.Vector2(0.00, 4.83)
  ];
  const cork_stopperGeom = new THREE.LatheGeometry(cork_stopperProfile, 48);
  const cork_stopper = new THREE.Mesh(cork_stopperGeom, cork_stopperMat);
  cork_stopper.name = "cork_stopper";
  closure_group.add(cork_stopper);

  function corkRadiusAt(y) {
    const t = Math.max(0, Math.min(1, (y - 4.08) / 0.75));
    return 0.205 + 0.115 * t + 0.006 * Math.sin(t * Math.PI);
  }

  function corkSurfacePoint(angle, y, extra) {
    const radius = corkRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  const cork_cracks = new THREE.Group();
  cork_cracks.name = "cork_cracks";
  closure_group.add(cork_cracks);

  for (let i = 0; i < 14; i++) {
    const base_angle = i / 14 * Math.PI * 2 + 0.11;
    const start_y = 4.17 + (i % 4) * 0.045;
    const end_y = 4.70 - (i % 3) * 0.055;
    const crack_points = [];

    for (let j = 0; j <= 5; j++) {
      const t = j / 5;
      const angle =
        base_angle +
        Math.sin((i + 1) * (j + 1) * 1.37) * 0.035;
      const y = start_y + (end_y - start_y) * t;
      crack_points.push(corkSurfacePoint(angle, y, 0.006));
    }

    const cork_crackGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(crack_points),
      12,
      0.004,
      5,
      false
    );
    const cork_crack = new THREE.Mesh(cork_crackGeom, cork_crackMat);
    cork_crack.name = "cork_vertical_crack_" + i;
    cork_cracks.add(cork_crack);
  }

  for (let i = 0; i < 9; i++) {
    const base_angle = i / 9 * Math.PI * 2 + 0.27;
    const base_y = 4.24 + (i % 5) * 0.09;
    const branch_points = [];

    for (let j = 0; j <= 3; j++) {
      const t = j / 3;
      const angle = base_angle + (t - 0.5) * 0.13;
      const y =
        base_y +
        Math.sin((i + 2) * (j + 1)) * 0.008 +
        t * 0.012;
      branch_points.push(corkSurfacePoint(angle, y, 0.006));
    }

    const cork_branchGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(branch_points),
      6,
      0.0035,
      5,
      false
    );
    const cork_branch = new THREE.Mesh(cork_branchGeom, cork_crackMat);
    cork_branch.name = "cork_branch_crack_" + i;
    cork_cracks.add(cork_branch);
  }

  const cork_top_poresGeom = new THREE.SphereGeometry(0.012, 8, 6);
  const cork_top_pores = new THREE.InstancedMesh(
    cork_top_poresGeom,
    cork_crackMat,
    18
  );
  cork_top_pores.name = "cork_top_pores";

  const pore_transform = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = i * 2.3999632297;
    const radius = 0.035 + (i % 6) * 0.043;
    pore_transform.position.set(
      Math.cos(angle) * radius,
      4.833,
      Math.sin(angle) * radius
    );
    pore_transform.rotation.set(0, angle, 0);
    pore_transform.scale.set(
      0.65 + (i % 3) * 0.18,
      0.18,
      0.45 + (i % 4) * 0.12
    );
    pore_transform.updateMatrix();
    cork_top_pores.setMatrixAt(i, pore_transform.matrix);
  }
  cork_top_pores.instanceMatrix.needsUpdate = true;
  closure_group.add(cork_top_pores);

  fitToUnitCube(THREE, root);
  return root;

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
