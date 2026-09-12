// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rustic_wood_lantern";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const lantern_group = new THREE.Group();
  lantern_group.name = "lantern_group";
  root.add(lantern_group);

  const roof_group = new THREE.Group();
  roof_group.name = "roof_group";
  root.add(roof_group);

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xa8873b,
    metalness: 0.6,
    roughness: 0.5
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x60471f,
    metalness: 0.5,
    roughness: 0.5
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x81796d,
    metalness: 0.0,
    roughness: 0.9
  });
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x746d63,
    metalness: 0.0,
    roughness: 0.9
  });
  const edgeWoodMat = new THREE.MeshStandardMaterial({
    color: 0x9a7651,
    metalness: 0.0,
    roughness: 0.9
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x3f3932,
    metalness: 0.0,
    roughness: 0.9
  });
  const frostedGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xf3dfbd,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide
  });
  const glowMat = new THREE.MeshStandardMaterial({
    color: 0xffd27a,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xffd27a,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.28,
    depthWrite: false
  });
  const lightMat = new THREE.MeshStandardMaterial({
    color: 0xffe3a0,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xffe3a0,
    emissiveIntensity: 1.0
  });
  const hardwareMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  const base_footGeom = new THREE.CylinderGeometry(0.56, 0.56, 0.035, 48);
  const base_foot = new THREE.Mesh(base_footGeom, darkBrassMat);
  base_foot.name = "base_foot";
  base_foot.position.y = 0.018;
  base_group.add(base_foot);

  const base_pedestalProfile = [
    new THREE.Vector2(0.00, 0.035),
    new THREE.Vector2(0.50, 0.035),
    new THREE.Vector2(0.55, 0.055),
    new THREE.Vector2(0.55, 0.080),
    new THREE.Vector2(0.52, 0.110),
    new THREE.Vector2(0.49, 0.160),
    new THREE.Vector2(0.45, 0.220),
    new THREE.Vector2(0.39, 0.280),
    new THREE.Vector2(0.32, 0.330),
    new THREE.Vector2(0.27, 0.360),
    new THREE.Vector2(0.25, 0.390),
    new THREE.Vector2(0.25, 0.440),
    new THREE.Vector2(0.00, 0.440)
  ];
  const base_pedestalGeom = new THREE.LatheGeometry(base_pedestalProfile, 48);
  const base_pedestal = new THREE.Mesh(base_pedestalGeom, brassMat);
  base_pedestal.name = "base_pedestal";
  base_group.add(base_pedestal);

  const base_lower_ringGeom = new THREE.TorusGeometry(0.525, 0.012, 8, 48);
  const base_lower_ring = new THREE.Mesh(base_lower_ringGeom, darkBrassMat);
  base_lower_ring.name = "base_lower_ring";
  base_lower_ring.rotation.x = Math.PI / 2;
  base_lower_ring.position.y = 0.055;
  base_group.add(base_lower_ring);

  const base_neck_ringGeom = new THREE.TorusGeometry(0.252, 0.012, 8, 40);
  const base_neck_ring = new THREE.Mesh(base_neck_ringGeom, darkBrassMat);
  base_neck_ring.name = "base_neck_ring";
  base_neck_ring.rotation.x = Math.PI / 2;
  base_neck_ring.position.y = 0.405;
  base_group.add(base_neck_ring);

  const lantern_mountGeom = new THREE.CylinderGeometry(0.255, 0.255, 0.07, 40);
  const lantern_mount = new THREE.Mesh(lantern_mountGeom, brassMat);
  lantern_mount.name = "lantern_mount";
  lantern_mount.position.y = 0.445;
  base_group.add(lantern_mount);

  const lower_frame_y = 0.50;
  const upper_frame_y = 1.48;
  const post_bottom_y = 0.48;
  const post_top_y = 1.55;
  const post_bottom_x = 0.49;
  const post_top_x = 0.45;
  const post_bottom_z = 0.39;
  const post_top_z = 0.35;

  const lower_long_railGeom = new THREE.BoxGeometry(1.02, 0.13, 0.08);
  const lower_side_railGeom = new THREE.BoxGeometry(0.08, 0.13, 0.80);
  const upper_long_railGeom = new THREE.BoxGeometry(0.94, 0.14, 0.08);
  const upper_side_railGeom = new THREE.BoxGeometry(0.08, 0.14, 0.72);

  const lower_front_rail = new THREE.Mesh(lower_long_railGeom, woodMat);
  lower_front_rail.name = "lower_front_rail";
  lower_front_rail.position.set(0, lower_frame_y, 0.39);
  lantern_group.add(lower_front_rail);

  const lower_back_rail = new THREE.Mesh(lower_long_railGeom, woodMat);
  lower_back_rail.name = "lower_back_rail";
  lower_back_rail.position.set(0, lower_frame_y, -0.39);
  lantern_group.add(lower_back_rail);

  const lower_left_rail = new THREE.Mesh(lower_side_railGeom, woodMat);
  lower_left_rail.name = "lower_left_rail";
  lower_left_rail.position.set(-0.49, lower_frame_y, 0);
  lantern_group.add(lower_left_rail);

  const lower_right_rail = new THREE.Mesh(lower_side_railGeom, woodMat);
  lower_right_rail.name = "lower_right_rail";
  lower_right_rail.position.set(0.49, lower_frame_y, 0);
  lantern_group.add(lower_right_rail);

  const upper_front_rail = new THREE.Mesh(upper_long_railGeom, woodMat);
  upper_front_rail.name = "upper_front_rail";
  upper_front_rail.position.set(0, upper_frame_y, 0.35);
  lantern_group.add(upper_front_rail);

  const upper_back_rail = new THREE.Mesh(upper_long_railGeom, woodMat);
  upper_back_rail.name = "upper_back_rail";
  upper_back_rail.position.set(0, upper_frame_y, -0.35);
  lantern_group.add(upper_back_rail);

  const upper_left_rail = new THREE.Mesh(upper_side_railGeom, woodMat);
  upper_left_rail.name = "upper_left_rail";
  upper_left_rail.position.set(-0.45, upper_frame_y, 0);
  lantern_group.add(upper_left_rail);

  const upper_right_rail = new THREE.Mesh(upper_side_railGeom, woodMat);
  upper_right_rail.name = "upper_right_rail";
  upper_right_rail.position.set(0.45, upper_frame_y, 0);
  lantern_group.add(upper_right_rail);

  const corner_postGeom = new THREE.BoxGeometry(1, 1, 1);
  const corner_posts = new THREE.InstancedMesh(corner_postGeom, woodMat, 4);
  corner_posts.name = "corner_posts";
  const corner_post_signs = [
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, -1]
  ];
  const corner_post_matrix = new THREE.Matrix4();
  const corner_post_quaternion = new THREE.Quaternion();
  const corner_post_scale = new THREE.Vector3();
  const vertical_axis = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < corner_post_signs.length; i++) {
    const sx = corner_post_signs[i][0];
    const sz = corner_post_signs[i][1];
    const bottom = new THREE.Vector3(
      sx * post_bottom_x,
      post_bottom_y,
      sz * post_bottom_z
    );
    const top = new THREE.Vector3(
      sx * post_top_x,
      post_top_y,
      sz * post_top_z
    );
    const midpoint = bottom.clone().add(top).multiplyScalar(0.5);
    const direction = top.clone().sub(bottom);
    const length = direction.length();
    direction.normalize();
    corner_post_quaternion.setFromUnitVectors(vertical_axis, direction);
    corner_post_scale.set(0.085, length, 0.085);
    corner_post_matrix.compose(
      midpoint,
      corner_post_quaternion,
      corner_post_scale
    );
    corner_posts.setMatrixAt(i, corner_post_matrix);
  }
  corner_posts.instanceMatrix.needsUpdate = true;
  lantern_group.add(corner_posts);

  const front_glassGeom = new THREE.BoxGeometry(0.80, 0.86, 0.012);
  const front_glass = new THREE.Mesh(front_glassGeom, frostedGlassMat);
  front_glass.name = "front_glass";
  front_glass.position.set(0, 1.0, 0.36);
  lantern_group.add(front_glass);

  const back_glass = new THREE.Mesh(front_glassGeom, frostedGlassMat);
  back_glass.name = "back_glass";
  back_glass.position.set(0, 1.0, -0.36);
  lantern_group.add(back_glass);

  const side_glassGeom = new THREE.BoxGeometry(0.012, 0.86, 0.64);
  const left_glass = new THREE.Mesh(side_glassGeom, frostedGlassMat);
  left_glass.name = "left_glass";
  left_glass.position.set(-0.46, 1.0, 0);
  lantern_group.add(left_glass);

  const right_glass = new THREE.Mesh(side_glassGeom, frostedGlassMat);
  right_glass.name = "right_glass";
  right_glass.position.set(0.46, 1.0, 0);
  lantern_group.add(right_glass);

  const inner_glowGeom = new THREE.SphereGeometry(0.25, 24, 16);
  const inner_glow = new THREE.Mesh(inner_glowGeom, glowMat);
  inner_glow.name = "inner_glow";
  inner_glow.position.set(0, 0.98, 0);
  inner_glow.scale.set(1.15, 1.35, 1.15);
  lantern_group.add(inner_glow);

  const light_sourceGeom = new THREE.SphereGeometry(0.075, 20, 12);
  const light_source = new THREE.Mesh(light_sourceGeom, lightMat);
  light_source.name = "light_source";
  light_source.position.set(0, 0.98, 0.02);
  lantern_group.add(light_source);

  const front_grain_data = [];
  for (let row = 0; row < 3; row++) {
    for (let i = 0; i < 10; i++) {
      const x = -0.43 + i * 0.095;
      const y = lower_frame_y - 0.035 + row * 0.035;
      const length = 0.055 + (i % 4) * 0.018;
      front_grain_data.push([x, y, 0.433, length, 0, 0]);
    }
    for (let i = 0; i < 9; i++) {
      const x = -0.39 + i * 0.097;
      const y = upper_frame_y - 0.038 + row * 0.035;
      const length = 0.06 + (i % 3) * 0.025;
      front_grain_data.push([x, y, 0.393, length, 0, 0]);
    }
  }

  const front_wood_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const front_wood_grain = new THREE.InstancedMesh(
    front_wood_grainGeom,
    grainMat,
    front_grain_data.length
  );
  front_wood_grain.name = "front_wood_grain";
  const front_grain_matrix = new THREE.Matrix4();
  const identity_quaternion = new THREE.Quaternion();

  for (let i = 0; i < front_grain_data.length; i++) {
    const data = front_grain_data[i];
    front_grain_matrix.compose(
      new THREE.Vector3(data[0], data[1], data[2]),
      identity_quaternion,
      new THREE.Vector3(data[3], 0.004, data[4])
    );
    front_wood_grain.setMatrixAt(i, front_grain_matrix);
  }
  front_wood_grain.instanceMatrix.needsUpdate = true;
  lantern_group.add(front_wood_grain);

  const post_grain_data = [];
  for (let p = 0; p < corner_post_signs.length; p++) {
    const sx = corner_post_signs[p][0];
    const sz = corner_post_signs[p][1];
    for (let strand = 0; strand < 3; strand++) {
      for (let segment = 0; segment < 3; segment++) {
        const t = (segment + 0.5 + strand * 0.12) / 4.1;
        const y = post_bottom_y + (post_top_y - post_bottom_y) * t;
        const x = sx * (
          post_bottom_x + (post_top_x - post_bottom_x) * t
        );
        const z = sz * (
          post_bottom_z + (post_top_z - post_bottom_z) * t
        );
        const offset = (strand - 1) * 0.018;
        const length = 0.13 + ((p + strand + segment) % 3) * 0.035;
        if (sz === 1) {
          post_grain_data.push([
            x + offset,
            y,
            z + 0.045,
            0.004,
            length,
            0.003
          ]);
        } else {
          post_grain_data.push([
            x + sx * 0.045,
            y,
            z + offset,
            0.003,
            length,
            0.004
          ]);
        }
      }
    }
  }

  const post_wood_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const post_wood_grain = new THREE.InstancedMesh(
    post_wood_grainGeom,
    grainMat,
    post_grain_data.length
  );
  post_wood_grain.name = "post_wood_grain";
  const post_grain_matrix = new THREE.Matrix4();

  for (let i = 0; i < post_grain_data.length; i++) {
    const data = post_grain_data[i];
    post_grain_matrix.compose(
      new THREE.Vector3(data[0], data[1], data[2]),
      identity_quaternion,
      new THREE.Vector3(data[3], data[4], data[5])
    );
    post_wood_grain.setMatrixAt(i, post_grain_matrix);
  }
  post_wood_grain.instanceMatrix.needsUpdate = true;
  lantern_group.add(post_wood_grain);

  const hinge_barrelGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.12, 12);
  const hinge_barrels = new THREE.InstancedMesh(
    hinge_barrelGeom,
    hardwareMat,
    2
  );
  hinge_barrels.name = "hinge_barrels";
  const hinge_matrix = new THREE.Matrix4();
  const hinge_heights = [0.68, 1.25];

  for (let i = 0; i < hinge_heights.length; i++) {
    hinge_matrix.compose(
      new THREE.Vector3(-0.445, hinge_heights[i], 0.405),
      identity_quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    hinge_barrels.setMatrixAt(i, hinge_matrix);
  }
  hinge_barrels.instanceMatrix.needsUpdate = true;
  lantern_group.add(hinge_barrels);

  const hinge_leafGeom = new THREE.BoxGeometry(0.045, 0.075, 0.008);
  const hinge_leaves = new THREE.InstancedMesh(hinge_leafGeom, hardwareMat, 2);
  hinge_leaves.name = "hinge_leaves";

  for (let i = 0; i < hinge_heights.length; i++) {
    hinge_matrix.compose(
      new THREE.Vector3(-0.415, hinge_heights[i], 0.397),
      identity_quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    hinge_leaves.setMatrixAt(i, hinge_matrix);
  }
  hinge_leaves.instanceMatrix.needsUpdate = true;
  lantern_group.add(hinge_leaves);

  const door_knob_backplateGeom = new THREE.CylinderGeometry(
    0.047,
    0.047,
    0.014,
    20
  );
  const door_knob_backplate = new THREE.Mesh(
    door_knob_backplateGeom,
    darkBrassMat
  );
  door_knob_backplate.name = "door_knob_backplate";
  door_knob_backplate.rotation.z = Math.PI / 2;
  door_knob_backplate.position.set(0.505, 0.98, 0.20);
  lantern_group.add(door_knob_backplate);

  const door_knob_stemGeom = new THREE.CylinderGeometry(
    0.017,
    0.022,
    0.065,
    16
  );
  const door_knob_stem = new THREE.Mesh(door_knob_stemGeom, darkBrassMat);
  door_knob_stem.name = "door_knob_stem";
  door_knob_stem.rotation.z = Math.PI / 2;
  door_knob_stem.position.set(0.535, 0.98, 0.20);
  lantern_group.add(door_knob_stem);

  const door_knobGeom = new THREE.SphereGeometry(0.052, 20, 14);
  const door_knob = new THREE.Mesh(door_knobGeom, darkBrassMat);
  door_knob.name = "door_knob";
  door_knob.position.set(0.585, 0.98, 0.20);
  lantern_group.add(door_knob);

  const roof_eave_y = 1.56;
  const roof_top_y = 1.82;
  const roof_eave_x = 0.58;
  const roof_eave_z = 0.47;
  const roof_top_x = 0.07;
  const roof_top_z = 0.055;

  const roof_frontGeom = new THREE.BufferGeometry();
  roof_frontGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
      -roof_eave_x, roof_eave_y, roof_eave_z,
       roof_eave_x, roof_eave_y, roof_eave_z,
       roof_top_x, roof_top_y, roof_top_z,
      -roof_top_x, roof_top_y, roof_top_z
    ], 3)
  );
  roof_frontGeom.setIndex([0, 1, 2, 0, 2, 3]);
  roof_frontGeom.computeVertexNormals();

  const roof_front = new THREE.Mesh(roof_frontGeom, roofMat);
  roof_front.name = "roof_front";
  roof_group.add(roof_front);

  const roof_backGeom = new THREE.BufferGeometry();
  roof_backGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
       roof_eave_x, roof_eave_y, -roof_eave_z,
      -roof_eave_x, roof_eave_y, -roof_eave_z,
      -roof_top_x, roof_top_y, -roof_top_z,
       roof_top_x, roof_top_y, -roof_top_z
    ], 3)
  );
  roof_backGeom.setIndex([0, 1, 2, 0, 2, 3]);
  roof_backGeom.computeVertexNormals();

  const roof_back = new THREE.Mesh(roof_backGeom, roofMat);
  roof_back.name = "roof_back";
  roof_group.add(roof_back);

  const roof_leftGeom = new THREE.BufferGeometry();
  roof_leftGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
      -roof_eave_x, roof_eave_y, -roof_eave_z,
      -roof_eave_x, roof_eave_y,  roof_eave_z,
      -roof_top_x, roof_top_y,  roof_top_z,
      -roof_top_x, roof_top_y, -roof_top_z
    ], 3)
  );
  roof_leftGeom.setIndex([0, 1, 2, 0, 2, 3]);
  roof_leftGeom.computeVertexNormals();

  const roof_left = new THREE.Mesh(roof_leftGeom, roofMat);
  roof_left.name = "roof_left";
  roof_group.add(roof_left);

  const roof_rightGeom = new THREE.BufferGeometry();
  roof_rightGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
       roof_eave_x, roof_eave_y,  roof_eave_z,
       roof_eave_x, roof_eave_y, -roof_eave_z,
       roof_top_x, roof_top_y, -roof_top_z,
       roof_top_x, roof_top_y,  roof_top_z
    ], 3)
  );
  roof_rightGeom.setIndex([0, 1, 2, 0, 2, 3]);
  roof_rightGeom.computeVertexNormals();

  const roof_right = new THREE.Mesh(roof_rightGeom, roofMat);
  roof_right.name = "roof_right";
  roof_group.add(roof_right);

  const roof_front_fasciaGeom = new THREE.BoxGeometry(1.18, 0.11, 0.07);
  const roof_front_fascia = new THREE.Mesh(roof_front_fasciaGeom, woodMat);
  roof_front_fascia.name = "roof_front_fascia";
  roof_front_fascia.position.set(0, 1.535, 0.465);
  roof_group.add(roof_front_fascia);

  const roof_back_fascia = new THREE.Mesh(roof_front_fasciaGeom, woodMat);
  roof_back_fascia.name = "roof_back_fascia";
  roof_back_fascia.position.set(0, 1.535, -0.465);
  roof_group.add(roof_back_fascia);

  const roof_side_fasciaGeom = new THREE.BoxGeometry(0.07, 0.11, 0.86);
  const roof_left_fascia = new THREE.Mesh(roof_side_fasciaGeom, woodMat);
  roof_left_fascia.name = "roof_left_fascia";
  roof_left_fascia.position.set(-0.575, 1.535, 0);
  roof_group.add(roof_left_fascia);

  const roof_right_fascia = new THREE.Mesh(roof_side_fasciaGeom, woodMat);
  roof_right_fascia.name = "roof_right_fascia";
  roof_right_fascia.position.set(0.575, 1.535, 0);
  roof_group.add(roof_right_fascia);

  const roof_front_edgeGeom = new THREE.BoxGeometry(1.18, 0.025, 0.075);
  const roof_front_edge = new THREE.Mesh(roof_front_edgeGeom, edgeWoodMat);
  roof_front_edge.name = "roof_front_edge";
  roof_front_edge.position.set(0, 1.482, 0.465);
  roof_group.add(roof_front_edge);

  const roof_back_edge = new THREE.Mesh(roof_front_edgeGeom, edgeWoodMat);
  roof_back_edge.name = "roof_back_edge";
  roof_back_edge.position.set(0, 1.482, -0.465);
  roof_group.add(roof_back_edge);

  const roof_side_edgeGeom = new THREE.BoxGeometry(0.075, 0.025, 0.86);
  const roof_left_edge = new THREE.Mesh(roof_side_edgeGeom, edgeWoodMat);
  roof_left_edge.name = "roof_left_edge";
  roof_left_edge.position.set(-0.575, 1.482, 0);
  roof_group.add(roof_left_edge);

  const roof_right_edge = new THREE.Mesh(roof_side_edgeGeom, edgeWoodMat);
  roof_right_edge.name = "roof_right_edge";
  roof_right_edge.position.set(0.575, 1.482, 0);
  roof_group.add(roof_right_edge);

  const roof_grain_data = [];
  for (let i = 0; i < 7; i++) {
    const y = 1.585 + i * 0.027;
    const t = (y - roof_eave_y) / (roof_top_y - roof_eave_y);
    const z = roof_eave_z + (roof_top_z - roof_eave_z) * t + 0.006;
    const half_width = roof_eave_x + (roof_top_x - roof_eave_x) * t;
    roof_grain_data.push([-0.04, y, z, half_width * 1.72, 0, 0]);
    roof_grain_data.push([0.04, y + 0.008, -z, half_width * 1.62, 0, 0]);

    const x = roof_eave_x + (roof_top_x - roof_eave_x) * t + 0.006;
    const half_depth = roof_eave_z + (roof_top_z - roof_eave_z) * t;
    roof_grain_data.push([x, y, 0.02, 0, half_depth * 1.65, 0]);
    roof_grain_data.push([-x, y + 0.008, -0.02, 0, half_depth * 1.55, 0]);
  }

  const roof_wood_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const roof_wood_grain = new THREE.InstancedMesh(
    roof_wood_grainGeom,
    grainMat,
    roof_grain_data.length
  );
  roof_wood_grain.name = "roof_wood_grain";
  const roof_grain_matrix = new THREE.Matrix4();

  for (let i = 0; i < roof_grain_data.length; i++) {
    const data = roof_grain_data[i];
    roof_grain_matrix.compose(
      new THREE.Vector3(data[0], data[1], data[2]),
      identity_quaternion,
      new THREE.Vector3(data[3], 0.004, data[4])
    );
    roof_wood_grain.setMatrixAt(i, roof_grain_matrix);
  }
  roof_wood_grain.instanceMatrix.needsUpdate = true;
  roof_group.add(roof_wood_grain);

  const roof_top_capGeom = new THREE.BoxGeometry(0.18, 0.045, 0.14);
  const roof_top_cap = new THREE.Mesh(roof_top_capGeom, roofMat);
  roof_top_cap.name = "roof_top_cap";
  roof_top_cap.position.set(0, 1.835, 0);
  roof_group.add(roof_top_cap);

  const roof_knobProfile = [
    new THREE.Vector2(0.00, 0.000),
    new THREE.Vector2(0.095, 0.000),
    new THREE.Vector2(0.135, 0.012),
    new THREE.Vector2(0.150, 0.035),
    new THREE.Vector2(0.145, 0.060),
    new THREE.Vector2(0.115, 0.083),
    new THREE.Vector2(0.055, 0.095),
    new THREE.Vector2(0.000, 0.095)
  ];
  const roof_knobGeom = new THREE.LatheGeometry(roof_knobProfile, 32);
  const roof_knob = new THREE.Mesh(roof_knobGeom, darkBrassMat);
  roof_knob.name = "roof_knob";
  roof_knob.position.y = 1.85;
  roof_group.add(roof_knob);

  function fitToUnitCube(THREE, object) {
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

  fitToUnitCube(THREE, root);
  return root;
}