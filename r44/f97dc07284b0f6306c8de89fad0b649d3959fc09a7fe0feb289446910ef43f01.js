// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "stone_bench";

  const slabW = 3.5;
  const slabD = 1.18;
  const slabH = 0.28;
  const slabY = 1.10;
  const supportX = 1.08;
  const supportH = 0.94;

  function clampByte(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
  }

  function hashValue(x, y, seed) {
    let value = Math.imul(x + seed * 17, 374761393);
    value ^= Math.imul(y + seed * 31, 668265263);
    value ^= Math.imul(value ^ (value >>> 13), 1274126177);
    return (value ^ (value >>> 16)) >>> 0;
  }

  function createGraniteTexture(size) {
    const data = new Uint8Array(size * size * 4);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const hash = hashValue(x, y, 11);
        const fine = (hash & 31) - 15;
        const broad =
          Math.sin(x * 0.075 + Math.sin(y * 0.041) * 1.8) * 8 +
          Math.sin(y * 0.113 - x * 0.019) * 6;

        let red = 154 + fine * 0.65 + broad;
        let green = 157 + fine * 0.62 + broad;
        let blue = 153 + fine * 0.58 + broad;

        const darkHash = hashValue(x, y, 23);
        if (darkHash % 100 < 13) {
          const shade = 38 + (darkHash & 31);
          red = shade;
          green = shade + 2;
          blue = shade;
        } else if (darkHash % 100 < 25) {
          red -= 42;
          green -= 40;
          blue -= 39;
        }

        const paleHash = hashValue(x, y, 37);
        if (paleHash % 100 < 12) {
          const shade = 205 + (paleHash & 31);
          red = shade;
          green = shade;
          blue = shade - 4;
        }

        const tanHash = hashValue(x, y, 59);
        if (tanHash % 127 < 8) {
          red = 178 + fine * 0.35;
          green = 142 + fine * 0.28;
          blue = 98 + fine * 0.22;
        }

        const index = (y * size + x) * 4;
        data[index] = clampByte(red);
        data[index + 1] = clampByte(green);
        data[index + 2] = clampByte(blue);
        data[index + 3] = 255;
      }
    }

    const texture = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.RGBAFormat
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;
    return texture;
  }

  function createSupportTexture(size) {
    const data = new Uint8Array(size * size * 4);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const hash = hashValue(x, y, 71);
        const fine = (hash & 27) - 13;
        const broad =
          Math.sin(x * 0.061 - y * 0.027) * 9 +
          Math.sin(y * 0.083 + x * 0.014) * 6;

        let red = 145 + fine * 0.7 + broad;
        let green = 146 + fine * 0.66 + broad;
        let blue = 141 + fine * 0.60 + broad;

        const darkHash = hashValue(x, y, 83);
        if (darkHash % 100 < 17) {
          const shade = 34 + (darkHash & 35);
          red = shade;
          green = shade + 2;
          blue = shade;
        } else if (darkHash % 100 < 31) {
          red -= 48;
          green -= 46;
          blue -= 43;
        }

        const paleHash = hashValue(x, y, 97);
        if (paleHash % 100 < 14) {
          const shade = 202 + (paleHash & 31);
          red = shade;
          green = shade;
          blue = shade - 5;
        }

        const tanHash = hashValue(x, y, 113);
        if (tanHash % 113 < 11) {
          red = 174 + fine * 0.35;
          green = 137 + fine * 0.28;
          blue = 94 + fine * 0.22;
        }

        const index = (y * size + x) * 4;
        data[index] = clampByte(red);
        data[index + 1] = clampByte(green);
        data[index + 2] = clampByte(blue);
        data[index + 3] = 255;
      }
    }

    const texture = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.RGBAFormat
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;
    return texture;
  }

  const granite_texture = createGraniteTexture(128);
  const support_texture = createSupportTexture(128);

  const granite_topMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: granite_texture,
    bumpMap: granite_texture,
    bumpScale: 0.018,
    metalness: 0.0,
    roughness: 0.9
  });

  const granite_sideMat = new THREE.MeshStandardMaterial({
    color: 0xd8d9d5,
    map: granite_texture,
    bumpMap: granite_texture,
    bumpScale: 0.022,
    metalness: 0.0,
    roughness: 0.9
  });

  const support_stoneMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: support_texture,
    bumpMap: support_texture,
    bumpScale: 0.026,
    metalness: 0.0,
    roughness: 0.9
  });

  const dark_mineralMat = new THREE.MeshStandardMaterial({
    color: 0x454743,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });

  const pale_quartzMat = new THREE.MeshStandardMaterial({
    color: 0xd7d7d0,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });

  const tan_mineralMat = new THREE.MeshStandardMaterial({
    color: 0xa98255,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });

  const wood_coreMat = new THREE.MeshStandardMaterial({
    color: 0x5b351f,
    metalness: 0.0,
    roughness: 0.9
  });

  const wood_lightMat = new THREE.MeshStandardMaterial({
    color: 0x8a5a32,
    metalness: 0.0,
    roughness: 0.9
  });

  const wood_darkMat = new THREE.MeshStandardMaterial({
    color: 0x321d13,
    metalness: 0.0,
    roughness: 0.9
  });

  const slabShape = new THREE.Shape();
  slabShape.moveTo(-1.66, -0.14);
  slabShape.lineTo(-1.31, -0.15);
  slabShape.lineTo(-0.93, -0.135);
  slabShape.lineTo(-0.55, -0.155);
  slabShape.lineTo(-0.12, -0.142);
  slabShape.lineTo(0.28, -0.158);
  slabShape.lineTo(0.72, -0.137);
  slabShape.lineTo(1.18, -0.151);
  slabShape.lineTo(1.65, -0.132);
  slabShape.lineTo(1.70, -0.075);
  slabShape.lineTo(1.69, 0.095);
  slabShape.lineTo(1.63, 0.145);
  slabShape.lineTo(1.17, 0.151);
  slabShape.lineTo(0.71, 0.139);
  slabShape.lineTo(0.22, 0.154);
  slabShape.lineTo(-0.28, 0.142);
  slabShape.lineTo(-0.78, 0.153);
  slabShape.lineTo(-1.25, 0.139);
  slabShape.lineTo(-1.66, 0.146);
  slabShape.lineTo(-1.71, 0.082);
  slabShape.lineTo(-1.70, -0.082);
  slabShape.closePath();

  const slab_coreGeom = new THREE.ExtrudeGeometry(slabShape, {
    depth: slabH - 0.08,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.035,
    bevelSegments: 2,
    curveSegments: 1
  });
  const slab_core = new THREE.Mesh(slab_coreGeom, granite_sideMat);
  slab_core.name = "slab_core";
  slab_core.position.set(0, slabY, -0.04);
  root.add(slab_core);

  const slab_topGeom = new THREE.ShapeGeometry(slabShape, 1);
  const slab_top = new THREE.Mesh(slab_topGeom, granite_topMat);
  slab_top.name = "slab_top";
  slab_top.rotation.x = -Math.PI / 2;
  slab_top.position.set(0, slabY + slabH / 2 + 0.002, 0);
  root.add(slab_top);

  const supportShape = new THREE.Shape();
  supportShape.moveTo(-0.34, -0.47);
  supportShape.lineTo(-0.12, -0.48);
  supportShape.lineTo(0.18, -0.465);
  supportShape.lineTo(0.35, -0.445);
  supportShape.lineTo(0.37, -0.29);
  supportShape.lineTo(0.35, -0.12);
  supportShape.lineTo(0.38, 0.04);
  supportShape.lineTo(0.35, 0.22);
  supportShape.lineTo(0.37, 0.40);
  supportShape.lineTo(0.29, 0.47);
  supportShape.lineTo(0.06, 0.46);
  supportShape.lineTo(-0.13, 0.475);
  supportShape.lineTo(-0.31, 0.45);
  supportShape.lineTo(-0.37, 0.31);
  supportShape.lineTo(-0.35, 0.13);
  supportShape.lineTo(-0.38, -0.05);
  supportShape.lineTo(-0.35, -0.25);
  supportShape.closePath();

  const support_coreGeom = new THREE.ExtrudeGeometry(supportShape, {
    depth: 0.78,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 2,
    curveSegments: 1
  });

  const left_support = new THREE.Mesh(support_coreGeom, support_stoneMat);
  left_support.name = "left_support";
  left_support.position.set(-supportX, supportH / 2, -0.39);
  root.add(left_support);

  const right_support = new THREE.Mesh(support_coreGeom, support_stoneMat);
  right_support.name = "right_support";
  right_support.position.set(supportX, supportH / 2, -0.39);
  root.add(right_support);

  const support_front_faceGeom = new THREE.ShapeGeometry(supportShape, 1);

  const left_support_front_face = new THREE.Mesh(
    support_front_faceGeom,
    support_stoneMat
  );
  left_support_front_face.name = "left_support_front_face";
  left_support_front_face.position.set(-supportX, supportH / 2, 0.418);
  root.add(left_support_front_face);

  const right_support_front_face = new THREE.Mesh(
    support_front_faceGeom,
    support_stoneMat
  );
  right_support_front_face.name = "right_support_front_face";
  right_support_front_face.position.set(supportX, supportH / 2, 0.418);
  root.add(right_support_front_face);

  const wood_coreGeom = new THREE.BoxGeometry(0.19, 0.82, 0.58);

  const left_wood_core = new THREE.Mesh(wood_coreGeom, wood_coreMat);
  left_wood_core.name = "left_wood_core";
  left_wood_core.position.set(-1.285, 0.47, 0.02);
  left_wood_core.rotation.z = -0.018;
  left_wood_core.rotation.y = 0.012;
  root.add(left_wood_core);

  const right_wood_core = new THREE.Mesh(wood_coreGeom, wood_coreMat);
  right_wood_core.name = "right_wood_core";
  right_wood_core.position.set(1.285, 0.47, 0.02);
  right_wood_core.rotation.z = 0.018;
  right_wood_core.rotation.y = -0.012;
  root.add(right_wood_core);

  const wood_plankGeom = new THREE.BoxGeometry(0.025, 0.80, 0.17);
  const wood_planks = new THREE.InstancedMesh(
    wood_plankGeom,
    wood_lightMat,
    6
  );
  wood_planks.name = "wood_planks";

  const plank_dummy = new THREE.Object3D();
  const plankZ = [-0.22, 0.0, 0.22];
  let plankIndex = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < plankZ.length; i++) {
      plank_dummy.position.set(
        side * 1.39,
        0.47 + (i - 1) * 0.004,
        plankZ[i]
      );
      plank_dummy.rotation.set(
        0,
        side * (i - 1) * 0.012,
        side * (i - 1) * 0.008
      );
      plank_dummy.scale.set(1, 1 - i * 0.012, 1);
      plank_dummy.updateMatrix();
      wood_planks.setMatrixAt(plankIndex, plank_dummy.matrix);
      plankIndex++;
    }
  }
  wood_planks.instanceMatrix.needsUpdate = true;
  root.add(wood_planks);

  const wood_grainGeom = new THREE.BoxGeometry(0.012, 0.68, 0.014);
  const wood_grain = new THREE.InstancedMesh(
    wood_grainGeom,
    wood_darkMat,
    8
  );
  wood_grain.name = "wood_grain";

  const grain_dummy = new THREE.Object3D();
  const grainZ = [-0.30, -0.11, 0.10, 0.29];
  let grainIndex = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < grainZ.length; i++) {
      grain_dummy.position.set(
        side * 1.407,
        0.47 + (i % 2 === 0 ? 0.015 : -0.012),
        grainZ[i]
      );
      grain_dummy.rotation.set(
        0,
        side * 0.01,
        side * (i - 1.5) * 0.006
      );
      grain_dummy.scale.set(1, 0.88 + i * 0.025, 1);
      grain_dummy.updateMatrix();
      wood_grain.setMatrixAt(grainIndex, grain_dummy.matrix);
      grainIndex++;
    }
  }
  wood_grain.instanceMatrix.needsUpdate = true;
  root.add(wood_grain);

  const mineral_patchGeom = new THREE.CircleGeometry(1, 10);

  const topPatchData = [
    [-1.45, -0.34, 0.11, 0.045, 0.20],
    [-1.18, 0.25, 0.08, 0.035, -0.45],
    [-0.83, -0.12, 0.13, 0.052, 0.12],
    [-0.48, 0.37, 0.09, 0.038, -0.28],
    [-0.12, -0.31, 0.12, 0.046, 0.48],
    [0.22, 0.20, 0.10, 0.040, -0.16],
    [0.57, -0.37, 0.14, 0.052, 0.31],
    [0.88, 0.31, 0.09, 0.036, -0.52],
    [1.20, -0.17, 0.12, 0.047, 0.18],
    [1.48, 0.27, 0.075, 0.032, -0.22]
  ];

  const top_mineral_patches = new THREE.InstancedMesh(
    mineral_patchGeom,
    tan_mineralMat,
    topPatchData.length
  );
  top_mineral_patches.name = "top_mineral_patches";

  const patch_dummy = new THREE.Object3D();

  for (let i = 0; i < topPatchData.length; i++) {
    const patch = topPatchData[i];
    patch_dummy.position.set(
      patch[0],
      slabY + slabH / 2 + 0.006,
      patch[1]
    );
    patch_dummy.rotation.set(-Math.PI / 2, 0, patch[4]);
    patch_dummy.scale.set(patch[2], patch[3], 1);
    patch_dummy.updateMatrix();
    top_mineral_patches.setMatrixAt(i, patch_dummy.matrix);
  }
  top_mineral_patches.instanceMatrix.needsUpdate = true;
  root.add(top_mineral_patches);

  const frontPatchData = [
    [-1.52, 1.13, 0.085, 0.035, 0.15],
    [-1.18, 1.04, 0.12, 0.045, -0.25],
    [-0.82, 1.16, 0.075, 0.030, 0.35],
    [-0.45, 1.06, 0.11, 0.040, -0.12],
    [-0.08, 1.17, 0.09, 0.034, 0.22],
    [0.31, 1.05, 0.13, 0.048, -0.30],
    [0.70, 1.16, 0.08, 0.032, 0.12],
    [1.04, 1.07, 0.11, 0.042, -0.18],
    [1.42, 1.15, 0.075, 0.030, 0.28]
  ];

  const front_mineral_patches = new THREE.InstancedMesh(
    mineral_patchGeom,
    tan_mineralMat,
    frontPatchData.length
  );
  front_mineral_patches.name = "front_mineral_patches";

  for (let i = 0; i < frontPatchData.length; i++) {
    const patch = frontPatchData[i];
    patch_dummy.position.set(patch[0], patch[1], slabD / 2 + 0.007);
    patch_dummy.rotation.set(0, 0, patch[4]);
    patch_dummy.scale.set(patch[2], patch[3], 1);
    patch_dummy.updateMatrix();
    front_mineral_patches.setMatrixAt(i, patch_dummy.matrix);
  }
  front_mineral_patches.instanceMatrix.needsUpdate = true;
  root.add(front_mineral_patches);

  const supportPatchData = [
    [-1.25, 0.72, 0.09, 0.045, 0.18],
    [-1.02, 0.54, 0.12, 0.052, -0.30],
    [-1.20, 0.28, 0.08, 0.035, 0.42],
    [-0.96, 0.16, 0.10, 0.040, -0.12],
    [0.96, 0.73, 0.10, 0.042, -0.22],
    [1.22, 0.57, 0.12, 0.050, 0.31],
    [1.00, 0.31, 0.085, 0.036, -0.38],
    [1.24, 0.17, 0.10, 0.042, 0.16]
  ];

  const support_mineral_patches = new THREE.InstancedMesh(
    mineral_patchGeom,
    tan_mineralMat,
    supportPatchData.length
  );
  support_mineral_patches.name = "support_mineral_patches";

  for (let i = 0; i < supportPatchData.length; i++) {
    const patch = supportPatchData[i];
    patch_dummy.position.set(patch[0], patch[1], 0.425);
    patch_dummy.rotation.set(0, 0, patch[4]);
    patch_dummy.scale.set(patch[2], patch[3], 1);
    patch_dummy.updateMatrix();
    support_mineral_patches.setMatrixAt(i, patch_dummy.matrix);
  }
  support_mineral_patches.instanceMatrix.needsUpdate = true;
  root.add(support_mineral_patches);

  const speckleGeom = new THREE.CircleGeometry(1, 7);

  const top_speckles = new THREE.InstancedMesh(
    speckleGeom,
    dark_mineralMat,
    42
  );
  top_speckles.name = "top_speckles";

  const speckle_dummy = new THREE.Object3D();

  for (let i = 0; i < 42; i++) {
    const x = -1.55 + (((i * 37) % 100) / 100) * 3.10;
    const z = -0.47 + (((i * 61 + 17) % 100) / 100) * 0.94;
    const radius = 0.009 + (i % 5) * 0.003;

    speckle_dummy.position.set(
      x,
      slabY + slabH / 2 + 0.008,
      z
    );
    speckle_dummy.rotation.set(-Math.PI / 2, 0, i * 0.73);
    speckle_dummy.scale.set(
      radius * (1.0 + (i % 3) * 0.35),
      radius,
      1
    );
    speckle_dummy.updateMatrix();
    top_speckles.setMatrixAt(i, speckle_dummy.matrix);
  }
  top_speckles.instanceMatrix.needsUpdate = true;
  root.add(top_speckles);

  const front_speckles = new THREE.InstancedMesh(
    speckleGeom,
    dark_mineralMat,
    36
  );
  front_speckles.name = "front_speckles";

  for (let i = 0; i < 36; i++) {
    const x = -1.57 + (((i * 43 + 9) % 100) / 100) * 3.14;
    const y = 1.005 + (((i * 29 + 11) % 100) / 100) * 0.19;
    const radius = 0.009 + (i % 4) * 0.003;

    speckle_dummy.position.set(x, y, slabD / 2 + 0.009);
    speckle_dummy.rotation.set(0, 0, i * 0.61);
    speckle_dummy.scale.set(
      radius * (1.0 + (i % 3) * 0.4),
      radius,
      1
    );
    speckle_dummy.updateMatrix();
    front_speckles.setMatrixAt(i, speckle_dummy.matrix);
  }
  front_speckles.instanceMatrix.needsUpdate = true;
  root.add(front_speckles);

  const support_speckles = new THREE.InstancedMesh(
    speckleGeom,
    dark_mineralMat,
    32
  );
  support_speckles.name = "support_speckles";

  for (let i = 0; i < 32; i++) {
    const side = i < 16 ? -1 : 1;
    const localIndex = i % 16;
    const xOffset =
      -0.29 + (((localIndex * 31 + 7) % 100) / 100) * 0.58;
    const y =
      0.09 + (((localIndex * 47 + 13) % 100) / 100) * 0.76;
    const radius = 0.009 + (localIndex % 4) * 0.003;

    speckle_dummy.position.set(side * supportX + xOffset, y, 0.427);
    speckle_dummy.rotation.set(0, 0, localIndex * 0.67);
    speckle_dummy.scale.set(
      radius * (1.0 + (localIndex % 3) * 0.35),
      radius,
      1
    );
    speckle_dummy.updateMatrix();
    support_speckles.setMatrixAt(i, speckle_dummy.matrix);
  }
  support_speckles.instanceMatrix.needsUpdate = true;
  root.add(support_speckles);

  const quartz_speckles = new THREE.InstancedMesh(
    speckleGeom,
    pale_quartzMat,
    28
  );
  quartz_speckles.name = "quartz_speckles";

  for (let i = 0; i < 28; i++) {
    const x = -1.50 + (((i * 47 + 5) % 100) / 100) * 3.0;
    const y = 1.015 + (((i * 31 + 19) % 100) / 100) * 0.17;
    const radius = 0.008 + (i % 4) * 0.0025;

    speckle_dummy.position.set(x, y, slabD / 2 + 0.010);
    speckle_dummy.rotation.set(0, 0, i * 0.49);
    speckle_dummy.scale.set(
      radius * (1.0 + (i % 2) * 0.45),
      radius,
      1
    );
    speckle_dummy.updateMatrix();
    quartz_speckles.setMatrixAt(i, speckle_dummy.matrix);
  }
  quartz_speckles.instanceMatrix.needsUpdate = true;
  root.add(quartz_speckles);

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

  fitToUnitCube(THREE, root);
  return root;
}