extends Node
enum {
	FirstPerson,
	TV
}

var gameMode = FirstPerson


func change_game_mode(mode):
	gameMode = mode
	if gameMode == TV:
		Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
