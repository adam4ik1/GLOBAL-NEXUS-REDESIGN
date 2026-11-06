import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const wrap = document.getElementById('scene-wrap');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd8d5ca);
scene.fog = new THREE.Fog(0xd8d5ca, 34, 75);
const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 120);
camera.position.set(19, 18, 23);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
wrap.prepend(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.dampingFactor = .055;
controls.minDistance = 12; controls.maxDistance = 48; controls.maxPolarAngle = Math.PI / 2.08;
controls.target.set(0, 1, 0);
scene.add(new THREE.HemisphereLight(0xfaf5e8, 0x777d72, 2.0));
const sun = new THREE.DirectionalLight(0xfff0d7, 2.4); sun.position.set(-12, 25, 14); sun.castShadow = true; scene.add(sun);
const fill = new THREE.DirectionalLight(0x9aaea4, .8); fill.position.set(15, 10, -12); scene.add(fill);
const campus = new THREE.Group(); scene.add(campus);
const pickables = [], landmarkGroups = [];
const materials = {
  ground: new THREE.MeshStandardMaterial({color:0xc6c5b7, roughness:.95}),
  grass: new THREE.MeshStandardMaterial({color:0x879786, roughness:1}),
  stone: new THREE.MeshStandardMaterial({color:0xd9d1bf, roughness:.8}),
  roof: new THREE.MeshStandardMaterial({color:0x8d5141, roughness:.65}),
  glass: new THREE.MeshStandardMaterial({color:0x8ba6a3, roughness:.24, metalness:.45}),
  dark: new THREE.MeshStandardMaterial({color:0x3f5551, roughness:.55}),
  brass: new THREE.MeshStandardMaterial({color:0xb58b52, metalness:.55, roughness:.35}),
  road: new THREE.MeshStandardMaterial({color:0x777d75, roughness:.95}),
  white: new THREE.MeshStandardMaterial({color:0xf0e9da, roughness:.7})
};
const red = new THREE.MeshStandardMaterial({color:0xb64c37, roughness:.55});
const blue = new THREE.MeshStandardMaterial({color:0x587b85, roughness:.5});
function addBox(parent,w,h,d,material,x,y,z){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function addCylinder(parent,r1,r2,h,material,x,y,z,segments=12){const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,segments),material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function makeTree(x,z,s=1){addCylinder(campus,.09,.13,.8,materials.roof,x,.4,z,7);const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(.48*s,1),materials.grass);crown.position.set(x,1.05*s,z);crown.castShadow=true;campus.add(crown);}
// A landscaped diplomatic campus rather than a neon city skyline.
const base=new THREE.Mesh(new THREE.CylinderGeometry(15.7,15.2,.85,64),materials.ground);base.position.y=-.48;base.receiveShadow=true;campus.add(base);
const lawn=new THREE.Mesh(new THREE.CylinderGeometry(14.7,14.7,.08,64),materials.grass);lawn.position.y=-.015;campus.add(lawn);
const pathMat=new THREE.MeshStandardMaterial({color:0xe5ddcb,roughness:1});
const plaza=new THREE.Mesh(new THREE.CylinderGeometry(4.4,4.4,.12,48),pathMat);plaza.position.y=.06;campus.add(plaza);
const centralRing=new THREE.Mesh(new THREE.TorusGeometry(4.45,.035,8,100),materials.brass);centralRing.rotation.x=Math.PI/2;centralRing.position.y=.13;campus.add(centralRing);
// Cross-shaped avenues and circular promenade.
for(let a=0;a<4;a++){const road=addBox(campus,1.25,.035,29,materials.road,0,.055,0);road.rotation.y=a*Math.PI/4;}
const promenade=new THREE.Mesh(new THREE.TorusGeometry(10.9,.42,8,120),pathMat);promenade.rotation.x=Math.PI/2;promenade.position.y=.07;campus.add(promenade);
const promenadeLine=new THREE.Mesh(new THREE.TorusGeometry(11.35,.035,6,120),materials.brass);promenadeLine.rotation.x=Math.PI/2;promenadeLine.position.y=.1;campus.add(promenadeLine);
// Central reflecting pool and sculpture.
const pool=new THREE.Mesh(new THREE.CylinderGeometry(1.6,1.6,.08,40),new THREE.MeshStandardMaterial({color:0x78999a,metalness:.3,roughness:.18}));pool.position.set(0,.17,0);campus.add(pool);
addCylinder(campus,.13,.13,1.2,materials.brass,0,.78,0,12);
const globe=new THREE.Mesh(new THREE.SphereGeometry(.48,24,16),materials.brass);globe.position.set(0,1.55,0);campus.add(globe);
const landMarks=[
{id:0,name:'Multilateral Forum',category:'GLOBAL GOVERNANCE',group:'governance',position:[0,0,-2.0],description:'A shared negotiating space where states debate common challenges, build coalitions and shape multilateral agreements.',mandate:'Facilitate dialogue and collective decision-making.',impact:'Creates rules, norms and coordinated international responses.',tags:['MULTILATERALISM','UN SYSTEM','NEGOTIATION'],shape:'forum'},
{id:1,name:'Embassy Quarter',category:'BILATERAL RELATIONS',group:'governance',position:[-8.1,0,-6.0],description:'A district of diplomatic missions representing national interests, assisting citizens abroad and maintaining formal channels between governments.',mandate:'Representation, communication and consular services.',impact:'Keeps bilateral relations functioning during cooperation and disagreement.',tags:['EMBASSIES','CONSULAR','PROTOCOL'],shape:'embassy'},
{id:2,name:'Peace & Security Council',category:'CONFLICT PREVENTION',group:'security',position:[8.0,0,-6.2],description:'A strategic centre for conflict prevention, mediation, peacebuilding and cooperation on regional and international security.',mandate:'Prevent escalation and support peaceful settlement.',impact:'Reduces risks to international peace and human security.',tags:['MEDIATION','PEACEBUILDING','SECURITY'],shape:'council'},
{id:3,name:'World Trade House',category:'ECONOMIC DIPLOMACY',group:'economy',position:[-9.0,0,5.4],description:'A forum for trade negotiations, investment dialogue and economic partnerships connecting markets and supply chains.',mandate:'Negotiate trade rules and enable economic cooperation.',impact:'Supports predictable commerce and shared prosperity.',tags:['TRADE','INVESTMENT','MARKETS'],shape:'trade'},
{id:4,name:'Climate Assembly',category:'GLOBAL COMMONS',group:'society',position:[8.7,0,5.4],description:'A meeting place for climate negotiations, environmental agreements and cross-border action on sustainable development.',mandate:'Coordinate climate commitments and implementation.',impact:'Addresses challenges that no country can solve alone.',tags:['CLIMATE','COP','SDGs'],shape:'climate'},
{id:5,name:'International Court',category:'RULE OF LAW',group:'governance',position:[0,0,10.0],description:'A judicial institution representing the peaceful settlement of disputes and the role of international law in relations between states.',mandate:'Interpret and apply international legal principles.',impact:'Strengthens peaceful dispute settlement and legal accountability.',tags:['INTERNATIONAL LAW','JUSTICE','ICJ'],shape:'court'},
{id:6,name:'Culture Exchange',category:'PUBLIC DIPLOMACY',group:'society',position:[-1.2,0,-10.5],description:'A cultural and academic hub connecting societies through education, arts, language programmes and people-to-people exchange.',mandate:'Build mutual understanding through cultural engagement.',impact:'Creates trust beyond formal government channels.',tags:['CULTURE','EDUCATION','EXCHANGE'],shape:'culture'},
{id:7,name:'Global Press Centre',category:'STRATEGIC COMMUNICATION',group:'society',position:[-13.0,0,-.1],description:'A media hub for press briefings, international communication and public diplomacy, where information shapes perceptions of global events.',mandate:'Communicate policy and provide reliable briefings.',impact:'Supports informed public debate and transparency.',tags:['MEDIA','PUBLIC DIPLOMACY','BRIEFINGS'],shape:'press'},
{id:8,name:'Development Bank',category:'INTERNATIONAL FINANCE',group:'economy',position:[13.0,0,.2],description:'A development finance institution supporting infrastructure, resilience and cross-border partnerships through loans and technical assistance.',mandate:'Mobilise capital for sustainable development.',impact:'Turns international cooperation into long-term projects.',tags:['DEVELOPMENT','FINANCE','PARTNERSHIPS'],shape:'bank'}
];
function building(data){const g=new THREE.Group();g.position.set(...data.position);campus.add(g);const plinth=addBox(g,3.5,.28,3.1,materials.stone,0,.16,0);let top=3.2;
 if(data.shape==='forum'){addCylinder(g,1.55,1.9,2.2,materials.white,0,1.35,0,16);const roof=new THREE.Mesh(new THREE.CylinderGeometry(2.05,1.75,.28,16),materials.roof);roof.position.y=2.6;g.add(roof);addCylinder(g,.2,.2,.9,materials.brass,0,3.17,0,12);for(let i=0;i<10;i++){const a=i*Math.PI/5;addCylinder(g,.065,.065,1.95,materials.brass,Math.cos(a)*1.65,1.35,Math.sin(a)*1.65,8);}top=3.6;}
 else if(data.shape==='embassy'){for(let i=0;i<3;i++){const x=(i-1)*1.0,h=2.5+(i===1?.8:0);addBox(g,.82,h,.95,i===1?materials.white:materials.stone,x,h/2+.3,0);addBox(g,.9,.12,1.02,materials.roof,x,h+.36,0);addBox(g,.09,.7,.08,materials.brass,x,.75,0);}top=3.8;}
 else if(data.shape==='council'){addBox(g,2.7,1.7,2.3,materials.dark,0,1.15,0);const roof=new THREE.Mesh(new THREE.ConeGeometry(1.9,.8,8),red);roof.position.y=2.45;g.add(roof);addBox(g,2.3,.12,1.9,materials.brass,0,2.05,0);top=3.0;}
 else if(data.shape==='trade'||data.shape==='bank'){for(let i=0;i<3;i++){const h=2.2+i*.55;addBox(g,.72,h,.95,i===1?blue:materials.glass,(i-1)*.9,h/2+.3,0);addBox(g,.78,.1,1.0,materials.roof,(i-1)*.9,h+.35,0);}top=3.5;}
 else if(data.shape==='climate'){addCylinder(g,1.45,1.65,1.8,materials.grass,0,1.2,0,10);for(let i=0;i<5;i++){const leaf=new THREE.Mesh(new THREE.SphereGeometry(.5,10,8),materials.grass);leaf.scale.set(1.5,.32,.6);leaf.position.set(Math.cos(i*1.25)*1.1,2.35,Math.sin(i*1.25)*1.1);g.add(leaf);}top=3.2;}
 else if(data.shape==='court'){addBox(g,2.6,1.2,2.1,materials.white,0,.9,0);for(let i=-2;i<=2;i++)addCylinder(g,.09,.09,1.7,materials.brass,i*.48,2.25,-.6,8);addBox(g,3,.16,2.5,materials.roof,0,3.15,0);top=3.5;}
 else if(data.shape==='culture'){addCylinder(g,1.35,1.5,1.5,materials.white,0,1,0,8);const roof=new THREE.Mesh(new THREE.ConeGeometry(1.8,1.05,8),red);roof.position.y=2.3;g.add(roof);addCylinder(g,.12,.12,.7,materials.brass,0,3.05,0,8);top=3.5;}
 else if(data.shape==='press'){addBox(g,2.0,2.6,1.5,materials.dark,0,1.6,0);addBox(g,2.1,.15,1.6,materials.brass,0,2.95,0);const dish=new THREE.Mesh(new THREE.SphereGeometry(.65,16,8,0,Math.PI*2,0,Math.PI/2),materials.roof);dish.position.y=3.2;g.add(dish);top=3.7;}
 // small architectural marker makes landmarks easier to identify
 const marker=addBox(g,.16,.55,.16,red,0,top+.3,0);marker.userData.landmark=data;
 const hit=addBox(g,4.1,top+1.5,3.9,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),0,(top+1)/2,0);hit.userData.landmark=data;pickables.push(hit);landmarkGroups[data.id]=g;
}
landMarks.forEach(building);
// Trees, benches, lamps and flagpoles make the campus feel inhabited.
for(let i=0;i<34;i++){const a=i/34*Math.PI*2,r=12.4+(i%3)*.35;makeTree(Math.cos(a)*r,Math.sin(a)*r,.75+(i%4)*.08);}
for(let i=0;i<12;i++){const a=i/12*Math.PI*2,x=Math.cos(a)*6.1,z=Math.sin(a)*6.1;addCylinder(campus,.045,.045,1.35,materials.brass,x,.7,z,8);addBox(campus,.42,.24,.035,i%2?red:blue,x+.2,1.2,z);}
for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const x=Math.cos(a)*9.2,z=Math.sin(a)*9.2;addBox(campus,.55,.18,.22,materials.stone,x,.22,z);}
// Curved diplomatic routes, subtle and cartographic rather than neon.
const routeMaterial=new THREE.MeshBasicMaterial({color:0xb64c37,transparent:true,opacity:.42});
for(const [a,b] of [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[1,7],[2,8],[3,4]]){const A=landMarks[a].position,B=landMarks[b].position;const curve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(A[0],.18,A[2]),new THREE.Vector3((A[0]+B[0])/2,1.0,(A[2]+B[2])/2),new THREE.Vector3(B[0],.18,B[2]));campus.add(new THREE.Mesh(new THREE.TubeGeometry(curve,32,.018,5,false),routeMaterial));}
// Small animated diplomatic shuttle moving on the outer path.
const shuttle=new THREE.Group();const body=addBox(shuttle,.45,.18,.75,materials.dark,0,0,0);addBox(shuttle,.32,.14,.3,materials.white,0,.14,-.05);campus.add(shuttle);
const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let clock=0,night=false;
function selectLandmark(data){document.querySelectorAll('.directory-item').forEach(el=>el.classList.toggle('selected',Number(el.dataset.id)===data.id));document.getElementById('briefEmpty').classList.add('hidden');document.getElementById('briefContent').classList.remove('hidden');document.getElementById('briefNumber').textContent=String(data.id+1).padStart(2,'0')+' / 09';document.getElementById('briefCategory').textContent=data.category;document.getElementById('briefTitle').textContent=data.name;document.getElementById('briefDescription').textContent=data.description;document.getElementById('briefMandate').textContent=data.mandate;document.getElementById('briefImpact').textContent=data.impact;document.getElementById('briefTags').innerHTML=data.tags.map(t=>`<span>${t}</span>`).join('');document.getElementById('toast').textContent='OPENED FIELD NOTE · '+data.name.toUpperCase();const toast=document.getElementById('toast');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1600);}
document.querySelectorAll('.directory-item').forEach(el=>el.addEventListener('click',()=>{const data=landMarks[Number(el.dataset.id)];selectLandmark(data);const p=data.position;controls.target.set(p[0],1,p[2]);}));
renderer.domElement.addEventListener('pointerup',e=>{const r=renderer.domElement.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width)*2-1;pointer.y=-((e.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(pickables,false);if(hits.length)selectLandmark(hits[0].object.userData.landmark);});
// Filter the directory by policy field.
document.querySelectorAll('.rail-item').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.rail-item').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;let count=0;document.querySelectorAll('.directory-item').forEach(el=>{const d=landMarks[Number(el.dataset.id)];const show=f==='all'||d.group===f;el.style.display=show?'flex':'none';if(show)count++;});document.getElementById('directoryCount').textContent=String(count).padStart(2,'0')+' ENTRIES';}));
document.getElementById('viewBtn').addEventListener('click',()=>{camera.position.set(19,18,23);controls.target.set(0,1,0);controls.update();});
document.getElementById('themeBtn').addEventListener('click',()=>{night=!night;document.body.classList.toggle('night',night);scene.background.set(night?0x26312f:0xd8d5ca);scene.fog.color.set(night?0x26312f:0xd8d5ca);sun.intensity=night?1.1:2.4;fill.intensity=night?1.25:.8;});
function resize(){const w=wrap.clientWidth,h=wrap.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);}
new ResizeObserver(resize).observe(wrap);window.addEventListener('resize',resize);resize();
function animate(){requestAnimationFrame(animate);clock+=.008;controls.update();shuttle.position.set(Math.cos(clock*.35)*10.9,.25,Math.sin(clock*.35)*10.9);shuttle.rotation.y=-clock*.35+Math.PI/2;renderer.render(scene,camera);}
animate();const loading=document.getElementById('loading');loading.style.opacity='0';setTimeout(()=>loading.remove(),500);
