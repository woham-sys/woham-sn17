function __sn17_user(THREE) {
  const root = new THREE.Group();
  const pendant_group = new THREE.Group();
  pendant_group.name = "pendant_group";
  pendant_group.rotation.set(-0.04, -0.18, -0.24);
  root.add(pendant_group);

  const crystal_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.42,
    thickness: 0.18,
    attenuationColor: 0xf4fbff,
    attenuationDistance: 3.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    side: THREE.DoubleSide,
    flatShading: true,
    depthWrite: false,
  });

  const crystal_edgesMat = new THREE.LineBasicMaterial({
    color: 0xe9f7ff,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
  });

  const internal_fracturesMat = new THREE.MeshStandardMaterial({
    color: 0xfff4d6,
    transparent: true,
    opacity: 0.38,
    emissive: 0xffd99a,
    emissiveIntensity: 0.18,
    depthWrite: false,
  });

  const internal_inclusionsMat = new THREE.MeshStandardMaterial({
    color: 0x77828b,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
  });

  const internal_sparklesMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
  });

  const metal_bailMat = new THREE.MeshStandardMaterial({
    color: 0xd5d5d5,
    metalness: true,
    roughness: 0.1,
  });

  const bail_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.82,
  });

  const crystal_outline = [
    new THREE.Vector2(-0.24, 1.02),
    new THREE.Vector2(0.18, 1.02),
    new THREE.Vector2(0.38, 0.78),
    new THREE.Vector2(0.43, 0.48),
    new THREE.Vector2(0.43, -0.70),
    new THREE.Vector2(0.18, -1.12),
    new THREE.Vector2(-0.22, -1.12),
    new THREE.Vector2(-0.43, -0.78),
    new THREE.Vector2(-0.43, 0.55),
    new THREE.Vector2(-0.34, 0.82),
  ];

  const front_z = 0.22;
  const back_z = -0.22;
  const front_scale = 0.94;
  const center_y = -0.05;

  const front_ring = crystal_outline.map(
    (point) => new THREE.Vector3(point.x * front_scale, center_y + (point.y - center_y) * front_scale, front_z)
  );
  const back_ring = crystal_outline.map(
    (point) => new THREE.Vector3(point.x, point.y, back_z)
  );
  const front_center = new THREE.Vector3(-0.015, -0.08, front_z);
  const back_center = new THREE.Vector3(0.025, -0.03, back_z);

  const crystal_positions = [];
  const crystal_colors = [];
  const facet_color = new THREE.Color();

  function addFacet(a, b, c, hex, brightness) {
    const start = crystal_positions.length / 3;
    crystal_positions.push(
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z
    );
    facet_color.setHex(hex).multiplyScalar(brightness);
    for (let i = 0; i < 3; i++) {
      crystal_colors.push(facet_color.r, facet_color.g, facet_color.b);
    }
  }

  const front_facet_colors = [
    0xffffff, 0xf3fbff, 0xe8eef0, 0xffffff, 0xf7f0df,
    0xeaf8ff, 0xffffff, 0xedf4f6, 0xfbffff, 0xe8edef,
  ];
  const side_facet_colors = [
    0xe7eff1, 0xf5fbff, 0xcfd8da, 0xf8ffff, 0xe4ecee,
    0xffefd7, 0xe8f3f7, 0xf6f8f8, 0xe9eff0, 0xe4ecef,
  ];

  for (let i = 0; i < front_ring.length; i++) {
    const next = (i + 1) % front_ring.length;
    addFacet(
      front_center,
      front_ring[i],
      front_ring[next],
      front_facet_colors[i],
      0.92 + (i % 4) * 0.025
    );
  }

  for (let i = 0; i < back_ring.length; i++) {
    const next = (i + 1) % back_ring.length;
    addFacet(
      back_center,
      back_ring[next],
      back_ring[i],
      front_facet_colors[(i + 3) % front_facet_colors.length],
      0.88 + (i % 3) * 0.025
    );
  }

  for (let i = 0; i < crystal_outline.length; i++) {
    const next = (i + 1) % crystal_outline.length;
    addFacet(
      front_ring[i],
      back_ring[i],
      back_ring[next],
      side_facet_colors[i],
      0.96
    );
    addFacet(
      front_ring[i],
      back_ring[next],
      front_ring[next],
      side_facet_colors[(i + 2) % side_facet_colors.length],
      0.94
    );
  }

  const crystal_bodyGeom = new THREE.BufferGeometry();
  crystal_bodyGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(crystal_positions, 3)
  );
  crystal_bodyGeom.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(crystal_colors, 3)
  );
  crystal_bodyGeom.computeVertexNormals();

  const crystal_body = new THREE.Mesh(crystal_bodyGeom, crystal_bodyMat);
  crystal_body.name = "crystal_body";
  crystal_body.renderOrder = 1;
  pendant_group.add(crystal_body);

  const crystal_edgesGeom = new THREE.EdgesGeometry(crystal_bodyGeom, 10);
  const crystal_edges = new THREE.LineSegments(crystal_edgesGeom, crystal_edgesMat);
  crystal_edges.name = "crystal_edges";
  crystal_edges.renderOrder = 2;
  pendant_group.add(crystal_edges);

  const internal_fractures = new THREE.Group();
  internal_fractures.name = "internal_fractures";
  const fracture_paths = [
    [
      new THREE.Vector3(-0.31, -0.73, 0.08),
      new THREE.Vector3(-0.18, -0.48, 0.10),
      new THREE.Vector3(-0.24, -0.22, 0.07),
    ],
    [
      new THREE.Vector3(0.18, 0.62, 0.04),
      new THREE.Vector3(0.08, 0.36, 0.08),
      new THREE.Vector3(0.15, 0.08, 0.05),
    ],
    [
      new THREE.Vector3(-0.12, 0.82, -0.04),
      new THREE.Vector3(0.02, 0.58, 0.00),
      new THREE.Vector3(-0.04, 0.32, 0.03),
    ],
    [
      new THREE.Vector3(-0.30, 0.18, -0.02),
      new THREE.Vector3(-0.10, 0.04, 0.03),
      new THREE.Vector3(0.10, -0.10, 0.01),
    ],
    [
      new THREE.Vector3(0.28, -0.38, 0.02),
      new THREE.Vector3(0.12, -0.55, 0.07),
      new THREE.Vector3(0.18, -0.78, 0.04),
    ],
    [
      new THREE.Vector3(-0.20, 0.48, 0.11),
      new THREE.Vector3(-0.05, 0.28, 0.12),
      new THREE.Vector3(0.08, 0.06, 0.09),
    ],
  ];

  for (let i = 0; i < fracture_paths.length; i++) {
    const fracture_curve = new THREE.CatmullRomCurve3(fracture_paths[i]);
    const fracture_geo = new THREE.TubeGeometry(
      fracture_curve,
      8,
      i % 2 === 0 ? 0.006 : 0.004,
      5,
      false
    );
    const fracture_mesh = new THREE.Mesh(fracture_geo, internal_fracturesMat);
    fracture_mesh.name = "internal_fracture_" + i;
    fracture_mesh.renderOrder = 3;
    internal_fractures.add(fracture_mesh);
  }
  pendant_group.add(internal_fractures);

  const internal_inclusionsGeom = new THREE.TetrahedronGeometry(0.045, 0);
  const inclusion_data = [
    [-0.22, -0.84, 0.10, 1.25, 0.75, 0.55, 0.20, 0.40, 0.10],
    [-0.15, -0.88, 0.08, 0.85, 1.15, 0.65, 0.70, 0.10, 0.40],
    [-0.08, -0.82, 0.12, 0.70, 0.80, 0.50, 0.30, 0.90, 0.20],
    [0.02, -0.86, 0.07, 0.55, 0.75, 0.45, 0.90, 0.20, 0.60],
    [-0.27, -0.75, 0.04, 0.55, 0.60, 0.42, 0.40, 0.80, 0.30],
    [0.12, -0.72, 0.11, 0.42, 0.55, 0.38, 0.20, 0.60, 0.90],
    [-0.18, 0.55, 0.03, 0.36, 0.50, 0.32, 0.80, 0.30, 0.20],
    [0.16, 0.32, 0.08, 0.30, 0.44, 0.28, 0.30, 0.70, 0.40],
    [-0.08, -0.30, -0.04, 0.32, 0.46, 0.30, 0.60, 0.20, 0.80],
    [0.22, -0.52, -0.02, 0.28, 0.38, 0.26, 0.10, 0.80, 0.50],
  ];

  const internal_inclusions = new THREE.InstancedMesh(
    internal_inclusionsGeom,
    internal_inclusionsMat,
    inclusion_data.length
  );
  internal_inclusions.name = "internal_inclusions";
  const inclusion_dummy = new THREE.Object3D();
  for (let i = 0; i < inclusion_data.length; i++) {
    const data = inclusion_data[i];
    inclusion_dummy.position.set(data[0], data[1], data[2]);
    inclusion_dummy.scale.set(data[3], data[4], data[5]);
    inclusion_dummy.rotation.set(data[6], data[7], data[8]);
    inclusion_dummy.updateMatrix();
    internal_inclusions.setMatrixAt(i, inclusion_dummy.matrix);
  }
  internal_inclusions.instanceMatrix.needsUpdate = true;
  internal_inclusions.renderOrder = 3;
  pendant_group.add(internal_inclusions);

  const internal_sparklesGeom = new THREE.SphereGeometry(0.009, 6, 4);
  const sparkle_count = 24;
  const internal_sparkles = new THREE.InstancedMesh(
    internal_sparklesGeom,
    internal_sparklesMat,
    sparkle_count
  );
  internal_sparkles.name = "internal_sparkles";
  const sparkle_dummy = new THREE.Object3D();
  for (let i = 0; i < sparkle_count; i++) {
    const y = -0.91 + (((i * 7) % 23) / 22) * 1.82;
    const half_width = y > 0.65 ? 0.20 : y < -0.70 ? 0.22 : 0.31;
    const x = -half_width + (((i * 11) % 19) / 18) * half_width * 2;
    const z = -0.10 + (((i * 5) % 13) / 12) * 0.20;
    const scale = 0.55 + (i % 4) * 0.18;
    sparkle_dummy.position.set(x, y, z);
    sparkle_dummy.scale.setScalar(scale);
    sparkle_dummy.rotation.set(i * 0.31, i * 0.17, i * 0.23);
    sparkle_dummy.updateMatrix();
    internal_sparkles.setMatrixAt(i, sparkle_dummy.matrix);
  }
  internal_sparkles.instanceMatrix.needsUpdate = true;
  internal_sparkles.renderOrder = 3;
  pendant_group.add(internal_sparkles);

  const metal_bail_points = [];
  const bail_point_count = 24;
  for (let i = 0; i < bail_point_count; i++) {
    const angle = (i / bail_point_count) * Math.PI * 2;
    metal_bail_points.push(
      new THREE.Vector3(
        Math.cos(angle) * 0.13,
        Math.sin(angle) * 0.23,
        0
      )
    );
  }
  const metal_bail_curve = new THREE.CatmullRomCurve3(
    metal_bail_points,
    true,
    "centripetal"
  );
  const metal_bailGeom = new THREE.TubeGeometry(
    metal_bail_curve,
    48,
    0.035,
    12,
    true
  );
  const metal_bail = new THREE.Mesh(metal_bailGeom, metal_bailMat);
  metal_bail.name = "metal_bail";
  metal_bail.position.set(0.015, 1.17, -0.07);
  metal_bail.rotation.set(0, -0.28, 0.08);
  pendant_group.add(metal_bail);

  const bail_highlight_points = [];
  for (let i = 0; i < bail_point_count; i++) {
    const angle = (i / bail_point_count) * Math.PI * 2;
    bail_highlight_points.push(
      new THREE.Vector3(
        Math.cos(angle) * 0.13,
        Math.sin(angle) * 0.23,
        0.034
      )
    );
  }
  const bail_highlight_curve = new THREE.CatmullRomCurve3(
    bail_highlight_points,
    true,
    "centripetal"
  );
  const bail_highlightGeom = new THREE.TubeGeometry(
    bail_highlight_curve,
    48,
    0.006,
    6,
    true
  );
  const bail_highlight = new THREE.Mesh(bail_highlightGeom, bail_highlightMat);
  bail_highlight.name = "bail_highlight";
  bail_highlight.position.copy(metal_bail.position);
  bail_highlight.rotation.copy(metal_bail.rotation);
  bail_highlight.renderOrder = 4;
  pendant_group.add(bail_highlight);

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
