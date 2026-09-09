function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "silver_blue_wristwatch";

  const brushed_silver_mat = new THREE.MeshStandardMaterial({ color: "#c8c8c8", metalness: true, roughness: 0.35 });
  const polished_silver_mat = new THREE.MeshStandardMaterial({ color: "#e8e8e8", metalness: true, roughness: 0.18 });
  const dark_metal_mat = new THREE.MeshStandardMaterial({ color: "#2f3338", metalness: true, roughness: 0.45 });
  const black_glass_mat = new THREE.MeshPhysicalMaterial({ color: "#0b1118", metalness: false, roughness: 0.12, transparent: true, opacity: 0.72 });
  const blue_dial_mat = new THREE.MeshStandardMaterial({ color: "#0078d8", metalness: false, roughness: 0.18 });
  const blue_highlight_mat = new THREE.MeshStandardMaterial({ color: "#36a8ff", metalness: false, roughness: 0.22 });
  const white_mark_mat = new THREE.MeshStandardMaterial({ color: "#f2f2ee", metalness: false, roughness: 0.25 });
  const shadow_mat = new THREE.MeshStandardMaterial({ color: "#111111", metalness: false, roughness: 0.55 });

  function roundedRectShape(w, h, r) {
    const x = -w / 2;
    const y = -h / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    return shape;
  }

  function roundedExtrudeGeometry(w, h, d, r, bevel) {
    const geom = new THREE.ExtrudeGeometry(roundedRectShape(w, h, r), {
      depth: d,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2
    });
    geom.translate(0, 0, -d / 2);
    return geom;
  }

  const bracelet_group = new THREE.Group();
  bracelet_group.name = "bracelet_group";
  root.add(bracelet_group);

  const bracelet_center_links_geom = roundedExtrudeGeometry(0.58, 0.25, 0.13, 0.045, 0.012);
  const bracelet_center_links = new THREE.InstancedMesh(bracelet_center_links_geom, brushed_silver_mat, 12);
  bracelet_center_links.name = "bracelet_center_links";

  const bracelet_side_links_geom = roundedExtrudeGeometry(0.22, 0.25, 0.13, 0.04, 0.012);
  const bracelet_side_links = new THREE.InstancedMesh(bracelet_side_links_geom, brushed_silver_mat, 24);
  bracelet_side_links.name = "bracelet_side_links";

  const bracelet_pin_geom = new THREE.CylinderGeometry(0.025, 0.025, 0.92, 16);
  const bracelet_pins = new THREE.Mesh(bracelet_pin_geom, dark_metal_mat);
  bracelet_pins.name = "bracelet_pins";
  bracelet_pins.rotation.z = Math.PI / 2;
  bracelet_pins.position.set(0, 0, -0.035);
  bracelet_group.add(bracelet_pins);

  const dummy = new THREE.Object3D();
  let centerIndex = 0;
  let sideIndex = 0;
  for (const direction of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      const y = direction * (0.96 + i * 0.285);
      const z = -0.035 - i * 0.018;
      const rotX = direction > 0 ? -0.12 : 0.12;

      dummy.position.set(0, y, z);
      dummy.rotation.set(rotX, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      bracelet_center_links.setMatrixAt(centerIndex++, dummy.matrix);

      for (const side of [-1, 1]) {
        dummy.position.set(side * 0.43, y, z);
        dummy.rotation.set(rotX, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        bracelet_side_links.setMatrixAt(sideIndex++, dummy.matrix);
      }
    }
  }
  bracelet_center_links.instanceMatrix.needsUpdate = true;
  bracelet_side_links.instanceMatrix.needsUpdate = true;
  bracelet_group.add(bracelet_center_links, bracelet_side_links);

  const case_group = new THREE.Group();
  case_group.name = "case_group";
  root.add(case_group);

  const case_body_shape = new THREE.Shape();
  case_body_shape.moveTo(-0.48, 0.88);
  case_body_shape.bezierCurveTo(-0.68, 0.88, -0.82, 0.68, -0.86, 0.38);
  case_body_shape.bezierCurveTo(-0.91, 0.05, -0.90, -0.32, -0.82, -0.62);
  case_body_shape.bezierCurveTo(-0.76, -0.84, -0.62, -0.96, -0.45, -0.98);
  case_body_shape.lineTo(0.45, -0.98);
  case_body_shape.bezierCurveTo(0.62, -0.96, 0.76, -0.84, 0.82, -0.62);
  case_body_shape.bezierCurveTo(0.90, -0.32, 0.91, 0.05, 0.86, 0.38);
  case_body_shape.bezierCurveTo(0.82, 0.68, 0.68, 0.88, 0.48, 0.88);
  case_body_shape.lineTo(-0.48, 0.88);

  const case_body_geom = new THREE.ExtrudeGeometry(case_body_shape, {
    depth: 0.18,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3
  });
  case_body_geom.translate(0, 0, -0.09);
  const case_body = new THREE.Mesh(case_body_geom, brushed_silver_mat);
  case_body.name = "case_body";
  case_body.position.z = -0.02;
  case_group.add(case_body);

  const right_black_side_panel_geom = new THREE.SphereGeometry(0.36, 32, 16);
  const right_black_side_panel = new THREE.Mesh(right_black_side_panel_geom, black_glass_mat);
  right_black_side_panel.name = "right_black_side_panel";
  right_black_side_panel.scale.set(0.34, 1.05, 0.22);
  right_black_side_panel.position.set(0.76, 0, 0.015);
  case_group.add(right_black_side_panel);

  const outer_bezel_geom = new THREE.TorusGeometry(0.735, 0.075, 20, 96);
  const outer_bezel = new THREE.Mesh(outer_bezel_geom, polished_silver_mat);
  outer_bezel.name = "outer_bezel";
  outer_bezel.position.z = 0.105;
  case_group.add(outer_bezel);

  const inner_bezel_shadow_geom = new THREE.TorusGeometry(0.655, 0.018, 12, 96);
  const inner_bezel_shadow = new THREE.Mesh(inner_bezel_shadow_geom, shadow_mat);
  inner_bezel_shadow.name = "inner_bezel_shadow";
  inner_bezel_shadow.position.z = 0.125;
  case_group.add(inner_bezel_shadow);

  const dial_group = new THREE.Group();
  dial_group.name = "dial_group";
  root.add(dial_group);

  const dial_face_geom = new THREE.CircleGeometry(0.65, 96);
  const dial_face = new THREE.Mesh(dial_face_geom, blue_dial_mat);
  dial_face.name = "dial_face";
  dial_face.position.z = 0.105;
  dial_group.add(dial_face);

  const dial_inner_shadow_geom = new THREE.TorusGeometry(0.625, 0.012, 10, 96);
  const dial_inner_shadow = new THREE.Mesh(dial_inner_shadow_geom, dark_metal_mat);
  dial_inner_shadow.name = "dial_inner_shadow";
  dial_inner_shadow.position.z = 0.12;
  dial_group.add(dial_inner_shadow);

  const minute_track_ring_geom = new THREE.TorusGeometry(0.585, 0.006, 8, 96);
  const minute_track_ring = new THREE.Mesh(minute_track_ring_geom, white_mark_mat);
  minute_track_ring.name = "minute_track_ring";
  minute_track_ring.position.z = 0.135;
  dial_group.add(minute_track_ring);

  const minute_markers_geom = new THREE.BoxGeometry(0.012, 0.045, 0.012);
  const minute_markers = new THREE.InstancedMesh(minute_markers_geom, white_mark_mat, 60);
  minute_markers.name = "minute_markers";
  for (let i = 0; i < 60; i++) {
    const angle = i / 60 * Math.PI * 2;
    const major = i % 5 === 0;
    const radius = major ? 0.555 : 0.57;
    dummy.position.set(Math.sin(angle) * radius, Math.cos(angle) * radius, 0.145);
    dummy.rotation.set(0, 0, -angle);
    dummy.scale.set(major ? 1.45 : 0.75, major ? 1.55 : 0.85, 1);
    dummy.updateMatrix();
    minute_markers.setMatrixAt(i, dummy.matrix);
  }
  minute_markers.instanceMatrix.needsUpdate = true;
  dial_group.add(minute_markers);

  const roman_stroke_geom = new THREE.BoxGeometry(0.018, 0.18, 0.018);
  const roman_serif_geom = new THREE.BoxGeometry(0.055, 0.014, 0.018);
  const roman_numerals = new THREE.Group();
  roman_numerals.name = "roman_numerals";
  dial_group.add(roman_numerals);

  function addRomanStroke(parent, x, y, rotation, lengthScale) {
    const stroke = new THREE.Mesh(roman_stroke_geom, white_mark_mat);
    stroke.position.set(x, y, 0);
    stroke.rotation.z = rotation;
    stroke.scale.set(1, lengthScale, 1);
    parent.add(stroke);
  }

  function addRomanSerif(parent, x, y) {
    const serif = new THREE.Mesh(roman_serif_geom, white_mark_mat);
    serif.position.set(x, y, 0);
    parent.add(serif);
  }

  function addRomanCharacter(parent, character, x) {
    if (character === "I") {
      addRomanStroke(parent, x, 0, 0, 1);
      addRomanSerif(parent, x, 0.085);
      addRomanSerif(parent, x, -0.085);
    } else if (character === "V") {
      addRomanStroke(parent, x - 0.025, 0, 0.34, 1);
      addRomanStroke(parent, x + 0.025, 0, -0.34, 1);
    } else if (character === "X") {
      addRomanStroke(parent, x, 0, 0.38, 1.05);
      addRomanStroke(parent, x, 0, -0.38, 1.05);
    }
  }

  function addRomanNumeral(text, hour) {
    const numeral = new THREE.Group();
    const spacing = 0.068;
    const start = -(text.length - 1) * spacing / 2;
    for (let i = 0; i < text.length; i++) {
      addRomanCharacter(numeral, text[i], start + i * spacing);
    }
    const angle = hour / 12 * Math.PI * 2;
    numeral.position.set(Math.sin(angle) * 0.465, Math.cos(angle) * 0.465, 0.155);
    numeral.rotation.z = -angle;
    numeral.scale.setScalar(hour === 0 || hour === 6 ? 0.92 : 1);
    roman_numerals.add(numeral);
  }

  const romanTexts = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
  for (let i = 0; i < romanTexts.length; i++) addRomanNumeral(romanTexts[i], i);

  function handGeometry(length, width, tailLength) {
    const shape = new THREE.Shape();
    shape.moveTo(-width * 0.55, -tailLength);
    shape.lineTo(width * 0.55, -tailLength);
    shape.lineTo(width * 0.38, length * 0.82);
    shape.lineTo(0, length);
    shape.lineTo(-width * 0.38, length * 0.82);
    shape.lineTo(-width * 0.55, -tailLength);
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.018,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.004,
      bevelSegments: 1
    });
    geom.translate(0, 0, -0.009);
    return geom;
  }

  const hour_hand_geom = handGeometry(0.36, 0.055, 0.055);
  const hour_hand = new THREE.Mesh(hour_hand_geom, polished_silver_mat);
  hour_hand.name = "hour_hand";
  hour_hand.position.z = 0.185;
  hour_hand.rotation.z = Math.PI / 3;
  dial_group.add(hour_hand);

  const minute_hand_geom = handGeometry(0.49, 0.043, 0.06);
  const minute_hand = new THREE.Mesh(minute_hand_geom, polished_silver_mat);
  minute_hand.name = "minute_hand";
  minute_hand.position.z = 0.19;
  minute_hand.rotation.z = -Math.PI / 3;
  dial_group.add(minute_hand);

  const second_hand_geom = new THREE.BoxGeometry(0.012, 0.58, 0.012);
  const second_hand = new THREE.Mesh(second_hand_geom, polished_silver_mat);
  second_hand.name = "second_hand";
  second_hand.position.set(0, 0.08, 0.205);
  second_hand.rotation.z = 2.35;
  dial_group.add(second_hand);

  const center_hub_outer_geom = new THREE.CylinderGeometry(0.065, 0.065, 0.035, 32);
  const center_hub_outer = new THREE.Mesh(center_hub_outer_geom, polished_silver_mat);
  center_hub_outer.name = "center_hub_outer";
  center_hub_outer.rotation.x = Math.PI / 2;
  center_hub_outer.position.z = 0.215;
  dial_group.add(center_hub_outer);

  const center_hub_inner_geom = new THREE.CylinderGeometry(0.026, 0.026, 0.04, 24);
  const center_hub_inner = new THREE.Mesh(center_hub_inner_geom, dark_metal_mat);
  center_hub_inner.name = "center_hub_inner";
  center_hub_inner.rotation.x = Math.PI / 2;
  center_hub_inner.position.z = 0.238;
  dial_group.add(center_hub_inner);

  const crown_group = new THREE.Group();
  crown_group.name = "crown_group";
  root.add(crown_group);

  const crown_stem_geom = new THREE.CylinderGeometry(0.045, 0.045, 0.18, 20);
  const crown_stem = new THREE.Mesh(crown_stem_geom, dark_metal_mat);
  crown_stem.name = "crown_stem";
  crown_stem.rotation.z = Math.PI / 2;
  crown_stem.position.set(0.91, 0, 0.015);
  crown_group.add(crown_stem);

  const crown_core_geom = new THREE.CylinderGeometry(0.105, 0.105, 0.18, 32);
  const crown_core = new THREE.Mesh(crown_core_geom, brushed_silver_mat);
  crown_core.name = "crown_core";
  crown_core.rotation.z = Math.PI / 2;
  crown_core.position.set(1.02, 0, 0.015);
  crown_group.add(crown_core);

  const crown_ridges_geom = new THREE.BoxGeometry(0.18, 0.014, 0.026);
  const crown_ridges = new THREE.InstancedMesh(crown_ridges_geom, polished_silver_mat, 18);
  crown_ridges.name = "crown_ridges";
  for (let i = 0; i < 18; i++) {
    const angle = i / 18 * Math.PI * 2;
    dummy.position.set(1.02, Math.cos(angle) * 0.108, 0.015 + Math.sin(angle) * 0.108);
    dummy.rotation.set(angle, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    crown_ridges.setMatrixAt(i, dummy.matrix);
  }
  crown_ridges.instanceMatrix.needsUpdate = true;
  crown_group.add(crown_ridges);

  const crown_end_cap_geom = new THREE.CylinderGeometry(0.085, 0.085, 0.025, 32);
  const crown_end_cap = new THREE.Mesh(crown_end_cap_geom, polished_silver_mat);
  crown_end_cap.name = "crown_end_cap";
  crown_end_cap.rotation.z = Math.PI / 2;
  crown_end_cap.position.set(1.12, 0, 0.015);
  crown_group.add(crown_end_cap);

  const top_lug_seam_geom = new THREE.BoxGeometry(0.72, 0.012, 0.018);
  const top_lug_seam = new THREE.Mesh(top_lug_seam_geom, shadow_mat);
  top_lug_seam.name = "top_lug_seam";
  top_lug_seam.position.set(0, 0.86, 0.105);
  case_group.add(top_lug_seam);

  const bottom_lug_seam = new THREE.Mesh(top_lug_seam_geom, shadow_mat);
  bottom_lug_seam.name = "bottom_lug_seam";
  bottom_lug_seam.position.set(0, -0.86, 0.105);
  case_group.add(bottom_lug_seam);

  const left_case_highlight_geom = new THREE.BoxGeometry(0.035, 0.95, 0.025);
  const left_case_highlight = new THREE.Mesh(left_case_highlight_geom, polished_silver_mat);
  left_case_highlight.name = "left_case_highlight";
  left_case_highlight.position.set(-0.79, 0, 0.095);
  left_case_highlight.rotation.z = -0.08;
  case_group.add(left_case_highlight);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  box.getSize(size);
  const ctr = new THREE.Vector3();
  box.getCenter(ctr);
  root.position.sub(ctr);
  const m = Math.max(size.x, size.y, size.z);
  if (m > 0) root.scale.setScalar(0.98 / m);
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
