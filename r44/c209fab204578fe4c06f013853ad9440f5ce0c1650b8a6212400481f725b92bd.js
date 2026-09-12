// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "street_lamp";

  const pedestal_group = new THREE.Group();
  pedestal_group.name = "pedestal_group";
  root.add(pedestal_group);

  const lantern_group = new THREE.Group();
  lantern_group.name = "lantern_group";
  root.add(lantern_group);

  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x211c13,
    metalness: 0.5,
    roughness: 0.38
  });

  const bronze_metalMat = new THREE.MeshStandardMaterial({
    color: 0x5b4218,
    metalness: 0.5,
    roughness: 0.42
  });

  const warm_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffe47a,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const warm_lightMat = new THREE.MeshStandardMaterial({
    color: 0xfff2ad,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xffe27a,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.9
  });

  function makeFrustumGeometry(bottomW, bottomD, topW, topD, height) {
    const bw = bottomW * 0.5;
    const bd = bottomD * 0.5;
    const tw = topW * 0.5;
    const td = topD * 0.5;
    const h = height * 0.5;

    const positions = [
      -bw, -h, -bd,
       bw, -h, -bd,
       bw, -h,  bd,
      -bw, -h,  bd,
      -tw,  h, -td,
       tw,  h, -td,
       tw,  h,  td,
      -tw,  h,  td
    ];

    const indices = [
      0, 2, 1, 0, 3, 2,
      4, 5, 6, 4, 6, 7,
      0, 1, 5, 0, 5, 4,
      1, 2, 6, 1, 6, 5,
      2, 3, 7, 2, 7, 6,
      3, 0, 4, 3, 4, 7
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const base_plinthProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.34, 0.00),
    new THREE.Vector2(0.41, 0.035),
    new THREE.Vector2(0.43, 0.075),
    new THREE.Vector2(0.42, 0.115),
    new THREE.Vector2(0.37, 0.155),
    new THREE.Vector2(0.35, 0.195),
    new THREE.Vector2(0.30, 0.235),
    new THREE.Vector2(0.27, 0.285),
    new THREE.Vector2(0.00, 0.285)
  ];
  const base_plinthGeom = new THREE.LatheGeometry(base_plinthProfile, 40);
  const base_plinth = new THREE.Mesh(base_plinthGeom, dark_metalMat);
  base_plinth.name = "base_plinth";
  pedestal_group.add(base_plinth);

  const base_trimGeom = new THREE.TorusGeometry(0.345, 0.018, 10, 40);
  const base_trim = new THREE.Mesh(base_trimGeom, bronze_metalMat);
  base_trim.name = "base_trim";
  base_trim.rotation.x = Math.PI / 2;
  base_trim.position.y = 0.17;
  pedestal_group.add(base_trim);

  const base_pedestalProfile = [
    new THREE.Vector2(0.00, 0.245),
    new THREE.Vector2(0.27, 0.245),
    new THREE.Vector2(0.25, 0.305),
    new THREE.Vector2(0.22, 0.365),
    new THREE.Vector2(0.19, 0.455),
    new THREE.Vector2(0.16, 0.595),
    new THREE.Vector2(0.14, 0.745),
    new THREE.Vector2(0.145, 0.835),
    new THREE.Vector2(0.17, 0.885),
    new THREE.Vector2(0.00, 0.885)
  ];
  const base_pedestalGeom = new THREE.LatheGeometry(base_pedestalProfile, 36);
  const base_pedestal = new THREE.Mesh(base_pedestalGeom, dark_metalMat);
  base_pedestal.name = "base_pedestal";
  pedestal_group.add(base_pedestal);

  const lower_collarProfile = [
    new THREE.Vector2(0.00, 0.82),
    new THREE.Vector2(0.15, 0.82),
    new THREE.Vector2(0.18, 0.855),
    new THREE.Vector2(0.20, 0.90),
    new THREE.Vector2(0.19, 0.945),
    new THREE.Vector2(0.16, 0.985),
    new THREE.Vector2(0.145, 1.02),
    new THREE.Vector2(0.00, 1.02)
  ];
  const lower_collarGeom = new THREE.LatheGeometry(lower_collarProfile, 36);
  const lower_collar = new THREE.Mesh(lower_collarGeom, dark_metalMat);
  lower_collar.name = "lower_collar";
  pedestal_group.add(lower_collar);

  const middle_shaftProfile = [
    new THREE.Vector2(0.00, 0.98),
    new THREE.Vector2(0.14, 0.98),
    new THREE.Vector2(0.135, 1.055),
    new THREE.Vector2(0.115, 1.13),
    new THREE.Vector2(0.10, 1.28),
    new THREE.Vector2(0.10, 1.47),
    new THREE.Vector2(0.115, 1.61),
    new THREE.Vector2(0.14, 1.68),
    new THREE.Vector2(0.00, 1.68)
  ];
  const middle_shaftGeom = new THREE.LatheGeometry(middle_shaftProfile, 36);
  const middle_shaft = new THREE.Mesh(middle_shaftGeom, dark_metalMat);
  middle_shaft.name = "middle_shaft";
  pedestal_group.add(middle_shaft);

  const middle_collarProfile = [
    new THREE.Vector2(0.00, 1.62),
    new THREE.Vector2(0.14, 1.62),
    new THREE.Vector2(0.17, 1.66),
    new THREE.Vector2(0.18, 1.705),
    new THREE.Vector2(0.16, 1.75),
    new THREE.Vector2(0.135, 1.79),
    new THREE.Vector2(0.115, 1.82),
    new THREE.Vector2(0.00, 1.82)
  ];
  const middle_collarGeom = new THREE.LatheGeometry(middle_collarProfile, 36);
  const middle_collar = new THREE.Mesh(middle_collarGeom, dark_metalMat);
  middle_collar.name = "middle_collar";
  pedestal_group.add(middle_collar);

  const upper_columnGeom = new THREE.CylinderGeometry(0.085, 0.10, 1.78, 28);
  const upper_column = new THREE.Mesh(upper_columnGeom, dark_metalMat);
  upper_column.name = "upper_column";
  upper_column.position.y = 2.68;
  pedestal_group.add(upper_column);

  const column_flutesGeom = new THREE.CylinderGeometry(0.007, 0.007, 1.68, 6);
  const column_flutes = new THREE.InstancedMesh(
    column_flutesGeom,
    bronze_metalMat,
    12
  );
  column_flutes.name = "column_flutes";
  const flute_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    flute_dummy.position.set(
      Math.cos(angle) * 0.091,
      2.68,
      Math.sin(angle) * 0.091
    );
    flute_dummy.rotation.set(0, 0, 0);
    flute_dummy.scale.set(1, 1, 1);
    flute_dummy.updateMatrix();
    column_flutes.setMatrixAt(i, flute_dummy.matrix);
  }
  column_flutes.instanceMatrix.needsUpdate = true;
  pedestal_group.add(column_flutes);

  const upper_column_lower_ringGeom = new THREE.TorusGeometry(0.105, 0.017, 10, 32);
  const upper_column_lower_ring = new THREE.Mesh(
    upper_column_lower_ringGeom,
    bronze_metalMat
  );
  upper_column_lower_ring.name = "upper_column_lower_ring";
  upper_column_lower_ring.rotation.x = Math.PI / 2;
  upper_column_lower_ring.position.y = 1.80;
  pedestal_group.add(upper_column_lower_ring);

  const upper_column_upper_ringGeom = new THREE.TorusGeometry(0.092, 0.015, 10, 32);
  const upper_column_upper_ring = new THREE.Mesh(
    upper_column_upper_ringGeom,
    bronze_metalMat
  );
  upper_column_upper_ring.name = "upper_column_upper_ring";
  upper_column_upper_ring.rotation.x = Math.PI / 2;
  upper_column_upper_ring.position.y = 3.55;
  pedestal_group.add(upper_column_upper_ring);

  const capitalProfile = [
    new THREE.Vector2(0.00, 3.50),
    new THREE.Vector2(0.095, 3.50),
    new THREE.Vector2(0.115, 3.54),
    new THREE.Vector2(0.12, 3.59),
    new THREE.Vector2(0.10, 3.64),
    new THREE.Vector2(0.10, 3.69),
    new THREE.Vector2(0.145, 3.735),
    new THREE.Vector2(0.16, 3.79),
    new THREE.Vector2(0.145, 3.845),
    new THREE.Vector2(0.115, 3.89),
    new THREE.Vector2(0.11, 3.94),
    new THREE.Vector2(0.15, 3.985),
    new THREE.Vector2(0.15, 4.02),
    new THREE.Vector2(0.00, 4.02)
  ];
  const capitalGeom = new THREE.LatheGeometry(capitalProfile, 36);
  const capital = new THREE.Mesh(capitalGeom, dark_metalMat);
  capital.name = "capital";
  pedestal_group.add(capital);

  const capital_trimGeom = new THREE.TorusGeometry(0.142, 0.012, 8, 32);
  const capital_trim = new THREE.Mesh(capital_trimGeom, bronze_metalMat);
  capital_trim.name = "capital_trim";
  capital_trim.rotation.x = Math.PI / 2;
  capital_trim.position.y = 3.985;
  pedestal_group.add(capital_trim);

  const lantern_support_stemGeom = new THREE.CylinderGeometry(0.035, 0.045, 0.22, 16);
  const lantern_support_stem = new THREE.Mesh(
    lantern_support_stemGeom,
    bronze_metalMat
  );
  lantern_support_stem.name = "lantern_support_stem";
  lantern_support_stem.position.y = 4.07;
  lantern_group.add(lantern_support_stem);

  const lantern_support_plateGeom = new THREE.CylinderGeometry(0.115, 0.13, 0.055, 24);
  const lantern_support_plate = new THREE.Mesh(
    lantern_support_plateGeom,
    bronze_metalMat
  );
  lantern_support_plate.name = "lantern_support_plate";
  lantern_support_plate.position.y = 4.17;
  lantern_group.add(lantern_support_plate);

  const scrollPath = [
    new THREE.Vector3(0.045, 4.15, 0),
    new THREE.Vector3(0.12, 4.15, 0),
    new THREE.Vector3(0.19, 4.19, 0),
    new THREE.Vector3(0.22, 4.25, 0),
    new THREE.Vector3(0.205, 4.31, 0),
    new THREE.Vector3(0.16, 4.34, 0),
    new THREE.Vector3(0.12, 4.32, 0),
    new THREE.Vector3(0.115, 4.28, 0),
    new THREE.Vector3(0.14, 4.25, 0)
  ];
  const decorative_scrollsGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(scrollPath, false, "centripetal"),
    32,
    0.014,
    8,
    false
  );
  const decorative_scrolls = new THREE.InstancedMesh(
    decorative_scrollsGeom,
    bronze_metalMat,
    4
  );
  decorative_scrolls.name = "decorative_scrolls";
  const scroll_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    scroll_dummy.position.set(0, 0, 0);
    scroll_dummy.rotation.set(0, -i / 4 * Math.PI * 2, 0);
    scroll_dummy.scale.set(1, 1, 1);
    scroll_dummy.updateMatrix();
    decorative_scrolls.setMatrixAt(i, scroll_dummy.matrix);
  }
  decorative_scrolls.instanceMatrix.needsUpdate = true;
  lantern_group.add(decorative_scrolls);

  const lantern_bottom_frameGeom = new THREE.BoxGeometry(0.62, 0.07, 0.50);
  const lantern_bottom_frame = new THREE.Mesh(
    lantern_bottom_frameGeom,
    bronze_metalMat
  );
  lantern_bottom_frame.name = "lantern_bottom_frame";
  lantern_bottom_frame.position.y = 4.21;
  lantern_group.add(lantern_bottom_frame);

  const lantern_bottom_trimGeom = new THREE.BoxGeometry(0.54, 0.035, 0.42);
  const lantern_bottom_trim = new THREE.Mesh(
    lantern_bottom_trimGeom,
    dark_metalMat
  );
  lantern_bottom_trim.name = "lantern_bottom_trim";
  lantern_bottom_trim.position.y = 4.255;
  lantern_group.add(lantern_bottom_trim);

  const lantern_glassGeom = makeFrustumGeometry(0.50, 0.38, 0.72, 0.56, 0.78);
  const lantern_glass = new THREE.Mesh(lantern_glassGeom, warm_glassMat);
  lantern_glass.name = "lantern_glass";
  lantern_glass.position.y = 4.66;
  lantern_glass.renderOrder = 2;
  lantern_group.add(lantern_glass);

  const lantern_lightGeom = makeFrustumGeometry(0.39, 0.29, 0.57, 0.43, 0.66);
  const lantern_light = new THREE.Mesh(lantern_lightGeom, warm_lightMat);
  lantern_light.name = "lantern_light";
  lantern_light.position.y = 4.66;
  lantern_light.renderOrder = 1;
  lantern_group.add(lantern_light);

  const lantern_corner_postsGeom = new THREE.CylinderGeometry(0.018, 0.018, 1, 10);
  const lantern_corner_posts = new THREE.InstancedMesh(
    lantern_corner_postsGeom,
    bronze_metalMat,
    4
  );
  lantern_corner_posts.name = "lantern_corner_posts";
  const post_dummy = new THREE.Object3D();
  const post_y_axis = new THREE.Vector3(0, 1, 0);
  let post_index = 0;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const bottom = new THREE.Vector3(sx * 0.25, 4.27, sz * 0.19);
      const top = new THREE.Vector3(sx * 0.36, 5.05, sz * 0.28);
      const direction = top.clone().sub(bottom);
      const length = direction.length();
      post_dummy.position.copy(bottom).add(top).multiplyScalar(0.5);
      post_dummy.quaternion.setFromUnitVectors(
        post_y_axis,
        direction.normalize()
      );
      post_dummy.scale.set(1, length, 1);
      post_dummy.updateMatrix();
      lantern_corner_posts.setMatrixAt(post_index++, post_dummy.matrix);
    }
  }
  lantern_corner_posts.instanceMatrix.needsUpdate = true;
  lantern_group.add(lantern_corner_posts);

  const lantern_top_frameGeom = new THREE.BoxGeometry(0.80, 0.075, 0.64);
  const lantern_top_frame = new THREE.Mesh(
    lantern_top_frameGeom,
    bronze_metalMat
  );
  lantern_top_frame.name = "lantern_top_frame";
  lantern_top_frame.position.y = 5.075;
  lantern_group.add(lantern_top_frame);

  const lantern_roofGeom = makeFrustumGeometry(0.88, 0.72, 0.23, 0.20, 0.34);
  const lantern_roof = new THREE.Mesh(lantern_roofGeom, dark_metalMat);
  lantern_roof.name = "lantern_roof";
  lantern_roof.position.y = 5.285;
  lantern_group.add(lantern_roof);

  const roof_capGeom = new THREE.BoxGeometry(0.27, 0.055, 0.24);
  const roof_cap = new THREE.Mesh(roof_capGeom, dark_metalMat);
  roof_cap.name = "roof_cap";
  roof_cap.position.y = 5.485;
  lantern_group.add(roof_cap);

  const finialProfile = [
    new THREE.Vector2(0.00, 5.48),
    new THREE.Vector2(0.075, 5.48),
    new THREE.Vector2(0.085, 5.515),
    new THREE.Vector2(0.065, 5.555),
    new THREE.Vector2(0.045, 5.585),
    new THREE.Vector2(0.045, 5.62),
    new THREE.Vector2(0.085, 5.65),
    new THREE.Vector2(0.10, 5.69),
    new THREE.Vector2(0.085, 5.735),
    new THREE.Vector2(0.05, 5.77),
    new THREE.Vector2(0.035, 5.80),
    new THREE.Vector2(0.035, 5.86),
    new THREE.Vector2(0.022, 5.92),
    new THREE.Vector2(0.00, 5.96)
  ];
  const finialGeom = new THREE.LatheGeometry(finialProfile, 28);
  const finial = new THREE.Mesh(finialGeom, dark_metalMat);
  finial.name = "finial";
  lantern_group.add(finial);

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