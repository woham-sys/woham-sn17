function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "gilded_floral_vase";

  const vase_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xb98a3d,
    metalness: 0.65,
    roughness: 0.32,
    side: THREE.DoubleSide,
  });
  const inner_bowlMat = new THREE.MeshStandardMaterial({
    color: 0x765126,
    metalness: 0.55,
    roughness: 0.42,
    side: THREE.DoubleSide,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xd0a54f,
    metalness: 0.7,
    roughness: 0.24,
  });
  const reliefMat = new THREE.MeshStandardMaterial({
    color: 0xc99b45,
    metalness: 0.68,
    roughness: 0.28,
  });
  const relief_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xe0b967,
    metalness: 0.62,
    roughness: 0.25,
  });
  const engravedMat = new THREE.MeshStandardMaterial({
    color: 0x4b341c,
    metalness: 0.25,
    roughness: 0.65,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x3f3120,
    metalness: 0.15,
    roughness: 0.85,
    side: THREE.DoubleSide,
  });

  const vase_bodyProfile = [
    new THREE.Vector2(0.00, -0.66),
    new THREE.Vector2(0.22, -0.66),
    new THREE.Vector2(0.27, -0.61),
    new THREE.Vector2(0.31, -0.52),
    new THREE.Vector2(0.36, -0.39),
    new THREE.Vector2(0.40, -0.18),
    new THREE.Vector2(0.41, 0.04),
    new THREE.Vector2(0.39, 0.20),
    new THREE.Vector2(0.34, 0.34),
    new THREE.Vector2(0.30, 0.47),
    new THREE.Vector2(0.32, 0.57),
    new THREE.Vector2(0.39, 0.68),
    new THREE.Vector2(0.46, 0.73),
    new THREE.Vector2(0.48, 0.76),
    new THREE.Vector2(0.46, 0.79),
    new THREE.Vector2(0.40, 0.80),
    new THREE.Vector2(0.37, 0.77),
    new THREE.Vector2(0.35, 0.69),
    new THREE.Vector2(0.31, 0.56),
    new THREE.Vector2(0.29, 0.45),
    new THREE.Vector2(0.31, 0.31),
    new THREE.Vector2(0.35, 0.12),
    new THREE.Vector2(0.35, -0.12),
    new THREE.Vector2(0.32, -0.34),
    new THREE.Vector2(0.27, -0.50),
    new THREE.Vector2(0.20, -0.58),
    new THREE.Vector2(0.00, -0.58),
  ];
  const vase_bodyGeom = new THREE.LatheGeometry(vase_bodyProfile, 72);
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  vase_body.name = "vase_body";
  root.add(vase_body);

  const inner_bowlProfile = [
    new THREE.Vector2(0.00, -0.565),
    new THREE.Vector2(0.19, -0.565),
    new THREE.Vector2(0.28, -0.48),
    new THREE.Vector2(0.32, -0.31),
    new THREE.Vector2(0.345, -0.08),
    new THREE.Vector2(0.34, 0.18),
    new THREE.Vector2(0.30, 0.36),
    new THREE.Vector2(0.285, 0.50),
    new THREE.Vector2(0.31, 0.62),
    new THREE.Vector2(0.37, 0.735),
  ];
  const inner_bowlGeom = new THREE.LatheGeometry(inner_bowlProfile, 72);
  const inner_bowl = new THREE.Mesh(inner_bowlGeom, inner_bowlMat);
  inner_bowl.name = "inner_bowl";
  root.add(inner_bowl);

  const top_rimGeom = new THREE.TorusGeometry(0.445, 0.035, 16, 72);
  const top_rim = new THREE.Mesh(top_rimGeom, rimMat);
  top_rim.name = "top_rim";
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 0.765;
  root.add(top_rim);

  const inner_lip_shadowGeom = new THREE.TorusGeometry(0.392, 0.007, 8, 72);
  const inner_lip_shadow = new THREE.Mesh(inner_lip_shadowGeom, engravedMat);
  inner_lip_shadow.name = "inner_lip_shadow";
  inner_lip_shadow.rotation.x = Math.PI / 2;
  inner_lip_shadow.position.y = 0.747;
  root.add(inner_lip_shadow);

  const foot_baseProfile = [
    new THREE.Vector2(0.00, -0.84),
    new THREE.Vector2(0.30, -0.84),
    new THREE.Vector2(0.34, -0.82),
    new THREE.Vector2(0.36, -0.78),
    new THREE.Vector2(0.35, -0.74),
    new THREE.Vector2(0.31, -0.70),
    new THREE.Vector2(0.27, -0.67),
    new THREE.Vector2(0.23, -0.64),
    new THREE.Vector2(0.00, -0.64),
  ];
  const foot_baseGeom = new THREE.LatheGeometry(foot_baseProfile, 72);
  const foot_base = new THREE.Mesh(foot_baseGeom, vase_bodyMat);
  foot_base.name = "foot_base";
  root.add(foot_base);

  const foot_lower_ringGeom = new THREE.TorusGeometry(0.327, 0.012, 10, 72);
  const foot_lower_ring = new THREE.Mesh(foot_lower_ringGeom, rimMat);
  foot_lower_ring.name = "foot_lower_ring";
  foot_lower_ring.rotation.x = Math.PI / 2;
  foot_lower_ring.position.y = -0.805;
  root.add(foot_lower_ring);

  const foot_upper_ringGeom = new THREE.TorusGeometry(0.255, 0.011, 10, 72);
  const foot_upper_ring = new THREE.Mesh(foot_upper_ringGeom, rimMat);
  foot_upper_ring.name = "foot_upper_ring";
  foot_upper_ring.rotation.x = Math.PI / 2;
  foot_upper_ring.position.y = -0.655;
  root.add(foot_upper_ring);

  const foot_grooveGeom = new THREE.TorusGeometry(0.286, 0.004, 6, 72);
  const foot_groove = new THREE.Mesh(foot_grooveGeom, engravedMat);
  foot_groove.name = "foot_groove";
  foot_groove.rotation.x = Math.PI / 2;
  foot_groove.position.y = -0.695;
  root.add(foot_groove);

  const radius_samples = [
    [-0.66, 0.22],
    [-0.52, 0.31],
    [-0.39, 0.36],
    [-0.18, 0.40],
    [0.04, 0.41],
    [0.20, 0.39],
    [0.34, 0.34],
    [0.47, 0.30],
    [0.57, 0.32],
    [0.68, 0.39],
    [0.76, 0.47],
  ];

  function bodyRadiusAt(y) {
    if (y <= radius_samples[0][0]) return radius_samples[0][1];
    for (let i = 1; i < radius_samples.length; i++) {
      const previous = radius_samples[i - 1];
      const current = radius_samples[i];
      if (y <= current[0]) {
        const t = (y - previous[0]) / (current[0] - previous[0]);
        return previous[1] + (current[1] - previous[1]) * t;
      }
    }
    return radius_samples[radius_samples.length - 1][1];
  }

  function surfacePoint(angle, y, extra) {
    const radius = bodyRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.sin(angle) * radius,
      y,
      Math.cos(angle) * radius
    );
  }

  function surfacePose(angle, y, extra) {
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    const position = surfacePoint(angle, y, extra);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  function createSurfaceVine(name, controls) {
    const points = [];
    for (let i = 0; i < controls.length; i++) {
      points.push(surfacePoint(controls[i][0], controls[i][1], 0.011));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(curve, 32, 0.006, 7, false);
    const vine = new THREE.Mesh(geometry, engravedMat);
    vine.name = name;
    root.add(vine);
    return vine;
  }

  const central_stem = createSurfaceVine("central_stem", [
    [0.02, -0.48],
    [0.00, -0.31],
    [-0.01, -0.13],
    [-0.02, 0.06],
    [-0.03, 0.25],
  ]);
  const right_branch = createSurfaceVine("right_branch", [
    [-0.01, -0.18],
    [0.10, -0.08],
    [0.23, 0.04],
    [0.36, 0.17],
  ]);
  const left_branch = createSurfaceVine("left_branch", [
    [0.00, -0.27],
    [-0.14, -0.18],
    [-0.29, -0.08],
    [-0.43, 0.02],
  ]);
  const upper_right_branch = createSurfaceVine("upper_right_branch", [
    [-0.02, 0.13],
    [0.09, 0.23],
    [0.20, 0.32],
    [0.31, 0.40],
  ]);
  const lower_curl = createSurfaceVine("lower_curl", [
    [0.02, -0.47],
    [0.11, -0.39],
    [0.20, -0.32],
    [0.17, -0.25],
  ]);

  const petalShape = new THREE.Shape();
  petalShape.moveTo(0.00, -0.50);
  petalShape.bezierCurveTo(-0.43, -0.43, -0.58, 0.12, -0.30, 0.43);
  petalShape.bezierCurveTo(-0.16, 0.59, 0.16, 0.59, 0.30, 0.43);
  petalShape.bezierCurveTo(0.58, 0.12, 0.43, -0.43, 0.00, -0.50);
  petalShape.closePath();

  const rose_petalsGeom = new THREE.ExtrudeGeometry(petalShape, 8);
  const rose_specs = [
    [-0.03, 0.18, 0.18, 0.10],
    [-0.40, -0.08, 0.15, 0.12],
    [0.38, 0.06, 0.15, 0.12],
    [0.02, -0.31, 0.145, 0.10],
    [-0.72, 0.16, 0.13, 0.09],
    [0.72, 0.18, 0.13, 0.09],
    [-0.82, -0.13, 0.115, 0.08],
    [0.82, -0.12, 0.115, 0.08],
  ];

  const petal_layers = [
    { count: 7, length: 1.00, width: 0.92, ring: 0.42, z: 0.000, tilt: 0.12 },
    { count: 5, length: 0.72, width: 0.78, ring: 0.24, z: 0.012, tilt: 0.22 },
    { count: 4, length: 0.48, width: 0.62, ring: 0.10, z: 0.024, tilt: 0.34 },
  ];

  let rose_petal_count = 0;
  for (let r = 0; r < rose_specs.length; r++) {
    for (let l = 0; l < petal_layers.length; l++) {
      rose_petal_count += petal_layers[l].count;
    }
  }

  const rose_petal_outlines = new THREE.InstancedMesh(
    rose_petalsGeom,
    engravedMat,
    rose_petal_count
  );
  rose_petal_outlines.name = "rose_petal_outlines";

  const rose_petals = new THREE.InstancedMesh(
    rose_petalsGeom,
    reliefMat,
    rose_petal_count
  );
  rose_petals.name = "rose_petals";

  const rose_petal_highlights = new THREE.InstancedMesh(
    rose_petalsGeom,
    relief_highlightMat,
    rose_petal_count
  );
  rose_petal_highlights.name = "rose_petal_highlights";

  const dummy = new THREE.Object3D();
  const local_z_axis = new THREE.Vector3(0, 0, 1);
  let petal_index = 0;

  function setPetalInstance(mesh, sizeFactor, extra) {
    const pose = surfacePose(dummy.position.x, dummy.position.y, extra);
    const tilt = new THREE.Quaternion().setFromAxisAngle(
      local_z_axis,
      dummy.rotation.z
    );
    dummy.quaternion.copy(pose.quaternion).multiply(tilt);
    dummy.scale.setScalar(sizeFactor);
    dummy.updateMatrix();
    mesh.setMatrixAt(petal_index, dummy.matrix);
  }

  for (let r = 0; r < rose_specs.length; r++) {
    const rose_spec = rose_specs[r];
    const center_angle = rose_spec[0];
    const center_y = rose_spec[1];
    const size = rose_spec[2];
    const phase = rose_spec[3];

    for (let layer_index = 0; layer_index < petal_layers.length; layer_index++) {
      const layer = petal_layers[layer_index];
      const offset = layer.ring * size;

      for (let p = 0; p < layer.count; p++) {
        const angle = phase + p / layer.count * Math.PI * 2;
        const local_x = Math.cos(angle) * offset;
        const local_y = Math.sin(angle) * offset;
        const y = center_y + local_y;
        const surface_angle = center_angle + local_x / bodyRadiusAt(y);
        const rotation = angle - Math.PI / 2;

        dummy.position.set(
          Math.sin(surface_angle) * (bodyRadiusAt(y) + 0.004),
          y,
          Math.cos(surface_angle) * (bodyRadiusAt(y) + 0.004)
        );
        dummy.rotation.set(0, surface_angle, rotation);
        setPetalInstance(
          rose_petal_outlines,
          size * layer.length * 1.13,
          0.004 + layer.z
        );

        dummy.rotation.set(0, surface_angle, rotation);
        setPetalInstance(
          rose_petals,
          size * layer.length,
          0.009 + layer.z
        );

        dummy.rotation.set(0, surface_angle, rotation);
        setPetalInstance(
          rose_petal_highlights,
          size * layer.length * 0.78,
          0.017 + layer.z
        );

        petal_index++;
      }
    }
  }

  rose_petal_outlines.instanceMatrix.needsUpdate = true;
  rose_petals.instanceMatrix.needsUpdate = true;
  rose_petal_highlights.instanceMatrix.needsUpdate = true;
  root.add(rose_petal_outlines, rose_petals, rose_petal_highlights);

  const rose_centersGeom = new THREE.SphereGeometry(1, 20, 12);
  const rose_centers = new THREE.InstancedMesh(
    rose_centersGeom,
    relief_highlightMat,
    rose_specs.length
  );
  rose_centers.name = "rose_centers";

  for (let i = 0; i < rose_specs.length; i++) {
    const spec = rose_specs[i];
    const pose = surfacePose(spec[0], spec[1], 0.038);
    dummy.position.copy(pose.position);
    dummy.quaternion.copy(pose.quaternion);
    dummy.scale.set(spec[2] * 0.16, spec[2] * 0.16, 0.014);
    dummy.updateMatrix();
    rose_centers.setMatrixAt(i, dummy.matrix);
  }
  rose_centers.instanceMatrix.needsUpdate = true;
  root.add(rose_centers);

  const spiral_points = [];
  for (let i = 0; i <= 28; i++) {
    const t = i / 28;
    const angle = t * Math.PI * 4.5;
    const radius = 1 - t * 0.82;
    spiral_points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      )
    );
  }
  const rose_spiralsGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(spiral_points, false, "centripetal"),
    40,
    0.055,
    6,
    false
  );
  const rose_spirals = new THREE.InstancedMesh(
    rose_spiralsGeom,
    engravedMat,
    rose_specs.length
  );
  rose_spirals.name = "rose_spirals";

  for (let i = 0; i < rose_specs.length; i++) {
    const spec = rose_specs[i];
    const pose = surfacePose(spec[0], spec[1], 0.052);
    dummy.position.copy(pose.position);
    dummy.quaternion.copy(pose.quaternion);
    dummy.scale.set(spec[2] * 0.30, spec[2] * 0.30, spec[2] * 0.30);
    dummy.updateMatrix();
    rose_spirals.setMatrixAt(i, dummy.matrix);
  }
  rose_spirals.instanceMatrix.needsUpdate = true;
  root.add(rose_spirals);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0.00, -0.50);
  leafShape.lineTo(0.18, -0.38);
  leafShape.lineTo(0.13, -0.29);
  leafShape.lineTo(0.31, -0.20);
  leafShape.lineTo(0.20, -0.11);
  leafShape.lineTo(0.38, 0.00);
  leafShape.lineTo(0.22, 0.09);
  leafShape.lineTo(0.34, 0.20);
  leafShape.lineTo(0.17, 0.28);
  leafShape.lineTo(0.20, 0.39);
  leafShape.lineTo(0.00, 0.52);
  leafShape.lineTo(-0.20, 0.39);
  leafShape.lineTo(-0.17, 0.28);
  leafShape.lineTo(-0.34, 0.20);
  leafShape.lineTo(-0.22, 0.09);
  leafShape.lineTo(-0.38, 0.00);
  leafShape.lineTo(-0.20, -0.11);
  leafShape.lineTo(-0.31, -0.20);
  leafShape.lineTo(-0.13, -0.29);
  leafShape.lineTo(-0.18, -0.38);
  leafShape.closePath();

  const engraved_leavesGeom = new THREE.ExtrudeGeometry(leafShape, 6);
  const leaf_specs = [
    [0.28, 0.36, 0.15, 0.13, -0.75],
    [0.43, 0.31, 0.13, 0.11, 0.65],
    [0.34, -0.34, 0.16, 0.13, -0.70],
    [0.17, -0.43, 0.15, 0.12, 0.85],
    [-0.38, -0.36, 0.16, 0.13, 0.65],
    [-0.52, -0.25, 0.13, 0.11, -0.80],
    [0.52, -0.23, 0.13, 0.11, 0.75],
    [-0.25, 0.34, 0.13, 0.11, 0.70],
    [0.62, 0.28, 0.12, 0.10, -0.65],
    [-0.65, 0.28, 0.12, 0.10, 0.65],
  ];

  const engraved_leaf_outlines = new THREE.InstancedMesh(
    engraved_leavesGeom,
    engravedMat,
    leaf_specs.length
  );
  engraved_leaf_outlines.name = "engraved_leaf_outlines";

  const raised_leaves = new THREE.InstancedMesh(
    engraved_leavesGeom,
    reliefMat,
    leaf_specs.length
  );
  raised_leaves.name = "raised_leaves";

  for (let i = 0; i < leaf_specs.length; i++) {
    const spec = leaf_specs[i];
    const pose = surfacePose(spec[0], spec[1], 0.005);
    const tilt = new THREE.Quaternion().setFromAxisAngle(local_z_axis, spec[4]);

    dummy.position.copy(pose.position);
    dummy.quaternion.copy(pose.quaternion).multiply(tilt);
    dummy.scale.set(spec[3] * 1.12, spec[2] * 1.10, 0.025);
    dummy.updateMatrix();
    engraved_leaf_outlines.setMatrixAt(i, dummy.matrix);

    const raised_pose = surfacePose(spec[0], spec[1], 0.010);
    dummy.position.copy(raised_pose.position);
    dummy.quaternion.copy(raised_pose.quaternion).multiply(tilt);
    dummy.scale.set(spec[3], spec[2], 0.025);
    dummy.updateMatrix();
    raised_leaves.setMatrixAt(i, dummy.matrix);
  }
  engraved_leaf_outlines.instanceMatrix.needsUpdate = true;
  raised_leaves.instanceMatrix.needsUpdate = true;
  root.add(engraved_leaf_outlines, raised_leaves);

  const leaf_veinsGeom = new THREE.BoxGeometry(0.006, 1, 0.004);
  const leaf_veins = new THREE.InstancedMesh(
    leaf_veinsGeom,
    engravedMat,
    leaf_specs.length * 5
  );
  leaf_veins.name = "leaf_veins";

  let vein_index = 0;
  for (let i = 0; i < leaf_specs.length; i++) {
    const spec = leaf_specs[i];
    const pose = surfacePose(spec[0], spec[1], 0.039);
    const tilt = new THREE.Quaternion().setFromAxisAngle(local_z_axis, spec[4]);
    const base_quaternion = pose.quaternion.clone().multiply(tilt);

    dummy.position.copy(pose.position);
    dummy.quaternion.copy(base_quaternion);
    dummy.scale.set(1, spec[2] * 0.76, 1);
    dummy.updateMatrix();
    leaf_veins.setMatrixAt(vein_index++, dummy.matrix);

    for (let j = 0; j < 2; j++) {
      const side = j === 0 ? -1 : 1;
      const local_offset = new THREE.Vector3(
        side * spec[3] * 0.07,
        spec[2] * (-0.13 + j * 0.22),
        0
      ).applyQuaternion(base_quaternion);

      const branch_pose = surfacePose(spec[0], spec[1], 0.041);
      const branch_tilt = new THREE.Quaternion().setFromAxisAngle(
        local_z_axis,
        spec[4] + side * 0.95
      );

      dummy.position.copy(branch_pose.position).add(local_offset);
      dummy.quaternion.copy(branch_pose.quaternion).multiply(branch_tilt);
      dummy.scale.set(1, spec[2] * 0.25, 1);
      dummy.updateMatrix();
      leaf_veins.setMatrixAt(vein_index++, dummy.matrix);
    }
  }
  leaf_veins.instanceMatrix.needsUpdate = true;
  root.add(leaf_veins);

  const patina_marksGeom = new THREE.CircleGeometry(1, 10);
  const patina_specs = [
    [-0.18, 0.48, 0.010, 0.004, 0.2],
    [0.12, 0.50, 0.007, 0.003, -0.4],
    [0.30, 0.43, 0.012, 0.004, 0.7],
    [-0.34, 0.31, 0.008, 0.003, -0.8],
    [0.18, 0.29, 0.006, 0.003, 0.1],
    [-0.22, 0.08, 0.010, 0.004, 0.5],
    [0.27, -0.02, 0.007, 0.003, -0.3],
    [-0.16, -0.20, 0.012, 0.004, 0.9],
    [0.24, -0.27, 0.009, 0.003, -0.6],
    [-0.31, -0.43, 0.013, 0.004, 0.3],
    [0.08, -0.50, 0.008, 0.003, -0.2],
    [0.48, 0.02, 0.007, 0.003, 0.8],
    [-0.55, 0.02, 0.009, 0.003, -0.5],
    [0.02, 0.55, 0.006, 0.0025, 0.4],
  ];
  const patina_marks = new THREE.InstancedMesh(
    patina_marksGeom,
    patinaMat,
    patina_specs.length
  );
  patina_marks.name = "patina_marks";

  for (let i = 0; i < patina_specs.length; i++) {
    const spec = patina_specs[i];
    const pose = surfacePose(spec[0], spec[1], 0.006);
    const tilt = new THREE.Quaternion().setFromAxisAngle(local_z_axis, spec[4]);
    dummy.position.copy(pose.position);
    dummy.quaternion.copy(pose.quaternion).multiply(tilt);
    dummy.scale.set(spec[2], spec[3], 1);
    dummy.updateMatrix();
    patina_marks.setMatrixAt(i, dummy.matrix);
  }
  patina_marks.instanceMatrix.needsUpdate = true;
  root.add(patina_marks);

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
  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 0) {
    const scale = 0.98 / maxDim;
    root.scale.setScalar(scale);
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
