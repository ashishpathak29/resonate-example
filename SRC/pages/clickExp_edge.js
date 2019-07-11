/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};


var resources = [
];
var symbols = {
"stage": {
   version: "1.5.0",
   minimumCompatibleVersion: "1.5.0",
   build: "1.5.0.217",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
         dom: [
],
         symbolInstances: [

         ]
      },
   states: {
      "Base State": {
         "${_Stage}": [
            ["color", "background-color", 'rgba(255,255,255,0)'],
            ["style", "width", '350px'],
            ["style", "height", '400px'],
            ["style", "overflow", 'hidden']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 0,
         autoPlay: true,
         timeline: [
         ]
      }
   }
},
"rectButton": {
   version: "1.5.0",
   minimumCompatibleVersion: "1.5.0",
   build: "1.5.0.217",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
   dom: [
   {
      id: 'grp',
      type: 'group',
      rect: ['0','-2','185','28','auto','auto'],
      c: [
      {
         rect: ['0px','2px','185px','24px','auto','auto'],
         borderRadius: ['0px 0px','10px','10px','0px 0px'],
         id: 'RoundRect',
         stroke: [0,'rgba(0,0,0,1)','none'],
         type: 'rect',
         fill: ['rgba(191,191,191,1.00)']
      },
      {
         rect: ['0px','0px','185px','auto','auto','auto'],
         font: ['Arial, Helvetica, sans-serif',24,'rgba(0,0,0,1)','normal','none',''],
         id: 'caption',
         text: 'Caption',
         align: 'center',
         type: 'text'
      }]
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_caption}": [
            ["style", "top", '3px'],
            ["style", "text-align", 'center'],
            ["color", "color", 'rgba(46, 29, 13,1.00)'],
            ["style", "font-size", '18px'],
            ["style", "left", '0px'],
            ["style", "width", '185px']
         ],
         "${_RoundRect}": [
            ["style", "top", '2px'],
            ["style", "border-top-left-radius", [0,0], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["color", "background-color", 'rgba(250,187,107,1.00)'],
            ["gradient", "background-image", [270,[['rgba(255,255,255,0.00)',0],['rgba(255,255,255,0.00)',100]]]],
            ["style", "left", '0px'],
            ["style", "border-bottom-left-radius", [0,0], {valueTemplate:'@@0@@px @@1@@px'} ]
         ],
         "${symbolSelector}": [
            ["style", "height", '24px'],
            ["style", "width", '185px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 579,
         autoPlay: false,
         labels: {
            "up": 0,
            "over": 135,
            "selected": 325,
            "checked": 579
         },
         timeline: [
            { id: "eid19", tween: [ "style", "${_caption}", "top", '3px', { fromValue: '3px'}], position: 0, duration: 0 },
            { id: "eid17", tween: [ "style", "${_caption}", "font-size", '18px', { fromValue: '18px'}], position: 0, duration: 0 },
            { id: "eid15", tween: [ "color", "${_caption}", "color", 'rgba(251,248,248,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(0,0,0,1.00)'}], position: 0, duration: 270 },
            { id: "eid2", tween: [ "color", "${_caption}", "color", 'rgba(255,255,255,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(251,248,248,1)'}], position: 270, duration: 55 },
            { id: "eid3", tween: [ "color", "${_caption}", "color", 'rgba(99,55,16,0.51)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,255,255,1.00)'}], position: 325, duration: 254 },
            { id: "eid7", tween: [ "gradient", "${_RoundRect}", "background-image", [270,[['rgba(33,101,216,0.76)',0],['rgba(82,136,224,0.81)',62],['rgba(23,56,105,1.00)',99]]], { fromValue: [270,[['rgba(255,255,255,0.00)',0],['rgba(255,255,255,0.00)',100]]]}], position: 135, duration: 135 },
            { id: "eid4", tween: [ "gradient", "${_RoundRect}", "background-image", [270,[['rgba(220,124,40,0.76)',0],['rgba(148,82,24,0.79)',63],['rgba(99,55,16,1.00)',99]]], { fromValue: [270,[['rgba(33,101,216,0.76)',0],['rgba(82,135,223,0.81)',62],['rgba(22,56,105,1.00)',99]]]}], position: 270, duration: 55 },
            { id: "eid5", tween: [ "gradient", "${_RoundRect}", "background-image", [270,[['rgba(255,255,255,0.00)',0],['rgba(255,255,255,0.00)',100]]], { fromValue: [270,[['rgba(220,124,40,0.76)',0],['rgba(148,82,24,0.79)',63],['rgba(99,55,16,1.00)',99]]]}], position: 325, duration: 254 },
            { id: "eid26", tween: [ "color", "${_RoundRect}", "background-color", 'rgba(249, 225, 194,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(229,229,229,1.00)'}], position: 579, duration: 0 }         ]
      }
   }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-4928403");
