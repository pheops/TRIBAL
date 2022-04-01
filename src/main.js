


// Find the latest version by visiting https://cdn.skypack.dev/three.

import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/RGBELoader.js';
import { GLTFExporter } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/exporters/GLTFExporter.js';
import { USDZExporter } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/exporters/USDZExporter.js';

let width = window.innerWidth
let height = window.innerWidth


let offset;

let camera, scene, renderer, mesh, mixer, clock;

let grid;
let controls;
var metal = 0;
var rough = 0;
var envMap ;
let tribalMesh;
var textureEquirec;
var skyEquirec;


let pngCubeRenderTarget, exrCubeRenderTarget;
      let pngBackground, exrBackground;

const params = {
  metalness: 0.5,
  roughness:0.5,
  exposure: 1.0, 

}


      init();
      animate();
     



function init() {

        //const container = document.createElement( 'div' );
        const container = document.getElementById( 'c' );

        //document.body.appendChild( container );

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        //renderer.setAnimationLoop( render );
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        container.appendChild( renderer.domElement );


        window.addEventListener( 'resize', onWindowResize );

        const aspect = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
        //camera.position.set(-8,.5,0);
        camera.position.z = 7;
        camera.position.y = 3;

        controls = new OrbitControls( camera, renderer.domElement);
        controls.target.set( 0, 3, 0 );
        // controls.maxPolarAngle = Math.PI / 2;
        // controls.minPolarAngle = Math.PI / 2;

        controls.update();

        const pmremGenerator = new THREE.PMREMGenerator( renderer );

        scene = new THREE.Scene();
        //scene.background = new THREE.Color( 0x383434);
        //scene.environment = pmremGenerator.fromScene( new RoomEnvironment() ).texture;
        //scene.fog = new THREE.Fog( 0xeeeeee, 10, 50 );

        // grid = new THREE.GridHelper( 100, 40, 0xffffff, 0xffffff );
        // grid = new THREE.PolarGridHelper( 5, 5, 5, 64 )
        // // grid.position.y = -.5;
        // // grid.position.x = .3;
        // //      grid.position.x = -.7;
        //      grid.material.opacity = 0.9;
        //      grid.material.depthWrite = false;
        //      grid.material.transparent = true;
        //      scene.add( grid );


////LOADING SCREEN

  clock = new THREE.Clock();
  
  const loadingManager = new THREE.LoadingManager( () => {
  
    const loadingScreen = document.getElementById( 'loading-screen' );
    loadingScreen.classList.add( 'fade-out' );
    
    // optional: remove loader from DOM via event listener
    loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
    
  } );


////ENVIRONMENT

const environLoader = new THREE.TextureLoader(loadingManager );

        textureEquirec = environLoader.load( './assets/drackenstein_quarry.jpg' );
        textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
        textureEquirec.encoding = THREE.sRGBEncoding;

        scene.environment = textureEquirec;
        //scene.background = textureEquirec;

// const skyLoader = new THREE.TextureLoader(loadingManager );

//         skyEquirec = skyLoader.load( './assets/sky4.jpg' );
//         skyEquirec.mapping = THREE.EquirectangularReflectionMapping;
//         skyEquirec.encoding = THREE.sRGBEncoding;

       //scene.background = skyEquirec;
        //scene.background = new THREE.Color( 0x000000 );


////MATERIALS

const loader = new THREE.TextureLoader(loadingManager);
    
    const texture1 = loader.load( './assets/concrete_COLOR.png' );
     texture1.flipY=false
    const rough1 = loader.load( './assets/concrete_ROUGH.png' );
     rough1.flipY=false 
    const normal1 = loader.load( './assets/concrete_NORMAL.png' );
     normal1.flipY=false 

    const texture2 = loader.load( './assets/asteroid_COLOR.png' );
     texture2.flipY=false
    const rough2 = loader.load( './assets/asteroid_ROUGH.png' );
     rough2.flipY=false 
    const normal2 = loader.load( './assets/asteroid_NORMAL.png' );
     normal2.flipY=false  

    const texture3 = loader.load( './assets/scratch_COLOR.png' );
     texture3.flipY=false
    const rough3 = loader.load( './assets/scratch_ROUGH.png' );
     rough3.flipY=false 
    const normal3 = loader.load( './assets/scratch_NORMAL.png' );
     normal3.flipY=false 

    const texture4 = loader.load( './assets/clay_COLOR.png' );
     texture4.flipY=false
    const rough4 = loader.load( './assets/clay_ROUGH.png' );
     rough4.flipY=false 
    const normal4 = loader.load( './assets/clay_NORMAL.png' );
     normal4.flipY=false 

    const texture5 = loader.load( './assets/tiedye_COLOR.png' );
     texture5.flipY=false
    const rough5 = loader.load( './assets/tiedye_ROUGH.png' );
     rough5.flipY=false 
    const normal5 = loader.load( './assets/tiedye_NORMAL.png' );
     normal5.flipY=false  

    const texture6 = loader.load( './assets/crack_COLOR.png' );
     texture6.flipY=false
    const rough6 = loader.load( './assets/crack_ROUGH.png' );
     rough6.flipY=false 
    const normal6 = loader.load( './assets/crack_NORMAL.png' );
     normal6.flipY=false  

    const texture7 = loader.load( './assets/river_COLOR.png' );
     texture7.flipY=false
    const rough7 = loader.load( './assets/river_ROUGH.png' );
     rough7.flipY=false 
    const normal7 = loader.load( './assets/river_NORMAL.png' );
     normal7.flipY=false   


    const material = new THREE.MeshStandardMaterial( 
      { map: texture1, 
        roughnessMap: rough1,
        normalMap: normal1,


       } );


////TEXTURE HEX BUTTONS

var hexbuttons = document.getElementsByClassName("hexbuttons"); 

//console.log(hexbuttons) 

for (let i = 0; i < hexbuttons.length; i++) {
  hexbuttons[i].addEventListener("click", onButtonClick, false);
};

var buttons = document.getElementsByTagName("button");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onButtonClick, false);
};


function onButtonClick(event) {
 

  if (event.target.id == "download"){
     alert("Download GTLF");
     download();
     }

  if (event.target.id == "ar"){
       alert("Download USDZ");
     downloadAR();
     
     }

  if (event.target.id == "mint"){
     alert("devs do something");
    
     }   

  if (event.target.id == "wallet"){
    alert("devs do something");
     } 

  if (event.target.id == "arView"){
    arView();
     }     

  if (event.target.id == "1"){

     material.map = texture1;
     material.roughnessMap = rough1;
     material.normalMap = normal1;
      //texture1.dispose();


     }
     
  if (event.target.id == "2"){

     material.map = texture2;
     material.roughnessMap = rough2;
     material.normalMap = normal2;
  
     } 

  if (event.target.id == "3"){

     material.map = texture3;
     material.roughnessMap = rough3;
     material.normalMap = normal3;
  
     } 

  if (event.target.id == "4"){

     material.map = texture4;
     material.roughnessMap = rough4;
     material.normalMap = normal4;
  
     }  

  if (event.target.id == "5"){

     material.map = texture5;
     material.roughnessMap = rough5;
     material.normalMap = normal5;
  
     } 

  if (event.target.id == "6"){

     material.map = texture6;
     material.roughnessMap = rough6;
     material.normalMap = normal6;
  
     } 

  if (event.target.id == "7"){

     material.map = texture7;
     material.roughnessMap = rough7;
     material.normalMap = normal7;
  
     }              


}


////COOR PICKER AND METAL/ROUGH SLIDERS

      var colorPicker = new iro.ColorPicker("#picker", {
      // Set the size of the color picker
      width: 90,
      // Set the initial color to WHITE
      color: "#ffffff"
      });

      var hex = colorPicker.color.hexString;
      //console.log(hex); // hex = "#ff0000"

      // listen to a color picker's color:change event
      // color:change callbacks receive the current color
      colorPicker.on('color:change', function(color) {
      // log the current color as a HEX string
      //console.log(color.hexString);
  
       material.color.set( color.hexString );
      });


      var metalSlider = document.getElementById("metalRange");
      var output = document.getElementById("demo");
      //output.innerHTML = metalSlider.value;

      metalSlider.oninput = function() {
        //output.innerHTML = this.value;
        //console.log(slider.value)
         var metal = metalSlider.value/100;
         params.metalness = metal;
         material.metalness =  params.metalness ;
           
      }

      var roughSlider = document.getElementById("roughRange");
      var output2 = document.getElementById("demo2");
      //output2.innerHTML = roughSlider.value;

      roughSlider.oninput = function() {
        //output2.innerHTML = this.value;
        //console.log(slider.value)
         var rough = roughSlider.value/100;
         params.roughness = rough;
         material.roughness =  params.roughness ;
           
      }

      // var envSlider = document.getElementById("envRange");
      // var output3 = document.getElementById("demo3");
      // output3.innerHTML = envSlider.value;

      // envSlider.oninput = function() {
      //   output3.innerHTML = this.value;
      //   //console.log(slider.value)
      //    var envInt = envSlider.value/50;
      //    params.exposure = envInt;
      //    //console.log(params.exposure)
      //    //ivoryMaterial.roughness =  params.roughness ;
          
      // }



  //// TURTLE MODEL LOADER

        const dracoLoader = new DRACOLoader(loadingManager );
        dracoLoader.setDecoderPath( 'js/libs/draco/gltf/' );


        const modelLoader = new GLTFLoader(loadingManager );
        modelLoader.setDRACOLoader( dracoLoader );
        modelLoader.load( './assets/Tribal_min.glb', function ( gtlf ) {

           //const fullmodel = gtlf.scene//.children[0].children[0].geometry//.children[0].geometry;
           const model = gtlf.scene.children[0].geometry//.children[0].geometry;
           //const normMat = new  THREE.MeshNormalMaterial
           //console.log(model)
           model.scale(.5,.5,.5)
           let tribalMesh = new THREE.Mesh( model, material );
            // tribalMesh.position.z = 0  //20
            //   tribalMesh.position.y = 0
            //     tribalMesh.position.x = 0  //-30
          tribalMesh.rotation.y = Math.PI /1;
          // const scal = new THREE.Vector3( 0.5, 0.5, 0.5 );
      
           scene.add( tribalMesh );
           scene.updateWorldMatrix (true )

        } );








////LIGHTS

        // const ambientLight = new THREE.AmbientLight( 0x404040, .1);
        // scene.add( ambientLight );

        // const pointLight = new THREE.PointLight( 0xffffff, 1);
        // pointLight.position.z = 5;
        // pointLight.decay = 2;
        // scene.add( pointLight );

        // const pointLight2 = new THREE.PointLight( 0xffffff, .1 );
        //  pointLight2.position.z = -5;
        // scene.add( pointLight2 );
        //   pointLight2.decay = 2;
       

        


      }

////////////////////////////////////////////////////////////////////////

function onTransitionEnd( event ) {

  event.target.remove();
  
}



function download() {
  const exporter = new GLTFExporter();
  exporter.parse(
    scene,
    function (result) {
      console.log(result)
      saveArrayBuffer(result, 'scene.glb');
    },
    { binary: true }
  );
}

async function downloadAR() {
    //console.log(scene.children[0])
    const exporter = new USDZExporter();
    scene.updateWorldMatrix (true)
    const arraybuffer = await exporter.parse( scene.children[0]);
    //console.log(arraybuffer);
    //const blob = new Blob( [ arraybuffer ], { type: 'application/octet-stream' } );
    saveArrayBuffer(arraybuffer, 'Tribal.usdz')
    
  
}


async function arView() {
    //console.log(scene.children[0])
    const exporter = new USDZExporter();
    scene.updateWorldMatrix (true)
    const arraybuffer = await exporter.parse( scene.children[0]);
    //console.log(arraybuffer);
    const blob = new Blob( [ arraybuffer ], { type: 'application/octet-stream' } );
     console.log(blob);
    viewAR(blob, 'Tribal.usdz')
   
   
}

function viewAR(blob, filename) {
  // link.href = URL.createObjectURL(blob);
  // link.rel = "ar";
  // link.download = filename;
  // link.click();

// const blob = new Blob( [ data ], { type: 'application/octet-stream' });
    const a = Object.assign(document.createElement('a'), {
            download:'model.usdz',
            rel:"ar",
            href:URL.createObjectURL(blob )
        });
    const i = makeImage();
    a.appendChild(i);

        a.click();
    }


 function makeImage() {
    const c = document.createElement('canvas');
    
    const i = new Image();
    i.src = c.toDataURL();
    return i;
  }



function saveArrayBuffer(buffer, filename) {
  save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
}


const link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link); // Firefox workaround, see #6594


function save(blob, filename) {
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  // URL.revokeObjectURL( url ); breaks Firefox...
}
  




         


function animate() {

    requestAnimationFrame(animate);
    render();
  
}



function render() {

    renderer.toneMappingExposure = params.exposure;
    renderer.render(scene, camera)

}


function onWindowResize() {

        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = window.innerWidth / window.innerHeight;

        camera.aspect = aspect;

        camera.left = - height * aspect;
        camera.right = height * aspect;
        camera.top = height;
        camera.bottom = - height;

        camera.updateProjectionMatrix();

        renderer.setSize( width, height );

      }







///DIALS
function updateDonut(percent, element){
  //var percent = 45;
  if (percent < 50){
    offset = (360 / 100) * percent;
    element.parentNode.querySelector("#section3").style.webkitTransform = "rotate(" + offset + "deg)";
    element.parentNode.querySelector("#section3 .item").style.webkitTransform = "rotate(" + (180 - offset) + "deg)";
    element.parentNode.querySelector("#section3").style.msTransform = "rotate(" + offset + "deg)";
    element.parentNode.querySelector("#section3 .item").style.msTransform = "rotate(" + (180 - offset) + "deg)";
    element.parentNode.querySelector("#section3").style.MozTransform = "rotate(" + offset + "deg)";
    element.parentNode.querySelector("#section3 .item").style.MozTransform = "rotate(" + (180 - offset) + "deg)";
    element.parentNode.querySelector("#section3 .item").style.backgroundColor = "#41A8AB";
  } else { 
    offset = ((360 / 100) * percent) - 180;
    element.parentNode.querySelector("#section3").style.webkitTransform = "rotate(180deg)";
    element.parentNode.querySelector("#section3 .item").style.webkitTransform = "rotate(" +  offset + "deg)";
    element.parentNode.querySelector("#section3").style.msTransform = "rotate(180deg)";
    element.parentNode.querySelector("#section3 .item").style.msTransform = "rotate(" +  offset + "deg)";
    element.parentNode.querySelector("#section3").style.MozTransform = "rotate(180deg)";
    element.parentNode.querySelector("#section3 .item").style.MozTransform = "rotate(" +  offset + "deg)";   
    element.parentNode.querySelector("#section3 .item").style.backgroundColor = "#E64C65";
  }
  element.parentNode.querySelector("span").innerHTML = percent + "%";
}

function updateSlider(element) {
  if (element) {
    var parent = element.parentElement;
    var thumb = parent.querySelector('.range-slider__thumb'),
        bar = parent.querySelector('.range-slider__bar'),
        pct = element.value * ((parent.clientHeight - thumb.clientHeight) / parent.clientHeight);
    thumb.style.bottom = pct + '%';
    bar.style.height = 'calc(' + pct + '% + ' + thumb.clientHeight / 2 + 'px)';
    thumb.textContent = element.value + '%';
  }
  updateDonut(element.value, element.parentNode);
}
(function initAndSetupTheSliders() {
    [].forEach.call(document.getElementsByClassName("dial-container"), function(el) {
      var inputs = [].slice.call(el.querySelectorAll('.range-slider input'));
      inputs.forEach(function (input) {
          input.setAttribute('value', '50');
          updateSlider(input);
          input.addEventListener('input', function (element) {
              updateSlider(input);
          
          });
          input.addEventListener('change', function (element) {
            
              updateSlider(input);
          });
      });
    });
}());


   