// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cylindrical_container";

  const body_assembly = new THREE.Group();
  body_assembly.name = "body_assembly";
  root.add(body_assembly);

  const lid_assembly = new THREE.Group();
  lid_assembly.name = "lid_assembly";
  root.add(lid_assembly);

  const blue_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x1688d8,
    metalness: 0.0,
    roughness: 0.3
  });

  const black_fabricMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.95
  });

  const dark_recessMat = new THREE.MeshStandardMaterial({
    color: 0x07111c,
    metalness: 0.0,
    roughness: 0.8
  });

  const bottom_baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.78, 0.00),
    new THREE.Vector2(0.90, 0.025),
    new THREE.Vector2(0.97, 0.085),
    new THREE.Vector2(1.00, 0.18),
    new THREE.Vector2(1.00, 0.36),
    new THREE.Vector2(0.985, 0.43),
    new THREE.Vector2(0.00, 0.43)
  ];
  const bottom_baseGeom = new THREE.LatheGeometry(bottom_baseProfile, 64);
  const bottom_base = new THREE.Mesh(bottom_baseGeom, blue_plasticMat);
  bottom_base.name = "bottom_base";
  body_assembly.add(bottom_base);

  const bottom_rimGeom = new THREE.TorusGeometry(0.965, 0.027, 12, 64);
  const bottom_rim = new THREE.Mesh(bottom_rimGeom, blue_plasticMat);
  bottom_rim.name = "bottom_rim";
  bottom_rim.rotation.x = Math.PI / 2;
  bottom_rim.position.y = 0.405;
  body_assembly.add(bottom_rim);

  const main_bodyGeom = new THREE.CylinderGeometry(0.985, 0.985, 1.42, 64, 1, false);
  const main_body = new THREE.Mesh(main_bodyGeom, black_fabricMat);
  main_body.name = "main_body";
  main_body.position.y = 1.10;
  body_assembly.add(main_body);

  const blue_front_panelGeom = new THREE.CylinderGeometry(
    0.991,
    0.991,
    1.36,
    40,
    1,
    true,
    -1.28,
    2.18
  );
  const blue_front_panel = new THREE.Mesh(blue_front_panelGeom, blue_plasticMat);
  blue_front_panel.name = "blue_front_panel";
  blue_front_panel.position.y = 1.10;
  body_assembly.add(blue_front_panel);

  const upper_collarGeom = new THREE.CylinderGeometry(1.015, 1.015, 0.14, 64);
  const upper_collar = new THREE.Mesh(upper_collarGeom, blue_plasticMat);
  upper_collar.name = "upper_collar";
  upper_collar.position.y = 1.82;
  body_assembly.add(upper_collar);

  const upper_rimGeom = new THREE.TorusGeometry(0.985, 0.058, 14, 64);
  const upper_rim = new THREE.Mesh(upper_rimGeom, blue_plasticMat);
  upper_rim.name = "upper_rim";
  upper_rim.rotation.x = Math.PI / 2;
  upper_rim.position.y = 1.86;
  body_assembly.add(upper_rim);

  const upper_rim_shadowGeom = new THREE.TorusGeometry(0.982, 0.014, 8, 64);
  const upper_rim_shadow = new THREE.Mesh(upper_rim_shadowGeom, dark_recessMat);
  upper_rim_shadow.name = "upper_rim_shadow";
  upper_rim_shadow.rotation.x = Math.PI / 2;
  upper_rim_shadow.position.y = 1.79;
  body_assembly.add(upper_rim_shadow);

  const upper_black_bandGeom = new THREE.CylinderGeometry(0.995, 0.995, 0.22, 64);
  const upper_black_band = new THREE.Mesh(upper_black_bandGeom, black_fabricMat);
  upper_black_band.name = "upper_black_band";
  upper_black_band.position.y = 2.00;
  body_assembly.add(upper_black_band);

  const lid_seamGeom = new THREE.TorusGeometry(0.992, 0.018, 8, 64);
  const lid_seam = new THREE.Mesh(lid_seamGeom, dark_recessMat);
  lid_seam.name = "lid_seam";
  lid_seam.rotation.x = Math.PI / 2;
  lid_seam.position.y = 2.105;
  body_assembly.add(lid_seam);

  const hanging_tabShape = new THREE.Shape();
  hanging_tabShape.moveTo(-0.035, 0.075);
  hanging_tabShape.lineTo(0.035, 0.075);
  hanging_tabShape.lineTo(0.035, -0.055);
  hanging_tabShape.bezierCurveTo(0.035, -0.09, 0.018, -0.11, 0.0, -0.11);
  hanging_tabShape.bezierCurveTo(-0.018, -0.11, -0.035, -0.09, -0.035, -0.055);
  hanging_tabShape.closePath();

  const hanging_tabGeom = new THREE.ExtrudeGeometry(hanging_tabShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.005,
    bevelSegments: 2
  });
  const hanging_tab = new THREE.Mesh(hanging_tabGeom, blue_plasticMat);
  hanging_tab.name = "hanging_tab";
  const tabAngle = -0.38;
  const tabNormal = new THREE.Vector3(Math.sin(tabAngle), 0, Math.cos(tabAngle));
  hanging_tab.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tabNormal);
  hanging_tab.position.copy(tabNormal).multiplyScalar(0.995);
  hanging_tab.position.y = 1.72;
  body_assembly.add(hanging_tab);

  const top_lidProfile = [
    new THREE.Vector2(0.00, 2.09),
    new THREE.Vector2(0.92, 2.09),
    new THREE.Vector2(1.01, 2.11),
    new THREE.Vector2(1.07, 2.15),
    new THREE.Vector2(1.09, 2.19),
    new THREE.Vector2(1.075, 2.23),
    new THREE.Vector2(1.02, 2.27),
    new THREE.Vector2(0.94, 2.295),
    new THREE.Vector2(0.86, 2.285),
    new THREE.Vector2(0.80, 2.255),
    new THREE.Vector2(0.76, 2.225),
    new THREE.Vector2(0.00, 2.225)
  ];
  const top_lidGeom = new THREE.LatheGeometry(top_lidProfile, 64);
  const top_lid = new THREE.Mesh(top_lidGeom, blue_plasticMat);
  top_lid.name = "top_lid";
  lid_assembly.add(top_lid);

  const lid_centerGeom = new THREE.CylinderGeometry(0.755, 0.755, 0.018, 64);
  const lid_center = new THREE.Mesh(lid_centerGeom, blue_plasticMat);
  lid_center.name = "lid_center";
  lid_center.position.y = 2.231;
  lid_assembly.add(lid_center);

  const lid_inner_grooveGeom = new THREE.TorusGeometry(0.79, 0.018, 10, 64);
  const lid_inner_groove = new THREE.Mesh(lid_inner_grooveGeom, dark_recessMat);
  lid_inner_groove.name = "lid_inner_groove";
  lid_inner_groove.rotation.x = Math.PI / 2;
  lid_inner_groove.position.y = 2.246;
  lid_assembly.add(lid_inner_groove);

  const lid_outer_highlightGeom = new THREE.TorusGeometry(0.995, 0.025, 10, 64);
  const lid_outer_highlight = new THREE.Mesh(lid_outer_highlightGeom, blue_plasticMat);
  lid_outer_highlight.name = "lid_outer_highlight";
  lid_outer_highlight.rotation.x = Math.PI / 2;
  lid_outer_highlight.position.y = 2.273;
  lid_assembly.add(lid_outer_highlight);

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