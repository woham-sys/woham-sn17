// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "blue_layered_drink";

  const glass_group = new THREE.Group();
  glass_group.name = "glass_group";
  const drink_group = new THREE.Group();
  drink_group.name = "drink_group";
  const foam_group = new THREE.Group();
  foam_group.name = "foam_group";
  const decoration_group = new THREE.Group();
  decoration_group.name = "decoration_group";
  root.add(drink_group, foam_group, decoration_group, glass_group);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const lower_blue_liquidMat = new THREE.MeshStandardMaterial({
    color: 0x07529f,
    metalness: 0.0,
    roughness: 0.7
  });
  const transition_bandMat = new THREE.MeshStandardMaterial({
    color: 0x58b9d5,
    metalness: 0.0,
    roughness: 0.7
  });
  const upper_blue_liquidMat = new THREE.MeshStandardMaterial({
    color: 0x1678c8,
    metalness: 0.0,
    roughness: 0.7
  });
  const foam_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0x1678c8,
    metalness: 0.0,
    roughness: 0.95
  });
  const foam_moundMat = new THREE.MeshStandardMaterial({
    color: 0x07529f,
    metalness: 0.0,
    roughness: 0.95
  });
  const dark_speckleMat = new THREE.MeshStandardMaterial({
    color: 0x031b3a,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const bright_bubbleMat = new THREE.MeshStandardMaterial({
    color: 0xa9e9ff,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x5bc9ff,
    emissiveIntensity: 0.35,
    side: THREE.DoubleSide
  });
  const glass_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.18,
    depthWrite: false
  });

  const glassProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.235, 0.000),
    new THREE.Vector2(0.270, 0.012),
    new THREE.Vector2(0.286, 0.050),
    new THREE.Vector2(0.290, 0.110),
    new THREE.Vector2(0.386, 1.270),
    new THREE.Vector2(0.392, 1.292),
    new THREE.Vector2(0.388, 1.310),
    new THREE.Vector2(0.374, 1.318),
    new THREE.Vector2(0.360, 1.304),
    new THREE.Vector2(0.354, 1.275),
    new THREE.Vector2(0.272, 0.130),
    new THREE.Vector2(0.000, 0.130)
  ];
  const glass_bodyGeom = new THREE.LatheGeometry(glassProfile, 64);
  const glass_body = new THREE.Mesh(glass_bodyGeom, glassMat);
  glass_body.name = "glass_body";
  glass_group.add(glass_body);

  const glass_baseGeom = new THREE.CylinderGeometry(0.286, 0.270, 0.110, 64);
  const glass_base = new THREE.Mesh(glass_baseGeom, glassMat);
  glass_base.name = "glass_base";
  glass_base.position.y = 0.055;
  glass_group.add(glass_base);

  const top_rimGeom = new THREE.TorusGeometry(0.377, 0.012, 12, 64);
  const top_rim = new THREE.Mesh(top_rimGeom, glassMat);
  top_rim.name = "top_rim";
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 1.306;
  glass_group.add(top_rim);

  const inner_rimGeom = new THREE.TorusGeometry(0.360, 0.005, 10, 64);
  const inner_rim = new THREE.Mesh(inner_rimGeom, glassMat);
  inner_rim.name = "inner_rim";
  inner_rim.rotation.x = Math.PI / 2;
  inner_rim.position.y = 1.303;
  glass_group.add(inner_rim);

  const bottom_rimGeom = new THREE.TorusGeometry(0.267, 0.008, 10, 64);
  const bottom_rim = new THREE.Mesh(bottom_rimGeom, glassMat);
  bottom_rim.name = "bottom_rim";
  bottom_rim.rotation.x = Math.PI / 2;
  bottom_rim.position.y = 0.018;
  glass_group.add(bottom_rim);

  const lower_blue_liquidGeom = new THREE.CylinderGeometry(0.314, 0.270, 0.560, 64);
  const lower_blue_liquid = new THREE.Mesh(lower_blue_liquidGeom, lower_blue_liquidMat);
  lower_blue_liquid.name = "lower_blue_liquid";
  lower_blue_liquid.position.y = 0.410;
  drink_group.add(lower_blue_liquid);

  const transition_bandGeom = new THREE.CylinderGeometry(0.323, 0.314, 0.130, 64);
  const transition_band = new THREE.Mesh(transition_bandGeom, transition_bandMat);
  transition_band.name = "transition_band";
  transition_band.position.y = 0.745;
  drink_group.add(transition_band);

  const upper_blue_liquidGeom = new THREE.CylinderGeometry(0.356, 0.323, 0.430, 64);
  const upper_blue_liquid = new THREE.Mesh(upper_blue_liquidGeom, upper_blue_liquidMat);
  upper_blue_liquid.name = "upper_blue_liquid";
  upper_blue_liquid.position.y = 1.015;
  drink_group.add(upper_blue_liquid);

  const foam_surfaceGeom = new THREE.CylinderGeometry(0.356, 0.354, 0.018, 64);
  const foam_surface = new THREE.Mesh(foam_surfaceGeom, foam_surfaceMat);
  foam_surface.name = "foam_surface";
  foam_surface.position.y = 1.235;
  foam_group.add(foam_surface);

  const foam_edgeGeom = new THREE.TorusGeometry(0.348, 0.007, 10, 64);
  const foam_edge = new THREE.Mesh(foam_edgeGeom, foam_surfaceMat);
  foam_edge.name = "foam_edge";
  foam_edge.rotation.x = Math.PI / 2;
  foam_edge.position.y = 1.244;
  foam_group.add(foam_edge);

  const foam_mound_baseGeom = new THREE.SphereGeometry(1, 32, 16);
  const foam_mound_base = new THREE.Mesh(foam_mound_baseGeom, foam_moundMat);
  foam_mound_base.name = "foam_mound_base";
  foam_mound_base.position.set(0.015, 1.247, -0.015);
  foam_mound_base.scale.set(0.115, 0.025, 0.095);
  foam_group.add(foam_mound_base);

  const foam_mound_peakGeom = new THREE.SphereGeometry(1, 24, 12);
  const foam_mound_peak = new THREE.Mesh(foam_mound_peakGeom, foam_moundMat);
  foam_mound_peak.name = "foam_mound_peak";
  foam_mound_peak.position.set(0.025, 1.267, -0.010);
  foam_mound_peak.scale.set(0.055, 0.035, 0.050);
  foam_group.add(foam_mound_peak);

  const foam_bubbleGeom = new THREE.SphereGeometry(1, 10, 6);
  const foam_bubbles = new THREE.InstancedMesh(foam_bubbleGeom, foam_surfaceMat, 48);
  foam_bubbles.name = "foam_bubbles";
  const foamBubbleDummy = new THREE.Object3D();
  for (let i = 0; i < 48; i++) {
    const angle = i * 2.3999632297;
    const radial = 0.335 * Math.sqrt((i + 0.5) / 48);
    const size = 0.004 + 0.008 * ((i * 5) % 11) / 10;
    foamBubbleDummy.position.set(
      Math.cos(angle) * radial,
      1.247 + size * 0.25,
      Math.sin(angle) * radial
    );
    foamBubbleDummy.rotation.set(0, angle, 0);
    foamBubbleDummy.scale.set(size, size * 0.45, size);
    foamBubbleDummy.updateMatrix();
    foam_bubbles.setMatrixAt(i, foamBubbleDummy.matrix);
  }
  foam_bubbles.instanceMatrix.needsUpdate = true;
  foam_group.add(foam_bubbles);

  function liquidRadiusAt(y) {
    if (y <= 0.690) {
      return 0.270 + (y - 0.130) / 0.560 * 0.044;
    }
    if (y <= 0.810) {
      return 0.314 + (y - 0.690) / 0.120 * 0.009;
    }
    return 0.323 + (y - 0.810) / 0.430 * 0.033;
  }

  const side_speckleGeom = new THREE.CircleGeometry(1, 8);
  const side_speckles = new THREE.InstancedMesh(side_speckleGeom, dark_speckleMat, 150);
  side_speckles.name = "side_speckles";
  const sideSpeckleDummy = new THREE.Object3D();
  const forwardNormal = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < 150; i++) {
    const y = 0.170 + (((i * 37) % 151) / 150) * 1.045;
    const angle = i * 2.3999632297 + 0.31;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const radius = liquidRadiusAt(y) + 0.0025;
    const size = 0.0025 + 0.0065 * ((i * 11) % 13) / 12;
    sideSpeckleDummy.position.set(normal.x * radius, y, normal.z * radius);
    sideSpeckleDummy.quaternion.setFromUnitVectors(forwardNormal, normal);
    sideSpeckleDummy.scale.set(size, size * (0.75 + 0.35 * (i % 3) / 2), 1);
    sideSpeckleDummy.updateMatrix();
    side_speckles.setMatrixAt(i, sideSpeckleDummy.matrix);
  }
  side_speckles.instanceMatrix.needsUpdate = true;
  decoration_group.add(side_speckles);

  const side_glints = new THREE.InstancedMesh(side_speckleGeom, bright_bubbleMat, 55);
  side_glints.name = "side_glints";
  const sideGlintDummy = new THREE.Object3D();
  for (let i = 0; i < 55; i++) {
    const y = 0.200 + (((i * 23) % 59) / 58) * 0.990;
    const angle = i * 2.3999632297 + 1.17;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const radius = liquidRadiusAt(y) + 0.003;
    const size = 0.002 + 0.0045 * ((i * 7) % 9) / 8;
    sideGlintDummy.position.set(normal.x * radius, y, normal.z * radius);
    sideGlintDummy.quaternion.setFromUnitVectors(forwardNormal, normal);
    sideGlintDummy.scale.set(size, size, 1);
    sideGlintDummy.updateMatrix();
    side_glints.setMatrixAt(i, sideGlintDummy.matrix);
  }
  side_glints.instanceMatrix.needsUpdate = true;
  decoration_group.add(side_glints);

  const top_speckleGeom = new THREE.CircleGeometry(1, 8);
  const top_speckles = new THREE.InstancedMesh(top_speckleGeom, dark_speckleMat, 85);
  top_speckles.name = "top_speckles";
  const topSpeckleDummy = new THREE.Object3D();
  for (let i = 0; i < 85; i++) {
    const angle = i * 2.3999632297 + 0.65;
    const radial = 0.330 * Math.sqrt((i + 0.5) / 85);
    const size = 0.0025 + 0.007 * ((i * 9) % 12) / 11;
    topSpeckleDummy.position.set(
      Math.cos(angle) * radial,
      1.247,
      Math.sin(angle) * radial
    );
    topSpeckleDummy.rotation.set(-Math.PI / 2, 0, angle);
    topSpeckleDummy.scale.set(size, size * (0.7 + 0.3 * (i % 4) / 3), 1);
    topSpeckleDummy.updateMatrix();
    top_speckles.setMatrixAt(i, topSpeckleDummy.matrix);
  }
  top_speckles.instanceMatrix.needsUpdate = true;
  decoration_group.add(top_speckles);

  const top_glints = new THREE.InstancedMesh(top_speckleGeom, bright_bubbleMat, 34);
  top_glints.name = "top_glints";
  const topGlintDummy = new THREE.Object3D();
  for (let i = 0; i < 34; i++) {
    const angle = i * 2.3999632297 + 1.85;
    const radial = 0.320 * Math.sqrt((i + 0.8) / 34);
    const size = 0.002 + 0.0045 * ((i * 5) % 8) / 7;
    topGlintDummy.position.set(
      Math.cos(angle) * radial,
      1.249,
      Math.sin(angle) * radial
    );
    topGlintDummy.rotation.set(-Math.PI / 2, 0, angle);
    topGlintDummy.scale.set(size, size, 1);
    topGlintDummy.updateMatrix();
    top_glints.setMatrixAt(i, topGlintDummy.matrix);
  }
  top_glints.instanceMatrix.needsUpdate = true;
  decoration_group.add(top_glints);

  const leftHighlightPoints = [
    new THREE.Vector3(-0.230, 0.145, 0.145),
    new THREE.Vector3(-0.258, 0.430, 0.164),
    new THREE.Vector3(-0.286, 0.760, 0.183),
    new THREE.Vector3(-0.314, 1.060, 0.202),
    new THREE.Vector3(-0.326, 1.225, 0.210)
  ];
  const left_glass_highlightGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(leftHighlightPoints),
    24,
    0.003,
    6,
    false
  );
  const left_glass_highlight = new THREE.Mesh(left_glass_highlightGeom, glass_highlightMat);
  left_glass_highlight.name = "left_glass_highlight";
  glass_group.add(left_glass_highlight);

  const rightHighlightPoints = [
    new THREE.Vector3(0.248, 0.180, 0.120),
    new THREE.Vector3(0.278, 0.500, 0.137),
    new THREE.Vector3(0.307, 0.830, 0.154),
    new THREE.Vector3(0.330, 1.115, 0.169)
  ];
  const right_glass_highlightGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(rightHighlightPoints),
    20,
    0.0022,
    6,
    false
  );
  const right_glass_highlight = new THREE.Mesh(right_glass_highlightGeom, glass_highlightMat);
  right_glass_highlight.name = "right_glass_highlight";
  glass_group.add(right_glass_highlight);

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