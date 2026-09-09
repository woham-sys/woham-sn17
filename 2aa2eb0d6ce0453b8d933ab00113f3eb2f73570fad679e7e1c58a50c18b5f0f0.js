function __sn17_user(THREE) {
  const root = new THREE.Group();
  const jewelry = new THREE.Group();
  root.add(jewelry);

  const bronzeMat = new THREE.MeshStandardMaterial({
    color: 0xb8864a,
    metalness: 0.7,
    roughness: 0.42,
  });
  const darkBronzeMat = new THREE.MeshStandardMaterial({
    color: 0x5b3c24,
    metalness: 0.55,
    roughness: 0.62,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x211d18,
    metalness: 0.25,
    roughness: 0.85,
    side: THREE.DoubleSide,
  });
  const gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0x064b2d,
    metalness: 0.0,
    roughness: 0.12,
    transparent: true,
    opacity: 0.94,
    flatShading: true,
  });
  const gemstoneFacetMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.18,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  const ring_bandGeo = new THREE.TorusGeometry(0.31, 0.055, 16, 72);
  const ring_band = new THREE.Mesh(ring_bandGeo, bronzeMat);
  ring_band.position.set(0, -0.035, -0.25);
  jewelry.add(ring_band);

  const left_shoulderGeom = new THREE.CylinderGeometry(0.065, 0.055, 0.19, 24);
  const left_shoulder = new THREE.Mesh(left_shoulderGeom, bronzeMat);
  left_shoulder.rotation.z = Math.PI / 2;
  left_shoulder.position.set(-0.355, -0.035, -0.035);
  jewelry.add(left_shoulder);

  const right_shoulderGeom = left_shoulderGeom;
  const right_shoulder = new THREE.Mesh(right_shoulderGeom, bronzeMat);
  right_shoulder.rotation.z = Math.PI / 2;
  right_shoulder.position.set(0.355, -0.035, -0.035);
  jewelry.add(right_shoulder);

  const outer_plateGeom = new THREE.CylinderGeometry(0.46, 0.43, 0.11, 96);
  const outer_plate = new THREE.Mesh(outer_plateGeom, bronzeMat);
  outer_plate.rotation.x = Math.PI / 2;
  outer_plate.position.z = 0.015;
  jewelry.add(outer_plate);

  const outer_raised_rimGeom = new THREE.TorusGeometry(0.425, 0.026, 12, 96);
  const outer_raised_rim = new THREE.Mesh(outer_raised_rimGeom, bronzeMat);
  outer_raised_rim.position.z = 0.078;
  jewelry.add(outer_raised_rim);

  const outer_shadow_grooveGeom = new THREE.TorusGeometry(0.397, 0.006, 8, 96);
  const outer_shadow_groove = new THREE.Mesh(outer_shadow_grooveGeom, darkBronzeMat);
  outer_shadow_groove.position.z = 0.087;
  jewelry.add(outer_shadow_groove);

  const inner_bezelGeom = new THREE.CylinderGeometry(0.318, 0.325, 0.075, 96);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, bronzeMat);
  inner_bezel.rotation.x = Math.PI / 2;
  inner_bezel.position.z = 0.098;
  jewelry.add(inner_bezel);

  const bezel_outer_ridgeGeom = new THREE.TorusGeometry(0.294, 0.018, 12, 96);
  const bezel_outer_ridge = new THREE.Mesh(bezel_outer_ridgeGeom, bronzeMat);
  bezel_outer_ridge.position.z = 0.142;
  jewelry.add(bezel_outer_ridge);

  const bezel_inner_lipGeom = new THREE.TorusGeometry(0.255, 0.012, 12, 96);
  const bezel_inner_lip = new THREE.Mesh(bezel_inner_lipGeom, darkBronzeMat);
  bezel_inner_lip.position.z = 0.151;
  jewelry.add(bezel_inner_lip);

  const gemstone_seatGeom = new THREE.CylinderGeometry(0.247, 0.247, 0.026, 96);
  const gemstone_seat = new THREE.Mesh(gemstone_seatGeom, darkBronzeMat);
  gemstone_seat.rotation.x = Math.PI / 2;
  gemstone_seat.position.z = 0.139;
  jewelry.add(gemstone_seat);

  const gemstone_pavilionGeom = new THREE.ConeGeometry(0.235, 0.13, 48);
  const gemstone_pavilion = new THREE.Mesh(gemstone_pavilionGeom, gemstoneMat);
  gemstone_pavilion.rotation.x = -Math.PI / 2;
  gemstone_pavilion.position.z = 0.075;
  jewelry.add(gemstone_pavilion);

  const gemstone_crownGeom = new THREE.CylinderGeometry(0.18, 0.235, 0.075, 48);
  const gemstone_crown = new THREE.Mesh(gemstone_crownGeom, gemstoneMat);
  gemstone_crown.rotation.x = Math.PI / 2;
  gemstone_crown.position.z = 0.1625;
  jewelry.add(gemstone_crown);

  const gemstone_tableGeom = new THREE.CircleGeometry(0.18, 48);
  const gemstone_table = new THREE.Mesh(gemstone_tableGeom, gemstoneMat);
  gemstone_table.position.z = 0.201;
  jewelry.add(gemstone_table);

  const facetPositions = [];
  const facetColors = [];
  const facetPalette = [
    0x07351f,
    0x0b5632,
    0x16764a,
    0x2d9665,
    0x58b982,
    0x8ad3ad,
    0xc2e4cf,
    0x10482e,
    0x6fb990,
    0x1b6340,
  ];
  const facetCount = 16;
  const tableRadius = 0.178;
  const girdleRadius = 0.232;
  const tableZ = 0.202;
  const girdleZ = 0.157;

  for (let i = 0; i < facetCount; i++) {
    const a0 = i / facetCount * Math.PI * 2;
    const a1 = (i + 1) / facetCount * Math.PI * 2;
    const t0x = Math.cos(a0) * tableRadius;
    const t0y = Math.sin(a0) * tableRadius;
    const t1x = Math.cos(a1) * tableRadius;
    const t1y = Math.sin(a1) * tableRadius;
    const gx0 = Math.cos(a0) * girdleRadius;
    const gy0 = Math.sin(a0) * girdleRadius;
    const gx1 = Math.cos(a1) * girdleRadius;
    const gy1 = Math.sin(a1) * girdleRadius;

    facetPositions.push(t0x, t0y, tableZ, t1x, t1y, tableZ, gx1, gy1, girdleZ);
    facetPositions.push(t0x, t0y, tableZ, gx1, gy1, girdleZ, gx0, gy0, girdleZ);

    const c0 = new THREE.Color(facetPalette[(i * 3) % facetPalette.length]);
    const c1 = new THREE.Color(facetPalette[(i * 3 + 1) % facetPalette.length]);
    const c2 = new THREE.Color(facetPalette[(i * 3 + 2) % facetPalette.length]);
    facetColors.push(c0.r, c0.g, c0.b, c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
    facetColors.push(c0.r, c0.g, c0.b, c2.r, c2.g, c2.b, c1.r, c1.g, c1.b);
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
  jewelry.add(gemstone_facets);

  const spotCount = 28;
  const decorative_spotsGeom = new THREE.CircleGeometry(1, 14);
  const decorative_spots = new THREE.InstancedMesh(
    decorative_spotsGeom,
    patinaMat,
    spotCount
  );
  const dummy = new THREE.Object3D();

  for (let i = 0; i < spotCount; i++) {
    const angle = i / spotCount * Math.PI * 2 + 0.035 * Math.sin(i * 1.7);
    const radius = 0.355 + 0.012 * Math.sin(i * 2.31);
    const sx = 0.027 + 0.012 * (0.5 + 0.5 * Math.sin(i * 1.13));
    const sy = 0.018 + 0.010 * (0.5 + 0.5 * Math.cos(i * 1.47));
    dummy.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0.096);
    dummy.rotation.set(0, 0, angle + 0.45 * Math.sin(i * 0.91));
    dummy.scale.set(sx, sy, 1);
    dummy.updateMatrix();
    decorative_spots.setMatrixAt(i, dummy.matrix);
  }
  decorative_spots.instanceMatrix.needsUpdate = true;
  jewelry.add(decorative_spots);

  const spot_highlightsGeom = new THREE.CircleGeometry(1, 12);
  const spot_highlights = new THREE.InstancedMesh(
    spot_highlightsGeom,
    darkBronzeMat,
    spotCount
  );
  for (let i = 0; i < spotCount; i++) {
    const angle = i / spotCount * Math.PI * 2 + 0.035 * Math.sin(i * 1.7);
    const radius = 0.355 + 0.012 * Math.sin(i * 2.31);
    const offset = 0.006 + 0.004 * Math.sin(i * 0.73);
    const sx = 0.010 + 0.006 * (0.5 + 0.5 * Math.cos(i * 1.31));
    const sy = 0.006 + 0.004 * (0.5 + 0.5 * Math.sin(i * 1.57));
    dummy.position.set(
      Math.cos(angle) * radius + Math.cos(angle + Math.PI / 2) * offset,
      Math.sin(angle) * radius + Math.sin(angle + Math.PI / 2) * offset,
      0.097
    );
    dummy.rotation.set(0, 0, angle);
    dummy.scale.set(sx, sy, 1);
    dummy.updateMatrix();
    spot_highlights.setMatrixAt(i, dummy.matrix);
  }
  spot_highlights.instanceMatrix.needsUpdate = true;
  jewelry.add(spot_highlights);

  const surface_pitsGeom = new THREE.CircleGeometry(1, 8);
  const surface_pits = new THREE.InstancedMesh(surface_pitsGeom, patinaMat, 34);
  for (let i = 0; i < 34; i++) {
    const angle = i / 34 * Math.PI * 2 + 0.19 * Math.sin(i * 2.07);
    const radius = 0.326 + 0.068 * (0.5 + 0.5 * Math.sin(i * 1.83));
    const size = 0.0035 + 0.004 * (0.5 + 0.5 * Math.cos(i * 2.41));
    dummy.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0.098);
    dummy.rotation.set(0, 0, angle);
    dummy.scale.set(size * 1.25, size, 1);
    dummy.updateMatrix();
    surface_pits.setMatrixAt(i, dummy.matrix);
  }
  surface_pits.instanceMatrix.needsUpdate = true;
  jewelry.add(surface_pits);

  const bezel_patinaGeom = new THREE.CircleGeometry(1, 8);
  const bezel_patina = new THREE.InstancedMesh(bezel_patinaGeom, patinaMat, 22);
  for (let i = 0; i < 22; i++) {
    const angle = i / 22 * Math.PI * 2 + 0.08 * Math.sin(i * 1.4);
    const radius = 0.278 + 0.018 * Math.sin(i * 2.19);
    const size = 0.003 + 0.0035 * (0.5 + 0.5 * Math.sin(i * 1.91));
    dummy.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0.153);
    dummy.rotation.set(0, 0, angle);
    dummy.scale.set(size * 1.4, size, 1);
    dummy.updateMatrix();
    bezel_patina.setMatrixAt(i, dummy.matrix);
  }
  bezel_patina.instanceMatrix.needsUpdate = true;
  jewelry.add(bezel_patina);

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
