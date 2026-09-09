function __sn17_user(THREE) {
  const root = new THREE.Group();

  const glass_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.98,
    thickness: 0.35,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    iridescence: 1.0,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [120, 760],
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const inner_glass_coreMat = new THREE.MeshPhysicalMaterial({
    color: 0xf8ffff,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.96,
    thickness: 0.22,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    iridescence: 1.0,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [180, 700],
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const base_rimMat = new THREE.MeshPhysicalMaterial({
    color: 0xeafcff,
    metalness: 0.0,
    roughness: 0.06,
    transmission: 0.94,
    thickness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    iridescence: 1.0,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 800],
    transparent: true,
    opacity: 0.52,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const cyan_reflectionMat = new THREE.MeshBasicMaterial({
    color: 0x00f4ff,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const magenta_reflectionMat = new THREE.MeshBasicMaterial({
    color: 0xff20d8,
    transparent: true,
    opacity: 0.31,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const green_reflectionMat = new THREE.MeshBasicMaterial({
    color: 0x00f0a0,
    transparent: true,
    opacity: 0.32,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const yellow_reflectionMat = new THREE.MeshBasicMaterial({
    color: 0xffea20,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const orange_reflectionMat = new THREE.MeshBasicMaterial({
    color: 0xff7a20,
    transparent: true,
    opacity: 0.30,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const blue_reflectionMat = new THREE.MeshBasicMaterial({
    color: 0x208cff,
    transparent: true,
    opacity: 0.31,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const glass_bodyProfile = [
    new THREE.Vector2(0.00, -0.50),
    new THREE.Vector2(0.18, -0.50),
    new THREE.Vector2(0.38, -0.47),
    new THREE.Vector2(0.55, -0.39),
    new THREE.Vector2(0.64, -0.27),
    new THREE.Vector2(0.66, -0.13),
    new THREE.Vector2(0.62, 0.04),
    new THREE.Vector2(0.55, 0.22),
    new THREE.Vector2(0.46, 0.40),
    new THREE.Vector2(0.35, 0.57),
    new THREE.Vector2(0.23, 0.70),
    new THREE.Vector2(0.12, 0.78),
    new THREE.Vector2(0.04, 0.81),
    new THREE.Vector2(0.00, 0.82),
  ];
  const glass_bodyGeo = new THREE.LatheGeometry(glass_bodyProfile, 96);
  const glass_body = new THREE.Mesh(glass_bodyGeo, glass_bodyMat);
  glass_body.renderOrder = 2;
  root.add(glass_body);

  const inner_glass_core = new THREE.Mesh(glass_bodyGeo, inner_glass_coreMat);
  inner_glass_core.scale.set(0.935, 0.94, 0.935);
  inner_glass_core.position.y = -0.01;
  inner_glass_core.renderOrder = 1;
  root.add(inner_glass_core);

  const base_rimProfile = [
    new THREE.Vector2(0.00, -0.505),
    new THREE.Vector2(0.22, -0.505),
    new THREE.Vector2(0.43, -0.485),
    new THREE.Vector2(0.59, -0.435),
    new THREE.Vector2(0.67, -0.355),
    new THREE.Vector2(0.68, -0.275),
    new THREE.Vector2(0.65, -0.205),
    new THREE.Vector2(0.59, -0.165),
    new THREE.Vector2(0.50, -0.185),
    new THREE.Vector2(0.39, -0.245),
    new THREE.Vector2(0.25, -0.285),
    new THREE.Vector2(0.00, -0.295),
  ];
  const base_rimGeo = new THREE.LatheGeometry(base_rimProfile, 96);
  const base_rim = new THREE.Mesh(base_rimGeo, base_rimMat);
  base_rim.renderOrder = 3;
  root.add(base_rim);

  const surface_profile = [
    [-0.50, 0.18],
    [-0.47, 0.38],
    [-0.39, 0.55],
    [-0.27, 0.64],
    [-0.13, 0.66],
    [0.04, 0.62],
    [0.22, 0.55],
    [0.40, 0.46],
    [0.57, 0.35],
    [0.70, 0.23],
    [0.78, 0.12],
    [0.81, 0.04],
  ];

  function radiusAt(y) {
    if (y <= surface_profile[0][0]) return surface_profile[0][1];
    for (let i = 0; i < surface_profile.length - 1; i++) {
      const y0 = surface_profile[i][0];
      const r0 = surface_profile[i][1];
      const y1 = surface_profile[i + 1][0];
      const r1 = surface_profile[i + 1][1];
      if (y <= y1) {
        const t = (y - y0) / (y1 - y0);
        return r0 + (r1 - r0) * t;
      }
    }
    return surface_profile[surface_profile.length - 1][1];
  }

  function placeSurfacePatch(mesh, angle, y, tilt) {
    const r = radiusAt(y) + 0.008;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    mesh.rotateZ(tilt);
    mesh.position.set(normal.x * r, y, normal.z * r);
    mesh.renderOrder = 4;
    root.add(mesh);
  }

  const left_highlightShape = new THREE.Shape();
  left_highlightShape.moveTo(-0.045, -0.22);
  left_highlightShape.bezierCurveTo(-0.075, -0.12, -0.070, 0.10, -0.025, 0.23);
  left_highlightShape.bezierCurveTo(0.015, 0.25, 0.060, 0.16, 0.055, 0.05);
  left_highlightShape.bezierCurveTo(0.050, -0.08, 0.025, -0.19, -0.045, -0.22);
  const left_highlightGeo = new THREE.ShapeGeometry(left_highlightShape);
  const left_highlight = new THREE.Mesh(left_highlightGeo, highlightMat);
  placeSurfacePatch(left_highlight, 2.08, -0.015, -0.18);

  const right_highlightShape = new THREE.Shape();
  right_highlightShape.moveTo(-0.040, -0.20);
  right_highlightShape.bezierCurveTo(-0.065, -0.08, -0.055, 0.12, -0.015, 0.21);
  right_highlightShape.bezierCurveTo(0.025, 0.24, 0.060, 0.13, 0.055, 0.02);
  right_highlightShape.bezierCurveTo(0.050, -0.10, 0.025, -0.19, -0.040, -0.20);
  const right_highlightGeo = new THREE.ShapeGeometry(right_highlightShape);
  const right_highlight = new THREE.Mesh(right_highlightGeo, highlightMat);
  placeSurfacePatch(right_highlight, 1.02, 0.015, 0.14);

  const cyan_reflectionShape = new THREE.Shape();
  cyan_reflectionShape.moveTo(-0.055, -0.075);
  cyan_reflectionShape.bezierCurveTo(-0.070, -0.025, -0.050, 0.060, -0.005, 0.085);
  cyan_reflectionShape.bezierCurveTo(0.040, 0.080, 0.070, 0.020, 0.055, -0.040);
  cyan_reflectionShape.bezierCurveTo(0.035, -0.080, -0.020, -0.095, -0.055, -0.075);
  const cyan_reflectionGeo = new THREE.ShapeGeometry(cyan_reflectionShape);
  const cyan_reflection = new THREE.Mesh(cyan_reflectionGeo, cyan_reflectionMat);
  placeSurfacePatch(cyan_reflection, 1.72, 0.36, -0.42);

  const magenta_reflectionShape = new THREE.Shape();
  magenta_reflectionShape.moveTo(-0.060, -0.060);
  magenta_reflectionShape.bezierCurveTo(-0.075, -0.010, -0.045, 0.070, 0.005, 0.080);
  magenta_reflectionShape.bezierCurveTo(0.050, 0.070, 0.075, 0.015, 0.055, -0.045);
  magenta_reflectionShape.bezierCurveTo(0.030, -0.075, -0.025, -0.085, -0.060, -0.060);
  const magenta_reflectionGeo = new THREE.ShapeGeometry(magenta_reflectionShape);
  const magenta_reflection = new THREE.Mesh(magenta_reflectionGeo, magenta_reflectionMat);
  placeSurfacePatch(magenta_reflection, 1.34, -0.245, 0.35);

  const green_reflectionShape = new THREE.Shape();
  green_reflectionShape.moveTo(-0.060, -0.070);
  green_reflectionShape.bezierCurveTo(-0.075, -0.020, -0.050, 0.070, -0.005, 0.090);
  green_reflectionShape.bezierCurveTo(0.045, 0.085, 0.075, 0.025, 0.055, -0.045);
  green_reflectionShape.bezierCurveTo(0.030, -0.085, -0.025, -0.095, -0.060, -0.070);
  const green_reflectionGeo = new THREE.ShapeGeometry(green_reflectionShape);
  const green_reflection = new THREE.Mesh(green_reflectionGeo, green_reflectionMat);
  placeSurfacePatch(green_reflection, 1.96, 0.20, -0.28);

  const yellow_reflectionShape = new THREE.Shape();
  yellow_reflectionShape.moveTo(-0.050, -0.070);
  yellow_reflectionShape.bezierCurveTo(-0.065, -0.020, -0.040, 0.065, 0.005, 0.080);
  yellow_reflectionShape.bezierCurveTo(0.045, 0.075, 0.070, 0.015, 0.050, -0.050);
  yellow_reflectionShape.bezierCurveTo(0.025, -0.080, -0.020, -0.090, -0.050, -0.070);
  const yellow_reflectionGeo = new THREE.ShapeGeometry(yellow_reflectionShape);
  const yellow_reflection = new THREE.Mesh(yellow_reflectionGeo, yellow_reflectionMat);
  placeSurfacePatch(yellow_reflection, 0.86, -0.235, 0.24);

  const orange_reflectionShape = new THREE.Shape();
  orange_reflectionShape.moveTo(-0.045, -0.070);
  orange_reflectionShape.bezierCurveTo(-0.060, -0.020, -0.035, 0.065, 0.005, 0.085);
  orange_reflectionShape.bezierCurveTo(0.045, 0.075, 0.065, 0.015, 0.045, -0.050);
  orange_reflectionShape.bezierCurveTo(0.020, -0.080, -0.020, -0.090, -0.045, -0.070);
  const orange_reflectionGeo = new THREE.ShapeGeometry(orange_reflectionShape);
  const orange_reflection = new THREE.Mesh(orange_reflectionGeo, orange_reflectionMat);
  placeSurfacePatch(orange_reflection, 1.18, 0.245, 0.20);

  const blue_reflectionShape = new THREE.Shape();
  blue_reflectionShape.moveTo(-0.055, -0.065);
  blue_reflectionShape.bezierCurveTo(-0.070, -0.015, -0.045, 0.065, 0.000, 0.085);
  blue_reflectionShape.bezierCurveTo(0.045, 0.075, 0.070, 0.020, 0.050, -0.045);
  blue_reflectionShape.bezierCurveTo(0.025, -0.080, -0.025, -0.090, -0.055, -0.065);
  const blue_reflectionGeo = new THREE.ShapeGeometry(blue_reflectionShape);
  const blue_reflection = new THREE.Mesh(blue_reflectionGeo, blue_reflectionMat);
  placeSurfacePatch(blue_reflection, 2.42, 0.075, -0.34);

  const rim_cyan_glint = new THREE.Mesh(cyan_reflectionGeo, cyan_reflectionMat);
  rim_cyan_glint.scale.set(1.25, 0.55, 1);
  placeSurfacePatch(rim_cyan_glint, 1.55, -0.365, 0.05);

  const rim_magenta_glint = new THREE.Mesh(magenta_reflectionGeo, magenta_reflectionMat);
  rim_magenta_glint.scale.set(1.15, 0.52, 1);
  placeSurfacePatch(rim_magenta_glint, 2.28, -0.335, -0.12);

  const rim_yellow_glint = new THREE.Mesh(yellow_reflectionGeo, yellow_reflectionMat);
  rim_yellow_glint.scale.set(1.20, 0.52, 1);
  placeSurfacePatch(rim_yellow_glint, 0.72, -0.335, 0.12);

  const rim_green_glint = new THREE.Mesh(green_reflectionGeo, green_reflectionMat);
  rim_green_glint.scale.set(1.10, 0.50, 1);
  placeSurfacePatch(rim_green_glint, 1.02, -0.385, -0.04);

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
  const scale = 0.98 / maxDim;
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
