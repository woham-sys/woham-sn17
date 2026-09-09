function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "cheesecake";

  const tau = Math.PI * 2;
  const creamMat = new THREE.MeshStandardMaterial({ color: 0xfff7d8, emissive: 0x3a321c, emissiveIntensity: 0.12 });
  const crustMat = new THREE.MeshStandardMaterial({ color: 0xc99452, emissive: 0x3b2410, emissiveIntensity: 0.12 });
  const toastedCrustMat = new THREE.MeshStandardMaterial({ color: 0xa96f35, emissive: 0x2b1608, emissiveIntensity: 0.1 });
  const poreMat = new THREE.MeshStandardMaterial({ color: 0xd8bd76, side: THREE.DoubleSide });
  const crumbMat = new THREE.MeshStandardMaterial({ color: 0x9d571e, side: THREE.DoubleSide });
  const whippedCreamMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x2a2824, emissiveIntensity: 0.12 });
  const fruitFleshMat = new THREE.MeshStandardMaterial({ color: 0xf28b24, side: THREE.DoubleSide });
  const fruitSkinMat = new THREE.MeshStandardMaterial({ color: 0xb94418, side: THREE.DoubleSide });
  const fruitPitMat = new THREE.MeshStandardMaterial({ color: 0x8f1d13, side: THREE.DoubleSide });
  const fruitVeinMat = new THREE.MeshStandardMaterial({ color: 0xffc05a });

  function addBox(name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  const cake_body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.50, 0.50, 0.42, 96, 1, false),
    creamMat
  );
  cake_body.name = "cake_body";
  cake_body.position.y = 0.25;
  root.add(cake_body);

  const bottom_crust = new THREE.Mesh(
    new THREE.CylinderGeometry(0.515, 0.515, 0.13, 96, 1, false),
    crustMat
  );
  bottom_crust.name = "bottom_crust";
  bottom_crust.position.y = 0.065;
  root.add(bottom_crust);

  const top_surface = new THREE.Mesh(
    new THREE.CylinderGeometry(0.485, 0.485, 0.018, 96, 1, false),
    creamMat
  );
  top_surface.name = "top_surface";
  top_surface.position.y = 0.464;
  root.add(top_surface);

  const rim_points = [];
  for (let i = 0; i < 72; i++) {
    const a = i / 72 * tau;
    const r = 0.475 + 0.012 * Math.sin(i * 1.7) + 0.006 * Math.cos(i * 2.9);
    rim_points.push(new THREE.Vector3(Math.cos(a) * r, 0.477 + 0.006 * Math.sin(i * 1.3), Math.sin(a) * r));
  }
  const crust_rim = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rim_points, true, "centripetal"), 144, 0.027, 10, true),
    crustMat
  );
  crust_rim.name = "crust_rim";
  root.add(crust_rim);

  const front_cream_edge = addBox("front_cream_edge", 0.78, 0.026, 0.018, creamMat, 0, 0.285, 0.505);
  const left_broken_crust_edge = addBox("left_broken_crust_edge", 0.035, 0.36, 0.026, crustMat, -0.493, 0.25, 0.18);
  const right_broken_crust_edge = addBox("right_broken_crust_edge", 0.035, 0.36, 0.026, crustMat, 0.493, 0.25, 0.18);
  const left_top_crust_chunk = addBox("left_top_crust_chunk", 0.07, 0.055, 0.09, crustMat, -0.455, 0.47, 0.20);
  const right_top_crust_chunk = addBox("right_top_crust_chunk", 0.07, 0.055, 0.09, crustMat, 0.455, 0.47, 0.20);

  const poreGeom = new THREE.CircleGeometry(1, 12);
  const front_pores = new THREE.InstancedMesh(poreGeom, poreMat, 96);
  front_pores.name = "front_pores";
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 96; i++) {
    const col = i % 16;
    const row = Math.floor(i / 16);
    const x = -0.35 + col * 0.047 + (row % 2) * 0.018;
    const y = 0.145 + row * 0.052 + ((col * 7 + row * 3) % 5) * 0.004;
    const s = 0.006 + ((i * 13) % 9) * 0.0014;
    dummy.position.set(x, y, 0.508);
    dummy.rotation.set(0, 0, ((i * 5) % 11) * 0.18);
    dummy.scale.set(s * (1.0 + (i % 3) * 0.25), s * (0.75 + (i % 4) * 0.12), 1);
    dummy.updateMatrix();
    front_pores.instanceMatrix.needsUpdate = true;
  }
  root.add(front_pores);

  const crust_crumbs = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), crustMat, 110);
  crust_crumbs.name = "crust_crumbs";
  for (let i = 0; i < 110; i++) {
    const a = (i * 2.399963229728653) % tau;
    const y = 0.018 + ((i * 37) % 100) / 100 * 0.105;
    const r = 0.516 + ((i * 11) % 5) * 0.002;
    const s = 0.004 + ((i * 17) % 7) * 0.0012;
    dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
    dummy.rotation.set(i * 0.31, i * 0.17, i * 0.23);
    dummy.scale.set(s * 1.2, s * 0.8, s);
    dummy.updateMatrix();
    crust_crumbs.instanceMatrix.needsUpdate = true;
  }
  root.add(crust_crumbs);

  const rim_crumbs = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), crustMat, 72);
  rim_crumbs.name = "rim_crumbs";
  for (let i = 0; i < 72; i++) {
    const a = i / 72 * tau;
    const r = 0.475 + 0.012 * Math.sin(i * 1.7);
    const s = 0.006 + ((i * 19) % 6) * 0.0013;
    dummy.position.set(Math.cos(a) * r, 0.493 + ((i * 7) % 4) * 0.002, Math.sin(a) * r);
    dummy.rotation.set(i * 0.2, i * 0.35, i * 0.14);
    dummy.scale.set(s * 1.3, s * 0.75, s);
    dummy.updateMatrix();
    rim_crumbs.instanceMatrix.needsUpdate = true;
  }
  root.add(rim_crumbs);

  const top_sprinkles = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), crumbMat, 34);
  top_sprinkles.name = "top_sprinkles";
  for (let i = 0; i < 34; i++) {
    const a = i * 2.399963229728653;
    const r = 0.12 + ((i * 29) % 100) / 100 * 0.31;
    const s = 0.006 + ((i * 13) % 8) * 0.0015;
    dummy.position.set(Math.cos(a) * r, 0.479, Math.sin(a) * r);
    dummy.rotation.set(i * 0.4, i * 0.2, i * 0.33);
    dummy.scale.set(s * 1.5, s * 0.55, s);
    dummy.updateMatrix();
    top_sprinkles.instanceMatrix.needsUpdate = true;
  }
  root.add(top_sprinkles);

  const whipped_cream_base = new THREE.Mesh(
    new THREE.SphereGeometry(1, 48, 24),
    whippedCreamMat
  );
  whipped_cream_base.name = "whipped_cream_base";
  whipped_cream_base.position.set(0.02, 0.535, 0.01);
  whipped_cream_base.scale.set(0.255, 0.075, 0.225);
  root.add(whipped_cream_base);

  const whipped_cream_lobe_left = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 16),
    whippedCreamMat
  );
  whipped_cream_lobe_left.name = "whipped_cream_lobe_left";
  whipped_cream_lobe_left.position.set(-0.13, 0.555, 0.035);
  whipped_cream_lobe_left.scale.set(0.14, 0.06, 0.115);
  root.add(whipped_cream_lobe_left);

  const whipped_cream_lobe_right = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 16),
    whippedCreamMat
  );
  whipped_cream_lobe_right.name = "whipped_cream_lobe_right";
  whipped_cream_lobe_right.position.set(0.15, 0.55, 0.025);
  whipped_cream_lobe_right.scale.set(0.13, 0.058, 0.11);
  root.add(whipped_cream_lobe_right);

  const swirl_pts = [];
  for (let i = 0; i <= 72; i++) {
    const t = i / 72;
    const a = -0.55 + t * tau * 1.65;
    const r = 0.215 * (1 - t) + 0.025;
    const y = 0.555 + t * 0.145 + 0.012 * Math.sin(t * tau * 2);
    swirl_pts.push(new THREE.Vector3(0.02 + Math.cos(a) * r, y, 0.01 + Math.sin(a) * r * 0.86));
  }
  const whipped_cream_swirl = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(swirl_pts, false, "centripetal"), 144, 0.052, 14, false),
    whippedCreamMat
  );
  whipped_cream_swirl.name = "whipped_cream_swirl";
  root.add(whipped_cream_swirl);

  const whipped_cream_peak = new THREE.Mesh(
    new THREE.ConeGeometry(0.055, 0.13, 32),
    whippedCreamMat
  );
  whipped_cream_peak.name = "whipped_cream_peak";
  whipped_cream_peak.position.set(0.025, 0.715, 0.005);
  whipped_cream_peak.rotation.z = -0.18;
  root.add(whipped_cream_peak);

  const fruit_slice_shape = new THREE.Shape();
  fruit_slice_shape.moveTo(-0.145, 0.0);
  fruit_slice_shape.bezierCurveTo(-0.12, 0.085, 0.055, 0.105, 0.145, 0.018);
  fruit_slice_shape.bezierCurveTo(0.15, -0.06, -0.035, -0.095, -0.145, 0.0);
  const fruit_slice_geom = new THREE.ExtrudeGeometry(fruit_slice_shape, 1);

  const fruit_skin_geom = new THREE.ShapeGeometry(fruit_slice_shape);
  const fruit_center_geom = new THREE.CircleGeometry(1, 24);
  const fruit_vein_geom = new THREE.CylinderGeometry(1, 1, 1, 6);

  function createFruitSlice(name, x, y, z, rz, ry, scale) {
    const slice = new THREE.Group();
    slice.name = name;
    slice.position.set(x, y, z);
    slice.rotation.set(ry, 0, rz);
    slice.scale.setScalar(scale);

    const skin = new THREE.Mesh(fruit_skin_geom, fruitSkinMat);
    skin.name = name + "_skin";
    skin.position.z = 0.001;
    slice.add(skin);

    const flesh = new THREE.Mesh(fruit_slice_geom, fruitFleshMat);
    flesh.name = name + "_flesh";
    flesh.position.set(0, -0.002, 0.004);
    flesh.scale.set(0.91, 0.88, 0.18);
    slice.add(flesh);

    const pit = new THREE.Mesh(fruit_center_geom, fruitPitMat);
    pit.name = name + "_pit";
    pit.position.set(-0.018, 0.004, 0.012);
    pit.scale.set(0.034, 0.021, 1);
    slice.add(pit);

    const veins = new THREE.InstancedMesh(fruit_vein_geom, fruitVeinMat, 9);
    veins.name = name + "_veins";
    const vein_dummy = new THREE.Object3D();
    for (let i = 0; i < 9; i++) {
      const va = -1.05 + i * 0.26;
      const len = 0.055 + (i % 3) * 0.012;
      vein_dummy.position.set(Math.cos(va) * 0.055, Math.sin(va) * 0.032, 0.014);
      vein_dummy.rotation.set(0, 0, va - Math.PI / 2);
      vein_dummy.scale.set(0.0022, len, 0.0022);
      vein_dummy.updateMatrix();
      veins.instanceMatrix.needsUpdate = true;
    }
    slice.add(veins);

    root.add(slice);
    return slice;
  }

  const rear_fruit_slice = createFruitSlice("rear_fruit_slice", 0.16, 0.685, -0.075, -0.18, 0.18, 0.72);
  const left_fruit_slice = createFruitSlice("left_fruit_slice", -0.235, 0.555, 0.105, 0.18, -0.22, 0.62);
  const main_fruit_slice = createFruitSlice("main_fruit_slice", -0.075, 0.625, 0.105, -0.28, -0.12, 0.92);

  const cream_crumbs = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), crumbMat, 24);
  cream_crumbs.name = "cream_crumbs";
  for (let i = 0; i < 24; i++) {
    const a = i * 1.73;
    const r = 0.045 + ((i * 23) % 100) / 100 * 0.15;
    const y = 0.60 + ((i * 31) % 100) / 100 * 0.13;
    const s = 0.006 + ((i * 11) % 7) * 0.0015;
    dummy.position.set(0.02 + Math.cos(a) * r, y, 0.01 + Math.sin(a) * r * 0.75);
    dummy.rotation.set(i * 0.27, i * 0.19, i * 0.36);
    dummy.scale.set(s * 1.4, s * 0.7, s);
    dummy.updateMatrix();
    cream_crumbs.instanceMatrix.needsUpdate = true;
  }
  root.add(cream_crumbs);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
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
