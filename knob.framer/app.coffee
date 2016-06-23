#author Sergiy Voronov
# twitter.com/mamezito

# Import file "thermo" (sizes and positions are scaled 1:3)
sketch = Framer.Importer.load("imported/thermo@3x")
dragOnCircle = require "dragOnCircle"



Knob = new Layer
	width: 110
	height: 110
	y: 626
	backgroundColor: "#fff"
	borderRadius: 110
	shadowBlur: 10
	shadowSpread: 5
	shadowColor: "rgba(0,0,0,0.2)"
	html:"18"
Knob.centerX()
Knob.style=
	"line-height":"110px"	
	"width":"110px"
	"text-align":"center"
	"font-size":"39px"
	"color":"#ADAAAA"
	"font-family":"Roboto"
	
# function call with parameteres layer -Knob and radius - 280px
angle=dragOnCircle.circleDrag Knob, 280


Knob.on "change:x", ->
# dragOnCircle.dragAngle is angle of current rotation
	if dragOnCircle.dragAngle>180
		Knob.html=Math.floor(Utils.modulate(dragOnCircle.dragAngle, [180, 360], [0, 18],true))
	else
		Knob.html=Math.floor(Utils.modulate(dragOnCircle.dragAngle, [0, 180], [18, 36],true))