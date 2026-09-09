function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "silver_airship";

  const polished_metal_mat = new THREE.MeshStandardMaterial({
    color: 0xd8dadd,
    metalness: 0.7,
    roughness: 0.24
  });
  const brushed_metal_mat = new THREE.MeshStandardMaterial({
    color: 0xb8babc,
    metalness: 0.65,
    roughness: 0.34
  });
  const seam_mat = new THREE.MeshStandardMaterial({
    color: 0x74797c,
    metalness: 0.35,
    roughness: 0.55
  });
  const dark_panel_mat = new THREE.MeshStandardMaterial({
    color: 0x171a1c,
    metalness: 0.15,
    roughness: 0.7
  });
  const intake_mat = new THREE.MeshStandardMaterial({
    color: 0x070809,
    metalness: 0.0,
    roughness: 0.8
  });

  const envelope_group = new THREE.Group();
  envelope_group.name = "envelope_group";
  root.add(envelope_group);

  const gondola_group = new THREE.Group();
  gondola_group.name = "gondola_group";
  root.add(gondola_group);

  const tail_group = new THREE.Group();
  tail_group.name = "tail_group";
  root.add(tail_group);

  const envelope_rx = 0.62;
  const envelope_ry = 0.52;
  const envelope_rz = 1.45;
  const envelope_y = 0.28;

  const main_envelope_geom = new THREE.SphereGeometry(1, 64, 32);
  const main_envelope = new THREE.Mesh(main_envelope_geom, polished_metal_mat);
  main_envelope.name = "main_envelope";
  main_envelope.scale.set(envelope_rx, envelope_ry, envelope_rz);
  main_envelope.position.y = envelope_y;
  envelope_group.add(main_envelope);

  const meridian_points = [];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    const z = -envelope_rz + t * envelope_rz * 2;
    const u = z / envelope_rz;
    const y = envelope_y + envelope_ry * Math.sqrt(Math.max(0, 1 - u * u));
    meridian_points.push(new THREE.Vector3(0, y, z));
  }
  const envelope_meridian_seams_geom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(meridian_points),
    72,
    0.0035,
    5,
    false
  );
  const envelope_meridian_seams = new THREE.InstancedMesh(
    envelope_meridian_seams_geom,
    seam_mat,
    12
  );
  envelope_meridian_seams.name = "envelope_meridian_seams";
  const meridian_matrix = new THREE.Matrix4();
  for (let i = 0; i < 12; i++) {
    meridian_matrix.makeRotationY((i / 12) * Math.PI * 2);
    envelope_meridian_seams.setMatrixAt(i, meridian_matrix);
  }
  envelope_meridian_seams.instanceMatrix.needsUpdate = true;
  envelope_group.add(envelope_meridian_seams);

  const envelope_ring_seams = new THREE.Group();
  envelope_ring_seams.name = "envelope_ring_seams";
  const ring_positions = [-1.12, -0.82, -0.52, -0.22, 0.10, 0.42, 0.74, 1.05];
  for (let i = 0; i < ring_positions.length; i++) {
    const z = ring_positions[i];
    const u = z / envelope_rz;
    const factor = Math.sqrt(Math.max(0, 1 - u * u));
    const ring_geom = new THREE.TorusGeometry(1, 0.0045, 5, 72);
    const ring = new THREE.Mesh(ring_geom, seam_mat);
    ring.name = "envelope_ring_seam_" + i;
    ring.scale.set(envelope_rx * factor, envelope_ry * factor, 1);
    ring.position.set(0, envelope_y, z);
    envelope_ring_seams.add(ring);
  }
  envelope_group.add(envelope_ring_seams);

  const envelope_side_fins_geom = new THREE.SphereGeometry(1, 28, 14);
  const envelope_side_fins = new THREE.InstancedMesh(
    envelope_side_fins_geom,
    polished_metal_mat,
    2
  );
  envelope_side_fins.name = "envelope_side_fins";
  const side_fin_matrix = new THREE.Matrix4();
  const side_fin_quaternion = new THREE.Quaternion();
  const side_fin_scale = new THREE.Vector3(0.055, 0.055, 0.22);
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    side_fin_matrix.compose(
      new THREE.Vector3(side * 0.615, 0.28, -0.88),
      side_fin_quaternion,
      side_fin_scale
    );
    envelope_side_fins.setMatrixAt(i, side_fin_matrix);
  }
  envelope_side_fins.instanceMatrix.needsUpdate = true;
  envelope_group.add(envelope_side_fins);

  const rear_probe_geom = new THREE.ConeGeometry(0.045, 0.14, 24);
  const rear_probe = new THREE.Mesh(rear_probe_geom, polished_metal_mat);
  rear_probe.name = "rear_probe";
  rear_probe.rotation.x = -Math.PI / 2;
  rear_probe.position.set(0, envelope_y, -1.50);
  envelope_group.add(rear_probe);

  const support_pylon_geom = new THREE.CylinderGeometry(0.09, 0.12, 0.27, 32);
  const support_pylon = new THREE.Mesh(support_pylon_geom, brushed_metal_mat);
  support_pylon.name = "support_pylon";
  support_pylon.position.set(0, -0.19, -0.28);
  gondola_group.add(support_pylon);

  const support_collar_geom = new THREE.SphereGeometry(1, 32, 16);
  const support_collar = new THREE.Mesh(support_collar_geom, polished_metal_mat);
  support_collar.name = "support_collar";
  support_collar.scale.set(0.14, 0.07, 0.18);
  support_collar.position.set(0, -0.065, -0.28);
  gondola_group.add(support_collar);

  const lower_gondola_profile = [
    new THREE.Vector2(0.00, -1.08),
    new THREE.Vector2(0.10, -1.05),
    new THREE.Vector2(0.20, -0.96),
    new THREE.Vector2(0.25, -0.82),
    new THREE.Vector2(0.26, -0.55),
    new THREE.Vector2(0.26, 0.42),
    new THREE.Vector2(0.25, 0.62),
    new THREE.Vector2(0.20, 0.78),
    new THREE.Vector2(0.10, 0.90),
    new THREE.Vector2(0.00, 0.94)
  ];
  const lower_gondola_geom = new THREE.LatheGeometry(lower_gondola_profile, 64);
  const lower_gondola = new THREE.Mesh(lower_gondola_geom, polished_metal_mat);
  lower_gondola.name = "lower_gondola";
  lower_gondola.rotation.x = Math.PI / 2;
  lower_gondola.position.y = -0.43;
  gondola_group.add(lower_gondola);

  const streamlined_nose_geom = new THREE.SphereGeometry(1, 48, 24);
  const streamlined_nose = new THREE.Mesh(streamlined_nose_geom, polished_metal_mat);
  streamlined_nose.name = "streamlined_nose";
  streamlined_nose.scale.set(0.18, 0.14, 0.52);
  streamlined_nose.position.set(0, -0.36, -0.72);
  gondola_group.add(streamlined_nose);

  const nose_shadow_band_geom = new THREE.TorusGeometry(1, 0.006, 6, 48);
  const nose_shadow_band = new THREE.Mesh(nose_shadow_band_geom, seam_mat);
  nose_shadow_band.name = "nose_shadow_band";
  nose_shadow_band.scale.set(0.181, 0.141, 1);
  nose_shadow_band.position.set(0, -0.36, -0.25);
  gondola_group.add(nose_shadow_band);

  const gondola_panel_seams_geom = new THREE.TorusGeometry(1, 0.005, 6, 56);
  const gondola_panel_seams = new THREE.InstancedMesh(
    gondola_panel_seams_geom,
    seam_mat,
    5
  );
  gondola_panel_seams.name = "gondola_panel_seams";
  const panel_z = [-0.92, -0.58, -0.24, 0.18, 0.55];
  const panel_matrix = new THREE.Matrix4();
  for (let i = 0; i < panel_z.length; i++) {
    panel_matrix.compose(
      new THREE.Vector3(0, -0.43, panel_z[i]),
      new THREE.Quaternion(),
      new THREE.Vector3(0.261, 0.261, 1)
    );
    gondola_panel_seams.setMatrixAt(i, panel_matrix);
  }
  gondola_panel_seams.instanceMatrix.needsUpdate = true;
  gondola_group.add(gondola_panel_seams);

  const access_panel_frame_geom = new THREE.BoxGeometry(0.012, 0.14, 0.22);
  const access_panel_frame = new THREE.Mesh(access_panel_frame_geom, seam_mat);
  access_panel_frame.name = "access_panel_frame";
  access_panel_frame.position.set(0.263, -0.43, 0.34);
  gondola_group.add(access_panel_frame);

  const access_panel_geom = new THREE.BoxGeometry(0.014, 0.105, 0.18);
  const access_panel = new THREE.Mesh(access_panel_geom, brushed_metal_mat);
  access_panel.name = "access_panel";
  access_panel.position.set(0.271, -0.43, 0.34);
  gondola_group.add(access_panel);

  const front_intake_frame_geom = new THREE.BoxGeometry(0.25, 0.20, 0.022);
  const front_intake_frame = new THREE.Mesh(front_intake_frame_geom, brushed_metal_mat);
  front_intake_frame.name = "front_intake_frame";
  front_intake_frame.position.set(0, -0.43, 0.925);
  gondola_group.add(front_intake_frame);

  const front_intake_geom = new THREE.BoxGeometry(0.20, 0.15, 0.026);
  const front_intake = new THREE.Mesh(front_intake_geom, intake_mat);
  front_intake.name = "front_intake";
  front_intake.position.set(0, -0.43, 0.941);
  gondola_group.add(front_intake);

  const intake_divider_geom = new THREE.BoxGeometry(0.018, 0.158, 0.032);
  const intake_divider = new THREE.Mesh(intake_divider_geom, brushed_metal_mat);
  intake_divider.name = "intake_divider";
  intake_divider.position.set(0, -0.43, 0.956);
  gondola_group.add(intake_divider);

  const intake_louvers_geom = new THREE.BoxGeometry(0.078, 0.012, 0.034);
  const intake_louvers = new THREE.InstancedMesh(
    intake_louvers_geom,
    brushed_metal_mat,
    4
  );
  intake_louvers.name = "intake_louvers";
  const louver_matrix = new THREE.Matrix4();
  for (let i = 0; i < 4; i++) {
    louver_matrix.makeTranslation(0, -0.487 + i * 0.039, 0.958);
    intake_louvers.setMatrixAt(i, louver_matrix);
  }
  intake_louvers.instanceMatrix.needsUpdate = true;
  gondola_group.add(intake_louvers);

  const belly_keel_geom = new THREE.CylinderGeometry(0.035, 0.035, 1.35, 20);
  const belly_keel = new THREE.Mesh(belly_keel_geom, brushed_metal_mat);
  belly_keel.name = "belly_keel";
  belly_keel.rotation.x = Math.PI / 2;
  belly_keel.position.set(0, -0.69, -0.12);
  gondola_group.add(belly_keel);

  const lower_sensor_geom = new THREE.SphereGeometry(1, 16, 8);
  const lower_sensor = new THREE.Mesh(lower_sensor_geom, dark_panel_mat);
  lower_sensor.name = "lower_sensor";
  lower_sensor.scale.set(0.045, 0.025, 0.07);
  lower_sensor.position.set(0, -0.735, -0.38);
  gondola_group.add(lower_sensor);

  const vertical_tail_fin_shape = new THREE.Shape();
  vertical_tail_fin_shape.moveTo(-0.45, 0.00);
  vertical_tail_fin_shape.lineTo(0.42, 0.00);
  vertical_tail_fin_shape.lineTo(0.10, 0.55);
  vertical_tail_fin_shape.lineTo(-0.18, 0.62);
  vertical_tail_fin_shape.closePath();

  const vertical_tail_fin_geom = new THREE.ExtrudeGeometry(
    vertical_tail_fin_shape,
    {
      depth: 0.045,
      steps: 1,
      curveSegments: 8
    }
  );
  vertical_tail_fin_geom.translate(0, 0, -0.0225);

  const upper_tail_fin = new THREE.Mesh(vertical_tail_fin_geom, brushed_metal_mat);
  upper_tail_fin.name = "upper_tail_fin";
  upper_tail_fin.rotation.y = Math.PI / 2;
  upper_tail_fin.position.set(0, -0.22, -1.08);
  tail_group.add(upper_tail_fin);

  const lower_tail_fin = new THREE.Mesh(vertical_tail_fin_geom, brushed_metal_mat);
  lower_tail_fin.name = "lower_tail_fin";
  lower_tail_fin.rotation.y = Math.PI / 2;
  lower_tail_fin.scale.y = -1;
  lower_tail_fin.position.set(0, -0.43, -1.08);
  tail_group.add(lower_tail_fin);

  const horizontal_tail_fin_shape = new THREE.Shape();
  horizontal_tail_fin_shape.moveTo(0.00, -0.42);
  horizontal_tail_fin_shape.lineTo(0.00, 0.38);
  horizontal_tail_fin_shape.lineTo(0.55, 0.08);
  horizontal_tail_fin_shape.lineTo(0.58, -0.12);
  horizontal_tail_fin_shape.closePath();

  const horizontal_tail_fin_geom = new THREE.ExtrudeGeometry(
    horizontal_tail_fin_shape,
    {
      depth: 0.04,
      steps: 1,
      curveSegments: 8
    }
  );
  horizontal_tail_fin_geom.translate(0, 0, -0.02);

  const right_horizontal_tail_fin = new THREE.Mesh(
    horizontal_tail_fin_geom,
    brushed_metal_mat
  );
  right_horizontal_tail_fin.name = "right_horizontal_tail_fin";
  right_horizontal_tail_fin.rotation.x = Math.PI / 2;
  right_horizontal_tail_fin.position.set(0, -0.43, -1.08);
  tail_group.add(right_horizontal_tail_fin);

  const left_horizontal_tail_fin = new THREE.Mesh(
    horizontal_tail_fin_geom,
    brushed_metal_mat
  );
  left_horizontal_tail_fin.name = "left_horizontal_tail_fin";
  left_horizontal_tail_fin.rotation.x = Math.PI / 2;
  left_horizontal_tail_fin.scale.x = -1;
  left_horizontal_tail_fin.position.set(0, -0.43, -1.08);
  tail_group.add(left_horizontal_tail_fin);

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
