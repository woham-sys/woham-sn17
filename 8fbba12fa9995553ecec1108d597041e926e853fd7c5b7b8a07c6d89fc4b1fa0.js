function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "purple_spiral_disc";

  const disc_group = new THREE.Group();
  disc_group.name = "disc_group";
  root.add(disc_group);

  const disc_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x5b168f,
    metalness: 0.0,
    roughness: 0.22
  });
  const front_faceMat = new THREE.MeshStandardMaterial({
    color: 0x6d18a8,
    metalness: 0.0,
    roughness: 0.2
  });
  const outer_rimMat = new THREE.MeshStandardMaterial({
    color: 0x4b1075,
    metalness: 0.0,
    roughness: 0.24
  });
  const spiral_bandMat = new THREE.MeshStandardMaterial({
    color: 0xf7f7f2,
    metalness: 0.0,
    roughness: 0.25,
    side: THREE.DoubleSide
  });
  const spiral_borderMat = new THREE.MeshStandardMaterial({
    color: 0xdfe2df,
    metalness: 0.0,
    roughness: 0.35,
    side: THREE.DoubleSide
  });
  const guide_linesMat = new THREE.MeshStandardMaterial({
    color: 0xc7b8d8,
    metalness: 0.0,
    roughness: 0.55
  });
  const spiral_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xe5e6e3,
    metalness: 0.0,
    roughness: 0.3
  });
  const spiral_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x92979c,
    metalness: 0.0,
    roughness: 0.45
  });

  const disc_bodyProfile = [
    new THREE.Vector2(0.000, -0.055),
    new THREE.Vector2(0.900, -0.055),
    new THREE.Vector2(0.955, -0.048),
    new THREE.Vector2(0.985, -0.025),
    new THREE.Vector2(0.995, 0.000),
    new THREE.Vector2(0.987, 0.028),
    new THREE.Vector2(0.965, 0.052),
    new THREE.Vector2(0.930, 0.062),
    new THREE.Vector2(0.000, 0.062)
  ];
  const disc_bodyGeom = new THREE.LatheGeometry(disc_bodyProfile, 128);
  const disc_body = new THREE.Mesh(disc_bodyGeom, disc_bodyMat);
  disc_body.name = "disc_body";
  disc_body.rotation.x = Math.PI / 2;
  disc_group.add(disc_body);

  const front_faceGeom = new THREE.CircleGeometry(0.932, 128);
  const front_face = new THREE.Mesh(front_faceGeom, front_faceMat);
  front_face.name = "front_face";
  front_face.position.z = 0.063;
  disc_group.add(front_face);

  const outer_rimGeom = new THREE.TorusGeometry(0.956, 0.012, 12, 128);
  const outer_rim = new THREE.Mesh(outer_rimGeom, outer_rimMat);
  outer_rim.name = "outer_rim";
  outer_rim.position.z = 0.058;
  disc_group.add(outer_rim);

  const inner_rimGeom = new THREE.TorusGeometry(0.925, 0.004, 8, 128);
  const inner_rim = new THREE.Mesh(inner_rimGeom, spiral_bandMat);
  inner_rim.name = "inner_rim";
  inner_rim.position.z = 0.068;
  disc_group.add(inner_rim);

  const spiral_start = -Math.PI / 2;
  const spiral_turns = 4.25;
  const spiral_span = spiral_turns * Math.PI * 2;
  const spiral_inner_radius = 0.155;
  const spiral_outer_radius = 0.875;
  const spiral_growth = (spiral_outer_radius - spiral_inner_radius) / spiral_span;
  const spiral_segments = 220;

  function spiralRadiusAt(theta) {
    return spiral_inner_radius + spiral_growth * (theta - spiral_start);
  }

  function createSpiralBandGeometry() {
    const positions = [];
    const indices = [];
    const half_width = 0.057;

    for (let i = 0; i <= spiral_segments; i++) {
      const theta = spiral_start + spiral_span * (i / spiral_segments);
      const radius = spiralRadiusAt(theta);
      const cos_theta = Math.cos(theta);
      const sin_theta = Math.sin(theta);
      const inner_point = new THREE.Vector2(
        cos_theta * (radius - half_width),
        sin_theta * (radius - half_width)
      );
      const outer_point = new THREE.Vector2(
        cos_theta * (radius + half_width),
        sin_theta * (radius + half_width)
      );

      positions.push(
        inner_point.x, inner_point.y, 0,
        outer_point.x, outer_point.y, 0
      );
    }

    for (let i = 0; i < spiral_segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, b, d, c);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createSpiralBorderGeometry(side) {
    const positions = [];
    const indices = [];
    const half_width = 0.057;
    const border_width = 0.006;

    for (let i = 0; i <= spiral_segments; i++) {
      const theta = spiral_start + spiral_span * (i / spiral_segments);
      const radius = spiralRadiusAt(theta);
      const cos_theta = Math.cos(theta);
      const sin_theta = Math.sin(theta);
      const base_radius = radius + side * half_width;
      const inner_radius = base_radius - border_width;
      const outer_radius = base_radius + border_width;

      positions.push(
        cos_theta * inner_radius,
        sin_theta * inner_radius,
        0,
        cos_theta * outer_radius,
        sin_theta * outer_radius,
        0
      );
    }

    for (let i = 0; i < spiral_segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, b, d, c);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const spiral_bandGeom = createSpiralBandGeometry();
  const spiral_band = new THREE.Mesh(spiral_bandGeom, spiral_bandMat);
  spiral_band.name = "spiral_band";
  spiral_band.position.z = 0.068;
  disc_group.add(spiral_band);

  const spiral_inner_borderGeom = createSpiralBorderGeometry(-1);
  const spiral_inner_border = new THREE.Mesh(
    spiral_inner_borderGeom,
    spiral_borderMat
  );
  spiral_inner_border.name = "spiral_inner_border";
  spiral_inner_border.position.z = 0.069;
  disc_group.add(spiral_inner_border);

  const spiral_outer_borderGeom = createSpiralBorderGeometry(1);
  const spiral_outer_border = new THREE.Mesh(
    spiral_outer_borderGeom,
    spiral_borderMat
  );
  spiral_outer_border.name = "spiral_outer_border";
  spiral_outer_border.position.z = 0.069;
  disc_group.add(spiral_outer_border);

  const spiral_end = spiral_start + spiral_span;
  const spiral_end_radius = spiralRadiusAt(spiral_end);
  const spiral_end_x = Math.cos(spiral_end) * spiral_end_radius;
  const spiral_end_y = Math.sin(spiral_end) * spiral_end_radius;

  const spiral_end_capGeom = new THREE.CircleGeometry(0.057, 32);
  const spiral_end_cap = new THREE.Mesh(spiral_end_capGeom, spiral_bandMat);
  spiral_end_cap.name = "spiral_end_cap";
  spiral_end_cap.position.set(spiral_end_x, spiral_end_y, 0.068);
  disc_group.add(spiral_end_cap);

  const spiral_end_borderGeom = new THREE.RingGeometry(0.051, 0.057, 32);
  const spiral_end_border = new THREE.Mesh(
    spiral_end_borderGeom,
    spiral_borderMat
  );
  spiral_end_border.name = "spiral_end_border";
  spiral_end_border.position.set(spiral_end_x, spiral_end_y, 0.069);
  disc_group.add(spiral_end_border);

  const horizontal_guide_lineGeom = new THREE.BoxGeometry(1.72, 0.003, 0.001);
  const horizontal_guide_line = new THREE.Mesh(
    horizontal_guide_lineGeom,
    guide_linesMat
  );
  horizontal_guide_line.name = "horizontal_guide_line";
  horizontal_guide_line.position.set(0, -0.012, 0.070);
  disc_group.add(horizontal_guide_line);

  const vertical_guide_lineGeom = new THREE.BoxGeometry(0.003, 1.72, 0.001);
  const vertical_guide_line = new THREE.Mesh(
    vertical_guide_lineGeom,
    guide_linesMat
  );
  vertical_guide_line.name = "vertical_guide_line";
  vertical_guide_line.position.set(0, 0, 0.070);
  disc_group.add(vertical_guide_line);

  const left_radial_guideGeom = new THREE.BoxGeometry(0.58, 0.0025, 0.001);
  const left_radial_guide = new THREE.Mesh(left_radial_guideGeom, guide_linesMat);
  left_radial_guide.name = "left_radial_guide";
  left_radial_guide.position.set(-0.66, -0.012, 0.070);
  disc_group.add(left_radial_guide);

  const right_radial_guideGeom = new THREE.BoxGeometry(0.58, 0.0025, 0.001);
  const right_radial_guide = new THREE.Mesh(right_radial_guideGeom, guide_linesMat);
  right_radial_guide.name = "right_radial_guide";
  right_radial_guide.position.set(0.66, -0.012, 0.070);
  disc_group.add(right_radial_guide);

  const center_markerGeom = new THREE.CircleGeometry(0.075, 48);
  const center_marker = new THREE.Mesh(center_markerGeom, spiral_bandMat);
  center_marker.name = "center_marker";
  center_marker.position.set(0, -0.012, 0.071);
  disc_group.add(center_marker);

  const digitPatterns = {
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

  const segmentDefinitions = {
    a: [0, 0.038, 0],
    b: [0.022, 0.019, 1],
    c: [0.022, -0.019, 1],
    d: [0, -0.038, 0],
    e: [-0.022, -0.019, 1],
    f: [-0.022, 0.019, 1],
    g: [0, 0, 0]
  };

  const digitTransforms = [];

  function appendDigit(character, x, y, scale, rotation) {
    const pattern = digitPatterns[character];
    if (!pattern) return;

    const cos_rotation = Math.cos(rotation);
    const sin_rotation = Math.sin(rotation);

    for (let i = 0; i < pattern.length; i++) {
      const definition = segmentDefinitions[pattern[i]];
      const local_x = definition[0] * scale;
      const local_y = definition[1] * scale;
      const world_x = x + local_x * cos_rotation - local_y * sin_rotation;
      const world_y = y + local_x * sin_rotation + local_y * cos_rotation;
      const vertical = definition[2] === 1;

      digitTransforms.push({
        x: world_x,
        y: world_y,
        rotation: rotation + (vertical ? Math.PI / 2 : 0),
        length: 0.038 * scale,
        thickness: 0.007 * scale
      });
    }
  }

  function appendLabel(text, x, y, scale, rotation) {
    const spacing = 0.058 * scale;
    const cosine = Math.cos(rotation);
    const sine = Math.sin(rotation);

    for (let i = 0; i < text.length; i++) {
      const offset = (i - (text.length - 1) / 2) * spacing;
      const local_x = offset;
      const local_y = 0;
      const world_x = x + local_x * cosine - local_y * sine;
      const world_y = y + local_x * sine + local_y * cosine;
      appendDigit(text[i], world_x, world_y, scale, rotation);
    }
  }

  const vertical_labels = [
    ["1", 0.835],
    ["1", 0.715],
    ["2", 0.610],
    ["0", 0.505],
    ["5", 0.390],
    ["3", 0.285],
    ["3", 0.180],
    ["1", 0.080],
    ["3", -0.015],
    ["5", -0.120],
    ["0", -0.230],
    ["0", -0.340],
    ["2", -0.450],
    ["5", -0.560],
    ["7", -0.670],
    ["2", -0.780],
    ["3", -0.865],
    ["5", -0.945]
  ];

  for (let i = 0; i < vertical_labels.length; i++) {
    appendDigit(vertical_labels[i][0], 0, vertical_labels[i][1], 0.78, 0);
  }

  const left_labels = [
    ["R", -0.835],
    ["0", -0.700],
    ["0", -0.570]
  ];

  for (let i = 0; i < left_labels.length; i++) {
    appendLabel(left_labels[i][0], left_labels[i][1], -0.012, 0.72, 0);
  }

  const right_labels = [
    ["3", 0.245],
    ["4", 0.555],
    ["1", 0.685],
    ["7", 0.825]
  ];

  for (let i = 0; i < right_labels.length; i++) {
    appendDigit(right_labels[i][0], right_labels[i][1], -0.012, 0.72, 0);
  }

  const printed_digitsGeom = new THREE.BoxGeometry(1, 1, 1);
  const printed_digits = new THREE.InstancedMesh(
    printed_digitsGeom,
    spiral_bandMat,
    digitTransforms.length
  );
  printed_digits.name = "printed_digits";

  const digit_dummy = new THREE.Object3D();
  for (let i = 0; i < digitTransforms.length; i++) {
    const transform = digitTransforms[i];
    digit_dummy.position.set(transform.x, transform.y, 0.072);
    digit_dummy.rotation.set(0, 0, transform.rotation);
    digit_dummy.scale.set(transform.length, transform.thickness, 0.002);
    digit_dummy.updateMatrix();
    printed_digits.setMatrixAt(i, digit_dummy.matrix);
  }
  printed_digits.instanceMatrix.needsUpdate = true;
  disc_group.add(printed_digits);

  const highlight_points = [];
  const shadow_points = [];
  const highlight_samples = 42;

  for (let i = 0; i <= highlight_samples; i++) {
    const theta = spiral_start + spiral_span * (i / highlight_samples);
    const radius = spiralRadiusAt(theta);
    const cos_theta = Math.cos(theta);
    const sin_theta = Math.sin(theta);

    highlight_points.push(new THREE.Vector3(
      cos_theta * (radius - 0.048),
      sin_theta * (radius - 0.048),
      0.073
    ));
    shadow_points.push(new THREE.Vector3(
      cos_theta * (radius + 0.048),
      sin_theta * (radius + 0.048),
      0.072
    ));
  }

  const spiral_highlightCurve = new THREE.CatmullRomCurve3(highlight_points);
  const spiral_highlightGeom = new THREE.TubeGeometry(
    spiral_highlightCurve,
    84,
    0.0025,
    6,
    false
  );
  const spiral_highlight = new THREE.Mesh(
    spiral_highlightGeom,
    spiral_highlightMat
  );
  spiral_highlight.name = "spiral_highlight";
  disc_group.add(spiral_highlight);

  const spiral_shadowCurve = new THREE.CatmullRomCurve3(shadow_points);
  const spiral_shadowGeom = new THREE.TubeGeometry(
    spiral_shadowCurve,
    84,
    0.002,
    6,
    false
  );
  const spiral_shadow = new THREE.Mesh(spiral_shadowGeom, spiral_shadowMat);
  spiral_shadow.name = "spiral_shadow";
  disc_group.add(spiral_shadow);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.98 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }
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
