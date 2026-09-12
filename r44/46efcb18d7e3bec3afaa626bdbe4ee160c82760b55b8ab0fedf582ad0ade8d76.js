// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_oil_lamp";

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a45,
    metalness: 0.6,
    roughness: 0.3,
  });
  const brightBrassMat = new THREE.MeshStandardMaterial({
    color: 0xd0ad62,
    metalness: 0.6,
    roughness: 0.24,
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x654a27,
    metalness: 0.55,
    roughness: 0.48,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x493723,
    metalness: 0.45,
    roughness: 0.65,
  });
  const ironMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8eeee,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glassEdgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xcbd4d2,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.82,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const base_footProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.58, 0.00),
    new THREE.Vector2(0.67, 0.025),
    new THREE.Vector2(0.72, 0.075),
    new THREE.Vector2(0.70, 0.125),
    new THREE.Vector2(0.64, 0.18),
    new THREE.Vector2(0.60, 0.22),
    new THREE.Vector2(0.00, 0.22),
  ];
  const base_footGeom = new THREE.LatheGeometry(base_footProfile, 64);
  const base_foot = new THREE.Mesh(base_footGeom, brassMat);
  base_foot.name = "base_foot";
  base_assembly.add(base_foot);

  const ornamental_skirtProfile = [
    new THREE.Vector2(0.00, 0.17),
    new THREE.Vector2(0.61, 0.17),
    new THREE.Vector2(0.60, 0.22),
    new THREE.Vector2(0.57, 0.29),
    new THREE.Vector2(0.53, 0.38),
    new THREE.Vector2(0.48, 0.47),
    new THREE.Vector2(0.41, 0.55),
    new THREE.Vector2(0.34, 0.59),
    new THREE.Vector2(0.00, 0.59),
  ];
  const ornamental_skirtGeom = new THREE.LatheGeometry(ornamental_skirtProfile, 64);
  const ornamental_skirt = new THREE.Mesh(ornamental_skirtGeom, darkBrassMat);
  ornamental_skirt.name = "ornamental_skirt";
  base_assembly.add(ornamental_skirt);

  const base_lower_ringGeom = new THREE.TorusGeometry(0.665, 0.025, 10, 64);
  const base_lower_ring = new THREE.Mesh(base_lower_ringGeom, brightBrassMat);
  base_lower_ring.name = "base_lower_ring";
  base_lower_ring.rotation.x = Math.PI / 2;
  base_lower_ring.position.y = 0.095;
  base_assembly.add(base_lower_ring);

  const base_upper_ringGeom = new THREE.TorusGeometry(0.585, 0.018, 10, 64);
  const base_upper_ring = new THREE.Mesh(base_upper_ringGeom, brassMat);
  base_upper_ring.name = "base_upper_ring";
  base_upper_ring.rotation.x = Math.PI / 2;
  base_upper_ring.position.y = 0.205;
  base_assembly.add(base_upper_ring);

  const pedestalProfile = [
    new THREE.Vector2(0.00, 0.49),
    new THREE.Vector2(0.35, 0.49),
    new THREE.Vector2(0.39, 0.54),
    new THREE.Vector2(0.36, 0.60),
    new THREE.Vector2(0.29, 0.66),
    new THREE.Vector2(0.25, 0.73),
    new THREE.Vector2(0.24, 0.82),
    new THREE.Vector2(0.27, 0.89),
    new THREE.Vector2(0.34, 0.95),
    new THREE.Vector2(0.00, 0.95),
  ];
  const pedestalGeom = new THREE.LatheGeometry(pedestalProfile, 64);
  const pedestal = new THREE.Mesh(pedestalGeom, brassMat);
  pedestal.name = "pedestal";
  base_assembly.add(pedestal);

  const pedestal_lower_ringGeom = new THREE.TorusGeometry(0.35, 0.022, 10, 48);
  const pedestal_lower_ring = new THREE.Mesh(pedestal_lower_ringGeom, brightBrassMat);
  pedestal_lower_ring.name = "pedestal_lower_ring";
  pedestal_lower_ring.rotation.x = Math.PI / 2;
  pedestal_lower_ring.position.y = 0.535;
  base_assembly.add(pedestal_lower_ring);

  const pedestal_upper_ringGeom = new THREE.TorusGeometry(0.315, 0.018, 10, 48);
  const pedestal_upper_ring = new THREE.Mesh(pedestal_upper_ringGeom, darkBrassMat);
  pedestal_upper_ring.name = "pedestal_upper_ring";
  pedestal_upper_ring.rotation.x = Math.PI / 2;
  pedestal_upper_ring.position.y = 0.925;
  base_assembly.add(pedestal_upper_ring);

  const oil_reservoirProfile = [
    new THREE.Vector2(0.00, 0.86),
    new THREE.Vector2(0.29, 0.86),
    new THREE.Vector2(0.35, 0.91),
    new THREE.Vector2(0.42, 0.98),
    new THREE.Vector2(0.47, 1.08),
    new THREE.Vector2(0.49, 1.18),
    new THREE.Vector2(0.47, 1.27),
    new THREE.Vector2(0.42, 1.33),
    new THREE.Vector2(0.00, 1.34),
  ];
  const oil_reservoirGeom = new THREE.LatheGeometry(oil_reservoirProfile, 64);
  const oil_reservoir = new THREE.Mesh(oil_reservoirGeom, brassMat);
  oil_reservoir.name = "oil_reservoir";
  base_assembly.add(oil_reservoir);

  const reservoir_lower_bandGeom = new THREE.TorusGeometry(0.355, 0.018, 10, 48);
  const reservoir_lower_band = new THREE.Mesh(reservoir_lower_bandGeom, darkBrassMat);
  reservoir_lower_band.name = "reservoir_lower_band";
  reservoir_lower_band.rotation.x = Math.PI / 2;
  reservoir_lower_band.position.y = 0.92;
  base_assembly.add(reservoir_lower_band);

  const top_plateGeom = new THREE.CylinderGeometry(0.57, 0.54, 0.055, 64);
  const top_plate = new THREE.Mesh(top_plateGeom, brassMat);
  top_plate.name = "top_plate";
  top_plate.position.y = 1.35;
  base_assembly.add(top_plate);

  const top_plate_rimGeom = new THREE.TorusGeometry(0.545, 0.026, 10, 64);
  const top_plate_rim = new THREE.Mesh(top_plate_rimGeom, brightBrassMat);
  top_plate_rim.name = "top_plate_rim";
  top_plate_rim.rotation.x = Math.PI / 2;
  top_plate_rim.position.y = 1.375;
  base_assembly.add(top_plate_rim);

  const burner_columnProfile = [
    new THREE.Vector2(0.00, 1.34),
    new THREE.Vector2(0.31, 1.34),
    new THREE.Vector2(0.35, 1.38),
    new THREE.Vector2(0.35, 1.43),
    new THREE.Vector2(0.32, 1.47),
    new THREE.Vector2(0.32, 1.59),
    new THREE.Vector2(0.35, 1.63),
    new THREE.Vector2(0.36, 1.68),
    new THREE.Vector2(0.31, 1.73),
    new THREE.Vector2(0.00, 1.73),
  ];
  const burner_columnGeom = new THREE.LatheGeometry(burner_columnProfile, 64);
  const burner_column = new THREE.Mesh(burner_columnGeom, brassMat);
  burner_column.name = "burner_column";
  base_assembly.add(burner_column);

  const burner_lower_bandGeom = new THREE.TorusGeometry(0.335, 0.022, 10, 48);
  const burner_lower_band = new THREE.Mesh(burner_lower_bandGeom, darkBrassMat);
  burner_lower_band.name = "burner_lower_band";
  burner_lower_band.rotation.x = Math.PI / 2;
  burner_lower_band.position.y = 1.405;
  base_assembly.add(burner_lower_band);

  const burner_middle_bandGeom = new THREE.TorusGeometry(0.325, 0.016, 10, 48);
  const burner_middle_band = new THREE.Mesh(burner_middle_bandGeom, brightBrassMat);
  burner_middle_band.name = "burner_middle_band";
  burner_middle_band.rotation.x = Math.PI / 2;
  burner_middle_band.position.y = 1.505;
  base_assembly.add(burner_middle_band);

  const burner_upper_bandGeom = new THREE.TorusGeometry(0.335, 0.021, 10, 48);
  const burner_upper_band = new THREE.Mesh(burner_upper_bandGeom, darkBrassMat);
  burner_upper_band.name = "burner_upper_band";
  burner_upper_band.rotation.x = Math.PI / 2;
  burner_upper_band.position.y = 1.625;
  base_assembly.add(burner_upper_band);

  const burner_top_lipGeom = new THREE.TorusGeometry(0.335, 0.028, 12, 64);
  const burner_top_lip = new THREE.Mesh(burner_top_lipGeom, brightBrassMat);
  burner_top_lip.name = "burner_top_lip";
  burner_top_lip.rotation.x = Math.PI / 2;
  burner_top_lip.position.y = 1.7;
  base_assembly.add(burner_top_lip);

  const burner_openingGeom = new THREE.CylinderGeometry(0.285, 0.285, 0.025, 48);
  const burner_opening = new THREE.Mesh(burner_openingGeom, ironMat);
  burner_opening.name = "burner_opening";
  burner_opening.position.y = 1.735;
  base_assembly.add(burner_opening);

  const burner_screwGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.025, 16);
  const burner_screw = new THREE.Mesh(burner_screwGeom, ironMat);
  burner_screw.name = "burner_screw";
  burner_screw.rotation.x = Math.PI / 2;
  burner_screw.position.set(0.22, 1.55, 0.275);
  base_assembly.add(burner_screw);

  const burner_screw_slotGeom = new THREE.BoxGeometry(0.045, 0.008, 0.008);
  const burner_screw_slot = new THREE.Mesh(burner_screw_slotGeom, patinaMat);
  burner_screw_slot.name = "burner_screw_slot";
  burner_screw_slot.position.set(0.22, 1.55, 0.291);
  base_assembly.add(burner_screw_slot);

  const lever_armPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.39, 1.31, 0.12),
    new THREE.Vector3(-0.52, 1.34, 0.15),
    new THREE.Vector3(-0.64, 1.40, 0.17),
    new THREE.Vector3(-0.73, 1.46, 0.18),
  ], false, "centripetal");
  const lever_armGeom = new THREE.TubeGeometry(lever_armPath, 20, 0.025, 8, false);
  const lever_arm = new THREE.Mesh(lever_armGeom, darkBrassMat);
  lever_arm.name = "lever_arm";
  base_assembly.add(lever_arm);

  const lever_pivotGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.045, 20);
  const lever_pivot = new THREE.Mesh(lever_pivotGeom, ironMat);
  lever_pivot.name = "lever_pivot";
  lever_pivot.rotation.x = Math.PI / 2;
  lever_pivot.position.set(-0.405, 1.31, 0.13);
  base_assembly.add(lever_pivot);

  const lever_handleGeom = new THREE.SphereGeometry(1, 24, 12);
  const lever_handle = new THREE.Mesh(lever_handleGeom, brightBrassMat);
  lever_handle.name = "lever_handle";
  lever_handle.position.set(-0.79, 1.49, 0.18);
  lever_handle.rotation.z = -0.7;
  lever_handle.scale.set(0.12, 0.045, 0.065);
  base_assembly.add(lever_handle);

  const lever_handle_insetGeom = new THREE.SphereGeometry(1, 20, 10);
  const lever_handle_inset = new THREE.Mesh(lever_handle_insetGeom, darkBrassMat);
  lever_handle_inset.name = "lever_handle_inset";
  lever_handle_inset.position.set(-0.79, 1.492, 0.235);
  lever_handle_inset.rotation.z = -0.7;
  lever_handle_inset.scale.set(0.085, 0.025, 0.035);
  base_assembly.add(lever_handle_inset);

  const scroll_ornament = new THREE.Group();
  scroll_ornament.name = "scroll_ornament";
  base_assembly.add(scroll_ornament);

  const scrollCount = 8;
  for (let i = 0; i < scrollCount; i++) {
    const centerAngle = i / scrollCount * Math.PI * 2;
    const scrollPoints = [];
    for (let j = 0; j <= 28; j++) {
      const t = j / 28;
      const spiralRadius = 0.145 * (1 - t * 0.82);
      const phase = t * Math.PI * 2 * 1.65;
      const localX = Math.cos(phase) * spiralRadius;
      const localY = 0.39 + Math.sin(phase) * spiralRadius * 0.78;
      const surfaceRadius = 0.61 - (localY - 0.18) * 0.55;
      const angle = centerAngle - localX / surfaceRadius;
      scrollPoints.push(new THREE.Vector3(
        Math.cos(angle) * (surfaceRadius + 0.014),
        localY,
        Math.sin(angle) * (surfaceRadius + 0.014)
      ));
    }
    const scrollCurve = new THREE.CatmullRomCurve3(scrollPoints, false, "centripetal");
    const scrollGeom = new THREE.TubeGeometry(scrollCurve, 40, 0.014, 7, false);
    const scroll = new THREE.Mesh(scrollGeom, brightBrassMat);
    scroll.name = "scroll_" + i;
    scroll_ornament.add(scroll);
  }

  const scroll_dividerGeom = new THREE.CylinderGeometry(0.014, 0.019, 0.22, 8);
  const scroll_dividers = new THREE.InstancedMesh(
    scroll_dividerGeom,
    brightBrassMat,
    scrollCount
  );
  scroll_dividers.name = "scroll_dividers";
  const dividerMatrix = new THREE.Matrix4();
  for (let i = 0; i < scrollCount; i++) {
    const angle = (i + 0.5) / scrollCount * Math.PI * 2;
    dividerMatrix.makeTranslation(
      Math.cos(angle) * 0.535,
      0.39,
      Math.sin(angle) * 0.535
    );
    scroll_dividers.setMatrixAt(i, dividerMatrix);
  }
  scroll_dividers.instanceMatrix.needsUpdate = true;
  scroll_ornament.add(scroll_dividers);

  const burner_mechanism = new THREE.Group();
  burner_mechanism.name = "burner_mechanism";
  root.add(burner_mechanism);

  const wick_holderGeom = new THREE.CylinderGeometry(0.075, 0.09, 0.18, 20);
  const wick_holder = new THREE.Mesh(wick_holderGeom, darkBrassMat);
  wick_holder.name = "wick_holder";
  wick_holder.position.y = 1.82;
  burner_mechanism.add(wick_holder);

  const wick_holder_capGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.035, 20);
  const wick_holder_cap = new THREE.Mesh(wick_holder_capGeom, ironMat);
  wick_holder_cap.name = "wick_holder_cap";
  wick_holder_cap.position.y = 1.925;
  burner_mechanism.add(wick_holder_cap);

  const wickGeom = new THREE.BoxGeometry(0.025, 0.12, 0.018);
  const wick = new THREE.Mesh(wickGeom, patinaMat);
  wick.name = "wick";
  wick.position.y = 1.995;
  burner_mechanism.add(wick);

  const mechanism_postGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.43, 8);
  const mechanism_posts = new THREE.InstancedMesh(mechanism_postGeom, ironMat, 2);
  mechanism_posts.name = "mechanism_posts";
  const postMatrix = new THREE.Matrix4();
  postMatrix.makeTranslation(-0.14, 2.02, 0.015);
  mechanism_posts.setMatrixAt(0, postMatrix);
  postMatrix.makeTranslation(0.14, 2.02, 0.015);
  mechanism_posts.setMatrixAt(1, postMatrix);
  mechanism_posts.instanceMatrix.needsUpdate = true;
  burner_mechanism.add(mechanism_posts);

  const mechanism_crossbarGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.31, 8);
  const mechanism_crossbar = new THREE.Mesh(mechanism_crossbarGeom, ironMat);
  mechanism_crossbar.name = "mechanism_crossbar";
  mechanism_crossbar.rotation.z = Math.PI / 2;
  mechanism_crossbar.position.set(0, 2.235, 0.015);
  burner_mechanism.add(mechanism_crossbar);

  const mechanism_diagonal_leftGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-0.13, 1.84, 0.025),
      new THREE.Vector3(0.02, 2.22, 0.025)
    ),
    1,
    0.008,
    6,
    false
  );
  const mechanism_diagonal_left = new THREE.Mesh(mechanism_diagonal_leftGeom, ironMat);
  mechanism_diagonal_left.name = "mechanism_diagonal_left";
  burner_mechanism.add(mechanism_diagonal_left);

  const mechanism_diagonal_rightGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0.13, 1.84, 0.025),
      new THREE.Vector3(-0.02, 2.22, 0.025)
    ),
    1,
    0.008,
    6,
    false
  );
  const mechanism_diagonal_right = new THREE.Mesh(mechanism_diagonal_rightGeom, ironMat);
  mechanism_diagonal_right.name = "mechanism_diagonal_right";
  burner_mechanism.add(mechanism_diagonal_right);

  const mechanism_wheelGeom = new THREE.TorusGeometry(0.075, 0.012, 8, 24);
  const mechanism_wheel = new THREE.Mesh(mechanism_wheelGeom, ironMat);
  mechanism_wheel.name = "mechanism_wheel";
  mechanism_wheel.position.set(0.02, 1.98, 0.09);
  burner_mechanism.add(mechanism_wheel);

  const mechanism_wheel_hubGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.035, 12);
  const mechanism_wheel_hub = new THREE.Mesh(mechanism_wheel_hubGeom, darkBrassMat);
  mechanism_wheel_hub.name = "mechanism_wheel_hub";
  mechanism_wheel_hub.rotation.x = Math.PI / 2;
  mechanism_wheel_hub.position.set(0.02, 1.98, 0.09);
  burner_mechanism.add(mechanism_wheel_hub);

  const mechanism_linkagePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.08, 1.92, 0.06),
    new THREE.Vector3(0.16, 1.96, 0.07),
    new THREE.Vector3(0.20, 2.04, 0.075),
    new THREE.Vector3(0.17, 2.12, 0.075),
  ], false, "centripetal");
  const mechanism_linkageGeom = new THREE.TubeGeometry(
    mechanism_linkagePath,
    16,
    0.011,
    6,
    false
  );
  const mechanism_linkage = new THREE.Mesh(mechanism_linkageGeom, ironMat);
  mechanism_linkage.name = "mechanism_linkage";
  burner_mechanism.add(mechanism_linkage);

  const chimney_assembly = new THREE.Group();
  chimney_assembly.name = "chimney_assembly";
  chimney_assembly.position.set(0, 1.69, 0);
  chimney_assembly.rotation.z = -0.16;
  root.add(chimney_assembly);

  const glass_chimneyProfile = [
    new THREE.Vector2(0.285, 0.00),
    new THREE.Vector2(0.34, 0.06),
    new THREE.Vector2(0.42, 0.18),
    new THREE.Vector2(0.49, 0.38),
    new THREE.Vector2(0.52, 0.62),
    new THREE.Vector2(0.51, 0.84),
    new THREE.Vector2(0.47, 1.08),
    new THREE.Vector2(0.41, 1.34),
    new THREE.Vector2(0.35, 1.62),
    new THREE.Vector2(0.30, 1.90),
    new THREE.Vector2(0.265, 2.16),
    new THREE.Vector2(0.27, 2.30),
    new THREE.Vector2(0.30, 2.36),
    new THREE.Vector2(0.265, 2.34),
    new THREE.Vector2(0.245, 2.15),
    new THREE.Vector2(0.285, 1.89),
    new THREE.Vector2(0.335, 1.61),
    new THREE.Vector2(0.395, 1.33),
    new THREE.Vector2(0.45, 1.07),
    new THREE.Vector2(0.485, 0.83),
    new THREE.Vector2(0.495, 0.62),
    new THREE.Vector2(0.465, 0.40),
    new THREE.Vector2(0.395, 0.20),
    new THREE.Vector2(0.315, 0.08),
    new THREE.Vector2(0.255, 0.03),
  ];
  const glass_chimneyGeom = new THREE.LatheGeometry(glass_chimneyProfile, 64);
  const glass_chimney = new THREE.Mesh(glass_chimneyGeom, glassMat);
  glass_chimney.name = "glass_chimney";
  glass_chimney.renderOrder = 2;
  chimney_assembly.add(glass_chimney);

  const glass_bottom_rimGeom = new THREE.TorusGeometry(0.292, 0.014, 8, 48);
  const glass_bottom_rim = new THREE.Mesh(glass_bottom_rimGeom, glassEdgeMat);
  glass_bottom_rim.name = "glass_bottom_rim";
  glass_bottom_rim.rotation.x = Math.PI / 2;
  glass_bottom_rim.position.y = 0.025;
  glass_bottom_rim.renderOrder = 3;
  chimney_assembly.add(glass_bottom_rim);

  const glass_top_rimGeom = new THREE.TorusGeometry(0.282, 0.018, 10, 64);
  const glass_top_rim = new THREE.Mesh(glass_top_rimGeom, glassEdgeMat);
  glass_top_rim.name = "glass_top_rim";
  glass_top_rim.rotation.x = Math.PI / 2;
  glass_top_rim.position.y = 2.35;
  glass_top_rim.renderOrder = 3;
  chimney_assembly.add(glass_top_rim);

  const glass_inner_rimGeom = new THREE.TorusGeometry(0.252, 0.009, 8, 48);
  const glass_inner_rim = new THREE.Mesh(glass_inner_rimGeom, glassEdgeMat);
  glass_inner_rim.name = "glass_inner_rim";
  glass_inner_rim.rotation.x = Math.PI / 2;
  glass_inner_rim.position.y = 2.335;
  glass_inner_rim.renderOrder = 3;
  chimney_assembly.add(glass_inner_rim);

  const glass_highlight_leftGeom = new THREE.PlaneGeometry(0.055, 1.45);
  const glass_highlight_left = new THREE.Mesh(glass_highlight_leftGeom, highlightMat);
  glass_highlight_left.name = "glass_highlight_left";
  glass_highlight_left.position.set(-0.14, 1.30, 0.36);
  glass_highlight_left.rotation.z = -0.04;
  glass_highlight_left.renderOrder = 4;
  chimney_assembly.add(glass_highlight_left);

  const glass_highlight_rightGeom = new THREE.PlaneGeometry(0.035, 1.05);
  const glass_highlight_right = new THREE.Mesh(glass_highlight_rightGeom, highlightMat);
  glass_highlight_right.name = "glass_highlight_right";
  glass_highlight_right.position.set(0.16, 1.48, 0.33);
  glass_highlight_right.rotation.z = 0.025;
  glass_highlight_right.renderOrder = 4;
  chimney_assembly.add(glass_highlight_right);

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