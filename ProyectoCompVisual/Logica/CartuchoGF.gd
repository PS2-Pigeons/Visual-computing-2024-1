extends Node3D

var isPlayerHere = false
var isPicked = false
const selfName = "CartuchoGF"

func _ready() -> void:
	$Area3D.area_entered.connect(_on_area_3d_entered)
	$Area3D.area_exited.connect(_on_area_3d_exited)

func _input(event) -> void:
	if isPlayerHere and Input.is_action_just_pressed("interact"):
		# Agarra o deja el ccartucho en su estante, si ya está agarrado lo suelta y al revés
		if isPicked and Global3d.playerRef.actualInteractionObject != null \
		and Global3d.playerRef.actualInteractionObject.selfName == "CartuchoGF":
			self.visible = true
			isPicked = false
			Global3d.playerRef.set_interaction_object(null)
			SignalBus.change_text_interactive_label.emit("Press E to grab the videogame")
		elif !isPicked:
			self.visible = false
			isPicked = true
			Global3d.playerRef.set_interaction_object(self)
			SignalBus.change_text_interactive_label.emit("Press E to put the videogame on the shelf")

func _on_area_3d_entered(body: Area3D) -> void:
	if body.is_in_group("PlayerInteractiveFrustrum"):
		isPlayerHere = true
		if isPicked and Global3d.playerRef.actualInteractionObject != null \
		and Global3d.playerRef.actualInteractionObject.selfName == "CartuchoGF":
			SignalBus.change_text_interactive_label.emit("Press E to put the videogame on the shelf")
		elif !isPicked:
			SignalBus.change_text_interactive_label.emit("Press E to grab the videogame")
		else:
			SignalBus.change_text_interactive_label.emit("Nothing more to do here")
		SignalBus.change_visible_interactive_label.emit(true)
		
func _on_area_3d_exited(body: Area3D) -> void:
	if body.is_in_group("PlayerInteractiveFrustrum"):
		isPlayerHere = false
		SignalBus.change_visible_interactive_label.emit(false)
		
