function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "tufted_ottoman";

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const body_assembly = new THREE.Group();
  body_assembly.name = "body_assembly";
  root.add(body_assembly);

  const top_assembly = new THREE.Group();
  top_assembly.name = "top_assembly";
  root.add(top_assembly);

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0xb8b1a5,
    metalness: 0.0,
    roughness: 0.95
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x8f887d,
    metalness: 0.0,
    roughness: 0.95
  });
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x302b27,
    metalness: 0.0,
    roughness: 0.9
  });
  const footMat = new THREE.MeshStandardMaterial({
    color: 0x241c18,
    metalness: 0.0,
    roughness: 0.75
  });

  function createPleatedTorusGeometry(radius, radialAmplitude, verticalAmplitude, lobeCount, tubeRadius) {
    const radialSegments = 72;
    const tubeSegments = 16;
    const positions = [];
    const indices = [];

    for (let i = 0; i <= radialSegments; i++) {
      const u = i / radialSegments * Math.PI * 2;
      const wave = Math.cos(lobeCount * u);
      const centerRadius = radius + radialAmplitude * wave;
      const centerY = verticalAmplitude * wave;

      for (let j = 0; j <= tubeSegments; j++) {
        const v = j / tubeSegments * Math.PI * 2;
        const r = centerRadius + tubeRadius * Math.cos(v);
        positions.push(
          Math.cos(u) * r,
          centerY + tubeRadius * Math.sin(v),
          Math.sin(u) * r
        );
      }
    }

    const row = tubeSegments + 1;
    for (let i = 0; i < radialSegments; i++) {
      for (let j = 0; j < tubeSegments; j++) {
        const a = i * row + j;
        const b = (i + 1) * row + j;
        const c = (i + 1) * row + j + 1;
        const d = i * row + j + 1;
        indices.push(a, b, d, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createTuftedCylinderGeometry(radius, height, lobeCount, aroundSegments, heightSegments) {
    const positions = [];
    const indices = [];
    const halfHeight = height / 2;

    for (let iy = 0; iy <= heightSegments; iy++) {
      const t = iy / heightSegments;
      const y = -halfHeight + t * height;
      const verticalEnvelope = Math.sin(Math.PI * t);

      for (let ix = 0; ix <= aroundSegments; ix++) {
        const u = ix / aroundSegments * Math.PI * 2;
        const tuftWave = Math.cos(lobeCount * u);
        const r = radius + 0.045 * verticalEnvelope * (0.55 + 0.45 * tuftWave);
        positions.push(Math.cos(u) * r, y, Math.sin(u) * r);
      }
    }

    const row = aroundSegments + 1;
    for (let iy = 0; iy < heightSegments; iy++) {
      for (let ix = 0; ix < aroundSegments; ix++) {
        const a = iy * row + ix;
        const b = a + 1;
        const d = (iy + 1) * row + ix;
        const c = d + 1;
        indices.push(a, d, b, b, d, c);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const feetGeom = new THREE.CylinderGeometry(0.14, 0.16, 0.12, 24);
  const feet = new THREE.InstancedMesh(feetGeom, footMat, 4);
  feet.name = "feet";
  const instance_dummy = new THREE.Object3D();
  const foot_positions = [
    [-0.55, -0.72, 0.42],
    [0.55, -0.72, 0.42],
    [-0.55, -0.72, -0.42],
    [0.55, -0.72, -0.42]
  ];
  for (let i = 0; i < foot_positions.length; i++) {
    instance_dummy.position.set(foot_positions[i][0], foot_positions[i][1], foot_positions[i][2]);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    feet.setMatrixAt(i, instance_dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  base_assembly.add(feet);

  const bottom_cushion_coreGeom = new THREE.CylinderGeometry(0.86, 0.88, 0.34, 64);
  const bottom_cushion_core = new THREE.Mesh(bottom_cushion_coreGeom, fabricMat);
  bottom_cushion_core.name = "bottom_cushion_core";
  bottom_cushion_core.position.y = -0.51;
  base_assembly.add(bottom_cushion_core);

  const bottom_pleated_bolsterGeom = createPleatedTorusGeometry(0.82, 0.055, 0.045, 12, 0.18);
  const bottom_pleated_bolster = new THREE.Mesh(bottom_pleated_bolsterGeom, fabricMat);
  bottom_pleated_bolster.name = "bottom_pleated_bolster";
  bottom_pleated_bolster.position.y = -0.51;
  base_assembly.add(bottom_pleated_bolster);

  const bottom_vertical_seamsGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.29, 8);
  const bottom_vertical_seams = new THREE.InstancedMesh(bottom_vertical_seamsGeom, seamMat, 12);
  bottom_vertical_seams.name = "bottom_vertical_seams";
  for (let i = 0; i < 12; i++) {
    const angle = (i + 0.5) / 12 * Math.PI * 2;
    instance_dummy.position.set(Math.cos(angle) * 0.995, -0.51, Math.sin(angle) * 0.995);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    bottom_vertical_seams.setMatrixAt(i, instance_dummy.matrix);
  }
  bottom_vertical_seams.instanceMatrix.needsUpdate = true;
  base_assembly.add(bottom_vertical_seams);

  const bottom_horizontal_seamGeom = new THREE.TorusGeometry(0.91, 0.012, 8, 64);
  const bottom_horizontal_seam = new THREE.Mesh(bottom_horizontal_seamGeom, seamMat);
  bottom_horizontal_seam.name = "bottom_horizontal_seam";
  bottom_horizontal_seam.rotation.x = Math.PI / 2;
  bottom_horizontal_seam.position.y = -0.32;
  base_assembly.add(bottom_horizontal_seam);

  const body_tufted_coreGeom = createTuftedCylinderGeometry(0.88, 0.84, 10, 80, 12);
  const body_tufted_core = new THREE.Mesh(body_tufted_coreGeom, fabricMat);
  body_tufted_core.name = "body_tufted_core";
  body_tufted_core.position.y = -0.02;
  body_assembly.add(body_tufted_core);

  const body_padding_panelsGeom = new THREE.SphereGeometry(1, 24, 16);
  const body_padding_panels = new THREE.InstancedMesh(body_padding_panelsGeom, fabricMat, 20);
  body_padding_panels.name = "body_padding_panels";
  let panel_index = 0;
  for (let row = 0; row < 2; row++) {
    const y = row === 0 ? 0.19 : -0.19;
    const offset = row === 0 ? 0 : Math.PI / 10;
    for (let i = 0; i < 10; i++) {
      const angle = i / 10 * Math.PI * 2 + offset;
      instance_dummy.position.set(Math.cos(angle) * 0.89, y, Math.sin(angle) * 0.89);
      instance_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
      instance_dummy.scale.set(0.29, 0.25, 0.105);
      instance_dummy.updateMatrix();
      body_padding_panels.setMatrixAt(panel_index++, instance_dummy.matrix);
    }
  }
  body_padding_panels.instanceMatrix.needsUpdate = true;
  body_assembly.add(body_padding_panels);

  const body_radial_seamsGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.22, 8);
  const body_radial_seams = new THREE.InstancedMesh(body_radial_seamsGeom, seamMat, 20);
  body_radial_seams.name = "body_radial_seams";
  let radial_seam_index = 0;
  for (let row = 0; row < 2; row++) {
    const y = row === 0 ? 0.19 : -0.19;
    const offset = row === 0 ? Math.PI / 10 : 0;
    for (let i = 0; i < 10; i++) {
      const angle = i / 10 * Math.PI * 2 + offset;
      instance_dummy.position.set(Math.cos(angle) * 0.995, y, Math.sin(angle) * 0.995);
      instance_dummy.rotation.set(0, 0, 0);
      instance_dummy.scale.set(1, 1, 1);
      instance_dummy.updateMatrix();
      body_radial_seams.setMatrixAt(radial_seam_index++, instance_dummy.matrix);
    }
  }
  body_radial_seams.instanceMatrix.needsUpdate = true;
  body_assembly.add(body_radial_seams);

  const diamond_seam_segments = [];
  const diamond_centers_y = [0.30, 0.0, -0.30];
  const diamond_half_span = Math.PI / 10;
  for (let row = 0; row < diamond_centers_y.length; row++) {
    const centerY = diamond_centers_y[row];
    const offset = row % 2 === 0 ? 0 : Math.PI / 10;
    for (let i = 0; i < 10; i++) {
      const centerAngle = i / 10 * Math.PI * 2 + offset;
      diamond_seam_segments.push(
        [centerAngle, centerY, centerAngle - diamond_half_span, centerY - 0.18],
        [centerAngle, centerY, centerAngle + diamond_half_span, centerY - 0.18],
        [centerAngle, centerY, centerAngle - diamond_half_span, centerY + 0.18],
        [centerAngle, centerY, centerAngle + diamond_half_span, centerY + 0.18]
      );
    }
  }

  const body_diamond_seamsGeom = new THREE.CylinderGeometry(0.008, 0.008, 1, 8);
  const body_diamond_seams = new THREE.InstancedMesh(
    body_diamond_seamsGeom,
    seamMat,
    diamond_seam_segments.length
  );
  body_diamond_seams.name = "body_diamond_seams";
  const up_axis = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < diamond_seam_segments.length; i++) {
    const segment = diamond_seam_segments[i];
    const start = new THREE.Vector3(
      Math.cos(segment[0]) * 1.006,
      segment[1],
      Math.sin(segment[0]) * 1.006
    );
    const end = new THREE.Vector3(
      Math.cos(segment[2]) * 1.006,
      segment[3],
      Math.sin(segment[2]) * 1.006
    );
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up_axis, direction.normalize());

    instance_dummy.position.copy(midpoint);
    instance_dummy.quaternion.copy(quaternion);
    instance_dummy.scale.set(1, length, 1);
    instance_dummy.updateMatrix();
    body_diamond_seams.setMatrixAt(i, instance_dummy.matrix);
  }
  body_diamond_seams.instanceMatrix.needsUpdate = true;
  body_assembly.add(body_diamond_seams);

  const body_tuft_buttonsGeom = new THREE.SphereGeometry(0.047, 16, 10);
  const body_tuft_buttons = new THREE.InstancedMesh(body_tuft_buttonsGeom, buttonMat, 30);
  body_tuft_buttons.name = "body_tuft_buttons";
  let button_index = 0;
  for (let row = 0; row < diamond_centers_y.length; row++) {
    const y = diamond_centers_y[row];
    const offset = row % 2 === 0 ? 0 : Math.PI / 10;
    for (let i = 0; i < 10; i++) {
      const angle = i / 10 * Math.PI * 2 + offset;
      instance_dummy.position.set(Math.cos(angle) * 1.018, y, Math.sin(angle) * 1.018);
      instance_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
      instance_dummy.scale.set(0.82, 1, 0.82);
      instance_dummy.updateMatrix();
      body_tuft_buttons.setMatrixAt(button_index++, instance_dummy.matrix);
    }
  }
  body_tuft_buttons.instanceMatrix.needsUpdate = true;
  body_assembly.add(body_tuft_buttons);

  const upper_horizontal_seamGeom = new THREE.TorusGeometry(0.91, 0.013, 8, 64);
  const upper_horizontal_seam = new THREE.Mesh(upper_horizontal_seamGeom, seamMat);
  upper_horizontal_seam.name = "upper_horizontal_seam";
  upper_horizontal_seam.rotation.x = Math.PI / 2;
  upper_horizontal_seam.position.y = 0.38;
  body_assembly.add(upper_horizontal_seam);

  const lower_horizontal_seamGeom = new THREE.TorusGeometry(0.91, 0.013, 8, 64);
  const lower_horizontal_seam = new THREE.Mesh(lower_horizontal_seamGeom, seamMat);
  lower_horizontal_seam.name = "lower_horizontal_seam";
  lower_horizontal_seam.rotation.x = Math.PI / 2;
  lower_horizontal_seam.position.y = -0.36;
  body_assembly.add(lower_horizontal_seam);

  const top_cushion_coreGeom = new THREE.CylinderGeometry(0.88, 0.86, 0.25, 64);
  const top_cushion_core = new THREE.Mesh(top_cushion_coreGeom, fabricMat);
  top_cushion_core.name = "top_cushion_core";
  top_cushion_core.position.y = 0.51;
  top_assembly.add(top_cushion_core);

  const top_pleated_bolsterGeom = createPleatedTorusGeometry(0.82, 0.06, 0.055, 12, 0.20);
  const top_pleated_bolster = new THREE.Mesh(top_pleated_bolsterGeom, fabricMat);
  top_pleated_bolster.name = "top_pleated_bolster";
  top_pleated_bolster.position.y = 0.58;
  top_assembly.add(top_pleated_bolster);

  const top_center_padGeom = new THREE.SphereGeometry(1, 32, 16);
  const top_center_pad = new THREE.Mesh(top_center_padGeom, fabricMat);
  top_center_pad.name = "top_center_pad";
  top_center_pad.position.y = 0.69;
  top_center_pad.scale.set(0.54, 0.13, 0.54);
  top_assembly.add(top_center_pad);

  const top_radial_seamsGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.42, 8);
  const top_radial_seams = new THREE.InstancedMesh(top_radial_seamsGeom, seamMat, 12);
  top_radial_seams.name = "top_radial_seams";
  for (let i = 0; i < 12; i++) {
    const angle = (i + 0.5) / 12 * Math.PI * 2;
    const direction = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up_axis, direction);
    instance_dummy.position.set(Math.cos(angle) * 0.62, 0.805, Math.sin(angle) * 0.62);
    instance_dummy.quaternion.copy(quaternion);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    top_radial_seams.setMatrixAt(i, instance_dummy.matrix);
  }
  top_radial_seams.instanceMatrix.needsUpdate = true;
  top_assembly.add(top_radial_seams);

  const top_outer_seamsGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.27, 8);
  const top_outer_seams = new THREE.InstancedMesh(top_outer_seamsGeom, seamMat, 12);
  top_outer_seams.name = "top_outer_seams";
  for (let i = 0; i < 12; i++) {
    const angle = (i + 0.5) / 12 * Math.PI * 2;
    instance_dummy.position.set(Math.cos(angle) * 0.995, 0.58, Math.sin(angle) * 0.995);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    top_outer_seams.setMatrixAt(i, instance_dummy.matrix);
  }
  top_outer_seams.instanceMatrix.needsUpdate = true;
  top_assembly.add(top_outer_seams);

  const top_tuft_buttonsGeom = new THREE.SphereGeometry(0.038, 16, 10);
  const top_tuft_buttons = new THREE.InstancedMesh(top_tuft_buttonsGeom, buttonMat, 10);
  top_tuft_buttons.name = "top_tuft_buttons";
  for (let i = 0; i < 10; i++) {
    const angle = i / 10 * Math.PI * 2;
    instance_dummy.position.set(Math.cos(angle) * 0.43, 0.817, Math.sin(angle) * 0.43);
    instance_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    instance_dummy.scale.set(0.82, 0.45, 0.82);
    instance_dummy.updateMatrix();
    top_tuft_buttons.setMatrixAt(i, instance_dummy.matrix);
  }
  top_tuft_buttons.instanceMatrix.needsUpdate = true;
  top_assembly.add(top_tuft_buttons);

  const center_tuft_buttonGeom = new THREE.SphereGeometry(0.045, 16, 10);
  const center_tuft_button = new THREE.Mesh(center_tuft_buttonGeom, buttonMat);
  center_tuft_button.name = "center_tuft_button";
  center_tuft_button.position.y = 0.824;
  center_tuft_button.scale.set(1, 0.45, 1);
  top_assembly.add(center_tuft_button);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    object.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) object.scale.setScalar(0.98 / maxDim);
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
