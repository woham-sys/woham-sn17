function __sn17_user(THREE) {
  const root = new THREE.Group();

  const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.7, roughness: 0.22 });
  const brightBrassMat = new THREE.MeshStandardMaterial({ color: 0xf0d66f, metalness: 0.65, roughness: 0.18 });
  const darkBrassMat = new THREE.MeshStandardMaterial({ color: 0x8a6b1c, metalness: 0.7, roughness: 0.28 });
  const engravingMat = new THREE.MeshStandardMaterial({ color: 0x24231d, metalness: 0.0, roughness: 0.8 });

  const mainAngle = -Math.PI / 4;
  const mainQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), mainAngle);
  const crossQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), mainAngle + Math.PI / 2);

  const main_ruler_group = new THREE.Group();
  main_ruler_group.quaternion.copy(mainQuat);
  root.add(main_ruler_group);

  const cross_handle_group = new THREE.Group();
  cross_handle_group.quaternion.copy(crossQuat);
  root.add(cross_handle_group);

  const rulerW = 0.42;
  const rulerL = 2.55;
  const rulerDepth = 0.045;

  const ruler_bodyGeom = new THREE.BoxGeometry(rulerW, rulerL, rulerDepth);
  const ruler_body = new THREE.Mesh(ruler_bodyGeom, brassMat);
  main_ruler_group.add(ruler_body);

  const ruler_front_faceGeom = new THREE.BoxGeometry(rulerW * 0.92, rulerL * 0.96, 0.012);
  const ruler_front_face = new THREE.Mesh(ruler_front_faceGeom, brightBrassMat);
  ruler_front_face.position.z = rulerDepth / 2 + 0.007;
  main_ruler_group.add(ruler_front_face);

  const ruler_left_edgeGeom = new THREE.BoxGeometry(0.018, rulerL, 0.055);
  const ruler_left_edge = new THREE.Mesh(ruler_left_edgeGeom, darkBrassMat);
  ruler_left_edge.position.set(-rulerW / 2 - 0.004, 0, 0);
  main_ruler_group.add(ruler_left_edge);

  const ruler_right_edgeGeom = new THREE.BoxGeometry(0.018, rulerL, 0.055);
  const ruler_right_edge = new THREE.Mesh(ruler_right_edgeGeom, darkBrassMat);
  ruler_right_edge.position.set(rulerW / 2 + 0.004, 0, 0);
  main_ruler_group.add(ruler_right_edge);

  const ruler_top_capGeom = new THREE.BoxGeometry(rulerW, 0.035, 0.06);
  const ruler_top_cap = new THREE.Mesh(ruler_top_capGeom, darkBrassMat);
  ruler_top_cap.position.set(0, rulerL / 2, 0);
  main_ruler_group.add(ruler_top_cap);

  const ruler_bottom_capGeom = new THREE.BoxGeometry(rulerW, 0.035, 0.06);
  const ruler_bottom_cap = new THREE.Mesh(ruler_bottom_capGeom, darkBrassMat);
  ruler_bottom_cap.position.set(0, -rulerL / 2, 0);
  main_ruler_group.add(ruler_bottom_cap);

  const tickGeom = new THREE.BoxGeometry(1, 1, 1);
  const tickDummy = new THREE.Object3D();

  const left_tick_marks = new THREE.InstancedMesh(tickGeom, engravingMat, 46);
  for (let i = 0; i < 46; i++) {
    const y = -1.12 + i * (2.24 / 45);
    const len = i % 10 === 0 ? 0.12 : i % 5 === 0 ? 0.085 : 0.045;
    tickDummy.position.set(-rulerW / 2 + 0.018 + len / 2, y, rulerDepth / 2 + 0.018);
    tickDummy.rotation.set(0, 0, 0);
    tickDummy.scale.set(len, 0.006, 0.006);
    tickDummy.updateMatrix();
    left_tick_marks.setMatrixAt(i, tickDummy.matrix);
  }
  main_ruler_group.add(left_tick_marks);

  const right_tick_marks = new THREE.InstancedMesh(tickGeom, engravingMat, 46);
  for (let i = 0; i < 46; i++) {
    const y = -1.12 + i * (2.24 / 45);
    const len = i % 10 === 0 ? 0.12 : i % 5 === 0 ? 0.085 : 0.045;
    tickDummy.position.set(rulerW / 2 - 0.018 - len / 2, y, rulerDepth / 2 + 0.018);
    tickDummy.rotation.set(0, 0, 0);
    tickDummy.scale.set(len, 0.006, 0.006);
    tickDummy.updateMatrix();
    right_tick_marks.setMatrixAt(i, tickDummy.matrix);
  }
  main_ruler_group.add(right_tick_marks);

  const digitSegments = {
    "0": ["a", "b", "c", "d", "e", "f"],
    "1": ["b", "c"],
    "2": ["a", "b", "g", "e", "d"],
    "3": ["a", "b", "g", "c", "d"],
    "4": ["f", "g", "b", "c"],
    "5": ["a", "f", "g", "c", "d"],
    "6": ["a", "f", "g", "e", "c", "d"],
    "7": ["a", "b", "c"],
    "8": ["a", "b", "c", "d", "e", "f", "g"],
    "9": ["a", "b", "c", "d", "f", "g"]
  };

  const labelSpecs = [
    ["1", -0.95], ["2", -0.65], ["3", -0.35], ["4", -0.05],
    ["5", 0.25], ["6", 0.55], ["7", 0.85], ["8", 1.12]
  ];
  let labelCount = 0;
  for (const spec of labelSpecs) labelCount += digitSegments[spec[0]].length;

  const engraved_number_segments = new THREE.InstancedMesh(tickGeom, engravingMat, labelCount);
  let labelIndex = 0;
  for (const spec of labelSpecs) {
    const ch = spec[0];
    const cy = spec[1];
    const w = 0.055, h = 0.095, t = 0.008;
    for (const seg of digitSegments[ch]) {
      let sx = 0, sy = cy;
      let sw = w, sh = t;
      if (seg === "a") sy += h / 2;
      if (seg === "d") sy -= h / 2;
      if (seg === "b") {
        sx = w / 2;
        sy += h / 4;
        sw = t;
        sh = h / 2;
      }
      if (seg === "c") {
        sx = w / 2;
        sy -= h / 4;
        sw = t;
        sh = h / 2;
      }
      if (seg === "e") {
        sx = -w / 2;
        sy -= h / 4;
        sw = t;
        sh = h / 2;
      }
      if (seg === "f") {
        sx = -w / 2;
        sy += h / 4;
        sw = t;
        sh = h / 2;
      }
      if (seg === "g") {
        sx = 0;
        sy = 0;
        sw = w;
        sh = t;
      }
      tickDummy.position.set(sx, sy, rulerDepth / 2 + 0.021);
      tickDummy.rotation.set(0, 0, 0);
      tickDummy.scale.set(sw, sh, 0.006);
      tickDummy.updateMatrix();
      engraved_number_segments.setMatrixAt(labelIndex++, tickDummy.matrix);
    }
  }
  main_ruler_group.add(engraved_number_segments);

  const screw_headGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.018, 32);
  const screw_head = new THREE.Mesh(screw_headGeom, brightBrassMat);
  screw_head.rotation.x = Math.PI / 2;
  screw_head.position.set(0.08, 1.12, rulerDepth / 2 + 0.026);
  main_ruler_group.add(screw_head);

  const screw_slot_horizontalGeom = new THREE.BoxGeometry(0.075, 0.012, 0.008);
  const screw_slot_horizontal = new THREE.Mesh(screw_slot_horizontalGeom, engravingMat);
  screw_slot_horizontal.position.set(0.08, 1.12, rulerDepth / 2 + 0.038);
  main_ruler_group.add(screw_slot_horizontal);

  const screw_slot_verticalGeom = new THREE.BoxGeometry(0.012, 0.075, 0.008);
  const screw_slot_vertical = new THREE.Mesh(screw_slot_verticalGeom, engravingMat);
  screw_slot_vertical.position.set(0.08, 1.12, rulerDepth / 2 + 0.039);
  main_ruler_group.add(screw_slot_vertical);

  const center_clamp_plateGeom = new THREE.BoxGeometry(0.52, 0.34, 0.075);
  const center_clamp_plate = new THREE.Mesh(center_clamp_plateGeom, brightBrassMat);
  center_clamp_plate.position.z = 0.055;
  main_ruler_group.add(center_clamp_plate);

  const center_clamp_shadowGeom = new THREE.BoxGeometry(0.42, 0.018, 0.012);
  const center_clamp_shadow = new THREE.Mesh(center_clamp_shadowGeom, darkBrassMat);
  center_clamp_shadow.position.set(0, -0.16, 0.098);
  main_ruler_group.add(center_clamp_shadow);

  const center_logo_ringGeom = new THREE.TorusGeometry(0.035, 0.005, 8, 24);
  const center_logo_ring = new THREE.Mesh(center_logo_ringGeom, engravingMat);
  center_logo_ring.position.set(0.02, 0.02, 0.101);
  main_ruler_group.add(center_logo_ring);

  const center_logo_stemGeom = new THREE.BoxGeometry(0.008, 0.055, 0.006);
  const center_logo_stem = new THREE.Mesh(center_logo_stemGeom, engravingMat);
  center_logo_stem.position.set(0.02, 0.02, 0.103);
  main_ruler_group.add(center_logo_stem);

  const handle_shaftGeom = new THREE.CylinderGeometry(0.085, 0.085, 1.62, 32);
  const handle_shaft = new THREE.Mesh(handle_shaftGeom, brightBrassMat);
  handle_shaft.position.y = -0.05;
  cross_handle_group.add(handle_shaft);

  const handle_highlightGeom = new THREE.BoxGeometry(0.018, 1.42, 0.008);
  const handle_highlight = new THREE.Mesh(handle_highlightGeom, new THREE.MeshStandardMaterial({ color: 0xffe88a, metalness: 0.55, roughness: 0.16 }));
  handle_highlight.position.set(-0.035, -0.05, 0.084);
  cross_handle_group.add(handle_highlight);

  const handle_grooveGeom = new THREE.BoxGeometry(0.012, 1.38, 0.006);
  const handle_groove = new THREE.Mesh(handle_grooveGeom, darkBrassMat);
  handle_groove.position.set(0.045, -0.05, 0.083);
  cross_handle_group.add(handle_groove);

  const upper_collarGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.24, 32);
  const upper_collar = new THREE.Mesh(upper_collarGeom, brassMat);
  upper_collar.position.y = 0.72;
  cross_handle_group.add(upper_collar);

  const upper_collar_bandGeom = new THREE.CylinderGeometry(0.158, 0.158, 0.035, 32);
  const upper_collar_band = new THREE.Mesh(upper_collar_bandGeom, darkBrassMat);
  upper_collar_band.position.y = 0.82;
  cross_handle_group.add(upper_collar_band);

  const lower_flangeGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.025, 32);
  const lower_flange = new THREE.Mesh(lower_flangeGeom, brightBrassMat);
  lower_flange.position.y = -0.88;
  cross_handle_group.add(lower_flange);

  const lower_flange_ringGeom = new THREE.TorusGeometry(0.15, 0.012, 8, 32);
  const lower_flange_ring = new THREE.Mesh(lower_flange_ringGeom, darkBrassMat);
  lower_flange_ring.rotation.x = Math.PI / 2;
  lower_flange_ring.position.y = -0.88;
  cross_handle_group.add(lower_flange_ring);

  const lower_knobGeom = new THREE.SphereGeometry(0.105, 32, 16);
  const lower_knob = new THREE.Mesh(lower_knobGeom, brightBrassMat);
  lower_knob.scale.set(1, 0.72, 1);
  lower_knob.position.y = -1.00;
  cross_handle_group.add(lower_knob);

  const top_finialGeom = new THREE.SphereGeometry(0.105, 32, 16);
  const top_finial = new THREE.Mesh(top_finialGeom, brightBrassMat);
  top_finial.scale.set(1, 0.72, 1);
  top_finial.position.y = 0.91;
  cross_handle_group.add(top_finial);

  const top_finial_capGeom = new THREE.CylinderGeometry(0.085, 0.085, 0.035, 32);
  const top_finial_cap = new THREE.Mesh(top_finial_capGeom, darkBrassMat);
  top_finial_cap.position.y = 1.00;
  cross_handle_group.add(top_finial_cap);

  const pivot_axleGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.18, 32);
  const pivot_axle = new THREE.Mesh(pivot_axleGeom, brassMat);
  pivot_axle.rotation.x = Math.PI / 2;
  pivot_axle.position.z = 0.11;
  root.add(pivot_axle);

  const pivot_bezelGeom = new THREE.TorusGeometry(0.11, 0.012, 8, 32);
  const pivot_bezel = new THREE.Mesh(pivot_bezelGeom, darkBrassMat);
  pivot_bezel.position.z = 0.205;
  root.add(pivot_bezel);

  const pivot_center_screwGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.018, 24);
  const pivot_center_screw = new THREE.Mesh(pivot_center_screwGeom, brightBrassMat);
  pivot_center_screw.rotation.x = Math.PI / 2;
  pivot_center_screw.position.z = 0.215;
  root.add(pivot_center_screw);

  const pivot_slotGeom = new THREE.BoxGeometry(0.065, 0.01, 0.008);
  const pivot_slot = new THREE.Mesh(pivot_slotGeom, engravingMat);
  pivot_slot.position.z = 0.228;
  root.add(pivot_slot);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);
  root.position.sub(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.98 / maxDim;
  root.scale.setScalar(scale);
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
