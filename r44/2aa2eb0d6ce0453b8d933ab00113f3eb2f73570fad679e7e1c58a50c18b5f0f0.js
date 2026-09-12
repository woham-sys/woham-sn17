// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_gemstone_ring";

  const shank_group = new THREE.Group();
  shank_group.name = "shank_group";
  root.add(shank_group);

  const face_group = new THREE.Group();
  face_group.name = "face_group";
  root.add(face_group);

  const gemstone_group = new THREE.Group();
  gemstone_group.name = "gemstone_group";
  face_group.add(gemstone_group);

  const bronzeMat = new THREE.MeshStandardMaterial({
    color: 0xa87945,
    metalness: 0.5,
    roughness: 0.5
  });
  const raisedBronzeMat = new THREE.MeshStandardMaterial({
    color: 0xc39a62,
    metalness: 0.5,
    roughness: 0.38
  });
  const darkPatinaMat = new THREE.MeshStandardMaterial({
    color: 0x34261b,
    metalness: 0.2,
    roughness: 0.85
  });
  const pitCenterMat = new THREE.MeshStandardMaterial({
    color: 0x211913,
    metalness: 0.1,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const pitRimMat = new THREE.MeshStandardMaterial({
    color: 0x68472d,
    metalness: 0.35,
    roughness: 0.75,
    side: THREE.DoubleSide
  });
  const gemstoneMat = new THREE.MeshStandardMaterial({
    color: 0x063b2c,
    metalness: 0.0,
    roughness: 0.22
  });
  const gemstoneFacetMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.18,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide
  });

  const ring_shankGeom = new THREE.TorusGeometry(0.49, 0.078, 14, 64);
  const ring_shank = new THREE.Mesh(ring_shankGeom, bronzeMat);
  ring_shank.name = "ring_shank";
  ring_shank.rotation.x = Math.PI / 2;
  ring_shank.position.set(0, -0.035, -0.43);
  shank_group.add(ring_shank);

  const left_shoulderPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.43, -0.025, -0.015),
    new THREE.Vector3(-0.51, -0.025, -0.08),
    new THREE.Vector3(-0.58, -0.03, -0.18),
    new THREE.Vector3(-0.62, -0.035, -0.31)
  ]);
  const left_shoulderGeom = new THREE.TubeGeometry(
    left_shoulderPath,
    20,
    0.095,
    12,
    false
  );
  const left_shoulder = new THREE.Mesh(left_shoulderGeom, bronzeMat);
  left_shoulder.name = "left_shoulder";
  shank_group.add(left_shoulder);

  const right_shoulderPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.43, -0.025, -0.015),
    new THREE.Vector3(0.51, -0.025, -0.08),
    new THREE.Vector3(0.58, -0.03, -0.18),
    new THREE.Vector3(0.62, -0.035, -0.31)
  ]);
  const right_shoulderGeom = new THREE.TubeGeometry(
    right_shoulderPath,
    20,
    0.095,
    12,
    false
  );
  const right_shoulder = new THREE.Mesh(right_shoulderGeom, bronzeMat);
  right_shoulder.name = "right_shoulder";
  shank_group.add(right_shoulder);

  const outer_backplateGeom = new THREE.CylinderGeometry(0.625, 0.65, 0.12, 64);
  const outer_backplate = new THREE.Mesh(outer_backplateGeom, bronzeMat);
  outer_backplate.name = "outer_backplate";
  outer_backplate.rotation.x = Math.PI / 2;
  outer_backplate.position.z = -0.015;
  face_group.add(outer_backplate);

  const outer_front_plateGeom = new THREE.CylinderGeometry(0.615, 0.625, 0.055, 64);
  const outer_front_plate = new THREE.Mesh(outer_front_plateGeom, bronzeMat);
  outer_front_plate.name = "outer_front_plate";
  outer_front_plate.rotation.x = Math.PI / 2;
  outer_front_plate.position.z = 0.035;
  face_group.add(outer_front_plate);

  const outer_raised_rimGeom = new THREE.TorusGeometry(0.595, 0.027, 12, 64);
  const outer_raised_rim = new THREE.Mesh(outer_raised_rimGeom, raisedBronzeMat);
  outer_raised_rim.name = "outer_raised_rim";
  outer_raised_rim.position.z = 0.073;
  face_group.add(outer_raised_rim);

  const outer_patina_lineGeom = new THREE.TorusGeometry(0.565, 0.007, 8, 64);
  const outer_patina_line = new THREE.Mesh(outer_patina_lineGeom, darkPatinaMat);
  outer_patina_line.name = "outer_patina_line";
  outer_patina_line.position.z = 0.092;
  face_group.add(outer_patina_line);

  const pitCount = 26;
  const pit_centerGeom = new THREE.CircleGeometry(1, 14);
  const pit_rimGeom = new THREE.RingGeometry(0.61, 1, 14);
  const pit_centers = new THREE.InstancedMesh(pit_centerGeom, pitCenterMat, pitCount);
  const pit_rims = new THREE.InstancedMesh(pit_rimGeom, pitRimMat, pitCount);
  pit_centers.name = "pit_centers";
  pit_rims.name = "pit_rims";

  const pitDummy = new THREE.Object3D();
  for (let i = 0; i < pitCount; i++) {
    const angle = i / pitCount * Math.PI * 2 + Math.sin(i * 1.73) * 0.035;
    const radius = 0.505 + Math.sin(i * 2.19) * 0.018;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const sx = 0.027 + (0.5 + 0.5 * Math.sin(i * 2.47)) * 0.018;
    const sy = 0.024 + (0.5 + 0.5 * Math.cos(i * 1.91)) * 0.017;

    pitDummy.position.set(x, y, 0.096);
    pitDummy.rotation.set(0, 0, angle + Math.sin(i * 0.83) * 0.7);
    pitDummy.scale.set(sx, sy, 1);
    pitDummy.updateMatrix();
    pit_centers.setMatrixAt(i, pitDummy.matrix);

    pitDummy.position.z = 0.094;
    pitDummy.scale.set(sx * 1.18, sy * 1.18, 1);
    pitDummy.updateMatrix();
    pit_rims.setMatrixAt(i, pitDummy.matrix);
  }
  pit_centers.instanceMatrix.needsUpdate = true;
  pit_rims.instanceMatrix.needsUpdate = true;
  face_group.add(pit_rims, pit_centers);

  const central_bezelGeom = new THREE.CylinderGeometry(0.405, 0.425, 0.075, 64);
  const central_bezel = new THREE.Mesh(central_bezelGeom, bronzeMat);
  central_bezel.name = "central_bezel";
  central_bezel.rotation.x = Math.PI / 2;
  central_bezel.position.z = 0.075;
  face_group.add(central_bezel);

  const bezel_outer_rimGeom = new THREE.TorusGeometry(0.375, 0.034, 14, 64);
  const bezel_outer_rim = new THREE.Mesh(bezel_outer_rimGeom, raisedBronzeMat);
  bezel_outer_rim.name = "bezel_outer_rim";
  bezel_outer_rim.position.z = 0.116;
  face_group.add(bezel_outer_rim);

  const bezel_outer_grooveGeom = new THREE.TorusGeometry(0.337, 0.008, 8, 64);
  const bezel_outer_groove = new THREE.Mesh(bezel_outer_grooveGeom, darkPatinaMat);
  bezel_outer_groove.name = "bezel_outer_groove";
  bezel_outer_groove.position.z = 0.132;
  face_group.add(bezel_outer_groove);

  const bezel_inner_grooveGeom = new THREE.TorusGeometry(0.309, 0.007, 8, 64);
  const bezel_inner_groove = new THREE.Mesh(bezel_inner_grooveGeom, darkPatinaMat);
  bezel_inner_groove.name = "bezel_inner_groove";
  bezel_inner_groove.position.z = 0.139;
  face_group.add(bezel_inner_groove);

  const gemstone_seatGeom = new THREE.CylinderGeometry(0.313, 0.313, 0.035, 64);
  const gemstone_seat = new THREE.Mesh(gemstone_seatGeom, darkPatinaMat);
  gemstone_seat.name = "gemstone_seat";
  gemstone_seat.rotation.x = Math.PI / 2;
  gemstone_seat.position.z = 0.126;
  gemstone_group.add(gemstone_seat);

  const gemstone_girdleGeom = new THREE.TorusGeometry(0.286, 0.026, 12, 64);
  const gemstone_girdle = new THREE.Mesh(gemstone_girdleGeom, gemstoneMat);
  gemstone_girdle.name = "gemstone_girdle";
  gemstone_girdle.position.z = 0.151;
  gemstone_group.add(gemstone_girdle);

  const facetPositions = [];
  const facetColors = [];
  const facetPalette = [
    0x03271f,
    0x074431,
    0x0b5940,
    0x147052,
    0x268663,
    0x4aa17d,
    0x78b9a0,
    0xa8d0c2,
    0x526f63,
    0x173c31
  ];

  function addFacetTriangle(a, b, c, colorHex) {
    facetPositions.push(
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z
    );
    const color = new THREE.Color(colorHex);
    for (let i = 0; i < 3; i++) {
      facetColors.push(color.r, color.g, color.b);
    }
  }

  const facetCount = 16;
  const innerRing = [];
  const middleRing = [];
  const outerRing = [];
  const backRing = [];

  for (let i = 0; i < facetCount; i++) {
    const angle = i / facetCount * Math.PI * 2;
    const offsetAngle = angle + Math.PI / facetCount;

    innerRing.push(new THREE.Vector3(
      Math.cos(offsetAngle) * 0.095,
      Math.sin(offsetAngle) * 0.095,
      0.198 + Math.sin(i * 1.7) * 0.004
    ));
    middleRing.push(new THREE.Vector3(
      Math.cos(angle) * 0.195,
      Math.sin(angle) * 0.195,
      0.184 + Math.cos(i * 1.3) * 0.005
    ));
    outerRing.push(new THREE.Vector3(
      Math.cos(angle) * 0.286,
      Math.sin(angle) * 0.286,
      0.153
    ));
    backRing.push(new THREE.Vector3(
      Math.cos(angle) * 0.282,
      Math.sin(angle) * 0.282,
      0.126
    ));
  }

  const tableCenter = new THREE.Vector3(0, 0, 0.207);

  for (let i = 0; i < facetCount; i++) {
    const next = (i + 1) % facetCount;

    addFacetTriangle(
      tableCenter,
      innerRing[i],
      innerRing[next],
      facetPalette[(i * 3 + 5) % facetPalette.length]
    );

    addFacetTriangle(
      innerRing[i],
      middleRing[i],
      middleRing[next],
      facetPalette[(i * 5 + 2) % facetPalette.length]
    );
    addFacetTriangle(
      innerRing[i],
      middleRing[next],
      innerRing[next],
      facetPalette[(i * 7 + 6) % facetPalette.length]
    );

    addFacetTriangle(
      middleRing[i],
      outerRing[i],
      outerRing[next],
      facetPalette[(i * 3 + 1) % facetPalette.length]
    );
    addFacetTriangle(
      middleRing[i],
      outerRing[next],
      middleRing[next],
      facetPalette[(i * 5 + 7) % facetPalette.length]
    );

    addFacetTriangle(
      outerRing[i],
      backRing[i],
      backRing[next],
      facetPalette[(i + 2) % 5]
    );
    addFacetTriangle(
      outerRing[i],
      backRing[next],
      outerRing[next],
      facetPalette[(i + 3) % 5]
    );
  }

  const gemstone_facetsGeom = new THREE.BufferGeometry();
  gemstone_facetsGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(facetPositions, 3)
  );
  gemstone_facetsGeom.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(facetColors, 3)
  );
  gemstone_facetsGeom.computeVertexNormals();

  const gemstone_facets = new THREE.Mesh(gemstone_facetsGeom, gemstoneFacetMat);
  gemstone_facets.name = "gemstone_facets";
  gemstone_group.add(gemstone_facets);

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