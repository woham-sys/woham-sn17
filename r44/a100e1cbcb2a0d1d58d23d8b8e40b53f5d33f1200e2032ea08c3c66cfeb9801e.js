// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const jewelry = new THREE.Group();
  root.add(jewelry);

  const polished_silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const diamondMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  const diamond_facetMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
  });

  function createBrilliantGeometry(radius, depth, segments) {
    const positions = [];
    const colors = [];
    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xdce5ed),
      new THREE.Color(0xb9c7d3),
      new THREE.Color(0xf7f0df),
      new THREE.Color(0xcbd7e0),
      new THREE.Color(0xaebbc6),
      new THREE.Color(0xf9fcff),
      new THREE.Color(0xd6e7f2),
    ];

    function point(r, angle, z) {
      return new THREE.Vector3(
        Math.cos(angle) * r,
        Math.sin(angle) * r,
        z
      );
    }

    function addTriangle(a, b, c, shadeIndex) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      const color = palette[shadeIndex % palette.length];
      for (let i = 0; i < 3; i++) {
        colors.push(color.r, color.g, color.b);
      }
    }

    const table_center = new THREE.Vector3(0, 0, depth * 0.68);
    const culet = new THREE.Vector3(0, 0, -depth);
    const step = Math.PI * 2 / segments;

    for (let i = 0; i < segments; i++) {
      const a0 = i * step;
      const a1 = (i + 1) * step;
      const table0 = point(radius * 0.38, a0, depth * 0.68);
      const table1 = point(radius * 0.38, a1, depth * 0.68);
      const star0 = point(radius * 0.68, a0 + step * 0.5, depth * 0.42);
      const star1 = point(radius * 0.68, a1 + step * 0.5, depth * 0.42);
      const girdle0 = point(radius, a0, 0);
      const girdle1 = point(radius, a1, 0);
      const lower0 = point(radius * 0.98, a0, -depth * 0.18);
      const lower1 = point(radius * 0.98, a1, -depth * 0.18);

      addTriangle(table_center, table0, table1, i);
      addTriangle(table0, star0, star1, i + 3);
      addTriangle(table0, star1, table1, i + 5);
      addTriangle(star0, girdle0, girdle1, i + 1);
      addTriangle(star0, girdle1, star1, i + 6);
      addTriangle(girdle0, lower0, lower1, i + 4);
      addTriangle(girdle0, lower1, girdle1, i + 2);
      addTriangle(lower0, culet, lower1, i + 7);
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

  function createFacetOverlayGeometry(radius, depth, segments) {
    const positions = [];
    const colors = [];
    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xcdd8e1),
      new THREE.Color(0xf7ecd8),
      new THREE.Color(0xaebbc5),
      new THREE.Color(0xe8f2f8),
      new THREE.Color(0x9faab5),
      new THREE.Color(0xffffff),
      new THREE.Color(0xd5e3ec),
    ];

    function point(r, angle, z) {
      return new THREE.Vector3(
        Math.cos(angle) * r,
        Math.sin(angle) * r,
        z
      );
    }

    function addTriangle(a, b, c, shadeIndex) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      const color = palette[shadeIndex % palette.length];
      for (let i = 0; i < 3; i++) {
        colors.push(color.r, color.g, color.b);
      }
    }

    const center = new THREE.Vector3(0, 0, depth * 0.715);
    const step = Math.PI * 2 / segments;

    for (let i = 0; i < segments; i++) {
      const a0 = i * step;
      const a1 = (i + 1) * step;
      const inner0 = point(radius * 0.31, a0, depth * 0.71);
      const inner1 = point(radius * 0.31, a1, depth * 0.71);
      const middle0 = point(radius * 0.61, a0 + step * 0.18, depth * 0.49);
      const middle1 = point(radius * 0.61, a1 + step * 0.18, depth * 0.49);
      const outer0 = point(radius * 0.94, a0, depth * 0.07);
      const outer1 = point(radius * 0.94, a1, depth * 0.07);

      addTriangle(center, inner0, inner1, i + 2);
      addTriangle(inner0, middle0, middle1, i + 5);
      addTriangle(inner0, middle1, inner1, i + 1);
      addTriangle(middle0, outer0, outer1, i + 3);
      addTriangle(middle0, outer1, middle1, i + 6);
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
    return geometry;
  }

  const bandShape = new THREE.Shape();
  bandShape.absarc(0, 0, 1.16, 0, Math.PI * 2, false);
  const bandHole = new THREE.Path();
  bandHole.absarc(0, 0, 0.88, 0, Math.PI * 2, true);
  bandShape.holes.push(bandHole);

  const bandGeom = new THREE.ExtrudeGeometry(bandShape, {
    depth: 0.22,
    steps: 1,
    curveSegments: 64,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 3,
  });
  bandGeom.translate(0, 0, -0.11);

  const band = new THREE.Mesh(bandGeom, polished_silverMat);
  jewelry.add(band);

  const outer_railGeom = new THREE.TorusGeometry(1.16, 0.035, 10, 72);
  const outer_rail = new THREE.Mesh(outer_railGeom, polished_silverMat);
  outer_rail.position.z = 0.145;
  jewelry.add(outer_rail);

  const inner_railGeom = new THREE.TorusGeometry(0.88, 0.028, 10, 64);
  const inner_rail = new THREE.Mesh(inner_railGeom, polished_silverMat);
  inner_rail.position.z = 0.145;
  jewelry.add(inner_rail);

  const rear_railGeom = new THREE.TorusGeometry(1.16, 0.026, 8, 64);
  const rear_rail = new THREE.Mesh(rear_railGeom, polished_silverMat);
  rear_rail.position.z = -0.14;
  jewelry.add(rear_rail);

  const setting_bridgeGeom = new THREE.BoxGeometry(0.48, 0.25, 0.22);

  const upper_setting_bridge = new THREE.Mesh(
    setting_bridgeGeom,
    polished_silverMat
  );
  upper_setting_bridge.position.set(-0.84, 0.72, 0);
  upper_setting_bridge.rotation.z = -Math.PI / 4;
  jewelry.add(upper_setting_bridge);

  const lower_setting_bridge = new THREE.Mesh(
    setting_bridgeGeom,
    polished_silverMat
  );
  lower_setting_bridge.position.set(-0.84, -0.72, 0);
  lower_setting_bridge.rotation.z = Math.PI / 4;
  jewelry.add(lower_setting_bridge);

  const setting_backplateGeom = new THREE.CylinderGeometry(
    0.64,
    0.66,
    0.14,
    48
  );
  const setting_backplate = new THREE.Mesh(
    setting_backplateGeom,
    polished_silverMat
  );
  setting_backplate.rotation.x = Math.PI / 2;
  setting_backplate.position.set(-1.25, 0, 0.13);
  jewelry.add(setting_backplate);

  const setting_galleryGeom = new THREE.TorusGeometry(0.59, 0.045, 10, 56);
  const setting_gallery = new THREE.Mesh(
    setting_galleryGeom,
    polished_silverMat
  );
  setting_gallery.position.set(-1.25, 0, 0.205);
  jewelry.add(setting_gallery);

  const halo_frameGeom = new THREE.TorusGeometry(0.55, 0.075, 12, 64);
  const halo_frame = new THREE.Mesh(halo_frameGeom, polished_silverMat);
  halo_frame.position.set(-1.25, 0, 0.22);
  jewelry.add(halo_frame);

  const center_diamondGeom = createBrilliantGeometry(0.46, 0.24, 24);
  const center_diamond = new THREE.Mesh(center_diamondGeom, diamondMat);
  center_diamond.position.set(-1.25, 0, 0.31);
  jewelry.add(center_diamond);

  const center_diamond_facetsGeom = createFacetOverlayGeometry(0.46, 0.24, 24);
  const center_diamond_facets = new THREE.Mesh(
    center_diamond_facetsGeom,
    diamond_facetMat
  );
  center_diamond_facets.position.set(-1.25, 0, 0.313);
  jewelry.add(center_diamond_facets);

  const center_prongGeom = new THREE.SphereGeometry(0.075, 16, 10);
  const center_prongs = new THREE.InstancedMesh(
    center_prongGeom,
    polished_silverMat,
    4
  );
  const prong_matrix = new THREE.Matrix4();
  const prong_quaternion = new THREE.Quaternion();
  const prong_scale = new THREE.Vector3(0.78, 1.18, 0.78);

  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i * Math.PI / 2;
    const position = new THREE.Vector3(
      -1.25 + Math.cos(angle) * 0.49,
      Math.sin(angle) * 0.49,
      0.39
    );
    prong_quaternion.setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      angle - Math.PI / 2
    );
    prong_matrix.compose(position, prong_quaternion, prong_scale);
    center_prongs.setMatrixAt(i, prong_matrix);
  }
  center_prongs.instanceMatrix.needsUpdate = true;
  jewelry.add(center_prongs);

  const halo_count = 14;
  const halo_radius = 0.55;
  const halo_stoneGeom = createBrilliantGeometry(0.105, 0.07, 12);
  const halo_stones = new THREE.InstancedMesh(
    halo_stoneGeom,
    diamondMat,
    halo_count
  );
  const halo_matrix = new THREE.Matrix4();
  const halo_quaternion = new THREE.Quaternion();
  const halo_scale = new THREE.Vector3(1, 1, 1);

  for (let i = 0; i < halo_count; i++) {
    const angle = i / halo_count * Math.PI * 2;
    const position = new THREE.Vector3(
      -1.25 + Math.cos(angle) * halo_radius,
      Math.sin(angle) * halo_radius,
      0.315
    );
    halo_quaternion.setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      angle * 0.5
    );
    halo_matrix.compose(position, halo_quaternion, halo_scale);
    halo_stones.setMatrixAt(i, halo_matrix);
  }
  halo_stones.instanceMatrix.needsUpdate = true;
  jewelry.add(halo_stones);

  const halo_beadGeom = new THREE.SphereGeometry(0.032, 10, 8);
  const halo_beads = new THREE.InstancedMesh(
    halo_beadGeom,
    polished_silverMat,
    halo_count
  );
  const bead_matrix = new THREE.Matrix4();
  const bead_quaternion = new THREE.Quaternion();
  const bead_scale = new THREE.Vector3(1, 1, 1);

  for (let i = 0; i < halo_count; i++) {
    const angle = (i + 0.5) / halo_count * Math.PI * 2;
    const position = new THREE.Vector3(
      -1.25 + Math.cos(angle) * 0.615,
      Math.sin(angle) * 0.615,
      0.285
    );
    bead_matrix.compose(position, bead_quaternion, bead_scale);
    halo_beads.setMatrixAt(i, bead_matrix);
  }
  halo_beads.instanceMatrix.needsUpdate = true;
  jewelry.add(halo_beads);

  const band_stone_count = 28;
  const band_stoneGeom = createBrilliantGeometry(0.082, 0.055, 10);
  const band_stones = new THREE.InstancedMesh(
    band_stoneGeom,
    diamondMat,
    band_stone_count
  );
  const band_stone_matrix = new THREE.Matrix4();
  const band_stone_quaternion = new THREE.Quaternion();
  const band_stone_scale = new THREE.Vector3(1, 1, 1);

  for (let i = 0; i < band_stone_count; i++) {
    const angle = i / band_stone_count * Math.PI * 2;
    const position = new THREE.Vector3(
      Math.cos(angle) * 1.02,
      Math.sin(angle) * 1.02,
      0.225
    );
    band_stone_quaternion.setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      angle * 0.35
    );
    band_stone_matrix.compose(
      position,
      band_stone_quaternion,
      band_stone_scale
    );
    band_stones.setMatrixAt(i, band_stone_matrix);
  }
  band_stones.instanceMatrix.needsUpdate = true;
  jewelry.add(band_stones);

  const band_beadGeom = new THREE.SphereGeometry(0.027, 9, 7);
  const band_beads = new THREE.InstancedMesh(
    band_beadGeom,
    polished_silverMat,
    band_stone_count
  );
  const band_bead_matrix = new THREE.Matrix4();
  const band_bead_quaternion = new THREE.Quaternion();
  const band_bead_scale = new THREE.Vector3(1, 1, 1);

  for (let i = 0; i < band_stone_count; i++) {
    const angle = (i + 0.5) / band_stone_count * Math.PI * 2;
    const position = new THREE.Vector3(
      Math.cos(angle) * 1.02,
      Math.sin(angle) * 1.02,
      0.205
    );
    band_bead_matrix.compose(
      position,
      band_bead_quaternion,
      band_bead_scale
    );
    band_beads.setMatrixAt(i, band_bead_matrix);
  }
  band_beads.instanceMatrix.needsUpdate = true;
  jewelry.add(band_beads);

  jewelry.rotation.set(-0.08, -0.22, -0.08);

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