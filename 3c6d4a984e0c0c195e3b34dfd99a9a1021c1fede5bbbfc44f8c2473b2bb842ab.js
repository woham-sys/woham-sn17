function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "electric_pencil_sharpener";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  root.add(body_group);

  const aperture_group = new THREE.Group();
  aperture_group.name = "aperture_group";
  root.add(aperture_group);

  const detail_group = new THREE.Group();
  detail_group.name = "detail_group";
  root.add(detail_group);

  const black_gloss_mat = new THREE.MeshStandardMaterial({
    color: 0x171518,
    metalness: 0.0,
    roughness: 0.16
  });
  const dark_panel_mat = new THREE.MeshStandardMaterial({
    color: 0x211f22,
    metalness: 0.0,
    roughness: 0.22,
    side: THREE.DoubleSide
  });
  const black_trim_mat = new THREE.MeshStandardMaterial({
    color: 0x050506,
    metalness: 0.0,
    roughness: 0.35
  });
  const rubber_mat = new THREE.MeshStandardMaterial({
    color: 0x080809,
    metalness: 0.0,
    roughness: 0.8
  });
  const silver_mat = new THREE.MeshStandardMaterial({
    color: 0xb8b8b2,
    metalness: 0.45,
    roughness: 0.25
  });
  const brushed_metal_mat = new THREE.MeshStandardMaterial({
    color: 0x858581,
    metalness: 0.5,
    roughness: 0.45
  });
  const logo_mat = new THREE.MeshStandardMaterial({
    color: 0x343236,
    metalness: 0.0,
    roughness: 0.35
  });
  const bore_mat = new THREE.MeshStandardMaterial({
    color: 0x020202,
    metalness: 0.0,
    roughness: 0.85
  });

  function create_side_extrusion(shape, width, bevel_size) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      curveSegments: 24,
      steps: 1,
      depth: width,
      bevelEnabled: true,
      bevelThickness: bevel_size,
      bevelSize: bevel_size,
      bevelOffset: 0,
      bevelSegments: 5
    });
    geometry.translate(0, 0, -width / 2);
    return geometry;
  }

  const main_body_shape = new THREE.Shape();
  main_body_shape.moveTo(-0.58, -0.34);
  main_body_shape.lineTo(0.50, -0.34);
  main_body_shape.quadraticCurveTo(0.58, -0.34, 0.58, -0.26);
  main_body_shape.lineTo(0.58, 0.25);
  main_body_shape.bezierCurveTo(0.58, 0.39, 0.49, 0.49, 0.35, 0.53);
  main_body_shape.lineTo(-0.17, 0.53);
  main_body_shape.bezierCurveTo(-0.29, 0.53, -0.38, 0.47, -0.44, 0.37);
  main_body_shape.lineTo(-0.58, 0.12);
  main_body_shape.bezierCurveTo(-0.62, 0.05, -0.62, -0.04, -0.61, -0.12);
  main_body_shape.lineTo(-0.61, -0.27);
  main_body_shape.quadraticCurveTo(-0.61, -0.34, -0.54, -0.34);
  main_body_shape.closePath();

  const main_body_geom = create_side_extrusion(main_body_shape, 0.62, 0.035);
  const main_body = new THREE.Mesh(main_body_geom, black_gloss_mat);
  main_body.name = "main_body";
  main_body.rotation.y = -Math.PI / 2;
  body_group.add(main_body);

  const base_trim_shape = new THREE.Shape();
  base_trim_shape.moveTo(-0.56, -0.375);
  base_trim_shape.lineTo(0.53, -0.375);
  base_trim_shape.quadraticCurveTo(0.59, -0.375, 0.59, -0.34);
  base_trim_shape.quadraticCurveTo(0.59, -0.31, 0.53, -0.31);
  base_trim_shape.lineTo(-0.54, -0.31);
  base_trim_shape.quadraticCurveTo(-0.59, -0.31, -0.59, -0.34);
  base_trim_shape.quadraticCurveTo(-0.59, -0.37, -0.54, -0.375);
  base_trim_shape.closePath();

  const base_trim_geom = create_side_extrusion(base_trim_shape, 0.66, 0.012);
  const base_trim = new THREE.Mesh(base_trim_geom, black_trim_mat);
  base_trim.name = "base_trim";
  base_trim.rotation.y = -Math.PI / 2;
  body_group.add(base_trim);

  const foot_geom = new THREE.CylinderGeometry(0.035, 0.032, 0.025, 16);
  const feet = new THREE.InstancedMesh(foot_geom, rubber_mat, 4);
  feet.name = "feet";
  const foot_dummy = new THREE.Object3D();
  const foot_positions = [
    [-0.22, -0.392, 0.42],
    [0.22, -0.392, 0.42],
    [-0.22, -0.392, -0.42],
    [0.22, -0.392, -0.42]
  ];
  for (let i = 0; i < foot_positions.length; i++) {
    foot_dummy.position.set(
      foot_positions[i][0],
      foot_positions[i][1],
      foot_positions[i][2]
    );
    foot_dummy.updateMatrix();
    feet.setMatrixAt(i, foot_dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  body_group.add(feet);

  const side_panel_shape = new THREE.Shape();
  side_panel_shape.moveTo(-0.50, -0.29);
  side_panel_shape.lineTo(0.49, -0.29);
  side_panel_shape.quadraticCurveTo(0.53, -0.29, 0.53, -0.24);
  side_panel_shape.lineTo(0.53, 0.17);
  side_panel_shape.quadraticCurveTo(0.53, 0.22, 0.48, 0.24);
  side_panel_shape.lineTo(0.13, 0.24);
  side_panel_shape.quadraticCurveTo(0.08, 0.24, 0.04, 0.19);
  side_panel_shape.lineTo(-0.47, -0.22);
  side_panel_shape.quadraticCurveTo(-0.52, -0.26, -0.50, -0.29);
  side_panel_shape.closePath();

  const side_panel_geom = new THREE.ShapeGeometry(side_panel_shape, 20);

  const right_side_panel = new THREE.Mesh(side_panel_geom, dark_panel_mat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.rotation.y = Math.PI / 2;
  right_side_panel.position.x = 0.351;
  detail_group.add(right_side_panel);

  const left_side_panel = new THREE.Mesh(side_panel_geom, dark_panel_mat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.rotation.y = -Math.PI / 2;
  left_side_panel.scale.x = -1;
  left_side_panel.position.x = -0.351;
  detail_group.add(left_side_panel);

  const panel_seam_points = [
    new THREE.Vector3(0, -0.275, 0.50),
    new THREE.Vector3(0, -0.20, 0.39),
    new THREE.Vector3(0, 0.03, 0.12),
    new THREE.Vector3(0, 0.19, -0.04),
    new THREE.Vector3(0, 0.235, -0.14),
    new THREE.Vector3(0, 0.235, -0.49)
  ];
  const panel_seam_curve = new THREE.CatmullRomCurve3(
    panel_seam_points,
    false,
    "centripetal"
  );
  const panel_seam_geom = new THREE.TubeGeometry(
    panel_seam_curve,
    36,
    0.006,
    8,
    false
  );

  const right_panel_seam = new THREE.Mesh(panel_seam_geom, black_trim_mat);
  right_panel_seam.name = "right_panel_seam";
  right_panel_seam.position.x = 0.359;
  detail_group.add(right_panel_seam);

  const left_panel_seam = new THREE.Mesh(panel_seam_geom, black_trim_mat);
  left_panel_seam.name = "left_panel_seam";
  left_panel_seam.position.x = -0.359;
  detail_group.add(left_panel_seam);

  const upper_slot_geom = new THREE.BoxGeometry(0.47, 0.014, 0.018);
  const upper_slot = new THREE.Mesh(upper_slot_geom, black_trim_mat);
  upper_slot.name = "upper_slot";
  upper_slot.position.set(0, 0.238, 0.105);
  detail_group.add(upper_slot);

  const slot_lip_geom = new THREE.BoxGeometry(0.43, 0.008, 0.012);
  const slot_lip = new THREE.Mesh(slot_lip_geom, brushed_metal_mat);
  slot_lip.name = "slot_lip";
  slot_lip.position.set(0, 0.226, 0.116);
  detail_group.add(slot_lip);

  const logo_plate_geom = new THREE.BoxGeometry(0.28, 0.09, 0.012);
  const logo_plate = new THREE.Mesh(logo_plate_geom, logo_mat);
  logo_plate.name = "logo_plate";
  logo_plate.position.set(0, 0.365, 0.245);
  detail_group.add(logo_plate);

  const logo_border_points = [
    new THREE.Vector3(-0.13, 0.325, 0.254),
    new THREE.Vector3(0.13, 0.325, 0.254),
    new THREE.Vector3(0.14, 0.335, 0.254),
    new THREE.Vector3(0.14, 0.395, 0.254),
    new THREE.Vector3(0.13, 0.405, 0.254),
    new THREE.Vector3(-0.13, 0.405, 0.254),
    new THREE.Vector3(-0.14, 0.395, 0.254),
    new THREE.Vector3(-0.14, 0.335, 0.254)
  ];
  const logo_border_curve = new THREE.CatmullRomCurve3(
    logo_border_points,
    true,
    "centripetal"
  );
  const logo_border_geom = new THREE.TubeGeometry(
    logo_border_curve,
    40,
    0.0035,
    6,
    true
  );
  const logo_border = new THREE.Mesh(logo_border_geom, brushed_metal_mat);
  logo_border.name = "logo_border";
  detail_group.add(logo_border);

  const logo_glyphs = [
    [
      [0, 0, 0, 1],
      [0, 1, 1, 1],
      [0, 0.55, 0.72, 0.55],
      [0.48, 0.55, 1, 1]
    ],
    [
      [0, 0, 0, 1],
      [0, 1, 0.85, 1],
      [0.85, 1, 0.85, 0.55],
      [0, 0.55, 0.85, 0.55],
      [0.45, 0.55, 1, 0]
    ],
    [
      [0, 0, 0, 1],
      [0, 1, 0.85, 1],
      [0.85, 1, 0.85, 0],
      [0, 0, 0.85, 0]
    ],
    [
      [0, 0, 0, 1],
      [0, 1, 0.85, 1],
      [0.85, 1, 0.85, 0],
      [0, 0, 0.85, 0]
    ],
    [
      [0.85, 1, 0, 1],
      [0, 1, 0, 0],
      [0, 0, 0.85, 0]
    ],
    [
      [0, 0, 0, 1],
      [0, 1, 0.85, 1],
      [0.85, 1, 0.85, 0.52],
      [0.85, 0.52, 0, 0.52],
      [0.48, 0.52, 1, 0]
    ]
  ];

  const logo_segments = [];
  const logo_start_x = -0.105;
  const logo_base_y = 0.342;
  const logo_letter_width = 0.026;
  const logo_gap = 0.007;
  const logo_height = 0.045;

  for (let i = 0; i < logo_glyphs.length; i++) {
    const offset_x = logo_start_x + i * (logo_letter_width + logo_gap);
    const glyph = logo_glyphs[i];
    for (let j = 0; j < glyph.length; j++) {
      const segment = glyph[j];
      logo_segments.push([
        offset_x + segment[0] * logo_letter_width,
        logo_base_y + segment[1] * logo_height,
        offset_x + segment[2] * logo_letter_width,
        logo_base_y + segment[3] * logo_height
      ]);
    }
  }

  const logo_stroke_geom = new THREE.CylinderGeometry(0.0024, 0.0024, 1, 6);
  const logo_strokes = new THREE.InstancedMesh(
    logo_stroke_geom,
    brushed_metal_mat,
    logo_segments.length
  );
  logo_strokes.name = "logo_strokes";

  const stroke_dummy = new THREE.Object3D();
  const stroke_up = new THREE.Vector3(0, 1, 0);
  const stroke_start = new THREE.Vector3();
  const stroke_end = new THREE.Vector3();
  const stroke_direction = new THREE.Vector3();
  const stroke_midpoint = new THREE.Vector3();

  for (let i = 0; i < logo_segments.length; i++) {
    const segment = logo_segments[i];
    stroke_start.set(segment[0], segment[1], 0.261);
    stroke_end.set(segment[2], segment[3], 0.261);
    stroke_direction.subVectors(stroke_end, stroke_start);
    const length = stroke_direction.length();
    stroke_direction.normalize();
    stroke_midpoint.addVectors(stroke_start, stroke_end).multiplyScalar(0.5);

    stroke_dummy.position.copy(stroke_midpoint);
    stroke_dummy.quaternion.setFromUnitVectors(stroke_up, stroke_direction);
    stroke_dummy.scale.set(1, length, 1);
    stroke_dummy.updateMatrix();
    logo_strokes.setMatrixAt(i, stroke_dummy.matrix);
  }
  logo_strokes.instanceMatrix.needsUpdate = true;
  detail_group.add(logo_strokes);

  const large_aperture_group = new THREE.Group();
  large_aperture_group.name = "large_aperture_group";
  large_aperture_group.position.set(0, 0.205, 0.555);
  large_aperture_group.rotation.x = 0.42;
  aperture_group.add(large_aperture_group);

  const large_aperture_collar_geom = new THREE.CylinderGeometry(
    0.073,
    0.073,
    0.035,
    32
  );
  const large_aperture_collar = new THREE.Mesh(
    large_aperture_collar_geom,
    black_trim_mat
  );
  large_aperture_collar.name = "large_aperture_collar";
  large_aperture_collar.rotation.x = Math.PI / 2;
  large_aperture_collar.position.z = 0.006;
  large_aperture_group.add(large_aperture_collar);

  const large_aperture_knurled_ring_geom = new THREE.CylinderGeometry(
    0.058,
    0.058,
    0.052,
    32
  );
  const large_aperture_knurled_ring = new THREE.Mesh(
    large_aperture_knurled_ring_geom,
    silver_mat
  );
  large_aperture_knurled_ring.name = "large_aperture_knurled_ring";
  large_aperture_knurled_ring.rotation.x = Math.PI / 2;
  large_aperture_knurled_ring.position.z = 0.038;
  large_aperture_group.add(large_aperture_knurled_ring);

  const large_aperture_ridge_geom = new THREE.BoxGeometry(
    0.008,
    0.014,
    0.048
  );
  const large_aperture_ridges = new THREE.InstancedMesh(
    large_aperture_ridge_geom,
    brushed_metal_mat,
    24
  );
  large_aperture_ridges.name = "large_aperture_ridges";
  const ridge_dummy = new THREE.Object3D();

  for (let i = 0; i < 24; i++) {
    const angle = i / 24 * Math.PI * 2;
    ridge_dummy.position.set(
      Math.cos(angle) * 0.061,
      Math.sin(angle) * 0.061,
      0.039
    );
    ridge_dummy.rotation.set(0, 0, angle - Math.PI / 2);
    ridge_dummy.updateMatrix();
    large_aperture_ridges.setMatrixAt(i, ridge_dummy.matrix);
  }
  large_aperture_ridges.instanceMatrix.needsUpdate = true;
  large_aperture_group.add(large_aperture_ridges);

  const large_aperture_bore_geom = new THREE.CylinderGeometry(
    0.038,
    0.038,
    0.014,
    32
  );
  const large_aperture_bore = new THREE.Mesh(
    large_aperture_bore_geom,
    bore_mat
  );
  large_aperture_bore.name = "large_aperture_bore";
  large_aperture_bore.rotation.x = Math.PI / 2;
  large_aperture_bore.position.z = 0.068;
  large_aperture_group.add(large_aperture_bore);

  const large_aperture_inner_rim_geom = new THREE.TorusGeometry(
    0.032,
    0.004,
    8,
    32
  );
  const large_aperture_inner_rim = new THREE.Mesh(
    large_aperture_inner_rim_geom,
    brushed_metal_mat
  );
  large_aperture_inner_rim.name = "large_aperture_inner_rim";
  large_aperture_inner_rim.position.z = 0.076;
  large_aperture_group.add(large_aperture_inner_rim);

  const small_aperture_group = new THREE.Group();
  small_aperture_group.name = "small_aperture_group";
  small_aperture_group.position.set(0, -0.015, 0.611);
  small_aperture_group.rotation.x = 0.30;
  aperture_group.add(small_aperture_group);

  const small_aperture_bezel_geom = new THREE.CylinderGeometry(
    0.041,
    0.041,
    0.025,
    28
  );
  const small_aperture_bezel = new THREE.Mesh(
    small_aperture_bezel_geom,
    black_trim_mat
  );
  small_aperture_bezel.name = "small_aperture_bezel";
  small_aperture_bezel.rotation.x = Math.PI / 2;
  small_aperture_bezel.position.z = 0.006;
  small_aperture_group.add(small_aperture_bezel);

  const small_aperture_ring_geom = new THREE.TorusGeometry(
    0.025,
    0.005,
    8,
    28
  );
  const small_aperture_ring = new THREE.Mesh(
    small_aperture_ring_geom,
    silver_mat
  );
  small_aperture_ring.name = "small_aperture_ring";
  small_aperture_ring.position.z = 0.021;
  small_aperture_group.add(small_aperture_ring);

  const small_aperture_bore_geom = new THREE.CylinderGeometry(
    0.019,
    0.019,
    0.012,
    24
  );
  const small_aperture_bore = new THREE.Mesh(
    small_aperture_bore_geom,
    bore_mat
  );
  small_aperture_bore.name = "small_aperture_bore";
  small_aperture_bore.rotation.x = Math.PI / 2;
  small_aperture_bore.position.z = 0.024;
  small_aperture_group.add(small_aperture_bore);

  const small_aperture_bit_geom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    0.014,
    16
  );
  const small_aperture_bit = new THREE.Mesh(
    small_aperture_bit_geom,
    silver_mat
  );
  small_aperture_bit.name = "small_aperture_bit";
  small_aperture_bit.rotation.x = Math.PI / 2;
  small_aperture_bit.position.set(0.006, -0.004, 0.033);
  small_aperture_group.add(small_aperture_bit);

  const front_screw_group = new THREE.Group();
  front_screw_group.name = "front_screw_group";
  front_screw_group.position.set(0, -0.235, 0.624);
  front_screw_group.rotation.x = 0.08;
  detail_group.add(front_screw_group);

  const front_screw_head_geom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    0.012,
    24
  );
  const front_screw_head = new THREE.Mesh(front_screw_head_geom, silver_mat);
  front_screw_head.name = "front_screw_head";
  front_screw_head.rotation.x = Math.PI / 2;
  front_screw_head.position.z = 0.006;
  front_screw_group.add(front_screw_head);

  const front_screw_slot_a_geom = new THREE.BoxGeometry(
    0.032,
    0.004,
    0.004
  );
  const front_screw_slot_a = new THREE.Mesh(
    front_screw_slot_a_geom,
    black_trim_mat
  );
  front_screw_slot_a.name = "front_screw_slot_a";
  front_screw_slot_a.position.z = 0.014;
  front_screw_slot_a.rotation.z = Math.PI / 4;
  front_screw_group.add(front_screw_slot_a);

  const front_screw_slot_b_geom = new THREE.BoxGeometry(
    0.032,
    0.004,
    0.004
  );
  const front_screw_slot_b = new THREE.Mesh(
    front_screw_slot_b_geom,
    black_trim_mat
  );
  front_screw_slot_b.name = "front_screw_slot_b";
  front_screw_slot_b.position.z = 0.0145;
  front_screw_slot_b.rotation.z = -Math.PI / 4;
  front_screw_group.add(front_screw_slot_b);

  const top_screw_group = new THREE.Group();
  top_screw_group.name = "top_screw_group";
  top_screw_group.position.set(-0.16, 0.558, 0.10);
  detail_group.add(top_screw_group);

  const top_screw_head_geom = new THREE.CylinderGeometry(
    0.023,
    0.023,
    0.012,
    24
  );
  const top_screw_head = new THREE.Mesh(top_screw_head_geom, silver_mat);
  top_screw_head.name = "top_screw_head";
  top_screw_head.position.y = 0.006;
  top_screw_group.add(top_screw_head);

  const top_screw_slot_a_geom = new THREE.BoxGeometry(
    0.030,
    0.003,
    0.004
  );
  const top_screw_slot_a = new THREE.Mesh(
    top_screw_slot_a_geom,
    black_trim_mat
  );
  top_screw_slot_a.name = "top_screw_slot_a";
  top_screw_slot_a.position.y = 0.013;
  top_screw_slot_a.rotation.y = Math.PI / 4;
  top_screw_group.add(top_screw_slot_a);

  const top_screw_slot_b_geom = new THREE.BoxGeometry(
    0.030,
    0.003,
    0.004
  );
  const top_screw_slot_b = new THREE.Mesh(
    top_screw_slot_b_geom,
    black_trim_mat
  );
  top_screw_slot_b.name = "top_screw_slot_b";
  top_screw_slot_b.position.y = 0.0135;
  top_screw_slot_b.rotation.y = -Math.PI / 4;
  top_screw_group.add(top_screw_slot_b);

  const rear_adjustment_knob_geom = new THREE.CylinderGeometry(
    0.032,
    0.032,
    0.035,
    24
  );
  const rear_adjustment_knob = new THREE.Mesh(
    rear_adjustment_knob_geom,
    silver_mat
  );
  rear_adjustment_knob.name = "rear_adjustment_knob";
  rear_adjustment_knob.rotation.z = Math.PI / 2;
  rear_adjustment_knob.position.set(0.355, -0.075, -0.50);
  detail_group.add(rear_adjustment_knob);

  const rear_adjustment_cap_geom = new THREE.SphereGeometry(0.026, 20, 12);
  const rear_adjustment_cap = new THREE.Mesh(
    rear_adjustment_cap_geom,
    brushed_metal_mat
  );
  rear_adjustment_cap.name = "rear_adjustment_cap";
  rear_adjustment_cap.scale.set(0.55, 1, 1);
  rear_adjustment_cap.position.set(0.381, -0.075, -0.50);
  detail_group.add(rear_adjustment_cap);

  function fit_to_unit_cube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    object.position.sub(center);
    const max_dim = Math.max(size.x, size.y, size.z);
    if (max_dim > 0) {
      const scale = 0.98 / max_dim;
      object.scale.setScalar(scale);
    }
  }

  fit_to_unit_cube(root);
  return root;
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
