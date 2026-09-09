function __sn17_user(THREE) {
  const root = new THREE.Group();
  const jewelry_group = new THREE.Group();
  root.add(jewelry_group);

  const silver_material = new THREE.MeshStandardMaterial({
    color: 0xc8c6bd,
    metalness: 0.65,
    roughness: 0.28,
  });
  const polished_silver_material = new THREE.MeshStandardMaterial({
    color: 0xe2ded4,
    metalness: 0.7,
    roughness: 0.2,
  });
  const gemstone_body_material = new THREE.MeshPhysicalMaterial({
    color: 0x2f9fe8,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.35,
    thickness: 0.35,
    attenuationColor: 0x2f9fe8,
    attenuationDistance: 1.2,
    ior: 1.7,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    transparent: true,
    opacity: 0.96,
  });
  const gemstone_facets_material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.12,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  function create_rounded_rect_shape(width, height, radius) {
    const shape = new THREE.Shape();
    const left = -width / 2;
    const right = width / 2;
    const bottom = -height / 2;
    const top = height / 2;

    shape.moveTo(left + radius, bottom);
    shape.lineTo(right - radius, bottom);
    shape.quadraticCurveTo(right, bottom, right, bottom + radius);
    shape.lineTo(right, top - radius);
    shape.quadraticCurveTo(right, top, right - radius, top);
    shape.lineTo(left + radius, top);
    shape.quadraticCurveTo(left, top, left, top - radius);
    shape.lineTo(left, bottom + radius);
    shape.quadraticCurveTo(left, bottom, left + radius, bottom);
    shape.closePath();
    return shape;
  }

  function create_rounded_rect_path(width, height, radius, z) {
    const path = new THREE.Path();
    const left = -width / 2;
    const right = width / 2;
    const bottom = -height / 2;
    const top = height / 2;

    path.moveTo(left + radius, bottom, z);
    path.lineTo(right - radius, bottom, z);
    path.quadraticCurveTo(right, bottom, right, bottom + radius, z);
    path.lineTo(right, top - radius, z);
    path.quadraticCurveTo(right, top, right - radius, top, z);
    path.lineTo(left + radius, top, z);
    path.quadraticCurveTo(left, top, left, top - radius, z);
    path.lineTo(left, bottom + radius, z);
    path.quadraticCurveTo(left, bottom, left + radius, bottom, z);
    path.closePath();
    return path;
  }

  function create_cushion_points(width, height, z) {
    const hw = width / 2;
    const hh = height / 2;
    return [
      new THREE.Vector3(-hw * 0.72, hh, z),
      new THREE.Vector3(hw * 0.72, hh, z),
      new THREE.Vector3(hw, hh * 0.58, z),
      new THREE.Vector3(hw, -hh * 0.58, z),
      new THREE.Vector3(hw * 0.72, -hh, z),
      new THREE.Vector3(-hw * 0.72, -hh, z),
      new THREE.Vector3(-hw, -hh * 0.58, z),
      new THREE.Vector3(-hw, hh * 0.58, z),
    ];
  }

  const post_geom = new THREE.CylinderGeometry(0.035, 0.035, 1.25, 24);
  const post = new THREE.Mesh(post_geom, polished_silver_material);
  post.rotation.x = Math.PI / 2;
  post.position.set(0, 0, -0.64);
  jewelry_group.add(post);

  const post_tip_geom = new THREE.SphereGeometry(0.045, 20, 12);
  const post_tip = new THREE.Mesh(post_tip_geom, polished_silver_material);
  post_tip.scale.set(1.0, 1.0, 0.75);
  post_tip.position.set(0, 0, -1.29);
  jewelry_group.add(post_tip);

  const post_collar_geom = new THREE.TorusGeometry(0.045, 0.012, 10, 28);
  const post_collar = new THREE.Mesh(post_collar_geom, polished_silver_material);
  post_collar.position.set(0, 0, -0.055);
  jewelry_group.add(post_collar);

  const setting_back_shape = create_rounded_rect_shape(0.94, 1.08, 0.23);
  const setting_back_geom = new THREE.ExtrudeGeometry(setting_back_shape, {
    depth: 0.12,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 4,
  });
  const setting_back = new THREE.Mesh(setting_back_geom, silver_material);
  setting_back.position.z = -0.12;
  jewelry_group.add(setting_back);

  const bezel_shape = create_rounded_rect_shape(0.98, 1.12, 0.24);
  const bezel_hole_path = create_rounded_rect_path(0.80, 0.94, 0.18, 0);
  bezel_shape.holes.push(bezel_hole_path);

  const bezel_frame_geom = new THREE.ExtrudeGeometry(bezel_shape, {
    depth: 0.13,
    steps: 1,
    curveSegments: 18,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 4,
  });
  const bezel_frame = new THREE.Mesh(bezel_frame_geom, silver_material);
  jewelry_group.add(bezel_frame);

  const gemstone_body_shape = create_rounded_rect_shape(0.80, 0.94, 0.18);
  const gemstone_body_geom = new THREE.ExtrudeGeometry(gemstone_body_shape, {
    depth: 0.10,
    steps: 1,
    curveSegments: 18,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  const gemstone_body = new THREE.Mesh(gemstone_body_geom, gemstone_body_material);
  gemstone_body.position.z = 0.04;
  jewelry_group.add(gemstone_body);

  const outer_points = create_cushion_points(0.78, 0.92, 0.165);
  const middle_points = create_cushion_points(0.58, 0.70, 0.215);
  const table_points = create_cushion_points(0.34, 0.42, 0.238);
  const facet_positions = [];
  const facet_colors = [];
  const facet_palette = [
    0xbfeaff,
    0x7fd4ff,
    0x45add8,
    0x2488c5,
    0x1268a5,
    0xd9f7ff,
    0x8ccdf3,
    0x347fb3,
    0x68c7ef,
    0x1f9dcc,
    0xaee8ff,
    0x2b76ae,
  ];

  function push_facet(a, b, c, color_value) {
    facet_positions.push(
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z
    );
    const color = new THREE.Color(color_value);
    for (let i = 0; i < 3; i++) {
      facet_colors.push(color.r, color.g, color.b);
    }
  }

  for (let i = 0; i < 8; i++) {
    const j = (i + 1) % 8;
    push_facet(
      outer_points[i],
      outer_points[j],
      middle_points[j],
      facet_palette[(i * 2) % facet_palette.length]
    );
    push_facet(
      outer_points[i],
      middle_points[j],
      middle_points[i],
      facet_palette[(i * 2 + 5) % facet_palette.length]
    );
  }

  for (let i = 0; i < 8; i++) {
    const j = (i + 1) % 8;
    push_facet(
      middle_points[i],
      middle_points[j],
      table_points[j],
      facet_palette[(i * 3 + 2) % facet_palette.length]
    );
    push_facet(
      middle_points[i],
      table_points[j],
      table_points[i],
      facet_palette[(i * 3 + 7) % facet_palette.length]
    );
  }

  const table_center = new THREE.Vector3(0, 0, 0.238);
  for (let i = 0; i < 8; i++) {
    const j = (i + 1) % 8;
    push_facet(
      table_points[i],
      table_points[j],
      table_center,
      facet_palette[(i + 5) % facet_palette.length]
    );
  }

  const gemstone_facets_geom = new THREE.BufferGeometry();
  gemstone_facets_geom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(facet_positions, 3)
  );
  gemstone_facets_geom.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(facet_colors, 3)
  );
  gemstone_facets_geom.computeVertexNormals();

  const gemstone_facets = new THREE.Mesh(
    gemstone_facets_geom,
    gemstone_facets_material
  );
  jewelry_group.add(gemstone_facets);

  const bezel_lip_points = [];
  const lip_count = 32;
  for (let i = 0; i < lip_count; i++) {
    const angle = (i / lip_count) * Math.PI * 2;
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const x_sign = cosine < 0 ? -1 : 1;
    const y_sign = sine < 0 ? -1 : 1;
    const x = x_sign * Math.pow(Math.abs(cosine), 0.38) * 0.405;
    const y = y_sign * Math.pow(Math.abs(sine), 0.38) * 0.475;
    bezel_lip_points.push(new THREE.Vector3(x, y, 0.18));
  }

  const bezel_lip_curve = new THREE.CatmullRomCurve3(
    bezel_lip_points,
    true,
    "centripetal"
  );
  const bezel_lip_geom = new THREE.TubeGeometry(
    bezel_lip_curve,
    72,
    0.018,
    8,
    true
  );
  const bezel_lip = new THREE.Mesh(bezel_lip_geom, polished_silver_material);
  jewelry_group.add(bezel_lip);

  jewelry_group.rotation.set(-0.08, -0.18, -0.10);

  fit_to_unit_cube(root);
  return root;

  function fit_to_unit_cube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const max_dim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / max_dim;
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
