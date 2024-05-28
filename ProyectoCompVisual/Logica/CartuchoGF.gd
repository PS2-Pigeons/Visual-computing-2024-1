extends Node3D

var isPlayerHere = false
var isPicked = false
var playerRef : Player3D = null
const selfName = "CartuchoGF"

func _input(event) -> void:
	if isPlayerHere and Input.is_action_just_pressed("interact"):
		# Agarra o deja el ccartucho en su estante, si ya está agarrado lo suelta y al revés
		if isPicked:
			self.visible = true
			isPicked = false
			playerRef.set_interaction_object(null)
			SignalBus.change_text_interactive_label.emit("Press E to grab the videogame")
		else:
			self.visible = false
			isPicked = true
			playerRef.set_interaction_object(self)
			SignalBus.change_text_interactive_label.emit("Press E to put the videogame on the shelf")

func _on_area_3d_body_entered(body: Node3D) -> void:
	if body is Player3D:
		isPlayerHere = true
		playerRef = body
		if isPicked:
			SignalBus.change_text_interactive_label.emit("Press E to put the videogame on the shelf")
		else:
			SignalBus.change_text_interactive_label.emit("Press E to grab the videogame")
		SignalBus.change_visible_interactive_label.emit(true)
		
func _on_area_3d_body_exited(body: Node3D) -> void:
	if body is Player3D:
		isPlayerHere = false
		SignalBus.change_visible_interactive_label.emit(false)
		
