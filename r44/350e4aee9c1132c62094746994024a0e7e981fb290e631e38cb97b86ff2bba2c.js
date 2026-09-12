// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "sapphire_lampshade";

  const shadeH = 1.0;
  const bottomR = 0.62;
  const topR = 0.36;

  const wire_frameMat = new THREE.MeshStandardMaterial({
    color: 0xb08a55,
    metalness: 0.6,
    roughness: 0.2,
  });

  const gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.22,
    ior: 1.7,
    transparent: true,
    opacity: 0.98,
    vertexColors: true,
    side: THREE.DoubleSide,
  });

  const gemstone_holesMat = new THREE.MeshStandardMaterial({
    color: 0x061536,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  function radiusAt(y) {
    const t = (y + shadeH * 0.5) / shadeH;
    return bottomR + (topR - bottomR) * t;
  }

  function createGemstoneGeometry() {
    const positions = [];
    const colors = [];
    const segments = 12;
    const palette = [
      new THREE.Color(0x08246f),
      new THREE.Color(0x0a3cac),
      new THREE.Color(0x0c48c5),
      new THREE.Color(0x1260d8),
      new THREE.Color(0x2477e8),
      new THREE.Color(0x0b2f91),
      new THREE.Color(0x174bb8),
      new THREE.Color(0x3c8cf0),
    ];

    function point(radius, angle, z) {
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        z
      );
    }

    function addTriangle(a, b, c, colorIndex) {
      const color = palette[colorIndex % palette.length];
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      for (let i = 0; i < 3; i++) {
        colors.push(color.r, color.g, color.b);
      }
    }

    const frontCenter = new THREE.Vector3(0, 0, 0.28);
    const backCenter = new THREE.Vector3(0, 0, -0.12);

    for (let i = 0; i < segments; i++) {
      const a0 = i / segments * Math.PI * 2;
      const a1 = (i + 1) / segments * Math.PI * 2;
      const inner0 = point(0.42, a0, 0.22);
      const inner1 = point(0.42, a1, 0.22);
      const outer0 = point(1.0, a0, 0.0);
      const outer1 = point(1.0, a1, 0.0);
      const back0 = point(0.72, a0, -0.12);
      const back1 = point(0.72, a1, -0.12);

      addTriangle(frontCenter, inner0, inner1, i + 2);
      addTriangle(inner0, outer0, outer1, i * 3 + 1);
      addTriangle(inner0, outer1, inner1, i * 5 + 3);
      addTriangle(outer0, back0, back1, i + 4);
      addTriangle(outer0, back1, outer1, i + 6);
      addTriangle(backCenter, back1, back0, i + 1);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const wire_frame = new THREE.Group();
  wire_frame.name = "wire_frame";
  root.add(wire_frame);

  const meridianPoints = [];
  for (let i = 0; i <= 24; i++) {
    const y = -shadeH * 0.5 + shadeH * i / 24;
    meridianPoints.push(new THREE.Vector3(0, y, radiusAt(y)));
  }

  const meridian_wiresGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(meridianPoints, false, "centripetal"),
    48,
    0.0055,
    6,
    false
  );
  const meridianCount = 32;
  const meridian_wires = new THREE.InstancedMesh(
    meridian_wiresGeom,
    wire_frameMat,
    meridianCount
  );
  meridian_wires.name = "meridian_wires";

  const instanceDummy = new THREE.Object3D();
  for (let i = 0; i < meridianCount; i++) {
    instanceDummy.position.set(0, 0, 0);
    instanceDummy.rotation.set(
      0,
      i / meridianCount * Math.PI * 2,
      0
    );
    instanceDummy.scale.set(1, 1, 1);
    instanceDummy.updateMatrix();
    meridian_wires.setMatrixAt(i, instanceDummy.matrix);
  }
  meridian_wires.instanceMatrix.needsUpdate = true;
  wire_frame.add(meridian_wires);

  const diagonal_wires = new THREE.Group();
  diagonal_wires.name = "diagonal_wires";
  wire_frame.add(diagonal_wires);

  const diagonalSteps = 12;
  for (const direction of [-1, 1]) {
    for (let strandIndex = 0; strandIndex < meridianCount; strandIndex++) {
      const strandPoints = [];
      for (let step = 0; step <= diagonalSteps; step++) {
        const t = step / diagonalSteps;
        const y = -shadeH * 0.5 + shadeH * t;
        const angle =
          strandIndex / meridianCount * Math.PI * 2 +
          direction * (t - 0.5) * 2.7;
        const radius = radiusAt(y) + 0.003;
        strandPoints.push(
          new THREE.Vector3(
            Math.sin(angle) * radius,
            y,
            Math.cos(angle) * radius
          )
        );
      }

      const diagonal_wireGeom = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(
          strandPoints,
          false,
          "centripetal"
        ),
        36,
        0.0045,
        6,
        false
      );
      const diagonal_wire = new THREE.Mesh(
        diagonal_wireGeom,
        wire_frameMat
      );
      diagonal_wire.name =
        direction < 0
          ? "left_diagonal_wire"
          : "right_diagonal_wire";
      diagonal_wires.add(diagonal_wire);
    }
  }

  const top_rimGeom = new THREE.TorusGeometry(
    topR,
    0.009,
    8,
    64
  );
  const top_rim = new THREE.Mesh(top_rimGeom, wire_frameMat);
  top_rim.name = "top_rim";
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = shadeH * 0.5;
  wire_frame.add(top_rim);

  const bottom_rimGeom = new THREE.TorusGeometry(
    bottomR,
    0.009,
    8,
    72
  );
  const bottom_rim = new THREE.Mesh(bottom_rimGeom, wire_frameMat);
  bottom_rim.name = "bottom_rim";
  bottom_rim.rotation.x = Math.PI / 2;
  bottom_rim.position.y = -shadeH * 0.5;
  wire_frame.add(bottom_rim);

  const rim_scallopsGeom = new THREE.TorusGeometry(
    0.019,
    0.004,
    6,
    14
  );
  const scallopCount = 32;
  const rim_scallops = new THREE.InstancedMesh(
    rim_scallopsGeom,
    wire_frameMat,
    scallopCount * 2
  );
  rim_scallops.name = "rim_scallops";

  let scallopIndex = 0;
  for (const rimY of [shadeH * 0.5, -shadeH * 0.5]) {
    const rimRadius = rimY > 0 ? topR : bottomR;
    for (let i = 0; i < scallopCount; i++) {
      const angle = i / scallopCount * Math.PI * 2;
      instanceDummy.position.set(
        Math.sin(angle) * rimRadius,
        rimY,
        Math.cos(angle) * rimRadius
      );
      instanceDummy.rotation.set(0, angle, 0);
      instanceDummy.scale.set(1, 1, 1);
      instanceDummy.updateMatrix();
      rim_scallops.setMatrixAt(scallopIndex++, instanceDummy.matrix);
    }
  }
  rim_scallops.instanceMatrix.needsUpdate = true;
  wire_frame.add(rim_scallops);

  const gemstoneRows = 14;
  const gemstonesPerRow = 28;
  const gemstoneCount = gemstoneRows * gemstonesPerRow;

  const gemstone_settingsGeom = new THREE.TorusGeometry(
    1.0,
    0.11,
    6,
    14
  );
  const gemstone_settings = new THREE.InstancedMesh(
    gemstone_settingsGeom,
    wire_frameMat,
    gemstoneCount
  );
  gemstone_settings.name = "gemstone_settings";

  const gemstonesGeom = createGemstoneGeometry();
  const gemstones = new THREE.InstancedMesh(
    gemstonesGeom,
    gemstoneMat,
    gemstoneCount
  );
  gemstones.name = "gemstones";

  const gemstone_holesGeom = new THREE.CircleGeometry(1, 10);
  const gemstone_holes = new THREE.InstancedMesh(
    gemstone_holesGeom,
    gemstone_holesMat,
    gemstoneCount
  );
  gemstone_holes.name = "gemstone_holes";

  const localNormal = new THREE.Vector3(0, 0, 1);
  const settingQuaternion = new THREE.Quaternion();
  const gemstoneQuaternion = new THREE.Quaternion();
  const holeQuaternion = new THREE.Quaternion();
  const rowOffset = 0.026;
  const slope = (topR - bottomR) / shadeH;

  let gemstoneIndex = 0;
  for (let row = 0; row < gemstoneRows; row++) {
    const rowT = row / (gemstoneRows - 1);
    const y =
      -shadeH * 0.5 +
      0.052 +
      rowT * (shadeH - 0.104);
    const radius = radiusAt(y);
    const gemstoneSize =
      0.043 + 0.006 * Math.sin(Math.PI * rowT);

    for (let column = 0; column < gemstonesPerRow; column++) {
      const angle =
        (column + (row % 2) * 0.5) /
          gemstonesPerRow * Math.PI * 2 +
        rowOffset;

      const normal = new THREE.Vector3(
        Math.sin(angle),
        -slope,
        Math.cos(angle)
      ).normalize();

      const surfacePoint = new THREE.Vector3(
        Math.sin(angle) * radius,
        y,
        Math.cos(angle) * radius
      );

      settingQuaternion.setFromUnitVectors(localNormal, normal);

      instanceDummy.position
        .copy(surfacePoint)
        .addScaledVector(normal, 0.008);
      instanceDummy.quaternion.copy(settingQuaternion);
      instanceDummy.scale.setScalar(gemstoneSize);
      instanceDummy.updateMatrix();
      gemstone_settings.setMatrixAt(
        gemstoneIndex,
        instanceDummy.matrix
      );

      gemstoneQuaternion.setFromUnitVectors(localNormal, normal);
      instanceDummy.position
        .copy(surfacePoint)
        .addScaledVector(normal, 0.012);
      instanceDummy.quaternion.copy(gemstoneQuaternion);
      instanceDummy.scale.setScalar(gemstoneSize * 0.92);
      instanceDummy.updateMatrix();
      gemstones.setMatrixAt(gemstoneIndex, instanceDummy.matrix);

      holeQuaternion.setFromUnitVectors(localNormal, normal);
      instanceDummy.position
        .copy(surfacePoint)
        .addScaledVector(normal, 0.0125);
      instanceDummy.quaternion.copy(holeQuaternion);
      instanceDummy.scale.setScalar(gemstoneSize * 0.18);
      instanceDummy.updateMatrix();
      gemstone_holes.setMatrixAt(
        gemstoneIndex,
        instanceDummy.matrix
      );

      gemstoneIndex++;
    }
  }

  gemstone_settings.instanceMatrix.needsUpdate = true;
  gemstones.instanceMatrix.needsUpdate = true;
  gemstone_holes.instanceMatrix.needsUpdate = true;

  root.add(gemstone_settings);
  root.add(gemstones);
  root.add(gemstone_holes);

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