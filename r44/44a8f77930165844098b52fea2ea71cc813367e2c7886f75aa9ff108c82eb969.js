// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd6a63a,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brightGoldMat = new THREE.MeshStandardMaterial({
    color: 0xf0c65a,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkGoldMat = new THREE.MeshStandardMaterial({
    color: 0x9b6418,
    metalness: 0.6,
    roughness: 0.2,
  });
  const diamondMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const diamondTableMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  const diamondGeom = new THREE.CylinderGeometry(0.038, 0.055, 0.035, 12);
  const diamondTableGeom = new THREE.CircleGeometry(0.034, 12);
  const diamondSettingGeom = new THREE.TorusGeometry(0.052, 0.008, 8, 24);
  const diamondProngGeom = new THREE.SphereGeometry(0.011, 10, 6);
  const postGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.72, 24);
  const postTipGeom = new THREE.SphereGeometry(0.045, 16, 8);
  const hingeBarrelGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.18, 24);
  const hingeCapGeom = new THREE.CylinderGeometry(0.071, 0.071, 0.018, 24);
  const hingeSeamGeom = new THREE.TorusGeometry(0.066, 0.006, 8, 24);
  const frontRailGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.68, 16);
  const rearRailGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.68, 16);
  const crossbarGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.23, 16);
  const hingeSlotGeom = new THREE.BoxGeometry(0.012, 0.065, 0.008);

  function createDiamondSetting(name) {
    const setting = new THREE.Group();
    setting.name = name;

    const diamond = new THREE.Mesh(diamondGeom, diamondMat);
    diamond.name = name + "_gemstone";
    diamond.rotation.x = Math.PI / 2;
    diamond.position.z = 0.018;
    setting.add(diamond);

    const table = new THREE.Mesh(diamondTableGeom, diamondTableMat);
    table.name = name + "_table";
    table.position.z = 0.037;
    setting.add(table);

    const bezel = new THREE.Mesh(diamondSettingGeom, goldMat);
    bezel.name = name + "_bezel";
    bezel.position.z = 0.004;
    setting.add(bezel);

    const prongs = new THREE.InstancedMesh(
      diamondProngGeom,
      brightGoldMat,
      4
    );
    prongs.name = name + "_prongs";
    const prongMatrix = new THREE.Matrix4();
    for (let i = 0; i < 4; i++) {
      const angle = Math.PI / 4 + i * Math.PI / 2;
      prongMatrix.makeTranslation(
        Math.cos(angle) * 0.052,
        Math.sin(angle) * 0.052,
        0.034
      );
      prongs.setMatrixAt(i, prongMatrix);
    }
    prongs.instanceMatrix.needsUpdate = true;
    setting.add(prongs);

    return setting;
  }

  function createCuffLink(name) {
    const cuff_link = new THREE.Group();
    cuff_link.name = name;

    const front_plate = new THREE.Group();
    front_plate.name = name + "_front_plate";
    cuff_link.add(front_plate);

    const front_rail = new THREE.Mesh(frontRailGeom, brightGoldMat);
    front_rail.name = name + "_front_rail";
    front_rail.rotation.z = Math.PI / 2;
    front_rail.position.set(0, 0.105, 0.018);
    front_plate.add(front_rail);

    const rear_rail = new THREE.Mesh(rearRailGeom, goldMat);
    rear_rail.name = name + "_rear_rail";
    rear_rail.rotation.z = Math.PI / 2;
    rear_rail.position.set(0, -0.105, 0.018);
    front_plate.add(rear_rail);

    const left_end_cap = new THREE.Mesh(crossbarGeom, brightGoldMat);
    left_end_cap.name = name + "_left_end_cap";
    left_end_cap.position.set(-0.325, 0, 0.018);
    front_plate.add(left_end_cap);

    const right_end_cap = new THREE.Mesh(crossbarGeom, brightGoldMat);
    right_end_cap.name = name + "_right_end_cap";
    right_end_cap.position.set(0.325, 0, 0.018);
    front_plate.add(right_end_cap);

    const diamond_settings = new THREE.Group();
    diamond_settings.name = name + "_diamond_settings";
    const diamondX = [-0.255, -0.085, 0.085, 0.255];
    for (let i = 0; i < diamondX.length; i++) {
      const diamond_setting = createDiamondSetting(
        name + "_diamond_setting_" + i
      );
      diamond_setting.position.set(diamondX[i], 0, 0.012);
      diamond_settings.add(diamond_setting);
    }
    front_plate.add(diamond_settings);

    const post = new THREE.Mesh(postGeom, brightGoldMat);
    post.name = name + "_post";
    post.rotation.x = Math.PI / 2;
    post.position.set(0, 0, -0.36);
    cuff_link.add(post);

    const post_tip = new THREE.Mesh(postTipGeom, brightGoldMat);
    post_tip.name = name + "_post_tip";
    post_tip.scale.set(1, 1, 0.55);
    post_tip.position.set(0, 0, -0.735);
    cuff_link.add(post_tip);

    const hinge_barrel = new THREE.Mesh(hingeBarrelGeom, goldMat);
    hinge_barrel.name = name + "_hinge_barrel";
    hinge_barrel.rotation.z = Math.PI / 2;
    hinge_barrel.position.set(0, 0, -0.035);
    cuff_link.add(hinge_barrel);

    const left_hinge_cap = new THREE.Mesh(hingeCapGeom, brightGoldMat);
    left_hinge_cap.name = name + "_left_hinge_cap";
    left_hinge_cap.rotation.z = Math.PI / 2;
    left_hinge_cap.position.set(-0.098, 0, -0.035);
    cuff_link.add(left_hinge_cap);

    const right_hinge_cap = new THREE.Mesh(hingeCapGeom, brightGoldMat);
    right_hinge_cap.name = name + "_right_hinge_cap";
    right_hinge_cap.rotation.z = Math.PI / 2;
    right_hinge_cap.position.set(0.098, 0, -0.035);
    cuff_link.add(right_hinge_cap);

    const left_hinge_seam = new THREE.Mesh(hingeSeamGeom, darkGoldMat);
    left_hinge_seam.name = name + "_left_hinge_seam";
    left_hinge_seam.rotation.y = Math.PI / 2;
    left_hinge_seam.position.set(-0.087, 0, -0.035);
    cuff_link.add(left_hinge_seam);

    const right_hinge_seam = new THREE.Mesh(hingeSeamGeom, darkGoldMat);
    right_hinge_seam.name = name + "_right_hinge_seam";
    right_hinge_seam.rotation.y = Math.PI / 2;
    right_hinge_seam.position.set(0.087, 0, -0.035);
    cuff_link.add(right_hinge_seam);

    const hinge_slot = new THREE.Mesh(hingeSlotGeom, darkGoldMat);
    hinge_slot.name = name + "_hinge_slot";
    hinge_slot.position.set(0, 0, 0.031);
    cuff_link.add(hinge_slot);

    return cuff_link;
  }

  const left_cuff_link = createCuffLink("left_cuff_link");
  left_cuff_link.position.set(-0.31, 0.075, 0.025);
  left_cuff_link.rotation.set(-0.08, -0.12, 0.72);
  root.add(left_cuff_link);

  const right_cuff_link = createCuffLink("right_cuff_link");
  right_cuff_link.position.set(0.31, -0.075, -0.025);
  right_cuff_link.rotation.set(0.08, 0.12, -0.72);
  root.add(right_cuff_link);

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