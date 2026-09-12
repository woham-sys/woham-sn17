// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const tool_assembly = new THREE.Group();
  root.add(tool_assembly);

  const wooden_handleMat = new THREE.MeshStandardMaterial({
    color: 0xd9a86f,
    metalness: 0.0,
    roughness: 0.6,
  });

  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0xb9824f,
    metalness: 0.0,
    roughness: 0.6,
  });

  const metal_ferruleMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const ferrule_grooveMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });

  const wooden_handleProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.105, 0.000),
    new THREE.Vector2(0.112, 0.045),
    new THREE.Vector2(0.122, 0.180),
    new THREE.Vector2(0.138, 0.380),
    new THREE.Vector2(0.165, 0.620),
    new THREE.Vector2(0.198, 0.880),
    new THREE.Vector2(0.220, 1.080),
    new THREE.Vector2(0.218, 1.220),
    new THREE.Vector2(0.205, 1.400),
    new THREE.Vector2(0.185, 1.620),
    new THREE.Vector2(0.162, 1.850),
    new THREE.Vector2(0.142, 2.080),
    new THREE.Vector2(0.127, 2.300),
    new THREE.Vector2(0.120, 2.480),
    new THREE.Vector2(0.121, 2.620),
    new THREE.Vector2(0.116, 2.700),
    new THREE.Vector2(0.104, 2.770),
    new THREE.Vector2(0.084, 2.820),
    new THREE.Vector2(0.055, 2.855),
    new THREE.Vector2(0.025, 2.872),
    new THREE.Vector2(0.000, 2.878),
  ];

  const wooden_handleGeom = new THREE.LatheGeometry(
    wooden_handleProfile,
    48
  );
  const wooden_handle = new THREE.Mesh(
    wooden_handleGeom,
    wooden_handleMat
  );
  tool_assembly.add(wooden_handle);

  function handleRadiusAt(axial) {
    for (let i = 1; i < wooden_handleProfile.length; i++) {
      const previous = wooden_handleProfile[i - 1];
      const current = wooden_handleProfile[i];
      if (axial <= current.y) {
        const span = current.y - previous.y || 1;
        const t = (axial - previous.y) / span;
        return previous.x + (current.x - previous.x) * t;
      }
    }
    return 0;
  }

  const wood_grain = new THREE.Group();
  for (let i = 0; i < 14; i++) {
    const grainPoints = [];
    const start = 0.12 + (i % 4) * 0.075;
    const end = 2.68 - ((i * 3) % 5) * 0.055;
    const baseAngle = (i / 14) * Math.PI * 2;

    for (let j = 0; j <= 12; j++) {
      const t = j / 12;
      const axial = start + (end - start) * t;
      const angle =
        baseAngle +
        Math.sin(t * Math.PI * 2 + i * 0.71) * 0.018;
      const radius = handleRadiusAt(axial) + 0.0025;

      grainPoints.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          axial,
          Math.sin(angle) * radius
        )
      );
    }

    const wood_grain_strandGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(grainPoints),
      28,
      0.0022,
      5,
      false
    );
    const wood_grain_strand = new THREE.Mesh(
      wood_grain_strandGeom,
      wood_grainMat
    );
    wood_grain.add(wood_grain_strand);
  }
  tool_assembly.add(wood_grain);

  const metal_ferruleProfile = [
    new THREE.Vector2(0.000, -0.485),
    new THREE.Vector2(0.014, -0.478),
    new THREE.Vector2(0.027, -0.455),
    new THREE.Vector2(0.045, -0.405),
    new THREE.Vector2(0.066, -0.335),
    new THREE.Vector2(0.086, -0.245),
    new THREE.Vector2(0.101, -0.145),
    new THREE.Vector2(0.108, -0.075),
    new THREE.Vector2(0.108, -0.025),
    new THREE.Vector2(0.000, -0.025),
  ];

  const metal_ferruleGeom = new THREE.LatheGeometry(
    metal_ferruleProfile,
    40
  );
  const metal_ferrule = new THREE.Mesh(
    metal_ferruleGeom,
    metal_ferruleMat
  );
  tool_assembly.add(metal_ferrule);

  const ferrule_collarGeom = new THREE.CylinderGeometry(
    0.111,
    0.108,
    0.060,
    40
  );
  const ferrule_collar = new THREE.Mesh(
    ferrule_collarGeom,
    metal_ferruleMat
  );
  ferrule_collar.position.y = -0.015;
  tool_assembly.add(ferrule_collar);

  const ferrule_grooveGeom = new THREE.TorusGeometry(
    0.108,
    0.0028,
    6,
    40
  );
  const ferrule_groove = new THREE.Mesh(
    ferrule_grooveGeom,
    ferrule_grooveMat
  );
  ferrule_groove.rotation.x = Math.PI / 2;
  ferrule_groove.position.y = 0.014;
  tool_assembly.add(ferrule_groove);

  tool_assembly.rotation.set(-0.12, 0, -0.92);

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