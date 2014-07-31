// ChangeColor.jsx
//
// This photoshop script finds all shape and solid fill layers that match the color
// of the currently selected shape/fill layer and changes their color to the
// foreground color.
// 
// Tested on Adobe Photoshop CS4 (Mac)
 
// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop
 
// in case we double clicked the file
app.bringToFront();
 
var sColor = getFillColor();
 
for( var i = 0; i < app.activeDocument.layers.length; i++ )
{
	app.activeDocument.activeLayer = app.activeDocument.layers[i];
	if( getFillColor().rgb.hexValue == sColor.rgb.hexValue )
		setColorOfFillLayer( app.foregroundColor );
}
 
function setColorOfFillLayer( sColor ) {
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( stringIDToTypeID('contentLayer'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc.putReference( charIDToTypeID('null'), ref );
        var fillDesc = new ActionDescriptor();
            var colorDesc = new ActionDescriptor();
            colorDesc.putDouble( charIDToTypeID('Rd  '), sColor.rgb.red );
            colorDesc.putDouble( charIDToTypeID('Grn '), sColor.rgb.green );
            colorDesc.putDouble( charIDToTypeID('Bl  '), sColor.rgb.blue );
        fillDesc.putObject( charIDToTypeID('Clr '), charIDToTypeID('RGBC'), colorDesc );
    desc.putObject( charIDToTypeID('T   '), stringIDToTypeID('solidColorLayer'), fillDesc );
    executeAction( charIDToTypeID('setd'), desc, DialogModes.NO );
}
 
function getFillColor(){
var ref = new ActionReference();
   ref.putEnumerated( stringIDToTypeID( "contentLayer" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ));
var ref1= executeActionGet( ref );
var list =  ref1.getList( charIDToTypeID( "Adjs" ) ) ;

var solidColorLayer = list.getObjectValue(0);        

var color = solidColorLayer.getObjectValue(charIDToTypeID('Clr ')); 


var fillcolor = new SolidColor;
   fillcolor.rgb.red = 0; //Math.round(charIDToTypeID('Rd  '));
   fillcolor.rgb.green = 0; //Math.round(charIDToTypeID('Grn'));
   fillcolor.rgb.blue = 0; //Math.round(charIDToTypeID('Bl'));
return fillcolor;
}