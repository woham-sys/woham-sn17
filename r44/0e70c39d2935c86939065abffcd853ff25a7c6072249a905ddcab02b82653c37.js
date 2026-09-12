// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "hammered_bronze_vessel";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x8f6748,
    metalness: 0.6,
    roughness: 0.32,
  });

  const base_rimMat = new THREE.MeshStandardMaterial({
    color: 0xb88955,
    metalness: 0.6,
    roughness: 0.28,
  });

  const neckMat = new THREE.MeshStandardMaterial({
    color: 0x76543d,
    metalness: 0.6,
    roughness: 0.36,
  });

  const top_openingMat = new THREE.MeshStandardMaterial({
    color: 0x241b14,
    metalness: 0.0,
    roughness: 0.8,
  });

  const hammered_dimplesMat = new THREE.MeshStandardMaterial({
    color: 0x4d382b,
    metalness: 0.45,
    roughness: 0.62,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  });

  const hammered_rimsMat = new THREE.MeshStandardMaterial({
    color: 0xc39a6d,
    metalness: 0.55,
    roughness: 0.4,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
  });

  const bodyProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.5, 0.0),
    new THREE.Vector2(0.55, 0.012),
    new THREE.Vector2(0.57, 0.035),
  ];

  const lowerBodyCurve = new THREE.CubicBezierCurve(
    new THREE.Vector2(0.57, 0.035),
    new THREE.Vector2(0.59, 0.16),
    new THREE.Vector2(0.39, 0.48),
    new THREE.Vector2(0.34, 0.72)
  );
  const middleBodyCurve = new THREE.CubicBezierCurve(
    new THREE.Vector2(0.34, 0.72),
    new THREE.Vector2(0.32, 0.91),
    new THREE.Vector2(0.32, 1.17),
    new THREE.Vector2(0.3, 1.28)
  );
  const shoulderCurve = new THREE.CubicBezierCurve(
    new THREE.Vector2(0.3, 1.28),
    new THREE.Vector2(0.295, 1.35),
    new THREE.Vector2(0.22, 1.39),
    new THREE.Vector2(0.13, 1.4)
  );

  const lowerBodyPoints = lowerBodyCurve.getPoints(20);
  const middleBodyPoints = middleBodyCurve.getPoints(20);
  const shoulderPoints = shoulderCurve.getPoints(14);

  for (let i = 1; i < lowerBodyPoints.length; i++) bodyProfile.push(lowerBodyPoints[i]);
  for (let i = 1; i < middleBodyPoints.length; i++) bodyProfile.push(middleBodyPoints[i]);
  for (let i = 1; i < shoulderPoints.length; i++) bodyProfile.push(shoulderPoints[i]);

  bodyProfile.push(
    new THREE.Vector2(0.115, 1.405),
    new THREE.Vector2(0.0, 1.405)
  );

  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 96);
  const bodyPosition = bodyGeom.attributes.position;

  for (let i = 0; i < bodyPosition.count; i++) {
    const x = bodyPosition.getX(i);
    const y = bodyPosition.getY(i);
    const z = bodyPosition.getZ(i);
    const radius = Math.sqrt(x * x + z * z);

    if (radius > 0.025 && y > 0.025 && y < 1.385) {
      const angle = Math.atan2(z, x);
      const edgeFade = Math.min(1, y / 0.055, (1.385 - y) / 0.055);
      const wave =
        Math.sin(angle * 17 + y * 31) *
        Math.sin(angle * 11 - y * 23);
      const displacedRadius = radius + wave * 0.0055 * edgeFade;
      const radialScale = displacedRadius / radius;
      bodyPosition.setXYZ(i, x * radialScale, y, z * radialScale);
    }
  }

  bodyPosition.needsUpdate = true;
  bodyGeom.computeVertexNormals();

  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  root.add(body);

  const base_rimGeom = new THREE.TorusGeometry(0.548, 0.014, 12, 96);
  const base_rim = new THREE.Mesh(base_rimGeom, base_rimMat);
  base_rim.name = "base_rim";
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.018;
  root.add(base_rim);

  const neckProfile = [
    new THREE.Vector2(0.0, 1.375),
    new THREE.Vector2(0.13, 1.375),
    new THREE.Vector2(0.15, 1.39),
    new THREE.Vector2(0.145, 1.415),
    new THREE.Vector2(0.115, 1.445),
    new THREE.Vector2(0.1, 1.47),
    new THREE.Vector2(0.1, 1.55),
    new THREE.Vector2(0.095, 1.575),
    new THREE.Vector2(0.078, 1.59),
    new THREE.Vector2(0.0, 1.59),
  ];
  const neckGeom = new THREE.LatheGeometry(neckProfile, 64);
  const neck = new THREE.Mesh(neckGeom, neckMat);
  neck.name = "neck";
  root.add(neck);

  const top_lipGeom = new THREE.TorusGeometry(0.078, 0.01, 10, 64);
  const top_lip = new THREE.Mesh(top_lipGeom, base_rimMat);
  top_lip.name = "top_lip";
  top_lip.rotation.x = Math.PI / 2;
  top_lip.position.y = 1.587;
  root.add(top_lip);

  const top_openingGeom = new THREE.CylinderGeometry(0.068, 0.068, 0.006, 48);
  const top_opening = new THREE.Mesh(top_openingGeom, top_openingMat);
  top_opening.name = "top_opening";
  top_opening.position.y = 1.592;
  root.add(top_opening);

  function bodyRadiusAt(y) {
    if (y <= 0.035) return 0.57;
    if (y <= 0.72) {
      const t = (y - 0.035) / 0.685;
      const s = t * t * (3 - 2 * t);
      return 0.57 + (0.34 - 0.57) * s;
    }
    if (y <= 1.28) {
      const t = (y - 0.72) / 0.56;
      const s = t * t * (3 - 2 * t);
      return 0.34 + (0.3 - 0.34) * s;
    }
    if (y <= 1.4) {
      const t = (y - 1.28) / 0.12;
      const s = t * t * (3 - 2 * t);
      return 0.3 + (0.13 - 0.3) * s;
    }
    return 0.13;
  }

  const dimpleData = [];
  const dimpleColumns = 18;
  const dimpleRows = 14;

  for (let row = 0; row < dimpleRows; row++) {
    const baseY = 0.09 + row * 0.091;
    for (let column = 0; column < dimpleColumns; column++) {
      const stagger = row % 2 === 0 ? 0 : 0.5;
      const angle =
        ((column + stagger) / dimpleColumns) * Math.PI * 2 +
        Math.sin(row * 1.73 + column * 0.91) * 0.035;
      const y =
        baseY +
        Math.sin(column * 1.37 + row * 0.79) * 0.012;
      const radius = bodyRadiusAt(y);
      const size =
        0.022 +
        0.012 * (0.5 + 0.5 * Math.sin(column * 2.11 + row * 1.31));
      const widthScale =
        0.72 + 0.25 * (0.5 + 0.5 * Math.sin(column * 1.19 - row * 0.67));
      const heightScale =
        1.05 + 0.38 * (0.5 + 0.5 * Math.sin(column * 0.83 + row * 1.57));

      dimpleData.push({
        angle,
        y,
        radius,
        size,
        widthScale,
        heightScale,
      });
    }
  }

  const hammered_dimplesGeom = new THREE.CircleGeometry(1, 14);
  const hammered_dimples = new THREE.InstancedMesh(
    hammered_dimplesGeom,
    hammered_dimplesMat,
    dimpleData.length
  );
  hammered_dimples.name = "hammered_dimples";

  const hammered_rimsGeom = new THREE.RingGeometry(0.68, 1, 14);
  const hammered_rims = new THREE.InstancedMesh(
    hammered_rimsGeom,
    hammered_rimsMat,
    dimpleData.length
  );
  hammered_rims.name = "hammered_rims";

  const dummy = new THREE.Object3D();
  const outwardAxis = new THREE.Vector3(0, 0, 1);
  const normal = new THREE.Vector3();

  for (let i = 0; i < dimpleData.length; i++) {
    const data = dimpleData[i];
    const cosAngle = Math.cos(data.angle);
    const sinAngle = Math.sin(data.angle);

    normal.set(cosAngle, 0, sinAngle);

    dummy.position.set(
      cosAngle * (data.radius + 0.006),
      data.y,
      sinAngle * (data.radius + 0.006)
    );
    dummy.quaternion.setFromUnitVectors(outwardAxis, normal);
    dummy.scale.set(data.size * data.widthScale, data.size * data.heightScale, 1);
    dummy.updateMatrix();
    hammered_dimples.setMatrixAt(i, dummy.matrix);

    dummy.position.set(
      cosAngle * (data.radius + 0.007),
      data.y,
      sinAngle * (data.radius + 0.007)
    );
    dummy.updateMatrix();
    hammered_rims.setMatrixAt(i, dummy.matrix);
  }

  hammered_dimples.instanceMatrix.needsUpdate = true;
  hammered_rims.instanceMatrix.needsUpdate = true;
  root.add(hammered_dimples, hammered_rims);

  const neck_dimpleData = [];
  const neckColumns = 12;
  const neckRows = 3;

  for (let row = 0; row < neckRows; row++) {
    for (let column = 0; column < neckColumns; column++) {
      const angle =
        ((column + row * 0.45) / neckColumns) * Math.PI * 2 +
        Math.sin(column + row * 1.4) * 0.035;
      const y =
        1.485 +
        row * 0.027 +
        Math.sin(column * 1.8 + row) * 0.004;
      const size =
        0.008 +
        0.004 * (0.5 + 0.5 * Math.sin(column * 1.23 + row * 2.1));

      neck_dimpleData.push({
        angle,
        y,
        size,
      });
    }
  }

  const neck_dimplesGeom = new THREE.CircleGeometry(1, 12);
  const neck_dimples = new THREE.InstancedMesh(
    neck_dimplesGeom,
    hammered_dimplesMat,
    neck_dimpleData.length
  );
  neck_dimples.name = "neck_dimples";

  for (let i = 0; i < neck_dimpleData.length; i++) {
    const data = neck_dimpleData[i];
    const cosAngle = Math.cos(data.angle);
    const sinAngle = Math.sin(data.angle);
    const radius = 0.102;

    normal.set(cosAngle, 0, sinAngle);
    dummy.position.set(
      cosAngle * (radius + 0.003),
      data.y,
      sinAngle * (radius + 0.003)
    );
    dummy.quaternion.setFromUnitVectors(outwardAxis, normal);
    dummy.scale.set(data.size * 0.8, data.size * 1.15, 1);
    dummy.updateMatrix();
    neck_dimples.setMatrixAt(i, dummy.matrix);
  }

  neck_dimples.instanceMatrix.needsUpdate = true;
  root.add(neck_dimples);

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