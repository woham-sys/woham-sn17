// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "tufted_ottoman";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  const body_group = new THREE.Group();
  body_group.name = "body_group";
  const top_group = new THREE.Group();
  top_group.name = "top_group";
  root.add(base_group, body_group, top_group);

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0xaaa59d,
    metalness: 0.0,
    roughness: 0.95,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x817c75,
    metalness: 0.0,
    roughness: 0.95,
  });
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x4c4742,
    metalness: 0.0,
    roughness: 0.95,
  });
  const footMat = new THREE.MeshStandardMaterial({
    color: 0x302621,
    metalness: 0.0,
    roughness: 0.6,
  });

  const top_cushion_coreGeom = new THREE.CylinderGeometry(0.49, 0.49, 0.16, 48);
  const top_cushion_core = new THREE.Mesh(top_cushion_coreGeom, fabricMat);
  top_cushion_core.name = "top_cushion_core";
  top_cushion_core.position.y = 0.61;
  top_group.add(top_cushion_core);

  const top_edge_bandGeom = new THREE.TorusGeometry(0.455, 0.075, 14, 64);
  const top_edge_band = new THREE.Mesh(top_edge_bandGeom, fabricMat);
  top_edge_band.name = "top_edge_band";
  top_edge_band.rotation.x = Math.PI / 2;
  top_edge_band.position.y = 0.61;
  top_group.add(top_edge_band);

  const top_lobe_count = 12;
  const top_radial_lobesGeom = new THREE.SphereGeometry(1, 24, 14);
  const top_radial_lobes = new THREE.InstancedMesh(
    top_radial_lobesGeom,
    fabricMat,
    top_lobe_count
  );
  top_radial_lobes.name = "top_radial_lobes";

  const top_dummy = new THREE.Object3D();
  for (let i = 0; i < top_lobe_count; i++) {
    const angle = i / top_lobe_count * Math.PI * 2;
    top_dummy.position.set(Math.sin(angle) * 0.29, 0.68, Math.cos(angle) * 0.29);
    top_dummy.rotation.set(0, angle, 0);
    top_dummy.scale.set(0.205, 0.095, 0.25);
    top_dummy.updateMatrix();
    top_radial_lobes.setMatrixAt(i, top_dummy.matrix);
  }
  top_radial_lobes.instanceMatrix.needsUpdate = true;
  top_group.add(top_radial_lobes);

  const top_center_padGeom = new THREE.SphereGeometry(1, 24, 12);
  const top_center_pad = new THREE.Mesh(top_center_padGeom, fabricMat);
  top_center_pad.name = "top_center_pad";
  top_center_pad.position.y = 0.685;
  top_center_pad.scale.set(0.16, 0.065, 0.16);
  top_group.add(top_center_pad);

  const top_tuft_seamsPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.738, 0.075),
    new THREE.Vector3(0, 0.765, 0.20),
    new THREE.Vector3(0, 0.765, 0.34),
    new THREE.Vector3(0, 0.700, 0.50),
  ]);
  const top_tuft_seamsGeom = new THREE.TubeGeometry(
    top_tuft_seamsPath,
    18,
    0.005,
    6,
    false
  );
  const top_tuft_seams = new THREE.InstancedMesh(
    top_tuft_seamsGeom,
    seamMat,
    top_lobe_count
  );
  top_tuft_seams.name = "top_tuft_seams";

  const top_seam_dummy = new THREE.Object3D();
  for (let i = 0; i < top_lobe_count; i++) {
    const angle = (i + 0.5) / top_lobe_count * Math.PI * 2;
    top_seam_dummy.position.set(0, 0, 0);
    top_seam_dummy.rotation.set(0, angle, 0);
    top_seam_dummy.scale.set(1, 1, 1);
    top_seam_dummy.updateMatrix();
    top_tuft_seams.setMatrixAt(i, top_seam_dummy.matrix);
  }
  top_tuft_seams.instanceMatrix.needsUpdate = true;
  top_group.add(top_tuft_seams);

  const top_center_creasesPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.744, 0.012),
    new THREE.Vector3(0, 0.748, 0.045),
    new THREE.Vector3(0, 0.741, 0.078),
  ]);
  const top_center_creasesGeom = new THREE.TubeGeometry(
    top_center_creasesPath,
    8,
    0.0035,
    6,
    false
  );
  const top_center_creases = new THREE.InstancedMesh(
    top_center_creasesGeom,
    seamMat,
    top_lobe_count
  );
  top_center_creases.name = "top_center_creases";

  const top_crease_dummy = new THREE.Object3D();
  for (let i = 0; i < top_lobe_count; i++) {
    const angle = i / top_lobe_count * Math.PI * 2;
    top_crease_dummy.position.set(0, 0, 0);
    top_crease_dummy.rotation.set(0, angle, 0);
    top_crease_dummy.scale.set(1, 1, 1);
    top_crease_dummy.updateMatrix();
    top_center_creases.setMatrixAt(i, top_crease_dummy.matrix);
  }
  top_center_creases.instanceMatrix.needsUpdate = true;
  top_group.add(top_center_creases);

  const top_edge_seamsPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.682, 0.505),
    new THREE.Vector3(0, 0.615, 0.532),
    new THREE.Vector3(0, 0.548, 0.505),
  ]);
  const top_edge_seamsGeom = new THREE.TubeGeometry(
    top_edge_seamsPath,
    10,
    0.0045,
    6,
    false
  );
  const top_edge_seams = new THREE.InstancedMesh(
    top_edge_seamsGeom,
    seamMat,
    top_lobe_count
  );
  top_edge_seams.name = "top_edge_seams";

  const top_edge_dummy = new THREE.Object3D();
  for (let i = 0; i < top_lobe_count; i++) {
    const angle = (i + 0.5) / top_lobe_count * Math.PI * 2;
    top_edge_dummy.position.set(0, 0, 0);
    top_edge_dummy.rotation.set(0, angle, 0);
    top_edge_dummy.scale.set(1, 1, 1);
    top_edge_dummy.updateMatrix();
    top_edge_seams.setMatrixAt(i, top_edge_dummy.matrix);
  }
  top_edge_seams.instanceMatrix.needsUpdate = true;
  top_group.add(top_edge_seams);

  const upper_tuft_bandGeom = new THREE.CylinderGeometry(0.49, 0.49, 0.10, 48);
  const upper_tuft_band = new THREE.Mesh(upper_tuft_bandGeom, fabricMat);
  upper_tuft_band.name = "upper_tuft_band";
  upper_tuft_band.position.y = 0.49;
  body_group.add(upper_tuft_band);

  const upper_band_lobesGeom = new THREE.SphereGeometry(1, 20, 12);
  const upper_band_lobes = new THREE.InstancedMesh(
    upper_band_lobesGeom,
    fabricMat,
    top_lobe_count
  );
  upper_band_lobes.name = "upper_band_lobes";

  const upper_band_dummy = new THREE.Object3D();
  for (let i = 0; i < top_lobe_count; i++) {
    const angle = i / top_lobe_count * Math.PI * 2;
    upper_band_dummy.position.set(Math.sin(angle) * 0.47, 0.49, Math.cos(angle) * 0.47);
    upper_band_dummy.rotation.set(0, angle, 0);
    upper_band_dummy.scale.set(0.15, 0.075, 0.055);
    upper_band_dummy.updateMatrix();
    upper_band_lobes.setMatrixAt(i, upper_band_dummy.matrix);
  }
  upper_band_lobes.instanceMatrix.needsUpdate = true;
  body_group.add(upper_band_lobes);

  const upper_band_seamsPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.535, 0.515),
    new THREE.Vector3(0, 0.490, 0.528),
    new THREE.Vector3(0, 0.445, 0.512),
  ]);
  const upper_band_seamsGeom = new THREE.TubeGeometry(
    upper_band_seamsPath,
    8,
    0.004,
    6,
    false
  );
  const upper_band_seams = new THREE.InstancedMesh(
    upper_band_seamsGeom,
    seamMat,
    top_lobe_count
  );
  upper_band_seams.name = "upper_band_seams";

  const upper_band_seam_dummy = new THREE.Object3D();
  for (let i = 0; i < top_lobe_count; i++) {
    const angle = (i + 0.5) / top_lobe_count * Math.PI * 2;
    upper_band_seam_dummy.position.set(0, 0, 0);
    upper_band_seam_dummy.rotation.set(0, angle, 0);
    upper_band_seam_dummy.scale.set(1, 1, 1);
    upper_band_seam_dummy.updateMatrix();
    upper_band_seams.setMatrixAt(i, upper_band_seam_dummy.matrix);
  }
  upper_band_seams.instanceMatrix.needsUpdate = true;
  body_group.add(upper_band_seams);

  const body_bottom = 0.12;
  const body_top = 0.50;
  const body_height = body_top - body_bottom;

  function bodyRadiusAt(y) {
    const t = (y - body_bottom) / body_height;
    return 0.455 + 0.045 * Math.sin(Math.PI * t) - 0.005 * t;
  }

  const body_coreProfile = [
    new THREE.Vector2(0, body_bottom),
  ];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const y = body_bottom + body_height * t;
    body_coreProfile.push(new THREE.Vector2(bodyRadiusAt(y), y));
  }
  body_coreProfile.push(new THREE.Vector2(0, body_top));

  const body_coreGeom = new THREE.LatheGeometry(body_coreProfile, 64);
  const body_core = new THREE.Mesh(body_coreGeom, fabricMat);
  body_core.name = "body_core";
  body_group.add(body_core);

  const panel_rows = [0.14, 0.30, 0.46];
  const panels_per_row = 10;
  const panel_count = panel_rows.length * panels_per_row;

  const body_tuft_panelsGeom = new THREE.SphereGeometry(1, 22, 14);
  const body_tuft_panels = new THREE.InstancedMesh(
    body_tuft_panelsGeom,
    fabricMat,
    panel_count
  );
  body_tuft_panels.name = "body_tuft_panels";

  const panel_position = new THREE.Vector3();
  const panel_normal = new THREE.Vector3();
  const panel_quaternion = new THREE.Quaternion();
  const panel_scale = new THREE.Vector3();
  const panel_matrix = new THREE.Matrix4();
  const local_forward = new THREE.Vector3(0, 0, 1);
  let panel_index = 0;

  for (let row = 0; row < panel_rows.length; row++) {
    const y = panel_rows[row];
    const offset = row % 2 === 0 ? 0 : 0.5;
    const radius = bodyRadiusAt(y) + 0.012;

    for (let i = 0; i < panels_per_row; i++) {
      const angle = (i + offset) / panels_per_row * Math.PI * 2;
      panel_normal.set(Math.sin(angle), 0, Math.cos(angle));
      panel_position.set(
        panel_normal.x * radius,
        y,
        panel_normal.z * radius
      );
      panel_quaternion.setFromUnitVectors(local_forward, panel_normal);
      panel_scale.set(0.158, 0.105, 0.047);
      panel_matrix.compose(panel_position, panel_quaternion, panel_scale);
      body_tuft_panels.setMatrixAt(panel_index, panel_matrix);
      panel_index++;
    }
  }
  body_tuft_panels.instanceMatrix.needsUpdate = true;
  body_group.add(body_tuft_panels);

  const button_rows = [0.22, 0.38];
  const button_count = button_rows.length * panels_per_row;
  const body_buttonsGeom = new THREE.CylinderGeometry(0.017, 0.017, 0.012, 16);
  const body_buttons = new THREE.InstancedMesh(
    body_buttonsGeom,
    buttonMat,
    button_count
  );
  body_buttons.name = "body_buttons";

  const button_position = new THREE.Vector3();
  const button_normal = new THREE.Vector3();
  const button_quaternion = new THREE.Quaternion();
  const button_scale = new THREE.Vector3(1, 1, 1);
  const button_matrix = new THREE.Matrix4();
  const local_up = new THREE.Vector3(0, 1, 0);
  let button_index = 0;

  for (let row = 0; row < button_rows.length; row++) {
    const y = button_rows[row];
    const offset = row % 2 === 0 ? 0.5 : 0;
    const radius = bodyRadiusAt(y) + 0.058;

    for (let i = 0; i < panels_per_row; i++) {
      const angle = (i + offset) / panels_per_row * Math.PI * 2;
      button_normal.set(Math.sin(angle), 0, Math.cos(angle));
      button_position.set(
        button_normal.x * radius,
        y,
        button_normal.z * radius
      );
      button_quaternion.setFromUnitVectors(local_up, button_normal);
      button_matrix.compose(button_position, button_quaternion, button_scale);
      body_buttons.setMatrixAt(button_index, button_matrix);
      button_index++;
    }
  }
  body_buttons.instanceMatrix.needsUpdate = true;
  body_group.add(body_buttons);

  const body_tuft_seams = new THREE.Group();
  body_tuft_seams.name = "body_tuft_seams";
  body_group.add(body_tuft_seams);

  function addBodySeam(angle0, y0, angle1, y1, bend) {
    const points = [];
    for (let i = 0; i <= 6; i++) {
      const t = i / 6;
      const angle = angle0 + (angle1 - angle0) * t + Math.sin(Math.PI * t) * bend;
      const y = y0 + (y1 - y0) * t;
      const radius = bodyRadiusAt(y) + 0.057;
      points.push(new THREE.Vector3(
        Math.sin(angle) * radius,
        y,
        Math.cos(angle) * radius
      ));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 12, 0.0045, 6, false);
    const seam = new THREE.Mesh(geometry, seamMat);
    body_tuft_seams.add(seam);
  }

  const seam_step = Math.PI * 2 / panels_per_row;
  for (let row = 0; row < button_rows.length; row++) {
    const y = button_rows[row];
    const offset = row % 2 === 0 ? 0.5 : 0;

    for (let i = 0; i < panels_per_row; i++) {
      const angle = (i + offset) / panels_per_row * Math.PI * 2;
      addBodySeam(angle, y, angle - seam_step * 0.5, y + 0.08, 0.018);
      addBodySeam(angle, y, angle + seam_step * 0.5, y + 0.08, -0.018);
      addBodySeam(angle, y, angle - seam_step * 0.5, y - 0.08, -0.018);
      addBodySeam(angle, y, angle + seam_step * 0.5, y - 0.08, 0.018);
    }
  }

  const lower_tuft_bandGeom = new THREE.CylinderGeometry(0.47, 0.47, 0.12, 48);
  const lower_tuft_band = new THREE.Mesh(lower_tuft_bandGeom, fabricMat);
  lower_tuft_band.name = "lower_tuft_band";
  lower_tuft_band.position.y = 0.10;
  base_group.add(lower_tuft_band);

  const lower_band_lobesGeom = new THREE.SphereGeometry(1, 22, 14);
  const lower_band_lobes = new THREE.InstancedMesh(
    lower_band_lobesGeom,
    fabricMat,
    top_lobe_count
  );
  lower_band_lobes.name = "lower_band_lobes";

  const lower_band_dummy = new THREE.Object3D();
  for (let i = 0; i < top_lobe_count; i++) {
    const angle = i / top_lobe_count * Math.PI * 2;
    lower_band_dummy.position.set(Math.sin(angle) * 0.455, 0.10, Math.cos(angle) * 0.455);
    lower_band_dummy.rotation.set(0, angle, 0);
    lower_band_dummy.scale.set(0.16, 0.082, 0.065);
    lower_band_dummy.updateMatrix();
    lower_band_lobes.setMatrixAt(i, lower_band_dummy.matrix);
  }
  lower_band_lobes.instanceMatrix.needsUpdate = true;
  base_group.add(lower_band_lobes);

  const lower_band_seamsPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.172, 0.505),
    new THREE.Vector3(0, 0.105, 0.522),
    new THREE.Vector3(0, 0.035, 0.500),
  ]);
  const lower_band_seamsGeom = new THREE.TubeGeometry(
    lower_band_seamsPath,
    10,
    0.0045,
    6,
    false
  );
  const lower_band_seams = new THREE.InstancedMesh(
    lower_band_seamsGeom,
    seamMat,
    top_lobe_count
  );
  lower_band_seams.name = "lower_band_seams";

  const lower_band_seam_dummy = new THREE.Object3D();
  for (let i = 0; i < top_lobe_count; i++) {
    const angle = (i + 0.5) / top_lobe_count * Math.PI * 2;
    lower_band_seam_dummy.position.set(0, 0, 0);
    lower_band_seam_dummy.rotation.set(0, angle, 0);
    lower_band_seam_dummy.scale.set(1, 1, 1);
    lower_band_seam_dummy.updateMatrix();
    lower_band_seams.setMatrixAt(i, lower_band_seam_dummy.matrix);
  }
  lower_band_seams.instanceMatrix.needsUpdate = true;
  base_group.add(lower_band_seams);

  const bottom_trimGeom = new THREE.TorusGeometry(0.445, 0.025, 10, 48);
  const bottom_trim = new THREE.Mesh(bottom_trimGeom, seamMat);
  bottom_trim.name = "bottom_trim";
  bottom_trim.rotation.x = Math.PI / 2;
  bottom_trim.position.y = 0.035;
  base_group.add(bottom_trim);

  const feetGeom = new THREE.SphereGeometry(1, 20, 10);
  const feet = new THREE.InstancedMesh(feetGeom, footMat, 4);
  feet.name = "feet";

  const foot_positions = [
    [-0.25, 0.005, 0.20],
    [0.25, 0.005, 0.20],
    [-0.25, 0.005, -0.20],
    [0.25, 0.005, -0.20],
  ];
  const foot_dummy = new THREE.Object3D();
  for (let i = 0; i < foot_positions.length; i++) {
    const position = foot_positions[i];
    foot_dummy.position.set(position[0], position[1], position[2]);
    foot_dummy.rotation.set(0, 0, 0);
    foot_dummy.scale.set(0.075, 0.025, 0.065);
    foot_dummy.updateMatrix();
    feet.setMatrixAt(i, foot_dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  base_group.add(feet);

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