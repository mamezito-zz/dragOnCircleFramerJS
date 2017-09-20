# calling function and enabling draggin object "oval2" with radius 100
dragOnCircle.circleDrag oval2, 100

# getting angle of drag while dragging
oval2.on "change:x", ->
	print dragOnCircle.dragAngle
