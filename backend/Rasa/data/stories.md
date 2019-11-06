## happy path
* greet
  - utter_greet
* mood_great
  - utter_happy

## sad path 1
* greet
  - utter_greet
* mood_unhappy
  - utter_cheer_up
  - utter_did_that_help
* affirm
  - utter_happy

## sad path 2
* greet
  - utter_greet
* mood_unhappy
  - utter_cheer_up
  - utter_did_that_help
* deny
  - utter_ok

## say goodbye
* goodbye
  - utter_goodbye

## bot challenge
* bot_challenge
  - utter_iamabot

## greet-hungry-deny path
* greet
  - utter_greet
  - utter_suggest_meal
* not_hungry OR deny
  - utter_ok

## greet-hungry-accept path 1
* greet
  - utter_greet
  - utter_suggest_meal
* hungry OR affirm
  - utter_meal
  - utter_did_that_help
* affirm
  - utter_happy

## greet-hungry-accept path 2
* greet
  - utter_greet
  - utter_suggest_meal
* hungry OR affirm
  - utter_meal
  - utter_did_that_help
* deny
  - utter_ok

## hungry simple path
* hungry
  - utter_meal
  - utter_did_that_help
* affirm
  - utter_happy

## hungry-accept path
* hungry
  - utter_meal
  - utter_did_that_help
* deny
  - utter_ok
