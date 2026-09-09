function __sn17_user(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xe8dcae, side: THREE.DoubleSide });
  const redGlazeMat = new THREE.MeshStandardMaterial({ color: 0x8f241b, side: THREE.DoubleSide });
  const darkRedGlazeMat = new THREE.MeshStandardMaterial({ color: 0x5c1714, side: THREE.DoubleSide });
  const orangePaintMat = new THREE.MeshStandardMaterial({ color: 0xd94a25, side: THREE.DoubleSide });
  const pinkPaintMat = new THREE.MeshStandardMaterial({ color: 0xc96f86, side: THREE.DoubleSide });
  const purplePaintMat = new THREE.MeshStandardMaterial({ color: 0xa98ab6, side: THREE.DoubleSide });
  const bluePaintMat = new THREE.MeshStandardMaterial({ color: 0x526fa0, side: THREE.DoubleSide });
  const greenPaintMat = new THREE.MeshStandardMaterial({ color: 0x2f6848, side: THREE.DoubleSide });
  const tealPaintMat = new THREE.MeshStandardMaterial({ color: 0x3f7a72, side: THREE.DoubleSide });
  const brownPaintMat = new THREE.MeshStandardMaterial({ color: 0x5a3a26, side: THREE.DoubleSide });
  const creamPaintMat = new THREE.MeshStandardMaterial({ color: 0xf1dfaa, side: THREE.DoubleSide });

  const vaseProfile = [
    new THREE.Vector2(0.00, -0.56),
    new THREE.Vector2(0.20, -0.56),
    new THREE.Vector2(0.23, -0.53),
    new THREE.Vector2(0.22, -0.49),
    new THREE.Vector2(0.18, -0.45),
    new THREE.Vector2(0.16, -0.36),
    new THREE.Vector2(0.20, -0.28),
    new THREE.Vector2(0.27, -0.16),
    new THREE.Vector2(0.31, 0.02),
    new THREE.Vector2(0.30, 0.17),
    new THREE.Vector2(0.25, 0.28),
    new THREE.Vector2(0.18, 0.34),
    new THREE.Vector2(0.15, 0.43),
    new THREE.Vector2(0.16, 0.51),
    new THREE.Vector2(0.22, 0.57),
    new THREE.Vector2(0.27, 0.59),
    new THREE.Vector2(0.28, 0.61),
    new THREE.Vector2(0.25, 0.64),
    new THREE.Vector2(0.00, 0.64)
  ];
  const vase_body = new THREE.Mesh(new THREE.LatheGeometry(vaseProfile, 96), ceramicMat);
  root.add(vase_body);

  const base_red_band = new THREE.Mesh(new THREE.CylinderGeometry(0.218, 0.225, 0.065, 96, 1, true), redGlazeMat);
  base_red_band.position.y = -0.515;
  root.add(base_red_band);

  const base_lower_cream_line = new THREE.Mesh(new THREE.TorusGeometry(0.218, 0.006, 8, 96), ceramicMat);
  base_lower_cream_line.rotation.x = Math.PI / 2;
  base_lower_cream_line.position.y = -0.552;
  root.add(base_lower_cream_line);

  const base_upper_cream_line = new THREE.Mesh(new THREE.TorusGeometry(0.215, 0.005, 8, 96), ceramicMat);
  base_upper_cream_line.rotation.x = Math.PI / 2;
  base_upper_cream_line.position.y = -0.478;
  root.add(base_upper_cream_line);

  const shoulder_red_band = new THREE.Mesh(new THREE.CylinderGeometry(0.255, 0.260, 0.035, 96, 1, true), redGlazeMat);
  shoulder_red_band.position.y = 0.285;
  root.add(shoulder_red_band);

  const shoulder_lower_dark_line = new THREE.Mesh(new THREE.TorusGeometry(0.257, 0.004, 8, 96), darkRedGlazeMat);
  shoulder_lower_dark_line.rotation.x = Math.PI / 2;
  shoulder_lower_dark_line.position.y = 0.265;
  root.add(shoulder_lower_dark_line);

  const shoulder_upper_cream_line = new THREE.Mesh(new THREE.TorusGeometry(0.248, 0.004, 8, 96), ceramicMat);
  shoulder_upper_cream_line.rotation.x = Math.PI / 2;
  shoulder_upper_cream_line.position.y = 0.305;
  root.add(shoulder_upper_cream_line);

  const neck_red_band = new THREE.Mesh(new THREE.CylinderGeometry(0.258, 0.265, 0.026, 96, 1, true), redGlazeMat);
  neck_red_band.position.y = 0.585;
  root.add(neck_red_band);

  const neck_lower_dark_line = new THREE.Mesh(new THREE.TorusGeometry(0.260, 0.004, 8, 96), darkRedGlazeMat);
  neck_lower_dark_line.rotation.x = Math.PI / 2;
  neck_lower_dark_line.position.y = 0.570;
  root.add(neck_lower_dark_line);

  const rim_inner_shadow = new THREE.Mesh(new THREE.TorusGeometry(0.245, 0.006, 8, 96), darkRedGlazeMat);
  rim_inner_shadow.rotation.x = Math.PI / 2;
  rim_inner_shadow.position.y = 0.625;
  root.add(rim_inner_shadow);

  const top_lip_highlight = new THREE.Mesh(new THREE.TorusGeometry(0.255, 0.008, 10, 96), ceramicMat);
  top_lip_highlight.rotation.x = Math.PI / 2;
  top_lip_highlight.position.y = 0.638;
  root.add(top_lip_highlight);

  const radiusSamples = [
    [-0.56, 0.20], [-0.53, 0.23], [-0.49, 0.22], [-0.45, 0.18], [-0.36, 0.16],
    [-0.28, 0.20], [-0.16, 0.27], [0.02, 0.31], [0.17, 0.30], [0.28, 0.25],
    [0.34, 0.18], [0.43, 0.15], [0.51, 0.16], [0.57, 0.22], [0.59, 0.27], [0.61, 0.28], [0.64, 0.25]
  ];

  function vaseRadiusAt(y) {
    if (y <= radiusSamples[0][0]) return radiusSamples[0][1];
    for (let i = 0; i < radiusSamples.length - 1; i++) {
      const a = radiusSamples[i];
      const b = radiusSamples[i + 1];
      if (y <= b[0]) {
        const t = (y - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return radiusSamples[radiusSamples.length - 1][1];
  }

  function surfacePose(angle, y, extra) {
    const r = vaseRadiusAt(y) + extra;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
    const pos = new THREE.Vector3(normal.x * r, y, normal.z * r);
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return { pos, quat };
  }

  function addSurfaceDecal(parent, name, angle, y, sx, sy, rot, mat, extra) {
    const decal = new THREE.Mesh(new THREE.CircleGeometry(1, 32), mat);
    decal.name = name;
    const pose = surfacePose(angle, y, extra);
    decal.position.copy(pose.pos);
    decal.quaternion.copy(pose.quat);
    decal.rotateZ(rot);
    decal.scale.set(sx, sy, 1);
    parent.add(decal);
    return decal;
  }

  function addSurfaceVine(name, angle0, y0, angle1, y1, wave, phase, mat, thickness) {
    const pts = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const a = angle0 + (angle1 - angle0) * t + Math.sin(t * Math.PI * 2 + phase) * wave;
      const y = y0 + (y1 - y0) * t + Math.sin(t * Math.PI) * 0.012;
      pts.push(surfacePose(a, y, 0.010).pos);
    }
    const vine = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, thickness, 8, false),
      mat
    );
    vine.name = name;
    root.add(vine);
    return vine;
  }

  function addFlower(name, angle, y, size, petalMat, centerMat, count) {
    const flower_group = new THREE.Group();
    flower_group.name = name;
    root.add(flower_group);

    for (let i = 0; i < count; i++) {
      const p = (i / count) * Math.PI * 2;
      const localX = Math.cos(p) * size * 0.42;
      const localY = Math.sin(p) * size * 0.42;
      const py = y + localY;
      const pa = angle - localX / Math.max(vaseRadiusAt(py), 0.05);
      addSurfaceDecal(
        flower_group,
        name + "_petal_" + i,
        pa,
        py,
        size * 0.34,
        size * 0.16,
        p,
        petalMat,
        0.012
      );
    }

    addSurfaceDecal(
      flower_group,
      name + "_center_outline",
      angle,
      y,
      size * 0.18,
      size * 0.18,
      0,
      brownPaintMat,
      0.014
    );
    addSurfaceDecal(
      flower_group,
      name + "_center",
      angle,
      y,
      size * 0.12,
      size * 0.12,
      0,
      centerMat,
      0.016
    );
    return flower_group;
  }

  function addLeaf(name, angle, y, length, width, rot, mat) {
    return addSurfaceDecal(root, name, angle, y, length, width, rot, mat, 0.013);
  }

  const main_flower = addFlower("main_flower", Math.PI / 2, -0.015, 0.155, orangePaintMat, creamPaintMat, 8);
  const left_flower = addFlower("left_flower", 2.35, 0.035, 0.120, orangePaintMat, brownPaintMat, 7);
  const right_flower = addFlower("right_flower", 0.78, 0.055, 0.105, orangePaintMat, brownPaintMat, 7);
  const lower_pink_flower = addFlower("lower_pink_flower", 2.05, -0.285, 0.060, pinkPaintMat, creamPaintMat, 6);
  const lower_purple_flower = addFlower("lower_purple_flower", 1.55, -0.245, 0.060, purplePaintMat, creamPaintMat, 6);
  const right_pink_flower = addFlower("right_pink_flower", 1.02, -0.275, 0.055, pinkPaintMat, creamPaintMat, 6);
  const small_blue_flower = addFlower("small_blue_flower", 0.82, -0.075, 0.045, bluePaintMat, creamPaintMat, 6);
  const small_pink_flower = addFlower("small_pink_flower", 2.05, -0.105, 0.045, pinkPaintMat, creamPaintMat, 6);
  const neck_flower = addFlower("neck_flower", 1.55, 0.430, 0.055, orangePaintMat, brownPaintMat, 6);
  const left_neck_flower = addFlower("left_neck_flower", 2.35, 0.390, 0.040, pinkPaintMat, brownPaintMat, 6);
  const right_neck_flower = addFlower("right_neck_flower", 0.78, 0.395, 0.040, orangePaintMat, brownPaintMat, 6);

  const main_left_leaf = addLeaf("main_left_leaf", 1.82, -0.080, 0.055, 0.020, -0.75, greenPaintMat);
  const main_right_leaf = addLeaf("main_right_leaf", 1.28, -0.095, 0.055, 0.020, 0.75, greenPaintMat);
  const main_upper_leaf = addLeaf("main_upper_leaf", 1.62, 0.105, 0.050, 0.018, 0.20, tealPaintMat);
  const main_lower_leaf = addLeaf("main_lower_leaf", 1.48, -0.205, 0.050, 0.018, -0.40, greenPaintMat);
  const left_vine_leaf_1 = addLeaf("left_vine_leaf_1", 2.18, -0.180, 0.045, 0.016, -0.90, tealPaintMat);
  const left_vine_leaf_2 = addLeaf("left_vine_leaf_2", 2.42, -0.075, 0.045, 0.016, 0.65, greenPaintMat);
  const left_vine_leaf_3 = addLeaf("left_vine_leaf_3", 2.12, 0.120, 0.040, 0.014, -0.35, tealPaintMat);
  const right_vine_leaf_1 = addLeaf("right_vine_leaf_1", 1.05, -0.170, 0.045, 0.016, 0.90, tealPaintMat);
  const right_vine_leaf_2 = addLeaf("right_vine_leaf_2", 0.82, -0.055, 0.045, 0.016, -0.65, greenPaintMat);
  const right_vine_leaf_3 = addLeaf("right_vine_leaf_3", 1.18, 0.125, 0.040, 0.014, 0.35, tealPaintMat);
  const lower_cross_leaf_1 = addLeaf("lower_cross_leaf_1", 1.85, -0.350, 0.045, 0.016, 0.55, greenPaintMat);
  const lower_cross_leaf_2 = addLeaf("lower_cross_leaf_2", 1.22, -0.345, 0.045, 0.016, -0.55, tealPaintMat);
  const neck_stem_leaf_1 = addLeaf("neck_stem_leaf_1", 1.72, 0.485, 0.040, 0.014, 0.65, greenPaintMat);
  const neck_stem_leaf_2 = addLeaf("neck_stem_leaf_2", 1.38, 0.485, 0.040, 0.014, -0.65, tealPaintMat);
  const neck_stem_leaf_3 = addLeaf("neck_stem_leaf_3", 1.55, 0.535, 0.035, 0.012, 0.05, bluePaintMat);
  const neck_stem_leaf_4 = addLeaf("neck_stem_leaf_4", 2.05, 0.455, 0.035, 0.012, -0.45, orangePaintMat);
  const neck_stem_leaf_5 = addLeaf("neck_stem_leaf_5", 1.05, 0.455, 0.035, 0.012, 0.45, greenPaintMat);

  const body_diagonal_vine = addSurfaceVine("body_diagonal_vine", 2.45, -0.365, 0.72, 0.170, 0.10, 0.2, tealPaintMat, 0.006);
  const body_counter_vine = addSurfaceVine("body_counter_vine", 0.70, -0.350, 2.38, 0.150, 0.09, 1.4, greenPaintMat, 0.006);
  const lower_scroll_vine = addSurfaceVine("lower_scroll_vine", 2.55, -0.260, 0.62, -0.210, 0.13, 2.0, tealPaintMat, 0.005);
  const upper_scroll_vine = addSurfaceVine("upper_scroll_vine", 2.42, 0.145, 0.76, 0.185, 0.10, 0.8, greenPaintMat, 0.005);
  const main_flower_stem = addSurfaceVine("main_flower_stem", 1.58, -0.235, 1.52, 0.085, 0.035, 0.5, greenPaintMat, 0.005);
  const left_flower_stem = addSurfaceVine("left_flower_stem", 2.30, -0.185, 2.38, 0.115, 0.030, 1.1, tealPaintMat, 0.005);
  const right_flower_stem = addSurfaceVine("right_flower_stem", 0.88, -0.180, 0.80, 0.120, 0.030, 2.2, greenPaintMat, 0.005);
  const neck_flower_stem = addSurfaceVine("neck_flower_stem", 1.55, 0.345, 1.55, 0.475, 0.020, 0.4, greenPaintMat, 0.004);
  const left_neck_scroll = addSurfaceVine("left_neck_scroll", 2.45, 0.335, 2.18, 0.535, 0.055, 1.0, redGlazeMat, 0.006);
  const right_neck_scroll = addSurfaceVine("right_neck_scroll", 0.68, 0.335, 0.95, 0.535, 0.055, 2.0, redGlazeMat, 0.006);

  const speckleData = [
    [1.35, 0.555, 0.004], [1.85, 0.545, 0.003], [2.10, 0.315, 0.004], [1.10, 0.315, 0.003],
    [2.65, 0.180, 0.004], [0.48, 0.180, 0.004], [2.70, -0.020, 0.003], [0.42, -0.020, 0.003],
    [2.55, -0.390, 0.004], [0.58, -0.390, 0.004], [1.95, -0.430, 0.003], [1.15, -0.430, 0.003],
    [1.72, 0.235, 0.003], [1.30, 0.235, 0.003], [2.20, -0.210, 0.003], [0.95, -0.210, 0.003],
    [1.80, 0.060, 0.003], [1.35, -0.145, 0.003], [2.00, 0.405, 0.003], [1.10, 0.405, 0.003]
  ];
  const speckles = new THREE.InstancedMesh(new THREE.CircleGeometry(1, 10), brownPaintMat, speckleData.length);
  speckles.name = "painted_speckles";
  const speckleDummy = new THREE.Object3D();
  for (let i = 0; i < speckleData.length; i++) {
    const d = speckleData[i];
    const pose = surfacePose(d[0], d[1], 0.015);
    speckleDummy.position.copy(pose.pos);
    speckleDummy.quaternion.copy(pose.quat);
    speckleDummy.scale.set(d[2], d[2], 1);
    speckleDummy.updateMatrix();
    speckles.setMatrixAt(i, speckleDummy.matrix);
  }
  root.add(speckles);

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
  if (maxDim > 0) root.scale.setScalar(0.98 / maxDim);
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
