Model 사용법
1. api
* http://localhost:8000/rasa_eng/intents/
GET: get all intents
POST: json include intent_name(string), intent_tokens(list)
* http://localhost:8000/rasa_eng/intent/#id
GET: get specific intent
PUT: json include intent_name(string), intent_tokens(list)
DELETE: delete specific intent 
* http://localhost:8000/rasa_eng/actions/
GET: get all actions
POST: json include action_name(string), intent_list(list of intent_name), action_type(text or image), text_value(text or empty field), image_value(image or empty field))
* http://localhost:8000/rasa_eng/action/#id
GET: get specific action
PUT: json include action_name(string), intent_list(list of intent_name), action_type(text or image), text_value(text or empty field), image_value(image or empty field))
DELETE: delete specific action 
* http://localhost:8000/rasa_eng/stories/
GET: get all stories
POST: json include story_name(string), story_path_1(list of intent_name), story_path_2(list of intent_name), story_path_3(list of intent_name)
* http://localhost:8000/rasa_eng/story/#id
GET: get specific story
PUT: json include story_name(string), story_path_1(list of intent_name), story_path_2(list of intent_name), story_path_3(list of intent_name)
DELETE: delete specific story 
* http://localhost:8000/rasa_eng/entities/
GET: get all entities
POST: json include entity_name(string)
* http://localhost:8000/rasa_eng/entity/#id
GET: get specific entity
PUT: json include entity_name(string)
DELETE: delete specific intent 
* http://localhost:8000/rasa_eng/slots/
GET: get all slots
POST: json include slot_name(string), slot_type(text or something, check model), slot_value(string or something)
* http://localhost:8000/rasa_eng/slot/#id
GET: get specific slot
PUT: json include slot_name(string), slot_type(text or something, check model), slot_value(string or something)
DELETE: delete specific slot 
* http://localhost:8000/rasa_eng/makefile/
POST: make train file. can check train_data_check folder

rasa_eng->rasa_kor로 바꾸면 한국어 db 접근 가능
