function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "diamond_ring";

  const band_group = new THREE.Group();
  band_group.name = "band_group";
  root.add(band_group);

  const setting_group = new THREE.Group();
  setting_group.name = "setting_group";
  root.add(setting_group);

  const crown_group = new THREE.Group();
  crown_group.name = "crown_group";
  setting_group.add(crown_group);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xe8ecef,
    metalness: 0.45,
    roughness: 0.18
  });

  const diamondMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.04,
    transmission: 0.22,
    thickness: 0.18,
    ior: 2.4,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    transparent: true,
    opacity: 0.98,
    flatShading: true,
    side: THREE.DoubleSide
  });

  const facet_lineMat = new THREE.LineBasicMaterial({
    color: 0x7f8991,
    transparent: true,
    opacity: 0.28
  });

  function createBrilliantGeometry(radius, segments) {
    const positions = [];
    const colors = [];
    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xe8edf2),
      new THREE.Color(0xbfc8d0),
      new THREE.Color(0x7d8790),
      new THREE.Color(0xf7fbff),
      new THREE.Color(0x303840),
      new THREE.Color(0xd7dee4),
      new THREE.Color(0x9da8b1)
    ];

    function polar(r, angle, z) {
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

    const table_center = new THREE.Vector3(0, 0, 0.24);
    const pavilion_tip = new THREE.Vector3(0, 0, -0.52);

    for (let i = 0; i < segments; i++) {
      const a0 = i / segments * Math.PI * 2;
      const a1 = (i + 1) / segments * Math.PI * 2;

      const table0 = polar(radius * 0.34, a0, 0.24);
      const table1 = polar(radius * 0.34, a1, 0.24);
      const star0 = polar(radius * 0.62, a0, 0.17);
      const star1 = polar(radius * 0.62, a1, 0.17);
      const girdle_top0 = polar(radius, a0, 0.035);
      const girdle_top1 = polar(radius, a1, 0.035);
      const girdle_bottom0 = polar(radius, a0, -0.035);
      const girdle_bottom1 = polar(radius, a1, -0.035);
      const pavilion0 = polar(radius * 0.50, a0, -0.25);
      const pavilion1 = polar(radius * 0.50, a1, -0.25);

      addTriangle(table_center, table0, table1, i * 3);
      addTriangle(table0, star0, star1, i * 5 + 1);
      addTriangle(table0, star1, table1, i * 7 + 2);
      addTriangle(star0, girdle_top0, girdle_top1, i * 3 + 4);
      addTriangle(star0, girdle_top1, star1, i * 5 + 6);
      addTriangle(girdle_top0, girdle_bottom0, girdle_bottom1, i + 2);
      addTriangle(girdle_top0, girdle_bottom1, girdle_top1, i + 5);
      addTriangle(girdle_bottom0, pavilion0, pavilion1, i * 3 + 3);
      addTriangle(girdle_bottom0, pavilion1, girdle_bottom1, i * 5 + 5);
      addTriangle(pavilion0, pavilion_tip, pavilion1, i * 7 + 2);
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

  function createFacetLineGeometry(radius, segments) {
    const positions = [];

    function polar(r, angle, z) {
      return new THREE.Vector3(
        Math.cos(angle) * r,
        Math.sin(angle) * r,
        z
      );
    }

    function addSegment(a, b) {
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }

    const center = new THREE.Vector3(0, 0, 0.244);

    for (let i = 0; i < segments; i++) {
      const a0 = i / segments * Math.PI * 2;
      const a1 = (i + 1) / segments * Math.PI * 2;
      const table0 = polar(radius * 0.34, a0, 0.244);
      const table1 = polar(radius * 0.34, a1, 0.244);
      const star0 = polar(radius * 0.62, a0, 0.174);
      const star1 = polar(radius * 0.62, a1, 0.174);
      const girdle0 = polar(radius, a0, 0.039);
      const girdle1 = polar(radius, a1, 0.039);

      addSegment(center, table0);
      addSegment(table0, table1);
      addSegment(table0, star0);
      addSegment(star0, girdle0);
      addSegment(star0, star1);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }

  const bandR = 0.72;
  const bandY = -0.10;
  const bandZ = -0.25;
  const bandTubeR = 0.035;

  const bandGeom = new THREE.TorusGeometry(
    bandR,
    bandTubeR,
    12,
    96
  );
  const band = new THREE.Mesh(bandGeom, silverMat);
  band.name = "band";
  band.rotation.x = Math.PI / 2;
  band.position.set(0, bandY, bandZ);
  band_group.add(band);

  const shoulderGeom = new THREE.SphereGeometry(1, 24, 12);

  const left_shoulder = new THREE.Mesh(shoulderGeom, silverMat);
  left_shoulder.name = "left_shoulder";
  left_shoulder.scale.set(0.22, 0.075, 0.105);
  left_shoulder.position.set(-0.50, 0.015, -0.035);
  band_group.add(left_shoulder);

  const right_shoulder = new THREE.Mesh(shoulderGeom, silverMat);
  right_shoulder.name = "right_shoulder";
  right_shoulder.scale.set(0.22, 0.075, 0.105);
  right_shoulder.position.set(0.50, 0.015, -0.035);
  band_group.add(right_shoulder);

  const galleryGeom = new THREE.TorusGeometry(0.285, 0.014, 8, 64);
  const gallery = new THREE.Mesh(galleryGeom, silverMat);
  gallery.name = "gallery";
  gallery.position.set(0, 0.055, -0.018);
  setting_group.add(gallery);

  const basketGeom = new THREE.CylinderGeometry(
    0.012,
    0.018,
    0.145,
    8
  );
  const basket_struts = new THREE.InstancedMesh(
    basketGeom,
    silverMat,
    8
  );
  basket_struts.name = "basket_struts";

  const dummy = new THREE.Object3D();
  const yAxis = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const radial = new THREE.Vector3(
      Math.cos(angle),
      Math.sin(angle),
      0
    );
    dummy.position.set(
      radial.x * 0.305,
      radial.y * 0.305,
      0.005
    );
    dummy.quaternion.setFromUnitVectors(yAxis, radial);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    basket_struts.setMatrixAt(i, dummy.matrix);
  }
  basket_struts.instanceMatrix.needsUpdate = true;
  setting_group.add(basket_struts);

  const sideStoneCountPerSide = 4;
  const sideStoneTotal = sideStoneCountPerSide * 2;

  const side_stone_mountsGeom = new THREE.CylinderGeometry(
    0.108,
    0.116,
    0.038,
    24
  );
  const side_stone_mounts = new THREE.InstancedMesh(
    side_stone_mountsGeom,
    silverMat,
    sideStoneTotal
  );
  side_stone_mounts.name = "side_stone_mounts";

  const side_stonesGeom = createBrilliantGeometry(0.105, 16);
  const side_stones = new THREE.InstancedMesh(
    side_stonesGeom,
    diamondMat,
    sideStoneTotal
  );
  side_stones.name = "side_stones";

  let sideIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < sideStoneCountPerSide; i++) {
      const x = side * (0.34 + i * 0.115);
      const y = 0.045 - i * 0.012;

      dummy.position.set(x, y, 0.018);
      dummy.rotation.set(Math.PI / 2, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      side_stone_mounts.setMatrixAt(sideIndex, dummy.matrix);

      dummy.position.set(x, y, 0.070);
      dummy.rotation.set(0, 0, side * i * 0.08);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      side_stones.setMatrixAt(sideIndex, dummy.matrix);

      sideIndex++;
    }
  }
  side_stone_mounts.instanceMatrix.needsUpdate = true;
  side_stones.instanceMatrix.needsUpdate = true;
  band_group.add(side_stone_mounts);
  band_group.add(side_stones);

  const central_mountGeom = new THREE.CylinderGeometry(
    0.318,
    0.338,
    0.055,
    64
  );
  const central_mount = new THREE.Mesh(central_mountGeom, silverMat);
  central_mount.name = "central_mount";
  central_mount.rotation.x = Math.PI / 2;
  central_mount.position.set(0, 0.055, -0.005);
  setting_group.add(central_mount);

  const central_diamondGeom = createBrilliantGeometry(0.34, 32);
  const central_diamond = new THREE.Mesh(
    central_diamondGeom,
    diamondMat
  );
  central_diamond.name = "central_diamond";
  central_diamond.position.set(0, 0.055, 0.075);
  crown_group.add(central_diamond);

  const central_facet_linesGeom = createFacetLineGeometry(0.34, 32);
  const central_facet_lines = new THREE.LineSegments(
    central_facet_linesGeom,
    facet_lineMat
  );
  central_facet_lines.name = "central_facet_lines";
  central_facet_lines.position.copy(central_diamond.position);
  crown_group.add(central_facet_lines);

  const prong_postsGeom = new THREE.CylinderGeometry(
    0.012,
    0.018,
    0.105,
    10
  );
  const prong_posts = new THREE.InstancedMesh(
    prong_postsGeom,
    silverMat,
    6
  );
  prong_posts.name = "prong_posts";

  const prongsGeom = new THREE.SphereGeometry(0.035, 18, 10);
  const prongs = new THREE.InstancedMesh(prongsGeom, silverMat, 6);
  prongs.name = "prongs";

  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 2 + i / 6 * Math.PI * 2;
    const x = Math.cos(angle) * 0.342;
    const y = 0.055 + Math.sin(angle) * 0.342;

    dummy.position.set(x, y, 0.028);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    prong_posts.setMatrixAt(i, dummy.matrix);

    dummy.position.set(x, y, 0.108);
    dummy.rotation.set(0, 0, angle);
    dummy.scale.set(0.82, 1.18, 0.82);
    dummy.updateMatrix();
    prongs.setMatrixAt(i, dummy.matrix);
  }
  prong_posts.instanceMatrix.needsUpdate = true;
  prongs.instanceMatrix.needsUpdate = true;
  crown_group.add(prong_posts);
  crown_group.add(prongs);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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
