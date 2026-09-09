function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "longboard";

  const deck_group = new THREE.Group();
  deck_group.name = "deck_group";
  root.add(deck_group);

  const running_gear = new THREE.Group();
  running_gear.name = "running_gear";
  root.add(running_gear);

  const deck_length = 3.2;
  const deck_width = 0.72;
  const deck_thickness = 0.075;
  const deck_base_y = 0.43;
  const kick_start = 0.98;
  const nose_height = 0.16;
  const tail_height = 0.13;
  const truck_x = 1.03;
  const wheel_radius = 0.205;
  const wheel_width = 0.16;
  const wheel_y = 0.205;
  const wheel_x = 1.08;
  const wheel_z = 0.30;

  function smoothStep(t) {
    return t * t * (3 - 2 * t);
  }

  function deckKickAt(x) {
    const ax = Math.abs(x);
    if (ax <= kick_start) return 0;
    const t = Math.min(1, (ax - kick_start) / ((deck_length * 0.5 - kick_start)));
    return x >= 0
      ? nose_height * smoothStep(t)
      : tail_height * smoothStep(t);
  }

  function deckTopY(x) {
    return deck_base_y + deck_thickness * 0.5 + deckKickAt(x);
  }

  function createDeckGeometry() {
    const x_segments = 48;
    const z_segments = 10;
    const row_size = z_segments + 1;
    const layer_size = (x_segments + 1) * row_size;
    const positions = [];
    const indices = [];

    for (let layer = 0; layer < 2; layer++) {
      for (let ix = 0; ix <= x_segments; ix++) {
        const x = -deck_length * 0.5 + deck_length * ix / x_segments;
        const half_width = deck_width * 0.5 *
          (0.95 + 0.05 * Math.cos(Math.PI * x / deck_length));
        const top_y = deckTopY(x);
        const bottom_y = top_y - deck_thickness;

        for (let iz = 0; iz <= z_segments; iz++) {
          const z = -half_width + 2 * half_width * iz / z_segments;
          positions.push(x, layer === 0 ? top_y : bottom_y, z);
        }
      }
    }

    for (let ix = 0; ix < x_segments; ix++) {
      for (let iz = 0; iz < z_segments; iz++) {
        const a = ix * row_size + iz;
        const b = (ix + 1) * row_size + iz;
        const c = (ix + 1) * row_size + iz + 1;
        const d = ix * row_size + iz + 1;

        indices.push(a, d, b, b, d, c);

        const ab = layer_size + a;
        const bb = layer_size + b;
        const cb = layer_size + c;
        const db = layer_size + d;
        indices.push(ab, bb, db, bb, cb, db);
      }
    }

    for (let ix = 0; ix < x_segments; ix++) {
      const rear_a = ix * row_size;
      const rear_b = (ix + 1) * row_size;
      const rear_ab = layer_size + rear_a;
      const rear_bb = layer_size + rear_b;
      indices.push(rear_a, rear_b, rear_ab, rear_b, rear_bb, rear_ab);

      const front_a = ix * row_size + z_segments;
      const front_b = (ix + 1) * row_size + z_segments;
      const front_ab = layer_size + front_a;
      const front_bb = layer_size + front_b;
      indices.push(front_a, front_ab, front_b, front_b, front_ab, front_bb);
    }

    for (let iz = 0; iz < z_segments; iz++) {
      const left_a = iz;
      const left_b = iz + 1;
      const left_ab = layer_size + left_a;
      const left_bb = layer_size + left_b;
      indices.push(left_a, left_ab, left_b, left_b, left_ab, left_bb);

      const right_a = x_segments * row_size + iz;
      const right_b = right_a + 1;
      const right_ab = layer_size + right_a;
      const right_bb = layer_size + right_b;
      indices.push(right_a, right_b, right_ab, right_b, right_bb, right_ab);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const deck_coreMat = new THREE.MeshStandardMaterial({
    color: 0xb9824b,
    metalness: 0,
    roughness: 0.55
  });
  const deck_coreGeom = createDeckGeometry();
  const deck_core = new THREE.Mesh(deck_coreGeom, deck_coreMat);
  deck_core.name = "deck_core";
  deck_group.add(deck_core);

  const grip_treadMat = new THREE.MeshStandardMaterial({
    color: 0x3d3f3f,
    metalness: 0,
    roughness: 0.9
  });
  const grip_treadGeom = deck_coreGeom;
  const grip_tread = new THREE.Mesh(grip_treadGeom, grip_treadMat);
  grip_tread.name = "grip_tread";
  grip_tread.position.y = 0.008;
  grip_tread.scale.set(0.985, 1, 0.975);
  deck_group.add(grip_tread);

  const wood_lamination_linesMat = new THREE.MeshStandardMaterial({
    color: 0x704522,
    metalness: 0,
    roughness: 0.6
  });
  const wood_lamination_linesGeom = new THREE.BoxGeometry(3.02, 0.006, 0.008);
  const wood_lamination_lines = new THREE.InstancedMesh(
    wood_lamination_linesGeom,
    wood_lamination_linesMat,
    6
  );
  wood_lamination_lines.name = "wood_lamination_lines";
  const lamination_dummy = new THREE.Object3D();
  let lamination_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      lamination_dummy.position.set(
        0,
        deck_base_y - 0.018 + i * 0.018,
        side * (deck_width * 0.5 + 0.004)
      );
      lamination_dummy.rotation.set(0, 0, 0);
      lamination_dummy.scale.set(1, 1, 1);
      lamination_dummy.updateMatrix();
      wood_lamination_lines.setMatrixAt(lamination_index++, lamination_dummy.matrix);
    }
  }
  wood_lamination_lines.instanceMatrix.needsUpdate = true;
  deck_group.add(wood_lamination_lines);

  const mounting_boltsMat = new THREE.MeshStandardMaterial({
    color: 0xc8c8c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const mounting_boltsGeom = new THREE.CylinderGeometry(0.032, 0.032, 0.012, 18);
  const mounting_bolts = new THREE.InstancedMesh(
    mounting_boltsGeom,
    mounting_boltsMat,
    8
  );
  mounting_bolts.name = "mounting_bolts";
  const bolt_dummy = new THREE.Object3D();
  let bolt_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const x = side * (0.91 + i * 0.105);
      const z = i % 2 === 0 ? -0.115 : 0.115;
      bolt_dummy.position.set(x, deckTopY(x) + 0.018, z);
      bolt_dummy.rotation.set(0, 0, 0);
      bolt_dummy.scale.set(1, 1, 1);
      bolt_dummy.updateMatrix();
      mounting_bolts.setMatrixAt(bolt_index++, bolt_dummy.matrix);
    }
  }
  mounting_bolts.instanceMatrix.needsUpdate = true;
  deck_group.add(mounting_bolts);

  const truck_hangersMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0c8,
    metalness: 0.5,
    roughness: 0.25
  });
  const truck_hangersGeom = new THREE.BoxGeometry(0.17, 0.085, 0.62);
  const truck_hangers = new THREE.InstancedMesh(
    truck_hangersGeom,
    truck_hangersMat,
    2
  );
  truck_hangers.name = "truck_hangers";
  const hanger_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    hanger_dummy.position.set(side * truck_x, 0.325, 0);
    hanger_dummy.rotation.set(-side * 0.08, 0, 0);
    hanger_dummy.scale.set(1, 1, 1);
    hanger_dummy.updateMatrix();
    truck_hangers.setMatrixAt(i, hanger_dummy.matrix);
  }
  truck_hangers.instanceMatrix.needsUpdate = true;
  running_gear.add(truck_hangers);

  const truck_bushingsMat = new THREE.MeshStandardMaterial({
    color: 0x252525,
    metalness: 0,
    roughness: 0.8
  });
  const truck_bushingsGeom = new THREE.CylinderGeometry(0.072, 0.082, 0.13, 18);
  const truck_bushings = new THREE.InstancedMesh(
    truck_bushingsGeom,
    truck_bushingsMat,
    2
  );
  truck_bushings.name = "truck_bushings";
  const bushing_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    bushing_dummy.position.set(side * truck_x, 0.385, 0);
    bushing_dummy.rotation.set(0, 0, 0);
    bushing_dummy.scale.set(1, 1, 1);
    bushing_dummy.updateMatrix();
    truck_bushings.setMatrixAt(i, bushing_dummy.matrix);
  }
  truck_bushings.instanceMatrix.needsUpdate = true;
  running_gear.add(truck_bushings);

  const truck_axlesMat = new THREE.MeshStandardMaterial({
    color: 0x343434,
    metalness: 0.45,
    roughness: 0.35
  });
  const truck_axlesGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.78, 16);
  const truck_axles = new THREE.InstancedMesh(
    truck_axlesGeom,
    truck_axlesMat,
    2
  );
  truck_axles.name = "truck_axles";
  const axle_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    axle_dummy.position.set(side * truck_x, wheel_y, 0);
    axle_dummy.rotation.set(Math.PI * 0.5, 0, 0);
    axle_dummy.scale.set(1, 1, 1);
    axle_dummy.updateMatrix();
    truck_axles.setMatrixAt(i, axle_dummy.matrix);
  }
  truck_axles.instanceMatrix.needsUpdate = true;
  running_gear.add(truck_axles);

  const wheel_profile = [
    new THREE.Vector2(0.000, -wheel_width * 0.5),
    new THREE.Vector2(0.145, -wheel_width * 0.5),
    new THREE.Vector2(0.182, -wheel_width * 0.41),
    new THREE.Vector2(wheel_radius, -wheel_width * 0.18),
    new THREE.Vector2(wheel_radius, wheel_width * 0.18),
    new THREE.Vector2(0.182, wheel_width * 0.41),
    new THREE.Vector2(0.145, wheel_width * 0.5),
    new THREE.Vector2(0.000, wheel_width * 0.5)
  ];
  const wheelsMat = new THREE.MeshStandardMaterial({
    color: 0x75664b,
    metalness: 0,
    roughness: 0.45
  });
  const wheelsGeom = new THREE.LatheGeometry(wheel_profile, 40);
  const wheels = new THREE.InstancedMesh(wheelsGeom, wheelsMat, 4);
  wheels.name = "wheels";
  const wheel_dummy = new THREE.Object3D();
  let wheel_index = 0;
  for (const x_side of [-1, 1]) {
    for (const z_side of [-1, 1]) {
      wheel_dummy.position.set(x_side * wheel_x, wheel_y, z_side * wheel_z);
      wheel_dummy.rotation.set(Math.PI * 0.5, 0, 0);
      wheel_dummy.scale.set(1, 1, 1);
      wheel_dummy.updateMatrix();
      wheels.setMatrixAt(wheel_index++, wheel_dummy.matrix);
    }
  }
  wheels.instanceMatrix.needsUpdate = true;
  running_gear.add(wheels);

  const wheel_side_ringsMat = new THREE.MeshStandardMaterial({
    color: 0x514733,
    metalness: 0,
    roughness: 0.55
  });
  const wheel_side_ringsGeom = new THREE.TorusGeometry(0.145, 0.008, 8, 32);
  const wheel_side_rings = new THREE.InstancedMesh(
    wheel_side_ringsGeom,
    wheel_side_ringsMat,
    4
  );
  wheel_side_rings.name = "wheel_side_rings";
  const ring_dummy = new THREE.Object3D();
  let ring_index = 0;
  for (const x_side of [-1, 1]) {
    for (const z_side of [-1, 1]) {
      ring_dummy.position.set(
        x_side * (wheel_x + wheel_width * 0.5 + 0.004),
        wheel_y,
        z_side * wheel_z
      );
      ring_dummy.rotation.set(0, Math.PI * 0.5, 0);
      ring_dummy.scale.set(1, 1, 1);
      ring_dummy.updateMatrix();
      wheel_side_rings.setMatrixAt(ring_index++, ring_dummy.matrix);
    }
  }
  wheel_side_rings.instanceMatrix.needsUpdate = true;
  running_gear.add(wheel_side_rings);

  const bearing_outer_ringsMat = new THREE.MeshStandardMaterial({
    color: 0x252525,
    metalness: 0.35,
    roughness: 0.4
  });
  const bearing_outer_ringsGeom = new THREE.CylinderGeometry(0.071, 0.071, 0.018, 24);
  const bearing_outer_rings = new THREE.InstancedMesh(
    bearing_outer_ringsGeom,
    bearing_outer_ringsMat,
    4
  );
  bearing_outer_rings.name = "bearing_outer_rings";

  const bearing_silver_ringsMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0c8,
    metalness: 0.5,
    roughness: 0.25
  });
  const bearing_silver_ringsGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.021, 24);
  const bearing_silver_rings = new THREE.InstancedMesh(
    bearing_silver_ringsGeom,
    bearing_silver_ringsMat,
    4
  );
  bearing_silver_rings.name = "bearing_silver_rings";

  const bearing_centersMat = new THREE.MeshStandardMaterial({
    color: 0x303030,
    metalness: 0.25,
    roughness: 0.45
  });
  const bearing_centersGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.024, 20);
  const bearing_centers = new THREE.InstancedMesh(
    bearing_centersGeom,
    bearing_centersMat,
    4
  );
  bearing_centers.name = "bearing_centers";

  const bearing_dummy = new THREE.Object3D();
  let bearing_index = 0;
  for (const x_side of [-1, 1]) {
    for (const z_side of [-1, 1]) {
      const face_x = x_side * (wheel_x + wheel_width * 0.5 + 0.011);

      bearing_dummy.position.set(face_x, wheel_y, z_side * wheel_z);
      bearing_dummy.rotation.set(0, 0, Math.PI * 0.5);
      bearing_dummy.scale.set(1, 1, 1);
      bearing_dummy.updateMatrix();
      bearing_outer_rings.setMatrixAt(bearing_index, bearing_dummy.matrix);

      bearing_dummy.position.x = face_x + x_side * 0.006;
      bearing_dummy.updateMatrix();
      bearing_silver_rings.setMatrixAt(bearing_index, bearing_dummy.matrix);

      bearing_dummy.position.x = face_x + x_side * 0.014;
      bearing_dummy.updateMatrix();
      bearing_centers.setMatrixAt(bearing_index, bearing_dummy.matrix);

      bearing_index++;
    }
  }
  bearing_outer_rings.instanceMatrix.needsUpdate = true;
  bearing_silver_rings.instanceMatrix.needsUpdate = true;
  bearing_centers.instanceMatrix.needsUpdate = true;
  running_gear.add(bearing_outer_rings, bearing_silver_rings, bearing_centers);

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
  if (maxDim > 0) root.scale.setScalar(0.98 / maxDim);
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
