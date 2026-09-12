// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x5b168f,
    metalness: 0.0,
    roughness: 0.3,
  });
  const front_faceMat = new THREE.MeshStandardMaterial({
    color: 0x69249e,
    metalness: 0.0,
    roughness: 0.3,
  });
  const white_printMat = new THREE.MeshStandardMaterial({
    color: 0xf7f7f2,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const guideMat = new THREE.MeshStandardMaterial({
    color: 0xd8cce8,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
  });
  const highlightMat = new THREE.MeshStandardMaterial({
    color: 0xbca8d8,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide,
  });

  const bodyGeom = new THREE.CylinderGeometry(1, 1, 0.12, 96);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.rotation.x = Math.PI / 2;
  root.add(body);

  const front_faceGeom = new THREE.CylinderGeometry(0.985, 0.985, 0.012, 96);
  const front_face = new THREE.Mesh(front_faceGeom, front_faceMat);
  front_face.rotation.x = Math.PI / 2;
  front_face.position.z = 0.061;
  root.add(front_face);

  const outer_rimGeom = new THREE.TorusGeometry(0.982, 0.012, 10, 128);
  const outer_rim = new THREE.Mesh(outer_rimGeom, bodyMat);
  outer_rim.position.z = 0.069;
  root.add(outer_rim);

  const outer_guide_ringGeom = new THREE.RingGeometry(0.925, 0.934, 128);
  const outer_guide_ring = new THREE.Mesh(outer_guide_ringGeom, guideMat);
  outer_guide_ring.position.z = 0.070;
  root.add(outer_guide_ring);

  const outer_white_ringGeom = new THREE.RingGeometry(0.835, 0.858, 128);
  const outer_white_ring = new THREE.Mesh(outer_white_ringGeom, white_printMat);
  outer_white_ring.position.z = 0.071;
  root.add(outer_white_ring);

  const outer_band_highlightGeom = new THREE.RingGeometry(
    0.838, 0.855, 64, 1, 0.35, 1.05
  );
  const outer_band_highlight = new THREE.Mesh(outer_band_highlightGeom, highlightMat);
  outer_band_highlight.position.z = 0.072;
  root.add(outer_band_highlight);

  const second_white_ringGeom = new THREE.RingGeometry(0.665, 0.725, 128);
  const second_white_ring = new THREE.Mesh(second_white_ringGeom, white_printMat);
  second_white_ring.position.z = 0.071;
  root.add(second_white_ring);

  const second_band_highlightGeom = new THREE.RingGeometry(
    0.672, 0.718, 48, 1, 2.25, 0.82
  );
  const second_band_highlight = new THREE.Mesh(second_band_highlightGeom, highlightMat);
  second_band_highlight.position.z = 0.072;
  root.add(second_band_highlight);

  const middle_white_ringGeom = new THREE.RingGeometry(0.485, 0.565, 128);
  const middle_white_ring = new THREE.Mesh(middle_white_ringGeom, white_printMat);
  middle_white_ring.position.z = 0.071;
  root.add(middle_white_ring);

  const inner_white_ringGeom = new THREE.RingGeometry(0.305, 0.385, 128);
  const inner_white_ring = new THREE.Mesh(inner_white_ringGeom, white_printMat);
  inner_white_ring.position.z = 0.071;
  root.add(inner_white_ring);

  const inner_band_highlightGeom = new THREE.RingGeometry(
    0.312, 0.378, 40, 1, 3.55, 0.72
  );
  const inner_band_highlight = new THREE.Mesh(inner_band_highlightGeom, highlightMat);
  inner_band_highlight.position.z = 0.072;
  root.add(inner_band_highlight);

  const center_fieldGeom = new THREE.CircleGeometry(0.285, 96);
  const center_field = new THREE.Mesh(center_fieldGeom, front_faceMat);
  center_field.position.z = 0.071;
  root.add(center_field);

  const center_highlightGeom = new THREE.RingGeometry(
    0.105, 0.275, 48, 1, 2.15, 1.15
  );
  const center_highlight = new THREE.Mesh(center_highlightGeom, highlightMat);
  center_highlight.position.z = 0.072;
  root.add(center_highlight);

  const horizontal_guide_lineGeom = new THREE.BoxGeometry(1.86, 0.006, 0.004);
  const horizontal_guide_line = new THREE.Mesh(horizontal_guide_lineGeom, guideMat);
  horizontal_guide_line.position.set(0, 0.015, 0.073);
  root.add(horizontal_guide_line);

  const left_radial_guideGeom = new THREE.BoxGeometry(0.31, 0.005, 0.004);
  const left_radial_guide = new THREE.Mesh(left_radial_guideGeom, guideMat);
  left_radial_guide.position.set(-0.79, 0.015, 0.073);
  root.add(left_radial_guide);

  const right_radial_guideGeom = new THREE.BoxGeometry(0.31, 0.005, 0.004);
  const right_radial_guide = new THREE.Mesh(right_radial_guideGeom, guideMat);
  right_radial_guide.position.set(0.79, 0.015, 0.073);
  root.add(right_radial_guide);

  const center_hubGeom = new THREE.CircleGeometry(0.092, 64);
  const center_hub = new THREE.Mesh(center_hubGeom, white_printMat);
  center_hub.position.set(0, 0.015, 0.075);
  root.add(center_hub);

  const digit_segments = {
    "0": ["a", "b", "c", "d", "e", "f"],
    "1": ["b", "c"],
    "2": ["a", "b", "g", "e", "d"],
    "3": ["a", "b", "g", "c", "d"],
    "4": ["f", "g", "b", "c"],
    "5": ["a", "f", "g", "c", "d"],
    "6": ["a", "f", "g", "e", "c", "d"],
    "7": ["a", "b", "c"],
    "8": ["a", "b", "c", "d", "e", "f", "g"],
    "9": ["a", "b", "c", "d", "f", "g"],
  };

  const digit_layout = {
    a: [0, 0.046, 0],
    b: [0.027, 0.023, Math.PI / 2],
    c: [0.027, -0.023, Math.PI / 2],
    d: [0, -0.046, 0],
    e: [-0.027, -0.023, Math.PI / 2],
    f: [-0.027, 0.023, Math.PI / 2],
    g: [0, 0, 0],
  };

  const digit_placements = [
    [0.000, 0.910, "1", 0.78],
    [0.000, 0.785, "1", 0.78],
    [0.000, 0.695, "8", 0.82],
    [0.000, 0.600, "0", 0.82],
    [0.000, 0.470, "5", 0.82],
    [0.000, 0.390, "3", 0.82],
    [0.000, 0.290, "1", 0.78],
    [0.000, 0.205, "3", 0.82],
    [0.000, -0.190, "5", 0.82],
    [0.000, -0.290, "0", 0.82],
    [0.000, -0.400, "0", 0.82],
    [0.000, -0.500, "2", 0.82],
    [0.000, -0.600, "5", 0.82],
    [0.000, -0.700, "7", 0.82],
    [0.000, -0.800, "2", 0.82],
    [0.000, -0.900, "9", 0.82],

    [-0.865, 0.015, "R", 0.72],
    [-0.755, 0.015, "0", 0.72],
    [-0.650, 0.015, "0", 0.72],
    [-0.455, 0.015, "0", 0.66],
    [-0.190, 0.015, "6", 0.62],
    [0.190, 0.015, "5", 0.62],
    [0.570, 0.015, "4", 0.70],
    [0.700, 0.015, "1", 0.70],
    [0.845, 0.015, "7", 0.72],
  ];

  let segment_count = 0;
  for (const placement of digit_placements) {
    const glyph = placement[2];
    if (glyph === "R") {
      segment_count += 6;
    } else {
      segment_count += digit_segments[glyph].length;
    }
  }

  const printed_numbersGeom = new THREE.BoxGeometry(0.050, 0.009, 0.005);
  const printed_numbers = new THREE.InstancedMesh(
    printed_numbersGeom,
    white_printMat,
    segment_count
  );
  const number_dummy = new THREE.Object3D();
  let segment_index = 0;

  for (const placement of digit_placements) {
    const glyph = placement[2];
    const glyph_scale = placement[3];
    const glyph_x = placement[0];
    const glyph_y = placement[1];

    if (glyph === "R") {
      const r_segments = [
        [0, 0, Math.PI / 2, 1.15],
        [0.025, 0.023, 0, 0.78],
        [0.025, 0.000, 0, 0.78],
        [0, -0.023, 0, 0.78],
        [0.027, -0.024, Math.PI / 2, 0.62],
        [0.014, -0.027, -0.78, 0.68],
      ];
      for (const part of r_segments) {
        number_dummy.position.set(
          glyph_x + part[0] * glyph_scale,
          glyph_y + part[1] * glyph_scale,
          0.076
        );
        number_dummy.rotation.set(0, 0, part[2]);
        number_dummy.scale.set(
          glyph_scale * part[3],
          glyph_scale,
          1
        );
        number_dummy.updateMatrix();
        printed_numbers.setMatrixAt(segment_index++, number_dummy.matrix);
      }
    } else {
      for (const segment_name of digit_segments[glyph]) {
        const segment = digit_layout[segment_name];
        number_dummy.position.set(
          glyph_x + segment[0] * glyph_scale,
          glyph_y + segment[1] * glyph_scale,
          0.076
        );
        number_dummy.rotation.set(0, 0, segment[2]);
        number_dummy.scale.set(glyph_scale, glyph_scale, 1);
        number_dummy.updateMatrix();
        printed_numbers.setMatrixAt(segment_index++, number_dummy.matrix);
      }
    }
  }
  printed_numbers.instanceMatrix.needsUpdate = true;
  root.add(printed_numbers);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}