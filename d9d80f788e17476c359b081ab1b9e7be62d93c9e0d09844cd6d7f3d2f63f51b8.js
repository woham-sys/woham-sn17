function __sn17_user(THREE) {
  const root = new THREE.Group();

  const ballR = 1.0;
  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xf27a2d,
    roughness: 0.78,
  });
  const pebbleMat = new THREE.MeshStandardMaterial({
    color: 0xd96822,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });

  const basketball_body = new THREE.Mesh(new THREE.SphereGeometry(ballR, 96, 48), orangeMat);
  root.add(basketball_body);

  const pebbleGeom = new THREE.CircleGeometry(0.0105, 8);
  const pebbleCount = 3600;
  const surface_pebbles = new THREE.InstancedMesh(pebbleGeom, pebbleMat, pebbleCount);
  const dummy = new THREE.Object3D();
  const zAxis = new THREE.Vector3(0, 0, 1);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < pebbleCount; i++) {
    const y = 1 - 2 * (i + 0.5) / pebbleCount;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * goldenAngle;
    const normal = new THREE.Vector3(Math.cos(theta) * ring, y, Math.sin(theta) * ring).normalize();
    const sizeStep = (i * 7) % 9;
    const s = 0.78 + sizeStep * 0.035;
    dummy.position.copy(normal).multiplyScalar(ballR + 0.004);
    dummy.quaternion.setFromUnitVectors(zAxis, normal);
    dummy.scale.set(s, s, 1);
    dummy.updateMatrix();
    surface_pebbles.setMatrixAt(i, dummy.matrix);
  }
  surface_pebbles.instanceMatrix.needsUpdate = true;
  root.add(surface_pebbles);

  function spherePoint(x, y, extra) {
    const z = Math.sqrt(Math.max(0.001, 1 - x * x - y * y));
    return new THREE.Vector3(x, y, z).normalize().multiplyScalar(ballR + extra);
  }

  function makeTube(points, radius, mat) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, 96, radius, 10, false);
    return new THREE.Mesh(geom, mat);
  }

  const horizontal_seam = makeTube(
    Array.from({ length: 72 }, (_, i) => {
      const t = i / 71;
      const lon = -Math.PI + t * Math.PI * 2;
      return new THREE.Vector3(Math.cos(lon), 0, Math.sin(lon)).normalize().multiplyScalar(ballR + 0.012);
    }),
    0.018,
    blackMat
  );
  root.add(horizontal_seam);

  const curved_vertical_seam = makeTube(
    Array.from({ length: 80 }, (_, i) => {
      const t = i / 79;
      const lat = -1.42 + t * 2.84;
      const lon = -0.38 + Math.sin(t * Math.PI) * 0.58;
      const c = Math.cos(lat);
      return new THREE.Vector3(c * Math.sin(lon), Math.sin(lat), c * Math.cos(lon)).normalize().multiplyScalar(ballR + 0.012);
    }),
    0.018,
    blackMat
  );
  root.add(curved_vertical_seam);

  const upper_curved_seam = makeTube(
    Array.from({ length: 72 }, (_, i) => {
      const t = i / 71;
      const lat = 0.08 + t * 1.28;
      const lon = -1.05 + t * 1.65;
      const c = Math.cos(lat);
      return new THREE.Vector3(c * Math.sin(lon), Math.sin(lat), c * Math.cos(lon)).normalize().multiplyScalar(ballR + 0.012);
    }),
    0.017,
    blackMat
  );
  root.add(upper_curved_seam);

  const lower_left_panel_seam = makeTube(
    Array.from({ length: 48 }, (_, i) => {
      const t = i / 47;
      const lat = -0.02 - t * 1.05;
      const lon = -1.02 - Math.sin(t * Math.PI) * 0.28;
      const c = Math.cos(lat);
      return new THREE.Vector3(c * Math.sin(lon), Math.sin(lat), c * Math.cos(lon)).normalize().multiplyScalar(ballR + 0.011);
    }),
    0.014,
    blackMat
  );
  root.add(lower_left_panel_seam);

  function frontNormal(x, y) {
    return new THREE.Vector3(x, y, Math.sqrt(Math.max(0.001, 1 - x * x - y * y))).normalize();
  }

  function placeFrontPlane(mesh, x, y, rotZ, extra) {
    const normal = frontNormal(x, y);
    mesh.position.copy(normal).multiplyScalar(ballR + extra);
    mesh.quaternion.setFromUnitVectors(zAxis, normal);
    mesh.rotateZ(rotZ);
    root.add(mesh);
  }

  const logo_b_stem = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.34), blackMat);
  placeFrontPlane(logo_b_stem, -0.52, 0.34, -0.18, 0.018);

  const logo_b_top = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.065), blackMat);
  placeFrontPlane(logo_b_top, -0.45, 0.47, -0.18, 0.019);

  const logo_b_middle = new THREE.Mesh(new THREE.PlaneGeometry(0.17, 0.065), blackMat);
  placeFrontPlane(logo_b_middle, -0.44, 0.34, -0.18, 0.019);

  const logo_b_bottom = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.065), blackMat);
  placeFrontPlane(logo_b_bottom, -0.45, 0.21, -0.18, 0.019);

  const logo_a_left = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.31), blackMat);
  placeFrontPlane(logo_a_left, -0.31, 0.34, -0.42, 0.018);

  const logo_a_right = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.31), blackMat);
  placeFrontPlane(logo_a_right, -0.20, 0.34, 0.42, 0.018);

  const logo_a_crossbar = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.055), blackMat);
  placeFrontPlane(logo_a_crossbar, -0.255, 0.33, -0.08, 0.02);

  const logo_l_vertical = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.32), blackMat);
  placeFrontPlane(logo_l_vertical, -0.08, 0.34, -0.12, 0.018);

  const logo_l_horizontal = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.065), blackMat);
  placeFrontPlane(logo_l_horizontal, -0.01, 0.21, -0.12, 0.019);

  const lower_logo_hook = new THREE.Mesh(new THREE.PlaneGeometry(0.075, 0.30), blackMat);
  placeFrontPlane(lower_logo_hook, -0.48, -0.43, -0.55, 0.018);

  const lower_logo_bar = new THREE.Mesh(new THREE.PlaneGeometry(0.20, 0.07), blackMat);
  placeFrontPlane(lower_logo_bar, -0.39, -0.55, -0.55, 0.019);

  const small_side_mark_1 = new THREE.Mesh(new THREE.PlaneGeometry(0.025, 0.18), blackMat);
  placeFrontPlane(small_side_mark_1, -0.62, -0.25, -0.25, 0.018);

  const small_side_mark_2 = new THREE.Mesh(new THREE.PlaneGeometry(0.022, 0.13), blackMat);
  placeFrontPlane(small_side_mark_2, -0.58, -0.29, -0.25, 0.019);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
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
