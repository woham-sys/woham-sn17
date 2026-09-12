// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "woven_yarn_basket";

  const basket_body = new THREE.Group();
  basket_body.name = "basket_body";
  root.add(basket_body);

  const rim_group = new THREE.Group();
  rim_group.name = "woven_rim";
  root.add(rim_group);

  const fibers_group = new THREE.Group();
  fibers_group.name = "yarn_fibers";
  root.add(fibers_group);

  const red_yarn_mat = new THREE.MeshStandardMaterial({
    color: 0xff3345,
    metalness: 0.0,
    roughness: 0.95
  });
  const orange_yarn_mat = new THREE.MeshStandardMaterial({
    color: 0xff7a22,
    metalness: 0.0,
    roughness: 0.95
  });
  const yellow_yarn_mat = new THREE.MeshStandardMaterial({
    color: 0xffdc28,
    metalness: 0.0,
    roughness: 0.95
  });
  const lime_yarn_mat = new THREE.MeshStandardMaterial({
    color: 0xb9ef35,
    metalness: 0.0,
    roughness: 0.95
  });
  const green_yarn_mat = new THREE.MeshStandardMaterial({
    color: 0x16ad61,
    metalness: 0.0,
    roughness: 0.95
  });
  const cyan_yarn_mat = new THREE.MeshStandardMaterial({
    color: 0x08a9d5,
    metalness: 0.0,
    roughness: 0.95
  });
  const blue_yarn_mat = new THREE.MeshStandardMaterial({
    color: 0x087fc5,
    metalness: 0.0,
    roughness: 0.95
  });
  const purple_yarn_mat = new THREE.MeshStandardMaterial({
    color: 0x8f35ad,
    metalness: 0.0,
    roughness: 0.95
  });
  const magenta_yarn_mat = new THREE.MeshStandardMaterial({
    color: 0xee267d,
    metalness: 0.0,
    roughness: 0.95
  });

  const yarn_materials = [
    red_yarn_mat,
    orange_yarn_mat,
    yellow_yarn_mat,
    lime_yarn_mat,
    green_yarn_mat,
    cyan_yarn_mat,
    blue_yarn_mat,
    purple_yarn_mat,
    magenta_yarn_mat
  ];

  const basket_base_mat = new THREE.MeshStandardMaterial({
    color: 0x164f55,
    metalness: 0.0,
    roughness: 0.95
  });
  const basket_base_geom = new THREE.CylinderGeometry(0.36, 0.38, 0.055, 48);
  const basket_base = new THREE.Mesh(basket_base_geom, basket_base_mat);
  basket_base.name = "basket_base";
  basket_base.position.y = -0.315;
  root.add(basket_base);

  const basket_inner_shadow_mat = new THREE.MeshStandardMaterial({
    color: 0x0b3038,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const basket_inner_shadow_geom = new THREE.CircleGeometry(0.335, 48);
  const basket_inner_shadow = new THREE.Mesh(
    basket_inner_shadow_geom,
    basket_inner_shadow_mat
  );
  basket_inner_shadow.name = "basket_inner_shadow";
  basket_inner_shadow.rotation.x = -Math.PI / 2;
  basket_inner_shadow.position.y = -0.282;
  root.add(basket_inner_shadow);

  function makeInstanced(name, geometry, material, matrices, parent) {
    const mesh = new THREE.InstancedMesh(
      geometry,
      material,
      matrices.length
    );
    mesh.name = name;
    for (let i = 0; i < matrices.length; i++) {
      mesh.setMatrixAt(i, matrices[i]);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
    parent.add(mesh);
    return mesh;
  }

  function makeTwistedTube(
    points,
    closed,
    turns,
    phase,
    orbit,
    tube_radius,
    tubular_segments,
    radial_segments
  ) {
    const point_count = points.length;
    const sample_count = closed ? point_count : point_count - 1;
    const helix_segments = Math.max(24, tubular_segments);
    const centers = [];
    const normals = [];
    const binormals = [];

    for (let i = 0; i <= helix_segments; i++) {
      const t = i / helix_segments;
      const scaled = t * sample_count;
      const index = Math.min(point_count - 1, Math.floor(scaled));
      const next_index = closed
        ? (index + 1) % point_count
        : Math.min(point_count - 1, index + 1);
      const local_t = scaled - index;
      const start = points[index];
      const end = points[next_index];
      const center = new THREE.Vector3(
        start.x + (end.x - start.x) * local_t,
        start.y + (end.y - start.y) * local_t,
        start.z + (end.z - start.z) * local_t
      );

      let tangent;
      if (closed && index === point_count - 1) {
        tangent = new THREE.Vector3()
          .subVectors(points[0], points[index])
          .normalize();
      } else {
        tangent = new THREE.Vector3()
          .subVectors(end, start)
          .normalize();
      }

      let normal = new THREE.Vector3(-tangent.y, tangent.x, 0);
      if (normal.lengthSq() < 0.000001) {
        normal = new THREE.Vector3(1, 0, 0);
      }
      normal.normalize();

      const binormal = new THREE.Vector3()
        .crossVectors(tangent, normal)
        .normalize();

      centers.push(center);
      normals.push(normal);
      binormals.push(binormal);
    }

    const positions = [];
    const indices = [];
    const strand_offset = tube_radius * 0.42;
    const strand_radius = tube_radius * 0.62;

    for (let i = 0; i <= helix_segments; i++) {
      const t = i / helix_segments;
      const angle = t * turns * Math.PI * 2 + phase;
      const cos_angle = Math.cos(angle);
      const sin_angle = Math.sin(angle);
      const center = centers[i];
      const normal = normals[i];
      const binormal = binormals[i];

      for (let strand = 0; strand < 2; strand++) {
        const strand_phase = strand * Math.PI;
        const twist_angle = angle + strand_phase;
        const offset = strand_offset + strand_radius;

        const nx =
          normal.x * Math.cos(twist_angle) +
          binormal.x * Math.sin(twist_angle);
        const ny =
          normal.y * Math.cos(twist_angle) +
          binormal.y * Math.sin(twist_angle);
        const nz =
          normal.z * Math.cos(twist_angle) +
          binormal.z * Math.sin(twist_angle);

        positions.push(
          center.x + nx * offset,
          center.y + ny * offset,
          center.z + nz * offset
        );
      }
    }

    for (let i = 0; i < helix_segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, c, b, b, c, d);
    }

    if (!closed) {
      const end = helix_segments * 2;
      indices.push(end, end + 1, end + 2, end + 1, end + 3, end + 2);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return new THREE.Mesh(geometry, yarn_materials[0]);
  }

  const weave_columns = 32;
  const weave_rows = 6;
  const strand_radius = 0.032;
  const course_spacing = 0.105;
  const course_start = -0.26;
  const angle_step = Math.PI * 2 / weave_columns;

  const diagonal_stitch_geom = new THREE.CylinderGeometry(
    strand_radius,
    strand_radius,
    1,
    10,
    1
  );
  const diagonal_stitch_matrices = [];
  for (let i = 0; i < yarn_materials.length; i++) {
    diagonal_stitch_matrices.push([]);
  }

  const up_axis = new THREE.Vector3(0, 1, 0);

  function addDiagonalStitch(color_index, start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    direction.normalize();

    const midpoint = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      up_axis,
      direction
    );
    const scale = new THREE.Vector3(1, length, 1);
    const matrix = new THREE.Matrix4().compose(
      midpoint,
      quaternion,
      scale
    );
    diagonal_stitch_matrices[color_index].push(matrix);
  }

  for (let row = 0; row < weave_rows; row++) {
    const row_y = course_start + row * course_spacing;

    for (let column = 0; column < weave_columns; column++) {
      const angle = column * angle_step;
      const radius = 0.565 + row * 0.012;
      const start = new THREE.Vector3(
        Math.cos(angle) * radius,
        row_y,
        Math.sin(angle) * radius
      );
      const end_angle = angle + angle_step;
      const end_radius = 0.579 + row * 0.012;
      const end = new THREE.Vector3(
        Math.cos(end_angle) * end_radius,
        row_y + course_spacing,
        Math.sin(end_angle) * end_radius
      );
      const color_index =
        (column + row * 3) % yarn_materials.length;
      addDiagonalStitch(color_index, start, end);
    }
  }

  for (let row = 0; row < weave_rows - 1; row++) {
    const row_y = course_start + row * course_spacing;

    for (let column = 0; column < weave_columns; column++) {
      const angle = column * angle_step + angle_step * 0.5;
      const radius = 0.579 + row * 0.012;
      const start = new THREE.Vector3(
        Math.cos(angle) * radius,
        row_y + course_spacing,
        Math.sin(angle) * radius
      );
      const end_angle = angle - angle_step;
      const end_radius = 0.565 + (row + 1) * 0.012;
      const end = new THREE.Vector3(
        Math.cos(end_angle) * end_radius,
        row_y,
        Math.sin(end_angle) * end_radius
      );
      const color_index =
        (column * 2 + row + 4) % yarn_materials.length;
      addDiagonalStitch(color_index, start, end);
    }
  }

  const diagonal_right_stitches_red = makeInstanced(
    "diagonal_right_stitches_red",
    diagonal_stitch_geom,
    red_yarn_mat,
    diagonal_stitch_matrices[0],
    basket_body
  );
  const diagonal_right_stitches_orange = makeInstanced(
    "diagonal_right_stitches_orange",
    diagonal_stitch_geom,
    orange_yarn_mat,
    diagonal_stitch_matrices[1],
    basket_body
  );
  const diagonal_right_stitches_yellow = makeInstanced(
    "diagonal_right_stitches_yellow",
    diagonal_stitch_geom,
    yellow_yarn_mat,
    diagonal_stitch_matrices[2],
    basket_body
  );
  const diagonal_right_stitches_lime = makeInstanced(
    "diagonal_right_stitches_lime",
    diagonal_stitch_geom,
    lime_yarn_mat,
    diagonal_stitch_matrices[3],
    basket_body
  );
  const diagonal_right_stitches_green = makeInstanced(
    "diagonal_right_stitches_green",
    diagonal_stitch_geom,
    green_yarn_mat,
    diagonal_stitch_matrices[4],
    basket_body
  );
  const diagonal_right_stitches_cyan = makeInstanced(
    "diagonal_right_stitches_cyan",
    diagonal_stitch_geom,
    cyan_yarn_mat,
    diagonal_stitch_matrices[5],
    basket_body
  );
  const diagonal_right_stitches_blue = makeInstanced(
    "diagonal_right_stitches_blue",
    diagonal_stitch_geom,
    blue_yarn_mat,
    diagonal_stitch_matrices[6],
    basket_body
  );
  const diagonal_right_stitches_purple = makeInstanced(
    "diagonal_right_stitches_purple",
    diagonal_stitch_geom,
    purple_yarn_mat,
    diagonal_stitch_matrices[7],
    basket_body
  );
  const diagonal_right_stitches_magenta = makeInstanced(
    "diagonal_right_stitches_magenta",
    diagonal_stitch_geom,
    magenta_yarn_mat,
    diagonal_stitch_matrices[8],
    basket_body
  );

  const horizontal_course_points = [];
  const horizontal_point_count = 96;
  for (let i = 0; i < horizontal_point_count; i++) {
    const angle = i / horizontal_point_count * Math.PI * 2;
    const radius = 0.574;
    horizontal_course_points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      )
    );
  }

  const horizontal_course_geom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      horizontal_course_points,
      true,
      "centripetal"
    ),
    192,
    0.026,
    8,
    true
  );
  const horizontal_course_matrices = [];
  for (let i = 0; i < yarn_materials.length; i++) {
    horizontal_course_matrices.push([]);
  }

  for (let row = 0; row < weave_rows; row++) {
    const matrix = new THREE.Matrix4().makeTranslation(
      0,
      course_start + row * course_spacing,
      0
    );
    const color_index = (row + 2) % yarn_materials.length;
    horizontal_course_matrices[color_index].push(matrix);
  }

  const horizontal_courses_red = makeInstanced(
    "horizontal_courses_red",
    horizontal_course_geom,
    red_yarn_mat,
    horizontal_course_matrices[0],
    basket_body
  );
  const horizontal_courses_orange = makeInstanced(
    "horizontal_courses_orange",
    horizontal_course_geom,
    orange_yarn_mat,
    horizontal_course_matrices[1],
    basket_body
  );
  const horizontal_courses_yellow = makeInstanced(
    "horizontal_courses_yellow",
    horizontal_course_geom,
    yellow_yarn_mat,
    horizontal_course_matrices[2],
    basket_body
  );
  const horizontal_courses_lime = makeInstanced(
    "horizontal_courses_lime",
    horizontal_course_geom,
    lime_yarn_mat,
    horizontal_course_matrices[3],
    basket_body
  );
  const horizontal_courses_green = makeInstanced(
    "horizontal_courses_green",
    horizontal_course_geom,
    green_yarn_mat,
    horizontal_course_matrices[4],
    basket_body
  );
  const horizontal_courses_cyan = makeInstanced(
    "horizontal_courses_cyan",
    horizontal_course_geom,
    cyan_yarn_mat,
    horizontal_course_matrices[5],
    basket_body
  );
  const horizontal_courses_blue = makeInstanced(
    "horizontal_courses_blue",
    horizontal_course_geom,
    blue_yarn_mat,
    horizontal_course_matrices[6],
    basket_body
  );
  const horizontal_courses_purple = makeInstanced(
    "horizontal_courses_purple",
    horizontal_course_geom,
    purple_yarn_mat,
    horizontal_course_matrices[7],
    basket_body
  );
  const horizontal_courses_magenta = makeInstanced(
    "horizontal_courses_magenta",
    horizontal_course_geom,
    magenta_yarn_mat,
    horizontal_course_matrices[8],
    basket_body
  );

  const bottom_braid_points = [];
  const bottom_point_count = 72;
  for (let i = 0; i < bottom_point_count; i++) {
    const angle = i / bottom_point_count * Math.PI * 2;
    const radius = 0.558;
    bottom_braid_points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        -0.315 + Math.sin(angle * 2) * 0.008,
        Math.sin(angle) * radius
      )
    );
  }

  const bottom_braid_geom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      bottom_braid_points,
      true,
      "centripetal"
    ),
    144,
    0.034,
    9,
    true
  );
  const bottom_braid = new THREE.Mesh(
    bottom_braid_geom,
    green_yarn_mat
  );
  bottom_braid.name = "bottom_braid";
  basket_body.add(bottom_braid);

  const top_rim_points = [];
  const rim_point_count = 96;
  for (let i = 0; i < rim_point_count; i++) {
    const angle = i / rim_point_count * Math.PI * 2;
    const radius = 0.603 + Math.sin(angle * 3) * 0.004;
    top_rim_points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        0.365 + Math.sin(angle * 2) * 0.009,
        Math.sin(angle) * radius
      )
    );
  }

  const top_rim_base_geom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      top_rim_points,
      true,
      "centripetal"
    ),
    192,
    0.027,
    8,
    true
  );
  const top_rim_base = new THREE.Mesh(
    top_rim_base_geom,
    cyan_yarn_mat
  );
  top_rim_base.name = "top_rim_base";
  rim_group.add(top_rim_base);

  const top_rim_segment_count = 16;
  const top_rim_segment_points = [];
  const top_rim_subdivisions = 7;

  for (let i = 0; i <= top_rim_subdivisions; i++) {
    const t = i / top_rim_subdivisions;
    const angle = t * Math.PI * 2 / top_rim_segment_count;
    const radius =
      0.603 +
      Math.sin(angle * 3) * 0.004 +
      Math.sin(t * Math.PI) * 0.006;
    top_rim_segment_points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        0.365 +
          Math.sin(angle * 2) * 0.009 +
          Math.sin(t * Math.PI) * 0.014,
        Math.sin(angle) * radius
      )
    );
  }

  const top_rim_segment_geom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      top_rim_segment_points,
      false,
      "centripetal"
    ),
    24,
    0.035,
    9,
    false
  );
  const top_rim_segment_matrices = [];
  for (let i = 0; i < yarn_materials.length; i++) {
    top_rim_segment_matrices.push([]);
  }

  for (let i = 0; i < top_rim_segment_count; i++) {
    const matrix = new THREE.Matrix4().makeRotationY(
      -i / top_rim_segment_count * Math.PI * 2
    );
    const color_index =
      (i * 2 + Math.floor(i / 3)) % yarn_materials.length;
    top_rim_segment_matrices[color_index].push(matrix);
  }

  const top_rim_segments_red = makeInstanced(
    "top_rim_segments_red",
    top_rim_segment_geom,
    red_yarn_mat,
    top_rim_segment_matrices[0],
    rim_group
  );
  const top_rim_segments_orange = makeInstanced(
    "top_rim_segments_orange",
    top_rim_segment_geom,
    orange_yarn_mat,
    top_rim_segment_matrices[1],
    rim_group
  );
  const top_rim_segments_yellow = makeInstanced(
    "top_rim_segments_yellow",
    top_rim_segment_geom,
    yellow_yarn_mat,
    top_rim_segment_matrices[2],
    rim_group
  );
  const top_rim_segments_lime = makeInstanced(
    "top_rim_segments_lime",
    top_rim_segment_geom,
    lime_yarn_mat,
    top_rim_segment_matrices[3],
    rim_group
  );
  const top_rim_segments_green = makeInstanced(
    "top_rim_segments_green",
    top_rim_segment_geom,
    green_yarn_mat,
    top_rim_segment_matrices[4],
    rim_group
  );
  const top_rim_segments_cyan = makeInstanced(
    "top_rim_segments_cyan",
    top_rim_segment_geom,
    cyan_yarn_mat,
    top_rim_segment_matrices[5],
    rim_group
  );
  const top_rim_segments_blue = makeInstanced(
    "top_rim_segments_blue",
    top_rim_segment_geom,
    blue_yarn_mat,
    top_rim_segment_matrices[6],
    rim_group
  );
  const top_rim_segments_purple = makeInstanced(
    "top_rim_segments_purple",
    top_rim_segment_geom,
    purple_yarn_mat,
    top_rim_segment_matrices[7],
    rim_group
  );
  const top_rim_segments_magenta = makeInstanced(
    "top_rim_segments_magenta",
    top_rim_segment_geom,
    magenta_yarn_mat,
    top_rim_segment_matrices[8],
    rim_group
  );

  const inner_rim_points = [];
  const inner_rim_point_count = 72;
  for (let i = 0; i < inner_rim_point_count; i++) {
    const angle = i / inner_rim_point_count * Math.PI * 2;
    const radius = 0.515;
    inner_rim_points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        0.337 + Math.sin(angle * 2) * 0.006,
        Math.sin(angle) * radius
      )
    );
  }

  const inner_rim_geom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      inner_rim_points,
      true,
      "centripetal"
    ),
    144,
    0.027,
    8,
    true
  );
  const inner_rim = new THREE.Mesh(
    inner_rim_geom,
    magenta_yarn_mat
  );
  inner_rim.name = "inner_rim";
  rim_group.add(inner_rim);

  const rim_braid_left_points = [];
  const rim_braid_right_points = [];
  const braid_point_count = 144;
  const braid_turns = 12;

  for (let i = 0; i < braid_point_count; i++) {
    const t = i / braid_point_count;
    const angle = t * Math.PI * 2;
    const phase = t * braid_turns * Math.PI * 2;
    const base_radius = 0.603;
    const left_radius = base_radius + Math.cos(phase) * 0.028;
    const right_radius = base_radius + Math.cos(phase + Math.PI) * 0.028;
    const left_y = 0.365 + Math.sin(phase) * 0.028;
    const right_y = 0.365 + Math.sin(phase + Math.PI) * 0.028;

    rim_braid_left_points.push(
      new THREE.Vector3(
        Math.cos(angle) * left_radius,
        left_y,
        Math.sin(angle) * left_radius
      )
    );
    rim_braid_right_points.push(
      new THREE.Vector3(
        Math.cos(angle) * right_radius,
        right_y,
        Math.sin(angle) * right_radius
      )
    );
  }

  const rim_braid_left_geom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      rim_braid_left_points,
      true,
      "centripetal"
    ),
    288,
    0.023,
    8,
    true
  );
  const rim_braid_left = new THREE.Mesh(
    rim_braid_left_geom,
    yellow_yarn_mat
  );
  rim_braid_left.name = "rim_braid_left";
  rim_group.add(rim_braid_left);

  const rim_braid_right_geom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      rim_braid_right_points,
      true,
      "centripetal"
    ),
    288,
    0.023,
    8,
    true
  );
  const rim_braid_right = new THREE.Mesh(
    rim_braid_right_geom,
    orange_yarn_mat
  );
  rim_braid_right.name = "rim_braid_right";
  rim_group.add(rim_braid_right);

  const rim_knot_geom = new THREE.SphereGeometry(
    strand_radius * 1.08,
    10,
    7
  );
  const rim_knot_matrices = [];
  for (let i = 0; i < yarn_materials.length; i++) {
    rim_knot_matrices.push([]);
  }

  for (let i = 0; i < top_rim_segment_count; i++) {
    const angle = i / top_rim_segment_count * Math.PI * 2;
    const position = new THREE.Vector3(
      Math.cos(angle) * 0.603,
      0.369 + Math.sin(angle * 2) * 0.008,
      Math.sin(angle) * 0.603
    );
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      up_axis,
      -angle
    );
    const scale = new THREE.Vector3(1.15, 0.82, 0.9);
    const matrix = new THREE.Matrix4().compose(
      position,
      quaternion,
      scale
    );
    const color_index =
      (i * 2 + 1 + Math.floor(i / 3)) % yarn_materials.length;
    rim_knot_matrices[color_index].push(matrix);
  }

  const rim_knots_red = makeInstanced(
    "rim_knots_red",
    rim_knot_geom,
    red_yarn_mat,
    rim_knot_matrices[0],
    rim_group
  );
  const rim_knots_orange = makeInstanced(
    "rim_knots_orange",
    rim_knot_geom,
    orange_yarn_mat,
    rim_knot_matrices[1],
    rim_group
  );
  const rim_knots_yellow = makeInstanced(
    "rim_knots_yellow",
    rim_knot_geom,
    yellow_yarn_mat,
    rim_knot_matrices[2],
    rim_group
  );
  const rim_knots_lime = makeInstanced(
    "rim_knots_lime",
    rim_knot_geom,
    lime_yarn_mat,
    rim_knot_matrices[3],
    rim_group
  );
  const rim_knots_green = makeInstanced(
    "rim_knots_green",
    rim_knot_geom,
    green_yarn_mat,
    rim_knot_matrices[4],
    rim_group
  );
  const rim_knots_cyan = makeInstanced(
    "rim_knots_cyan",
    rim_knot_geom,
    cyan_yarn_mat,
    rim_knot_matrices[5],
    rim_group
  );
  const rim_knots_blue = makeInstanced(
    "rim_knots_blue",
    rim_knot_geom,
    blue_yarn_mat,
    rim_knot_matrices[6],
    rim_group
  );
  const rim_knots_purple = makeInstanced(
    "rim_knots_purple",
    rim_knot_geom,
    purple_yarn_mat,
    rim_knot_matrices[7],
    rim_group
  );
  const rim_knots_magenta = makeInstanced(
    "rim_knots_magenta",
    rim_knot_geom,
    magenta_yarn_mat,
    rim_knot_matrices[8],
    rim_group
  );

  const yarn_fiber_mat = new THREE.LineBasicMaterial({
    color: 0xffe6c7,
    transparent: true,
    opacity: 0.55
  });
  const yarn_fiber_positions = [];

  for (let i = 0; i < 18; i++) {
    const angle =
      i / 18 * Math.PI * 2 +
      (i % 2 === 0 ? -0.025 : 0.025);
    const radius = 0.638;
    const y = 0.39 + (i % 3) * 0.004;
    const length = 0.025 + (i % 4) * 0.006;
    const tangent_amount = ((i % 3) - 1) * 0.012;

    yarn_fiber_positions.push(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius,
      Math.cos(angle + tangent_amount) * (radius + length),
      y + 0.012 + (i % 2) * 0.006,
      Math.sin(angle + tangent_amount) * (radius + length)
    );
  }

  for (let i = 0; i < 24; i++) {
    const column = i % 12;
    const row = Math.floor(i / 12);
    const angle =
      column / 12 * Math.PI * 2 +
      row * angle_step * 0.45;
    const y = -0.22 + row * 0.22 + (i % 3) * 0.012;
    const radius = 0.594;
    const length = 0.022 + (i % 4) * 0.005;
    const vertical_amount = i % 2 === 0 ? 0.018 : -0.012;

    yarn_fiber_positions.push(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius,
      Math.cos(angle + 0.018) * (radius + length),
      y + vertical_amount,
      Math.sin(angle + 0.018) * (radius + length)
    );
  }

  const yarn_fibers_geom = new THREE.BufferGeometry();
  yarn_fibers_geom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(yarn_fiber_positions, 3)
  );
  const yarn_fibers = new THREE.LineSegments(
    yarn_fibers_geom,
    yarn_fiber_mat
  );
  yarn_fibers.name = "yarn_fibers";
  fibers_group.add(yarn_fibers);

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