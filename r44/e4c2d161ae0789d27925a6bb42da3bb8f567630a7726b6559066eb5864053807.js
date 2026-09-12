// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "solar_rocket";

  const fuselage_group = new THREE.Group();
  fuselage_group.name = "fuselage_group";
  root.add(fuselage_group);

  const solar_array_group = new THREE.Group();
  solar_array_group.name = "solar_array_group";
  root.add(solar_array_group);

  const tail_assembly = new THREE.Group();
  tail_assembly.name = "tail_assembly";
  root.add(tail_assembly);

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const silver_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });
  const solar_cellMat = new THREE.MeshStandardMaterial({
    color: 0x172846,
    metalness: 0.0,
    roughness: 0.3
  });
  const solar_gridMat = new THREE.MeshStandardMaterial({
    color: 0x8297b8,
    metalness: 0.0,
    roughness: 0.3
  });
  const displayMat = new THREE.MeshStandardMaterial({
    color: 0x101927,
    metalness: 0.0,
    roughness: 0.3
  });
  const display_markMat = new THREE.MeshStandardMaterial({
    color: 0x91b8e8,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x91b8e8,
    emissiveIntensity: 1.0
  });
  const sensor_lensMat = new THREE.MeshStandardMaterial({
    color: 0x101820,
    metalness: 0.0,
    roughness: 0.3
  });
  const outer_flameMat = new THREE.MeshStandardMaterial({
    color: 0x4fd8ff,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x4fd8ff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const inner_flameMat = new THREE.MeshStandardMaterial({
    color: 0xe8ffff,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xe8ffff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const main_fuselageGeom = new THREE.CylinderGeometry(0.42, 0.42, 2.05, 48);
  const main_fuselage = new THREE.Mesh(main_fuselageGeom, polished_metalMat);
  main_fuselage.name = "main_fuselage";
  main_fuselage.rotation.x = Math.PI / 2;
  main_fuselage.position.z = -0.02;
  fuselage_group.add(main_fuselage);

  const nose_sectionGeom = new THREE.CylinderGeometry(0.37, 0.42, 0.48, 48);
  const nose_section = new THREE.Mesh(nose_sectionGeom, polished_metalMat);
  nose_section.name = "nose_section";
  nose_section.rotation.x = Math.PI / 2;
  nose_section.position.z = 1.08;
  fuselage_group.add(nose_section);

  const nose_coneGeom = new THREE.CylinderGeometry(0.045, 0.37, 0.78, 48);
  const nose_cone = new THREE.Mesh(nose_coneGeom, polished_metalMat);
  nose_cone.name = "nose_cone";
  nose_cone.rotation.x = Math.PI / 2;
  nose_cone.position.z = 1.72;
  fuselage_group.add(nose_cone);

  const nose_tipGeom = new THREE.SphereGeometry(0.05, 20, 12);
  const nose_tip = new THREE.Mesh(nose_tipGeom, polished_metalMat);
  nose_tip.name = "nose_tip";
  nose_tip.scale.set(1.0, 1.0, 1.25);
  nose_tip.position.z = 2.12;
  fuselage_group.add(nose_tip);

  const rear_engine_housingGeom = new THREE.CylinderGeometry(0.42, 0.39, 0.42, 48);
  const rear_engine_housing = new THREE.Mesh(rear_engine_housingGeom, polished_metalMat);
  rear_engine_housing.name = "rear_engine_housing";
  rear_engine_housing.rotation.x = Math.PI / 2;
  rear_engine_housing.position.z = -1.22;
  fuselage_group.add(rear_engine_housing);

  const engine_transitionGeom = new THREE.CylinderGeometry(0.39, 0.31, 0.28, 40);
  const engine_transition = new THREE.Mesh(engine_transitionGeom, silver_metalMat);
  engine_transition.name = "engine_transition";
  engine_transition.rotation.x = Math.PI / 2;
  engine_transition.position.z = -1.51;
  fuselage_group.add(engine_transition);

  const body_seam_ringsGeom = new THREE.TorusGeometry(0.421, 0.009, 8, 48);
  const body_seam_rings = new THREE.InstancedMesh(
    body_seam_ringsGeom,
    dark_metalMat,
    5
  );
  body_seam_rings.name = "body_seam_rings";
  const seam_positions = [-1.02, -0.52, 0.48, 0.86, 1.31];
  const seam_dummy = new THREE.Object3D();
  for (let i = 0; i < seam_positions.length; i++) {
    seam_dummy.position.set(0, 0, seam_positions[i]);
    seam_dummy.rotation.set(0, 0, 0);
    seam_dummy.scale.set(1, 1, 1);
    seam_dummy.updateMatrix();
    body_seam_rings.setMatrixAt(i, seam_dummy.matrix);
  }
  body_seam_rings.instanceMatrix.needsUpdate = true;
  fuselage_group.add(body_seam_rings);

  const sensor_housingGeom = new THREE.CylinderGeometry(0.115, 0.125, 0.06, 28);
  const sensor_housing = new THREE.Mesh(sensor_housingGeom, silver_metalMat);
  sensor_housing.name = "sensor_housing";
  sensor_housing.position.set(0, 0.395, 1.08);
  fuselage_group.add(sensor_housing);

  const sensor_bezelGeom = new THREE.TorusGeometry(0.086, 0.014, 10, 32);
  const sensor_bezel = new THREE.Mesh(sensor_bezelGeom, polished_metalMat);
  sensor_bezel.name = "sensor_bezel";
  sensor_bezel.rotation.x = Math.PI / 2;
  sensor_bezel.position.set(0, 0.428, 1.08);
  fuselage_group.add(sensor_bezel);

  const sensor_lensGeom = new THREE.CylinderGeometry(0.071, 0.071, 0.014, 28);
  const sensor_lens = new THREE.Mesh(sensor_lensGeom, sensor_lensMat);
  sensor_lens.name = "sensor_lens";
  sensor_lens.position.set(0, 0.431, 1.08);
  fuselage_group.add(sensor_lens);

  const service_port_frameGeom = new THREE.BoxGeometry(0.014, 0.085, 0.17);
  const service_port_frame = new THREE.Mesh(service_port_frameGeom, silver_metalMat);
  service_port_frame.name = "service_port_frame";
  service_port_frame.position.set(0.423, -0.08, -0.28);
  fuselage_group.add(service_port_frame);

  const service_portGeom = new THREE.BoxGeometry(0.018, 0.052, 0.125);
  const service_port = new THREE.Mesh(service_portGeom, displayMat);
  service_port.name = "service_port";
  service_port.position.set(0.432, -0.08, -0.28);
  fuselage_group.add(service_port);

  const control_panelGeom = new THREE.BoxGeometry(0.014, 0.15, 0.34);
  const control_panel = new THREE.Mesh(control_panelGeom, displayMat);
  control_panel.name = "control_panel";
  control_panel.position.set(0.423, 0.105, -0.68);
  fuselage_group.add(control_panel);

  const control_panel_marksGeom = new THREE.BoxGeometry(0.008, 0.018, 0.045);
  const control_panel_marks = new THREE.InstancedMesh(
    control_panel_marksGeom,
    display_markMat,
    6
  );
  control_panel_marks.name = "control_panel_marks";
  const mark_dummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    const row = Math.floor(i / 3);
    const column = i % 3;
    mark_dummy.position.set(
      0.433,
      0.075 + row * 0.055,
      -0.775 + column * 0.09
    );
    mark_dummy.rotation.set(0, 0, 0);
    mark_dummy.scale.set(1, 1, 1);
    mark_dummy.updateMatrix();
    control_panel_marks.setMatrixAt(i, mark_dummy.matrix);
  }
  control_panel_marks.instanceMatrix.needsUpdate = true;
  fuselage_group.add(control_panel_marks);

  const solar_backingGeom = new THREE.BoxGeometry(1, 1, 1);
  const solar_cellGeom = new THREE.BoxGeometry(1, 1, 1);
  const solar_longitudinal_gridGeom = new THREE.BoxGeometry(1, 1, 1);
  const solar_cross_gridGeom = new THREE.BoxGeometry(1, 1, 1);

  function createSolarPanel(width, length, columns, rows) {
    const panel = new THREE.Group();

    const solar_backing = new THREE.Mesh(solar_backingGeom, brushed_metalMat);
    solar_backing.scale.set(width, 0.018, length);
    panel.add(solar_backing);

    const cell_width = width - 0.045;
    const cell_length = length - 0.045;
    const solar_cells = new THREE.Mesh(solar_cellGeom, solar_cellMat);
    solar_cells.scale.set(cell_width, 0.008, cell_length);
    solar_cells.position.y = 0.013;
    panel.add(solar_cells);

    const solar_longitudinal_grid = new THREE.InstancedMesh(
      solar_longitudinal_gridGeom,
      solar_gridMat,
      columns - 1
    );
    const longitudinal_dummy = new THREE.Object3D();
    for (let i = 1; i < columns; i++) {
      longitudinal_dummy.position.set(
        -cell_width / 2 + cell_width * i / columns,
        0.019,
        0
      );
      longitudinal_dummy.rotation.set(0, 0, 0);
      longitudinal_dummy.scale.set(0.006, 0.004, cell_length);
      longitudinal_dummy.updateMatrix();
      solar_longitudinal_grid.setMatrixAt(i - 1, longitudinal_dummy.matrix);
    }
    solar_longitudinal_grid.instanceMatrix.needsUpdate = true;
    panel.add(solar_longitudinal_grid);

    const solar_cross_grid = new THREE.InstancedMesh(
      solar_cross_gridGeom,
      solar_gridMat,
      rows - 1
    );
    const cross_dummy = new THREE.Object3D();
    for (let i = 1; i < rows; i++) {
      cross_dummy.position.set(
        0,
        0.0195,
        -cell_length / 2 + cell_length * i / rows
      );
      cross_dummy.rotation.set(0, 0, 0);
      cross_dummy.scale.set(cell_width, 0.004, 0.006);
      cross_dummy.updateMatrix();
      solar_cross_grid.setMatrixAt(i - 1, cross_dummy.matrix);
    }
    solar_cross_grid.instanceMatrix.needsUpdate = true;
    panel.add(solar_cross_grid);

    return panel;
  }

  const top_solar_panel = createSolarPanel(0.52, 1.02, 6, 12);
  top_solar_panel.name = "top_solar_panel";
  top_solar_panel.position.set(0, 0.426, 0.20);
  solar_array_group.add(top_solar_panel);

  const starboard_solar_panel = createSolarPanel(0.48, 0.72, 5, 8);
  starboard_solar_panel.name = "starboard_solar_panel";
  starboard_solar_panel.rotation.z = -Math.PI / 2;
  starboard_solar_panel.position.set(0.426, -0.03, 0.61);
  solar_array_group.add(starboard_solar_panel);

  const port_solar_panel = createSolarPanel(0.48, 0.72, 5, 8);
  port_solar_panel.name = "port_solar_panel";
  port_solar_panel.rotation.z = Math.PI / 2;
  port_solar_panel.position.set(-0.426, -0.03, 0.61);
  solar_array_group.add(port_solar_panel);

  const lower_starboard_solar_panel = createSolarPanel(0.46, 0.68, 5, 8);
  lower_starboard_solar_panel.name = "lower_starboard_solar_panel";
  lower_starboard_solar_panel.rotation.z = -Math.PI / 2;
  lower_starboard_solar_panel.position.set(0.426, -0.03, -0.55);
  solar_array_group.add(lower_starboard_solar_panel);

  const lower_port_solar_panel = createSolarPanel(0.46, 0.68, 5, 8);
  lower_port_solar_panel.name = "lower_port_solar_panel";
  lower_port_solar_panel.rotation.z = Math.PI / 2;
  lower_port_solar_panel.position.set(-0.426, -0.03, -0.55);
  solar_array_group.add(lower_port_solar_panel);

  const tail_finsShape = new THREE.Shape();
  tail_finsShape.moveTo(0.30, -1.47);
  tail_finsShape.lineTo(0.78, -1.40);
  tail_finsShape.lineTo(0.82, -1.10);
  tail_finsShape.lineTo(0.40, -0.82);
  tail_finsShape.closePath();

  const tail_finsGeom = new THREE.ExtrudeGeometry(tail_finsShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2
  });
  tail_finsGeom.translate(0, 0, -0.0225);
  tail_finsGeom.rotateX(Math.PI / 2);

  const tail_fins = new THREE.InstancedMesh(tail_finsGeom, silver_metalMat, 4);
  tail_fins.name = "tail_fins";
  const fin_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    fin_dummy.position.set(0, 0, 0);
    fin_dummy.rotation.set(0, 0, i * Math.PI / 2);
    fin_dummy.scale.set(1, 1, 1);
    fin_dummy.updateMatrix();
    tail_fins.setMatrixAt(i, fin_dummy.matrix);
  }
  tail_fins.instanceMatrix.needsUpdate = true;
  tail_assembly.add(tail_fins);

  const fin_root_fairingsGeom = new THREE.BoxGeometry(0.15, 0.075, 0.52);
  const fin_root_fairings = new THREE.InstancedMesh(
    fin_root_fairingsGeom,
    polished_metalMat,
    4
  );
  fin_root_fairings.name = "fin_root_fairings";
  const fairing_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2;
    fairing_dummy.position.set(
      Math.cos(angle) * 0.39,
      Math.sin(angle) * 0.39,
      -1.17
    );
    fairing_dummy.rotation.set(0, 0, angle - Math.PI / 2);
    fairing_dummy.scale.set(1, 1, 1);
    fairing_dummy.updateMatrix();
    fin_root_fairings.setMatrixAt(i, fairing_dummy.matrix);
  }
  fin_root_fairings.instanceMatrix.needsUpdate = true;
  tail_assembly.add(fin_root_fairings);

  const fin_fastenersGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.012, 16);
  const fin_fasteners = new THREE.InstancedMesh(
    fin_fastenersGeom,
    dark_metalMat,
    4
  );
  fin_fasteners.name = "fin_fasteners";
  const fastener_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2;
    fastener_dummy.position.set(
      Math.cos(angle) * 0.69,
      0.028,
      -1.29
    );
    fastener_dummy.rotation.set(0, 0, 0);
    fastener_dummy.scale.set(1, 1, 1);
    fastener_dummy.updateMatrix();
    fin_fasteners.setMatrixAt(i, fastener_dummy.matrix);
  }
  fin_fasteners.instanceMatrix.needsUpdate = true;
  tail_assembly.add(fin_fasteners);

  const engine_nozzleGeom = new THREE.CylinderGeometry(0.29, 0.34, 0.20, 40);
  const engine_nozzle = new THREE.Mesh(engine_nozzleGeom, dark_metalMat);
  engine_nozzle.name = "engine_nozzle";
  engine_nozzle.rotation.x = Math.PI / 2;
  engine_nozzle.position.z = -1.68;
  tail_assembly.add(engine_nozzle);

  const nozzle_lipGeom = new THREE.TorusGeometry(0.305, 0.025, 10, 40);
  const nozzle_lip = new THREE.Mesh(nozzle_lipGeom, polished_metalMat);
  nozzle_lip.name = "nozzle_lip";
  nozzle_lip.position.z = -1.785;
  tail_assembly.add(nozzle_lip);

  const nozzle_openingGeom = new THREE.CylinderGeometry(0.275, 0.275, 0.018, 40);
  const nozzle_opening = new THREE.Mesh(nozzle_openingGeom, sensor_lensMat);
  nozzle_opening.name = "nozzle_opening";
  nozzle_opening.rotation.x = Math.PI / 2;
  nozzle_opening.position.z = -1.79;
  tail_assembly.add(nozzle_opening);

  const outer_exhaust_flameGeom = new THREE.ConeGeometry(0.29, 1.18, 40);
  const outer_exhaust_flame = new THREE.Mesh(
    outer_exhaust_flameGeom,
    outer_flameMat
  );
  outer_exhaust_flame.name = "outer_exhaust_flame";
  outer_exhaust_flame.rotation.x = -Math.PI / 2;
  outer_exhaust_flame.position.z = -2.38;
  tail_assembly.add(outer_exhaust_flame);

  const inner_exhaust_flameGeom = new THREE.ConeGeometry(0.17, 0.88, 32);
  const inner_exhaust_flame = new THREE.Mesh(
    inner_exhaust_flameGeom,
    inner_flameMat
  );
  inner_exhaust_flame.name = "inner_exhaust_flame";
  inner_exhaust_flame.rotation.x = -Math.PI / 2;
  inner_exhaust_flame.position.z = -2.22;
  tail_assembly.add(inner_exhaust_flame);

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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