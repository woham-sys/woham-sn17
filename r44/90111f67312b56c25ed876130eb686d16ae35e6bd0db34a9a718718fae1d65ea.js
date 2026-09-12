// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const ball_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xff7a32,
    metalness: 0.0,
    roughness: 0.95,
  });

  const yellow_bandMat = new THREE.MeshStandardMaterial({
    color: 0xffef38,
    metalness: 0.0,
    roughness: 0.95  });

  const orange_fuzzMat = new THREE.MeshStandardMaterial({
    color: 0xff8a45,
    metalness: 0.0,
    roughness: 0.95  });

  const yellow_fuzzMat = new THREE.MeshStandardMaterial({
    color: 0xfff65a,
    metalness: 0.0,
    roughness: 0.95  });

  const ball_bodyGeom = new THREE.SphereGeometry(1, 64, 40);
  const ball_body = new THREE.Mesh(ball_bodyGeom, ball_bodyMat);
  root.add(ball_body);

  const bandNormal = new THREE.Vector3(0.78, -0.55, 0.30).normalize();
  const bandQuaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    bandNormal
  );

  const yellow_bandGeom = new THREE.TorusGeometry(0.997, 0.045, 12, 128);
  const yellow_band = new THREE.Mesh(yellow_bandGeom, yellow_bandMat);
  yellow_band.quaternion.copy(bandQuaternion);
  root.add(yellow_band);

  const orange_fuzzGeom = new THREE.CylinderGeometry(0.0012, 0.0018, 0.026, 5);
  const orangeFuzzCount = 3200;
  const orange_fuzz = new THREE.InstancedMesh(
    orange_fuzzGeom,
    orange_fuzzMat,
    orangeFuzzCount
  );

  const fuzz_dummy = new THREE.Object3D();
  const fuzz_up = new THREE.Vector3(0, 1, 0);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < orangeFuzzCount; i++) {
    const y = 1 - 2 * (i + 0.5) / orangeFuzzCount;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = i * goldenAngle;
    const normal = new THREE.Vector3(
      Math.cos(angle) * radial,
      y,
      Math.sin(angle) * radial
    );
    const tangent = new THREE.Vector3(
      -Math.sin(angle),
      0,
      Math.cos(angle)
    );
    const lean = 0.22 * Math.sin(i * 1.731);
    const direction = normal.clone()
      .addScaledVector(tangent, lean)
      .normalize();
    const lengthScale = 0.72 + 0.42 * (0.5 + 0.5 * Math.sin(i * 2.417));

    fuzz_dummy.position.copy(normal).multiplyScalar(1.008);
    fuzz_dummy.quaternion.setFromUnitVectors(fuzz_up, direction);
    fuzz_dummy.scale.set(1, lengthScale, 1);
    fuzz_dummy.updateMatrix();
    orange_fuzz.setMatrixAt(i, fuzz_dummy.matrix);
  }

  orange_fuzz.instanceMatrix.needsUpdate = true;
  root.add(orange_fuzz);

  const yellow_fuzzGeom = orange_fuzzGeom;
  const yellowFuzzCount = 420;
  const yellow_fuzz = new THREE.InstancedMesh(
    yellow_fuzzGeom,
    yellow_fuzzMat,
    yellowFuzzCount
  );

  for (let i = 0; i < yellowFuzzCount; i++) {
    const y = 1 - 2 * (i + 0.5) / yellowFuzzCount;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = i * goldenAngle + 0.83;
    const normal = new THREE.Vector3(
      Math.cos(angle) * radial,
      y,
      Math.sin(angle) * radial
    );
    const tangent = new THREE.Vector3(
      -Math.sin(angle),
      0,
      Math.cos(angle)
    );
    const lean = 0.18 * Math.sin(i * 1.913);
    const direction = normal.clone()
      .addScaledVector(tangent, lean)
      .normalize();
    const lengthScale = 0.70 + 0.40 * (0.5 + 0.5 * Math.sin(i * 2.173));

    fuzz_dummy.position.copy(normal).multiplyScalar(1.044);
    fuzz_dummy.quaternion.setFromUnitVectors(fuzz_up, direction);
    fuzz_dummy.scale.set(1, lengthScale, 1);
    fuzz_dummy.updateMatrix();
    yellow_fuzz.setMatrixAt(i, fuzz_dummy.matrix);
  }

  yellow_fuzz.instanceMatrix.needsUpdate = true;
  root.add(yellow_fuzz);

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