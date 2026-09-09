function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "antique_compass";

  const case_group = new THREE.Group();
  case_group.name = "case_group";
  root.add(case_group);

  const dial_group = new THREE.Group();
  dial_group.name = "dial_group";
  root.add(dial_group);

  const bezel_group = new THREE.Group();
  bezel_group.name = "bezel_group";
  root.add(bezel_group);

  const crown_group = new THREE.Group();
  crown_group.name = "crown_group";
  root.add(crown_group);

  const bronze_caseMat = new THREE.MeshStandardMaterial({
    color: 0x9a7658,
    metalness: 0.65,
    roughness: 0.45
  });
  const polished_bronzeMat = new THREE.MeshStandardMaterial({
    color: 0xb98a55,
    metalness: 0.7,
    roughness: 0.3
  });
  const dark_bronzeMat = new THREE.MeshStandardMaterial({
    color: 0x594231,
    metalness: 0.55,
    roughness: 0.55
  });
  const black_dialMat = new THREE.MeshStandardMaterial({
    color: 0x111317,
    metalness: 0,
    roughness: 0.8
  });
  const dark_faceMat = new THREE.MeshStandardMaterial({
    color: 0x181b20,
    metalness: 0,
    roughness: 0.72
  });
  const ivory_markMat = new THREE.MeshStandardMaterial({
    color: 0xdedcc5,
    metalness: 0,
    roughness: 0.55
  });
  const pale_yellowMat = new THREE.MeshStandardMaterial({
    color: 0xcfc99a,
    metalness: 0,
    roughness: 0.6
  });
  const brass_markMat = new THREE.MeshStandardMaterial({
    color: 0xb9a66a,
    metalness: 0.25,
    roughness: 0.55
  });
  const red_markMat = new THREE.MeshStandardMaterial({
    color: 0xa8433e,
    metalness: 0,
    roughness: 0.58
  });
  const rose_darkMat = new THREE.MeshStandardMaterial({
    color: 0x343941,
    metalness: 0,
    roughness: 0.72
  });
  const glass_coverMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeff,
    transparent: true,
    opacity: 0.22,
    metalness: 0,
    roughness: 0.12,
    depthWrite: false
  });
  const glass_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.18,
    depthWrite: false
  });

  const bronze_caseProfile = [
    new THREE.Vector2(0, -0.25),
    new THREE.Vector2(0.82, -0.25),
    new THREE.Vector2(0.94, -0.22),
    new THREE.Vector2(1.02, -0.14),
    new THREE.Vector2(1.065, -0.02),
    new THREE.Vector2(1.07, 0.08),
    new THREE.Vector2(1.045, 0.16),
    new THREE.Vector2(0.99, 0.215),
    new THREE.Vector2(0, 0.215)
  ];
  const bronze_caseGeom = new THREE.LatheGeometry(bronze_caseProfile, 96);
  const bronze_case = new THREE.Mesh(bronze_caseGeom, bronze_caseMat);
  bronze_case.name = "bronze_case";
  case_group.add(bronze_case);

  const lower_case_grooveGeom = new THREE.TorusGeometry(1.035, 0.009, 8, 96);
  const lower_case_groove = new THREE.Mesh(lower_case_grooveGeom, dark_bronzeMat);
  lower_case_groove.name = "lower_case_groove";
  lower_case_groove.rotation.x = Math.PI / 2;
  lower_case_groove.position.y = -0.145;
  case_group.add(lower_case_groove);

  const upper_case_grooveGeom = new THREE.TorusGeometry(1.052, 0.008, 8, 96);
  const upper_case_groove = new THREE.Mesh(upper_case_grooveGeom, dark_bronzeMat);
  upper_case_groove.name = "upper_case_groove";
  upper_case_groove.rotation.x = Math.PI / 2;
  upper_case_groove.position.y = 0.105;
  case_group.add(upper_case_groove);

  const outer_black_bandGeom = new THREE.RingGeometry(0.81, 1.025, 128);
  const outer_black_band = new THREE.Mesh(outer_black_bandGeom, black_dialMat);
  outer_black_band.name = "outer_black_band";
  outer_black_band.rotation.x = -Math.PI / 2;
  outer_black_band.position.y = 0.224;
  bezel_group.add(outer_black_band);

  const outer_brass_rimGeom = new THREE.TorusGeometry(1.045, 0.032, 12, 128);
  const outer_brass_rim = new THREE.Mesh(outer_brass_rimGeom, polished_bronzeMat);
  outer_brass_rim.name = "outer_brass_rim";
  outer_brass_rim.rotation.x = Math.PI / 2;
  outer_brass_rim.position.y = 0.225;
  bezel_group.add(outer_brass_rim);

  const inner_brass_rimGeom = new THREE.TorusGeometry(0.805, 0.026, 12, 128);
  const inner_brass_rim = new THREE.Mesh(inner_brass_rimGeom, polished_bronzeMat);
  inner_brass_rim.name = "inner_brass_rim";
  inner_brass_rim.rotation.x = Math.PI / 2;
  inner_brass_rim.position.y = 0.239;
  bezel_group.add(inner_brass_rim);

  const dial_faceGeom = new THREE.CircleGeometry(0.79, 128);
  const dial_face = new THREE.Mesh(dial_faceGeom, dark_faceMat);
  dial_face.name = "dial_face";
  dial_face.rotation.x = -Math.PI / 2;
  dial_face.position.y = 0.232;
  dial_group.add(dial_face);

  const outer_scale_ringGeom = new THREE.RingGeometry(0.69, 0.785, 128);
  const outer_scale_ring = new THREE.Mesh(outer_scale_ringGeom, black_dialMat);
  outer_scale_ring.name = "outer_scale_ring";
  outer_scale_ring.rotation.x = -Math.PI / 2;
  outer_scale_ring.position.y = 0.237;
  dial_group.add(outer_scale_ring);

  const inner_scale_ringGeom = new THREE.RingGeometry(0.49, 0.675, 128);
  const inner_scale_ring = new THREE.Mesh(inner_scale_ringGeom, dark_faceMat);
  inner_scale_ring.name = "inner_scale_ring";
  inner_scale_ring.rotation.x = -Math.PI / 2;
  inner_scale_ring.position.y = 0.238;
  dial_group.add(inner_scale_ring);

  const dummy = new THREE.Object3D();

  const outer_tick_marksGeom = new THREE.BoxGeometry(0.011, 0.006, 0.07);
  const outer_tick_marks = new THREE.InstancedMesh(
    outer_tick_marksGeom,
    ivory_markMat,
    120
  );
  outer_tick_marks.name = "outer_tick_marks";
  for (let i = 0; i < 120; i++) {
    const angle = i / 120 * Math.PI * 2;
    const length = i % 10 === 0 ? 0.12 : (i % 5 === 0 ? 0.09 : 0.058);
    const radius = 0.985 - length / 2;
    dummy.position.set(
      Math.sin(angle) * radius,
      0.233,
      Math.cos(angle) * radius
    );
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(i % 10 === 0 ? 1.45 : 1, 1, length / 0.07);
    dummy.updateMatrix();
    outer_tick_marks.setMatrixAt(i, dummy.matrix);
  }
  outer_tick_marks.instanceMatrix.needsUpdate = true;
  dial_group.add(outer_tick_marks);

  const outer_red_accentsGeom = new THREE.BoxGeometry(0.012, 0.007, 0.075);
  const outer_red_accents = new THREE.InstancedMesh(
    outer_red_accentsGeom,
    red_markMat,
    8
  );
  outer_red_accents.name = "outer_red_accents";
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2 + Math.PI / 8;
    const radius = 0.925;
    dummy.position.set(
      Math.sin(angle) * radius,
      0.239,
      Math.cos(angle) * radius
    );
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    outer_red_accents.setMatrixAt(i, dummy.matrix);
  }
  outer_red_accents.instanceMatrix.needsUpdate = true;
  dial_group.add(outer_red_accents);

  const inner_tick_marksGeom = new THREE.BoxGeometry(0.009, 0.006, 0.044);
  const inner_tick_marks = new THREE.InstancedMesh(
    inner_tick_marksGeom,
    pale_yellowMat,
    96
  );
  inner_tick_marks.name = "inner_tick_marks";
  for (let i = 0; i < 96; i++) {
    const angle = i / 96 * Math.PI * 2;
    const length = i % 8 === 0 ? 0.075 : 0.04;
    const radius = 0.685 - length / 2;
    dummy.position.set(
      Math.sin(angle) * radius,
      0.242,
      Math.cos(angle) * radius
    );
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(i % 8 === 0 ? 1.35 : 1, 1, length / 0.044);
    dummy.updateMatrix();
    inner_tick_marks.setMatrixAt(i, dummy.matrix);
  }
  inner_tick_marks.instanceMatrix.needsUpdate = true;
  dial_group.add(inner_tick_marks);

  const inner_scale_borderGeom = new THREE.TorusGeometry(0.49, 0.006, 6, 96);
  const inner_scale_border = new THREE.Mesh(inner_scale_borderGeom, brass_markMat);
  inner_scale_border.name = "inner_scale_border";
  inner_scale_border.rotation.x = Math.PI / 2;
  inner_scale_border.position.y = 0.243;
  dial_group.add(inner_scale_border);

  const rose_light_facetsShape = new THREE.Shape();
  rose_light_facetsShape.moveTo(-0.035, 0.075);
  rose_light_facetsShape.lineTo(0, 0.57);
  rose_light_facetsShape.lineTo(0.035, 0.075);
  rose_light_facetsShape.closePath();
  const rose_light_facetsGeom = new THREE.ShapeGeometry(rose_light_facetsShape);
  rose_light_facetsGeom.rotateX(-Math.PI / 2);
  const rose_light_facets = new THREE.InstancedMesh(
    rose_light_facetsGeom,
    ivory_markMat,
    8
  );
  rose_light_facets.name = "rose_light_facets";
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    dummy.position.set(0, 0.244, 0);
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(1, 1, i % 2 === 0 ? 1 : 0.82);
    dummy.updateMatrix();
    rose_light_facets.setMatrixAt(i, dummy.matrix);
  }
  rose_light_facets.instanceMatrix.needsUpdate = true;
  dial_group.add(rose_light_facets);

  const rose_dark_facetsShape = new THREE.Shape();
  rose_dark_facetsShape.moveTo(-0.04, 0.07);
  rose_dark_facetsShape.lineTo(0, 0.46);
  rose_dark_facetsShape.lineTo(0.04, 0.07);
  rose_dark_facetsShape.closePath();
  const rose_dark_facetsGeom = new THREE.ShapeGeometry(rose_dark_facetsShape);
  rose_dark_facetsGeom.rotateX(-Math.PI / 2);
  const rose_dark_facets = new THREE.InstancedMesh(
    rose_dark_facetsGeom,
    rose_darkMat,
    8
  );
  rose_dark_facets.name = "rose_dark_facets";
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2 + Math.PI / 8;
    dummy.position.set(0, 0.245, 0);
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(1, 1, i % 2 === 0 ? 1 : 0.84);
    dummy.updateMatrix();
    rose_dark_facets.setMatrixAt(i, dummy.matrix);
  }
  rose_dark_facets.instanceMatrix.needsUpdate = true;
  dial_group.add(rose_dark_facets);

  const rose_gold_facetsShape = new THREE.Shape();
  rose_gold_facetsShape.moveTo(-0.025, 0.08);
  rose_gold_facetsShape.lineTo(0, 0.5);
  rose_gold_facetsShape.lineTo(0.025, 0.08);
  rose_gold_facetsShape.closePath();
  const rose_gold_facetsGeom = new THREE.ShapeGeometry(rose_gold_facetsShape);
  rose_gold_facetsGeom.rotateX(-Math.PI / 2);
  const rose_gold_facets = new THREE.InstancedMesh(
    rose_gold_facetsGeom,
    brass_markMat,
    4
  );
  rose_gold_facets.name = "rose_gold_facets";
  for (let i = 0; i < 4; i++) {
    const angle = i / 4 * Math.PI * 2 + Math.PI / 4;
    dummy.position.set(0, 0.246, 0);
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rose_gold_facets.setMatrixAt(i, dummy.matrix);
  }
  rose_gold_facets.instanceMatrix.needsUpdate = true;
  dial_group.add(rose_gold_facets);

  const minor_ray_linesGeom = new THREE.BoxGeometry(0.008, 0.005, 0.25);
  const minor_ray_lines = new THREE.InstancedMesh(
    minor_ray_linesGeom,
    pale_yellowMat,
    16
  );
  minor_ray_lines.name = "minor_ray_lines";
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2 + Math.PI / 16;
    const radius = 0.205;
    dummy.position.set(
      Math.sin(angle) * radius,
      0.247,
      Math.cos(angle) * radius
    );
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(1, 1, i % 2 === 0 ? 1 : 0.78);
    dummy.updateMatrix();
    minor_ray_lines.setMatrixAt(i, dummy.matrix);
  }
  minor_ray_lines.instanceMatrix.needsUpdate = true;
  dial_group.add(minor_ray_lines);

  const numeral_patterns = {
    0: ["a", "b", "c", "d", "e", "f"],
    1: ["b", "c"],
    2: ["a", "b", "g", "e", "d"],
    3: ["a", "b", "g", "c", "d"],
    4: ["f", "g", "b", "c"],
    5: ["a", "f", "g", "c", "d"],
    6: ["a", "f", "g", "e", "c", "d"],
    7: ["a", "b", "c"],
    8: ["a", "b", "c", "d", "e", "f", "g"],
    9: ["a", "b", "c", "d", "f", "g"]
  };
  const segment_layout = {
    a: [0, 0.052, 0],
    b: [0.034, 0.026, Math.PI / 2],
    c: [0.034, -0.026, Math.PI / 2],
    d: [0, -0.052, 0],
    e: [-0.034, -0.026, Math.PI / 2],
    f: [-0.034, 0.026, Math.PI / 2],
    g: [0, 0, 0]
  };
  const numeral_values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let numeral_segment_count = 0;
  for (let i = 0; i < numeral_values.length; i++) {
    const value = numeral_values[i];
    numeral_segment_count += value < 10
      ? numeral_patterns[value].length
      : numeral_patterns[1].length + numeral_patterns[0].length;
  }

  const numeral_segmentsGeom = new THREE.BoxGeometry(0.011, 0.006, 0.058);
  const numeral_segments = new THREE.InstancedMesh(
    numeral_segmentsGeom,
    ivory_markMat,
    numeral_segment_count
  );
  numeral_segments.name = "numeral_segments";

  let numeral_index = 0;
  for (let i = 0; i < numeral_values.length; i++) {
    const angle = i / numeral_values.length * Math.PI * 2;
    const value = numeral_values[i];
    const digits = value < 10 ? [value] : [1, 0];
    const spacing = 0.083;

    for (let d = 0; d < digits.length; d++) {
      const digit = digits[d];
      const digit_offset = (d - (digits.length - 1) / 2) * spacing;
      const pattern = numeral_patterns[digit];

      for (let s = 0; s < pattern.length; s++) {
        const layout = segment_layout[pattern[s]];
        const u = digit_offset + layout[0];
        const v = layout[1];
        const radius = 0.755 + v;
        const radial_x = Math.sin(angle);
        const radial_z = Math.cos(angle);
        const tangent_x = Math.cos(angle);
        const tangent_z = -Math.sin(angle);

        dummy.position.set(
          radial_x * radius + tangent_x * u,
          0.247,
          radial_z * radius + tangent_z * u
        );
        dummy.rotation.set(0, angle + layout[2], 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        numeral_segments.setMatrixAt(numeral_index, dummy.matrix);
        numeral_index++;
      }
    }
  }
  numeral_segments.instanceMatrix.needsUpdate = true;
  dial_group.add(numeral_segments);

  const north_pointerShape = new THREE.Shape();
  north_pointerShape.moveTo(-0.045, 0.025);
  north_pointerShape.lineTo(0, 0.61);
  north_pointerShape.lineTo(0.045, 0.025);
  north_pointerShape.closePath();
  const north_pointerGeom = new THREE.ShapeGeometry(north_pointerShape);
  north_pointerGeom.rotateX(-Math.PI / 2);
  const north_pointer = new THREE.Mesh(north_pointerGeom, red_markMat);
  north_pointer.name = "north_pointer";
  north_pointer.position.y = 0.252;
  north_pointer.rotation.y = -0.55;
  dial_group.add(north_pointer);

  const south_pointerShape = new THREE.Shape();
  south_pointerShape.moveTo(-0.04, 0.025);
  south_pointerShape.lineTo(0, 0.52);
  south_pointerShape.lineTo(0.04, 0.025);
  south_pointerShape.closePath();
  const south_pointerGeom = new THREE.ShapeGeometry(south_pointerShape);
  south_pointerGeom.rotateX(-Math.PI / 2);
  const south_pointer = new THREE.Mesh(south_pointerGeom, brass_markMat);
  south_pointer.name = "south_pointer";
  south_pointer.position.y = 0.251;
  south_pointer.rotation.y = Math.PI - 0.55;
  dial_group.add(south_pointer);

  const glass_coverGeom = new THREE.SphereGeometry(
    0.79,
    64,
    16,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  );
  const glass_cover = new THREE.Mesh(glass_coverGeom, glass_coverMat);
  glass_cover.name = "glass_cover";
  glass_cover.position.y = 0.255;
  glass_cover.scale.set(1, 0.12, 1);
  glass_cover.renderOrder = 2;
  dial_group.add(glass_cover);

  const glass_highlightGeom = new THREE.TorusGeometry(
    0.66,
    0.009,
    6,
    40,
    1.05
  );
  const glass_highlight = new THREE.Mesh(glass_highlightGeom, glass_highlightMat);
  glass_highlight.name = "glass_highlight";
  glass_highlight.rotation.x = Math.PI / 2;
  glass_highlight.rotation.z = 2.35;
  glass_highlight.position.y = 0.326;
  glass_highlight.renderOrder = 3;
  dial_group.add(glass_highlight);

  const center_hub_baseGeom = new THREE.CylinderGeometry(0.115, 0.12, 0.05, 48);
  const center_hub_base = new THREE.Mesh(center_hub_baseGeom, polished_bronzeMat);
  center_hub_base.name = "center_hub_base";
  center_hub_base.position.y = 0.278;
  dial_group.add(center_hub_base);

  const center_hub_capGeom = new THREE.CylinderGeometry(0.095, 0.102, 0.04, 48);
  const center_hub_cap = new THREE.Mesh(center_hub_capGeom, bronze_caseMat);
  center_hub_cap.name = "center_hub_cap";
  center_hub_cap.position.y = 0.318;
  dial_group.add(center_hub_cap);

  const center_pinGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.018, 32);
  const center_pin = new THREE.Mesh(center_pinGeom, dark_bronzeMat);
  center_pin.name = "center_pin";
  center_pin.position.y = 0.347;
  dial_group.add(center_pin);

  const crown_angle = -0.62;
  const crown_direction = new THREE.Vector3(
    Math.sin(crown_angle),
    0,
    Math.cos(crown_angle)
  ).normalize();
  const crown_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    crown_direction
  );

  const crown_stemGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.13, 24);
  const crown_stem = new THREE.Mesh(crown_stemGeom, dark_bronzeMat);
  crown_stem.name = "crown_stem";
  crown_stem.quaternion.copy(crown_quaternion);
  crown_stem.position.copy(crown_direction).multiplyScalar(1.075);
  crown_stem.position.y = 0.035;
  crown_group.add(crown_stem);

  const winding_crownGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.16, 32);
  const winding_crown = new THREE.Mesh(winding_crownGeom, bronze_caseMat);
  winding_crown.name = "winding_crown";
  winding_crown.quaternion.copy(crown_quaternion);
  winding_crown.position.copy(crown_direction).multiplyScalar(1.17);
  winding_crown.position.y = 0.035;
  crown_group.add(winding_crown);

  const crown_ridgesGeom = new THREE.TorusGeometry(0.106, 0.006, 6, 32);
  crown_ridgesGeom.rotateX(Math.PI / 2);
  const crown_ridges = new THREE.InstancedMesh(
    crown_ridgesGeom,
    dark_bronzeMat,
    5
  );
  crown_ridges.name = "crown_ridges";
  for (let i = 0; i < 5; i++) {
    const distance = 1.115 + i * 0.027;
    dummy.position.copy(crown_direction).multiplyScalar(distance);
    dummy.position.y = 0.035;
    dummy.quaternion.copy(crown_quaternion);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    crown_ridges.setMatrixAt(i, dummy.matrix);
  }
  crown_ridges.instanceMatrix.needsUpdate = true;
  crown_group.add(crown_ridges);

  const side_lug_angle = 2.72;
  const side_lug_direction = new THREE.Vector3(
    Math.sin(side_lug_angle),
    0,
    Math.cos(side_lug_angle)
  ).normalize();
  const side_lug_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    side_lug_direction
  );
  const side_lugGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.13, 24);
  const side_lug = new THREE.Mesh(side_lugGeom, dark_bronzeMat);
  side_lug.name = "side_lug";
  side_lug.quaternion.copy(side_lug_quaternion);
  side_lug.position.copy(side_lug_direction).multiplyScalar(1.075);
  side_lug.position.y = -0.035;
  case_group.add(side_lug);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    object.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 0.98 / maxDim;
      object.scale.setScalar(scale);
    }
  }

  fitToUnitCube(root);
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
