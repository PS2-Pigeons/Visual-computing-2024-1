extends Node3D

var isPlayerHere = false
var cartridgeOn : bool = false
const selfName = "Consola"

func _ready() -> void:
	$Area3D.area_entered.connect(_on_area_3d_entered)
	$Area3D.area_exited.connect(_on_area_3d_exited)

func _input(event) -> void:
	if isPlayerHere and Input.is_action_just_pressed("interact"):
		if Global3d.playerRef.actualInteractionObject != null \
		and Global3d.playerRef.actualInteractionObject.selfName == "CartuchoGF":
			$cartuchoGF2.visible = true
			Global3d.playerRef.actualInteractionObject = null
			cartridgeOn = true
			SignalBus.change_visible_interactive_label.emit(false)
			await get_tree().create_timer(0.3).timeout
			Global3d.change_game_mode(Global3d.TV)
		if cartridgeOn:
			SignalBus.change_visible_interactive_label.emit(false)
			await get_tree().create_timer(0.1).timeout
			Global3d.change_game_mode(Global3d.TV)

func _on_area_3d_entered(body: Area3D) -> void:
	if body.is_in_group("PlayerInteractiveFrustrum"):
		isPlayerHere = true
		if Global3d.playerRef.actualInteractionObject != null \
		and Global3d.playerRef.actualInteractionObject.selfName == "CartuchoGF":
			SignalBus.change_text_interactive_label.emit("Press E to put the videogame")
		elif Global3d.playerRef.actualInteractionObject == null and !cartridgeOn:
			SignalBus.change_text_interactive_label.emit("You need a videogame")
		elif cartridgeOn:
			SignalBus.change_text_interactive_label.emit("Press E to play the videogame")
		SignalBus.change_visible_interactive_label.emit(true)
		
func _on_area_3d_exited(body: Area3D) -> void:
	if body.is_in_group("PlayerInteractiveFrustrum"):
		isPlayerHere = false
		SignalBus.change_visible_interactive_label.emit(false)
		
