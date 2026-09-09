function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "shag_fur_ottoman";

  const half = 0.43;
  const cornerRadius = 0.13;
  const topY = 0.435;
  const bottomY = -0.435;

  const ottoman_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x3b211d,
    roughness: 0.98
  });
  const top_cushionMat = new THREE.MeshStandardMaterial({
    color: 0x4b2925,
    roughness: 0.98
  });
  const center_rosetteMat = new THREE.MeshStandardMaterial({
    color: 0x291426,
    roughness: 0.98
  });
  const center_grooveMat = new THREE.MeshStandardMaterial({
    color: 0x120912,
    roughness: 1.0
  });

  const fur_navyMat = new THREE.MeshStandardMaterial({
    color: 0x11142f,
    roughness: 0.98
  });
  const fur_deep_purpleMat = new THREE.MeshStandardMaterial({
    color: 0x32183f,
    roughness: 0.98
  });
  const fur_plumMat = new THREE.MeshStandardMaterial({
    color: 0x542447,
    roughness: 0.98
  });
  const fur_wineMat = new THREE.MeshStandardMaterial({
    color: 0x6b2634,
    roughness: 0.98
  });
  const fur_burgundyMat = new THREE.MeshStandardMaterial({
    color: 0x762b27,
    roughness: 0.98
  });
  const fur_brownMat = new THREE.MeshStandardMaterial({
    color: 0x653829,
    roughness: 0.98
  });
  const fur_tanMat = new THREE.MeshStandardMaterial({
    color: 0x8a5a3c,
    roughness: 0.98
  });

  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-half + cornerRadius, bottomY);
  bodyShape.lineTo(half - cornerRadius, bottomY);
  bodyShape.quadraticCurveTo(half, bottomY, half, bottomY + cornerRadius);
  bodyShape.lineTo(half, topY - cornerRadius);
  bodyShape.quadraticCurveTo(half, topY, half - cornerRadius, topY);
  bodyShape.lineTo(-half + cornerRadius, topY);
  bodyShape.quadraticCurveTo(-half, topY, -half, topY - cornerRadius);
  bodyShape.lineTo(-half, bottomY + cornerRadius);
  bodyShape.quadraticCurveTo(-half, bottomY, -half + cornerRadius, bottomY);

  const ottoman_bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 0.86,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.045,
    bevelOffset: 0,
    bevelSegments: 5
  });
  ottoman_bodyGeom.translate(0, 0, -0.43);

  const ottoman_body = new THREE.Mesh(ottoman_bodyGeom, ottoman_bodyMat);
  ottoman_body.name = "ottoman_body";
  root.add(ottoman_body);

  const top_cushionGeom = new THREE.SphereGeometry(1, 32, 16);
  const top_cushion = new THREE.Mesh(top_cushionGeom, top_cushionMat);
  top_cushion.name = "top_cushion";
  top_cushion.position.set(0, 0.425, 0);
  top_cushion.scale.set(0.43, 0.055, 0.43);
  root.add(top_cushion);

  const center_rosetteGeom = new THREE.SphereGeometry(1, 32, 16);
  const center_rosette = new THREE.Mesh(center_rosetteGeom, center_rosetteMat);
  center_rosette.name = "center_rosette";
  center_rosette.position.set(0, 0.478, 0);
  center_rosette.scale.set(0.18, 0.022, 0.18);
  root.add(center_rosette);

  const center_grooveGeom = new THREE.TorusGeometry(0.18, 0.006, 8, 64);
  const center_groove = new THREE.Mesh(center_grooveGeom, center_grooveMat);
  center_groove.name = "center_groove";
  center_groove.rotation.x = Math.PI / 2;
  center_groove.position.set(0, 0.486, 0);
  root.add(center_groove);

  const fur_strandGeom = new THREE.CylinderGeometry(0.12, 1, 1, 5, 1, false);
  const strandGroups = Array.from({ length: 7 }, () => []);

  function wave01(value) {
    return 0.5 + 0.5 * Math.sin(value);
  }

  function pushStrand(colorIndex, start, end, radius) {
    strandGroups[colorIndex].push({
      start: start.clone(),
      end: end.clone(),
      radius
    });
  }

  function furColor(x, y, z, phase) {
    const broad =
      Math.sin(x * 7.2 + y * 5.4 - z * 4.1 + phase) +
      0.72 * Math.sin(-x * 4.6 + y * 8.3 + z * 6.2 + phase * 1.7) +
      0.42 * Math.sin((x + y - z) * 12.5 - phase);
    const fine = Math.sin(x * 18.0 - y * 13.0 + z * 16.0 + phase * 0.8);
    const value = broad * 0.82 + fine * 0.18;

    if (value < -1.15) return 0;
    if (value < -0.65) return 1;
    if (value < -0.15) return 2;
    if (value < 0.35) return 3;
    if (value < 0.82) return 4;
    if (value < 1.22) return 5;
    return 6;
  }

  function addTopFur(cx, cz, spanX, spanZ, rows, columns, phase) {
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const index = row * columns + column;
        const u = ((column + 0.5) / columns - 0.5) * 2;
        const v = ((row + 0.5) / rows - 0.5) * 2;
        const jitterU = 0.026 * Math.sin(index * 2.17 + phase);
        const jitterV = 0.026 * Math.sin(index * 1.43 - phase);
        const x = cx + (u + jitterU) * spanX;
        const z = cz + (v + jitterV) * spanZ;
        const radial = Math.min(
          1,
          Math.sqrt(
            (x * x) / (spanX * spanX) +
            (z * z) / (spanZ * spanZ)
          )
        );
        const dome = Math.pow(Math.max(0, 1 - radial * radial), 0.72);
        const surfaceY = 0.438 + 0.064 * dome;
        const length = 0.058 + 0.032 * wave01(index * 1.731 + phase);
        const leanX = 0.012 * Math.sin(index * 0.91 + phase);
        const leanZ = 0.012 * Math.sin(index * 1.27 - phase);
        const radius = 0.0042 + 0.0022 * wave01(index * 2.43 - phase);
        const colorIndex = furColor(x, surfaceY, z, phase);

        pushStrand(
          colorIndex,
          new THREE.Vector3(x, surfaceY, z),
          new THREE.Vector3(x + leanX, surfaceY + length, z + leanZ),
          radius
        );
      }
    }
  }

  function addFaceFur(face, phase) {
    const rows = 15;
    const columns = 18;
    const span = 0.72;

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const index = row * columns + column;
        const u = ((column + 0.5) / columns - 0.5) * span;
        const v = ((row + 0.5) / rows - 0.5) * span;
        const jitterU = 0.018 * Math.sin(index * 1.91 + phase);
        const jitterV = 0.016 * Math.sin(index * 2.37 - phase);
        const length = 0.052 + 0.034 * wave01(index * 1.619 + phase);
        const tangentLean = 0.012 * Math.sin(index * 1.13 + phase);
        const outward = 0.010 + 0.010 * wave01(index * 2.07 - phase);
        const radius = 0.0043 + 0.0022 * wave01(index * 2.63 + phase);
        let x;
        let y;
        let z;
        let start;
        let end;
        let colorIndex;

        if (face === 0) {
          x = u;
          y = v;
          z = 0.477;
          start = new THREE.Vector3(x, y, z);
          end = new THREE.Vector3(x + tangentLean, y, z + length);
          colorIndex = furColor(x, y, z, phase);
        } else if (face === 1) {
          x = u;
          y = v;
          z = -0.477;
          start = new THREE.Vector3(x, y, z);
          end = new THREE.Vector3(x + tangentLean, y, z - length);
          colorIndex = furColor(x, y, z, phase + 1.4);
        } else if (face === 2) {
          x = 0.477;
          y = v;
          z = u;
          start = new THREE.Vector3(x, y, z);
          end = new THREE.Vector3(x + length, y, z + tangentLean);
          colorIndex = furColor(x, y, z, phase + 2.8);
        } else {
          x = -0.477;
          y = v;
          z = u;
          start = new THREE.Vector3(x, y, z);
          end = new THREE.Vector3(x - length, y, z + tangentLean);
          colorIndex = furColor(x, y, z, phase + 4.2);
        }

        pushStrand(colorIndex, start, end, radius);
      }
    }
  }

  function addCornerFur(sx, sz, phase) {
    const rows = 13;
    const columns = 6;

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const index = row * columns + column;
        const t = (column + 0.5) / columns;
        const angle = t * Math.PI / 2;
        const nx = sx * Math.cos(angle);
        const nz = sz * Math.sin(angle);
        const y = -0.36 + ((row + 0.5) / rows) * 0.72;
        const jitterY = 0.014 * Math.sin(index * 1.79 - phase);
        const length = 0.052 + 0.032 * wave01(index * 1.47 + phase);
        const tangentLean = 0.010 * Math.sin(index * 2.11 + phase);
        const outward = 0.012 + 0.009 * wave01(index * 2.53 - phase);
        const radius = 0.0042 + 0.0021 * wave01(index * 2.87 + phase);
        const x = sx * (cornerRadius + 0.045) + nx * outward;
        const z = sz * (cornerRadius + 0.045) + nz * outward;
        const start = new THREE.Vector3(x, y + jitterY, z);
        const end = new THREE.Vector3(
          x + nx * length + tangentLean,
          y,
          z + nz * length
        );
        const colorIndex = furColor(x, y, z, phase);

        pushStrand(colorIndex, start, end, radius);
      }
    }
  }

  addTopFur(0, 0, 0.39, 0.39, 16, 16, 0.35);
  addTopFur(-0.255, 0, 0.145, 0.39, 13, 8, 1.1);
  addTopFur(0.255, 0, 0.145, 0.39, 13, 8, 2.25);
  addTopFur(0, -0.255, 0.39, 0.145, 8, 13, 3.4);
  addTopFur(0, 0.255, 0.39, 0.145, 8, 13, 4.55);

  addFaceFur(0, 0.7);
  addFaceFur(1, 1.8);
  addFaceFur(2, 2.9);
  addFaceFur(3, 4.0);

  addCornerFur(1, 1, 0.2);
  addCornerFur(-1, 1, 1.5);
  addCornerFur(1, -1, 2.8);
  addCornerFur(-1, -1, 4.1);

  function createFurInstances(records, material, name) {
    const fur = new THREE.InstancedMesh(
      fur_strandGeom,
      material,
      records.length
    );
    fur.name = name;

    const dummy = new THREE.Object3D();
    const up = new THREE.Vector3(0, 1, 0);
    const direction = new THREE.Vector3();

    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      direction.subVectors(record.end, record.start);
      const strandLength = direction.length();
      direction.multiplyScalar(1 / strandLength);

      dummy.position.copy(record.start).add(record.end).multiplyScalar(0.5);
      dummy.quaternion.setFromUnitVectors(up, direction);
      dummy.scale.set(record.radius, strandLength, record.radius);
      dummy.updateMatrix();
      fur.setMatrixAt(i, dummy.matrix);
    }

    fur.instanceMatrix.needsUpdate = true;
    fur.frustumCulled = false;
    root.add(fur);
    return fur;
  }

  const fur_navy = createFurInstances(
    strandGroups[0],
    fur_navyMat,
    "fur_navy"
  );
  const fur_deep_purple = createFurInstances(
    strandGroups[1],
    fur_deep_purpleMat,
    "fur_deep_purple"
  );
  const fur_plum = createFurInstances(
    strandGroups[2],
    fur_plumMat,
    "fur_plum"
  );
  const fur_wine = createFurInstances(
    strandGroups[3],
    fur_wineMat,
    "fur_wine"
  );
  const fur_burgundy = createFurInstances(
    strandGroups[4],
    fur_burgundyMat,
    "fur_burgundy"
  );
  const fur_brown = createFurInstances(
    strandGroups[5],
    fur_brownMat,
    "fur_brown"
  );
  const fur_tan = createFurInstances(
    strandGroups[6],
    fur_tanMat,
    "fur_tan"
  );

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
