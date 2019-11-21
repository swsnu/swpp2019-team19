## happy path1
* greet
	- utter_greet
	- utter_suggest_meal
* mood_great
	- utter_happy

## sad path1
* greet
	- utter_greet
	- utter_suggest_meal
* mood_unhappy
	- utter_cheer_up
	- utter_did_that_help
* affirm
	- utter_happy
	- utter_ok

## sad path2
* greet
	- utter_greet
	- utter_suggest_meal
* mood_unhappy
	- utter_cheer_up
	- utter_did_that_help
* deny
	- utter_ok

## say goodbye1
* goodbye
	- utter_goodbye

## bot challenge1
* bot_challenge
	- utter_iamabot

## greet-hungry-deny1
* greet
	- utter_greet
	- utter_suggest_meal
* not_hungry
	- utter_ok

## greet-hungry-deny2
* greet
	- utter_greet
	- utter_suggest_meal
* deny
	- utter_ok

## happy greet-hungry-accept1
* greet
	- utter_greet
	- utter_suggest_meal
* hungry
	- utter_meal
* affirm
	- utter_happy
	- utter_ok

## happy greet-hungry-accept2
* greet
	- utter_greet
	- utter_suggest_meal
* hungry
	- utter_meal
* deny
	- utter_ok

## happy greet-hungry-accept3
* greet
	- utter_greet
	- utter_suggest_meal
* affirm
	- utter_happy
	- utter_ok
* affirm
	- utter_happy
	- utter_ok

## happy greet-hungry-accept4
* greet
	- utter_greet
	- utter_suggest_meal
* affirm
	- utter_happy
	- utter_ok
* deny
	- utter_ok

## hungry1
* hungry
	- utter_meal
* affirm
	- utter_happy
	- utter_ok

## hungry2
* hungry
	- utter_meal
* deny
	- utter_ok

