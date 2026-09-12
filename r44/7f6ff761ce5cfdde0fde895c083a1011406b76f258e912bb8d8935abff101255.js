// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "potted_avocado_tree";

  const potMat = new THREE.MeshStandardMaterial({
    color: 0xd7d8d5,
    metalness: 0.0,
    roughness: 0.4,
  });
  const soilMat = new THREE.MeshStandardMaterial({
    color: 0x2b1d14,
    metalness: 0.0,
    roughness: 0.95,
  });
  const soil_clumpsMat = new THREE.MeshStandardMaterial({
    color: 0x3b281a,
    metalness: 0.0,
    roughness: 0.95,
  });
  const soil_granulesMat = new THREE.MeshStandardMaterial({
    color: 0xb9a584,
    metalness: 0.0,
    roughness: 0.9,
  });
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x68503d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const bark_ridgesMat = new THREE.MeshStandardMaterial({
    color: 0x49362a,
    metalness: 0.0,
    roughness: 0.95,
  });
  const bark_knotsMat = new THREE.MeshStandardMaterial({
    color: 0x38291f,
    metalness: 0.0,
    roughness: 0.95,
  });
  const branchMat = new THREE.MeshStandardMaterial({
    color: 0x493529,
    metalness: 0.0,
    roughness: 0.9,
  });
  const leaf_darkMat = new THREE.MeshStandardMaterial({
    color: 0x24482d,
    metalness: 0.0,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });
  const leaf_mediumMat = new THREE.MeshStandardMaterial({
    color: 0x3d6737,
    metalness: 0.0,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });
  const leaf_lightMat = new THREE.MeshStandardMaterial({
    color: 0x62862c,
    metalness: 0.0,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });
  const leaf_veinsMat = new THREE.MeshStandardMaterial({
    color: 0x87965b,
    metalness: 0.0,
    roughness: 0.7,
  });

  function createTaperedSegment(name, start, end, startRadius, endRadius, material, radialSegments) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(
      endRadius,
      startRadius,
      length,
      radialSegments || 12
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return mesh;
  }

  const pot_profile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.43, 0.00),
    new THREE.Vector2(0.49, 0.015),
    new THREE.Vector2(0.535, 0.065),
    new THREE.Vector2(0.55, 0.145),
    new THREE.Vector2(0.54, 0.205),
    new THREE.Vector2(0.515, 0.235),
    new THREE.Vector2(0.00, 0.235),
  ];
  const potGeom = new THREE.LatheGeometry(pot_profile, 48);
  const pot = new THREE.Mesh(potGeom, potMat);
  pot.name = "pot";
  root.add(pot);

  const pot_rimGeom = new THREE.TorusGeometry(0.515, 0.025, 12, 48);
  const pot_rim = new THREE.Mesh(pot_rimGeom, potMat);
  pot_rim.name = "pot_rim";
  pot_rim.rotation.x = Math.PI / 2;
  pot_rim.position.y = 0.225;
  root.add(pot_rim);

  const soilGeom = new THREE.CylinderGeometry(0.49, 0.49, 0.028, 48);
  const soil = new THREE.Mesh(soilGeom, soilMat);
  soil.name = "soil";
  soil.position.y = 0.244;
  root.add(soil);

  const soil_clumpsGeom = new THREE.DodecahedronGeometry(0.018, 0);
  const soil_clumps = new THREE.InstancedMesh(soil_clumpsGeom, soil_clumpsMat, 42);
  soil_clumps.name = "soil_clumps";
  const clump_dummy = new THREE.Object3D();
  for (let i = 0; i < 42; i++) {
    const angle = i * 2.3999632297;
    const radius = 0.455 * Math.sqrt((i + 0.5) / 42);
    const scale = 0.55 + 0.5 * (0.5 + 0.5 * Math.sin(i * 1.73));
    clump_dummy.position.set(
      Math.cos(angle) * radius,
      0.263 + 0.004 * Math.sin(i * 2.1),
      Math.sin(angle) * radius
    );
    clump_dummy.rotation.set(i * 0.31, i * 0.47, i * 0.19);
    clump_dummy.scale.set(scale * 1.25, scale * 0.65, scale);
    clump_dummy.updateMatrix();
    soil_clumps.setMatrixAt(i, clump_dummy.matrix);
  }
  soil_clumps.instanceMatrix.needsUpdate = true;
  root.add(soil_clumps);

  const soil_granulesGeom = new THREE.DodecahedronGeometry(0.009, 0);
  const soil_granules = new THREE.InstancedMesh(
    soil_granulesGeom,
    soil_granulesMat,
    28
  );
  soil_granules.name = "soil_granules";
  const granule_dummy = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const angle = i * 2.176131 + 0.4;
    const radius = 0.43 * Math.sqrt((i + 0.35) / 28);
    const scale = 0.55 + 0.55 * (0.5 + 0.5 * Math.cos(i * 1.41));
    granule_dummy.position.set(
      Math.cos(angle) * radius,
      0.271,
      Math.sin(angle) * radius
    );
    granule_dummy.rotation.set(i * 0.22, i * 0.39, i * 0.13);
    granule_dummy.scale.set(scale, scale * 0.65, scale);
    granule_dummy.updateMatrix();
    soil_granules.setMatrixAt(i, granule_dummy.matrix);
  }
  soil_granules.instanceMatrix.needsUpdate = true;
  root.add(soil_granules);

  const trunk_points = [
    new THREE.Vector3(0.000, 0.245, 0.000),
    new THREE.Vector3(-0.012, 0.550, 0.006),
    new THREE.Vector3(0.008, 0.875, -0.004),
    new THREE.Vector3(-0.004, 1.190, 0.008),
    new THREE.Vector3(0.018, 1.500, 0.000),
    new THREE.Vector3(0.008, 1.780, -0.006),
    new THREE.Vector3(0.025, 2.040, 0.004),
    new THREE.Vector3(0.018, 2.280, 0.012),
    new THREE.Vector3(0.035, 2.500, 0.004),
  ];
  const trunk_radii = [
    0.088, 0.078, 0.070, 0.063, 0.057, 0.052,
    0.047, 0.041, 0.035, 0.029,
  ];
  const trunk = new THREE.Group();
  trunk.name = "trunk";
  for (let i = 0; i < trunk_points.length - 1; i++) {
    const trunk_segment = createTaperedSegment(
      "trunk_segment_" + i,
      trunk_points[i],
      trunk_points[i + 1],
      trunk_radii[i],
      trunk_radii[i + 1],
      trunkMat,
      14
    );
    trunk.add(trunk_segment);
  }
  root.add(trunk);

  const bark_ridges = new THREE.Group();
  bark_ridges.name = "bark_ridges";
  for (let ridgeIndex = 0; ridgeIndex < 5; ridgeIndex++) {
    const ridgePoints = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      const y = 0.31 + t * 1.72;
      const radius = 0.081 - t * 0.039;
      const angle =
        ridgeIndex / 5 * Math.PI * 2 +
        Math.sin(t * Math.PI * 3 + ridgeIndex) * 0.08;
      ridgePoints.push(new THREE.Vector3(
        Math.cos(angle) * (radius + 0.002),
        y,
        Math.sin(angle) * (radius + 0.002)
      ));
    }
    const bark_ridgeGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(ridgePoints, false, "centripetal"),
      24,
      0.0032,
      5,
      false
    );
    const bark_ridge = new THREE.Mesh(bark_ridgeGeom, bark_ridgesMat);
    bark_ridge.name = "bark_ridge_" + ridgeIndex;
    bark_ridges.add(bark_ridge);
  }
  root.add(bark_ridges);

  const bark_knotsGeom = new THREE.SphereGeometry(0.025, 10, 6);
  const bark_knots = new THREE.InstancedMesh(
    bark_knotsGeom,
    bark_knotsMat,
    7
  );
  bark_knots.name = "bark_knots";
  const knot_data = [
    [0.48, 1.18, 0.85],
    [0.72, 2.72, 0.62],
    [0.93, 0.18, 0.78],
    [1.16, 1.54, 0.58],
    [1.39, 3.02, 0.72],
    [1.62, 0.72, 0.55],
    [1.84, 2.24, 0.62],
  ];
  const knot_dummy = new THREE.Object3D();
  for (let i = 0; i < knot_data.length; i++) {
    const y = knot_data[i][0];
    const angle = knot_data[i][1];
    const scale = knot_data[i][2];
    const radius = 0.083 - y * 0.018;
    knot_dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    knot_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    knot_dummy.scale.set(scale, scale * 0.62, scale * 0.38);
    knot_dummy.updateMatrix();
    bark_knots.setMatrixAt(i, knot_dummy.matrix);
  }
  bark_knots.instanceMatrix.needsUpdate = true;
  root.add(bark_knots);

  const branch_structure = new THREE.Group();
  branch_structure.name = "branch_structure";
  root.add(branch_structure);

  const left_lower_branch = createTaperedSegment(
    "left_lower_branch",
    new THREE.Vector3(0.005, 1.50, 0.00),
    new THREE.Vector3(-0.31, 1.78, 0.03),
    0.035,
    0.018,
    branchMat,
    10
  );
  branch_structure.add(left_lower_branch);

  const right_lower_branch = createTaperedSegment(
    "right_lower_branch",
    new THREE.Vector3(0.012, 1.61, 0.00),
    new THREE.Vector3(0.31, 1.86, 0.02),
    0.034,
    0.017,
    branchMat,
    10
  );
  branch_structure.add(right_lower_branch);

  const left_middle_branch = createTaperedSegment(
    "left_middle_branch",
    new THREE.Vector3(0.018, 1.76, 0.00),
    new THREE.Vector3(-0.49, 2.08, 0.01),
    0.031,
    0.015,
    branchMat,
    10
  );
  branch_structure.add(left_middle_branch);

  const right_middle_branch = createTaperedSegment(
    "right_middle_branch",
    new THREE.Vector3(0.022, 1.88, 0.00),
    new THREE.Vector3(0.50, 2.18, 0.01),
    0.030,
    0.015,
    branchMat,
    10
  );
  branch_structure.add(right_middle_branch);

  const front_branch = createTaperedSegment(
    "front_branch",
    new THREE.Vector3(0.022, 1.92, 0.00),
    new THREE.Vector3(0.06, 2.17, 0.34),
    0.028,
    0.013,
    branchMat,
    10
  );
  branch_structure.add(front_branch);

  const rear_branch = createTaperedSegment(
    "rear_branch",
    new THREE.Vector3(0.025, 2.02, 0.00),
    new THREE.Vector3(0.02, 2.25, -0.31),
    0.026,
    0.012,
    branchMat,
    10
  );
  branch_structure.add(rear_branch);

  const left_upper_branch = createTaperedSegment(
    "left_upper_branch",
    new THREE.Vector3(0.028, 2.12, 0.00),
    new THREE.Vector3(-0.34, 2.48, 0.00),
    0.025,
    0.012,
    branchMat,
    10
  );
  branch_structure.add(left_upper_branch);

  const right_upper_branch = createTaperedSegment(
    "right_upper_branch",
    new THREE.Vector3(0.030, 2.18, 0.00),
    new THREE.Vector3(0.36, 2.52, 0.00),
    0.024,
    0.011,
    branchMat,
    10
  );
  branch_structure.add(right_upper_branch);

  const top_branch = createTaperedSegment(
    "top_branch",
    new THREE.Vector3(0.032, 2.30, 0.00),
    new THREE.Vector3(0.04, 2.63, 0.00),
    0.021,
    0.009,
    branchMat,
    9
  );
  branch_structure.add(top_branch);

  const branch_specs = [
    {
      start: new THREE.Vector3(0.005, 1.50, 0.00),
      end: new THREE.Vector3(-0.31, 1.78, 0.03),
      leaves: [
        [-0.20, 1.66, 0.02, -0.78, 0.18, 0.05, 0.54, 0],
        [-0.29, 1.75, 0.03, -0.95, 0.08, 0.12, 0.58, 0],
        [-0.27, 1.77, 0.04, -0.72, 0.22, -0.35, 0.52, 1],
        [-0.16, 1.64, 0.04, -0.35, -0.10, 0.78, 0.48, 1],
      ],
    },
    {
      start: new THREE.Vector3(0.012, 1.61, 0.00),
      end: new THREE.Vector3(0.31, 1.86, 0.02),
      leaves: [
        [0.19, 1.70, 0.02, 0.78, 0.18, 0.08, 0.54, 1],
        [0.29, 1.83, 0.02, 0.92, 0.12, 0.15, 0.57, 0],
        [0.27, 1.84, 0.04, 0.72, 0.20, -0.38, 0.52, 1],
        [0.16, 1.66, 0.04, 0.38, -0.08, 0.76, 0.48, 0],
      ],
    },
    {
      start: new THREE.Vector3(0.018, 1.76, 0.00),
      end: new THREE.Vector3(-0.49, 2.08, 0.01),
      leaves: [
        [-0.27, 1.90, 0.01, -0.78, 0.30, 0.05, 0.56, 0],
        [-0.45, 2.04, 0.01, -0.98, 0.08, 0.08, 0.61, 0],
        [-0.43, 2.06, 0.03, -0.78, 0.22, -0.38, 0.56, 1],
        [-0.35, 1.99, 0.04, -0.55, -0.08, 0.68, 0.50, 1],
        [-0.16, 1.83, 0.02, -0.45, 0.15, 0.55, 0.48, 0],
      ],
    },
    {
      start: new THREE.Vector3(0.022, 1.88, 0.00),
      end: new THREE.Vector3(0.50, 2.18, 0.01),
      leaves: [
        [0.27, 1.99, 0.01, 0.78, 0.30, 0.05, 0.56, 1],
        [0.46, 2.15, 0.01, 0.98, 0.08, 0.08, 0.61, 0],
        [0.44, 2.17, 0.03, 0.78, 0.22, -0.38, 0.56, 1],
        [0.35, 2.08, 0.04, 0.55, -0.08, 0.68, 0.50, 1],
        [0.16, 1.94, 0.02, 0.45, 0.15, 0.55, 0.48, 0],
      ],
    },
    {
      start: new THREE.Vector3(0.022, 1.92, 0.00),
      end: new THREE.Vector3(0.06, 2.17, 0.34),
      leaves: [
        [0.04, 2.00, 0.15, -0.45, 0.12, 0.82, 0.50, 0],
        [0.07, 2.09, 0.27, 0.10, 0.18, 0.98, 0.52, 0],
        [0.06, 2.16, 0.34, 0.55, 0.12, 0.78, 0.50, 1],
        [0.02, 2.08, 0.24, -0.75, 0.05, 0.55, 0.48, 1],
      ],
    },
    {
      start: new THREE.Vector3(0.025, 2.02, 0.00),
      end: new THREE.Vector3(0.02, 2.25, -0.31),
      leaves: [
        [0.01, 2.09, -0.14, -0.45, 0.12, -0.82, 0.50, 0],
        [0.02, 2.18, -0.26, 0.10, 0.18, -0.98, 0.52, 0],
        [0.02, 2.24, -0.31, 0.55, 0.12, -0.78, 0.50, 1],
        [0.00, 2.15, -0.22, -0.75, 0.05, -0.55, 0.48, 1],
      ],
    },
    {
      start: new THREE.Vector3(0.028, 2.12, 0.00),
      end: new THREE.Vector3(-0.34, 2.48, 0.00),
      leaves: [
        [-0.15, 2.25, 0.00, -0.65, 0.45, 0.10, 0.56, 0],
        [-0.29, 2.42, 0.00, -0.92, 0.28, 0.10, 0.61, 0],
        [-0.34, 2.48, 0.01, -0.75, 0.38, -0.35, 0.56, 1],
        [-0.23, 2.36, 0.02, -0.45, 0.05, 0.75, 0.50, 1],
      ],
    },
    {
      start: new THREE.Vector3(0.030, 2.18, 0.00),
      end: new THREE.Vector3(0.36, 2.52, 0.00),
      leaves: [
        [0.15, 2.28, 0.00, 0.65, 0.45, 0.10, 0.56, 1],
        [0.30, 2.45, 0.00, 0.92, 0.28, 0.10, 0.61, 0],
        [0.35, 2.51, 0.01, 0.75, 0.38, -0.35, 0.56, 1],
        [0.23, 2.38, 0.02, 0.45, 0.05, 0.75, 0.50, 1],
      ],
    },
    {
      start: new THREE.Vector3(0.032, 2.30, 0.00),
      end: new THREE.Vector3(0.04, 2.63, 0.00),
      leaves: [
        [0.02, 2.38, 0.00, -0.55, 0.65, 0.15, 0.56, 0],
        [0.05, 2.50, 0.00, 0.55, 0.65, 0.15, 0.56, 1],
        [0.03, 2.46, 0.02, -0.15, 0.75, 0.55, 0.54, 1],
        [0.04, 2.58, 0.00, 0.05, 0.85, -0.45, 0.55, 0],
        [0.04, 2.62, 0.00, -0.25, 0.75, -0.45, 0.50, 1],
      ],
    },
  ];

  const twig_segments = [];
  const leaf_specs = [];
  for (let branchIndex = 0; branchIndex < branch_specs.length; branchIndex++) {
    const spec = branch_specs[branchIndex];
    for (let leafIndex = 0; leafIndex < spec.leaves.length; leafIndex++) {
      const data = spec.leaves[leafIndex];
      const base = new THREE.Vector3(data[0], data[1], data[2]);
      const direction = new THREE.Vector3(data[3], data[4], data[5]).normalize();
      const length = data[6];
      const colorIndex = data[7];
      const tip = base.clone().addScaledVector(direction, length);
      twig_segments.push({
        start: spec.end.clone(),
        end: base.clone(),
        radius: 0.007,
      });
      leaf_specs.push({
        base,
        tip,
        colorIndex,
      });
    }
  }

  const twigsGeom = new THREE.CylinderGeometry(1, 1, 1, 7);
  const twigs = new THREE.InstancedMesh(
    twigsGeom,
    branchMat,
    twig_segments.length
  );
  twigs.name = "twigs";
  const twig_dummy = new THREE.Object3D();
  const twig_up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < twig_segments.length; i++) {
    const segment = twig_segments[i];
    const direction = new THREE.Vector3().subVectors(segment.end, segment.start);
    const length = direction.length();
    twig_dummy.position.copy(segment.start).add(segment.end).multiplyScalar(0.5);
    twig_dummy.quaternion.setFromUnitVectors(
      twig_up,
      direction.normalize()
    );
    twig_dummy.scale.set(segment.radius, length, segment.radius);
    twig_dummy.updateMatrix();
    twigs.setMatrixAt(i, twig_dummy.matrix);
  }
  twigs.instanceMatrix.needsUpdate = true;
  branch_structure.add(twigs);

  function createLeafGeometry() {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const indices = [];
    const stationCount = 12;
    const acrossCount = 4;

    for (let station = 0; station <= stationCount; station++) {
      const t = station / stationCount;
      const sine = Math.sin(Math.PI * t);
      const halfWidth =
        (0.004 + 0.245 * Math.pow(sine, 0.72) * (1 - 0.08 * t)) *
        (1 - 0.035 * Math.sin(t * Math.PI * 6));
      const centerZ = 0.028 * sine - 0.010 * t;

      for (let across = 0; across <= acrossCount; across++) {
        const u = across / acrossCount * 2 - 1;
        const edgeDrop = 0.018 * u * u * sine;
        positions.push(
          u * halfWidth,
          t - edgeDrop,
          centerZ + 0.018 * (1 - u * u) * sine
        );
      }
    }

    for (let station = 0; station < stationCount; station++) {
      for (let across = 0; across < acrossCount; across++) {
        const a = station * (acrossCount + 1) + across;
        const b = a + 1;
        const c = a + acrossCount + 1;
        const d = c + 1;
        indices.push(a, c, b, b, c, d);
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const leafGeom = createLeafGeometry();
  const leaf_matrices = [[], [], []];
  const leaf_up = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < leaf_specs.length; i++) {
    const spec = leaf_specs[i];
    const direction = new THREE.Vector3().subVectors(spec.tip, spec.base);
    const length = direction.length();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      leaf_up,
      direction.normalize()
    );
    const matrix = new THREE.Matrix4().compose(
      spec.base,
      quaternion,
      new THREE.Vector3(length, length, length)
    );
    leaf_matrices[spec.colorIndex].push(matrix);
  }

  const leaf_dark = new THREE.InstancedMesh(
    leafGeom,
    leaf_darkMat,
    leaf_matrices[0].length
  );
  leaf_dark.name = "leaf_dark";
  for (let i = 0; i < leaf_matrices[0].length; i++) {
    leaf_dark.setMatrixAt(i, leaf_matrices[0][i]);
  }
  leaf_dark.instanceMatrix.needsUpdate = true;
  root.add(leaf_dark);

  const leaf_medium = new THREE.InstancedMesh(
    leafGeom,
    leaf_mediumMat,
    leaf_matrices[1].length
  );
  leaf_medium.name = "leaf_medium";
  for (let i = 0; i < leaf_matrices[1].length; i++) {
    leaf_medium.setMatrixAt(i, leaf_matrices[1][i]);
  }
  leaf_medium.instanceMatrix.needsUpdate = true;
  root.add(leaf_medium);

  const leaf_light = new THREE.InstancedMesh(
    leafGeom,
    leaf_lightMat,
    leaf_matrices[2].length
  );
  leaf_light.name = "leaf_light";
  for (let i = 0; i < leaf_matrices[2].length; i++) {
    leaf_light.setMatrixAt(i, leaf_matrices[2][i]);
  }
  leaf_light.instanceMatrix.needsUpdate = true;
  root.add(leaf_light);

  const leaf_veinsGeom = new THREE.CylinderGeometry(1, 1, 1, 6);
  const leaf_veins = new THREE.InstancedMesh(
    leaf_veinsGeom,
    leaf_veinsMat,
    leaf_specs.length
  );
  leaf_veins.name = "leaf_veins";
  const vein_dummy = new THREE.Object3D();
  for (let i = 0; i < leaf_specs.length; i++) {
    const spec = leaf_specs[i];
    const direction = new THREE.Vector3().subVectors(spec.tip, spec.base);
    const length = direction.length();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      leaf_up,
      direction.normalize()
    );
    const position = spec.base.clone().addScaledVector(direction, 0.48);
    position.z += 0.026;
    vein_dummy.position.copy(position);
    vein_dummy.quaternion.copy(quaternion);
    vein_dummy.scale.set(0.0042, length * 0.82, 0.0042);
    vein_dummy.updateMatrix();
    leaf_veins.setMatrixAt(i, vein_dummy.matrix);
  }
  leaf_veins.instanceMatrix.needsUpdate = true;
  root.add(leaf_veins);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}