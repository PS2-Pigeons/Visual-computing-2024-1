extends Node
enum {
	FirstPerson,
	TV
}

var gameMode = FirstPerson
@onready var main3DScnPath = $"/root/Main3D"
@onready var playerRef = main3DScnPath.get_node("Player3D")
func change_game_mode(mode):
	gameMode = mode
	if gameMode == TV:
		Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
		var tween = create_tween()
		tween.parallel().tween_property(playerRef.cam,"rotation_degrees", Vector3(0,0,0),0.8)
		tween.parallel().tween_property(playerRef,"rotation_degrees", Vector3(0,-180,0),0.5)
		tween.parallel().tween_property(playerRef.cam,"position",Vector3(0,-0.03,0),0.55)
		tween.parallel().tween_property(playerRef,"position",Vector3(0.25,1.102,2.68),1.5)
		tween.tween_property(main3DScnPath.get_node("%tv2/Gemfrenzy3D/Display"),"transparency",0,2)
		tween.parallel().tween_property(main3DScnPath.get_node(\
		"%tv2/Gemfrenzy3D/AudioStreamPlayer3D"), "volume_db",-80,2)
		tween.set_ease(Tween.EASE_IN).parallel().tween_property(\
		main3DScnPath.get_node("%tv2/Gemfrenzy3D/SubViewport/GameStart/AudioStreamPlayer"), "volume_db", -3,2.5)
		
	if gameMode == FirstPerson:
		Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
		var tween = create_tween()
		tween.parallel().tween_property(playerRef.cam,"position",Vector3(0,0.379,0),0.55)
		tween.parallel().tween_property(playerRef,"position",Vector3(-0.19,1.102,1.753),1.5)
		tween.tween_property(main3DScnPath.get_node("%tv2/Gemfrenzy3D/Display"),"transparency",1,2)
		tween.parallel().tween_property(main3DScnPath.get_node(\
		"%tv2/Gemfrenzy3D/AudioStreamPlayer3D"), "volume_db",-5,2)
		tween.set_ease(Tween.EASE_IN).parallel().tween_property(\
		main3DScnPath.get_node("%tv2/Gemfrenzy3D/SubViewport/GameStart/AudioStreamPlayer"), "volume_db", -30,2.5)
		
