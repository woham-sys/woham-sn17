function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "double_casement_window";

  const outer_frame = new THREE.Group();
  outer_frame.name = "outer_frame";
  root.add(outer_frame);

  const glazing = new THREE.Group();
  glazing.name = "glazing";
  root.add(glazing);

  const hardware = new THREE.Group();
  hardware.name = "hardware";
  root.add(hardware);

  const frameMat = new THREE.MeshStandardMaterial({ color: "#d8d8d5", metalness: 0.0, roughness: 0.45 });
  const frameHighlightMat = new THREE.MeshStandardMaterial({ color: "#efefec", metalness: 0.0, roughness: 0.35 });
  const gasketMat = new THREE.MeshStandardMaterial({ color: "#171817", metalness: 0.0, roughness: 0.8 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: "#e8eeee",
    metalness: 0.0,
    roughness: 0.15,
    transparent: true,
    opacity: 0.5,
    clearcoat: 0.25,
    clearcoatRoughness: 0.12
  });
  const handleMat = new THREE.MeshStandardMaterial({ color: "#b8b8b5", metalness: 0.0, roughness: 0.4 });
  const hingeMat = new THREE.MeshStandardMaterial({ color: "#c4c4c1", metalness: 0.0, roughness: 0.42 });
  const darkDetailMat = new THREE.MeshStandardMaterial({ color: "#252625", metalness: 0.0, roughness: 0.75 });

  function addBox(parent, name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function addCylinderX(parent, name, length, radius, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 20), mat);
    mesh.name = name;
    mesh.rotation.z = Math.PI / 2;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function addCylinderY(parent, name, length, radius, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 18), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  const outerW = 1.36;
  const outerH = 2.0;
  const sideRail = 0.075;
  const topRail = 0.09;
  const bottomRail = 0.075;
  const openingW = outerW - sideRail * 2;
  const openingH = outerH - topRail - bottomRail;

  const outer_left_jamb = addBox(outer_frame, "outer_left_jamb", sideRail, outerH, 0.11, frameMat, -outerW / 2 + sideRail / 2, 0, 0);
  const outer_right_jamb = addBox(outer_frame, "outer_right_jamb", sideRail, outerH, 0.11, frameMat, outerW / 2 - sideRail / 2, 0, 0);
  const outer_top_header = addBox(outer_frame, "outer_top_header", outerW, topRail, 0.11, frameMat, 0, outerH / 2 - topRail / 2, 0);
  const outer_bottom_sill = addBox(outer_frame, "outer_bottom_sill", outerW, bottomRail, 0.11, frameMat, 0, -outerH / 2 + bottomRail / 2, 0);

  const left_inner_reveal = addBox(outer_frame, "left_inner_reveal", 0.018, openingH, 0.055, frameHighlightMat, -openingW / 2 + 0.009, 0, 0.035);
  const right_inner_reveal = addBox(outer_frame, "right_inner_reveal", 0.018, openingH, 0.055, frameHighlightMat, openingW / 2 - 0.009, 0, 0.035);
  const top_inner_reveal = addBox(outer_frame, "top_inner_reveal", openingW, 0.018, 0.055, frameHighlightMat, 0, openingH / 2 - 0.009, 0.035);
  const bottom_inner_reveal = addBox(outer_frame, "bottom_inner_reveal", openingW, 0.018, 0.055, frameHighlightMat, 0, -openingH / 2 + 0.009, 0.035);

  const center_mullion_shadow = addBox(outer_frame, "center_mullion_shadow", 0.014, openingH, 0.045, gasketMat, 0, 0, 0.025);

  const sashW = 0.625;
  const sashH = 1.84;
  const sashX = 0.315;
  const sashBottom = -0.92;
  const sashTop = sashBottom + sashH;
  const sashCenterY = (sashBottom + sashTop) / 2;
  const paneW = 0.45;
  const paneH = 1.55;
  const paneX = 0.25;
  const paneCenterY = -0.01;

  const left_sash_stileGeom = new THREE.BoxGeometry(0.085, sashH, 0.075);
  const left_sash_railGeom = new THREE.BoxGeometry(sashW, 0.14, 0.075);
  const right_sash_stileGeom = new THREE.BoxGeometry(0.085, sashH, 0.075);
  const right_sash_railGeom = new THREE.BoxGeometry(sashW, 0.14, 0.075);

  const left_sash_outer_stile = new THREE.Mesh(left_sash_stileGeom, frameMat);
  left_sash_outer_stile.name = "left_sash_outer_stile";
  left_sash_outer_stile.position.set(-sashX + 0.0425, sashCenterY, 0.065);
  root.add(left_sash_outer_stile);

  const left_sash_center_stile = new THREE.Mesh(left_sash_stileGeom, frameMat);
  left_sash_center_stile.name = "left_sash_center_stile";
  left_sash_center_stile.position.set(-0.0425, sashCenterY, 0.065);
  root.add(left_sash_center_stile);

  const left_sash_top_rail = new THREE.Mesh(left_sash_railGeom, frameMat);
  left_sash_top_rail.name = "left_sash_top_rail";
  left_sash_top_rail.position.set(-sashX, sashTop - 0.07, 0.065);
  root.add(left_sash_top_rail);

  const left_sash_bottom_rail = new THREE.Mesh(left_sash_railGeom, frameMat);
  left_sash_bottom_rail.name = "left_sash_bottom_rail";
  left_sash_bottom_rail.position.set(-sashX, sashBottom + 0.07, 0.065);
  root.add(left_sash_bottom_rail);

  const right_sash_center_stile = new THREE.Mesh(right_sash_stileGeom, frameMat);
  right_sash_center_stile.name = "right_sash_center_stile";
  right_sash_center_stile.position.set(0.0425, sashCenterY, 0.065);
  root.add(right_sash_center_stile);

  const right_sash_outer_stile = new THREE.Mesh(right_sash_stileGeom, frameMat);
  right_sash_outer_stile.name = "right_sash_outer_stile";
  right_sash_outer_stile.position.set(sashX - 0.0425, sashCenterY, 0.065);
  root.add(right_sash_outer_stile);

  const right_sash_top_rail = new THREE.Mesh(right_sash_railGeom, frameMat);
  right_sash_top_rail.name = "right_sash_top_rail";
  right_sash_top_rail.position.set(sashX, sashTop - 0.07, 0.065);
  root.add(right_sash_top_rail);

  const right_sash_bottom_rail = new THREE.Mesh(right_sash_railGeom, frameMat);
  right_sash_bottom_rail.name = "right_sash_bottom_rail";
  right_sash_bottom_rail.position.set(sashX, sashBottom + 0.07, 0.065);
  root.add(right_sash_bottom_rail);

  const left_glass_pane = addBox(glazing, "left_glass_pane", paneW, paneH, 0.012, glassMat, -paneX, paneCenterY, 0.045);
  const right_glass_pane = addBox(glazing, "right_glass_pane", paneW, paneH, 0.012, glassMat, paneX, paneCenterY, 0.045);

  const left_glass_left_gasket = addBox(glazing, "left_glass_left_gasket", 0.012, paneH + 0.018, 0.018, gasketMat, -paneX - paneW / 2, paneCenterY, 0.108);
  const left_glass_right_gasket = addBox(glazing, "left_glass_right_gasket", 0.012, paneH + 0.018, 0.018, gasketMat, -paneX + paneW / 2, paneCenterY, 0.108);
  const left_glass_top_gasket = addBox(glazing, "left_glass_top_gasket", paneW + 0.018, 0.012, 0.018, gasketMat, -paneX, paneCenterY + paneH / 2, 0.108);
  const left_glass_bottom_gasket = addBox(glazing, "left_glass_bottom_gasket", paneW + 0.018, 0.012, 0.018, gasketMat, -paneX, paneCenterY - paneH / 2, 0.108);

  const right_glass_left_gasket = addBox(glazing, "right_glass_left_gasket", 0.012, paneH + 0.018, 0.018, gasketMat, paneX - paneW / 2, paneCenterY, 0.108);
  const right_glass_right_gasket = addBox(glazing, "right_glass_right_gasket", 0.012, paneH + 0.018, 0.018, gasketMat, paneX + paneW / 2, paneCenterY, 0.108);
  const right_glass_top_gasket = addBox(glazing, "right_glass_top_gasket", paneW + 0.018, 0.012, 0.018, gasketMat, paneX, paneCenterY + paneH / 2, 0.108);
  const right_glass_bottom_gasket = addBox(glazing, "right_glass_bottom_gasket", paneW + 0.018, 0.012, 0.018, gasketMat, paneX, paneCenterY - paneH / 2, 0.108);

  const left_inner_vertical_trim = addBox(glazing, "left_inner_vertical_trim", 0.018, paneH + 0.055, 0.018, frameHighlightMat, -paneX - paneW / 2 - 0.018, paneCenterY, 0.112);
  const left_inner_horizontal_trim = addBox(glazing, "left_inner_horizontal_trim", paneW + 0.07, 0.018, 0.018, frameHighlightMat, -paneX, paneCenterY + paneH / 2 + 0.018, 0.112);
  const right_inner_vertical_trim = addBox(glazing, "right_inner_vertical_trim", 0.018, paneH + 0.055, 0.018, frameHighlightMat, paneX + paneW / 2 + 0.018, paneCenterY, 0.112);
  const right_inner_horizontal_trim = addBox(glazing, "right_inner_horizontal_trim", paneW + 0.07, 0.018, 0.018, frameHighlightMat, paneX, paneCenterY + paneH / 2 + 0.018, 0.112);

  const miterLength = Math.sqrt(0.085 * 0.085 + 0.14 * 0.14);
  const miterGeom = new THREE.BoxGeometry(miterLength, 0.014, 0.018);

  function addMiter(name, x1, y1, x2, y2) {
    const mesh = new THREE.Mesh(miterGeom, frameHighlightMat);
    mesh.name = name;
    mesh.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0.112);
    mesh.rotation.z = Math.atan2(y2 - y1, x2 - x1);
    root.add(mesh);
    return mesh;
  }

  const left_top_miter = addMiter("left_top_miter", -0.58, 0.85, -0.50, 0.92);
  const left_bottom_miter = addMiter("left_bottom_miter", -0.58, -0.85, -0.50, -0.92);
  const right_top_miter = addMiter("right_top_miter", 0.58, 0.85, 0.50, 0.92);
  const right_bottom_miter = addMiter("right_bottom_miter", 0.58, -0.85, 0.50, -0.92);

  const left_handle_backplate = addBox(hardware, "left_handle_backplate", 0.052, 0.25, 0.025, handleMat, -0.045, -0.08, 0.125);
  const right_handle_backplate = addBox(hardware, "right_handle_backplate", 0.052, 0.25, 0.025, handleMat, 0.045, -0.08, 0.125);

  const left_handle_spindle = addCylinderX(hardware, "left_handle_spindle", 0.04, 0.018, handleMat, -0.045, -0.02, 0.145);
  const right_handle_spindle = addCylinderX(hardware, "right_handle_spindle", 0.04, 0.018, handleMat, 0.045, -0.02, 0.145);

  const left_handle_lever = addCylinderX(hardware, "left_handle_lever", 0.20, 0.014, handleMat, -0.15, -0.02, 0.158);
  const right_handle_lever = addCylinderX(hardware, "right_handle_lever", 0.20, 0.014, handleMat, 0.15, -0.02, 0.158);

  const left_handle_end_cap = new THREE.Mesh(new THREE.SphereGeometry(0.0145, 16, 8), handleMat);
  left_handle_end_cap.name = "left_handle_end_cap";
  left_handle_end_cap.position.set(-0.25, -0.02, 0.158);
  hardware.add(left_handle_end_cap);

  const right_handle_end_cap = new THREE.Mesh(new THREE.SphereGeometry(0.0145, 16, 8), handleMat);
  right_handle_end_cap.name = "right_handle_end_cap";
  right_handle_end_cap.position.set(0.25, -0.02, 0.158);
  hardware.add(right_handle_end_cap);

  const left_keyhole_ring = new THREE.Mesh(new THREE.TorusGeometry(0.012, 0.003, 8, 18), darkDetailMat);
  left_keyhole_ring.name = "left_keyhole_ring";
  left_keyhole_ring.position.set(-0.045, -0.145, 0.142);
  hardware.add(left_keyhole_ring);

  const left_keyhole_slot = addBox(hardware, "left_keyhole_slot", 0.006, 0.018, 0.006, darkDetailMat, -0.045, -0.158, 0.145);
  const right_lock_slot = addBox(hardware, "right_lock_slot", 0.012, 0.038, 0.008, darkDetailMat, 0.045, -0.13, 0.145);

  const screwGeom = new THREE.CircleGeometry(0.006, 12);
  const screwPositions = [
    [-0.045, 0.025], [-0.045, -0.185],
    [0.045, 0.025], [0.045, -0.185],
    [-0.045, -0.085], [0.045, -0.085]
  ];
  for (let i = 0; i < screwPositions.length; i++) {
    const screw = new THREE.Mesh(screwGeom, darkDetailMat);
    screw.name = "handle_screw_" + i;
    screw.position.set(screwPositions[i][0], screwPositions[i][1], 0.143);
    hardware.add(screw);
  }

  const hingeLeafGeom = new THREE.BoxGeometry(0.035, 0.105, 0.018);
  const hingeBarrelGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.115, 16);
  const hingeYs = [0.68, 0.0, -0.68];

  for (let i = 0; i < hingeYs.length; i++) {
    const left_hinge_leaf = new THREE.Mesh(hingeLeafGeom, hingeMat);
    left_hinge_leaf.name = "left_hinge_leaf_" + i;
    left_hinge_leaf.position.set(-0.615, hingeYs[i], 0.112);
    hardware.add(left_hinge_leaf);

    const left_hinge_barrel = new THREE.Mesh(hingeBarrelGeom, hingeMat);
    left_hinge_barrel.name = "left_hinge_barrel_" + i;
    left_hinge_barrel.position.set(-0.642, hingeYs[i], 0.125);
    hardware.add(left_hinge_barrel);

    const right_hinge_leaf = new THREE.Mesh(hingeLeafGeom, hingeMat);
    right_hinge_leaf.name = "right_hinge_leaf_" + i;
    right_hinge_leaf.position.set(0.615, hingeYs[i], 0.112);
    hardware.add(right_hinge_leaf);

    const right_hinge_barrel = new THREE.Mesh(hingeBarrelGeom, hingeMat);
    right_hinge_barrel.name = "right_hinge_barrel_" + i;
    right_hinge_barrel.position.set(0.642, hingeYs[i], 0.125);
    hardware.add(right_hinge_barrel);
  }

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
  if (maxDim > 0) {
    const scale = 0.98 / maxDim;
    root.scale.setScalar(scale);
  }
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
