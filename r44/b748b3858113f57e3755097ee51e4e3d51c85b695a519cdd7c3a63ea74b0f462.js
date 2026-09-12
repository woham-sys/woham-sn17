// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornamental_dragon_bowl";

  const bowl_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x2b100d,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const inner_glazeMat = new THREE.MeshStandardMaterial({
    color: 0x12040506,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const rim_lipMat = new THREE.MeshStandardMaterial({
    color: 0x3a1610,
    metalness: 0.0,
    roughness: 0.4,
  });
  const gold_glazeMat = new THREE.MeshStandardMaterial({
    color: 0xc99a45,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const dark_goldMat = new THREE.MeshStandardMaterial({
    color: 0x765020,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const green_glazeMat = new THREE.MeshStandardMaterial({
    color: 0x416b4b,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const bowl_profile = [
    new THREE.Vector2(0.00, 0.08),
    new THREE.Vector2(0.28, 0.08),
    new THREE.Vector2(0.36, 0.11),
    new THREE.Vector2(0.43, 0.17),
    new THREE.Vector2(0.50, 0.27),
    new THREE.Vector2(0.57, 0.40),
    new THREE.Vector2(0.63, 0.56),
    new THREE.Vector2(0.67, 0.70),
    new THREE.Vector2(0.68, 0.76),
    new THREE.Vector2(0.67, 0.79),
    new THREE.Vector2(0.64, 0.81),
    new THREE.Vector2(0.61, 0.79),
    new THREE.Vector2(0.60, 0.75),
    new THREE.Vector2(0.57, 0.61),
    new THREE.Vector2(0.52, 0.46),
    new THREE.Vector2(0.45, 0.32),
    new THREE.Vector2(0.35, 0.22),
    new THREE.Vector2(0.20, 0.17),
    new THREE.Vector2(0.00, 0.16),
  ];
  const bowl_bodyGeom = new THREE.LatheGeometry(bowl_profile, 96);
  const bowl_body = new THREE.Mesh(bowl_bodyGeom, bowl_bodyMat);
  bowl_body.name = "bowl_body";
  root.add(bowl_body);

  const inner_glaze_profile = [
    new THREE.Vector2(0.00, 0.166),
    new THREE.Vector2(0.20, 0.176),
    new THREE.Vector2(0.35, 0.226),
    new THREE.Vector2(0.45, 0.326),
    new THREE.Vector2(0.52, 0.466),
    new THREE.Vector2(0.57, 0.616),
    new THREE.Vector2(0.60, 0.756),
  ];
  const inner_glazeGeom = new THREE.LatheGeometry(inner_glaze_profile, 96);
  const inner_glaze = new THREE.Mesh(inner_glazeGeom, inner_glazeMat);
  inner_glaze.name = "inner_glaze";
  root.add(inner_glaze);

  const rim_lipGeom = new THREE.TorusGeometry(0.645, 0.027, 16, 96);
  const rim_lip = new THREE.Mesh(rim_lipGeom, rim_lipMat);
  rim_lip.name = "rim_lip";
  rim_lip.rotation.x = Math.PI / 2;
  rim_lip.position.y = 0.775;
  root.add(rim_lip);

  const rim_gold_inlayGeom = new THREE.TorusGeometry(0.654, 0.006, 8, 96);
  const rim_gold_inlay = new THREE.Mesh(rim_gold_inlayGeom, gold_glazeMat);
  rim_gold_inlay.name = "rim_gold_inlay";
  rim_gold_inlay.rotation.x = Math.PI / 2;
  rim_gold_inlay.position.y = 0.744;
  root.add(rim_gold_inlay);

  const foot_baseGeom = new THREE.CylinderGeometry(0.34, 0.30, 0.075, 64);
  const foot_base = new THREE.Mesh(foot_baseGeom, inner_glazeMat);
  foot_base.name = "foot_base";
  foot_base.position.y = 0.045;
  root.add(foot_base);

  const foot_ringGeom = new THREE.TorusGeometry(0.305, 0.022, 12, 64);
  const foot_ring = new THREE.Mesh(foot_ringGeom, rim_lipMat);
  foot_ring.name = "foot_ring";
  foot_ring.rotation.x = Math.PI / 2;
  foot_ring.position.y = 0.018;
  root.add(foot_ring);

  const outer_radius_samples = [
    [0.08, 0.28],
    [0.11, 0.36],
    [0.17, 0.43],
    [0.27, 0.50],
    [0.40, 0.57],
    [0.56, 0.63],
    [0.70, 0.67],
    [0.76, 0.68],
  ];

  function bowlRadiusAt(y) {
    if (y <= outer_radius_samples[0][0]) return outer_radius_samples[0][1];
    for (let i = 1; i < outer_radius_samples.length; i++) {
      const previous = outer_radius_samples[i - 1];
      const current = outer_radius_samples[i];
      if (y <= current[0]) {
        const t = (y - previous[0]) / (current[0] - previous[0]);
        return previous[1] + (current[1] - previous[1]) * t;
      }
    }
    return outer_radius_samples[outer_radius_samples.length - 1][1];
  }

  function surfacePoint(angle, y, extra) {
    const radius = bowlRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function surfaceQuaternion(angle) {
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    return new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
  }

  function addSurfaceTube(parent, name, controls, radius, material, extra) {
    const points = [];
    for (let i = 0; i < controls.length; i++) {
      points.push(surfacePoint(controls[i][0], controls[i][1], extra));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(12, controls.length * 6),
      radius,
      6,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  function addSurfaceDisc(parent, name, angle, y, sx, sy, rotation, material, extra) {
    const geometry = new THREE.CircleGeometry(1, 24);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.copy(surfacePoint(angle, y, extra));
    mesh.quaternion.copy(surfaceQuaternion(angle));
    mesh.rotateZ(rotation);
    mesh.scale.set(sx, sy, 1);
    parent.add(mesh);
    return mesh;
  }

  const dragon_eyeGeom = new THREE.CircleGeometry(1, 16);

  function createSurfaceDragon(name, centerAngle, centerY, scale, flip) {
    const dragon = new THREE.Group();
    dragon.name = name;

    function dragonPoint(fraction, vertical) {
      const angle = centerAngle + flip * (fraction * 0.52);
      const y = centerY +
        scale * (vertical + Math.sin(fraction * Math.PI * 2) * 0.035);
      return { angle, y };
    }

    const body_controls = [];
    for (let i = 0; i <= 18; i++) {
      const fraction = -0.82 + (i / 18) * 1.64;
      body_controls.push([
        dragonPoint(fraction, -0.015).angle,
        dragonPoint(fraction, -0.015).y,
      ]);
    }

    const dragon_body = addSurfaceTube(
      dragon,
      name + "_body",
      body_controls,
      0.010 * scale,
      gold_glazeMat,
      0.009
    );

    const dragon_belly_line = addSurfaceTube(
      dragon,
      name + "_belly_line",
      body_controls,
      0.0032 * scale,
      dark_goldMat,
      0.019
    );

    const head_fraction = 0.84;
    const head_position = dragonPoint(head_fraction, 0.045);

    const dragon_head = addSurfaceDisc(
      dragon,
      name + "_head",
      head_position.angle,
      head_position.y,
      0.047 * scale,
      0.034 * scale,
      flip * 0.12,
      gold_glazeMat,
      0.012
    );

    const dragon_snout = addSurfaceDisc(
      dragon,
      name + "_snout",
      head_position.angle + flip * 0.045,
      head_position.y - 0.004 * scale,
      0.031 * scale,
      0.016 * scale,
      flip * 0.08,
      gold_glazeMat,
      0.013
    );

    const dragon_eye = new THREE.Mesh(dragon_eyeGeom, dark_goldMat);
    dragon_eye.name = name + "_eye";
    dragon_eye.position.copy(
      surfacePoint(
        head_position.angle + flip * 0.020,
        head_position.y + 0.013 * scale,
        0.021
      )
    );
    dragon_eye.quaternion.copy(
      surfaceQuaternion(head_position.angle + flip * 0.020)
    );
    dragon_eye.scale.setScalar(0.0065 * scale);
    dragon.add(dragon_eye);

    const dragon_mouth = addSurfaceTube(
      dragon,
      name + "_mouth",
      [
        [
          head_position.angle + flip * 0.015,
          head_position.y - 0.008 * scale,
        ],
        [
          head_position.angle + flip * 0.075,
          head_position.y - 0.018 * scale,
        ],
        [
          head_position.angle + flip * 0.125,
          head_position.y - 0.004 * scale,
        ],
      ],
      0.0028 * scale,
      dark_goldMat,
      0.020
    );

    const dragon_horn_upper = addSurfaceTube(
      dragon,
      name + "_horn_upper",
      [
        [
          head_position.angle - flip * 0.015,
          head_position.y + 0.020 * scale,
        ],
        [
          head_position.angle - flip * 0.045,
          head_position.y + 0.070 * scale,
        ],
        [
          head_position.angle - flip * 0.095,
          head_position.y + 0.082 * scale,
        ],
      ],
      0.0035 * scale,
      gold_glazeMat,
      0.012
    );

    const dragon_horn_lower = addSurfaceTube(
      dragon,
      name + "_horn_lower",
      [
        [
          head_position.angle + flip * 0.005,
          head_position.y + 0.020 * scale,
        ],
        [
          head_position.angle + flip * 0.030,
          head_position.y + 0.065 * scale,
        ],
        [
          head_position.angle + flip * 0.075,
          head_position.y + 0.068 * scale,
        ],
      ],
      0.0032 * scale,
      gold_glazeMat,
      0.012
    );

    const dragon_whisker_upper = addSurfaceTube(
      dragon,
      name + "_whisker_upper",
      [
        [
          head_position.angle + flip * 0.070,
          head_position.y + 0.010 * scale,
        ],
        [
          head_position.angle + flip * 0.145,
          head_position.y + 0.045 * scale,
        ],
        [
          head_position.angle + flip * 0.220,
          head_position.y + 0.030 * scale,
        ],
      ],
      0.0025 * scale,
      gold_glazeMat,
      0.013
    );

    const dragon_whisker_lower = addSurfaceTube(
      dragon,
      name + "_whisker_lower",
      [
        [
          head_position.angle + flip * 0.070,
          head_position.y - 0.008 * scale,
        ],
        [
          head_position.angle + flip * 0.150,
          head_position.y - 0.040 * scale,
        ],
        [
          head_position.angle + flip * 0.225,
          head_position.y - 0.018 * scale,
        ],
      ],
      0.0025 * scale,
      gold_glazeMat,
      0.013
    );

    const dragon_mane = new THREE.Group();
    dragon_mane.name = name + "_mane";
    dragon.add(dragon_mane);
    for (let i = 0; i < 6; i++) {
      const offset = (i - 2.5) * 0.018;
      addSurfaceTube(
        dragon_mane,
        name + "_mane_strand_" + i,
        [
          [
            head_position.angle - flip * 0.030,
            head_position.y + offset * scale,
          ],
          [
            head_position.angle - flip * (0.085 + Math.abs(offset) * 0.25),
            head_position.y + offset * scale * 1.55,
          ],
          [
            head_position.angle - flip * (0.135 + Math.abs(offset) * 0.18),
            head_position.y + offset * scale * 1.85,
          ],
        ],
        0.0032 * scale,
        gold_glazeMat,
        0.012
      );
    }

    const dragon_wing = new THREE.Group();
    dragon_wing.name = name + "_wing";
    dragon.add(dragon_wing);
    const wing_base_angle = centerAngle - flip * 0.18;
    const wing_base_y = centerY + 0.025;
    for (let i = 0; i < 5; i++) {
      const rise = i * 0.022;
      addSurfaceTube(
        dragon_wing,
        name + "_wing_strand_" + i,
        [
          [wing_base_angle, wing_base_y],
          [
            wing_base_angle - flip * 0.095,
            wing_base_y + rise * scale + 0.025,
          ],
          [
            wing_base_angle - flip * (0.205 + i * 0.012),
            wing_base_y + rise * scale * 1.65 + 0.045,
          ],
        ],
        0.0034 * scale,
        gold_glazeMat,
        0.012
      );
    }

    const dragon_limbs = new THREE.Group();
    dragon_limbs.name = name + "_limbs";
    dragon.add(dragon_limbs);
    const limb_fractions = [-0.50, -0.16, 0.20, 0.50];
    for (let i = 0; i < limb_fractions.length; i++) {
      const fraction = limb_fractions[i];
      const limb_position = dragonPoint(fraction, 0.005);
      const direction = i % 2 === 0 ? 1 : -1;
      addSurfaceTube(
        dragon_limbs,
        name + "_limb_" + i,
        [
          [limb_position.angle, limb_position.y],
          [
            limb_position.angle + flip * direction * 0.035,
            limb_position.y + direction * 0.045 * scale,
          ],
          [
            limb_position.angle + flip * direction * 0.085,
            limb_position.y + direction * 0.060 * scale,
          ],
        ],
        0.0038 * scale,
        gold_glazeMat,
        0.012
      );
    }

    const scale_marks = new THREE.InstancedMesh(
      dragon_eyeGeom,
      dark_goldMat,
      18
    );
    scale_marks.name = name + "_scale_marks";
    const scale_dummy = new THREE.Object3D();
    for (let i = 0; i < 18; i++) {
      const fraction = -0.68 + (i / 17) * 1.36;
      const position = dragonPoint(
        fraction,
        0.006 + (i % 2 === 0 ? 0.010 : -0.006)
      );
      scale_dummy.position.copy(surfacePoint(position.angle, position.y, 0.021));
      scale_dummy.quaternion.copy(surfaceQuaternion(position.angle));
      scale_dummy.rotateZ(flip * fraction * 0.55);
      scale_dummy.scale.set(
        0.009 * scale,
        0.0055 * scale,
        1
      );
      scale_dummy.updateMatrix();
      scale_marks.setMatrixAt(i, scale_dummy.matrix);
    }
    scale_marks.instanceMatrix.needsUpdate = true;
    dragon.add(scale_marks);

    return dragon;
  }

  const central_dragon = createSurfaceDragon(
    "central_dragon",
    Math.PI / 2,
    0.455,
    1.12,
    -1
  );
  root.add(central_dragon);

  const left_dragon = createSurfaceDragon(
    "left_dragon",
    2.43,
    0.475,
    0.82,
    1
  );
  root.add(left_dragon);

  const right_dragon = createSurfaceDragon(
    "right_dragon",
    0.71,
    0.475,
    0.82,
    -1
  );
  root.add(right_dragon);

  const lower_left_dragon = createSurfaceDragon(
    "lower_left_dragon",
    2.03,
    0.275,
    0.64,
    -1
  );
  root.add(lower_left_dragon);

  const lower_right_dragon = createSurfaceDragon(
    "lower_right_dragon",
    1.11,
    0.275,
    0.64,
    1
  );
  root.add(lower_right_dragon);

  const cloud_ornaments = new THREE.Group();
  cloud_ornaments.name = "cloud_ornaments";
  root.add(cloud_ornaments);

  const cloud_centers = [
    [2.78, 0.335],
    [1.82, 0.315],
    [0.36, 0.335],
    [2.98, 0.565],
    [0.16, 0.565],
  ];
  for (let i = 0; i < cloud_centers.length; i++) {
    const center = cloud_centers[i];
    const cloud_loop = addSurfaceTube(
      cloud_ornaments,
      "cloud_loop_" + i,
      [
        [center[0] - 0.085, center[1]],
        [center[0] - 0.055, center[1] + 0.035],
        [center[0] + 0.005, center[1] + 0.025],
        [center[0] + 0.045, center[1] + 0.055],
        [center[0] + 0.095, center[1] + 0.015],
      ],
      0.004,
      gold_glazeMat,
      0.011
    );
    cloud_loop.name = "cloud_loop_" + i;
  }

  const leaf_shape = new THREE.Shape();
  leaf_shape.moveTo(-1.0, 0.0);
  leaf_shape.bezierCurveTo(-0.35, 0.55, 0.55, 0.48, 1.0, 0.0);
  leaf_shape.bezierCurveTo(0.55, -0.48, -0.35, -0.55, -1.0, 0.0);
  const green_leavesGeom = new THREE.ShapeGeometry(leaf_shape);
  const leaf_data = [
    [2.82, 0.395, 0.55, 0.026, 0.012],
    [2.72, 0.425, -0.65, 0.024, 0.011],
    [2.62, 0.375, 1.10, 0.022, 0.010],
    [0.32, 0.395, -0.55, 0.026, 0.012],
    [0.42, 0.425, 0.65, 0.024, 0.011],
    [0.52, 0.375, -1.10, 0.022, 0.010],
    [1.92, 0.245, 0.35, 0.024, 0.011],
    [1.82, 0.225, -0.70, 0.022, 0.010],
    [1.28, 0.245, -0.35, 0.024, 0.011],
    [1.38, 0.225, 0.70, 0.022, 0.010],
    [3.02, 0.515, 0.90, 0.020, 0.009],
    [0.12, 0.515, -0.90, 0.020, 0.009],
  ];
  const green_leaves = new THREE.InstancedMesh(
    green_leavesGeom,
    green_glazeMat,
    leaf_data.length
  );
  green_leaves.name = "green_leaves";
  const leaf_dummy = new THREE.Object3D();
  for (let i = 0; i < leaf_data.length; i++) {
    const data = leaf_data[i];
    leaf_dummy.position.copy(surfacePoint(data[0], data[1], 0.014));
    leaf_dummy.quaternion.copy(surfaceQuaternion(data[0]));
    leaf_dummy.rotateZ(data[2]);
    leaf_dummy.scale.set(data[3], data[4], 1);
    leaf_dummy.updateMatrix();
    green_leaves.setMatrixAt(i, leaf_dummy.matrix);
  }
  green_leaves.instanceMatrix.needsUpdate = true;
  root.add(green_leaves);

  const leaf_stems = new THREE.Group();
  leaf_stems.name = "leaf_stems";
  root.add(leaf_stems);
  const stem_data = [
    [2.86, 0.355, 2.62, 0.425],
    [0.28, 0.355, 0.52, 0.425],
    [1.76, 0.205, 1.96, 0.265],
    [1.44, 0.205, 1.24, 0.265],
  ];
  for (let i = 0; i < stem_data.length; i++) {
    const data = stem_data[i];
    addSurfaceTube(
      leaf_stems,
      "leaf_stem_" + i,
      [
        [data[0], data[1]],
        [(data[0] + data[2]) * 0.5, (data[1] + data[3]) * 0.5 + 0.01],
        [data[2], data[3]],
      ],
      0.0025,
      green_glazeMat,
      0.012
    );
  }

  fitToUnitCube(THREE, root);
  return root;

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
}