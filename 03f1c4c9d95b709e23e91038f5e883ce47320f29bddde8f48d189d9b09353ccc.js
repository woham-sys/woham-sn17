function __sn17_user(THREE) {
  const root = new THREE.Group();

  const texture_width = 64;
  const texture_height = 256;
  const wood_pixels = new Uint8Array(texture_width * texture_height * 4);

  for (let y = 0; y < texture_height; y++) {
    const v = y / (texture_height - 1);
    for (let x = 0; x < texture_width; x++) {
      const u = x / (texture_width - 1);
      const wave = u + 0.035 * Math.sin(v * 13.0) + 0.012 * Math.sin(v * 37.0);
      const broad_grain = Math.sin(wave * Math.PI * 28.0);
      const fine_grain = Math.sin(wave * Math.PI * 92.0 + v * 5.0);
      const pore_signal = Math.sin((u * 53.0 + v * 11.0) * Math.PI * 2.0);
      const pores = Math.max(0, pore_signal - 0.82) / 0.18;
      const tone = 0.5 + 0.24 * Math.sin(v * Math.PI * 2.0 + 0.7);
      const index = (y * texture_width + x) * 4;

      wood_pixels[index] = Math.max(0, Math.min(255, Math.floor(126 + 42 * tone + 10 * broad_grain + 4 * fine_grain - 34 * pores)));
      wood_pixels[index + 1] = Math.max(0, Math.min(255, Math.floor(62 + 25 * tone + 6 * broad_grain + 2 * fine_grain - 18 * pores)));
      wood_pixels[index + 2] = Math.max(0, Math.min(255, Math.floor(24 + 13 * tone + 3 * broad_grain - 7 * pores)));
      wood_pixels[index + 3] = 255;
    }
  }

  const wood_texture = new THREE.DataTexture(
    wood_pixels,
    texture_width,
    texture_height,
    THREE.RGBAFormat
  );
  wood_texture.wrapS = THREE.RepeatWrapping;
  wood_texture.wrapT = THREE.ClampToEdgeWrapping;
  wood_texture.magFilter = THREE.LinearFilter;
  wood_texture.minFilter = THREE.LinearFilter;
  if (THREE.SRGBColorSpace !== undefined) {
    wood_texture.colorSpace = THREE.SRGBColorSpace;
  }
  wood_texture.needsUpdate = true;

  const wooden_bodyMat = new THREE.MeshPhysicalMaterial({
    map: wood_texture,
    bumpMap: wood_texture,
    bumpScale: 0.006,
    roughnessMap: wood_texture,
    roughness: 0.22,
    metalness: 0.0,
    clearcoat: 0.85,
    clearcoatRoughness: 0.13
  });

  const wooden_bodyProfile = [
    new THREE.Vector2(0.000, -1.720),
    new THREE.Vector2(0.035, -1.715),
    new THREE.Vector2(0.060, -1.690),
    new THREE.Vector2(0.075, -1.640),
    new THREE.Vector2(0.082, -1.560),
    new THREE.Vector2(0.087, -1.350),
    new THREE.Vector2(0.092, -1.050),
    new THREE.Vector2(0.098, -0.700),
    new THREE.Vector2(0.104, -0.300),
    new THREE.Vector2(0.108,  0.100),
    new THREE.Vector2(0.110,  0.450),
    new THREE.Vector2(0.109,  0.720),
    new THREE.Vector2(0.105,  0.930),
    new THREE.Vector2(0.097,  1.080),
    new THREE.Vector2(0.084,  1.190),
    new THREE.Vector2(0.066,  1.270),
    new THREE.Vector2(0.045,  1.325),
    new THREE.Vector2(0.022,  1.355),
    new THREE.Vector2(0.000,  1.365)
  ];

  const wooden_bodyGeom = new THREE.LatheGeometry(wooden_bodyProfile, 64);
  const wooden_body = new THREE.Mesh(wooden_bodyGeom, wooden_bodyMat);
  wooden_body.rotation.z = -0.018;
  root.add(wooden_body);

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
