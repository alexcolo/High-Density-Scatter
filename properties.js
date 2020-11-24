define( [ "qlik"], function (qlik) {
    'use strict';
    var app = qlik.currApp(this);
    function getTheme() {
        return new Promise(resolve => {

            var app = qlik.currApp(this);
            app.theme.getApplied().then( function( qtheme ) {

                return resolve( qtheme );
                

            });
        })
       
    }

    return {
       
        type: "items",
        component: "accordion",
        items: {
            dimensions: {
                uses: "dimensions",
                min: 1,
                max: 1/*,
                items: {
                    colorExpression:{
                    
                        type: "string",
                        
                        label: "Color by dimension",
                        
                        ref:"qAttributeExpressions.0.qExpression",
                        
                        expression:"optional"
                    
                    }
                    
                }*/
            },
            measures: {
                uses: "measures",
            
                min: 2,
                max: 4
                /*items: {
                    colorExpression:{
                    
                        type: "string",
                        
                        label: "Color by expression",
                        
                        ref:"qAttributeExpressions.1.qExpression",
                        
                        expression:"optional"
                    
                    }
                    
                }*/

                /*items: {

                    /*singleColor: {
                        label:"Single Color",
                        component: "color-picker",
                        ref:"qAttributeExpressions.0.qExpression",
                        type: "integer",
                        defaultValue: 3
                    },

                    colorExpression:{
                        //show: function(layout)  { if( layout.coloring.type=='exp' ){ return true } else { return false } },

                        type: "string",
                        label: "Enter color expression",

                
                    
                
                        ref:"qAttributeExpressions.0.qExpression",
                
                        expression: "optional",
                        defaultValue: ''

                        
                        }
                
                }*/
                
            
            
            
            },
            sorting: {
                uses: "sorting"
            },
            addons: {
                uses: "addons",
                items: {
                    dataHandling: {
                        uses: "dataHandling"
                    },
                    referenceLines: {
                        type: 'array',
                        ref: 'refLineList',
                        label: 'Reference Lines',
                        itemTitleRef: 'lineLabel',
                        allowAdd: true,
                        allowRemove: true,
                        addTranslation: 'Add Objects',
                        
                        items: {
                            lineLable:{
                                type:"string",
                                label: "Line label",
                                ref: "lineLabel",
                                defaultValue: "",
                                expression: "optional"
                                
                            },
                            xLine:{
                                type:"string",
                                label: "X coordinates",
                                ref: "xLineCoord",
                                defaultValue: "",
                                expression: "optional"
                                
                            },
                            yLine:{
                                type:"string",
                                label: "Y coordinates",
                                ref: "yLineCoord",
                                defaultValue: "",
                                expression: "optional"
                                
                            }

                        }

                    },
                    maxRecord:{
                        type:"integer",
                        label: "Max Records",
                        ref: "maxRecord",
                        defaultValue: "5000",
                        expression: "optional"
                        
                    }
                    
                }
            },
            settings: {
                uses: "settings",
                items: {
                    Color: {
                        type: "items",
                        ref: "color",
                        label: "Color",
                            items: {
                                ColorType: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Color",
                                    ref: "coloring.type",
                                    options: [{
                                        value: "single",
                                        label: "Single Color"
                                    }/*, {
                                        value: "dim",
                                        label: "By Dimension"
                                    }*/, {
                                        value: "exp",
                                        label: "By 3rd Measure"
                                    }],
                                    defaultValue: "single"
                                },
                            
                                SingleColor: {
                                    label:"Color",

                                    show: function(layout)  { if( layout.coloring.type=='single' ){ return true } else { return false } },
                                
                                    component: "color-picker",
                                    ref: "prop.singleColor",
                                    type: "integer",
                                    defaultValue: {
                                        color: "#ff5866",
                                        index: "-1"
                                      }
                                },
                               lineColor: {
                                    label:"Line Color",

                                    //show: function(layout)  { if( layout.coloring.type=='single' ){ return true } else { return false } },
                                
                                    component: "color-picker",
                                    ref: "prop.lineColor",
                                    type: "integer",
                                    defaultValue: {
                                        color: "#7b7a78",
                                        index: "-1"
                                      }
                                },

                                exprColor: {
                                    type: "boolean",
                                    show: function(layout)  { if( layout.coloring.type=='exp' ){ return true } else { return false } },
                                
									ref: "prop.colorCode",
									label: "The expression is a color code",
									defaultValue: true
                                },
                                ColorPalette:{
                                    type:"string",
                                    show: function(layout)  { if( layout.coloring.type=='exp' && layout.prop.colorCode == false ){ return true } else { return false } },
                                    label: "Color Pallette (e.g. #ff0000,#00ff00)",
                                    ref: "prop.colorPalette",
                                    defaultValue: "",
                                    expression: "optional"
                                    
                                },
                                
                            }
                    },

                       
                   
                    Marker: {
                        type: "items",
                        ref: "generalSettings",
                        label: "Marker",
                        items: {
                            MarkerType: {
                                type: "string",
                                component: "dropdown",
                                label: "Color",
                                ref: "prop.markerType",
                                options: [{
                                    value: "circle",
                                    label: "Circle"
                                }, {
                                    value: "square",
                                    label: "Square"
                                }, {
                                    value: "diamond",
                                    label: "Diamond"
                                }, {
                                    value: "triangle-up",
                                    label: "Triangle-up"
                                }, {
                                    value: "pentagon",
                                    label: "Pentagon"
                                }, {
                                    value: "hexagon",
                                    label: "Hexagon"
                                }, {
                                    value: "x-thin",
                                    label: "X-thin"
                                }],
                                defaultValue: "circle"
                            },
                            MarkerSize: {
                                type: "number",
                                component: "slider",
                                label: "Marker Size",
                                ref: "prop.markerSize",
                                min: 4,
                                max: 20,
                                step: 1,
                                defaultValue: 10
                            },
                            MarkerOpacity : {
                                type: "number",
                                component: "slider",
                                label: "Marker 0pacity ",
                                ref: "prop.markerOpacity",
                                min: 0,
                                max: 1,
                                step: 0.1,
                                defaultValue: 1
                            }

                        }
                    },
                    XAxisSettings: {
                        type: "items",
                        ref: "xAxisSettings",
                        label: "X Axis",
                        items: {
                            xTitle:{
                                type:"string",
                                ref: "xAxisSettings.xTitle",
                                defaultValue:"",
                                expression: "always"
                                
                            },
                            showGrid: {
                                type: "boolean",
                                ref: "xAxisSettings.showGrid",
                                label: "Show Grid",									
                                defaultValue: true
                            },
                            showLine: {
                                type: "boolean",
                                ref: "xAxisSettings.showLine",
                                label: "Show Line",
                                defaultValue: true
                            },
                            
                            showZeroLine: {
                                type: "boolean",
                                label: "Show Zero Line",
                                ref: "xAxisSettings.showZeroLine",
                                defaultValue:true
                            },
                            showTicklabels: {
                                type: "boolean",
                                label: "Show Tick Labels",
                                ref: "xAxisSettings.showTicklabels",
                                defaultValue: true
                            }
                        }
                    },
                    YAxisSettings: {
                        type: "items",
                        ref: "yAxisSettings",
                        label: "Y Axis",
                        items: {
                            yTitle:{
                                type:"string",
                                ref: "yAxisSettings.yTitle",
                                defaultValue:"",
                                expression: "always"
                                
                            },
                            showGrid: {
                                type: "boolean",
                                ref: "yAxisSettings.showGrid",
                                label: "Show Grid",									
                                defaultValue: true
                            },
                            showLine: {
                                type: "boolean",
                                ref: "yAxisSettings.showLine",
                                label: "Show Line",
                                defaultValue: true
                            },
                            
                            showZeroLine: {
                                type: "boolean",
                                label: "Show Zero Line",
                                ref: "yAxisSettings.showZeroLine",
                                defaultValue:true
                            },
                            showTicklabels: {
                                type: "boolean",
                                label: "Show Tick Labels",
                                ref: "yAxisSettings.showTicklabels",
                                defaultValue: true
                            }
                        }
                    },
                    GeneralSettings: {
                        type: "items",
                        ref: "generalSettings",
                        label: "General Settings",
                        items: {
                            DisplayModeBar:{
                            type: "string",
                            component: "dropdown",
                            label: "Display Mode Bar",
                            ref: "generalSettings.displayModeBar",
                            options: [{value:'1',label:'Always'},{value:'0',label:'on Hover'},{value:'-1',label:'Never'}],
                            defaultValue:'0'
                            },
                            showLegend: {
                                type: "boolean",
                                ref: "generalSettings.showLegend",
                                label: "Show Legend",									
                                defaultValue: true
                            }
                            
                        }
                    },
                }
            }
        }
    }
});