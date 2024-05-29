extends Node3D

var isPlayerHere = false
var playerRef : Player3D = null
var cartridgeOn : bool = false
const selfName = "Consola"

func _input(event) -> void:
	if isPlayerHere and Input.is_action_just_pressed("interact"):
		if playerRef.actualInteractionObject != null \
		and playerRef.actualInteractionObject.selfName == "CartuchoGF":
			$cartuchoGF2.visible = true
			playerRef.actualInteractionObject = null
			cartridgeOn = true
			SignalBus.change_visible_interactive_label.emit(false)
			$Area3D.monitorable = false
			$Area3D.monitoring = false
			playerRef.canMove = false
			await get_tree().create_timer(0.3).timeout
			var tween = create_tween()
			tween.parallel().tween_property(playerRef.cam,"rotation_degrees", Vector3(0,0,0),0.8)
			tween.parallel().tween_property(playerRef,"rotation_degrees", Vector3(0,-180,0),0.5)
			tween.parallel().tween_property(playerRef.cam,"position",Vector3(0,0.5,0),0.55)
			tween.parallel().tween_property(playerRef,"position",Vector3(0.25,0.54,2.58),1.5)
			tween.tween_property(%tv2/Gemfrenzy3D/Sprite3D,"modulate",Color(255,255,255),2)
			#AudioServer.set_bus_volume_db(0,0)

func _on_area_3d_body_entered(body: Node3D) -> void:
	if body is Player3D:
		isPlayerHere = true
		playerRef = body
		if body.actualInteractionObject != null \
		and body.actualInteractionObject.selfName == "CartuchoGF":
			SignalBus.change_text_interactive_label.emit("Press E to put the videogame")
		else:
			SignalBus.change_text_interactive_label.emit("You need a videogame")
		SignalBus.change_visible_interactive_label.emit(true)
		
func _on_area_3d_body_exited(body: Node3D) -> void:
	if body is Player3D:
		isPlayerHere = false
		SignalBus.change_visible_interactive_label.emit(false)
		
