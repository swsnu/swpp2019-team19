## happy path1
* greet
	- utter_greet
* mood_great
	- utter_happy

## sad path1
* greet
	- utter_greet
* mood_unhappy
	- utter_cheer_up
	- utter_did_that_help
* affirm
	- utter_happy

## sad path2
* greet
	- utter_greet
* mood_unhappy
	- utter_cheer_up
	- utter_did_that_help
* deny

## say goodbye1
* goodbye
	- utter_goodbye

## bot challenge1
* bot_challenge
	- utter_iamabot

