// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_bodyboard";

  const boardLength = 3.5;
  const boardWidth = 0.92;
  const boardThickness = 0.13;
  const padCenterZ = -0.04;
  const padLength = 3.18;
  const padWidth = 0.78;
  const padThickness = 0.045;
  const padCrown = 0.035;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xd9a968,
    metalness: 0.0,
    roughness: 0.6
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x9b642f,
    metalness: 0.0,
    roughness: 0.6
  });
  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0xf0c98b,
    metalness: 0.0,
    roughness: 0.6
  });
  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x45a8e5,
    metalness: 0.0,
    roughness: 0.8
  });
  const blueSeamMat = new THREE.MeshStandardMaterial({
    color: 0x2f8fca,
    metalness: 0.0,
    roughness: 0.8
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x25282a,
    metalness: 0.0,
    roughness: 0.8
  });
  const ribMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x090a0b,
    metalness: 0.0,
    roughness: 0.8
  });

  function makeBoardShape(length, width) {
    const halfL = length * 0.5;
    const halfW = width * 0.5;
    const shape = new THREE.Shape();
    shape.moveTo(0, -halfL);
    shape.bezierCurveTo(
      halfW * 0.62, -halfL,
      halfW * 0.96, -halfL * 0.84,
      halfW, -halfL * 0.55
    );
    shape.bezierCurveTo(
      halfW * 1.02, -halfL * 0.12,
      halfW, halfL * 0.55,
      halfW * 0.68, halfL * 0.86
    );
    shape.bezierCurveTo(
      halfW * 0.48, halfL * 0.98,
      halfW * 0.20, halfL,
      0, halfL
    );
    shape.bezierCurveTo(
      -halfW * 0.20, halfL,
      -halfW * 0.48, halfL * 0.98,
      -halfW * 0.68, halfL * 0.86
    );
    shape.bezierCurveTo(
      -halfW, halfL * 0.55,
      -halfW * 1.02, -halfL * 0.12,
      -halfW, -halfL * 0.55
    );
    shape.bezierCurveTo(
      -halfW * 0.96, -halfL * 0.84,
      -halfW * 0.62, -halfL,
      0, -halfL
    );
    shape.closePath();
    return shape;
  }

  function makeRoundedRectShape(width, length, radius) {
    const x = width * 0.5;
    const z = length * 0.5;
    const r = Math.min(radius, x, z);
    const shape = new THREE.Shape();
    shape.moveTo(-x + r, -z);
    shape.lineTo(x - r, -z);
    shape.quadraticCurveTo(x, -z, x, -z + r);
    shape.lineTo(x, z - r);
    shape.quadraticCurveTo(x, z, x - r, z);
    shape.lineTo(-x + r, z);
    shape.quadraticCurveTo(-x, z, -x, z - r);
    shape.lineTo(-x, -z + r);
    shape.quadraticCurveTo(-x, -z, -x + r, -z);
    shape.closePath();
    return shape;
  }

  function makeBlueTopGeometry() {
    const positions = [];
    const indices = [];
    const segments = 64;
    const rings = 10;
    const halfW = padWidth * 0.5;
    const halfL = padLength * 0.5;

    function addPoint(x, z) {
      const nx = x / halfW;
      const nz = z / halfL;
      const radial = Math.min(1, nx * nx + nz * nz);
      const y = padThickness * 0.5 + padCrown * (1 - radial);
      positions.push(x, y, z);
    }

    addPoint(0, 0);

    for (let ring = 1; ring <= rings; ring++) {
      const radius = ring / rings;
      for (let i = 0; i < segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const sinA = Math.sin(angle);
        const cosA = Math.cos(angle);
        const exponent = 2 / 4;
        const x = halfW * radius *
          (sinA < 0 ? -1 : 1) * Math.pow(Math.abs(sinA), exponent);
        const z = padCenterZ + halfL * radius *
          (cosA < 0 ? -1 : 1) * Math.pow(Math.abs(cosA), exponent);
        addPoint(x, z);
      }
    }

    for (let i = 0; i < segments; i++) {
      indices.push(0, 1 + i, 1 + (i + 1) % segments);
    }

    for (let ring = 2; ring <= rings; ring++) {
      const innerStart = 1 + (ring - 2) * segments;
      const outerStart = 1 + (ring - 1) * segments;
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const a = innerStart + i;
        const b = outerStart + i;
        const c = outerStart + next;
        const d = innerStart + next;
        indices.push(a, b, c, a, c, d);
      }
    }

    const topStart = 1 + (rings - 1) * segments;
    const bottomStart = positions.length / 3;

    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      const sinA = Math.sin(angle);
      const cosA = Math.cos(angle);
      const exponent = 2 / 4;
      const x = halfW *
        (sinA < 0 ? -1 : 1) * Math.pow(Math.abs(sinA), exponent);
      const z = padCenterZ + halfL *
        (cosA < 0 ? -1 : 1) * Math.pow(Math.abs(cosA), exponent);
      positions.push(x, -padThickness * 0.5, z);
    }

    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      const topA = topStart + i;
      const topB = topStart + next;
      const bottomA = bottomStart + i;
      const bottomB = bottomStart + next;
      indices.push(topA, bottomA, bottomB, topA, bottomB, topB);
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

  const wood_boardShape = makeBoardShape(boardLength, boardWidth);
  const wood_boardGeom = new THREE.ExtrudeGeometry(wood_boardShape, {
    depth: boardThickness,
    steps: 1,
    curveSegments: 28,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.035,
    bevelSegments: 4
  });
  const wood_board = new THREE.Mesh(wood_boardGeom, woodMat);
  wood_board.name = "wood_board";
  wood_board.rotation.x = Math.PI / 2;
  wood_board.position.y = 0.065;
  root.add(wood_board);

  const wood_edge_points = [
    new THREE.Vector3(0, -0.035, 1.76),
    new THREE.Vector3(0.30, -0.035, 1.68),
    new THREE.Vector3(0.45, -0.035, 1.46),
    new THREE.Vector3(0.46, -0.035, 0.72),
    new THREE.Vector3(0.45, -0.035, -0.55),
    new THREE.Vector3(0.40, -0.035, -1.42),
    new THREE.Vector3(0.25, -0.035, -1.68),
    new THREE.Vector3(0, -0.035, -1.76),
    new THREE.Vector3(-0.25, -0.035, -1.68),
    new THREE.Vector3(-0.40, -0.035, -1.42),
    new THREE.Vector3(-0.45, -0.035, -0.55),
    new THREE.Vector3(-0.46, -0.035, 0.72),
    new THREE.Vector3(-0.45, -0.035, 1.46),
    new THREE.Vector3(-0.30, -0.035, 1.68)
  ];
  const wood_edge_curve = new THREE.CatmullRomCurve3(
    wood_edge_points,
    true,
    "centripetal"
  );
  const wood_edge_bandGeom = new THREE.TubeGeometry(
    wood_edge_curve,
    96,
    0.018,
    8,
    true
  );
  const wood_edge_band = new THREE.Mesh(wood_edge_bandGeom, lightWoodMat);
  wood_edge_band.name = "wood_edge_band";
  root.add(wood_edge_band);

  const wood_grain_lines = new THREE.Group();
  wood_grain_lines.name = "wood_grain_lines";
  for (const side of [-1, 1]) {
    for (let lineIndex = 0; lineIndex < 3; lineIndex++) {
      const points = [];
      for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        const z = -1.48 + t * 2.96;
        const edgeX = 0.405 - 0.045 * Math.pow(Math.abs(z) / 1.72, 2);
        const x = side * (
          edgeX +
          0.006 * Math.sin(t * Math.PI * 3 + lineIndex * 0.8)
        );
        points.push(new THREE.Vector3(x, 0.094, z));
      }
      const curve = new THREE.CatmullRomCurve3(
        points,
        false,
        "centripetal"
      );
      const grainGeom = new THREE.TubeGeometry(curve, 32, 0.0032, 5, false);
      const grain = new THREE.Mesh(grainGeom, darkWoodMat);
      wood_grain_lines.add(grain);
    }
  }
  root.add(wood_grain_lines);

  const blue_deck_padShape = makeBoardShape(padLength, padWidth);
  const blue_deck_padGeom = makeBlueTopGeometry();
  const blue_deck_pad = new THREE.Mesh(blue_deck_padGeom, blueMat);
  blue_deck_pad.name = "blue_deck_pad";
  blue_deck_pad.position.set(0, 0.105, padCenterZ);
  root.add(blue_deck_pad);

  const blue_edge_points = [
    new THREE.Vector3(0, 0.128, padCenterZ + padLength * 0.5),
    new THREE.Vector3(0.27, 0.128, padCenterZ + padLength * 0.47),
    new THREE.Vector3(0.38, 0.128, padCenterZ + padLength * 0.39),
    new THREE.Vector3(0.39, 0.128, padCenterZ + 0.45),
    new THREE.Vector3(0.38, 0.128, padCenterZ - 0.65),
    new THREE.Vector3(0.34, 0.128, padCenterZ - padLength * 0.44),
    new THREE.Vector3(0.20, 0.128, padCenterZ - padLength * 0.49),
    new THREE.Vector3(0, 0.128, padCenterZ - padLength * 0.5),
    new THREE.Vector3(-0.20, 0.128, padCenterZ - padLength * 0.49),
    new THREE.Vector3(-0.34, 0.128, padCenterZ - padLength * 0.44),
    new THREE.Vector3(-0.38, 0.128, padCenterZ - 0.65),
    new THREE.Vector3(-0.39, 0.128, padCenterZ + 0.45),
    new THREE.Vector3(-0.38, 0.128, padCenterZ + padLength * 0.39),
    new THREE.Vector3(-0.27, 0.128, padCenterZ + padLength * 0.47)
  ];
  const blue_edge_curve = new THREE.CatmullRomCurve3(
    blue_edge_points,
    true,
    "centripetal"
  );
  const blue_edge_pipingGeom = new THREE.TubeGeometry(
    blue_edge_curve,
    96,
    0.011,
    8,
    true
  );
  const blue_edge_piping = new THREE.Mesh(
    blue_edge_pipingGeom,
    blueSeamMat
  );
  blue_edge_piping.name = "blue_edge_piping";
  root.add(blue_edge_piping);

  const rear_handle_recessShape = makeRoundedRectShape(0.24, 0.14, 0.055);
  const rear_handle_recessGeom = new THREE.ExtrudeGeometry(
    rear_handle_recessShape,
    {
      depth: 0.006,
      steps: 1,
      curveSegments: 16,
      bevelEnabled: true,
      bevelThickness: 0.002,
      bevelSize: 0.004,
      bevelSegments: 2
    }
  );
  const rear_handle_recess = new THREE.Mesh(
    rear_handle_recessGeom,
    blueSeamMat
  );
  rear_handle_recess.name = "rear_handle_recess";
  rear_handle_recess.rotation.x = Math.PI / 2;
  rear_handle_recess.position.set(0, 0.146, -1.38);
  root.add(rear_handle_recess);

  const traction_padShape = makeRoundedRectShape(0.48, 0.36, 0.075);
  const traction_padGeom = new THREE.ExtrudeGeometry(traction_padShape, {
    depth: 0.018,
    steps: 1,
    curveSegments: 18,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.008,
    bevelSegments: 2
  });
  const traction_pad = new THREE.Mesh(traction_padGeom, rubberMat);
  traction_pad.name = "traction_pad";
  traction_pad.rotation.x = Math.PI / 2;
  traction_pad.position.set(0, 0.153, 1.16);
  root.add(traction_pad);

  const traction_ribsGeom = new THREE.BoxGeometry(0.014, 0.008, 0.22);
  const traction_ribs = new THREE.InstancedMesh(
    traction_ribsGeom,
    ribMat,
    11
  );
  traction_ribs.name = "traction_ribs";
  const rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 11; i++) {
    rib_dummy.position.set(-0.15 + i * 0.03, 0.159, 1.075);
    rib_dummy.updateMatrix();
    traction_ribs.setMatrixAt(i, rib_dummy.matrix);
  }
  traction_ribs.instanceMatrix.needsUpdate = true;
  root.add(traction_ribs);

  const leash_plug_plateShape = makeRoundedRectShape(0.30, 0.17, 0.045);
  const leash_plug_plateGeom = new THREE.ExtrudeGeometry(
    leash_plug_plateShape,
    {
      depth: 0.012,
      steps: 1,
      curveSegments: 16,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.005,
      bevelSegments: 2
    }
  );
  const leash_plug_plate = new THREE.Mesh(
    leash_plug_plateGeom,
    rubberMat
  );
  leash_plug_plate.name = "leash_plug_plate";
  leash_plug_plate.rotation.x = Math.PI / 2;
  leash_plug_plate.position.set(0, 0.162, 1.30);
  root.add(leash_plug_plate);

  const leash_slotShape = makeRoundedRectShape(0.105, 0.047, 0.021);
  const leash_slotGeom = new THREE.ExtrudeGeometry(leash_slotShape, {
    depth: 0.004,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: false
  });
  const leash_slot = new THREE.Mesh(leash_slotGeom, recessMat);
  leash_slot.name = "leash_slot";
  leash_slot.rotation.x = Math.PI / 2;
  leash_slot.position.set(0, 0.168, 1.30);
  root.add(leash_slot);

  const leash_fastenerGeom = new THREE.CylinderGeometry(
    0.017,
    0.017,
    0.007,
    14
  );
  const leash_fastener = new THREE.Mesh(leash_fastenerGeom, ribMat);
  leash_fastener.name = "leash_fastener";
  leash_fastener.position.set(0, 0.171, 1.30);
  root.add(leash_fastener);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}