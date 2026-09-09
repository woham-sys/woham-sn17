function __sn17_user(THREE) {
  const root = new THREE.Group();
  const pen_assembly = new THREE.Group();
  root.add(pen_assembly);

  const clear_plasticMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.65,
    thickness: 0.12,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const frosted_plasticMat = new THREE.MeshPhysicalMaterial({
    color: 0xf8fbff,
    metalness: 0.0,
    roughness: 0.22,
    transmission: 0.25,
    thickness: 0.08,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const pearl_whiteMat = new THREE.MeshStandardMaterial({
    color: 0xfff7f2,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x6a5d58,
    emissiveIntensity: 0.25
  });

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xdde2e5,
    metalness: 0.35,
    roughness: 0.22
  });

  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x666b70,
    metalness: 0.45,
    roughness: 0.28
  });

  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const cyan_glintMat = new THREE.MeshBasicMaterial({
    color: 0x91f4ff,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const pink_glintMat = new THREE.MeshBasicMaterial({
    color: 0xffb7dc,
    transparent: true,
    opacity: 0.24,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const yellow_glintMat = new THREE.MeshBasicMaterial({
    color: 0xffef9c,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const violet_glintMat = new THREE.MeshBasicMaterial({
    color: 0xc8baff,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const rear_barrelGeom = new THREE.CylinderGeometry(0.105, 0.035, 1.28, 48, 1, false);
  const rear_barrel = new THREE.Mesh(rear_barrelGeom, clear_plasticMat);
  rear_barrel.rotation.z = -Math.PI / 2;
  rear_barrel.position.x = -0.72;
  pen_assembly.add(rear_barrel);

  const rear_inner_coreGeom = new THREE.CylinderGeometry(0.064, 0.018, 1.18, 32);
  const rear_inner_core = new THREE.Mesh(rear_inner_coreGeom, pearl_whiteMat);
  rear_inner_core.rotation.z = -Math.PI / 2;
  rear_inner_core.position.x = -0.72;
  pen_assembly.add(rear_inner_core);

  const center_sleeveGeom = new THREE.CylinderGeometry(0.108, 0.108, 0.24, 48);
  const center_sleeve = new THREE.Mesh(center_sleeveGeom, frosted_plasticMat);
  center_sleeve.rotation.z = -Math.PI / 2;
  center_sleeve.position.x = -0.02;
  pen_assembly.add(center_sleeve);

  const front_barrelGeom = new THREE.CylinderGeometry(0.145, 0.105, 1.25, 48, 1, false);
  const front_barrel = new THREE.Mesh(front_barrelGeom, clear_plasticMat);
  front_barrel.rotation.z = -Math.PI / 2;
  front_barrel.position.x = 0.645;
  pen_assembly.add(front_barrel);

  const front_inner_coreGeom = new THREE.CylinderGeometry(0.088, 0.064, 1.16, 32);
  const front_inner_core = new THREE.Mesh(front_inner_coreGeom, pearl_whiteMat);
  front_inner_core.rotation.z = -Math.PI / 2;
  front_inner_core.position.x = 0.64;
  pen_assembly.add(front_inner_core);

  const rounded_noseGeom = new THREE.SphereGeometry(0.145, 40, 20);
  const rounded_nose = new THREE.Mesh(rounded_noseGeom, clear_plasticMat);
  rounded_nose.scale.set(0.72, 1, 1);
  rounded_nose.position.x = 1.275;
  pen_assembly.add(rounded_nose);

  const nose_inner_capGeom = new THREE.SphereGeometry(0.088, 32, 16);
  const nose_inner_cap = new THREE.Mesh(nose_inner_capGeom, pearl_whiteMat);
  nose_inner_cap.scale.set(0.65, 1, 1);
  nose_inner_cap.position.x = 1.265;
  pen_assembly.add(nose_inner_cap);

  const tail_tipGeom = new THREE.CylinderGeometry(0.035, 0.022, 0.16, 32);
  const tail_tip = new THREE.Mesh(tail_tipGeom, clear_plasticMat);
  tail_tip.rotation.z = -Math.PI / 2;
  tail_tip.position.x = -1.42;
  pen_assembly.add(tail_tip);

  const tail_buttonGeom = new THREE.SphereGeometry(0.024, 24, 12);
  const tail_button = new THREE.Mesh(tail_buttonGeom, silverMat);
  tail_button.scale.set(0.65, 1, 1);
  tail_button.position.x = -1.515;
  pen_assembly.add(tail_button);

  const seam_ringGeom = new THREE.TorusGeometry(0.108, 0.006, 10, 48);

  const rear_seam_ring = new THREE.Mesh(seam_ringGeom, silverMat);
  rear_seam_ring.rotation.y = Math.PI / 2;
  rear_seam_ring.position.x = -0.14;
  pen_assembly.add(rear_seam_ring);

  const front_seam_ring = new THREE.Mesh(seam_ringGeom, silverMat);
  front_seam_ring.rotation.y = Math.PI / 2;
  front_seam_ring.position.x = 0.035;
  pen_assembly.add(front_seam_ring);

  const nose_seam_ringGeom = new THREE.TorusGeometry(0.143, 0.004, 8, 48);
  const nose_seam_ring = new THREE.Mesh(nose_seam_ringGeom, frosted_plasticMat);
  nose_seam_ring.rotation.y = Math.PI / 2;
  nose_seam_ring.position.x = 1.205;
  pen_assembly.add(nose_seam_ring);

  const clip_anchorGeom = new THREE.BoxGeometry(0.13, 0.035, 0.055);
  const clip_anchor = new THREE.Mesh(clip_anchorGeom, silverMat);
  clip_anchor.position.set(-0.055, 0.108, -0.018);
  pen_assembly.add(clip_anchor);

  const clip_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.105, 0.125, -0.02),
    new THREE.Vector3(0.03, 0.158, -0.025),
    new THREE.Vector3(0.25, 0.164, -0.025),
    new THREE.Vector3(0.47, 0.145, -0.018)
  ]);
  const clipGeom = new THREE.TubeGeometry(clip_curve, 32, 0.011, 8, false);
  const clip = new THREE.Mesh(clipGeom, silverMat);
  pen_assembly.add(clip);

  const clip_tipGeom = new THREE.SphereGeometry(0.014, 16, 8);
  const clip_tip = new THREE.Mesh(clip_tipGeom, silverMat);
  clip_tip.position.set(0.47, 0.145, -0.018);
  pen_assembly.add(clip_tip);

  const clip_grooveGeom = new THREE.BoxGeometry(0.075, 0.004, 0.012);
  const clip_groove = new THREE.Mesh(clip_grooveGeom, dark_metalMat);
  clip_groove.position.set(-0.045, 0.132, -0.018);
  clip_groove.rotation.y = -0.18;
  pen_assembly.add(clip_groove);

  const rear_highlightGeom = new THREE.PlaneGeometry(1.08, 0.018);
  const rear_highlight = new THREE.Mesh(rear_highlightGeom, highlightMat);
  rear_highlight.rotation.x = -1.18;
  rear_highlight.position.set(-0.72, 0.075, 0.052);
  pen_assembly.add(rear_highlight);

  const front_highlightGeom = new THREE.PlaneGeometry(1.08, 0.022);
  const front_highlight = new THREE.Mesh(front_highlightGeom, highlightMat);
  front_highlight.rotation.x = -1.18;
  front_highlight.position.set(0.65, 0.105, 0.058);
  pen_assembly.add(front_highlight);

  const iridescent_bandGeom = new THREE.PlaneGeometry(0.22, 0.052);

  const cyan_iridescent_band = new THREE.Mesh(iridescent_bandGeom, cyan_glintMat);
  cyan_iridescent_band.rotation.x = -1.18;
  cyan_iridescent_band.position.set(0.48, 0.105, 0.062);
  pen_assembly.add(cyan_iridescent_band);

  const pink_iridescent_band = new THREE.Mesh(iridescent_bandGeom, pink_glintMat);
  pink_iridescent_band.rotation.x = -1.18;
  pink_iridescent_band.position.set(0.72, 0.108, 0.061);
  pen_assembly.add(pink_iridescent_band);

  const yellow_iridescent_band = new THREE.Mesh(iridescent_bandGeom, yellow_glintMat);
  yellow_iridescent_band.rotation.x = -1.18;
  yellow_iridescent_band.position.set(-0.92, 0.073, 0.055);
  pen_assembly.add(yellow_iridescent_band);

  const violet_iridescent_band = new THREE.Mesh(iridescent_bandGeom, violet_glintMat);
  violet_iridescent_band.rotation.x = -1.18;
  violet_iridescent_band.position.set(-0.48, 0.082, 0.057);
  pen_assembly.add(violet_iridescent_band);

  const lower_prism_lineGeom = new THREE.PlaneGeometry(1.12, 0.012);
  const lower_prism_line = new THREE.Mesh(lower_prism_lineGeom, pink_glintMat);
  lower_prism_line.rotation.x = -1.72;
  lower_prism_line.position.set(0.62, -0.09, 0.055);
  pen_assembly.add(lower_prism_line);

  pen_assembly.rotation.z = 0.34;
  pen_assembly.rotation.y = -0.08;

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
    const scale = 0.95 / maxDim;
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
