// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "kintsugi_vase";

  const vase_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xe8dfd5,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const inner_cavityMat = new THREE.MeshStandardMaterial({
    color: 0xcfc4b8,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const crack_underlayMat = new THREE.MeshStandardMaterial({
    color: 0x392505,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const gold_crackMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const gold_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xc9a227,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const ceramic_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xa99d8e,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const vase_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.58, 0.00),
    new THREE.Vector2(0.66, 0.03),
    new THREE.Vector2(0.72, 0.10),
    new THREE.Vector2(0.80, 0.24),
    new THREE.Vector2(0.88, 0.45),
    new THREE.Vector2(0.95, 0.72),
    new THREE.Vector2(1.00, 1.02),
    new THREE.Vector2(1.02, 1.30),
    new THREE.Vector2(1.00, 1.58),
    new THREE.Vector2(0.94, 1.84),
    new THREE.Vector2(0.84, 2.08),
    new THREE.Vector2(0.72, 2.28),
    new THREE.Vector2(0.61, 2.43),
    new THREE.Vector2(0.55, 2.58),
    new THREE.Vector2(0.54, 2.72),
    new THREE.Vector2(0.58, 2.82),
    new THREE.Vector2(0.66, 2.88),
    new THREE.Vector2(0.70, 2.92),
    new THREE.Vector2(0.69, 2.98),
    new THREE.Vector2(0.63, 3.02),
    new THREE.Vector2(0.56, 3.02),
    new THREE.Vector2(0.51, 2.99),
    new THREE.Vector2(0.49, 2.93),
    new THREE.Vector2(0.50, 2.86),
    new THREE.Vector2(0.51, 2.79),
  ];
  const vase_bodyGeom = new THREE.LatheGeometry(vase_bodyProfile, 64);
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  vase_body.name = "vase_body";
  root.add(vase_body);

  const rolled_rimGeom = new THREE.TorusGeometry(0.61, 0.085, 16, 64);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, vase_bodyMat);
  rolled_rim.name = "rolled_rim";
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 2.965;
  root.add(rolled_rim);

  const inner_cavityGeom = new THREE.CircleGeometry(0.49, 48);
  const inner_cavity = new THREE.Mesh(inner_cavityGeom, inner_cavityMat);
  inner_cavity.name = "inner_cavity";
  inner_cavity.rotation.x = -Math.PI / 2;
  inner_cavity.position.y = 2.805;
  root.add(inner_cavity);

  const radius_samples = [
    [0.00, 0.64],
    [0.10, 0.72],
    [0.30, 0.83],
    [0.60, 0.94],
    [1.00, 1.01],
    [1.40, 1.02],
    [1.75, 0.96],
    [2.05, 0.85],
    [2.30, 0.70],
    [2.48, 0.59],
    [2.65, 0.54],
    [2.82, 0.58],
    [2.96, 0.69],
  ];

  function vaseRadiusAt(y) {
    if (y <= radius_samples[0][0]) return radius_samples[0][1];
    for (let i = 1; i < radius_samples.length; i++) {
      const previous = radius_samples[i - 1];
      const current = radius_samples[i];
      if (y <= current[0]) {
        const t = (y - previous[0]) / (current[0] - previous[0]);
        return previous[1] + (current[1] - previous[1]) * t;
      }
    }
    return radius_samples[radius_samples.length - 1][1];
  }

  function surfacePoint(angle, y, offset) {
    const radius = vaseRadiusAt(y) + offset;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function createSurfaceRibbonGeometry(path, width, offset) {
    const positions = [];
    const indices = [];

    for (let i = 0; i < path.length; i++) {
      const previous = path[Math.max(0, i - 1)];
      const next = path[Math.min(path.length - 1, i + 1)];
      const tangent_u = (next[0] - previous[0]) * vaseRadiusAt(path[i][1]);
      const tangent_y = next[1] - previous[1];
      const tangent_length = Math.sqrt(
        tangent_u * tangent_u + tangent_y * tangent_y
      ) || 1;
      const normal_u = -tangent_y / tangent_length;
      const normal_y = tangent_u / tangent_length;
      const left_width = width * (
        0.82 + 0.28 * (0.5 + 0.5 * Math.sin(i * 2.17 + width * 31))
      );
      const right_width = width * (
        0.80 + 0.30 * (0.5 + 0.5 * Math.sin(i * 1.73 + width * 47))
      );

      const left_y = path[i][1] + normal_y * left_width;
      const right_y = path[i][1] - normal_y * right_width;
      const left_radius = vaseRadiusAt(left_y) + offset;
      const right_radius = vaseRadiusAt(right_y) + offset;
      const left_angle = path[i][0] -
        normal_u * left_width / Math.max(left_radius, 0.1);
      const right_angle = path[i][0] +
        normal_u * right_width / Math.max(right_radius, 0.1);

      positions.push(
        Math.cos(left_angle) * left_radius,
        left_y,
        Math.sin(left_angle) * left_radius,
        Math.cos(right_angle) * right_radius,
        right_y,
        Math.sin(right_angle) * right_radius
      );
    }

    for (let i = 0; i < path.length - 1; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, b, d, c);
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

  const main_crackPath = [
    [2.50, 2.83],
    [2.43, 2.70],
    [2.31, 2.57],
    [2.39, 2.43],
    [2.25, 2.28],
    [2.34, 2.13],
    [2.20, 1.98],
    [2.29, 1.83],
    [2.17, 1.67],
    [2.25, 1.51],
    [2.12, 1.34],
    [2.18, 1.18],
    [2.05, 1.02],
    [2.08, 0.86],
    [1.93, 0.69],
    [1.98, 0.53],
    [1.84, 0.37],
    [1.90, 0.20],
    [1.82, 0.05],
  ];
  const left_branchPath = [
    [2.13, 1.34],
    [2.28, 1.20],
    [2.40, 1.05],
    [2.53, 0.88],
    [2.62, 0.70],
    [2.75, 0.54],
    [2.82, 0.37],
    [2.90, 0.20],
    [2.94, 0.05],
  ];
  const right_branchPath = [
    [2.13, 1.34],
    [1.96, 1.23],
    [1.82, 1.09],
    [1.68, 0.94],
    [1.55, 0.78],
    [1.40, 0.62],
    [1.27, 0.46],
    [1.18, 0.28],
    [1.13, 0.10],
  ];

  const main_crack_underlayGeom = createSurfaceRibbonGeometry(
    main_crackPath,
    0.032,
    0.006
  );
  const main_crack_underlay = new THREE.Mesh(
    main_crack_underlayGeom,
    crack_underlayMat
  );
  main_crack_underlay.name = "main_crack_underlay";
  root.add(main_crack_underlay);

  const main_crackGeom = createSurfaceRibbonGeometry(
    main_crackPath,
    0.019,
    0.010
  );
  const main_crack = new THREE.Mesh(main_crackGeom, gold_crackMat);
  main_crack.name = "main_crack";
  root.add(main_crack);

  const left_branch_underlayGeom = createSurfaceRibbonGeometry(
    left_branchPath,
    0.027,
    0.006
  );
  const left_branch_underlay = new THREE.Mesh(
    left_branch_underlayGeom,
    crack_underlayMat
  );
  left_branch_underlay.name = "left_branch_underlay";
  root.add(left_branch_underlay);

  const left_branchGeom = createSurfaceRibbonGeometry(
    left_branchPath,
    0.016,
    0.010
  );
  const left_branch = new THREE.Mesh(left_branchGeom, gold_crackMat);
  left_branch.name = "left_branch";
  root.add(left_branch);

  const right_branch_underlayGeom = createSurfaceRibbonGeometry(
    right_branchPath,
    0.027,
    0.006
  );
  const right_branch_underlay = new THREE.Mesh(
    right_branch_underlayGeom,
    crack_underlayMat
  );
  right_branch_underlay.name = "right_branch_underlay";
  root.add(right_branch_underlay);

  const right_branchGeom = createSurfaceRibbonGeometry(
    right_branchPath,
    0.016,
    0.010
  );
  const right_branch = new THREE.Mesh(right_branchGeom, gold_crackMat);
  right_branch.name = "right_branch";
  root.add(right_branch);

  const crack_paths = [
    main_crackPath,
    left_branchPath,
    right_branchPath,
  ];
  const crack_segment_count = 180;
  const crack_gold_flecksGeom = new THREE.CircleGeometry(1, 8);
  const crack_gold_flecks = new THREE.InstancedMesh(
    crack_gold_flecksGeom,
    gold_crackMat,
    crack_segment_count
  );
  crack_gold_flecks.name = "crack_gold_flecks";

  const decal_forward = new THREE.Vector3(0, 0, 1);
  const decal_normal = new THREE.Vector3();
  const decal_quaternion = new THREE.Quaternion();
  const decal_position = new THREE.Vector3();
  const decal_scale = new THREE.Vector3();

  for (let i = 0; i < crack_segment_count; i++) {
    const path_index = i % crack_paths.length;
    const path = crack_paths[path_index];
    const segment_index = Math.floor(i / crack_paths.length);
    const t = (segment_index + 0.5) / (crack_segment_count / crack_paths.length);
    const scaled = t * (path.length - 1);
    const point_index = Math.floor(scaled);
    const blend = scaled - point_index;
    const a = path[point_index];
    const b = path[Math.min(point_index + 1, path.length - 1)];
    const angle = a[0] + (b[0] - a[0]) * blend;
    const y = a[1] + (b[1] - a[1]) * blend;
    const lateral = ((i * 7) % 17) / 16 - 0.5;
    const radius = vaseRadiusAt(y) + 0.012;

    decal_normal.set(Math.cos(angle), 0, Math.sin(angle)).normalize();
    decal_quaternion.setFromUnitVectors(decal_forward, decal_normal);
    decal_position.set(
      decal_normal.x * radius,
      y + lateral * 0.024,
      decal_normal.z * radius
    );
    decal_scale.set(
      0.006 + ((i * 5) % 9) * 0.0011,
      0.0035 + ((i * 3) % 7) * 0.0008,
      1
    );
    crack_gold_flecks.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        decal_position,
        decal_quaternion,
        decal_scale
      )
    );
  }
  crack_gold_flecks.instanceMatrix.needsUpdate = true;
  root.add(crack_gold_flecks);

  const gold_specklesGeom = new THREE.CircleGeometry(1, 8);
  const gold_speckle_count = 420;
  const gold_speckles = new THREE.InstancedMesh(
    gold_specklesGeom,
    gold_specklesMat,
    gold_speckle_count
  );
  gold_speckles.name = "gold_speckles";

  for (let i = 0; i < gold_speckle_count; i++) {
    const height_fraction = ((i * 137) % 421) / 420;
    const y = 0.07 + height_fraction * 2.70;
    const angle = i * 2.399963229728653 +
      Math.sin(i * 1.71) * 0.22;
    const radius = vaseRadiusAt(y) + 0.008;
    const size = 0.0038 + (((i * 17) % 13) / 12) * 0.0085;

    decal_normal.set(Math.cos(angle), 0, Math.sin(angle)).normalize();
    decal_quaternion.setFromUnitVectors(decal_forward, decal_normal);
    decal_position.set(
      decal_normal.x * radius,
      y,
      decal_normal.z * radius
    );
    decal_scale.set(
      size * (1.0 + ((i * 5) % 7) * 0.14),
      size * (0.55 + ((i * 11) % 9) * 0.07),
      1
    );
    gold_speckles.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        decal_position,
        decal_quaternion,
        decal_scale
      )
    );
  }
  gold_speckles.instanceMatrix.needsUpdate = true;
  root.add(gold_speckles);

  const ceramic_specklesGeom = new THREE.CircleGeometry(1, 8);
  const ceramic_speckle_count = 110;
  const ceramic_speckles = new THREE.InstancedMesh(
    ceramic_specklesGeom,
    ceramic_specklesMat,
    ceramic_speckle_count
  );
  ceramic_speckles.name = "ceramic_speckles";

  for (let i = 0; i < ceramic_speckle_count; i++) {
    const height_fraction = ((i * 47) % 113) / 112;
    const y = 0.12 + height_fraction * 2.58;
    const angle = i * 2.176384 + Math.sin(i * 0.93) * 0.31;
    const radius = vaseRadiusAt(y) + 0.007;
    const size = 0.0025 + (((i * 13) % 9) / 8) * 0.0038;

    decal_normal.set(Math.cos(angle), 0, Math.sin(angle)).normalize();
    decal_quaternion.setFromUnitVectors(decal_forward, decal_normal);
    decal_position.set(
      decal_normal.x * radius,
      y,
      decal_normal.z * radius
    );
    decal_scale.set(size * 1.4, size * 0.75, 1);
    ceramic_speckles.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        decal_position,
        decal_quaternion,
        decal_scale
      )
    );
  }
  ceramic_speckles.instanceMatrix.needsUpdate = true;
  root.add(ceramic_speckles);

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