extends Node2D
# Array de musica desbloqueada
var lista_musica_unlocked = []
# Array de musica bloqueada
var currentsong
var isPlayerHere
var lista_musica_to_unlock = [
	preload("res://Gem frenzy 3d/Musica/Music_LuisManzano/GF_musx_jugable1_V1_largo.ogg"),
	preload("res://Gem frenzy 3d/Musica/Music_LuisManzano/GF_musx_jugable2_V1_largo.ogg"),
	preload("res://Gem frenzy 3d/Musica/Music_LuisManzano/GF_musx_jugable3_V1_largo.ogg"),
	preload("res://Gem frenzy 3d/Musica/Music_LuisManzano/GF_musx_jugable4_V1_larga.ogg")
]

# Called when the node enters the scene tree for the first time.
func _ready():
	GlobalSettings.sound_changed.connect(change_animation)
	unlock_next_song()
	var cancionDesbloqueada=lista_musica_to_unlock.pop_front()
	lista_musica_unlocked.append(cancionDesbloqueada)
	change_animation()
	$MusicadeFondo.play(0)
	GlobalTiempo.winner.connect(stop_song)
	GlobalRecursos.bancarota.connect(stop_song)
	GlobalTiempo.finalizarDia.connect(stop_song)
	GlobalTiempo.iniciarDia.connect(verify_unlock)
	GlobalTiempo.quedamediahora.connect(media_hora)


func media_hora():
	$MusicadeFondo.pitch_scale=1.01


func _process(_delta):
	if Input.is_action_just_pressed("ui_up") && isPlayerHere:
		next_song()
	pass
func change_animation():
	if GlobalSettings.sound:
		$AnimationPlayer.play("musica")
	else:
		$AnimationPlayer.play("RESET")
func verify_unlock():
	$MusicadeFondo.pitch_scale=1
	change_animation()
	if GlobalTiempo.diaActual==3:
		#arreglo temporal para que se muestre la funcionalidad
		#de la rockola (falta una cancion)
		var cancion2=lista_musica_unlocked[1]
		$MusicadeFondo.stream=cancion2
		currentsong=cancion2
		#unlock_next_song()
		#lista_musica_unlocked.append(lista_musica_to_unlock.pop_front())
	elif GlobalTiempo.diaActual ==5:
		unlock_next_song()
		#lista_musica_unlocked.append(lista_musica_to_unlock.pop_front())
	elif GlobalTiempo.diaActual==7:
		unlock_next_song()
	$MusicadeFondo.play(0)
func unlock_next_song():
	var cancionDesbloqueada=lista_musica_to_unlock.pop_front()
	lista_musica_unlocked.append(cancionDesbloqueada)
	$MusicadeFondo.stream=cancionDesbloqueada
	currentsong=cancionDesbloqueada
	
func next_song():
	var indicecancion=lista_musica_unlocked.find(currentsong)
	var lista_size=lista_musica_unlocked.size()
	if lista_size>1:
		var siguientecancion
		if indicecancion==lista_size-1:
			siguientecancion=lista_musica_unlocked[0]
		else:
			siguientecancion=lista_musica_unlocked[indicecancion+1]
			
		$MusicadeFondo.stream=siguientecancion
		currentsong=siguientecancion
		
	$MusicadeFondo.play(0)
		#repetir la cancion
		#poner sonido de que no sirve
		
	
	pass
func stop_song():
	$MusicadeFondo.stop()
	


func _on_area_2d_body_entered(body):
	if body is PlayerPancha:
		$Spr_up_key_ladder.visible=true
		isPlayerHere=true
		
		pass
		#isPlayerHere = true
		#playerRef = body
		#interactSprite.visible = true
	pass # Replace with function body.


func _on_area_2d_body_exited(body):
	if body is PlayerPancha:
		isPlayerHere=false
		$Spr_up_key_ladder.visible=false
	pass # Replace with function body.
